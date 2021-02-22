require("dotenv").config()
const PORT = 3003
const MONGODB_URL = process.env.MONGODB_URL
module.exports = {
    MONGODB_URL, PORT
}