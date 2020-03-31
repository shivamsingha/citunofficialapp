const compare = require('./utils/compare');
const admin = require('firebase-admin');

const serviceAccount = require(process.env.SERVICE_ACC_KEY ||
  './serviceAccountKey.json');
const topic = 'allDevices';

compare().then((status) => {
  if (status.wasChanged) {
    let message = {
      notification: {
        title: 'New Notice'
      },
      data: {
        diff: JSON.stringify(status.diff)
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
      .then((res) => {
        console.log('pushed notification ', res);
      })
      .catch((e) => {
        console.log('push ERROR ', e);
      });
  }
});
