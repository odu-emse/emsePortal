import React from 'react'
import ReactDOM from 'react-dom'
import * as Sentry from '@sentry/react'
import { BrowserTracing } from '@sentry/tracing'
import App from './App'
import './style/index.css'
import { createRoot } from 'react-dom/client'

if (process.env.REACT_APP_INSTANCE !== 'production') {
	Sentry.init({
		dsn: 'https://36cdffd98812443eaf08767f5b768dfa@o1009779.ingest.sentry.io/6125258',
		tracesSamplerRate: 1.0,
		integrations: [new BrowserTracing()],
	})
}


const container = document.getElementById('root')
const root = createRoot(container)
root.render(<App />)

RegExp.escape = function (s) {
	return s.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')
}
