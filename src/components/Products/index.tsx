import React, { useEffect, useState, useReducer, lazy, Suspense } from 'react';
import { Props as ProductProps } from './Product';
import { fetchProductList, fetchProductListAbort } from '../../api/product';
import Detail from './Details';
import { RouteComponentProps } from 'react-router';
import Loader from '../Loader';

const Modal = lazy(() => import('./../Modal'));
const Product = lazy(() => import('./Product'));

interface StateReducer {
  open: boolean;
  content?: JSX.Element;
}

interface ActionReducer {
  type: string;
  content?: JSX.Element;
}
interface State {
  products: Array<ProductProps>;
  isOpen: boolean;
  content: JSX.Element;
}

const initialState: StateReducer = { 
  open: false,
  content: <></>,
}

export default class Products extends React.Component<RouteComponentProps, Partial<State>> {
  state = {
    products: [],
    isOpen: false,
    content: <></>,
  }

  componentDidMount() {
    fetchProductList('/list')
      .then(results => this.setState({ products: results }))
  }

  componentWillUnmount() {
    fetchProductListAbort();
  }

  showProductDetail = (id: string) => () => {
    if (window.innerWidth > 1007) {
      this.setState({ isOpen: true, content: <Detail id={id} />})
    } else {
      this.props.history.push('/product/'+id);
    }
  }

  onCloseModal = () => {
    this.setState({ isOpen: false });
  }

  render() {
    const { products, isOpen, content } = this.state
    return (
      <Suspense fallback={<Loader />}>
        {products && products.map((product: ProductProps, index: number) =>
          <Product
            {...product}
            key={index}
            onClick={this.showProductDetail(product.product_id)}
          />
        )}
        {isOpen &&
          <Modal title='Product Description' open={isOpen} content={content} onClose={this.onCloseModal}/>
        }
      </Suspense> 
    )
  }
}