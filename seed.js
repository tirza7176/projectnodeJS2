
require("dotenv").config();
const mongoose = require("mongoose");
const { User } = require("./model/user");
const { Card } = require("./model/card");
const { cards, users } = require("./initialData")
mongoose.connect(process.env.MONGO_URI_DEV)
    .then(() => {
        seed()
    })

    .catch((err) => console.log("could not DB", err)
    );
async function seed() {
    try {
        await mongoose.connect(process.env.MONGO_URI_DEV);
        console.log(" Connected to MongoDB");

        await User.deleteMany();
        await Card.deleteMany();
        await User.insertMany(users);
        await Card.insertMany(cards);
        console.log("Cleared existing data");
        process.exit(0);

    } catch (err) {
        console.error(err)
    }
};
