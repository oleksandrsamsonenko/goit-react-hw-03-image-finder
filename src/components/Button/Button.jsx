import PropTypes from 'prop-types';
import css from './Button.module.css';

export const Button = ({ setPage }) => {
  return (
    <button type="button" className={css.btn} onClick={setPage}>
      Load more
    </button>
  );
};

Button.propTypes = {
  setPage: PropTypes.func.isRequired,
};
