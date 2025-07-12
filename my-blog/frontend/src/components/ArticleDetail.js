import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function ArticleDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticle();
  }, [id]);

  const fetchArticle = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/articles/${id}`);
      setArticle(response.data);
      setLoading(false);
    } catch (error) {
      console.error('获取文章失败:', error);
      setLoading(false);
    }
  };

  if (loading) return <div>加载中...</div>;
  if (!article) return <div>文章不存在 <Link to="/">返回首页</Link></div>;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <Link to="/" style={{ color: '#007bff', textDecoration: 'none' }}>
        ← 返回首页
      </Link>
      
      <article style={{ marginTop: '20px' }}>
        <h1>{article.title}</h1>
        
        <div style={{ 
          color: '#666', 
          fontSize: '14px', 
          marginBottom: '30px',
          borderBottom: '1px solid #eee',
          paddingBottom: '15px'
        }}>
          <span>{article.author}</span> · 
          <span>{new Date(article.createdAt).toLocaleDateString()}</span>
        </div>
        
        <div style={{ 
          lineHeight: '1.6', 
          fontSize: '16px',
          whiteSpace: 'pre-wrap'
        }}>
          {article.content}
        </div>
      </article>
    </div>
  );
}

export default ArticleDetail;