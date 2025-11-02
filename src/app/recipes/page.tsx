'use client';

import { useState } from 'react';
import { 
  MagnifyingGlassIcon,
  FunnelIcon,
  ClockIcon,
  FireIcon,
  UserGroupIcon,
  HeartIcon,
  BookmarkIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon, BookmarkIcon as BookmarkSolidIcon } from '@heroicons/react/24/solid';

interface Recipe {
  id: number;
  title: string;
  description: string;
  image: string;
  cookTime: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  servings: number;
  category: string;
  ingredients: string[];
  isLiked: boolean;
  isSaved: boolean;
}

const mockRecipes: Recipe[] = [
  {
    id: 1,
    title: "Creamy Mushroom Risotto",
    description: "A rich and creamy Italian risotto with mixed mushrooms and parmesan cheese.",
    image: "🍄",
    cookTime: "35 min",
    difficulty: "Medium",
    servings: 4,
    category: "Italian",
    ingredients: ["Arborio rice", "Mushrooms", "Parmesan", "White wine", "Vegetable broth"],
    isLiked: false,
    isSaved: true
  },
  {
    id: 2,
    title: "Spicy Thai Basil Chicken",
    description: "Authentic Thai stir-fry with fresh basil, chilies, and tender chicken.",
    image: "🌶️",
    cookTime: "20 min",
    difficulty: "Easy",
    servings: 2,
    category: "Thai",
    ingredients: ["Chicken breast", "Thai basil", "Chilies", "Fish sauce", "Garlic"],
    isLiked: true,
    isSaved: false
  },
  {
    id: 3,
    title: "Classic Beef Bourguignon",
    description: "French braised beef in red wine with vegetables and herbs.",
    image: "🥩",
    cookTime: "2h 30min",
    difficulty: "Hard",
    servings: 6,
    category: "French",
    ingredients: ["Beef chuck", "Red wine", "Carrots", "Onions", "Thyme"],
    isLiked: false,
    isSaved: false
  },
  {
    id: 4,
    title: "Mediterranean Quinoa Bowl",
    description: "Healthy quinoa bowl with fresh vegetables, feta, and lemon dressing.",
    image: "🥗",
    cookTime: "25 min",
    difficulty: "Easy",
    servings: 2,
    category: "Mediterranean",
    ingredients: ["Quinoa", "Cucumber", "Tomatoes", "Feta cheese", "Olive oil"],
    isLiked: true,
    isSaved: true
  },
  {
    id: 5,
    title: "Japanese Ramen Bowl",
    description: "Rich tonkotsu ramen with soft-boiled eggs and tender pork belly.",
    image: "🍜",
    cookTime: "45 min",
    difficulty: "Medium",
    servings: 2,
    category: "Japanese",
    ingredients: ["Ramen noodles", "Pork belly", "Eggs", "Miso paste", "Green onions"],
    isLiked: false,
    isSaved: false
  },
  {
    id: 6,
    title: "Mexican Street Tacos",
    description: "Authentic street-style tacos with carnitas and fresh toppings.",
    image: "🌮",
    cookTime: "30 min",
    difficulty: "Easy",
    servings: 4,
    category: "Mexican",
    ingredients: ["Corn tortillas", "Pork shoulder", "Onions", "Cilantro", "Lime"],
    isLiked: true,
    isSaved: false
  }
];

export default function RecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>(mockRecipes);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [showFilters, setShowFilters] = useState(false);

  const categories = ['All', 'Italian', 'Thai', 'French', 'Mediterranean', 'Japanese', 'Mexican'];
  const difficulties = ['All', 'Easy', 'Medium', 'Hard'];

  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         recipe.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || recipe.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'All' || recipe.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const toggleLike = (id: number) => {
    setRecipes(recipes.map(recipe => 
      recipe.id === id ? { ...recipe, isLiked: !recipe.isLiked } : recipe
    ));
  };

  const toggleSave = (id: number) => {
    setRecipes(recipes.map(recipe => 
      recipe.id === id ? { ...recipe, isSaved: !recipe.isSaved } : recipe
    ));
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-white bg-gradient-to-r from-green-500 to-emerald-500 shadow-md';
      case 'Medium': return 'text-white bg-gradient-to-r from-yellow-500 to-orange-500 shadow-md';
      case 'Hard': return 'text-white bg-gradient-to-r from-red-500 to-pink-500 shadow-md';
      default: return 'text-white bg-gradient-to-r from-gray-500 to-slate-500 shadow-md';
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-3 drop-shadow-lg">Recipe Collection</h1>
            <p className="text-white/90 text-lg">Discover delicious recipes from around the world</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-purple-400" />
            </div>
            <input
              type="text"
              placeholder="Search recipes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border-2 border-purple-200 rounded-xl bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 shadow-lg"
            />
          </div>

          {/* Filter Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            <FunnelIcon className="h-5 w-5 mr-2" />
            Filters
          </button>
        </div>

        {/* Filter Options */}
        {showFilters && (
          <div className="bg-gradient-to-br from-white to-purple-50 p-6 border-2 border-purple-200 rounded-xl shadow-lg backdrop-blur-sm space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-purple-700 mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="block w-full px-3 py-2 border-2 border-purple-200 rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-purple-700 mb-2">Difficulty</label>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="block w-full px-3 py-2 border-2 border-purple-200 rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                >
                  {difficulties.map(difficulty => (
                    <option key={difficulty} value={difficulty}>{difficulty}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-purple-600 font-medium">
          Showing {filteredRecipes.length} of {recipes.length} recipes
        </p>
      </div>

      {/* Recipe Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecipes.map((recipe) => (
          <div key={recipe.id} className="bg-gradient-to-br from-white to-orange-50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-orange-200 hover:scale-105 transform">
            {/* Recipe Image */}
            <div className="h-48 bg-gradient-to-br from-orange-200 via-pink-200 to-purple-200 flex items-center justify-center text-6xl shadow-inner">
              {recipe.image}
            </div>

            {/* Recipe Content */}
            <div className="p-6">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-semibold text-gray-900 line-clamp-2">
                  {recipe.title}
                </h3>
                <div className="flex space-x-2 ml-2">
                  <button
                    onClick={() => toggleLike(recipe.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    {recipe.isLiked ? (
                      <HeartSolidIcon className="h-5 w-5 text-red-500" />
                    ) : (
                      <HeartIcon className="h-5 w-5" />
                    )}
                  </button>
                  <button
                    onClick={() => toggleSave(recipe.id)}
                    className="text-gray-400 hover:text-blue-500 transition-colors"
                  >
                    {recipe.isSaved ? (
                      <BookmarkSolidIcon className="h-5 w-5 text-blue-500" />
                    ) : (
                      <BookmarkIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {recipe.description}
              </p>

              {/* Recipe Meta */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <ClockIcon className="h-4 w-4 mr-1" />
                    {recipe.cookTime}
                  </div>
                  <div className="flex items-center">
                    <UserGroupIcon className="h-4 w-4 mr-1" />
                    {recipe.servings}
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(recipe.difficulty)}`}>
                  {recipe.difficulty}
                </span>
              </div>

              {/* Ingredients Preview */}
              <div className="mb-4">
                <p className="text-sm text-orange-600 font-medium mb-2">Key ingredients:</p>
                <div className="flex flex-wrap gap-1">
                  {recipe.ingredients.slice(0, 3).map((ingredient, index) => (
                    <span key={index} className="px-2 py-1 bg-gradient-to-r from-orange-100 to-pink-100 text-orange-700 text-xs rounded-full border border-orange-200">
                      {ingredient}
                    </span>
                  ))}
                  {recipe.ingredients.length > 3 && (
                    <span className="px-2 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-600 text-xs rounded-full border border-purple-200">
                      +{recipe.ingredients.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <button className="w-full bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 text-white py-3 px-4 rounded-xl hover:from-orange-600 hover:via-pink-600 hover:to-purple-600 transition-all duration-200 font-medium shadow-lg transform hover:scale-105">
                View Recipe
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredRecipes.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No recipes found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      )}
      </div>
    </div>
  );
}