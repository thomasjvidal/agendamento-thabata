// Utilitário para animações das seções
export const initScrollAnimations = () => {
  // Observer para animações ao scroll
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          // Para elementos com delay
          const elements = entry.target.querySelectorAll('.animate-on-scroll');
          elements.forEach((el, index) => {
            setTimeout(() => {
              el.classList.add('in-view');
            }, index * 100);
          });
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }
  );

  // Observar todas as seções com animação
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  animatedElements.forEach((el) => {
    observer.observe(el);
  });

  return observer;
};

// Hook de cleanup para React
export const useScrollAnimations = () => {
  React.useEffect(() => {
    const observer = initScrollAnimations();
    
    return () => {
      observer.disconnect();
    };
  }, []);
}; 