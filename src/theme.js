const colors = {
  // Primary brand colors
  primary: '#1E90FF',
  primaryLight: '#63B8FF',
  primaryDark: '#0066CC',
  // Secondary brand colors
  secondary: '#FF4500',
  secondaryLight: '#FF7F50',
  secondaryDark: '#B22222',
  // Neutral palette
  background: '#FFFFFF',
  surface: '#F5F5F5',
  error: '#B00020',
  textPrimary: '#212121',
  textSecondary: '#757575',
  textDisabled: '#BDBDBD',
  border: '#E0E0E0',
  overlay: 'rgba(0,0,0,0.5)',
};

const typography = {
  fontFamily: "'Inter', sans-serif",
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 700,
  h1: { fontSize: '2.5rem', lineHeight: '3rem', fontWeight: 700 },
  h2: { fontSize: '2rem', lineHeight: '2.5rem', fontWeight: 700 },
  h3: { fontSize: '1.75rem', lineHeight: '2.25rem', fontWeight: 600 },
  h4: { fontSize: '1.5rem', lineHeight: '2rem', fontWeight: 600 },
  h5: { fontSize: '1.25rem', lineHeight: '1.75rem', fontWeight: 500 },
  body1: { fontSize: '1rem', lineHeight: '1.5rem', fontWeight: 400 },
  body2: { fontSize: '0.875rem', lineHeight: '1.25rem', fontWeight: 400 },
  caption: { fontSize: '0.75rem', lineHeight: '1rem', fontWeight: 400 },
};

const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  xxxxl: 40,
  5xl: 48,
  6xl: 56,
  7xl: 64,
};

const breakpoints = {
  mobile: 0,
  tablet: 600,
  desktop: 1024,
  tv: 1440,
};

const theme = {
  colors,
  typography,
  spacing,
  breakpoints,
};

export default theme;