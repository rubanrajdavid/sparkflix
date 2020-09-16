const bodyParser = require("body-parser");
const fs = require('fs')
const path = require('path')
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
    },
    movieStreamRender: (req, res) => {
        moviesModel.findOne({ movieID: req.params.mID }, { _id: 0 }).then(detail => {
            const path = 'src/views/public/assets/videos/' + req.params.mID + '.mp4'
            if (!fs.existsSync(path)) {
                return res.render("sparkflix/movieStream.handlebars", {
                    layout: "sfAppLayout",
                    movies: " active",
                    title: "Movies",
                    createScreen: "",
                    screens: "",
                    detail,
                    message: "Movie Not Found.Please Try Some other one"
                })
            }
            res.render("sparkflix/movieStream.handlebars", {
                layout: "sfAppLayout",
                movies: " active",
                title: "Movies",
                createScreen: "",
                screens: "",
                detail
            })
        })
    },
    movieStream: (req, res) => {
        const path = 'src/views/public/assets/videos/' + req.params.mID + '.mp4'
        const stat = fs.statSync(path)
        const fileSize = stat.size
        const range = req.headers.range

        if (range) {
            const parts = range.replace(/bytes=/, "").split("-")
            const start = parseInt(parts[0], 10)
            const end = parts[1]
                ? parseInt(parts[1], 10)
                : fileSize - 1

            const chunksize = (end - start) + 1
            const file = fs.createReadStream(path, { start, end })
            const head = {
                'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunksize,
                'Content-Type': 'video/mp4',
            }

            res.writeHead(206, head)
            file.pipe(res)
        } else {
            const head = {
                'Content-Length': fileSize,
                'Content-Type': 'video/mp4',
            }
            res.writeHead(200, head)
            fs.createReadStream(path).pipe(res)
        }
    }
}

module.exports = controller