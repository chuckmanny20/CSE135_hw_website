// send GET request and get the JSON object return
// dataType: static/performance/activity
function GET_data(dataType) {
    var httpRequest = new XMLHttpRequest();
    var url = 'https://zhaoxinglyu.site/api/' + dataType;
    httpRequest.open('GET', url, true);
    httpRequest.send();
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState == 4 && httpRequest.status == 200) {
            var json = httpRequest.responseText;
            return json;
        }
    };
}

