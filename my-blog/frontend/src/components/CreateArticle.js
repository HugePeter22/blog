import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateArticle() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title || !content || !author) {
      alert('请填写完整信息');
      return;
    }

    setSubmitting(true);
    
    try {
      await axios.post('http://localhost:5000/api/articles', {
        title,
        content,
        author
      });
      
      alert('文章发布成功！');
      navigate('/'); // 跳转到首页
    } catch (error) {
      console.error('发布失败:', error);
      alert('发布失败，请重试');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h1>写文章</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: '600px' }}>
        <div style={{ marginBottom: '15px' }}>
          <label>标题：</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '8px', 
              marginTop: '5px',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
            placeholder="输入文章标题"
          />
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <label>作者：</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '8px', 
              marginTop: '5px',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
            placeholder="输入作者名"
          />
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <label>内容：</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{ 
              width: '100%', 
              height: '300px',
              padding: '8px', 
              marginTop: '5px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              resize: 'vertical'
            }}
            placeholder="输入文章内容"
          />
        </div>
        
        <button 
          type="submit" 
          disabled={submitting}
          style={{ 
            backgroundColor: '#007bff',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            cursor: submitting ? 'not-allowed' : 'pointer'
          }}
        >
          {submitting ? '发布中...' : '发布文章'}
        </button>
      </form>
    </div>
  );
}

export default CreateArticle;