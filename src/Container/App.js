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
  state = { images: [], isLoading: false, error: null, page: 1, input: '' };

  // componentDidMount() {
  //   this.fetchImagesAPI();
  // }

  fetchImagesAPI = query => {
    const { page } = this.state;
    this.setState({ isLoading: true });

    // this.setState(prevState => ({
    //   page: prevState.page + 1,
    // }));

    fetchImages(query, page)
      .then(({ data }) =>
        this.setState(prevState => {
          return { images: mapper([...prevState.images, ...data.hits]) };
        }),
      )
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  };

  // handleIncrementPage = query => {
  //   console.log(query);
  //   const { page } = this.state;
  //   this.setState({ page: page + 1 });
  //   fetchImages(query, page)
  //     .then(({ data }) =>
  //       this.setState(prevState => {
  //         return { images: mapper([...prevState.images, ...data.hits]) };
  //       }),
  //     )
  //     .catch(error => this.setState({ error }))
  //     .finally(() => this.setState({ isLoading: false }));
  // };

  handleSubmit = value => {
    const { input } = this.state;
    if (input === '') return;

    this.setState({
      page: 1,
      images: [],
      isLoading: true,
    });
    this.fetchImagesAPI(value);
  };

  handleChange = value => {
    this.setState({
      input: value,
    });
  };

  pageAdd = () => {
    const { input } = this.state;
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
    this.fetchImagesAPI(input);
  };

  render() {
    const { images, isLoading, error, input } = this.state;
    return (
      <div className={styles.app}>
        <SearchForm
          onSubmit={this.handleSubmit}
          value={input}
          onChange={this.handleChange}
        />
        <Gallery items={images} />
        {error && <ErrorNotification />}
        {isLoading && <Loader />}
        {images.length > 1 && (
          <button
            className={styles.button}
            type="button"
            onClick={this.pageAdd}
          >
            Load more
          </button>
        )}
      </div>
    );
  }
}
