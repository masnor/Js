
const users = [
    {
        "id": "1",
        "username": "Hazem Habrat",
        "phone": "054343842",
        "photo": "image/hazem.jpg"
    },
    {
        "id": "2",
        "username": "Mohmad Mansour",
        "phone": "05758432",
        "photo": "image/mansour.jpg"
    },
    {
        "id": "3",
        "username": "Aws Fawarsy ",
        "phone": "0503877155",
        "photo": "image/elias.jpg"
    }
];

function openPopup() {
    document.getElementById('contactModal').style.display = 'flex';
}

function closePopup() {
    document.getElementById('contactModal').style.display = 'none';
}

function openInfoPopup() {
    document.getElementById('infoModal').style.display = 'flex';
}

function closeInfoPopup() {
    document.getElementById('infoModal').style.display = 'none';
}

function loadContacts() {
    const contactList = document.querySelector('.contact-list');
    contactList.innerHTML = '';
    users.forEach(user => {
        const contactItem = document.createElement('li');
        contactItem.classList.add('contact-item');
        contactItem.innerHTML = `
            <div class="contact-info">
                <img src="${user.photo}" alt="Contact Image" class="contact-img">
                <div>
                    <span class="contact-name">${user.username}</span>
                </div>
            </div>
            <div class="actions">
                <button class="info icon" onclick="showContactInfo(${user.id})"><img src="image/info (3).png" alt=""></button>
                <button class="edit icon" onclick="editContact(${user.id})"><img src="image/plus.png" alt=""></button>
                <button class="delete icon" onclick="deleteContact(${user.id})"><img src="image/trash-bin (1).png" alt=""></button>
            </div>
        `;
        contactList.appendChild(contactItem);
    });
    updatePeopleCount();
}

function saveContact() {
    const id = document.getElementById('contactId').value;
    const name = document.getElementById('contactName').value;
    const phone = document.getElementById('contactPhone').value;
    const imageInput = document.getElementById('contactImage');
    let photo = '';

    if (imageInput.files && imageInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            photo = e.target.result;
            if (id) {
                const user = users.find(u => u.id == id);
                user.username = name;
                user.phone = phone;
                user.photo = photo;
            } else {
                users.push({
                    id: Date.now().toString(),
                    username: name,
                    phone: phone,
                    photo: photo
                });
                updatePeopleCount();
            }
            closePopup();
            loadContacts();
        }
        reader.readAsDataURL(imageInput.files[0]);
    } else {
        if (id) {
            const user = users.find(u => u.id == id);
            user.username = name;
            user.phone = phone;
        } else {
            users.push({
                id: Date.now().toString(),
                username: name,
                phone: phone,
                photo: 'images/default.png'
            });
            updatePeopleCount();
        }
        closePopup();
        loadContacts();
    }
}

function editContact(id) {
    const user = users.find(u => u.id == id);
    document.getElementById('contactId').value = user.id;
    document.getElementById('contactName').value = user.username;
    document.getElementById('contactPhone').value = user.phone;
    openPopup();
}

function deleteContact(id) {
    const userIndex = users.findIndex(u => u.id == id);
    users.splice(userIndex, 1);
    updatePeopleCount();
    loadContacts();
}

function deleteAllContacts() {
    users.length = 0;
    updatePeopleCount();
    loadContacts();
}

function showContactInfo(id) {
    const user = users.find(u => u.id == id);
    document.getElementById('infoName').textContent = `Name: ${user.username}`;
    document.getElementById('infoPhone').textContent = `Phone: ${user.phone}`;
    openInfoPopup();
}

function updatePeopleCount() {
    const count = users.length;
    document.getElementById('peopleCount').textContent = `${count} People`;
}

document.addEventListener('DOMContentLoaded', () => {
    loadContacts();
});


// Active the search bar  
function searchContacts() {
    const searchValue = document.getElementById('searchInput').value.toLowerCase();
    const filteredUsers = users.filter(user => 
        user.username.toLowerCase().includes(searchValue) || 
        user.phone.includes(searchValue)
    );
    displayFilteredContacts(filteredUsers);
}


function displayFilteredContacts(filteredUsers) {
    const contactList = document.querySelector('.contact-list');
    contactList.innerHTML = '';
    filteredUsers.forEach(user => {
        const contactItem = document.createElement('li');
        contactItem.classList.add('contact-item');
        contactItem.innerHTML = `
            <div class="contact-info">
                <img src="${user.photo}" alt="Contact Image" class="contact-img">
                <div>
                    <span class="contact-name">${user.username}</span>
                </div>
            </div>
            <div class="actions">
                <button class="info icon" onclick="showContactInfo(${user.id})"><img src="image/info (3).png" alt=""></button>
                <button class="edit icon" onclick="editContact(${user.id})"><img src="image/plus.png" alt=""></button>
                <button class="delete icon" onclick="deleteContact(${user.id})"><img src="image/trash-bin (1).png" alt=""></button>
            </div>
        `;
        contactList.appendChild(contactItem);
    });
    updatePeopleCount(filteredUsers.length);
}

document.getElementById('searchInput').addEventListener('input', searchContacts);
