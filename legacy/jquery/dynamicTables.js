$.fn.clearTables = function() {
    $("#choiceTable").html("");
    $("#solutionTable").html("");
    $("#inputTable").html("");
    $("#responseTable").html("");
}

$.fn.buildChoiceTable = function() {
    var table = $("#choiceTable")[0];
    for(i = 0; i < 2; i++) {
        var row = table.insertRow(i);
        for(j = 0; j < tabWidth; j++) {
            var cell = row.insertCell(j);
            var number = (i==0)?j:(j+4);
            var circleId = "c"+(number+1);
            var color = numberToColor[number];
            $(cell).html('<svg><circle id = "' + circleId + '" onclick="$.fn.mark(this)" cx = "22" cy = "26" r = "21" style="stroke:' + color + '; fill:' + color + '; stroke-width:2px" /></svg>');
        }		
    }
}

$.fn.buildSolutionTable = function() {
    var table = $("#solutionTable")[0];
    var row = table.insertRow(0);
    for(i = 0; i < tabWidth; i++) {
        var cell = row.insertCell(i);
        var circleId = "s"+(i+1);
        $(cell).html('<svg><circle id = "' + circleId + '" cx = "22" cy = "26" r = "22" style="fill:black" /></svg>');
    }
}

$.fn.buildInputTable = function() {
    var table = $("#inputTable")[0];
    for(i = 0; i < tabHeight; i++) {
        var row = table.insertRow(i);
        row.id = "tr"+(i+1);
        row.className = (i==0)?"active":"inactive";
        for(j = 0; j < tabWidth; j++) {
            var cell = row.insertCell(j);
            var circleId = "i"+(i+1)+(j+1);
            $(cell).html('<svg><circle id = "' + circleId + '" onclick="$.fn.inputColor(this)" cx = "22" cy = "26" r = "22" style="fill:black" /></svg>');
        }		
    }
}

$.fn.buildResponseTable = function() {
    var table = $("#responseTable")[0];
    for(i = 0; i < tabHeight; i++) {
        var row = table.insertRow(i);
        for(j = 0; j < tabWidth; j++) {
            var cell = row.insertCell(j);
            var circleId = "r"+(i+1)+(j+1);
            $(cell).html('<svg class="small"><circle id = "' + circleId + '" cx = "12" cy = "26" r = "12" style="fill:lightSlateGray" /></svg>');
        }		
    }
}


