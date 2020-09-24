const bodyParser = require("body-parser");
const fs = require('fs')
const path = require('path')
const moviesModel = require('../models/moviesModel')
const screensModel = require('../models/screensModel')

let controller = {
    createScreenPageRender: (req, res) => {
        res.render("sparkflix/createScreen.handlebars", {
            layout: "sfAppLayout",
            style: "",
            movies: "",
            title: "Create Screen",
            navBar: 1,
            createScreen: " active",
            screens: ""
        })
    },
    screensPageRender: (req, res) => {
        screensModel.find({}, { _id: 0 }).then(details => {
            res.render("sparkflix/screens.handlebars", {
                layout: "sfAppLayout",
                style: "screens",
                movies: "",
                title: "Screens",
                createScreen: "",
                navBar: 1,
                screens: " active",
                details
            })
        })
    }, screenStreamRender: (req, res) => {
        screensModel.findOne({ screenID: req.params.sID }, { _id: 0 }).then(details => {
            res.render("sparkflix/screenStream.handlebars", {
                layout: "sfAppLayout",
                style: "screenStream",
                movies: "",
                title: "Screens",
                createScreen: "",
                navBar: 1,
                screens: " active",
                details
            })
        })

    },
    moviesPageRender: (req, res) => {
        moviesModel.find({}, { _id: 0 }).then(detail => {
            res.render("sparkflix/movies.handlebars", {
                layout: "sfAppLayout",
                style: "movies",
                movies: " active",
                title: "Movies",
                createScreen: "",
                screens: "",
                navBar: 1,
                detail
            })
        })
    },
    movieStreamPageRender: (req, res) => {
        moviesModel.findOne({ movieID: req.params.mID }, { _id: 0 }).then(detail => {
            const path = 'src/views/public/assets/videos/' + req.params.mID + '.mp4'
            if (!fs.existsSync(path)) {
                return res.render("sparkflix/movieStream.handlebars", {
                    layout: "sfAppLayout",
                    movies: " active",
                    style: "movieStream",
                    title: "Movies",
                    createScreen: "",
                    screens: "",
                    detail,
                    navBar: 1,
                    message: "Movie Not Found.Please Try Some other one"
                })
            }
            res.render("sparkflix/movieStream.handlebars", {
                layout: "sfAppLayout",
                style: "movieStream",
                movies: " active",
                title: "Movies",
                createScreen: "",
                screens: "",
                navBar: 0,
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