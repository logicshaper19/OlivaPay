export function checkPasswordStrength(password: string): 'weak' | 'medium' | 'strong' {
  if (password.length < 8) return 'weak';
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  if (hasLetter && hasNumber && hasSpecialChar) return 'strong';
  if ((hasLetter && hasNumber) || (hasLetter && hasSpecialChar) || (hasNumber && hasSpecialChar)) return 'medium';
  return 'weak';
}
