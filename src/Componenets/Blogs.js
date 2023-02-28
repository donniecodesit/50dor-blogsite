import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInput, setBlogData } from "../Features/userSlice";

import "../Styling/Blogs.css";

const Blogs = () => {
    const searchInput = useSelector(selectUserInput);
    const blog_url = `https://gnews.io/api/v4/search?q=${searchInput}&token=00dff81253917bc29085ef0971e04ab1&lang=en`;
    const dispatch = useDispatch();
    const [blogs, setBlogs] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get(blog_url)
            .then((res) => {
                dispatch(setBlogData(res.data));
                setBlogs(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [searchInput]);

    return (
        <div className="blog__page">
            <h1 className="blog__page__header">Blogs</h1>
            {loading ? <h1 className="loading">Loading...</h1> : ""}
            <div className="blogs">
                {blogs?.articles?.map((blog, index) => (
                    <a className="blog" target="_blank" rel="noreferrer" href={blog.url} key={index}>
                        <img src={blog.image} alt=""/>
                        <div>
                            <h3 className="sourceName">
                                <span>{blog.source.name}</span>
                                <p>{blog.publishedAt}</p>
                            </h3>
                            <h1>{blog.title}</h1>
                            <p>{blog.description}</p>
                        </div>
                    </a>
                ))}

                {blogs?.totalArticles === 0 && (
                    <h1 className="no__blogs">
                        No blogs available.. Search something else to read blogs on the greatest platform!
                    </h1>
                )}
            </div>
        </div>
    );
};

export default Blogs;