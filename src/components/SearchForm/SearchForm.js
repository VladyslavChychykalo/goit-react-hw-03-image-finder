import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { searchForm } from './SearchForm.module.css';

export default class SearchForm extends Component {
  // state = { query: '' };

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
  };

  // handleChange = e => {
  //   this.setState({
  //     query: e.target.value,
  //   });
  // };

  // handleSubmit = e => {
  //   e.preventDefault();
  //   if (this.state.query === '') return;
  //   this.props.onSubmit(this.state.query);
  //   // this.setState({ query: '' });
  // };

  // handleLoad = () => {
  //   this.props.onIncrement(this.state.query);
  // };

  handleChange = ({ target }) => {
    this.props.onChange(target.value);
  };

  handleSubmit = event => {
    event.preventDefault();
    const { value } = this.props;
    const { onSubmit } = this.props;
    onSubmit(value);
  };

  render() {
    // const { query } = this.state;
    const { value } = this.props;
    return (
      <form className={searchForm} onSubmit={this.handleSubmit}>
        <input
          type="text"
          autoComplete="off"
          placeholder="Search images..."
          value={value}
          onChange={this.handleChange}
        />
        {/* {images.length > 1 && (
          <button type="button" onClick={this.handleLoad}>
            Load more
          </button>
        )} */}
      </form>
    );
  }
}
