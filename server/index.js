const compare = require('./utils/compare');

compare().then((status) => {
  if (status) console.log('pushed notification');
});
