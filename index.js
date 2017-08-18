const express = require('express')
const request = require('request')
var bodyParser = require('body-parser')
var slack = require('slack')

const app = express()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

app.post('/commands', urlencodedParser, (req, res) => {
	console.log('commands');
  res.status(200).end() // best practice to respond with empty 200 status code
  var reqBody = req.body
  var responseURL = reqBody.response_url;
  var message = {
    "text": "Mads has requested a match, @here!",
    "attachments": [
        {
            "fields": [
                {
                    "title": "Players",
                    "value": "1. Mads\n2.\n3.\n4.",
                    "short": true
                },
                {
                    "title": "Substitues (later maybe)",
                    "value": "1. \n2.\n3.\n4.",
                    "short": true
                }

            ]
        },
        {
            "fallback": "Are you ready to join the match?",
            "title": "Are you ready to join the match?",
            "callback_id": "comic_1234_xyz",
            "color": "#5AE664",
            "attachment_type": "default",
            "actions": [
                {
                    "name": "join",
                    "text": "Yes, I'm ready now",
                    "type": "button",
                    "style": "primary",
                    "value": "join"
                },
                {
                    "name": "later",
                    "text": "Later maybe",
                    "type": "button",
                    "value": "later"
                }
            ]
        }
    ]
}
var token = reqBody.token
var channel = reqBody.channel.id
slack.chat.postMessage({token, channel, message}, (err, data) => { console.log('yo')})


//  sendMessageToSlackResponseURL(responseURL, message)
})


app.post('/actions', urlencodedParser, (req, res) => {
  res.status(200).end()
  const actionJSONPayload = JSON.parse(req.body.payload) // parse URL-encoded payload JSON string
  console.log(actionJSONPayload);
  const message = {
    "text": actionJSONPayload.user.name+" clicked: "+actionJSONPayload.actions[0].name,
    "replace_original": false
  }
  //sendMessageToSlackResponseURL(actionJSONPayload.response_url, message)
  const token = actionJSONPayload.token;
  const ts = actionJSONPayload.message_ts;
  const channel = actionJSONPayload.channel.id;
  const text = "How goes";
	slack.chat.update({token, ts, channel, text}, (err, data) => {
		console.log(err);
		console.log(data);
	})

})
/*
/*
app.post('/commands/play', urlencodedParser, (req, res) =>{
    res.status(200).end() // best practice to respond with empty 200 status code
    var reqBody = req.body
    var responseURL = reqBody.response_url
    if (reqBody.token != YOUR_APP_VERIFICATION_TOKEN){
        res.status(403).end("Access forbidden")
    }else{
        var message = {
            "text": "This is your first interactive message",
            "attachments": [
                {
                    "text": "Building buttons is easy right?",
                    "fallback": "Shame... buttons aren't supported in this land",
                    "callback_id": "button_tutorial",
                    "color": "#3AA3E3",
                    "attachment_type": "default",
                    "actions": [
                        {
                            "name": "yes",
                            "text": "yes",
                            "type": "button",
                            "value": "yes"
                        },
                        {
                            "name": "no",
                            "text": "no",
                            "type": "button",
                            "value": "no"
                        },
                        {
                            "name": "maybe",
                            "text": "maybe",
                            "type": "button",
                            "value": "maybe",
                            "style": "danger"
                        }
                    ]
                }
            ]
        }
        sendMessageToSlackResponseURL(responseURL, message)
    }
})


*/
function sendMessageToSlackResponseURL(responseURL, JSONmessage){
    var postOptions = {
        uri: responseURL,
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        json: JSONmessage
    }
    request(postOptions, (error, response, body) => {
        if (error){
            // handle errors as you see fit
        }
    })
}