const mongoose = require("mongoose");

const lastStoppedSchema = new mongoose.Schema(
    {
        season: {
            type: Number,
            required: true,
            min: 0,
            default: 0
        },
        episode: {
            type: Number,
            required: true,
            min: 0,
            default: 0
        },
        time: {
            type: String,
            trim: true,
            default: ""
        }
    },
    {
        _id: false
    }
);

const postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        content: {
            type: String,
            required: true,
            trim: true
        },
        author: {
            type: String,
            required: true,
            trim: true
        },
        itemType: {
            type: String,
            enum: ["movie", "series"],
            required: true,
            default: "movie"
        },
        tags: {
            type: [String],
            default: []
        },
        lastStopped: {
            type: lastStoppedSchema,
            default: function () {
                return {
                    season: 0,
                    episode: 0,
                    time: ""
                };
            }
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Post", postSchema);