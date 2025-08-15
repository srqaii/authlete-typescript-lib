// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Authelete3_0 from 'authelete-3.0';

const client = new Authelete3_0({ baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010' });

describe('resource userinfo', () => {
  // Prism tests are disabled
  test.skip('issue: only required params', async () => {
    const responsePromise = client.auth.userinfo.issue('serviceId', {
      token: 'Ntm9MDb8WXQAevqrBkd84KTTHbYHVQrTjgUZCOWqEUI',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('issue: required and optional params', async () => {
    const response = await client.auth.userinfo.issue('serviceId', {
      token: 'Ntm9MDb8WXQAevqrBkd84KTTHbYHVQrTjgUZCOWqEUI',
      claims: 'claims',
      claimsForTx: 'claimsForTx',
      headers: [{ key: 'key', value: 'value' }],
      requestSignature: 'requestSignature',
      sub: 'sub',
    });
  });

  // Prism tests are disabled
  test.skip('process: only required params', async () => {
    const responsePromise = client.auth.userinfo.process('serviceId', {
      token: 'Ntm9MDb8WXQAevqrBkd84KTTHbYHVQrTjgUZCOWqEUI',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('process: required and optional params', async () => {
    const response = await client.auth.userinfo.process('serviceId', {
      token: 'Ntm9MDb8WXQAevqrBkd84KTTHbYHVQrTjgUZCOWqEUI',
      clientCertificate: 'clientCertificate',
      dpop: 'dpop',
      headers: [{ key: 'key', value: 'value' }],
      htm: 'htm',
      htu: 'htu',
      message: 'message',
      uri: 'uri',
    });
  });
});
