const bcrypt = require("bcrypt");
let users = [
    {
        "name": {
            "first": "Dana",
            "middle": "djjj",
            "last": "Cohen"
        },
        "email": "mana@gmail.com",
        "phone": "0521234567",
        "password": bcrypt.hashSync("MAna@8466", 14),
        "adress": {
            "state": "Center",
            "country": "Israel",
            "city": "vddd",
            "street": "Herzl",
            "houseNumber": "5",
            "zip": 5
        },
        "isBusiness": true,
        "isAdmin": true,
        "user_id": ("6827481837d8ad438da5a84d")
    }, {
        "name": {
            "first": "mini",
            "middle": "djjj",
            "last": "Cohen"
        },
        "email": "mini@gmail.com",
        "phone": "0521234567",
        "password": bcrypt.hashSync("MAna@8466", 14),
        "adress": {
            "state": "Center",
            "country": "Israel",
            "city": "vddd",
            "street": "Herzl",
            "houseNumber": "5",
            "zip": 5
        },
        "isBusiness": true,
        "isAdmin": false,
        "user_id": ("6827481837d8ad438da5a84f")
    }, {
        "name": {
            "first": "Dana",
            "middle": "djjj",
            "last": "Cohen"
        },
        "email": "mana2@gmail.com",
        "phone": "0521234567",
        "password": bcrypt.hashSync("MAna@8466", 14),
        "adress": {
            "state": "Center",
            "country": "Israel",
            "city": "vddd",
            "street": "Herzl",
            "houseNumber": "5",
            "zip": 5
        },
        "isBusiness": false,
        "isAdmin": false,
        "user_id": ("6827481837d8ad438da5a84e")
    }
];
let cards = [{
    "_id": ('636183b6cb0710446e7a7326'),
    "title": "titlemine",
    "subTitle": "hhjjjhh",
    "description": "simon",
    "phone": "0501454542",
    "email": "exagffle@email.com",
    "web": "https://example.com",
    "image": {
        "url": "https://img.freepik.com/free-photo/animal-lizard-nature-multi-colored-close-up-generative-ai_188544-9072.jpg?semt=ais_hybrid&w=740",
        "alt": "picture"
    },
    "adress": {
        "state": "Center",
        "country": "Israel",
        "city": "vddd",
        "street": "Herzl",
        "houseNumber": "5",
        "zip": 5
    },
    "bizNumber": 478,
    user_id: ("6827481837d8ad438da5a84e")
},
{
    "_id": ('636183b6cb0710446e7a7327'),
    "title": "tiffffe",
    "subTitle": "hhjjjhh",
    "description": "simon",
    "phone": "0501454542",
    "email": "exagffle@email.com",
    "web": "https://example.com",
    "image": {
        "url": "https://img.freepik.com/free-photo/animal-lizard-nature-multi-colored-close-up-generative-ai_188544-9072.jpg?semt=ais_hybrid&w=740",
        "alt": "picture"
    },
    "adress": {
        "state": "Center",
        "country": "Israel",
        "city": "vddd",
        "street": "Herzl",
        "houseNumber": "5",
        "zip": 5
    },
    "bizNumber": 756,
    "user_id": ("6827481837d8ad438da5a84f")
}, {
    "_id": ('636183b6cb0710446e7a7328'),
    "title": "tiffffe",
    "subTitle": "hhjjjhh",
    "description": "simon",
    "phone": "0501454542",
    "email": "exagffle@email.com",
    "web": "https://example.com",
    "image": {
        "url": "https://img.freepik.com/free-photo/animal-lizard-nature-multi-colored-close-up-generative-ai_188544-9072.jpg?semt=ais_hybrid&w=740",
        "alt": "picture"
    },
    "adress": {
        "state": "Center",
        "country": "Israel",
        "city": "vddd",
        "street": "Herzl",
        "houseNumber": "5",
        "zip": 5
    },
    "bizNumber": 536,
    "user_id": ("6827481837d8ad438da5a84f")
}];



module.exports = {
    cards, users
}