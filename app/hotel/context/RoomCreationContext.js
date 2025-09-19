import React, {createContext, useState, useCallback, useMemo} from 'react';
import {GetRoomCreationData} from '../services/RoomService';

const EMPTY_DATA = {
  roomTypes: [],
  roomViews: [],
  bedTypes:[],
  amenities: [],
  facilities: [],
};

export const RoomCreationDataContext = createContext({
  roomCreationData: EMPTY_DATA,
  isLoading: false,
  error: null,
  refresh: _params => {}, // optional params: { languageId, hotelId }
  reset: () => {},
});

export const RoomCreationDataProvider = ({children}) => {
  const [roomCreationData, setRoomCreationData] = useState(EMPTY_DATA);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Call this from screens. You can pass overrides like { languageId: 2, hotelId: 99 }
  const refresh = useCallback(async (params = {languageId: 1, hotelId: 1}) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await GetRoomCreationData(params);
      if (response?.success) {
        setRoomCreationData({
          roomTypes: response.data.roomTypes ?? [],
          roomViews: response.data.roomViews ?? [],
          bedTypes: response.data.bedTypes ?? [],
          amenities: response.data.amenities ?? [],
          facilities: response.data.facilities ?? [],
        });
      } else {
        setError(response?.message || 'Failed to load room creation data.');
      }
    } catch (err) {
      setError(
        err?.message || 'Unexpected error while loading room creation data.',
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setRoomCreationData(EMPTY_DATA);
    setError(null);
    setIsLoading(false);
  }, []);

  const value = useMemo(
    () => ({roomCreationData, isLoading, error, refresh, reset}),
    [roomCreationData, isLoading, error, refresh, reset],
  );

  return (
    <RoomCreationDataContext.Provider value={value}>
      {children}
    </RoomCreationDataContext.Provider>
  );
};
