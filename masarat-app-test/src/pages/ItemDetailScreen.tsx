// src/ItemDetailScreen.tsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPostById, getCommentsByPostId } from '../hooks/PostsApi';
import { logInteraction } from '../utils/logger';

interface Post {
  id: number;
  title: string;
  body: string;
}

interface Comment {
  id: number;
  name: string;
  body: string;
}

const ItemDetailScreen: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPostAndComments = async () => {
      try {
        setLoading(true);
        logInteraction("Viewing an item's details");
        const postId = Number(id);
        const postsData = await getPostById(postId);
        console.log(postsData)
        const commentsData = await getCommentsByPostId(postId);

        setPost(postsData);
        setComments(commentsData);
      } catch (error) {
        // Handle error if needed
      } finally {
        setLoading(false);
      }
    };

    fetchPostAndComments();
  }, [id]);

  return (
    <div className="container mt-5">
    {loading ? (
      <p className="text-center">Loading...</p>
    ) : (
      <div>
        <h1 className="display-4 text-danger ">{post?.title}</h1>
        <p className="lead">{post?.body}</p>
      </div>
    )}

    <h2 className="mt-4">Comments</h2>
    {loading ? (
      <p className="text-center">Loading comments...</p>
    ) : (
      <ul className="list-group">
        {comments.map(comment => (
          <li key={comment.id} className="list-group-item">
            <strong>{comment.name}</strong>: {comment.body}
          </li>
        ))}
      </ul>
    )}
  </div>
  );
};

export default ItemDetailScreen;
