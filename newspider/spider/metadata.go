package spider

import (
	"context"
	"log"
	"newspider/db"

	"go.mongodb.org/mongo-driver/bson"
)

func GetMetaData(dbConnection string, dbName string) []newsMetaData {
	log.Println("loading meta data")
	client, ctx, cancel, err := db.Connect(dbConnection)
	if err != nil {
		panic(err)
	}

	dbCollection := "metadata"
	que := bson.D{}
	field := bson.D{}
	cursor, err := db.Query(client, ctx, dbName, dbCollection, que, field)

	if err != nil {
		panic(err)
	}

	var results []newsMetaData

	if err := cursor.All(context.Background(), &results); err != nil {
		panic(err)
	}

	db.Close(client, ctx, cancel)
	return results
}
