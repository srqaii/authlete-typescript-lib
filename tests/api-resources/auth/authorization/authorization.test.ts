// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Authelete3_0 from 'authelete-3.0';

const client = new Authelete3_0({ baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010' });

describe('resource authorization', () => {
  // Prism tests are disabled
  test.skip('fail: only required params', async () => {
    const responsePromise = client.auth.authorization.fail('serviceId', {
      reason: 'NOT_AUTHENTICATED',
      ticket: 'qA7wGybwArICpbUSutrf5Xc9-i1fHE0ySOHxR1eBoBQ',
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
  test.skip('fail: required and optional params', async () => {
    const response = await client.auth.authorization.fail('serviceId', {
      reason: 'NOT_AUTHENTICATED',
      ticket: 'qA7wGybwArICpbUSutrf5Xc9-i1fHE0ySOHxR1eBoBQ',
      description: 'description',
    });
  });

  // Prism tests are disabled
  test.skip('issue: only required params', async () => {
    const responsePromise = client.auth.authorization.issue('serviceId', {
      subject: 'john',
      ticket: 'FFgB9gwb_WXh6g1u-UQ8ZI-d_k4B-o-cm7RkVzI8Vnc',
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
    const response = await client.auth.authorization.issue('serviceId', {
      subject: 'john',
      ticket: 'FFgB9gwb_WXh6g1u-UQ8ZI-d_k4B-o-cm7RkVzI8Vnc',
      accessToken: 'accessToken',
      acr: 'acr',
      authorizationDetails: {
        elements: [
          {
            type: 'type',
            actions: ['string'],
            dataTypes: ['string'],
            identifier: 'identifier',
            locations: ['string'],
            otherFields: 'otherFields',
            privileges: ['string'],
          },
        ],
      },
      authTime: 0,
      claims: 'claims',
      claimsForTx: 'claimsForTx',
      consentedClaims: ['string'],
      idtHeaderParams: 'idtHeaderParams',
      jwtAtClaims: 'jwtAtClaims',
      properties: [{ hidden: true, key: 'key', value: 'value' }],
      scopes: ['string'],
      sub: 'sub',
    });
  });

  // Prism tests are disabled
  test.skip('process: only required params', async () => {
    const responsePromise = client.auth.authorization.process('serviceId', {
      parameters:
        'response_type=code&client_id=26478243745571&redirect_uri=https%3A%2F%2Fmy-client.example.com%2Fcb1&scope=timeline.read+history.read&code_challenge=E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM&code_challenge_method=S256',
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
    const response = await client.auth.authorization.process('serviceId', {
      parameters:
        'response_type=code&client_id=26478243745571&redirect_uri=https%3A%2F%2Fmy-client.example.com%2Fcb1&scope=timeline.read+history.read&code_challenge=E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM&code_challenge_method=S256',
    });
  });
});
