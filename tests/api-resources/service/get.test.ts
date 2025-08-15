// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Authelete3_0 from 'authelete-3.0';

const client = new Authelete3_0({ baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010' });

describe('resource get', () => {
  // Prism tests are disabled
  test.skip('getServiceConfiguration', async () => {
    const responsePromise = client.service.get.getServiceConfiguration('serviceId');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('getServiceConfiguration: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.service.get.getServiceConfiguration(
        'serviceId',
        { patch: 'patch', pretty: true },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Authelete3_0.NotFoundError);
  });

  // Prism tests are disabled
  test.skip('listServices', async () => {
    const responsePromise = client.service.get.listServices();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('listServices: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.service.get.listServices({ end: 0, start: 0 }, { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Authelete3_0.NotFoundError);
  });

  // Prism tests are disabled
  test.skip('retrieveService', async () => {
    const responsePromise = client.service.get.retrieveService('serviceId');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });
});
