const myLibrary: Books[] = [];

class Books {
  title: string;
  author: string;
  pages: number;
  read: boolean;
  id: string;
  constructor(title: string, author: string, pages: number, read: boolean, id: string) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = id;
  }
}
const bookContainer = document.querySelector(".bookcard-container") as HTMLFormElement;
const showButton = document.querySelector("#btn-show");
const dialog = document.querySelector("dialog");
const addButton = document.querySelector(".btn-add");
const closeButton = document.querySelector("#closeButton");
const confirmButton = document.querySelector("#confirmBtn");
const bookForm = document.querySelector("#add-book-form") as HTMLFormElement;
const btnMode = document.querySelector("#mode") as HTMLFormElement;

btnMode?.addEventListener("click", () => {
  document.body.classList.toggle("light");
  if (document.body.classList.contains("light")) {
    btnMode.textContent = "🌙";
  } else {
    btnMode.textContent = "☀️";
  }
});

showButton?.addEventListener("click", () => {
  console.log(myLibrary);
});

closeButton?.addEventListener("click", () => {
  dialog?.close();
});

addButton?.addEventListener("click", () => {
  dialog?.showModal();
});

// closeButton?.addEventListener("click", (event) => {
//   event.preventDefault();
//   dialog?.close();
//   console.log(dialog?.returnValue);
// });

// console.log(crypto.randomUUID());

dialog?.addEventListener("submit", (event) => {
  event.preventDefault();
  dialog?.close();
  const formData = new FormData(bookForm);
  const bookData = {
    title: formData.get("book-title") as string,
    author: formData.get("author-name") as string,
    pages: parseInt(formData.get("pages") as string),
  };
  addBookToLibrary(bookData.title, bookData.author, bookData.pages, false);
});

function addBookToLibrary(title: string, author: string, pages: number, read: boolean): void {
  const book = new Books(title, author, pages, read, crypto.randomUUID());
  myLibrary.push(book);
  renderBooks(book);
}

function renderBooks(book: Books) {
  bookContainer.innerHTML += `
     <div class="bookcard">
        <div class="bookcard-content">
          <div class="book-title">
            <span class="title" id="author-name">${book.title}</span>
          </div>
          <div class="book-info">
            <span class="author">author: </span>
            <span class="value" id="author-name">${book.author}</span>
          </div>
          <div class="book-info">
            <span class="pages">pages: </span>
            <span class="value" id="author-name">${book.pages}</span>
          </div>
        </div>
        <div class="bookcard-footer">
          <button data-index="${book.id}" class="btn btn-delete" id="deleteBtn">Delete</button>
          <div class="status-container">
            <span class="status">read </span>
            <input data-index="${book.id}" type="checkbox" name="subscribe" value="yes" />
          </div>
        </div>
      </div>
    `;
  const readStatus = bookContainer.querySelectorAll("input[type='checkbox']");
  readStatus.forEach((checkbox) => {
    checkbox.addEventListener("change", (event) => {
      const target = event.target as HTMLInputElement;
      const index = myLibrary.findIndex((book) => book.id === target.dataset.index);
      if (target.checked) {
        if (index !== -1) {
          myLibrary[index].read = true;
        }
      } else {
        if (index !== -1) {
          myLibrary[index].read = false;
        }
      }
    });
  });
  const deleteBtns = bookContainer.querySelectorAll(".btn-delete");
  deleteBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.closest(".bookcard")?.remove();
      const removeId = (btn as HTMLButtonElement).dataset.index;
      const index = myLibrary.findIndex((book) => book.id === removeId);
      myLibrary.splice(index, 1);
    });
  });
}
