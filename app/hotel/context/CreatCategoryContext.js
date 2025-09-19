import React, {
  createContext,
  useState,
  useMemo,
  useCallback,
  useContext,
} from "react";

const initialRoomData = {
  roomTypeId: "",
  languageId: 1,      
  description: "",
  rules: "",
  status: 1,
  pricePerNight: "",
  maxOccupancy: 0,
  roomSize: 0,
  includesBreakfast: false,   
  roomCategoryPhotos: [],
  isExtraBedAllowed:false,
  extraBedLimit:0,
  amenities: [],
  facilities: [],
  bedTypeId:"",
  isExtraBed:false
};

export const RoomDataContext = createContext({
  roomData: initialRoomData,
  setRoomData: () => {},
  updateRoomData: () => {},
  resetRoomData: () => {},
});

export const RoomDataProvider = ({ children }) => {
  const [roomData, setRoomData] = useState(initialRoomData);

  const updateRoomData = useCallback((patch) => {
    setRoomData((prev) => ({
      ...prev,
      ...(typeof patch === "function" ? patch(prev) : patch),
    }));
  }, []);

  const resetRoomData = useCallback(() => setRoomData(initialRoomData), []);

  const value = useMemo(
    () => ({ roomData, setRoomData, updateRoomData, resetRoomData }),
    [roomData, updateRoomData]
  );

  return (
    <RoomDataContext.Provider value={value}>
      {children}
    </RoomDataContext.Provider>
  );
};

// Optional helper hook
export const useRoomData = () => useContext(RoomDataContext);
