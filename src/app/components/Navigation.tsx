'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  HomeIcon, 
  BookOpenIcon, 
  ChatBubbleLeftRightIcon, 
  UserIcon, 
  Cog6ToothIcon,
  BeakerIcon,
  Bars3Icon,
  XMarkIcon,
  ArrowRightOnRectangleIcon,
  ArrowLeftOnRectangleIcon
} from '@heroicons/react/24/outline';

const Navigation = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  // Hide navigation on all public pages when user is not authenticated
  const publicPages = ['/', '/login', '/register'];
  if (!user && publicPages.includes(pathname)) {
    return null;
  }

  // Hide navigation completely if user is not authenticated
  if (!user) {
    return null;
  }

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
    { name: 'Recipes', href: '/recipes', icon: BookOpenIcon },
    { name: 'Chat', href: '/chat', icon: ChatBubbleLeftRightIcon },
    { name: 'Profile', href: '/profile', icon: UserIcon },
    { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
  ];

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-purple-600 via-blue-600 to-teal-500 shadow-xl fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center space-x-2 group">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm group-hover:bg-white/30 transition-all duration-300">
              <BeakerIcon className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white drop-shadow-sm">
              ChefAI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  pathname === item.href
                    ? 'text-white bg-white/30 backdrop-blur-sm shadow-lg'
                    : 'text-white/80 hover:text-white hover:bg-white/20 backdrop-blur-sm'
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            ))}
            
            {/* Authentication Buttons */}
            {user ? (
              <div className="flex items-center space-x-2 ml-4">
                <span className="text-white/80 text-sm">Welcome, {user.name}</span>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium text-white/80 hover:text-white hover:bg-white/20 backdrop-blur-sm transition-all duration-300"
                >
                  <ArrowRightOnRectangleIcon className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2 ml-4">
                <Link
                  href="/login"
                  className="flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium text-white/80 hover:text-white hover:bg-white/20 backdrop-blur-sm transition-all duration-300"
                >
                  <ArrowLeftOnRectangleIcon className="h-4 w-4" />
                  <span>Login</span>
                </Link>
                <Link
                  href="/register"
                  className="flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm transition-all duration-300"
                >
                  <UserIcon className="h-4 w-4" />
                  <span>Sign Up</span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/20 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300"
            >
              {isOpen ? (
                <XMarkIcon className="block h-6 w-6" />
              ) : (
                <Bars3Icon className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-4 pt-2 pb-3 space-y-2 bg-gradient-to-b from-purple-600/95 via-blue-600/95 to-teal-500/95 backdrop-blur-lg border-t border-white/20">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
                  pathname === item.href
                    ? 'text-white bg-white/30 backdrop-blur-sm shadow-lg'
                    : 'text-white/80 hover:text-white hover:bg-white/20 backdrop-blur-sm'
                }`}
                onClick={() => setIsOpen(false)}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            ))}
            
            {/* Mobile Authentication Buttons */}
            <div className="border-t border-white/20 pt-2 mt-2">
              {user ? (
                <div className="space-y-2">
                  <div className="px-4 py-2 text-white/80 text-sm">
                    Welcome, {user.name}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-medium text-white/80 hover:text-white hover:bg-white/20 backdrop-blur-sm transition-all duration-300 w-full"
                  >
                    <ArrowRightOnRectangleIcon className="h-5 w-5" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Link
                    href="/login"
                    className="flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-medium text-white/80 hover:text-white hover:bg-white/20 backdrop-blur-sm transition-all duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    <ArrowLeftOnRectangleIcon className="h-5 w-5" />
                    <span>Login</span>
                  </Link>
                  <Link
                    href="/register"
                    className="flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-medium bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm transition-all duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    <UserIcon className="h-5 w-5" />
                    <span>Sign Up</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;