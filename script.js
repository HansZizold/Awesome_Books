let bookList = [];

const title = document.querySelector('.title');
const author = document.querySelector('.author');
const form = document.querySelector('#senddata');
const ullibrary = document.querySelector('.ullibrary');
const getmylibrary = JSON.parse(localStorage.getItem('mylibrary'));

const book = ({ title, author, index }) => `
<li id=${index}>
  <p>${title}</p> 
  <p>${author}</p> 
  <button class="removebook" id="removebook" value="Add Book" onclick="">Remove</button>
  <hr>
</li>`;

function addbooks() {
  const mybook = { title: title.value, author: author.value, index: Date.now() };
  bookList.push(mybook);
  title.value = '';
  author.value = '';
}

function remove() {
  const removebook = document.querySelectorAll('.removebook');
  removebook.forEach((elem) => {
    elem.addEventListener('click', () => {
      elem.parentNode.remove();
      bookList = bookList.filter((book) => book.index !== Number(elem.parentNode.id));
      localStorage.setItem('mylibrary', JSON.stringify(bookList));
    });
  });
}

function addhtml() {
  ullibrary.innerHTML = '';
  bookList.forEach((element) => ullibrary.insertAdjacentHTML('beforeend', book(element)));
  localStorage.setItem('mylibrary', JSON.stringify(bookList));
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  addbooks();
  addhtml();
  remove();
});

if (getmylibrary.length > 0) {
  bookList = getmylibrary;
  addhtml();
  remove();
}
