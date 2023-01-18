import PropTypes from 'prop-types';
import { useState } from 'react';
import { BiSearchAlt2 } from 'react-icons/bi';
import { ErrorMessage } from '../Services/Notifications';
import { FormContainer, Form, Input, Button } from './Searchbar.styled';

export function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState('');

  const handleInputChange = e => {
    const query = e.currentTarget.value.toLowerCase();
    setQuery(query);
  };

  const handleSubmit = e => {
    e.preventDefault();

    const newQuery = query.trim();

    if (newQuery === '') {
      ErrorMessage('Еnter a search query');
      return;
    }

    onSubmit(newQuery);
    setQuery('');
  };

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

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
