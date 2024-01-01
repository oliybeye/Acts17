from selenium import webdriver
import time


class SeleniumUtility:
    driver: webdriver.Remote

    def __init__(self, driver: webdriver.Remote):
        self.driver = driver

    def __init__(self, command_executor: str):
        options = webdriver.ChromeOptions()
        options.add_experimental_option("detach", True)
        options.add_argument("--ignore-ssl-errors=yes")
        options.add_argument("--ignore-certificate-errors")
        self.driver = webdriver.Remote(
            command_executor=command_executor,  # "http://localhost:4444/wd/hub",  # http://192.168.0.155:9003/ui#
            options=options,
        )

    def __del__(self):
        self.driver.quit()

    def open_page(self, url: str):
        self.driver.get(url)
        time.sleep(5)  # wait for the page to load

    def close_page(self):
        self.driver.close()
