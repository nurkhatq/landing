// components/demo/WhatsAppDemo.tsx - UPDATED (исправлена проблема с hydration)
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Power, MessageCircle, Send, Phone, Video, MoreVertical, Smile } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ClientOnly } from '@/components/ui/ClientOnly';
import { useDemoStore } from '@/store/useDemoStore';
import { useAppStore } from '@/store/useAppStore';

const quickMessages = [
  'Хочу заказать iPhone 15',
  'Где мой заказ №12345?',
  'Нужна помощь с возвратом',
  'Связать с оператором'
];

const botResponses: Record<string, string> = {
  'iphone': '📱 Отличный выбор! iPhone 15 Pro доступен в наличии. Цена: 649,900 ₸. Хотите оформить заказ?',
  'заказ': '🛒 Для оформления заказа нужен ваш номер телефона и адрес доставки. Также могу рассчитать стоимость доставки.',
  '12345': '🚚 Ваш заказ №12345 находится в пути. Ожидаемая доставка: завтра до 18:00. Курьер свяжется за час до прибытия.',
  'возврат': '↩️ Возврат возможен в течение 14 дней. Нужна причина возврата и фото товара. Могу оформить заявку прямо сейчас.',
  'оператор': '👤 Подключаю менеджера... Среднее время ожидания: 2 минуты. Пока ждете, могу ответить на базовые вопросы.',
  'default': '🤝 Спасибо за обращение! Я обработал ваш запрос и передам информацию менеджеру. Что-то еще могу помочь?'
};

export const WhatsAppDemo = () => {
  const [inputValue, setInputValue] = useState('');
  const [mounted, setMounted] = useState(false);
  const { 
    whatsappMessages, 
    whatsappStats, 
    botActive, 
    addWhatsappMessage, 
    updateWhatsappStats,
    setBotActive,
    resetDemo 
  } = useDemoStore();
  const { addNotification } = useAppStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const activateBot = () => {
    setBotActive(true);
    resetDemo('whatsapp');
    
    setTimeout(() => {
      addWhatsappMessage({
        text: '🤖 Бот активирован! Я готов помочь вашим клиентам 24/7. Нажмите на быстрые кнопки ниже для тестирования.',
        sender: 'bot'
      });
    }, 1000);
    
    addNotification({
      type: 'success',
      message: 'WhatsApp бот активирован! Готов к обработке сообщений.'
    });
  };

  const sendMessage = (text: string, sender: 'user' | 'bot' = 'user') => {
    if (!text.trim()) return;

    addWhatsappMessage({ text, sender });
    
    if (sender === 'user') {
      // Auto-generate bot response
      setTimeout(() => {
        const response = generateBotResponse(text);
        addWhatsappMessage({ text: response, sender: 'bot' });
        
        // Update stats
        updateWhatsappStats({
          orders: whatsappStats.orders + (text.toLowerCase().includes('заказ') ? 1 : 0)
        });
      }, Math.random() * 1000 + 500);
    }
    
    setInputValue('');
  };

  const generateBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    for (const [key, response] of Object.entries(botResponses)) {
      if (key !== 'default' && message.includes(key)) {
        return response;
      }
    }
    
    return botResponses.default;
  };

  const handleQuickMessage = (message: string) => {
    if (botActive) {
      sendMessage(message, 'user');
    }
  };

  if (!mounted) {
    return (
      <div className="space-y-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <h3 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            WhatsApp бот для продаж
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">
            Умный ассистент для автоматической обработки заказов и поддержки клиентов
          </p>
          <div className="flex flex-wrap gap-3">
            <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-full text-sm font-medium animate-pulse">
              🔴 LIVE
            </span>
            <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-medium">
              🕐 24/7 доступность
            </span>
            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
              💵 300,000 ₸
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className={`text-sm font-medium ${botActive ? 'text-green-600' : 'text-gray-500'}`}>
              Статус: {botActive ? 'Онлайн' : 'Оффлайн'}
            </div>
            <div className={`w-3 h-3 rounded-full ${botActive ? 'bg-green-500 animate-pulse' : 'bg-gray-400'} mx-auto mt-1`} />
          </div>
          <Button
            onClick={activateBot}
            disabled={botActive}
            icon={<Power className="w-4 h-4" />}
            size="lg"
            variant={botActive ? 'secondary' : 'primary'}
          >
            {botActive ? 'Бот активен' : 'Активировать бота'}
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Phone Mockup */}
        <div className="flex justify-center">
          <div className="relative">
            {/* Phone Frame */}
            <div className="w-80 h-[600px] bg-black rounded-[3rem] p-2 shadow-2xl">
              <div className="w-full h-full bg-gray-100 dark:bg-gray-900 rounded-[2.5rem] overflow-hidden flex flex-col">
                {/* WhatsApp Header */}
                <div className="bg-green-600 text-white p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-700 rounded-full flex items-center justify-center">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-semibold">Бизнес Ассистент</div>
                      <div className="text-xs opacity-90">
                        {botActive ? 'онлайн' : 'оффлайн'}
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-4">
                    <Video className="w-5 h-5" />
                    <Phone className="w-5 h-5" />
                    <MoreVertical className="w-5 h-5" />
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="flex-1 p-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                  <div className="space-y-4">
                    {!botActive && whatsappMessages.length === 0 && (
                      <div className="text-center py-16 text-gray-500">
                        <MessageCircle className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p className="text-sm">Активируйте бота, чтобы начать общение</p>
                      </div>
                    )}
                    
                    <AnimatePresence>
                      {whatsappMessages.map((message) => (
                        <motion.div
                          key={message.id}
                          initial={{ opacity: 0, y: 20, scale: 0.8 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`
                            max-w-xs px-4 py-2 rounded-lg text-sm
                            ${message.sender === 'user' 
                              ? 'bg-green-500 text-white rounded-br-none' 
                              : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-none shadow-sm'
                            }
                          `}>
                            <p>{message.text}</p>
                            <div className={`text-xs mt-1 ${
                              message.sender === 'user' ? 'text-green-100' : 'text-gray-500'
                            }`}>
                              <ClientOnly fallback="--:--">
                                {message.timestamp}
                              </ClientOnly>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Input Area */}
                <div className="p-4 bg-white dark:bg-gray-800 border-t">
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage(inputValue)}
                      placeholder={botActive ? "Введите сообщение..." : "Активируйте бота"}
                      disabled={!botActive}
                      className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                    <Button
                      onClick={() => sendMessage(inputValue)}
                      disabled={!botActive || !inputValue.trim()}
                      size="sm"
                      className="rounded-full w-10 h-10 p-0"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 blur-2xl -z-10 animate-pulse" />
          </div>
        </div>

        {/* Controls and Analytics */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card className="p-6">
            <h4 className="text-lg font-semibold mb-4">🚀 Быстрые тесты</h4>
            <div className="grid grid-cols-2 gap-3">
              {quickMessages.map((message) => (
                <Button
                  key={message}
                  onClick={() => handleQuickMessage(message)}
                  disabled={!botActive}
                  variant="outline"
                  size="sm"
                  className="text-left justify-start h-auto py-3 px-4"
                >
                  <div className="text-xs text-left">
                    {message}
                  </div>
                </Button>
              ))}
            </div>
          </Card>

          {/* Analytics */}
          <Card className="p-6">
            <h4 className="text-lg font-semibold mb-4">📊 Аналитика бота</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                <MessageCircle className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                <div className="text-xl font-bold text-blue-600">{whatsappStats.messages}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Сообщений</div>
              </div>
              
              <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                <div className="text-xl font-bold text-green-600">{whatsappStats.responseTime}с</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Время ответа</div>
              </div>
              
              <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                <div className="text-xl font-bold text-purple-600">{whatsappStats.orders}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Заказов</div>
              </div>
              
              <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl">
                <div className="text-xl font-bold text-orange-600">{whatsappStats.satisfaction}%</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Довольны</div>
              </div>
            </div>
          </Card>

          {/* AI Features */}
          <Card className="p-6">
            <h4 className="text-lg font-semibold mb-4">🧠 AI возможности</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <span className="text-sm">Понимание естественного языка</span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className="w-[94%] h-full bg-green-500 rounded-full" />
                  </div>
                  <span className="text-xs text-gray-500">94%</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <span className="text-sm">Обработка заказов</span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className="w-[89%] h-full bg-blue-500 rounded-full" />
                  </div>
                  <span className="text-xs text-gray-500">89%</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <span className="text-sm">Эмпатия в ответах</span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className="w-[76%] h-full bg-purple-500 rounded-full" />
                  </div>
                  <span className="text-xs text-gray-500">76%</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};