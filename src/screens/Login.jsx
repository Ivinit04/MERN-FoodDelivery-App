import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";

export default function Login() {

  const navigate = useNavigate();

  const [userCredentials, setUserCredentials] = React.useState({
    email: "",
    password: "",
  });

  async function handleOnSubmit(event) {
    event.preventDefault(); //prevent refreshing of page

    try {
      const response = await axios.post("https://mern-food-delivery-app-backend.vercel.app/api/loginuser", {
        email: userCredentials.email,
        password: userCredentials.password,
      });

      const result = response.data;

      if (!result.success) {
        alert("Enter valid credentials");
      } else {
        localStorage.setItem("authToken", result.authToken);
        navigate("/");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("An error occurred during login. Please try again.");
    }
  }

  function handleOnChange(event) {
    const {name , value} = event.target;
    setUserCredentials((prevCredentials)=>{
      return {
        ...prevCredentials,
        [name] : value
      }
    })
    
  }

  return (
    <>
      <div className="container">
        <Form onSubmit={handleOnSubmit}>
          

          <Form.Group className="mb-3 text-white fs-5" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              onChange={handleOnChange}
              name="email"
              type="email"
              placeholder="Enter email"
              value={userCredentials.email}
            />
          </Form.Group>

          <Form.Group className="mb-3 text-white fs-5" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              onChange={handleOnChange}
              name="password"
              type="password"
              placeholder="Enter Password"
              value={userCredentials.password}
            />
          </Form.Group>

          <Button
            className="m-3 btn btn-success"
            variant="primary"
            type="submit"
          >
            Login
          </Button>
          <Link to="/createuser" className="m-3 btn btn-danger">
            I'm new user
          </Link>
        </Form>
      </div>
    </>
  )
}
