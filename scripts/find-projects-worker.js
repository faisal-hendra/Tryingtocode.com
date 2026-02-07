import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
//import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyABP5ADKcI2zC2ZdQ3pSUkuc1wmwBIbcwo",
  authDomain: "trying-to-code-eff09.firebaseapp.com",
  projectId: "trying-to-code-eff09",
  storageBucket: "trying-to-code-eff09.firebasestorage.app",
  messagingSenderId: "1085828579973",
  appId: "1:1085828579973:web:c4acd444e1d9469d5a1fec",
  measurementId: "G-7TREL4ZC4F"
};

const app = initializeApp(firebaseConfig);
//const auth = getAuth(app);
const db = getFirestore(app);

self.onerror = (error) => {
    console.error(error);
}

let retrieveProject = (details) => {
    console.log(details);

    if(typeof details.database === "undefined") { 
        console.error("no database selected");
        postMessage(null);
        return null; 
    }

    console.log("finding project....");
    const projectRef = doc(db, "projects", details.database);
    getDoc(projectRef).then((data) => {
        const updatedSnap = data;
        console.log(updatedSnap);
    });
    
    console.log(projectRef);
    //postMessage(projectRef);

    /* line 361 in firebase.js

    const projectRef = doc(db, "projects", user.uid, section, title);
    let obj = {
        title: title,
        data: data,
        lastUpdated: serverTimestamp()
    };
    try {
        await setDoc(projectRef, obj, {merge: true});
    }catch (error){
        console.error("oops. That project did not set well.", error);
        console.log(user, user.uid, section, projectId);
        return error;
    }
    */
}

let initApp = (details) => {
    self.app = details.app;
    self.db = getFirestore(self.app);
}



const COMMANDS = {
    retrieveProject: retrieveProject,
    initApp: initApp
}

let findCommand = (commandName, details={}) => {
    if(typeof COMMANDS[commandName] === "undefined") { console.error("no command : ", commandName, ": exists in find-project-worker.js"); return null; }

    COMMANDS[commandName](details);
}

self.onmessage = (message) => {
    console.log("doing anything!", message);
    findCommand(message.data['cmd'], message.data);
}