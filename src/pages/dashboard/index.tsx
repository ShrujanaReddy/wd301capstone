import React from 'react';
import Appbar from '../../layouts/account/Appbar';
import Matches from '../matches';
const Dashboard: React.FC = () => {
  return (
    <>
    <Appbar />
    <Matches />
    </>
  );
}

export default Dashboard;