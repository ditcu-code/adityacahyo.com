import "../global.css";
import { Inter } from "next/font/google";
import LocalFont from "next/font/local";
import { Metadata } from "next";
import { Analytics } from "./components/analytics";

const metaImage: string = "https://azgiwpdzokgesofpzclb.supabase.co/storage/v1/object/public/public/images/og.png"

export const metadata: Metadata = {
	title: {
		default: "adityacahyo.com",
		template: "%s | adityacahyo.com",
	},
	description: "a software engineer",
	openGraph: {
		title: "adityacahyo.com",
		description:
			"a software engineer",
		url: "https://adityacahyo.com",
		siteName: "adityacahyo.com",
		images: [
			{
				url: metaImage,
				width: 1920,
				height: 1080,
			},
		],
		locale: "en-US",
		type: "website",
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	twitter: {
		title: "Aditya Cahyo",
		card: "summary_large_image",
		images: metaImage,
		description: "a software engineer specializing in frontend development for web and iOS platforms, based in Indonesia."
	},
	icons: {
		shortcut: "/favicon.png",
	},
};
const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
});

const calSans = LocalFont({
	src: "../public/fonts/CalSans-SemiBold.ttf",
	variable: "--font-calsans",
});

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className={[inter.variable, calSans.variable].join(" ")}>
			<head>
				<Analytics />
			</head>
			<body
				className={`bg-black ${
					process.env.NODE_ENV === "development" ? "debug-screens" : undefined
				}`}
			>
				{children}
			</body>
		</html>
	);
}
