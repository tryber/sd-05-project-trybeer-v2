import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Card, CardContent } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import AppContext from '../../context/AppContext';

const useStyles = makeStyles({
  root: {
    minWidth: 200,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  links: {
    textDecoration: 'none',
  },
});

export default function SimpleCard(props) {
  const { setOrderDetails } = useContext(AppContext);
  const classes = useStyles();
  const {
    order,
    index,
  } = props;

  const {
    id, deliveryAddress, deliveryNumber, totalPrice, status,
  } = order;

  setOrderDetails(order);
  if (!order) return <h1>Loading Card Orders components</h1>;

  return (
    <Grid item lg={ 3 } md={ 4 } sm={ 6 } xs={ 12 }>
        <Card className={ classes.root } elevation={ 3 }>
          <CardContent>
            <Link to={ `/admin/orders/${ id }` } className={ classes.links }>
              <Typography
                style={ { fontWeight: 600 } }
                data-testid={ `${ index }-order-number` }
                gutterBottom variant="h5" color="textPrimary"
              >
                { `Pedido ${ id }` }
              </Typography>
              <Typography data-testid={ `${ index }-order-address` } display="block" variant="body2" color="textSecondary">
              { `${ deliveryAddress }, ${ deliveryNumber }` }
              </Typography>
              <Typography data-testid={ `${ index }-order-total-value` } variant="body2" color="textSecondary">
                { `R$ ${ totalPrice.toString().replace('.', ',') }` }
              </Typography>
              <Typography data-testid={ `${ index }-order-status` } variant="h6" color="body1">
                { status }
              </Typography>
            </Link>
          </CardContent>
        </Card>
    </Grid>
  );
}
