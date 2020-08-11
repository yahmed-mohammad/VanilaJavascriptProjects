class UI {
    constructor() {
        this.profile = document.getElementById('profile');
    }
    
    showProfile(user) {
        this.profile.innerHTML = `
            <div class="card card-body mb-3">
                <div class="row">
                    <div class="col-md-3">
                        <img class="img-fluid mb-2" src="${user.avatar_url}">
                        <a href="${user.html_url}" target="_blank" class="btn btn-primary btn-block mb-3">
                            View Profile on Github
                        </a>
                    </div>
                    <div class="col-md-9">
                        <span class="badge badge-primary mb-1">Public Repositories: ${user.public_repos} </span>
                        <span class="badge badge-warning mb-1">Public Gists: ${user.public_gists} </span>
                        <span class="badge badge-success mb-1">Followers: ${user.followers} </span>
                        <span class="badge badge-info mb-1">Following: ${user.following} </span>
                        <br><br>
                        <ul class="list-group">
                            <li class="list-group-item"><b>Company:</b> ${user.company}</li>
                            <li class="list-group-item"><b>Website/Blog:</b> ${user.blog}</li>
                            <li class="list-group-item"><b>Location:</b> ${user.location}</li>
                            <li class="list-group-item"><b>Member Since:</b> ${user.created_at}</li>
                        </ul>
                    </div>
                </div>
            </div>
            <h4 class="mb-3">Latest Repositories</h4>
            <div id="repos"></div>
        `;
    }

    showRepos(repos) {
        let output;
        repos.forEach(function(repo) {
            output += `
                <div class="card card-body mb-2">
                    <div class="row">
                        <div class="col-md-6 ml-auto'>
                            <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                        </div>
                        <div class="col-md-6 ml-auto'>
                        <span></span>
                            <span class="badge badge-primary mb-1">Stars: ${repo.stargazers_count} </span>
                            <span class="badge badge-warning mb-1">Watchers: ${repo.watchers_count} </span>
                            <span class="badge badge-success mb-1">Forks: ${repo.forks_count} </span>
                        </div>
                    </div>
                </div>
            `;
        });
        //Show the repositories
        document.querySelector('#repos').innerHTML = output;
    }

    clearProfile() {
        this.profile.innerHTML = '';
    }
    showAlert(message, className) {
        this.clearProfile();
        //Create div
        const div = document.createElement('div');
        div.className = className;

        div.appendChild(document.createTextNode(message));

        //get parent where to insert the div
        const container = document.querySelector('.searchContainer');
        //get the search box
        const search = document.querySelector('.search');
        //insert the alert
        container.insertBefore(div, search); 

        setTimeout(() => {
            this.clearAlert()
        }, 3000);
    } 
    clearAlert() {
        const currentAlert = document.querySelector('.alert');
        if(currentAlert) {
            currentAlert.remove();
        }
    }
}