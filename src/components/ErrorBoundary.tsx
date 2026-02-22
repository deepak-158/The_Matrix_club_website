import { Component, type ReactNode } from 'react'

interface Props {
    children: ReactNode
    fallback?: ReactNode
}

interface State {
    hasError: boolean
    error: Error | null
}

/**
 * Error boundary to catch render errors and show a recovery UI
 * instead of a white screen crash.
 */
class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = { hasError: false, error: null }
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error }
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('[ErrorBoundary] Caught error:', error, errorInfo)
    }

    handleReload = () => {
        this.setState({ hasError: false, error: null })
        window.location.href = '/'
    }

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) return this.props.fallback

            return (
                <div
                    style={{
                        minHeight: '100vh',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: '#000',
                        color: '#fff',
                        padding: '2rem',
                        textAlign: 'center',
                        fontFamily: "'Share Tech Mono', monospace",
                    }}
                >
                    <h1
                        style={{
                            fontSize: '3rem',
                            marginBottom: '1rem',
                            textShadow: '0 0 20px rgba(255,255,255,0.3)',
                        }}
                    >
                        System Error
                    </h1>
                    <p
                        style={{
                            color: '#ccc',
                            fontSize: '1.1rem',
                            maxWidth: '500px',
                            marginBottom: '2rem',
                            lineHeight: 1.6,
                            fontFamily: "'Roboto', sans-serif",
                        }}
                    >
                        Something went wrong in The Matrix. Don't worry — no data was lost.
                    </p>
                    <button
                        onClick={this.handleReload}
                        style={{
                            padding: '12px 30px',
                            background: 'linear-gradient(45deg, #fff, #ccc)',
                            color: '#000',
                            border: 'none',
                            borderRadius: '5px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            fontSize: '1rem',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                        }}
                    >
                        Return to Home
                    </button>
                </div>
            )
        }

        return this.props.children
    }
}

export default ErrorBoundary
