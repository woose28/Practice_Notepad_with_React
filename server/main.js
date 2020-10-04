import express from 'express';
import path from 'path';
import webpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';
import session from 'express-session';

import api from "./routes";

const app = express();

const db = mongoose.connection;
db.on("error", console.error);
db.once("open", ()=>{console.log("Connected to mongodb server");});
mongoose.connect("mongodb://localhost/Memo_app_tuts");

app.use(session({
  secret: "Woose$1$234",
  resave: false,
  saveUninitialized: true
}));

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use("/api", api);

const port = 3000;
const devPort = 4000;

app.use("/", express.static(path.join(__dirname,"./../public/")));


app.get("*", (req, res)=>{
  res.sendFile(path.resolve(__dirname,"./../public/index.html"));
});


app.get("/hello", function(req, res){
  return res.send("Hello~ This is NodePad");
});

app.listen(port, ()=>{
  console.log("Express is Listening on Port : ",port);
});

if(process.env.NODE_ENV == 'development'){
  console.log("Server is running on development mode");
  const config = require("../webpack.dev.config");
  const compiler = webpack(config);
  const devServer = new webpackDevServer(compiler, config.devServer);
  devServer.listen(devPort, () => {
      console.log('webpack-dev-server is listening on port :', devPort);
  });
}
