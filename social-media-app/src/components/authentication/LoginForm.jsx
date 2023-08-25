import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { BASE_URL } from "../../helpers/axios";
// import axios from "axios";
import { Form, Button} from "react-bootstrap";
import { useUserActions } from "../../hooks/user.actions";

export default function LoginForm() {
//   const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [form, setForm] = useState({});
  const [error, setError] = useState(null);
  const userActions = useUserActions();

  const handleSubmit = (event) => {
    event.preventDefault();
    const loginForm = event.currentTarget;
    if (loginForm.checkValidity() === false) {
      event.stopPropagation();
      return;
    }
    setValidated(true);
    const data = {
      email: form.email,
      password: form.password,
    };
    userActions.login(data)
      .catch((error) => {
        if (error.message) {
          setError(`Login Failed - ${error.message}`);
        }else {
            setError('Failed to login')
        }
      });
  };
  return (
    <Form
      id="login-form"
      className="border p-4 rounded"
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
    >
      {/* email */}
      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
          type="text"
          placeholder="Enter username"
        />
        <Form.Control.Feedback type="invalid">
          Username is required
        </Form.Control.Feedback>
      </Form.Group>
      {/* password */}
      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          value={form.password}
          minLength="4"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
          type="password"
          placeholder="Password"
        />
        <Form.Control.Feedback type="invalid">
          Please provide a valid password
        </Form.Control.Feedback>
      </Form.Group>
      <div className="text-content text-danger">{error && <p>{error}</p>}</div>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}
