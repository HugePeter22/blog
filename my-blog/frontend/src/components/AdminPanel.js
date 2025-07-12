import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminPanel() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', content: '', author: '' });

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

  const handleDelete = async (id) => {
    if (!window.confirm('确定要删除这篇文章吗？')) return;
    
    try {
      await axios.delete(`http://localhost:5000/api/articles/${id}`);
      alert('删除成功');
      fetchArticles(); // 重新获取列表
    } catch (error) {
      console.error('删除失败:', error);
      alert('删除失败');
    }
  };

  const handleEdit = (article) => {
    setEditingId(article._id);
    setEditForm({
      title: article.title,
      content: article.content,
      author: article.author
    });
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/articles/${id}`, editForm);
      alert('更新成功');
      setEditingId(null);
      fetchArticles();
    } catch (error) {
      console.error('更新失败:', error);
      alert('更新失败');
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm({ title: '', content: '', author: '' });
  };

  if (loading) return <div>加载中...</div>;

  return (
    <div>
      <h1>管理后台</h1>
      <p>共有 {articles.length} 篇文章</p>
      
      {articles.map(article => (
        <div key={article._id} style={{ 
          border: '1px solid #ddd', 
          padding: '20px', 
          marginBottom: '20px',
          borderRadius: '8px'
        }}>
          {editingId === article._id ? (
            // 编辑模式
            <div>
              <input
                type="text"
                value={editForm.title}
                onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
              />
              <input
                type="text"
                value={editForm.author}
                onChange={(e) => setEditForm({...editForm, author: e.target.value})}
                style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
              />
              <textarea
                value={editForm.content}
                onChange={(e) => setEditForm({...editForm, content: e.target.value})}
                style={{ width: '100%', height: '200px', padding: '8px', marginBottom: '10px' }}
              />
              <button onClick={() => handleUpdate(article._id)} style={{ marginRight: '10px' }}>
                保存
              </button>
              <button onClick={handleCancel}>取消</button>
            </div>
          ) : (
            // 显示模式
            <div>
              <h3>{article.title}</h3>
              <p style={{ color: '#666', fontSize: '14px' }}>
                {article.author} · {new Date(article.createdAt).toLocaleDateString()}
              </p>
              <p>{article.content.substring(0, 100)}...</p>
              
              <div style={{ marginTop: '15px' }}>
                <button 
                  onClick={() => handleEdit(article)}
                  style={{ 
                    backgroundColor: '#28a745',
                    color: 'white',
                    border: 'none',
                    padding: '5px 10px',
                    marginRight: '10px',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  编辑
                </button>
                <button 
                  onClick={() => handleDelete(article._id)}
                  style={{ 
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    padding: '5px 10px',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  删除
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default AdminPanel;