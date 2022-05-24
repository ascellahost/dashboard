export function respond(body, response) {
    if (body.error) {
        return { status: 401, body };
    }

    const json = JSON.stringify(body);
    const value = Buffer.from(json).toString('base64');

    return {
        headers: {
            'set-cookie': `jwt=${value}; Path=/; HttpOnly`
        },
        body: response ? response : body
    };
}