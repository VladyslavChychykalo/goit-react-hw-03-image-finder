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

  fetchImagesAPI = query => {
    this.setState({ isLoading: true });
    const { page, images } = this.state;

    // console.log(page);
    fetchImages(query, page)
      .then(
        ({ data }) =>
          this.setState({ images: mapper([...images, ...data.hits]) }),
        // this.setState(prevState => {
        //   return { images: mapper([...prevState.images, ...data.hits]) };
        // }),
      )
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  };

  //   onImageFetch = value => {
  //     const { page, imagesList } = this.state;
  //     axios
  //       .get(
  //         `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${value}&page=${page}&per_page=12&key=${API_KEY}`,
  //       )
  //       .then(data =>
  //         this.setState({
  //           imagesList: [...imagesList, ...data.data.hits],
  //           isLoading: false,
  //         }),
  //       )
  //       // eslint-disable-next-line no-console
  //       .catch(err => console.log(err))
  //       .finally(() => {
  //         if (page > 1) {
  //           const { current } = this.buttonLoadMoreRef;
  //           window.scrollTo({
  //             top: current.offsetTop - 2 * window.innerHeight,
  //             behavior: 'smooth',
  //           });
  //         }
  //       });
  //   };

  // handleSubmit = value => {
  //   this.setState({
  //     page: 1,
  //     images: [],
  //     isLoading: true,
  //   });
  //   this.fetchImagesAPI(value);
  // };

  handleSubmit = value => {
    this.setState(
      {
        page: 1,
        images: [],
        isLoading: true,
      },
      () => {
        this.fetchImagesAPI(value);
      },
    );
  };

  // handleInputChange = value => {
  //   this.setState({
  //     input: value,
  //   });
  // };

  handleInputChange = value => {
    this.setState({
      input: value,
    });
  };

  // handleIncrementPage = () => {
  //   const { input } = this.state;
  //   this.setState(prevState => ({
  //     page: prevState.page + 1,
  //   }));
  //   this.fetchImagesAPI(input);
  // };

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
    const { images, isLoading, error, input } = this.state;
    return (
      <div className={styles.app}>
        <SearchForm
          onSubmit={this.handleSubmit}
          value={input}
          onChange={this.handleInputChange}
        />
        <Gallery items={images} />
        {error && <ErrorNotification />}
        {isLoading && <Loader />}
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
