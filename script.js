// const bookList = [];

const title = document.querySelector('.title');
const author = document.querySelector('.author');
const form = document.querySelector('#senddata');
const ullibrary = document.querySelector('.ullibrary');
const getmylibrary = JSON.parse(localStorage.getItem('mylibrary'));

const book = ({ title, author, index }) => `
<li id=${index}>
  <p>'${title}' by ${author} </p> 
  <button class="removebook" id="removebook" value="Add Book" onclick="">Remove</button>
</li>`;

class Book {
  constructor() {
    this.bookList = [];
  }

  addbooks() {
    const mybook = {
      title: title.value,
      author: author.value,
      index: Date.now(),
    };

    this.bookList.push(mybook);

    title.value = '';
    author.value = '';
  }

  remove() {
    const removebook = document.querySelectorAll('.removebook');

    removebook.forEach((elem) => {
      elem.addEventListener('click', () => {
        elem.parentNode.remove();

        this.bookList = this.bookList.filter(
          (book) => book.index !== Number(elem.parentNode.id),
        );

        localStorage.setItem('mylibrary', JSON.stringify(this.bookList));
      });
    });
  }

  addhtml() {
    ullibrary.innerHTML = '';
    this.bookList.forEach((element) => ullibrary.insertAdjacentHTML('beforeend', book(element)));

    localStorage.setItem('mylibrary', JSON.stringify(this.bookList));
  }
}

const myBooks = new Book();

const listSelector = document.getElementById('list');
const addBooksSelector = document.getElementById('Add-New');
const contactSelector = document.getElementById('Contact');
const addmybooks = document.querySelector('.addmybooks');
const contactInfo = document.querySelector('.contact-info');
const bookshelf = document.querySelector('.bookshelf');

function showMyBooks() {
  addmybooks.style.display = 'none';
  contactInfo.style.display = 'none';
  bookshelf.style.display = 'unset';
}

listSelector.addEventListener('click', showMyBooks);

function addNewBook() {
  addmybooks.style.display = 'unset';
  contactInfo.style.display = 'none';
  bookshelf.style.display = 'none';
}

addBooksSelector.addEventListener('click', addNewBook);

function contact() {
  addmybooks.style.display = 'none';
  contactInfo.style.display = 'unset';
  bookshelf.style.display = 'none';
}

contactSelector.addEventListener('click', contact);

form.addEventListener('submit', (e) => {
  e.preventDefault();
  myBooks.addbooks();
  myBooks.addhtml();
  myBooks.remove();
});

if (getmylibrary.length > 0) {
  myBooks.bookList = getmylibrary;
  myBooks.addhtml();
  myBooks.remove();
}
