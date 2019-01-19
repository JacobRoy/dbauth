import * as functions from 'firebase-functions';
import * as firebase from 'firebase-admin';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
firebase.initializeApp(functions.config().firebase);
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.addMessage = functions.https.onCall((data) => {
    const message = data.text;
    console.log(message);
    const newId = Math.floor(Math.random()*4000)+1000;
    // return firebase.database().ref('participants/'+newId).set({
    //     id: newId,
    //     name: message
    // });
    const postData = {
        id : newId,
        name: message
    }
    const newPostKey = firebase.database().ref().child('participants').push().key;
    let updates = {};
    updates['/participants/' + newPostKey]= postData;
    return firebase.database().ref().update(updates);
    // return {
    //     text: "Welcome "+message+"!"
    // }
  });

  export const onAddition = functions.database.ref('/participants/{pId}').onCreate((snapshot,context)=>{
    const newMember = context.params.pId;
    console.log(newMember);
    if(snapshot.ref.parent){
        if(snapshot.ref.parent.parent){
            const countRef = snapshot.ref.parent.parent.child('count');
        return countRef.transaction(count =>{
            return count +1
        })
        }
    }

    return snapshot.ref;
   
    
});

export const onDeletion = functions.database.ref('/participants/{pId}').onDelete((snapshot,context)=>{
    if(snapshot.ref.parent){
        if(snapshot.ref.parent.parent){
            const countRef = snapshot.ref.parent.parent.child('count');
        return countRef.transaction(count =>{
            return count -1
        })
        }
    }

    return snapshot.ref;
   
    
});