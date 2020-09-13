const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new Schema(
    {
        movieID: {
            type: Number,
            ref: "Movie ID",
            required: true,
            trim: true,
        },
        movieName: {
            type: String,
            ref: "Movie Name",
            required: true,
            trim: true,
        },
        movieGenre: {
            type: String,
            required: true,
            trim: true,
        },
        movieDescription: {
            type: String,
            required: true,
            trim: true,
        },
        movieCast: {
            type: String,
            ref: "Cast",
            required: true,
            trim: true,
        },
        movieRating: {
            type: Number,
            required: true,
            trim: true,
        },
        movieYear: {
            type: Number,
            required: true,
            trim: true,
        }
    }
);

module.exports = mongoose.model("movies", movieSchema);