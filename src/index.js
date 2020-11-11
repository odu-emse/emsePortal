import React from "react"
import ReactDOM from "react-dom"
import * as Sentry from "@sentry/react"
import { Integrations } from "@sentry/tracing"
import App from "./App"

if (process.env.REACT_APP_INSTANCE === "production") {
	Sentry.init({
		dsn:
			"https://e6d7145b40b34160b57eec2ad3f663d8@o452753.ingest.sentry.io/5440649",
		integrations: [new Integrations.BrowserTracing()],
		tracesSampleRate: 1.0,
	})
}

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById("root")
)

RegExp.escape = function (s) {
	return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
}
