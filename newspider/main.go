package main

import (
	"log"
	"newspider/spider"
	"os"
	"time"
)

var DB_NAME = os.Getenv("DB_NAME")
var DB_CONNECTION = os.Getenv("DB_CONNECTION")

func main() {
	if DB_NAME == "" {
		DB_NAME = "unsalted"
	}

	if DB_CONNECTION == "" {
		DB_CONNECTION = "mongodb://localhost:27017"
	}

	log.Println("dbConnection", DB_CONNECTION)
	log.Println("dbName", DB_NAME)

	for {
		metadatas := spider.GetMetaData(DB_CONNECTION, DB_NAME)

		log.Println("starting scan")
		spider.Spider(metadatas, DB_CONNECTION, DB_NAME)

		log.Println("sleeping til next scan")
		time.Sleep(240 * time.Minute) // wait 4 hours before another scan
	}
}
