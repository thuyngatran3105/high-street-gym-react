import { useCallback, useEffect, useState } from "react";
import Nav from "../../common/Nav";
import * as BlogPost from "../../api/blog_posts";
import LoadingSpinner from "../../common/LoadingSpinner";
import { useAuthentication } from "../../hooks/authentication";

export default function Blogs() {
  const [user, login, logout] = useAuthentication();

  const [loadedBlogs, setLoadedBlogs] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [postBlog, setPostBlog] = useState({
    post_title: "",
    post_content: "",
  });

  const [errors, setErrors] = useState({ post_title: "", post_content: "" });
  const [statusMessage, setStatusMessage] = useState("");

  const [errorModal, setErrorModal] = useState(false);
  const [errorMessageModal, setErrorMessageModal] = useState("");
  const [selectedBlogId, setSelectedBlogId] = useState(null);

  const loadBlog = useCallback(() => {
    BlogPost.getAll(user.auth_key)
      .then((result) => {
        setBlogs(result.blogs);
        setLoadedBlogs(true);
      })
      .catch((err) => {
        console.error("Failed to load blogs:", err); 
      });
  }, [setBlogs, setLoadedBlogs]);

  useEffect(() => {
    loadBlog();
  }, [loadBlog]);

  const onCreate = useCallback(
    (e) => {
      e.preventDefault();
      setStatusMessage("");
      setErrors({ post_title: "", post_content: "" });

      //Add user_id to the blog object before sending
      const blogData = {
        ...postBlog,
        post_user_id: user.id,
      };

      BlogPost.create(blogData, user.auth_key)
        .then((blog) => {
          if (
            (blog.status === 400) &
              (blog.message ==
                "Post title must be between 5 and 255 characters and does not content special characters.") ||
            "Post content must be between 5 and 600 characters."
          ) {
            setStatusMessage(blog.message);
            if (
              blog.status === 200 &&
              blog.message == "Successfully create a blog"
            ) {
              setPostBlog({
                post_title: "",
                post_content: "",
              });
              loadBlog();
              setTimeout(() => {
                setStatusMessage("");
              }, 500);
            }
          }
        })
        .catch((err) => {
          console.error("Failed to create blog:", err);
          // setStatusMessage("An error occurred while creating the blog.");
        });
    },
    [postBlog, setPostBlog, user]
  );

  const onDelete = useCallback(
    (blogId) => {
      setErrorMessageModal("Do you want to delete this blog?");
      setSelectedBlogId(blogId);
      setErrorModal(true);
    },
    [setErrorMessageModal, setSelectedBlogId, setErrorModal]
  );
  
  const confirmDelete = useCallback(() => {
    if (selectedBlogId) {
          BlogPost.deleteById(selectedBlogId, user.auth_key)
        .then(() => {
          setErrorModal(false);
          setSelectedBlogId(null);
          loadBlog();
        })
        .catch((err) => {
          console.error("Failed to delete blog:", err);
        });
    }
    }, [user, selectedBlogId, loadBlog])

    const closeModal = useCallback(() => {
      setErrorModal(false);
    }, []);
      
  return (
    <section className="bg-gray-900 w-full min-h-screen">
      <Nav />
      <div className="flex flex-col items-center pt-24 pb-16">
        <div className="flex justify-center w-[90vw]">
          <form
            className="relative bg-neutral border border-gray-700 rounded-box w-full p-4 mb-6"
            onSubmit={onCreate}
          >
            <input
              type="text"
              name="title"
              placeholder="Title"
              className="outline-none w-full bg-neutral text-white"
              value={postBlog.post_title}
              onChange={(e) =>
                setPostBlog({ ...postBlog, post_title: e.target.value })
              }
            />
            <textarea
              className="outline-none resize-none w-full bg-neutral text-white mt-2"
              name="content"
              placeholder="Content"
              rows="3"
              value={postBlog.post_content}
              onChange={(e) =>
                setPostBlog({ ...postBlog, post_content: e.target.value })
              }
            />
            <button
              className="absolute right-4 bottom-[-18px] bg-[#E6FE58] font-semibold text-black border-none rounded-box w-24 h-9 cursor-pointer flex items-center justify-center"
              value="Post"
              onClick={() => onCreate()}
            >
              POST
            </button>        
            <span className="label-text-alt text-white">{statusMessage}</span>
          </form>
        </div>

        <hr className="my-6 w-[93%] border-t-2 border-gray-500" />

        {!loadedBlogs ? (
          <LoadingSpinner />
        ) : (
          blogs.map((blog) => (
            <div
              key={blog.post_id}
              className="flex flex-col bg-neutral border border-[#E6FE58] rounded-box mt-[25px] mb-[35px] p-4  w-[90vw]"
            >
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-bold text-white">
                  {blog.user_firstname} {blog.user_lastname}
                </h2>
                {user && user.id === blog.user_id ? (
                  <button
                    className="btn bg-neutral border-none hover:bg-neutral text-red-600 text-[16px] flex items-center gap-[2px]"
                    onClick={() => onDelete(blog.post_id)}
                  >
                    Delete
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="ml-1 h-4 w-4"
                      fill="none"
                      viewBox="0 0 22 22"
                      stroke="red"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                ) : null}
              </div>
              <p className="text-white mb-2">{blog.post_title}</p>
              <p className="text-white">{blog.post_content}</p>
            </div>
          ))
        )}
      </div>

      {errorModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="modal-box bg-gray-900 border border-[#E6FE58] text-center">
            <p className="text-white text-lg mb-4 gap-4">{errorMessageModal}</p>
            <div className="flex flex-row gap-4 justify-center">
            <button
              className="btn bg-[#D9D9D9] border-[#D9D9D9] text-black font-semibold py-1 px-2 rounded-full text-lg w-32"
              onClick={closeModal}
            >
              Close
            </button>

            <button
              className="btn bg-[#E6FE58] hover:bg-[#E6FE58] border-[#E6FE58] text-black font-semibold py-1 px-2 rounded-full text-lg w-32"
              onClick={confirmDelete}
            >
              Delete
            </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
