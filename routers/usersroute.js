const express = require('express');
const router = express.Router();
const User = require('../models/usersmodel')
const jwt = require('jsonwebtoken');


router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.status(201).json(users)

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

/////Regiaster
router.post('/register', async (req, res) => {
    try {
        const user = new User(req.body)
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})


/////Login
router.post('/login', async (req, res) => {
    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    });
    if (user) {
        const token = jwt.sign(
            { _id: user._id },
            'secret_key'
        )
        res.cookie('sessionToken', token, { expires: new Date(Date.now() + 900000) });

        res.json({ status: 'ok', user: true });
    } else {
        res.json({ status: 'error', user: false });
    }
});

router.get('/voteStatistics', async (req, res) => {
    try {
        const statistics = await User.aggregate([
            {
                $group: {
                    _id: '$vote',
                    count: { $sum: 1 },
                },
            },
            {
                $project: {
                    _id: 0,
                    vote: '$_id',
                    count: 1,
                },
            },
        ]);

        // Calculate the total count
        const totalUsers = statistics.reduce((total, stat) => total + stat.count, 0);

        // Include the total count in the statistics
        statistics.push({ count: totalUsers,vote: 'Total', });

        res.json(statistics);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/isloggedin', (req, res) => {
    const sessionToken = req.cookies.sessionToken;

    if (sessionToken) {
        res.json({ isLoggedIn: true });
    } else {
        res.json({ isLoggedIn: false });
    }
});

async function getUser(req, res, next) {
    let user;
    try {
        user = await User.findById(req.params.id);
        if (user == null) {
            return res.status(404).json({ message: "Record not found" })
        }
    } catch (err) {
        return res.status(400).json({ okok: err.message })
    }
    res.user = user;
    next();
}

router.delete('/:id', getUser, async (req, res) => {
    try {
        await res.user.deleteOne();
        res.json({ message: "User is successfully deleted" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/:id', getUser, async (req, res) => {
    res.json(res.user)
})


// Update the "vote" field for a user
router.put('/:id', getUser, async (req, res) => {
    // Check if the request body contains a "vote" field
    if (req.body.vote === undefined) {
        return res.status(400).json({ message: 'Vote parameter missing' });
    }

    // Update the user's "vote" field
    res.user.vote = req.body.vote;

    try {
        // Save the updated user document
        const updatedUser = await res.user.save();
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});



module.exports = router;