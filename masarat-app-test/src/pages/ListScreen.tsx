// src/ListScreen.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPosts, deletePost } from '../hooks/PostsApi';
import { logInteraction } from '../utils/logger';

const ListScreen: React.FC = () => {
  const [allPosts, setAllPosts] = useState<any[]>([]);
  const [posts, setPosts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('title'); // Default filter
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        setLoading(true);
        logInteraction('Loading the photo list');
        const allPostsData = await getPosts(0, itemsPerPage * 20);
        setAllPosts(allPostsData);
        applyFilter(allPostsData);
      } catch (error) {
        // Handle error if needed
      } finally {
        setLoading(false);
      }
    };

    fetchAllPosts();
  }, []);

  const applyFilter = (postsData: any[]) => {
    const filteredPosts = postsData.filter((post: any) => {
      const filterValue = post[selectedFilter].toString().toLowerCase();
      return filterValue.includes(searchTerm.toLowerCase());
    });

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setPosts(filteredPosts.slice(startIndex, endIndex));
  };

  useEffect(() => {
    applyFilter(allPosts);
  }, [currentPage, searchTerm, selectedFilter, allPosts]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFilter(e.target.value);
  };

  const calculateWordCount = (text: string) => {
    const words = text.trim().split(/\s+/);
    return words.length;
  };

  const handleDeletePost = async (postId: number) => {
    try {
      setLoading(true);
      await deletePost(postId);

      setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
    } catch (error) {
      // Handle error if needed
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">List of Posts</h1>

      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button className="btn btn-outline-secondary" type="button" id="button-addon2">
          Search
        </button>
      </div>

      <div className="mb-3">
        <label htmlFor="filterDropdown" className="form-label">Filter by:</label>
        <select
          id="filterDropdown"
          className="form-select"
          value={selectedFilter}
          onChange={handleFilterChange}
        >
          <option value="userId">User ID</option>
          <option value="id">Post ID</option>
          <option value="title">Title</option>
          <option value="body">Body</option>
          
          {/* Add more filter options as needed */}
        </select>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="table">
        <thead>
          <tr>
            <th scope="col">UserId</th>
            <th scope="col">Id</th>
            <th scope="col">Title</th>
            <th scope="col">Body</th>
            <th scope="col">Word Count</th>
            <th scope="col" colSpan={2}>Actions</th> {/* colSpan added */}
          </tr>
        </thead>
        <tbody>
          {posts.map((post: any) => (
            <tr key={post.id}>
              <td>{post.userId}</td>
              <td>{post.id}</td>
              <td>{post.title}</td>
              <td>{post.body}</td>
              <td>{calculateWordCount(post.body)}</td>
              <td colSpan={2}> {/* colSpan added */}
                <Link to={`/posts/${post.id}`} className="btn btn-primary btn-sm">
                  View
                </Link>
              </td>
              <td>
              <button
                  className="btn btn-danger btn-sm ms-2"
                  onClick={() => handleDeletePost(post.id)}
                >
                  Delete
                </button>
              </td>
             
            </tr>
          ))}
        </tbody>
      </table>
      )}

<nav className="mt-3" aria-label="Page navigation">
    <ul className="pagination justify-content-center">
        <li className='page-item'>
        <button
            className="btn btn-outline-primary"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            >
            Previous
        </button>
        </li>
        
        <li className='page-item'>
        <span className="mx-2 page-link ">{currentPage}</span>
        </li>

        <li className='page-item'>
        <button
            className="btn btn-outline-primary"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={posts.length < itemsPerPage}
            >
            Next
            </button>
        </li>

    </ul> 
</nav>

</div>

    
  );
};

export default ListScreen;
