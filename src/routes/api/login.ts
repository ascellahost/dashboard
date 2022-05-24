import { respond } from './_respond';

export async function post(request) {
    let r = await fetch('https://ascella.wtf/v2/ascella/verify', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            authorization: (await request.request.json()).auth,
        }
    });
    let json = await r.json();

    return respond({ ...json });
}