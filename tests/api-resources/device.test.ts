// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Authelete3_0 from 'authelete-3.0';

const client = new Authelete3_0({ baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010' });

describe('resource device', () => {
  // Prism tests are disabled
  test.skip('authorize: only required params', async () => {
    const responsePromise = client.device.authorize('serviceId', {
      parameters: 'client_id=26888344961664&scope=history.read',
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
  test.skip('authorize: required and optional params', async () => {
    const response = await client.device.authorize('serviceId', {
      parameters: 'client_id=26888344961664&scope=history.read',
      clientCertificate: 'clientCertificate',
      clientCertificatePath: 'clientCertificatePath',
      clientId: '26888344961664',
      clientSecret: 'SfnYOLkJdofrb_66mTd6q03_SDoDEUnpXtvqFaE4k6L6UcpZzbdVJi2GpBj48AvGeDDllwsTruC62WYqQ_LGog',
    });
  });

  // Prism tests are disabled
  test.skip('completeAuthorization: only required params', async () => {
    const responsePromise = client.device.completeAuthorization('serviceId', {
      result: 'AUTHORIZED',
      subject: 'john',
      userCode: 'XWWKPBWVXQ',
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
  test.skip('completeAuthorization: required and optional params', async () => {
    const response = await client.device.completeAuthorization('serviceId', {
      result: 'AUTHORIZED',
      subject: 'john',
      userCode: 'XWWKPBWVXQ',
      acr: 'acr',
      authTime: 0,
      claims: 'claims',
      consentedClaims: ['string'],
      errorDescription: 'errorDescription',
      errorUri: 'errorUri',
      idtHeaderParams: 'idtHeaderParams',
      jwtAtClaims: 'jwtAtClaims',
      properties: [{ hidden: true, key: 'key', value: 'value' }],
      scopes: ['string'],
      sub: 'sub',
    });
  });

  // Prism tests are disabled
  test.skip('verify: only required params', async () => {
    const responsePromise = client.device.verify('serviceId', { userCode: 'XWWKPBWVXQ' });
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
    const response = await client.device.verify('serviceId', { userCode: 'XWWKPBWVXQ' });
  });
});
