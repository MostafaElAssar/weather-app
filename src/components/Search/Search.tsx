import React from 'react';
import { AutoComplete, Input } from 'antd';
import styled from 'styled-components';
import { Location } from '../../services/locationService';
import style from './Search.style';

interface SearchProps {
  className?: string;
  locations: Location[];
  onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSelect: (data: string) => void;
  query: string;
}

const Search: React.FC<SearchProps> = ({
  className,
  locations,
  onSearch,
  onSelect,
  query,
}) => {
  return (
    <AutoComplete
      className={className}
      value={query}
      options={locations.map(({ name, lat, lon }) => ({
        label: name,
        value: JSON.stringify({ lat, lon, name }),
      }))}
      onSelect={onSelect}
    >
      <Input.Search
        size="large"
        placeholder="Search by name"
        onChange={onSearch}
      />
    </AutoComplete>
  );
};

export default styled(Search)`
  ${style}
`;
