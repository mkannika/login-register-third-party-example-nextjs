import { clsx } from "clsx";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";


const poppins = Poppins({
  weight: ['400', '500', '600', '700'], // Specify weights you want to use
  subsets: ['latin'], // Subset to load (latin characters)
  variable: '--font-poppins', // Optional: Add a variable to use in CSS
});

export const metadata: Metadata = {
  title: "Login & Register & Third Party Example - Page Title",
  description: "This is a detailed description of your website or page, explaining what it is about and the content it offers.",
  keywords: "nextjs, seo, web development, create next app, Login & Register & Third Party Example",
  openGraph: {
    title: "Login & Register & Third Party Example",
    description: "A more detailed description for Open Graph, visible when shared on social media.",
    url: "https://yourwebsite.com",
    siteName: "Login & Register & Third Party Example",
    images: [
      {
        url: "https://yourwebsite.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "A description of the image",
      },
    ],
    type: "website", // Can be "article" if it's a blog or news site
  },
  twitter: {
    card: "summary_large_image", // Twitter card type, can be "summary" or "summary_large_image"
    title: "Login & Register & Third Party Example",
    description: "Description of your page or site.",
    images: ["public/thumbnail.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={clsx(poppins.variable, "antialiased")}>
        {children}
      </body>
    </html>
  );
}
