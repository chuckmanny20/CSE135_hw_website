import { getAuth } from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js';

const auth = getAuth();

export let lastEditPressed = null;
export let lastDelPressed = null;

export function addPressed() {
    // get the add dialog box and show it when add is clicked
    document.getElementById('adding_dialog').showModal();

    // adding post right now should date should be changed to right now
    // Populate the Date with a new Date Object
    let current_date = new Date();
    let current_year = current_date.getFullYear();
    let current_month = current_date.getMonth() + 1;
    let current_day = current_date.getDate();

    if(parseInt(current_month) < 10) {
        current_month = '0' + current_month;
    }

    if(parseInt(current_day) < 10) {
        current_day = '0' + current_day;
    }

    let date_string = `${current_year}-${current_month}-${current_day}`

    document.getElementById('date_input').value = date_string;
}

export function editPressed(e) {
    // must be logged in to use edit button
    if(auth.currentUser != null) {
        // the img is slightly smaller than the button (look at their boxes in the dev tools!)
        // have to grab parentNode only if img is pressed
        // basically before if you clicked the corners of the button there was a null exception
        if(e.target.localName === 'img')
            lastEditPressed = e.target.parentNode.id;
        else
            lastEditPressed = e.target.id;
        
        //splice values
        let list_item = document.getElementById(lastEditPressed).parentElement;
        
        let splicedTitle = list_item.innerText.substring(list_item.innerText.indexOf('Title:') + 7, list_item.innerText.indexOf(' Date:'));
        let splicedDate =  list_item.innerText.substring(list_item.innerText.indexOf('Date:') + 6, list_item.innerText.indexOf(' Summary:'));
        let splicedSummary =  list_item.innerText.substring(list_item.innerText.indexOf('Summary:') + 9);

        document.getElementById('title_edit').value = splicedTitle;

        // editing post right now should date should be changed to right now
        // Populate the Date with a new Date Object
        let current_date = new Date();
        let current_year = current_date.getFullYear();
        let current_month = current_date.getMonth() + 1;
        let current_day = current_date.getDate();

        if(parseInt(current_month) < 10) {
            current_month = '0' + current_month;
        }

        if(parseInt(current_day) < 10) {
            current_day = '0' + current_day;
        }

        let date_string = `${current_year}-${current_month}-${current_day}`

        document.getElementById('date_edit').value = date_string;
        document.getElementById('summary_edit').value = splicedSummary;

        document.getElementById('editing_dialog').showModal();
    } else {
        document.getElementById('login_prompt_dialog').showModal();
    }
}

export function delPressed(e) {
    // must be logged in to use delete button
    if(auth.currentUser != null) {
        document.getElementById('delete_dialog').showModal();
        
        // the img is slightly smaller than the button (look at their boxes in the dev tools!)
        // have to grab parentNode only if img is pressed
        // basically before if you clicked the corners of the button there was a null exception
        if(e.target.localName === 'img')
            lastDelPressed = e.target.parentNode.id;
        else
            lastDelPressed = e.target.id;
    } else {
        document.getElementById('login_prompt_dialog').showModal();
    }
}

export function addCancelPressed() {
    // reset inputs to "blank" for checkable value + prevent console errors
    // if set to empty string, you get "An invalid form control with name=... is not focusable"
    document.getElementById('title_input').value = '____';
    document.getElementById('date_input').value = '1000-01-01';
    document.getElementById('summary_input').value = '____';

    document.getElementById('adding_dialog').close();
}

export function delCancelPressed() {
    document.getElementById('delete_dialog').close();
}

export function editCancelPressed() {
    // reset inputs to "blank" for checkable value + prevent console errors
    // if set to empty string, you get "An invalid form control with name=... is not focusable"
    document.getElementById('title_edit').value = '____';
    document.getElementById('date_edit').value = '1000-01-01';
    document.getElementById('summary_edit').value = '____';

    document.getElementById('delete_dialog').close();
}