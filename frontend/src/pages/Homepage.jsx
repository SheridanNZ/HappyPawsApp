import React from 'react';
import LoginMUI from '../components/LoginMUI';

export default function Homepage() {
  return (
    <div className="Homepage">
      <h1>Welcome to HappyPaws</h1>

      {/* Login Component */}
      <LoginMUI />
    </div>
  );
}
