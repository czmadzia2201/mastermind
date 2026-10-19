var marked;
var activeRow = 1;
var solutionSequence = [];
var checkNo = 1;

var colorMap = new Map([
    ["rgb(255, 0, 0)", "red"],
    ["rgb(0, 0, 255)", "blue"],
    ["rgb(0, 128, 0)", "green"],
    ["rgb(148, 0, 211)", "darkviolet"],
    ["rgb(255, 105, 180)", "hotpink"],
    ["rgb(165, 42, 42)", "brown"],
    ["rgb(0, 255, 255)", "aqua"],
    ["rgb(255, 255, 0)", "yellow"],
    ["rgb(0, 0, 0)", "black"],
]);

$.fn.mark = function(obj) {
    if(marked!=null)
        $.fn.unmark();
    $(obj).css("stroke", "#354A62");
    marked = obj; 
}

$.fn.unmark = function() {
    $(marked).css("stroke", $(marked).css("fill"));
    marked = null;
}

$.fn.inputColor = function(obj) {
    var parentClass = $(obj).parent().parent().parent().attr("class");
    if(marked!=null && parentClass=="active")
        $(obj).css("fill", $(marked).css("fill"));
}

$.fn.getColorSequence = function() {
    var checkSequence = [];
    var activeId = "i" + activeRow;
    for(i = 0; i < tabWidth; i++) {
        rgbColor = $("#"+activeId+(i+1)).css("fill");
        checkSequence[i] = colorMap.get(rgbColor);
    }
    return checkSequence;
}

$.fn.compareSequence = function() {
    var checkSequence = $.fn.getColorSequence();
    var secretSequence = solutionSequence.slice();
    var comparisonResult = [];
    var index = 0;
    for(i = 0; i < checkSequence.length; i++) {
        if(checkSequence[i]==secretSequence[i]) {
            var elemId = "r" + activeRow + (index+1);
            $("#"+elemId).css("fill", "black");
            comparisonResult[index] = "black";
            secretSequence[i] = "xxx";
            checkSequence[i] = "yyy";
            index++;
        }
    }
    for(i = 0; i < checkSequence.length; i++) {
        if(secretSequence.includes(checkSequence[i])) {
            var elemId = "r" + activeRow + (index+1);
            $("#"+elemId).css("fill", "white");
            comparisonResult[index] = "white";
            var searchIndex = secretSequence.indexOf(checkSequence[i]);
            secretSequence[searchIndex] = "xxx";
            checkSequence[i] = "yyy";
            index++;
        }
    }
    return comparisonResult;
}

$.fn.check = function() {
    if(JSON.stringify($.fn.compareSequence())==JSON.stringify(["black","black","black","black"])) {
        $.fn.gameOver("Game won!");
    } else {
        $(".active").toggleClass("active inactive");
        activeRow++;
        if(activeRow <= tabHeight) {
            var activeId = "tr" + activeRow;
            $("#"+activeId).toggleClass("inactive active");
        }
        checkNo++;
    }
    if(checkNo > tabHeight)
        $.fn.gameOver("Game lost");
}

$.fn.gameOver = function(alertText) {
    if(activeRow <= tabHeight) {
        $(".active").toggleClass("active inactive");
    }
    $.fn.showSolution();
    alert(alertText);
}

$.fn.showSolution = function() {
    for(i = 0; i < solutionSequence.length; i++) {
        $("#s"+(i+1)).css("fill", solutionSequence[i]);	
    }
}

$.fn.generateRandomSequence = function() {
    for(i = 0; i < tabWidth; i++) {
        var randomNumber = Math.floor(Math.random() * 8);
        solutionSequence[i] = numberToColor[randomNumber];
    }
}

$.fn.resetVariables = function() {
    marked = null;
    activeRow = 1;
    solutionSequence = [];
    checkNo = 1;
}
