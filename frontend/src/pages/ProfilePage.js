import React, { useEffect, useState } from 'react';
import Profile from '../components/Profile';
import { useParams } from 'react-router-dom';
import { axiosReq } from '../api/axiosDefaults';

const ProfilePage = () => {
  const { id } = useParams();
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const [{ data }] = await Promise.all([axiosReq.get(`profiles/${id}`)]);
        setProfileData(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProfileData();
    console.log('profileData: ', profileData);
  }, [id]);

  return <Profile data={profileData} />;
};

export default ProfilePage;
