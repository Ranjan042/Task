const form = document.querySelector('form');

const Registeruser = JSON.parse(localStorage.getItem('Registeruser')) || [];

form.addEventListener('submit', function(e) {
    e.preventDefault();

    const user={
        username:e.target.username.value,
        password:e.target.password.value,
        currency:"₹",
    }

    if(Registeruser.some(u => u.username === user.username && u.password === user.password)){
        window.location.href = 'index.html';
        localStorage.setItem('currentUser', JSON.stringify(user));
    }else{
        alert('Invalid username or password. Please try again.');
    }
});
