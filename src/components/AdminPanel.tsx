import React, { useState } from 'react';
import { Shield, CheckCircle, XCircle, Eye, AlertTriangle, Users, Package, TrendingUp, Search, Filter } from 'lucide-react';
import { User, ClothingItem, ModerationAction } from '../types';

interface AdminPanelProps {
  user: User;
  items: ClothingItem[];
  users: User[];
  onModerateItem: (itemId: string, action: 'approve' | 'reject', reason?: string) => void;
  onRemoveItem: (itemId: string, reason: string) => void;
}

export function AdminPanel({ user, items, users, onModerateItem, onRemoveItem }: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<'pending' | 'approved' | 'rejected' | 'users' | 'analytics'>('pending');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [moderationReason, setModerationReason] = useState('');
  const [selectedItem, setSelectedItem] = useState<ClothingItem | null>(null);

  const pendingItems = items.filter(item => item.status === 'pending');
  const approvedItems = items.filter(item => item.status === 'approved');
  const rejectedItems = items.filter(item => item.status === 'rejected');

  const filteredItems = (itemList: ClothingItem[]) => {
    return itemList.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.owner.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  };

  const handleModeration = (itemId: string, action: 'approve' | 'reject') => {
    onModerateItem(itemId, action, moderationReason);
    setModerationReason('');
    setSelectedItem(null);
  };

  const categories = ['all', 'Tops', 'Bottoms', 'Dresses', 'Outerwear', 'Shoes', 'Accessories'];

  const renderItemCard = (item: ClothingItem, showActions: boolean = true) => (
    <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex space-x-4">
        <img
          src={item.image}
          alt={item.title}
          className="w-20 h-20 object-cover rounded-lg"
        />
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-gray-900">{item.title}</h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              item.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
              item.status === 'approved' ? 'bg-green-100 text-green-800' :
              'bg-red-100 text-red-800'
            }`}>
              {item.status}
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-2 line-clamp-2">{item.description}</p>
          <div className="flex items-center space-x-4 text-xs text-gray-500">
            <span>{item.brand}</span>
            <span>{item.category}</span>
            <span>Size {item.size}</span>
            <span>{item.condition}</span>
            <span>{item.points} points</span>
          </div>
          <div className="flex items-center space-x-2 mt-2">
            <img
              src={item.owner.avatar}
              alt={item.owner.name}
              className="w-5 h-5 rounded-full"
            />
            <span className="text-xs text-gray-600">{item.owner.name}</span>
            <span className="text-xs text-gray-400">•</span>
            <span className="text-xs text-gray-400">{new Date(item.listedDate).toLocaleDateString()}</span>
          </div>
          {item.moderationNotes && (
            <div className="mt-2 p-2 bg-gray-50 rounded text-xs">
              <strong>Moderation Notes:</strong> {item.moderationNotes}
            </div>
          )}
        </div>
      </div>
      
      {showActions && item.status === 'pending' && (
        <div className="mt-4 flex space-x-2">
          <button
            onClick={() => handleModeration(item.id, 'approve')}
            className="flex items-center space-x-1 bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors"
          >
            <CheckCircle className="h-4 w-4" />
            <span>Approve</span>
          </button>
          <button
            onClick={() => setSelectedItem(item)}
            className="flex items-center space-x-1 bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
          >
            <XCircle className="h-4 w-4" />
            <span>Reject</span>
          </button>
          <button
            onClick={() => setSelectedItem(item)}
            className="flex items-center space-x-1 bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700 transition-colors"
          >
            <Eye className="h-4 w-4" />
            <span>View Details</span>
          </button>
        </div>
      )}
      
      {showActions && item.status === 'approved' && (
        <div className="mt-4">
          <button
            onClick={() => setSelectedItem(item)}
            className="flex items-center space-x-1 bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
          >
            <AlertTriangle className="h-4 w-4" />
            <span>Remove Item</span>
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <Shield className="h-8 w-8 text-emerald-600" />
          <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
        </div>
        <p className="text-gray-600">Moderate content and manage the ReWear platform</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Pending Review</p>
              <p className="text-2xl font-bold text-yellow-600">{pendingItems.length}</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Items</p>
              <p className="text-2xl font-bold text-blue-600">{items.length}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Active Users</p>
              <p className="text-2xl font-bold text-green-600">{users.length}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <Users className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Approval Rate</p>
              <p className="text-2xl font-bold text-emerald-600">
                {items.length > 0 ? Math.round((approvedItems.length / items.length) * 100) : 0}%
              </p>
            </div>
            <div className="bg-emerald-100 p-3 rounded-lg">
              <TrendingUp className="h-6 w-6 text-emerald-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { key: 'pending', label: 'Pending Review', count: pendingItems.length },
              { key: 'approved', label: 'Approved Items', count: approvedItems.length },
              { key: 'rejected', label: 'Rejected Items', count: rejectedItems.length },
              { key: 'users', label: 'User Management', count: users.length },
              { key: 'analytics', label: 'Analytics', count: null }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.key
                    ? 'border-emerald-500 text-emerald-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
                {tab.count !== null && (
                  <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                    activeTab === tab.key ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Search and Filters */}
        {(activeTab === 'pending' || activeTab === 'approved' || activeTab === 'rejected') && (
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search items, users, or descriptions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          {activeTab === 'pending' && (
            <div className="space-y-4">
              {filteredItems(pendingItems).length > 0 ? (
                filteredItems(pendingItems).map(item => renderItemCard(item))
              ) : (
                <div className="text-center py-8">
                  <CheckCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No pending items</h3>
                  <p className="text-gray-600">All items have been reviewed</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'approved' && (
            <div className="space-y-4">
              {filteredItems(approvedItems).map(item => renderItemCard(item))}
            </div>
          )}

          {activeTab === 'rejected' && (
            <div className="space-y-4">
              {filteredItems(rejectedItems).map(item => renderItemCard(item, false))}
            </div>
          )}

          {activeTab === 'users' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {users.map(user => (
                <div key={user.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">{user.name}</h3>
                      <p className="text-sm text-gray-600">{user.email}</p>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {user.role}
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-500">Points:</span>
                      <span className="ml-1 font-medium">{user.points}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Swaps:</span>
                      <span className="ml-1 font-medium">{user.itemsSwapped}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">CO₂ Saved:</span>
                      <span className="ml-1 font-medium">{user.co2Saved}kg</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Joined:</span>
                      <span className="ml-1 font-medium">{new Date(user.joinDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Item Categories</h3>
                <div className="space-y-2">
                  {categories.slice(1).map(category => {
                    const count = items.filter(item => item.category === category).length;
                    const percentage = items.length > 0 ? (count / items.length) * 100 : 0;
                    return (
                      <div key={category} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{category}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-emerald-600 h-2 rounded-full"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium text-gray-900">{count}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Moderation Stats</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Items:</span>
                    <span className="font-medium">{items.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Approved:</span>
                    <span className="font-medium text-green-600">{approvedItems.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Rejected:</span>
                    <span className="font-medium text-red-600">{rejectedItems.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Pending:</span>
                    <span className="font-medium text-yellow-600">{pendingItems.length}</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="text-gray-600">Approval Rate:</span>
                    <span className="font-medium">
                      {items.length > 0 ? Math.round((approvedItems.length / items.length) * 100) : 0}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Moderation Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Item Details</h2>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <XCircle className="h-6 w-6" />
                </button>
              </div>

              <div className="mb-6">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{selectedItem.title}</h3>
                <p className="text-gray-600 mb-4">{selectedItem.description}</p>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><strong>Brand:</strong> {selectedItem.brand}</div>
                  <div><strong>Category:</strong> {selectedItem.category}</div>
                  <div><strong>Size:</strong> {selectedItem.size}</div>
                  <div><strong>Condition:</strong> {selectedItem.condition}</div>
                  <div><strong>Color:</strong> {selectedItem.color}</div>
                  <div><strong>Points:</strong> {selectedItem.points}</div>
                </div>

                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <img
                      src={selectedItem.owner.avatar}
                      alt={selectedItem.owner.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-medium">{selectedItem.owner.name}</p>
                      <p className="text-sm text-gray-600">{selectedItem.owner.email}</p>
                    </div>
                  </div>
                </div>
              </div>

              {selectedItem.status === 'pending' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Moderation Notes (Optional)
                    </label>
                    <textarea
                      value={moderationReason}
                      onChange={(e) => setModerationReason(e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="Add notes about your decision..."
                    />
                  </div>

                  <div className="flex space-x-4">
                    <button
                      onClick={() => handleModeration(selectedItem.id, 'approve')}
                      className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                    >
                      <CheckCircle className="h-4 w-4" />
                      <span>Approve Item</span>
                    </button>
                    <button
                      onClick={() => handleModeration(selectedItem.id, 'reject')}
                      className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center space-x-2"
                    >
                      <XCircle className="h-4 w-4" />
                      <span>Reject Item</span>
                    </button>
                  </div>
                </div>
              )}

              {selectedItem.status === 'approved' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Reason for Removal
                    </label>
                    <textarea
                      value={moderationReason}
                      onChange={(e) => setModerationReason(e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="Explain why this item should be removed..."
                      required
                    />
                  </div>

                  <button
                    onClick={() => {
                      if (moderationReason.trim()) {
                        onRemoveItem(selectedItem.id, moderationReason);
                        setSelectedItem(null);
                        setModerationReason('');
                      }
                    }}
                    disabled={!moderationReason.trim()}
                    className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <AlertTriangle className="h-4 w-4" />
                    <span>Remove Item</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}