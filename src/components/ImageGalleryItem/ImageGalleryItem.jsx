import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({
  preview,
  fullImage,
  id,
  tags,
  showModal,
}) => {
  return (
    <li
      id={id}
      style={{ cursor: 'pointer' }}
      onClick={() => showModal(fullImage, tags)}
    >
      <img
        className={css.img}
        src={preview}
        alt={tags}
        width="300px"
        height="200px"
      ></img>
    </li>
  );
};

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  preview: PropTypes.string.isRequired,
  showModal: PropTypes.func.isRequired,
  fullImage: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
