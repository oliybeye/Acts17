from selenium.webdriver import Chrome
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.remote.webelement import WebElement
from selenium_utility import SeleniumUtility
from county_scrapper import CountyScrapper
from models import County, Candidate
from database import Database


class ElectionScrapper:
    def __init__(self, sel_util: SeleniumUtility, db: Database):
        self.sel_util = sel_util
        self.db = db

    def resize_image(self, path: str):
        image = Image.open(path)
        size = 700, 700
        image.save(path)

    def scrape_candidates_by_county(self):
        for i in range(0, 40):
            county_scrapper = CountyScrapper(self.db, self.sel_util, i)
            county_scrapper.scrape_candidates_by_county()
