
# BoosterBF

> Let's play bordfodbold!

![Gif](http://i.imgur.com/VoFoAlB.gif)

This Slack app makes coordinating matches easier.

## Flow

1. User calls command `/boosterbf`
2. Bot posts message
3. Other users can either 'join'
4. Bot adds any user that presses 'join' to the list
5. Once 4 users have joined, bot posts new message saying "Let's go!" and changes the previous msg to disable buttons


## Roadmap

- Substitute list / waiting list
- Integrate with Arduino score-tracker
- Post result in channel (e.g. get random "egg" gif when match ends 10-0)


## Message

[Preview](https://api.slack.com/docs/messages/builder?msg=%7B%22text%22%3A%22Mads%20has%20requested%20a%20match%2C%20%40here!%22%2C%22attachments%22%3A%5B%7B%22fields%22%3A%5B%7B%22title%22%3A%22Players%22%2C%22value%22%3A%221.%20Mads%5Cn2.%5Cn3.%5Cn4.%22%2C%22short%22%3Atrue%7D%2C%7B%22title%22%3A%22Substitues%20(later%20maybe)%22%2C%22value%22%3A%221.%20%5Cn2.%5Cn3.%5Cn4.%22%2C%22short%22%3Atrue%7D%5D%7D%2C%7B%22fallback%22%3A%22Are%20you%20ready%20to%20join%20the%20match%3F%22%2C%22title%22%3A%22Are%20you%20ready%20to%20join%20the%20match%3F%22%2C%22callback_id%22%3A%22comic_1234_xyz%22%2C%22color%22%3A%22%235AE664%22%2C%22attachment_type%22%3A%22default%22%2C%22actions%22%3A%5B%7B%22name%22%3A%22join%22%2C%22text%22%3A%22Yes%2C%20I%27m%20ready%20now%22%2C%22type%22%3A%22button%22%2C%22style%22%3A%22primary%22%2C%22value%22%3A%22join%22%7D%2C%7B%22name%22%3A%22later%22%2C%22text%22%3A%22Later%20maybe%22%2C%22type%22%3A%22button%22%2C%22value%22%3A%22later%22%7D%5D%7D%5D%7D)
