function loadData() {
    //Fetch API method
    fetch('content.txt')
        .then(function(result) {
            return result.text(); // returns a promise object
        })
        .then(function(data) {
            document.getElementById('outputData').innerHTML = data;
        })
}

function loadInfo() {
    fetch('author.json')
        .then(function(result) {
            return result.json(); // returns a promise object
        })
        .then(function(author) {
            const div = document.getElementById('outputInfo');
            div.innerHTML = `
            <ul>
                <li>Name: ${author.name}</li>
                <li>Age: ${author.age}</li>
                <li>Company: ${author.company}</li>
                <li>Designation: ${author.designation}</li>
            </ul>`;
        })
}