// components/demo/WhatsAppDemo.tsx - MOBILE OPTIMIZED
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Power, MessageCircle, Send, Phone, Video, MoreVertical, Smile } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useDemoStore } from '@/store/useDemoStore';
import { useAppStore } from '@/store/useAppStore';
import { useMediaQuery } from '@/hooks/useMediaQuery';

const quickMessages = [
  'Хочу заказать iPhone 15',
  'Где мой заказ №12345?',
  'Нужна помощь с возвратом',
  'Связать с оператором'
];

const botResponses: Record<string, string> = {
  'iphone': '📱 Отличный выбор! iPhone 15 Pro доступен. Цена: 649,900 ₸. Хотите оформить заказ?',
  'заказ': '🛒 Для заказа нужен номер телефона и адрес доставки. Рассчитаю стоимость доставки.',
  '12345': '🚚 Заказ №12345 в пути. Ожидаемая доставка: завтра до 18:00. Курьер позвонит за час.',
  'возврат': '↩️ Возврат возможен в течение 14 дней. Нужна причина и фото товара. Оформлю заявку.',
  'оператор': '👤 Подключаю менеджера... Среднее время: 2 минуты. Пока жду, отвечу на вопросы.',
  'default': '🤝 Спасибо! Обработал запрос и передам менеджеру. Что-то еще могу помочь?'
};

export const WhatsAppDemo = () => {
  const [inputValue, setInputValue] = useState('');
  const isMobile = useMediaQuery('(max-width: 768px)');
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

  const activateBot = () => {
    setBotActive(true);
    resetDemo('whatsapp');
    
    setTimeout(() => {
      addWhatsappMessage({
        text: '🤖 Бот активирован! Готов помочь клиентам 24/7. Используйте быстрые кнопки для тестирования.',
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
      setTimeout(() => {
        const response = generateBotResponse(text);
        addWhatsappMessage({ text: response, sender: 'bot' });
        
        updateWhatsappStats({
          orders: whatsappStats.orders + (text.includes('заказ') ? 1 : 0)
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

  return (
    <div className={`space-y-${isMobile ? '6' : '8'}`}>
      {/* Header */}
      <div className={`${isMobile ? 'space-y-4' : 'flex justify-between items-start gap-6'}`}>
        <div className="flex-1">
          <h3 className={`${isMobile ? 'text-xl' : 'text-3xl'} font-bold mb-2 flex items-center gap-3`}>
            <div className={`${isMobile ? 'w-10 h-10' : 'w-12 h-12'} bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center`}>
              <MessageCircle className={`${isMobile ? 'w-5 h-5' : 'w-6 h-6'} text-white`} />
            </div>
            {isMobile ? 'WhatsApp бот' : 'WhatsApp бот для продаж'}
          </h3>
          <p className={`text-gray-600 dark:text-gray-400 ${isMobile ? 'text-sm mb-3' : 'text-lg mb-4'}`}>
            {isMobile 
              ? 'Умный ассистент для заказов 24/7'
              : 'Умный ассистент для автоматической обработки заказов и поддержки клиентов'
            }
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-full text-xs font-medium animate-pulse">
              🔴 LIVE
            </span>
            <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-xs font-medium">
              🕐 24/7
            </span>
            <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium">
              💵 300,000 ₸
            </span>
          </div>
        </div>
        
        <div className={`flex ${isMobile ? 'w-full justify-between' : 'items-center gap-4'}`}>
          <div className="text-right">
            <div className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium ${botActive ? 'text-green-600' : 'text-gray-500'}`}>
              {botActive ? 'Онлайн' : 'Оффлайн'}
            </div>
            <div className={`w-3 h-3 rounded-full ${botActive ? 'bg-green-500 animate-pulse' : 'bg-gray-400'} ${isMobile ? 'mx-0 mt-1' : 'mx-auto mt-1'}`} />
          </div>
          <Button
            onClick={activateBot}
            disabled={botActive}
            icon={<Power className="w-4 h-4" />}
            size={isMobile ? "sm" : "lg"}
            variant={botActive ? 'secondary' : 'primary'}
          >
            {botActive ? (isMobile ? 'Активен' : 'Бот активен') : (isMobile ? 'Активировать' : 'Активировать бота')}
          </Button>
        </div>
      </div>

      <div className={`${isMobile ? 'space-y-6' : 'grid lg:grid-cols-2 gap-8'}`}>
        {/* Phone Mockup */}
        <div className="flex justify-center">
          <div className="relative">
            {/* Phone Frame */}
            <div className={`${isMobile ? 'w-full max-w-sm h-[500px]' : 'w-80 h-[600px]'} bg-black rounded-3xl p-2 shadow-2xl`}>
              <div className="w-full h-full bg-gray-100 dark:bg-gray-900 rounded-[1.5rem] overflow-hidden flex flex-col">
                {/* WhatsApp Header */}
                <div className="bg-green-600 text-white p-3 md:p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-2 md:space-x-3">
                    <div className={`${isMobile ? 'w-8 h-8' : 'w-10 h-10'} bg-green-700 rounded-full flex items-center justify-center`}>
                      <MessageCircle className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} />
                    </div>
                    <div>
                      <div className={`font-semibold ${isMobile ? 'text-sm' : ''}`}>Бизнес Ассистент</div>
                      <div className="text-xs opacity-90">
                        {botActive ? 'онлайн' : 'оффлайн'}
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2 md:space-x-4">
                    <Video className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} />
                    <Phone className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} />
                    <MoreVertical className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} />
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="flex-1 p-3 md:p-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                  <div className="space-y-3 md:space-y-4">
                    {!botActive && whatsappMessages.length === 0 && (
                      <div className="text-center py-8 md:py-16 text-gray-500">
                        <MessageCircle className={`${isMobile ? 'w-12 h-12' : 'w-16 h-16'} mx-auto mb-4 opacity-50`} />
                        <p className="text-xs md:text-sm">Активируйте бота для начала</p>
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
                            ${isMobile ? 'max-w-[85%]' : 'max-w-xs'} px-3 py-2 rounded-lg text-sm
                            ${message.sender === 'user' 
                              ? 'bg-green-500 text-white rounded-br-none' 
                              : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-none shadow-sm'
                            }
                          `}>
                            <p className={isMobile ? 'text-xs' : 'text-sm'}>{message.text}</p>
                            <div className={`text-xs mt-1 ${
                              message.sender === 'user' ? 'text-green-100' : 'text-gray-500'
                            }`}>
                              {message.timestamp}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Input Area */}
                <div className="p-3 md:p-4 bg-white dark:bg-gray-800 border-t">
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage(inputValue)}
                      placeholder={botActive ? "Сообщение..." : "Активируйте бота"}
                      disabled={!botActive}
                      className={`flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed ${isMobile ? 'text-sm' : ''}`}
                    />
                    <Button
                      onClick={() => sendMessage(inputValue)}
                      disabled={!botActive || !inputValue.trim()}
                      size="sm"
                      className="rounded-full w-8 h-8 p-0"
                    >
                      <Send className="w-3 h-3" />
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
        <div className="space-y-4 md:space-y-6">
          {/* Quick Actions */}
          <Card className={`${isMobile ? 'p-4' : 'p-6'}`}>
            <h4 className={`font-semibold mb-4 ${isMobile ? 'text-base' : 'text-lg'}`}>🚀 Быстрые тесты</h4>
            <div className={`grid ${isMobile ? 'grid-cols-1 gap-2' : 'grid-cols-2 gap-3'}`}>
              {quickMessages.map((message) => (
                <Button
                  key={message}
                  onClick={() => handleQuickMessage(message)}
                  disabled={!botActive}
                  variant="outline"
                  size="sm"
                  className={`text-left justify-start h-auto py-3 px-4 ${isMobile ? 'text-xs' : ''}`}
                >
                  <div className={`text-left ${isMobile ? 'text-xs' : 'text-xs'}`}>
                    {isMobile && message.length > 25 ? `${message.slice(0, 25)}...` : message}
                  </div>
                </Button>
              ))}
            </div>
          </Card>

          {/* Analytics */}
          <Card className={`${isMobile ? 'p-4' : 'p-6'}`}>
            <h4 className={`font-semibold mb-4 ${isMobile ? 'text-base' : 'text-lg'}`}>📊 Аналитика бота</h4>
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <div className="text-center p-3 md:p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                <MessageCircle className={`${isMobile ? 'w-5 h-5' : 'w-6 h-6'} text-blue-500 mx-auto mb-2`} />
                <div className={`font-bold text-blue-600 ${isMobile ? 'text-base' : 'text-xl'}`}>{whatsappStats.messages}</div>
                <div className={`text-gray-600 dark:text-gray-400 ${isMobile ? 'text-xs' : 'text-xs'}`}>Сообщений</div>
              </div>
              
              <div className="text-center p-3 md:p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                <div className={`font-bold text-green-600 ${isMobile ? 'text-base' : 'text-xl'}`}>{whatsappStats.responseTime}с</div>
                <div className={`text-gray-600 dark:text-gray-400 ${isMobile ? 'text-xs' : 'text-xs'}`}>Ответ</div>
              </div>
              
              <div className="text-center p-3 md:p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                <div className={`font-bold text-purple-600 ${isMobile ? 'text-base' : 'text-xl'}`}>{whatsappStats.orders}</div>
                <div className={`text-gray-600 dark:text-gray-400 ${isMobile ? 'text-xs' : 'text-xs'}`}>Заказов</div>
              </div>
              
              <div className="text-center p-3 md:p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl">
                <div className={`font-bold text-orange-600 ${isMobile ? 'text-base' : 'text-xl'}`}>{whatsappStats.satisfaction}%</div>
                <div className={`text-gray-600 dark:text-gray-400 ${isMobile ? 'text-xs' : 'text-xs'}`}>Довольны</div>
              </div>
            </div>
          </Card>

          {/* AI Features */}
          <Card className={`${isMobile ? 'p-4' : 'p-6'}`}>
            <h4 className={`font-semibold mb-4 ${isMobile ? 'text-base' : 'text-lg'}`}>🧠 AI возможности</h4>
            <div className="space-y-3">
              {[
                { name: 'Понимание языка', value: 94, color: 'bg-green-500' },
                { name: 'Обработка заказов', value: 89, color: 'bg-blue-500' },
                { name: 'Эмпатия в ответах', value: 76, color: 'bg-purple-500' }
              ].map((skill) => (
                <div key={skill.name} className="flex items-center justify-between p-2 md:p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <span className={`${isMobile ? 'text-xs' : 'text-sm'}`}>{skill.name}</span>
                  <div className="flex items-center space-x-2">
                    <div className={`${isMobile ? 'w-12 h-1.5' : 'w-16 h-2'} bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden`}>
                      <div className={`h-full ${skill.color} rounded-full`} style={{ width: `${skill.value}%` }} />
                    </div>
                    <span className={`text-gray-500 ${isMobile ? 'text-xs' : 'text-xs'}`}>{skill.value}%</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
