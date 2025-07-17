import React from 'react';
import { User, Calendar, Award, Leaf, Droplets, Package, Edit } from 'lucide-react';
import { User as UserType } from '../App';

interface ProfileProps {
  user: UserType;
}

export function Profile({ user }: ProfileProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Profile Header */}
        <div className="relative bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-8 overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <img 
              src="https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400&dpr=1"
              alt="Profile background"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative z-10 flex items-center space-x-6">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
            />
            <div className="text-white">
              <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
              <p className="text-emerald-100 mb-2">{user.email}</p>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>Joined {new Date(user.joinDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center">
                  <Award className="h-4 w-4 mr-1" />
                  <span>Eco Warrior</span>
                </div>
              </div>
            </div>
            <div className="ml-auto">
              <button className="bg-white text-emerald-600 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
                <Edit className="h-4 w-4" />
                <span>Edit Profile</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 border-b border-gray-200">
          <div className="text-center">
            <div className="bg-emerald-100 p-4 rounded-lg mb-3">
              <Package className="h-8 w-8 text-emerald-600 mx-auto" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{user.itemsSwapped}</h3>
            <p className="text-sm text-gray-600">Items Swapped</p>
          </div>
          
          <div className="text-center">
            <div className="bg-blue-100 p-4 rounded-lg mb-3">
              <Award className="h-8 w-8 text-blue-600 mx-auto" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{user.points}</h3>
            <p className="text-sm text-gray-600">Points Balance</p>
          </div>
          
          <div className="text-center">
            <div className="bg-green-100 p-4 rounded-lg mb-3">
              <Leaf className="h-8 w-8 text-green-600 mx-auto" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{user.co2Saved} kg</h3>
            <p className="text-sm text-gray-600">CO₂ Saved</p>
          </div>
          
          <div className="text-center">
            <div className="bg-cyan-100 p-4 rounded-lg mb-3">
              <Droplets className="h-8 w-8 text-cyan-600 mx-auto" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{user.waterSaved}L</h3>
            <p className="text-sm text-gray-600">Water Saved</p>
          </div>
        </div>

        {/* Sustainability Impact */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Sustainability Impact</h2>
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-lg">
            <div className="flex items-center mb-4">
              <Leaf className="h-6 w-6 text-emerald-600 mr-2" />
              <h3 className="text-lg font-medium text-gray-900">Environmental Contribution</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-emerald-600">{user.co2Saved} kg</p>
                <p className="text-sm text-gray-600">CO₂ emissions prevented</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{user.waterSaved}L</p>
                <p className="text-sm text-gray-600">Water consumption saved</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">{user.itemsSwapped}</p>
                <p className="text-sm text-gray-600">Items diverted from landfill</p>
              </div>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex items-center p-4 bg-emerald-50 rounded-lg">
              <div className="bg-emerald-100 p-2 rounded-full mr-3">
                <Award className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Eco Warrior</h3>
                <p className="text-sm text-gray-600">Swapped 10+ items</p>
              </div>
            </div>
            
            <div className="flex items-center p-4 bg-blue-50 rounded-lg">
              <div className="bg-blue-100 p-2 rounded-full mr-3">
                <Leaf className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Carbon Saver</h3>
                <p className="text-sm text-gray-600">Saved 25+ kg CO₂</p>
              </div>
            </div>
            
            <div className="flex items-center p-4 bg-purple-50 rounded-lg">
              <div className="bg-purple-100 p-2 rounded-full mr-3">
                <User className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Community Member</h3>
                <p className="text-sm text-gray-600">Active for 30+ days</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">Completed swap: "Vintage Denim Jacket" for "Cotton Scarf"</p>
                <p className="text-xs text-gray-500">2 days ago</p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">Listed new item: "Floral Summer Dress"</p>
                <p className="text-xs text-gray-500">1 week ago</p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">Earned "Eco Warrior" achievement</p>
                <p className="text-xs text-gray-500">2 weeks ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}