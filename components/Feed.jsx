"use client";

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleTagClick = (tag) => {
    setSearchText(tag);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();

      setPosts(data);
    };

    fetchPosts();
  }, []);

  const filteredPosts = posts.filter((post) => {
    const lowercaseSearchText = searchText.toLowerCase();

    // Check if the prompt text contains the search text
    const containsSearchText = post.prompt
      .toLowerCase()
      .includes(lowercaseSearchText);

    // Check if any of the tags contain the search text
    const containsTag = post.tag.toLowerCase().includes(lowercaseSearchText);

    // Check if the user name contains the search text
    const containsUserName = post.creator.username
      .toLowerCase()
      .includes(lowercaseSearchText);
    // Return true if either the prompt text, any tag, or the user name contains the search text
    return containsSearchText || containsTag || containsUserName;
  });

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList
        data={filteredPosts} // Pass filteredPosts to PromptCardList
        handleTagClick={handleTagClick}
      />
    </section>
  );
};

export default Feed;
