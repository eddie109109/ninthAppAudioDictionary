// const fs = require('fs');
// const ytdl = require('ytdl-core');
// TypeScript: import ytdl from 'ytdl-core'; with --esModuleInterop
// TypeScript: import * as ytdl from 'ytdl-core'; with --allowSyntheticDefaultImports
// TypeScript: import ytdl = require('ytdl-core'); with neither of the above
const express = require("express");
const app = express();
const path = require("path");
const router = require("./router");

app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.use(express.json()); //convert anything to json


app.set("views","views");
app.set("view engine","hbs");
// look for folder called views

app.use('/', router);
app.use(express.static(path.join(__dirname, 'public')));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is listening at http://localhost:${port}`);
})


// ytdl('http://www.youtube.com/watch?v=A02s8omM_hI')
//   .pipe(fs.createWriteStream('video.flv'));
