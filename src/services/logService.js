import * as Sentry from "@sentry/browser";

function init () {
	Sentry.init({dsn: "https://2895f07f9884400bb421e8868c79f018@o398830.ingest.sentry.io/5255116"});
}

function log(e) {
	Sentry.captureException(e)
}

export default {
	init,
	log
}