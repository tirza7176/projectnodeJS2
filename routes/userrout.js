const express = require("express");
const router = express.Router();
const _ = require("lodash");
const bcrypt = require("bcrypt");
const authmw = require("../middleware/authmd")
const { User, userValidation, putUserValidation } = require("../model/user")
router.get("/", authmw, async (req, res) => {
    if (!req.user.isAdmin) {
        res.status(400).send("it is not Authorization")
    }
    try {
        const users = await User.find({}, { password: 0 })
        if (!users) {
            res.status(400).send("users not found");
            return
        }
        res.json(users)
    } catch (error) {
        console.log(error);

    }
})

router.get("/:id", authmw, async (req, res) => {
    const isAdmin = req.user.isAdmin;
    const isOwner = req.user._id = req.params.id;
    console.log(req.user._id);


    if (!isAdmin && !isOwner) {
        res.status(400).send("it is not Authorization")
        return
    }
    try {
        const user = await User.findById(
            req.params.id
        )
        if (!user) {
            res.status(400).send("user not found");

        }
        res.json(user)
    } catch (error) {
        console.log(error);

    }
})
router.put("/:id", authmw, async (req, res) => {
    const isOwner = req.user._id == req.params.id;
    const isAdmin = req.user.isAdmin;
    if (!isOwner && !isAdmin) {
        res.status(400).send("it is not Authorization")
        return
    }
    const { error, value } = putUserValidation.validate(req.body, { stripUnknown: true });
    if (error) {
        res.status(400).send(error.details[0].message);
        return
    }

    const editUser = await User.findByIdAndUpdate(req.params.id, value, {
        returnDocument: 'after'
    });
    if (!editUser) {
        res.status(400).send("user not found");
        return
    }
    res.send(_.pick(editUser, ["_id", "name", "email",
        "phone",
        "adress",
        "image",
        "createdAt"
    ]));
})

router.patch("/:id", authmw, async (req, res) => {
    try {
        const isOwner = req.user._id == req.params.id;
        const isAdmin = req.user.isAdmin;
        if (!isOwner && !isAdmin) {
            res.status(400).send("it is not Authorization")
            return
        }
        const editStatus = await User.findById(
            req.params.id)
        if (!editStatus) {
            res.status(400).send("user not found");
            return
        }
        editStatus.isBusiness =
            !editStatus.isBusiness;
        await editStatus.save();

        const newUser = _.pick(editStatus, ["_id", "name", "email",
            "phone",
            "adress",
            "image",
            "isBusiness"])

        res.send(newUser)
    }
    catch (err) {
        console.error(err)
    }
})
router.delete("/:id", authmw, async (req, res) => {
    try {
        const isAdmin = req.user.isAdmin;
        const isOwner = req.user._id = req.params.id;

        if (!isAdmin && !isOwner) {
            res.status(400).send("it is not Authorization")
            return
        }
        const userDelete = await User.findByIdAndDelete(req.params.id)
        if (!userDelete) {
            res.status(400).send("user not found");

        }
        res.send(userDelete)
    }
    catch {
        console.error(err)
    }
}
)
router.post("/", async (req, res) => {
    try {
        //validation user input
        const { error } = userValidation.validate(req.body);

        if (error) {
            res.status(400).send(error.details[0].message);
            return
        }
        //validate system
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            res.status(400).send("user already exits");
            return
        }
        //process
        user = await new User({ ...req.body, password: await bcrypt.hash(req.body.password, 14) }
        ).save();


        //response 

        res.send(_.pick(user, ["_id", "name", "email",
            "phone",
            "adress",
            "isBusiness",
            "isAdmin",
            "image",
            "createdAt"
        ]));
    } catch (err) {
        console.error(err)
    }

})

module.exports = router