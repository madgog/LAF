import { Form, Container, Button } from 'react-bootstrap';

export default function Room({ room, messages, setMessage, onSend }) {
    return (
        <Container id="chat-room">
            <h3>Room name: {room}</h3>
            <div id="chat">
                {messages.map((message, index) => {
                    return (
                        <div key={index}>
                            <p>{message.username}{'>    '}{message.message}</p>
                        </div>
                    )
                })}
            </div>
            <Form onSubmit={onSend}>
                <Form.Control type="text" name="message" onChange={(e) => setMessage(e.target.value)} />
                <br />
                <Button type="submit" variant='secondary' >Send</Button>
            </Form>
        </Container>

    )
}