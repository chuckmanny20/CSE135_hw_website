// send GET request and get the JSON object return
// dataType: static/performance/activity
function getData(dataType) {
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

// parse JSON text of http response, and get the target data
// param: jsonText, target: isCSSAllowed/isImageAllowed/etc
// return: array of target data
function parseJsonObject(jsonText, target) {
    var jsonObject = JSON.parse(jsonText);
    var res = [];
    for (var record in jsonObject) {
        res.push(record[target]);
    }
    return res;
}