# Neru SMS Proxy

## History

1. Clone repo
2. update neru with `neru version`
3. Configure Creds `neru configure`
4. Create neru app `neru app create --name "neru-sms-api"`

Do you really want to create application "neru-sms-api" ? (y or n) y
✅ application successfully created - application_name="neru-sms-api" application_id="2c8e9c4e-9e4a-4107-840c-8537eff23f00"

5. Create `neru.yml` with `neru init`.

- Yes to new Project.
- Then Skip and select Nodejs16.
- Instance name: neru-sms-proxy.
- populate application id in neru.yml

6. Update .env, keys and value.
7. Update `neru.yml`

```js
project:
  name: neru-sms-proxy
instance:
  name: neru-sms-proxy
  runtime: nodejs16
  region: aws.use1
  application-id: 2c8e9c4e-9e4a-4107-840c-8537eff23f00
  capabilities: [rtc, messaging]
  entrypoint: [node, index.js]
  configurations:
    contact:
      number: "$VONAGE_NUMBER"
      type: 'phone'
debug:
  name: neru-sms-proxy
  entrypoint: [nodemon, --inspect, index.js]
```

8. Install deps `npm install`

9. Test locally `neru debug`

Notice Application Settings:
Inbound URL:
https://api-us.vonage.com/v1/neru/api/callbacks/?provider=vonage-messaging&action=message-callback&apiApplicationId=2c8e9c4e-9e4a-4107-840c-8537eff23f00&apiAccountId=4f2ff535
Status URL:
https://api-us.vonage.com/v1/neru/api/callbacks/?provider=vonage-messaging&action=message-status-callback&apiApplicationId=2c8e9c4e-9e4a-4107-840c-8537eff23f00&apiAccountId=4f2ff535

## ORIGINAL Neru Vonage API Proxy with SMS Blacklist

Configuration will be at: /conf
Login using APP_ID and API_SECRET

SMS API needs to point to: /sms/json

Sample Curl:

```
curl --location --request POST 'https://<PROXY>/sms/json' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'from=Vonage APIs' \
--data-urlencode 'text=A text message sent using the Vonage SMS API' \
--data-urlencode 'to=<NUMBER>' \
--data-urlencode 'api_key=<KEY>' \
--data-urlencode 'api_secret=<KEY>'
```

Will return `403: Country in Blocked List` if using SMS API and “to” number is in country blacklist. Otherwise, this will act as a straight through proxy for https://rest.nexmo.com.

## This code uses the Neru Serverless Platform

As such, neru needs to be initialized to run this

Read up here: https://vonage-neru.herokuapp.com/neru/overview
