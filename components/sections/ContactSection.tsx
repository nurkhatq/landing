// components/sections/ContactSection.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Send, Phone, Mail, MapPin, Clock, MessageCircle, User, Building, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useAppStore } from '@/store/useAppStore';

interface ContactFormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  service: string;
  message: string;
  budget: string;
  urgency: string;
}

const services = [
  'WhatsApp бот',
  'Telegram бот',
  'Excel автоматизация',
  'Kaspi парсер',
  '1С интеграция',
  'AI ассистент',
  'Другое'
];

const budgetRanges = [
  'до 100,000 ₸',
  '100,000 - 300,000 ₸',
  '300,000 - 500,000 ₸',
  '500,000 - 1,000,000 ₸',
  'свыше 1,000,000 ₸'
];

const urgencyOptions = [
  'Не срочно (1-2 месяца)',
  'Средняя (2-4 недели)',
  'Высокая (1-2 недели)',
  'Критическая (до недели)'
];

export const ContactSection = () => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addNotification } = useAppStore();
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    addNotification({
      type: 'success',
      message: 'Заявка отправлена! Свяжусь с вами в течение 2 часов.',
      duration: 8000
    });
    
    reset();
    setIsSubmitting(false);
  };

  return (
    <section 
      id="contact"
      ref={ref}
      className="py-20 bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-primary-900/10 dark:via-gray-900 dark:to-secondary-900/10 relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-cyber-grid bg-cyber-grid-size opacity-20" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <Badge variant="primary" size="lg" className="mb-6">
            <span className="mr-2">🚀</span>
            Начнем сотрудничество
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-display font-bold mb-6">
            Готовы <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">автоматизировать</span> ваш бизнес?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Оставьте заявку и получите персональную консультацию в течение 2 часов
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-8 bg-white/80 backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
                  <Send className="w-5 h-5 text-white" />
                </div>
                Оставить заявку
              </h3>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Ваше имя *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        {...register('name', { required: 'Имя обязательно' })}
                        type="text"
                        placeholder="Нурхат"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                    </div>
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        {...register('email', { 
                          required: 'Email обязателен',
                          pattern: {
                            value: /^\S+@\S+$/i,
                            message: 'Неверный формат email'
                          }
                        })}
                        type="email"
                        placeholder="nurkhat@example.com"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Компания
                    </label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        {...register('company')}
                        type="text"
                        placeholder="ТОО Ваша компания"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Телефон
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        {...register('phone')}
                        type="tel"
                        placeholder="+7 777 777 77 77"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Интересующая услуга
                  </label>
                  <select
                    {...register('service')}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  >
                    <option value="">Выберите услугу</option>
                    {services.map((service) => (
                      <option key={service} value={service}>{service}</option>
                    ))}
                  </select>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Бюджет проекта
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <select
                        {...register('budget')}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      >
                        <option value="">Выберите бюджет</option>
                        {budgetRanges.map((budget) => (
                          <option key={budget} value={budget}>{budget}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Срочность
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <select
                        {...register('urgency')}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      >
                        <option value="">Выберите срочность</option>
                        {urgencyOptions.map((urgency) => (
                          <option key={urgency} value={urgency}>{urgency}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Описание задачи
                  </label>
                  <textarea
                    {...register('message')}
                    rows={4}
                    placeholder="Расскажите подробнее о вашей задаче..."
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  loading={isSubmitting}
                  disabled={isSubmitting}
                  icon={<Send className="w-5 h-5" />}
                  glow
                >
                  {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  Отправляя заявку, вы соглашаетесь на обработку персональных данных
                </p>
              </form>
            </Card>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="space-y-8"
          >
            {/* Contact Methods */}
            <Card className="p-8 bg-gradient-to-br from-primary-500 to-secondary-500 text-white">
              <h3 className="text-2xl font-bold mb-6">Свяжитесь со мной прямо сейчас</h3>
              
              <div className="space-y-6">
                <motion.a
                  href="https://wa.me/77761667329"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 p-4 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold">WhatsApp</div>
                    <div className="text-sm opacity-90">+7 776 166 73 29</div>
                    <div className="text-xs opacity-80">Ответ в течение 5 минут</div>
                  </div>
                </motion.a>

                <motion.a
                  href="https://t.me/NURKHAT_tech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 p-4 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                    <Send className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold">Telegram</div>
                    <div className="text-sm opacity-90">@nurkhatq</div>
                    <div className="text-xs opacity-80">Самый быстрый способ связи</div>
                  </div>
                </motion.a>

                <motion.a
                  href="mailto:nurkhat@techautomation.kz"
                  className="flex items-center space-x-4 p-4 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold">Email</div>
                    <div className="text-sm opacity-90">duzelbaevnurkhat@gmail.com</div>
                    <div className="text-xs opacity-80">Для официальных запросов</div>
                  </div>
                </motion.a>
              </div>
            </Card>

            {/* Business Hours */}
            <Card className="p-6">
              <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary-500" />
                Время работы
              </h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Понедельник - Пятница:</span>
                  <span className="font-medium">09:00 - 20:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Суббота:</span>
                  <span className="font-medium">10:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Воскресенье:</span>
                  <span className="font-medium">По договоренности</span>
                </div>
                <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-2 text-green-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="font-medium">Сейчас онлайн</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Location */}
            <Card className="p-6">
              <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary-500" />
                Местоположение
              </h4>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <p className="mb-2">🏙️ Астана, Казахстан</p>
                <p className="mb-4">Работаю удаленно по всему Казахстану</p>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                  <p className="text-blue-700 dark:text-blue-300 font-medium">
                    💻 Онлайн встречи в любое удобное время
                  </p>
                </div>
              </div>
            </Card>

            {/* Quick Stats */}
            <Card className="p-6 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20">
              <h4 className="text-lg font-semibold mb-4">⚡ Почему выбирают меня</h4>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-green-600">2ч</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Время ответа</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">156</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Проектов</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">99%</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Довольных</div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};