let myLibrary = [
    {
        author: "William Shakespeare",
        pages: "480",
        read: "Yes!",
        title: "Romeo and Juliet"
    }
];

const submitButton = document.getElementById("submit-button");
const addBookButton = document.getElementById("add-book");
const clearButton = document.getElementById("clear-button");
const deleteButtons = document.querySelectorAll(".delete-book-btn");
const changeButtons = document.querySelectorAll(".change-read-status-btn");
const titleInput = document.getElementById("book-title");
const authorInput = document.getElementById("book-author");
const pagesInput = document.getElementById("book-pages");
const readInput = document.getElementById("book-read");

/* function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
} */

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

renderHTML();

addBookButton.addEventListener("click", function (event) {
    showFormDiv();
})

submitButton.addEventListener("click", function (event) {
    addBookToLibrary();
});

clearButton.addEventListener("click", function (event) {
    clearForm();
})

titleInput.addEventListener('focusout', (event) => {
    setValidationClass(titleInput);
})

authorInput.addEventListener('focusout', (event) => {
    setValidationClass(authorInput);
})

pagesInput.addEventListener('focusout', (event) => {
    setValidationClass(pagesInput);
})

function setValidationClass(inputElement) {
    if (inputElement.value == "") {
        inputElement.classList.add("empty-input");
    } else {
        inputElement.classList.remove("empty-input");
    }
}

function showFormDiv() {
    document.getElementById("add-new-book").style.visibility = "visible";
}

function addBookToLibrary() {
    if (titleInput.value == "" || authorInput.value == "" || pagesInput.value == "") {
        alert("You have to fill all inputs!");
    } else {
        const title = titleInput.value;
        const author = authorInput.value;
        const pages = pagesInput.value;
        const read = readInput.value;

        const newBook = new Book(title, author, pages, read);
        myLibrary.push(newBook);

        clearForm();
        clearDOMLibrary();
        renderHTML();
    }
}

function clearForm() {
    titleInput.value = "";
    authorInput.value = "";
    pagesInput.value = "";
}

function renderHTML() {
    for (let i = 0; i < myLibrary.length; i++) {
        const bookObject = myLibrary[i];

        const bookWrapper = document.createElement("div");
        bookWrapper.classList.add('book');
        bookWrapper.setAttribute('id', i);
        bookObject.id = i;

        const bookContent = document.createElement("div");
        bookContent.classList.add("book-content");

        const bookTitle = document.createElement("div");
        bookTitle.innerHTML = bookObject.title;
        bookTitle.classList.add("book-title");

        const bookAuthor = document.createElement("div");
        bookAuthor.innerHTML = "By: " + bookObject.author;
        bookAuthor.classList.add("book-author");

        const bookPages = document.createElement("div");
        bookPages.innerHTML = "Number of pages: " + bookObject.pages;
        bookPages.classList.add("book-pages");

        const bookRead = document.createElement("div");
        bookRead.innerHTML = "Have I read it? " + bookObject.read;
        bookRead.classList.add("book-read");

        const bookButtons = document.createElement("div");
        bookButtons.classList.add("book-buttons");

        const bookButtonDelete = document.createElement("button");
        bookButtonDelete.innerHTML = "Delete book";
        bookButtonDelete.classList.add("delete-book-btn");

        const bookButtonRead = document.createElement("button");
        bookButtonRead.innerHTML = "Change read status";
        bookButtonRead.classList.add("change-read-status-btn");

        bookButtonDelete.addEventListener('click', deleteBook);
        bookButtonRead.addEventListener('click', changeReadStatus);

        bookWrapper.appendChild(bookContent);
        bookContent.appendChild(bookTitle);
        bookContent.appendChild(bookAuthor);
        bookContent.appendChild(bookPages);
        bookContent.appendChild(bookRead);

        bookWrapper.appendChild(bookButtons);
        bookButtons.appendChild(bookButtonDelete);
        bookButtons.appendChild(bookButtonRead)

        document.getElementById("library").appendChild(bookWrapper);
    }
}

function clearDOMLibrary() {
    const booksToDelete = document.querySelectorAll('.book');

    booksToDelete.forEach(bookDiv => {
        bookDiv.remove();
    });
}

function deleteBook(event) {
    if (confirm("Are you sure?")) {
        myLibrary = myLibrary.filter(book => {
            return book.id != event.target.parentElement.parentElement.id;
        });

        clearDOMLibrary();
        renderHTML();
    }
}

function changeReadStatus(event) {
    for (let i = 0; i < myLibrary.length; i++) {
        const bookObject = myLibrary[i];

        if (bookObject.id == event.target.parentElement.parentElement.id) {
            if (bookObject.read == "Yes!") {
                bookObject.read = "Not yet."
            } else {
                bookObject.read = "Yes!"
            }
        }
    }

    clearDOMLibrary();
    renderHTML();
}


