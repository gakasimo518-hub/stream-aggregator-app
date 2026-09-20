import React from 'react';
import { useWindowDimensions } from 'react-native';
import styled from 'styled-components/native';

/**
 * Styled container that applies responsive padding based on screen width.
 * The padding values are defined in a simple scale:
 *   <360px  -> 12px
 *   360-480px -> 16px
 *   480-720px -> 24px
 *   >720px   -> 32px
 *
 * Props:
 *   - bgColor: optional background color (defaults to transparent)
 *   - style: optional additional style object
 */
const StyledContainer = styled.View`
  flex: 1;
  padding: ${({ padding }) => padding}px;
  background-color: ${({ bgColor }) => bgColor || 'transparent'};
`;

const Container = ({ children, style, bgColor }) => {
  const { width } = useWindowDimensions();

  let padding;
  if (width < 360) {
    padding = 12;
  } else if (width < 480) {
    padding = 16;
  } else if (width < 720) {
    padding = 24;
  } else {
    padding = 32;
  }

  return (
    <StyledContainer padding={padding} bgColor={bgColor} style={style}>
      {children}
    </StyledContainer>
  );
};

export default Container;