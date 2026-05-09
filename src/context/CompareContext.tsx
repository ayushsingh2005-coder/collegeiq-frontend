'use client';
import { createContext, useContext, useState, ReactNode } from 'react';
import { College } from '../lib/api';

interface CompareContextType {
  compareList: College[];
  addToCompare: (college: College) => void;
  removeFromCompare: (id: number) => void;
  clearCompare: () => void;
  isInCompare: (id: number) => boolean;
}

const CompareContext = createContext<CompareContextType>({
  compareList: [], addToCompare: () => {}, removeFromCompare: () => {},
  clearCompare: () => {}, isInCompare: () => false,
});

export const CompareProvider = ({ children }: { children: ReactNode }) => {
  const [compareList, setCompareList] = useState<College[]>([]);

  const addToCompare = (college: College) => {
    if (compareList.length >= 3) return;
    if (!compareList.find(c => c.id === college.id))
      setCompareList(prev => [...prev, college]);
  };

  const removeFromCompare = (id: number) =>
    setCompareList(prev => prev.filter(c => c.id !== id));

  const clearCompare = () => setCompareList([]);

  const isInCompare = (id: number) => !!compareList.find(c => c.id === id);

  return (
    <CompareContext.Provider value={{ compareList, addToCompare, removeFromCompare, clearCompare, isInCompare }}>
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => useContext(CompareContext);