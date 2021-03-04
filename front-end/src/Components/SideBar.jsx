import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import ourLogo from '../fetch-beer-3.png';
import { clear } from '../Redux/Actions/user';
import helper from '../Helper';
import Item from './SidebarItem';

const sideBarStyle = {
  background: 'var(--orange)',
  color: 'var(--white)',
};

const SideBar = ({ logout }) => {
  const [role, setRole] = useState('client');
  useEffect(() => {
    const client = helper.getUserData();
    setRole(client.role);
  }, []);

  return (
    <ul id="slide-out" className="sidenav" style={ sideBarStyle }>
      <div className="horizontal-center">
        <img className="circle" src={ ourLogo } alt="logo" style={ { width: '100px' } } />
      </div>
      <li className="divider" />
      {
        role === 'client' ? (
          <>
            <Item action="side-menu-item-products">Produtos</Item>
            <Item action="side-menu-item-orders">Meus Pedidos</Item>
            <Item action="side-menu-item-my-orders">
              Pedidos
            </Item>
            <Item action="side-menu-item-my-profile">Meu Perfil</Item>
            <Item action="side-menu-chat">Conversar com a loja</Item>
          </>
        ) : (
          <>
            <Item action="side-menu-item-orders" to="/admin/orders">Pedidos</Item>
            <Item action="side-menu-item-profile" to="/profile">Meu Perfil</Item>
            <Item action="side-menu-chat" to="/admin/chats">Conversas</Item>
          </>
        )
      }
      <li className="divider" />
      <Item
        action="side-menu-item-logout"
        to="/login"
        onClick={ () => { logout(); } }
      >
        Sair
      </Item>
    </ul>
  );
};

SideBar.propTypes = {
  logout: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(clear()),
});

export default connect(() => ({}), mapDispatchToProps)(SideBar);
