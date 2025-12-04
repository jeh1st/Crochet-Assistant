import React, { useState, useContext, createContext, ReactNode } from 'react';

interface Location {
  pathname: string;
  hash: string;
}

interface RouterContextType {
  location: Location;
  navigate: (to: string) => void;
}

const RouterContext = createContext<RouterContextType | null>(null);

export const Router: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [location, setLocation] = useState<Location>({ pathname: '/', hash: '' });

  const navigate = (to: string) => {
    // Handle hash-only navigation (e.g. "#id")
    if (to.startsWith('#')) {
        setLocation(prev => ({ ...prev, hash: to }));
        return;
    }

    const hashIndex = to.indexOf('#');
    let pathname = to;
    let hash = '';
    
    if (hashIndex !== -1) {
      pathname = to.substring(0, hashIndex);
      hash = to.substring(hashIndex);
    }
    
    setLocation({ pathname, hash });
  };

  return (
    <RouterContext.Provider value={{ location, navigate }}>
      {children}
    </RouterContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(RouterContext);
  if (!context) throw new Error('useLocation must be used within a Router');
  return context.location;
};

export const useNavigate = () => {
  const context = useContext(RouterContext);
  if (!context) throw new Error('useNavigate must be used within a Router');
  return context.navigate;
};

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
}

export const Link: React.FC<LinkProps> = ({ to, children, className, onClick, ...props }) => {
  const { navigate } = useContext(RouterContext)!;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (onClick) onClick(e);
    navigate(to);
  };

  return (
    <a href={to} onClick={handleClick} className={className} {...props}>
      {children}
    </a>
  );
};

interface NavLinkProps extends Omit<LinkProps, 'className'> {
  className: string | ((props: { isActive: boolean }) => string);
}

export const NavLink: React.FC<NavLinkProps> = ({ to, className, ...props }) => {
  const { location } = useContext(RouterContext)!;
  const isActive = location.pathname === to;

  const resolvedClassName = typeof className === 'function' ? className({ isActive }) : className;

  return <Link to={to} className={resolvedClassName} {...props} />;
};

export const Routes: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

export const Route: React.FC<{ path: string; element: ReactNode }> = ({ path, element }) => {
  const { location } = useContext(RouterContext)!;
  return location.pathname === path ? <>{element}</> : null;
};