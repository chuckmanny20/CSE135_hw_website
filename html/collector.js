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
    window.localStorage.setItem('PageID', JSON.stringify(idObj));
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

    // localStorage
    window.localStorage.setItem('staticCollection', JSON.stringify(mapToObj(staticMap)));
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

        // localStorage
        window.localStorage.setItem('performanceCollection', JSON.stringify(mapToObj(performanceMap)));
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

            // localStorage
            // if the item is not deleted, that means it wasnt sent to server. Thus, grab then append
            let oldidleEndList = window.localStorage.getItem('idleEndList');
            let oldidleLengthList = window.localStorage.getItem('idleLengthList');

            if( oldidleEndList == null) {
                window.localStorage.setItem('idleEndList', idleEndList.toString());
            } else {
                window.localStorage.setItem('idleEndList', oldidleEndList + ',' + idleEndList.toString());
            }

            if( oldidleLengthList == null) {
                window.localStorage.setItem('idleLengthList', idleLengthList.toString());
            } else {
                window.localStorage.setItem('idleLengthList', oldidleLengthList + ',' + idleLengthList.toString());
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

        // localStorage
        let oldcursorPosMap = JSON.parse(window.localStorage.getItem('cursorPosCollection'));

        window.localStorage.setItem('cursorPosCollection', JSON.stringify( Object.assign( {}, oldcursorPosMap, mapToObj(cursorPosMap))));

        cursorPosMap = new Map();

        resetTimer();
    }
    doc.onclick = function (event) {
        clickMap.set((new Date()).getTime(), [event.pageX, event.pageY]);

        // localStorage
        let oldclickMap = JSON.parse(window.localStorage.getItem('clickCollection'));

        window.localStorage.setItem('clickCollection', JSON.stringify( Object.assign( {}, oldclickMap, mapToObj(clickMap))));

        clickMap = new Map();

        resetTimer();
    }
    doc.onscroll = function () {
        scrollMap.set((new Date()).getTime(), [window.pageXOffset, window.pageYOffset]);

        // localStorage
        let oldscrollMap = JSON.parse(window.localStorage.getItem('scrollCollection'));

        window.localStorage.setItem('scrollCollection', JSON.stringify( Object.assign( {}, oldscrollMap, mapToObj(scrollMap))));

        scrollMap = new Map();

        resetTimer();
    }

    // keyboard activity
    var keyboardMap = new Map();
    doc.onkeydown = function (event) {
        keyboardMap.set((new Date()).getTime(), [event.code, 'KeyDown']);

        // localStorage
        let oldkeyboardMap = JSON.parse(window.localStorage.getItem('keyboardCollection'));

        window.localStorage.setItem('keyboardCollection', JSON.stringify(Object.assign( {}, oldkeyboardMap, mapToObj(keyboardMap))));

        keyboardMap = new Map();

        resetTimer();
    }
    doc.onkeyup = function (event) {
        keyboardMap.set((new Date()).getTime(), [event.code, 'KeyUp']);

        // localStorage
        let oldkeyboardMap = JSON.parse(window.localStorage.getItem('keyboardCollection'));

        window.localStorage.setItem('keyboardCollection', JSON.stringify(Object.assign( {}, oldkeyboardMap, mapToObj(keyboardMap))));

        keyboardMap = new Map();

        resetTimer();
    }

    // entering, leaving and oning
    var visibleMap = new Map();
    visibleMap.set((new Date()).getTime(), 'enterPage');
    doc.addEventListener('visibilitychange', function () {
        if (!doc.hidden) {
            visibleMap.set((new Date()).getTime(), 'enterPage');

            //localStorage
            let oldvisibleMap = JSON.parse(window.localStorage.getItem('visibleCollection'));

            window.localStorage.setItem('visibleCollection', JSON.stringify(Object.assign( {}, oldvisibleMap, mapToObj(visibleMap))));

            visibleMap = new Map();
        } else {
            visibleMap.set((new Date()).getTime(), 'leavePage');

            //localStorage
            let oldvisibleMap = JSON.parse(window.localStorage.getItem('visibleCollection'));
            
            window.localStorage.setItem('visibleCollection', JSON.stringify(Object.assign( {}, oldvisibleMap, mapToObj(visibleMap))));

            visibleMap = new Map();
        }
    });
    var curPage = doc.location.toString();

    window.localStorage.setItem('curPage', curPage);
}

function sendData() {

    // grab all the items
    staticCollection = window.localStorage.getItem('staticCollection');
    performanceCollection = window.localStorage.getItem('performanceCollection');
    idleEndList = window.localStorage.getItem('idleEndList');
    idleLengthList = window.localStorage.getItem('idleLengthList');
    cursorPosCollection = window.localStorage.getItem('cursorPosCollection');
    clickCollection = window.localStorage.getItem('clickCollection');
    scrollCollection = window.localStorage.getItem('scrollCollection');
    keyboardCollection = window.localStorage.getItem('keyboardCollection');
    visibleCollection = window.localStorage.getItem('visibleCollection');
    curPage = window.localStorage.getItem('curPage');
    PageID = JSON.parse(window.localStorage.getItem('PageID'));

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
    staticJSONpacket['id'] = PageID['id'];

    performanceJSONpacket['performanceCollection'] = performanceCollection;
    performanceJSONpacket['Userid'] = UserID;
    performanceJSONpacket['id'] = PageID['id'];

    activityJSONpacket['idleEndList'] = idleEndList;
    activityJSONpacket['idleLengthList'] = idleLengthList;
    activityJSONpacket['cursorPosCollection'] = cursorPosCollection;
    activityJSONpacket['clickCollection'] = clickCollection;
    activityJSONpacket['scrollCollection'] = scrollCollection;
    activityJSONpacket['keyboardCollection'] = keyboardCollection;
    activityJSONpacket['visibleCollection'] = visibleCollection;
    activityJSONpacket['curPage'] = curPage;
    activityJSONpacket['Userid'] = UserID;
    activityJSONpacket['id'] = PageID['id'];

    // open up request
    // will have to change the url for this later
    // Split this into 3 XHRs for static, performance, and activity
    postStaticXHR.open('POST', 'https://zhaoxinglyu.site/api/static', true);
    postPerformanceXHR.open('POST', 'https://zhaoxinglyu.site/api/performance', true);
    postActivityXHR.open('POST', 'https://zhaoxinglyu.site/api/activity', true);

    // set Headers
    // Want JSON back
    // or postXHR.responseType = 'json';
    postStaticXHR.setRequestHeader('Content-Type', 'application/json');
    postPerformanceXHR.setRequestHeader('Content-Type', 'application/json');
    postActivityXHR.setRequestHeader('Content-Type', 'application/json');

    // Add Event for when Response is fully loaded to show in output
    // Have to put handleResponse call in anonymous function to get it to wait for readyState to actually be 4
    postStaticXHR.addEventListener('load', function () {
        handleStaticResponse(postStaticXHR);
    });

    postPerformanceXHR.addEventListener('load', function () {
        handlePerformanceResponse(postPerformanceXHR);
    });

    postActivityXHR.addEventListener('load', function () {
        handleActivityResponse(postActivityXHR);
    });

    console.log(curPage);
    console.log(staticCollection);

    // postStaticXHR.send(JSON.stringify(staticJSONpacket));
    // postPerformanceXHR.send(JSON.stringify(performanceJSONpacket));
    // postActivityXHR.send(JSON.stringify(activityJSONpacket));

    // New PageID for next POST!
    generatePageID();
}

function handleStaticResponse(response) {
    if((response.status == 200 || response.status == 201 || response.status == 204) && response.readyState == 4)
        // delete already saved data
        window.localStorage.removeItem('staticCollection');
}

function handlePerformanceResponse(response) {
    if((response.status == 200 || response.status == 201 || response.status == 204) && response.readyState == 4)
        // delete already saved data
        window.localStorage.removeItem('performanceCollection');
}

function handleActivityResponse(response) {
    if((response.status == 200 || response.status == 201 || response.status == 204) && response.readyState == 4)
        // delete already saved data
        window.localStorage.removeItem('idleEndList');
        window.localStorage.removeItem('idleLengthList');
        window.localStorage.removeItem('cursorPosCollection');
        window.localStorage.removeItem('clickCollection');
        window.localStorage.removeItem('scrollCollection');
        window.localStorage.removeItem('keyboardCollection');
        window.localStorage.removeItem('visibleCollection');
        window.localStorage.removeItem('curPage');
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

    for(let i = 0; i <ca.length; i++) {
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

if(UserID == "")
    setCookie('UserID', generateUserID(), 720, "/");

generatePageID();
staticCollect();
performanceCollect();
activityCollect();

// store locally in localStorage, and send periodcally (1 min for now? Not actually one minute b/c of how event queues work ;) )
// XHR
setInterval(sendData, 6000);

// Goal: Want an ID to tie all the data together as one person, but each POST should have its own ID to tie to a specific page visit

// TODO: Test what happens if you have multiple tabs open (after having collector.js on all pages) and whether or not you need to append to localStorage or what