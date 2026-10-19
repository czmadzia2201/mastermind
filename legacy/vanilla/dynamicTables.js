function buildChoiceTable() {
    var table = document.getElementById("choiceTable");
    for(i = 0; i < 2; i++) {
        var row = table.insertRow(i);
        for(j = 0; j < tabWidth; j++) {
            var cell = row.insertCell(j);
            var number = (i==0)?j:(j+4);
            var circleId = "c"+(number+1);
            var color = numberToColor[number];
            cell.innerHTML = '<svg><circle id = "' + circleId + '" onclick="mark(this)" cx = "22" cy = "26" r = "21" style="stroke:' + color + '; fill:' + color + '; stroke-width:2px" /></svg>';
        }		
    }
}

function buildSolutionTable() {
    var table = document.getElementById("solutionTable");
    var row = table.insertRow(0);
    for(i = 0; i < tabWidth; i++) {
        var cell = row.insertCell(i);
        var circleId = "s"+(i+1);
        cell.innerHTML = '<svg><circle id = "' + circleId + '" cx = "22" cy = "26" r = "22" style="fill:black" /></svg>';
    }
}

function buildInputTable() {
    var table = document.getElementById("inputTable");
    for(i = 0; i < tabHeight; i++) {
        var row = table.insertRow(i);
        row.id = "tr"+(i+1);
        row.className = (i==0)?"active":"inactive";
        for(j = 0; j < tabWidth; j++) {
            var cell = row.insertCell(j);
            var circleId = "i"+(i+1)+(j+1);
            cell.innerHTML = '<svg><circle id = "' + circleId + '" onclick="inputColor(this)" cx = "22" cy = "26" r = "22" style="fill:black" /></svg>';
        }		
    }
}

function buildResponseTable() {
    var table = document.getElementById("responseTable");
    for(i = 0; i < tabHeight; i++) {
        var row = table.insertRow(i);
        for(j = 0; j < tabWidth; j++) {
            var cell = row.insertCell(j);
            var circleId = "r"+(i+1)+(j+1);
            cell.innerHTML = '<svg class="small"><circle id = "' + circleId + '" cx = "12" cy = "26" r = "12" style="fill:lightSlateGray" /></svg>';
        }		
    }
}

function clearTables() {
    document.getElementById("choiceTable").innerHTML = "";
    document.getElementById("solutionTable").innerHTML = "";
    document.getElementById("inputTable").innerHTML = "";
    document.getElementById("responseTable").innerHTML = "";
}
