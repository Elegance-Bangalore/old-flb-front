import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const useBeforeUnload = (callback, when) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (when) {
        callback();
        event.preventDefault();
        event.returnValue = '';
      }
    };

    const handleNavigation = (event) => {
      if (when) {
        if (window.confirm('You have unsaved changes. Are you sure you want to leave this page?')) {
          callback();
        } else {
          event.preventDefault();
        }
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('popstate', handleNavigation);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handleNavigation);
    };
  }, [when, callback, navigate, location]);
};

export default useBeforeUnload;
