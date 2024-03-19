var data = [];

function addData(dataBaru) {
    data.push(dataBaru);
    saveData();
}

function displayData() {
    var tableBody = document.getElementById('dataBody');
    tableBody.innerHTML = '';
    for (var item of data) {
        var row = tableBody.insertRow();
        var nimCell = row.insertCell();
        nimCell.innerText = item.nim;
        var namaCell = row.insertCell();
        namaCell.innerText = item.nama;
        var alamatCell = row.insertCell();
        alamatCell.innerText = item.alamat;
    }
}

function saveData() {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/save-data', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log(xhr.responseText);
        } else {
            console.error();
        }
    };
    xhr.send(JSON.stringify(data));
}

document.getElementById('dataForm').addEventListener('submit', function (event) {
    event.preventDefault();
    var nim = document.getElementById('nim').value;
    var nama = document.getElementById('nama').value;
    var alamat = document.getElementById('alamat').value;
    if (!nim ||!nama ||!alamat) {
        alert('Wajib mengisi form');
        return;
    }
    addData({nim: parseInt(nim), nama: nama, alamat: alamat});
    displayData();
    document.getElementById('nim').value = '';
    document.getElementById('nama').value = '';
    document.getElementById('alamat').value = '';
});

var xhr = new XMLHttpRequest();
xhr.open('GET', dataFile, true);
xhr.onload = function () {
    if (xhr.status === 200) {
        data = JSON.parse(xhr.responseText);
        displayData();
    } else {
        console.error(xhr.responseText);
    }
};
xhr.send();

function updateClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    
    document.getElementById('hours').innerText = hours;
    document.getElementById('minutes').innerText = minutes;
    document.getElementById('seconds').innerText = seconds;
}
setInterval(updateClock, 1000); 
updateClock(); 