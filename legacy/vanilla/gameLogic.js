var marked;
var activeRow = 1;
var solutionSequence = [];
var checkNo = 1;

function mark(obj) {
    if(marked!=null)
    	unmark();	     
    obj.style.stroke = "#354A62";
    marked = obj;
}

function unmark() {
    marked.style.stroke = marked.style.fill;
    marked = null;	
}

function inputColor(obj) {
    var parentClass = obj.parentElement.parentElement.parentElement.className;
    if(marked!=null && parentClass=="active") 
        obj.style.fill = marked.style.fill;	
}

function getColorSequence() {
    var checkSequence = [];
    var activeId = "i" + activeRow;
    for(i = 0; i < tabWidth; i++) {
        checkSequence[i] = document.getElementById(activeId + (i+1)).style.fill;
    }		
    return checkSequence;
}

function compareSequence() {
    var checkSequence = getColorSequence();
    var secretSequence = solutionSequence.slice();
    var comparisonResult = [];
    var index = 0;
    for(i = 0; i < checkSequence.length; i++) {
        if(checkSequence[i]==secretSequence[i]) {
            var elemId = "r" + activeRow + (index+1);
            document.getElementById(elemId).style.fill = "black";
            comparisonResult[index] = "black";
            secretSequence[i] = "xxx";
            checkSequence[i] = "yyy";
            index++;
        }
    }
    for(i = 0; i < checkSequence.length; i++) {
        if(secretSequence.includes(checkSequence[i])) {
            var elemId = "r" + activeRow + (index+1);
            document.getElementById(elemId).style.fill = "white";
            comparisonResult[index] = "white";
            var searchIndex = secretSequence.indexOf(checkSequence[i]);
            secretSequence[searchIndex] = "xxx";
            checkSequence[i] = "yyy";
            index++;
        }
    }
    return comparisonResult;
}

function check() {
    if(JSON.stringify(compareSequence())==JSON.stringify(["black","black","black","black"])) {
        gameOver("Game won!");
    } else {
        var activeId = "tr" + activeRow;
        document.getElementById(activeId).className = "inactive";
        activeRow++;
        if(activeRow <= tabHeight) {
            var activeId = "tr" + activeRow;
            document.getElementById(activeId).className = "active";
        }
        checkNo++;
    }
    if(checkNo > tabHeight)
        gameOver("Game lost");
}

function gameOver(alertText) {
    if(activeRow <= tabHeight) {
        var activeId = "tr" + activeRow;
        document.getElementById(activeId).className = "inactive";
    }
    showSolution();
    alert(alertText);
}

function showSolution() {
    for(i = 0; i < solutionSequence.length; i++) {
        document.getElementById("s"+(i+1)).style.fill = solutionSequence[i];	
    }
}

function generateRandomSequence() {
    for(i = 0; i < tabWidth; i++) {
        var randomNumber = Math.floor(Math.random() * 8);
        solutionSequence[i] = numberToColor[randomNumber];
    }
}

function resetVariables() {
    marked = null;
    activeRow = 1;
    solutionSequence = [];
    checkNo = 1;
}
