package spider

import (
	"fmt"
	"newspider/utils"
	"strings"

	"github.com/gocolly/colly/v2"
)

func scrapeArticle(site string, articleMetadata articleMetaData) Article {
	c := colly.NewCollector()

	article := Article{}

	c.OnRequest(func(r *colly.Request) {
		fmt.Println("Visiting", r.URL)
	})

	// article authors
	c.OnHTML(articleMetadata.Author, func(h *colly.HTMLElement) {
		names := strings.Split(h.Text, " ")
		author := Author{}
		author.First = names[0]
		if len(names) > 2 {
			author.Middle = names[1]
			author.Last = names[2]
		} else if len(names) > 1 {
			author.Last = names[1]
		}
		article.Author = append(article.Author, author)
	})

	// article date
	c.OnHTML(articleMetadata.DateTime, func(h *colly.HTMLElement) {
		article.Date = strings.ReplaceAll(strings.ReplaceAll(h.Text, "\n", ""), "  ", "")
	})

	// article title
	c.OnHTML(articleMetadata.Title, func(h *colly.HTMLElement) {
		article.Title = strings.ReplaceAll(strings.ReplaceAll(h.Text, "\n", ""), "  ", "")
	})

	// article image
	c.OnHTML(articleMetadata.ImageUrl.CssSelector, func(h *colly.HTMLElement) {
		if article.ImageUrl == "" {
			article.ImageUrl = h.Attr(articleMetadata.ImageUrl.Src)
		}
	})

	// category
	c.OnScraped(func(r *colly.Response) {
		// article.category =
		article.Time = utils.GetCurrentDate()
		article.Url = site
	})
	c.Visit(site)

	return article
}
