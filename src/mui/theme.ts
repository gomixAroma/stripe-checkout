'use client';

import { createTheme } from '@mui/material';

export const MuiTheme = createTheme({
  shape: { borderRadius: 'var(--border-radius)' },
  palette: {
    primary: {
      main: '#389ECF', // あとで決めて
    },
    warning: {
      main: '#E9494B', // 警告色
    },
    success: {
      main: '#4CAF50', // 成功色
    },

    text: {
      primary: '#333',
    },
  },
  typography: {
    fontFamily: ['LINE Seed JP Rg', 'sans-serif'].join(','),
  },
});
