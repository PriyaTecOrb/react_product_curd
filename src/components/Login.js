import React, { useState } from "react";
import axios from "axios";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { NavLink } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import {useAuth} from "../Contexts/AuthContext";


const Login = () => {
	const navigate = useNavigate();

	const {authUser,isLoggedIn,token,login} = useAuth()

	const [formData, setFormData] = useState({
	  email: "",
	  password: "",
	});


	const handleChange = (event) => {
	  const { id, value } = event.target;
	  setFormData((prevState) => ({ ...prevState, [id]: value }));
	};

	const handleSubmit = async (event) => {
	  event.preventDefault();
	  const {user_name,email,password} = formData;
    
    
    if (email === ""){
    	alert("Email can't be blank")
    }
    else if(!email.includes('@')){
      alert("Please enter valid email address")
    }
    else if(password === ""){
      alert("Password can't be blank")
    }else{
		  try {
		    const response = await axios.post(
		      "http://localhost:3001/api/v1/login",
		      formData
		    );
		    const data = response.data
		    if (data.code == 200){
          alert("You have successfully login")
          login(data.user.token,data.user)
          localStorage.setItem('token',data.user.token)
          navigate('/')
		    }
		    else{
          alert(data.message)
		    }
		  } catch (error) {
		    console.error(error);
		  }
		}
	};

  return(
    <>
			<div className="container mt-3">
		    <section className="d-flex justify-content-between">
		      <div className="left-data mt-3" style={{width: "100%"}}>
		        <br/>
		        <h3 className="mb-3 text-center col-lg-6">Sign In</h3>
		        <Form>
		          
				      <Form.Group className="mb-4 col-lg-6" controlId="email">
				        <Form.Control type="email" name="email" onChange ={handleChange} placeholder="Enter Your Email" />
				       
				      </Form.Group>

				      <Form.Group className="mb-4 col-lg-6" controlId="password">
				        <Form.Control type="password" name="password" onChange ={handleChange} placeholder="Enter Your Password" />
				      </Form.Group>
				      
				      <Button variant="primary" className="col-lg-6" onClick= {handleSubmit} type="submit">
				        Submit
				      </Button>
				    </Form>
				    <p className="mt-3">Don't have an Account <span> <NavLink to="/signup">Sign Up</NavLink></span></p>
		      </div>
		      <div className="right-data mt-5" style={{ width: "100%" }}>
		        <div className="sign_img mt-3">
		          <img src="./sign.svg" style={{ maxWidth: 600 }} alt=""/>
		        </div>
		      </div>
		    </section>
		  </div>
		</>
	)  

}

export default Login