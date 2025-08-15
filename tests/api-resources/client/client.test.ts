// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Authelete3_0 from 'authelete-3.0';

const client = new Authelete3_0({ baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010' });

describe('resource client', () => {
  // Prism tests are disabled
  test.skip('create', async () => {
    const responsePromise = client.client.create('serviceId');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('create: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.client.create(
        'serviceId',
        {
          applicationType: 'WEB',
          attributes: [
            { key: 'attribute1-key', value: 'attribute1-value' },
            { key: 'attribute2-key', value: 'attribute2-value' },
          ],
          authorizationDetailsTypes: ['string'],
          authorizationEncryptionAlg: 'RSA1_5',
          authorizationEncryptionEnc: 'A128CBC_HS256',
          authorizationSignAlg: 'NONE',
          authTimeRequired: true,
          automaticallyRegistered: true,
          bcDeliveryMode: 'bcDeliveryMode',
          bcNotificationEndpoint: 'bcNotificationEndpoint',
          bcRequestSignAlg: 'NONE',
          bcUserCodeRequired: true,
          clientIdAlias: 'my-client',
          clientIdAliasEnabled: true,
          clientName: 'My Client',
          clientNames: [{ tag: 'tag', value: 'value' }],
          clientRegistrationTypes: ['AUTOMATIC'],
          clientType: 'CONFIDENTIAL',
          clientUri: 'clientUri',
          clientUris: [{ tag: 'tag', value: 'value' }],
          contacts: ['string'],
          credentialOfferEndpoint: 'credentialOfferEndpoint',
          credentialResponseEncryptionRequired: true,
          customMetadata: 'customMetadata',
          defaultAcrs: ['string'],
          defaultMaxAge: 0,
          description: 'description',
          descriptions: [{ tag: 'tag', value: 'value' }],
          digestAlgorithm: 'digestAlgorithm',
          dpopRequired: true,
          entityId: 'entityId',
          explicitlyRegistered: true,
          extension: {
            accessTokenDuration: 0,
            idTokenDuration: 0,
            refreshTokenDuration: 0,
            requestableScopes: ['string'],
            requestableScopesEnabled: true,
            tokenExchangePermitted: true,
          },
          fapiModes: ['FAPI1_ADVANCED'],
          frontChannelRequestObjectEncryptionRequired: true,
          grantTypes: ['AUTHORIZATION_CODE', 'REFRESH_TOKEN'],
          idTokenEncryptionAlg: 'RSA1_5',
          idTokenEncryptionEnc: 'A128CBC_HS256',
          idTokenSignAlg: 'NONE',
          jwks: 'jwks',
          jwksUri: 'jwksUri',
          locked: true,
          loginUri: 'loginUri',
          logoUri: 'logoUri',
          logoUris: [{ tag: 'tag', value: 'value' }],
          organizationName: 'organizationName',
          parRequired: true,
          pkceRequired: true,
          pkceS256Required: true,
          policyUri: 'policyUri',
          policyUris: [{ tag: 'tag', value: 'value' }],
          redirectUris: ['https://my-client.example.com/cb1', 'https://my-client.example.com/cb2'],
          registrationAccessTokenHash: 'registrationAccessTokenHash',
          requestEncryptionAlg: 'RSA1_5',
          requestEncryptionEnc: 'A128CBC_HS256',
          requestObjectEncryptionAlgMatchRequired: true,
          requestObjectEncryptionEncMatchRequired: true,
          requestObjectRequired: true,
          requestSignAlg: 'NONE',
          requestUris: ['string'],
          responseModes: ['QUERY'],
          responseTypes: ['CODE', 'TOKEN'],
          rsRequestSigned: true,
          rsSignedRequestKeyId: 'rsSignedRequestKeyId',
          sectorIdentifierUri: 'sectorIdentifierUri',
          selfSignedCertificateKeyId: 'selfSignedCertificateKeyId',
          signedJwksUri: 'signedJwksUri',
          singleAccessTokenPerSubject: true,
          softwareId: 'softwareId',
          softwareVersion: 'softwareVersion',
          subjectType: 'PUBLIC',
          tlsClientAuthSanDns: 'tlsClientAuthSanDns',
          tlsClientAuthSanEmail: 'tlsClientAuthSanEmail',
          tlsClientAuthSanIp: 'tlsClientAuthSanIp',
          tlsClientAuthSanUri: 'tlsClientAuthSanUri',
          tlsClientAuthSubjectDn: 'tlsClientAuthSubjectDn',
          tlsClientCertificateBoundAccessTokens: true,
          tokenAuthMethod: 'CLIENT_SECRET_BASIC',
          tokenAuthSignAlg: 'NONE',
          tosUri: 'tosUri',
          tosUris: [{ tag: 'tag', value: 'value' }],
          trustAnchorId: 'trustAnchorId',
          trustChain: ['string'],
          trustChainExpiresAt: 0,
          trustChainUpdatedAt: 0,
          userInfoEncryptionAlg: 'RSA1_5',
          userInfoEncryptionEnc: 'A128CBC_HS256',
          userInfoSignAlg: 'NONE',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Authelete3_0.NotFoundError);
  });

  // Prism tests are disabled
  test.skip('update: only required params', async () => {
    const responsePromise = client.client.update('clientId', { serviceId: 'serviceId' });
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
    const response = await client.client.update('clientId', {
      serviceId: 'serviceId',
      applicationType: 'WEB',
      attributes: [
        { key: 'attribute1-key', value: 'attribute1-value' },
        { key: 'attribute2-key', value: 'attribute2-value' },
      ],
      authorizationDetailsTypes: ['string'],
      authorizationEncryptionAlg: 'RSA1_5',
      authorizationEncryptionEnc: 'A128CBC_HS256',
      authorizationSignAlg: 'NONE',
      authTimeRequired: false,
      automaticallyRegistered: true,
      bcDeliveryMode: 'bcDeliveryMode',
      bcNotificationEndpoint: 'bcNotificationEndpoint',
      bcRequestSignAlg: 'NONE',
      bcUserCodeRequired: false,
      clientIdAlias: 'my-client',
      clientIdAliasEnabled: true,
      clientName: 'My updated client',
      clientNames: [{ tag: 'tag', value: 'value' }],
      clientRegistrationTypes: ['AUTOMATIC'],
      clientType: 'CONFIDENTIAL',
      clientUri: 'clientUri',
      clientUris: [{ tag: 'tag', value: 'value' }],
      contacts: ['string'],
      credentialOfferEndpoint: 'credentialOfferEndpoint',
      credentialResponseEncryptionRequired: true,
      customMetadata: 'customMetadata',
      defaultAcrs: ['string'],
      defaultMaxAge: 0,
      description: 'description',
      descriptions: [{ tag: 'tag', value: 'value' }],
      digestAlgorithm: 'digestAlgorithm',
      dpopRequired: true,
      entityId: 'entityId',
      explicitlyRegistered: true,
      extension: {
        accessTokenDuration: 0,
        idTokenDuration: 0,
        refreshTokenDuration: 0,
        requestableScopes: ['string'],
        requestableScopesEnabled: true,
        tokenExchangePermitted: true,
      },
      fapiModes: ['FAPI1_ADVANCED'],
      frontChannelRequestObjectEncryptionRequired: false,
      grantTypes: ['AUTHORIZATION_CODE', 'REFRESH_TOKEN'],
      idTokenEncryptionAlg: 'RSA1_5',
      idTokenEncryptionEnc: 'A128CBC_HS256',
      idTokenSignAlg: 'RS256',
      jwks: 'jwks',
      jwksUri: 'jwksUri',
      locked: true,
      loginUri: 'loginUri',
      logoUri: 'logoUri',
      logoUris: [{ tag: 'tag', value: 'value' }],
      organizationName: 'organizationName',
      parRequired: false,
      pkceRequired: true,
      pkceS256Required: true,
      policyUri: 'policyUri',
      policyUris: [{ tag: 'tag', value: 'value' }],
      redirectUris: ['https://my-client.example.com/cb1', 'https://my-client.example.com/cb2'],
      registrationAccessTokenHash: 'registrationAccessTokenHash',
      requestEncryptionAlg: 'RSA1_5',
      requestEncryptionEnc: 'A128CBC_HS256',
      requestObjectEncryptionAlgMatchRequired: false,
      requestObjectEncryptionEncMatchRequired: false,
      requestObjectRequired: false,
      requestSignAlg: 'NONE',
      requestUris: ['string'],
      responseModes: ['QUERY'],
      responseTypes: ['CODE', 'TOKEN'],
      rsRequestSigned: true,
      rsSignedRequestKeyId: 'rsSignedRequestKeyId',
      sectorIdentifierUri: 'sectorIdentifierUri',
      selfSignedCertificateKeyId: 'selfSignedCertificateKeyId',
      signedJwksUri: 'signedJwksUri',
      singleAccessTokenPerSubject: true,
      softwareId: 'softwareId',
      softwareVersion: 'softwareVersion',
      subjectType: 'PUBLIC',
      tlsClientAuthSanDns: 'tlsClientAuthSanDns',
      tlsClientAuthSanEmail: 'tlsClientAuthSanEmail',
      tlsClientAuthSanIp: 'tlsClientAuthSanIp',
      tlsClientAuthSanUri: 'tlsClientAuthSanUri',
      tlsClientAuthSubjectDn: 'tlsClientAuthSubjectDn',
      tlsClientCertificateBoundAccessTokens: false,
      tokenAuthMethod: 'CLIENT_SECRET_BASIC',
      tokenAuthSignAlg: 'NONE',
      tosUri: 'tosUri',
      tosUris: [{ tag: 'tag', value: 'value' }],
      trustAnchorId: 'trustAnchorId',
      trustChain: ['string'],
      trustChainExpiresAt: 0,
      trustChainUpdatedAt: 0,
      userInfoEncryptionAlg: 'RSA1_5',
      userInfoEncryptionEnc: 'A128CBC_HS256',
      userInfoSignAlg: 'NONE',
    });
  });

  // Prism tests are disabled
  test.skip('delete: only required params', async () => {
    const responsePromise = client.client.delete('clientId', { serviceId: 'serviceId' });
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
    const response = await client.client.delete('clientId', { serviceId: 'serviceId' });
  });
});
