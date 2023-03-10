const url = "https://api.github.com/users/";
const wrapper = document.querySelector('.wrapper');
const followingDiv = document.querySelector('.followings');
const darkModeBtn = document.getElementById('darkmode')
const moon = document.getElementById('moon');
const sun = document.getElementById('sun');
const profileContainer = document.querySelector('.profile-info-container');
const input = document.getElementById('input');
const findBtn = document.getElementById('btn')
const avatar = document.querySelector('.avatar-img');
const userName = document.getElementById('user-id');
const joinedDate = document.querySelector('.joined-date');
const profileLink = document.getElementById('profile-link');
const bio = document.querySelector('.bio');
const repos = document.querySelector('.repo-number');
const followers = document.querySelector('.follower-number');
const followings = document.querySelector('.followings-number');
const userLocation = document.getElementById('location');
const githubLink = document.getElementById('github-link');
const twitter = document.getElementById('twitter');
const company = document.getElementById('company');
const anchorTag = document.querySelectorAll('a');
const errorImg = document.querySelector('.error-img');
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
console.log(profileContainer)

// display user on user's input
async function finder(user){
    let response = await fetch(`${url}${user}`);
    let data = await response.json();
    if(data.message!=='Not Found'){
        avatar.src = data.avatar_url;
        userName.innerText = data.login;
        let newDate = new Date(data.created_at);
        let month = newDate.getMonth();
        let formatted = months[month];
        let day = newDate.getDate();
        let year = newDate.getFullYear();
        joinedDate.innerText = `${formatted} ${day} ${year}`
        profileLink.innerText = `@${user}`;
        bio.innerText = data.bio || 'not available';
        repos.innerText = data.public_repos;
        followers.innerText = data.followers;
        followings.innerText = data.following;
        githubLink.textContent = data.html_url;
        userLocation.textContent = data.location || 'not available';
        twitter.textContent = data.twitter_username || 'not Available';
        company.textContent = data.company || 'not available';
        anchorTag.forEach(anchor=>{
            anchor.href = data.html_url;
        })
        profileContainer.classList.remove('err');
        errorImg.classList.remove('show');
    } else {
        profileContainer.classList.add('err');
        errorImg.classList.add('show')
    }
}
// get user id from the input value;
function getUser(){
    let userid = input.value;
    finder(userid);
    input.value = ''
}
btn.addEventListener('click',getUser)
input.addEventListener('keypress',(e)=>{
   if(e.key === 'Enter'){
    if(input.value!== ''){
        getUser()
    }
}
})

// enable dark mode + set to local storage
function enableDarkMode(){
    wrapper.classList.add('dark');
    profileContainer.classList.add('dark');
    followingDiv.classList.add('dark')
    moon.classList.add('hidden');
    sun.classList.add('active');
    localStorage.setItem('theme','dark')
}
// disable darkmode + set to local storage
function disableDarkMode(){
    wrapper.classList.remove('dark');
    profileContainer.classList.remove('dark');
    followingDiv.classList.remove('dark')
    moon.classList.remove('hidden');
    sun.classList.remove('active');
    localStorage.setItem('theme','white')
}

// get theme from local storage
let theme = localStorage.getItem('theme');
// if the theme is set to dark before then set the website to dark mode
if(theme==='dark'){
    enableDarkMode();
}
// toggle dark mode 
darkModeBtn.addEventListener('click',()=>{
    theme = localStorage.getItem('theme')
    if(theme!=='dark'){
        enableDarkMode()
    } else {
        disableDarkMode()
    }
})

// default user's id and info which is mine in this case
async function defaultUser(user){
    let response = await fetch(`${url}${user}`);
    let data = await response.json();
    avatar.src = data.avatar_url;
    userName.innerText = data.login;
    let newDate = new Date(data.created_at);
    let month = newDate.getMonth();
    let formatted = months[month]
    let day = newDate.getDate();
    let year = newDate.getFullYear();
    joinedDate.innerText = `${formatted} ${day} ${year}`
    profileLink.innerText = `@tulsirijal`;
    bio.innerText = data.bio || 'not available';
    repos.innerText = data.public_repos;
    followers.innerText = data.followers;
    followings.innerText = data.following;
    githubLink.textContent = data.html_url;
    userLocation.textContent = data.location || 'not available';
    twitter.textContent = data.twitter_username || 'not Available';
    company.textContent = data.company || 'not available';
    anchorTag.forEach(anchor=>{
        anchor.href = data.html_url;
    })
    console.log(formatted,day, year)
} 
defaultUser('tulsirijal');

