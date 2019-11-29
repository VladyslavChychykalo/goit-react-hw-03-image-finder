import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';

class Modal extends Component {
  backdropRef = createRef();

  static propTypes = {
    onClose: PropTypes.func.isRequired,
    linkLarge: PropTypes.string.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress = e => {
    if (e.code !== `Escape`) return;

    this.props.onClose();
  };

  handleBackdropClick = e => {
    const { current } = this.backdropRef;

    if (current && e.target !== current) return;

    this.props.onClose();
  };

  render() {
    const { linkLarge } = this.props;
    return (
      <div
        className={styles.overlay}
        ref={this.backdropRef}
        onClick={this.handleBackdropClick}
        role="button"
        tabIndex="0"
        onKeyPress={() => {}}
      >
        <div className={styles.modal}>
          <img src={linkLarge} alt="" />
        </div>
      </div>
    );
  }
}

export default Modal;
