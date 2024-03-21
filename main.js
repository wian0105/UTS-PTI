var data = [];

function addData(dataBaru) {
    data.push(dataBaru);
    saveData();
}

function displayData() {
    var tableBody = document.getElementById('dataBody');
    tableBody.innerHTML = '';
    for (var i = 0; i < data.length; i++) {
        var item = data[i];
        var row = tableBody.insertRow();
        var nimCell = row.insertCell();
        nimCell.innerText = item.nim;
        var namaCell = row.insertCell();
        namaCell.innerText = item.nama;
        var alamatCell = row.insertCell();
        alamatCell.innerText = item.alamat;

        // edit data
        var actionCell = row.insertCell();
        var editButton = document.createElement('button');
        editButton.classList.add('btn', 'bg-gradient-info', 'btn-default');
        editButton.setAttribute('data-toggle', 'modal');
        editButton.setAttribute('data-target', '#editModal');
        editButton.innerText = 'Edit';
        editButton.dataset.index = i;
        editButton.addEventListener('click', function(event) {
            var index = event.target.dataset.index;
            document.getElementById('edit-index').value = index;
            isiFormulirEdit(data[index]);
        });
        actionCell.appendChild(editButton);

        // hapus data
        var deleteButton = document.createElement('button');
        deleteButton.classList.add('btn', 'btn-default', 'bg-gradient-danger');
        deleteButton.innerText = 'Delete';
        deleteButton.addEventListener('click', function() {
            hapusData(row);
        });
        actionCell.appendChild(deleteButton);
    };
}

function isiFormulirEdit(item) {
    document.getElementById('edit-nim').value = item.nim;
    document.getElementById('edit-nama').value = item.nama;
    document.getElementById('edit-alamat').value = item.alamat;
}

document.getElementById('editModal').addEventListener('submit', function(event) {
    event.preventDefault();
    var nim = document.getElementById('edit-nim').value;
    var nama = document.getElementById('edit-nama').value;
    var alamat = document.getElementById('edit-alamat').value;

    var index = document.getElementById('edit-index').value;
    data[index] = {nim: nim, nama: nama, alamat: alamat};
    
    saveData();
    
    displayData();
    $('#editModal').modal('hide');
    isiFormulirEdit(data[index]);
});

function hapusData(row) {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
            var rowIndex = row.rowIndex;
            data.splice(rowIndex - 1, 1); 
            displayData();
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        }
      });
}

function saveData() {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/save-data', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log(xhr.responseText);
        } else {
            console.log('Gagal Menyimpan Data');
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
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Wajib Mengisi Form!",
          });
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
    document.getElementById('3').innerText = hours;
    document.getElementById('56').innerText = minutes;
    document.getElementById('30').innerText = seconds;
  }
  
  setInterval(updateClock, 1000);
  updateClock();