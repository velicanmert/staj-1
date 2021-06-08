import React, { Component } from 'react';
import classes from './Modal.css';
import Backdrop from '../backdrop/Backdrop';

class Modal extends Component {
  // componentWillUpdate() {
  // }

  shouldComponentUpdate(nextProps, nextState) {
    // Modal'in children'i OrderSummary yada Spinner olabiliyor. Bknz: BurgerBuilder
    // Modal gorunur durumdayken, child element'i degistiriyoruz. O nedenle Spinner'in
    // gorunebilmesi icin buraya nextProps.children'in degistiginin kontrolunu ekledik.
    return (
      nextProps.show !== this.props.show ||
      nextProps.children !== this.props.children
    );
  }

  render() {
    //transform property within the style is used for animation
    return (
      <>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: this.props.show ? '1' : '0'
          }}
        >
          {this.props.children}
        </div>
      </>
    );
  }
}

export default Modal;
