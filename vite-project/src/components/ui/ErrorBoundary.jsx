import { Component } from 'react'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    })

    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error caught by ErrorBoundary:', error, errorInfo)
    }

    // Here you could send error to logging service
    // logErrorToService(error, errorInfo)
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null })
  }

  handleGoHome = () => {
    window.location.href = '/'
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
          <div className="max-w-md w-full glass-dark rounded-xl p-8 text-center">
            <div className="mb-6">
              <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-white mb-2">
                Oops! Something went wrong
              </h1>
              <p className="text-gray-400">
                We're sorry, but something unexpected happened. Please try again.
              </p>
            </div>

            {/* Error details (only in development) */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="mb-6 p-4 bg-red-900/20 border border-red-500/30 rounded-lg text-left">
                <h3 className="text-sm font-semibold text-red-400 mb-2">
                  Error Details (Dev Mode):
                </h3>
                <pre className="text-xs text-gray-300 overflow-auto">
                  {this.state.error.toString()}
                  {this.state.errorInfo.componentStack}
                </pre>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={this.handleRetry}
                className="flex-1 btn-primary flex items-center justify-center"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Try Again
              </button>
              <button
                onClick={this.handleGoHome}
                className="flex-1 btn-secondary flex items-center justify-center"
              >
                <Home className="h-4 w-4 mr-2" />
                Go Home
              </button>
            </div>

            {/* Contact support */}
            <div className="mt-6 pt-6 border-t border-gray-700">
              <p className="text-sm text-gray-400 mb-2">
                Still having issues?
              </p>
              <a
                href="mailto:support@hackathon.com"
                className="text-primary-400 hover:text-primary-300 text-sm transition-colors"
              >
                Contact Support
              </a>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary