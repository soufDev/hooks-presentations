import React, { useEffect } from 'react';
import './Modal.css';

interface Props {
  open: boolean;
  title?: string;
  content?: JSX.Element;
  onClose: () => void;
}

export default class Modal extends React.PureComponent<Props> {
  componentDidMount() {
    document.body.style.overflow = 'hidden';
  }

  componentWillUnmount() {
    document.body.style.overflow = 'auto';
  }

  render() {
    return (
      <div id="myModal" className="modal" style={this.props.open && { display: 'block' } || { display: 'none' }}>
        <div className="modal-content">
          <div className="modal-header">
            <span className="close" onClick={this.props.onClose}>&times;</span>
            <h2>{this.props.title}</h2>
          </div>
          <div className="modal-body">
            {this.props.content}    
          </div>
        </div>
      </div>
    )
  }
}