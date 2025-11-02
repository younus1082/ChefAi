'use client';

import { useState, useEffect } from 'react';
import { PlusIcon, TrashIcon, SparklesIcon, ClockIcon, UsersIcon, FireIcon } from '@heroicons/react/24/outline';

interface Recipe {
  title: string;
  timeMinutes: number;
  caloriesEstimate?: number;
  servings: number;
  ingredients: string[];
  instructions: string[];
  notes?: string;
  source: string;
}

interface InventoryItem {
  id: string;
  name: string;
  quantity: string;
  expiryDate?: string;
  category: string;
}

export default function Dashboard() {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [newIngredient, setNewIngredient] = useState('');
  const [newQuantity, setNewQuantity] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('vegetables');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [groceryList, setGroceryList] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [preferences, setPreferences] = useState('');
  const [servings, setServings] = useState(4);



  const categories = ['vegetables', 'fruits', 'proteins', 'grains', 'dairy', 'spices', 'other'];

  // Load data from localStorage on mount
  useEffect(() => {
    const savedInventory = localStorage.getItem('chefai-inventory');
    const savedGroceryList = localStorage.getItem('chefai-grocery');
    
    if (savedInventory) {
      setInventory(JSON.parse(savedInventory));
    }
    if (savedGroceryList) {
      setGroceryList(JSON.parse(savedGroceryList));
    }
  }, []);

  // Save to localStorage when data changes
  useEffect(() => {
    localStorage.setItem('chefai-inventory', JSON.stringify(inventory));
  }, [inventory]);

  useEffect(() => {
    localStorage.setItem('chefai-grocery', JSON.stringify(groceryList));
  }, [groceryList]);

  const addIngredient = () => {
    if (!newIngredient.trim()) return;
    
    const newItem: InventoryItem = {
      id: Date.now().toString(),
      name: newIngredient.trim(),
      quantity: newQuantity || '1',
      category: selectedCategory
    };
    
    setInventory([...inventory, newItem]);
    setNewIngredient('');
    setNewQuantity('');
  };

  const removeIngredient = (id: string) => {
    setInventory(inventory.filter(item => item.id !== id));
  };

  const generateRecipes = async () => {
    if (inventory.length === 0) return;
    
    setIsGenerating(true);
    
    try {
      const ingredientsList = inventory.map(item => `${item.name} (${item.quantity})`).join(', ');
      
      const response = await fetch('/api/recipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ingredients: ingredientsList,
          preferences: preferences || 'healthy and delicious',
          servings
        })
      });
      
      if (!response.ok) throw new Error('Failed to generate recipe');
      
      const recipe = await response.json();
      setRecipes([recipe, ...recipes.slice(0, 4)]); // Keep last 5 recipes
      
    } catch (error) {
      console.error('Error generating recipe:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const addToGroceryList = (ingredient: string) => {
    if (!groceryList.includes(ingredient)) {
      setGroceryList([...groceryList, ingredient]);
    }
  };

  const removeFromGroceryList = (ingredient: string) => {
    setGroceryList(groceryList.filter(item => item !== ingredient));
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      vegetables: 'bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-lg',
      fruits: 'bg-gradient-to-r from-orange-400 to-red-500 text-white shadow-lg',
      proteins: 'bg-gradient-to-r from-red-400 to-pink-500 text-white shadow-lg',
      grains: 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg',
      dairy: 'bg-gradient-to-r from-blue-400 to-cyan-500 text-white shadow-lg',
      spices: 'bg-gradient-to-r from-purple-400 to-indigo-500 text-white shadow-lg',
      other: 'bg-gradient-to-r from-gray-400 to-slate-500 text-white shadow-lg'
    };
    return colors[category as keyof typeof colors] || colors.other;
  };

  return (
    <div className="min-h-screen pt-16">{/* Add padding-top to account for fixed navigation */}

      {/* Header */}
      <header className="bg-gradient-to-r from-purple-600 via-blue-600 to-teal-500 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg">
                <SparklesIcon className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white drop-shadow-sm">
                  ChefAI Dashboard
                </h1>
                <p className="text-white/80 text-sm">Your smart cooking companion</p>
              </div>
            </div>
            
            {/* Stats */}
            <div className="flex items-center space-x-8">
              <div className="text-center bg-white/20 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg">
                <div className="text-2xl font-bold text-white">{inventory.length}</div>
                <div className="text-sm text-white/80">Inventory Items</div>
              </div>
              <div className="text-center bg-white/20 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg">
                <div className="text-2xl font-bold text-white">{recipes.length}</div>
                <div className="text-sm text-white/80">Generated Recipes</div>
              </div>
              <div className="text-center bg-white/20 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg">
                <div className="text-2xl font-bold text-white">{groceryList.length}</div>
                <div className="text-sm text-white/80">Grocery Items</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Inventory Management */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-white to-green-50 rounded-xl shadow-xl border border-green-200 p-6 hover:shadow-2xl transition-all duration-300">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full mr-3 shadow-sm"></div>
                My Inventory
              </h2>
              
              {/* Add Ingredient Form */}
              <div className="space-y-3 mb-6">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Add ingredient..."
                    value={newIngredient}
                    onChange={(e) => setNewIngredient(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    onKeyPress={(e) => e.key === 'Enter' && addIngredient()}
                  />
                  <input
                    type="text"
                    placeholder="Qty"
                    value={newQuantity}
                    onChange={(e) => setNewQuantity(e.target.value)}
                    className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div className="flex space-x-2">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={addIngredient}
                    className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300 flex items-center shadow-lg hover:shadow-xl"
                  >
                    <PlusIcon className="w-4 h-4 mr-1" />
                    Add
                  </button>
                </div>
              </div>

              {/* Inventory List */}
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {inventory.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">
                    Your inventory is empty. Start by adding some ingredients!
                  </p>
                ) : (
                  inventory.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-gray-900">{item.name}</span>
                          <span className={`px-2 py-1 text-xs rounded-full ${getCategoryColor(item.category)}`}>
                            {item.category}
                          </span>
                        </div>
                        <div className="text-sm text-gray-500">{item.quantity}</div>
                      </div>
                      <button
                        onClick={() => removeIngredient(item.id)}
                        className="p-1 text-red-500 hover:text-red-700 transition-colors"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Generate Recipes Button */}
              <button
                onClick={generateRecipes}
                disabled={inventory.length === 0 || isGenerating}
                className="w-full mt-6 px-4 py-3 bg-gradient-to-r from-purple-600 via-blue-600 to-teal-500 text-white rounded-lg hover:from-purple-700 hover:via-blue-700 hover:to-teal-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
              >
                <SparklesIcon className="w-5 h-5" />
                <span>{isGenerating ? 'Generating...' : 'Suggest Recipes'}</span>
              </button>
            </div>

            {/* Grocery List */}
            <div className="bg-gradient-to-br from-white to-orange-50 rounded-xl shadow-xl border border-orange-200 p-6 mt-6 hover:shadow-2xl transition-all duration-300">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <div className="w-3 h-3 bg-gradient-to-r from-orange-400 to-red-500 rounded-full mr-3 shadow-sm"></div>
                Grocery List
              </h2>
              
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {groceryList.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">
                    Your grocery list is empty. Items will be added when you select recipes!
                  </p>
                ) : (
                  groceryList.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-orange-50 rounded-lg">
                      <span className="text-gray-900">{item}</span>
                      <button
                        onClick={() => removeFromGroceryList(item)}
                        className="p-1 text-red-500 hover:text-red-700 transition-colors"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Recipe Generation & Display */}
          <div className="lg:col-span-2">
            {/* Preferences */}
            <div className="bg-gradient-to-br from-white to-purple-50 rounded-xl shadow-xl border border-purple-200 p-6 mb-6 hover:shadow-2xl transition-all duration-300">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-blue-500 rounded-full mr-3 shadow-sm"></div>
                Recipe Preferences
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dietary Preferences
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., vegetarian, low-carb, spicy..."
                    value={preferences}
                    onChange={(e) => setPreferences(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Servings
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="12"
                    value={servings}
                    onChange={(e) => setServings(parseInt(e.target.value) || 4)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Generated Recipes */}
            <div className="space-y-6">
              {recipes.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                  <SparklesIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Ready to Cook?</h3>
                  <p className="text-gray-500 mb-6">
                    Add ingredients to your inventory and click "Suggest Recipes" to get personalized recipe recommendations!
                  </p>
                </div>
              ) : (
                recipes.map((recipe, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-2xl font-bold text-gray-900">{recipe.title}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <ClockIcon className="w-4 h-4 mr-1" />
                            {recipe.timeMinutes} min
                          </div>
                          <div className="flex items-center">
                            <UsersIcon className="w-4 h-4 mr-1" />
                            {recipe.servings} servings
                          </div>
                          {recipe.caloriesEstimate && (
                            <div className="flex items-center">
                              <FireIcon className="w-4 h-4 mr-1" />
                              {recipe.caloriesEstimate} cal
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Ingredients</h4>
                          <ul className="space-y-2">
                            {recipe.ingredients.map((ingredient, idx) => (
                              <li key={idx} className="flex items-center justify-between text-gray-700">
                                <span>{ingredient}</span>
                                <button
                                  onClick={() => addToGroceryList(ingredient)}
                                  className="text-blue-600 hover:text-blue-800 text-sm"
                                >
                                  + Add to grocery
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Instructions</h4>
                          <ol className="space-y-2">
                            {recipe.instructions.map((instruction, idx) => (
                              <li key={idx} className="text-gray-700">
                                <span className="font-medium text-blue-600">{idx + 1}.</span> {instruction}
                              </li>
                            ))}
                          </ol>
                        </div>
                      </div>

                      {recipe.notes && (
                        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                          <h4 className="font-semibold text-gray-900 mb-2">Chef's Notes</h4>
                          <p className="text-gray-700">{recipe.notes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}