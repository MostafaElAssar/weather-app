import { useState } from 'react';
import { useQuery } from 'react-query';
import locationService, { Location } from '../services/locationService';
import { LOCATIONS } from './keys';

const useLocations = (): {
  locations: Location[];
  query: string;
  setQuery: (query: string) => void;
} => {
  const [query, setQuery] = useState('');
  const { data: locations = [] } = useQuery(
    [LOCATIONS, query],
    () => locationService.loadLocations(query),
    {
      enabled: query.trim().length > 0,
    }
  );

  return { locations, query, setQuery };
};

export default useLocations;
