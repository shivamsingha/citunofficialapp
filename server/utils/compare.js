const fs = require('fs').promises;
const scraper = require('./scraper')

async function compare() {
  let newResult, oldResult;
  try {
    newResult = await scraper();
    try {
      oldResult = await fs.readFile("result.json", { flag: "a+" });
      const newResultString = JSON.stringify(newResult)
      if (oldResult.toString() != newResultString) {
        console.log("result changed. writing to json file")
        try {
          await fs.writeFile("result.json", newResultString);
        } catch (e) {
          console("fs.writeFile error");
          console.log(e);
        }
      }
      else
        console.log("result unchanged.")
    } catch (e) {
      console.log("fs.readFile error");
      console.log(e);
    }
  } catch (e) {
    console.log("Scraper Error");
    console.log(e);
  }
}

compare();