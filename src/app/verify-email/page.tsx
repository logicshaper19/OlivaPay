import VerifyEmailComponent from './VerifyEmailComponent'
import { useState } from 'react'

const Feedback = ({ message, type }: { message: string; type: 'error' | 'success' }) => (
  <div className={`mt-4 p-2 rounded ${type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
    {message}
  </div>
)

export default function VerifyEmailPage() {
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  return <VerifyEmailComponent />
}

