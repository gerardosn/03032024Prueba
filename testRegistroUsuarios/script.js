// document.addEventListener('DOMContentLoaded', () => {
//     const form = document.getElementById('userForm');
//     const nameInput = document.getElementById('nameInput');
//     const emailInput = document.getElementById('emailInput');
//     const phoneInput = document.getElementById('phoneInput');
//     const submitButton = document.getElementById('submitButton');
//     const userList = document.getElementById('userList');
//     const emailError = document.getElementById('emailError');
//     const phoneError = document.getElementById('phoneError');

//     let users = [];
//     let editingUserId = null;

//     function validateEmail(email) {
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         return emailRegex.test(email);
//     }

//     function validatePhone(phone) {
//         const cleanPhone = phone.replace(/[^0-9]/g, '');
//         return cleanPhone.length >= 10 && cleanPhone.length <= 15;
//     }

//     function updateSubmitButtonContent() {
//         const buttonText = document.querySelector('.button-text');
//         const buttonIcon = document.querySelector('.button-icon');
        
//         if (editingUserId) {
//             buttonText.textContent = 'Actualizar Usuario';
//             buttonIcon.innerHTML = `
//                 <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
//             `;
//         } else {
//             buttonText.textContent = 'Registrar Usuario';
//             buttonIcon.innerHTML = `
//                 <path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
//             `;
//         }
//     }

//     function renderUserList() {
//         userList.innerHTML = users.length > 0
//             ? users.map(user => `
//                 <div class="user-item" data-id="${user.id}">
//                     <div>
//                         <p class="user-id text-xs text-gray-500">${user.id}</p>
//                         <strong>${user.name}</strong>
//                         <p class="text-sm text-gray-600">${user.email}</p>
//                         <p class="text-sm text-gray-600">${user.phone}</p>
//                     </div>
//                     <div class="user-actions">
//                         <button class="action-button edit-button" onclick="handleEdit('${user.id}')">
//                             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
//                                 <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
//                             </svg>
//                         </button>
//                         <button class="action-button delete-button" onclick="handleDelete('${user.id}')">
//                             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
//                                 <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
//                             </svg>
//                         </button>
//                     </div>
//                 </div>
//             `).join('')
//             : '<p class="empty-message">No hay usuarios registrados aún.</p>';
//     }
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('userForm');
    const nameInput = document.getElementById('nameInput');
    const emailInput = document.getElementById('emailInput');
    const phoneInput = document.getElementById('phoneInput');
    const submitButton = document.getElementById('submitButton');
    const userList = document.getElementById('userList');
    const emailError = document.getElementById('emailError');
    const phoneError = document.getElementById('phoneError');

    let users = [];
    let editingUserId = null;

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function validatePhone(phone) {
        const cleanPhone = phone.replace(/[^0-9]/g, '');
        return cleanPhone.length >= 10 && cleanPhone.length <= 15;
    }

    function updateSubmitButtonContent() {
        const buttonText = document.querySelector('.button-text');
        const buttonIcon = document.querySelector('.button-icon');
        
        if (editingUserId) {
            buttonText.textContent = 'Actualizar Usuario';
            buttonIcon.innerHTML = `
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
            `;
        } else {
            buttonText.textContent = 'Registrar Usuario';
            buttonIcon.innerHTML = `
                <path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            `;
        }
    }

    function renderUserList() {
        userList.innerHTML = users.length > 0
            ? users.map(user => `
                <div class="user-item" data-id="${user.id}">
                    <div class="user-details">
                        <p class="user-id">${user.id}</p>
                        <strong>${user.name}</strong>
                        <p class="user-contact">${user.email}</p>
                        <p class="user-contact">${user.phone}</p>
                    </div>
                    <div class="user-actions">
                        <button class="action-button edit-button" onclick="handleEdit('${user.id}')">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                            </svg>
                        </button>
                        <button class="action-button delete-button" onclick="handleDelete('${user.id}')">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            `).join('')
            : '<p class="empty-message">No hay usuarios registrados aún.</p>';
    }

    // El resto del código permanece igual que en la versión anterior
    // ... (mantener todas las funciones y event listeners anteriores)


    function formatDate(date) {
        return `${date.getDate().toString().padStart(2, '0')}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getFullYear().toString().slice(-2)} ${date.getHours().toString().padStart(2, '0')}${date.getMinutes().toString().padStart(2, '0')}${date.getSeconds().toString().padStart(2, '0')}`;
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        emailError.classList.add('hidden');
        phoneError.classList.add('hidden');
        emailInput.classList.remove('error');
        phoneInput.classList.remove('error');

        const isEmailValid = validateEmail(emailInput.value);
        const isPhoneValid = validatePhone(phoneInput.value);

        if (!isEmailValid) {
            emailInput.classList.add('error');
            emailError.classList.remove('hidden');
            return;
        }

        if (!isPhoneValid) {
            phoneInput.classList.add('error');
            phoneError.classList.remove('hidden');
            return;
        }

        const now = new Date();
        const formattedDate = formatDate(now);

        if (editingUserId) {
            users = users.map(user => 
                user.id === editingUserId
                    ? {
                        ...user, 
                        name: nameInput.value, 
                        email: emailInput.value, 
                        phone: phoneInput.value,
                        id: formattedDate,
                        date: now
                    }
                    : user
            );
            editingUserId = null;
        } else {
            users.unshift({
                id: formattedDate,
                name: nameInput.value,
                email: emailInput.value,
                phone: phoneInput.value,
                date: now
            });
        }

        renderUserList();
        form.reset();
        updateSubmitButtonContent();
    });

    window.handleEdit = (id) => {
        const userToEdit = users.find(user => user.id === id);
        if (userToEdit) {
            nameInput.value = userToEdit.name;
            emailInput.value = userToEdit.email;
            phoneInput.value = userToEdit.phone;
            editingUserId = id;
            updateSubmitButtonContent();
        }
    };

    window.handleDelete = (id) => {
        users = users.filter(user => user.id !== id);
        renderUserList();
    };

    // Validación en tiempo real para email
    emailInput.addEventListener('blur', () => {
        const isEmailValid = validateEmail(emailInput.value);
        if (!isEmailValid) {
            emailInput.classList.add('error');
            emailError.classList.remove('hidden');
        } else {
            emailInput.classList.remove('error');
            emailError.classList.add('hidden');
        }
    });

    // Validación en tiempo real para teléfono
    phoneInput.addEventListener('input', () => {
        const value = phoneInput.value;
        const phoneRegex = /^[+\d]{0,15}$/;
        
        if (!phoneRegex.test(value)) {
            phoneInput.value = value.slice(0, -1);
        }
    });

    phoneInput.addEventListener('blur', () => {
        const isPhoneValid = validatePhone(phoneInput.value);
        if (!isPhoneValid) {
            phoneInput.classList.add('error');
            phoneError.classList.remove('hidden');
        } else {
            phoneInput.classList.remove('error');
            phoneError.classList.add('hidden');
        }
    });
});