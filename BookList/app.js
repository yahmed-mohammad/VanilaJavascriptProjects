//Book Constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}
//UI Constructor
function UI() {

}
UI.prototype.addBookToList = function(book) {
    const list = document.getElementById('book-list');

    //create table row element
    const row = document.createElement('tr');
    //Insert columns
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="" class="delete">x</a></td>
    `;
    list.appendChild(row);
}

UI.prototype.clearFields = function() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

UI.prototype.showAlert = function(message, className) {
    //create element
    const div = document.createElement('div');
    //add className
    div.className = `alert ${className}`;
    //add text
    div.appendChild(document.createTextNode(message));
    //get parent where to insert
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');

    container.insertBefore(div, form);

    //set timeout
    setTimeout(function() {
        document.querySelector('.alert').remove();
    }, 3000);
}

//Event Listeners
document.getElementById("book-form").addEventListener('submit', function(e) {
    //get form values
    const title= document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;

    //Instantiate book    
    const book = new Book(title, author, isbn);
    //Instantiate UI
    const ui = new UI();

    //validate the fields
    if(title === '' ||  author === '' || isbn === '') {
        // Error alert
        ui.showAlert('Please fill in all fields', 'error');
    } else {
        //Add book to list
        ui.addBookToList(book);
        //show success alert
        ui.showAlert('Book successfully added', 'success');

        //Clear form field
        ui.clearFields();
    }
    
    e.preventDefault();
});