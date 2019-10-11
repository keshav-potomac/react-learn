import React, { Component } from 'react';
import { storeProducts, detailProduct } from './data';
const ProductContext = React.createContext();
class ProductProvider extends Component {
    state = {
        products: [],
        detailProduct: detailProduct,
        cart: [],
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
                return { products: tempProducts, cart: [...this.state.cart, product] };
            }, () => {
                this.addTotal();
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
       let tempCard = [...this.state.cart];
       const selectedProduct = tempCard.find(item => item.id ===id);
       const index = tempCard.indexOf(selectedProduct);
       const product  = tempCard[index];
        product.count  = product.count+1;
        product.total  = product.count * product.price;
       this.setState(()=> {
           return {cart: [...tempCard]}
       }, () => {
          this.addTotal(); 
       })
    }

    decrement = (id) => {
        let tempCard = [...this.state.cart];
        const selectedProduct = tempCard.find(item => item.id ===id);
        const index = tempCard.indexOf(selectedProduct);
        const product  = tempCard[index];
        product.count = product.count -1;
        if(product.count ===0){
            this.removeItem(id)
        } else{
            product.total = product.count * product.price;
            this.setState(()=> {
                return {cart: [...tempCard]}
            }, () => {
               this.addTotal(); 
            })
        }
    }
    removeItem = (id) => {
       let tempProducts = [...this.state.products]
       let tempcard = [...this.state.cart];
       tempcard = tempcard.filter(item => item.id !== id);
       const index =  tempProducts.indexOf(this.getItems(id));
       let removeProduct = tempProducts[index];
       removeProduct.inCart = false;
       removeProduct.count = false;
       removeProduct.total = false;
       this.setState(() => {
           return {
               cart : [...tempcard],
               products : [...tempProducts]
           };
       }, () => {
           this.addTotal();
       })
    }
    clearCart = () => {
        this.setState(()=> {
            return { cart: []}
        },() =>{
           this.setProducts();
           this.addTotal()
        });
    }

    addTotal = () => {
        let subTotal = 0;
        this.state.cart.map(item => (subTotal += item.total));
        const tempTax = subTotal * 0.1;
        const tax = parseFloat(tempTax.toFixed(2));
        const total = subTotal+tax;
        this.setState(() => {
            return {
                cartSubTotal:subTotal,
                cartTax: tax,
                cartTotal:total
            }
        })
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