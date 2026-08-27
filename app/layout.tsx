import type { Metadata } from "next";
import "./globals.css";
import "./style.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "EngineerTools - Free Engineering Calculators",
    template: "%s | EngineerTools",
  },
  description:
    "Fast, accurate and easy-to-use free engineering calculators for students, technicians, researchers and engineers. Electrical, electronics, mechanical, fluid, energy and conversion tools.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
