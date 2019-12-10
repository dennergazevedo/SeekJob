import firebase from 'firebase';  
  
  var firebaseConfig = {
    apiKey: "AIzaSyDuGBWWPM1yx1sj9cF6tmyB6TnzN7RtdfQ",
    authDomain: "seekjob-1e7af.firebaseapp.com",
    databaseURL: "https://seekjob-1e7af.firebaseio.com",
    projectId: "seekjob-1e7af",
    storageBucket: "seekjob-1e7af.appspot.com",
    messagingSenderId: "671551140323",
    appId: "1:671551140323:web:9acbc5fe306205cc92b0d6",
    measurementId: "G-KZX7K9EY0L"
  };
  
  /* Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
  */
  
    if ( !firebase.apps.length ) {
      firebase.initializeApp(firebaseConfig);
     }
   
   export default firebase;