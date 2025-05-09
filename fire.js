import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCXO7gQjpaoWXc_N6xkF1fiydSxCZXvSIM",
  authDomain: "voice-of-women-619c8.firebaseapp.com",
  databaseURL: "https://voice-of-women-619c8-default-rtdb.firebaseio.com", // Ensure this is correct
  projectId: "voice-of-women-619c8",
  storageBucket: "voice-of-women-619c8.appspot.com",
  messagingSenderId: "232824715295",
  appId: "1:232824715295:web:608498a918f2bbe11e7d2a",
  measurementId: "G-0SBDJYE9KK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);
console.log("Firebase initialized:", app);
console.log("Database initialized:", database);

// Function to add user to Firebase
export function addUser(aadhar, password) {
  console.log("addUser called");
  set(ref(database, `users/${aadhar}`), {
      password: password,
      timestamp: new Date().toISOString(),
  })
  .then(() => {
      console.log("User data written to database");
  })
  .catch((error) => {
      console.error("Error writing user data:", error);
  });
}


async function validateLogin(address, password) {
    try {
      const dbRef = ref(database);
      const userSnap = await get(child(dbRef, `users/${address}`)); // ✅ Check if user exists
  
      if (userSnap.exists()) {
        const userData = userSnap.val(); // ✅ Use .val() instead of .data()
  
        if (userData.password === password) {
          alert("✅ Login Successful!");
          window.location.href = "main.HTML"; // ✅ Redirect after successful login
        } else {
          alert("❌ Incorrect password!");
        }
      } else {
        alert("❌ Number not found! Please register.");
      }
    } catch (error) {
      console.error("⚠ Login Error:", error);
      alert("⚠ An error occurred. Please try again later.");
    }
  }
  
  // ✅ Export the function so it can be used in Login.html
  export { validateLogin };
  
export function sendLocationToDatabase(userId, latitude, longitude) {
    console.log("sendLocationToDatabase called");
    console.log(`Sending location for userId: ${userId}, latitude: ${latitude}, longitude: ${longitude}`);
    set(ref(database, `locations/${userId}`), {
        latitude: latitude,
        longitude: longitude,
        timestamp: new Date().toISOString(),
    })
    .then(() => {
        console.log("Location data written to database");
        alert("📍 Location sent successfully!");
    })
    .catch((error) => {
        console.error("Error sending location:", error);
        alert("⚠ Failed to send location. Please try again.");
    });
}

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded and parsed.");

    const sosButton = document.getElementById("sos-button");
    if (!sosButton) {
        console.error("SOS button not found in the DOM.");
        return;
    }

    console.log("SOS button found in the DOM.");

    sosButton.addEventListener("click", (event) => {
        event.preventDefault();
        console.log("SOS button clicked");

        if (navigator.geolocation) {
            console.log("Geolocation API is supported.");
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;

                    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

                    const userId = "123456789012"; // Example user ID
                    sendLocationToDatabase(userId, latitude, longitude);
                },
                (error) => {
                    console.error("Error getting location:", error);
                    alert("⚠ Unable to retrieve location. Please enable location services.");
                }
            );
        } else {
            console.error("Geolocation API is not supported by this browser.");
        }
    });
});

function testFirebaseConnection() {
  const testRef = ref(database, "test");
  set(testRef, { message: "Firebase is connected!" })
    .then(() => {
      console.log("Test data written to Firebase successfully!");
    })
    .catch((error) => {
      console.error("Error writing test data to Firebase:", error);
    });
}

testFirebaseConnection();

// Example of writing to the database directly
const data = {
  exampleField: "exampleValue",
  anotherField: 123,
};

firebase.database().ref('/123456789012').set(data, (error) => {
  if (error) {
    console.error('Error writing to database:', error.message);
  } else {
    console.log('Data written successfully');
  }
});