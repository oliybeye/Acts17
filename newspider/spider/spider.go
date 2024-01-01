package spider

import (
	"context"
	"log"
	"newspider/db"
	"newspider/filter"
	"newspider/utils"

	"github.com/bits-and-blooms/bloom/v3"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

func Spider(metadatas []newsMetaData, dbConnection string, dbName string) {
	for _, metadata := range metadatas {
		go spider(metadata, dbConnection, dbName)
	}
}

func spider(metadata newsMetaData, dbConnection string, dbName string) {
	urls := webby(metadata)
	scrapeNewsSite(urls, metadata, dbConnection, dbName)
}

func scrapeNewsSite(urls []string, metadata newsMetaData, dbConnection string, dbName string) {
	bloomFilter := filter.DecodeBloomFilter(metadata.BloomFilterData)

	articles := scrapeArticles(urls, metadata.ArticleMetaData, bloomFilter)
	c := filter.MarshalBloomFilter(bloomFilter)
	news := news{
		url:          metadata.EntryPoint,
		articles:     articles,
		organization: metadata.OrganizationName,
		filter:       c,
	}
	saveArticles(news, dbConnection, dbName)
}

func saveArticles(news news, dbConnection string, dbName string) {
	if len(news.articles) > 0 {
		client, ctx, cancel, _ := db.Connect(dbConnection)
		articles := convertArticleToInterface(news.articles)
		_, err := db.InsertMany(client, ctx, dbName, news.organization, articles)
		if err == nil {
			updateFilterData(client, ctx, dbName, news)
		}
		db.Close(client, ctx, cancel)
	}
}

func updateFilterData(client *mongo.Client, ctx context.Context, dbName string, news news) {
	filter := bson.D{{"organizationName", news.organization}}
	up := bson.D{{"$set", bson.D{
		{"bloomFilterData", news.filter},
		{"lastUpdated", utils.GetCurrentDateTime()},
	}}}
	log.Println("updating filter data for:", news.organization)
	db.Update(client, ctx, dbName, "metadata", filter, up)
}

func convertArticleToInterface(articles []Article) []interface{} {
	var result []interface{}
	for _, data := range articles {
		result = append(result, data)
	}

	return result
}

func scrapeArticles(urls []string, articleMetadata articleMetaData, filter *bloom.BloomFilter) []Article {
	articles := []Article{}
	for _, url := range urls {
		if !filter.TestString(url) {
			article := scrapeArticle(url, articleMetadata)
			if validateArticleData(article) {
				articles = append(articles, article)
				filter.AddString(url)
			}
		}
	}
	return articles
}
