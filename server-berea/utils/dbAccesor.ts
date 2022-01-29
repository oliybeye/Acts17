import client from "../config/mangodbSetup";

interface DbParams {
    dbName: string;
    collectionName: string;
    filter: {};
}

async function QueryDB(props: DbParams) {
    const { dbName, collectionName, filter } = props;
    try {
        await client.connect();
        const db = client.db(dbName);
        const news = db.collection( collectionName ).find(filter).toArray();
        return news;
    } catch (error) {
        return error;
    }
}

export default QueryDB;