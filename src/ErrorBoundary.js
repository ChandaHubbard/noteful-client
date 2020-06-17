import React from 'react'

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hasError: false
        }
    }

    static getStateFromError(error) {
        return { hasError: true }
    }

    render() {
        if (this.state.hasError) {
            return (
                <h2>Something went wrong</h2>
            )
        }
        return this.props.children
    }
}

ErrorBoundary.defaultProps = {
    errorMessage: ''
}