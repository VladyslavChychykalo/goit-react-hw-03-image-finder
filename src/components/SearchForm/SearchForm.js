import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { searchForm } from './SearchForm.module.css';

class SearchForm extends Component {
  state = { query: '' };

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  handleChange = e => {
    this.setState({
      query: e.target.value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { query } = this.state;
    if (query === '') return;
    this.props.onSubmit(query);
    this.setState({ query: '' });
  };

  render() {
    const { query } = this.state;
    return (
      <form className={searchForm} onSubmit={this.handleSubmit}>
        <input
          type="text"
          autoComplete="off"
          placeholder="Search images..."
          value={query}
          onChange={this.handleChange}
        />
      </form>
    );
  }
}

export default SearchForm;
