import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import App from './App.tsx';
import ErrorPage from './pages/ErrorPage.jsx';
import CalendarPage from './pages/CalendarPage.tsx';
import ViewGroupsPage from './pages/ViewGroupsPage.tsx';
import GroupInfoPage from './pages/GroupInfoPage.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <CalendarPage />
      },
      {
        path: '/viewgroups',
        element: <ViewGroupsPage />
      },
      {
        path: '/groupinfo',
        element: <GroupInfoPage />
      },
    ]
  }
])

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
