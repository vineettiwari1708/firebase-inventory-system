// Replace the following config with your Firebase project config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

auth.onAuthStateChanged(user => {
  if (user) {
    document.getElementById("login-container").style.display = "none";
    document.getElementById("dashboard").style.display = "block";
    loadInventory();
  } else {
    document.getElementById("login-container").style.display = "block";
    document.getElementById("dashboard").style.display = "none";
  }
});

function login() {
  auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
}

function logout() {
  auth.signOut();
}

function addItem() {
  const name = document.getElementById("itemName").value.trim();
  const qty = parseInt(document.getElementById("itemQty").value);
  if (!name || isNaN(qty) || qty < 0) {
    alert("Please enter valid item name and quantity");
    return;
  }

  db.collection("inventory").add({ name, quantity: qty })
    .then(() => {
      document.getElementById("itemName").value = "";
      document.getElementById("itemQty").value = "";
    });
}

function loadInventory() {
  const list = document.getElementById("inventory-list");
  list.innerHTML = "Loading...";
  db.collection("inventory").onSnapshot(snapshot => {
    list.innerHTML = "";
    if (snapshot.empty) {
      list.innerHTML = "No inventory items found.";
      return;
    }
    snapshot.forEach(doc => {
      const data = doc.data();
      const div = document.createElement("div");
      div.textContent = `${data.name}: ${data.quantity}`;
      list.appendChild(div);
    });
  });
}
