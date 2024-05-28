import { render, screen } from '@testing-library/react';
import { getBlogs, createBlog, readBlog, deleteBlog, editBlog, likeBlog, readlikeBlog, createCommentBlog, readCommentBlog } from './blog';
import axios from 'axios';
import { toast } from 'react-toastify';
import { blogSlice } from './blog';
test('getBlogs should dispatch the correct action', async () => {
  // Mock axios.get() method
  const mockData = [{ id: 1, title: 'Blog 1' }, { id: 2, title: 'Blog 2' }];
  jest.spyOn(axios, 'get').mockResolvedValueOnce({ status: 200, data: mockData });

  // Dispatch getBlogs action
  const dispatch = jest.fn();
  await getBlogs()(dispatch);

  // Check if the correct action is dispatched
  expect(dispatch).toHaveBeenCalledWith(blogSlice.actions.getBlogs(mockData));
});

test('createBlog should dispatch the correct action and show success toast', async () => {
  // Mock axios.post() method
  const mockBlog = { title: 'New Blog' };
  jest.spyOn(axios, 'post').mockResolvedValueOnce({ status: 201, data: mockBlog });

  // Mock toast.success() method
  jest.spyOn(toast, 'success').mockImplementationOnce(() => {});

  // Dispatch createBlog action
  const dispatch = jest.fn();
  await createBlog(mockBlog)(dispatch);

  // Check if the correct action is dispatched
  expect(dispatch).toHaveBeenCalledWith(blogSlice.actions.createBlog(mockBlog));

  // Check if toast.success() is called
  expect(toast.success).toHaveBeenCalledWith('Blog Created');
});

// Add more tests for other actions...