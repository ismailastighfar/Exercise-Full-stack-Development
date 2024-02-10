// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ListScreen from './pages/ListScreen';
import ItemDetailScreen from './pages/ItemDetailScreen';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ListScreen />} />
        <Route path="/posts/:id" element={<ItemDetailScreen />} />
      </Routes>
    </Router>
  );
};

export default App;
