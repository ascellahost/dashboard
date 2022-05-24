export function respond(body, response) {
    if (body.error) {
        return { status: 401, body };
    }

    const json = JSON.stringify(body);
    const value = btoa(json);

    return {
        headers: {
            'set-cookie': `jwt=${value}; Path=/; HttpOnly`
        },
        body: response ? response : body
    };
}