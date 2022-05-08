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
    var timingObject = performance.getEntriesByType("navigation");
    performanceMap.set('wholeTimingObject', timingObject);
    
    var timeStartLoad = timingObject.startTime;
    var timeEndLoad = timingObject.loadEventEnd;
    performanceMap.set('timeStartLoad', timeStartLoad);
    performanceMap.set('timeEndLoad', timeEndLoad);
    performanceMap.set('timeTotalLoad', timeEndLoad - timeStartLoad);
    console.log(performanceMap);
}

function activityCollect() {
    document.onmousemove = function(event) {
        pointerX = event.pageX;
        pointerY = event.pageY;
    }
    function pointerCheck() {
        console.log('Cursor at: ' + pointerX + ', ' + pointerY);
    }
    setInterval(pointerCheck, 1000);
}

staticCollect();
performanceCollect();