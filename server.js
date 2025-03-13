const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const users = [
    { username: "Faiz" },
    { username: "Safi" },
    { username: "Tayyab" },
];

const events = [
    {
        name: "Safi's wedding",
        description: "He just got hitched",
        date: "2025-03-20",
        time: "10:00 AM",
        category: "Meetings",
        username: "Safi",
    },
    {
        name: "Tayyab's bachelor party",
        description: "He finally found the Gujrati girl of his dreams",
        date: "2025-04-10",
        time: "7:00 PM",
        category: "Birthdays",
        username: "Tayyab",
    },
    {
        name: "Faiz's chicken wing party",
        description: "Eat up",
        date: "2025-05-01",
        time: "9:00 AM",
        category: "Appointments",
        username: "Faiz",
    },
];

// User authentication
const authenticate = (req, res, next) => {
    const { username } = req.body;
    if (!username || !users.find((user) => user.username === username)) {
        return res
            .status(403)
            .json({ message: "Unauthorized. Please register first." });
    }
    req.user = { username };
    next();
};

// User registration
app.post("/register", (req, res) => {
    const { username } = req.body;
    if (users.find((user) => user.username === username)) {
        return res.status(400).json({ message: "User already exists" });
    }
    users.push({ username }); // Store only username
    res.status(201).json({ message: "User registered successfully." });
});

// User login
app.post("/login", (req, res) => {
    const { username } = req.body;
    if (!users.find((user) => user.username === username)) {
        return res
            .status(400)
            .json({ message: "User not found. Please register." });
    }
    res.json({
        message: "Login successful. You can now create and view events.",
    });
});

// Event creation
app.post("/events", authenticate, (req, res) => {
    const { name, description, date, time, category } = req.body;
    if (!name || !date || !time || !category) {
        return res.status(400).json({ message: "All fields are required" });
    }
    events.push({
        name,
        description,
        date,
        time,
        category,
        username: req.user.username,
    });
    res.status(201).json({ message: "Event created successfully" });
});

app.get("/events", authenticate, (req, res) => {
    res.json(events.filter((event) => event.username === req.user.username));
});

// Get Events by Category
app.get("/events/category/:category", authenticate, (req, res) => {
    res.json(
        events.filter(
            (event) =>
                event.category === req.params.category &&
                event.username === req.user.username,
        ),
    );
});

// Get Upcoming Events Sorted by Date
app.get("/events/upcoming", authenticate, (req, res) => {
    const upcomingEvents = events
        .filter((event) => event.username === req.user.username)
        .sort((a, b) => new Date(a.date) - new Date(b.date));
    res.json(upcomingEvents);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;