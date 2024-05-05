// ProfileImageContext.js
import React, { createContext, useState, useContext } from 'react';

const ProfileImageContext = createContext();

export const ProfileImageProvider = ({ children }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [activityCompleted, setActivityCompleted] = useState(true);

  return (
    <ProfileImageContext.Provider value={{ profileImage, setProfileImage,activityCompleted,setActivityCompleted }}>
      {children}
    </ProfileImageContext.Provider>
  );
};

export const useProfileImage = () => useContext(ProfileImageContext);
