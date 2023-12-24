import { Inter } from "next/font/google";
import "./globals.css";
import WhatsAppLogo from "@/components/WhatsAppLogo";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Group 7 Project Group",
  description: "This is the website for sending user details for the projects",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <div className="absolute animate-bounce bottom-6 right-8">
          <Link
            href={`https://wa.me/+2348148494234?text=${encodeURIComponent(
              "I want to pay for group 7 project contribution"
            )}`}
            target="_blank"
          >
            <WhatsAppLogo />
          </Link>
        </div>
      </body>
    </html>
  );
}
