import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

export class Modal extends Component {
  componentDidMount() {
    document.addEventListener(`keydown`, this.handleClose);
  }

  componentWillUnmount() {
    document.removeEventListener(`keydown`, this.handleClose);
  }

  handleClose = event => {
    if (event.code === 'Escape' || event.target === event.currentTarget) {
      this.props.hide();
    }
  };
  render() {
    return (
      <div className={css.backdrop} onClick={this.handleClose}>
        <img
          className={css.modal}
          src={this.props.link}
          alt={this.props.tags}
        />
      </div>
    );
  }
}

Modal.propTypes = {
  link: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  hide: PropTypes.func.isRequired,
};
