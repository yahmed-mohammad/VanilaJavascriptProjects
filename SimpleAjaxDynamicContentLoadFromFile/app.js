function loadData() {
    //create XHR object
    const xhr = new XMLHttpRequest();
    //open
    xhr.open('GET', 'content.txt', true); // third parameter set to true for asynchronous
    xhr.onload = function() {
        // Ready status is 4
        if(this.status === 200) {
            const div = document.getElementById('outputData');
            div.innerHTML = this.responseText;
        }
    };
    //send
    xhr.send();
}

function loadInfo() {
    //create XHR object
    const xhr = new XMLHttpRequest();
    //open
    xhr.open('GET', 'author.json', true); // third parameter set to true for asynchronous
    xhr.onload = function() {
        // Ready status is 4
        if(this.status === 200) {
            const author = JSON.parse(this.responseText);
            const div = document.getElementById('outputInfo');
            div.innerHTML = `
            <ul>
                <li>Name: ${author.name}</li>
                <li>Age: ${author.age}</li>
                <li>Company: ${author.company}</li>
                <li>Designation: ${author.designation}</li>
            </ul>`;
        }
    };
    //send
    xhr.send();
}