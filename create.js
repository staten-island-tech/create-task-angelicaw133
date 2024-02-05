const URL = "https://api.quotable.io/random";
const DOMSelectors = {
  form: document.querySelector("#form"),
  guess: document.querySelector(".guess_author"),
  button: document.querySelector(".button"),
};
let arr = []
function button_click() {
  let btn = document.querySelector("button");
  btn.addEventListener("click", function () {
    async function getData(URL) {
      try {
        const response = await fetch(URL);
        if (response.status != 200) {
          throw new Error(response.statusText);
        }
        let datar = await response.json();
        document.querySelector("h2").textContent = datar.content;
        guess(datar);
        let author = datar.author;
        let quote = datar.content;
        console.log(author, quote);
      } catch (error) {
        console.log(error, "please try again later");
      }
    }
    getData(URL);


  });
}
button_click();

function guess(data) {
  DOMSelectors.button.addEventListener("click", function (event) {
    event.preventDefault();
    // console.log(author, quote
    let author = data.author;
    let quote = data.content;
    let guess = DOMSelectors.guess.value;
    check_guess(author, quote, guess);
    data = "";
    calculate_arr(arr)
  });
}

function check_guess(author, quote, guess) {
  if (guess == author) {
    return insert_right(quote, guess);

  } else if (quote == undefined) {
    return "";
  } else {
    insert_wrong(quote, author, guess);

  }
}

function insert_wrong(quote, author, guess) {
  document.querySelector(".arr_container").insertAdjacentHTML(
    "afterbegin",
    ` <div class="wrong_ans">
    <h2>Quote: ${quote}</h2>
    <h3>Your Guess: ${guess}</h3>
    <h3>YOU ARE WRONG!</h3>
    <h3>Right Answer: ${author}</h3>
</div>`
  );
  clear()
  let number = 0;
  arr.push(number)
}

function insert_right(quote, guess) {
  document.querySelector(".arr_container").insertAdjacentHTML(
    "afterbegin",
    `   <div class="right_ans">
    <h2>Quote: ${quote}</h2>
    <h3>Your Guess: ${guess}</h3>
    <h3>YOU ARE RIGHT!</h3>
</div>`
  );
  clear()
  let number = 1;
  arr.push(number);
}

function calculate_arr(arr) {
  let total = 0;
  for (let i = 0; i < arr.length; i++) {
    total += arr[i];
  }
  let percentage = (total / arr.length) * 100;
  let rounded = Math.round(percentage);
  console.log(percentage + "%");
  document.querySelector(".percent_success").insertAdjacentHTML(
    "afterbegin",
    `${rounded + "% success rate"}`
  )
}

function clear() {
  DOMSelectors.guess.value = "";
  document.querySelector("h3").innerHTML= "";
}