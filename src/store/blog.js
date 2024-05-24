import axios from "axios";
import { toast } from "react-toastify";
import { createSlice } from "@reduxjs/toolkit";

const url = "https://48217.fullstack.clarusway.com";

const token = sessionStorage.getItem("token");

const blogSlice = createSlice({
  name: "blog",
  initialState: {
    data: [],
  },
  reducers: {
    getBlogs: (state, action) => {
      state.data = action.payload;
    },
    createBlog: (state, action) => {
      state.data.push(action.payload);
    },
    readblog: (state, action) => {
      state.data = state.data.filter((item) => item.id === action.payload);
    },
    deleteBlog: (state, action) => {
      state.data = state.data.filter((item) => item.id !== action.payload);
    },
    editBlog: (state, action) => {
      let index = state.data.findIndex((b) => b.id === action.payload.id);
      state.data[index] = action.payload;
    },
    likeBlog: (state, action) => {
        const index = state.data.findIndex((b) => b.id === action.payload);
        if (index !== -1) {
          state.data[index].likes += 1;
        }
      },
      readlikeBlog: (state, action) => {
        const index = state.data.findIndex((b) => b.id === action.payload);
        if (index !== -1 && state.data[index].likes > 0) {
          state.data[index].likes -= 1;
        }
      },
      createCommentBlog: (state, action) => {
        const index = state.data.findIndex((b) => b.id === action.payload.id);
        if (index !== -1) {
          state.data[index].comments.push(action.payload.comment);
        }
      },
      readCommentBlog: (state, action) => {
        const index = state.data.findIndex((b) => b.id === action.payload); 
        if (index !== -1) {
          state.data[index].comments = action.payload.comments;
        }
      }
      
  },
});

export const getBlogs = () => async (dispatch) => {
  try {
    const res = await axios.get(`${url}/api/blogs/`);
    console.log(res.data);
    if (res.status === 200) {
      dispatch(blogSlice.actions.getBlogs(res.data));
    }
  } catch (error) {
    console.log(error);
  }
};

export const createBlog = (blog) => async (dispatch) => {
  try {
    const res = await axios(`${url}/api/blogs/`, {
      method: "POST",
      data: blog,
      'content-Type': 'application/json',
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    if (res.status === 201) {
      dispatch(blogSlice.actions.createBlog(res.data));
      toast.success("Blog Created");
    }
  } catch (error) {
    console.log(error);
  }
};

export const readBlog = (id) => async (dispatch) => {
  try {
    const res = await axios(`${url}/api/blogs/${id}/`, {
      method: "GET",
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    if (res.status === 200) {
      dispatch(blogSlice.actions.readblog(res.data));
    }
  } catch (error) {
    console.log(error);
  }
};
export const deleteBlog = (id) => async (dispatch) => {
  try {
    const res = await axios(`${url}/api/blogs/${id}/`, {
      method: "DELETE",
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    if (res.status === 204) {
      dispatch(blogSlice.actions.deleteBlog(id));
      toast.success("Blog Deleted");
    }
  } catch (error) {
    console.log(error);
  }
};

export const editBlog = (blog) => async (dispatch) => {
  try {
    const res = await axios(`${url}/api/blogs/${blog.id}/`, {
      method: "PUT",
      data: blog,
      'content-Type': 'application/json',
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    if (res.status === 200) {
      dispatch(blogSlice.actions.editBlog(res.data));
      toast.success("Blog Edited");
    }
  } catch (error) {
    console.log(error);
  }
};

export const likeBlog = (id) => async (dispatch) => {
  try {
    const res = await axios(`${url}/api/likes/${id}/`, {
      method: "POST",
      headers: {    
        Authorization: `Token ${token}`,
      },
    }); 
    if (res.status === 200) {
      dispatch(blogSlice.actions.likeBlog(id));
    }
  } catch (error) {
    console.log(error);
  }
};

export const readlikeBlog = (id) => async (dispatch) => {
  try {
    const res = await axios(`${url}/api/likes/${id}/`, {  
      method: "GET",
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    if (res.status === 200) {
      dispatch(blogSlice.actions.readlikeBlog(id));
    }
  } catch (error) {
    console.log(error);
  }
};
    

export const createCommentBlog = (comment, id) => async (dispatch) => {
  try {
    const res = await axios(`${url}/api/comments/${id}/`, {
      method: "POST",
      data: comment,
      'content-Type': 'application/json',
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    if (res.status === 200) {
      dispatch(blogSlice.actions.createCommentBlog({ comment, id }));
    }
  } catch (error) {
    console.log(error);
  }
};  

export const readCommentBlog = (id) => async (dispatch) => {
  try {
    const res = await axios(`${url}/api/comments/${id}/`, {
      method: "GET",
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    if (res.status === 200) {
      dispatch(blogSlice.actions.readCommentBlog(res.data));
    }
  } catch (error) {
    console.log(error);
  }
};

export const  blogReducer = blogSlice.reducer;
