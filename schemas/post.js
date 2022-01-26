const mongoose = require("mongoose");

const postSchema = mongoose.Schema({ //schema 생성
    
    // postId: {
    //     type: Number,   //타입 //필수값
    //     unique: true    //유니크값(고유값) 겹치는값이 없어야한다.
    // },
    title: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    pw: {
        type: String,
    },
    memo: {
        type: String,
    },
    Date: {
        type: Date,
        default: new Date
    }    
});

module.exports = mongoose.model("Post", postSchema);