const $ = require('cheerio');
const rp = require('request-promise-native');
const url = 'https://cit.ac.in/';

async function scraper() {
  result = {
    notices: [],
    newsevents: [],
    tenders: [],
    happenings: [],
    topinfo: []
  };

  try {
    const html = await rp(url);
    let n = 1;
    for (const property in result) {
      let out = new Array();
      const ax = $(`#noticeContainer>.noticeContent:nth-child(${n})>div>div:nth-child(2)>a`, html);
      const text = $(`#noticeContainer>.noticeContent:nth-child(${n})>div>div:nth-child(2)>a>span`, html);
      const date = $(`#noticeContainer>.noticeContent:nth-child(${n})>div>div:nth-child(2)>span`, html);
      n++;
      for (let i = 0; i < ax.length; ++i) {
        out.push({
          link: $(ax[i]).attr('href'),
          title: $(text[i]).text(),
          date: $(date[i]).text()
        });
      }
      result[property] = out;
    }
    let out = new Array();
    let ax = $('#happenings a', html);
    for (let i = 0; i < ax.length; ++i) {
      out.push({
        link: $(ax[i]).attr('href'),
        title: $(ax[i]).text()
      });
    }
    result['happenings'] = out;

    out = new Array();
    ax = $('marquee a', html);
    for (let i = 0; i < ax.length; ++i) {
      out.push({
        link: $(ax[i]).attr('href'),
        title: $(ax[i]).text()
      });
    }
    result['topinfo'] = out;

    return result;
  } catch (e) {
  console.log(e)
}
}

module.exports = scraper