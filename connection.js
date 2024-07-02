const mongoose = require("mongoose");


async function dbConnection(URL)
{
    return mongoose.connect(URL);
}

module.exports = dbConnection