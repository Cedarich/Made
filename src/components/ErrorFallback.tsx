import React from 'react';

export default function ErrorFallback({ error, resetErrorBoundary }: any) {
  return (
    <div role="alert" className="p-4 bg-red-100 text-red-700 rounded">
      <p>Something went wrong:</p>
      <pre className="mt-2">{error.message}</pre>
      <button 
        onClick={resetErrorBoundary}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Try again
      </button>
    </div>
  );
} 