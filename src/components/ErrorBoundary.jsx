import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('AdsWheeler Application Error caught by ErrorBoundary:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  };

  handleClearSession = () => {
    try {
      localStorage.removeItem('adswheeler_auth_user');
      localStorage.removeItem('adswheeler_auth_token');
    } catch (e) {
      console.error(e);
    }
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FAF9F6] text-[#1C1917] flex items-center justify-center p-4 font-['Plus_Jakarta_Sans',sans-serif]">
          <div className="max-w-md w-full bg-white rounded-2xl border border-stone-200 shadow-xl p-6 sm:p-8 text-center space-y-4">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 text-2xl font-bold">
              !
            </div>

            <div>
              <h2 className="text-lg font-bold text-stone-900 font-display">
                Something went wrong
              </h2>
              <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                We ran into an unexpected rendering issue. You can reload or reset your session below.
              </p>
            </div>

            {this.state.error && (
              <div className="bg-stone-50 rounded-xl p-3 border border-stone-200 text-left overflow-x-auto text-[11px] font-mono text-stone-700 max-h-32">
                {this.state.error.toString()}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <button
                type="button"
                onClick={this.handleReset}
                className="flex-1 py-2.5 px-4 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs transition-colors cursor-pointer shadow-xs"
              >
                Reload Page
              </button>
              <button
                type="button"
                onClick={this.handleClearSession}
                className="py-2.5 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs transition-colors cursor-pointer border border-stone-200"
              >
                Reset Session
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
