# Telegram Bot
Welcome to the "Search and Message Admins" Bot.

## ENV Config
* BOT_API_KEY   `[Required]`
 Api key generated from BOT Father BOT in telegram
* APP_API_ID    `[Required]`
Api Id generated from  [my.telegram.org/app](http://my.telegram.org/app)
* APP_API_HASH  `[Required]`
Api Hash generated from  [my.telegram.org/app](http://my.telegram.org/app)
* STRING_SESSION    `[Step 5]`
 Session String Generated in Login.js
----------
1. Fill all the Env Variables with required tag
2. Run `npm run login`
3. Enter your phone number
4. Enter the code recived on your telegram messenger
5. Copy paste the given  String to STRING_SESSION in env config
6. Upon Login you should recive a message with the same account on telegram
7. Run on Local Machine `npm run dev`
8. Run Production on Heroku after setting up configs of Production `npm start`


## Methods
* Get Admins Name
  `[GET]` {url}/getAdminOfGroup/:groupName

* Send Message to Admins
  `[POST]` {url}/msgAdminOfGroup/:groupName
  JSON BODY  {"message":"Your custom message"}