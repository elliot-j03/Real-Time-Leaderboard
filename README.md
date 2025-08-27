# Real-Time Leaderboard Web Application
## WORK IN PROGRESS
A web application that displays a real-time leaderboard of users scores that they can submit through the frontend. The frontend uses react.js, along with a number of other packages to create a dynamic user interface.
To send http requests to the backend, it uses axios, but on occasion uses firebase to access the database directly. The backend uses FastAPI and the firebase admin sdk to handle user requests.

## Libraries
### Python
* FastAPI
* Firebase Admin
### Javascript
* React
* Firebase
* Axios
* Framer-motion
* Fuse.js
## Preview
gifs
## Set-Up
### To try this code out for yourself, please follow the steps below...
To run this project you need both Python and Node.js installed on your system. If you dont' have either, go to the following websites and download the version you need...
* To install Python, go to [python.org](https://www.python.org/downloads/)
* To install Node.js, go to [nodejs.org](https://nodejs.org/en/download)

Once you have both of these, you can start setting up your local repository. First, clone the repository into whichever directory your using with the git clone command
```console
git clone https://github.com/elliot-j03/Real-Time-Leaderboard.git
```
### Frontend
From the main directory, change to the frontend and install the dependecies you'll need using npm
```console
cd frontend
npm install
```
### Backend
Now we can change to the backend directory and create a .venv file by runnning these commands
```console
cd ../backend
python -m venv .venv
```
You need the required modules. To do this you need to activate the python virtual environment
```console
source .venv/Scripts/activate
```
and use pip to download what you need
```console
pip install -r requirements.txt
```
### Firebase
Now that you've got the basic frontend and backend set up, you need to make your own Firebase database. To do this, you need to make your own Firebase project and connect it to the app.<br>

Firstly, go to the [Firebase console](https://console.firebase.google.com/u/0/) and add a project. Make sure to follow the instructions on screen. Then, on the left sidebar click on all products (3x3 grid of squares), scroll to build and set up a **Realtime Database**. Click on create database and start it in **Test Mode**.<br>

Next, you need to add your web app. Click on project settings and go to general. Under **Your Apps**, click **</> Web** and register an app. After creating one, you should have your config object<br>
``` js
const firebaseConfig = {
  apiKey: "API_KEY",
  authDomain: "PROJECT_ID.firebaseapp.com",
  databaseURL: "https://PROJECT_ID.firebaseio.com",
  projectId: "PROJECT_ID",
  storageBucket: "PROJECT_ID.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID",
  measurementID: "MEASUREMENT_ID"
};
```
Using this, you need to create a **.env** file within the frontend directory and fill in the variables with the corresponding
values. Here, you can keep the VITE_API_URL the same because you will be running it on your local host. Please notice how
the strings are no longer marked with a surrounding ""<br>
``` dotenv
VITE_API_URL=http://127.0.0.1:8000
VITE_FIREBASE_API_KEY=API_KEY
VITE_FIREBASE_AUTH_DOMAIN=PROJECT_ID.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET=PROJECT_ID.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=SENDER_ID
VITE_FIREBASE_APP_ID=APP_ID
VITE_FIREBASE_DATABASE_URL=DATABASE_URL
VITE_FIREBASE_MEASUREMENT_ID=MEASUREMENT_ID
```
Now it's time to set up the backend. Go to project settings and find **Service Accounts**. Then, you need to generate a private key which downloads a JSON file. Under the backend directory, create a new folder called **key** and place the JSON file into it.<br>

After doing so, you can rename the file to your choosing, but make sure whatever you change it to is written into the file path provided to intialise_firebase() function which can be found at the top of main.py
``` python
app_firebase = firebase_funcs.initialise_firebase("../key/FILE_NAME_HERE.json")
```
Now you should be all set to get it up an running! To run the frontend, open a terminal in the main folder and run the following commands
```console
cd frontend
npm run dev
```
Then, for the backend, open another terminal and run the following commands
``` console
source .venv/Scripts/activate
cd backend/app
fastapi dev main.py
```
After following all of these steps, the leaderboard should be ready for you to use. Using the address that appears after running the frontend, usually http\://localhost:5173/, you can view the final product.<br>

I hope you enjoy it! :)
