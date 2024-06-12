import "./Login.css";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";

function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        login: "",
        password: ""
    });

    const [logErr, setLogErr] = useState(false);

    const updateFormData = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
        setLogErr(true)

    };

    const loginHandler = async (e) => {
        e.preventDefault();
        const { data }   = await axios.post("https://node-zaliczenie.vercel.app/login", {formData})
        setLogErr(data.status)
        if (data.status) {
            navigate("/home")
            localStorage.setItem('loggedIn', data.status);
            localStorage.setItem('user', formData.login);
        }
    }

    return (
        <main>
        <div className="login-box">
            <h3>Login</h3>
            <Form className="form" onSubmit={loginHandler}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Login</Form.Label>
                    <Form.Control type="text" name="login" placeholder="Enter login" onChange={updateFormData} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" placeholder="Password" onChange={updateFormData}/>
                </Form.Group>
                {!logErr ? <p className="credentials-err">Incorrect credentials</p> : ""}
                <Form.Text muted className="singup-link">
                    Don't have an account? <Link to="/reg">Sign up!</Link>
                </Form.Text>
                <Button variant="primary" type="submit" className="btn-login">
                    Login
                </Button>
            </Form>
        </div>
        </main>
)
}

export default Login;