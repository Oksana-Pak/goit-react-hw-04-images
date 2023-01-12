import PropTypes from 'prop-types';
import { Component } from 'react';
import { BiSearchAlt2 } from 'react-icons/bi';
import { ErrorMessage } from '../Services/Notifications';
import { FormContainer, Form, Input, Button } from './Searchbar.styled';

export class Searchbar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    query: '',
  };

  handleInputChange = e => {
    const query = e.currentTarget.value.toLowerCase();
    this.setState({ query });
  };

  handleSubmit = e => {
    e.preventDefault();

    const query = this.state.query.trim();

    if (query === '') {
      ErrorMessage('Еnter a search query');
      return;
    }

    this.props.onSubmit(query);
    this.setState({ query: '' });
  };

  render() {
    const { query } = this.state;
    const { handleSubmit, handleInputChange } = this;
    return (
      <FormContainer>
        <Form onSubmit={handleSubmit}>
          <Button type="submit">
            <BiSearchAlt2 size={20} />
          </Button>
          <Input
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name={query}
            value={query}
            onChange={handleInputChange}
          />
        </Form>
      </FormContainer>
    );
  }
}
