# Real-Time Leaderboard Web Application
## WORK IN PROGRESS
A web application that displays a real-time leaderboard of users scores that they can submit through the frontend. The frontend uses react.js, along with a number of other packages to create a dynamic user interface.
To send http requests to the backend, it uses axios, but on occasion uses firebase to access the database directly. The backend uses FastAPI and the firebase admin sdk to handle user requests.

## Libraries
### Python
* FastAPI
* Firebase Admin
### Javascript
* TO_DO
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

Firstly, go to the [Firebase console](https://console.firebase.google.com/u/0/) and add a project. Make sure to follow the instructions on screen. Then, on the left sidebar click on all products (3x3 grid of squares), scroll to build and set up a **Realtime Database**. Click on create database and start it in **Test Mode**.
