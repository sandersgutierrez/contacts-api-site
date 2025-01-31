'use strict'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import App, { action as rootAction, loader as rootLoader } from './App'
import Contact, { action as contactAction, loader as contactLoader } from './contact'
import { action as deleteAction } from './destroy'
import EditContact, { action as editAction } from './edit'
import ErrorPage from './error-page'
import Home from './home'

const routes = [
    {
        element: <App />,
        errorElement: <ErrorPage />,
        loader: rootLoader,
        action: rootAction,
        children: [
            {
                errorElement: <ErrorPage />,
                children: [
                    {
                        index: true,
                        element: <Home />,
                    },
                    {
                        path: 'contacts/:id',
                        element: <Contact />,
                        loader: contactLoader,
                        action: contactAction,
                    },
                    {
                        path: 'contacts/:id/edit',
                        element: <EditContact />,
                        loader: contactLoader,
                        action: editAction,
                    },
                    {
                        path: 'contacts/:id/destroy',
                        action: deleteAction,
                    },
                ],
            },
        ],
    },
]

const router = createBrowserRouter(routes)

const root = createRoot(document.getElementById('root'))
root.render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
)
