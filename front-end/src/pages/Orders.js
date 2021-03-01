import React from 'react';
import { Redirect } from 'react-router-dom';

import Header from '../components/Header';
import ClientOrderCard from '../components/ClientOrderCard';

export default function Orders() {
  const userData = JSON.parse(localStorage.getItem('user'));
  const token = userData && userData.token;

  if (!token) return <Redirect to="/login" />;
  return (
    <section>
      <Header title="Meus Pedidos" />
      <ClientOrderCard />
    </section>
  );
}
