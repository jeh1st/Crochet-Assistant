import { useEffect } from 'react';
import { useLocation } from './SimpleRouter';

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // If there is a hash, try to scroll to the element
    if (hash) {
      // Use a timeout to ensure the DOM is rendered before trying to scroll
      // We poll a few times in case of heavy rendering
      let attempts = 0;
      const maxAttempts = 20; // Try for 2 seconds
      
      const scrollAttempt = setInterval(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        
        if (element) {
          // Add a small offset for the fixed navbar
          const navbarElement = document.querySelector('nav');
          const navbarHeight = navbarElement ? navbarElement.offsetHeight : 0;
          const offset = navbarHeight + 20;
          
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
          
          clearInterval(scrollAttempt);
        }

        attempts++;
        if (attempts >= maxAttempts) {
          clearInterval(scrollAttempt);
        }
      }, 100);

      return () => clearInterval(scrollAttempt);
    } else {
      // If no hash, just scroll to top of page (navigated to new page)
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;