import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Restrict from '../Components/Restrict';
import Header from '../Components/Header';
import ChatMessage from '../Components/ChatMessage';
import helper from '../Helper';

import Input from '../Components/Input';

const containerStyle = {
  justifyContent: 'space-between',
  minHeight: '90vh',
};

const Chat = ({
  history,
  match: {
    params: { id = null },
  },
  socket,
}) => {
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState([]);

  const updateChat = (messages) => {
    setChat(
      id ? messages.filter(({ from: { id: sid }, to }) => (
        (String(sid) === String(id)) || (String(to.id) === String(id))
      ))
        : messages,
    );
  };

  useEffect(() => {
    let messages = helper.getChatMessages();
    updateChat(messages);
    const x = helper.getUserData().role === 'Client' ? socket.id : 'loja';

    socket.on(x, (newMessage) => {
      messages = helper.getChatMessages();
      updateChat([...messages, newMessage]);
      helper.updateChat(newMessage);
    });
    return () => {
      socket.off(x);
    };
  }, []);

  const messageHandle = () => ({ target: { value } }) => {
    setMessage(value);
  };

  const isSelfMessage = (msg) => {
    const { id: selfId } = helper.getUserData();
    return socket.id === (
      msg.from ? msg.from.socketId : undefined
    ) || (msg.from ? msg.from.id : undefined) === selfId;
  };

  return (
    <Restrict>
      <Header pathname={ history.location.pathname } />
      <div className="container-main">
        <div className="container-screen" style={ containerStyle }>
          <div style={ { display: 'flex', width: '100%', flexDirection: 'column' } }>
            { chat.length !== 0 ? chat.map((chatBuffer) => (
              <ChatMessage
                key={ chatBuffer.createdAt }
                buffer={ chatBuffer }
                isSelf={ isSelfMessage(chatBuffer) }
              />
            )) : <p>Não há mensagens.</p>}
          </div>
          <div
            style={ { display: 'flex', width: '100%', justifyContent: 'space-between' } }
          >
            <Input
              name="message"
              placeholder="Insira sua mensagem aqui"
              test="message-input"
              onChange={ messageHandle() }
            />
          </div>
          <button
            className="btn"
            data-testid="send-message"
            disabled={ !message.length }
            type="button"
            onClick={ () => {
              socket.emit('message', { message, to: id });
              document.getElementById('input_message').value = '';
              setMessage('');
            } }
            style={ { marginLeft: '8px' } }
          >
            <i className="material-icons">send</i>
          </button>
        </div>
      </div>
    </Restrict>
  );
};

Chat.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  socket: PropTypes.shape({
    emit: PropTypes.func,
    id: PropTypes.string,
    off: PropTypes.func,
    on: PropTypes.func,
  }).isRequired,
};

export default helper.Socket(Chat);
