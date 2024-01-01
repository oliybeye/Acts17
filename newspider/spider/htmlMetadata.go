package spider

import (
	"fmt"
	"regexp"
	"strings"

	"github.com/gocolly/colly/v2"
)

func webbyHtml(metadata newsMetaData) []string {
	c := colly.NewCollector()

	c.OnRequest(func(r *colly.Request) {
		fmt.Println("Visiting", r.URL)
	})

	filterHref := map[string]bool{}

	c.OnHTML(metadata.NewsTag, func(h *colly.HTMLElement) {
		link := h.Attr("href")
		shouldAvoidLink := false

		for _, item := range metadata.SubUrlsToAvoid {
			if strings.Contains(link, item) {
				shouldAvoidLink = true
				break
			}
		}

		if !shouldAvoidLink {
			match, _ := regexp.MatchString(metadata.ArticleRegexFinder, link)

			if match {
				if !strings.Contains(link, "https:") {
					link = "https:" + link
				}
				filterHref[link] = true
			}
		}
	})

	c.OnResponse(func(r *colly.Response) {
		fmt.Println(r.Request.URL, " responded")
	})

	c.Visit(metadata.EntryPoint)

	returnVal := []string{}

	for key, _ := range filterHref {
		returnVal = append(returnVal, key)
	}

	return returnVal
}
