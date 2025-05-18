const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const {companies} = require("./data/companies");
const {items} = require("./data/items")

const batchImport = async () => {
const client = new MongoClient(MONGO_URI);

try {
    await client.connect();

    const db = client.db("e-commerce");

    const result = await db.collection("companies").insertMany(companies);
    const result2 = await db.collection("items").insertMany(items);

    } finally {
        console.log("Success!");
        
    await client.close();
    }
};

batchImport();
