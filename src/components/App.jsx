import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { Container } from './App.styled';
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { Loader } from './Loader';
import { Button } from './Button';
import { fetchImages } from '../Api';
import { ErrorMessage } from './Services/Notifications';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  REJECTED: 'rejected',
  RESOLVED: 'resolved',
};

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
      this.setState({ status: Status.PENDING });
      try {
        const response = await fetchImages(query, page);
        if (!response.hits.length) {
          this.setState({
            status: Status.REJECTED,
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
          status: Status.RESOLVED,
          images: [...images, ...dataImages],
        });
      } catch {
        this.setState({
          status: Status.REJECTED,
        });
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

    return (
      <Container>
        <Searchbar onSubmit={handleFormSubmit} />
        {(status === Status.PENDING || status === Status.RESOLVED) && (
          <ImageGallery items={images} />
        )}
        {status === Status.PENDING && <Loader />}
        {status === Status.RESOLVED && <Button onClick={handleButtonClick} />}
        <ToastContainer />
      </Container>
    );
  }
}
