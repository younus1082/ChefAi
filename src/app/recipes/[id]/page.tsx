'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { 
  ClockIcon,
  UserGroupIcon,
  FireIcon,
  HeartIcon,
  BookmarkIcon,
  ShareIcon,
  PrinterIcon,
  CheckCircleIcon,
  PlusIcon,
  MinusIcon,
  StarIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon, BookmarkIcon as BookmarkSolidIcon, StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';

interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  cookTime: number;
  prepTime: number;
  servings: number;
  difficulty: string;
  rating: number;
  reviews: number;
  calories: number;
  ingredients: {
    name: string;
    amount: string;
    unit: string;
    available?: boolean;
  }[];
  instructions: {
    step: number;
    instruction: string;
    time?: number;
  }[];
  nutrition: {
    calories: number;
    protein: string;
    carbs: string;
    fat: string;
    fiber: string;
  };
  tags: string[];
  author: string;
  dateCreated: string;
}

// Mock recipe data
const mockRecipe: Recipe = {
  id: "1",
  title: "Creamy Garlic Parmesan Pasta",
  description: "A rich and creamy pasta dish with garlic, parmesan cheese, and fresh herbs. Perfect for a quick weeknight dinner that feels gourmet.",
  image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=800&h=600&fit=crop",
  cookTime: 20,
  prepTime: 15,
  servings: 4,
  difficulty: "Easy",
  rating: 4.8,
  reviews: 127,
  calories: 485,
  ingredients: [
    { name: "Pasta", amount: "1", unit: "lb", available: true },
    { name: "Heavy cream", amount: "1", unit: "cup", available: true },
    { name: "Garlic", amount: "4", unit: "cloves", available: false },
    { name: "Parmesan cheese", amount: "1", unit: "cup", available: true },
    { name: "Butter", amount: "3", unit: "tbsp", available: true },
    { name: "Fresh parsley", amount: "1/4", unit: "cup", available: false },
    { name: "Salt", amount: "1", unit: "tsp", available: true },
    { name: "Black pepper", amount: "1/2", unit: "tsp", available: true },
    { name: "Olive oil", amount: "2", unit: "tbsp", available: true }
  ],
  instructions: [
    { step: 1, instruction: "Bring a large pot of salted water to boil. Cook pasta according to package directions until al dente.", time: 10 },
    { step: 2, instruction: "While pasta cooks, heat olive oil and butter in a large skillet over medium heat.", time: 2 },
    { step: 3, instruction: "Add minced garlic and cook until fragrant, about 1 minute.", time: 1 },
    { step: 4, instruction: "Pour in heavy cream and bring to a gentle simmer. Cook for 2-3 minutes.", time: 3 },
    { step: 5, instruction: "Add grated Parmesan cheese and whisk until melted and smooth.", time: 2 },
    { step: 6, instruction: "Drain pasta and add to the cream sauce. Toss to combine.", time: 1 },
    { step: 7, instruction: "Season with salt and pepper. Garnish with fresh parsley and serve immediately.", time: 1 }
  ],
  nutrition: {
    calories: 485,
    protein: "18g",
    carbs: "52g",
    fat: "24g",
    fiber: "3g"
  },
  tags: ["Italian", "Pasta", "Vegetarian", "Quick", "Comfort Food"],
  author: "Chef Maria",
  dateCreated: "2024-01-15"
};

export default function RecipeDetailPage() {
  const params = useParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [servings, setServings] = useState(4);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [activeTab, setActiveTab] = useState('ingredients');

  useEffect(() => {
    // In a real app, you would fetch the recipe by ID
    setRecipe(mockRecipe);
    setServings(mockRecipe.servings);
  }, [params.id]);

  if (!recipe) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="animate-pulse">
          <div className="h-64 bg-gray-300 rounded-xl mb-6"></div>
          <div className="h-8 bg-gray-300 rounded mb-4"></div>
          <div className="h-4 bg-gray-300 rounded mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  const adjustIngredientAmount = (amount: string, originalServings: number, newServings: number) => {
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount)) return amount;
    const adjusted = (numericAmount * newServings) / originalServings;
    return adjusted % 1 === 0 ? adjusted.toString() : adjusted.toFixed(2);
  };

  const toggleStepCompletion = (step: number) => {
    setCompletedSteps(prev => 
      prev.includes(step) 
        ? prev.filter(s => s !== step)
        : [...prev, step]
    );
  };

  const missingIngredients = recipe.ingredients.filter(ing => !ing.available);
  const availableIngredients = recipe.ingredients.filter(ing => ing.available);

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      {/* Recipe Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
        <div className="relative h-64 md:h-80">
          <img 
            src={recipe.image} 
            alt={recipe.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          <div className="absolute bottom-4 left-4 right-4">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">{recipe.title}</h1>
            <div className="flex items-center space-x-4 text-white/90">
              <div className="flex items-center space-x-1">
                <StarSolidIcon className="w-4 h-4 text-yellow-400" />
                <span>{recipe.rating}</span>
                <span>({recipe.reviews} reviews)</span>
              </div>
              <span>•</span>
              <span>by {recipe.author}</span>
            </div>
          </div>
        </div>

        <div className="p-6">
          <p className="text-gray-700 mb-4">{recipe.description}</p>
          
          {/* Recipe Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="flex items-center space-x-2">
              <ClockIcon className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Prep Time</p>
                <p className="font-medium">{recipe.prepTime} min</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <FireIcon className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Cook Time</p>
                <p className="font-medium">{recipe.cookTime} min</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <UserGroupIcon className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Servings</p>
                <p className="font-medium">{recipe.servings}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-xs text-green-600 font-medium">Cal</span>
              </div>
              <div>
                <p className="text-sm text-gray-500">Calories</p>
                <p className="font-medium">{recipe.calories}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                {isLiked ? (
                  <HeartSolidIcon className="w-5 h-5 text-red-500" />
                ) : (
                  <HeartIcon className="w-5 h-5 text-gray-400" />
                )}
                <span className="text-sm">Like</span>
              </button>
              
              <button
                onClick={() => setIsSaved(!isSaved)}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                {isSaved ? (
                  <BookmarkSolidIcon className="w-5 h-5 text-blue-500" />
                ) : (
                  <BookmarkIcon className="w-5 h-5 text-gray-400" />
                )}
                <span className="text-sm">Save</span>
              </button>
            </div>

            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <ShareIcon className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <PrinterIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'ingredients', name: 'Ingredients' },
              { id: 'instructions', name: 'Instructions' },
              { id: 'nutrition', name: 'Nutrition' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'ingredients' && (
            <div>
              {/* Servings Adjuster */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium text-gray-900">Ingredients</h3>
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-500">Servings:</span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setServings(Math.max(1, servings - 1))}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                    >
                      <MinusIcon className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-medium">{servings}</span>
                    <button
                      onClick={() => setServings(servings + 1)}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                    >
                      <PlusIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Missing Ingredients Alert */}
              {missingIngredients.length > 0 && (
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
                  <h4 className="font-medium text-orange-800 mb-2">Missing Ingredients</h4>
                  <p className="text-sm text-orange-700 mb-3">
                    You're missing {missingIngredients.length} ingredient{missingIngredients.length > 1 ? 's' : ''} for this recipe.
                  </p>
                  <button className="text-sm bg-orange-600 text-white px-3 py-1 rounded-md hover:bg-orange-700 transition-colors">
                    Add to Grocery List
                  </button>
                </div>
              )}

              {/* Ingredients List */}
              <div className="space-y-3">
                {recipe.ingredients.map((ingredient, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-3 rounded-lg border ${
                      ingredient.available 
                        ? 'border-green-200 bg-green-50' 
                        : 'border-orange-200 bg-orange-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded-full ${
                        ingredient.available ? 'bg-green-500' : 'bg-orange-500'
                      }`}></div>
                      <span className="font-medium">
                        {adjustIngredientAmount(ingredient.amount, recipe.servings, servings)} {ingredient.unit} {ingredient.name}
                      </span>
                    </div>
                    {!ingredient.available && (
                      <button className="text-xs text-orange-600 hover:text-orange-800">
                        Add to list
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'instructions' && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-6">Instructions</h3>
              <div className="space-y-4">
                {recipe.instructions.map((instruction) => (
                  <div
                    key={instruction.step}
                    className={`flex space-x-4 p-4 rounded-lg border transition-colors ${
                      completedSteps.includes(instruction.step)
                        ? 'border-green-200 bg-green-50'
                        : 'border-gray-200 bg-white'
                    }`}
                  >
                    <button
                      onClick={() => toggleStepCompletion(instruction.step)}
                      className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors ${
                        completedSteps.includes(instruction.step)
                          ? 'border-green-500 bg-green-500'
                          : 'border-gray-300 hover:border-green-400'
                      }`}
                    >
                      {completedSteps.includes(instruction.step) ? (
                        <CheckCircleIcon className="w-5 h-5 text-white" />
                      ) : (
                        <span className="text-sm font-medium text-gray-600">{instruction.step}</span>
                      )}
                    </button>
                    <div className="flex-1">
                      <p className={`${
                        completedSteps.includes(instruction.step) 
                          ? 'text-green-800 line-through' 
                          : 'text-gray-900'
                      }`}>
                        {instruction.instruction}
                      </p>
                      {instruction.time && (
                        <p className="text-sm text-gray-500 mt-1">
                          <ClockIcon className="w-4 h-4 inline mr-1" />
                          {instruction.time} minutes
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'nutrition' && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-6">Nutrition Information</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {Object.entries(recipe.nutrition).map(([key, value]) => (
                  <div key={key} className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-gray-900">{value}</p>
                    <p className="text-sm text-gray-500 capitalize">{key}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-4">
                * Nutritional values are approximate and may vary based on specific ingredients used.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Tags */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {recipe.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}