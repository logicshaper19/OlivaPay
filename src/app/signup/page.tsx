'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import SignUpFormComponent from './SignUpFormComponent';

export default function SignupPage() {
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignup = async (formData: FormData) => {
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        body: formData,
      });
      
      if (response.ok) {
        router.push('/dashboard');
      } else {
        const data = await response.json();
        setError(data.message || 'An error occurred during signup');
      }
    } catch (err) {
      setError('An unexpected error occurred');
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <SignUpFormComponent onSubmit={handleSignup} />
    </div>
  );
}
