'use client';

import { useState } from 'react';
import { 
  BellIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
  CogIcon,
  UserIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  SunIcon,
  MoonIcon,
  TrashIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';

interface Settings {
  notifications: {
    email: boolean;
    push: boolean;
    recipeRecommendations: boolean;
    weeklyDigest: boolean;
    newFeatures: boolean;
  };
  privacy: {
    profileVisibility: boolean;
    dataSharing: boolean;
    analytics: boolean;
    thirdPartyIntegration: boolean;
  };
  preferences: {
    theme: 'light' | 'dark' | 'system';
    language: string;
    units: 'metric' | 'imperial';
    defaultServings: number;
  };
  account: {
    twoFactorAuth: boolean;
    loginAlerts: boolean;
  };
}

const initialSettings: Settings = {
  notifications: {
    email: true,
    push: true,
    recipeRecommendations: true,
    weeklyDigest: false,
    newFeatures: true,
  },
  privacy: {
    profileVisibility: true,
    dataSharing: true,
    analytics: false,
    thirdPartyIntegration: false,
  },
  preferences: {
    theme: 'system',
    language: 'en',
    units: 'metric',
    defaultServings: 4,
  },
  account: {
    twoFactorAuth: false,
    loginAlerts: true,
  },
};

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'it', name: 'Italiano' },
  { code: 'pt', name: 'Português' },
];

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>(initialSettings);
  const [activeSection, setActiveSection] = useState('notifications');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const updateSetting = (section: keyof Settings, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
  };

  const ToggleSwitch = ({ enabled, onChange }: { enabled: boolean; onChange: (value: boolean) => void }) => (
    <button
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-8 w-14 items-center rounded-full transition-all duration-200 shadow-lg hover:shadow-xl ${
        enabled ? 'bg-gradient-to-r from-purple-500 to-pink-600' : 'bg-gray-300'
      }`}
    >
      <span
        className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform shadow-md ${
          enabled ? 'translate-x-7' : 'translate-x-1'
        }`}
      />
    </button>
  );

  const sections = [
    { id: 'notifications', name: 'Notifications', icon: BellIcon },
    { id: 'privacy', name: 'Privacy & Security', icon: ShieldCheckIcon },
    { id: 'preferences', name: 'Preferences', icon: CogIcon },
    { id: 'account', name: 'Account', icon: UserIcon },
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Settings</h1>
        <p className="text-purple-600 mt-2 font-medium">Manage your account preferences and app settings</p>
      </div>

      <div className="bg-gradient-to-br from-white to-purple-50 rounded-3xl shadow-xl border border-purple-200 backdrop-blur-sm">
        <div className="flex">
          {/* Sidebar */}
          <div className="w-72 border-r border-purple-200 bg-gradient-to-b from-purple-50 to-white rounded-l-3xl">
            <nav className="p-6 space-y-3">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center space-x-4 px-4 py-3 rounded-xl text-left transition-all duration-200 font-medium ${
                    activeSection === section.id
                      ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg hover:shadow-xl'
                      : 'text-gray-700 hover:bg-purple-100 hover:text-purple-700'
                  }`}
                >
                  <section.icon className="w-6 h-6" />
                  <span>{section.name}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 p-8">
            {activeSection === 'notifications' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">Notification Preferences</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-6 bg-gradient-to-br from-white to-purple-50 rounded-2xl border border-purple-200 shadow-lg">
                      <div>
                        <h3 className="font-bold text-purple-900 text-lg">Email Notifications</h3>
                        <p className="text-sm text-purple-600">Receive notifications via email</p>
                      </div>
                      <ToggleSwitch
                        enabled={settings.notifications.email}
                        onChange={(value) => updateSetting('notifications', 'email', value)}
                      />
                    </div>

                    <div className="flex items-center justify-between p-6 bg-gradient-to-br from-white to-blue-50 rounded-2xl border border-blue-200 shadow-lg">
                      <div>
                        <h3 className="font-bold text-blue-900 text-lg">Push Notifications</h3>
                        <p className="text-sm text-blue-600">Receive push notifications on your device</p>
                      </div>
                      <ToggleSwitch
                        enabled={settings.notifications.push}
                        onChange={(value) => updateSetting('notifications', 'push', value)}
                      />
                    </div>

                    <div className="flex items-center justify-between p-6 bg-gradient-to-br from-white to-green-50 rounded-2xl border border-green-200 shadow-lg">
                      <div>
                        <h3 className="font-bold text-green-900 text-lg">Recipe Recommendations</h3>
                        <p className="text-sm text-green-600">Get personalized recipe suggestions</p>
                      </div>
                      <ToggleSwitch
                        enabled={settings.notifications.recipeRecommendations}
                        onChange={(value) => updateSetting('notifications', 'recipeRecommendations', value)}
                      />
                    </div>

                    <div className="flex items-center justify-between p-6 bg-gradient-to-br from-white to-orange-50 rounded-2xl border border-orange-200 shadow-lg">
                      <div>
                        <h3 className="font-bold text-orange-900 text-lg">Weekly Digest</h3>
                        <p className="text-sm text-orange-600">Weekly summary of your cooking activity</p>
                      </div>
                      <ToggleSwitch
                        enabled={settings.notifications.weeklyDigest}
                        onChange={(value) => updateSetting('notifications', 'weeklyDigest', value)}
                      />
                    </div>

                    <div className="flex items-center justify-between p-6 bg-gradient-to-br from-white to-pink-50 rounded-2xl border border-pink-200 shadow-lg">
                      <div>
                        <h3 className="font-bold text-pink-900 text-lg">New Features</h3>
                        <p className="text-sm text-pink-600">Be notified about new app features</p>
                      </div>
                      <ToggleSwitch
                        enabled={settings.notifications.newFeatures}
                        onChange={(value) => updateSetting('notifications', 'newFeatures', value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'privacy' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">Privacy & Security</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-6 bg-gradient-to-br from-white to-purple-50 rounded-2xl border border-purple-200 shadow-lg">
                      <div>
                        <h3 className="font-bold text-purple-900 text-lg">Profile Visibility</h3>
                        <p className="text-sm text-purple-600">Make your profile visible to other users</p>
                      </div>
                      <ToggleSwitch
                        enabled={settings.privacy.profileVisibility}
                        onChange={(value) => updateSetting('privacy', 'profileVisibility', value)}
                      />
                    </div>

                    <div className="flex items-center justify-between p-6 bg-gradient-to-br from-white to-blue-50 rounded-2xl border border-blue-200 shadow-lg">
                      <div>
                        <h3 className="font-bold text-blue-900 text-lg">Data Sharing</h3>
                        <p className="text-sm text-blue-600">Share cooking data for personalized recommendations</p>
                      </div>
                      <ToggleSwitch
                        enabled={settings.privacy.dataSharing}
                        onChange={(value) => updateSetting('privacy', 'dataSharing', value)}
                      />
                    </div>

                    <div className="flex items-center justify-between p-6 bg-gradient-to-br from-white to-green-50 rounded-2xl border border-green-200 shadow-lg">
                      <div>
                        <h3 className="font-bold text-green-900 text-lg">Analytics</h3>
                        <p className="text-sm text-green-600">Help improve the app with usage analytics</p>
                      </div>
                      <ToggleSwitch
                        enabled={settings.privacy.analytics}
                        onChange={(value) => updateSetting('privacy', 'analytics', value)}
                      />
                    </div>

                    <div className="flex items-center justify-between p-6 bg-gradient-to-br from-white to-indigo-50 rounded-2xl border border-indigo-200 shadow-lg">
                      <div>
                        <h3 className="font-bold text-indigo-900 text-lg">Third-party Integration</h3>
                        <p className="text-sm text-indigo-600">Allow integration with external services</p>
                      </div>
                      <ToggleSwitch
                        enabled={settings.privacy.thirdPartyIntegration}
                        onChange={(value) => updateSetting('privacy', 'thirdPartyIntegration', value)}
                      />
                    </div>
                  </div>

                  <div className="mt-8 p-6 bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-300 rounded-2xl shadow-lg">
                    <h4 className="font-bold text-yellow-800 mb-3 text-lg">Data Export</h4>
                    <p className="text-sm text-yellow-700 mb-4">
                      Download a copy of all your data including recipes, preferences, and cooking history.
                    </p>
                    <button className="text-sm bg-gradient-to-r from-yellow-500 to-orange-600 text-white px-4 py-2 rounded-xl hover:from-yellow-600 hover:to-orange-700 transition-all duration-200 shadow-md hover:shadow-lg">
                      Export Data
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'preferences' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">App Preferences</h2>
                  
                  <div className="space-y-8">
                    <div>
                      <label className="block text-lg font-bold text-purple-700 mb-4">Theme</label>
                      <div className="grid grid-cols-3 gap-4">
                        {[
                          { value: 'light', label: 'Light', icon: SunIcon },
                          { value: 'dark', label: 'Dark', icon: MoonIcon },
                          { value: 'system', label: 'System', icon: ComputerDesktopIcon },
                        ].map((theme) => (
                          <button
                            key={theme.value}
                            onClick={() => updateSetting('preferences', 'theme', theme.value)}
                            className={`flex items-center space-x-3 p-4 rounded-xl border-2 transition-all duration-200 shadow-md hover:shadow-lg ${
                              settings.preferences.theme === theme.value
                                ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50 text-purple-700'
                                : 'border-gray-200 hover:bg-gradient-to-br hover:from-gray-50 hover:to-purple-50 hover:border-purple-300'
                            }`}
                          >
                            <theme.icon className="w-6 h-6" />
                            <span className="font-bold">{theme.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-lg font-bold text-purple-700 mb-4">Language</label>
                      <select
                        value={settings.preferences.language}
                        onChange={(e) => updateSetting('preferences', 'language', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-purple-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-gradient-to-br from-white to-purple-50 text-purple-900 font-medium transition-all duration-200"
                      >
                        {languages.map((lang) => (
                          <option key={lang.code} value={lang.code}>
                            {lang.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-lg font-bold text-purple-700 mb-4">Measurement Units</label>
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          { value: 'metric', label: 'Metric (kg, L, °C)' },
                          { value: 'imperial', label: 'Imperial (lb, fl oz, °F)' },
                        ].map((unit) => (
                          <button
                            key={unit.value}
                            onClick={() => updateSetting('preferences', 'units', unit.value)}
                            className={`p-4 rounded-xl border-2 transition-all duration-200 shadow-md hover:shadow-lg ${
                              settings.preferences.units === unit.value
                                ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50 text-blue-700'
                                : 'border-gray-200 hover:bg-gradient-to-br hover:from-gray-50 hover:to-blue-50 hover:border-blue-300'
                            }`}
                          >
                            <span className="font-bold">{unit.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-lg font-bold text-purple-700 mb-4">Default Servings</label>
                      <select
                        value={settings.preferences.defaultServings}
                        onChange={(e) => updateSetting('preferences', 'defaultServings', parseInt(e.target.value))}
                        className="w-full px-4 py-3 border-2 border-purple-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-gradient-to-br from-white to-purple-50 text-purple-900 font-medium transition-all duration-200"
                      >

                        {[1, 2, 3, 4, 5, 6, 8, 10, 12].map((num) => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? 'serving' : 'servings'}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'account' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">Account Security</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-6 bg-gradient-to-br from-white to-purple-50 rounded-2xl border border-purple-200 shadow-lg">
                      <div>
                        <h3 className="font-bold text-purple-900 text-lg">Two-Factor Authentication</h3>
                        <p className="text-sm text-purple-600">Add an extra layer of security to your account</p>
                      </div>
                      <ToggleSwitch
                        enabled={settings.account.twoFactorAuth}
                        onChange={(value) => updateSetting('account', 'twoFactorAuth', value)}
                      />
                    </div>

                    <div className="flex items-center justify-between p-6 bg-gradient-to-br from-white to-blue-50 rounded-2xl border border-blue-200 shadow-lg">
                      <div>
                        <h3 className="font-bold text-blue-900 text-lg">Login Alerts</h3>
                        <p className="text-sm text-blue-600">Get notified of new login attempts</p>
                      </div>
                      <ToggleSwitch
                        enabled={settings.account.loginAlerts}
                        onChange={(value) => updateSetting('account', 'loginAlerts', value)}
                      />
                    </div>
                  </div>

                  <div className="mt-8 space-y-4">
                    <button className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl font-bold">
                      <span>Change Password</span>
                    </button>

                    <button className="w-full flex items-center justify-center space-x-2 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gradient-to-br hover:from-gray-50 hover:to-purple-50 hover:border-purple-300 transition-all duration-200 shadow-md hover:shadow-lg font-bold">
                      <ArrowRightOnRectangleIcon className="w-5 h-5" />
                      <span>Sign Out</span>
                    </button>
                  </div>

                  <div className="mt-8 p-6 bg-gradient-to-br from-red-50 to-pink-50 border-2 border-red-300 rounded-2xl shadow-lg">
                    <h4 className="font-bold text-red-800 mb-3 text-lg">Danger Zone</h4>
                    <p className="text-sm text-red-700 mb-4">
                      Once you delete your account, there is no going back. Please be certain.
                    </p>
                    <button
                      onClick={() => setShowDeleteConfirm(true)}
                      className="flex items-center space-x-2 text-sm bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 py-2 rounded-xl hover:from-red-600 hover:to-pink-700 transition-all duration-200 shadow-md hover:shadow-lg font-bold"
                    >
                      <TrashIcon className="w-5 h-5" />
                      <span>Delete Account</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-white to-purple-50 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl border border-purple-200">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Delete Account</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently removed.
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gradient-to-br hover:from-gray-50 hover:to-purple-50 hover:border-purple-300 transition-all duration-200 font-bold"
              >
                Cancel
              </button>
              <button className="flex-1 px-4 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-xl hover:from-red-600 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl font-bold">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}