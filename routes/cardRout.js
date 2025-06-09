const express = require("express");
const router = express.Router();
const _ = require("lodash");

const authmw = require("../middleware/authmd")
const { Card, cardValidation, generateBizNumber } = require("../model/card")

router.get("/", async (req, res) => {
    try {
        const cards = await Card.find({})
        if (!cards) {
            res.status(400).send("cards not found");
            return
        }
        res.json(cards)
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
})
router.get("/my-cards", authmw, async (req, res) => {
    if (!req.user) {
        res.status(400).send("You need to sign up")
    }
    try {
        const mycards = await Card.find({ user_id: req.user._id });

        if (!mycards) {
            return res.status(404).send("No cards found");
        }

        res.json(mycards);
    } catch (err) {
        res.status(500).send("Server error");
    }
});
router.get("/:id", async (req, res) => {
    try {
        const card = await Card.findById(req.params.id)
        if (!card) {
            res.status(400).send("card not found")
            return
        }
        res.send(_.omit(card.toObject(), ["_id", "user_id"]));
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Server error");

    }
})

router.put("/:id", authmw, async (req, res) => {
    try {
        if (!req.user) {
            res.status(400).send("You need to sign up")
            return
        }
        const { error, value } = cardValidation.validate(req.body);
        if (error) {
            res.status(400).send(error.details[0].message);
            return;

        }

        const updatedCard = await Card.findOneAndUpdate({ _id: req.params.id, user_id: req.user._id }, value, { new: true })

        if (!updatedCard) {
            res.status(404).send("Card not found or access denied");
            return;
        }

        res.send(updatedCard);
    }
    catch (err) {

        console.error("PUT /cards/:id error:", err);
        res.status(500).send("Internal server error");
    }

});
router.patch("/:id", authmw, async (req, res) => {
    try {
        const userId = req.user._id;
        const card = await Card.findById(req.params.id);

        if (!card) {
            return res.status(404).send("Card not found");
        }

        const alreadyLiked = card.Likes.includes(userId);
        const updatedCard = await Card.findByIdAndUpdate(
            req.params.id,
            alreadyLiked
                ? { $pull: { Likes: userId } }
                : { $addToSet: { Likes: userId } },
            { new: true }
        );

        res.send(updatedCard);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});
router.delete("/:id", authmw, async (req, res) => {
    try {
        if (!req.user) {
            res.status(400).send("You need to sign up")
            return
        }

        const card = await Card.findById(req.params.id)
        if (!card) {
            res.status(404).send("The card with the given ID was not found");
            return;
        }

        const isAdmin = req.user.isAdmin;
        const cardOwner = req.user._id.toString() === card.user_id.toString()
        if (isAdmin || cardOwner) {
            const deletedCard = await Card.findByIdAndDelete(req.params.id);

            return res.send(deletedCard);
        } else {
            return res.status(400).send("it is not Authorization")
        }

    }
    catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
})
router.post("/", authmw, async (req, res) => {
    //validation card input
    const { error, value } = cardValidation.validate(req.body);

    if (error) {
        res.status(400).send(error.details[0].message);
        return
    }
    //validate system
    if (!req.user.isBusiness) {
        res.status(400).send("user must be a business");
        return
    }
    //process
    const card = await new Card({
        ...value,

        user_id: req.user._id,
        bizNumber: await generateBizNumber(),
    })
        .save();
    //response 
    res.json(card)
})


module.exports = router
