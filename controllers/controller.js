const express = require("express");
const axios = require("axios")
//all the routes being routed here, no need to use "express.Router()"
// controller function is to handler all the logic
const API_KEY = "Rd3VRDQoDp";
// all my keys are free, so its ok not to set an env variable

var unirest = require('unirest');



exports.renderHomePage = (req, res) => {
  const currentYear = new Date().getFullYear();


  res.render("index", {
    _currentYear: currentYear
  });
}


exports.getWord = (req, res) => {
  const currentYear = new Date().getFullYear();
  var inputWord = req.body.inputWord;

  const URL = `https://voicecup.com/api?key=Rd3VRDQoDp&q=${inputWord}&lang=eng`;
  var startPoint ="";
  var endDuration = "";
  var audioPart = "";
  var title ="";
  var subs_id ="";
  var finalURL = "";
  var error = "";
  const objectArray = [];
  // axios.get(URL).then((response) => {
  //   console.log(response.data.hits.length);
  //   var audiolength = response.data.hits.length;
  //   for (var i = 0; i < audiolength; i++) {
  //     const {id, start, body, duration, filename_audio} = response.data.hits[i];
  //     finalURL = `https://voicecup.com/play?key=${API_KEY}&filename=${filename_audio}&filetype=mp4&start=${start}&duration=${duration}&subs_id=${id}`;
  //     var object = {
  //       "url": finalURL,
  //       "title": body,
  //     }
  //     objectArray.push(object);
  //   }
  //
  //
  //   res.render("index", {
  //     _objectArray: objectArray,
  //     _inputWord: inputWord,
  //     _currentYear: currentYear,
  //   });



  // }).catch((err) => {
  //   console.log(err);
  //   error = err;
  //   res.render("index", {
  //     _error : "No Results, try another word.",
  //     _currentYear: currentYear,
  //   });
  // });



  var request = unirest("GET", "https://mashape-community-urban-dictionary.p.rapidapi.com/define");
  request.query({
  "term": inputWord
  });

  request.headers({
    "x-rapidapi-host": "mashape-community-urban-dictionary.p.rapidapi.com",
    "x-rapidapi-key": "6f31b66feemshf5ce006ba4fbc2fp190221jsn4dd00294079a",
    "useQueryString": true
  });

  var wordObject = {
    definition: "",
    example: "",
    soundUrl: "",
  }
  request.end(function (respond) {

    if (respond.error) {
      throw new Error(res.error);
      res.render("index", {
        _error : "No Results, try another word.",
        _currentYear: currentYear,
      });
    }
    console.log(respond.body.list[0]);
    if (typeof respond.body.list[0] == 'undefined') {
      res.render("index", {
        _error : "No Results, try another word.",
        _currentYear: currentYear,
      })
    } else {
      wordObject.definition = respond.body.list[0].definition;
      wordObject.example = respond.body.list[0].example;
      wordObject.soundUrl = respond.body.list[0].sound_urls[0];

      var sanitizedDefinition = wordObject.definition.replace(/\[|\]/g,""); // use regex to get rid of "[" "]""
      // learn regex through : https://www.youtube.com/watch?v=rhzKDrUiJVk
      wordObject.definition = sanitizedDefinition;

      var sanitizedExample = wordObject.example.replace(/\[|\]/g,""); // use regex to get rid of "[" "]""
        wordObject.example = sanitizedExample;


      axios.get(URL).then((response) => {
        console.log(response.data.hits.length);
        var audiolength = response.data.hits.length;
        for (var i = 0; i < audiolength; i++) {
          const {id, start, body, duration, filename_audio} = response.data.hits[i];
          finalURL = `https://voicecup.com/play?key=${API_KEY}&filename=${filename_audio}&filetype=mp4&start=${start}&duration=${duration}&subs_id=${id}`;
          var object = {
            "url": finalURL,
            "title": body,
          }
          objectArray.push(object);
        }


          res.render("index", {
            _objectArray: objectArray,
            _inputWord: inputWord,
            _currentYear: currentYear,
            _inputWord: inputWord,
              _wordObject : wordObject,
              _audioTitle: "Audio Examples:",
              // _currentYear: currentYear,
          });
        }).catch((err) => {
        // console.log(err);
        error = err;
        res.render("index", {
          _error : "No Results, try another word.",
          _currentYear: currentYear,
        });
      });
    } // end of else statement



  });






}// end of getWord function
