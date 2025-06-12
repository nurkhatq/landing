// components/demo/SocialDemo.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Calendar, Image, Video, MessageSquare, Heart, Users, Send } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Progress } from '@/components/ui/Progress';
import { useAppStore } from '@/store/useAppStore';

const socialPlatforms = [
  { name: 'Instagram', icon: '📸', color: 'bg-pink-500', posts: 0 },
  { name: 'Facebook', icon: '👥', color: 'bg-blue-600', posts: 0 },
  { name: 'Telegram', icon: '✈️', color: 'bg-blue-500', posts: 0 },
  { name: 'LinkedIn', icon: '💼', color: 'bg-blue-700', posts: 0 },
];

const mockPosts = [
  {
    platform: 'Instagram',
    content: '🚀 Новое поступление iPhone 15 Pro! Успейте заказать со скидкой 10% до конца недели!',
    image: '📱',
    engagement: { likes: 247, comments: 23, shares: 12 }
  },
  {
    platform: 'Facebook',
    content: '💻 MacBook Air M3 теперь доступен для предзаказа! Революционная производительность для профессионалов.',
    image: '💻',
    engagement: { likes: 156, comments: 34, shares: 28 }
  },
  {
    platform: 'Telegram',
    content: '⚠️ СРОЧНО! Последние 5 единиц AirPods Pro по специальной цене. Успейте оформить заказ!',
    image: '🎧',
    engagement: { likes: 89, comments: 15, shares: 45 }
  },
  {
    platform: 'LinkedIn',
    content: '📈 Как автоматизация помогла нашим клиентам увеличить продажи на 340%. Изучаем кейс.',
    image: '📊',
    engagement: { likes: 312, comments: 67, shares: 89 }
  }
];

export const SocialDemo = () => {
  const [isPosting, setIsPosting] = useState(false);
  const [platforms, setPlatforms] = useState(socialPlatforms);
  const [currentPost, setCurrentPost] = useState(0);
  const [scheduledPosts, setScheduledPosts] = useState<typeof mockPosts>([]);
  const { addNotification } = useAppStore();

  const startAutoPosting = async () => {
    if (isPosting) return;
    
    setIsPosting(true);
    setScheduledPosts([]);
    setPlatforms(socialPlatforms.map(p => ({ ...p, posts: 0 })));

    for (let i = 0; i < mockPosts.length; i++) {
      const post = mockPosts[i];
      setCurrentPost(i);
      
      // Add to scheduled posts
      setScheduledPosts(prev => [...prev, post]);
      
      // Update platform counter
      setPlatforms(prev => prev.map(p => 
        p.name === post.platform 
          ? { ...p, posts: p.posts + 1 }
          : p
      ));
      
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    setIsPosting(false);
    addNotification({
      type: 'success',
      message: `Автопостинг завершен! Опубликовано ${mockPosts.length} постов в ${socialPlatforms.length} соцсетях.`
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <h3 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-red-600 rounded-xl flex items-center justify-center">
              <Share2 className="w-6 h-6 text-white" />
            </div>
            Автопостинг в соцсети
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">
            Автоматическое размещение контента сразу в несколько социальных сетей
          </p>
          <div className="flex flex-wrap gap-3">
            <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-full text-sm font-medium animate-pulse">
              🔴 LIVE
            </span>
            <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium">
              📅 Отложенный постинг
            </span>
            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
              💵 250,000 ₸
            </span>
          </div>
        </div>
        
        <div className="flex gap-3">
          <Button
            onClick={startAutoPosting}
            disabled={isPosting}
            loading={isPosting}
            icon={<Send className="w-4 h-4" />}
            size="lg"
          >
            {isPosting ? 'Постинг...' : 'Запустить автопостинг'}
          </Button>
          <select className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800">
            <option>Все платформы</option>
            <option>Только Instagram</option>
            <option>Только Facebook</option>
          </select>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Social Platforms Status */}
        <Card className="p-6">
          <h4 className="text-xl font-semibold mb-6 flex items-center gap-2">
            📱 Подключенные соцсети
          </h4>
          
          <div className="space-y-4">
            {platforms.map((platform, index) => (
              <motion.div
                key={platform.name}
                className={`p-4 rounded-xl border-2 transition-all ${
                  platform.posts > 0 
                    ? 'border-green-300 bg-green-50 dark:bg-green-900/20' 
                    : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800'
                }`}
                animate={platform.posts > 0 ? { scale: [1, 1.02, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 ${platform.color} rounded-lg flex items-center justify-center text-white text-lg`}>
                      {platform.icon}
                    </div>
                    <div>
                      <div className="font-semibold">{platform.name}</div>
                      <div className="text-sm text-gray-500">
                        {platform.posts > 0 ? `${platform.posts} постов опубликовано` : 'Ожидание...'}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {platform.posts > 0 && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                      >
                        <span className="text-white text-xs">✓</span>
                      </motion.div>
                    )}
                    <div className={`w-3 h-3 rounded-full ${
                      platform.posts > 0 ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
                    }`} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Posting Progress */}
          {isPosting && (
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-blue-700 dark:text-blue-300">
                  Публикация контента
                </span>
                <span className="text-sm text-blue-600">
                  {currentPost + 1}/{mockPosts.length}
                </span>
              </div>
              <Progress 
                value={(currentPost / mockPosts.length) * 100} 
                variant="gradient" 
                size="md" 
                animated 
              />
            </div>
          )}
        </Card>

        {/* Published Posts */}
        <Card className="p-6">
          <h4 className="text-xl font-semibold mb-6 flex items-center gap-2">
            📝 Опубликованные посты
          </h4>
          
          <div className="space-y-4 max-h-80 overflow-y-auto">
            <AnimatePresence>
              {scheduledPosts.length === 0 && !isPosting && (
                <div className="text-center py-8">
                  <Calendar className="w-16 h-16 mx-auto mb-4 opacity-30" />
                  <p className="text-gray-500">Запустите автопостинг, чтобы увидеть посты</p>
                </div>
              )}
              
              {scheduledPosts.map((post, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">{post.image}</span>
                      <span className="font-semibold text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                        {post.platform}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">
                      {new Date().toLocaleTimeString('ru-RU')}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                    {post.content}
                  </p>
                  
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Heart className="w-3 h-3" />
                      <span>{post.engagement.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageSquare className="w-3 h-3" />
                      <span>{post.engagement.comments}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Share2 className="w-3 h-3" />
                      <span>{post.engagement.shares}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </Card>
      </div>

      {/* Analytics Dashboard */}
      {scheduledPosts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="p-6 bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20">
            <h4 className="text-xl font-semibold mb-6 text-center">📊 Аналитика автопостинга</h4>
            
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Send className="w-8 h-8 text-white" />
                </div>
                <div className="text-2xl font-bold text-blue-600 mb-1">{scheduledPosts.length}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Постов опубликовано</div>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <div className="text-2xl font-bold text-pink-600 mb-1">
                  {scheduledPosts.reduce((sum, post) => sum + post.engagement.likes, 0)}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Лайков получено</div>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div className="text-2xl font-bold text-green-600 mb-1">
                  {scheduledPosts.reduce((sum, post) => sum + post.engagement.shares, 0)}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Репостов</div>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <MessageSquare className="w-8 h-8 text-white" />
                </div>
                <div className="text-2xl font-bold text-purple-600 mb-1">85%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Охват аудитории</div>
              </div>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  );
};