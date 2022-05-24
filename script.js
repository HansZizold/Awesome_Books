// An array that will store the data of our books.
let bookList = [];

const title = document.querySelector('.title');
const author = document.querySelector('.author');
const form = document.querySelector('#senddata');
const ullibrary = document.querySelector('.ullibrary');
const getmylibrary = JSON.parse(localStorage.getItem('mylibrary'));

// Definition of 'book' function which contains the html code that  
// will be added to our page dinamically. It has three variable arguments.

const book = ({ title, author, index }) => `
<li id=${index}>
  <p>${title}</p> 
  <p>${author}</p> 
  <button class="removebook" id="removebook" value="Add Book" onclick="">Remove</button>
  <hr>
</li>`;

// Function for adding books to our 'bookList' array
function addbooks() {
  // 'mybook' object will store the data entered from the user and also 
  // generates an index based on Date function.
  const mybook = { title: title.value, author: author.value, index: Date.now() };

  //'mybook' data is stored in our array 'booklist'
  bookList.push(mybook);

  //Clean the form
  title.value = '';
  author.value = '';
}

// Function for removing books of our 'bookList' array
function remove() {
  // The button created dinamically has the class 'removebook', so it is 
  // selected for the removing process
  const removebook = document.querySelectorAll('.removebook');
  console.log(removebook);

  // 'elem' will loop through the components of removebook
  removebook.forEach((elem) => {
    // for each 'elem' component we add en event listener of click type 
    elem.addEventListener('click', () => {
      // if the user press one of the 'remove' button, the parent node 
      // will be deleted of our dinamically generated html code. The parent
      // node includes the title, author and button fields
      elem.parentNode.remove();

      // from the 'bookList' array we remove the 'book' variable
      // need more explanation on this part
      bookList = bookList.filter((book) => book.index !== Number(elem.parentNode.id));

      //Update local storage
      localStorage.setItem('mylibrary', JSON.stringify(bookList));
    });
  });
}

// document.addEventListener('click', (e) => {
//   e.target;
//   console.log(e.target);
// })

// Function to add html code to  array and local storage
function addhtml() {
  //clean the ullibrary variable
  ullibrary.innerHTML = '';
  // need more explanation on this
  // why do we need a for loop to insert html code 
  bookList.forEach((element) => ullibrary.insertAdjacentHTML('beforeend', book(element)));
  // update local storage
  localStorage.setItem('mylibrary', JSON.stringify(bookList));
}

// Event listener of the form for adding books
form.addEventListener('submit', (e) => {
  // prevents the page to be reloaded
  e.preventDefault();
  // call the function for adding data and html
  addbooks();
  addhtml();
  // calling the remove function is neccesary in order to be able to use 
  // the remove functionality when trying to remove objects
  remove();
});

// when the page is reloaded, local storage data is loaded in 'bookList
// array and displayed in our page 
if (getmylibrary.length > 0) {
  // bookList array is updated with local storage content
  bookList = getmylibrary;
  // html code is generated
  addhtml();
  // calling the remove function is neccesary in order to be able to use 
  // the remove functionality when trying to remove objects
  remove();
}
