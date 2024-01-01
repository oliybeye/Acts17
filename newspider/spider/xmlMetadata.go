package spider

import (
	"strings"

	"github.com/gocolly/colly"
)

func webbyXml(metadata newsMetaData) []string {
	urls := []string{}
	c := colly.NewCollector()

	c.OnXML("//loc", func(x *colly.XMLElement) {
		shouldAvoidLink := false
		link := x.Text
		for _, url := range metadata.SubUrlsToAvoid {
			if strings.Contains(link, url) {
				shouldAvoidLink = true
				break
			}
		}

		if !shouldAvoidLink {
			urls = append(urls, link)
		}
	})

	c.Visit(metadata.EntryPoint)

	return urls
}
