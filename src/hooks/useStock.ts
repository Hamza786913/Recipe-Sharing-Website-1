import { useState, useEffect } from 'react';

export interface StockItem {
  name: string;
  img: string;
  category: string;
  time: string;
  price: number;
  rating: number;
  badge: string;
  stock: string;
  status: string;
  description?: string;
}

const INITIAL_STOCK: StockItem[] = [
  { name: 'Biryani', img: 'biryani.jpg', category: 'Rice', time: '40 min', price: 12.99, rating: 4.8, badge: 'bg-blue-100 text-blue-700', stock: '24 units', status: 'In Stock' },
  { name: 'Pizza', img: 'pizza.jpg', category: 'Fast Food', time: '30 min', price: 9.99, rating: 4.5, badge: 'bg-yellow-100 text-yellow-800', stock: '18 units', status: 'In Stock' },
  { name: 'Burger', img: 'burger.jpg', category: 'Fast Food', time: '20 min', price: 7.99, rating: 4.6, badge: 'bg-yellow-100 text-yellow-800', stock: '3 units', status: 'Low Stock' },
  { name: 'Pasta', img: 'pasta.jpg', category: 'Italian', time: '25 min', price: 10.99, rating: 4.7, badge: 'bg-green-100 text-green-700', stock: '15 units', status: 'In Stock' },
  { name: 'Momos', img: 'momos.jpg', category: 'Snack', time: '35 min', price: 6.99, rating: 4.4, badge: 'bg-blue-100 text-blue-700', stock: '0 units', status: 'Out of Stock' },
  { name: 'Sandwich', img: 'sandwitch.jpg', category: 'Snack', time: '10 min', price: 5.99, rating: 4.3, badge: 'bg-blue-100 text-blue-700', stock: '10 units', status: 'In Stock' },
];

export function useStock() {
  const [stock, setStock] = useState<StockItem[]>(() => {
    const saved = localStorage.getItem('appify_stock');
    return saved ? JSON.parse(saved) : INITIAL_STOCK;
  });

  useEffect(() => {
    localStorage.setItem('appify_stock', JSON.stringify(stock));
  }, [stock]);

  const addStock = (item: Partial<StockItem>) => {
    const newItem: StockItem = {
      name: item.name || 'New Item',
      img: 'biryani.jpg',
      category: item.category || 'Other',
      time: '20 min',
      price: item.price || 0,
      rating: 5.0,
      badge: 'bg-green-100 text-green-700',
      stock: '10 units',
      status: 'In Stock',
      ...item
    } as StockItem;
    setStock([newItem, ...stock]);
  };

  const updateStock = (index: number, updatedItem: Partial<StockItem>) => {
    const newList = [...stock];
    newList[index] = { ...newList[index], ...updatedItem };
    setStock(newList);
  };

  const deleteStock = (index: number) => {
    const newList = [...stock];
    newList.splice(index, 1);
    setStock(newList);
  };

  return { stock, addStock, updateStock, deleteStock };
}

