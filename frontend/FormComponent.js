import { Container } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

export default function FormComponent({ setUsername, setRoom }) {
    return (
        <Container>
            <Form >
                <Form.Group id="join" >
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder='Enter your username' onChange={(e) => setUsername(e.target.value)} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Room</Form.Label>
                    <Form.Control type='text' placeholder="Enter Room" onChange={e => setRoom(e.target.value)} />
                </Form.Group>
            </Form>
        </Container>

    )
}