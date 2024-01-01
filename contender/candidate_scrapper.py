from models import Candidate
from selenium_utility import SeleniumUtility


class CandidateScrapper:
    def __init__(self, sel_util: SeleniumUtility):
        self.sel_util = sel_util

    def get_all_candidate_statements(self, countyName: str, candidates=[Candidate]):
        for candidate in candidates:
            if candidate.url == "":
                continue
            self.get_candidate_statement(candidate)
            path = candidate.race + candidate.lastName + candidate.firstName
            candidate.img = self.download_image(countyName, path)

    def get_candidate_statement(self, candidate=Candidate):
        self.sel_util.open_page(candidate.url)
        try:
            statement = self.sel_util.driver.find_element(
                By.CSS_SELECTOR, "div.left.ng-star-inserted > div"
            ).text
        except:
            statement = ""
        candidate.statement = statement
        candidate.email = (
            get_candidate_email() if candidate.email == "" else candidate.email
        )

    def download_image(self, county: str, path: str):
        try:
            exercise1_card = self.sel_util.driver.find_element(
                By.CSS_SELECTOR, "img.ng-star-inserted"
            )
            src = exercise1_card.get_attribute("src")
            dir_path = f"./images/{election}/{county}"
            if not os.path.exists(dir_path):
                os.makedirs(dir_path)
            urllib.request.urlretrieve(src, f"./images/{election}/{county}/{path}.png")
            resize_image(f"./images/{election}/{county}/{path}.png")
            return f"{election}/{county}/{path}.png"
        except:
            print("no image found")
        return ""

    def get_candidate_email(self):
        try:
            email = self.sel_util.driver.find_element(
                By.CSS_SELECTOR,
                "div.right.borderLeft.ng-star-inserted > div.content > div",
            )
            if "@" in email.text:
                return email.text
            else:
                return self.sel_util.driver.find_element(
                    By.CSS_SELECTOR,
                    "div.right.borderLeft.ng-star-inserted > div.content > div:nth-child(3)",
                ).text
        except:
            try:
                email = self.sel_util.driver.find_element(
                    By.CSS_SELECTOR, "div.right.ng-star-inserted > div.content > div"
                )
                if "@" in email.text:
                    return email.text
                else:
                    return self.sel_util.driver.find_element(
                        By.CSS_SELECTOR,
                        "div.right.ng-star-inserted > div.content > div:nth-child(3)",
                    ).text
            except:
                return ""
