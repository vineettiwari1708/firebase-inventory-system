// Your Firebase config from project settings
const firebaseConfig = {
  apiKey: "YOUR_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID"
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
  const name = document.getElementById("itemName").value;
  const qty = parseInt(document.getElementById("itemQty").value);
  if (!name || isNaN(qty)) return alert("Invalid input");

  db.collection("inventory").add({ name, quantity: qty });
}

function loadInventory() {
  const list = document.getElementById("inventory-list");
  list.innerHTML = "";
  db.collection("inventory").onSnapshot(snapshot => {
    list.innerHTML = "";
    snapshot.forEach(doc => {
      const data = doc.data();
      const div = document.createElement("div");
      div.textContent = `${data.name}: ${data.quantity}`;
      list.appendChild(div);
    });
  });
}
