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
  this.element = document.createElement("div");
  this.element.classList.add("book");
  this.backgroundColor = backgroundColor;
  this.textColor = textColor;
  this.displayed = false;
}

// take params, create a book then store it in the array
function addBookToLibrary(title, author, numpages, read) {
  const { backgroundColor, textColor } = generateRandomDarkLightColors();
  const book = new Book(title, author, numpages, read, backgroundColor, textColor);
  library.push(book);
}

function displayBook(book) {
  this.element.style.backgroundColor = generateRandomHexColor();  // random color
}

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

  // Ensure the second color has the opposite luminance
  const secondColor = generateRandomColor();
  if (secondColor.isLight === firstColor.isLight) {
    // Flip the luminance by adjusting RGB values
    secondColor.r = 255 - secondColor.r;
    secondColor.g = 255 - secondColor.g;
    secondColor.b = 255 - secondColor.b;
  }

  return { firstColor, secondColor };
}

const divLibrary = document.querySelector("#library")

const newbookButton = document.querySelector("#newbook");
newbookButton.addEventListener("click", () => {
  console.log("oi");
  addBookToLibrary("Teste");
});

