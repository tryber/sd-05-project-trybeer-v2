import React from 'react';
import PropTypes from 'prop-types';
import ClientDOMapName from './ClientDetailsOrderMap/ClientDOMName';
import ClientDOMapProduct from './ClientDetailsOrderMap/ClientDOMProduct';
import ClientDOMapPrice from './ClientDetailsOrderMap/ClientDOMPrice';

export default function ClientDetailsOrderMap(props) {
  const { order } = props;
  return (
    <div>
      {order && (
        order.products.map((product, index) => (
          <div key="fechalint" className="datailCard">
            <ClientDOMapName index={ index } product={ product } />
            <ClientDOMapProduct index={ index } product={ product } />
            <ClientDOMapPrice index={ index } product={ product } />
          </div>
        ))
      ) }
    </div>
  );
}

ClientDetailsOrderMap.propTypes = {
  order: PropTypes.arrayOf(PropTypes.object).isRequired,
};
