import { getAuth, signInWithEmailAndPassword  } from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js';
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth();

// track authentication
auth.onAuthStateChanged(user => {
    // display user email if logged in
    if(user != null) {
        document.getElementById('user_info').innerText = `Signed in as: ${user.email}`
        document.documentElement.style.setProperty('--logged-in-display', 'block');
        document.documentElement.style.setProperty('--logged-out-display', 'none');
    } else {
        document.getElementById('user_info').innerText = `Sign in to edit blog posts!`
        document.documentElement.style.setProperty('--logged-in-display', 'none');
        document.documentElement.style.setProperty('--logged-out-display', 'block');
    }
})

// login
let loginForm = document.getElementById('login_form');
loginForm.addEventListener('submit', (e) => {
    // stop page refresh instantly
    e.preventDefault();

    // get info typed in
    let email = loginForm['email_input'].value;
    let password = loginForm['password_input'].value;

    signInWithEmailAndPassword(auth, email, password).then(cred => {
        document.getElementById('login_dialog').close();
        // TODO: Show content. Actually, you do this in onAuthStateChanged()
    });
})

// logout
let logoutBtn = document.getElementById('logout_btn');
logoutBtn.addEventListener('click', (e) => {
    // stop page refresh instantly
    e.preventDefault();

    // takes current user and logs them out
    auth.signOut().then(() => {
        // TODO: hide the content. Actually, you do this in onAuthStateChanged()
        console.log('user signed out')
    });
})