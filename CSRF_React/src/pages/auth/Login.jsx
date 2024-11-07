import React,{ useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import "./Login.css"
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const navigate=useNavigate();
  const[formData,setFormData]=useState({
    email:'',
    password:''
  })

  const handleInputChange=(event)=>{
    const {name,value}=event.target;
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit= async (e)=>{
    e.preventDefault();
    try {
        const response=await fetch("http://localhost:5000/auth/login",{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body: JSON.stringify(formData)
        })
        const result=await response.json();// waha so jo body me set kar rahe ho usko header me set kar and yaha header se nikalo ......
        localStorage.setItem("token",result.token);
        console.log(result);
        // Now we put the value in the meta tag 
        const csrfMetaTag=document.querySelector("meta[name='csrf-token]");
        if(csrfMetaTag){
          csrfMetaTag.setAttribute("content",result.csrfT);
        }else{
          console.log("Error from the developer side");
        }

        console.log(result.csrfT);
        navigate("/dashboard");
    } catch (error) {
      console.error(error.message);
    } finally {
      setFormData({
        email:"",
        password:""
      })
    }
  }


  return (
    <div className='center-form'>
    <Form onSubmit={handleSubmit}>
      <h1>Login</h1>
      <Form.Group controlId='formBasicEmail'>
      <Form.Label>Email address</Form.Label>
      <Form.Control
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleInputChange}
      />
      </Form.Group>  
      <Form.Group controlId='formBasicPassword'>
      <Form.Label>password</Form.Label>
      <Form.Control
          type="password"
          name="password"
          placeholder="Enter password"
          value={formData.password}
          onChange={handleInputChange}
      />
      </Form.Group> 
      <Button variant="dark" type="submit" className='w-100'>
        Login
      </Button> 
    </Form>
  </div>
  );
}

export default Login;
