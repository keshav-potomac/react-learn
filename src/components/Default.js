import React, { Component } from 'react'

export default class Default extends Component {
    render() {
        console.error(this.props)
        return (
           <div className="container">
              <div className="row">
                <div className="col-10 mx-auto text-center text-title text-uppercase pt-5">
                   <h1 className="display-3">404</h1>
                   <h1 className="">error</h1>
                   <h2 className="">Page not found</h2>
                   <h3 className="">the requested URL<spam className="text-danger">{this.props.location.pathname} </spam>{ " " } was not found</h3>
                </div>
              </div>
           </div>
        )
    }
}
