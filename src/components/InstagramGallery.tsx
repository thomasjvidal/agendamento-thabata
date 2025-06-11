import React, { useEffect, useState } from "react";

interface InstagramPost {
  id: string;
  media_url: string;
  permalink: string;
  caption?: string;
}

const username = "thabatabragamakeup";
// Para produção real, recomenda-se usar a API Graph do Instagram com um token de acesso de aplicativo.
// Para demonstração, pode-se usar um serviço de terceiros ou mockar dados.

const MOCK_POSTS: InstagramPost[] = [
  // Substitua por URLs reais ou integre a API do Instagram
  { id: "1", media_url: "/thabata-photo.jpg", permalink: "https://instagram.com/thabatabragamakeup" },
  { id: "2", media_url: "/background-section1.png", permalink: "https://instagram.com/thabatabragamakeup" },
  { id: "3", media_url: "/background-section2.png", permalink: "https://instagram.com/thabatabragamakeup" },
  { id: "4", media_url: "/background-section3.png", permalink: "https://instagram.com/thabatabragamakeup" },
  { id: "5", media_url: "/thabata-photo.jpg", permalink: "https://instagram.com/thabatabragamakeup" },
  { id: "6", media_url: "/background-section1.png", permalink: "https://instagram.com/thabatabragamakeup" },
  { id: "7", media_url: "/background-section2.png", permalink: "https://instagram.com/thabatabragamakeup" },
  { id: "8", media_url: "/background-section3.png", permalink: "https://instagram.com/thabatabragamakeup" },
];

const InstagramGallery = () => {
  const [posts, setPosts] = useState<InstagramPost[]>([]);

  useEffect(() => {
    // Aqui você pode integrar a API real do Instagram se possuir um token de acesso
    // Por padrão, usamos mock para evitar problemas de CORS e autenticação
    setPosts(MOCK_POSTS);
  }, []);

  return (
    <section className="py-16 bg-white" id="instagram-gallery">
      <div className="section-container">
        <div className="text-center mb-10">
          <h2 className="text-5xl font-display font-bold mb-2">Galeria do Instagram</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Veja as últimas postagens de <a href="https://instagram.com/thabatabragamakeup" target="_blank" rel="noopener noreferrer" className="text-pulse-500 underline">@thabatabragamakeup</a>
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {posts.map((post) => (
            <a
              key={post.id}
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-xl overflow-hidden shadow-lg group"
            >
              <img
                src={post.media_url}
                alt={post.caption || "Instagram post"}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstagramGallery; 