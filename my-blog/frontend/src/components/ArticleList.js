import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/articles');
      setArticles(response.data);
      setLoading(false);
    } catch (error) {
      console.error('获取文章失败:', error);
      setLoading(false);
    }
  };

  if (loading) return <div>加载中...</div>;

  return (
    <div>
      <h1>我的博客</h1>
      {articles.length === 0 ? (
        <p>还没有文章，<a href="/create">写第一篇</a>吧！</p>
      ) : (
        articles.map(article => (
          <div key={article._id} style={{ 
            border: '1px solid #ddd', 
            padding: '20px', 
            marginBottom: '20px',
            borderRadius: '8px'
          }}>
            <h2>
              <Link 
                to={`/article/${article._id}`}
                style={{ color: '#333', textDecoration: 'none' }}
              >
                {article.title}
              </Link>
            </h2>
            <p style={{ color: '#666', fontSize: '14px' }}>
              {article.author} · {new Date(article.createdAt).toLocaleDateString()}
            </p>
            <p>{article.content.substring(0, 200)}...</p>
            <Link 
              to={`/article/${article._id}`}
              style={{ color: '#007bff', textDecoration: 'none' }}
            >
              阅读全文 →
            </Link>
          </div>
        ))
      )}
    </div>
  );
}

export default ArticleList;