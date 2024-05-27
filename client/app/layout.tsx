import type { Metadata } from "next";
import { Inter, Lexend, Roboto } from "next/font/google";
import "./globals.css"
import "@mantine/core/styles.css"
import { ColorSchemeScript, MantineProvider } from "@mantine/core"

const inter = Inter({ subsets: ["latin"] });
const lexend = Lexend({
  weight: "300",
  subsets: ["latin"]
});


export const metadata: Metadata = {
  title: "Energy Managment",
  description: "Energy Managment App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={`${lexend.className} bg-pprimbg`}>
        <MantineProvider defaultColorScheme="light">
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
