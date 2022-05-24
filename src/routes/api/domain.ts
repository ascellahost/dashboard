import { respond } from './_respond';

export async function post(request) {
    let body = (await request.request.json());
    let domainResponse = await fetch('https://ascella.wtf/v2/ascella/domain', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            authorization: body.auth,
        },
        body: JSON.stringify({ domain: body.domain })
    });
    let r = await fetch('https://ascella.wtf/v2/ascella/verify', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            authorization: body.auth,
        }
    });
    let t = await domainResponse.text();
    let json = await r.json();
    console.log(t);
    return respond({ ...json }, { ...JSON.parse(t) });
}