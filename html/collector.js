function staticCollect() {
    var staticMap = new Map();
    staticMap.set('userAgentStr', navigator.userAgent);
    staticMap.set('userLang', navigator.language);
    staticMap.set('userCookieAcceptance', navigator.cookieEnabled);
    // TODO: 3 manually figuring things
    staticMap.set('userScreenWidth', window.screen.width);
    staticMap.set('userScreenHeight', window.screen.height);
    staticMap.set('userWindowWidth', window.outerWidth);
    staticMap.set('userWindowHeight', window.outerHeight);

    // localStorage
    window.localStorage.setItem('staticCollection', JSON.stringify(staticMap));

    console.log(staticMap)
    console.log(JSON.stringify(staticMap))
}

function performanceCollect() {
    var performanceMap = new Map();
    var timingObject = performance.getEntriesByType("navigation")[0];
    performanceMap.set('wholeTimingObject', timingObject);
    
    // TODO: timeStartLoad and timeEndLoad are 0, even if those in the timingObject are correct
    const timeStartLoad = timingObject.loadEventStart;
    const timeEndLoad = timingObject.loadEventEnd;
    console.log(timeStartLoad);
    console.log(performance.getEntriesByType("navigation")[0].loadEventStart);
    console.log(timingObject);
    console.log(parseFloat(timingObject.domComplete));
    // float problem

    performanceMap.set('timeStartLoad', timeStartLoad);
    performanceMap.set('timeEndLoad', timeEndLoad);
    performanceMap.set('timeTotalLoad', timeEndLoad - timeStartLoad);

    // localStorage
    window.localStorage.setItem('performanceCollection', JSON.stringify(performanceMap));

    console.log(performanceMap)
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
        resetTimer();
    }
    doc.onclick = function (event) {
        clickMap.set((new Date()).getTime(), [event.pageX, event.pageY]);
        resetTimer();
    }
    doc.onscroll = function () {
        scrollMap.set((new Date()).getTime(), doc.body.scrollHeight);
        resetTimer();
    }

    // keyboard activity
    var keyboardMap = new Map();
    doc.onkeydown = function (event) {
        keyboardMap.set((new Date()).getTime(), [event.code, 'KeyDown']);
        resetTimer();
    }
    doc.onkeyup = function (event) {
        keyboardMap.set((new Date()).getTime(), [event.code, 'KeyUp']);
        resetTimer();
    }

    // entering, leaving and oning
    var visibleMap = new Map();
    visibleMap.set((new Date()).getTime(), 'enterPage');
    doc.addEventListener("visibilitychange", function () {
        if (!doc.hidden) {
            visibleMap.set((new Date()).getTime(), 'enterPage');
        } else {
            visibleMap.set((new Date()).getTime(), 'leavePage');
        }
    });
    var curPage = doc.location.toString();

    // localStorage
    window.localStorage.setItem('idleEndList', JSON.stringify(idleEndList));
    window.localStorage.setItem('idleLengthList', JSON.stringify(idleLengthList));

    window.localStorage.setItem('cursorPosCollection', JSON.stringify(cursorPosMap));

    window.localStorage.setItem('clickCollection', JSON.stringify(clickMap));

    window.localStorage.setItem('scrollCollection', JSON.stringify(scrollMap));

    window.localStorage.setItem('keyboardCollection', JSON.stringify(keyboardMap));

    window.localStorage.setItem('visibleCollection', JSON.stringify(visibleMap));

    window.localStorage.setItem('curPage', JSON.stringify(curPage));
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

    // pack into XHR and send
    // POST
    let postXHR = new XMLHttpRequest();

    // build JSON object
    let JSONpacket = {}
    JSONpacket['staticCollection'] = staticCollection
    JSONpacket['performanceCollection'] = performanceCollection
    JSONpacket['idleEndList'] = idleEndList
    JSONpacket['idleLengthList'] = idleLengthList
    JSONpacket['cursorPosCollection'] = cursorPosCollection
    JSONpacket['clickCollection'] = clickCollection
    JSONpacket['scrollCollection'] = scrollCollection
    JSONpacket['keyboardCollection'] = keyboardCollection
    JSONpacket['visibleCollection'] = visibleCollection
    JSONpacket['curPage'] = curPage

    // open up request
    // will have to change the url for this later
    // TODO: Split this into 3 XHRs for static, performance, and activity
    postXHR.open('POST', 'https://zhaoxinglyu.site/api/posts', true);

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
    console.log('readyState:' + response.readyState)
    console.log('status:' + response.status)
    // puts 8 spaces for indenting JSON to make it nice and clean
    packet = JSON.stringify(packet, null, 8);
    console.log(packet)
}

staticCollect();
performanceCollect();
activityCollect();

// store locally in localStorage, and send periodcally (5 mins for now?)
// XHR
