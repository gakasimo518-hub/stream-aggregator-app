import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, View } from 'react-native';
import styled, { css } from 'styled-components/native';

const variantStyles = {
  primary: css`
    background-color: ${({ theme }) => theme.colors.primary || '#0066ff'};
    border: none;
  `,
  secondary: css`
    background-color: ${({ theme }) => theme.colors.secondary || '#f0f0f0'};
    border: none;
  `,
  danger: css`
    background-color: ${({ theme }) => theme.colors.danger || '#ff4d4f'};
    border: none;
  `,
  outline: css`
    background-color: transparent;
    border: 2px solid ${({ theme }) => theme.colors.primary || '#0066ff'};
  `,
  text: css`
    background-color: transparent;
    border: none;
  `,
};

const sizeStyles = {
  small: css`
    padding-vertical: 6px;
    padding-horizontal: 12px;
    font-size: 14px;
  `,
  medium: css`
    padding-vertical: 10px;
    padding-horizontal: 16px;
    font-size: 16px;
  `,
  large: css`
    padding-vertical: 14px;
    padding-horizontal: 20px;
    font-size: 18px;
  `,
};

const StyledButton = styled(TouchableOpacity)`
  ${({ variant }) => variantStyles[variant] || variantStyles.primary}
  ${({ size }) => sizeStyles[size] || sizeStyles.medium}
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
  flex-direction: row;
`;

const StyledText = styled(Text)`
  color: ${({ variant }) =>
    variant === 'outline' || variant === 'text'
      ? ({ theme }) => theme.colors.primary || '#0066ff'
      : '#ffffff'};
  font-weight: 600;
  ${({ variant }) => variant === 'text' && css`font-weight: 400;`}
`;

const Button = ({
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  onPress,
  children,
  style,
  ...rest
}) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      disabled={disabled}
      onPress={onPress}
      style={style}
      activeOpacity={0.8}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <StyledText variant={variant}>{children}</StyledText>
      )}
    </StyledButton>
  );
};

export default Button;