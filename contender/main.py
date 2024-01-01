from election_scrapper import ElectionScrapper
from database import Database
import selenium_utility

sel_util = selenium_utility.SeleniumUtility("http://localhost:4444/wd/hub")

db = Database(connection="mongodb://localhost:27017/", dbName="waGENERALNov2023")

electionScrapper = ElectionScrapper(sel_util, db)

electionScrapper.scrape_candidates_by_county()
