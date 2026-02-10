import "./globals.css";
import ReduxStoreProvider from "./(protected)/Providers/reduxStore/reduxStoreProvider";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="h-screen overflow-hidden">
        <ReduxStoreProvider>{children}</ReduxStoreProvider>
      </body>
    </html>
  );
}
