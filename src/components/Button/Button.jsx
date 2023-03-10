import PropTypes from 'prop-types';
import { ButtonStyled } from './Button.styled';

export const Button = ({ onClick }) => (
  <ButtonStyled type="button" onClick={onClick}>
    Load more
  </ButtonStyled>
);

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
