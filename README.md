# simplesheet
I use this project for two reasons:
- To learn and train new technical stuff, e.g., Typescript
- Compare Libraries that provide excel like usability

## Installing and Configuring the App

After cloning this repository, do an npm install.

You will need a Mongo DB instance to run this App. The connection string and the db name can be set in the .env file.
å
Now you are ready to go.


## Script
npm run test - run unit tests
npm build - compile typescript files
npm start 
npm run dev - starts the App with nodemon while compiling all changed typescript files and restarts the App. 


## Using the App
This App has an index page containing links to demo apps of different UI Libraries. 

All these demo apps save the data in the MongoDB Database. The data will always be saved in the same collection, regardless of which app triggers this change.

