import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './SearchBar.module.css';

export class Searchbar extends Component {
  state = { inputValue: '' };

  handleInputChange = event => {
    this.setState({ inputValue: event.target.value });
  };

  handleSearchSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.inputValue);
  };

  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.form} onSubmit={this.handleSearchSubmit}>
          <button className={css.button} type="submit">
            <span className={css.label}></span>
          </button>

          <input
            className={css.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleInputChange}
            value={this.state.inputValue}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
