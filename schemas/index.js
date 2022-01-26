const mongoose = require("mongoose");

const connect = () => {
    mongoose.connect("mongodb://localhost:27017/gon", {ignoreUndefined: true }).catch((err) => {
        console.log(err);
    });
};

module.exports = connect;