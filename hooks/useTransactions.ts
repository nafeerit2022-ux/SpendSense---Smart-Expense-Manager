import { useState, useEffect, useCallback } from 'react';
import { Transaction, Budget, Category, TransactionType } from '../types';

const defaultTransactions: Transaction[] = [
    { id: '1', type: TransactionType.INCOME, amount: 2500, category: Category.SALARY, date: new Date(new Date().setDate(1)).toISOString().split('T')[0] },
    { id: '2', type: TransactionType.EXPENSE, amount: 50.75, category: Category.FOOD, date: new Date(new Date().setDate(2)).toISOString().split('T')[0], note: 'Groceries' },
    { id: '3', type: TransactionType.EXPENSE, amount: 22.50, category: Category.TRAVEL, date: new Date(new Date().setDate(3)).toISOString().split('T')[0], note: 'Metro pass' },
    { id: '4', type: TransactionType.EXPENSE, amount: 120.00, category: Category.SHOPPING, date: new Date(new Date().setDate(5)).toISOString().split('T')[0], note: 'New shoes' },
    { id: '5', type: TransactionType.EXPENSE, amount: 800, category: Category.RENT, date: new Date(new Date().setDate(1)).toISOString().split('T')[0] },
];

const defaultBudget: Budget = { amount: 2000 };

export const useTransactions = (currentUser: string | null) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [budget, setBudgetState] = useState<Budget>(defaultBudget);

  // Load data when user changes (login/logout)
  useEffect(() => {
    if (!currentUser) {
      setTransactions([]);
      setBudgetState(defaultBudget);
      return;
    }
    
    const TRANSACTIONS_KEY = `transactions_${currentUser}`;
    const BUDGET_KEY = `budget_${currentUser}`;
    
    try {
      const storedTransactions = window.localStorage.getItem(TRANSACTIONS_KEY);
      // For a new user, provide default transactions to get them started
      setTransactions(storedTransactions ? JSON.parse(storedTransactions) : defaultTransactions);
      
      const storedBudget = window.localStorage.getItem(BUDGET_KEY);
      setBudgetState(storedBudget ? JSON.parse(storedBudget) : defaultBudget);
    } catch (error) {
      console.error('Error reading data from localStorage', error);
      setTransactions(defaultTransactions);
      setBudgetState(defaultBudget);
    }
  }, [currentUser]);

  // Save transactions when they change
  useEffect(() => {
    if (!currentUser) return;
    try {
      const TRANSACTIONS_KEY = `transactions_${currentUser}`;
      window.localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(transactions));
    } catch (error) {
      console.error('Error writing transactions to localStorage', error);
    }
  }, [transactions, currentUser]);

  // Save budget when it changes
  useEffect(() => {
    if (!currentUser) return;
    try {
      const BUDGET_KEY = `budget_${currentUser}`;
      window.localStorage.setItem(BUDGET_KEY, JSON.stringify(budget));
    } catch (error) {
      console.error('Error writing budget to localStorage', error);
    }
  }, [budget, currentUser]);

  const addTransaction = useCallback((transaction: Transaction) => {
    setTransactions(prev => {
        const existing = prev.find(t => t.id === transaction.id);
        if (existing) {
            return prev.map(t => t.id === transaction.id ? transaction : t);
        }
        return [...prev, transaction];
    });
  }, []);

  const deleteTransaction = useCallback((id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  }, []);

  const setBudget = useCallback((newBudget: Budget) => {
    setBudgetState(newBudget);
  }, []);

  const clearAllData = useCallback(() => {
    if (!currentUser) return;
    const TRANSACTIONS_KEY = `transactions_${currentUser}`;
    const BUDGET_KEY = `budget_${currentUser}`;
    
    setTransactions([]);
    setBudgetState(defaultBudget);
    window.localStorage.removeItem(TRANSACTIONS_KEY);
    window.localStorage.removeItem(BUDGET_KEY);
  }, [currentUser]);

  return { transactions, addTransaction, deleteTransaction, budget, setBudget, clearAllData };
};
