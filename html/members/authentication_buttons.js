export function loginPressed() {
    // get the add dialog box and show it when add is clicked
    // don't save previous inputs
    document.getElementById('email_input').value = '';
    document.getElementById('password_input').value = '';

    document.getElementById('login_dialog').showModal();
}

export function loginCancelPressed() {
    // fill input with garbage so validates
    document.getElementById('email_input').value = 'username@domain';
    document.getElementById('password_input').value = '____';

    document.getElementById('login_dialog').close();
}

