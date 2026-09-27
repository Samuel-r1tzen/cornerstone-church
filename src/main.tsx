import React, { StrictMode, Component, ErrorInfo, ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class RootErrorBoundary extends Component<Props, State> {
  override state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Cornerstone Church UI Error:', error, errorInfo);
  }

  override render() {
    if (this.state.hasError) {
      return (
        <div style={{ backgroundColor: '#080B12', color: '#F5F2EE', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center', fontFamily: 'sans-serif' }}>
          <h1 style={{ color: '#FF6B2C', fontSize: '1.75rem', marginBottom: '0.75rem', letterSpacing: '0.05em' }}>CORNERSTONE CHURCH</h1>
          <p style={{ color: '#B0B7C3', maxWidth: '500px', lineHeight: 1.6, marginBottom: '1.5rem', fontSize: '0.95rem' }}>
            We encountered a temporary loading issue. Please tap below to reload the site.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{ backgroundColor: '#FF6B2C', color: '#080B12', border: 'none', padding: '0.75rem 1.75rem', borderRadius: '3px', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em', cursor: 'pointer' }}
          >
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

function mountApp() {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    console.error('Root element #root not found. Retrying in 50ms...');
    setTimeout(mountApp, 50);
    return;
  }

  try {
    createRoot(rootElement).render(
      <StrictMode>
        <RootErrorBoundary>
          <App />
        </RootErrorBoundary>
      </StrictMode>,
    );
  } catch (err) {
    console.error('Fatal mount error:', err);
    rootElement.innerHTML = `
      <div style="background-color: #080B12; color: #F5F2EE; min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 2rem; text-align: center; font-family: sans-serif;">
        <h1 style="color: #FF6B2C; font-size: 1.75rem; margin-bottom: 0.75rem;">CORNERSTONE CHURCH</h1>
        <p style="color: #B0B7C3; margin-bottom: 1.5rem;">Click below to reload.</p>
        <button onclick="window.location.reload()" style="background-color: #FF6B2C; color: #080B12; border: none; padding: 0.75rem 1.75rem; font-weight: 700; cursor: pointer; border-radius: 3px;">Reload</button>
      </div>
    `;
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountApp);
} else {
  mountApp();
}
