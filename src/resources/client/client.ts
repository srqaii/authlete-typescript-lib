// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as IntrospectionAPI from '../auth/introspection';
import * as GetAPI from '../service/get';
import * as AuthorizationAPI from '../auth/authorization/authorization';
import * as TokenAPI from '../auth/token/token';
import * as ClientGetAPI from './get';
import {
  Client as GetAPIClient,
  ClientAuthenticationMethod,
  Get,
  GetListParams,
  GetListResponse,
  GetRetrieveParams,
  JweAlg,
  JweEnc,
} from './get';
import * as GrantedScopesAPI from './granted-scopes';
import {
  GrantedScopeDeleteParams,
  GrantedScopeDeleteResponse,
  GrantedScopeGetParams,
  GrantedScopeGetResponse,
  GrantedScopes,
} from './granted-scopes';
import * as LockFlagAPI from './lock-flag';
import { LockFlag, LockFlagUpdateParams, LockFlagUpdateResponse } from './lock-flag';
import * as RegistrationAPI from './registration';
import {
  Registration,
  RegistrationCreateParams,
  RegistrationCreateResponse,
  RegistrationDeleteParams,
  RegistrationDeleteResponse,
  RegistrationRetrieveParams,
  RegistrationRetrieveResponse,
  RegistrationUpdateParams,
  RegistrationUpdateResponse,
} from './registration';
import * as SecretAPI from './secret';
import {
  Secret,
  SecretRefreshParams,
  SecretRefreshResponse,
  SecretUpdateParams,
  SecretUpdateResponse,
} from './secret';
import * as AuthorizationAuthorizationAPI from './authorization/authorization';
import {
  Authorization,
  AuthorizationDeleteParams,
  AuthorizationDeleteResponse,
  AuthorizationUpdateParams,
  AuthorizationUpdateResponse,
} from './authorization/authorization';
import * as ExtensionAPI from './extension/extension';
import { Extension as ExtensionAPIExtension } from './extension/extension';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Client extends APIResource {
  get: ClientGetAPI.Get = new ClientGetAPI.Get(this._client);
  lockFlag: LockFlagAPI.LockFlag = new LockFlagAPI.LockFlag(this._client);
  secret: SecretAPI.Secret = new SecretAPI.Secret(this._client);
  authorization: AuthorizationAuthorizationAPI.Authorization =
    new AuthorizationAuthorizationAPI.Authorization(this._client);
  grantedScopes: GrantedScopesAPI.GrantedScopes = new GrantedScopesAPI.GrantedScopes(this._client);
  registration: RegistrationAPI.Registration = new RegistrationAPI.Registration(this._client);
  extension: ExtensionAPI.Extension = new ExtensionAPI.Extension(this._client);

  /**
   * Create a new client.
   *
   * @example
   * ```ts
   * const client = await client.client.create('serviceId', {
   *   applicationType: 'WEB',
   *   attributes: [
   *     { key: 'attribute1-key', value: 'attribute1-value' },
   *     { key: 'attribute2-key', value: 'attribute2-value' },
   *   ],
   *   clientIdAlias: 'my-client',
   *   clientIdAliasEnabled: true,
   *   clientName: 'My Client',
   *   clientType: 'CONFIDENTIAL',
   *   grantTypes: ['AUTHORIZATION_CODE', 'REFRESH_TOKEN'],
   *   redirectUris: [
   *     'https://my-client.example.com/cb1',
   *     'https://my-client.example.com/cb2',
   *   ],
   *   responseTypes: ['CODE', 'TOKEN'],
   *   tokenAuthMethod: 'CLIENT_SECRET_BASIC',
   * });
   * ```
   */
  create(
    serviceID: string,
    body: ClientCreateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<ClientGetAPI.Client> {
    return this._client.post(path`/api/${serviceID}/client/create`, { body, ...options });
  }

  /**
   * Update a client.
   *
   * @example
   * ```ts
   * const client = await client.client.update('clientId', {
   *   serviceId: 'serviceId',
   *   applicationType: 'WEB',
   *   attributes: [
   *     { key: 'attribute1-key', value: 'attribute1-value' },
   *     { key: 'attribute2-key', value: 'attribute2-value' },
   *   ],
   *   clientIdAlias: 'my-client',
   *   clientIdAliasEnabled: true,
   *   clientName: 'My updated client',
   *   clientType: 'CONFIDENTIAL',
   *   grantTypes: ['AUTHORIZATION_CODE', 'REFRESH_TOKEN'],
   *   idTokenSignAlg: 'RS256',
   *   redirectUris: [
   *     'https://my-client.example.com/cb1',
   *     'https://my-client.example.com/cb2',
   *   ],
   *   responseTypes: ['CODE', 'TOKEN'],
   *   subjectType: 'PUBLIC',
   *   tokenAuthMethod: 'CLIENT_SECRET_BASIC',
   * });
   * ```
   */
  update(
    clientID: string,
    params: ClientUpdateParams,
    options?: RequestOptions,
  ): APIPromise<ClientGetAPI.Client> {
    const { serviceId, ...body } = params;
    return this._client.post(path`/api/${serviceId}/client/update/${clientID}`, { body, ...options });
  }

  /**
   * Delete a client.
   *
   * @example
   * ```ts
   * await client.client.delete('clientId', {
   *   serviceId: 'serviceId',
   * });
   * ```
   */
  delete(clientID: string, params: ClientDeleteParams, options?: RequestOptions): APIPromise<void> {
    const { serviceId } = params;
    return this._client.delete(path`/api/${serviceId}/client/delete/${clientID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export interface ClientCreateParams {
  /**
   * The application type. The value of this property affects the validation steps
   * for a redirect URI. See the description about `redirectUris` property for more
   * details.
   */
  applicationType?: 'WEB' | 'NATIVE';

  /**
   * The attributes of this client.
   */
  attributes?: Array<TokenAPI.Pair>;

  /**
   * The authorization details types that this client may use as values of the `type`
   * field in `authorization_details`.
   *
   * This property corresponds to the `authorization_details_types` metadata. See
   * [OAuth 2.0 Rich Authorization Requests (RAR)](https://datatracker.ietf.org/doc/draft-ietf-oauth-rar/)
   * for details.
   *
   * Note that the property name was renamed from authorizationDataTypes to
   * authorizationDetailsTypes to align with the change made by the 5th draft of the
   * RAR specification.
   */
  authorizationDetailsTypes?: Array<string>;

  /**
   * this is the 'alg' header value for encrypted JWT tokens. Depending upon the
   * context, this refers to key transport scheme to be used by the client and by the
   * server. For instance:
   *
   * - as `authorizationEncryptionAlg` value, it refers to the encoding algorithm
   *   used by server for transporting they keys on JARM objects
   * - as `requestEncryptionAlg` value, it refers to the expected key transport
   *   encoding algorithm that server expect from client when encrypting a Request
   *   Object
   * - as `idTokenEncryptionAlg` value, it refers to the algorithm used by the server
   *   to key transport of id_tokens
   *
   * **Please note that some of the algorithms are more secure than others, some are
   * not supported very well cross platforms and some (like RSA1_5) is known to be
   * weak**.
   */
  authorizationEncryptionAlg?: ClientGetAPI.JweAlg;

  /**
   * This is the encryption algorithm to be used when encrypting a JWT on client or
   * server side. Depending upon the context, this refers to encryption done by the
   * client or by the server. For instance:
   *
   * - as `authorizationEncryptionEnc` value, it refers to the encryption algorithm
   *   used by server when creating a JARM response
   * - as `requestEncryptionEnc` value, it refers to the expected encryption
   *   algorithm used by the client when encrypting a Request Object
   * - as `idTokenEncryptionEnc` value, it refers to the algorithm used by the server
   *   to encrypt id_tokens
   */
  authorizationEncryptionEnc?: ClientGetAPI.JweEnc;

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
  authorizationSignAlg?: GetAPI.JwsAlg;

  /**
   * The flag to indicate whether this client requires `auth_time` claim to be
   * embedded in the ID token.
   *
   * This property corresponds to `require_auth_time` in
   * [OpenID Connect Dynamic Client Registration 1.0, 2. Client Metadata](https://openid.net/specs/openid-connect-registration-1_0.html#ClientMetadata).
   */
  authTimeRequired?: boolean;

  /**
   * The flag indicating whether this client was registered by the "automatic" client
   * registration of OIDC Federation.
   */
  automaticallyRegistered?: boolean;

  /**
   * The backchannel token delivery mode.
   *
   * This property corresponds to the `backchannel_token_delivery_mode` metadata. The
   * backchannel token delivery mode is defined in the specification of "CIBA (Client
   * Initiated Backchannel Authentication)".
   */
  bcDeliveryMode?: string;

  /**
   * The backchannel client notification endpoint.
   *
   * This property corresponds to the `backchannel_client_notification_endpoint`
   * metadata. The backchannel token delivery mode is defined in the specification of
   * "CIBA (Client Initiated Backchannel Authentication)".
   */
  bcNotificationEndpoint?: string;

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
  bcRequestSignAlg?: GetAPI.JwsAlg;

  /**
   * The boolean flag to indicate whether a user code is required when this client
   * makes a backchannel authentication request.
   *
   * This property corresponds to the `backchannel_user_code_parameter` metadata.
   */
  bcUserCodeRequired?: boolean;

  /**
   * The value of the client's `client_id` property used in OAuth and OpenID Connect
   * calls. By default, this is a string version of the `clientId` property.
   */
  clientIdAlias?: string;

  /**
   * Deprecated. Always set to `true`.
   */
  clientIdAliasEnabled?: boolean;

  /**
   * The name of the client application. This property corresponds to `client_name`
   * in
   * [OpenID Connect Dynamic Client Registration 1.0, 2. Client Metadata](https://openid.net/specs/openid-connect-registration-1_0.html#ClientMetadata).
   */
  clientName?: string;

  /**
   * Client names with language tags. If the client application has different names
   * for different languages, this property can be used to register the names.
   */
  clientNames?: Array<AuthorizationAPI.TaggedValue>;

  /**
   * The client registration types that the client has declared it may use.
   */
  clientRegistrationTypes?: Array<'AUTOMATIC' | 'EXPLICIT'>;

  /**
   * The client type, either `CONFIDENTIAL` or `PUBLIC`. See
   * [RFC 6749, 2.1. Client Types](https://datatracker.ietf.org/doc/html/rfc6749#section-2.1)
   * for details.
   */
  clientType?: 'PUBLIC' | 'CONFIDENTIAL';

  /**
   * The URL pointing to the home page of the client application.
   *
   * This property corresponds to `client_uri` in
   * [OpenID Connect Dynamic Client Registration 1.0, 2. Client Metadata](https://openid.net/specs/openid-connect-registration-1_0.html#ClientMetadata).
   */
  clientUri?: string;

  /**
   * Home page URLs with language tags. If the client application has different home
   * pages for different languages, this property can be used to register the URLs.
   */
  clientUris?: Array<AuthorizationAPI.TaggedValue>;

  /**
   * An array of email addresses of people responsible for the client application.
   *
   * This property corresponds to contacts in
   * [OpenID Connect Dynamic Client Registration 1.0, 2. Client Metadata](https://openid.net/specs/openid-connect-registration-1_0.html#ClientMetadata).
   */
  contacts?: Array<string>;

  /**
   * The URL of the credential offer endpoint at which this client (wallet) receives
   * a credential offer from the credential issuer.
   */
  credentialOfferEndpoint?: string;

  /**
   * True if credential responses to this client must be always encrypted.
   */
  credentialResponseEncryptionRequired?: boolean;

  /**
   * The custom client metadata in JSON format.
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
   * Authlete, set to corresponding properties of the client application. For
   * example, the value of the `client_name` client metadata in Client
   * Registration/Update Request is set to the clientName property. On the other
   * hand, unrecognized client metadata are discarded.
   *
   * By listing up custom client metadata in advance by using the
   * `supportedCustomClientMetadata` property of Service, Authlete can recognize them
   * and stores their values into the database. The stored custom client metadata
   * values can be referenced by this property.
   */
  customMetadata?: string;

  /**
   * The default ACRs (Authentication Context Class References). This value is used
   * when an authorization request from the client application has neither
   * `acr_values` request parameter nor `acr` claim in claims request parameter.
   */
  defaultAcrs?: Array<string>;

  /**
   * The default maximum authentication age in seconds. This value is used when an
   * authorization request from the client application does not have `max_age`
   * request parameter.
   *
   * This property corresponds to `default_max_age` in
   * [OpenID Connect Dynamic Client Registration 1.0, 2. Client Metadata](https://openid.net/specs/openid-connect-registration-1_0.html#ClientMetadata).
   */
  defaultMaxAge?: number;

  /**
   * The description about the client application.
   */
  description?: string;

  /**
   * Descriptions about the client application with language tags. If the client
   * application has different descriptions for different languages, this property
   * can be used to register the descriptions.
   */
  descriptions?: Array<AuthorizationAPI.TaggedValue>;

  /**
   * The digest algorithm that this client requests the server to use when it
   * computes digest values of <a href=
   * "https://openid.net/specs/openid-connect-4-identity-assurance-1_0.html#name-external-attachments"
   *
   * > external attachments</a>, which may be referenced from within ID tokens or
   * > userinfo responses (or any place that can have the `verified_claims` claim).
   *
   * Possible values are listed in the <a href=
   * "https://www.iana.org/assignments/named-information/named-information.xhtml#hash-alg"
   *
   * > Hash Algorithm Registry</a> of IANA (Internet Assigned Numbers Authority), but
   * > the server does not necessarily support all the values there. When this
   * > property is omitted, `sha-256` is used as the default algorithm.
   *
   * This property corresponds to the `digest_algorithm` client metadata which was
   * defined by the third implementer's draft of
   * [OpenID Connect for Identity Assurance 1.0](https://openid.net/specs/openid-connect-4-identity-assurance-1_0.html).
   */
  digestAlgorithm?: string;

  /**
   * If the DPoP is required for this client
   */
  dpopRequired?: boolean;

  /**
   * the entity ID of this client.
   */
  entityId?: string;

  /**
   * The flag indicating whether this client was registered by the "explicit" client
   * registration of OIDC Federation.
   */
  explicitlyRegistered?: boolean;

  extension?: ClientCreateParams.Extension;

  /**
   * The FAPI modes for this client.
   *
   * When the value of this property is not `null`, Authlete always processes
   * requests from this client based on the specified FAPI modes if the FAPI feature
   * is enabled in Authlete, the FAPI profile is supported by the service, and the
   * FAPI modes for the service are set to `null`.
   *
   * For instance, when this property is set to an array containing `FAPI1_ADVANCED`
   * only, Authlete always processes requests from this client based on
   * "Financial-grade API Security Profile 1.0 - Part 2: Advanced" if the FAPI
   * feature is enabled in Authlete, the FAPI profile is supported by the service,
   * and the FAPI modes for the service are set to `null`.
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
   * is a different flag, `requestObjectRequired`, for the purpose.
   *
   * Even if this flag is `false`, encryption of request object is required if the
   * `frontChannelRequestObjectEncryptionRequired` flag of the service is `true`.
   */
  frontChannelRequestObjectEncryptionRequired?: boolean;

  /**
   * A string array of grant types which the client application declares that it will
   * restrict itself to using. This property corresponds to `grant_types` in
   * [OpenID Connect Dynamic Client Registration 1.0, 2. Client Metadata](https://openid.net/specs/openid-connect-registration-1_0.html#ClientMetadata).
   */
  grantTypes?: Array<IntrospectionAPI.GrantType>;

  /**
   * this is the 'alg' header value for encrypted JWT tokens. Depending upon the
   * context, this refers to key transport scheme to be used by the client and by the
   * server. For instance:
   *
   * - as `authorizationEncryptionAlg` value, it refers to the encoding algorithm
   *   used by server for transporting they keys on JARM objects
   * - as `requestEncryptionAlg` value, it refers to the expected key transport
   *   encoding algorithm that server expect from client when encrypting a Request
   *   Object
   * - as `idTokenEncryptionAlg` value, it refers to the algorithm used by the server
   *   to key transport of id_tokens
   *
   * **Please note that some of the algorithms are more secure than others, some are
   * not supported very well cross platforms and some (like RSA1_5) is known to be
   * weak**.
   */
  idTokenEncryptionAlg?: ClientGetAPI.JweAlg;

  /**
   * This is the encryption algorithm to be used when encrypting a JWT on client or
   * server side. Depending upon the context, this refers to encryption done by the
   * client or by the server. For instance:
   *
   * - as `authorizationEncryptionEnc` value, it refers to the encryption algorithm
   *   used by server when creating a JARM response
   * - as `requestEncryptionEnc` value, it refers to the expected encryption
   *   algorithm used by the client when encrypting a Request Object
   * - as `idTokenEncryptionEnc` value, it refers to the algorithm used by the server
   *   to encrypt id_tokens
   */
  idTokenEncryptionEnc?: ClientGetAPI.JweEnc;

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
  idTokenSignAlg?: GetAPI.JwsAlg;

  /**
   * The content of the JWK Set of the client application. The format is described in
   * [JSON Web Key (JWK), 5. JWK Set Format](https://datatracker.ietf.org/doc/html/rfc7517#section-5).
   * The JWK Set must not include private keys of the client application.
   *
   * [OpenID Connect Dynamic Client Registration 1.0](https://openid.net/specs/openid-connect-registration-1_0.html)
   * says that `jwks` must not be used when the client can use `jwks_uri`, but
   * Authlete allows both properties to be registered at the same time. However,
   * Authlete does not use the content of `jwks` when `jwksUri` is registered.
   *
   * This property corresponds to `jwks_uri` in
   * [OpenID Connect Dynamic Client Registration 1.0, 2. Client Metadata](https://openid.net/specs/openid-connect-registration-1_0.html#ClientMetadata).
   */
  jwks?: string;

  /**
   * The URL pointing to the JWK Set of the client application. The content pointed
   * to by the URL is JSON which complies with the format described in
   * [JSON Web Key (JWK), 5. JWK Set Format](https://datatracker.ietf.org/doc/html/rfc7517#section-5).
   * The JWK Set must not include private keys of the client application.
   *
   * If the client application requests encryption for ID tokens (from the
   * authorization/token/userinfo endpoints) and/or signs request objects, it must
   * make available its JWK Set containing public keys for the encryption and/or the
   * signature at the URL of `jwksUri`. The service (Authlete) fetches the JWK Set
   * from the URL as necessary.
   *
   * [OpenID Connect Dynamic Client Registration 1.0](https://openid.net/specs/openid-connect-registration-1_0.html)
   * says that `jwks` must not be used when the client can use `jwks_uri`, but
   * Authlete allows both properties to be registered at the same time. However,
   * Authlete does not use the content of `jwks` when `jwksUri` is registered.
   *
   * This property corresponds to `jwks_uri` in
   * [OpenID Connect Dynamic Client Registration 1.0, 2. Client Metadata](https://openid.net/specs/openid-connect-registration-1_0.html#ClientMetadata).
   */
  jwksUri?: string;

  /**
   * The flag which indicates whether this client is locked.
   */
  locked?: boolean;

  /**
   * The URL which a third party can use to initiate a login by the client
   * application.
   *
   * This property corresponds to `initiate_login_uri` in
   * [OpenID Connect Dynamic Client Registration 1.0, 2. Client Metadata](https://openid.net/specs/openid-connect-registration-1_0.html#ClientMetadata).
   */
  loginUri?: string;

  /**
   * The URL pointing to the logo image of the client application.
   *
   * This property corresponds to `logo_uri` in
   * [OpenID Connect Dynamic Client Registration 1.0, 2. Client Metadata](https://openid.net/specs/openid-connect-registration-1_0.html#ClientMetadata).
   */
  logoUri?: string;

  /**
   * Logo image URLs with language tags. If the client application has different logo
   * images for different languages, this property can be used to register URLs of
   * the images.
   */
  logoUris?: Array<AuthorizationAPI.TaggedValue>;

  /**
   * The human-readable name representing the organization that manages this client.
   * This property corresponds to the organization_name client metadata that is
   * defined in OpenID Connect Federation 1.0.
   */
  organizationName?: string;

  /**
   * The flag to indicate whether this client is required to use the pushed
   * authorization request endpoint. This property corresponds to the
   * `require_pushed_authorization_requests` client metadata defined in "OAuth 2.0
   * Pushed Authorization Requests".
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
   * The URL pointing to the page which describes the policy as to how end-user's
   * profile data is used.
   *
   * This property corresponds to `policy_uri` in
   * [OpenID Connect Dynamic Client Registration 1.0, 2. Client Metadata](https://openid.net/specs/openid-connect-registration-1_0.html#ClientMetadata).
   */
  policyUri?: string;

  /**
   * URLs of policy pages with language tags. If the client application has different
   * policy pages for different languages, this property can be used to register the
   * URLs.
   */
  policyUris?: Array<AuthorizationAPI.TaggedValue>;

  /**
   * Redirect URIs that the client application uses to receive a response from the
   * authorization endpoint. Requirements for a redirect URI are as follows.
   *
   * **Requirements by RFC 6749** (From
   * [RFC 6749, 3.1.2. Redirection Endpoint](https://datatracker.ietf.org/doc/html/rfc6749#section-3.1.2))
   *
   * - Must be an absolute URI.
   * - Must not have a fragment component.
   *
   * **Requirements by OpenID Connect** (From
   * "[OpenID Connect Dynamic Client Registration 1.0, 2. Client Metadata](https://openid.net/specs/openid-connect-registration-1_0.html#ClientMetadata),
   * application_type")
   *
   * - The scheme of the redirect URI used for Implicit Grant by a client application
   *   whose application is `web` must be `https`. This is checked at runtime by
   *   Authlete.
   * - The hostname of the redirect URI used for Implicit Grant by a client
   *   application whose application type is `web` must not be `localhost`. This is
   *   checked at runtime by Authlete.
   * - The scheme of the redirect URI used by a client application whose application
   *   type is `native` must be either (1) a custom scheme or (2) `http`, which is
   *   allowed only when the hostname part is `localhost`. This is checked at runtime
   *   by Authlete.
   *
   * **Requirements by Authlete**
   *
   * - Must consist of printable ASCII letters only.
   * - Must not exceed 200 letters.
   *
   * Note that Authlete allows the application type to be `null`. In other words, a
   * client application does not have to choose `web` or `native` as its application
   * type. If the application type is `null`, the requirements by OpenID Connect are
   * not checked at runtime.
   *
   * An authorization request from a client application which has not registered any
   * redirect URI fails unless at least all the following conditions are satisfied.
   *
   * - The client type of the client application is `confidential`.
   * - The value of `response_type` request parameter is `code`.
   * - The authorization request has the `redirect_uri` request parameter.
   * - The value of `scope` request parameter does not contain `openid`.
   *
   * RFC 6749 allows partial match of redirect URI under some conditions (see
   * [RFC 6749, 3.1.2.2. Registration Requirements](https://datatracker.ietf.org/doc/html/rfc6749#section-3.1.2.2)
   * for details), but OpenID Connect requires exact match.
   */
  redirectUris?: Array<string>;

  /**
   * The hash of the registration access token for this client.
   */
  registrationAccessTokenHash?: string;

  /**
   * this is the 'alg' header value for encrypted JWT tokens. Depending upon the
   * context, this refers to key transport scheme to be used by the client and by the
   * server. For instance:
   *
   * - as `authorizationEncryptionAlg` value, it refers to the encoding algorithm
   *   used by server for transporting they keys on JARM objects
   * - as `requestEncryptionAlg` value, it refers to the expected key transport
   *   encoding algorithm that server expect from client when encrypting a Request
   *   Object
   * - as `idTokenEncryptionAlg` value, it refers to the algorithm used by the server
   *   to key transport of id_tokens
   *
   * **Please note that some of the algorithms are more secure than others, some are
   * not supported very well cross platforms and some (like RSA1_5) is known to be
   * weak**.
   */
  requestEncryptionAlg?: ClientGetAPI.JweAlg;

  /**
   * This is the encryption algorithm to be used when encrypting a JWT on client or
   * server side. Depending upon the context, this refers to encryption done by the
   * client or by the server. For instance:
   *
   * - as `authorizationEncryptionEnc` value, it refers to the encryption algorithm
   *   used by server when creating a JARM response
   * - as `requestEncryptionEnc` value, it refers to the expected encryption
   *   algorithm used by the client when encrypting a Request Object
   * - as `idTokenEncryptionEnc` value, it refers to the algorithm used by the server
   *   to encrypt id_tokens
   */
  requestEncryptionEnc?: ClientGetAPI.JweEnc;

  /**
   * The flag indicating whether the JWE alg of encrypted request object must match
   * the `request_object_encryption_alg` client metadata.
   *
   * The `request_object_encryption_alg` client metadata itself is defined in
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
   * The property that represents the client metadata is `requestEncryptionAlg`. See
   * the description of `requestEncryptionAlg` for details.
   *
   * Even if this flag is `false`, the match is required if the
   * `requestObjectEncryptionAlgMatchRequired` flag of the service is `true`.
   */
  requestObjectEncryptionAlgMatchRequired?: boolean;

  /**
   * The flag indicating whether the JWE enc of encrypted request object must match
   * the `request_object_encryption_enc` client metadata.
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
   * The property that represents the client metadata is `requestEncryptionEnc`. See
   * the description of `requestEncryptionEnc` for details.
   *
   * Even if this flag is `false`, the match is required if the
   * `requestObjectEncryptionEncMatchRequired` flag of the service is `true`.
   */
  requestObjectEncryptionEncMatchRequired?: boolean;

  /**
   * The flag to indicate whether authorization requests from this client are always
   * required to utilize a request object by using either `request` or `request_uri`
   * request parameter.
   *
   * If this flag is set to `true` and the service's
   * `traditionalRequestObjectProcessingApplied` is set to `false`, authorization
   * requests from this client are processed as if `require_signed_request_object`
   * client metadata of this client is `true`. The metadata is defined in "JAR (JWT
   * Secured Authorization Request)".
   */
  requestObjectRequired?: boolean;

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
  requestSignAlg?: GetAPI.JwsAlg;

  /**
   * An array of URLs each of which points to a request object.
   *
   * Authlete requires that URLs used as values for `request_uri` request parameter
   * be pre-registered. This property is used for the pre-registration. See
   * [OpenID Connect Core 1.0, 6.2. Passing a Request Object by Reference](https://openid.net/specs/openid-connect-core-1_0.html#RequestUriParameter)
   * for details.
   */
  requestUris?: Array<string>;

  /**
   * The response modes that this client may use.
   */
  responseModes?: Array<
    'QUERY' | 'FRAGMENT' | 'FORM_POST' | 'JWT' | 'QUERY_JWT' | 'FRAGMENT_JWT' | 'FORM_POST_JWT'
  >;

  /**
   * A string array of response types which the client application declares that it
   * will restrict itself to using. This property corresponds to `response_types` in
   * [OpenID Connect Dynamic Client Registration 1.0, 2. Client Metadata](https://openid.net/specs/openid-connect-registration-1_0.html#ClientMetadata).
   */
  responseTypes?: Array<GetAPI.ResponseType>;

  /**
   * The flag indicating whether this service signs responses from the resource
   * server.
   */
  rsRequestSigned?: boolean;

  /**
   * The key ID of a JWK containing the public key used by this client to sign
   * requests to the resource server.
   */
  rsSignedRequestKeyId?: string;

  /**
   * The value of the sector identifier URI. This represents the
   * `sector_identifier_uri` client metadata which is defined in
   * [OpenID Connect Dynamic Client Registration 1.0, 2. Client Metadata](https://openid.net/specs/openid-connect-registration-1_0.html#ClientMetadata)
   */
  sectorIdentifierUri?: string;

  /**
   * The key ID of a JWK containing a self-signed certificate of this client.
   */
  selfSignedCertificateKeyId?: string;

  /**
   * The URI of the endpoint that returns this client's JWK Set document in the JWT
   * format. This property corresponds to the `signed_jwks_uri` client metadata
   * defined in OpenID Connect Federation 1.0.
   */
  signedJwksUri?: string;

  /**
   * If `Enabled` is selected, an attempt to issue a new access token invalidates
   * existing access tokens that are associated with the same combination of subject
   * and client.
   *
   * Note that, however, attempts by Client Credentials Flow do not invalidate
   * existing access tokens because access tokens issued by Client Credentials Flow
   * are not associated with any end-user's subject.
   *
   * Even if `Disabled` is selected here, single access token per subject is
   * effective if `singleAccessTokenPerSubject` of the `Service` this client belongs
   * to is Enabled.
   */
  singleAccessTokenPerSubject?: boolean;

  /**
   * The unique identifier string assigned by the client developer or software
   * publisher used by registration endpoints to identify the client software to be
   * dynamically registered.
   *
   * This property corresponds to the `software_id metadata` defined in
   * [2. Client Metadata](https://datatracker.ietf.org/doc/html/rfc7591#section-2) of
   * [RFC 7591](https://datatracker.ietf.org/doc/html/rfc7591).
   */
  softwareId?: string;

  /**
   * The version identifier string for the client software identified by the software
   * ID.
   *
   * This property corresponds to the software_version metadata defined in
   * [2. Client Metadata](https://datatracker.ietf.org/doc/html/rfc7591#section-2) of
   * [RFC 7591](https://datatracker.ietf.org/doc/html/rfc7591).
   */
  softwareVersion?: string;

  /**
   * The subject type that the client application requests. Details about the subject
   * type are described in
   * [OpenID Connect Core 1.0, 8. Subjct Identifier Types](https://openid.net/specs/openid-connect-core-1_0.html#SubjectIDTypes).
   *
   * This property corresponds to `subject_type` in
   * [OpenID Connect Dynamic Client Registration 1.0, 2. Client Metadata](https://openid.net/specs/openid-connect-registration-1_0.html#ClientMetadata).
   */
  subjectType?: 'PUBLIC' | 'PAIRWISE';

  /**
   * The string representation of the expected DNS subject alternative name of the
   * certificate this client will use in mutual TLS authentication.
   *
   * See `tls_client_auth_san_dns` in "Mutual TLS Profiles for OAuth Clients, 2.3.
   * Dynamic Client Registration" for details.
   */
  tlsClientAuthSanDns?: string;

  /**
   * The string representation of the expected email address subject alternative name
   * of the certificate this client will use in mutual TLS authentication.
   *
   * See `tls_client_auth_san_email` in "Mutual TLS Profiles for OAuth Clients, 2.3.
   * Dynamic Client Registration" for details.
   */
  tlsClientAuthSanEmail?: string;

  /**
   * The string representation of the expected IP address subject alternative name of
   * the certificate this client will use in mutual TLS authentication.
   *
   * See `tls_client_auth_san_ip` in "Mutual TLS Profiles for OAuth Clients, 2.3.
   * Dynamic Client Registration" for details.
   */
  tlsClientAuthSanIp?: string;

  /**
   * The string representation of the expected URI subject alternative name of the
   * certificate this client will use in mutual TLS authentication.
   *
   * See `tls_client_auth_san_uri` in "Mutual TLS Profiles for OAuth Clients, 2.3.
   * Dynamic Client Registration" for details.
   */
  tlsClientAuthSanUri?: string;

  /**
   * The string representation of the expected subject distinguished name of the
   * certificate this client will use in mutual TLS authentication.
   *
   * See `tls_client_auth_subject_dn` in "Mutual TLS Profiles for OAuth Clients, 2.3.
   * Dynamic Client Registration" for details.
   */
  tlsClientAuthSubjectDn?: string;

  /**
   * The flag to indicate whether this client use TLS client certificate bound access
   * tokens.
   */
  tlsClientCertificateBoundAccessTokens?: boolean;

  /**
   * The client authentication method that the client application declares that it
   * uses at the token endpoint. This property corresponds to
   * `token_endpoint_auth_method` in
   * [OpenID Connect Dynamic Client Registration 1.0, 2. Client Metadata](https://openid.net/specs/openid-connect-registration-1_0.html#ClientMetadata).
   */
  tokenAuthMethod?: ClientGetAPI.ClientAuthenticationMethod;

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
  tokenAuthSignAlg?: GetAPI.JwsAlg;

  /**
   * The URL pointing to the "Terms Of Service" page.
   *
   * This property corresponds to `tos_uri` in
   * [OpenID Connect Dynamic Client Registration 1.0, 2. Client Metadata](https://openid.net/specs/openid-connect-registration-1_0.html#ClientMetadata).
   */
  tosUri?: string;

  /**
   * URLs of "Terms Of Service" pages with language tags.
   *
   * If the client application has different "Terms Of Service" pages for different
   * languages, this property can be used to register the URLs.
   */
  tosUris?: Array<AuthorizationAPI.TaggedValue>;

  /**
   * The entity ID of the trust anchor of the trust chain that was used when this
   * client was registered or updated by the mechanism defined in OpenID Connect
   * Federation 1.0
   */
  trustAnchorId?: string;

  /**
   * The trust chain that was used when this client was registered or updated by the
   * mechanism defined in OpenID Connect Federation 1.0
   */
  trustChain?: Array<string>;

  /**
   * the expiration time of the trust chain that was used when this client was
   * registered or updated by the mechanism defined in OpenID Connect Federation 1.0.
   * The value is represented as milliseconds elapsed since the Unix epoch
   * (1970-01-01).
   */
  trustChainExpiresAt?: number;

  /**
   * the time at which the trust chain was updated by the mechanism defined in OpenID
   * Connect Federation 1.0
   */
  trustChainUpdatedAt?: number;

  /**
   * this is the 'alg' header value for encrypted JWT tokens. Depending upon the
   * context, this refers to key transport scheme to be used by the client and by the
   * server. For instance:
   *
   * - as `authorizationEncryptionAlg` value, it refers to the encoding algorithm
   *   used by server for transporting they keys on JARM objects
   * - as `requestEncryptionAlg` value, it refers to the expected key transport
   *   encoding algorithm that server expect from client when encrypting a Request
   *   Object
   * - as `idTokenEncryptionAlg` value, it refers to the algorithm used by the server
   *   to key transport of id_tokens
   *
   * **Please note that some of the algorithms are more secure than others, some are
   * not supported very well cross platforms and some (like RSA1_5) is known to be
   * weak**.
   */
  userInfoEncryptionAlg?: ClientGetAPI.JweAlg;

  /**
   * This is the encryption algorithm to be used when encrypting a JWT on client or
   * server side. Depending upon the context, this refers to encryption done by the
   * client or by the server. For instance:
   *
   * - as `authorizationEncryptionEnc` value, it refers to the encryption algorithm
   *   used by server when creating a JARM response
   * - as `requestEncryptionEnc` value, it refers to the expected encryption
   *   algorithm used by the client when encrypting a Request Object
   * - as `idTokenEncryptionEnc` value, it refers to the algorithm used by the server
   *   to encrypt id_tokens
   */
  userInfoEncryptionEnc?: ClientGetAPI.JweEnc;

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
  userInfoSignAlg?: GetAPI.JwsAlg;
}

export namespace ClientCreateParams {
  export interface Extension {
    /**
     * The value of the duration of access tokens per client in seconds. In normal
     * cases, the value of the service's `accessTokenDuration` property is used as the
     * duration of access tokens issued by the service. However, if this
     * `accessTokenDuration` property holds a non-zero positive number and its value is
     * less than the duration configured by the service, the value is used as the
     * duration of access tokens issued to the client application.
     *
     * Note that the duration of access tokens can be controlled by the scope attribute
     * `access_token.duration`, too. Authlete chooses the minimum value among the
     * candidates.
     */
    accessTokenDuration?: number;

    /**
     * The value of the duration of ID tokens per client in seconds. In normal cases,
     * the value of the service's `idTokenDuration` property is used as the duration of
     * ID tokens issued by the service. However, if this `idTokenDuration` property
     * holds a non-zero positive number and its value is less than the duration
     * configured by the service, the value is used as the duration of ID tokens issued
     * to the client application.
     *
     * Note that the duration of refresh tokens can be controlled by the scope
     * attribute `id_token.duration`, too. Authlete chooses the minimum value among the
     * candidates.
     */
    idTokenDuration?: number;

    /**
     * The value of the duration of refresh tokens per client in seconds. In normal
     * cases, the value of the service's `refreshTokenDuration` property is used as the
     * duration of refresh tokens issued by the service. However, if this
     * `refreshTokenDuration` property holds a non-zero positive number and its value
     * is less than the duration configured by the service, the value is used as the
     * duration of refresh tokens issued to the client application.
     *
     * Note that the duration of refresh tokens can be controlled by the scope
     * attribute `refresh_token.duration`, too. Authlete chooses the minimum value
     * among the candidates.
     */
    refreshTokenDuration?: number;

    /**
     * The set of scopes that the client application is allowed to request. This
     * paramter will be one of the following.
     *
     * - `null`
     * - an empty set
     * - a set with at least one element
     *
     * When the value of this parameter is `null`, it means that the set of scopes that
     * the client application is allowed to request is the set of the scopes that the
     * service supports. When the value of this parameter is an empty set, it means
     * that the client application is not allowed to request any scopes. When the value
     * of this parameter is a set with at least one element, it means that the set is
     * the set of scopes that the client application is allowed to request.
     */
    requestableScopes?: Array<string>;

    /**
     * The flag to indicate whether "Requestable Scopes per Client" is enabled or not.
     * If `true`, you can define the set of scopes which this client application can
     * request. If `false`, this client application can request any scope which is
     * supported by the authorization server.
     */
    requestableScopesEnabled?: boolean;

    /**
     * Get the flag indicating whether the client is explicitly given a permission to
     * make token exchange requests ([RFC
     * 8693][https://www.rfc-editor.org/rfc/rfc8693.html])
     */
    tokenExchangePermitted?: boolean;
  }
}

export interface ClientUpdateParams {
  /**
   * Path param: A service ID.
   */
  serviceId: string;

  /**
   * Body param: The application type. The value of this property affects the
   * validation steps for a redirect URI. See the description about `redirectUris`
   * property for more details.
   */
  applicationType?: 'WEB' | 'NATIVE';

  /**
   * Body param: The attributes of this client.
   */
  attributes?: Array<TokenAPI.Pair>;

  /**
   * Body param: The authorization details types that this client may use as values
   * of the `type` field in `authorization_details`.
   *
   * This property corresponds to the `authorization_details_types` metadata. See
   * [OAuth 2.0 Rich Authorization Requests (RAR)](https://datatracker.ietf.org/doc/draft-ietf-oauth-rar/)
   * for details.
   *
   * Note that the property name was renamed from authorizationDataTypes to
   * authorizationDetailsTypes to align with the change made by the 5th draft of the
   * RAR specification.
   */
  authorizationDetailsTypes?: Array<string>;

  /**
   * Body param: this is the 'alg' header value for encrypted JWT tokens. Depending
   * upon the context, this refers to key transport scheme to be used by the client
   * and by the server. For instance:
   *
   * - as `authorizationEncryptionAlg` value, it refers to the encoding algorithm
   *   used by server for transporting they keys on JARM objects
   * - as `requestEncryptionAlg` value, it refers to the expected key transport
   *   encoding algorithm that server expect from client when encrypting a Request
   *   Object
   * - as `idTokenEncryptionAlg` value, it refers to the algorithm used by the server
   *   to key transport of id_tokens
   *
   * **Please note that some of the algorithms are more secure than others, some are
   * not supported very well cross platforms and some (like RSA1_5) is known to be
   * weak**.
   */
  authorizationEncryptionAlg?: ClientGetAPI.JweAlg;

  /**
   * Body param: This is the encryption algorithm to be used when encrypting a JWT on
   * client or server side. Depending upon the context, this refers to encryption
   * done by the client or by the server. For instance:
   *
   * - as `authorizationEncryptionEnc` value, it refers to the encryption algorithm
   *   used by server when creating a JARM response
   * - as `requestEncryptionEnc` value, it refers to the expected encryption
   *   algorithm used by the client when encrypting a Request Object
   * - as `idTokenEncryptionEnc` value, it refers to the algorithm used by the server
   *   to encrypt id_tokens
   */
  authorizationEncryptionEnc?: ClientGetAPI.JweEnc;

  /**
   * Body param: The signature algorithm for JWT. This value is represented on 'alg'
   * attribute of the header of JWT.
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
  authorizationSignAlg?: GetAPI.JwsAlg;

  /**
   * Body param: The flag to indicate whether this client requires `auth_time` claim
   * to be embedded in the ID token.
   *
   * This property corresponds to `require_auth_time` in
   * [OpenID Connect Dynamic Client Registration 1.0, 2. Client Metadata](https://openid.net/specs/openid-connect-registration-1_0.html#ClientMetadata).
   */
  authTimeRequired?: boolean;

  /**
   * Body param: The flag indicating whether this client was registered by the
   * "automatic" client registration of OIDC Federation.
   */
  automaticallyRegistered?: boolean;

  /**
   * Body param: The backchannel token delivery mode.
   *
   * This property corresponds to the `backchannel_token_delivery_mode` metadata. The
   * backchannel token delivery mode is defined in the specification of "CIBA (Client
   * Initiated Backchannel Authentication)".
   */
  bcDeliveryMode?: string;

  /**
   * Body param: The backchannel client notification endpoint.
   *
   * This property corresponds to the `backchannel_client_notification_endpoint`
   * metadata. The backchannel token delivery mode is defined in the specification of
   * "CIBA (Client Initiated Backchannel Authentication)".
   */
  bcNotificationEndpoint?: string;

  /**
   * Body param: The signature algorithm for JWT. This value is represented on 'alg'
   * attribute of the header of JWT.
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
  bcRequestSignAlg?: GetAPI.JwsAlg;

  /**
   * Body param: The boolean flag to indicate whether a user code is required when
   * this client makes a backchannel authentication request.
   *
   * This property corresponds to the `backchannel_user_code_parameter` metadata.
   */
  bcUserCodeRequired?: boolean;

  /**
   * Body param: The value of the client's `client_id` property used in OAuth and
   * OpenID Connect calls. By default, this is a string version of the `clientId`
   * property.
   */
  clientIdAlias?: string;

  /**
   * Body param: Deprecated. Always set to `true`.
   */
  clientIdAliasEnabled?: boolean;

  /**
   * Body param: The name of the client application. This property corresponds to
   * `client_name` in
   * [OpenID Connect Dynamic Client Registration 1.0, 2. Client Metadata](https://openid.net/specs/openid-connect-registration-1_0.html#ClientMetadata).
   */
  clientName?: string;

  /**
   * Body param: Client names with language tags. If the client application has
   * different names for different languages, this property can be used to register
   * the names.
   */
  clientNames?: Array<AuthorizationAPI.TaggedValue>;

  /**
   * Body param: The client registration types that the client has declared it may
   * use.
   */
  clientRegistrationTypes?: Array<'AUTOMATIC' | 'EXPLICIT'>;

  /**
   * Body param: The client type, either `CONFIDENTIAL` or `PUBLIC`. See
   * [RFC 6749, 2.1. Client Types](https://datatracker.ietf.org/doc/html/rfc6749#section-2.1)
   * for details.
   */
  clientType?: 'PUBLIC' | 'CONFIDENTIAL';

  /**
   * Body param: The URL pointing to the home page of the client application.
   *
   * This property corresponds to `client_uri` in
   * [OpenID Connect Dynamic Client Registration 1.0, 2. Client Metadata](https://openid.net/specs/openid-connect-registration-1_0.html#ClientMetadata).
   */
  clientUri?: string;

  /**
   * Body param: Home page URLs with language tags. If the client application has
   * different home pages for different languages, this property can be used to
   * register the URLs.
   */
  clientUris?: Array<AuthorizationAPI.TaggedValue>;

  /**
   * Body param: An array of email addresses of people responsible for the client
   * application.
   *
   * This property corresponds to contacts in
   * [OpenID Connect Dynamic Client Registration 1.0, 2. Client Metadata](https://openid.net/specs/openid-connect-registration-1_0.html#ClientMetadata).
   */
  contacts?: Array<string>;

  /**
   * Body param: The URL of the credential offer endpoint at which this client
   * (wallet) receives a credential offer from the credential issuer.
   */
  credentialOfferEndpoint?: string;

  /**
   * Body param: True if credential responses to this client must be always
   * encrypted.
   */
  credentialResponseEncryptionRequired?: boolean;

  /**
   * Body param: The custom client metadata in JSON format.
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
   * Authlete, set to corresponding properties of the client application. For
   * example, the value of the `client_name` client metadata in Client
   * Registration/Update Request is set to the clientName property. On the other
   * hand, unrecognized client metadata are discarded.
   *
   * By listing up custom client metadata in advance by using the
   * `supportedCustomClientMetadata` property of Service, Authlete can recognize them
   * and stores their values into the database. The stored custom client metadata
   * values can be referenced by this property.
   */
  customMetadata?: string;

  /**
   * Body param: The default ACRs (Authentication Context Class References). This
   * value is used when an authorization request from the client application has
   * neither `acr_values` request parameter nor `acr` claim in claims request
   * parameter.
   */
  defaultAcrs?: Array<string>;

  /**
   * Body param: The default maximum authentication age in seconds. This value is
   * used when an authorization request from the client application does not have
   * `max_age` request parameter.
   *
   * This property corresponds to `default_max_age` in
   * [OpenID Connect Dynamic Client Registration 1.0, 2. Client Metadata](https://openid.net/specs/openid-connect-registration-1_0.html#ClientMetadata).
   */
  defaultMaxAge?: number;

  /**
   * Body param: The description about the client application.
   */
  description?: string;

  /**
   * Body param: Descriptions about the client application with language tags. If the
   * client application has different descriptions for different languages, this
   * property can be used to register the descriptions.
   */
  descriptions?: Array<AuthorizationAPI.TaggedValue>;

  /**
   * Body param: The digest algorithm that this client requests the server to use
   * when it computes digest values of <a href=
   * "https://openid.net/specs/openid-connect-4-identity-assurance-1_0.html#name-external-attachments"
   *
   * > external attachments</a>, which may be referenced from within ID tokens or
   * > userinfo responses (or any place that can have the `verified_claims` claim).
   *
   * Possible values are listed in the <a href=
   * "https://www.iana.org/assignments/named-information/named-information.xhtml#hash-alg"
   *
   * > Hash Algorithm Registry</a> of IANA (Internet Assigned Numbers Authority), but
   * > the server does not necessarily support all the values there. When this
   * > property is omitted, `sha-256` is used as the default algorithm.
   *
   * This property corresponds to the `digest_algorithm` client metadata which was
   * defined by the third implementer's draft of
   * [OpenID Connect for Identity Assurance 1.0](https://openid.net/specs/openid-connect-4-identity-assurance-1_0.html).
   */
  digestAlgorithm?: string;

  /**
   * Body param: If the DPoP is required for this client
   */
  dpopRequired?: boolean;

  /**
   * Body param: the entity ID of this client.
   */
  entityId?: string;

  /**
   * Body param: The flag indicating whether this client was registered by the
   * "explicit" client registration of OIDC Federation.
   */
  explicitlyRegistered?: boolean;

  /**
   * Body param:
   */
  extension?: ClientUpdateParams.Extension;

  /**
   * Body param: The FAPI modes for this client.
   *
   * When the value of this property is not `null`, Authlete always processes
   * requests from this client based on the specified FAPI modes if the FAPI feature
   * is enabled in Authlete, the FAPI profile is supported by the service, and the
   * FAPI modes for the service are set to `null`.
   *
   * For instance, when this property is set to an array containing `FAPI1_ADVANCED`
   * only, Authlete always processes requests from this client based on
   * "Financial-grade API Security Profile 1.0 - Part 2: Advanced" if the FAPI
   * feature is enabled in Authlete, the FAPI profile is supported by the service,
   * and the FAPI modes for the service are set to `null`.
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
   * Body param: The flag indicating whether encryption of request object is required
   * when the request object is passed through the front channel.
   *
   * This flag does not affect the processing of request objects at the Pushed
   * Authorization Request Endpoint, which is defined in
   * [OAuth 2.0 Pushed Authorization Requests](https://datatracker.ietf.org/doc/rfc9126/).
   * Unecrypted request objects are accepted at the endpoint even if this flag is
   * `true`.
   *
   * This flag does not indicate whether a request object is always required. There
   * is a different flag, `requestObjectRequired`, for the purpose.
   *
   * Even if this flag is `false`, encryption of request object is required if the
   * `frontChannelRequestObjectEncryptionRequired` flag of the service is `true`.
   */
  frontChannelRequestObjectEncryptionRequired?: boolean;

  /**
   * Body param: A string array of grant types which the client application declares
   * that it will restrict itself to using. This property corresponds to
   * `grant_types` in
   * [OpenID Connect Dynamic Client Registration 1.0, 2. Client Metadata](https://openid.net/specs/openid-connect-registration-1_0.html#ClientMetadata).
   */
  grantTypes?: Array<IntrospectionAPI.GrantType>;

  /**
   * Body param: this is the 'alg' header value for encrypted JWT tokens. Depending
   * upon the context, this refers to key transport scheme to be used by the client
   * and by the server. For instance:
   *
   * - as `authorizationEncryptionAlg` value, it refers to the encoding algorithm
   *   used by server for transporting they keys on JARM objects
   * - as `requestEncryptionAlg` value, it refers to the expected key transport
   *   encoding algorithm that server expect from client when encrypting a Request
   *   Object
   * - as `idTokenEncryptionAlg` value, it refers to the algorithm used by the server
   *   to key transport of id_tokens
   *
   * **Please note that some of the algorithms are more secure than others, some are
   * not supported very well cross platforms and some (like RSA1_5) is known to be
   * weak**.
   */
  idTokenEncryptionAlg?: ClientGetAPI.JweAlg;

  /**
   * Body param: This is the encryption algorithm to be used when encrypting a JWT on
   * client or server side. Depending upon the context, this refers to encryption
   * done by the client or by the server. For instance:
   *
   * - as `authorizationEncryptionEnc` value, it refers to the encryption algorithm
   *   used by server when creating a JARM response
   * - as `requestEncryptionEnc` value, it refers to the expected encryption
   *   algorithm used by the client when encrypting a Request Object
   * - as `idTokenEncryptionEnc` value, it refers to the algorithm used by the server
   *   to encrypt id_tokens
   */
  idTokenEncryptionEnc?: ClientGetAPI.JweEnc;

  /**
   * Body param: The signature algorithm for JWT. This value is represented on 'alg'
   * attribute of the header of JWT.
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
  idTokenSignAlg?: GetAPI.JwsAlg;

  /**
   * Body param: The content of the JWK Set of the client application. The format is
   * described in
   * [JSON Web Key (JWK), 5. JWK Set Format](https://datatracker.ietf.org/doc/html/rfc7517#section-5).
   * The JWK Set must not include private keys of the client application.
   *
   * [OpenID Connect Dynamic Client Registration 1.0](https://openid.net/specs/openid-connect-registration-1_0.html)
   * says that `jwks` must not be used when the client can use `jwks_uri`, but
   * Authlete allows both properties to be registered at the same time. However,
   * Authlete does not use the content of `jwks` when `jwksUri` is registered.
   *
   * This property corresponds to `jwks_uri` in
   * [OpenID Connect Dynamic Client Registration 1.0, 2. Client Metadata](https://openid.net/specs/openid-connect-registration-1_0.html#ClientMetadata).
   */
  jwks?: string;

  /**
   * Body param: The URL pointing to the JWK Set of the client application. The
   * content pointed to by the URL is JSON which complies with the format described
   * in
   * [JSON Web Key (JWK), 5. JWK Set Format](https://datatracker.ietf.org/doc/html/rfc7517#section-5).
   * The JWK Set must not include private keys of the client application.
   *
   * If the client application requests encryption for ID tokens (from the
   * authorization/token/userinfo endpoints) and/or signs request objects, it must
   * make available its JWK Set containing public keys for the encryption and/or the
   * signature at the URL of `jwksUri`. The service (Authlete) fetches the JWK Set
   * from the URL as necessary.
   *
   * [OpenID Connect Dynamic Client Registration 1.0](https://openid.net/specs/openid-connect-registration-1_0.html)
   * says that `jwks` must not be used when the client can use `jwks_uri`, but
   * Authlete allows both properties to be registered at the same time. However,
   * Authlete does not use the content of `jwks` when `jwksUri` is registered.
   *
   * This property corresponds to `jwks_uri` in
   * [OpenID Connect Dynamic Client Registration 1.0, 2. Client Metadata](https://openid.net/specs/openid-connect-registration-1_0.html#ClientMetadata).
   */
  jwksUri?: string;

  /**
   * Body param: The flag which indicates whether this client is locked.
   */
  locked?: boolean;

  /**
   * Body param: The URL which a third party can use to initiate a login by the
   * client application.
   *
   * This property corresponds to `initiate_login_uri` in
   * [OpenID Connect Dynamic Client Registration 1.0, 2. Client Metadata](https://openid.net/specs/openid-connect-registration-1_0.html#ClientMetadata).
   */
  loginUri?: string;

  /**
   * Body param: The URL pointing to the logo image of the client application.
   *
   * This property corresponds to `logo_uri` in
   * [OpenID Connect Dynamic Client Registration 1.0, 2. Client Metadata](https://openid.net/specs/openid-connect-registration-1_0.html#ClientMetadata).
   */
  logoUri?: string;

  /**
   * Body param: Logo image URLs with language tags. If the client application has
   * different logo images for different languages, this property can be used to
   * register URLs of the images.
   */
  logoUris?: Array<AuthorizationAPI.TaggedValue>;

  /**
   * Body param: The human-readable name representing the organization that manages
   * this client. This property corresponds to the organization_name client metadata
   * that is defined in OpenID Connect Federation 1.0.
   */
  organizationName?: string;

  /**
   * Body param: The flag to indicate whether this client is required to use the
   * pushed authorization request endpoint. This property corresponds to the
   * `require_pushed_authorization_requests` client metadata defined in "OAuth 2.0
   * Pushed Authorization Requests".
   */
  parRequired?: boolean;

  /**
   * Body param: The flag to indicate whether the use of Proof Key for Code Exchange
   * (PKCE) is always required for authorization requests by Authorization Code Flow.
   *
   * If `true`, `code_challenge` request parameter is always required for
   * authorization requests using Authorization Code Flow.
   *
   * See [RFC 7636](https://tools.ietf.org/html/rfc7636) (Proof Key for Code Exchange
   * by OAuth Public Clients) for details about `code_challenge` request parameter.
   */
  pkceRequired?: boolean;

  /**
   * Body param: The flag to indicate whether `S256` is always required as the code
   * challenge method whenever [PKCE (RFC 7636)](https://tools.ietf.org/html/rfc7636)
   * is used.
   *
   * If this flag is set to `true`, `code_challenge_method=S256` must be included in
   * the authorization request whenever it includes the `code_challenge` request
   * parameter. Neither omission of the `code_challenge_method` request parameter nor
   * use of plain (`code_challenge_method=plain`) is allowed.
   */
  pkceS256Required?: boolean;

  /**
   * Body param: The URL pointing to the page which describes the policy as to how
   * end-user's profile data is used.
   *
   * This property corresponds to `policy_uri` in
   * [OpenID Connect Dynamic Client Registration 1.0, 2. Client Metadata](https://openid.net/specs/openid-connect-registration-1_0.html#ClientMetadata).
   */
  policyUri?: string;

  /**
   * Body param: URLs of policy pages with language tags. If the client application
   * has different policy pages for different languages, this property can be used to
   * register the URLs.
   */
  policyUris?: Array<AuthorizationAPI.TaggedValue>;

  /**
   * Body param: Redirect URIs that the client application uses to receive a response
   * from the authorization endpoint. Requirements for a redirect URI are as follows.
   *
   * **Requirements by RFC 6749** (From
   * [RFC 6749, 3.1.2. Redirection Endpoint](https://datatracker.ietf.org/doc/html/rfc6749#section-3.1.2))
   *
   * - Must be an absolute URI.
   * - Must not have a fragment component.
   *
   * **Requirements by OpenID Connect** (From
   * "[OpenID Connect Dynamic Client Registration 1.0, 2. Client Metadata](https://openid.net/specs/openid-connect-registration-1_0.html#ClientMetadata),
   * application_type")
   *
   * - The scheme of the redirect URI used for Implicit Grant by a client application
   *   whose application is `web` must be `https`. This is checked at runtime by
   *   Authlete.
   * - The hostname of the redirect URI used for Implicit Grant by a client
   *   application whose application type is `web` must not be `localhost`. This is
   *   checked at runtime by Authlete.
   * - The scheme of the redirect URI used by a client application whose application
   *   type is `native` must be either (1) a custom scheme or (2) `http`, which is
   *   allowed only when the hostname part is `localhost`. This is checked at runtime
   *   by Authlete.
   *
   * **Requirements by Authlete**
   *
   * - Must consist of printable ASCII letters only.
   * - Must not exceed 200 letters.
   *
   * Note that Authlete allows the application type to be `null`. In other words, a
   * client application does not have to choose `web` or `native` as its application
   * type. If the application type is `null`, the requirements by OpenID Connect are
   * not checked at runtime.
   *
   * An authorization request from a client application which has not registered any
   * redirect URI fails unless at least all the following conditions are satisfied.
   *
   * - The client type of the client application is `confidential`.
   * - The value of `response_type` request parameter is `code`.
   * - The authorization request has the `redirect_uri` request parameter.
   * - The value of `scope` request parameter does not contain `openid`.
   *
   * RFC 6749 allows partial match of redirect URI under some conditions (see
   * [RFC 6749, 3.1.2.2. Registration Requirements](https://datatracker.ietf.org/doc/html/rfc6749#section-3.1.2.2)
   * for details), but OpenID Connect requires exact match.
   */
  redirectUris?: Array<string>;

  /**
   * Body param: The hash of the registration access token for this client.
   */
  registrationAccessTokenHash?: string;

  /**
   * Body param: this is the 'alg' header value for encrypted JWT tokens. Depending
   * upon the context, this refers to key transport scheme to be used by the client
   * and by the server. For instance:
   *
   * - as `authorizationEncryptionAlg` value, it refers to the encoding algorithm
   *   used by server for transporting they keys on JARM objects
   * - as `requestEncryptionAlg` value, it refers to the expected key transport
   *   encoding algorithm that server expect from client when encrypting a Request
   *   Object
   * - as `idTokenEncryptionAlg` value, it refers to the algorithm used by the server
   *   to key transport of id_tokens
   *
   * **Please note that some of the algorithms are more secure than others, some are
   * not supported very well cross platforms and some (like RSA1_5) is known to be
   * weak**.
   */
  requestEncryptionAlg?: ClientGetAPI.JweAlg;

  /**
   * Body param: This is the encryption algorithm to be used when encrypting a JWT on
   * client or server side. Depending upon the context, this refers to encryption
   * done by the client or by the server. For instance:
   *
   * - as `authorizationEncryptionEnc` value, it refers to the encryption algorithm
   *   used by server when creating a JARM response
   * - as `requestEncryptionEnc` value, it refers to the expected encryption
   *   algorithm used by the client when encrypting a Request Object
   * - as `idTokenEncryptionEnc` value, it refers to the algorithm used by the server
   *   to encrypt id_tokens
   */
  requestEncryptionEnc?: ClientGetAPI.JweEnc;

  /**
   * Body param: The flag indicating whether the JWE alg of encrypted request object
   * must match the `request_object_encryption_alg` client metadata.
   *
   * The `request_object_encryption_alg` client metadata itself is defined in
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
   * The property that represents the client metadata is `requestEncryptionAlg`. See
   * the description of `requestEncryptionAlg` for details.
   *
   * Even if this flag is `false`, the match is required if the
   * `requestObjectEncryptionAlgMatchRequired` flag of the service is `true`.
   */
  requestObjectEncryptionAlgMatchRequired?: boolean;

  /**
   * Body param: The flag indicating whether the JWE enc of encrypted request object
   * must match the `request_object_encryption_enc` client metadata.
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
   * The property that represents the client metadata is `requestEncryptionEnc`. See
   * the description of `requestEncryptionEnc` for details.
   *
   * Even if this flag is `false`, the match is required if the
   * `requestObjectEncryptionEncMatchRequired` flag of the service is `true`.
   */
  requestObjectEncryptionEncMatchRequired?: boolean;

  /**
   * Body param: The flag to indicate whether authorization requests from this client
   * are always required to utilize a request object by using either `request` or
   * `request_uri` request parameter.
   *
   * If this flag is set to `true` and the service's
   * `traditionalRequestObjectProcessingApplied` is set to `false`, authorization
   * requests from this client are processed as if `require_signed_request_object`
   * client metadata of this client is `true`. The metadata is defined in "JAR (JWT
   * Secured Authorization Request)".
   */
  requestObjectRequired?: boolean;

  /**
   * Body param: The signature algorithm for JWT. This value is represented on 'alg'
   * attribute of the header of JWT.
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
  requestSignAlg?: GetAPI.JwsAlg;

  /**
   * Body param: An array of URLs each of which points to a request object.
   *
   * Authlete requires that URLs used as values for `request_uri` request parameter
   * be pre-registered. This property is used for the pre-registration. See
   * [OpenID Connect Core 1.0, 6.2. Passing a Request Object by Reference](https://openid.net/specs/openid-connect-core-1_0.html#RequestUriParameter)
   * for details.
   */
  requestUris?: Array<string>;

  /**
   * Body param: The response modes that this client may use.
   */
  responseModes?: Array<
    'QUERY' | 'FRAGMENT' | 'FORM_POST' | 'JWT' | 'QUERY_JWT' | 'FRAGMENT_JWT' | 'FORM_POST_JWT'
  >;

  /**
   * Body param: A string array of response types which the client application
   * declares that it will restrict itself to using. This property corresponds to
   * `response_types` in
   * [OpenID Connect Dynamic Client Registration 1.0, 2. Client Metadata](https://openid.net/specs/openid-connect-registration-1_0.html#ClientMetadata).
   */
  responseTypes?: Array<GetAPI.ResponseType>;

  /**
   * Body param: The flag indicating whether this service signs responses from the
   * resource server.
   */
  rsRequestSigned?: boolean;

  /**
   * Body param: The key ID of a JWK containing the public key used by this client to
   * sign requests to the resource server.
   */
  rsSignedRequestKeyId?: string;

  /**
   * Body param: The value of the sector identifier URI. This represents the
   * `sector_identifier_uri` client metadata which is defined in
   * [OpenID Connect Dynamic Client Registration 1.0, 2. Client Metadata](https://openid.net/specs/openid-connect-registration-1_0.html#ClientMetadata)
   */
  sectorIdentifierUri?: string;

  /**
   * Body param: The key ID of a JWK containing a self-signed certificate of this
   * client.
   */
  selfSignedCertificateKeyId?: string;

  /**
   * Body param: The URI of the endpoint that returns this client's JWK Set document
   * in the JWT format. This property corresponds to the `signed_jwks_uri` client
   * metadata defined in OpenID Connect Federation 1.0.
   */
  signedJwksUri?: string;

  /**
   * Body param: If `Enabled` is selected, an attempt to issue a new access token
   * invalidates existing access tokens that are associated with the same combination
   * of subject and client.
   *
   * Note that, however, attempts by Client Credentials Flow do not invalidate
   * existing access tokens because access tokens issued by Client Credentials Flow
   * are not associated with any end-user's subject.
   *
   * Even if `Disabled` is selected here, single access token per subject is
   * effective if `singleAccessTokenPerSubject` of the `Service` this client belongs
   * to is Enabled.
   */
  singleAccessTokenPerSubject?: boolean;

  /**
   * Body param: The unique identifier string assigned by the client developer or
   * software publisher used by registration endpoints to identify the client
   * software to be dynamically registered.
   *
   * This property corresponds to the `software_id metadata` defined in
   * [2. Client Metadata](https://datatracker.ietf.org/doc/html/rfc7591#section-2) of
   * [RFC 7591](https://datatracker.ietf.org/doc/html/rfc7591).
   */
  softwareId?: string;

  /**
   * Body param: The version identifier string for the client software identified by
   * the software ID.
   *
   * This property corresponds to the software_version metadata defined in
   * [2. Client Metadata](https://datatracker.ietf.org/doc/html/rfc7591#section-2) of
   * [RFC 7591](https://datatracker.ietf.org/doc/html/rfc7591).
   */
  softwareVersion?: string;

  /**
   * Body param: The subject type that the client application requests. Details about
   * the subject type are described in
   * [OpenID Connect Core 1.0, 8. Subjct Identifier Types](https://openid.net/specs/openid-connect-core-1_0.html#SubjectIDTypes).
   *
   * This property corresponds to `subject_type` in
   * [OpenID Connect Dynamic Client Registration 1.0, 2. Client Metadata](https://openid.net/specs/openid-connect-registration-1_0.html#ClientMetadata).
   */
  subjectType?: 'PUBLIC' | 'PAIRWISE';

  /**
   * Body param: The string representation of the expected DNS subject alternative
   * name of the certificate this client will use in mutual TLS authentication.
   *
   * See `tls_client_auth_san_dns` in "Mutual TLS Profiles for OAuth Clients, 2.3.
   * Dynamic Client Registration" for details.
   */
  tlsClientAuthSanDns?: string;

  /**
   * Body param: The string representation of the expected email address subject
   * alternative name of the certificate this client will use in mutual TLS
   * authentication.
   *
   * See `tls_client_auth_san_email` in "Mutual TLS Profiles for OAuth Clients, 2.3.
   * Dynamic Client Registration" for details.
   */
  tlsClientAuthSanEmail?: string;

  /**
   * Body param: The string representation of the expected IP address subject
   * alternative name of the certificate this client will use in mutual TLS
   * authentication.
   *
   * See `tls_client_auth_san_ip` in "Mutual TLS Profiles for OAuth Clients, 2.3.
   * Dynamic Client Registration" for details.
   */
  tlsClientAuthSanIp?: string;

  /**
   * Body param: The string representation of the expected URI subject alternative
   * name of the certificate this client will use in mutual TLS authentication.
   *
   * See `tls_client_auth_san_uri` in "Mutual TLS Profiles for OAuth Clients, 2.3.
   * Dynamic Client Registration" for details.
   */
  tlsClientAuthSanUri?: string;

  /**
   * Body param: The string representation of the expected subject distinguished name
   * of the certificate this client will use in mutual TLS authentication.
   *
   * See `tls_client_auth_subject_dn` in "Mutual TLS Profiles for OAuth Clients, 2.3.
   * Dynamic Client Registration" for details.
   */
  tlsClientAuthSubjectDn?: string;

  /**
   * Body param: The flag to indicate whether this client use TLS client certificate
   * bound access tokens.
   */
  tlsClientCertificateBoundAccessTokens?: boolean;

  /**
   * Body param: The client authentication method that the client application
   * declares that it uses at the token endpoint. This property corresponds to
   * `token_endpoint_auth_method` in
   * [OpenID Connect Dynamic Client Registration 1.0, 2. Client Metadata](https://openid.net/specs/openid-connect-registration-1_0.html#ClientMetadata).
   */
  tokenAuthMethod?: ClientGetAPI.ClientAuthenticationMethod;

  /**
   * Body param: The signature algorithm for JWT. This value is represented on 'alg'
   * attribute of the header of JWT.
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
  tokenAuthSignAlg?: GetAPI.JwsAlg;

  /**
   * Body param: The URL pointing to the "Terms Of Service" page.
   *
   * This property corresponds to `tos_uri` in
   * [OpenID Connect Dynamic Client Registration 1.0, 2. Client Metadata](https://openid.net/specs/openid-connect-registration-1_0.html#ClientMetadata).
   */
  tosUri?: string;

  /**
   * Body param: URLs of "Terms Of Service" pages with language tags.
   *
   * If the client application has different "Terms Of Service" pages for different
   * languages, this property can be used to register the URLs.
   */
  tosUris?: Array<AuthorizationAPI.TaggedValue>;

  /**
   * Body param: The entity ID of the trust anchor of the trust chain that was used
   * when this client was registered or updated by the mechanism defined in OpenID
   * Connect Federation 1.0
   */
  trustAnchorId?: string;

  /**
   * Body param: The trust chain that was used when this client was registered or
   * updated by the mechanism defined in OpenID Connect Federation 1.0
   */
  trustChain?: Array<string>;

  /**
   * Body param: the expiration time of the trust chain that was used when this
   * client was registered or updated by the mechanism defined in OpenID Connect
   * Federation 1.0. The value is represented as milliseconds elapsed since the Unix
   * epoch (1970-01-01).
   */
  trustChainExpiresAt?: number;

  /**
   * Body param: the time at which the trust chain was updated by the mechanism
   * defined in OpenID Connect Federation 1.0
   */
  trustChainUpdatedAt?: number;

  /**
   * Body param: this is the 'alg' header value for encrypted JWT tokens. Depending
   * upon the context, this refers to key transport scheme to be used by the client
   * and by the server. For instance:
   *
   * - as `authorizationEncryptionAlg` value, it refers to the encoding algorithm
   *   used by server for transporting they keys on JARM objects
   * - as `requestEncryptionAlg` value, it refers to the expected key transport
   *   encoding algorithm that server expect from client when encrypting a Request
   *   Object
   * - as `idTokenEncryptionAlg` value, it refers to the algorithm used by the server
   *   to key transport of id_tokens
   *
   * **Please note that some of the algorithms are more secure than others, some are
   * not supported very well cross platforms and some (like RSA1_5) is known to be
   * weak**.
   */
  userInfoEncryptionAlg?: ClientGetAPI.JweAlg;

  /**
   * Body param: This is the encryption algorithm to be used when encrypting a JWT on
   * client or server side. Depending upon the context, this refers to encryption
   * done by the client or by the server. For instance:
   *
   * - as `authorizationEncryptionEnc` value, it refers to the encryption algorithm
   *   used by server when creating a JARM response
   * - as `requestEncryptionEnc` value, it refers to the expected encryption
   *   algorithm used by the client when encrypting a Request Object
   * - as `idTokenEncryptionEnc` value, it refers to the algorithm used by the server
   *   to encrypt id_tokens
   */
  userInfoEncryptionEnc?: ClientGetAPI.JweEnc;

  /**
   * Body param: The signature algorithm for JWT. This value is represented on 'alg'
   * attribute of the header of JWT.
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
  userInfoSignAlg?: GetAPI.JwsAlg;
}

export namespace ClientUpdateParams {
  export interface Extension {
    /**
     * The value of the duration of access tokens per client in seconds. In normal
     * cases, the value of the service's `accessTokenDuration` property is used as the
     * duration of access tokens issued by the service. However, if this
     * `accessTokenDuration` property holds a non-zero positive number and its value is
     * less than the duration configured by the service, the value is used as the
     * duration of access tokens issued to the client application.
     *
     * Note that the duration of access tokens can be controlled by the scope attribute
     * `access_token.duration`, too. Authlete chooses the minimum value among the
     * candidates.
     */
    accessTokenDuration?: number;

    /**
     * The value of the duration of ID tokens per client in seconds. In normal cases,
     * the value of the service's `idTokenDuration` property is used as the duration of
     * ID tokens issued by the service. However, if this `idTokenDuration` property
     * holds a non-zero positive number and its value is less than the duration
     * configured by the service, the value is used as the duration of ID tokens issued
     * to the client application.
     *
     * Note that the duration of refresh tokens can be controlled by the scope
     * attribute `id_token.duration`, too. Authlete chooses the minimum value among the
     * candidates.
     */
    idTokenDuration?: number;

    /**
     * The value of the duration of refresh tokens per client in seconds. In normal
     * cases, the value of the service's `refreshTokenDuration` property is used as the
     * duration of refresh tokens issued by the service. However, if this
     * `refreshTokenDuration` property holds a non-zero positive number and its value
     * is less than the duration configured by the service, the value is used as the
     * duration of refresh tokens issued to the client application.
     *
     * Note that the duration of refresh tokens can be controlled by the scope
     * attribute `refresh_token.duration`, too. Authlete chooses the minimum value
     * among the candidates.
     */
    refreshTokenDuration?: number;

    /**
     * The set of scopes that the client application is allowed to request. This
     * paramter will be one of the following.
     *
     * - `null`
     * - an empty set
     * - a set with at least one element
     *
     * When the value of this parameter is `null`, it means that the set of scopes that
     * the client application is allowed to request is the set of the scopes that the
     * service supports. When the value of this parameter is an empty set, it means
     * that the client application is not allowed to request any scopes. When the value
     * of this parameter is a set with at least one element, it means that the set is
     * the set of scopes that the client application is allowed to request.
     */
    requestableScopes?: Array<string>;

    /**
     * The flag to indicate whether "Requestable Scopes per Client" is enabled or not.
     * If `true`, you can define the set of scopes which this client application can
     * request. If `false`, this client application can request any scope which is
     * supported by the authorization server.
     */
    requestableScopesEnabled?: boolean;

    /**
     * Get the flag indicating whether the client is explicitly given a permission to
     * make token exchange requests ([RFC
     * 8693][https://www.rfc-editor.org/rfc/rfc8693.html])
     */
    tokenExchangePermitted?: boolean;
  }
}

export interface ClientDeleteParams {
  /**
   * A service ID.
   */
  serviceId: string;
}

Client.Get = Get;
Client.LockFlag = LockFlag;
Client.Secret = Secret;
Client.Authorization = Authorization;
Client.GrantedScopes = GrantedScopes;
Client.Registration = Registration;
Client.Extension = ExtensionAPIExtension;

export declare namespace Client {
  export {
    type ClientCreateParams as ClientCreateParams,
    type ClientUpdateParams as ClientUpdateParams,
    type ClientDeleteParams as ClientDeleteParams,
  };

  export {
    Get as Get,
    type GetAPIClient as Client,
    type ClientAuthenticationMethod as ClientAuthenticationMethod,
    type JweAlg as JweAlg,
    type JweEnc as JweEnc,
    type GetListResponse as GetListResponse,
    type GetRetrieveParams as GetRetrieveParams,
    type GetListParams as GetListParams,
  };

  export {
    LockFlag as LockFlag,
    type LockFlagUpdateResponse as LockFlagUpdateResponse,
    type LockFlagUpdateParams as LockFlagUpdateParams,
  };

  export {
    Secret as Secret,
    type SecretUpdateResponse as SecretUpdateResponse,
    type SecretRefreshResponse as SecretRefreshResponse,
    type SecretUpdateParams as SecretUpdateParams,
    type SecretRefreshParams as SecretRefreshParams,
  };

  export {
    Authorization as Authorization,
    type AuthorizationUpdateResponse as AuthorizationUpdateResponse,
    type AuthorizationDeleteResponse as AuthorizationDeleteResponse,
    type AuthorizationUpdateParams as AuthorizationUpdateParams,
    type AuthorizationDeleteParams as AuthorizationDeleteParams,
  };

  export {
    GrantedScopes as GrantedScopes,
    type GrantedScopeDeleteResponse as GrantedScopeDeleteResponse,
    type GrantedScopeGetResponse as GrantedScopeGetResponse,
    type GrantedScopeDeleteParams as GrantedScopeDeleteParams,
    type GrantedScopeGetParams as GrantedScopeGetParams,
  };

  export {
    Registration as Registration,
    type RegistrationCreateResponse as RegistrationCreateResponse,
    type RegistrationRetrieveResponse as RegistrationRetrieveResponse,
    type RegistrationUpdateResponse as RegistrationUpdateResponse,
    type RegistrationDeleteResponse as RegistrationDeleteResponse,
    type RegistrationCreateParams as RegistrationCreateParams,
    type RegistrationRetrieveParams as RegistrationRetrieveParams,
    type RegistrationUpdateParams as RegistrationUpdateParams,
    type RegistrationDeleteParams as RegistrationDeleteParams,
  };

  export { ExtensionAPIExtension as Extension };
}
