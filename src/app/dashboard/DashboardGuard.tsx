import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function DashboardGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const checkOnboarding = async () => {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        router.push('/signup');
        return;
      }

      try {
        const response = await fetch(`/api/check-onboarding?userId=${userId}`);
        const data = await response.json();
        if (!data.onboardingComplete) {
          router.push('/onboarding');
        }
      } catch (error) {
        console.error('Error checking onboarding status:', error);
      }
    };

    checkOnboarding();
  }, [router]); // Add router to the dependency array

  return <>{children}</>;
}
