import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// 1. IMPORTAMOS LOS CONTEXTOS
import { CartProvider } from "@/context/CartContext";
import { UserProvider } from "@/context/UserContext"; // Asegúrate de tener esta importación
import CartSidebar from "@/components/CartSidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Elizzeè Cosmética",
  description: "La alta costura del color diseñada para manos de lujo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* 2. ENVOLVEMOS TODO CON LOS CONTEXTOS */}
        <UserProvider>
          <CartProvider>
            
            {/* Ahora Navbar está DENTRO de los Providers, por lo que puede usar useUser() */}
            <Navbar />
            <CartSidebar />

            <main className="flex-grow">
              {children}
            </main>
            
            <Footer />

          </CartProvider>
        </UserProvider>
      </body>
    </html>
  );
}