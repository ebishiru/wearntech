const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

// returns single company
const getCompany = async (req, res) => {
    const client = new MongoClient(MONGO_URI);
    const companyId = req.params.companyId;
    if (!companyId) {
        return res.status(400).json({ status: 400, message: "Please provide a Company Id" })
    }
    try {
        await client.connect();
        const db = client.db("e-commerce");
        const result = await db.collection("companies").findOne({ _id: Number(companyId)})
        if (!result) {
            return res.status(404).json({ status: 404, message: `No company may be found with id ${companyId}.`})
        }
        res.status(200).json({ status: 200, data: result});

    } catch (err) {
        res.status(500).json({ status: 500, message: err.message })

    } finally {
        client.close();
    }
};

module.exports = getCompany;
