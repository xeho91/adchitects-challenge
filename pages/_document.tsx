import { Html, Head, Main, NextScript } from "next/document";
import type { DocumentContext } from "next/document";
import type { FunctionComponent } from "react";

import { APP } from "$globals";

const CustomDocument: FunctionComponent<DocumentContext> = () => {
	return (
		<Html>
			<Head>
				<meta charSet="utf8" />
				<meta name="application-name" content={APP.name} />
				<meta name="apple-mobile-web-app-capable" content="yes" />
				<meta
					name="apple-mobile-web-app-status-bar-style"
					content="default"
				/>
				<meta name="apple-mobile-web-app-title" content={APP.name} />
				<meta name="description" content={APP.name} />
				<meta name="format-detection" content="telephone=no" />
				<meta name="mobile-web-app-capable" content="yes" />
				<meta
					name="msapplication-config"
					content="/icons/browserconfig.xml"
				/>
				<meta
					name="msapplication-TileColor"
					content={APP.colors.theme}
				/>
				<meta name="msapplication-tap-highlight" content="no" />
				<meta name="theme-color" content={APP.colors.theme} />

				<link
					rel="apple-touch-icon"
					sizes="152x152"
					href="/icons/apple-touch-icon.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="/icons/favicon-32x32.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href="/icons/favicon-16x16.png"
				/>

				<link rel="manifest" href="/manifest.json" />
				<link rel="shortcut icon" href="/favicon.ico" />

				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin="true"
				/>
				<link href={APP.fonts.googleURL} rel="stylesheet" />
			</Head>

			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
};

export default CustomDocument;
