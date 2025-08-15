// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as IntrospectionAPI from '../auth/introspection';
import * as AuthenticationAPI from '../backchannel/authentication';
import * as HskAPI from '../hsk/hsk';
import * as GetAPI from './get';
import {
  Get,
  GetGetServiceConfigurationParams,
  GetGetServiceConfigurationResponse,
  GetListServicesParams,
  GetListServicesResponse,
  JwsAlg,
  ResponseType,
  Service as GetAPIService,
} from './get';
import * as JwksAPI from './jwks';
import { JwkGetJwksParams, JwkGetJwksResponse, Jwks } from './jwks';
import * as AuthorizationAPI from '../auth/authorization/authorization';
import * as TokenAPI from '../auth/token/token';
import * as ClientGetAPI from '../client/get';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Service extends APIResource {
  get: GetAPI.Get = new GetAPI.Get(this._client);
  jwks: JwksAPI.Jwks = new JwksAPI.Jwks(this._client);

  /**
   * Create a new service.
   *
   * @example
   * ```ts
   * const service = await client.service.createService({
   *   accessTokenDuration: 3600,
   *   accessTokenType: 'Bearer',
   *   attributes: [
   *     { key: 'attribute1-key', value: 'attribute1-value' },
   *     { key: 'attribute2-key', value: 'attribute2-value' },
   *   ],
   *   authorizationEndpoint: 'https://my-service.example.com/authz',
   *   clientIdAliasEnabled: true,
   *   introspectionEndpoint: 'https://my-service.example.com/introspection',
   *   issuer: 'https://my-service.example.com',
   *   pkceRequired: true,
   *   refreshTokenDuration: 3600,
   *   revocationEndpoint: 'https://my-service.example.com/revocation',
   *   serviceName: 'My service',
   *   supportedGrantTypes: ['AUTHORIZATION_CODE', 'REFRESH_TOKEN'],
   *   supportedIntrospectionAuthMethods: ['CLIENT_SECRET_BASIC'],
   *   supportedResponseTypes: ['CODE'],
   *   supportedRevocationAuthMethods: ['CLIENT_SECRET_BASIC'],
   *   supportedScopes: [
   *     {
   *       name: 'timeline.read',
   *       defaultEntry: false,
   *       description: 'A permission to read your timeline.',
   *     },
   *     {
   *       name: 'history.read',
   *       defaultEntry: false,
   *       description: 'A permission to read your history.',
   *     },
   *   ],
   *   supportedTokenAuthMethods: ['CLIENT_SECRET_BASIC'],
   *   tokenEndpoint: 'https://my-service.example.com/token',
   * });
   * ```
   */
  createService(
    body: ServiceCreateServiceParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<GetAPI.Service> {
    return this._client.post('/api/service/create', { body, ...options });
  }

  /**
   * Delete a service.
   *
   * @example
   * ```ts
   * await client.service.deleteService('serviceId');
   * ```
   */
  deleteService(serviceID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/api/${serviceID}/service/delete`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Update a service.
   *
   * @example
   * ```ts
   * const service = await client.service.updateService('serviceId', {
   *   accessTokenDuration: 3600,
   *   accessTokenType: 'Bearer',
   *   attributes: [
   *     { key: 'attribute1-key', value: 'attribute1-value' },
   *     { key: 'attribute2-key', value: 'attribute2-value' },
   *   ],
   *   authorizationEndpoint: 'https://my-service.example.com/authz',
   *   clientIdAliasEnabled: true,
   *   introspectionEndpoint: 'https://my-service.example.com/introspection',
   *   issuer: 'https://my-service.example.com',
   *   pkceRequired: true,
   *   refreshTokenDuration: 3600,
   *   revocationEndpoint: 'https://my-service.example.com/revocation',
   *   serviceName: 'My updated service',
   *   supportedClaimTypes: ['NORMAL'],
   *   supportedDisplays: ['PAGE'],
   *   supportedGrantTypes: ['AUTHORIZATION_CODE', 'REFRESH_TOKEN'],
   *   supportedIntrospectionAuthMethods: ['CLIENT_SECRET_BASIC'],
   *   supportedResponseTypes: ['CODE'],
   *   supportedRevocationAuthMethods: ['CLIENT_SECRET_BASIC'],
   *   supportedScopes: [
   *     {
   *       defaultEntry: false,
   *       description: 'A permission to read your history.',
   *       name: 'history.read',
   *     },
   *     {
   *       defaultEntry: false,
   *       description: 'A permission to read your timeline.',
   *       name: 'timeline.read',
   *     },
   *   ],
   *   supportedTokenAuthMethods: ['CLIENT_SECRET_BASIC'],
   *   tokenEndpoint: 'https://my-service.example.com/token',
   * });
   * ```
   */
  updateService(
    serviceID: string,
    body: ServiceUpdateServiceParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<GetAPI.Service> {
    return this._client.post(path`/api/${serviceID}/service/update`, { body, ...options });
  }
}

export interface ServiceCreateServiceParams {
  /**
   * The duration of access tokens in seconds. This value is used as the value of
   * `expires_in` property in access token responses. `expires_in` is defined
   * [RFC 6749, 5.1. Successful Response](https://tools.ietf.org/html/rfc6749#section-5.1).
   */
  accessTokenDuration?: number;

  /**
   * The flag indicating whether Authlete generates access tokens for external
   * attachments and embeds them in ID tokens and userinfo responses.
   */
  accessTokenForExternalAttachmentEmbedded?: boolean;

  /**
   * The signature algorithm for JWT. This value is represented on 'alg' attribute of
   * the header of JWT.
   *
   * it's semantics depends upon where is this defined, for instance:
   *
   * - as service accessTokenSignAlg value, it defines that access token are JWT and
   *   the algorithm used to sign it. Check your
   *   [KB article](https://kb.authlete.com/en/s/oauth-and-openid-connect/a/jwt-based-access-token).
   * - as client authorizationSignAlg value, it represents the signature algorithm
   *   used when
   *   [creating a JARM response](https://kb.authlete.com/en/s/oauth-and-openid-connect/a/enabling-jarm).
   * - or as client requestSignAlg value, it specifies which is the expected
   *   signature used by
   *   [client on a Request Object](https://kb.authlete.com/en/s/oauth-and-openid-connect/a/request-objects).
   */
  accessTokenSignAlg?: GetAPI.JwsAlg;

  /**
   * The key ID to identify a JWK used for signing access tokens.
   *
   * A JWK Set can be registered as a property of a service. A JWK Set can contain 0
   * or more JWKs. Authlete Server has to pick up one JWK for signing from the JWK
   * Set when it generates a JWT-based access token. Authlete Server searches the
   * registered JWK Set for a JWK which satisfies conditions for access token
   * signature. If the number of JWK candidates which satisfy the conditions is 1,
   * there is no problem. On the other hand, if there exist multiple candidates, a
   * Key ID is needed to be specified so that Authlete Server can pick up one JWK
   * from among the JWK candidates.
   */
  accessTokenSignatureKeyId?: string;

  /**
   * The access token type.
   *
   * This value is used as the value of `token_type` property in access token
   * responses. If this service complies with
   * [RFC 6750](https://tools.ietf.org/html/rfc6750), the value of this property
   * should be `Bearer`.
   *
   * See
   * [RFC 6749 (OAuth 2.0), 7.1. Access Token Types](https://tools.ietf.org/html/rfc6749#section-7.1)
   * for details.
   */
  accessTokenType?: string;

  /**
   * The allowable clock skew between the server and clients in seconds.
   *
   * The clock skew is taken into consideration when time-related claims in a JWT
   * (e.g. `exp`, `iat`, `nbf`) are verified.
   */
  allowableClockSkew?: number;

  /**
   * The attributes of this service.
   */
  attributes?: Array<TokenAPI.Pair>;

  /**
   * API key for basic authentication at the authentication callback endpoint.
   *
   * If the value is not empty, Authlete generates Authorization header for Basic
   * authentication when making a request to the authentication callback endpoint.
   */
  authenticationCallbackApiKey?: string;

  /**
   * API secret for `basic` authentication at the authentication callback endpoint.
   */
  authenticationCallbackApiSecret?: string;

  /**
   * A Web API endpoint for user authentication which is to be prepared on the
   * service side.
   *
   * The endpoint must be implemented if you do not implement the UI at the
   * authorization endpoint but use the one provided by Authlete.
   *
   * The user authentication at the authorization endpoint provided by Authlete is
   * performed by making a `POST` request to this endpoint.
   */
  authenticationCallbackEndpoint?: string;

  /**
   * Identifiers of entities that can issue entity statements for this service. This
   * property corresponds to the `authority_hints` property that appears in a
   * self-signed entity statement that is defined in OpenID Connect Federation 1.0.
   */
  authorityHints?: Array<string>;

  /**
   * The authorization endpoint of the service.
   *
   * A URL that starts with `https://` and has no fragment component. For example,
   * `https://example.com/auth/authorization`.
   *
   * The value of this property is used as `authorization_endpoint` property in the
   * [OpenID Provider Metadata](https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata).
   */
  authorizationEndpoint?: string;

  /**
   * The duration of authorization response JWTs in seconds.
   *
   * [Financial-grade API: JWT Secured Authorization Response Mode for OAuth 2.0 (JARM)](https://openid.net/specs/openid-financial-api-jarm.html)
   * defines new values for the `response_mode` request parameter. They are
   * `query.jwt`, `fragment.jwt`, `form_post.jwt` and `jwt`. If one of them is
   * specified as the response mode, response parameters from the authorization
   * endpoint will be packed into a JWT. This property is used to compute the value
   * of the `exp` claim of the JWT.
   */
  authorizationResponseDuration?: number;

  /**
   * The key ID to identify a JWK used for signing authorization responses using an
   * asymmetric key.
   *
   * [Financial-grade API: JWT Secured Authorization Response Mode for OAuth 2.0 (JARM)](https://openid.net/specs/openid-financial-api-jarm.html)
   * defines new values for the `response_mode` request parameter. They are
   * `query.jwt`, `fragment.jwt`, `form_post.jwt` and `jwt`. If one of them is
   * specified as the response mode, response parameters from the authorization
   * endpoint will be packed into a JWT. This property is used to compute the value
   * of the `exp` claim of the JWT.
   *
   * Authlete Server searches the JWK Set for a JWK which satisfies conditions for
   * authorization response signature. If the number of JWK candidates which satisfy
   * the conditions is 1, there is no problem. On the other hand, if there exist
   * multiple candidates, a Key ID is needed to be specified so that Authlete Server
   * can pick up one JWK from among the JWK candidates. This property exists to
   * specify the key ID.
   */
  authorizationSignatureKeyId?: string;

  /**
   * The URI of backchannel authentication endpoint, which is defined in the
   * specification of
   * [CIBA (Client Initiated Backchannel Authentication)](https://openid.net/specs/openid-client-initiated-backchannel-authentication-core-1_0.html).
   */
  backchannelAuthenticationEndpoint?: string;

  /**
   * The duration of backchannel authentication request IDs issued from the
   * backchannel authentication endpoint in seconds. This is used as the value of the
   * `expires_in` property in responses from the backchannel authentication endpoint.
   */
  backchannelAuthReqIdDuration?: number;

  /**
   * The flag to indicate whether the `binding_message` request parameter is always
   * required whenever a backchannel authentication request is judged as a request
   * for Financial-grade API.
   *
   * The FAPI-CIBA profile requires that the authorization server _"shall ensure
   * unique authorization context exists in the authorization request or require a
   * `binding_message` in the authorization request"_ (FAPI-CIBA, 5.2.2, 2). The
   * simplest way to fulfill this requirement is to set this property to `true`.
   *
   * If this property is set to `false`, the `binding_message` request parameter
   * remains optional even in FAPI context, but in exchange, your authorization
   * server must implement a custom mechanism that ensures each backchannel
   * authentication request has unique context.
   */
  backchannelBindingMessageRequiredInFapi?: boolean;

  /**
   * The minimum interval between polling requests to the token endpoint from client
   * applications in seconds. This is used as the value of the `interval` property in
   * responses from the backchannel authentication endpoint.
   */
  backchannelPollingInterval?: number;

  /**
   * The boolean flag which indicates whether the `user_code` request parameter is
   * supported at the backchannel authentication endpoint. This property corresponds
   * to the `backchannel_user_code_parameter_supported` metadata.
   */
  backchannelUserCodeParameterSupported?: boolean;

  /**
   * The flag indicating whether claims specified by shortcut scopes (e.g. `profile`)
   * are included in the issued ID token only when no access token is issued.
   *
   * To strictly conform to the description below excerpted from
   * [OpenID Connect Core 1.0 Section 5.4](https://openid.net/specs/openid-connect-core-1_0.html#ScopeClaims),
   * this flag has to be `true`.
   *
   * > The Claims requested by the profile, email, address, and phone scope values
   * > are returned from the UserInfo Endpoint, as described in Section 5.3.2, when a
   * > response_type value is used that results in an Access Token being issued.
   * > However, when no Access Token is issued (which is the case for the
   * > response_type value id_token), the resulting Claims are returned in the ID
   * > Token.
   */
  claimShortcutRestrictive?: boolean;

  /**
   * Deprecated. Always `true`.
   */
  clientIdAliasEnabled?: boolean;

  /**
   * The duration of `c_nonce`.
   */
  cnonceDuration?: number;

  /**
   * The default duration of verifiable credentials in seconds.
   */
  credentialDuration?: number;

  credentialIssuerMetadata?: ServiceCreateServiceParams.CredentialIssuerMetadata;

  /**
   * The JWK Set document containing private keys that are used to sign verifiable
   * credentials.
   */
  credentialJwks?: string;

  /**
   * The URL at which the JWK Set document of the credential issuer is exposed.
   */
  credentialJwksUri?: string;

  /**
   * The default duration of credential offers in seconds.
   */
  credentialOfferDuration?: number;

  /**
   * The duration of transaction ID in seconds that may be issued as a result of a
   * credential request or a batch credential request.
   */
  credentialTransactionDuration?: number;

  /**
   * The flag indicating whether to block DCR (Dynamic Client Registration) requests
   * whose "software_id" has already been used previously.
   */
  dcrDuplicateSoftwareIdBlocked?: boolean;

  /**
   * The flag indicating whether the `scope` request parameter in dynamic client
   * registration and update requests (RFC 7591 and RFC 7592) is used as scopes that
   * the client can request.
   *
   * Limiting the range of scopes that a client can request is achieved by listing
   * scopes in the `client.extension.requestableScopes` property and setting the
   * `client.extension.requestableScopesEnabled` property to `true`. This feature is
   * called "requestable scopes".
   *
   * This property affects behaviors of `/api/client/registration` and other family
   * APIs.
   */
  dcrScopeUsedAsRequestable?: boolean;

  /**
   * The description about the service.
   */
  description?: string;

  /**
   * The URI of the device authorization endpoint.
   *
   * Device authorization endpoint is defined in the specification of OAuth 2.0
   * Device Authorization Grant.
   */
  deviceAuthorizationEndpoint?: string;

  /**
   * The duration of device verification codes and end-user verification codes issued
   * from the device authorization endpoint in seconds. This is used as the value of
   * the `expires_in` property in responses from the device authorization endpoint.
   */
  deviceFlowCodeDuration?: number;

  /**
   * The minimum interval between polling requests to the token endpoint from client
   * applications in seconds in device flow. This is used as the value of the
   * `interval` property in responses from the device authorization endpoint.
   */
  deviceFlowPollingInterval?: number;

  /**
   * The verification URI for the device flow. This URI is used as the value of the
   * `verification_uri` parameter in responses from the device authorization
   * endpoint.
   */
  deviceVerificationUri?: string;

  /**
   * The verification URI for the device flow with a placeholder for a user code.
   * This URI is used to build the value of the `verification_uri_complete` parameter
   * in responses from the device authorization endpoint.
   *
   * It is expected that the URI contains a fixed string `USER_CODE` somewhere as a
   * placeholder for a user code. For example, like the following.
   *
   * `https://example.com/device?user\_code=USER\_CODE`
   *
   * The fixed string is replaced with an actual user code when Authlete builds a
   * verification URI with a user code for the `verification_uri_complete` parameter.
   *
   * If this URI is not set, the `verification_uri_complete` parameter won't appear
   * in device authorization responses.
   */
  deviceVerificationUriComplete?: string;

  /**
   * The flag to indicate whether the direct authorization endpoint is enabled or
   * not.
   *
   * The path of the endpoint is `/api/auth/authorization/direct/service-api-key`.
   */
  directAuthorizationEndpointEnabled?: boolean;

  /**
   * The flag to indicate whether the direct userinfo endpoint is enabled or not. The
   * path of the endpoint is `/api/auth/userinfo/direct/{serviceApiKey}`.
   */
  directIntrospectionEndpointEnabled?: boolean;

  /**
   * 'The flag to indicate whether the direct jwks endpoint is enabled or not. The
   * path of the endpoint is `/api/service/jwks/get/direct/service-api-key`. '
   */
  directJwksEndpointEnabled?: boolean;

  /**
   * The flag to indicate whether the direct revocation endpoint is enabled or not.
   * The URL of the endpoint is `/api/auth/revocation/direct/service-api-key`.
   */
  directRevocationEndpointEnabled?: boolean;

  /**
   * The flag to indicate whether the direct token endpoint is enabled or not. The
   * path of the endpoint is `/api/auth/token/direct/service-api-key`.
   */
  directTokenEndpointEnabled?: boolean;

  /**
   * The flag to indicate whether the direct userinfo endpoint is enabled or not. The
   * path of the endpoint is `/api/auth/userinfo/direct/service-api-key`.
   */
  directUserInfoEndpointEnabled?: boolean;

  /**
   * The duration of nonce values for DPoP proof JWTs in seconds.
   */
  dpopNonceDuration?: number;

  /**
   * Whether to require DPoP proof JWTs to include the `nonce` claim whenever they
   * are presented.
   */
  dpopNonceRequired?: boolean;

  /**
   * The boolean flag which indicates whether the
   * [OAuth 2.0 Dynamic Client Registration Protocol](https://tools.ietf.org/html/rfc7591)
   * is supported.
   */
  dynamicRegistrationSupported?: boolean;

  /**
   * The endpoint for clients ending the sessions.
   *
   * A URL that starts with `https://` and has no fragment component. For example,
   * `https://example.com/auth/endSession`.
   *
   * The value of this property is used as `end_session_endpoint` property in the
   * [OpenID Provider Metadata](https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata).
   */
  endSessionEndpoint?: string;

  /**
   * The flag to indicate whether the `error_description` response parameter is
   * omitted.
   *
   * According to [RFC 6749](https://tools.ietf.org/html/rfc6749), an authorization
   * server may include the `error_description` response parameter in error
   * responses.
   *
   * If `true`, Authlete does not embed the `error_description` response parameter in
   * error responses.
   */
  errorDescriptionOmitted?: boolean;

  /**
   * The flag to indicate whether the `error_uri` response parameter is omitted.
   *
   * According to [RFC 6749](https://tools.ietf.org/html/rfc6749), an authorization
   * server may include the `error_uri` response parameter in error responses.
   *
   * If `true`, Authlete does not embed the `error_uri` response parameter in error
   * responses.
   */
  errorUriOmitted?: boolean;

  /**
   * FAPI modes for this service.
   *
   * When the value of this property is not `null`, Authlete always processes
   * requests to this service based on the specified FAPI modes if the FAPI feature
   * is enabled in Authlete and the FAPI profile is supported by this service.
   *
   * For instance, when this property is set to an array containing `FAPI1_ADVANCED`
   * only, Authlete always processes requests to this service based on
   * "Financial-grade API Security Profile 1.0 - Part 2: Advanced" if the FAPI
   * feature is enabled in Authlete and the FAPI profile is supported by this
   * service.
   */
  fapiModes?: Array<
    | 'FAPI1_ADVANCED'
    | 'FAPI1_BASELINE'
    | 'FAPI2_MESSAGE_SIGNING_AUTH_REQ'
    | 'FAPI2_MESSAGE_SIGNING_AUTH_RES'
    | 'FAPI2_MESSAGE_SIGNING_INTROSPECTION_RES'
    | 'FAPI2_SECURITY'
  >;

  /**
   * The duration of the entity configuration in seconds.
   */
  federationConfigurationDuration?: number;

  /**
   * flag indicating whether this service supports OpenID Connect Federation 1
   */
  federationEnabled?: boolean;

  /**
   * JWK Set document containing keys that are used to sign (1) self-signed entity
   * statement of this service and (2) the response from `signed_jwks_uri`.
   */
  federationJwks?: string;

  /**
   * The URI of the federation registration endpoint. This property corresponds to
   * the `federation_registration_endpoint` server metadata that is defined in OpenID
   * Connect Federation 1.0.
   */
  federationRegistrationEndpoint?: string;

  /**
   * A key ID to identify a JWK used to sign the entity configuration and the signed
   * JWK Set.
   */
  federationSignatureKeyId?: string;

  /**
   * The flag indicating whether encryption of request object is required when the
   * request object is passed through the front channel.
   *
   * This flag does not affect the processing of request objects at the Pushed
   * Authorization Request Endpoint, which is defined in
   * [OAuth 2.0 Pushed Authorization Requests](https://datatracker.ietf.org/doc/rfc9126/).
   * Unecrypted request objects are accepted at the endpoint even if this flag is
   * `true`.
   *
   * This flag does not indicate whether a request object is always required. There
   * is a different flag, `requestObjectRequired`, for the purpose. See the
   * description of `requestObjectRequired` for details.
   *
   * Even if this flag is `false`, encryption of request object is required if the
   * `frontChannelRequestObjectEncryptionRequired` flag of the client is `true`.
   */
  frontChannelRequestObjectEncryptionRequired?: boolean;

  /**
   * The flag indicating whether every authorization request (and any request serving
   * as an authorization request such as CIBA backchannel authentication request and
   * device authorization request) must include the `grant_management_action` request
   * parameter.
   *
   * This property corresponds to the `grant_management_action_required` server
   * metadata defined in
   * [Grant Management for OAuth 2.0](https://openid.net/specs/fapi-grant-management.html).
   *
   * Note that setting true to this property will result in blocking all public
   * clients because the specification requires that grant management be usable only
   * by confidential clients for security reasons.
   */
  grantManagementActionRequired?: boolean;

  /**
   * The URL of the grant management endpoint.
   */
  grantManagementEndpoint?: string;

  /**
   * The information about keys managed on HSMs (Hardware Security Modules).
   *
   * This `hsks` property is output only, meaning that `hsks` in requests to
   * `/api/service/create` API and `/api/service/update` API do not have any effect.
   * The contents of this property is controlled only by `/api/hsk/*` APIs.
   */
  hsks?: Array<HskAPI.Hsk>;

  /**
   * The flag indicating whether HSM (Hardware Security Module) support is enabled
   * for this service.
   *
   * When this flag is `false`, keys managed in HSMs are not used even if they exist.
   * In addition, `/api/hsk/*` APIs reject all requests.
   *
   * Even if this flag is `true`, HSM-related features do not work if the
   * configuration of the Authlete server you are using does not support HSM.
   */
  hsmEnabled?: boolean;

  /**
   * The type of the `aud` claim in ID tokens.
   */
  idTokenAudType?: string;

  /**
   * 'The duration of
   * [ID token](https://openid.net/specs/openid-connect-core-1_0.html#IDToken)s in
   * seconds. This value is used to calculate the value of `exp` claim in an ID
   * token.'
   */
  idTokenDuration?: number;

  /**
   * The flag indicating whether to enable the feature of ID token reissuance in the
   * refresh token flow.
   */
  idTokenReissuable?: boolean;

  /**
   * The key ID to identify a JWK used for ID token signature using an asymmetric
   * key.
   *
   * A JWK Set can be registered as a property of a Service. A JWK Set can contain 0
   * or more JWKs (See [RFC 7517](https://tools.ietf.org/html/rfc7517) for details
   * about JWK). Authlete Server has to pick up one JWK for signature from the JWK
   * Set when it generates an ID token and signature using an asymmetric key is
   * required. Authlete Server searches the registered JWK Set for a JWK which
   * satisfies conditions for ID token signature. If the number of JWK candidates
   * which satisfy the conditions is 1, there is no problem. On the other hand, if
   * there exist multiple candidates, a
   * [Key ID](https://tools.ietf.org/html/rfc7517#section-4.5) is needed to be
   * specified so that Authlete Server can pick up one JWK from among the JWK
   * candidates.
   *
   * This `idTokenSignatureKeyId` property exists for the purpose described above.
   * For key rotation (OpenID Connect Core 1.0,
   * [10.1.1. Rotation of Asymmetric Signing Keys](http://openid.net/specs/openid-connect-core-1_0.html#RotateSigKeys)),
   * this mechanism is needed.
   */
  idTokenSignatureKeyId?: string;

  /**
   * The URI of the introspection endpoint.
   */
  introspectionEndpoint?: string;

  /**
   * The key ID of the key for signing introspection responses.
   */
  introspectionSignatureKeyId?: string;

  /**
   * The flag indicating whether generation of the iss response parameter is
   * suppressed.
   *
   * "OAuth 2.0 Authorization Server Issuer Identifier in Authorization Response" has
   * defined a new authorization response parameter, `iss`, as a countermeasure for a
   * certain type of mix-up attacks.
   *
   * The specification requires that the `iss` response parameter always be included
   * in authorization responses unless JARM (JWT Secured Authorization Response Mode)
   * is used.
   *
   * When this flag is `true`, the authorization server does not include the `iss`
   * response parameter in authorization responses. By turning this flag on and off,
   * developers of client applications can experiment the mix-up attack and the
   * effect of the `iss` response parameter.
   *
   * Note that this flag should not be `true` in production environment unless there
   * are special reasons for it.
   */
  issSuppressed?: boolean;

  /**
   * The issuer identifier of the service.
   *
   * A URL that starts with https:// and has no query or fragment component.
   *
   * The value of this property is used as `iss` claim in an
   * [ID token](https://openid.net/specs/openid-connect-core-1_0.html#IDToken) and
   * `issuer` property in the
   * [OpenID Provider Metadata](https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata).
   */
  issuer?: string;

  /**
   * The content of the service's
   * [JSON Web Key Set](https://tools.ietf.org/html/rfc7517) document.
   *
   * If this property is not `null` in a `/service/create` request or a
   * `/service/update` request, Authlete hosts the content in the database. This
   * property must not be `null` and must contain pairs of public/private keys if the
   * service wants to support asymmetric signatures for ID tokens and asymmetric
   * encryption for request objects. See
   * [OpenID Connect Core 1.0, 10. Signatures and Encryption](https://openid.net/specs/openid-connect-core-1_0.html#SigEnc)
   * for details.
   */
  jwks?: string;

  /**
   * The URL of the service's [JSON Web Key Set](https://tools.ietf.org/html/rfc7517)
   * document. For example, `http://example.com/auth/jwks`.
   *
   * Client applications accesses this URL (1) to get the public key of the service
   * to validate the signature of an ID token issued by the service and (2) to get
   * the public key of the service to encrypt an request object of the client
   * application. See
   * [OpenID Connect Core 1.0, 10. Signatures and Encryption](https://openid.net/specs/openid-connect-core-1_0.html#SigEnc)
   * for details.
   *
   * The value of this property is used as `jwks_uri` property in the
   * [OpenID Provider Metadata](https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata).
   */
  jwksUri?: string;

  /**
   * The flag indicating whether to prohibit unidentifiable clients from using the
   * grant type "urn:ietf:params:oauth:grant-type:jwt-bearer".
   */
  jwtGrantByIdentifiableClientsOnly?: boolean;

  /**
   * The flag indicating whether to reject token requests that use an encrypted JWT
   * as an authorization grant with the grant type
   * "urn:ietf:params:oauth:grant-type:jwt-bearer".
   */
  jwtGrantEncryptedJwtRejected?: boolean;

  /**
   * The flag indicating whether to reject token requests that use an unsigned JWT as
   * an authorization grant with the grant type
   * "urn:ietf:params:oauth:grant-type:jwt-bearer".
   */
  jwtGrantUnsignedJwtRejected?: boolean;

  /**
   * The flag indicating whether the port number component of redirection URIs can be
   * variable when the host component indicates loopback.
   *
   * When this flag is `true`, if the host component of a redirection URI specified
   * in an authorization request indicates loopback (to be precise, when the host
   * component is localhost, `127.0.0.1` or `::1`), the port number component is
   * ignored when the specified redirection URI is compared to pre-registered ones.
   * This behavior is described in
   * [7.3. Loopback Interface Redirection](https://www.rfc-editor.org/rfc/rfc8252.html#section-7.3)
   * of [RFC 8252 OAuth 2.0](https://www.rfc-editor.org/rfc/rfc8252.html) for Native
   * Apps.
   *
   * [3.1.2.3. Dynamic Configuration](https://www.rfc-editor.org/rfc/rfc6749.html#section-3.1.2.3)
   * of [RFC 6749](https://www.rfc-editor.org/rfc/rfc6749.html) states _"If the
   * client registration included the full redirection URI, the authorization server
   * MUST compare the two URIs using simple string comparison as defined in [RFC3986]
   * Section 6.2.1."_ Also, the description of `redirect_uri` in
   * [3.1.2.1. Authentication Request](https://openid.net/specs/openid-connect-core-1_0.html#AuthRequest)
   * of
   * [OpenID Connect Core 1.0](https://openid.net/specs/openid-connect-core-1_0.html)
   * states _"This URI MUST exactly match one of the Redirection URI values for the
   * Client pre-registered at the OpenID Provider, with the matching performed as
   * described in Section 6.2.1 of [RFC3986] (**Simple String Comparison**)."_ These
   * "Simple String Comparison" requirements are preceded by this flag. That is, even
   * when the conditions described in RFC 6749 and OpenID Connect Core 1.0 are
   * satisfied, the port number component of loopback redirection URIs can be
   * variable when this flag is `true`.
   *
   * [8.3. Loopback Redirect Considerations](https://www.rfc-editor.org/rfc/rfc8252.html#section-8.3)
   * of [RFC 8252](https://www.rfc-editor.org/rfc/rfc8252.html) states as follows.
   *
   * > While redirect URIs using localhost (i.e., `"http://localhost:{port}/{path}"`)
   * > function similarly to loopback IP redirects described in Section 7.3, the use
   * > of localhost is NOT RECOMMENDED. Specifying a redirect URI with the loopback
   * > IP literal rather than localhost avoids inadvertently listening on network
   * > interfaces other than the loopback interface. It is also less susceptible to
   * > client-side firewalls and misconfigured host name resolution on the user's
   * > device.
   *
   * However, Authlete allows the port number component to be variable in the case of
   * `localhost`, too. It is left to client applications whether they use `localhost`
   * or a literal loopback IP address (`127.0.0.1` for IPv4 or `::1` for IPv6).
   *
   * Section 7.3 and Section 8.3 of
   * [RFC 8252](https://www.rfc-editor.org/rfc/rfc8252.html) state that loopback
   * redirection URIs use the `"http"` scheme, but Authlete allows the port number
   * component to be variable in other cases (e.g. in the case of the `"https"`
   * scheme), too.
   */
  loopbackRedirectionUriVariable?: boolean;

  /**
   * The `metadata` of the service. The content of the returned array depends on
   * contexts. The predefined service metadata is listed in the following table.
   *
   * | Key           | Description                                                     |
   * | ------------- | --------------------------------------------------------------- |
   * | `clientCount` | The number of client applications which belong to this service. |
   */
  metadata?: Array<TokenAPI.Pair>;

  /**
   * The flag to indicate token requests from public clients without the `client_id`
   * request parameter are allowed when the client can be guessed from
   * `authorization_code` or `refresh_token`.
   *
   * This flag should not be set unless you have special reasons.
   */
  missingClientIdAllowed?: boolean;

  /**
   * The MTLS endpoint aliases.
   *
   * This property corresponds to the mtls_endpoint_aliases metadata defined in "5.
   * Metadata for Mutual TLS Endpoint Aliases" of
   * [OAuth 2.0 Mutual TLS Client Authentication and Certificate-Bound Access Tokens](https://datatracker.ietf.org/doc/rfc8705/).
   *
   * The aliases will be embedded in the response from the discovery endpoint like
   * the following.
   *
   * ```json
   * {
   *   ......,
   *   "mtls_endpoint_aliases": {
   *     "token_endpoint":         "https://mtls.example.com/token",
   *     "revocation_endpoint":    "https://mtls.example.com/revo",
   *     "introspection_endpoint": "https://mtls.example.com/introspect"
   *   }
   * }
   * ```
   */
  mtlsEndpointAliases?: Array<ServiceCreateServiceParams.MtlsEndpointAlias>;

  /**
   * The flag to indicate whether this service validates certificate chains during
   * PKI-based client mutual TLS authentication.
   */
  mutualTlsValidatePkiCertChain?: boolean;

  /**
   * The flag indicating whether the nbf claim in the request object is optional even
   * when the authorization request is regarded as a FAPI-Part2 request.
   *
   * The final version of Financial-grade API was approved in January, 2021. The Part
   * 2 of the final version has new requirements on lifetime of request objects. They
   * require that request objects contain an `nbf` claim and the lifetime computed by
   * `exp` - `nbf` be no longer than 60 minutes.
   *
   * Therefore, when an authorization request is regarded as a FAPI-Part2 request,
   * the request object used in the authorization request must contain an nbf claim.
   * Otherwise, the authorization server rejects the authorization request.
   *
   * When this flag is `true`, the `nbf` claim is treated as an optional claim even
   * when the authorization request is regarded as a FAPI-Part2 request. That is, the
   * authorization server does not perform the validation on lifetime of the request
   * object.
   *
   * Skipping the validation is a violation of the FAPI specification. The reason why
   * this flag has been prepared nevertheless is that the new requirements (which do
   * not exist in the Implementer's Draft 2 released in October, 2018) have big
   * impacts on deployed implementations of client applications and Authlete thinks
   * there should be a mechanism whereby to make the migration from ID2 to Final
   * smooth without breaking live systems.
   */
  nbfOptional?: boolean;

  /**
   * The flag indicating whether the openid scope should be dropped from scopes list
   * assigned to access token issued when a refresh token grant is used.
   */
  openidDroppedOnRefreshWithoutOfflineAccess?: boolean;

  /**
   * The human-readable name representing the organization that operates this
   * service. This property corresponds to the `organization_name` server metadata
   * that is defined in OpenID Connect Federation 1.0.
   */
  organizationName?: string;

  /**
   * The flag to indicate whether this service requires that clients use the pushed
   * authorization request endpoint.
   *
   * This property corresponds to the `require_pushed_authorization_requests` server
   * metadata defined in
   * [OAuth 2.0 Pushed Authorization Requests](https://tools.ietf.org/html/draft-lodderstedt-oauth-par).
   */
  parRequired?: boolean;

  /**
   * The flag to indicate whether the use of Proof Key for Code Exchange (PKCE) is
   * always required for authorization requests by Authorization Code Flow.
   *
   * If `true`, `code_challenge` request parameter is always required for
   * authorization requests using Authorization Code Flow.
   *
   * See [RFC 7636](https://tools.ietf.org/html/rfc7636) (Proof Key for Code Exchange
   * by OAuth Public Clients) for details about `code_challenge` request parameter.
   */
  pkceRequired?: boolean;

  /**
   * The flag to indicate whether `S256` is always required as the code challenge
   * method whenever [PKCE (RFC 7636)](https://tools.ietf.org/html/rfc7636) is used.
   *
   * If this flag is set to `true`, `code_challenge_method=S256` must be included in
   * the authorization request whenever it includes the `code_challenge` request
   * parameter. Neither omission of the `code_challenge_method` request parameter nor
   * use of plain (`code_challenge_method=plain`) is allowed.
   */
  pkceS256Required?: boolean;

  /**
   * The URL of the "Policy" of the service.
   *
   * The value of this property is used as `op_policy_uri` property in the
   * [OpenID Provider Metadata](http://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata).
   */
  policyUri?: string;

  /**
   * The flag indicating whether token requests using the pre-authorized code grant
   * flow by unidentifiable clients are allowed.
   */
  preAuthorizedGrantAnonymousAccessSupported?: boolean;

  /**
   * The transformed claims predefined by this service in JSON format. This property
   * corresponds to the `transformed_claims_predefined` server metadata.
   */
  predefinedTransformedClaims?: string;

  /**
   * The duration of pushed authorization requests in seconds.
   *
   * [OAuth 2.0 Pushed Authorization Requests](https://tools.ietf.org/html/draft-lodderstedt-oauth-par)
   * defines an endpoint (called "pushed authorization request endpoint") which
   * client applications can register authorization requests into and get
   * corresponding URIs (called "request URIs") from. The issued URIs represent the
   * registered authorization requests. The client applications can use the URIs as
   * the value of the `request_uri` request parameter in an authorization request.
   *
   * The property represents the duration of registered authorization requests and is
   * used as the value of the `expires_in` parameter in responses from the pushed
   * authorization request endpoint.
   */
  pushedAuthReqDuration?: number;

  /**
   * The URI of the pushed authorization request endpoint.
   *
   * This property corresponds to the `pushed_authorization_request_endpoint`
   * metadata defined in
   * "[5. Authorization Server Metadata](https://tools.ietf.org/html/draft-lodderstedt-oauth-par#section-5)"
   * of OAuth 2.0 Pushed Authorization Requests.
   */
  pushedAuthReqEndpoint?: string;

  /**
   * The duration of refresh tokens in seconds. The related specifications have no
   * requirements on refresh token duration, but Authlete sets expiration for refresh
   * tokens.
   */
  refreshTokenDuration?: number;

  /**
   * The flag to indicate whether the remaining duration of the used refresh token is
   * taken over to the newly issued refresh token.
   */
  refreshTokenDurationKept?: boolean;

  /**
   * The flag which indicates whether duration of refresh tokens are reset when they
   * are used even if the `refreshTokenKept` property of this service set to is
   * `true` (= even if "Refresh Token Continuous Use" is "Kept").
   *
   * This flag has no effect when the `refreshTokenKept` property is set to `false`.
   * In other words, if this service issues a new refresh token on every refresh
   * token request, the refresh token will have fresh duration (unless
   * `refreshTokenDurationKept` is set to `true`) and this
   * `refreshTokenDurationReset` property is not referenced.
   */
  refreshTokenDurationReset?: boolean;

  /**
   * flag indicating whether refresh token requests with the same refresh token can
   * be made multiple times in quick succession and they can obtain the same renewed
   * refresh token within the short period.
   */
  refreshTokenIdempotent?: boolean;

  /**
   * The flag to indicate whether a refresh token remains unchanged or gets renewed
   * after its use.
   *
   * If `true`, a refresh token used to get a new access token remains valid after
   * its use. Otherwise, if `false`, a refresh token is invalidated after its use and
   * a new refresh token is issued.
   *
   * See
   * [RFC 6749 6. Refreshing an Access Token](https://tools.ietf.org/html/rfc6749#section-6),
   * as to how to get a new access token using a refresh token.
   */
  refreshTokenKept?: boolean;

  /**
   * The
   * [registration endpoint](http://openid.net/specs/openid-connect-registration-1_0.html#ClientRegistration)
   * of the service. A URL that starts with `https://`. For example,
   * `https://example.com/auth/registration`.
   *
   * The value of this property is used as `registration_endpoint` property in the
   * [OpenID Provider Metadata](http://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata).
   */
  registrationEndpoint?: string;

  /**
   * The URI of the registration management endpoint. If dynamic client registration
   * is supported, and this is set, this URI will be used as the basis of the
   * client's management endpoint by appending `/clientid}/` to it as a path element.
   * If this is unset, the value of `registrationEndpoint` will be used as the URI
   * base instead.
   */
  registrationManagementEndpoint?: string;

  /**
   * The flag indicating whether Authlete checks whether the `aud` claim of request
   * objects matches the issuer identifier of this service.
   *
   * [Section 6.1. Passing a Request Object by Value](https://openid.net/specs/openid-connect-core-1_0.html#JWTRequests)
   * of
   * [OpenID Connect Core 1.0](https://openid.net/specs/openid-connect-core-1_0.html)
   * has the following statement.
   *
   * > The `aud` value SHOULD be or include the OP's Issuer Identifier URL.
   *
   * Likewise,
   * [Section 4. Request Object](https://www.rfc-editor.org/rfc/rfc9101.html#section-4)
   * of [RFC 9101](https://www.rfc-editor.org/rfc/rfc9101.html) (The OAuth 2.0
   * Authorization Framework: JWT-Secured Authorization Request (JAR)) has the
   * following statement.
   *
   * > The value of aud should be the value of the authorization server (AS) issuer,
   * > as defined in [RFC 8414](https://www.rfc-editor.org/rfc/rfc8414.html).
   *
   * As excerpted above, validation on the `aud` claim of request objects is
   * optional. However, if this flag is turned on, Authlete checks whether the `aud`
   * claim of request objects matches the issuer identifier of this service and
   * raises an error if they are different.
   */
  requestObjectAudienceChecked?: boolean;

  /**
   * The flag indicating whether the JWE alg of encrypted request object must match
   * the `request_object_encryption_alg` client metadata of the client that has sent
   * the request object.
   *
   * The request_object_encryption_alg client metadata itself is defined in
   * [OpenID Connect Dynamic Client Registration 1.0](https://openid.net/specs/openid-connect-registration-1_0.html)
   * as follows.
   *
   * > request_object_encryption_alg
   * >
   * > OPTIONAL. JWE [JWE] alg algorithm [JWA] the RP is declaring that it may use
   * > for encrypting Request Objects sent to the OP. This parameter SHOULD be
   * > included when symmetric encryption will be used, since this signals to the OP
   * > that a client_secret value needs to be returned from which the symmetric key
   * > will be derived, that might not otherwise be returned. The RP MAY still use
   * > other supported encryption algorithms or send unencrypted Request Objects,
   * > even when this parameter is present. If both signing and encryption are
   * > requested, the Request Object will be signed then encrypted, with the result
   * > being a Nested JWT, as defined in [JWT]. The default, if omitted, is that the
   * > RP is not declaring whether it might encrypt any Request Objects.
   *
   * The point here is "The RP MAY still use other supported encryption algorithms or
   * send unencrypted Request Objects, even when this parameter is present."
   *
   * The Client's property that represents the client metadata is
   * `requestEncryptionAlg`. See the description of `requestEncryptionAlg` for
   * details.
   *
   * Even if this flag is `false`, the match is required if the
   * `requestObjectEncryptionAlgMatchRequired` flag of the client is `true`.
   */
  requestObjectEncryptionAlgMatchRequired?: boolean;

  /**
   * The flag indicating whether the JWE `enc` of encrypted request object must match
   * the `request_object_encryption_enc` client metadata of the client that has sent
   * the request object.
   *
   * The `request_object_encryption_enc` client metadata itself is defined in
   * [OpenID Connect Dynamic Client Registration 1.0](https://openid.net/specs/openid-connect-registration-1_0.html)
   * as follows.
   *
   * > request_object_encryption_enc
   * >
   * > OPTIONAL. JWE enc algorithm [JWA] the RP is declaring that it may use for
   * > encrypting Request Objects sent to the OP. If request_object_encryption_alg is
   * > specified, the default for this value is A128CBC-HS256. When
   * > request_object_encryption_enc is included, request_object_encryption_alg MUST
   * > also be provided.
   *
   * The Client's property that represents the client metadata is
   * `requestEncryptionEnc`. See the description of `requestEncryptionEnc` for
   * details.
   *
   * Even if this flag is false, the match is required if the
   * `requestObjectEncryptionEncMatchRequired` flag is `true`.
   */
  requestObjectEncryptionEncMatchRequired?: boolean;

  /**
   * The flag to indicate whether this service requires that authorization requests
   * always utilize a request object by using either request or `request_uri` request
   * parameter.
   *
   * If this flag is set to `true` and the value of
   * `traditionalRequestObjectProcessingApplied` is `false`, the value of
   * `require_signed_request_object` server metadata of this service is reported as
   * `true` in the discovery document. The metadata is defined in JAR (JWT Secured
   * Authorization Request). That `require_signed_request_object` is `true` means
   * that authorization requests which don't conform to the JAR specification are
   * rejected.
   */
  requestObjectRequired?: boolean;

  /**
   * The key ID of the key for signing introspection responses.
   */
  resourceSignatureKeyId?: string;

  /**
   * The [revocation endpoint](https://tools.ietf.org/html/rfc7009) of the service.
   *
   * A URL that starts with `https://`. For example,
   * `https://example.com/auth/revocation`.
   */
  revocationEndpoint?: string;

  /**
   * The flag indicating whether this service signs responses from the resource
   * server.
   */
  rsResponseSigned?: boolean;

  /**
   * The flag to indicate whether requests that request no scope are rejected or not.
   *
   * When a request has no explicit `scope` parameter and the service's pre-defined
   * default scope set is empty, the authorization server regards the request
   * requests no scope. When this flag is set to `true`, requests that request no
   * scope are rejected.
   *
   * The requirement below excerpted from
   * [RFC 6749 Section 3.3](https://tools.ietf.org/html/rfc6749#section-3.3) does not
   * explicitly mention the case where the default scope set is empty.
   *
   * > If the client omits the scope parameter when requesting authorization, the
   * > authorization server MUST either process the request using a pre-defined
   * > default value or fail the request indicating an invalid scope.
   *
   * However, if you interpret _"the default scope set exists but is empty"_ as _"the
   * default scope set does not exist"_ and want to strictly conform to the
   * requirement above, this flag has to be `true`.
   */
  scopeRequired?: boolean;

  /**
   * The URL of a page where documents for developers can be found.
   *
   * The value of this property is used as `service_documentation` property in the
   * [OpenID Provider Metadata](http://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata).
   */
  serviceDocumentation?: string;

  /**
   * The name of this service.
   */
  serviceName?: string;

  /**
   * The URI of the endpoint that returns this service's JWK Set document in the JWT
   * format. This property corresponds to the `signed_jwks_uri` server metadata
   * defined in OpenID Connect Federation 1.0.
   */
  signedJwksUri?: string;

  /**
   * The flag to indicate whether the number of access tokens per subject (and per
   * client) is at most one or can be more.
   *
   * If `true`, an attempt to issue a new access token invalidates existing access
   * tokens that are associated with the same subject and the same client.
   *
   * Note that, however, attempts by
   * [Client Credentials Flow](https://tools.ietf.org/html/rfc6749#section-4.4) do
   * not invalidate existing access tokens because access tokens issued by Client
   * Credentials Flow are not associated with any end-user's subject. Also note that
   * an attempt by
   * [Refresh Token Flow](https://tools.ietf.org/html/rfc6749#section-6) invalidates
   * the coupled access token only and this invalidation is always performed
   * regardless of whether the value of this setting item is `true` or `false`.
   */
  singleAccessTokenPerSubject?: boolean;

  /**
   * Supported attachment types. This property corresponds to the {@code
   * attachments_supported} server metadata which was added by the third
   * implementer's draft of OpenID Connect for Identity Assurance 1.0.
   */
  supportedAttachments?: Array<'EMBEDDED' | 'EXTERNAL'>;

  /**
   * The supported data types that can be used as values of the type field in
   * `authorization_details`.
   *
   * This property corresponds to the `authorization_details_types_supported`
   * metadata. See "OAuth 2.0 Rich Authorization Requests" (RAR) for details.
   */
  supportedAuthorizationDetailsTypes?: Array<string>;

  /**
   * The supported backchannel token delivery modes. This property corresponds to the
   * `backchannel_token_delivery_modes_supported` metadata.
   *
   * Backchannel token delivery modes are defined in the specification of
   * [CIBA (Client Initiated Backchannel Authentication)](https://openid.net/specs/openid-client-initiated-backchannel-authentication-core-1_0.html).
   */
  supportedBackchannelTokenDeliveryModes?: Array<AuthenticationAPI.DeliveryMode>;

  /**
   * Claim locales that the service supports. Each element is a language tag defined
   * in [RFC 5646](https://tools.ietf.org/html/rfc5646). For example, `en-US` and
   * `ja-JP`. See
   * [OpenID Connect Core 1.0, 5.2. Languages and Scripts](https://openid.net/specs/openid-connect-core-1_0.html#ClaimsLanguagesAndScripts)
   * for details.
   *
   * The value of this property is used as `claims_locales_supported` property in the
   * [OpenID Provider Metadata](https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata).
   */
  supportedClaimLocales?: Array<string>;

  /**
   * Claim names that the service supports. The standard claim names listed in
   * [OpenID Connect Core 1.0, 5.1. Standard Claim](https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims)
   * should be supported. The following is the list of standard claims.
   *
   * - `sub`
   * - `name`
   * - `given_name`
   * - `family_name`
   * - `middle_name`
   * - `nickname`
   * - `preferred_username`
   * - `profile`
   * - `picture`
   * - `website`
   * - `email`
   * - `email_verified`
   * - `gender`
   * - `birthdate`
   * - `zoneinfo`
   * - `locale`
   * - `phone_number`
   * - `phone_number_verified`
   * - `address`
   * - `updated_at`
   *
   * The value of this property is used as `claims_supported` property in the
   * [OpenID Provider Metadata](https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata).
   *
   * The service may support its original claim names. See
   * [OpenID Connect Core 1.0, 5.1.2. Additional Claims](https://openid.net/specs/openid-connect-core-1_0.html#AdditionalClaims).
   */
  supportedClaims?: Array<string>;

  /**
   * Claim types supported by the service. Valid values are listed in Claim Type.
   * Note that Authlete currently doesn't provide any API to help implementations for
   * `AGGREGATED` and `DISTRIBUTED`.
   *
   * The value of this property is used as `claim_types_supported` property in the
   * [OpenID Provider Metadata](https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata).
   */
  supportedClaimTypes?: Array<'NORMAL' | 'AGGREGATED' | 'DISTRIBUTED'>;

  supportedClientRegistrationTypes?: Array<'AUTOMATIC' | 'EXPLICIT'>;

  /**
   * custom client metadata supported by this service.
   *
   * Standard specifications define client metadata as necessary. The following are
   * such examples.
   *
   * - [OpenID Connect Dynamic Client Registration 1.0](https://openid.net/specs/openid-connect-registration-1_0.html)
   * - [RFC 7591 OAuth 2.0 Dynamic Client Registration Protocol](https://www.rfc-editor.org/rfc/rfc7591.html)
   * - [RFC 8705 OAuth 2.0 Mutual-TLS Client Authentication and Certificate-Bound Access Tokens](https://www.rfc-editor.org/rfc/rfc8705.html)
   * - [OpenID Connect Client-Initiated Backchannel Authentication Flow - Core 1.0](https://openid.net/specs/openid-client-initiated-backchannel-authentication-core-1_0.html)
   * - [The OAuth 2.0 Authorization Framework: JWT Secured Authorization Request (JAR)](https://datatracker.ietf.org/doc/draft-ietf-oauth-jwsreq/)
   * - [Financial-grade API: JWT Secured Authorization Response Mode for OAuth 2.0 (JARM)](https://openid.net/specs/openid-financial-api-jarm.html)
   * - [OAuth 2.0 Pushed Authorization Requests (PAR)](https://datatracker.ietf.org/doc/rfc9126/)
   * - [OAuth 2.0 Rich Authorization Requests (RAR)](https://datatracker.ietf.org/doc/draft-ietf-oauth-rar/)
   *
   * Standard client metadata included in Client Registration Request and Client
   * Update Request (cf.
   * [OIDC DynReg](https://openid.net/specs/openid-connect-registration-1_0.html),
   * [RFC 7591](https://www.rfc-editor.org/rfc/rfc7591.html) and
   * [RFC 7592](https://www.rfc-editor.org/rfc/rfc7592.html)) are, if supported by
   * Authlete, stored into Authlete database. On the other hand, unrecognized client
   * metadata are discarded.
   *
   * By listing up custom client metadata in advance by using this property
   * (`supportedCustomClientMetadata`), Authlete can recognize them and stores their
   * values into the database. The stored custom client metadata values can be
   * referenced by `customMetadata`.
   */
  supportedCustomClientMetadata?: Array<string>;

  /**
   * Supported algorithms used to compute digest values of external attachments. This
   * property corresponds to the `digest_algorithms_supported` server metadata which
   * was added by the third implementer's draft of OpenID Connect for Identity
   * Assurance 1.0.
   */
  supportedDigestAlgorithms?: Array<string>;

  /**
   * Values of `display` request parameter that service supports.
   *
   * The value of this property is used as `display_values_supported` property in the
   * Provider
   * Metadata](https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata).
   */
  supportedDisplays?: Array<AuthorizationAPI.Display>;

  /**
   * Document types supported by this service. This property corresponds to the
   * `documents_supported` server metadata.
   */
  supportedDocuments?: Array<string>;

  /**
   * Supported document check methods. This property corresponds to the
   * `documents_check_methods_supported` server metadata which was added by the
   * fourth implementer's draft of OpenID Connect for Identity Assurance 1.0.
   */
  supportedDocumentsCheckMethods?: Array<string>;

  /**
   * validation and verification processes supported by this service. This property
   * corresponds to the `documents_methods_supported` server metadata.
   *
   * The third implementer's draft of
   * [OpenID Connect for Identity Assurance 1.0](https://openid.net/specs/openid-connect-4-identity-assurance-1_0.html)
   * renamed the `id_documents_verification_methods_supported` server metadata to
   * `documents_methods_supported`.
   */
  supportedDocumentsMethods?: Array<string>;

  /**
   * Document validation methods supported by this service. This property corresponds
   * to the `documents_validation_methods_supported` server metadata which was added
   * by the third implementer's draft of <a href=
   * [OpenID Connect for Identity Assurance 1.0](https://openid.net/specs/openid-connect-4-identity-assurance-1_0.html)
   */
  supportedDocumentsValidationMethods?: Array<string>;

  /**
   * Document verification methods supported by this service. This property
   * corresponds to the `documents_verification_methods_supported` server metadata
   * which was added by the third implementer's draft of
   * [OpenID Connect for Identity Assurance 1.0](https://openid.net/specs/openid-connect-4-identity-assurance-1_0.html)
   */
  supportedDocumentsVerificationMethods?: Array<string>;

  /**
   * Electronic record types supported by this service. This property corresponds to
   * the `electronic_records_supported` server metadata which was added by the third
   * implementer's draft of
   * [OpenID Connect for Identity Assurance 1.0](https://openid.net/specs/openid-connect-4-identity-assurance-1_0.html)
   */
  supportedElectronicRecords?: Array<string>;

  /**
   * Evidence supported by this service. This corresponds to the `evidence_supported`
   * [metadata](https://openid.net/specs/openid-connect-4-identity-assurance-1_0.html#rfc.section.7).
   */
  supportedEvidence?: Array<string>;

  /**
   * Values of `grant_type` request parameter that the service supports.
   *
   * The value of this property is used as `grant_types_supported property` in the
   * [OpenID Provider Metadata](https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata).
   */
  supportedGrantTypes?: Array<IntrospectionAPI.GrantType>;

  /**
   * Identity documents supported by this service. This corresponds to the
   * `id_documents_supported`
   * [metadata](https://openid.net/specs/openid-connect-4-identity-assurance-1_0.html#rfc.section.7).
   */
  supportedIdentityDocuments?: Array<string>;

  /**
   * Client authentication methods supported at the introspection endpoint.
   */
  supportedIntrospectionAuthMethods?: Array<ClientGetAPI.ClientAuthenticationMethod>;

  /**
   * The supported `prompt` values.
   */
  supportedPromptValues?: Array<AuthorizationAPI.Prompt>;

  /**
   * Values of `response_type` request parameter that the service supports. Valid
   * values are listed in Response Type.
   *
   * The value of this property is used as `response_types_supported` property in the
   * [OpenID Provider Metadata](https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata).
   */
  supportedResponseTypes?: Array<GetAPI.ResponseType>;

  /**
   * Client authentication methods supported at the revocation endpoint.
   */
  supportedRevocationAuthMethods?: Array<ClientGetAPI.ClientAuthenticationMethod>;

  /**
   * Scopes supported by the service.
   *
   * Authlete strongly recommends that the service register at least the following
   * scopes.
   *
   * | Name           | Description                                                                                                                                                                                                                                                                                                                                                                                                     |
   * | -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   * | openid         | A permission to get an ID token of an end-user. The `openid` scope appears in [OpenID Connect Core 1.0, 3.1.2.1. Authentication Request, scope](https://openid.net/specs/openid-connect-core-1_0.html#AuthRequest). Without this scope, Authlete does not allow `response_type` request parameter to have values other than code and token.                                                                     |
   * | profile        | A permission to get information about `name`, `family_name`, `given_name`, `middle_name`, `nickname`, `preferred_username`, `profile`, `picture`, `website`, `gender`, `birthdate`, `zoneinfo`, `locale` and `updated_at` from the user info endpoint. See [OpenID Connect Core 1.0, 5.4. Requesting Claims using Scope Values](https://openid.net/specs/openid-connect-core-1_0.html#ScopeClaims) for details. |
   * | email          | A permission to get information about `email` and `email_verified` from the user info endpoint. See [OpenID Connect Core 1.0, 5.4. Requesting Claims using Scope Values](https://openid.net/specs/openid-connect-core-1_0.html#ScopeClaims) for details.                                                                                                                                                        |
   * | address        | A permission to get information about address from the user info endpoint. See [OpenID Connect Core 1.0, 5.4. Requesting Claims using Scope Values](https://openid.net/specs/openid-connect-core-1_0.html#ScopeClaims) and [5.1.1. Address Claim](https://openid.net/specs/openid-connect-core-1_0.html#AddressClaim) for details.                                                                              |
   * | phone          | A permission to get information about `phone_number` and `phone_number_verified` from the user info endpoint. See [OpenID Connect Core 1.0, 5.4. Requesting Claims using Scope Values](https://openid.net/specs/openid-connect-core-1_0.html#ScopeClaims) for details.                                                                                                                                          |
   * | offline_access | A permission to get information from the user info endpoint even when the end-user is not present. See [OpenID Connect Core 1.0, 11. Offline Access](https://openid.net/specs/openid-connect-core-1_0.html#OfflineAccess) for details.                                                                                                                                                                          |
   *
   * The value of this property is used as `scopes_supported` property in the
   * [OpenID Provider Metadata](https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata).
   */
  supportedScopes?: Array<AuthorizationAPI.Scope>;

  /**
   * The profiles that this service supports.
   */
  supportedServiceProfiles?: Array<'FAPI' | 'OPEN_BANKING'>;

  /**
   * Client authentication methods supported by the token endpoint of the service.
   *
   * The value of this property is used as `token_endpoint_auth_methods_supports`
   * property in the
   * [OpenID Provider Metadata](https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata).
   */
  supportedTokenAuthMethods?: Array<ClientGetAPI.ClientAuthenticationMethod>;

  /**
   * Trust frameworks supported by this service. This corresponds to the
   * `trust_frameworks_supported`
   * [metadata](https://openid.net/specs/openid-connect-4-identity-assurance-1_0.html#rfc.section.7).
   */
  supportedTrustFrameworks?: Array<string>;

  /**
   * UI locales that the service supports.
   *
   * Each element is a language tag defined in
   * [RFC 5646](https://tools.ietf.org/html/rfc5646). For example, `en-US` and
   * `ja-JP`.
   *
   * The value of this property is used as `ui_locales_supported` property in the
   * [OpenID Provider Metadata](https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata).
   */
  supportedUiLocales?: Array<string>;

  /**
   * Verification methods supported by this service. This corresponds to the
   * `id_documents_verification_methods_supported`
   * [metadata](https://openid.net/specs/openid-connect-4-identity-assurance-1_0.html#rfc.section.7).
   */
  supportedVerificationMethods?: Array<string>;

  /**
   * Verified claims supported by this service. This corresponds to the
   * `claims_in_verified_claims_supported`
   * [metadata](https://openid.net/specs/openid-connect-4-identity-assurance-1_0.html#rfc.section.7).
   */
  supportedVerifiedClaims?: Array<string>;

  /**
   * The flag to indicate whether this service supports issuing TLS client
   * certificate bound access tokens.
   */
  tlsClientCertificateBoundAccessTokens?: boolean;

  /**
   * The [token endpoint](https://tools.ietf.org/html/rfc6749#section-3.2) of the
   * service.
   *
   * A URL that starts with `https://` and has not fragment component. For example,
   * `https://example.com/auth/token`.
   *
   * The value of this property is used as `token_endpoint` property in the
   * [OpenID Provider Metadata](https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata).
   */
  tokenEndpoint?: string;

  /**
   * The flag indicating whether to prohibit public clients from making token
   * exchange requests.
   */
  tokenExchangeByConfidentialClientsOnly?: boolean;

  /**
   * The flag indicating whether to prohibit unidentifiable clients from making token
   * exchange requests.
   */
  tokenExchangeByIdentifiableClientsOnly?: boolean;

  /**
   * The flag indicating whether to prohibit clients that have no explicit permission
   * from making token exchange requests.
   */
  tokenExchangeByPermittedClientsOnly?: boolean;

  /**
   * The flag indicating whether to reject token exchange requests which use
   * encrypted JWTs as input tokens.
   */
  tokenExchangeEncryptedJwtRejected?: boolean;

  /**
   * The flag indicating whether to reject token exchange requests which use unsigned
   * JWTs as input tokens.
   */
  tokenExchangeUnsignedJwtRejected?: boolean;

  /**
   * The flag indicating whether the expiration date of an access token never exceeds
   * that of the corresponding refresh token.
   *
   * When a new access token is issued by a refresh token request (= a token request
   * with `grant_type=refresh_token`), the expiration date of the access token may
   * exceed the expiration date of the corresponding refresh token. This behavior
   * itself is not wrong and may happen when `refreshTokenKept` is `true` and/or when
   * `refreshTokenDurationKept` is `true`.
   *
   * When this flag is `true`, the expiration date of an access token never exceeds
   * that of the corresponding refresh token regardless of the calculated duration
   * based on other settings such as `accessTokenDuration`, `accessTokenDuration` in
   * `extension` and `access_token.duration` scope attribute.
   *
   * It is technically possible to set a value which is bigger than the duration of
   * refresh tokens as the duration of access tokens although it is strange. In the
   * case, the duration of an access token becomes longer than the duration of the
   * refresh token which is issued together with the access token. Even if the
   * duration values are configured so, if this flag is `true`, the expiration date
   * of the access token does not exceed that of the refresh token. That is, the
   * duration of the access token will be shortened, and as a result, the access
   * token and the refresh token will have the same expiration date.
   */
  tokenExpirationLinked?: boolean;

  /**
   * The URL of the "Terms Of Service" of the service.
   *
   * The value of this property is used as `op_tos_uri` property in the
   * [OpenID Provider Metadata](http://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata).
   */
  tosUri?: string;

  /**
   * The flag to indicate whether a request object is processed based on rules
   * defined in
   * [OpenID Connect Core 1.0](https://openid.net/specs/openid-connect-core-1_0.html)
   * or JAR (JWT Secured Authorization Request).
   *
   * Differences between rules in OpenID Connect Core 1.0 and ones in JAR are as
   * follows.
   *
   * - JAR requires that a request object be always -signed.
   * - JAR does not allow request parameters outside a request object to be referred
   *   to.
   * - OIDC Core 1.0 requires that response_type request parameter exist outside a
   *   request object even if the request object includes the request parameter.
   * - OIDC Core 1.0 requires that scope request parameter exist outside a request
   *   object if the authorization request is an
   * - OIDC request even if the request object includes the request parameter.
   *
   * If this flag is set to `false` and the value of `requestObjectRequired` is
   * `true`, the value of `require_signed_request_object` server metadata of this
   * service is reported as `true` in the discovery document. The metadata is defined
   * in JAR (JWT Secured Authorization Request). That `require_signed_request_object`
   * is `true` means that authorization requests which don't conform to the JAR
   * specification are rejected.
   */
  traditionalRequestObjectProcessingApplied?: boolean;

  /**
   * The trust anchors that are referenced when this service resolves trust chains of
   * relying parties.
   *
   * If this property is empty, client registration fails regardless of whether its
   * type is `automatic` or `explicit`. It means that OpenID Connect Federation 1.0
   * does not work.
   */
  trustAnchors?: Array<ServiceCreateServiceParams.TrustAnchor>;

  /**
   * The list of root certificates trusted by this service for PKI-based client
   * mutual TLS authentication.
   */
  trustedRootCertificates?: Array<string>;

  /**
   * The flag indicating whether Authlete's `/api/client/registration` API uses
   * `UNAUTHORIZED` as a value of the `action` response parameter when appropriate.
   *
   * The `UNAUTHORIZED` enum value was initially not defined as a possible value of
   * the `action` parameter in an `/api/client/registration` API response. This means
   * that implementations of client `configuration` endpoint were not able to conform
   * to [RFC 7592](https://www.rfc-editor.org/rfc/rfc7592.html) strictly.
   *
   * For backward compatibility (to avoid breaking running systems), Authlete's
   * `/api/client/registration` API does not return the `UNAUTHORIZED` enum value if
   * this flag is not turned on.
   *
   * The steps an existing implementation of client configuration endpoint has to do
   * in order to conform to the requirement related to "401 Unauthorized" are as
   * follows.
   *
   * 1. Update the Authlete library (e.g. authlete-java-common) your system is using.
   * 2. Update your implementation of client configuration endpoint so that it can
   *    handle the `UNAUTHORIZED` action.
   * 3. Turn on this `unauthorizedOnClientConfigSupported` flag.
   */
  unauthorizedOnClientConfigSupported?: boolean;

  /**
   * The character set for end-user verification codes (`user_code`) for Device Flow.
   */
  userCodeCharset?: 'BASE20' | 'NUMERIC';

  /**
   * The length of end-user verification codes (`user_code`) for Device Flow.
   */
  userCodeLength?: number;

  /**
   * The
   * [user info endpoint](http://openid.net/specs/openid-connect-core-1_0.html#UserInfo)
   * of the service. A URL that starts with `https://`. For example,
   * `https://example.com/auth/userinfo`.
   *
   * The value of this property is used as `userinfo_endpoint` property in the
   * [OpenID Provider Metadata](http://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata).
   */
  userInfoEndpoint?: string;

  /**
   * The key ID to identify a JWK used for user info signature using an asymmetric
   * key.
   *
   * A JWK Set can be registered as a property of a Service. A JWK Set can contain 0
   * or more JWKs (See [RFC 7517](https://tools.ietf.org/html/rfc7517) for details
   * about JWK). Authlete Server has to pick up one JWK for signature from the JWK
   * Set when it is required to sign user info (which is returned from
   * [userinfo endpoint](http://openid.net/specs/openid-connect-core-1_0.html#UserInfo))
   * using an asymmetric key. Authlete Server searches the registered JWK Set for a
   * JWK which satisfies conditions for user info signature. If the number of JWK
   * candidates which satisfy the conditions is 1, there is no problem. On the other
   * hand, if there exist multiple candidates, a
   * [Key ID](https://tools.ietf.org/html/rfc7517#section-4.5) is needed to be
   * specified so that Authlete Server can pick up one JWK from among the JWK
   * candidates.
   *
   * This `userInfoSignatureKeyId` property exists for the purpose described above.
   * For key rotation (OpenID Connect Core 1.0,
   * [10.1.1. Rotation of Asymmetric Signing Keys](http://openid.net/specs/openid-connect-core-1_0.html#RotateSigKeys)),
   * this mechanism is needed.
   */
  userInfoSignatureKeyId?: string;

  /**
   * The default length of user PINs.
   */
  userPinLength?: number;

  /**
   * Get the flag indicating whether the feature of Verifiable Credentials for this
   * service is enabled or not.
   */
  verifiableCredentialsEnabled?: boolean;

  /**
   * OIDC4IDA / verifiedClaimsValidationSchemaSet
   */
  verifiedClaimsValidationSchemaSet?: 'standard' | 'standard+id_document';
}

export namespace ServiceCreateServiceParams {
  export interface CredentialIssuerMetadata {
    /**
     * The identifier of the authorization server that the credential issuer relies on
     * for authorization.
     */
    authorizationServer?: string;

    /**
     * The URL of the batch credential endpoint of the credential issuer.
     */
    batchCredentialEndpoint?: number;

    /**
     * The URL of the credential endpoint of the credential issuer.
     */
    credentialEndpoint?: boolean;

    /**
     * The identifier of a credential request.
     */
    credentialIssuer?: string;

    /**
     * A JSON array describing supported credentials.
     */
    credentialsSupported?: boolean;

    /**
     * The URL of the deferred credential endpoint of the credential issuer.
     */
    deferredCredentialEndpoint?: string;
  }

  export interface MtlsEndpointAlias {
    name?: string;

    uri?: string;
  }

  export interface TrustAnchor {
    /**
     * the entity ID of the trust anchor
     */
    entityId?: string;

    /**
     * the JWK Set document containing public keys of the trust anchor
     */
    jwks?: string;
  }
}

export interface ServiceUpdateServiceParams {
  /**
   * The duration of access tokens in seconds. This value is used as the value of
   * `expires_in` property in access token responses. `expires_in` is defined
   * [RFC 6749, 5.1. Successful Response](https://tools.ietf.org/html/rfc6749#section-5.1).
   */
  accessTokenDuration?: number;

  /**
   * The flag indicating whether Authlete generates access tokens for external
   * attachments and embeds them in ID tokens and userinfo responses.
   */
  accessTokenForExternalAttachmentEmbedded?: boolean;

  /**
   * The signature algorithm for JWT. This value is represented on 'alg' attribute of
   * the header of JWT.
   *
   * it's semantics depends upon where is this defined, for instance:
   *
   * - as service accessTokenSignAlg value, it defines that access token are JWT and
   *   the algorithm used to sign it. Check your
   *   [KB article](https://kb.authlete.com/en/s/oauth-and-openid-connect/a/jwt-based-access-token).
   * - as client authorizationSignAlg value, it represents the signature algorithm
   *   used when
   *   [creating a JARM response](https://kb.authlete.com/en/s/oauth-and-openid-connect/a/enabling-jarm).
   * - or as client requestSignAlg value, it specifies which is the expected
   *   signature used by
   *   [client on a Request Object](https://kb.authlete.com/en/s/oauth-and-openid-connect/a/request-objects).
   */
  accessTokenSignAlg?: GetAPI.JwsAlg;

  /**
   * The key ID to identify a JWK used for signing access tokens.
   *
   * A JWK Set can be registered as a property of a service. A JWK Set can contain 0
   * or more JWKs. Authlete Server has to pick up one JWK for signing from the JWK
   * Set when it generates a JWT-based access token. Authlete Server searches the
   * registered JWK Set for a JWK which satisfies conditions for access token
   * signature. If the number of JWK candidates which satisfy the conditions is 1,
   * there is no problem. On the other hand, if there exist multiple candidates, a
   * Key ID is needed to be specified so that Authlete Server can pick up one JWK
   * from among the JWK candidates.
   */
  accessTokenSignatureKeyId?: string;

  /**
   * The access token type.
   *
   * This value is used as the value of `token_type` property in access token
   * responses. If this service complies with
   * [RFC 6750](https://tools.ietf.org/html/rfc6750), the value of this property
   * should be `Bearer`.
   *
   * See
   * [RFC 6749 (OAuth 2.0), 7.1. Access Token Types](https://tools.ietf.org/html/rfc6749#section-7.1)
   * for details.
   */
  accessTokenType?: string;

  /**
   * The allowable clock skew between the server and clients in seconds.
   *
   * The clock skew is taken into consideration when time-related claims in a JWT
   * (e.g. `exp`, `iat`, `nbf`) are verified.
   */
  allowableClockSkew?: number;

  /**
   * The attributes of this service.
   */
  attributes?: Array<TokenAPI.Pair>;

  /**
   * API key for basic authentication at the authentication callback endpoint.
   *
   * If the value is not empty, Authlete generates Authorization header for Basic
   * authentication when making a request to the authentication callback endpoint.
   */
  authenticationCallbackApiKey?: string;

  /**
   * API secret for `basic` authentication at the authentication callback endpoint.
   */
  authenticationCallbackApiSecret?: string;

  /**
   * A Web API endpoint for user authentication which is to be prepared on the
   * service side.
   *
   * The endpoint must be implemented if you do not implement the UI at the
   * authorization endpoint but use the one provided by Authlete.
   *
   * The user authentication at the authorization endpoint provided by Authlete is
   * performed by making a `POST` request to this endpoint.
   */
  authenticationCallbackEndpoint?: string;

  /**
   * Identifiers of entities that can issue entity statements for this service. This
   * property corresponds to the `authority_hints` property that appears in a
   * self-signed entity statement that is defined in OpenID Connect Federation 1.0.
   */
  authorityHints?: Array<string>;

  /**
   * The authorization endpoint of the service.
   *
   * A URL that starts with `https://` and has no fragment component. For example,
   * `https://example.com/auth/authorization`.
   *
   * The value of this property is used as `authorization_endpoint` property in the
   * [OpenID Provider Metadata](https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata).
   */
  authorizationEndpoint?: string;

  /**
   * The duration of authorization response JWTs in seconds.
   *
   * [Financial-grade API: JWT Secured Authorization Response Mode for OAuth 2.0 (JARM)](https://openid.net/specs/openid-financial-api-jarm.html)
   * defines new values for the `response_mode` request parameter. They are
   * `query.jwt`, `fragment.jwt`, `form_post.jwt` and `jwt`. If one of them is
   * specified as the response mode, response parameters from the authorization
   * endpoint will be packed into a JWT. This property is used to compute the value
   * of the `exp` claim of the JWT.
   */
  authorizationResponseDuration?: number;

  /**
   * The key ID to identify a JWK used for signing authorization responses using an
   * asymmetric key.
   *
   * [Financial-grade API: JWT Secured Authorization Response Mode for OAuth 2.0 (JARM)](https://openid.net/specs/openid-financial-api-jarm.html)
   * defines new values for the `response_mode` request parameter. They are
   * `query.jwt`, `fragment.jwt`, `form_post.jwt` and `jwt`. If one of them is
   * specified as the response mode, response parameters from the authorization
   * endpoint will be packed into a JWT. This property is used to compute the value
   * of the `exp` claim of the JWT.
   *
   * Authlete Server searches the JWK Set for a JWK which satisfies conditions for
   * authorization response signature. If the number of JWK candidates which satisfy
   * the conditions is 1, there is no problem. On the other hand, if there exist
   * multiple candidates, a Key ID is needed to be specified so that Authlete Server
   * can pick up one JWK from among the JWK candidates. This property exists to
   * specify the key ID.
   */
  authorizationSignatureKeyId?: string;

  /**
   * The URI of backchannel authentication endpoint, which is defined in the
   * specification of
   * [CIBA (Client Initiated Backchannel Authentication)](https://openid.net/specs/openid-client-initiated-backchannel-authentication-core-1_0.html).
   */
  backchannelAuthenticationEndpoint?: string;

  /**
   * The duration of backchannel authentication request IDs issued from the
   * backchannel authentication endpoint in seconds. This is used as the value of the
   * `expires_in` property in responses from the backchannel authentication endpoint.
   */
  backchannelAuthReqIdDuration?: number;

  /**
   * The flag to indicate whether the `binding_message` request parameter is always
   * required whenever a backchannel authentication request is judged as a request
   * for Financial-grade API.
   *
   * The FAPI-CIBA profile requires that the authorization server _"shall ensure
   * unique authorization context exists in the authorization request or require a
   * `binding_message` in the authorization request"_ (FAPI-CIBA, 5.2.2, 2). The
   * simplest way to fulfill this requirement is to set this property to `true`.
   *
   * If this property is set to `false`, the `binding_message` request parameter
   * remains optional even in FAPI context, but in exchange, your authorization
   * server must implement a custom mechanism that ensures each backchannel
   * authentication request has unique context.
   */
  backchannelBindingMessageRequiredInFapi?: boolean;

  /**
   * The minimum interval between polling requests to the token endpoint from client
   * applications in seconds. This is used as the value of the `interval` property in
   * responses from the backchannel authentication endpoint.
   */
  backchannelPollingInterval?: number;

  /**
   * The boolean flag which indicates whether the `user_code` request parameter is
   * supported at the backchannel authentication endpoint. This property corresponds
   * to the `backchannel_user_code_parameter_supported` metadata.
   */
  backchannelUserCodeParameterSupported?: boolean;

  /**
   * The flag indicating whether claims specified by shortcut scopes (e.g. `profile`)
   * are included in the issued ID token only when no access token is issued.
   *
   * To strictly conform to the description below excerpted from
   * [OpenID Connect Core 1.0 Section 5.4](https://openid.net/specs/openid-connect-core-1_0.html#ScopeClaims),
   * this flag has to be `true`.
   *
   * > The Claims requested by the profile, email, address, and phone scope values
   * > are returned from the UserInfo Endpoint, as described in Section 5.3.2, when a
   * > response_type value is used that results in an Access Token being issued.
   * > However, when no Access Token is issued (which is the case for the
   * > response_type value id_token), the resulting Claims are returned in the ID
   * > Token.
   */
  claimShortcutRestrictive?: boolean;

  /**
   * Deprecated. Always `true`.
   */
  clientIdAliasEnabled?: boolean;

  /**
   * The duration of `c_nonce`.
   */
  cnonceDuration?: number;

  /**
   * The default duration of verifiable credentials in seconds.
   */
  credentialDuration?: number;

  credentialIssuerMetadata?: ServiceUpdateServiceParams.CredentialIssuerMetadata;

  /**
   * The JWK Set document containing private keys that are used to sign verifiable
   * credentials.
   */
  credentialJwks?: string;

  /**
   * The URL at which the JWK Set document of the credential issuer is exposed.
   */
  credentialJwksUri?: string;

  /**
   * The default duration of credential offers in seconds.
   */
  credentialOfferDuration?: number;

  /**
   * The duration of transaction ID in seconds that may be issued as a result of a
   * credential request or a batch credential request.
   */
  credentialTransactionDuration?: number;

  /**
   * The flag indicating whether to block DCR (Dynamic Client Registration) requests
   * whose "software_id" has already been used previously.
   */
  dcrDuplicateSoftwareIdBlocked?: boolean;

  /**
   * The flag indicating whether the `scope` request parameter in dynamic client
   * registration and update requests (RFC 7591 and RFC 7592) is used as scopes that
   * the client can request.
   *
   * Limiting the range of scopes that a client can request is achieved by listing
   * scopes in the `client.extension.requestableScopes` property and setting the
   * `client.extension.requestableScopesEnabled` property to `true`. This feature is
   * called "requestable scopes".
   *
   * This property affects behaviors of `/api/client/registration` and other family
   * APIs.
   */
  dcrScopeUsedAsRequestable?: boolean;

  /**
   * The description about the service.
   */
  description?: string;

  /**
   * The URI of the device authorization endpoint.
   *
   * Device authorization endpoint is defined in the specification of OAuth 2.0
   * Device Authorization Grant.
   */
  deviceAuthorizationEndpoint?: string;

  /**
   * The duration of device verification codes and end-user verification codes issued
   * from the device authorization endpoint in seconds. This is used as the value of
   * the `expires_in` property in responses from the device authorization endpoint.
   */
  deviceFlowCodeDuration?: number;

  /**
   * The minimum interval between polling requests to the token endpoint from client
   * applications in seconds in device flow. This is used as the value of the
   * `interval` property in responses from the device authorization endpoint.
   */
  deviceFlowPollingInterval?: number;

  /**
   * The verification URI for the device flow. This URI is used as the value of the
   * `verification_uri` parameter in responses from the device authorization
   * endpoint.
   */
  deviceVerificationUri?: string;

  /**
   * The verification URI for the device flow with a placeholder for a user code.
   * This URI is used to build the value of the `verification_uri_complete` parameter
   * in responses from the device authorization endpoint.
   *
   * It is expected that the URI contains a fixed string `USER_CODE` somewhere as a
   * placeholder for a user code. For example, like the following.
   *
   * `https://example.com/device?user\_code=USER\_CODE`
   *
   * The fixed string is replaced with an actual user code when Authlete builds a
   * verification URI with a user code for the `verification_uri_complete` parameter.
   *
   * If this URI is not set, the `verification_uri_complete` parameter won't appear
   * in device authorization responses.
   */
  deviceVerificationUriComplete?: string;

  /**
   * The flag to indicate whether the direct authorization endpoint is enabled or
   * not.
   *
   * The path of the endpoint is `/api/auth/authorization/direct/service-api-key`.
   */
  directAuthorizationEndpointEnabled?: boolean;

  /**
   * The flag to indicate whether the direct userinfo endpoint is enabled or not. The
   * path of the endpoint is `/api/auth/userinfo/direct/{serviceApiKey}`.
   */
  directIntrospectionEndpointEnabled?: boolean;

  /**
   * 'The flag to indicate whether the direct jwks endpoint is enabled or not. The
   * path of the endpoint is `/api/service/jwks/get/direct/service-api-key`. '
   */
  directJwksEndpointEnabled?: boolean;

  /**
   * The flag to indicate whether the direct revocation endpoint is enabled or not.
   * The URL of the endpoint is `/api/auth/revocation/direct/service-api-key`.
   */
  directRevocationEndpointEnabled?: boolean;

  /**
   * The flag to indicate whether the direct token endpoint is enabled or not. The
   * path of the endpoint is `/api/auth/token/direct/service-api-key`.
   */
  directTokenEndpointEnabled?: boolean;

  /**
   * The flag to indicate whether the direct userinfo endpoint is enabled or not. The
   * path of the endpoint is `/api/auth/userinfo/direct/service-api-key`.
   */
  directUserInfoEndpointEnabled?: boolean;

  /**
   * The duration of nonce values for DPoP proof JWTs in seconds.
   */
  dpopNonceDuration?: number;

  /**
   * Whether to require DPoP proof JWTs to include the `nonce` claim whenever they
   * are presented.
   */
  dpopNonceRequired?: boolean;

  /**
   * The boolean flag which indicates whether the
   * [OAuth 2.0 Dynamic Client Registration Protocol](https://tools.ietf.org/html/rfc7591)
   * is supported.
   */
  dynamicRegistrationSupported?: boolean;

  /**
   * The endpoint for clients ending the sessions.
   *
   * A URL that starts with `https://` and has no fragment component. For example,
   * `https://example.com/auth/endSession`.
   *
   * The value of this property is used as `end_session_endpoint` property in the
   * [OpenID Provider Metadata](https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata).
   */
  endSessionEndpoint?: string;

  /**
   * The flag to indicate whether the `error_description` response parameter is
   * omitted.
   *
   * According to [RFC 6749](https://tools.ietf.org/html/rfc6749), an authorization
   * server may include the `error_description` response parameter in error
   * responses.
   *
   * If `true`, Authlete does not embed the `error_description` response parameter in
   * error responses.
   */
  errorDescriptionOmitted?: boolean;

  /**
   * The flag to indicate whether the `error_uri` response parameter is omitted.
   *
   * According to [RFC 6749](https://tools.ietf.org/html/rfc6749), an authorization
   * server may include the `error_uri` response parameter in error responses.
   *
   * If `true`, Authlete does not embed the `error_uri` response parameter in error
   * responses.
   */
  errorUriOmitted?: boolean;

  /**
   * FAPI modes for this service.
   *
   * When the value of this property is not `null`, Authlete always processes
   * requests to this service based on the specified FAPI modes if the FAPI feature
   * is enabled in Authlete and the FAPI profile is supported by this service.
   *
   * For instance, when this property is set to an array containing `FAPI1_ADVANCED`
   * only, Authlete always processes requests to this service based on
   * "Financial-grade API Security Profile 1.0 - Part 2: Advanced" if the FAPI
   * feature is enabled in Authlete and the FAPI profile is supported by this
   * service.
   */
  fapiModes?: Array<
    | 'FAPI1_ADVANCED'
    | 'FAPI1_BASELINE'
    | 'FAPI2_MESSAGE_SIGNING_AUTH_REQ'
    | 'FAPI2_MESSAGE_SIGNING_AUTH_RES'
    | 'FAPI2_MESSAGE_SIGNING_INTROSPECTION_RES'
    | 'FAPI2_SECURITY'
  >;

  /**
   * The duration of the entity configuration in seconds.
   */
  federationConfigurationDuration?: number;

  /**
   * flag indicating whether this service supports OpenID Connect Federation 1
   */
  federationEnabled?: boolean;

  /**
   * JWK Set document containing keys that are used to sign (1) self-signed entity
   * statement of this service and (2) the response from `signed_jwks_uri`.
   */
  federationJwks?: string;

  /**
   * The URI of the federation registration endpoint. This property corresponds to
   * the `federation_registration_endpoint` server metadata that is defined in OpenID
   * Connect Federation 1.0.
   */
  federationRegistrationEndpoint?: string;

  /**
   * A key ID to identify a JWK used to sign the entity configuration and the signed
   * JWK Set.
   */
  federationSignatureKeyId?: string;

  /**
   * The flag indicating whether encryption of request object is required when the
   * request object is passed through the front channel.
   *
   * This flag does not affect the processing of request objects at the Pushed
   * Authorization Request Endpoint, which is defined in
   * [OAuth 2.0 Pushed Authorization Requests](https://datatracker.ietf.org/doc/rfc9126/).
   * Unecrypted request objects are accepted at the endpoint even if this flag is
   * `true`.
   *
   * This flag does not indicate whether a request object is always required. There
   * is a different flag, `requestObjectRequired`, for the purpose. See the
   * description of `requestObjectRequired` for details.
   *
   * Even if this flag is `false`, encryption of request object is required if the
   * `frontChannelRequestObjectEncryptionRequired` flag of the client is `true`.
   */
  frontChannelRequestObjectEncryptionRequired?: boolean;

  /**
   * The flag indicating whether every authorization request (and any request serving
   * as an authorization request such as CIBA backchannel authentication request and
   * device authorization request) must include the `grant_management_action` request
   * parameter.
   *
   * This property corresponds to the `grant_management_action_required` server
   * metadata defined in
   * [Grant Management for OAuth 2.0](https://openid.net/specs/fapi-grant-management.html).
   *
   * Note that setting true to this property will result in blocking all public
   * clients because the specification requires that grant management be usable only
   * by confidential clients for security reasons.
   */
  grantManagementActionRequired?: boolean;

  /**
   * The URL of the grant management endpoint.
   */
  grantManagementEndpoint?: string;

  /**
   * The information about keys managed on HSMs (Hardware Security Modules).
   *
   * This `hsks` property is output only, meaning that `hsks` in requests to
   * `/api/service/create` API and `/api/service/update` API do not have any effect.
   * The contents of this property is controlled only by `/api/hsk/*` APIs.
   */
  hsks?: Array<HskAPI.Hsk>;

  /**
   * The flag indicating whether HSM (Hardware Security Module) support is enabled
   * for this service.
   *
   * When this flag is `false`, keys managed in HSMs are not used even if they exist.
   * In addition, `/api/hsk/*` APIs reject all requests.
   *
   * Even if this flag is `true`, HSM-related features do not work if the
   * configuration of the Authlete server you are using does not support HSM.
   */
  hsmEnabled?: boolean;

  /**
   * The type of the `aud` claim in ID tokens.
   */
  idTokenAudType?: string;

  /**
   * 'The duration of
   * [ID token](https://openid.net/specs/openid-connect-core-1_0.html#IDToken)s in
   * seconds. This value is used to calculate the value of `exp` claim in an ID
   * token.'
   */
  idTokenDuration?: number;

  /**
   * The flag indicating whether to enable the feature of ID token reissuance in the
   * refresh token flow.
   */
  idTokenReissuable?: boolean;

  /**
   * The key ID to identify a JWK used for ID token signature using an asymmetric
   * key.
   *
   * A JWK Set can be registered as a property of a Service. A JWK Set can contain 0
   * or more JWKs (See [RFC 7517](https://tools.ietf.org/html/rfc7517) for details
   * about JWK). Authlete Server has to pick up one JWK for signature from the JWK
   * Set when it generates an ID token and signature using an asymmetric key is
   * required. Authlete Server searches the registered JWK Set for a JWK which
   * satisfies conditions for ID token signature. If the number of JWK candidates
   * which satisfy the conditions is 1, there is no problem. On the other hand, if
   * there exist multiple candidates, a
   * [Key ID](https://tools.ietf.org/html/rfc7517#section-4.5) is needed to be
   * specified so that Authlete Server can pick up one JWK from among the JWK
   * candidates.
   *
   * This `idTokenSignatureKeyId` property exists for the purpose described above.
   * For key rotation (OpenID Connect Core 1.0,
   * [10.1.1. Rotation of Asymmetric Signing Keys](http://openid.net/specs/openid-connect-core-1_0.html#RotateSigKeys)),
   * this mechanism is needed.
   */
  idTokenSignatureKeyId?: string;

  /**
   * The URI of the introspection endpoint.
   */
  introspectionEndpoint?: string;

  /**
   * The key ID of the key for signing introspection responses.
   */
  introspectionSignatureKeyId?: string;

  /**
   * The flag indicating whether generation of the iss response parameter is
   * suppressed.
   *
   * "OAuth 2.0 Authorization Server Issuer Identifier in Authorization Response" has
   * defined a new authorization response parameter, `iss`, as a countermeasure for a
   * certain type of mix-up attacks.
   *
   * The specification requires that the `iss` response parameter always be included
   * in authorization responses unless JARM (JWT Secured Authorization Response Mode)
   * is used.
   *
   * When this flag is `true`, the authorization server does not include the `iss`
   * response parameter in authorization responses. By turning this flag on and off,
   * developers of client applications can experiment the mix-up attack and the
   * effect of the `iss` response parameter.
   *
   * Note that this flag should not be `true` in production environment unless there
   * are special reasons for it.
   */
  issSuppressed?: boolean;

  /**
   * The issuer identifier of the service.
   *
   * A URL that starts with https:// and has no query or fragment component.
   *
   * The value of this property is used as `iss` claim in an
   * [ID token](https://openid.net/specs/openid-connect-core-1_0.html#IDToken) and
   * `issuer` property in the
   * [OpenID Provider Metadata](https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata).
   */
  issuer?: string;

  /**
   * The content of the service's
   * [JSON Web Key Set](https://tools.ietf.org/html/rfc7517) document.
   *
   * If this property is not `null` in a `/service/create` request or a
   * `/service/update` request, Authlete hosts the content in the database. This
   * property must not be `null` and must contain pairs of public/private keys if the
   * service wants to support asymmetric signatures for ID tokens and asymmetric
   * encryption for request objects. See
   * [OpenID Connect Core 1.0, 10. Signatures and Encryption](https://openid.net/specs/openid-connect-core-1_0.html#SigEnc)
   * for details.
   */
  jwks?: string;

  /**
   * The URL of the service's [JSON Web Key Set](https://tools.ietf.org/html/rfc7517)
   * document. For example, `http://example.com/auth/jwks`.
   *
   * Client applications accesses this URL (1) to get the public key of the service
   * to validate the signature of an ID token issued by the service and (2) to get
   * the public key of the service to encrypt an request object of the client
   * application. See
   * [OpenID Connect Core 1.0, 10. Signatures and Encryption](https://openid.net/specs/openid-connect-core-1_0.html#SigEnc)
   * for details.
   *
   * The value of this property is used as `jwks_uri` property in the
   * [OpenID Provider Metadata](https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata).
   */
  jwksUri?: string;

  /**
   * The flag indicating whether to prohibit unidentifiable clients from using the
   * grant type "urn:ietf:params:oauth:grant-type:jwt-bearer".
   */
  jwtGrantByIdentifiableClientsOnly?: boolean;

  /**
   * The flag indicating whether to reject token requests that use an encrypted JWT
   * as an authorization grant with the grant type
   * "urn:ietf:params:oauth:grant-type:jwt-bearer".
   */
  jwtGrantEncryptedJwtRejected?: boolean;

  /**
   * The flag indicating whether to reject token requests that use an unsigned JWT as
   * an authorization grant with the grant type
   * "urn:ietf:params:oauth:grant-type:jwt-bearer".
   */
  jwtGrantUnsignedJwtRejected?: boolean;

  /**
   * The flag indicating whether the port number component of redirection URIs can be
   * variable when the host component indicates loopback.
   *
   * When this flag is `true`, if the host component of a redirection URI specified
   * in an authorization request indicates loopback (to be precise, when the host
   * component is localhost, `127.0.0.1` or `::1`), the port number component is
   * ignored when the specified redirection URI is compared to pre-registered ones.
   * This behavior is described in
   * [7.3. Loopback Interface Redirection](https://www.rfc-editor.org/rfc/rfc8252.html#section-7.3)
   * of [RFC 8252 OAuth 2.0](https://www.rfc-editor.org/rfc/rfc8252.html) for Native
   * Apps.
   *
   * [3.1.2.3. Dynamic Configuration](https://www.rfc-editor.org/rfc/rfc6749.html#section-3.1.2.3)
   * of [RFC 6749](https://www.rfc-editor.org/rfc/rfc6749.html) states _"If the
   * client registration included the full redirection URI, the authorization server
   * MUST compare the two URIs using simple string comparison as defined in [RFC3986]
   * Section 6.2.1."_ Also, the description of `redirect_uri` in
   * [3.1.2.1. Authentication Request](https://openid.net/specs/openid-connect-core-1_0.html#AuthRequest)
   * of
   * [OpenID Connect Core 1.0](https://openid.net/specs/openid-connect-core-1_0.html)
   * states _"This URI MUST exactly match one of the Redirection URI values for the
   * Client pre-registered at the OpenID Provider, with the matching performed as
   * described in Section 6.2.1 of [RFC3986] (**Simple String Comparison**)."_ These
   * "Simple String Comparison" requirements are preceded by this flag. That is, even
   * when the conditions described in RFC 6749 and OpenID Connect Core 1.0 are
   * satisfied, the port number component of loopback redirection URIs can be
   * variable when this flag is `true`.
   *
   * [8.3. Loopback Redirect Considerations](https://www.rfc-editor.org/rfc/rfc8252.html#section-8.3)
   * of [RFC 8252](https://www.rfc-editor.org/rfc/rfc8252.html) states as follows.
   *
   * > While redirect URIs using localhost (i.e., `"http://localhost:{port}/{path}"`)
   * > function similarly to loopback IP redirects described in Section 7.3, the use
   * > of localhost is NOT RECOMMENDED. Specifying a redirect URI with the loopback
   * > IP literal rather than localhost avoids inadvertently listening on network
   * > interfaces other than the loopback interface. It is also less susceptible to
   * > client-side firewalls and misconfigured host name resolution on the user's
   * > device.
   *
   * However, Authlete allows the port number component to be variable in the case of
   * `localhost`, too. It is left to client applications whether they use `localhost`
   * or a literal loopback IP address (`127.0.0.1` for IPv4 or `::1` for IPv6).
   *
   * Section 7.3 and Section 8.3 of
   * [RFC 8252](https://www.rfc-editor.org/rfc/rfc8252.html) state that loopback
   * redirection URIs use the `"http"` scheme, but Authlete allows the port number
   * component to be variable in other cases (e.g. in the case of the `"https"`
   * scheme), too.
   */
  loopbackRedirectionUriVariable?: boolean;

  /**
   * The `metadata` of the service. The content of the returned array depends on
   * contexts. The predefined service metadata is listed in the following table.
   *
   * | Key           | Description                                                     |
   * | ------------- | --------------------------------------------------------------- |
   * | `clientCount` | The number of client applications which belong to this service. |
   */
  metadata?: Array<TokenAPI.Pair>;

  /**
   * The flag to indicate token requests from public clients without the `client_id`
   * request parameter are allowed when the client can be guessed from
   * `authorization_code` or `refresh_token`.
   *
   * This flag should not be set unless you have special reasons.
   */
  missingClientIdAllowed?: boolean;

  /**
   * The MTLS endpoint aliases.
   *
   * This property corresponds to the mtls_endpoint_aliases metadata defined in "5.
   * Metadata for Mutual TLS Endpoint Aliases" of
   * [OAuth 2.0 Mutual TLS Client Authentication and Certificate-Bound Access Tokens](https://datatracker.ietf.org/doc/rfc8705/).
   *
   * The aliases will be embedded in the response from the discovery endpoint like
   * the following.
   *
   * ```json
   * {
   *   ......,
   *   "mtls_endpoint_aliases": {
   *     "token_endpoint":         "https://mtls.example.com/token",
   *     "revocation_endpoint":    "https://mtls.example.com/revo",
   *     "introspection_endpoint": "https://mtls.example.com/introspect"
   *   }
   * }
   * ```
   */
  mtlsEndpointAliases?: Array<ServiceUpdateServiceParams.MtlsEndpointAlias>;

  /**
   * The flag to indicate whether this service validates certificate chains during
   * PKI-based client mutual TLS authentication.
   */
  mutualTlsValidatePkiCertChain?: boolean;

  /**
   * The flag indicating whether the nbf claim in the request object is optional even
   * when the authorization request is regarded as a FAPI-Part2 request.
   *
   * The final version of Financial-grade API was approved in January, 2021. The Part
   * 2 of the final version has new requirements on lifetime of request objects. They
   * require that request objects contain an `nbf` claim and the lifetime computed by
   * `exp` - `nbf` be no longer than 60 minutes.
   *
   * Therefore, when an authorization request is regarded as a FAPI-Part2 request,
   * the request object used in the authorization request must contain an nbf claim.
   * Otherwise, the authorization server rejects the authorization request.
   *
   * When this flag is `true`, the `nbf` claim is treated as an optional claim even
   * when the authorization request is regarded as a FAPI-Part2 request. That is, the
   * authorization server does not perform the validation on lifetime of the request
   * object.
   *
   * Skipping the validation is a violation of the FAPI specification. The reason why
   * this flag has been prepared nevertheless is that the new requirements (which do
   * not exist in the Implementer's Draft 2 released in October, 2018) have big
   * impacts on deployed implementations of client applications and Authlete thinks
   * there should be a mechanism whereby to make the migration from ID2 to Final
   * smooth without breaking live systems.
   */
  nbfOptional?: boolean;

  /**
   * The flag indicating whether the openid scope should be dropped from scopes list
   * assigned to access token issued when a refresh token grant is used.
   */
  openidDroppedOnRefreshWithoutOfflineAccess?: boolean;

  /**
   * The human-readable name representing the organization that operates this
   * service. This property corresponds to the `organization_name` server metadata
   * that is defined in OpenID Connect Federation 1.0.
   */
  organizationName?: string;

  /**
   * The flag to indicate whether this service requires that clients use the pushed
   * authorization request endpoint.
   *
   * This property corresponds to the `require_pushed_authorization_requests` server
   * metadata defined in
   * [OAuth 2.0 Pushed Authorization Requests](https://tools.ietf.org/html/draft-lodderstedt-oauth-par).
   */
  parRequired?: boolean;

  /**
   * The flag to indicate whether the use of Proof Key for Code Exchange (PKCE) is
   * always required for authorization requests by Authorization Code Flow.
   *
   * If `true`, `code_challenge` request parameter is always required for
   * authorization requests using Authorization Code Flow.
   *
   * See [RFC 7636](https://tools.ietf.org/html/rfc7636) (Proof Key for Code Exchange
   * by OAuth Public Clients) for details about `code_challenge` request parameter.
   */
  pkceRequired?: boolean;

  /**
   * The flag to indicate whether `S256` is always required as the code challenge
   * method whenever [PKCE (RFC 7636)](https://tools.ietf.org/html/rfc7636) is used.
   *
   * If this flag is set to `true`, `code_challenge_method=S256` must be included in
   * the authorization request whenever it includes the `code_challenge` request
   * parameter. Neither omission of the `code_challenge_method` request parameter nor
   * use of plain (`code_challenge_method=plain`) is allowed.
   */
  pkceS256Required?: boolean;

  /**
   * The URL of the "Policy" of the service.
   *
   * The value of this property is used as `op_policy_uri` property in the
   * [OpenID Provider Metadata](http://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata).
   */
  policyUri?: string;

  /**
   * The flag indicating whether token requests using the pre-authorized code grant
   * flow by unidentifiable clients are allowed.
   */
  preAuthorizedGrantAnonymousAccessSupported?: boolean;

  /**
   * The transformed claims predefined by this service in JSON format. This property
   * corresponds to the `transformed_claims_predefined` server metadata.
   */
  predefinedTransformedClaims?: string;

  /**
   * The duration of pushed authorization requests in seconds.
   *
   * [OAuth 2.0 Pushed Authorization Requests](https://tools.ietf.org/html/draft-lodderstedt-oauth-par)
   * defines an endpoint (called "pushed authorization request endpoint") which
   * client applications can register authorization requests into and get
   * corresponding URIs (called "request URIs") from. The issued URIs represent the
   * registered authorization requests. The client applications can use the URIs as
   * the value of the `request_uri` request parameter in an authorization request.
   *
   * The property represents the duration of registered authorization requests and is
   * used as the value of the `expires_in` parameter in responses from the pushed
   * authorization request endpoint.
   */
  pushedAuthReqDuration?: number;

  /**
   * The URI of the pushed authorization request endpoint.
   *
   * This property corresponds to the `pushed_authorization_request_endpoint`
   * metadata defined in
   * "[5. Authorization Server Metadata](https://tools.ietf.org/html/draft-lodderstedt-oauth-par#section-5)"
   * of OAuth 2.0 Pushed Authorization Requests.
   */
  pushedAuthReqEndpoint?: string;

  /**
   * The duration of refresh tokens in seconds. The related specifications have no
   * requirements on refresh token duration, but Authlete sets expiration for refresh
   * tokens.
   */
  refreshTokenDuration?: number;

  /**
   * The flag to indicate whether the remaining duration of the used refresh token is
   * taken over to the newly issued refresh token.
   */
  refreshTokenDurationKept?: boolean;

  /**
   * The flag which indicates whether duration of refresh tokens are reset when they
   * are used even if the `refreshTokenKept` property of this service set to is
   * `true` (= even if "Refresh Token Continuous Use" is "Kept").
   *
   * This flag has no effect when the `refreshTokenKept` property is set to `false`.
   * In other words, if this service issues a new refresh token on every refresh
   * token request, the refresh token will have fresh duration (unless
   * `refreshTokenDurationKept` is set to `true`) and this
   * `refreshTokenDurationReset` property is not referenced.
   */
  refreshTokenDurationReset?: boolean;

  /**
   * flag indicating whether refresh token requests with the same refresh token can
   * be made multiple times in quick succession and they can obtain the same renewed
   * refresh token within the short period.
   */
  refreshTokenIdempotent?: boolean;

  /**
   * The flag to indicate whether a refresh token remains unchanged or gets renewed
   * after its use.
   *
   * If `true`, a refresh token used to get a new access token remains valid after
   * its use. Otherwise, if `false`, a refresh token is invalidated after its use and
   * a new refresh token is issued.
   *
   * See
   * [RFC 6749 6. Refreshing an Access Token](https://tools.ietf.org/html/rfc6749#section-6),
   * as to how to get a new access token using a refresh token.
   */
  refreshTokenKept?: boolean;

  /**
   * The
   * [registration endpoint](http://openid.net/specs/openid-connect-registration-1_0.html#ClientRegistration)
   * of the service. A URL that starts with `https://`. For example,
   * `https://example.com/auth/registration`.
   *
   * The value of this property is used as `registration_endpoint` property in the
   * [OpenID Provider Metadata](http://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata).
   */
  registrationEndpoint?: string;

  /**
   * The URI of the registration management endpoint. If dynamic client registration
   * is supported, and this is set, this URI will be used as the basis of the
   * client's management endpoint by appending `/clientid}/` to it as a path element.
   * If this is unset, the value of `registrationEndpoint` will be used as the URI
   * base instead.
   */
  registrationManagementEndpoint?: string;

  /**
   * The flag indicating whether Authlete checks whether the `aud` claim of request
   * objects matches the issuer identifier of this service.
   *
   * [Section 6.1. Passing a Request Object by Value](https://openid.net/specs/openid-connect-core-1_0.html#JWTRequests)
   * of
   * [OpenID Connect Core 1.0](https://openid.net/specs/openid-connect-core-1_0.html)
   * has the following statement.
   *
   * > The `aud` value SHOULD be or include the OP's Issuer Identifier URL.
   *
   * Likewise,
   * [Section 4. Request Object](https://www.rfc-editor.org/rfc/rfc9101.html#section-4)
   * of [RFC 9101](https://www.rfc-editor.org/rfc/rfc9101.html) (The OAuth 2.0
   * Authorization Framework: JWT-Secured Authorization Request (JAR)) has the
   * following statement.
   *
   * > The value of aud should be the value of the authorization server (AS) issuer,
   * > as defined in [RFC 8414](https://www.rfc-editor.org/rfc/rfc8414.html).
   *
   * As excerpted above, validation on the `aud` claim of request objects is
   * optional. However, if this flag is turned on, Authlete checks whether the `aud`
   * claim of request objects matches the issuer identifier of this service and
   * raises an error if they are different.
   */
  requestObjectAudienceChecked?: boolean;

  /**
   * The flag indicating whether the JWE alg of encrypted request object must match
   * the `request_object_encryption_alg` client metadata of the client that has sent
   * the request object.
   *
   * The request_object_encryption_alg client metadata itself is defined in
   * [OpenID Connect Dynamic Client Registration 1.0](https://openid.net/specs/openid-connect-registration-1_0.html)
   * as follows.
   *
   * > request_object_encryption_alg
   * >
   * > OPTIONAL. JWE [JWE] alg algorithm [JWA] the RP is declaring that it may use
   * > for encrypting Request Objects sent to the OP. This parameter SHOULD be
   * > included when symmetric encryption will be used, since this signals to the OP
   * > that a client_secret value needs to be returned from which the symmetric key
   * > will be derived, that might not otherwise be returned. The RP MAY still use
   * > other supported encryption algorithms or send unencrypted Request Objects,
   * > even when this parameter is present. If both signing and encryption are
   * > requested, the Request Object will be signed then encrypted, with the result
   * > being a Nested JWT, as defined in [JWT]. The default, if omitted, is that the
   * > RP is not declaring whether it might encrypt any Request Objects.
   *
   * The point here is "The RP MAY still use other supported encryption algorithms or
   * send unencrypted Request Objects, even when this parameter is present."
   *
   * The Client's property that represents the client metadata is
   * `requestEncryptionAlg`. See the description of `requestEncryptionAlg` for
   * details.
   *
   * Even if this flag is `false`, the match is required if the
   * `requestObjectEncryptionAlgMatchRequired` flag of the client is `true`.
   */
  requestObjectEncryptionAlgMatchRequired?: boolean;

  /**
   * The flag indicating whether the JWE `enc` of encrypted request object must match
   * the `request_object_encryption_enc` client metadata of the client that has sent
   * the request object.
   *
   * The `request_object_encryption_enc` client metadata itself is defined in
   * [OpenID Connect Dynamic Client Registration 1.0](https://openid.net/specs/openid-connect-registration-1_0.html)
   * as follows.
   *
   * > request_object_encryption_enc
   * >
   * > OPTIONAL. JWE enc algorithm [JWA] the RP is declaring that it may use for
   * > encrypting Request Objects sent to the OP. If request_object_encryption_alg is
   * > specified, the default for this value is A128CBC-HS256. When
   * > request_object_encryption_enc is included, request_object_encryption_alg MUST
   * > also be provided.
   *
   * The Client's property that represents the client metadata is
   * `requestEncryptionEnc`. See the description of `requestEncryptionEnc` for
   * details.
   *
   * Even if this flag is false, the match is required if the
   * `requestObjectEncryptionEncMatchRequired` flag is `true`.
   */
  requestObjectEncryptionEncMatchRequired?: boolean;

  /**
   * The flag to indicate whether this service requires that authorization requests
   * always utilize a request object by using either request or `request_uri` request
   * parameter.
   *
   * If this flag is set to `true` and the value of
   * `traditionalRequestObjectProcessingApplied` is `false`, the value of
   * `require_signed_request_object` server metadata of this service is reported as
   * `true` in the discovery document. The metadata is defined in JAR (JWT Secured
   * Authorization Request). That `require_signed_request_object` is `true` means
   * that authorization requests which don't conform to the JAR specification are
   * rejected.
   */
  requestObjectRequired?: boolean;

  /**
   * The key ID of the key for signing introspection responses.
   */
  resourceSignatureKeyId?: string;

  /**
   * The [revocation endpoint](https://tools.ietf.org/html/rfc7009) of the service.
   *
   * A URL that starts with `https://`. For example,
   * `https://example.com/auth/revocation`.
   */
  revocationEndpoint?: string;

  /**
   * The flag indicating whether this service signs responses from the resource
   * server.
   */
  rsResponseSigned?: boolean;

  /**
   * The flag to indicate whether requests that request no scope are rejected or not.
   *
   * When a request has no explicit `scope` parameter and the service's pre-defined
   * default scope set is empty, the authorization server regards the request
   * requests no scope. When this flag is set to `true`, requests that request no
   * scope are rejected.
   *
   * The requirement below excerpted from
   * [RFC 6749 Section 3.3](https://tools.ietf.org/html/rfc6749#section-3.3) does not
   * explicitly mention the case where the default scope set is empty.
   *
   * > If the client omits the scope parameter when requesting authorization, the
   * > authorization server MUST either process the request using a pre-defined
   * > default value or fail the request indicating an invalid scope.
   *
   * However, if you interpret _"the default scope set exists but is empty"_ as _"the
   * default scope set does not exist"_ and want to strictly conform to the
   * requirement above, this flag has to be `true`.
   */
  scopeRequired?: boolean;

  /**
   * The URL of a page where documents for developers can be found.
   *
   * The value of this property is used as `service_documentation` property in the
   * [OpenID Provider Metadata](http://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata).
   */
  serviceDocumentation?: string;

  /**
   * The name of this service.
   */
  serviceName?: string;

  /**
   * The URI of the endpoint that returns this service's JWK Set document in the JWT
   * format. This property corresponds to the `signed_jwks_uri` server metadata
   * defined in OpenID Connect Federation 1.0.
   */
  signedJwksUri?: string;

  /**
   * The flag to indicate whether the number of access tokens per subject (and per
   * client) is at most one or can be more.
   *
   * If `true`, an attempt to issue a new access token invalidates existing access
   * tokens that are associated with the same subject and the same client.
   *
   * Note that, however, attempts by
   * [Client Credentials Flow](https://tools.ietf.org/html/rfc6749#section-4.4) do
   * not invalidate existing access tokens because access tokens issued by Client
   * Credentials Flow are not associated with any end-user's subject. Also note that
   * an attempt by
   * [Refresh Token Flow](https://tools.ietf.org/html/rfc6749#section-6) invalidates
   * the coupled access token only and this invalidation is always performed
   * regardless of whether the value of this setting item is `true` or `false`.
   */
  singleAccessTokenPerSubject?: boolean;

  /**
   * Supported attachment types. This property corresponds to the {@code
   * attachments_supported} server metadata which was added by the third
   * implementer's draft of OpenID Connect for Identity Assurance 1.0.
   */
  supportedAttachments?: Array<'EMBEDDED' | 'EXTERNAL'>;

  /**
   * The supported data types that can be used as values of the type field in
   * `authorization_details`.
   *
   * This property corresponds to the `authorization_details_types_supported`
   * metadata. See "OAuth 2.0 Rich Authorization Requests" (RAR) for details.
   */
  supportedAuthorizationDetailsTypes?: Array<string>;

  /**
   * The supported backchannel token delivery modes. This property corresponds to the
   * `backchannel_token_delivery_modes_supported` metadata.
   *
   * Backchannel token delivery modes are defined in the specification of
   * [CIBA (Client Initiated Backchannel Authentication)](https://openid.net/specs/openid-client-initiated-backchannel-authentication-core-1_0.html).
   */
  supportedBackchannelTokenDeliveryModes?: Array<AuthenticationAPI.DeliveryMode>;

  /**
   * Claim locales that the service supports. Each element is a language tag defined
   * in [RFC 5646](https://tools.ietf.org/html/rfc5646). For example, `en-US` and
   * `ja-JP`. See
   * [OpenID Connect Core 1.0, 5.2. Languages and Scripts](https://openid.net/specs/openid-connect-core-1_0.html#ClaimsLanguagesAndScripts)
   * for details.
   *
   * The value of this property is used as `claims_locales_supported` property in the
   * [OpenID Provider Metadata](https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata).
   */
  supportedClaimLocales?: Array<string>;

  /**
   * Claim names that the service supports. The standard claim names listed in
   * [OpenID Connect Core 1.0, 5.1. Standard Claim](https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims)
   * should be supported. The following is the list of standard claims.
   *
   * - `sub`
   * - `name`
   * - `given_name`
   * - `family_name`
   * - `middle_name`
   * - `nickname`
   * - `preferred_username`
   * - `profile`
   * - `picture`
   * - `website`
   * - `email`
   * - `email_verified`
   * - `gender`
   * - `birthdate`
   * - `zoneinfo`
   * - `locale`
   * - `phone_number`
   * - `phone_number_verified`
   * - `address`
   * - `updated_at`
   *
   * The value of this property is used as `claims_supported` property in the
   * [OpenID Provider Metadata](https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata).
   *
   * The service may support its original claim names. See
   * [OpenID Connect Core 1.0, 5.1.2. Additional Claims](https://openid.net/specs/openid-connect-core-1_0.html#AdditionalClaims).
   */
  supportedClaims?: Array<string>;

  /**
   * Claim types supported by the service. Valid values are listed in Claim Type.
   * Note that Authlete currently doesn't provide any API to help implementations for
   * `AGGREGATED` and `DISTRIBUTED`.
   *
   * The value of this property is used as `claim_types_supported` property in the
   * [OpenID Provider Metadata](https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata).
   */
  supportedClaimTypes?: Array<'NORMAL' | 'AGGREGATED' | 'DISTRIBUTED'>;

  supportedClientRegistrationTypes?: Array<'AUTOMATIC' | 'EXPLICIT'>;

  /**
   * custom client metadata supported by this service.
   *
   * Standard specifications define client metadata as necessary. The following are
   * such examples.
   *
   * - [OpenID Connect Dynamic Client Registration 1.0](https://openid.net/specs/openid-connect-registration-1_0.html)
   * - [RFC 7591 OAuth 2.0 Dynamic Client Registration Protocol](https://www.rfc-editor.org/rfc/rfc7591.html)
   * - [RFC 8705 OAuth 2.0 Mutual-TLS Client Authentication and Certificate-Bound Access Tokens](https://www.rfc-editor.org/rfc/rfc8705.html)
   * - [OpenID Connect Client-Initiated Backchannel Authentication Flow - Core 1.0](https://openid.net/specs/openid-client-initiated-backchannel-authentication-core-1_0.html)
   * - [The OAuth 2.0 Authorization Framework: JWT Secured Authorization Request (JAR)](https://datatracker.ietf.org/doc/draft-ietf-oauth-jwsreq/)
   * - [Financial-grade API: JWT Secured Authorization Response Mode for OAuth 2.0 (JARM)](https://openid.net/specs/openid-financial-api-jarm.html)
   * - [OAuth 2.0 Pushed Authorization Requests (PAR)](https://datatracker.ietf.org/doc/rfc9126/)
   * - [OAuth 2.0 Rich Authorization Requests (RAR)](https://datatracker.ietf.org/doc/draft-ietf-oauth-rar/)
   *
   * Standard client metadata included in Client Registration Request and Client
   * Update Request (cf.
   * [OIDC DynReg](https://openid.net/specs/openid-connect-registration-1_0.html),
   * [RFC 7591](https://www.rfc-editor.org/rfc/rfc7591.html) and
   * [RFC 7592](https://www.rfc-editor.org/rfc/rfc7592.html)) are, if supported by
   * Authlete, stored into Authlete database. On the other hand, unrecognized client
   * metadata are discarded.
   *
   * By listing up custom client metadata in advance by using this property
   * (`supportedCustomClientMetadata`), Authlete can recognize them and stores their
   * values into the database. The stored custom client metadata values can be
   * referenced by `customMetadata`.
   */
  supportedCustomClientMetadata?: Array<string>;

  /**
   * Supported algorithms used to compute digest values of external attachments. This
   * property corresponds to the `digest_algorithms_supported` server metadata which
   * was added by the third implementer's draft of OpenID Connect for Identity
   * Assurance 1.0.
   */
  supportedDigestAlgorithms?: Array<string>;

  /**
   * Values of `display` request parameter that service supports.
   *
   * The value of this property is used as `display_values_supported` property in the
   * Provider
   * Metadata](https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata).
   */
  supportedDisplays?: Array<AuthorizationAPI.Display>;

  /**
   * Document types supported by this service. This property corresponds to the
   * `documents_supported` server metadata.
   */
  supportedDocuments?: Array<string>;

  /**
   * Supported document check methods. This property corresponds to the
   * `documents_check_methods_supported` server metadata which was added by the
   * fourth implementer's draft of OpenID Connect for Identity Assurance 1.0.
   */
  supportedDocumentsCheckMethods?: Array<string>;

  /**
   * validation and verification processes supported by this service. This property
   * corresponds to the `documents_methods_supported` server metadata.
   *
   * The third implementer's draft of
   * [OpenID Connect for Identity Assurance 1.0](https://openid.net/specs/openid-connect-4-identity-assurance-1_0.html)
   * renamed the `id_documents_verification_methods_supported` server metadata to
   * `documents_methods_supported`.
   */
  supportedDocumentsMethods?: Array<string>;

  /**
   * Document validation methods supported by this service. This property corresponds
   * to the `documents_validation_methods_supported` server metadata which was added
   * by the third implementer's draft of <a href=
   * [OpenID Connect for Identity Assurance 1.0](https://openid.net/specs/openid-connect-4-identity-assurance-1_0.html)
   */
  supportedDocumentsValidationMethods?: Array<string>;

  /**
   * Document verification methods supported by this service. This property
   * corresponds to the `documents_verification_methods_supported` server metadata
   * which was added by the third implementer's draft of
   * [OpenID Connect for Identity Assurance 1.0](https://openid.net/specs/openid-connect-4-identity-assurance-1_0.html)
   */
  supportedDocumentsVerificationMethods?: Array<string>;

  /**
   * Electronic record types supported by this service. This property corresponds to
   * the `electronic_records_supported` server metadata which was added by the third
   * implementer's draft of
   * [OpenID Connect for Identity Assurance 1.0](https://openid.net/specs/openid-connect-4-identity-assurance-1_0.html)
   */
  supportedElectronicRecords?: Array<string>;

  /**
   * Evidence supported by this service. This corresponds to the `evidence_supported`
   * [metadata](https://openid.net/specs/openid-connect-4-identity-assurance-1_0.html#rfc.section.7).
   */
  supportedEvidence?: Array<string>;

  /**
   * Values of `grant_type` request parameter that the service supports.
   *
   * The value of this property is used as `grant_types_supported property` in the
   * [OpenID Provider Metadata](https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata).
   */
  supportedGrantTypes?: Array<IntrospectionAPI.GrantType>;

  /**
   * Identity documents supported by this service. This corresponds to the
   * `id_documents_supported`
   * [metadata](https://openid.net/specs/openid-connect-4-identity-assurance-1_0.html#rfc.section.7).
   */
  supportedIdentityDocuments?: Array<string>;

  /**
   * Client authentication methods supported at the introspection endpoint.
   */
  supportedIntrospectionAuthMethods?: Array<ClientGetAPI.ClientAuthenticationMethod>;

  /**
   * The supported `prompt` values.
   */
  supportedPromptValues?: Array<AuthorizationAPI.Prompt>;

  /**
   * Values of `response_type` request parameter that the service supports. Valid
   * values are listed in Response Type.
   *
   * The value of this property is used as `response_types_supported` property in the
   * [OpenID Provider Metadata](https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata).
   */
  supportedResponseTypes?: Array<GetAPI.ResponseType>;

  /**
   * Client authentication methods supported at the revocation endpoint.
   */
  supportedRevocationAuthMethods?: Array<ClientGetAPI.ClientAuthenticationMethod>;

  /**
   * Scopes supported by the service.
   *
   * Authlete strongly recommends that the service register at least the following
   * scopes.
   *
   * | Name           | Description                                                                                                                                                                                                                                                                                                                                                                                                     |
   * | -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   * | openid         | A permission to get an ID token of an end-user. The `openid` scope appears in [OpenID Connect Core 1.0, 3.1.2.1. Authentication Request, scope](https://openid.net/specs/openid-connect-core-1_0.html#AuthRequest). Without this scope, Authlete does not allow `response_type` request parameter to have values other than code and token.                                                                     |
   * | profile        | A permission to get information about `name`, `family_name`, `given_name`, `middle_name`, `nickname`, `preferred_username`, `profile`, `picture`, `website`, `gender`, `birthdate`, `zoneinfo`, `locale` and `updated_at` from the user info endpoint. See [OpenID Connect Core 1.0, 5.4. Requesting Claims using Scope Values](https://openid.net/specs/openid-connect-core-1_0.html#ScopeClaims) for details. |
   * | email          | A permission to get information about `email` and `email_verified` from the user info endpoint. See [OpenID Connect Core 1.0, 5.4. Requesting Claims using Scope Values](https://openid.net/specs/openid-connect-core-1_0.html#ScopeClaims) for details.                                                                                                                                                        |
   * | address        | A permission to get information about address from the user info endpoint. See [OpenID Connect Core 1.0, 5.4. Requesting Claims using Scope Values](https://openid.net/specs/openid-connect-core-1_0.html#ScopeClaims) and [5.1.1. Address Claim](https://openid.net/specs/openid-connect-core-1_0.html#AddressClaim) for details.                                                                              |
   * | phone          | A permission to get information about `phone_number` and `phone_number_verified` from the user info endpoint. See [OpenID Connect Core 1.0, 5.4. Requesting Claims using Scope Values](https://openid.net/specs/openid-connect-core-1_0.html#ScopeClaims) for details.                                                                                                                                          |
   * | offline_access | A permission to get information from the user info endpoint even when the end-user is not present. See [OpenID Connect Core 1.0, 11. Offline Access](https://openid.net/specs/openid-connect-core-1_0.html#OfflineAccess) for details.                                                                                                                                                                          |
   *
   * The value of this property is used as `scopes_supported` property in the
   * [OpenID Provider Metadata](https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata).
   */
  supportedScopes?: Array<AuthorizationAPI.Scope>;

  /**
   * The profiles that this service supports.
   */
  supportedServiceProfiles?: Array<'FAPI' | 'OPEN_BANKING'>;

  /**
   * Client authentication methods supported by the token endpoint of the service.
   *
   * The value of this property is used as `token_endpoint_auth_methods_supports`
   * property in the
   * [OpenID Provider Metadata](https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata).
   */
  supportedTokenAuthMethods?: Array<ClientGetAPI.ClientAuthenticationMethod>;

  /**
   * Trust frameworks supported by this service. This corresponds to the
   * `trust_frameworks_supported`
   * [metadata](https://openid.net/specs/openid-connect-4-identity-assurance-1_0.html#rfc.section.7).
   */
  supportedTrustFrameworks?: Array<string>;

  /**
   * UI locales that the service supports.
   *
   * Each element is a language tag defined in
   * [RFC 5646](https://tools.ietf.org/html/rfc5646). For example, `en-US` and
   * `ja-JP`.
   *
   * The value of this property is used as `ui_locales_supported` property in the
   * [OpenID Provider Metadata](https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata).
   */
  supportedUiLocales?: Array<string>;

  /**
   * Verification methods supported by this service. This corresponds to the
   * `id_documents_verification_methods_supported`
   * [metadata](https://openid.net/specs/openid-connect-4-identity-assurance-1_0.html#rfc.section.7).
   */
  supportedVerificationMethods?: Array<string>;

  /**
   * Verified claims supported by this service. This corresponds to the
   * `claims_in_verified_claims_supported`
   * [metadata](https://openid.net/specs/openid-connect-4-identity-assurance-1_0.html#rfc.section.7).
   */
  supportedVerifiedClaims?: Array<string>;

  /**
   * The flag to indicate whether this service supports issuing TLS client
   * certificate bound access tokens.
   */
  tlsClientCertificateBoundAccessTokens?: boolean;

  /**
   * The [token endpoint](https://tools.ietf.org/html/rfc6749#section-3.2) of the
   * service.
   *
   * A URL that starts with `https://` and has not fragment component. For example,
   * `https://example.com/auth/token`.
   *
   * The value of this property is used as `token_endpoint` property in the
   * [OpenID Provider Metadata](https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata).
   */
  tokenEndpoint?: string;

  /**
   * The flag indicating whether to prohibit public clients from making token
   * exchange requests.
   */
  tokenExchangeByConfidentialClientsOnly?: boolean;

  /**
   * The flag indicating whether to prohibit unidentifiable clients from making token
   * exchange requests.
   */
  tokenExchangeByIdentifiableClientsOnly?: boolean;

  /**
   * The flag indicating whether to prohibit clients that have no explicit permission
   * from making token exchange requests.
   */
  tokenExchangeByPermittedClientsOnly?: boolean;

  /**
   * The flag indicating whether to reject token exchange requests which use
   * encrypted JWTs as input tokens.
   */
  tokenExchangeEncryptedJwtRejected?: boolean;

  /**
   * The flag indicating whether to reject token exchange requests which use unsigned
   * JWTs as input tokens.
   */
  tokenExchangeUnsignedJwtRejected?: boolean;

  /**
   * The flag indicating whether the expiration date of an access token never exceeds
   * that of the corresponding refresh token.
   *
   * When a new access token is issued by a refresh token request (= a token request
   * with `grant_type=refresh_token`), the expiration date of the access token may
   * exceed the expiration date of the corresponding refresh token. This behavior
   * itself is not wrong and may happen when `refreshTokenKept` is `true` and/or when
   * `refreshTokenDurationKept` is `true`.
   *
   * When this flag is `true`, the expiration date of an access token never exceeds
   * that of the corresponding refresh token regardless of the calculated duration
   * based on other settings such as `accessTokenDuration`, `accessTokenDuration` in
   * `extension` and `access_token.duration` scope attribute.
   *
   * It is technically possible to set a value which is bigger than the duration of
   * refresh tokens as the duration of access tokens although it is strange. In the
   * case, the duration of an access token becomes longer than the duration of the
   * refresh token which is issued together with the access token. Even if the
   * duration values are configured so, if this flag is `true`, the expiration date
   * of the access token does not exceed that of the refresh token. That is, the
   * duration of the access token will be shortened, and as a result, the access
   * token and the refresh token will have the same expiration date.
   */
  tokenExpirationLinked?: boolean;

  /**
   * The URL of the "Terms Of Service" of the service.
   *
   * The value of this property is used as `op_tos_uri` property in the
   * [OpenID Provider Metadata](http://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata).
   */
  tosUri?: string;

  /**
   * The flag to indicate whether a request object is processed based on rules
   * defined in
   * [OpenID Connect Core 1.0](https://openid.net/specs/openid-connect-core-1_0.html)
   * or JAR (JWT Secured Authorization Request).
   *
   * Differences between rules in OpenID Connect Core 1.0 and ones in JAR are as
   * follows.
   *
   * - JAR requires that a request object be always -signed.
   * - JAR does not allow request parameters outside a request object to be referred
   *   to.
   * - OIDC Core 1.0 requires that response_type request parameter exist outside a
   *   request object even if the request object includes the request parameter.
   * - OIDC Core 1.0 requires that scope request parameter exist outside a request
   *   object if the authorization request is an
   * - OIDC request even if the request object includes the request parameter.
   *
   * If this flag is set to `false` and the value of `requestObjectRequired` is
   * `true`, the value of `require_signed_request_object` server metadata of this
   * service is reported as `true` in the discovery document. The metadata is defined
   * in JAR (JWT Secured Authorization Request). That `require_signed_request_object`
   * is `true` means that authorization requests which don't conform to the JAR
   * specification are rejected.
   */
  traditionalRequestObjectProcessingApplied?: boolean;

  /**
   * The trust anchors that are referenced when this service resolves trust chains of
   * relying parties.
   *
   * If this property is empty, client registration fails regardless of whether its
   * type is `automatic` or `explicit`. It means that OpenID Connect Federation 1.0
   * does not work.
   */
  trustAnchors?: Array<ServiceUpdateServiceParams.TrustAnchor>;

  /**
   * The list of root certificates trusted by this service for PKI-based client
   * mutual TLS authentication.
   */
  trustedRootCertificates?: Array<string>;

  /**
   * The flag indicating whether Authlete's `/api/client/registration` API uses
   * `UNAUTHORIZED` as a value of the `action` response parameter when appropriate.
   *
   * The `UNAUTHORIZED` enum value was initially not defined as a possible value of
   * the `action` parameter in an `/api/client/registration` API response. This means
   * that implementations of client `configuration` endpoint were not able to conform
   * to [RFC 7592](https://www.rfc-editor.org/rfc/rfc7592.html) strictly.
   *
   * For backward compatibility (to avoid breaking running systems), Authlete's
   * `/api/client/registration` API does not return the `UNAUTHORIZED` enum value if
   * this flag is not turned on.
   *
   * The steps an existing implementation of client configuration endpoint has to do
   * in order to conform to the requirement related to "401 Unauthorized" are as
   * follows.
   *
   * 1. Update the Authlete library (e.g. authlete-java-common) your system is using.
   * 2. Update your implementation of client configuration endpoint so that it can
   *    handle the `UNAUTHORIZED` action.
   * 3. Turn on this `unauthorizedOnClientConfigSupported` flag.
   */
  unauthorizedOnClientConfigSupported?: boolean;

  /**
   * The character set for end-user verification codes (`user_code`) for Device Flow.
   */
  userCodeCharset?: 'BASE20' | 'NUMERIC';

  /**
   * The length of end-user verification codes (`user_code`) for Device Flow.
   */
  userCodeLength?: number;

  /**
   * The
   * [user info endpoint](http://openid.net/specs/openid-connect-core-1_0.html#UserInfo)
   * of the service. A URL that starts with `https://`. For example,
   * `https://example.com/auth/userinfo`.
   *
   * The value of this property is used as `userinfo_endpoint` property in the
   * [OpenID Provider Metadata](http://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata).
   */
  userInfoEndpoint?: string;

  /**
   * The key ID to identify a JWK used for user info signature using an asymmetric
   * key.
   *
   * A JWK Set can be registered as a property of a Service. A JWK Set can contain 0
   * or more JWKs (See [RFC 7517](https://tools.ietf.org/html/rfc7517) for details
   * about JWK). Authlete Server has to pick up one JWK for signature from the JWK
   * Set when it is required to sign user info (which is returned from
   * [userinfo endpoint](http://openid.net/specs/openid-connect-core-1_0.html#UserInfo))
   * using an asymmetric key. Authlete Server searches the registered JWK Set for a
   * JWK which satisfies conditions for user info signature. If the number of JWK
   * candidates which satisfy the conditions is 1, there is no problem. On the other
   * hand, if there exist multiple candidates, a
   * [Key ID](https://tools.ietf.org/html/rfc7517#section-4.5) is needed to be
   * specified so that Authlete Server can pick up one JWK from among the JWK
   * candidates.
   *
   * This `userInfoSignatureKeyId` property exists for the purpose described above.
   * For key rotation (OpenID Connect Core 1.0,
   * [10.1.1. Rotation of Asymmetric Signing Keys](http://openid.net/specs/openid-connect-core-1_0.html#RotateSigKeys)),
   * this mechanism is needed.
   */
  userInfoSignatureKeyId?: string;

  /**
   * The default length of user PINs.
   */
  userPinLength?: number;

  /**
   * Get the flag indicating whether the feature of Verifiable Credentials for this
   * service is enabled or not.
   */
  verifiableCredentialsEnabled?: boolean;

  /**
   * OIDC4IDA / verifiedClaimsValidationSchemaSet
   */
  verifiedClaimsValidationSchemaSet?: 'standard' | 'standard+id_document';
}

export namespace ServiceUpdateServiceParams {
  export interface CredentialIssuerMetadata {
    /**
     * The identifier of the authorization server that the credential issuer relies on
     * for authorization.
     */
    authorizationServer?: string;

    /**
     * The URL of the batch credential endpoint of the credential issuer.
     */
    batchCredentialEndpoint?: number;

    /**
     * The URL of the credential endpoint of the credential issuer.
     */
    credentialEndpoint?: boolean;

    /**
     * The identifier of a credential request.
     */
    credentialIssuer?: string;

    /**
     * A JSON array describing supported credentials.
     */
    credentialsSupported?: boolean;

    /**
     * The URL of the deferred credential endpoint of the credential issuer.
     */
    deferredCredentialEndpoint?: string;
  }

  export interface MtlsEndpointAlias {
    name?: string;

    uri?: string;
  }

  export interface TrustAnchor {
    /**
     * the entity ID of the trust anchor
     */
    entityId?: string;

    /**
     * the JWK Set document containing public keys of the trust anchor
     */
    jwks?: string;
  }
}

Service.Get = Get;
Service.Jwks = Jwks;

export declare namespace Service {
  export {
    type ServiceCreateServiceParams as ServiceCreateServiceParams,
    type ServiceUpdateServiceParams as ServiceUpdateServiceParams,
  };

  export {
    Get as Get,
    type JwsAlg as JwsAlg,
    type ResponseType as ResponseType,
    type GetAPIService as Service,
    type GetGetServiceConfigurationResponse as GetGetServiceConfigurationResponse,
    type GetListServicesResponse as GetListServicesResponse,
    type GetGetServiceConfigurationParams as GetGetServiceConfigurationParams,
    type GetListServicesParams as GetListServicesParams,
  };

  export {
    Jwks as Jwks,
    type JwkGetJwksResponse as JwkGetJwksResponse,
    type JwkGetJwksParams as JwkGetJwksParams,
  };
}
