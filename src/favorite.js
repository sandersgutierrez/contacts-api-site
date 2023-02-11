'use strict'

import { Form, useFetcher } from 'react-router-dom'

export default function Favorite({ contact }) {
    let favorite = contact.favorite
    const fetcher = useFetcher()

    return (
        <fetcher.Form method="post">
            <button
                name="favorite"
                value={favorite ? 'false' : 'true'}
                aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}>
                {favorite ? '★' : '☆'}
            </button>
        </fetcher.Form>
    )
}
