const mongoose = require("mongoose");
const { Schema } = mongoose;

const articleSchema = new Schema({
    title: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 120
    },
    content: {
        type: String,
        required: true,
        minlength: 100,
        maxlength: 50000
    },
    status: {
        type: String,
        enum: ['draft', 'published'],
        default: 'draft'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Article", articleSchema);
