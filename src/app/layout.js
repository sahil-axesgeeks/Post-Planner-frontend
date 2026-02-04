// src/app/layout.js
import ReduxStoreProvider from "./(protected)/Providers/reduxStore/reduxStoreProvider";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="h-screen overflow-hidden">
        <ReduxStoreProvider>{children}</ReduxStoreProvider>
      </body>
    </html>
  );
}
