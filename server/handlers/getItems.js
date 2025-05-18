"use strict";

const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

// returns all items
const getItems = async (req, res) => {
    const client = new MongoClient(MONGO_URI);
    try {
        await client.connect();
        const db = client.db("e-commerce");
        const items = await db.collection("items").find().toArray();
        res.status(200).json({ status: 200, data: items});

    } catch (err) {
        res.status(500).json({ status: 500, message: err.message })

    } finally {
        client.close();
    }
};

module.exports = getItems;
