//button event listeners for create new book, add new book to page, close modal
const addBtn = document.querySelector('#addBtn');
addBtn.addEventListener('click', addBookToLibrary);

const newBookBtn = document.querySelector('#newBtn');
newBookBtn.addEventListener('click', () => {
  modalForm.classList.add('active');
  overlay.classList.add('active');
});

const modalForm = document.getElementById('modal');
const overlay = document.getElementById('overlay');
const closemodal = document.getElementsByTagName('span')[0];
closemodal.addEventListener('click', () => {
  modalForm.classList.remove('active');
  overlay.classList.remove('active');
} );


//Book Constructor
class Book {
    constructor(title, author, pages, read) {
        this.title = form.title.value; 
        this.author = 'By ' + form.author.value; 
        this.pages = form.pages.value + ' Pages'; 
        this.read = form.read.checked; 
    }
}

//creates book from Book Constructor, adds to library
let myLibrary = [];
let newBook;

function addBookToLibrary() {
    event.preventDefault();
    modalForm.classList.remove('active');
    overlay.classList.remove('active');

    newBook = new Book(title, author, pages,read);
    if(newBook.title == '' || newBook.author == '' || newBook.pages == ''){}
    else{
      myLibrary.push(newBook); 
      setData();  //saves updated array in local storage
      render(); 
      form.reset();
    }
}

//Creates book visual in browser
function render() {
    const display = document.getElementById('Library-container');
    const books = document.querySelectorAll('.book');
    books.forEach(book => display.removeChild(book));
   
    for (let i=0; i<myLibrary.length; i++){
        createBook(myLibrary[i]);
    }
}

//creats book DOM elements, to use in render();
function createBook(item) {
    const library = document.querySelector('#Library-container');
    const bookDiv = document.createElement('div');
    const titleDiv = document.createElement('div');
    const authDiv = document.createElement('div');
    const pageDiv = document.createElement('div');
    const buttonGroup = document.createElement('div');
    const removeBtn = document.createElement('button');
    const readBtn = document.createElement('button');
    
    
    bookDiv.classList.add('book');
    bookDiv.setAttribute('id', myLibrary.indexOf(item));

    titleDiv.textContent = item.title;
    titleDiv.classList.add('title');
    bookDiv.appendChild(titleDiv);

    authDiv.textContent = item.author;
    authDiv.classList.add('author');
    bookDiv.appendChild(authDiv);

    pageDiv.textContent = item.pages;
    pageDiv.classList.add('pages');
    bookDiv.appendChild(pageDiv);

    buttonGroup.classList.add('buttonGroup');
    bookDiv.appendChild(buttonGroup);

    readBtn.classList.add('readBtn')    
    buttonGroup.appendChild(readBtn);
    if(item.read===false) {
        readBtn.textContent = 'Not Read';
        readBtn.style.backgroundColor = '#85182a';
        readBtn.style.color = 'white';
    }else {
        readBtn.textContent = 'Read';
        readBtn.style.backgroundColor = '#1a7431';
        readBtn.style.color = 'white';
    }

    removeBtn.textContent = 'Remove'; 
    removeBtn.setAttribute('id', 'removeBtn');
    buttonGroup.appendChild(removeBtn);
    
    library.appendChild(bookDiv);

    removeBtn.addEventListener('click', () => {
        myLibrary.splice(myLibrary.indexOf(item),1);
        setData()
        render();
    });

    //add toggle ability to each book 'read' button on click
    readBtn.addEventListener('click', () => { 
        item.read = !item.read; 
        setData(); 
        render();
    }); 
};

// setting Library to be stored in local storage
function setData() {
    localStorage.setItem(`myLibrary`, JSON.stringify(myLibrary));
}

//pulls books from local storage when page is refreshed
function restore() {
    if(!localStorage.myLibrary) {
        render();
    }else {
        let objects = localStorage.getItem('myLibrary') // gets information from local storage to use in below loop to create DOM/display
        objects = JSON.parse(objects);
        myLibrary = objects;
        render();
    }
}

restore();
