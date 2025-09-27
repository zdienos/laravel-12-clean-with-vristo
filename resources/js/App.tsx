// resources/js/app.tsx

import React from 'react';
import { createRoot } from 'react-dom/client';

// Buat komponen React sederhana
function App() {
    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-3xl font-bold text-center">
                🚀 Laravel + React + Vite Berhasil!
            </h1>
            <p className="text-center text-gray-600 mt-2">
                Setup dari awal telah berhasil.
            </p>
        </div>
    );
}

// Cari elemen dengan id 'app' dan render komponen React di dalamnya
const container = document.getElementById('app');
if (container) {
    const root = createRoot(container);
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
}
