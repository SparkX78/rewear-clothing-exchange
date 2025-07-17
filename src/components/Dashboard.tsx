import React from 'react';
import { Plus, TrendingUp, Leaf, Droplets, Package } from 'lucide-react';
import { ItemCard } from './ItemCard';
import { User, ClothingItem } from '../types'; // ✅ Proper centralized import

interface DashboardProps {
  user: User;
  items: ClothingItem[];
}

export function Dashboard({ user, items }: DashboardProps) {
  const userItems = items.filter(item => item.owner.id === user.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user.name}!</h1>
        <p className="text-gray-600">Here's your sustainable fashion impact and activity.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Points Balance</p>
              <p className="text-2xl font-bold text-emerald-600">{user.points}</p>
            </div>
            <div className="bg-emerald-100 p-3 rounded-lg">
              <TrendingUp className="h-6 w-6 text-emerald-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Items Swapped</p>
              <p className="text-2xl font-bold text-blue-600">{user.itemsSwapped}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">CO₂ Saved</p>
              <p className="text-2xl font-bold text-green-600">{user.co2Saved} kg</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <Leaf className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Water Saved</p>
              <p className="text-2xl font-bold text-cyan-600">{user.waterSaved}L</p>
            </div>
            <div className="bg-cyan-100 p-3 rounded-lg">
              <Droplets className="h-6 w-6 text-cyan-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex items-center p-4 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
            <div className="flex-1">
              <p className="text-sm text-gray-900">Your "Vintage Denim Jacket" received 3 swap requests</p>
              <p className="text-xs text-gray-500">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-center p-4 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
            <div className="flex-1">
              <p className="text-sm text-gray-900">You earned 25 points for listing "Floral Summer Dress"</p>
              <p className="text-xs text-gray-500">1 day ago</p>
            </div>
          </div>
          <div className="flex items-center p-4 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
            <div className="flex-1">
              <p className="text-sm text-gray-900">Swap completed: "Wool Knit Sweater" for "Cotton Scarf"</p>
              <p className="text-xs text-gray-500">3 days ago</p>
            </div>
          </div>
        </div>
      </div>

      {/* My Items */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">My Listed Items</h2>
          <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add Item</span>
          </button>
        </div>

        {userItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userItems.map((item) => (
              <ItemCard key={item.id} item={item} showOwner={false} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="mb-6">
              <img 
                src="https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1"
                alt="No items yet"
                className="w-24 h-24 object-cover rounded-lg mx-auto opacity-50"
              />
            </div>
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No items listed yet</h3>
            <p className="text-gray-600 mb-4">Start by adding your first item to the platform</p>
            <button className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors">
              List Your First Item
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
