import PropTypes from 'prop-types';

import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Component } from 'react';
import css from './ImageGallery.module.css';
export class ImageGallery extends Component {
  render() {
    const elements = this.props.data.map(item => {
      return (
        <ImageGalleryItem
          key={item.id}
          id={item.id}
          preview={item.previewURL}
          getLink={this.props.getLink}
        />
      );
    });
    return <ul className={css.list}>{elements}</ul>;
  }
}

ImageGallery.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      previewURL: PropTypes.string.isRequired,
    })
  ),
  getLink: PropTypes.func.isRequired,
};
