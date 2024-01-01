package spider

type Author struct {
	First  string `json:"first"`
	Last   string `json:"last"`
	Middle string `json:"middle"`
}

type Article struct {
	Author   []Author `json:"author"`
	Date     string   `json:"date"`
	Title    string   `json:"title"`
	ImageUrl string   `json:"imageUrl"`
	Url      string   `json:"url"`
	Time     string   `json:"time"`
	Category []string `json:"category"`
}

type imageUrlMetaData struct {
	CssSelector string `json:"cssSelector"`
	Src         string `json:"src"`
}

type articleMetaData struct {
	DateTime string           `json:"dateTime"`
	Title    string           `json:"title"`
	ImageUrl imageUrlMetaData `json:"imageUrlMetaData"`
	Author   string           `json:"author"`
}

type newsMetaData struct {
	ArticleMetaData    articleMetaData `json:"articleMetaData"`
	EntryPoint         string          `json:"entryPoint"`
	DomainName         string          `json:"domainName"`
	ArticleRegexFinder string          `json:"articleRegexFinder"`
	SubUrlsToAvoid     []string        `json:"subUrlsToAvoid"`
	BloomFilterData    []byte          `json:"bloomFilterData"`
	IsRobotsLink       bool            `json:"isRobotsLink"`
	NewsTag            string          `json:"newsTag"`
	OrganizationName   string          `json:"organizationName"`
	LastUpdated        string          `json:"lastUpdated"`
	Category           []string        `json:"category"`
}

type news struct {
	url          string
	organization string
	articles     []Article
	filter       []byte
}
