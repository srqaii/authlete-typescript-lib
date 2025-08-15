// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as AuthorizationAPI from './authorization/authorization';
import * as TokenAPI from './token/token';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Introspection extends APIResource {
  /**
   * This API gathers information about an access token.
   *
   * <details>
   * <summary>Description</summary>
   *
   * This API is supposed to be called from within the implementations of protected
   * resource endpoints of the authorization server implementation in order to get
   * information about the access token which was presented by the client
   * application.
   *
   * In general, a client application accesses a protected resource endpoint of a
   * service with an access token, and the implementation of the endpoint checks
   * whether the presented access token has enough privileges (= scopes) to access
   * the protected resource before returning the protected resource to the client
   * application. To achieve this flow, the endpoint implementation has to know
   * detailed information about the access token. Authlete `/auth/introspection` API
   * can be used to get such information.
   *
   * The response from `/auth/introspection` API has some parameters. Among them, it
   * is `action` parameter that the authorization server implementation should check
   * first because it denotes the next action that the authorization server
   * implementation should take. According to the value of `action`, the
   * authorization server implementation must take the steps described below.
   *
   * **INTERNAL_SERVER_ERROR**
   *
   * When the value of `action` is `INTERNAL_SERVER_ERROR`, it means that the request
   * from the authorization server implementation was wrong or that an error occurred
   * in Authlete. In either case, from the viewpoint of the client application, it is
   * an error on the server side. Therefore, the service implementation should
   * generate a response to the client application with HTTP status of "500 Internal
   * Server Error". Authlete recommends `application/json` as the content type
   * although OAuth 2.0 specification does not mention the format of the error
   * response when the redirect URI is not usable.
   *
   * The value of `responseContent` is a string which describes the error in the
   * format of [RFC 6750](https://datatracker.ietf.org/doc/html/rfc6750) (OAuth 2.0
   * Bearer Token Usage), so if the protected resource of the service implementation
   * wants to return an error response to the client application in the way that
   * complies with RFC 6750 (in other words, if `accessTokenType` configuration
   * parameter of the service is Bearer), the value of `responseContent` can be used
   * as the value of `WWW-Authenticate` header.
   *
   * The following is an example response which complies with RFC 6750.
   *
   * ```
   * HTTP/1.1 500 Internal Server Error
   * Content-Type: application/json
   * Cache-Control: no-store
   * Pragma: no-cache
   *
   * {responseContent}
   * ```
   *
   * **BAD_REQUEST**
   *
   * When the value of `action` is `BAD_REQUEST`, it means that the request from the
   * client application does not contain an access token (= the request from the
   * authorization server implementation to Authlete does not contain `token` request
   * parameter).
   *
   * A response with HTTP status of "400 Bad Request" must be returned to the client
   * application and the content type must be `application/json`.
   *
   * The value of `responseContent` is a string which describes the error in the
   * format of [RFC 6750](https://datatracker.ietf.org/doc/html/rfc6750) (OAuth 2.0
   * Bearer Token Usage), so if the protected resource of the service implementation
   * wants to return an error response to the client application in the way that
   * complies with RFC 6750 (in other words, if `accessTokenType` configuration
   * parameter of the service is `Bearer`), the value of `responseContent` can be
   * used as the value of `WWW-Authenticate` header.
   *
   * The following is an example response which complies with RFC 6750.
   *
   * ```
   * HTTP/1.1 400 Bad Request
   * WWW-Authenticate: {responseContent}
   * Cache-Control: no-store
   * Pragma: no-cache
   * ```
   *
   * **UNAUTHORIZED**
   *
   * When the value of `action` is `UNAUTHORIZED`, it means that the access token
   * does not exist or has expired.
   *
   * The value of `responseContent` is a string which describes the error in the
   * format of RFC 6750 (OAuth 2.0 Bearer Token Usage), so if the protected resource
   * of the service implementation wants to return an error response to the client
   * application in the way that complies with
   * [RFC 6750](https://datatracker.ietf.org/doc/html/rfc6750) (in other words, if
   * `accessTokenType` configuration parameter of the service is `Bearer`), the value
   * of `responseContent` can be used as the value of `WWW-Authenticate` header.
   *
   * The following is an example response which complies with RFC 6750.
   *
   * ```
   * HTTP/1.1 401 Unauthorized
   * WWW-Authenticate: {responseContent}
   * Cache-Control: no-store
   * Pragma: no-cache
   * ```
   *
   * **FORBIDDEN**
   *
   * When the value of `action` is `FORBIDDEN`, it means that the access token does
   * not cover the required scopes or that the subject associated with the access
   * token is different from the subject contained in the request.
   *
   * A response with HTTP status of "400 Bad Request" must be returned to the client
   * application and the content type must be `application/json`.
   *
   * The value of `responseContent` is a string which describes the error in the
   * format of [RFC 6750](https://datatracker.ietf.org/doc/html/rfc6750) (OAuth 2.0
   * Bearer Token Usage), so if the protected resource of the service implementation
   * wants to return an error response to the client application in the way that
   * complies with RFC 6750 (in other words, if `accessTokenType` configuration
   * parameter of the service is Bearer), the value of `responseContent` can be used
   * as the value of `WWW-Authenticate` header.
   *
   * The following is an example response which complies with RFC 6750.
   *
   * ```
   * HTTP/1.1 403 Forbidden
   * WWW-Authenticate: {responseContent}
   * Cache-Control: no-store
   * Pragma: no-cache
   * ```
   *
   * **OK**
   *
   * When the value of `action` is `OK`, it means that the access token which the
   * client application presented is valid (= exists and has not expired).
   *
   * The implementation of the protected resource endpoint is supposed to return the
   * protected resource to the client application.
   *
   * When action is `OK`, the value of `responseContent` is
   * `"Bearer error=\"invalid_request\""`. This is the simplest string which can be
   * used as the value of `WWW-Authenticate` header to indicate "400 Bad Request".
   * The implementation of the protected resource endpoint may use this string to
   * tell the client application that the request was bad (e.g. in case necessary
   * request parameters for the protected resource endpoint are missing). However, in
   * such a case, the implementation should generate a more informative error message
   * to help developers of client applications.
   *
   * The following is an example error response which complies with RFC 6750.
   *
   * ```
   * HTTP/1.1 400 Bad Request
   * WWW-Authenticate: {responseContent}
   * Cache-Control: no-store
   * Pragma: no-cache
   * ```
   *
   * Basically, The value of `responseContent` is a string which describes the error
   * in the format of [RFC 6750](https://datatracker.ietf.org/doc/html/rfc6750)
   * (OAuth 2.0 Bearer Token Usage). So, if the service has selected `Bearer` as the
   * value of `accessTokenType` configuration parameter, the value of
   * `responseContent` can be used directly as the value of `WWW-Authenticate`
   * header. However, if the service has selected another different token type, the
   * service has to generate error messages for itself.
   *
   * _**JWT-based access token**_
   *
   * Since version 2.1, Authlete provides a feature to issue access tokens in JWT
   * format. This feature can be enabled by setting a non-null value to the
   * `accessTokenSignAlg` property of the service (see the description of the Service
   * class for details). `/api/auth/introspection` API can accept access tokens in
   * JWT format. However, note that the API does not return information contained in
   * a given JWT-based access token but returns information stored in the database
   * record which corresponds to the given JWT-based access token. Because attributes
   * of the database record can be modified after the access token is issued (for
   * example, by using `/api/auth/token/update` API), information returned by
   * `/api/auth/introspection` API and information the given JWT-based access token
   * holds may be different.
   *
   * </details>
   *
   * @example
   * ```ts
   * const response = await client.auth.introspection.process(
   *   'serviceId',
   *   {
   *     token: 'VFGsNK-5sXiqterdaR7b5QbRX9VTwVCQB87jbr2_xAI',
   *     scopes: ['history.read', 'timeline.read'],
   *     subject: 'john',
   *   },
   * );
   * ```
   */
  process(
    serviceID: string,
    body: IntrospectionProcessParams,
    options?: RequestOptions,
  ): APIPromise<IntrospectionProcessResponse> {
    return this._client.post(path`/api/${serviceID}/auth/introspection`, { body, ...options });
  }

  /**
   * This API exists to help your authorization server provide its own introspection
   * API which complies with [RFC 7662](https://tools.ietf.org/html/rfc7662) (OAuth
   * 2.0 Token Introspection).
   *
   * <details>
   * <summary>Description</summary>
   *
   * This API is supposed to be called from within the implementations of the
   * introspection endpoint of your service. The authorization server implementation
   * should retrieve the value of `action` from the response and take the following
   * steps according to the value.
   *
   * In general, a client application accesses a protected resource endpoint of a
   * service with an access token, and the implementation of the endpoint checks
   * whether the presented access token has enough privileges (= scopes) to access
   * the protected resource before returning the protected resource to the client
   * application. To achieve this flow, the endpoint implementation has to know
   * detailed information about the access token. Authlete `/auth/introspection` API
   * can be used to get such information.
   *
   * The response from `/auth/introspection` API has some parameters. Among them, it
   * is `action` parameter that the authorization server implementation should check
   * first because it denotes the next action that the authorization server
   * implementation should take. According to the value of `action`, the
   * authorization server implementation must take the steps described below.
   *
   * **INTERNAL_SERVER_ERROR**
   *
   * When the value of `action` is `INTERNAL_SERVER_ERROR`, it means that the request
   * from the authorization server implementation was wrong or that an error occurred
   * in Authlete.
   *
   * In either case, from the viewpoint of the client application, it is an error on
   * the server side. Therefore, the service implementation should generate a
   * response to the client application with HTTP status of "500 Internal Server
   * Error".
   *
   * The value of `responseContent` is a JSON string which describes the error, so it
   * can be used as the entity body of the response if you want. Note that, however,
   * [RFC 7662](https://datatracker.ietf.org/doc/html/rfc7662) does not mention
   * anything about the response body of error responses.
   *
   * The following illustrates an example response which the introspection endpoint
   * of the authorization server implementation generates and returns to the client
   * application.
   *
   * ```
   * HTTP/1.1 500 Internal Server Error
   * Content-Type: application/json
   *
   * {responseContent}
   * ```
   *
   * **BAD_REQUEST**
   *
   * When the value of `action` is `BAD_REQUEST`, it means that the request from the
   * client application is invalid. This happens when the request from the client did
   * not include the token request parameter. See
   * "[2.1. Introspection Request](https://datatracker.ietf.org/doc/html/rfc7662#section-2.1)"
   * in RFC 7662 for details about requirements for introspection requests.
   *
   * The HTTP status of the response returned to the client application should be
   * "400 Bad Request".
   *
   * The value of `responseContent` is a JSON string which describes the error, so it
   * can be used as the entity body of the response if you want. Note that, however,
   * [RFC 7662](https://datatracker.ietf.org/doc/html/rfc7662) does not mention
   * anything about the response body of error responses.
   *
   * The following illustrates an example response which the introspection endpoint
   * of the authorization server implementation generates and returns to the client
   * application.
   *
   * ```
   * HTTP/1.1 400 Bad Request
   * Content-Type: application/json
   *
   * {responseContent}
   * ```
   *
   * **OK**
   *
   * When the value of `action` is `OK`, the request from the client application is
   * valid.
   *
   * The HTTP status of the response returned to the client application must be "200
   * OK" and its content type must be `application/json`.
   *
   * The value of `responseContent` is a JSON string which complies with the
   * introspection response defined in "2.2. Introspection Response" in RFC7662.
   *
   * The following illustrates the response which the introspection endpoint of your
   * authorization server implementation should generate and return to the client
   * application.
   *
   * ```
   * HTTP/1.1 200 OK
   * Content-Type: application/json
   *
   * {responseContent}
   * ```
   *
   * Note that RFC 7662 says _"To prevent token scanning attacks, **the endpoint MUST
   * also require some form of authorization to access this endpoint**"_. This means
   * that you have to protect your introspection endpoint in some way or other.
   * Authlete does not care about how your introspection endpoint is protected. In
   * most cases, as mentioned in RFC 7662, "401 Unauthorized" is a proper response
   * when an introspection request does not satisfy authorization requirements
   * imposed by your introspection endpoint.
   *
   * </details>
   *
   * @example
   * ```ts
   * const response = await client.auth.introspection.standard(
   *   'serviceId',
   *   {
   *     parameters:
   *       'token=VFGsNK-5sXiqterdaR7b5QbRX9VTwVCQB87jbr2_xAI&token_type_hint=access_token',
   *   },
   * );
   * ```
   */
  standard(
    serviceID: string,
    body: IntrospectionStandardParams,
    options?: RequestOptions,
  ): APIPromise<IntrospectionStandardResponse> {
    return this._client.post(path`/api/${serviceID}/auth/introspection/standard`, { body, ...options });
  }
}

/**
 * The grant type of the access token when the access token was created.
 */
export type GrantType =
  | 'AUTHORIZATION_CODE'
  | 'IMPLICIT'
  | 'PASSWORD'
  | 'CLIENT_CREDENTIALS'
  | 'REFRESH_TOKEN'
  | 'CIBA'
  | 'DEVICE_CODE'
  | 'TOKEN_EXCHANGE'
  | 'JWT_BEARER';

export interface IntrospectionProcessResponse {
  /**
   * The target resources this proeprty holds may be the same as or different from
   * the ones `resource` property holds.
   *
   * In some flows, the initial request and the subsequent token request are sent to
   * different endpoints. Example flows are the Authorization Code Flow, the Refresh
   * Token Flow, the CIBA Ping Mode, the CIBA Poll Mode and the Device Flow. In these
   * flows, not only the initial request but also the subsequent token request can
   * include the `resource` request parameters. The purpose of the `resource` request
   * parameters in the token request is to narrow the range of the target resources
   * from the original set of target resources requested by the preceding initial
   * request. If narrowing down is performed, the target resources holded by the
   * `resource` proeprty and the ones holded by this property are different. This
   * property holds the narrowed set of target resources.
   *
   * See "Resource Indicators for OAuth 2.0" for details.
   */
  accessTokenResources?: Array<string>;

  /**
   * The Authentication Context Class Reference of the user authentication that the
   * authorization server performed during the course of issuing the access token.
   */
  acr?: string;

  /**
   * The next action that the authorization server implementation should take.
   */
  action?: 'INTERNAL_SERVER_ERROR' | 'BAD_REQUEST' | 'UNAUTHORIZED' | 'FORBIDDEN' | 'OK';

  /**
   * The authorization details. This represents the value of the
   * `authorization_details` request parameter in the preceding device authorization
   * request which is defined in "OAuth 2.0 Rich Authorization Requests".
   */
  authorizationDetails?: AuthorizationAPI.AuthorizationDetails;

  /**
   * The time when the user authentication was performed during the course of issuing
   * the access token.
   */
  authTime?: number;

  /**
   * The client certificate thumbprint used to validate the access token.
   */
  certificateThumbprint?: string;

  /**
   * The attributes of the client.
   */
  clientAttributes?: Array<TokenAPI.Pair>;

  /**
   * The entity ID of the client.
   */
  clientEntityId?: string;

  /**
   * Flag which indicates whether the entity ID of the client was used when the
   * request for the access token was made.
   */
  clientEntityIdUsed?: boolean;

  /**
   * The client ID.
   */
  clientId?: number;

  /**
   * The client ID alias when the token request was made. If the client did not have
   * an alias, this parameter is `null`. Also, if the token request was invalid and
   * it failed to identify a client, this parameter is `null`.
   */
  clientIdAlias?: string;

  /**
   * The flag which indicates whether the client ID alias was used when the token
   * request was made. `true` if the client ID alias was used when the token request
   * was made.
   */
  clientIdAliasUsed?: boolean;

  /**
   * The c_nonce
   */
  cnonce?: string;

  /**
   * The time at which the `c_nonce` expires.
   */
  cnonceExpiresAt?: number;

  /**
   * the claims that the user has consented for the client application to know.
   */
  consentedClaims?: Array<string>;

  /**
   * The expected nonce value for DPoP proof JWT, which should be used as the value
   * of the `DPoP-Nonce` HTTP header.
   */
  dpopNonce?: string;

  /**
   * `true` if the access token exists.
   */
  existent?: boolean;

  /**
   * The time at which the access token expires. The value is represented in
   * milliseconds since the Unix epoch (1970-01-01).
   */
  expiresAt?: number;

  /**
   * The flag indicating whether the token is for credential issuance.
   */
  forCredentialIssuance?: boolean;

  /**
   * the flag which indicates whether the access token is for an external attachment.
   */
  forExternalAttachment?: boolean;

  grant?: unknown;

  /**
   * The value of the `grant_id` request parameter of the device authorization
   * request.
   *
   * The `grant_id` request parameter is defined in
   * [Grant Management for OAuth 2.0](https://openid.net/specs/fapi-grant-management.html)
   * , which is supported by Authlete 2.3 and newer versions.
   */
  grantId?: string;

  /**
   * The grant type of the access token when the access token was created.
   */
  grantType?: GrantType;

  /**
   * The credentials that can be obtained by presenting the access token.
   */
  issuableCredentials?: string;

  /**
   * The extra properties associated with the access token.
   */
  properties?: Array<AuthorizationAPI.Property>;

  /**
   * `true` if the access token can be refreshed using the associated refresh token
   * which had been issued along with the access token. `false` if the refresh token
   * for the access token has expired or the access token has no associated refresh
   * token.
   */
  refreshable?: boolean;

  /**
   * The target resources. This represents the resources specified by the `resource`
   * request parameters or by the `resource` property in the request object.
   *
   * See "Resource Indicators for OAuth 2.0" for details.
   */
  resources?: Array<string>;

  /**
   * The content that the authorization server implementation can use as the value of
   * `WWW-Authenticate` header on errors.
   */
  responseContent?: string;

  /**
   * The code which represents the result of the API call.
   */
  resultCode?: string;

  /**
   * A short message which explains the result of the API call.
   */
  resultMessage?: string;

  /**
   * The scopes property of this class is a list of scope names. The property does
   * not hold information about scope attributes. This scopeDetails property was
   * newly created to convey information about scope attributes.
   */
  scopeDetails?: Array<AuthorizationAPI.Scope>;

  /**
   * The scopes covered by the access token.
   */
  scopes?: Array<string>;

  /**
   * The attributes of this service that the client application belongs to.
   */
  serviceAttributes?: Array<TokenAPI.Pair>;

  /**
   * The subject who is associated with the access token. The value of this property
   * is `null` if the access token was issued using the flow of
   * [Client Credentials Grant](tools.ietf.org/html/rfc6749#section-4.4).
   */
  subject?: string;

  /**
   * `true` if the access token exists.
   */
  sufficient?: boolean;

  /**
   * true` if the access token is usable (= exists and has not expired).
   */
  usable?: boolean;
}

export interface IntrospectionStandardResponse {
  /**
   * The next action that the authorization server implementation should take.
   */
  action?: 'INTERNAL_SERVER_ERROR' | 'BAD_REQUEST' | 'OK';

  /**
   * The content that the authorization server implementation is to return to the
   * client application.
   */
  responseContent?: string;

  /**
   * The code which represents the result of the API call.
   */
  resultCode?: string;

  /**
   * A short message which explains the result of the API call.
   */
  resultMessage?: string;
}

export interface IntrospectionProcessParams {
  /**
   * An access token to introspect.
   */
  token: string;

  /**
   * Authentication Context Class Reference values one of which the user
   * authentication performed during the course of issuing the access token must
   * satisfy.
   */
  acrValues?: Array<string>;

  /**
   * Client certificate in PEM format, used to validate binding against access tokens
   * using the TLS client certificate confirmation method.
   */
  clientCertificate?: string;

  /**
   * `DPoP` header presented by the client during the request to the resource server.
   *
   * The header contains a signed JWT which includes the public key that is paired
   * with the private key used to sign the JWT. See
   * [OAuth 2.0 Demonstration of Proof-of-Possession at the Application Layer (DPoP)](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-dpop)
   * for details.
   */
  dpop?: string;

  /**
   * HTTP headers to be included in processing the signature. If this is a signed
   * request, this must include the Signature and Signature-Input headers, as well as
   * any additional headers covered by the signature.
   */
  headers?: Array<TokenAPI.Pair>;

  /**
   * HTTP method of the request from the client to the protected resource endpoint.
   * This field is used to validate the `DPoP` header.
   *
   * See
   * [OAuth 2.0 Demonstration of Proof-of-Possession at the Application Layer (DPoP)](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-dpop)
   * for details.
   */
  htm?: string;

  /**
   * URL of the protected resource endpoint. This field is used to validate the
   * `DPoP` header.
   *
   * See
   * [OAuth 2.0 Demonstration of Proof-of-Possession at the Application Layer (DPoP)](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-dpop)
   * for details.
   */
  htu?: string;

  /**
   * The maximum authentication age which is the maximum allowable elapsed time since
   * the user authentication was performed during the course of issuing the access
   * token.
   */
  maxAge?: number;

  /**
   * The HTTP message body of the request, if present.
   */
  message?: string;

  /**
   * HTTP Message Components required to be in the signature. If absent, defaults to
   * [ "@method", "@target-uri", "authorization" ].
   */
  requiredComponents?: Array<string>;

  /**
   * The resources specified by the `resource` request parameters in the token
   * request. See "Resource Indicators for OAuth 2.0" for details.
   */
  resources?: Array<string>;

  /**
   * A string array listing names of scopes which the caller (= a protected resource
   * endpoint of the service) requires. When the content type of the request from the
   * service is `application/x-www-form-urlencoded`, the format of `scopes` is a
   * space-separated list of scope names.
   *
   * If this parameter is a non-empty array and if it contains a scope which is not
   * covered by the access token,`action=FORBIDDEN` with `error=insufficient_scope`
   * is returned from Authlete.
   */
  scopes?: Array<string>;

  /**
   * A subject (= a user account managed by the service) whom the caller (= a
   * protected resource endpoint of the service) requires.
   *
   * If this parameter is not `null` and if the value does not match the subject who
   * is associated with the access token, `action=FORBIDDEN` with
   * `error=invalid_request` is returned from Authlete.
   */
  subject?: string;

  /**
   * The full URL of the userinfo endpoint.
   */
  uri?: string;
}

export interface IntrospectionStandardParams {
  /**
   * Request parameters which comply with the introspection request defined in
   * "[2.1. Introspection Request](https://datatracker.ietf.org/doc/html/rfc7662#section-2.1)"
   * in RFC 7662.
   *
   * The implementation of the introspection endpoint of your authorization server
   * will receive an HTTP POST
   * [[RFC 7231](https://datatracker.ietf.org/doc/html/rfc7231)] request with
   * parameters in the `application/x-www-form-urlencoded` format. It is the entity
   * body of the request that Authlete's `/api/auth/introspection/standard` API
   * expects as the value of `parameters`.
   */
  parameters: string;

  /**
   * Flag indicating whether to include hidden properties in the output.
   *
   * Authlete has a mechanism whereby to associate arbitrary key-value pairs with an
   * access token. Each key-value pair has a hidden attribute. By default, key-value
   * pairs whose hidden attribute is set to `true` are not embedded in the standard
   * introspection output.
   *
   * If the `withHiddenProperties` request parameter is given and its value is
   * `true`, `/api/auth/introspection/standard API includes all the associated
   * key-value pairs into the output regardless of the value of the hidden attribute.
   */
  withHiddenProperties?: string;
}

export declare namespace Introspection {
  export {
    type GrantType as GrantType,
    type IntrospectionProcessResponse as IntrospectionProcessResponse,
    type IntrospectionStandardResponse as IntrospectionStandardResponse,
    type IntrospectionProcessParams as IntrospectionProcessParams,
    type IntrospectionStandardParams as IntrospectionStandardParams,
  };
}
