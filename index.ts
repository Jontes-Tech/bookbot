// Read a file and print its contents.
import fs from "fs";
import axios from "axios"
const webhookVar = require("./config.json").webhook
const bookVar = require("./config.json").book
console.log(webhookVar)
const book = fs.readFileSync(bookVar, "utf8").split(/[!?.]/gm);
let sentence = Number(fs.readFileSync("sentence.txt", "utf8"));

console.log("BookBot By Jonte")

if (book[sentence] === undefined || book[sentence] === "") {
  console.log("Book over, going from the top!")
  sentence = 0
}

const options = {
  method: 'POST',
  url: `${webhookVar}`,
  headers: {
    'Content-Type': 'application/json'
  },
  data: {username: 'BookBot', content: `"${book[sentence].trim()}"`}
};

axios.request(options).then(function (response) {
  console.log("Successfully sent with code: "+response.status);
}).catch(function (error) {
  console.error(error);
});

fs.writeFileSync("sentence.txt", String(sentence + 1));