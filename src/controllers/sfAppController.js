const bodyParser = require("body-parser");
const moviesModel = require('../models/moviesModel')
const screensModel = require('../models/screensModel')

let controller = {
    createScreenPageRender: (req, res) => {
        res.render("sparkflix/createScreen.handlebars", {
            layout: "sfAppLayout",
            movies: "",
            title: "Create Screen",
            createScreen: " active",
            screens: ""
        })
    },
    screensPageRender: (req, res) => {
        screensModel.find({}, { _id: 0 }).then(details => {
            res.render("sparkflix/screens.handlebars", {
                layout: "sfAppLayout",
                movies: "",
                title: "Screens",
                createScreen: "",
                screens: " active",
                details
            })
        })
    },
    moviesPageRender: (req, res) => {
        moviesModel.find({}, { _id: 0 }).then(detail => {
            res.render("sparkflix/movies.handlebars", {
                layout: "sfAppLayout",
                movies: " active",
                title: "Movies",
                createScreen: "",
                screens: "",
                detail
            })
        })
    }
}

module.exports = controller