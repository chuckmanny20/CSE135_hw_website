function mapToObj(map) {
    const obj = {}
    for (let [k, v] of map)
        obj[k] = v
    return obj
}

function generatePageID() {
    let id = Math.random().toString(16).slice(2);
    let idObj = {};

    idObj['id'] = id;
    window.sessionStorage.setItem('PageID', JSON.stringify(idObj));
}

function loadStyle() {
    var link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = './styles.css';
    link.id = 'testCss';
    return link;
}

function staticCollect() {
    var staticMap = new Map();
    staticMap.set('userAgentStr', navigator.userAgent);
    staticMap.set('userLang', navigator.language);
    staticMap.set('userCookieAcceptance', navigator.cookieEnabled);
    staticMap.set('isJsAllowed', true);     // if not allowed this file won't be loaded

    // try insert image
    var img = document.createElement('img');
    img.src = './favicon-16x16.png';
    var block = document.getElementById('enableTestBlock');
    block.appendChild(img);
    staticMap.set('isImageAllowed', !img.disabled);
    block.removeChild(img);

    // try insert css
    var cssLink = loadStyle('test.css');
    var head = document.getElementsByTagName('head')[0];
    head.appendChild(cssLink);
    var cssFile = document.getElementById('testCss');
    staticMap.set('isCssAllowed', !cssFile.disabled);
    head.removeChild(cssLink);

    staticMap.set('userScreenWidth', window.screen.width);
    staticMap.set('userScreenHeight', window.screen.height);
    staticMap.set('userWindowWidth', window.outerWidth);
    staticMap.set('userWindowHeight', window.outerHeight);
    staticMap.set('userNetworkConnectionType', navigator.connection.effectiveType);

    // sessionStorage
    window.sessionStorage.setItem('staticCollection', JSON.stringify(mapToObj(staticMap)));
}

function performanceCollect() {
    var performanceMap = new Map();

    // Actually getting set now...
    // Instead of doing all this window.onload and doc.onclick stuff I wish we used addEventListener but to late
    window.onload = function () {
        var timingObject = performance.getEntriesByType('navigation')[0];
        performanceMap.set('wholeTimingObject', timingObject);

        const timeLoadStart = timingObject.domContentLoadedEventStart;
        const timeLoadEnd = timingObject.domComplete;
        performanceMap.set('timeStartLoad', timeLoadStart);
        performanceMap.set('timeEndLoad', timeLoadEnd);
        performanceMap.set('timeTotalLoad', timeLoadEnd - timeLoadStart);

        // sessionStorage
        window.sessionStorage.setItem('performanceCollection', JSON.stringify(mapToObj(performanceMap)));
    };
}

function activityCollect() {
    const doc = document;

    // idle record
    var idleEndList = [];
    var idleLengthList = [];

    var isIdling = false;
    var idleStartTime = 0;
    var idleEndTime = 0;
    function timeout() {
        idleStartTime = (new Date()).getTime();
        isIdling = true;
    }
    var t;
    function resetTimer() {
        if (isIdling) {
            idleEndTime = (new Date()).getTime();
            idleEndList.push(idleEndTime);
            idleLengthList.push(idleEndTime - idleStartTime);

            // sessionStorage
            // if the item is not deleted, that means it wasnt sent to server. Thus, grab then append
            let oldidleEndList = window.sessionStorage.getItem('idleEndList');
            let oldidleLengthList = window.sessionStorage.getItem('idleLengthList');

            if (oldidleEndList == null) {
                window.sessionStorage.setItem('idleEndList', idleEndList.toString());
            } else {
                window.sessionStorage.setItem('idleEndList', oldidleEndList + ',' + idleEndList.toString());
            }

            if (oldidleLengthList == null) {
                window.sessionStorage.setItem('idleLengthList', idleLengthList.toString());
            } else {
                window.sessionStorage.setItem('idleLengthList', oldidleLengthList + ',' + idleLengthList.toString());
            }

            // clear lists after adding
            idleEndList = [];
            idleLengthList = [];

            isIdling = false;
        }
        clearTimeout(t);
        t = setTimeout(timeout, 2000);
    }

    resetTimer();

    // mouse activity
    var cursorPosMap = new Map();
    var clickMap = new Map();
    var scrollMap = new Map();
    doc.onmousemove = function (event) {
        cursorPosMap.set((new Date()).getTime(), [event.pageX, event.pageY]);

        // sessionStorage
        let oldcursorPosMap = JSON.parse(window.sessionStorage.getItem('cursorPosCollection'));

        window.sessionStorage.setItem('cursorPosCollection', JSON.stringify(Object.assign({}, oldcursorPosMap, mapToObj(cursorPosMap))));

        cursorPosMap = new Map();

        resetTimer();
    }
    doc.onclick = function (event) {
        clickMap.set((new Date()).getTime(), [event.pageX, event.pageY]);

        // sessionStorage
        let oldclickMap = JSON.parse(window.sessionStorage.getItem('clickCollection'));

        window.sessionStorage.setItem('clickCollection', JSON.stringify(Object.assign({}, oldclickMap, mapToObj(clickMap))));

        clickMap = new Map();

        resetTimer();
    }
    doc.onscroll = function () {
        scrollMap.set((new Date()).getTime(), [window.pageXOffset, window.pageYOffset]);

        // sessionStorage
        let oldscrollMap = JSON.parse(window.sessionStorage.getItem('scrollCollection'));

        window.sessionStorage.setItem('scrollCollection', JSON.stringify(Object.assign({}, oldscrollMap, mapToObj(scrollMap))));

        scrollMap = new Map();

        resetTimer();
    }

    // keyboard activity
    var keyboardMap = new Map();
    doc.onkeydown = function (event) {
        keyboardMap.set((new Date()).getTime(), [event.code, 'KeyDown']);

        // sessionStorage
        let oldkeyboardMap = JSON.parse(window.sessionStorage.getItem('keyboardCollection'));

        window.sessionStorage.setItem('keyboardCollection', JSON.stringify(Object.assign({}, oldkeyboardMap, mapToObj(keyboardMap))));

        keyboardMap = new Map();

        resetTimer();
    }
    doc.onkeyup = function (event) {
        keyboardMap.set((new Date()).getTime(), [event.code, 'KeyUp']);

        // sessionStorage
        let oldkeyboardMap = JSON.parse(window.sessionStorage.getItem('keyboardCollection'));

        window.sessionStorage.setItem('keyboardCollection', JSON.stringify(Object.assign({}, oldkeyboardMap, mapToObj(keyboardMap))));

        keyboardMap = new Map();

        resetTimer();
    }

    // entering, leaving and oning
    var visibleMap = new Map();
    visibleMap.set((new Date()).getTime(), 'enterPage');

    var curPage = doc.location.toString();
    if (!doc.hidden)
        window.sessionStorage.setItem('curPage', curPage);
    
    doc.addEventListener('visibilitychange', function () {
        if (!doc.hidden) {
            visibleMap.set((new Date()).getTime(), 'enterPage');

            //sessionStorage
            let oldvisibleMap = JSON.parse(window.sessionStorage.getItem('visibleCollection'));

            window.sessionStorage.setItem('visibleCollection', JSON.stringify(Object.assign({}, oldvisibleMap, mapToObj(visibleMap))));

            visibleMap = new Map();

            var curPage = doc.location.toString();
            window.sessionStorage.setItem('curPage', curPage);
        } else {
            visibleMap.set((new Date()).getTime(), 'leavePage');

            //sessionStorage
            let oldvisibleMap = JSON.parse(window.sessionStorage.getItem('visibleCollection'));

            window.sessionStorage.setItem('visibleCollection', JSON.stringify(Object.assign({}, oldvisibleMap, mapToObj(visibleMap))));

            visibleMap = new Map();
        }
    });
}

function sendData() {

    // grab all the items
    staticCollection = window.sessionStorage.getItem('staticCollection');
    performanceCollection = window.sessionStorage.getItem('performanceCollection');
    idleEndList = window.sessionStorage.getItem('idleEndList');
    idleLengthList = window.sessionStorage.getItem('idleLengthList');
    cursorPosCollection = window.sessionStorage.getItem('cursorPosCollection');
    clickCollection = window.sessionStorage.getItem('clickCollection');
    scrollCollection = window.sessionStorage.getItem('scrollCollection');
    keyboardCollection = window.sessionStorage.getItem('keyboardCollection');
    visibleCollection = window.sessionStorage.getItem('visibleCollection');
    curPage = window.sessionStorage.getItem('curPage');
    PageID = JSON.parse(window.sessionStorage.getItem('PageID'));

    // Add UserID (Cookie) to packet
    UserID = getCookie('UserID');

    // pack into XHR and send
    // POST
    let postStaticXHR = new XMLHttpRequest();
    let postPerformanceXHR = new XMLHttpRequest();
    let postActivityXHR = new XMLHttpRequest();

    // build JSON object
    let staticJSONpacket = {};
    let performanceJSONpacket = {};
    let activityJSONpacket = {};

    staticJSONpacket['staticCollection'] = staticCollection;
    staticJSONpacket['Userid'] = UserID;
    staticJSONpacket['Pageid'] = PageID['id'];

    performanceJSONpacket['performanceCollection'] = performanceCollection;
    performanceJSONpacket['Userid'] = UserID;
    performanceJSONpacket['Pageid'] = PageID['id'];

    activityJSONpacket['idleEndList'] = idleEndList;
    activityJSONpacket['idleLengthList'] = idleLengthList;
    activityJSONpacket['cursorPosCollection'] = cursorPosCollection;
    activityJSONpacket['clickCollection'] = clickCollection;
    activityJSONpacket['scrollCollection'] = scrollCollection;
    activityJSONpacket['keyboardCollection'] = keyboardCollection;
    activityJSONpacket['visibleCollection'] = visibleCollection;
    activityJSONpacket['curPage'] = curPage;
    activityJSONpacket['Userid'] = UserID;
    activityJSONpacket['Pageid'] = PageID['id'];

    // open up request
    // will have to change the url for this later
    // Split this into 3 XHRs for static, performance, and activity
    postStaticXHR.open('PUT', 'https://zhaoxinglyu.site/api/static/' + PageID['id'], true);
    postPerformanceXHR.open('PUT', 'https://zhaoxinglyu.site/api/performance/' + PageID['id'], true);
    postActivityXHR.open('PUT', 'https://zhaoxinglyu.site/api/activity/' + PageID['id'], true);

    // set Headers
    // Want JSON back
    // or postXHR.responseType = 'json';
    postStaticXHR.setRequestHeader('Content-Type', 'application/json');
    postPerformanceXHR.setRequestHeader('Content-Type', 'application/json');
    postActivityXHR.setRequestHeader('Content-Type', 'application/json');

    // Add Event for when Response is fully loaded to show in output
    // Have to put handleResponse call in anonymous function to get it to wait for readyState to actually be 4
    /*
    postStaticXHR.addEventListener('load', function () {
        handleStaticResponse(postStaticXHR);
    });

    postPerformanceXHR.addEventListener('load', function () {
        handlePerformanceResponse(postPerformanceXHR);
    });

    postActivityXHR.addEventListener('load', function () {
        handleActivityResponse(postActivityXHR);
    });*/


    postStaticXHR.send(JSON.stringify(staticJSONpacket));
    postPerformanceXHR.send(JSON.stringify(performanceJSONpacket));
    postActivityXHR.send(JSON.stringify(activityJSONpacket));

    // New PageID for next POST!
    // Not needed for PUT
    //generatePageID();
}

function handleStaticResponse(response) {
    //if ((response.status == 200 || response.status == 201 || response.status == 204) && response.readyState == 4)
        // delete already saved data
        //window.sessionStorage.removeItem('staticCollection');
}

function handlePerformanceResponse(response) {
    //if ((response.status == 200 || response.status == 201 || response.status == 204) && response.readyState == 4)
        // delete already saved data
        //window.sessionStorage.removeItem('performanceCollection');
}

function handleActivityResponse(response) {
    //if ((response.status == 200 || response.status == 201 || response.status == 204) && response.readyState == 4)
        // delete already saved data
        /*
        window.sessionStorage.removeItem('idleEndList');
        window.sessionStorage.removeItem('idleLengthList');
        window.sessionStorage.removeItem('cursorPosCollection');
        window.sessionStorage.removeItem('clickCollection');
        window.sessionStorage.removeItem('scrollCollection');
        window.sessionStorage.removeItem('keyboardCollection');
        window.sessionStorage.removeItem('visibleCollection');
        window.sessionStorage.removeItem('curPage');
        */
}

function generateUserID() {
    return Math.random().toString(16).slice(2);
}

function setCookie(name, value, hours, path) {
    var expires = new Date();
    expires.setTime(expires.getTime() + hours * 3600000);
    path = path == "" ? "" : ";path=" + path;
    _expires = (typeof hours) == "string" ? "" : ";expires=" + expires.toUTCString();

    // "The document.cookie property looks like a normal text string. But it is not."
    // "Even if you write a whole cookie string to document.cookie, when you read it out again, you can only see the name-value pair of it."
    document.cookie = name + "=" + value + _expires + path;
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');

    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }

    return "";
}

// Make the cookie get set only if there is not one set at the start of a page visit
let UserID = getCookie('UserID');

if (UserID == "")
    setCookie('UserID', generateUserID(), 720, "/");

generatePageID();
staticCollect();
performanceCollect();
activityCollect();

// store locally in sessionStorage, and send periodcally (1 min for now? Not actually one minute b/c of how event queues work ;) )
// XHR
setInterval(sendData, 60000);

// Goal: Want an ID to tie all the data together as one person, but each POST should have its own ID to tie to a specific page visit

// TODO: Test what happens if you have multiple tabs open (after having collector.js on all pages) and whether or not you need to append to sessionStorage or what