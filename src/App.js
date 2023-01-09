'use strict'

import '@/styles/global.scss'
import { Form, Link, NavLink, Outlet, redirect, useLoaderData } from 'react-router-dom'
import { getContacts, createContact } from '../data/contacts'

export const loader = async () => ({ contacts: await getContacts() })
export const action = async () => {
    const contact = await createContact()
    return redirect(`/contacts/${contact.id}/edit`)
}

export default function App() {
    const { contacts } = useLoaderData()

    return (
        <>
            <div className="sidebar">
                <h1>Contacts</h1>
                <div>
                    <Form id="search-form" role="search">
                        <input id="q" aria-label="Search contacts" placeholder="Search" type="search" name="q" />
                        <div id="search-spinner" aria-hidden hidden={true} />
                        <div className="sr-only" aria-live="polite" />
                    </Form>
                    <Form method="post">
                        <button type="submit">New</button>
                    </Form>
                </div>
                <nav>
                    {contacts.length ? (
                        <ul>
                            {contacts.map(contact => (
                                <li key={contact.id}>
                                    <NavLink
                                        to={`contacts/${contact.id}`}
                                        className={({ isActive, isPending }) => 
                                            isActive ? 'active' : isPending ? 'pending' : ''
                                        }>
                                        {contact.first || contact.last ? (
                                            <>
                                                {contact.first} {contact.last}
                                            </>
                                        ) : (
                                            <i>No name</i>
                                        )}{' '}
                                        {contact.favorite && <span>★</span>}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>
                            <i>No contacts</i>
                        </p>
                    )}
                </nav>
            </div>
            <div className="detail">
                <Outlet />
            </div>
        </>
    )
}
