import React, { useState } from "react";
import axios from "axios";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import { NavLink } from 'react-router-dom';


const Signup = () => {
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
	  user_name: "",
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
    
    if (user_name === ""){
    	alert("Name can't be blank")
    }
    else if (email === ""){
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
		      "http://localhost:3001/api/v1/users",
		      formData
		    );
		    const data = response.data
		    if (data.code == 200){
          navigate("/login");
		    }
		    else{
          alert(data)
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
		        <h3 className="mb-3 text-center col-lg-6">Sign Up</h3>
		        <Form>
		          <Form.Group className="mb-4 col-lg-6" controlId="user_name">
				        <Form.Control type="text" name="user_name" onChange ={handleChange} placeholder="Enter Your Name" />
				       
				      </Form.Group>

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
				    <p className="mt-3">Already Have an Account <span> <NavLink to="/login">Sign In</NavLink></span></p>
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

export default Signup