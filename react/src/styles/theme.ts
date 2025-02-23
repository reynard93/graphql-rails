export const theme = {
  colors: {
    primary: '#FA5553', // Current antd primary color
    button: {
      primary: '#FA5553', // Current antd primary color
      hover: '#C91C19',
    },
    text: {
      primary: '#261B23',
      secondary: '#6B7280',
      light: '#9CA3AF',
    },
    background: {
      primary: '#FFFFFF',
      secondary: '#F3F4F6',
    },
    status: {
      error: '#DC2626',
      success: '#059669',
      warning: '#D97706',
    }
  },
  fonts: {
    primary: 'ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace',
  }
};

export type Theme = typeof theme;