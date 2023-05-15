import React, { useEffect,useState} from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from "axios";
import {Container} from "react-bootstrap";
import {useAuth} from '../Contexts/AuthContext'

function Home() {
  const {token} = useAuth()

  console.log(token)

  const [products, setProducts] = useState([]);

  useEffect(() => {
     getProducts();
  },[]);

  const getProducts = async () => {
    const response = await axios.get(
      "http://localhost:3001/api/v1/products",
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

  return (
    <Container>
      <div className="row">
        {products.map((product, index) => (
          <div className="col-lg-3">
            <Card className="mt-4" style={{ width: '18rem' }}>
              <Card.Img variant="top" src="./product.jpg" />
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Title>$ {product.price}</Card.Title>
                <Card.Text>
                  {product.description}
                </Card.Text>
                
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </Container>
  );
}

export default Home;