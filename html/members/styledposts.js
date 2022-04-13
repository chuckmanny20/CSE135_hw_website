// Test file is correctly linked
// console.log('Check!');

// need these button functions since we are programmatically building the edit and delete buttons
import { editPressed, lastEditPressed, delPressed, lastDelPressed } from "./styled_blog_buttons.js"; 

import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js"
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js';
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth();

// Initialize Cloud Firestore through Firebase
const db = getFirestore();

let numPosts = 0;

// count number of posts
let querySnapshot = await getDocs(collection(db, 'posts'));

numPosts = querySnapshot.docs.length;
let numActualPosts = numPosts;

// keep track of input on add dialog
export let current_title = '';
export let current_date = '';
export let current_sum = '';

export function buildList() {
    // traverse posts
    for( let i = 0; i < numPosts; i++) {
        // create the list item
        let new_item = document.createElement('li');

        // set it from firebase database
        new_item.innerHTML = `<b>Author:</b> ${querySnapshot.docs[i].data()['author']} <b>Title:</b> ${querySnapshot.docs[i].data()['title']} <b>Date:</b> ${querySnapshot.docs[i].data()['date']} <b>Summary:</b> ${querySnapshot.docs[i].data()['summary']} <button id="edit_btn${i}"><img src="pencil.png"></button> <button id="delete_btn${i}"><img src="bin.png"></button>`;

        // append to list
        document.getElementById('blog_list').appendChild(new_item);

        // add event listeners to buttons
        document.getElementById(`edit_btn${i}`).addEventListener('click', editPressed);
        document.getElementById(`delete_btn${i}`).addEventListener('click', delPressed);
    }
}

export async function saveNewPost() {
    // if not set to default value used by cancel button...
    if(document.getElementById('title_input').value != '____' && document.getElementById('date_input').value != '1000-01-01' && 
    document.getElementById('summary_input').value != '____') {
        // get the time of NOW
        let real_current_date = new Date();
        let current_year = real_current_date.getFullYear();
        let current_month = real_current_date.getMonth() + 1;
        let current_day = real_current_date.getDate();
    
        if(parseInt(current_month) < 10) {
            current_month = '0' + current_month;
        }
    
        if(parseInt(current_day) < 10) {
            current_day = '0' + current_day;
        }
    
        let date_string = `${current_year}-${current_month}-${current_day}`

        // add to database
        try {
            let docRefer = await addDoc(collection(db, 'posts'), {
              author: auth.currentUser.email,
              title: current_title,
              date: date_string,
              summary: current_sum
            });
            console.log("Document written with ID: ", docRefer.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }

        // create the list item
        let new_item = document.createElement('li');

        // keep track of total number of posts made so we can addEventListeners w/o conflicts
        numPosts++;

        numActualPosts++;

        // set it
        new_item.innerHTML = `<b>Author:</b> ${auth.currentUser.email} <b>Title:</b> ${current_title} <b>Date:</b> ${date_string} <b>Summary:</b> ${current_sum} <button id="edit_btn${numPosts - 1}"><img src="pencil.png"></button> <button id="delete_btn${numPosts - 1}"><img src="bin.png"></button>`;

        // append to list
        document.getElementById('blog_list').appendChild(new_item);

        // add event listeners to buttons
        document.getElementById(`edit_btn${numPosts - 1}`).addEventListener('click', editPressed);
        document.getElementById(`delete_btn${numPosts - 1}`).addEventListener('click', delPressed);
    }

    // reset input fields (for when they click Add again)
    document.getElementById('title_input').value = '';
    document.getElementById('date_input').value = '';
    document.getElementById('summary_input').value = '';

    // reset current input (for if they click Add and instantly click Ok)
    current_title = '';
    current_date = '';
    current_sum = '';
}

export async function editPost() {
    // update list item
    let list_item = document.getElementById(lastEditPressed).parentElement;

    // update database if stuff has been edited since
    querySnapshot = await getDocs(collection(db, 'posts'));

    // need to re-attach listeners
    let listNumber = lastEditPressed.substring(lastEditPressed.indexOf('btn') + 3);

    // save values for later
    let splicedAuthor = list_item.innerHTML.substring(list_item.innerHTML.indexOf('<b>Author:</b>') + 15, list_item.innerHTML.indexOf(' <b>Title:</b>'));
    let splicedTitle = list_item.innerHTML.substring(list_item.innerHTML.indexOf('<b>Title:</b>') + 14, list_item.innerHTML.indexOf(' <b>Date:</b>'));
    let splicedDate =  list_item.innerHTML.substring(list_item.innerHTML.indexOf('<b>Date:</b>') + 13, list_item.innerHTML.indexOf(' <b>Summary:</b>'));
    let splicedSummary =  list_item.innerHTML.substring(list_item.innerHTML.indexOf('<b>Summary:</b>') + 16, list_item.innerHTML.indexOf(' <button id=\"edit_btn'));
    
    // set it to new values from edit dialog
    list_item.innerHTML = `<b>Author:</b> ${splicedAuthor} <b>Title:</b> ${DOMPurify.sanitize(document.getElementById('title_edit').value, { USE_PROFILES: { html: true } })} <b>Date:</b> ${DOMPurify.sanitize(document.getElementById('date_edit').value,
    { USE_PROFILES: { html: true } })} <b>Summary:</b> ${DOMPurify.sanitize(document.getElementById('summary_edit').value,
    { USE_PROFILES: { html: true } })} <button id="edit_btn${listNumber}"><img src="pencil.png"></button> <button id="delete_btn${listNumber}"><img src="bin.png"></button>`

    // re-attach listeners
    document.getElementById(`edit_btn${listNumber}`).addEventListener('click', editPressed);
    document.getElementById(`delete_btn${listNumber}`).addEventListener('click', delPressed);

    //edit database
    let index_id = -1;
    for(let i = 0; i < numActualPosts; i++) {
        if(querySnapshot.docs[i].data()['author'] === splicedAuthor && querySnapshot.docs[i].data()['title'] === splicedTitle && querySnapshot.docs[i].data()['date'] === splicedDate && querySnapshot.docs[i].data()['summary'] === splicedSummary)
            index_id = querySnapshot.docs[i].id;
    }
    // delete
    await deleteDoc(doc(db, 'posts', index_id));
    // then re-add updated
    try {
        let docRefer = await addDoc(collection(db, 'posts'), {
          author: auth.currentUser.email,
          title: DOMPurify.sanitize(document.getElementById('title_edit').value, { USE_PROFILES: { html: true } }),
          date: DOMPurify.sanitize(document.getElementById('date_edit').value, { USE_PROFILES: { html: true } }),
          summary: DOMPurify.sanitize(document.getElementById('summary_edit').value, { USE_PROFILES: { html: true } })
        });
        console.log("Document written with ID: ", docRefer.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export async function deletePost() {
    // remove from list
    let list_item = document.getElementById(lastDelPressed).parentElement;

    // update database if stuff has been added since
    querySnapshot = await getDocs(collection(db, 'posts'));

    // save values for later
    let splicedAuthor = list_item.innerHTML.substring(list_item.innerHTML.indexOf('<b>Author:</b>') + 15, list_item.innerHTML.indexOf(' <b>Title:</b>'));
    let splicedTitle = list_item.innerHTML.substring(list_item.innerHTML.indexOf('<b>Title:</b>') + 14, list_item.innerHTML.indexOf(' <b>Date:</b>'));
    let splicedDate =  list_item.innerHTML.substring(list_item.innerHTML.indexOf('<b>Date:</b>') + 13, list_item.innerHTML.indexOf(' <b>Summary:</b>'));
    let splicedSummary =  list_item.innerHTML.substring(list_item.innerHTML.indexOf('<b>Summary:</b>') + 16, list_item.innerHTML.indexOf(' <button id=\"edit_btn'));

    // remove from ul
    list_item.parentNode.removeChild(list_item);
    
    // remove from database
    let index_id = -1;
    for(let i = 0; i < numActualPosts; i++) {
        if(querySnapshot.docs[i].data()['author'] === splicedAuthor && querySnapshot.docs[i].data()['title'] === splicedTitle && querySnapshot.docs[i].data()['date'] === splicedDate && querySnapshot.docs[i].data()['summary'] === splicedSummary)
            index_id = querySnapshot.docs[i].id;
    }
    await deleteDoc(doc(db, 'posts', index_id));

    numActualPosts--;
}

export function updateTitle() {
    // purifies user input and grabs from title input
    current_title = DOMPurify.sanitize(document.getElementById('title_input').value, { USE_PROFILES: { html: true } });
}

export function updateDate() {
    // purifies user input and grabs from date input
    current_date = DOMPurify.sanitize(document.getElementById('date_input').value, { USE_PROFILES: { html: true } });
}

export function updateSummary() {
    // purifies user input and grabs from summary input
    current_sum = DOMPurify.sanitize(document.getElementById('summary_input').value, { USE_PROFILES: { html: true } });
}