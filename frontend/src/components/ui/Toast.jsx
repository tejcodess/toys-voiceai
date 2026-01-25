import React from 'react';

export default function Toast({ message }) {
    return (
        <div className="px-6 py-3 bg-primary text-black font-bold rounded-full shadow-2xl animate-bounce pointer-events-auto">
            {message}
        </div>
    );
}
