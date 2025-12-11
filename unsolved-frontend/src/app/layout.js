import "./globals.css";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Unsolved.in",
  description: "Real problems. Real solutions. Built by your community.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-indigo-50 text-slate-900 antialiased">
        <div className="flex min-h-screen flex-col">
          {/* Navbar on every page */}
          <Navbar />

          {/* Page content */}
          <main className="flex-1">{children}</main>

          {/* Footer on every page */}
          <Footer />
        </div>

        {/* Global toast container */}
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 5000,
          }}
        />
      </body>
    </html>
  );
}
