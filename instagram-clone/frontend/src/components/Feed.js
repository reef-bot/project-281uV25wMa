// File: Feed.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('api/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts: ', error);
      }
    };

    fetchPosts();
  }, []);

  const handleLike = async (postId) => {
    try {
      await axios.post(`api/posts/${postId}/like`);
      // Update the like count in the UI
      setPosts(posts.map(post => post.id === postId ? { ...post, likes: post.likes + 1 } : post));
    } catch (error) {
      console.error('Error liking post: ', error);
    }
  };

  const handleComment = async (postId, comment) => {
    try {
      await axios.post(`api/posts/${postId}/comment`, { comment });
      // Update the comment count in the UI
      setPosts(posts.map(post => post.id === postId ? { ...post, comments: [...post.comments, comment] } : post));
    } catch (error) {
      console.error('Error commenting on post: ', error);
    }
  };

  return (
    <div>
      {posts.map(post => (
        <div key={post.id}>
          <img src={post.image} alt="Post" />
          <p>{post.caption}</p>
          <button onClick={() => handleLike(post.id)}>Like</button>
          <div>
            {post.comments.map((comment, index) => (
              <p key={index}>{comment}</p>
            ))}
          </div>
          <input type="text" placeholder="Add a comment" />
          <button onClick={() => handleComment(post.id, 'New comment')}>Comment</button>
        </div>
      )}
    </div>
  );
};

export default Feed;