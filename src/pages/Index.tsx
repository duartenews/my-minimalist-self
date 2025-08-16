import React, { useState } from 'react';
import { Onboarding, OnboardingData } from './Onboarding';
import { Dashboard } from './Dashboard';

const Index = () => {
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [userName, setUserName] = useState('Sarah');

  const handleOnboardingComplete = (data: OnboardingData) => {
    console.log('Onboarding completed:', data);
    // Here you would typically save the data to your backend
    setIsOnboarded(true);
  };

  if (!isOnboarded) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return <Dashboard userName={userName} />;
};

export default Index;
