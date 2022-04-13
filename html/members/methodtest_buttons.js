// Test file is correctly linked
// console.log('Check!');

export function PostRequest() {
    let postXHR = new XMLHttpRequest();
    let myForm = new FormData(document.getElementById('blog_form'));
    //let formID = myForm.get('id');
    //let formName = myForm.get('name');
    //let formBody = myForm.get('body');
    //let formDate = myForm.get('date');

    // build JSON object
    let JSONpacket = {}
    for (var pair of myForm.entries()) {
        // key,value pair
        JSONpacket['article_' + pair[0]] = pair[1]
    }

    // open up request
    postXHR.open('POST', 'https://httpbin.org/post', true);

    // set Headers
    // Want JSON back
    // or postXHR.responseType = 'json';
    postXHR.setRequestHeader('Content-Type', 'application/json');

    // Add Event for when Response is fully loaded to show in output
    // Have to put handleResponse call in anonymous function to get it to wait for readyState to actually be 4
    postXHR.addEventListener('load', function() {
        handleResponse(postXHR);
    });

    postXHR.send(JSON.stringify(JSONpacket));

}

export function GetRequest() {
    let postXHR = new XMLHttpRequest();
    let myForm = new FormData(document.getElementById('blog_form'));
    let formID = myForm.get('id');
    //let formName = myForm.get('name');
    //let formBody = myForm.get('body');
    //let formDate = myForm.get('date');

    // open up request
    // get, put, delete need to use query string in url
    postXHR.open('GET', `https://httpbin.org/get?id=${formID}`, true);

    // set Headers
    // Want JSON back
    // or postXHR.responseType = 'json';
    postXHR.setRequestHeader('Content-Type', 'application/json');

    // Add Event for when Response is fully loaded to show in output
    // Have to put handleResponse call in anonymous function to get it to wait for readyState to actually be 4
    postXHR.addEventListener('load', function() {
        handleResponse(postXHR);
    });

    // don't send anything during a GET
    postXHR.send(null);

}

export function PutRequest() {
    let postXHR = new XMLHttpRequest();
    let myForm = new FormData(document.getElementById('blog_form'));
    let formID = myForm.get('id');
    //let formName = myForm.get('name');
    //let formBody = myForm.get('body');
    //let formDate = myForm.get('date');

    // build JSON object
    let JSONpacket = {}
    for (var pair of myForm.entries()) {
        // key,value pair
        JSONpacket['article_' + pair[0]] = pair[1]
    }

    // open up request
    // get, put, delete need to use query string in url
    postXHR.open('PUT', `https://httpbin.org/put?id=${formID}`, true);

    // set Headers
    // Want JSON back
    // or postXHR.responseType = 'json';
    postXHR.setRequestHeader('Content-Type', 'application/json');

    // Add Event for when Response is fully loaded to show in output
    // Have to put handleResponse call in anonymous function to get it to wait for readyState to actually be 4
    postXHR.addEventListener('load', function() {
        handleResponse(postXHR);
    });

    postXHR.send(JSON.stringify(JSONpacket));

}

export function DeleteRequest() {
    let postXHR = new XMLHttpRequest();
    let myForm = new FormData(document.getElementById('blog_form'));
    let formID = myForm.get('id');
    //let formName = myForm.get('name');
    //let formBody = myForm.get('body');
    //let formDate = myForm.get('date');

    // build JSON object
    let JSONpacket = {}
    for (var pair of myForm.entries()) {
        // key,value pair
        JSONpacket['article_' + pair[0]] = pair[1]
    }

    // open up request
    // get, put, delete need to use query string in url
    postXHR.open('DELETE', `https://httpbin.org/delete?id=${formID}`, true);

    // set Headers
    // Want JSON back
    // or postXHR.responseType = 'json';
    postXHR.setRequestHeader('Content-Type', 'application/json');

    // Add Event for when Response is fully loaded to show in output
    // Have to put handleResponse call in anonymous function to get it to wait for readyState to actually be 4
    postXHR.addEventListener('load', function() {
        handleResponse(postXHR);
    });

    postXHR.send(JSON.stringify(JSONpacket));

}

function handleResponse(response) {
    if(response.readyState==4 && response.status==200) {
        let packet = JSON.parse(response.responseText);
        // puts 8 spaces for indenting JSON to make it nice and clean
        packet = JSON.stringify(packet, null, 8);
        // replace the \ with a blank string
        // this is a regex expression that selects all backslashes global
        // have to escape \ so becomes \\
        packet = packet.replace(/[\\]/g, '');
        // set to output's content
        // use innerText not innerHTML for good formatting
        document.getElementById('response').innerText = packet;
    }
}