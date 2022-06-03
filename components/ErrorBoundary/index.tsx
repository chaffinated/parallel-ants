import React, { PropsWithChildren } from 'react';

type FallbackComponent = React.ComponentType<PropsWithChildren<FallbackProps>> | React.ElementType;

interface ErrorBoundaryProps {
  fallback?: FallbackComponent | null;
}

interface ErrorBoundaryState {
  hasError: boolean;
  message: string | null;
  promise: Promise<any> | null;
}

interface FallbackProps {
  message: string | null;
}

class ErrorBoundary extends React.Component<PropsWithChildren<ErrorBoundaryProps>, ErrorBoundaryState> {
  static defaultProps: ErrorBoundaryProps = {
    fallback: null,
  };

  public constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      message: null,
      promise: null,
    };
  }

  public static getDerivedStateFromError(error: Error | Promise<any>) {
    const isPromise = error instanceof Promise;
    return {
      promise: isPromise ? error : null,
      hasError: isPromise ? false : true,
      message: isPromise ? null : (error as Error).message,
    };
  }

  public render() {
    const { children, fallback: F } = this.props;
    const { hasError, message, promise } = this.state;
    if ((promise != null || message != null) && F == null) {
      return null;
    } else if (hasError && F != null) {
      return <F message={message} />;
    }
    return children;
  }
}

export default ErrorBoundary;

export const setDefaultFallback = (fallback: FallbackComponent) => {
  ErrorBoundary.defaultProps.fallback = fallback;
};
