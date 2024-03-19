var data = [];

function addData(dataBaru) {
    data.push(dataBaru);
}

function displayData() {
    var tableBody = document.getElementById('dataBody');
    tableBody.innerHTML = '';
    for (var item of data) {
        var baris = tableBody.insertRow();
        var cell = row.insertCell();
        cell.innerText = item.id;
        var name
    }
}