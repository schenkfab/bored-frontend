# Messaging Application Frontend
Udacity Capsone Project: Senior Web Development

## Important Information
This progressive web application was created as part of the Udacity Senior Web Development Nanodegree and relies on browser functions that are likely to change in the near future. Some features that do not work:
- The "offline mode" from google chrome does not trigger navigation.onLine. If the offline-first functionallity of this demo applicaton has to be tested, the network connection has to be *disconnected*.
- Push Notifications: Those only work using localhost as a domain or a https connection. This can not be tested while hosting locally without using localhost.

## Installation
Before you can use this, you need to be running [https://github.com/schenkfab/bored-backend](Bored-Backend)

Furthermore you need to create a [https://console.firebase.google.com/](Google Firebase) account and project and get the Cloud Messaging Server key and Sender ID.

Add the Sender ID from Firebase to the manifest.json file

Run both 
```
bower install
```
and
```
npm install
```

## Start
### Development
Start the development build using:
```
gulp serve:dev
```
### Production
Start the production build using:
```
gulp build:prod
```