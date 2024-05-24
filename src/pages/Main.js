import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { getBlogs, likeBlog, readlikeBlog, createCommentBlog, readCommentBlog } from '../store/blog';
function Main() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const blogs = useSelector((state) => state.blog.data);
    const currentUser = useSelector((state) => state.auth.currentUser);
  
    useEffect(() => {
      dispatch(getBlogs());
    }, [dispatch]);
  
    const handleLike = (blogId) => {
      if (currentUser) {
        dispatch(likeBlog(blogId));
      } else {
        alert('You need to be logged in to like a blog.');
      }
    };
  
    const handleComment = (blogId) => {
      if (currentUser) {
        const comment = prompt('Enter your comment:');
        if (comment) {
          dispatch(createCommentBlog(blogId, comment));
        }
      } else {
        alert('You need to be logged in to comment on a blog.');
      }
    };
  
    const handleViewDetails = (blogId) => {
      if (currentUser) {
        navigate(`/blogs/${blogId}`);
      } else {
        alert('You need to be logged in to view blog details.');
      }
    };
  
    return (
      <div className="flex flex-col min-h-screen">
        <NavBar />
        <main className="flex-grow bg-gray-100 py-8">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
              {blogs.map((blog) => (
                <div key={blog.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-48 object-cover cursor-pointer"
                    onClick={() => handleViewDetails(blog.id)}
                  />
                  <div className="p-4">
                    <h2 className="text-xl font-semibold text-gray-900">{blog.title}</h2>
                    <p className="text-gray-600 mt-2">By {blog.author}</p>
                    <p className="text-gray-500 text-sm mt-1">
                      {new Date(blog.post_views).toLocaleDateString()} - Last viewed {blog.lastView}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex space-x-4 text-gray-600">
                        <span>
                          <svg className="w-5 h-5 inline-block" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927C9.469 1.57 10.886 1.57 11.307 2.927L12.574 7.048C12.746 7.634 13.296 8 13.909 8H18.364C19.833 8 20.391 9.745 19.175 10.447L15.089 12.614C14.561 12.915 14.318 13.52 14.491 14.106L15.758 18.227C16.179 19.584 14.69 20.745 13.474 20.043L9.388 17.876C8.861 17.575 8.14 17.575 7.613 17.876L3.527 20.043C2.311 20.745 0.822 19.584 1.243 18.227L2.51 14.106C2.682 13.52 2.439 12.915 1.911 12.614L-2.175 10.447C-3.391 9.745 -2.833 8 0.636 8H5.091C5.704 8 6.254 7.634 6.426 7.048L7.693 2.927C8.114 1.57 9.531 1.57 9.951 2.927z" />
                          </svg>
                          {blog.likes}
                        </span>
                        <span>
                          <svg className="w-5 h-5 inline-block" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M3 11.293L7.293 15.586a1 1 0 0 0 1.414 0L17 7.293 15.586 5.879 7.707 13.758 4.414 10.465z" />
                          </svg>
                          {blog.comment_count}
                        </span>
                        <span>
                          <svg className="w-5 h-5 inline-block" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 18c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8zm0-14c-3.308 0-6 2.692-6 6s2.692 6 6 6 6-2.692 6-6-2.692-6-6-6zm.5 4h1v5h-1v-5zm0-1h1v1h-1v-1z" />
                          </svg>
                          {blog.post_views}
                        </span>
                      </div>
                      <div className="flex space-x-4 text-indigo-600">
                        {currentUser && (
                          <>
                            <button className="flex items-center" onClick={() => handleLike(blog.id)}>
                              <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927C9.469 1.57 10.886 1.57 11.307 2.927L12.574 7.048C12.746 7.634 13.296 8 13.909 8H18.364C19.833 8 20.391 9.745 19.175 10.447L15.089 12.614C14.561 12.915 14.318 13.52 14.491 14.106L15.758 18.227C16.179 19.584 14.69 20.745 13.474 20.043L9.388 17.876C8.861 17.575 8.14 17.575 7.613 17.876L3.527 20.043C2.311 20.745 0.822 19.584 1.243 18.227L2.51 14.106C2.682 13.52 2.439 12.915 1.911 12.614L-2.175 10.447C-3.391 9.745 -2.833 8 0.636 8H5.091C5.704 8 6.254 7.634 6.426 7.048L7.693 2.927C8.114 1.57 9.531 1.57 9.951 2.927z" />
                              </svg>
                              Like
                            </button>
                            <button className="flex items-center" onClick={() => handleComment(blog.id)}>
                              <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M3 11.293L7.293 15.586a1 1 0 0 0 1.414 0L17 7.293 15.586 5.879 7.707 13.758 4.414 10.465z" />
                              </svg>
                              Comment
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  export default Main;
  