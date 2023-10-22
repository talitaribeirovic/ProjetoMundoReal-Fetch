const screen = {
  userProfile: document.querySelector(".profile-data"),
  renderUser(user) {
    this.userProfile.innerHTML = `<div class="info">
                                  <img src="${user.avatarUrl}" alt="Foto do perfil do usuário"/>
                                  <div class="data"> 
                                    <h1>${user.name ?? "Não possui nome cadastrado 😿"}</h1>
                                    <p>${user.bio ?? "Não possui bio cadastrada 😿"}</p>

                                    <div class="followers">
                                      <div class="followers-itens">
                                        <h3>${user.followers}</h3>
                                        <p>👥Seguidores<p>
                                      </div>
                                      <div class="followers-itens">
                                        <h3>${user.following}</h3>
                                        <p>👥Seguindo<p>
                                      </div>
                                    </div>



                                  </div>
                                  </div>`;


    let repositoriesItens = "";
    user.repositories.forEach(
      (repo) =>
        (repositoriesItens += `<li><a href="${repo.html_url}" target="_blank">
                                      <h3>${repo.name}</h3>
                                      <i>🍴${repo.fork_count}</i>
                                      <i>⭐${repo.stargazers_count}</i>
                                      <i>👀${repo.watchers_count}</i>
                                      <i>👩‍💻${repo.language?? 'Sem Liguagem'}</i>
                                    </a>
                              </li>`)
    );

    if (user.repositories.length > 0) {
      this.userProfile.innerHTML += `<div class=" repositories section">
                                        <h2>Repositórios</h2>
                                        <ul>${repositoriesItens}</ul>
                                      </div>`;
    }

    if (user.events.length > 0) {
      let eventsItens = "";
      user.events.forEach(element => {
        if (element.type === 'PushEvent') {
          eventsItens += `<li><h3><strong>${element.repo.name}</strong></h3>
                            <p> -- ${element.payload.commits[0].message}</p>`
        }

        this.userProfile.innerHTML += `<div class="events section">
                                            <h2>Eventos</h2>
                                            <ul>${eventsItens}</ul>
                                        </div>`      
      })
    }




  },

  
  renderNotFound() {
    this.userProfile.innerHTML = "<h3>Usuário não encontrado🔎</h3>";
  },
};

export { screen };
