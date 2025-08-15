// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Authelete3_0 from 'authelete-3.0';

const client = new Authelete3_0({ baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010' });

describe('resource jose', () => {
  // Prism tests are disabled
  test.skip('verify: only required params', async () => {
    const responsePromise = client.jose.verify('serviceId', {
      jose: 'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE1NTk4MTE3NTAsImlzcyI6IjU3Mjk3NDA4ODY3In0K.csmdholMVcmjqHe59YWgLGNvm7I5Whp4phQCoGxyrlRGMnTgsfxtwyxBgMXQqEPD5q5k9FaEWNk37K8uAtSwrA',
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
  test.skip('verify: required and optional params', async () => {
    const response = await client.jose.verify('serviceId', {
      jose: 'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE1NTk4MTE3NTAsImlzcyI6IjU3Mjk3NDA4ODY3In0K.csmdholMVcmjqHe59YWgLGNvm7I5Whp4phQCoGxyrlRGMnTgsfxtwyxBgMXQqEPD5q5k9FaEWNk37K8uAtSwrA',
      clientIdentifier: '57297408867',
      clockSkew: 100,
      mandatoryClaims: 'mandatoryClaims',
      signedByClient: true,
    });
  });
});
