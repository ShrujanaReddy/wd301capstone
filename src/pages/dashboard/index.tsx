import React, { useEffect, useState } from 'react';
import Appbar from '../../layouts/account/Appbar';
import Matches from '../matches';
import Articles from '../articles';
import Favorites from '../favorites';
const Dashboard: React.FC = () => {
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);

  useEffect(() => {
    setIsUserSignedIn(!!localStorage.getItem('authToken'));
  }, []);
  return (
    <>
    <Appbar />
    <Matches />
    {isUserSignedIn && <Favorites />}    
    <Articles />
    </>
  );
}

export default Dashboard;