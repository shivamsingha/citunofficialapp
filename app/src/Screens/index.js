import React from 'react';
import Notices from './Notices';
import OtherScreens from './OtherScreens';

const News = () => <OtherScreens tab="newsevents" />;
const Tenders = () => <OtherScreens tab="tenders" />;
const Happenings = () => <OtherScreens tab="happenings" />;

export { Notices, News, Tenders, Happenings };
