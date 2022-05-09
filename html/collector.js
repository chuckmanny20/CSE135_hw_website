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
}

staticCollect();
performanceCollect();
activityCollect();

// store locally in a log file, and send periodcally
