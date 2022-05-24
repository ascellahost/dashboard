import * as cookie from 'cookie'
import type { Handle, GetSession, RequestEvent } from '@sveltejs/kit'


// Invoked for each endpoint called and initially for SSR router
export const handle: Handle = async ({ event, resolve }) => {
    const cookies = cookie.parse(event.request.headers.get("cookie") || '');
    const jwt = cookies.jwt && Buffer.from(cookies.jwt, 'base64').toString('utf-8');
    event.locals.user = jwt ? JSON.parse(jwt) : null;
    const response = await resolve(event)

    return response
}

// Only useful for authentication schemes that redirect back to the website - not
// an SPA with client-side routing that handles authentication seamlessly
export const getSession: GetSession = event => {
    return event.locals.user ?
        { user: event.locals.user }
        : {}
}