import { cloneElement, isValidElement, Children } from 'react';
import { useRoutes, Navigate } from 'react-router-dom';
import { FormProduct, ProductDetail, Products } from './pages';

import { Layout } from './layout';
import { AuthService } from './services';

const ProtectedRoutes = (props) => {
  const user = AuthService.getCurrentUser()

  if (!user) {
    return <Navigate to='/' />
  }

  const children = Children.map(props.children, child => {
    if (isValidElement(child)) {
      return cloneElement(child, { user: user });
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
        element: <Layout />,
        children: [
          { path: '', element: <Navigate to={'products'} /> },
          { path: 'products', element: <Products /> },
          { path: 'product/:id', element: <ProductDetail /> },
        ]
      },
      {
        path: '/',
        element: <ProtectedRoutes />,
        children: [
          { path: 'manage', element: <Products /> },
          { path: 'manage/create', element: <FormProduct /> },
          { path: 'manage/:id/update', element: <FormProduct /> },
        ]
      },
      { path: '*', element: <Navigate to='/products' /> }
    ])
  );
}

export default App;
