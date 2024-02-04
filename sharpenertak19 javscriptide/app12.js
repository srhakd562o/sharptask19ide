function handleFormSubmit(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const phonenumber = document.getElementById('phonenumber').value;
    const obj = {
        username: username,
        email: email,
        phonenumber: phonenumber
    };

    // Send POST request to crudcrud.com
    axios.post('https://crudcrud.com/api/385463ac515d4e40a4970691c9c17de1/appointmentData', obj)
        .then(response => {
            console.log('Object saved in the cloud:', response.data);
            // Call other functions after successful save
            saveobj(obj); // Save locally
            displayobj(obj); // Display locally
            loadobjs(); // Load locally
        })
        .catch(error => {
            console.error('Error saving object:', error);
            // Optionally, you can handle errors here
        });
}

function saveobj(obj) {
    let objs = JSON.parse(localStorage.getItem('objs')) || [];
    objs.push(obj);
    localStorage.setItem('objs', JSON.stringify(objs));
}

function displayobj(obj, index) {
    const parent = document.getElementById('listOfItems');
    const child1 = document.createElement('li');
    child1.textContent = obj.username + '-' + obj.email + '-' + obj.phonenumber;
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', function () {
        deleteobj(index);
    });
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.addEventListener('click', function () {
        editobj(index);
    });
    child1.appendChild(editBtn);
    child1.appendChild(deleteBtn);
    parent.appendChild(child1);
}

function deleteobj(index) {
    let objs = JSON.parse(localStorage.getItem('objs')) || [];
    objs.splice(index, 1);
    localStorage.setItem('objs', JSON.stringify(objs));
    loadobjs();
}

function editobj(index) {
    let objs = JSON.parse(localStorage.getItem('objs')) || [];
    const editobj = objs[index];

    const updatedName = prompt('Updated Username:', editobj.username);
    const updatedEmail = prompt('Updated Email:', editobj.email);
    const updatedNumber = prompt('Updated Phonenumber', editobj.phonenumber);
    if (updatedName !== null && updatedEmail !== null && updatedNumber !== null) {
        const updateobj = {
            username: updatedName,
            email: updatedEmail,
            phonenumber: updatedNumber
        }
        objs[index] = updateobj;
        localStorage.setItem('objs', JSON.stringify(objs));
        loadobjs();
    }
}

function loadobjs() {
    const listOfItems = document.getElementById('listOfItems')
    listOfItems.innerHTML = '';
    let objs = JSON.parse(localStorage.getItem('objs')) || [];
    objs.forEach((obj, index) => {
        displayobj(obj, index);
    })
}
