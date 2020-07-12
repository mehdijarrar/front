importScripts('https://www.gstatic.com/firebasejs/7.6.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.6.0/firebase-messaging.js');
firebase.initializeApp({
    apiKey: "AIzaSyDzvceaL1ui2bleYI5Oc6RkenXQXXcAfJc",
    authDomain: "association-cfbcd.firebaseapp.com",
    databaseURL: "https://association-cfbcd.firebaseio.com",
    projectId: "association-cfbcd",
    storageBucket: "association-cfbcd.appspot.com",
    messagingSenderId: "369582069125",
    appId: "1:369582069125:web:446bf3f84c4f6a6209a0ec",
    measurementId: "G-S4NJWSCT13"
});
const messaging = firebase.messaging();