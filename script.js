let bookList = [];

const library = document.querySelector(".library"); 
const title = document.querySelector(".title"); 
const author = document.querySelector(".author"); 
const form = document.querySelector("#senddata");
const ullibrary = document.querySelector(".ullibrary");
const getmylibrary = JSON.parse(localStorage.getItem('mylibrary'));

const book = ({title,author,index}) => `
<li id=${index}>
  <p>${title}</p> 
  <p>${author}</p> 
  <button class="removebook" id="removebook" value="Add Book" onclick="">Remove</button>
</li>`;

function addbooks() {
  let mybook = {title: title.value, author: author.value, index: Date.now()};
  bookList.push(mybook);
  // console.log(bookList);
  title.value = '';
  author.value = '';
}

form.addEventListener('submit',(e)=>{
  e.preventDefault();
  addbooks();
  addhtml();
});

function addhtml() {
  ullibrary.innerHTML='';
  bookList.forEach(element=>ullibrary.insertAdjacentHTML('beforeend',book(element)));
  localStorage.setItem('mylibrary', JSON.stringify(bookList));
}

if(getmylibrary.length > 0) {
  bookList = getmylibrary;
  addhtml();
}



