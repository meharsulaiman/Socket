import { useEffect, useMemo, useState } from 'react';
import { io } from 'socket.io-client';

import { Container, Typography, TextField, Button, Stack } from '@mui/material';

const App = () => {
  const [message, setMessage] = useState('');
  const [socketID, setSocketID] = useState('');
  const [room, setRoom] = useState('');
  const [receviedMessages, setReceviedMessages] = useState([]);
  const socket = useMemo(() => io('http://localhost:3000'), []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submit');

    socket.emit('message', { message, room });
  };

  useEffect(() => {
    socket.on('connect', () => {
      setSocketID(socket.id);
      console.log('connected', socket.id);
    });

    socket.on('message-one', (msg) => {
      setReceviedMessages((prev) => [...prev, msg]);
      console.log(msg);
    });
  }, [socket]);
  return (
    <Container
      maxWidth='sm'
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography variant='h6' component='h1' gutterBottom>
        {socketID}
      </Typography>

      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          width: '250px',
          marginTop: '1rem',
        }}
      >
        <TextField
          id='outlined-basic'
          label='Message'
          variant='outlined'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <TextField
          id='outlined-basic'
          label='Room'
          variant='outlined'
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />
        <Button variant='contained' color='primary' type='submit'>
          Send
        </Button>
      </form>

      {receviedMessages.length !== 0 && (
        <Stack
          p={2}
          textAlign={'left'}
          width={'100%'}
          bgcolor={'#f3f3f3'}
          borderRadius={2}
        >
          {receviedMessages.map((msg) => (
            <Typography
              component='p'
              gutterBottom
              key={msg}
              bgcolor={'#ddd'}
              padding={'5px 15px'}
              maxWidth={'fit-content'}
              borderRadius={5}
            >
              {msg}
            </Typography>
          ))}
        </Stack>
      )}
    </Container>
  );
};

export default App;
