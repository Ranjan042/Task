const registerForm = document.querySelector('form');

const Registeruser = JSON.parse(localStorage.getItem('Registeruser')) || [];

console.log(Registeruser);
registerForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const user={
        username:e.target.username.value,
        password:e.target.password.value
    }

    if(Registeruser.some(u => u.username === user.username)){
        alert('Username already exists. Please choose a different username.');
        return;
    }

    //Hii


    console.log(user);

    Registeruser.push(user);
    localStorage.setItem('Registeruser',JSON.stringify(Registeruser));
    window.location.href = 'login.html';
});