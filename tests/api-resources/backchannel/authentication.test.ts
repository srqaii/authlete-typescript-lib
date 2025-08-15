// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Authelete3_0 from 'authelete-3.0';

const client = new Authelete3_0({ baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010' });

describe('resource authentication', () => {
  // Prism tests are disabled
  test.skip('completeRequest: only required params', async () => {
    const responsePromise = client.backchannel.authentication.completeRequest('serviceId', {
      result: 'AUTHORIZED',
      subject: 'john',
      ticket: 'NFIHGx_btVrWmtAD093D-87JxvT4DAtuijEkLVHbS4Q',
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
  test.skip('completeRequest: required and optional params', async () => {
    const response = await client.backchannel.authentication.completeRequest('serviceId', {
      result: 'AUTHORIZED',
      subject: 'john',
      ticket: 'NFIHGx_btVrWmtAD093D-87JxvT4DAtuijEkLVHbS4Q',
      accessToken: 'accessToken',
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
  test.skip('failRequest: only required params', async () => {
    const responsePromise = client.backchannel.authentication.failRequest('serviceId', {
      reason: 'ACCESS_DENIED',
      ticket: 'ticket',
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
  test.skip('failRequest: required and optional params', async () => {
    const response = await client.backchannel.authentication.failRequest('serviceId', {
      reason: 'ACCESS_DENIED',
      ticket: 'ticket',
      errorDescription: 'errorDescription',
      errorUri: 'errorUri',
    });
  });

  // Prism tests are disabled
  test.skip('issueResponse: only required params', async () => {
    const responsePromise = client.backchannel.authentication.issueResponse('serviceId', {
      ticket: 'NFIHGx_btVrWmtAD093D-87JxvT4DAtuijEkLVHbS4Q',
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
  test.skip('issueResponse: required and optional params', async () => {
    const response = await client.backchannel.authentication.issueResponse('serviceId', {
      ticket: 'NFIHGx_btVrWmtAD093D-87JxvT4DAtuijEkLVHbS4Q',
    });
  });

  // Prism tests are disabled
  test.skip('process: only required params', async () => {
    const responsePromise = client.backchannel.authentication.process('serviceId', {
      parameters:
        'login_hint=john&scope=openid&client_notification_token=my-client-notification-token&user_code=my-user-code',
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
    const response = await client.backchannel.authentication.process('serviceId', {
      parameters:
        'login_hint=john&scope=openid&client_notification_token=my-client-notification-token&user_code=my-user-code',
      clientCertificate: 'clientCertificate',
      clientCertificatePath: 'clientCertificatePath',
      clientId: '26862190133482',
      clientSecret: '8J9pAEX6IQw7lYtYGsc_s9N4jlEz_DfkoCHIswJjFjfgKZX-nC4EvKtaHXcP9mHBfS7IU4jytjSZZpaK9UJ77A',
    });
  });
});
