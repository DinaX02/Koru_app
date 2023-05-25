import React, { createContext, useState } from 'react';

const MenuContext = createContext();

const MenuProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState('home');

  const setMenuActiveTab = (tab) => {
    setActiveTab(tab);
  };

  return (
    <MenuContext.Provider value={{ activeTab, setMenuActiveTab }}>
      {children}
    </MenuContext.Provider>
  );
};

export { MenuProvider, MenuContext }