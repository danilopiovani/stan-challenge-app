import React, { Component, ErrorInfo } from 'react';
import Navigation from '../Navigation';
import styles from './styles.module.css';
type Props = {
  children: React.ReactNode;
  errorMessage?: string;
};

type State = {
  hasError: boolean;
};

class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
  };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    const { hasError } = this.state;
    const { errorMessage, children } = this.props;

    if (hasError) {
      return (
        <div>
          <Navigation />
          <p className={styles.errorMsg}>
            {errorMessage ||
              'An unknown error occurred. Please try again later.'}
          </p>
        </div>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
