import React = require('react');
import { StatusBar } from 'expo-status-bar';
import { QueryClientProvider } from '@tanstack/react-query';
import AppRoutes from './src/routes/AppRoutes';
import { queryClient } from './src/config/queryClient';

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppRoutes />
      <StatusBar style="auto" />
    </QueryClientProvider>
  );
}
