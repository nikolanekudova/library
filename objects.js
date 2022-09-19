let myLibrary = [];
let title = "";
let author = "";
let pages = 0;
let read = "";
let book = {};
const submitButton = document.getElementById("submit-button");
const addBookButton = document.getElementById("add-book");
const clearButton = document.getElementById("clear-button");


let myElementForBookTitle;
let myElementForBookAuthor;
let myElementForBookPages;
let myElementForBookRead;
let myElementForButtonDelete;
let myElementForButtonChange;
let myElementForButtons;

submitButton.addEventListener("click", function(event) {
    addBookToLibrary();
});

addBookButton.addEventListener("click", function(event) {
    showDiv();
})

clearButton.addEventListener("click", function(event) {
    clearForm();
})


function showDiv() {
    document.getElementById("add-new-book").style.display = "";
}

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary() {
    title = document.getElementById("book-title").value;
    author = document.getElementById("book-author").value;
    pages = document.getElementById("book-pages").value;
    read = document.getElementById("book-read").value;

    clearForm();
    const book = new Book(title, author, pages, read);

    myLibrary.push(book);

    deleteBooksFromLibrary();

    addBookToDiv(myLibrary);
}

function clearForm() {
    document.getElementById("book-title").value = "";
    document.getElementById("book-author").value = "";
    document.getElementById("book-pages").value = "";
}

function addBookToDiv(myLibrary) {
    for (let i = 0; i < myLibrary.length; i++) {

        let myObject = myLibrary[i];

        myElementForBook = document.createElement("div");
        myElementForBook.classList.add('book', 'delete-book');
        document.getElementById("library-id").appendChild(myElementForBook);
        myElementForBook.setAttribute('id', [i])
        console.log("id is: " + myElementForBook.id);

        myElementForBookContent = document.createElement("div");
        myElementForBookContent.classList.add("book-content");
        myElementForBook.appendChild(myElementForBookContent);

        myElementForBookTitle = document.createElement("div");
        myElementForBookTitle.classList.add("book-title");
        myElementForBookContent.appendChild(myElementForBookTitle);

        myElementForBookAuthor = document.createElement("div");
        myElementForBookAuthor.classList.add("book-author");
        myElementForBookContent.appendChild(myElementForBookAuthor);

        myElementForBookPages = document.createElement("div");
        myElementForBookPages.classList.add("book-pages");
        myElementForBookContent.appendChild(myElementForBookPages);

        myElementForBookRead = document.createElement("div");
        myElementForBookRead.classList.add("book-read");
        myElementForBookContent.appendChild(myElementForBookRead);

        myElementForButtons = document.createElement("div");
        myElementForButtons.classList.add("book-buttons");
        myElementForBook.appendChild(myElementForButtons);

        myElementForButtonDelete = document.createElement("button");
        myElementForButtonDelete.classList.add("delete-book-btn");
        myElementForButtons.appendChild(myElementForButtonDelete).innerHTML = "Delete book";

        myElementForButtonChange = document.createElement("button");
        myElementForButtonChange.classList.add("change-reed-status-btn");
        myElementForButtons.appendChild(myElementForButtonChange).innerHTML = "Change read status";


        for (const property in myObject) {
            //console.log(`${property}: ${myObject[property]}`)

            if (property === "title") {
                myElementForBookTitle.innerHTML = myObject[property];
            } else if (property === "author") {
                myElementForBookAuthor.innerHTML = "By: " + myObject[property];
            } else if (property === "pages") {
                myElementForBookPages.innerHTML = "Number of pages: " + myObject[property];
            } else {
                myElementForBookRead.innerHTML = "Did I read it? " + myObject[property];
            }
        }

        }
    }

function deleteBooksFromLibrary() {
    const booksForDelete = document.querySelectorAll('.delete-book');
    
    booksForDelete.forEach(booksForDelete => {
      booksForDelete.remove();
    });
}
