import { Inter } from "next/font/google";
import "./globals.css";
import Layout from "./components/Layout";
import ReduxProvider from "../redux/ReduxProvider";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "CharityGram",
  description: "CharityGram foundation",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <Layout>{children}</Layout>
          <ToastContainer
            position="top-right"
            autoClose={2000}
            theme="dark"
            transition={Zoom}
          />
        </ReduxProvider>
      </body>
    </html>
  );
}
