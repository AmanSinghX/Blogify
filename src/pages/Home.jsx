import React, { useEffect, useState } from 'react';
import appwriteService from "../appwrite/config";
import { Button, Container, PostCard } from '../components';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import BlogifyLogo from '../assets/logo.png'; 

function Home() {
    const [posts, setPosts] = useState([]);
    const userData = useSelector((state) => state.auth.userData);

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents);
            }
        });
    }, []);

    if (!userData) {
        return (
            <div className="w-full py-8 bg-gray-100 min-h-screen flex items-center justify-center">
                <Container>
                    <div className="text-center bg-white p-8 rounded-lg shadow-lg border border-gray-200">
                        <img src={BlogifyLogo} alt="Blogify Logo" className="mx-auto mb-6 w-32 h-32" />
                        <h1 className="text-3xl font-semibold text-gray-800 mb-4">
                            Welcome to Blogify
                        </h1>
                        <p className="text-lg text-gray-600 mb-6">
                            Share your thoughts and ideas with the world.
                        </p>
                        <div className="space-y-4">
                            <Link to="/login">
                                <Button className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition-all">
                                    Login to Read Posts
                                </Button>
                            </Link>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    if (posts.length === 0) {
        return (
            <div className="w-full py-8 bg-gray-100 min-h-screen flex items-center justify-center">
                <Container>
                    <div className="text-center bg-white p-8 rounded-lg shadow-lg border border-gray-200">
                        <h1 className="text-3xl font-semibold text-gray-800 mb-4">
                            No Posts Available
                        </h1>
                        <p className="text-lg text-gray-600 mb-6">
                            What's on your mind? Share your thoughts and create a new blog post.
                        </p>
                        <div className="space-y-4">
                            <Link to="/add-post">
                                <Button className="w-full bg-green-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-600 transition-all">
                                    Create a New Blog
                                </Button>
                            </Link>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <div className="w-full py-8 bg-gray-100">
            <Container>
                <div className="flex flex-wrap -m-4">
                    {posts.map((post) => (
                        <div key={post.$id} className="p-4 w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default Home;
