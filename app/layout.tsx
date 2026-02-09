import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GitHub Toolkit",
  description:
    "A comprehensive GitHub toolkit for analyzing profiles, repositories, and comparing developers",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = process.env.CLOUDFLARE_WEB_ANALYTICS_TOKEN;

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-background flex flex-col">
          <div className="flex-1">{children}</div>
          <Footer />
          <ScrollToTop />
        </div>

        {/* Cloudflare Web Analytics */}
        <script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon={`{"token": "${token}"}`}
        ></script>
        {/* End Cloudflare Web Analytics */}
      </body>
    </html>
  );
}
