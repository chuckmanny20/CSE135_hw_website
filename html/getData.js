var httpRequest = new XMLHttpRequest();
var url = 'https://zhaoxinglyu.site/api/static'
httpRequest.open('GET', url, true);
httpRequest.send();
httpRequest.onreadystatechange = function () {
    if (httpRequest.readyState == 4 && httpRequest.status == 200) {
        var json = httpRequest.responseText;
        console.log(json);
    }
};