import React from 'react';

import { Link } from 'react-router-dom';
import  PaypalButton from './PaypalButton';
export default function CartTotals({value}) {
    const {cartSubTotal, cartTax, cartTotal, clearCart , history} = value;
    return (
       <React.Fragment>
            <div className="container">
                <div className="row">
                <div className="col-10 mt-2 ml-sm-5 ml-md-auto text-capitalize text-right">
                  <Link to="/" >
                      <button className="btn btn-outline-danger text-uppercase mb-3 px-5" type="button" onClick={()=>clearCart()} >Clear Cart</button>
                  </Link>
                  
                  <h5>
                      <span className="text-title">
                          subtotal:
                      </span>
                      <strong>$ {cartSubTotal}</strong>
                  </h5>
                  <h5>
                      <span className="text-title">
                          Tax:
                      </span>
                      <strong>$ {cartTax}</strong>
                  </h5>
                  <h5>
                      <span className="text-title">
                          Totol:
                      </span>
                      <strong>$ {cartTotal}</strong>
                  </h5>
                  <PaypalButton  total={cartTotal} clearCart={clearCart}  history= {history}/>
                </div>
                
                </div>
             </div> 
       </React.Fragment>
    )
}