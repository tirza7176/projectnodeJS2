const mongoose = require("mongoose");
const Joi = require("joi");

const _ = require("lodash");

const cardSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 256,
    },
    subTitle: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 256,
    },
    description: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 1024,
    },
    email: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 255,

    },
    phone: {
        type: String,
        required: true,
        minlength: 9,
        maxlength: 10,
    },
    adress: {
        state: {
            type: String,
            required: false,
        },
        country: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 256,
        },
        city: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 256,
        },
        street: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 256,
        },
        houseNumber: {
            type: Number,
            required: true,
            minl: 10,
            max: 9_999_999_999,
        },
        zip: {
            type: Number,
            required: true,
        }
    },
    image: {
        url: {
            type: String,
            required: false,
            minlength: 2,
            maxlength: 1024,
        },
        alt: {
            type: String,
            required: false,
            minlength: 2,
            maxlength: 256,
        }
    },
    web: {
        type: String,
        required: false,
    },
    bizNumber: {
        type: Number,
        required: true,
        min: 100,
        max: 9_99_999_999,
        unique: true,
    },
    Likes: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]

    },

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },
})
const Card = mongoose.model("Card", cardSchema, "cards");
async function generateBizNumber() {
    while (true) {
        const random = _.random(100, 9_99_999_999);
        const card = await Card.findOne({ bizNumber: random });
        if (!card) {
            return random;
        }
    }
}

const notDefined = "not definde"
const cardValidation = Joi.object({
    title: Joi.string().min(2).max(2500).required(),
    subTitle: Joi.string().min(2).max(2500).required(),
    description: Joi.string().min(2).max(2500).required(),
    email: Joi.string().min(2).max(2500).required(),
    phone: Joi.string().min(9).max(10).required(),
    adress: {
        state: Joi.string().min(2).max(2500).default(notDefined).label("state").messages(),
        country: Joi.string().min(2).max(2500).required().label("country").messages(),
        city: Joi.string().min(2).max(2500).required().label("city").messages(),
        street: Joi.string().min(2).max(2500).required().label("street").messages(),
        houseNumber: Joi.number().required().label("HouseNumber").messages(),
        zip: Joi.number().required().label("zip").messages(),
    },
    image: {
        url: Joi.string().uri().allow("")
            .empty("").default("https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/94145_stork_and_duck_chik_PikiWiki_Israel.jpg/800px-94145_stork_and_duck_chik_PikiWiki_Israel.jpg").label("url").messages(),
        alt: Joi.string().min(2).max(2500).default("").label("alt").messages(),
    },
    web: Joi.string().min(2).max(2500).required(),
})

module.exports = {
    cardValidation,
    Card,
    generateBizNumber,
}