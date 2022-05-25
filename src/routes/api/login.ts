import { respond } from './_respond';

export async function post(request) {
    let jsson = (await request.request.json());
    let r = await fetch('https://ascella.wtf/v2/ascella/verify', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            "x-user-id": jsson.id,
            "x-user-token": jsson.pass,
        }
    });
    let json = await r.json();
    return respond({ ...json });
}