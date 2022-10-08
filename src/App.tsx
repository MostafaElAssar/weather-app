import React, { useState } from 'react';
import { AutoComplete, Layout, Image, Table, Typography } from 'antd';
import styled from 'styled-components';
import useLocations from './hooks/useLocations';
import useForecast from './hooks/useForecast';
import style from './App.style';

const { Header, Content, Footer } = Layout;

const { Column, ColumnGroup } = Table;

const { Title } = Typography;

interface AppProps {
  className?: string;
}

const App: React.FC<AppProps> = ({ className }) => {
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

  const handleSearch = (value: string) => {
    setQuery(value);
  };

  return (
    <Layout className={className}>
      <Header>
        <Image
          preview={false}
          width={50}
          src={`${process.env.PUBLIC_URL}/assets/images/weather-icon.svg`}
        />
      </Header>
      <Content>
        <AutoComplete
          value={query}
          options={locations.map(({ name, lat, lon }) => ({
            label: name,
            value: JSON.stringify({ lat, lon, name }),
          }))}
          onSelect={handleSelect}
          onSearch={handleSearch}
          placeholder="Search by name"
        />
        {forecast.length > 0 && (
          <Table
            title={() => <Title>{cityName}</Title>}
            pagination={false}
            dataSource={forecast.map(({ dt_txt, main }) => ({
              key: dt_txt,
              dt_txt,
              temp_min: main.temp_min,
              temp_max: main.temp_max,
            }))}
          >
            <Column title="Day" dataIndex="dt_txt" key="dt_txt" />
            <ColumnGroup title="Temperature">
              <Column title="Min" dataIndex="temp_min" key="temp_min" />
              <Column title="Max" dataIndex="temp_max" key="temp_max" />
            </ColumnGroup>
          </Table>
        )}
      </Content>
      <Footer>Weather App ©2022</Footer>
    </Layout>
  );
};

export default styled(App)`
  ${style}
`;
