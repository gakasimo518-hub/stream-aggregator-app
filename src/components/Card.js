import React from 'react';
import { Image, Dimensions, TouchableOpacity, View, Text } from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import PropTypes from 'prop-types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_MARGIN = 8;
const CARD_WIDTH = SCREEN_WIDTH - CARD_MARGIN * 2;

const CardContainer = styled(TouchableOpacity)`
  width: ${CARD_WIDTH}px;
  margin: ${CARD_MARGIN}px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.cardBackground || '#ffffff'};
  overflow: hidden;
  elevation: 4;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
`;

const ImageWrapper = styled(View)`
  width: 100%;
  height: 180px;
  background-color: #e0e0e0;
`;

const StyledImage = styled(Image)`
  width: 100%;
  height: 100%;
`;

const Overlay = styled(View)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.35);
`;

const TextContainer = styled(View)`
  padding: 12px;
`;

const Title = styled(Text)`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary || '#ffffff'};
  margin-bottom: 4px;
`;

const Subtitle = styled(Text)`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary || '#dddddd'};
`;

const Card = ({
  title,
  subtitle,
  imageUrl,
  onPress,
  style,
  imageStyle,
  titleStyle,
  subtitleStyle,
}) => {
  const theme = useTheme();

  return (
    <CardContainer onPress={onPress} style={style} activeOpacity={0.85}>
      <ImageWrapper>
        {imageUrl ? (
          <StyledImage source={{ uri: imageUrl }} resizeMode="cover" style={imageStyle} />
        ) : (
          <View style={{ flex: 1, backgroundColor: '#cccccc' }} />
        )}
        <Overlay />
      </ImageWrapper>
      <TextContainer>
        <Title style={titleStyle}>{title}</Title>
        {subtitle ? <Subtitle style={subtitleStyle}>{subtitle}</Subtitle> : null}
      </TextContainer>
    </CardContainer>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  imageUrl: PropTypes.string,
  onPress: PropTypes.func,
  style: PropTypes.object,
  imageStyle: PropTypes.object,
  titleStyle: PropTypes.object,
  subtitleStyle: PropTypes.object,
};

Card.defaultProps = {
  subtitle: '',
  imageUrl: '',
  onPress: () => {},
  style: {},
  imageStyle: {},
  titleStyle: {},
  subtitleStyle: {},
};

export default Card;