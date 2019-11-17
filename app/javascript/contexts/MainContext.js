import React, { useState, createContext } from 'react';

const MainContext = createContext();

export default function MainProvider({ current_user, children }){
  const [currentUser, _] = useState(current_user);

  return(
    <MainContext.Provider value={currentUser}>
      {children}
    </MainContext.Provider>
  )
}