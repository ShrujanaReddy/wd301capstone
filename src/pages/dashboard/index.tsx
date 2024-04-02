import React from 'react';
import Appbar from '../../layouts/account/Appbar';
import Matches from '../matches';
import Articles from '../articles';
import Favorites from '../favorites';
const Dashboard: React.FC = () => {
  return (
    <>
    <Appbar />
    <Matches />
    <Favorites />
    <Articles />
    </>
  );
}

export default Dashboard;