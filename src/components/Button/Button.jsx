import PropTypes from 'prop-types';
import { StyledButton } from './Button.styled';

export const Button = ({ onClick, hasMore }) => {
  return hasMore ? (
    <StyledButton onClick={onClick}>Load more</StyledButton>
  ) : null;
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  hasMore: PropTypes.bool.isRequired,
};
