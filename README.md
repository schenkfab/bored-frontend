# Messaging Application Frontend
Udacity Capsone Project: Senior Web Development

## Installation
Before you can use this, you need to be running (Bored-Backend)[https://github.com/schenkfab/bored-backend]

Furthermore you need to create a (Google Firebase)[https://console.firebase.google.com/] account and project and get the Cloud Messaging Server key and Sender ID.

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