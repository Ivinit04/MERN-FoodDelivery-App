import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";

export default function Signup() {

  const navigate = useNavigate();

  const [userCredentials, setUserCredentials] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  async function handleOnSubmit(event) {
    event.preventDefault(); //prevent refreshing of page
    try {
      // The signup information is sent to the server using an Axios
      const response = await axios.post("https://mern-food-delivery-app-backend.vercel.app/api/createuser", {
        name: userCredentials.name,
        email: userCredentials.email,
        password: userCredentials.password,
      });

      // The response from the server is checked, and if the signup is successful, the user is navigated to the home page; otherwise, an alert is shown
      const result = response.data;

      if (!result.success) {
        alert("Enter valid credentials");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Error signing up:", error);
      alert("An error occurred during sign up. Please try again.");
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
          <Form.Group className="mb-3 text-white fs-5" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              onChange={handleOnChange}
              name="name"
              type="text"
              placeholder="Enter Name"
              value={userCredentials.name}
            />
          </Form.Group>

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
            SignUp
          </Button>
          <Link to="/login" className="m-3 btn btn-danger">
            Already a user
          </Link>
        </Form>
      </div>
    </>
  );
}
