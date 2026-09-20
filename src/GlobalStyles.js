import { createGlobalStyle, ThemeProvider } from 'styled-components';

/* ---------- Theme Variables ---------- */
const theme = {
  colors: {
    primary: '#1E90FF',
    secondary: '#FF6347',
    background: '#F5F5F5',
    surface: '#FFFFFF',
    error: '#B00020',
    textPrimary: '#212121',
    textSecondary: '#757575',
    muted: '#BDBDBD',
    overlay: 'rgba(0, 0, 0, 0.5)',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },
  typography: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    fontWeight: {
      light: 300,
      regular: 400,
      medium: 500,
      semiBold: 600,
      bold: 700,
    },
    fontSize: {
      xs: '0.75rem',   // 12px
      sm: '0.875rem',  // 14px
      md: '1rem',      // 16px
      lg: '1.125rem',  // 18px
      xl: '1.25rem',   // 20px
      xxl: '1.5rem',   // 24px
    },
    lineHeight: {
      normal: 1.5,
      dense: 1.25,
    },
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
  },
  shadows: {
    sm: '0 1px 3px rgba(0,0,0,0.12)',
    md: '0 3px 6px rgba(0,0,0,0.16)',
    lg: '0 10px 20px rgba(0,0,0,0.19)',
  },
};

/* ---------- Global Styles ---------- */
const GlobalStyle = createGlobalStyle`
  /* CSS Reset */
  *, *::before, *::after {
    box-sizing: border-box;
  }
  html, body, #root {
    margin: 0;
    padding: 0;
    height: 100%;
    font-family: ${({ theme }) => theme.typography.fontFamily};
    font-size: 16px;
    line-height: ${({ theme }) => theme.typography.lineHeight.normal};
    color: ${({ theme }) => theme.colors.textPrimary};
    background-color: ${({ theme }) => theme.colors.background};
  }
  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    transition: color 0.2s ease;
    &:hover, &:focus {
      color: ${({ theme }) => theme.colors.secondary};
    }
  }
  button {
    font-family: inherit;
    font-size: inherit;
    cursor: pointer;
    border: none;
    background: none;
    padding: 0;
    color: inherit;
    &:focus {
      outline: 2px solid ${({ theme }) => theme.colors.primary};
      outline-offset: 2px;
    }
  }
  input, textarea, select {
    font-family: inherit;
    font-size: inherit;
    border: 1px solid ${({ theme }) => theme.colors.muted};
    border-radius: ${({ theme }) => theme.borderRadius.sm};
    padding: ${({ theme }) => theme.spacing.sm};
    background: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.textPrimary};
    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.primary};
      box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}33;
    }
  }
  /* Utility classes */
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 ${({ theme }) => theme.spacing.md};
  }
  .flex {
    display: flex;
  }
  .flex-center {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .text-center {
    text-align: center;
  }
  .hidden {
    display: none !important;
  }
`;

/* ---------- Theme Provider Wrapper ---------- */
export const AppThemeProvider = ({ children }) => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    {children}
  </ThemeProvider>
);

export default theme;