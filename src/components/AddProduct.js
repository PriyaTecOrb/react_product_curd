import React, { useState } from 'react';
import axios from "axios";
import {Container} from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import Notification from "./Notification"
import {useAuth} from "../Contexts/AuthContext";

const AddProduct = () =>{
  const navigate = useNavigate();

  const {token} = useAuth()

	const [formData,setFormData] = useState({
     title: "",
     price: "",
     description:"",
     image:""
	});

	const handleProductChange = (event) =>{
    const { id, value } = event.target;
	  setFormData((prevState) => ({ ...prevState, [id]: value }));
	};

	const createProduct = async (event) => {
		event.preventDefault();
		
		const {title,price,description,image} = formData

		if (title === ""){
    	alert("Product Title can't be blank")
    }
    else if(price === ""){
      alert("Price can't be blank")
    }
    else
    {
    	
		  try {
		    const response = await axios.post(
		      "http://localhost:3001/api/v1/products",
		      formData,
		      {
				    headers: {
				        'accessToken': token,
				        'Accept' : 'application/json',
				        'Content-Type': 'multipart/form-data'
				    }
				  }
		    );
		    const data = response.data
		    if (data.code == 200){
          navigate('/products')
		    }
		    else{
          alert(data.message)
		    }
		  } catch (error) {
		    console.error(error);
		  }
		}
	};
	

	return (
		<>
		  <Container>
		    <div className="row mt-3">
		    <h3 className="mb-3 text-center col-lg-12">Add Product</h3>
	      <Form>
	        <Form.Group controlId="title" className="mt-3">
            <Form.Control type="text" onChange ={handleProductChange} placeholder="Enter Product Title" />
	        </Form.Group>
	        <Form.Group controlId="price" className="mt-3">
            <Form.Control type="number" onChange ={handleProductChange} placeholder="Enter Product Price" />
	        </Form.Group>

	        <Form.Group controlId="description"  className="mt-3">
	          <Form.Control as="textarea" rows={3} onChange ={handleProductChange} placeholder="Enter Product Description" />
	        </Form.Group>

	        <Form.Group controlId="image"  className="mt-3">
	          <Form.Control type="file" className="custom-file-label" onChange ={handleProductChange}  custom/>
	        </Form.Group>

	        <Button variant="primary"  onClick= {createProduct} type="submit" className="mt-3 pull-right"> Submit</Button>
	      </Form>
	      </div>
	    </Container>
		</>
	)

}

export default AddProduct