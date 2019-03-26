import React from 'react';
import './Page.css';
import { RouteComponentProps } from 'react-router';
import Detail from '../Products/Details';

interface Props {
  content: JSX.Element;
}

class Page extends React.Component<Props & RouteComponentProps<{ id: string }>> {
  onGoHome() {
    this.props.history.push('/');
  }
  render() {
    const { id: id_product } = this.props.match.params;
    return (
      <div id="page-content">
        <Detail id={id_product} />
        <button className="home-button" onClick={() => this.props.history.push('/')}>
          <span id="home">&#8962; Home</span>
        </button>
      </div>
    )
  }
}

export default Page;