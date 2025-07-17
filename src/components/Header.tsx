import React from 'react';
import { Leaf, User, Menu, X, Shield } from 'lucide-react';
import { User as UserType } from '../types';

interface HeaderProps {
  user: UserType | null;
  currentView: string;
  onNavigate: (view: 'home' | 'dashboard' | 'browse' | 'profile' | 'list' | 'admin') => void;
  onLogin: () => void;
  onSignup: () => void;
  onLogout: () => void;
}

export function Header({ user, currentView, onNavigate, onLogin, onSignup, onLogout }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center space-x-2 text-emerald-600 hover:text-emerald-700 transition-colors"
            >
              <Leaf className="h-8 w-8" />
              <span className="text-xl font-bold">ReWear</span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {user && (
              <>
                <button
                  onClick={() => onNavigate('browse')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentView === 'browse'
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'text-gray-700 hover:text-emerald-600'
                  }`}
                >
                  Browse Items
                </button>
                <button
                  onClick={() => onNavigate('list')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentView === 'list'
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'text-gray-700 hover:text-emerald-600'
                  }`}
                >
                  List Item
                </button>
                {user?.role === 'admin' && (
                  <button
                    onClick={() => onNavigate('admin')}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-1 ${
                      currentView === 'admin'
                        ? 'bg-purple-100 text-purple-700'
                        : 'text-gray-700 hover:text-purple-600'
                    }`}
                  >
                    <Shield className="h-4 w-4" />
                    <span>Admin</span>
                  </button>
                )}
                <button
                  onClick={() => onNavigate('list')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentView === 'list'
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'text-gray-700 hover:text-emerald-600'
                  }`}
                >
                  List Item
                </button>
              </>
            )}
          </nav>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="hidden sm:flex items-center space-x-2 bg-emerald-50 px-3 py-1 rounded-full">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span className="text-sm font-medium text-emerald-700">{user.points} points</span>
                </div>
                <button
                  onClick={() => onNavigate('profile')}
                  className="flex items-center space-x-2 text-gray-700 hover:text-emerald-600 transition-colors"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="hidden sm:inline-block">{user.name}</span>
                </button>
                <button
                  onClick={onLogout}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <button
                  onClick={onLogin}
                  className="text-gray-700 hover:text-emerald-600 transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={onSignup}
                  className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition-colors"
                >
                  Sign Up
                </button>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 hover:text-emerald-600 transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-2">
            <nav className="flex flex-col space-y-2">
              {user && (
                <>
                  <button
                    onClick={() => {
                      onNavigate('browse');
                      setIsMenuOpen(false);
                    }}
                    className="text-left px-3 py-2 text-gray-700 hover:text-emerald-600 transition-colors"
                  >
                    Browse Items
                  </button>
                  <button
                    onClick={() => {
                      onNavigate('list');
                      setIsMenuOpen(false);
                    }}
                    className="text-left px-3 py-2 text-gray-700 hover:text-emerald-600 transition-colors"
                  >
                    List Item
                  </button>
                  {user?.role === 'admin' && (
                    <button
                      onClick={() => {
                        onNavigate('admin');
                        setIsMenuOpen(false);
                      }}
                      className="text-left px-3 py-2 text-gray-700 hover:text-purple-600 transition-colors flex items-center space-x-2"
                    >
                      <Shield className="h-4 w-4" />
                      <span>Admin Panel</span>
                    </button>
                  )}
                  <button
                    onClick={() => {
                      onNavigate('dashboard');
                      setIsMenuOpen(false);
                    }}
                    className="text-left px-3 py-2 text-gray-700 hover:text-emerald-600 transition-colors"
                  >
                    Dashboard
                  </button>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}