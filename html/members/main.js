// Test file is correctly linked
// console.log('Check!');

function swapNightMode() {
    let buttonImage = document.getElementById('button_img');

    // swap
    if(buttonImage.className === 'night') {
        buttonImage.src = './light-mode.png';
        buttonImage.className = 'light';

        // css variables
        document.documentElement.style.setProperty('--text-color:', 'white');
        document.documentElement.style.setProperty('--hover-shadow-color', 'white');
        document.documentElement.style.setProperty('--hover-button-text-color', '#B1A296');
        document.documentElement.style.setProperty('--hover-button-bg-color', '#7395AE');
        document.documentElement.style.setProperty('--background-color', '#444444');

        // change bg of images in footer
        document.getElementById('mail_icon').children[2].style.backgroundColor = '#444444';
        document.getElementById('phone_icon').children[2].style.backgroundColor = '#444444';

        if(document.getElementById('git_icon') != null) {
            document.getElementById('git_icon').children[2].style.backgroundColor = '#444444';
        }
    } else {
        buttonImage.src = './night-mode.png';
        buttonImage.className = 'night';

        // defaults
        document.documentElement.style.setProperty('--text-color:', 'white');
        document.documentElement.style.setProperty('--hover-shadow-color', '#5D5C61');
        document.documentElement.style.setProperty('--hover-button-text-color', '#B1A296');
        document.documentElement.style.setProperty('--hover-button-bg-color', '#7395AE');
        document.documentElement.style.setProperty('--background-color', '#557A95');

        // change bg of images in footer back
        document.getElementById('mail_icon').children[2].style.backgroundColor = '#557A95';
        document.getElementById('phone_icon').children[2].style.backgroundColor = '#557A95';

        if(document.getElementById('git_icon') != null) {
            document.getElementById('git_icon').children[2].style.backgroundColor = '#557A95';
        }
    }
}

document.getElementById('night_mode_btn').addEventListener('click', swapNightMode);