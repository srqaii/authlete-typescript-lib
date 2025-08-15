// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Authelete3_0 from 'authelete-3.0';

const client = new Authelete3_0({ baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010' });

describe('resource introspection', () => {
  // Prism tests are disabled
  test.skip('process: only required params', async () => {
    const responsePromise = client.auth.introspection.process('serviceId', {
      token: 'VFGsNK-5sXiqterdaR7b5QbRX9VTwVCQB87jbr2_xAI',
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
    const response = await client.auth.introspection.process('serviceId', {
      token: 'VFGsNK-5sXiqterdaR7b5QbRX9VTwVCQB87jbr2_xAI',
      acrValues: ['string'],
      clientCertificate: 'clientCertificate',
      dpop: 'dpop',
      headers: [{ key: 'key', value: 'value' }],
      htm: 'htm',
      htu: 'htu',
      maxAge: 0,
      message: 'message',
      requiredComponents: ['string'],
      resources: ['string'],
      scopes: ['history.read', 'timeline.read'],
      subject: 'john',
      uri: 'uri',
    });
  });

  // Prism tests are disabled
  test.skip('standard: only required params', async () => {
    const responsePromise = client.auth.introspection.standard('serviceId', {
      parameters: 'token=VFGsNK-5sXiqterdaR7b5QbRX9VTwVCQB87jbr2_xAI&token_type_hint=access_token',
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
  test.skip('standard: required and optional params', async () => {
    const response = await client.auth.introspection.standard('serviceId', {
      parameters: 'token=VFGsNK-5sXiqterdaR7b5QbRX9VTwVCQB87jbr2_xAI&token_type_hint=access_token',
      withHiddenProperties: 'withHiddenProperties',
    });
  });
});
