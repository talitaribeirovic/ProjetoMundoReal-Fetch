import {getUser} from '/src/scripts/services/getuser.js'
import {getRepositories} from '/src/scripts/services/getrepositories.js'
import {user} from '/src/scripts/objects/user.js'
import {screen} from '/src/scripts/objects/screen.js'
import {getEvents} from './services/getevents.js';

document.getElementById("btn-search").addEventListener("click", () => {
  const userName = document.getElementById("input-search").value;
  if(validateEmptyInput(userName)) return
    getUserData(userName);
});

document.getElementById("input-search").addEventListener("keyup", (e) => {
  const userName = e.target.value;
  const key = e.which || e.keyCode;
  const isEnterKeyPressed = key === 13;

  if (isEnterKeyPressed) {
    if(validateEmptyInput(userName)) return
    getUserData(userName)
  }
});

function validateEmptyInput(userName) {
  if(userName.length ===0){
    alert('Preencha o campo com o nome do usuário do Github')
    return true
  }
}


async function getUserData(userName) {

  const userResponse = await getUser(userName)
  if(userResponse.message ==="Not Found"){
    screen.renderNotFound()
    return
  }

  const repositoriesResponse = await getRepositories(userName)
  const eventsrepositories =await getEvents(userName)

  user.setInfo(userResponse)
  user.setRepositories(repositoriesResponse)
  user.setEvents(eventsrepositories)

  screen.renderUser(user)
}


