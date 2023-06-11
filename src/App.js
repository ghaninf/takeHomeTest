import { cloneElement, isValidElement, Children } from 'react';
import { useRoutes, Navigate } from 'react-router-dom';
import { FormProduct, ProductDetail, Products } from './pages';

import { Layout } from './layout';
import { AuthService } from './services';

const ProtectedRoutes = (props) => {
  const page = window.location.pathname.split('/')
  const user = AuthService.getCurrentUser();
  if (!user && page[1] === 'manage') {
    return <Navigate to='/' />
  }

  const children = Children.map(props.children, child => {
    if (isValidElement(child)) {
      return cloneElement(child, { user: user, page: page });
    }
    return child;
  })
  return children;
}

function App() {
  return (
    useRoutes([
      {
        path: '/',
        element: <ProtectedRoutes><Layout /></ProtectedRoutes>,
        children: [
          { path: '', element: <Navigate to={'products'} /> },
          { path: 'products', element: <Products /> },
          { path: 'products/:id', element: <ProductDetail /> },
          { path: 'manage', element: <Products /> },
          { path: 'manage/create', element: <FormProduct /> },
          { path: 'manage/:id', element: <ProductDetail /> },
          { path: 'manage/:id/update', element: <FormProduct /> },
        ]
      },
      { path: '*', element: <Navigate to='/products' /> }
    ])
  );
}

export default App;
