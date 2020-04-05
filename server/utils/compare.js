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
    const newResultString = JSON.stringify(newResult);
    try {
      oldResult = await fs.readFile(filePath, { flag: 'a+' });
      try {
        oldResult = JSON.parse(oldResult.toString());
        const oldResultString = JSON.stringify(oldResult);
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
        console.log('JSON parse error', e);
        changeStatus.wasChanged = true;
        changeStatus.diff = newResult;
        console.log('file corrupt? writing to json file');
        try {
          await fs.writeFile(filePath, newResultString);
        } catch (e) {
          console('fs.writeFile error');
          console.log(e);
        }
      }
    } catch (e) {
      console.log('fs.readFile error', e);
    }
  } catch (e) {
    console.log('Scraper Error', e);
  }
  return changeStatus;
}

module.exports = compare;
