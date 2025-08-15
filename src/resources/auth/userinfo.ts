// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as AuthorizationAPI from './authorization/authorization';
import * as TokenAPI from './token/token';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Userinfo extends APIResource {
  /**
   * This API generates an ID token.
   *
   * <details>
   * <summary>Description</summary>
   *
   * This API is supposed to be called from within the implementation of the
   * [userinfo endpoint](https://openid.net/specs/openid-connect-core-1_0.html#UserInfo)
   * of the authorization server in order to generate an ID token. Before calling
   * this API, a valid response from `/auth/userinfo` API must be obtained. Then,
   * call this API with the access token contained in the response and the claims
   * values of the user (subject) associated with the access token. See **OK**
   * written in the description of `/auth/userinfo` API for details.
   *
   * The response from `/auth/userinfo/issue` API has various parameters. Among them,
   * it is `action` parameter that the authorization server implementation should
   * check first because it denotes the next action that the authorization server
   * implementation should take. According to the value of `action`, the service
   * implementation must take the steps described below.
   *
   * **INTERNAL_SERVER_ERROR**
   *
   * When the value of `action` is `INTERNAL_SERVER_ERROR`, it means that the request
   * from the authorization server implementation was wrong or that an error occurred
   * in Authlete. In either case, from the viewpoint of the client application, it is
   * an error on the server side. Therefore, the service implementation should
   * generate a response to the client application with HTTP status of "500 Internal
   * Server Error".
   *
   * The parameter `responseContent` returns a string which describes the error in
   * the format of [RFC 6750](https://datatracker.ietf.org/doc/html/rfc6750) (OAuth
   * 2.0 Bearer Token Usage) so the userinfo endpoint implementation can use the
   * value of `responseContent` as the value of`WWW-Authenticate` header.
   *
   * The following is an example response which complies with RFC 6750. Note that
   * OpenID Connect Core 1.0 requires that an error response from userinfo endpoint
   * comply with RFC 6750. See
   * [5.3.3. UserInfo Response](https://openid.net/specs/openid-connect-core-1_0.html#UserInfoError)
   * for details.
   *
   * ```
   * HTTP/1.1 500 Internal Server Error
   * WWW-Authenticate: {responseContent}
   * Cache-Control: no-store
   * Pragma: no-cache
   * ```
   *
   * **BAD_REQUEST**
   *
   * When the value of `action` is `BAD_REQUEST`, it means that the request from the
   * client application does not contain an access token (= the request from the
   * authorization server implementation to Authlete does not contain `token`
   * parameter).
   *
   * The parameter `responseContent` returns a string which describes the error in
   * the format of [RFC 6750](https://datatracker.ietf.org/doc/html/rfc6750) (OAuth
   * 2.0 Bearer Token Usage) so the userinfo endpoint implementation can use the
   * value of `responseContent` as the value of`WWW-Authenticate` header.
   *
   * The following is an example response which complies with RFC 6750. Note that
   * OpenID Connect Core 1.0 requires that an error response from userinfo endpoint
   * comply with RFC 6750. See
   * [5.3.3. UserInfo Response](https://openid.net/specs/openid-connect-core-1_0.html#UserInfoError)
   * for details.
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
   * does not exist, has expired, or is not associated with any subject (= any user
   * account).
   *
   * The parameter `responseContent` returns a string which describes the error in
   * the format of [RFC 6750](https://datatracker.ietf.org/doc/html/rfc6750) (OAuth
   * 2.0 Bearer Token Usage) so the userinfo endpoint implementation can use the
   * value of `responseContent` as the value of`WWW-Authenticate` header.
   *
   * The following is an example response which complies with RFC 6750. Note that
   * OpenID Connect Core 1.0 requires that an error response from userinfo endpoint
   * comply with RFC 6750. See
   * [5.3.3. UserInfo Response](https://openid.net/specs/openid-connect-core-1_0.html#UserInfoError)
   * for details.
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
   * not include the `openid` scope.
   *
   * The parameter `responseContent` returns a string which describes the error in
   * the format of [RFC 6750](https://datatracker.ietf.org/doc/html/rfc6750) (OAuth
   * 2.0 Bearer Token Usage) so the userinfo endpoint implementation can use the
   * value of `responseContent` as the value of`WWW-Authenticate` header.
   *
   * The following is an example response which complies with RFC 6750. Note that
   * OpenID Connect Core 1.0 requires that an error response from userinfo endpoint
   * comply with RFC 6750. See
   * [5.3.3. UserInfo Response](https://openid.net/specs/openid-connect-core-1_0.html#UserInfoError)
   * for details.
   *
   * ```
   * HTTP/1.1 403 Forbidden
   * WWW-Authenticate: {responseContent}
   * Cache-Control: no-store
   * Pragma: no-cache
   * ```
   *
   * **JSON**
   *
   * When the value of `action` is `JSON`, it means that the access token which the
   * client application presented is valid and an ID token was successfully generated
   * in the format of JSON.
   *
   * The userinfo endpoint implementation is expected to generate a response to the
   * client application. The content type of the response must be `application/json`
   * and the response body must be an ID token in JSON format.
   *
   * The value of `responseContent` is the ID token in JSON format when `action` is
   * `JSON`, so a response to the client can be built like below.
   *
   * ```
   * HTTP/1.1 200 OK
   * Cache-Control: no-store
   * Pragma: no-cache
   * Content-Type: application/json;charset=UTF-8
   *
   * {responseContent}
   * ```
   *
   * **JWT**
   *
   * When the value of `action` is `JWT`, it means that the access token which the
   * client application presented is valid and an ID token was successfully generated
   * in the format of JWT (JSON Web Token)
   * ([RFC 7519](https://datatracker.ietf.org/doc/html/rfc7519)).
   *
   * The userinfo endpoint implementation is expected to generate a response to the
   * client application. The content type of the response must be `application/jwt`
   * and the response body must be an ID token in JWT format.
   *
   * The value of `responseContent` is the ID token in JSON format when `action` is
   * `JWT`, so a response to the client can be built like below.
   *
   * ```
   * HTTP/1.1 200 OK
   * Cache-Control: no-store
   * Pragma: no-cache
   * Content-Type: application/jwt
   *
   * {responseContent}
   * ```
   *
   * </details>
   *
   * @example
   * ```ts
   * const response = await client.auth.userinfo.issue(
   *   'serviceId',
   *   { token: 'Ntm9MDb8WXQAevqrBkd84KTTHbYHVQrTjgUZCOWqEUI' },
   * );
   * ```
   */
  issue(
    serviceID: string,
    body: UserinfoIssueParams,
    options?: RequestOptions,
  ): APIPromise<UserinfoIssueResponse> {
    return this._client.post(path`/api/${serviceID}/auth/userinfo/issue`, { body, ...options });
  }

  /**
   * This API gathers information about a user.
   *
   * <details>
   * <summary>Description</summary>
   *
   * This API is supposed to be called from within the implementation of the
   * [userinfo endpoint](https://openid.net/specs/openid-connect-core-1_0.html#UserInfo)
   * of the authorization server in order to get information about the user that is
   * associated with an access token.
   *
   * The response from `/auth/userinfo` API has various parameters. Among them, it is
   * `action` parameter that the authorization server implementation should check
   * first because it denotes the next action that the authorization server
   * implementation should take. According to the value of `action`, the service
   * implementation must take the steps described below.
   *
   * **INTERNAL_SERVER_ERROR**
   *
   * When the value of `action` is `INTERNAL_SERVER_ERROR`, it means that the request
   * from the authorization server implementation was wrong or that an error occurred
   * in Authlete. In either case, from the viewpoint of the client application, it is
   * an error on the server side. Therefore, the service implementation should
   * generate a response to the client application with HTTP status of "500 Internal
   * Server Error".
   *
   * The value of `responseContent` is a string which describes the error in the
   * format of [RFC 6750](https://datatracker.ietf.org/doc/html/rfc6750) (OAuth 2.0
   * Bearer Token Usage) so the userinfo endpoint implementation can use the value of
   * `responseContent` as the value of`WWW-Authenticate` header.
   *
   * The following is an example response which complies with RFC 6750. Note that
   * OpenID Connect Core 1.0 requires that an error response from userinfo endpoint
   * comply with RFC 6750. See
   * [5.3.3. UserInfo Response](https://openid.net/specs/openid-connect-core-1_0.html#UserInfoError)
   * for details.
   *
   * ```
   * HTTP/1.1 500 Internal Server Error
   * WWW-Authenticate: {responseContent}
   * Cache-Control: no-store
   * Pragma: no-cache
   * ```
   *
   * **BAD_REQUEST**
   *
   * When the value of `action` is `BAD_REQUEST`, it means that the request from the
   * client application does not contain an access token (= the request from the
   * authorization server implementation to Authlete does not contain `token`
   * parameter).
   *
   * The value of `responseContent` is a string which describes the error in the
   * format of [RFC 6750](https://datatracker.ietf.org/doc/html/rfc6750) (OAuth 2.0
   * Bearer Token Usage) so the userinfo endpoint implementation can use the value of
   * `responseContent` as the value of`WWW-Authenticate` header.
   *
   * The following is an example response which complies with RFC 6750. Note that
   * OpenID Connect Core 1.0 requires that an error response from userinfo endpoint
   * comply with RFC 6750. See
   * [5.3.3. UserInfo Response](https://openid.net/specs/openid-connect-core-1_0.html#UserInfoError)
   * for details.
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
   * does not exist, has expired, or is not associated with any subject (= any user
   * account).
   *
   * The value of `responseContent` is a string which describes the error in the
   * format of [RFC 6750](https://datatracker.ietf.org/doc/html/rfc6750) (OAuth 2.0
   * Bearer Token Usage) so the userinfo endpoint implementation can use the value of
   * `responseContent` as the value of`WWW-Authenticate` header.
   *
   * The following is an example response which complies with RFC 6750. Note that
   * OpenID Connect Core 1.0 requires that an error response from userinfo endpoint
   * comply with RFC 6750. See
   * [5.3.3. UserInfo Response](https://openid.net/specs/openid-connect-core-1_0.html#UserInfoError)
   * for details.
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
   * not include the `openid` scope.
   *
   * The value of `responseContent` is a string which describes the error in the
   * format of [RFC 6750](https://datatracker.ietf.org/doc/html/rfc6750) (OAuth 2.0
   * Bearer Token Usage) so the userinfo endpoint implementation can use the value of
   * `responseContent` as the value of`WWW-Authenticate` header.
   *
   * The following is an example response which complies with RFC 6750. Note that
   * OpenID Connect Core 1.0 requires that an error response from userinfo endpoint
   * comply with RFC 6750. See
   * [5.3.3. UserInfo Response](https://openid.net/specs/openid-connect-core-1_0.html#UserInfoError)
   * for details.
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
   * client application presented is valid. To be concrete, it means that the access
   * token exists, has not expired, includes the openid scope, and is associated with
   * a subject (= a user account).
   *
   * What the userinfo endpoint implementation should do next is to collect
   * information about the subject (user) from your database. The value of the
   * `subject` is contained in the subject parameter in the response from this API
   * and the names of data, i.e., the claims names are contained in the claims
   * parameter in the response. For example, if the `subject` parameter is `joe123`
   * and the claims parameter is `[ "given_name", "email" ]`, you need to extract
   * information about joe123's given name and email from your database.
   *
   * Then, call Authlete's `/auth/userinfo/issue` API with the collected information
   * and the access token in order to make Authlete generate an ID token.
   *
   * If an error occurred during the above steps, generate an error response to the
   * client. The response should comply with
   * [RFC 6750](https://datatracker.ietf.org/doc/html/rfc6750). For example, if the
   * subject associated with the access token does not exist in your database any
   * longer, you may feel like generating a response like below.
   *
   * ```
   * HTTP/1.1 400 Bad Request
   * WWW-Authenticate: Bearer error="invalid_token",
   *  error_description="The subject associated with the access token does not exist."
   * Cache-Control: no-store
   * Pragma: no-cache
   * ```
   *
   * Also, an error might occur on database access. If you treat the error as an
   * internal server error, then the response would be like the following.
   *
   * ```
   * HTTP/1.1 500 Internal Server Error
   * WWW-Authenticate: Bearer error="server_error",
   *  error_description="Failed to extract information about the subject from the database."
   * Cache-Control: no-store
   * Pragma: no-cache
   * ```
   *
   * </details>
   *
   * @example
   * ```ts
   * const response = await client.auth.userinfo.process(
   *   'serviceId',
   *   { token: 'Ntm9MDb8WXQAevqrBkd84KTTHbYHVQrTjgUZCOWqEUI' },
   * );
   * ```
   */
  process(
    serviceID: string,
    body: UserinfoProcessParams,
    options?: RequestOptions,
  ): APIPromise<UserinfoProcessResponse> {
    return this._client.post(path`/api/${serviceID}/auth/userinfo`, { body, ...options });
  }
}

export interface UserinfoIssueResponse {
  /**
   * The next action that the authorization server implementation should take.
   */
  action?: 'INTERNAL_SERVER_ERROR' | 'BAD_REQUEST' | 'UNAUTHORIZED' | 'FORBIDDEN' | 'JSON' | 'OK';

  /**
   * The content-digest header of the response message
   */
  contentDigest?: string;

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
   * The signature header of the response message.
   */
  signature?: string;

  /**
   * The signature-input header of the response message
   */
  signatureInput?: string;
}

export interface UserinfoProcessResponse {
  /**
   * The access token that came along with the userinfo request.
   */
  token?: string;

  /**
   * The next action that the authorization server implementation should take.
   */
  action?: 'INTERNAL_SERVER_ERROR' | 'BAD_REQUEST' | 'UNAUTHORIZED' | 'FORBIDDEN' | 'OK';

  /**
   * The list of claims that the client application requests to be embedded in the ID
   * token.
   */
  claims?: Array<string>;

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
   * The ID of the client application which is associated with the access token.
   */
  clientId?: number;

  /**
   * The client ID alias when the authorization request for the access token was
   * made.
   */
  clientIdAlias?: string;

  /**
   * The flag which indicates whether the client ID alias was used when the
   * authorization request for the access token was made.
   */
  clientIdAliasUsed?: boolean;

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
   * The extra properties associated with the access token.
   */
  properties?: Array<AuthorizationAPI.Property>;

  /**
   * Get names of claims that are requested indirectly by <i>"transformed
   * claims"</i>.
   *
   * <p>
   * A client application can request <i>"transformed claims"</i> by adding
   * names of transformed claims in the `claims` request parameter.
   * The following is an example of the `claims` request parameter
   * that requests a predefined transformed claim named `18_or_over`
   * and a transformed claim named `nationality_usa` to be embedded
   * in the response from the userinfo endpoint.
   * </p>
   *
   * ```json
   * {
   *   "transformed_claims": {
   *     "nationality_usa": {
   *       "claim": "nationalities",
   *       "fn": [["eq", "USA"], "any"]
   *     }
   *   },
   *   "userinfo": {
   *     "::18_or_over": null,
   *     ":nationality_usa": null
   *   }
   * }
   * ```
   *
   * The example above assumes that a transformed claim named `18_or_over` is
   * predefined by the authorization server like below.
   *
   * ```json
   * {
   *   "18_or_over": {
   *     "claim": "birthdate",
   *     "fn": ["years_ago", ["gte", 18]]
   *   }
   * }
   * ```
   *
   * In the example, the `nationalities` claim is requested indirectly by the
   * `nationality_usa` transformed claim. Likewise, the `birthdate` claim is
   * requested indirectly by the `18_or_over` transformed claim.
   *
   * When the `claims` request parameter of an authorization request is like the
   * example above, this `requestedClaimsForTx` property will hold the following
   * value.
   *
   * ```json
   * ["birthdate", "nationalities"]
   * ```
   *
   * It is expected that the authorization server implementation prepares values of
   * the listed claims and passes them as the value of the `claimsForTx` request
   * parameter when it calls the `/api/auth/userinfo/issue` API. The following is an
   * example of the value of the `claimsForTx` request parameter.
   *
   * ```json
   * {
   *   "birthdate": "1970-01-23",
   *   "nationalities": ["DEU", "USA"]
   * }
   * ```
   */
  requestedClaimsForTx?: Array<string>;

  /**
   * Names of verified claims that will be referenced when transformed claims are
   * computed.
   */
  requestedVerifiedClaimsForTx?: Array<Array<string>>;

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
   * The scopes covered by the access token.
   */
  scopes?: Array<string>;

  /**
   * The attributes of this service that the client application belongs to.
   */
  serviceAttributes?: Array<TokenAPI.Pair>;

  /**
   * The subject (= resource owner's ID).
   */
  subject?: string;

  /**
   * the value of the `transformed_claims` property in the `claims` request parameter
   * of an authorization request or in the `claims` property in a request object.
   */
  transformedClaims?: string;

  /**
   * The value of the `userinfo` property in the `claims` request parameter or in the
   * `claims` property in an authorization request object.
   *
   * A client application may request certain claims be embedded in an ID token or in
   * a response from the userInfo endpoint. There are several ways. Including the
   * `claims` request parameter and including the `claims` property in a request
   * object are such examples. In both cases, the value of the `claims`
   * parameter/property is JSON. Its format is described in
   * [5.5. Requesting Claims using the "claims" Request Parameter](https://openid.net/specs/openid-connect-core-1_0.html#ClaimsParameter).
   *
   * The following is an excerpt from the specification. You can find `userinfo` and
   * `id_token` are top-level properties.
   *
   * ```json
   * {
   *   "userinfo": {
   *     "given_name": { "essential": true },
   *     "nickname": null,
   *     "email": { "essential": true },
   *     "email_verified": { "essential": true },
   *     "picture": null,
   *     "http://example.info/claims/groups": null
   *   },
   *   "id_token": {
   *     "auth_time": { "essential": true },
   *     "acr": { "values": ["urn:mace:incommon:iap:silver"] }
   *   }
   * }
   * ```
   *
   * The value of this property is the value of the `userinfo` property in JSON
   * format. For example, if the JSON above is included in an authorization request,
   * this property holds JSON equivalent to the following.
   *
   * ```json
   * {
   *   "given_name": { "essential": true },
   *   "nickname": null,
   *   "email": { "essential": true },
   *   "email_verified": { "essential": true },
   *   "picture": null,
   *   "http://example.info/claims/groups": null
   * }
   * ```
   *
   * Note that if a request object is given and it contains the `claims` property and
   * if the `claims` request parameter is also given, the value of this property
   * holds the former value.
   */
  userInfoClaims?: string;
}

export interface UserinfoIssueParams {
  /**
   * The access token that has been passed to the userinfo endpoint by the client
   * application. In other words, the access token which was contained in the
   * userinfo request.
   */
  token: string;

  /**
   * Claims in JSON format. As for the format, see
   * [OpenID Connect Core 1.0, 5.1. Standard Claims](https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims).
   */
  claims?: string;

  /**
   * Claim key-value pairs that are used to compute transformed claims.
   */
  claimsForTx?: string;

  /**
   * HTTP headers to be included in processing the signature. If this is a signed
   * request, this must include the Signature and Signature-Input headers, as well as
   * any additional headers covered by the signature.
   */
  headers?: Array<TokenAPI.Pair>;

  /**
   * The Signature header value from the request.
   */
  requestSignature?: string;

  /**
   * The value of the `sub` claim. If the value of this request parameter is not
   * empty, it is used as the value of the `sub` claim. Otherwise, the value of the
   * subject associated with the access token is used.
   */
  sub?: string;
}

export interface UserinfoProcessParams {
  /**
   * An access token.
   */
  token: string;

  /**
   * Client certificate used in the TLS connection established between the client
   * application and the userinfo endpoint.
   *
   * The value of this request parameter is referred to when the access token given
   * to the userinfo endpoint was bound to a client certificate when it was issued.
   * See [OAuth 2.0 Mutual TLS Client Authentication and Certificate-Bound Access
   * Tokens] (https://datatracker.ietf.org/doc/rfc8705/) for details about the
   * specification of certificate-bound access tokens.
   */
  clientCertificate?: string;

  /**
   * `DPoP` header presented by the client during the request to the user info
   * endpoint.
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
   * HTTP method of the user info request. This field is used to validate the DPoP
   * header. In normal cases, the value is either `GET` or `POST`.
   */
  htm?: string;

  /**
   * URL of the user info endpoint. This field is used to validate the DPoP header.
   *
   * If this parameter is omitted, the `userInfoEndpoint` property of the service is
   * used as the default value. See
   * [OAuth 2.0 Demonstration of Proof-of-Possession at the Application Layer (DPoP)](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-dpop)
   * for details.
   */
  htu?: string;

  /**
   * The HTTP message body of the request, if present.
   */
  message?: string;

  /**
   * The full URL of the userinfo endpoint.
   */
  uri?: string;
}

export declare namespace Userinfo {
  export {
    type UserinfoIssueResponse as UserinfoIssueResponse,
    type UserinfoProcessResponse as UserinfoProcessResponse,
    type UserinfoIssueParams as UserinfoIssueParams,
    type UserinfoProcessParams as UserinfoProcessParams,
  };
}
