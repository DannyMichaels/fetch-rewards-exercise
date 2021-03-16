import './App.css';
import { useState, useMemo } from 'react';
import axios from 'axios';
import { Box, Card, Grid, LinearProgress, Typography } from '@material-ui/core';
import Layout from './components/shared/layout/Layout';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [search, setSearch] = useState('');
  const [itemsAreLoaded, setItemsAreLoaded] = useState(false);

  // sort items by listId
  const getSortedItems = (items) => {
    const sortedItemsByListId = items.sort((a, b) => {
      return parseInt(a.listId) - parseInt(b.listId);
    });

    const sortedItems = sortedItemsByListId.sort(
      // sort only by digits in name because all names have "item" in them.
      (a, b) => {
        const number1 = parseInt(a.name?.match(/\d+/));
        const number2 = parseInt(b.name?.match(/\d+/));
        // this doesn't work fors ome reason
        return number1 - number2;
      }
    );

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

  const addToCart = (itemToAdd) => {
    setCartItems((prevState) => [itemToAdd, ...prevState]);
  };

  const getQueriedItems = () =>
    // get items that incldue search results, my own bonus.
    items.filter((item) =>
      item?.name?.toLowerCase().includes(search.toLowerCase())
    );

  // you can also use the guard operator instead of filtering, which is more elegant, but instructions said to "filter".
  const itemsJSX = getQueriedItems().length ? ( // if items found in search.
    getQueriedItems()
      .filter(({ name }) => Boolean(name)) // will return items that aren't null or undefined a.k.a "falsy"
      .map((item) => (
        <Card style={{ border: '1px solid #999' }} key={item.id}>
          <Grid container item direction="row" justify="center">
            <Typography>Add to cart</Typography>
            <Box mx={2}>
              <ShoppingCartIcon onClick={() => addToCart(item)} />
            </Box>
          </Grid>
          <Typography>name: {item.name}</Typography>
          <Typography>list Id: {item.listId}</Typography>
        </Card>
      ))
  ) : (
    <Typography>No Items found</Typography> // if no items found.
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
    <Layout
      title="Items App"
      setSearch={setSearch}
      cartState={{ cartItems, setCartItems }}>
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
