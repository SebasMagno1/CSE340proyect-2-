const express = require("express");
const path = require("path");
require("dotenv").config();

const organizationRoutes = require("./src/routes/organizations");
const projectRoutes = require("./src/routes/projects");
const categoryRoutes = require("./src/routes/categories");

const app = express();

const PORT = process.env.PORT || 3000;

// View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static files
app.use(express.static(path.join(__dirname, "public")));

// Home
app.get("/", (req, res) => {
    res.render("index", {
        title: "Service Projects"
    });
});

// Routes
app.use("/", organizationRoutes);
app.use("/", projectRoutes);
app.use("/", categoryRoutes);

// 404
app.use((req, res) => {
    res.status(404).render("index", {
        title: "Page Not Found"
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err);

    res.status(500).send(
        "Sorry, an unexpected error occurred."
    );
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});