import { useEffect } from 'react';

const useInfiniteScroll = (loading: boolean, callback: () => void) => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
      const clientHeight = document.documentElement.clientHeight || window.innerHeight;

      // Prevent infinite scrolling if content fits within the viewport
      if (scrollHeight <= clientHeight) return;

      if (scrollTop + clientHeight >= scrollHeight - 5 && !loading) {
        callback();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, callback]);
};

export default useInfiniteScroll;