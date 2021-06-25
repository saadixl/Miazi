# Miazi
My work in-progress cloud assistant to play with microservices


## If you're interested to run this project you can follow the steps below:
- Clone the project in your machine
- Make sure you have docker
- Create a .env file like following in the project root directory
```
MAILGUN_USERNAME=username@your-domain.tld
MAILGUN_PASSWORD=YourSuperSecretPassword
RECIPIENT_EMAIL=recipient_email@domain.tld
SENDER_EMAIL=sender_email@domain.tld
```
- Go inside `/services/mailman`, `/services/newsfeed`, `/services/publisher`, `/services/subscriber` and run `npm -i`. For now you have to do it manually like this; I haven't created an installer yet.
- Finally from the root folder run `docker-compose up --build`
- NOTE: Currently the news updates will be sent to you every 6 hours. You can change the `CRON_PATTERN_EVERY_SIX_HOURS` pattern under `/services/publisher/constants.js` to get the news earlier. See [here](https://crontab.guru/) for learning patterns.
