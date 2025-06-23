import React from "react";

const INSTAGRAM_URL = "https://instagram.com/thabatabragga";

const MOCK_POSTS = [
  { id: "1", media_url: "/lovable-uploads/1.jpg" },
  { id: "2", media_url: "/lovable-uploads/2.jpg" },
  { id: "3", media_url: "/lovable-uploads/3.jpg" },
  { id: "4", media_url: "/lovable-uploads/4.jpg" },
  { id: "5", media_url: "/lovable-uploads/5.jpg" },
  { id: "6", media_url: "/lovable-uploads/6.jpg" },
];

const InstagramGallery = () => {
  return (
    <section className="py-16 bg-white" id="instagram-gallery">
      <div className="section-container">
        <div className="text-center mb-10">
          <h2 className="text-5xl font-display font-bold mb-2">Galeria do Instagram</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Veja as últimas postagens de <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="text-pulse-500 underline">@thabatabragga</a>
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {MOCK_POSTS.map((post) => (
            <a
              key={post.id}
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-xl overflow-hidden shadow-lg group"
            >
              <img
                src={post.media_url}
                alt={"Instagram post"}
                className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
                style={{ height: 'auto', maxHeight: 'none', objectFit: 'contain' }}
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstagramGallery; 