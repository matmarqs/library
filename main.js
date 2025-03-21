const library = []; // array of books

// Color constructor
function Color(r, g, b) {
  if (  // Validate RGB values
    typeof r !== "number" || r < 0 || r > 255 ||
    typeof g !== "number" || g < 0 || g > 255 ||
    typeof b !== "number" || b < 0 || b > 255
  ) {
    throw new Error("Invalid RGB values. Each value must be a number between 0 and 255.");
  }

  this.r = r;
  this.g = g;
  this.b = b;

  this.rgb = function() {
    return `rgb(${this.r}, ${this.g}, ${this.b})`;
  };

  this.hex = function() {
    const toHex = (value) => value.toString(16).padStart(2, "0").toUpperCase();
    return `#${toHex(this.r)}${toHex(this.g)}${toHex(this.b)}`;
  };

  this.luminance = function() {
    return (0.299 * this.r + 0.587 * this.g + 0.114 * this.b) / 255;
  };

  this.isLight = function() {
    return this.luminance() > 0.5;
  };
}

// Book constructor
function Book(title, author, numpages, read, backgroundColor, textColor) {
  if (!title || !author || !numpages || read === undefined) { // Validate required fields
    throw new Error("Missing required book properties");
  }
  this.id = crypto.randomUUID();
  this.title = title
  this.author = author;
  this.numpages = numpages;
  this.read = read;
  this.backgroundColor = backgroundColor;
  this.textColor = textColor;
  this.displayed = false;
  this.component = document.createElement("div");
  this.component.classList.add("book-component");
  this.component.style = `--book-background: ${this.backgroundColor};` +
    `--text-color: ${this.textColor}; --left-side-background: ${this.backgroundColor};`
}

// take params, create a book then store it in the array
function addBookToLibrary(title, author, numpages, read) {
  const [backgroundColor, textColor] = generateRandomDarkLightColors();
  const book = new Book(title, author, numpages, read, backgroundColor, textColor);
  library.push(book);
}

function displayBook(book) {
  const bookContainer = document.createElement("div");
  bookContainer.classList.add("book-container");
  book.component.appendChild(bookContainer);

  const bookElement = document.createElement("div");
  bookElement.classList.add("book");
  bookContainer.appendChild(bookElement);

  const bookFront = document.createElement("div");
  bookFront.classList.add("book-front");
  bookElement.appendChild(bookFront);

  const bookCover = document.createElement("div");
  bookCover.classList.add("book-cover");
  bookFront.appendChild(bookCover);

  const h1Title = document.createElement("h1");
  h1Title.classList.add("title");
  h1Title.textContent = book.title;
  bookCover.appendChild(h1Title);

  const authorP = document.createElement("p");
  authorP.classList.add("author");
  authorP.textContent = book.author;
  bookCover.appendChild(authorP);

  const bookLeftSide = document.createElement("div")
  bookLeftSide.classList.add("left-side");
  bookElement.appendChild(bookLeftSide);

  const h2 = document.createElement("h2")
  bookLeftSide.appendChild(h2);

  const spanAuthor = document.createElement("span")
  h2.appendChild(spanAuthor);
  spanAuthor.textContent = book.author;
  const spanTitle = document.createElement("span")
  spanTitle.textContent = book.title;
  h2.appendChild(spanTitle);

  const details = document.createElement("div");
  details.classList.add("details");
  book.component.appendChild(details);

  const status = document.createElement("p");
  status.classList.add("status");
  if (book.read) {
    status.innerHTML = 'Read: <span class="read-status">Yes</span>'  // constant string => safe
  }
  else {
    status.innerHTML = 'Read: <span class="unread-status">No</span>'  // constant string => safe
  }
  details.appendChild(status);

  const pages = document.createElement("p");
  pages.classList.add("pages");
  pages.textContent = `Pages: ${book.numpages}`
  details.appendChild(pages);

  divLibrary.appendChild(book.component);
}

// <div class="book-component" style="--book-background: #ff6f61; --text-color: white; --left-side-background: #ff6f61;">
//   <div class="book-container">
//     <div class="book">
//       <div class="front">
//         <div class="cover">
//          <h1 class="title">1984</h1>
//           <p class="author">George Orwell</p>
//         </div>
//       </div>
//       <div class="left-side">
//         <h2>
//           <span>George Orwell</span>
//           <span>1984</span>
//         </h2>
//       </div>
//     </div>
//   </div>
//   <!-- Details section -->
//   <div class="details">
//     <p class="status">Read: <span class="read-status">Yes</span></p>
//     <p class="pages">Pages: 328</p>
//   </div>
// </div>

//display them in some sort of table, or cards
function displayAllBooks() {
  library.forEach(book => {
    if (!book.displayed) {
      displayBook(book);
      book.displayed = true;
    }
  });
}

function generateRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return new Color(r, g, b);
}

// Generate contrasting colors (one light, one dark)
function generateRandomDarkLightColors() {
  const firstColor = generateRandomColor();

  // Ensure the second color has the opposite contrast (black or white)
  const secondColor = firstColor.isLight() ? new Color(0, 0, 0) : new Color(255, 255, 255);

  return [firstColor.hex(), secondColor.hex()];
}

const divLibrary = document.querySelector("#library")

const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const bookname = document.querySelector("#bookname")
  const authorname = document.querySelector("#authorname")
  const numPages = document.querySelector("#numpages")
  const formData = new FormData(form);
  const read = formData.get("read-status") === "true" ? true : false;
  addBookToLibrary(bookname.value, authorname.value, Number(numPages.value), read);
  displayAllBooks();
});

