import './App.css';
import { useState, useMemo } from 'react';
import axios from 'axios';
import { Box, Card, LinearProgress, Typography } from '@material-ui/core';
import Layout from './components/shared/layout/Layout';

function App() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  const [itemsAreLoaded, setItemsAreLoaded] = useState(false);

  // sort items by listId
  const getSortedItems = (items) => {
    const sortedItems = items.sort((a, b) => {
      if (a.listId < b.listId) {
        return -1;
      } else if (a.listId > b.listId) {
        return 1;
      } else {
        return 0;
      }
    });
    return sortedItems;
  };

  // get the items on mount.
  useMemo(async () => {
    await axios
      .get('https://fetch-hiring.s3.amazonaws.com/hiring.json')
      .then(({ data }) => {
        setItems(getSortedItems(data));
        setItemsAreLoaded(true);
      })
      .catch((err) => console.error(err));
  }, []);

  const getQueriedItems = () =>
    // get items that incldue search results, my own bonus.
    items.filter((item) =>
      item?.name?.toLowerCase().includes(search.toLowerCase())
    );

  // you can also use the guard operator instead of filtering, which is more elegant, but instructions said to "filter".
  const itemsJSX = getQueriedItems().length ? (
    getQueriedItems()
      .filter(({ name }) => Boolean(name)) // will return items that aren't null or undefined a.k.a "falsy"
      .map((item) => (
        <Card key={item.id}>
          <Typography>name: {item.name?.toUpperCase()}</Typography>
          <Typography>list Id: {item.listId}</Typography>
        </Card>
      ))
  ) : (
    <Typography>No Items found</Typography>
  );

  const loadingJSX = (
    <div className="loading">
      <Typography>loading...</Typography>
      <Box my={2}>
        <LinearProgress />
      </Box>
    </div>
  );

  return (
    <Layout title="Items App" setSearch={setSearch}>
      <main className="App">
        <div className="inner-column">
          <Typography
            variant="h1"
            style={{ fontSize: 'clamp(22px, 10vw, 80px)' }}
            gutterBottom>
            Items App
          </Typography>
          {itemsAreLoaded ? (
            <div className="items-container">{itemsJSX}</div>
          ) : (
            loadingJSX
          )}
        </div>
      </main>
    </Layout>
  );
}

export default App;
