const registerButton = document.querySelector('.register-button');
const loginButton = document.querySelector('.login-button');
const registerForm = document.getElementById('registerForm');
const loginForm = document.getElementById('loginForm');
const hamburgerBtn = document.getElementById('hamburgerBtn');
const dropdownMenu = document.querySelector('.hamburger-menu');

if (registerButton) {
    registerButton.addEventListener('click', () => {
        // Przekierowanie do podstrony rejestracji
        window.location.href = '/rejestracja';
    });
}

if (loginButton) {
    loginButton.addEventListener('click', () => {
        // Przekierowanie do podstrony logowania 
        window.location.href = '/logowanie';
    });
}



// obsługa hamburger  menu
if (hamburgerBtn && dropdownMenu) {
    hamburgerBtn.addEventListener('click', function (event) {
        event.stopPropagation();
        dropdownMenu.classList.toggle('active');
    });

    document.addEventListener('click', function (event) {
        if (!dropdownMenu.contains(event.target) && event.target !== hamburgerBtn) {
            dropdownMenu.classList.remove('active');
        }
    });
}



// Obsługa formularza rejestracji
if (registerForm) {
    registerForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        const formData = new FormData(this);
        console.log('Wysyłane dane (rejestracja):', Object.fromEntries(formData.entries()));

        const response = await fetch('/register', {
            method: 'POST',
            body: new URLSearchParams(formData),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });

        const result = await response.text();
        if (response.ok) {
            window.location.href = '/biblioteka';
        } else {
            alert('Błąd rejestracji: ' + result);
        }
    });
}



// Obsługa formularza logowania
if (loginForm) {
    loginForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        const formData = new FormData(this);
        console.log('Wysyłane dane (logowanie):', Object.fromEntries(formData.entries()));

        const response = await fetch('/login', {
            method: 'POST',
            body: new URLSearchParams(formData),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });

        const result = await response.text();
        if (response.ok) {
            window.location.href = '/biblioteka';
        } else {
            alert('Błąd logowania: ' + result);
        }
    });
}



document.addEventListener("DOMContentLoaded", () => {
    const addToProfileButtons = document.querySelectorAll('.btn-add');

    addToProfileButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            
            // Pobranie nazwy gry z atrybutu data-game
            const gameName = event.target.getAttribute('data-game');

            // Pobranie istniejącej listy gier z LocalStorage
            let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

            // Sprawdzenie czy gra już jest na liście
            if (!cartItems.includes(gameName)) {
                cartItems.push(gameName);
                localStorage.setItem('cart', JSON.stringify(cartItems));
                alert(`Dodano: ${gameName}`);
            } else {
                alert("Ta gra została już dodana do profilu.");
            }
        });
    });
});




document.addEventListener("DOMContentLoaded", () => {
    const productList = document.getElementById('product-list');
    const clearCartBtn = document.querySelector('.clear-cart-btn');

    // Pobranie gier z LocalStorage
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    // Dodanie gier do listy na stronie koszyka
    if (cartItems.length > 0) {
        cartItems.forEach(game => {
            const listItem = document.createElement('li');
            listItem.textContent = game;
            productList.appendChild(listItem);
        });
    } else {
        productList.innerHTML = '<li>Brak produktów w koszyku.</li>';
    }

    // Obsługa czyszczenia koszyka
    clearCartBtn.addEventListener('click', () => {
        localStorage.removeItem('cart');
        productList.innerHTML = '<li>Brak produktów w koszyku.</li>';
    });
});
