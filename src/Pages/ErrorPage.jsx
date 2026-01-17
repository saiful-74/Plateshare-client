import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => (
  <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
          <title>Error Page | Plateshare</title>
    <img
      src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
      alt="404 Error"
      className="w-48 mb-6"
    />
    <h1 className="text-4xl font-bold mb-2">404 - Page Not Found</h1>
    <p className="mb-4">Sorry, the page you are looking for does not exist.</p>
    <Link to="/" className="btn btn-primary">
      Back to Home
    </Link>
  </div>
);

export default ErrorPage;
