from selenium_utility import SeleniumUtility
from selenium.webdriver.common.by import By
from models import County, Candidate
from selenium.webdriver.remote.webelement import WebElement
from candidate_scrapper import CandidateScrapper
from database import Database
import time


class CountyScrapper:
    def __init__(self, db: Database, sel_util: SeleniumUtility, county_index: int):
        self.db = db
        self.county_index = county_index
        self.sel_util = sel_util
        self.countyUrl = f"https://voter.votewa.gov/CandidateList.aspx?e=883&c={self.county_index:02d}"
        sel_util.open_page(self.countyUrl)

    def scrape_candidates_by_county(self):
        try:
            countyName = self.sel_util.driver.find_element(
                By.CSS_SELECTOR,
                "select[id='ddlCounty'] > option[selected='selected']",
            ).text
            time.sleep(10)
            numberOfPages = 0
            try:
                numbersDivElement = self.sel_util.driver.find_element(
                    By.CSS_SELECTOR,
                    "td.rgPagerCell.NextPrevAndNumeric > div.rgWrap.rgNumPart",
                )
                numbers = numbersDivElement.find_elements(By.TAG_NAME, "a")
                numberOfPages = len(numbers) + 1
            except:
                numberOfPages = 1

            county = County(name=countyName.strip(), candidates=[])
            table = self.sel_util.driver.find_element(
                By.CSS_SELECTOR, "div.RadGrid.RadGrid_Default"
            )
            for j in range(0, numberOfPages):
                table = self.sel_util.driver.find_element(
                    By.CSS_SELECTOR, "div.RadGrid.RadGrid_Default > table"
                )
                candidate = self.scrape_html(table, county.name)
                county.candidates.extend(candidate)
                self.sel_util.driver.execute_script(
                    "window.scrollTo(0, document.body.scrollHeight);"
                )
                try:
                    next = self.sel_util.driver.find_element(
                        By.CSS_SELECTOR, "div.rgWrap.rgArrPart2 > input.rgPageNext"
                    )
                    next.click()
                except:
                    break
                time.sleep(20)

            candidateScrapper = CandidateScrapper(self.sel_util)
            candidateScrapper.get_all_candidate_statements(
                county.name, county.candidates
            )
            self.save_county_candidates(county)
            time.sleep(5)
        except Exception as e:
            print(e)

    def save_county_candidates(self, county: County):
        collections = self.db[county.name]
        candidates = [c.__dict__ for c in county.candidates]
        collections.insert_many(candidates)
        metadata = self.db["metadata"]
        metadata.insert_one({"county": county.name})

    def get_name(self, text):
        name = text.split(" ")
        first = ""
        middle = ""
        last = ""
        if len(name) > 2:
            first = name[0]
            middle = name[1]
            for i in range(2, len(name)):
                last += name[i] + " "
        elif len(name) == 2:
            first = name[0]
            last = name[1]
        else:
            first = text
        return first, middle, last

    def get_element_text(self, selector: str, element: WebElement):
        try:
            text = element.find_element(By.CSS_SELECTOR, selector).text
            return text
        except Exception as e:
            print(f"selector: {selector}, exception: {e}")
            return ""

    def scrape_html(self, tableElement: WebElement, countyName: str):
        table = []
        table.extend(tableElement.find_elements(By.CSS_SELECTOR, "tr.rgRow"))
        table.extend(tableElement.find_elements(By.CSS_SELECTOR, "tr.rgAltRow"))
        candidates = []

        for row in table:
            try:
                fullname = self.get_element_text("td:nth-child(6) > a", row)
                name = self.get_name(fullname)
                email = self.get_element_text("td:nth-child(8)", row)

                url = ""
                try:
                    urlElement = row.find_element(
                        By.CSS_SELECTOR, "td:nth-child(6) > a"
                    )
                    url = urlElement.get_attribute("href")
                except:
                    print("url")
                candidate = Candidate(
                    county=countyName,
                    districtType=self.get_element_text("td:nth-child(1)", row),
                    district=self.get_element_text("td:nth-child(2)", row),
                    race=self.get_element_text("td:nth-child(3)", row),
                    termType=self.get_element_text("td:nth-child(4)", row),
                    termLength=self.get_element_text("td:nth-child(5)", row),
                    firstName=name[0],
                    middleName=name[1],
                    lastName=name[2],
                    mailingAddress=self.get_element_text("td:nth-child(7)", row),
                    email=email,
                    phone=self.get_element_text("td:nth-child(9)", row),
                    filingDate=self.get_element_text("td:nth-child(10)", row),
                    partyPreference=self.get_element_text("td:nth-child(11)", row),
                    status=self.get_element_text("td:nth-child(12)", row),
                    electionStatus=self.get_element_text("td:nth-child(13)", row),
                    url=url,
                )
                candidates.append(candidate)
            except Exception as e:
                print("scrapper exception")
                print(e)
                break
        return candidates
