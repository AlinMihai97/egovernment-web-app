
var firebaseConfig = {
    apiKey: "AIzaSyBdRJfl68JdiHPKrYwYp76x9te3c2E3u08",
    authDomain: "egovernment-app.firebaseapp.com",
    databaseURL: "https://egovernment-app.firebaseio.com",
    projectId: "egovernment-app",
    storageBucket: "egovernment-app.appspot.com",
    messagingSenderId: "956640223099",
    appId: "1:956640223099:web:d3daad042a06d24c8ba7de"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var firestore = firebase.firestore()
  var docRef = firestore.collection("users").doc("GS61HRGMpL0ZOpJkWVXq")
  const textFieldObj = document.querySelector("#my-input")
  const saveButtonObj = document.querySelector("#save-button")
  saveButtonObj.addEventListener("click" , function() {
      const textToSave = textFieldObj.value
      console.log(textToSave)
      docRef.set({
          name: textToSave
      }).then(
          success => {
              console.log("Succesfully saved data")
          },
          error => {
              console.log(errro)
          }
      )
  })