import { Fragment } from 'react';
import {
  Card,
  Grid,
  IconButton,
  makeStyles,
  Typography,
} from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';

const useStyles = makeStyles({
  root: {
    margin: '90px auto',
    flexFlow: 'column nowrap',
    backgroundColor: '#3F51B5',
    position: 'fixed',
    transform: ({ isCartOpen }) =>
      isCartOpen ? 'translateX(0)' : 'translateX(100%)',
    top: 0,
    right: 0,
    height: '100vh',
    width: '100vw',
    paddingTop: '1.5rem',
    transition: 'transform 0.3s ease-in-out',
    listStyle: 'none',
    zIndex: 998,
    overflowY: 'scroll',
    display: 'flex',
    alignItems: 'center',
  },
  listItem: {
    padding: '40px',
    fontSize: 'large',
    fontWeight: '30px',
  },
  icon: {
    color: '#3F51B5',
  },
});

export default function OpenCart({ isCartOpen, cartItems, setCartItems }) {
  const classes = useStyles({ isCartOpen });

  const onRemoveCartItem = (payloadIndex) => {
    setCartItems((prevState) =>
      prevState.filter((_, idx) => idx !== payloadIndex)
    );
  };

  return (
    <div className={classes.root}>
      {cartItems.map(
        (item, idx) =>
          item.name && (
            <Fragment key={item.id}>
              <Card className={classes.listItem}>
                <Grid
                  container
                  item
                  direction="row"
                  justify="center"
                  alignItems="center">
                  <IconButton
                    className={classes.icon}
                    onClick={() => onRemoveCartItem(idx)}>
                    <Typography>Remove from cart</Typography>&nbsp;
                    <ClearIcon />
                  </IconButton>
                </Grid>
                <Typography>name: {item.name}</Typography>
                <Typography>list Id: {item.listId}</Typography>
              </Card>
              <br />
            </Fragment>
          )
      )}
    </div>
  );
}
