import "./Register.css";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import {Alert} from "react-bootstrap";
import axios from "axios";
import { useState } from "react";

function Register() {
    const [formData, setFormData] = useState({
        login: "",
        password: "",
        confirmPassword: ""
    });

    const [regStatus, setRegStatus ] = useState("");

    const updateFormData = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
        setRegStatus("")
    };

    const regHandler = async (e) => {
        e.preventDefault();
        const { data }  = await axios.post("http://127.0.0.1:3001/register", {formData})
        setRegStatus(data)
    }
    return (
    <main>
        <div className="login-box">
            <h3>Register</h3>
            <Form className="form" onSubmit={regHandler}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Login</Form.Label>
                    <Form.Control type="text"  name="login" placeholder="Enter login" onChange={updateFormData} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" placeholder="Password" onChange={updateFormData} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Confirm password</Form.Label>
                    <Form.Control type="password" name="confirmPassword" placeholder="Confirm password" onChange={updateFormData} />
                </Form.Group>
                <Form.Text muted className="singup-link">
                    Have an account? <Link to="/">Sign in!</Link>
                </Form.Text>
                <Button variant="primary" type="submit" className="btn-login">
                    Register
                </Button>
                <p className="alert-reg">{regStatus}</p>
            </Form>
        </div>
    </main>
    )
}

export default Register;