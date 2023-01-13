import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { Container } from './App.styled';
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { Loader } from './Loader';
import { Button } from './Button';
import { fetchImages } from '../Api';
import { ErrorMessage } from './Services/Notifications';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    status: 'idle',
  };

  async componentDidUpdate(_, prevState) {
    const { query, page, images } = this.state;
    const { query: prevQuery, page: prevPage } = prevState;

    if (prevQuery !== query || prevPage !== page) {
      this.setState({ status: 'pending' });
      try {
        const response = await fetchImages(query, page);
        if (!response.hits.length) {
          this.setState({
            status: 'rejected',
          });
          ErrorMessage(`There are no images with ${query} name`);
          return;
        }
        const dataImages = response.hits.map(
          ({ id, tags, webformatURL, largeImageURL }) => ({
            id,
            tags,
            webformatURL,
            largeImageURL,
          })
        );

        this.setState({
          status: 'resolved',
          images: [...images, ...dataImages],
        });
      } catch {
        this.setState({ status: 'rejected' });
        ErrorMessage('Something wrong. Try again.');
      }
    }
  }

  handleButtonClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };
  handleFormSubmit = query => {
    if (this.state.query === query) {
      return;
    }
    this.setState({ query, page: 1, images: [] });
  };

  render() {
    const { handleFormSubmit, handleButtonClick } = this;
    const { images, status } = this.state;

    if (status === 'idle') {
      return (
        <Container>
          <Searchbar onSubmit={handleFormSubmit} />
          <ToastContainer />
        </Container>
      );
    }
    if (status === 'pending') {
      return (
        <Container>
          <Searchbar onSubmit={handleFormSubmit} />
          <ImageGallery items={images} />
          <Loader />
        </Container>
      );
    }
    if (status === 'rejected') {
      return (
        <Container>
          <Searchbar onSubmit={handleFormSubmit} />
          <ToastContainer />
        </Container>
      );
    }
    if (status === 'resolved') {
      return (
        <Container>
          <Searchbar onSubmit={handleFormSubmit} />
          <ImageGallery items={images} />
          <Button onClick={handleButtonClick} />
          <ToastContainer />
        </Container>
      );
    }
  }
}
