//Initialize Github & UI class
const github = new Github;
const ui = new UI;
//Get search element
const searchUser = document.getElementById('searchUser');

//Event listener for search
searchUser.addEventListener('keyup', (e) => {
    //get input text
    const userText = e.target.value;
    if(userText !== '') {
        //Make http call
        github.getUser(userText)
            .then(data => {
                if(data.profile.message === 'Not Found') {
                    //clear previous alert
                    ui.clearAlert();
                    // Show error alert
                    ui.showAlert('User not found', 'alert alert-danger');
                } else {
                    // Show profile
                    ui.showProfile(data.profile);
                    // Show Repositories
                    ui.showRepos(data.repos);
                }
            })
    } else {
        // Clear profile
        ui.clearProfile();
    }
})