const compare = require('./utils/compare');
const admin = require('firebase-admin');

const serviceAccount = require(process.env.SERVICE_ACC_KEY ||
  './serviceAccountKey.json');
const topic = 'test';

compare()
  .then((status) => {
    if (status.wasChanged) {
      let message = {
        notification: {
          title: 'Notice - Central Institute of Technology Kokrajhar',
          body:
            status.diff.notices[0].title ||
            status.diff.newsevents[0].title ||
            status.diff.tenders[0].title ||
            status.diff.happenings[0].title
        },
        topic: topic
      };

      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: 'https://citunofficial.firebaseio.com'
      });
      admin
        .messaging()
        .send(message)
        .then((res) => console.log('pushed notification ', res))
        .then(() => process.exit(0))
        .catch((e) => console.log('push ERROR ', e));
    }
  })
  .catch((e) => console.log(e));
