import './App.css';
import {
  useState, useEffect
} from 'react';
import Room from './Room';
import io from 'socket.io-client';
import { Button, Container, Fade } from 'react-bootstrap';
import FormComponent from './FormComponent';

const socket = io("ws://localhost:3001", { autoConnect: false });

function App() {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [join, setJoin] = useState(false);
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  function onJoin(e) {
    e.preventDefault();
    setJoin(true)
    socket.connect();
    socket.emit('join', { username, room });
  }

  function onLeave(e) {
    e.preventDefault();
    setJoin(false);
    socket.emit('message', { "username": "LAF", "message": `${username} has left!`, room });
    socket.disconnect();
    setMessages([]);
    setMessage('');
    setUsername('');
    setRoom('');
  }


  function onSend(e) {
    e.preventDefault();
    socket.emit("message", { username, message, room });
    setMessages((oldMessages) => [...oldMessages, { username, message }]);
  }

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
      socket.auth = { username };
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on("message", (msg) => {
      setMessages((oldMessages) => [...oldMessages, msg]);
    })


    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('message');
    };

  }, [username, room])

  return (
    <Container >
      <h1>LAF!</h1>
      {join && <Room room={room} messages={messages} setMessage={setMessage} onSend={onSend} />}
      {!join && <FormComponent setUsername={setUsername} setRoom={setRoom} />}
      <br />
      <Button aria-controls='chat-room' aria-expanded={join} variant={!join ? "primary" : "danger"} form="join" onClick={!join ? onJoin : onLeave}>{!join ? "Laf!!" : "Leave"}</Button>
    </Container>
  );
}

export default App;