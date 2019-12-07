import React, { Component } from 'react';
import SearchForm from '../components/SearchForm/SearchForm';
import Gallery from '../components/Gallery/Gallery';
import ErrorNotification from '../components/ErrorNotification/ErrorNotification';
import fetchImages from '../services/images-api';
import styles from './App.module.css';
import Spinner from '../components/Spinner/Spinner';

const mapper = images => {
  return images.map(
    ({ webformatURL: link, largeImageURL: linkLarge, ...props }) => ({
      linkLarge,
      link,
      ...props,
    }),
  );
};

class App extends Component {
  state = { images: [], isLoading: false, error: null, page: 1, input: '' };

  fetchImagesAPI = query => {
    this.setState({ isLoading: true });
    const { page, images } = this.state;

    fetchImages(query, page)
      .then(({ data }) =>
        this.setState({ images: mapper([...images, ...data.hits]) }),
      )
      .catch(error => this.setState({ error }))
      .finally(() => {
        this.setState({ isLoading: false });

        if (page > 1) {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
        }
      });
  };

  handleSubmit = value => {
    this.setState(
      {
        page: 1,
        images: [],
        isLoading: true,
        input: value,
      },
      () => {
        this.fetchImagesAPI(value);
      },
    );
  };

  handleIncrementPage = () => {
    const { input } = this.state;
    this.setState(
      prevState => ({
        page: prevState.page + 1,
      }),
      () => {
        this.fetchImagesAPI(input);
      },
    );
  };

  render() {
    const { images, isLoading, error } = this.state;
    return (
      <div className={styles.app}>
        <SearchForm
          onSubmit={this.handleSubmit}
          onChange={this.handleInputChange}
          onIncrement={this.handleIncrementPage}
        />
        <Gallery items={images} />
        {error && <ErrorNotification />}
        {isLoading && <Spinner />}
        {images.length > 1 && (
          <button
            className={styles.button}
            type="button"
            onClick={this.handleIncrementPage}
          >
            Load more
          </button>
        )}
      </div>
    );
  }
}

export default App;
