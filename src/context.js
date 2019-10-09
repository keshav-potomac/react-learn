import React, { Component } from 'react';
import { storeProducts, detailProduct } from './data';
const ProductContext = React.createContext();
class ProductProvider extends Component {
    state = {
        products: [],
        detailProduct: detailProduct,
        cart: storeProducts,
        modalOpen: false,
        modelProduct: detailProduct,
        cartSubTotal: 0,
        cartTex: 0,
        cartTotal: 0,
    }

    componentDidMount() {
        this.setProducts();
    }
    setProducts = () => {
        let tempProducts = [];
        storeProducts.forEach(item => {
            const singleItem = { ...item };
            tempProducts = [...tempProducts, singleItem];
        })
        this.setState(() => {
            return { products: tempProducts }
        });
    }


    getItems = (id) => {
        const product = this.state.products.find(item => item.id === id);
        return product;
    }
    handleDetail = (id) => {
        const product = this.getItems(id);
        this.setState(() => {
            return { detailProduct: product }
        });
    }

    addToCart = (id) => {
        let tempProducts = [...this.state.products];
        const index = tempProducts.indexOf(this.getItems(id));
        const product = tempProducts[index];
        product.inCart = true;
        product.count = 1;
        const price = product.price;
        product.total = price;
        this.setState(
            () => {
                return { products: tempProducts, cart: [this.state.cart, product] };
            }, () => {

            });
    }

    openModal = id => {
        const product = this.getItems(id);
        this.setState(() => {
            return { modelProduct: product, modalOpen: true }
        })
    }
    closeModal = id => {
        this.setState(() => {
            return { modalOpen: false }
        });
    }
    increment = (id) => {
        console.error("Increment Method.")
    }

    decrement = (id) => {
        console.error("Decrement Method.")
    }
    removeItem = (id) => {
        console.error("Remove Item. Method.")
    }
    clearCart = () => {
        console.error('clear cart.')
    }
    render() {
        return (
            <ProductContext.Provider value={{
                ...this.state, handleDetail: this.handleDetail, addToCart: this.addToCart, openModal: this.openModal, closeModal: this.closeModal,
                increment: this.increment,
                decrement: this.decrement,
                removeItem: this.removeItem,
                clearCart: this.clearCart
            }}>

                {this.props.children}
            </ProductContext.Provider>
        )
    }
}


const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer }