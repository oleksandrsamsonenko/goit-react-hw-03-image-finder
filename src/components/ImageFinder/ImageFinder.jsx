import { Searchbar } from 'components/SearchBar/SearchBar';
import { Component } from 'react';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';

import { searchImages } from 'api/api';

export class ImageFinder extends Component {
  state = {
    search: '',
    images: [],
    page: 1,
    status: 'idle',
    modal: false,
    imageLink: null,
    imageTags: null,
    totalHits: null,
  };

  componentDidUpdate(_, prevState) {
    if (prevState.search !== this.state.search) {
      this.getResponse();
      return;
    }
    if (prevState.page !== this.state.page) {
      this.getResponse();
    }
  }

  addNewSearchValue = value => {
    if (value.trim() !== this.state.search && value.trim() !== '') {
      this.setState({ search: value, images: [], page: 1 });
    }
    if (value.trim() === '') {
      alert(`Search field must contain something to show results`);
    }
  };

  async getResponse() {
    try {
      this.setState({ status: 'pending' });

      const response = await searchImages(this.state.search, this.state.page);
      this.setState(prevState => {
        const newImages = response.data.hits.map(
          ({ id, previewURL, webformatURL, tags }) => {
            return {
              id,
              previewURL,
              webformatURL,
              tags,
            };
          }
        );

        return {
          images: [...prevState.images, ...newImages],
          status: 'resolved',
          totalHits: response.data.totalHits,
        };
      });
    } catch (error) {
      this.setState({
        status: 'rejected',
        error: error.message || 'Sorry, something gone wrong!',
      });
      console.log(error.message);
    }
  }

  setCurrentPage = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  showModal = (url, tags) => {
    this.setState({ modal: true, imageLink: url, tags: tags });
  };

  hideModal = () => {
    this.setState({ modal: false, imageLink: null });
  };

  render() {
    const { images, status, totalHits, modal } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.addNewSearchValue} />
        {images.length !== 0 && (
          <ImageGallery data={images} showModal={this.showModal} />
        )}
        {status === 'resolved' &&
          images.length > 0 &&
          totalHits !== images.length && (
            <Button setPage={this.setCurrentPage} />
          )}
        {status === 'resolved' && images.length === 0 && (
          <p>No images matching your search criteria were found</p>
        )}
        {status === 'pending' && <Loader />}
        {modal && (
          <Modal
            link={this.state.imageLink}
            tags={this.state.tags}
            hide={this.hideModal}
          />
        )}
        {status === 'rejected' && <p>{this.state.error}</p>}
      </>
    );
  }
}
