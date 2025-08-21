inventory-app/
├── index.html          ← Login & Dashboard
├── style.css           ← Basic styles
├── app.js              ← Firebase Auth & Firestore logic
├── firebase.json       ← Hosting config (optional)


✅ How to Use Firebase with Hostinger

You can host the frontend (HTML, JS, CSS) on Hostinger and still use Firebase Authentication and Firestore.

✅ Steps:

Create your project (HTML/JS/CSS)

Use the files I shared earlier (index.html, app.js, style.css)

Insert your Firebase config in app.js

Upload files to Hostinger

Use Hostinger's File Manager or FTP to upload your project to public_html or your preferred folder.

Allow Firebase to use your Hostinger domain

In Firebase Console > Auth > Settings > Authorized domains

Add your domain (e.g., yourdomain.com)

Test

Go to https://yourdomain.com and check if login + Firestore works

⚠️ Important Notes

No PHP or MySQL needed — Firebase handles Auth + Database

No backend server needed

Make sure your Hostinger hosting is for static or JS-supported files, not just WordPress

npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
