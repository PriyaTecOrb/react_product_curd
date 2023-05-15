import React, { useState } from 'react';
import {useEffect} from 'react';
import axios from "axios";
import {Container} from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import {useParams} from "react-router-dom";
import {useAuth} from "../Contexts/AuthContext";

const EditProduct = () =>{
	const {token} = useAuth()

	const navigate = useNavigate();

	const [title, setTitle] = useState('');
	const [price, setPrice] = useState('');
	const [description, setDescription] = useState('');
	const params = useParams();

	useEffect(() => {
     setProduct();
  },[]);

  const setProduct = async () => {
    const response = await axios.get(
      "http://localhost:3001/api/v1/product/"+params.id,
      {
        headers: {
            'accessToken': token,
            'Accept' : 'application/json',
            'Content-Type': 'application/json'
        }
      }
    );
    const data = response.data

    if (data.code == 200){
      setTitle(data.product.title);
      setPrice(data.product.price);
      setDescription(data.product.description);
    }
    
  }



	const updateProduct = async (event) => {
		const id  = params.id
		event.preventDefault();
	  try {
	    const response = await axios.post(
	      "http://localhost:3001/api/v1/update/product",
	      {title,price,description,id},
	      {
			    headers: {
			        'accessToken': localStorage.getItem('token'),
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
	};
	

	return (
		<>
		  <Container>
		    <div className="row mt-3">
		    <h3 className="mb-3 text-center col-lg-12">Edit Product</h3>
	      <Form>
	        <Form.Group controlId="title" className="mt-3">
            <Form.Control type="text" onChange = {(e) => {setTitle(e.target.value)}} placeholder="Enter Product Title"  value={title}/>
	        </Form.Group>
	        <Form.Group controlId="price" className="mt-3">
            <Form.Control type="number" onChange = {(e) => {setPrice(e.target.value)}} placeholder="Enter Product Price" value={price}/>
	        </Form.Group>

	        <Form.Group controlId="description"  className="mt-3">
	          <Form.Control as="textarea" rows={3} onChange = {(e) => {setDescription(e.target.value)}} placeholder="Enter Product Description" />
	        </Form.Group>

	        <Form.Group controlId="image"  className="mt-3">
	          <Form.Control type="file" className="custom-file-label"  custom/>
	        </Form.Group>

	        <Button variant="primary"  onClick= {updateProduct} type="submit" className="mt-3 pull-right"> Submit</Button>
	      </Form>
	      </div>
	    </Container>
		</>
	)

}

export default EditProduct