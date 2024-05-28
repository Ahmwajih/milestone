import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShare } from '@fortawesome/free-solid-svg-icons'

function BlogDetails() {

    const { id } = useParams()
    const blog = useSelector((state) => state.blog.data.find((blog) => blog.id === parseInt(id)))
    return (
        <div className="container mx-auto mt-3">
            <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
                <img src={blog.image} alt={blog.title} className="w-full h-auto" />
                <div className="p-6">
                    <h1 className="text-3xl font-bold mt-4">{blog.title}</h1>
                    <p className="text-gray-500 mt-2">Published on {blog.publish_date}</p>
                    <p className="mt-4">{blog.content}</p>
                    <div className="flex items-center mt-4">
                        <img src={blog.author.avatar} alt={blog.author.name} className="w-8 h-8 rounded-full" />
                        <p className="ml-2">{blog.author.name}</p>
                    </div>
                    <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center">
                        <FontAwesomeIcon icon={faShare} className="mr-2" /> {/* Share icon */}
                        Share
                    </button>
                </div>
            </div>
            <div className="max-w-2xl mx-auto mt-4">
                <h2 className="text-2xl font-bold">Comments</h2>
                {blog.comments.map((comment) => (
                    <div key={comment.id} className="mt-2">
                        <p><strong>@{comment.author.name}</strong>: {comment.content}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default BlogDetails