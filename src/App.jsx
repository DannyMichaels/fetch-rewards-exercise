import './App.css';
import { useState, useMemo } from 'react';
import axios from 'axios';
import {
  Box,
  Card,
  Grid,
  IconButton,
  LinearProgress,
  Typography,
} from '@material-ui/core';
import Layout from './components/shared/layout/Layout';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { getSortedItems } from './utils/getSortedItems';

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [search, setSearch] = useState('');
  const [itemsAreLoaded, setItemsAreLoaded] = useState(false);

  // get the items on mount.
  useMemo(async () => {
    // had to use api.allorigins to fix cors issue ... //https://allorigins.win/
    await axios
      .get(
        `https://api.allorigins.win/get?url=${encodeURIComponent(
          'https://fetch-hiring.s3.amazonaws.com/hiring.json'
        )}`
      )
      .then(({ data: { contents } }) => {
        setItems(getSortedItems(JSON.parse(contents)));
        setItemsAreLoaded(true);
      })
      .catch((err) => console.error(err.message));
  }, []);

  // cart feature, my own bonus.
  const onAddToCart = (itemToAdd) => {
    setCartItems((prevState) => [itemToAdd, ...prevState]);
  };

  const getQueriedItems = () =>
    // get items that incldue search results, my own bonus.
    items.filter((item) =>
      item?.name?.toLowerCase().includes(search.toLowerCase())
    );

  const itemsJSX = getQueriedItems().length ? ( // if items are searched and found in search.
    getQueriedItems()
      .filter(({ name }) => Boolean(name)) // will return items that aren't null or undefined a.k.a "non-falsy" values. You can also use the guard operator instead of filtering, which is more elegant, but instructions said to "filter".
      .map((item) => {
        const inCart =
          cartItems.filter((cartItem) => cartItem.id === item.id).length > 0;

        return (
          <Card style={{ border: '1px solid #999' }} key={item.id}>
            <Grid
              container
              item
              direction="row"
              justify="center"
              alignItems="center">
              {inCart && 'item already in cart, add more?'}
              <IconButton
                onClick={() => onAddToCart(item)}
                style={{ color: '#212121' }}>
                <Typography>Add to cart</Typography>&nbsp;
                <ShoppingCartIcon />
              </IconButton>
            </Grid>

            <Typography>name: {item.name}</Typography>
            <Typography>list Id: {item.listId}</Typography>
          </Card>
        );
      })
  ) : (
    <Typography>No Items found</Typography> // if no items found while searching.
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
            <div className="loading">
              <Typography>loading...</Typography>
              <Box my={2}>
                <LinearProgress />
              </Box>
            </div>
          )}
        </div>
      </main>
    </Layout>
  );
}

export default App;
