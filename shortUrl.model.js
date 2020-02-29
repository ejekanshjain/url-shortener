const mongoose = require('mongoose')
const shortid = require('shortid')

const shortUrlSchema = new mongoose.Schema({
    fullUrl: {
        type: String,
        required: true
    },
    shortUrl: {
        type: String,
        required: true,
        default: shortid.generate()
    },
    clicks: {
        type: Number,
        required: true,
        default: 0
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('shortUrls', shortUrlSchema)