function loadData() {
    //create XHR object
    const xhr = new XMLHttpRequest();
    //open
    xhr.open('GET', 'content.txt', true); // third parameter set to true for asynchronous
    xhr.onload = function() {
        // Ready status is 4
        if(this.status === 200) {
            const div = document.getElementById('output');
            div.innerHTML = this.responseText;
        }
    };
    //send
    xhr.send();
}