import fs from "fs";
import axios from "axios"
const config = require("./config.json")
const book = fs.readFileSync(`./books/${config.book}`, "utf8").split(/[!?.]/gm);
const sentence = Number(fs.readFileSync("sentence.txt", "utf8"));

console.log("BookBot By Jonte")

const refillOptions = {
  method: 'POST',
  url: `${config.webhook}`,
  headers: {
    'Content-Type': 'application/json'
  },
  data: { username: 'BookBot', content: `📖 <@${config.owner}> Book is over, please refill the program with more text. Contact Jonte for details.` }
};
if (book[sentence] === undefined || book[sentence] === "") {
  axios.request(refillOptions).then(function (response) {
    console.log("Book over, pinging owner!")
    process.exit(0);
  }).catch(function (error) {
    console.error(error);
  });
}
else {

  const options = {
    method: 'POST',
    url: `${config.webhook}`,
    headers: {
      'Content-Type': 'application/json'
    },
    data: { username: 'BookBot', content: `"${book[sentence].trim()}"` }
  };
  axios.request(options).then(function (response) {
    console.log("Successfully sent with code: " + response.status);
  }).catch(function (error) {
    console.error(error);
  });
}

fs.writeFileSync("sentence.txt", String(sentence + 1));