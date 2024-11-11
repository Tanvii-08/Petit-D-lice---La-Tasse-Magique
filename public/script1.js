const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnPopup = document.querySelector('.btnLogin-popup');
const iconclose = document.querySelector('.icon-close');
document.querySelector('.icon-close').addEventListener('click', function() {
    document.querySelector('.wrapper').classList.remove('active-popup');
});

document.querySelector('.btnLogin-popup').addEventListener('click', function() {
    document.querySelector('.wrapper').classList.add('active-popup');
});


registerLink.addEventListener('click',()=>{
    wrapper.classList.add('active');
});

loginLink.addEventListener('click',()=>{
    wrapper.classList.remove('active');
});

btnPopup.addEventListener('click',()=>{
    wrapper.classList.add('active-popup');
});

iconclose.addEventListener('click',()=> {
    wrapper.classList.remove('.active-popup');
})






