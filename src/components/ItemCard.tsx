import React from 'react';
import { Heart, ArrowRightLeft, Coins, User, Calendar } from 'lucide-react';
import { ClothingItem } from '../App';

interface ItemCardProps {
  item: ClothingItem;
  showOwner: boolean;
  viewMode?: 'grid' | 'list';
}

export function ItemCard({ item, showOwner, viewMode = 'grid' }: ItemCardProps) {
  const isListView = viewMode === 'list';

  if (isListView) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center space-x-6">
          <div className="flex-shrink-0">
            <img
              src={item.image}
              alt={item.title}
              className="w-24 h-24 object-cover rounded-lg"
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-900 truncate">{item.title}</h3>
              <div className="flex items-center space-x-2">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                  <Coins className="h-3 w-3 mr-1" />
                  {item.points}
                </span>
              </div>
            </div>
            
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>
            
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span className="bg-gray-100 px-2 py-1 rounded">{item.category}</span>
              <span className="bg-gray-100 px-2 py-1 rounded">Size {item.size}</span>
              <span className="bg-gray-100 px-2 py-1 rounded">{item.condition}</span>
              <span className="bg-gray-100 px-2 py-1 rounded">{item.brand}</span>
            </div>
          </div>
          
          <div className="flex-shrink-0 flex items-center space-x-3">
            {showOwner && (
              <div className="flex items-center space-x-2">
                <img
                  src={item.owner.avatar}
                  alt={item.owner.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="text-sm text-gray-600">{item.owner.name}</span>
              </div>
            )}
            <div className="flex space-x-2">
              <button className="p-2 text-gray-500 hover:text-emerald-600 transition-colors">
                <Heart className="h-5 w-5" />
              </button>
              <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2">
                <ArrowRightLeft className="h-4 w-4" />
                <span>Swap</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group">
      <div className="relative">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 flex space-x-2">
          <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors">
            <Heart className="h-4 w-4 text-gray-600" />
          </button>
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
            <Coins className="h-3 w-3 mr-1" />
            {item.points}
          </span>
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 truncate">{item.title}</h3>
          <span className="text-sm text-gray-500">{item.brand}</span>
        </div>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>
        
        <div className="flex items-center space-x-2 mb-3">
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {item.category}
          </span>
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            Size {item.size}
          </span>
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {item.condition}
          </span>
        </div>
        
        {showOwner && (
          <div className="flex items-center space-x-2 mb-4">
            <img
              src={item.owner.avatar}
              alt={item.owner.name}
              className="w-6 h-6 rounded-full object-cover"
            />
            <span className="text-sm text-gray-600">{item.owner.name}</span>
            <span className="text-xs text-gray-400">•</span>
            <span className="text-xs text-gray-400 flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              {new Date(item.listedDate).toLocaleDateString()}
            </span>
          </div>
        )}
        
        <button className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center space-x-2">
          <ArrowRightLeft className="h-4 w-4" />
          <span>Request Swap</span>
        </button>
      </div>
    </div>
  );
}