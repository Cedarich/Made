// import { useState, useEffect } from 'react';
import { useAppStore } from "../store/store";

export function BlogSidebar() {
  const { posts, currentPost, handleManualChange } = useAppStore();

  return (
    <div className="w-full xl:w-full bg-gray-800/40 backdrop-blur-md rounded-xl border border-gray-700/50 p-2 overflow-y-auto">
      <h3 className="text-xl font-bold mb-6">More Articles</h3>
      <div className="grid grid-cols-1 ">
        {posts
          .filter(post => post.postId !== currentPost?.postId)
          .map(post => (
            <div
              key={post.postId}
              onClick={() => {
                const index = posts.findIndex(p => p.postId === post.postId);
                handleManualChange(index);
              }}
              className="p-4 rounded-lg bg-gray-900/50 hover:bg-gray-700/50 transition-all duration-300 cursor-pointer group"
            >
              <div className="flex flex-col gap-3">
                <img 
                  src={post.imageUrl} 
                  alt={post.title}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <div>
                  <h4 className="font-semibold mb-1 group-hover:text-blue-400 transition-colors line-clamp-2">
                    {post.title}
                  </h4>
                  <p className="text-sm text-gray-400 line-clamp-3">{post.excerpt}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
} 