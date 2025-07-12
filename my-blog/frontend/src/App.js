import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ArticleList from './components/ArticleList';
import CreateArticle from './components/CreateArticle';
import ArticleDetail from './components/ArticleDetail';
import AdminPanel from './components/AdminPanel';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <nav style={{ padding: '20px', borderBottom: '1px solid #ccc' }}>
          <Link to="/" style={{ marginRight: '20px' }}>首页</Link>
          <Link to="/create" style={{ marginRight: '20px' }}>写文章</Link>
          <Link to="/admin">管理后台</Link>
        </nav>
        
        <main style={{ padding: '20px' }}>
          <Routes>
            <Route path="/" element={<ArticleList />} />
            <Route path="/create" element={<CreateArticle />} />
            <Route path="/article/:id" element={<ArticleDetail />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;