require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const authRoute = require("./routes/auth");
const cookieSession = require("cookie-session");
const passportStrategy = require("./passport");
const LoginRoute = require("./routes/login");
const tagsRoutes = require("./routes/tags");
const questionRoutes = require("./routes/questionRoutes"); // Added missing route from second code
const userProfile = require("./routes/userProfile.js");
const departments = require("./routes/departments.js");
const collectives = require("./routes/collectives.js");
const app = express();
const db = require("./db");


app.use(
    cookieSession({
        name: "session",
        keys: ["cyberwolve"],
        maxAge: 24 * 60 * 60 * 100,
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
    cors({
        origin: "http://localhost:3000",
        methods: "GET,POST,PUT,DELETE",
        credentials: true,
    })
);

app.use(express.json());

// Test DB connection
db.query("SELECT 1")
    .then(() => console.log("MySQL connection works!"))
    .catch((err) => console.error("DB connection error:", err));

// Routes
app.use(express.json());
app.use("/api/tags", tagsRoutes);
app.use("/auth", authRoute);
app.use("/api/questions", questionRoutes);
app.use("/api", LoginRoute);
app.use("/api/user", userProfile);
app.use("/api/departments", departments);
app.use("/api/collectives", collectives);


const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));
