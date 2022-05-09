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
    console.log(staticMap);
}

function performanceCollect() {
    var performanceMap = new Map();
    var timingObject = performance.getEntriesByType("navigation")[0];
    performanceMap.set('wholeTimingObject', timingObject);
    
    var timeStartLoad = timingObject.loadEventStart;
    var timeEndLoad = timingObject.loadEventEnd;
    performanceMap.set('timeStartLoad', timeStartLoad);
    performanceMap.set('timeEndLoad', timeEndLoad);
    performanceMap.set('timeTotalLoad', timeEndLoad - timeStartLoad);
    console.log(performanceMap);
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
        console.log(keyboardMap);
    }
    doc.onkeyup = function (event) {
        keyboardMap.set((new Date()).getTime(), [event.code, 'KeyUp']);
        resetTimer();
    }

    // TODO: when the entering, leaving and oning
}

staticCollect();
performanceCollect();
activityCollect();
