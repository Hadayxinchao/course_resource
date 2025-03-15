const myLibrary = [];

function Book(title, author, pages, read) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

Book.prototype.toggleRead = function() {
  this.read = !this.read;
};

addBookToLibrary(new Book('1984', 'George Orwell', 328, false));
addBookToLibrary(new Book('Pride and Prejudice', 'Jane Austen', 432, true));
addBookToLibrary(new Book('The Great Gatsby', 'F. Scott Fitzgerald', 180, true));
addBookToLibrary(new Book('To Kill a Mockingbird', 'Harper Lee', 281, false));
addBookToLibrary(new Book('Don Quixote', 'Miguel de Cervantes', 863, false));
addBookToLibrary(new Book('The Catcher in the Rye', 'J.D. Salinger', 234, true));
addBookToLibrary(new Book('Lord of the Flies', 'William Golding', 224, true));

function displayBooks(){
  const booksGrid = document.querySelector('.books-grid');
  booksGrid.innerHTML = '';

  myLibrary.forEach(book => {
    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');

    bookCard.innerHTML = `
      <h2>${book.title}</h2>
      <p class="book-info"> by ${book.author}</p>
      <p class="book-info">Pages: ${book.pages}</p>
      <div class="book-info">
      <input type="checkbox" id="read-${book.id}" 
        class="read-status" 
        data-id="${book.id}" 
        ${book.read ? 'checked' : ''}>
      <label for="read-${book.id}">Read</label>
      </div>
      <button class="remove-book" data-id="${book.id}">Remove</button>  
    `;
    
    bookCard.querySelector('.read-status').addEventListener('change', (e) => {
      const bookId = e.target.dataset.id;
      const book = myLibrary.find(book => book.id === bookId);
      if (book) book.toggleRead();
    });

    bookCard.querySelector('.remove-book').addEventListener('click', (e) => {
      const bookId = e.target.dataset.id;
      const index = myLibrary.findIndex(book => book.id === bookId);
      if (index > -1) myLibrary.splice(index, 1);
      displayBooks();
    });

    booksGrid.appendChild(bookCard);
  })
}

displayBooks();

document.querySelector('#addBook').addEventListener('click', (event) => {
  event.preventDefault();
  const title = document.querySelector('input#bookTitle').value;
  const author = document.querySelector('input#bookAuthor').value;
  const pages = document.querySelector('input#bookPages').value;
  const read = document.querySelector('input#bookRead').value;

  addBookToLibrary(new Book(title, author, pages, read));
  displayBooks();
});
