import React, { useEffect, useState } from 'react';
import Profile from '../components/Profile';
import { useParams } from 'react-router-dom';
import { axiosReq } from '../api/axiosDefaults';

const ProfilePage = () => {
  return <Profile />;
};

export default ProfilePage;
