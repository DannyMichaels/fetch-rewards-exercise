import { useState } from 'react';
import {
  AppBar,
  Box,
  IconButton,
  InputBase,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import OpenCart from './OpenCart';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: '20px',
    height: '100px',
  },
  appBar: {
    marginBottom: '20px',
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  title: {
    flexGrow: 0.3,
    paddingRight: '10px',
    marginRight: '5px',
  },

  text: {
    color: ({ themeState }) =>
      themeState === 'dark' ? { color: '#000' } : { color: '#fff' },
    textDecoration: 'none',
  },
  innerColumn: {
    display: 'flex',
    width: '98%',
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '20px',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    color: 'white',
  },
  grow: {
    flexGrow: 1,
  },

  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
}));

export default function Header({
  title,
  setSearch,
  cartState: { cartItems, setCartItems },
}) {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const classes = useStyles();

  const handleSearch = ({ target: { value } }) => {
    setSearch(value);
  };

  const toggleCartOpen = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <>
      <OpenCart
        isCartOpen={isCartOpen}
        setCartItems={setCartItems}
        cartItems={cartItems}
      />
      <div className={classes.root}>
        <AppBar className={classes.appBar} position="fixed">
          <Toolbar>
            <div className={classes.innerColumn}>
              <Typography variant="h6" className={classes.title}>
                {title}
              </Typography>

              <div className={classes.grow} />
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  onChange={handleSearch}
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                />
              </div>
              <Box mx={2}>
                <IconButton className={classes.icon} onClick={toggleCartOpen}>
                  <ShoppingCartIcon />
                  &nbsp;
                  {cartItems.length}
                </IconButton>
              </Box>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    </>
  );
}
