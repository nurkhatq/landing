import { useEffect, useLayoutEffect } from 'react';

// Используем useLayoutEffect на клиенте, useEffect на сервере
export const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;
