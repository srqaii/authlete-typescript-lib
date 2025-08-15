// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Authelete3_0 from 'authelete-3.0';

const client = new Authelete3_0({ baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010' });

describe('resource registration', () => {
  // Prism tests are disabled
  test.skip('create: only required params', async () => {
    const responsePromise = client.client.registration.create('serviceId', {
      json: '{ "client_name": "My Dynamic Client" }',
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
  test.skip('create: required and optional params', async () => {
    const response = await client.client.registration.create('serviceId', {
      json: '{ "client_name": "My Dynamic Client" }',
      token: 'token',
      clientId: 'clientId',
    });
  });

  // Prism tests are disabled
  test.skip('retrieve: only required params', async () => {
    const responsePromise = client.client.registration.retrieve('serviceId', {
      body: { clientId: '26837717140341', token: 'qs4Tu5TV7qqDYT93bFs6ISyhTByMF9o-54GY4JU5vTA' },
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
  test.skip('retrieve: required and optional params', async () => {
    const response = await client.client.registration.retrieve('serviceId', {
      body: { clientId: '26837717140341', token: 'qs4Tu5TV7qqDYT93bFs6ISyhTByMF9o-54GY4JU5vTA' },
    });
  });

  // Prism tests are disabled
  test.skip('update: only required params', async () => {
    const responsePromise = client.client.registration.update('serviceId', {
      token: 'qs4Tu5TV7qqDYT93bFs6ISyhTByMF9o-54GY4JU5vTA',
      clientId: '26837717140341',
      json: '{"client_name":"My Updated Dynamic Client","default_max_age":0,"registration_client_uri":"https://my-service.example.com/dcr/register/26837717140341","client_id":"26837717140341","token_endpoint_auth_method":"client_secret_basic","require_pushed_authorization_requests":false,"backchannel_user_code_parameter":false,"client_secret":"bMsjvZm2FE1_mqJgxhmYj_Wr8rA0Pia_A_j-V076qQm6-P1edKB055W579GBe7MSbOdxZ3dJKsKinCtdIFwxpw","tls_client_certificate_bound_access_tokens":false,"id_token_signed_response_alg":"RS256","subject_type":"public","require_signed_request_object":false}',
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
    const response = await client.client.registration.update('serviceId', {
      token: 'qs4Tu5TV7qqDYT93bFs6ISyhTByMF9o-54GY4JU5vTA',
      clientId: '26837717140341',
      json: '{"client_name":"My Updated Dynamic Client","default_max_age":0,"registration_client_uri":"https://my-service.example.com/dcr/register/26837717140341","client_id":"26837717140341","token_endpoint_auth_method":"client_secret_basic","require_pushed_authorization_requests":false,"backchannel_user_code_parameter":false,"client_secret":"bMsjvZm2FE1_mqJgxhmYj_Wr8rA0Pia_A_j-V076qQm6-P1edKB055W579GBe7MSbOdxZ3dJKsKinCtdIFwxpw","tls_client_certificate_bound_access_tokens":false,"id_token_signed_response_alg":"RS256","subject_type":"public","require_signed_request_object":false}',
    });
  });

  // Prism tests are disabled
  test.skip('delete: only required params', async () => {
    const responsePromise = client.client.registration.delete('serviceId', {
      token: 'qs4Tu5TV7qqDYT93bFs6ISyhTByMF9o-54GY4JU5vTA',
      clientId: '26837717140341',
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
  test.skip('delete: required and optional params', async () => {
    const response = await client.client.registration.delete('serviceId', {
      token: 'qs4Tu5TV7qqDYT93bFs6ISyhTByMF9o-54GY4JU5vTA',
      clientId: '26837717140341',
    });
  });
});
