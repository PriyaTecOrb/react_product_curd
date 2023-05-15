import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Container, Table, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import {useAuth} from '../Contexts/AuthContext'

const Products = () => {
  const navigate = useNavigate();

  const {token} = useAuth();

  const [products, setProducts] = useState([]);
  

  useEffect(() => {
    getProducts();
  },[token]);

  // getProducts();

  const getProducts = async () => {
    const response = await axios.get(
      "http://localhost:3001/api/v1/user/products",
      {
        headers: {
            'accessToken': token,
            'Accept' : 'application/json',
            'Content-Type': 'application/json'
        }
      }
    );
    setProducts(response.data.products);
  }

  const addProduct = () => {
    // TODO: Implement adding a new product
    navigate('/new_product')
  };

  const editProduct = (id) => {
    // TODO: Implement editing an existing product
    navigate('/edit/product/'+id)
  };

  const deleteProduct = async (id) => {
    const response = await axios.delete(
      "http://localhost:3001/api/v1/product/"+id,
      {
        headers: {
            'accessToken': token,
            'Accept' : 'application/json',
            'Content-Type': 'application/json'
        }
      }
    );
    getProducts();
    // TODO: Implement deleting an existing product
  };

  return (
    <Container>
      <div className="row mt-3">
        <h3 className="mb-3 text-center col-lg-12">Products</h3>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.id}>
                <td>{index + 1}</td>
                <td>{product.title}</td>
                <td>{product.description ? product.description : 'Not Description Mention'}</td>
                <td>${product.price}</td>
                <td>
                  <Button variant="primary" onClick={() => editProduct(product.id)}>Edit</Button>{' '}
                  <Button variant="danger" onClick={() => deleteProduct(product.id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>  
      <Button variant="success" onClick={addProduct}>Add Product</Button>
    </Container>
  );
};

export default Products;
