import React, { useState } from 'react';
import { LogIn } from 'lucide-react';

interface LoginPageProps {
  onLogin: (userDetails: { username: string; email: string; mobile: string; }) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() && password.trim() && email.trim()) {
      onLogin({ 
        username: username.trim(),
        email: email.trim(),
        mobile: mobile.trim() 
      });
    }
  };

  const isFormValid = username.trim() && password.trim() && email.trim();

  return (
    <div className="min-h-screen w-full lg:grid lg:grid-cols-2">
      <div className="hidden bg-primary lg:flex items-center justify-center p-12 text-white flex-col">
        <div className="max-w-md text-center">
            <h1 className="text-5xl font-bold">SpendSense</h1>
            <p className="mt-4 text-lg opacity-90">Your Smart Expense Manager. Take control of your finances today.</p>
        </div>
        <div className="mt-12">
            <svg width="250" height="250" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="white" fillOpacity="0.1"/>
                <path d="M12 11c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-4c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" fill="white" fillOpacity="0.2"/>
                <path d="M13 7h-2v2h2V7zm0 4h-2v2h2v-2zm0 4h-2v2h2v-2z" fill="white"/>
                <path d="M7 12H5v-2h2v2zm12 0h-2v-2h2v2zm-4 4h-2v-2h2v2zm-4 0H9v-2h2v2z" fill="white" fillOpacity="0.5"/>
            </svg>
        </div>
      </div>
      <div className="bg-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-textPrimary">
              Welcome to SpendSense
            </h2>
            <p className="mt-2 text-center text-sm text-textSecondary">
              Sign in or create an account to get started
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="username" className="sr-only">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-3 text-textPrimary placeholder-gray-500 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
               <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-3 text-textPrimary placeholder-gray-500 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-3 text-textPrimary placeholder-gray-500 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
               <div>
                <label htmlFor="mobile" className="sr-only">
                  Mobile Number
                </label>
                <input
                  id="mobile"
                  name="mobile"
                  type="tel"
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-3 text-textPrimary placeholder-gray-500 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                  placeholder="Mobile Number (Optional)"
                   value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={!isFormValid}
                className="group relative flex justify-center rounded-md border border-transparent bg-primary py-3 px-8 text-sm font-semibold text-white hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <LogIn className="h-5 w-5 text-blue-100 group-hover:text-white" aria-hidden="true" />
                </span>
                Submit
              </button>
            </div>
          </form>
           <p className="mt-2 text-center text-xs text-textSecondary">
              By creating an account, you agree to our Terms of Service.
            </p>
        </div>
      </div>
    </div>
  );
};