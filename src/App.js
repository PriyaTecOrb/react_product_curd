import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route,Routes} from "react-router-dom";
import Header from './components/Header'
import Signup from './components/Signup'
import Login from './components/Login'
import Products from './components/Products'
import AddProduct from './components/AddProduct'
import EditProduct from './components/EditProduct'
import Home from './components/Home'
import {AuthProvider,useAuth} from "./Contexts/AuthContext";
import { useState, useEffect, useContext} from 'react';


function App() {

  return (
    <>      
      <AuthProvider>
        <BrowserRouter>
          <Header/>
          <Routes>
            <Route path="/" element = {<Home/>} />
            <Route path="/signup" element = {<Signup/>} />
            <Route path="/login" element = {<Login/>} />
            <Route path="/products" element ={<Products/>} />
            <Route path="/new_product" element ={<AddProduct/>} />
            <Route path="/edit/product/:id" element ={<EditProduct/>} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
