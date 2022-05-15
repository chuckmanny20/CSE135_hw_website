function mapToObj(map){
    const obj = {}
    for (let [k,v] of map)
        obj[k] = v
    return obj
}

function generateID() {
    let id = Math.random().toString(16).slice(2);
    let idObj = {};

    idObj['id'] = id;
    window.localStorage.setItem('ZhaoID', JSON.stringify(idObj));
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

    var cssFile = document.getElementById('cssFile');
    staticMap.set('isCssAllowed', !cssFile.disabled);
    
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
    var timingObject = performance.getEntriesByType('navigation')[0];
    performanceMap.set('wholeTimingObject', timingObject);
    
    window.onload = function() {
        const timeLoadStart = timingObject.domContentLoadedEventStart;
        const timeLoadEnd = timingObject.domComplete;
        performanceMap.set('timeStartLoad', timeLoadStart);
        performanceMap.set('timeEndLoad', timeLoadEnd);
        performanceMap.set('timeTotalLoad', timeLoadEnd - timeLoadStart);
    };
    
    // localStorage
    window.localStorage.setItem('performanceCollection', JSON.stringify(mapToObj(performanceMap)));
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
            window.localStorage.setItem('idleEndList', idleEndList.toString());
            window.localStorage.setItem('idleLengthList', idleLengthList.toString());

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
        window.localStorage.setItem('cursorPosCollection', JSON.stringify(mapToObj(cursorPosMap)));

        resetTimer();
    }
    doc.onclick = function (event) {
        clickMap.set((new Date()).getTime(), [event.pageX, event.pageY]);

        // localStorage
        window.localStorage.setItem('clickCollection', JSON.stringify(mapToObj(clickMap)));

        resetTimer();
    }
    doc.onscroll = function () {
        scrollMap.set((new Date()).getTime(), doc.body.scrollHeight);

        // localStorage
        window.localStorage.setItem('scrollCollection', JSON.stringify(mapToObj(scrollMap)));

        resetTimer();
    }

    // keyboard activity
    var keyboardMap = new Map();
    doc.onkeydown = function (event) {
        keyboardMap.set((new Date()).getTime(), [event.code, 'KeyDown']);

        // localStorage
        window.localStorage.setItem('keyboardCollection', JSON.stringify(mapToObj(keyboardMap)));

        resetTimer();
    }
    doc.onkeyup = function (event) {
        keyboardMap.set((new Date()).getTime(), [event.code, 'KeyUp']);

        // localStorage
        window.localStorage.setItem('keyboardCollection', JSON.stringify(mapToObj(keyboardMap)));

        resetTimer();
    }

    // entering, leaving and oning
    var visibleMap = new Map();
    visibleMap.set((new Date()).getTime(), 'enterPage');
    doc.addEventListener('visibilitychange', function () {
        if (!doc.hidden) {
            visibleMap.set((new Date()).getTime(), 'enterPage');

            //localStorage
            window.localStorage.setItem('visibleCollection', JSON.stringify(mapToObj(visibleMap)));
        } else {
            visibleMap.set((new Date()).getTime(), 'leavePage');

            //localStorage
            window.localStorage.setItem('visibleCollection', JSON.stringify(mapToObj(visibleMap)));
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
    ZhaoID = JSON.parse(window.localStorage.getItem('ZhaoID'));

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
    staticJSONpacket['id'] = ZhaoID['id'];

    performanceJSONpacket['performanceCollection'] = performanceCollection;
    performanceJSONpacket['id'] = ZhaoID['id'];

    activityJSONpacket['idleEndList'] = idleEndList;
    activityJSONpacket['idleLengthList'] = idleLengthList;
    activityJSONpacket['cursorPosCollection'] = cursorPosCollection;
    activityJSONpacket['clickCollection'] = clickCollection;
    activityJSONpacket['scrollCollection'] = scrollCollection;
    activityJSONpacket['keyboardCollection'] = keyboardCollection;
    activityJSONpacket['visibleCollection'] = visibleCollection;
    activityJSONpacket['curPage'] = curPage;
    activityJSONpacket['id'] = ZhaoID['id'];

    // open up request
    // will have to change the url for this later
    // TODO: Split this into 3 XHRs for static, performance, and activity
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
    postStaticXHR.addEventListener('load', function() {
        handleResponse(postStaticXHR);
    });

    postPerformanceXHR.addEventListener('load', function() {
        handleResponse(postPerformanceXHR);
    });

    postActivityXHR.addEventListener('load', function() {
        handleResponse(postActivityXHR);
    });

    postStaticXHR.send(JSON.stringify(staticJSONpacket));
    postPerformanceXHR.send(JSON.stringify(performanceJSONpacket));
    postActivityXHR.send(JSON.stringify(activityJSONpacket));
}

function handleResponse(response) {
    console.log('readyState:' + response.readyState)
    console.log('status:' + response.status)

    // Only if we were expecting response (this is for POST...)
    //let packet = JSON.parse(response.responseText);
    // puts 8 spaces for indenting JSON to make it nice and clean
    //packet = JSON.stringify(packet, null, 8);
    //console.log(packet)
}

generateID();
staticCollect();
performanceCollect();
activityCollect();

// store locally in localStorage, and send periodcally (1 min for now?)
// XHR
//setInterval(sendData, 60000)

// TODO: 1 Session ID (cookie), 1 NEW ID AFTER EVERY TIME YOU SEND DATA TO SERVER
// Goal: Want an ID to tie all the data together, but each POST should have its own UID