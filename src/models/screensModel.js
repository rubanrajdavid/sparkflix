const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const screenSchema = new Schema(
    {
        movieID: {
            type: Number,
            ref: "Movie ID",
            required: true,
            trim: true,
        },
        screenID: {
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
        screenName: {
            type: String,
            required: true,
            trim: true,
        },
    }
);

module.exports = mongoose.model("screens", screenSchema);