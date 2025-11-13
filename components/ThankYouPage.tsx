import React from 'react';
import { Hand, Loader2 } from 'lucide-react';

export const ThankYouPage: React.FC = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background text-center p-4">
      <div className="max-w-md">
        <Hand className="w-24 h-24 text-primary mx-auto mb-6" />
        <h1 className="text-4xl font-bold text-textPrimary">
          Thank You for using SpendSense!
        </h1>
        <p className="mt-4 text-lg text-textSecondary">
          We hope to see you again soon. You are now being logged out.
        </p>
        <div className="mt-8">
          <Loader2 className="w-12 h-12 text-primary mx-auto animate-spin" />
        </div>
      </div>
    </div>
  );
};
