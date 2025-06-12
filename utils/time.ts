// utils/time.ts
export const formatTime = (date?: Date) => {
  if (typeof window === 'undefined') {
    // На сервере возвращаем пустую строку или фиксированное время
    return '--:--:--';
  }
  
  const now = date || new Date();
  return now.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
};

export const formatTimeShort = (date?: Date) => {
  if (typeof window === 'undefined') {
    return '--:--';
  }
  
  const now = date || new Date();
  return now.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit'
  });
};