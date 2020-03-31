const fs = require('fs').promises;
const scraper = require('./scraper');
const diff = require('./diff');

const filePath = `${process.env.RESULT_PATH || process.cwd()}/result.json`;

async function compare() {
  let newResult,
    oldResult,
    changeStatus = {
      wasChanged: false
    };
  try {
    newResult = await scraper();
    try {
      oldResult = await fs.readFile(filePath, { flag: 'a+' });
      oldResult = JSON.parse(oldResult.toString());
      const oldResultString = JSON.stringify(oldResult);
      const newResultString = JSON.stringify(newResult);
      if (oldResultString != newResultString) {
        changeStatus.wasChanged = true;
        changeStatus.diff = diff(newResult, oldResult);
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
  return changeStatus;
}

module.exports = compare;
