import './App.css';
import axios from 'axios'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import React, { useState, createContext, useContext } from 'react'
import { useEffect } from 'react';
import { FcRating } from 'react-icons/fc';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Iphone1 from "./photos/iphone1.png"
import Iphone3 from "./photos/iphone3.png"
import Saree1 from "./photos/saree.png"
import Cricketbat from "./photos/cricketbat.png"
import Football1 from "./photos/football1.png"
import Football2 from "./photos/football2.png"
import Tshirt1 from "./photos/tshirt1.png"
import Tshirt2 from "./photos/tshirt2.png"
import Samsung from "./photos/samsung.png"
import Shirt from "./photos/shirt.png"
import Pant from "./photos/pant.png"
import Dumbell from "./photos/dumbell.png"
import HP from "./photos/hplap.png"
import Apple from "./photos/applelap.png"
import Lenovo from "./photos/lenovolap.png"
import Headphone from "./photos/headphone.png"
import Sunglass from "./photos/sunglass.png"
import Bracelet from "./photos/bracelet.png"
import Shoe from "./photos/shoe.png"
import Ladiesfoo from "./photos/ladiesfoot.png"
import Table from "./photos/table.png"
const UserContext = createContext();
function App() {
  return (

    <div className='top'>
      <h1>Web Scrapping</h1>
      <Topbar />
    </div>
  )
}

function Topbar() {
  const [productName, setProductname] = useState("")
  const [product, setProduct] = useState([])
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    webscrap()
  }, [])

  const webscrap = async () => {
    try {
      const getProduct = await axios.get("http://localhost:3008/webscrap")
      setProduct(getProduct.data)
    } catch (error) {
      alert("product not found")
    }
  }

  const handleChange = event => {
    setProductname(event.target.value);
  };


  const onSearch = (searchTerm) => {
    setProductname(searchTerm);
  };

  const validProductname = async () => {
    try {
      if (productName.length > 0) {
        const prod = product.map((item) => {
          return item.product_name
        })

        const products = (pro) => {
          return pro === productName
        }

        const getProduct = await axios.get(prod.some(products) ? `http://localhost:3008/webscrap/${productName}` : alert("product not found"))
        setProduct(getProduct.data)
        // console.log(prod.some(products))

      } else {
       alert("please enter the productname")
       webscrap()
      }
  
    } catch (error) {
      alert("product not found")
    }
  }

 const reset = ()=>{
   webscrap()
 }
  
  return (
    <BrowserRouter>
      <div className="container">
        <form>
          <div className='row'>

            <div className='col-lg-12 center'  >
              <input type={"text"}
                value={productName}
                onChange={handleChange}
                onBlur={() => setTouched(true)}
                className='form-control topbar'
                placeholder='Enter the product name' />
            </div>

            <div className="col-lg-12 dropdown">
              {
                product
                  .filter((item) => {
                    const searchTerm = productName.toLowerCase();
                    const fullName = item.product_name.toLowerCase();
                    return (
                      searchTerm &&
                      fullName.startsWith(searchTerm) &&
                      fullName !== searchTerm
                    );
                  })
                  .slice(0, 10)
                  .map((item) => (
                    <div
                      onClick={() => onSearch(item.product_name)}
                      className="dropdown-row">
                      {item.product_name}
                    </div>
                  ))
              }
            </div>
            </div>
            <div className='row'>
            <div className='col-lg-6'>
              <Link to={`/${productName}`} onClick={validProductname} type="button" className='button btn btn-primary'>Search</Link>
            </div>
            <div className='col-lg-6'>
              <button onClick={()=>reset(productName)} type="button" className='button btn btn-primary'>Reset</button>
            </div>
          </div >
        </form>
      </div>

      <div>
        <div className='webscrap container'>
          <div className='row'>
            {
              product.map(prod => {
                return (
                  <div className='products col-lg-4'>
                    <div class="card" style={{ width: "18rem" }}>
                      <img src={prod.product_image} class="card-img-top" alt="" />
                      <div class="card-body">
                        <h5 class="card-title">{prod.product_name}</h5>
                      </div>
                      <ul class="list-group list-group-flush">
                        <li class="list-group-item">Rating: {prod.rating}<FcRating /></li>
                        <li class="list-group-item">Price: {prod.price}</li>
                        <li class="list-group-item">Final Price: {prod.final_price_with_offer}</li>
                      </ul>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}
export default App;
