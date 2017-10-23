const functions = require('firebase-functions');

exports.addToFollowing = functions.database.ref('follow/{initialUid}/{interestedInFollowingUid}')
  .onCreate(event => {
    const initiatorUid = event.params.initiatorUid;
    const interestedInFollowingUid = event.params.interestedInFollowingUid;
    const rootRef = event.data.ref.root;
    let FollowingMeRef = rootRef.child('usersFollowingMe/' + interestedInFollowingUid + '/' + initiatorUid);
    return FollowingMeRef.set(true);
  });

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
