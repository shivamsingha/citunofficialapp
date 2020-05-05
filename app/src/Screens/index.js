import React from 'react';
import Notices from './Notices';
import OtherScreens from './OtherScreens';

const News = props => <OtherScreens tab="newsevents" {...props} />;
const Tenders = props => <OtherScreens tab="tenders" {...props} />;
const Happenings = props => <OtherScreens tab="happenings" {...props} />;

export { Notices, News, Tenders, Happenings };
