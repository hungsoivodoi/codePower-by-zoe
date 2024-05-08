import express from "express";

let configViewEngine = (app) => {
    //arrow func
    app.use(express.static("./src/public"));
    app.set("view engine", "ejs");
    app.set("views", "./src/views")
}

module.exports = configViewEngine;