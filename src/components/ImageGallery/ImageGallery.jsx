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
          fullImage={item.webformatURL}
          tags={item.tags}
          showModal={this.props.showModal}
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
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
  showModal: PropTypes.func.isRequired,
};
