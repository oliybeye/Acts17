package spider

import "github.com/bits-and-blooms/bloom"

func webby(metadata newsMetaData) []string {
	if metadata.IsRobotsLink {
		return webbyXml(metadata)
	}

	return webbyHtml(metadata)
}

func validateArticleData(article Article) bool {
	return article.Title != "" && article.Date != "" && len(article.Author) > 0
}

func shouldScanSite(site string, bloomSite []uint64) bool {
	filter := bloom.From(bloomSite, 7)
	return filter.TestAndAddString(site)
}
