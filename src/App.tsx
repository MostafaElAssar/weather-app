import React, { useState } from 'react';
import { Table, Typography } from 'antd';
import BaseLayout from './components/BaseLayout';
import Search from './components/Search';
import useLocations from './hooks/useLocations';
import useForecast from './hooks/useForecast';

const App: React.FC<{}> = () => {
  const [cityName, setCityName] = useState<string>();

  const { locations, query, setQuery } = useLocations();

  const { forecast, setLat, setLon } = useForecast();

  const handleSelect = (data: string) => {
    const { lat, lon, name } = JSON.parse(data);
    setCityName(name);
    setQuery('');
    setLat(lat);
    setLon(lon);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <BaseLayout>
      <Search
        locations={locations}
        onSearch={handleSearch}
        onSelect={handleSelect}
        query={query}
      />
      {forecast.length > 0 && (
        <Table
          title={() => (
            <Typography.Title level={4}>{cityName}</Typography.Title>
          )}
          pagination={false}
          dataSource={forecast.map(({ dt_txt, main }) => ({
            key: dt_txt,
            dt_txt,
            temp_min: main.temp_min,
            temp_max: main.temp_max,
          }))}
        >
          <Table.Column title="Day" dataIndex="dt_txt" key="dt_txt" />
          <Table.ColumnGroup title="Temperature">
            <Table.Column title="Min" dataIndex="temp_min" key="temp_min" />
            <Table.Column
              align="right"
              title="Max"
              dataIndex="temp_max"
              key="temp_max"
            />
          </Table.ColumnGroup>
        </Table>
      )}
    </BaseLayout>
  );
};

export default App;
