import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import "./app.css";
import Navbar from "./components/Navbar";
import { BookProvider } from "./contexts/BookContext";

export const links = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function meta() {
  return [
    { title: "Księgarnia Yggdrasil" },
    { name: "description", content: "Księgarnia internetowa Yggdrasil" },
    { name: "keywords", content: "książki, księgarnia, yggdrasil, fantasy, literatura" },
  ];
}

export function Layout({ children }) {
  return (
    <html lang="pl">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <BookProvider>
          <Navbar />
          <main className="container mx-auto px-4 py-6">{children}</main>
          <footer className="bg-green-800 text-white text-center py-4 mt-8">
            <p>&copy; 2025 Księgarnia Yggdrasil. Wszelkie prawa zastrzeżone.</p>
          </footer>
          <ScrollRestoration />
          <Scripts />
        </BookProvider>
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }) {
  let message = "Ups! Coś poszło nie tak";
  let details = "Wystąpił nieoczekiwany błąd.";
  let stack;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404 - Nie znaleziono" : "Błąd";
    details =
      error.status === 404
        ? "Strona, której szukasz, nie istnieje."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto text-center">
      <h1 className="text-3xl font-bold text-green-800 mb-4">{message}</h1>
      <p className="text-lg mb-6">{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto bg-gray-100 rounded">
          <code>{stack}</code>
        </pre>
      )}
      <a 
        href="/" 
        className="inline-block bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800 transition"
      >
        Powrót do strony głównej
      </a>
    </main>
  );
}