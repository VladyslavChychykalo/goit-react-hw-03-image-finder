import React, { Component } from 'react';
import SearchForm from '../components/SearchForm/SearchForm';
import Gallery from '../components/Gallery/Gallery';
import Loader from '../components/Loader/Loader';
import ErrorNotification from '../components/ErrorNotification/ErrorNotification';
import fetchImages from '../services/images-api';
import styles from './App.module.css';

const mapper = images => {
  return images.map(
    ({ webformatURL: link, largeImageURL: linkLarge, ...props }) => ({
      linkLarge,
      link,
      ...props,
    }),
  );
};

export default class App extends Component {
  state = { images: [], isLoading: false, error: null };

  componentDidMount() {
    this.fetchImagesAPI();
  }

  fetchImagesAPI = query => {
    this.setState({ isLoading: true });

    fetchImages(query)
      .then(({ data }) => this.setState({ images: mapper(data.hits) }))
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  };

  render() {
    const { images, isLoading, error } = this.state;
    return (
      <div className={styles.app}>
        <SearchForm onSubmit={this.fetchImagesAPI} />
        <Gallery items={images} />
        {error && <ErrorNotification />}
        {isLoading && <Loader />}
      </div>
    );
  }
}
