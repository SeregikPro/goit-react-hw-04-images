import styled from 'styled-components';
import {
  space,
  color,
  typography,
  layout,
  flexbox,
  grid,
  border,
} from 'styled-system';

const Box = styled('div')(
  space,
  color,
  typography,
  layout,
  flexbox,
  grid,
  border
);

export default Box;
