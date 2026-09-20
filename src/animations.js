import React from 'react';
import { Animated, Easing, Platform } from 'react-native';
import { keyframes } from 'styled-components';

/* ---------- Web keyframes (styled‑components) ---------- */
export const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

export const slideUp = keyframes`
  from { transform: translateY(20px); opacity: 0; }
  to   { transform: translateY(0); opacity: 1; }
`;

export const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-30px); }
  60% { transform: translateY(-15px); }
`;

export const shake = keyframes`
  0%   { transform: translateX(0); }
  25%  { transform: translateX(-5px); }
  50%  { transform: translateX(5px); }
  75%  { transform: translateX(-5px); }
  100% { transform: translateX(0); }
`;

/* ---------- React Native animation helpers ---------- */
export const animateFadeIn = (duration = 500, delay = 0) => {
  const opacity = new Animated.Value(0);
  const animation = Animated.timing(opacity, {
    toValue: 1,
    duration,
    delay,
    useNativeDriver: true,
    easing: Easing.inOut(Easing.ease),
  });
  return { opacity, animation };
};

export const animateSlideUp = (duration = 500, delay = 0) => {
  const translateY = new Animated.Value(20);
  const opacity = new Animated.Value(0);
  const animation = Animated.parallel([
    Animated.timing(translateY, {
      toValue: 0,
      duration,
      delay,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }),
    Animated.timing(opacity, {
      toValue: 1,
      duration,
      delay,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }),
  ]);
  return { translateY, opacity, animation };
};

export const animateBounce = (duration = 800, delay = 0) => {
  const translateY = new Animated.Value(0);
  const animation = Animated.spring(translateY, {
    toValue: -30,
    friction: 3,
    tension: 40,
    useNativeDriver: true,
    delay,
  });
  return { translateY, animation };
};

export const animateShake = (duration = 500, delay = 0) => {
  const translateX = new Animated.Value(0);
  const animation = Animated.sequence([
    Animated.timing(translateX, {
      toValue: -5,
      duration: duration / 4,
      useNativeDriver: true,
      easing: Easing.linear,
    }),
    Animated.timing(translateX, {
      toValue: 5,
      duration: duration / 2,
      useNativeDriver: true,
      easing: Easing.linear,
    }),
    Animated.timing(translateX, {
      toValue: 0,
      duration: duration / 4,
      useNativeDriver: true,
      easing: Easing.linear,
    }),
  ]);
  return { translateX, animation };
};

/* ---------- Hook to start animation automatically ---------- */
export const useAnimation = (animationFunc, ...args) => {
  const { animation, ...values } = animationFunc(...args);
  React.useEffect(() => {
    animation.start();
  }, [animation]);
  return values;
};

/* ---------- Example Animated View component ---------- */
export const AnimatedView = ({ children, style, animationValues }) => {
  const animatedStyle = Platform.select({
    web: style,
    default: {
      ...style,
      ...animationValues,
    },
  });
  return <Animated.View style={animatedStyle}>{children}</Animated.View>;
};