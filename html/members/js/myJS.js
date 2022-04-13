function openAndClose(buttonID, boxID) {
    if (document.getElementById(buttonID).innerHTML == "-") {
        document.getElementById(boxID).style.display = "none";
        document.getElementById(buttonID).innerHTML = "+";
    } else {
        document.getElementById(boxID).style.display = "block";
        document.getElementById(buttonID).innerHTML = "-";
    }
};


function toBeContinued () {
    alert("This page has not been completed, to be continued...");
}