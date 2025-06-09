const mongoose = require("mongoose");
const Joi = require("joi");
const _ = require("lodash");

const userSchema = new mongoose.Schema({
    name: {
        first: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 256,
        },
        middle: {
            type: String,
            required: false,

        },
        last: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 256,
        }

    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        maxlength: 1024,
    },
    email: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 255,
        unique: true,
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
            min: 1,
            max: 9_999_999_999,
        },
        zip: {
            type: Number,
            required: true,

        }
    },
    isBusiness: {
        type: Boolean,
        required: true,
    },
    image: {
        url: {
            type: String,
            required: false,
            minlength: 6,
            maxlength: 1024,
        },
        alt: {
            type: String,
            required: false,
            minlength: 2,
            maxlength: 256,
        },
    },
    isAdmin: {
        type: Boolean,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

const User = mongoose.model("User", userSchema, "user");
const notDefined = "not definde"
const validation = {
    name: {
        first: Joi.string().min(2).max(255).required().label("First Name")
            .messages(),
        middle: Joi.string().min(2).max(255).default("").label("Middle Name")
            .messages(),
        last: Joi.string().min(2).max(255).required().label("Last Name")
            .messages(),
    },
    email: Joi.string().min(6).max(255).required(),
    password: Joi.string().pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{7,}$/, { name: 'password' }).required().messages({
        'string.pattern.name': 'Password must be at least 7 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character.'
    }),
    phone: Joi.string().min(9).max(10).required(),
    image: {
        url: Joi.string().min(14).uri().default("").label("Url")
            .messages(),

        alt: Joi.string().min(2).max(255).default("").label("alt").messages(),
    },
    adress: {
        state: Joi.string().min(2).max(255).default(notDefined).label("state")
            .messages(),

        country: Joi.string().min(2).max(255).required().label("Country")
            .messages(),

        city: Joi.string().min(2).max(255).required().label("City")
            .messages(),

        street: Joi.string().min(2).max(255).required().label("Street")
            .messages(
        ),
        houseNumber: Joi.number().required().label("HouseNumber")
            .messages({
                "number.empty": "{#label} is required",
            }),
        zip: Joi.number().required().label("zip")
            .messages({
                "number.empty": "{#label} is required",
            }),
    },
    isBusiness: Joi.boolean().required(),
    isAdmin: Joi.boolean().default(false),
}
const userValidation = Joi.object(validation).required();
const putUserValidation = Joi.object(_.omit(validation, ["email", "password"])).required();

const signinValidation = Joi.object(_.pick(validation, ["email", "password"])).required();
module.exports = {
    User,
    userValidation,
    signinValidation,
    putUserValidation
}