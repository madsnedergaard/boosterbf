const express = require('express')
const request = require('request')
var bodyParser = require('body-parser')
var slack = require('slack')

require('dotenv').config()
var token = process.env.SLACK_TOKEN

const app = express()
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var message = {
  text: "Nogen der er klar på en kamp, <!here>?",
  attachments: [
  {
    fields: [
    {
      "title": "Spillere",
      value: "1.\n2.\n3.\n4.\n",
      "short": true
    }
    // {
    //   "title": "Substitues (later maybe)",
    //   "value": "1. \n2.\n3.\n4.",
    //   "short": true
    // }

    ]
  },
  {
    "fallback": "Er du klar på et spil?",
    "title": "Er du klar på et spil?",
    "callback_id": "comic_1234_xyz",
    "color": "#000",
    "attachment_type": "default",
    "actions": [
    {
      "name": "join",
      "text": "Så klar!",
      "type": "button",
      "style": "primary",
      "value": "join"
    }
    // {
    //   "name": "later",
    //   "text": "Later maybe",
    //   "type": "button",
    //   "value": "later"
    // }
    ]
  }
  ]
}

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

// User requests new match
app.post('/commands', urlencodedParser, (req, res) => {
  console.log('commands');
  res.status(200).end() // best practice to respond with empty 200 status code
  var reqBody = req.body

  var responseURL = reqBody.response_url;
    slack.chat.postMessage({
        token: token, 
        channel: reqBody.channel_id, 
        text: message.text,
        link_names: 1,
        attachments: message.attachments
    }
    , 
    (err, data) => { 
      console.log('ERR: --------', err);
      console.log('DATA: --------', data);
    })
})


app.post('/actions', urlencodedParser, (req, res) => {
  console.log('actions');
  res.status(200).end()
  const actionJSONPayload = JSON.parse(req.body.payload) // parse URL-encoded payload JSON string
  console.log(actionJSONPayload);

  const newList = addPlayerToList(actionJSONPayload.user.name,message.attachments);

  slack.chat.update({
    token: token, 
    channel: actionJSONPayload.channel.id, 
    text: message.text,
    attachments: newList,
    link_names: 1,
    ts: actionJSONPayload.message_ts
  }
  , 
  (err, data) => { 
    console.log('ERR: --------', err);
    console.log('DATA: --------', data);
  })
})


function addPlayerToList(player, list) {
  // Check if self exists in list
  var field = list[0].fields[0].value;
  if (field.indexOf(player) !== -1) {
    return list;
  }
  if (field.indexOf('1.\n') !== -1) {
    list[0].fields[0].value = field.replace('1.', '1. ' + player);
  } else if (field.indexOf('2.\n') !== -1) {
    list[0].fields[0].value = field.replace('2.', '2. ' + player);
  } else if (field.indexOf('3.\n') !== -1) {
    list[0].fields[0].value = field.replace('3.\n', '3. ' + player + '\n');
  } else if (field.indexOf('4.\n') !== -1) {
    list[0].fields[0].value = field.replace('4.\n', '4. ' + player + '\n');
    list = gameReadyMessage(list);
  } else {
    // List is full
  }
  return list;
}

function gameReadyMessage(list) {
  var field = list[0].fields[0].value;
  var names = field.match(/([A-Z])\w+/gi);
  for (var i = 0; i < names.length; i++) {
    names[i] = '<@' + names[i] + '>';
  }
  var nameString = names.join(', ');
  list[1].fallback = 'All set, let\'s go! \n('+nameString+')';
  list[1].title = 'All set, let\'s go! \n('+nameString+')';
  list[1].color = '#5AE664';
  list[1].actions = [];

  return list;
}
