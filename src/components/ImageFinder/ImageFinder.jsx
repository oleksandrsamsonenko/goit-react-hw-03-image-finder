import { Searchbar } from 'components/SearchBar/SearchBar';
import { Component } from 'react';
import axios from 'axios';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';

export class ImageFinder extends Component {
  state = {
    search: '',
    images: [],
    page: 1,
    status: 'idle',
    modal: false,
    imageLink: null,
    totalHits: null,
  };

  componentDidUpdate(_, prevState) {
    if (
      prevState.search !== this.state.search &&
      this.state.search.trim() !== ''
    ) {
      this.getResponse();
      return;
    }
    if (prevState.page !== this.state.page) {
      this.getResponse();
    }
    if (
      this.state.imageLink !== prevState.imageLink &&
      this.state.imageLink !== null
    ) {
      this.showModal();
    }
  }

  addNewSearchValue = value => {
    if (value !== this.state.search) {
      this.setState({ search: value, images: [], page: 1 });
    }
    if (value.trim() === '') {
      alert(`Search field must contain something to show results`);
    }
  };

  async getResponse() {
    try {
      this.setState({ status: 'pending' });

      const response = await axios.get(`https://pixabay.com/api`, {
        params: {
          key: '32997992-21d577d14436d1c75bdc39ad8',
          q: this.state.search.trim(),
          orientation: 'horizontal',
          page: this.state.page,
          per_page: 12,
        },
      });

      this.setState({ totalHits: response.data.totalHits });
      this.setState(prevState => {
        const newImages = response.data.hits.map(
          ({ id, previewURL, webformatURL }) => {
            return {
              id,
              previewURL,
              webformatURL,
            };
          }
        );

        return {
          images: [...prevState.images, ...newImages],
          status: 'resolved',
        };
      });
    } catch (error) {
      this.setState({ status: 'rejected' });
      console.log(error);
    }
  }

  setCurrentPage = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  showModal = () => {
    this.setState({ modal: true });
    this.getLargeImage();
  };

  hideModal = () => {
    this.setState({ modal: false, imageLink: null });
  };

  getImageLink = value => {
    this.setState({ imageLink: value });
  };

  getLargeImage = () => {
    const link = this.state.imageLink;
    const imageLink = this.state.images.find(item => {
      return item.id === +link;
    });
    return imageLink.webformatURL;
  };

  render() {
    const { images, status, totalHits, modal } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.addNewSearchValue} />
        {images.length !== 0 && (
          <ImageGallery data={images} getLink={this.getImageLink} />
        )}
        {status === 'resolved' &&
          images.length > 0 &&
          totalHits !== images.length && (
            <Button setPage={this.setCurrentPage} />
          )}
        {status === 'resolved' && images.length === 0 && (
          <p>No items matching your search criteria were found</p>
        )}
        {status === 'pending' && <Loader />}
        {modal && <Modal link={this.getLargeImage()} hide={this.hideModal} />}
        {status === 'rejected' && <p>Sorry, something gone wrong!</p>}
      </>
    );
  }
}
