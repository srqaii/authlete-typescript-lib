// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Authelete3_0 from 'authelete-3.0';

const client = new Authelete3_0({ baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010' });

describe('resource lockFlag', () => {
  // Prism tests are disabled
  test.skip('update: only required params', async () => {
    const responsePromise = client.client.lockFlag.update('clientIdentifier', {
      serviceId: 'serviceId',
      clientLocked: true,
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
    const response = await client.client.lockFlag.update('clientIdentifier', {
      serviceId: 'serviceId',
      clientLocked: true,
    });
  });
});
