import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  MagnifyingGlassIcon,
  StyledHeader,
  StyledSearchForm,
  StyledSearchInput,
  StyledSubmitButton,
} from './Searchbar.styled';

export const SearchBar = ({ onSubmit }) => {
  const [name, setName] = useState('');

  const handleChange = e => setName(e.target.value);

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(name);
  };

  return (
    <StyledHeader>
      <StyledSearchForm onSubmit={handleSubmit}>
        <StyledSubmitButton type="submit" className="button">
          <MagnifyingGlassIcon></MagnifyingGlassIcon>
        </StyledSubmitButton>
        <StyledSearchInput
          type="text"
          placeholder="Search"
          value={name}
          onChange={handleChange}
        />
      </StyledSearchForm>
    </StyledHeader>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
