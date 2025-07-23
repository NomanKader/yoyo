// src/context/RoomContext.js
import React, { createContext, useState } from 'react';

const RoomContext = createContext();

export const RoomProvider = ({ children }) => {
  const [type, setType] = useState('category'); // default to 'category'

  return (
    <RoomContext.Provider value={{ type, setType }}>
      {children}
    </RoomContext.Provider>
  );
};

export { RoomContext };
export default RoomProvider;
