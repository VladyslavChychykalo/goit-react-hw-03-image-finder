import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal/Modal';
import styles from './PhotoCard.module.css';

export default class PhotoCard extends Component {
  state = { isModalOpen: false };

  static propTypes = {
    link: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    views: PropTypes.number.isRequired,
    comments: PropTypes.number.isRequired,
    downloads: PropTypes.number.isRequired,
    linkLarge: PropTypes.string.isRequired,
  };

  openModal = () =>
    this.setState({
      isModalOpen: true,
    });

  closeModal = () =>
    this.setState({
      isModalOpen: false,
    });

  render() {
    const { isModalOpen } = this.state;
    const { link, likes, views, comments, downloads, linkLarge } = this.props;
    return (
      <>
        <div className={styles.photoCard}>
          <img src={link} alt="" />

          <div className={styles.stats}>
            <p className={styles.statsItem}>
              <i className="material-icons">thumb_up</i>
              {likes}
            </p>
            <p className={styles.statsItem}>
              <i className="material-icons">visibility</i>
              {views}
            </p>
            <p className={styles.statsItem}>
              <i className="material-icons">comment</i>
              {comments}
            </p>
            <p className={styles.statsItem}>
              <i className="material-icons">cloud_download</i>
              {downloads}
            </p>
          </div>

          {/* <!-- Кнопка для открытия модалки с большим изображением, появляется при наведении --> */}
          <button
            type="button"
            className={styles.fullscreenButton}
            onClick={this.openModal}
          >
            <i className="material-icons">zoom_out_map</i>
          </button>
        </div>
        {isModalOpen && (
          <Modal linkLarge={linkLarge} onClose={this.closeModal} />
        )}
      </>
    );
  }
}
