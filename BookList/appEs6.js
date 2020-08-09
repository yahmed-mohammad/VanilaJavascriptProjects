class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {
    addBookToList(book) {
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

    showAlert(message, className) {
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

    deleteBook(target) {
        if(target.className === 'delete') {
            target.parentElement.parentElement.remove();
            const ui = new UI();
            ui.showAlert('Book Removed Successfully!', 'success');
        }
    }

    clearFields() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }
}

//Local storage class
class Store {
    static displayBooks() {
        const books = Store.getBooks();

        books.forEach(function(book) {
            const ui = new UI;
            ui.addBookToList(book);
        })
    }

    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static getBooks() {
        let books;
        if(localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static removeBook(isbn) {
        const books = Store.getBooks();
        books.forEach(function(book, index) {
            if(book.isbn === isbn) {
                books.splice(index, 1);
            }
        })
        localStorage.setItem('books', JSON.stringify(books));
    }
}

//Event Listener for add book
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
        //Add to local storage
        Store.addBook(book);

        //show success alert
        ui.showAlert('Book successfully added', 'success');

        //Clear form field
        ui.clearFields();
    }
    
    e.preventDefault();
});

//Event Listener for delete ()
document.getElementById('book-list').addEventListener('click', function(e) {
    const ui = new UI();
    ui.deleteBook(e.target);

    //remove from localStorage
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
    e.preventDefault();
});

//DOM Load Event
document.addEventListener('DOMContentLoaded', Store.displayBooks());