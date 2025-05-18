const {MongoClient} = require("mongodb")
require("dotenv").config();
const {MONGO_URI} = process.env;

const getCompanies = async(req, res) =>{
    const client = new MongoClient(MONGO_URI)
    
    try{
        await client.connect()
        const db = client.db("e-commerce")
        const allcompagnies = await db.collection("companies").find().toArray()
        if(allcompagnies.length === 0){
            return res.status(404).json({
                status:404,
                message: `No item was found`
            })
        }
        res.status(200).json({
            status: 200,
            data: allcompagnies
        })
    }
    catch(error){
        console.error("Error fetching companies", error)
        res.status(500).json({
            status:500,
            message : error.message
        })
    }
    finally{
        await client.close()
    }
}

module.exports = getCompanies;