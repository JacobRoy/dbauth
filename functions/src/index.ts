import * as functions from 'firebase-functions';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

exports.addMessage = functions.https.onCall((data) => {
    const message = data.text;
    console.log(message);
    return {
        text: "Welcome "+message+"!"
    }
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