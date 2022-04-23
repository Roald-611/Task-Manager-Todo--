const express = require('express');
const sharp = require('sharp');
const multer = require('multer');

const router = new express.Router();

const User = require('../models/user_model');
const auth = require('../middleware/auth');
const { welcomeEmail, goodByEmail } = require('../emails/account');

router.post('/users', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        const token = await user.generateAuthToken();
        welcomeEmail(user.email, user.name);
        // goodByEmail(user.email, user.name);
        res.status(201).send({ user, token });
    } catch (error) {
        res.status(400).send(error);
    }
});

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken()
        res.send({ user, token });
    } catch (error) {
        res.status(400).send();
    }
})

router.get('/users/me', auth, async (req, res) => {
    // try {
    //     const users = await User.find();
    //     res.send(users);
    // } catch (error) {
    //     res.status(500).send();
    // }
    // // User.find({}).then((user) => {
    // //     res.send(user);
    // // }).catch((e) => {
    // //     res.status(500).send();
    // // })
    res.send(req.user)
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        })
        await req.user.save();

        res.send();
    } catch (error) {
        res.status(500).send();
    }
})

// router.post('/users/logoutAll', auth, async (req, res) => {
//     try {
//         req.user.tokens = req.user.tokens.filter((token) => {
//             return req.user.tokens.token;
//         })
//         await req.user.save();

//         res.send();
//     } catch (error) {
//         res.status(500).send();
//     }
// })
router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send();
    } catch (error) {
        res.status(500).send();
    }
})

// router.get('/users/:id', async (req, res) => {
//     // console.log(req.params);
//     const _id = req.params.id;
//     try {
//         const users = await User.findById(_id);
//         res.send(users);
//     } catch (error) {
//         res.status(500).send();
//     }

//     // User.findById(_id).then((user) => {
//     //     if (!user) {
//     //         return res.status(404).send();
//     //     }
//     //     res.send(user);
//     // }).catch((e) => {
//     //     res.status(500).send();
//     // })
// })

router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: "Invalid updates" });
    }

    // const _id = req.params.id;
    try {
        // const user = await User.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true })

        const user = await User.findById(req.user._id);

        updates.forEach((update) => {
            user[update] = req.body[update]
        });

        await user.save()
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (error) {
        res.status(400).send(error);
    }
})

router.delete('/users/me', auth, async (req, res) => {
    try {
        // const user = await User.findByIdAndDelete(req.user._id);

        // if (!user) {
        //     return res.status(404).send();

        // }
        await req.user.remove()
        goodByEmail(req.user.email, req.user.name);
        res.send(req.user);
    } catch (error) {
        res.status(500).send();
    }
})


const upload = multer({
    limits: {
        fileSize: 1000000,
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            cb(new Error('Please Upload image jpg|jpeg|png'))
        }
        cb(undefined, true)
    }
})

router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer();

    req.user.avatar = buffer;
    await req.user.save();
    res.send();
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})


router.get('/users/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if (!user || !user.avatar) {
            throw new Error()
        }
        res.set('Content-Type', 'image/jpg')
        res.send(user.avatar);
    } catch (error) {
        res.status(404).send()
    }
})

router.delete('/users/me/avatar', auth, async (req, res) => {
    try {
        req.user.avatar = undefined;
        // req.user.avatar = '';
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router