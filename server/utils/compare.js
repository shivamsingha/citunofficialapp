const fs = require('fs').promises;
const scraper = require('./scraper');

const filePath = `${process.env.RESULT_PATH || process.cwd()}/result.json`;

async function compare() {
  let newResult,
    oldResult,
    flag = false;
  try {
    newResult = await scraper();
    try {
      oldResult = await fs.readFile(filePath, { flag: 'a+' });
      const newResultString = JSON.stringify(newResult);
      if (oldResult.toString() != newResultString) {
        flag = true;
        console.log('result changed. writing to json file');
        try {
          await fs.writeFile(filePath, newResultString);
        } catch (e) {
          console('fs.writeFile error');
          console.log(e);
        }
      } else {
        console.log('result unchanged.');
      }
    } catch (e) {
      console.log('fs.readFile error');
      console.log(e);
    }
  } catch (e) {
    console.log('Scraper Error');
    console.log(e);
  }
  return flag;
}

module.exports = compare;
