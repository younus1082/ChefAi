'use client';

import { useState } from 'react';
import { 
  UserIcon,
  CogIcon,
  HeartIcon,
  ClockIcon,
  FireIcon,
  StarIcon,
  PencilIcon,
  CameraIcon,
  BellIcon,
  ShieldCheckIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon, StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';

interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  bio: string;
  dietaryRestrictions: string[];
  favoritesCuisines: string[];
  cookingLevel: string;
  joinDate: string;
  recipesCooked: number;
  favoriteRecipes: number;
  achievements: string[];
}

const initialProfile: UserProfile = {
  name: "Alex Johnson",
  email: "alex.johnson@email.com",
  avatar: "",
  bio: "Passionate home cook who loves experimenting with international cuisines and healthy recipes.",
  dietaryRestrictions: ["Vegetarian", "Gluten-Free"],
  favoritesCuisines: ["Italian", "Asian", "Mediterranean"],
  cookingLevel: "Intermediate",
  joinDate: "January 2024",
  recipesCooked: 47,
  favoriteRecipes: 23,
  achievements: ["First Recipe", "Week Streak", "Healthy Choice", "International Explorer"]
};

const dietaryOptions = [
  "Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free", "Keto", "Paleo", "Low-Carb", "Nut-Free"
];

const cuisineOptions = [
  "Italian", "Asian", "Mediterranean", "Mexican", "Indian", "French", "American", "Thai", "Japanese", "Greek"
];

const cookingLevels = ["Beginner", "Intermediate", "Advanced", "Expert"];

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile>(initialProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to your backend
    console.log('Profile saved:', profile);
  };

  const toggleDietaryRestriction = (restriction: string) => {
    setProfile(prev => ({
      ...prev,
      dietaryRestrictions: prev.dietaryRestrictions.includes(restriction)
        ? prev.dietaryRestrictions.filter(r => r !== restriction)
        : [...prev.dietaryRestrictions, restriction]
    }));
  };

  const toggleFavoriteCuisine = (cuisine: string) => {
    setProfile(prev => ({
      ...prev,
      favoritesCuisines: prev.favoritesCuisines.includes(cuisine)
        ? prev.favoritesCuisines.filter(c => c !== cuisine)
        : [...prev.favoritesCuisines, cuisine]
    }));
  };

  const achievements = [
    { name: "First Recipe", icon: "🍳", description: "Cooked your first recipe" },
    { name: "Week Streak", icon: "🔥", description: "Cooked for 7 days straight" },
    { name: "Healthy Choice", icon: "🥗", description: "Cooked 10 healthy recipes" },
    { name: "International Explorer", icon: "🌍", description: "Tried 5 different cuisines" }
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 min-h-screen">
      {/* Profile Header */}
      <div className="bg-gradient-to-br from-white to-purple-50 rounded-3xl shadow-xl border border-purple-200 p-8 mb-8 backdrop-blur-sm">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-28 h-28 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                {profile.avatar ? (
                  <img src={profile.avatar} alt="Profile" className="w-28 h-28 rounded-full object-cover" />
                ) : (
                  <UserIcon className="w-14 h-14 text-white" />
                )}
              </div>
              {isEditing && (
                <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white hover:from-pink-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:scale-110">
                  <CameraIcon className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              {isEditing ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                    className="text-3xl font-bold text-gray-900 bg-transparent border-b-2 border-purple-300 focus:border-purple-500 focus:outline-none transition-colors"
                  />
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                    className="text-purple-600 bg-transparent border-b-2 border-purple-300 focus:border-purple-500 focus:outline-none transition-colors"
                  />
                  <textarea
                    value={profile.bio}
                    onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                    className="text-gray-700 bg-white/50 border-2 border-purple-300 rounded-xl p-3 focus:border-purple-500 focus:outline-none w-full transition-colors"
                    rows={3}
                  />
                </div>
              ) : (
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{profile.name}</h1>
                  <p className="text-purple-600 font-medium">{profile.email}</p>
                  <p className="text-gray-700 mt-3 text-lg">{profile.bio}</p>
                  <div className="flex items-center space-x-4 mt-4 text-sm">
                    <span className="text-purple-500 font-medium">Joined {profile.joinDate}</span>
                    <span className="text-purple-400">•</span>
                    <span className="text-pink-500 font-medium">{profile.cookingLevel} Cook</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Edit Button */}
          <div className="flex space-x-3">
            {isEditing ? (
              <>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-3 text-purple-600 hover:text-purple-800 hover:bg-purple-50 rounded-xl transition-all duration-200 font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl font-medium"
                >
                  Save Changes
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center space-x-2 px-6 py-3 text-purple-600 hover:text-purple-800 hover:bg-purple-50 rounded-xl transition-all duration-200 font-medium"
              >
                <PencilIcon className="w-5 h-5" />
                <span>Edit Profile</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div className="bg-gradient-to-br from-white to-green-50 rounded-2xl shadow-xl border border-green-200 p-8 hover:shadow-2xl transition-all duration-300 hover:scale-105">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
              <FireIcon className="w-8 h-8 text-white" />
            </div>
            <div>
              <p className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">{profile.recipesCooked}</p>
              <p className="text-green-600 font-medium">Recipes Cooked</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-white to-red-50 rounded-2xl shadow-xl border border-red-200 p-8 hover:shadow-2xl transition-all duration-300 hover:scale-105">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
              <HeartSolidIcon className="w-8 h-8 text-white" />
            </div>
            <div>
              <p className="text-3xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">{profile.favoriteRecipes}</p>
              <p className="text-red-600 font-medium">Favorite Recipes</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-white to-yellow-50 rounded-2xl shadow-xl border border-yellow-200 p-8 hover:shadow-2xl transition-all duration-300 hover:scale-105">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
              <StarSolidIcon className="w-8 h-8 text-white" />
            </div>
            <div>
              <p className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">{profile.achievements.length}</p>
              <p className="text-yellow-600 font-medium">Achievements</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-gradient-to-br from-white to-purple-50 rounded-2xl shadow-xl border border-purple-200">
        <div className="border-b border-purple-200">
          <nav className="flex space-x-8 px-8">
            {[
              { id: 'profile', name: 'Profile Settings', icon: UserIcon },
              { id: 'preferences', name: 'Preferences', icon: CogIcon },
              { id: 'achievements', name: 'Achievements', icon: StarIcon },
              { id: 'privacy', name: 'Privacy', icon: ShieldCheckIcon }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-5 border-b-3 font-medium text-sm transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'border-purple-500 text-purple-600 bg-purple-50 rounded-t-xl px-4'
                    : 'border-transparent text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-t-xl px-4'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-8">
          {activeTab === 'profile' && (
            <div className="space-y-8">
              <div>
                <label className="block text-sm font-medium text-purple-700 mb-3">Cooking Level</label>
                <select
                  value={profile.cookingLevel}
                  onChange={(e) => setProfile(prev => ({ ...prev, cookingLevel: e.target.value }))}
                  className="w-full px-4 py-3 border-2 border-purple-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white/50 transition-all duration-200"
                  disabled={!isEditing}
                >
                  {cookingLevels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {activeTab === 'preferences' && (
            <div className="space-y-8">
              <div>
                <label className="block text-sm font-medium text-purple-700 mb-4">Dietary Restrictions</label>
                <div className="flex flex-wrap gap-3">
                  {dietaryOptions.map(option => (
                    <button
                      key={option}
                      onClick={() => isEditing && toggleDietaryRestriction(option)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                        profile.dietaryRestrictions.includes(option)
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:shadow-xl'
                          : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-purple-300 hover:bg-purple-50'
                      } ${!isEditing ? 'cursor-default' : 'cursor-pointer hover:scale-105'}`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-purple-700 mb-4">Favorite Cuisines</label>
                <div className="flex flex-wrap gap-3">
                  {cuisineOptions.map(cuisine => (
                    <button
                      key={cuisine}
                      onClick={() => isEditing && toggleFavoriteCuisine(cuisine)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                        profile.favoritesCuisines.includes(cuisine)
                          ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg hover:shadow-xl'
                          : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-green-300 hover:bg-green-50'
                      } ${!isEditing ? 'cursor-default' : 'cursor-pointer hover:scale-105'}`}
                    >
                      {cuisine}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'achievements' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-center space-x-4 p-6 bg-gradient-to-br from-white to-yellow-50 rounded-2xl border border-yellow-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <div className="text-3xl bg-gradient-to-br from-yellow-400 to-orange-500 p-3 rounded-xl shadow-md">{achievement.icon}</div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">{achievement.name}</h3>
                    <p className="text-sm text-yellow-600 font-medium">{achievement.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between p-6 bg-gradient-to-br from-white to-purple-50 rounded-2xl border border-purple-200 shadow-lg">
                <div>
                  <h3 className="text-lg font-bold text-purple-900">Email Notifications</h3>
                  <p className="text-sm text-purple-600">Receive recipe recommendations and updates</p>
                </div>
                <button className="relative inline-flex h-8 w-14 items-center rounded-full bg-gradient-to-r from-purple-500 to-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl">
                  <span className="inline-block h-6 w-6 transform rounded-full bg-white transition-transform translate-x-7 shadow-md" />
                </button>
              </div>

              <div className="flex items-center justify-between p-6 bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-200 shadow-lg">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Profile Visibility</h3>
                  <p className="text-sm text-gray-600">Make your profile visible to other users</p>
                </div>
                <button className="relative inline-flex h-8 w-14 items-center rounded-full bg-gray-300 transition-all duration-200 shadow-lg hover:shadow-xl">
                  <span className="inline-block h-6 w-6 transform rounded-full bg-white transition-transform translate-x-1 shadow-md" />
                </button>
              </div>

              <div className="flex items-center justify-between p-6 bg-gradient-to-br from-white to-blue-50 rounded-2xl border border-blue-200 shadow-lg">
                <div>
                  <h3 className="text-lg font-bold text-blue-900">Data Sharing</h3>
                  <p className="text-sm text-blue-600">Share cooking data for personalized recommendations</p>
                </div>
                <button className="relative inline-flex h-8 w-14 items-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-200 shadow-lg hover:shadow-xl">
                  <span className="inline-block h-6 w-6 transform rounded-full bg-white transition-transform translate-x-7 shadow-md" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}