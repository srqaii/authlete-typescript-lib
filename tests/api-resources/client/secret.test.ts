// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Authelete3_0 from 'authelete-3.0';

const client = new Authelete3_0({ baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010' });

describe('resource secret', () => {
  // Prism tests are disabled
  test.skip('update: only required params', async () => {
    const responsePromise = client.client.secret.update('clientIdentifier', {
      serviceId: 'serviceId',
      clientSecret: 'my_updated_client_secret',
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
  test.skip('update: required and optional params', async () => {
    const response = await client.client.secret.update('clientIdentifier', {
      serviceId: 'serviceId',
      clientSecret: 'my_updated_client_secret',
    });
  });

  // Prism tests are disabled
  test.skip('refresh: only required params', async () => {
    const responsePromise = client.client.secret.refresh('clientIdentifier', { serviceId: 'serviceId' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('refresh: required and optional params', async () => {
    const response = await client.client.secret.refresh('clientIdentifier', { serviceId: 'serviceId' });
  });
});
