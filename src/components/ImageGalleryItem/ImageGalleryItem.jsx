import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ preview, id, getLink }) => {
  return (
    <>
      <li
        id={id}
        style={{ cursor: 'pointer' }}
        onClick={e => {
          getLink(e.currentTarget.id);
        }}
      >
        <img
          className={css.img}
          src={preview}
          alt="from search"
          width="300px"
          height="200px"
        ></img>
      </li>
    </>
  );
};

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  preview: PropTypes.string.isRequired,
  getLink: PropTypes.func.isRequired,
};
