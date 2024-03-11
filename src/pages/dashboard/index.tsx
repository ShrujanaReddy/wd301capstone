import React from 'react';
import Appbar from '../../layouts/account/Appbar';
import Matches from '../matches';
import Articles from '../articles';
const Dashboard: React.FC = () => {
  return (
    <>
    <Appbar />
    <Matches />
    <Articles />
    </>
  );
}

export default Dashboard;