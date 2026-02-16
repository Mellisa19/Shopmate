'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { User, ShoppingBag, LogOut, MessageCircle, Package, CreditCard, Settings } from 'lucide-react';
import ChatAssistant from '@/components/ChatAssistant';

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('user_token');
    const userData = localStorage.getItem('user_data');

    if (!token || !userData) {
      router.push('/auth/signin');
      return;
    }

    setUser(JSON.parse(userData));
    fetchUserOrders(JSON.parse(userData).id);
  }, [router]);

  const fetchUserOrders = async (userId: string) => {
    try {
      const response = await fetch('/api/orders/user', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('user_token')}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setOrders(data.orders || []);
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user_token');
    localStorage.removeItem('user_data');
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto"></div>
          <p className="mt-4 text-zinc-600 dark:text-zinc-400">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      {/* Header */}
      <header className="bg-white dark:bg-zinc-800 shadow-sm border-b border-zinc-200 dark:border-zinc-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-2xl font-bold text-amber-500">
                ShopMate
              </Link>
              <nav className="hidden md:flex space-x-8">
                <Link href="/dashboard" className="text-zinc-700 dark:text-zinc-300 hover:text-amber-500">
                  Dashboard
                </Link>
                <Link href="/" className="text-zinc-700 dark:text-zinc-300 hover:text-amber-500">
                  Shop
                </Link>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-zinc-600 dark:text-zinc-400">
                Welcome, {user.first_name}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-zinc-600 dark:text-zinc-400 hover:text-red-600"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-amber-400 to-amber-600 rounded-lg p-6 mb-8 text-white">
          <h1 className="text-2xl font-bold mb-2">
            Welcome back, {user.first_name}! 👋
          </h1>
          <p className="opacity-90">
            Manage your orders, get personalized recommendations, and access AI shopping assistant.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="p-3 bg-amber-100 dark:bg-amber-900/20 rounded-full">
                    <ShoppingBag className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">Total Orders</p>
                    <p className="text-2xl font-bold text-zinc-900 dark:text-white">
                      {orders.length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-full">
                    <Package className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">Delivered</p>
                    <p className="text-2xl font-bold text-zinc-900 dark:text-white">
                      {orders.filter(o => o.status === 'delivered').length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-full">
                    <CreditCard className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">Total Spent</p>
                    <p className="text-2xl font-bold text-zinc-900 dark:text-white">
                      ${orders.reduce((sum, order) => sum + parseFloat(order.total || 0), 0).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white dark:bg-zinc-800 rounded-lg shadow">
              <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-700">
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
                  Recent Orders
                </h2>
              </div>
              <div className="p-6">
                {orders.length === 0 ? (
                  <div className="text-center py-8">
                    <Package className="h-12 w-12 text-zinc-400 mx-auto mb-4" />
                    <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                      You haven't placed any orders yet
                    </p>
                    <Link
                      href="/"
                      className="inline-flex items-center px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-md"
                    >
                      Start Shopping
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.slice(0, 5).map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-4 border border-zinc-200 dark:border-zinc-700 rounded-lg">
                        <div>
                          <p className="font-medium text-zinc-900 dark:text-white">
                            Order #{order.id.slice(0, 8)}
                          </p>
                          <p className="text-sm text-zinc-600 dark:text-zinc-400">
                            {new Date(order.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-zinc-900 dark:text-white">
                            ${order.total}
                          </p>
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                            order.status === 'delivered' 
                              ? 'bg-green-100 text-green-800' 
                              : order.status === 'shipped'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                    ))}
                    {orders.length > 5 && (
                      <div className="text-center pt-4">
                        <button className="text-amber-500 hover:text-amber-600 text-sm">
                          View all orders →
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Quick Actions */}
            <div className="bg-white dark:bg-zinc-800 rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <Link
                  href="/"
                  className="flex items-center space-x-3 text-zinc-700 dark:text-zinc-300 hover:text-amber-500 p-2 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-700"
                >
                  <ShoppingBag className="h-5 w-5" />
                  <span>Browse Products</span>
                </Link>
                <button className="flex items-center space-x-3 text-zinc-700 dark:text-zinc-300 hover:text-amber-500 p-2 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-700 w-full text-left">
                  <Settings className="h-5 w-5" />
                  <span>Account Settings</span>
                </button>
              </div>
            </div>

            {/* AI Assistant Card */}
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 rounded-lg p-6 border border-amber-200 dark:border-amber-700">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-amber-500 rounded-full">
                  <MessageCircle className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-zinc-900 dark:text-white">
                    AI Shopping Assistant
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    Your personal shopping helper
                  </p>
                </div>
              </div>
              <p className="text-sm text-zinc-700 dark:text-zinc-300 mb-4">
                Get personalized product recommendations, ask questions about items, and receive shopping advice powered by AI.
              </p>
              <div className="text-xs text-amber-600 dark:text-amber-400 font-medium">
                ✨ Exclusive feature for registered users
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* AI Assistant */}
      <ChatAssistant />
    </div>
  );
}
