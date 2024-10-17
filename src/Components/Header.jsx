import React, { useEffect, useState } from 'react'
import { Badge, Card } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { searchProducts } from '../Redux/slice/productSlice';


function Header({insideHome}) {
  const dispatch=useDispatch()

  const[wishlistCount,setWishlistCount]=useState(0)
  const{wishlist}=useSelector((state)=>state.wishlistReducer);
  const[cartCount,setCartCount]=useState(0)
  const{cart}=useSelector((state)=>state.cartReducer);

  useEffect(()=>{
    setWishlistCount(wishlist?.length)
    setCartCount(cart?.length)
  },[wishlist,cart])

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark" style={{zIndex:1}}>
        <Container>
          <Navbar.Brand href="/" style={{fontFamily: '"Lilita One", sans-serif'}}><Card.Img variant="top" src="src/assets/logo.png" style={{width:'25px',height:'25px'}} />{' '}E-Cart</Navbar.Brand>
          <Nav className="ms-auto">

          { insideHome&& <Nav.Link className=''>
              <input onChange={e=>dispatch(searchProducts(e.target.value.toLowerCase()))} type="text" className='form-control' placeholder='searchProducts' style={{width:'300px', height:'10px', margin:'auto',borderRadius:'24px'}} />
            </Nav.Link>}

              {/* <i className="fas fa-search" style={{position: 'absolute', top: '50%', 
                    left: '1130px',  // Adjust icon position
                    transform: 'translateY(-50%)',
                    color: 'gray'  // Icon color
                    }} 
                    /> */}
              {/* <i className="fa fa-search" aria-hidden="true"></i> */}
            
                    <Nav.Link>
              <Link to={'/wishlist'} style={{textDecoration:'none'}}>
              <i className="fa fa-heart" aria-hidden="true"></i> Wishlist
              <Badge bg='success rounded ms-2'>{wishlistCount}</Badge>
              </Link>
            </Nav.Link>
            <Nav.Link>
            <Link to={'/cart'} style={{textDecoration:'none'}}>
            <i  className="fa fa-shopping-cart" aria-hidden="true"></i> Cart
            <Badge bg='success rounded ms-2'>{cartCount}</Badge>
              </Link>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  )
}

export default Header
