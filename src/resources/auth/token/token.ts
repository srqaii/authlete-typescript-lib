// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as TokenAPI from './token';
import * as IntrospectionAPI from '../introspection';
import * as AuthorizationAPI from '../authorization/authorization';
import * as GetAPI from './get';
import { Get, GetListParams, GetListResponse } from './get';
import { APIPromise } from '../../../core/api-promise';
import { buildHeaders } from '../../../internal/headers';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class Token extends APIResource {
  get: GetAPI.Get = new GetAPI.Get(this._client);

  /**
   * Create an access token.
   *
   * @example
   * ```ts
   * const token = await client.auth.token.create('serviceId', {
   *   clientId: 26888344961664,
   *   grantType: 'AUTHORIZATION_CODE',
   *   scopes: ['history.read', 'timeline.read'],
   *   subject: 'john',
   * });
   * ```
   */
  create(
    serviceID: string,
    body: TokenCreateParams,
    options?: RequestOptions,
  ): APIPromise<TokenCreateResponse> {
    return this._client.post(path`/api/${serviceID}/auth/token/create`, { body, ...options });
  }

  /**
   * Update an access token.
   *
   * @example
   * ```ts
   * const token = await client.auth.token.update('serviceId', {
   *   accessToken:
   *     'Z5a40U6dWvw2gMoCOAFbZcM85q4HC0Z--0YKD9-Nf6Q',
   *   scopes: ['history.read'],
   * });
   * ```
   */
  update(
    serviceID: string,
    body: TokenUpdateParams,
    options?: RequestOptions,
  ): APIPromise<TokenUpdateResponse> {
    return this._client.post(path`/api/${serviceID}/auth/token/update`, { body, ...options });
  }

  /**
   * Delete an access token.
   *
   * @example
   * ```ts
   * await client.auth.token.delete('accessTokenIdentifier', {
   *   serviceId: 'serviceId',
   * });
   * ```
   */
  delete(
    accessTokenIdentifier: string,
    params: TokenDeleteParams,
    options?: RequestOptions,
  ): APIPromise<void> {
    const { serviceId } = params;
    return this._client.delete(path`/api/${serviceId}/auth/token/delete/${accessTokenIdentifier}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * This API generates a content of an error token response that the authorization
   * server implementation returns to the client application.
   *
   * <details>
   * <summary>Description</summary>
   *
   * This API is supposed to be called from within the implementation of the token
   * endpoint of the service in order to generate an error response to the client
   * application.
   *
   * The description of the `/auth/token` API describes the timing when this API
   * should be called. See the description for the case of `action=PASSWORD`.
   *
   * The response from `/auth/token/fail` API has some parameters. Among them, it is
   * `action` parameter that the authorization server implementation should check
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
   * can be used as the entity body of the response.
   *
   * The following illustrates the response which the service implementation should
   * generate and return to the client application.
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
   * The endpoint implementation may return another different response to the client
   * application since "500 Internal Server Error" is not required by OAuth 2.0.
   *
   * **BAD_REQUEST**
   *
   * When the value of `action` is `BAD_REQUEST`, it means that Authlete's
   * `/auth/token/fail` API successfully generated an error response for the client
   * application.
   *
   * The HTTP status of the response returned to the client application must be "400
   * Bad Request" and the content type must be `application/json`.
   *
   * The value of `responseContent` is a JSON string which describes the error, so it
   * can be used as the entity body of the response.
   *
   * The following illustrates the response which the service implementation should
   * generate and return to the client application.
   *
   * ```
   * HTTP/1.1 400 Bad Request
   * Content-Type: application/json
   * Cache-Control: no-store
   * Pragma: no-cache
   *
   * {responseContent}
   * ```
   *
   * </details>
   *
   * @example
   * ```ts
   * const response = await client.auth.token.fail('serviceId', {
   *   reason: 'INVALID_RESOURCE_OWNER_CREDENTIALS',
   *   ticket: '83BNqKIhGMyrkvop_7jQjv2Z1612LNdGSQKkvkrf47c',
   * });
   * ```
   */
  fail(serviceID: string, body: TokenFailParams, options?: RequestOptions): APIPromise<TokenFailResponse> {
    return this._client.post(path`/api/${serviceID}/auth/token/fail`, { body, ...options });
  }

  /**
   * This API generates a content of a successful token response that the
   * authorization server implementation returns to the client application.
   *
   * <details>
   * <summary>Description</summary>
   *
   * This API is supposed to be called from within the implementation of the token
   * endpoint of the service in order to generate a successful response to the client
   * application.
   *
   * The description of the `/auth/token` API describes the timing when this API
   * should be called. See the description for the case of `action=PASSWORD`.
   *
   * The response from `/auth/token/issue` API has some parameters. Among them, it is
   * `action` parameter that the authorization server implementation should check
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
   * can be used as the entity body of the response.
   *
   * The following illustrates the response which the service implementation should
   * generate and return to the client application.
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
   * The endpoint implementation may return another different response to the client
   * application since "500 Internal Server Error" is not required by OAuth 2.0.
   *
   * **OK**
   *
   * When the value of `action` is `OK`, it means that Authlete's `/auth/token/issue`
   * API successfully generated an access token.
   *
   * The HTTP status of the response returned to the client application must be "200
   * OK" and the content type must be`application/json`.
   *
   * The value of `responseContent` is a JSON string which contains an access token,
   * so it can be used as the entity body of the response.
   *
   * The following illustrates the response which the service implementation must
   * generate and return to the client application.
   *
   * ```
   * HTTP/1.1 200 OK
   * Content-Type: application/json
   * Cache-Control: no-store
   * Pragma: no-cache
   *
   * {responseContent}
   * ```
   *
   * </details>
   *
   * @example
   * ```ts
   * const response = await client.auth.token.issue(
   *   'serviceId',
   *   {
   *     subject: 'john',
   *     ticket: 'p7SXQ9JFjng7KFOZdCMBKcoR3ift7B54l1LGIgQXqEM',
   *   },
   * );
   * ```
   */
  issue(serviceID: string, body: TokenIssueParams, options?: RequestOptions): APIPromise<TokenIssueResponse> {
    return this._client.post(path`/api/${serviceID}/auth/token/issue`, { body, ...options });
  }

  /**
   * This API parses request parameters of an authorization request and returns
   * necessary data for the authorization server implementation to process the
   * authorization request further.
   *
   * <details>
   * <summary>Description</summary>
   *
   * This API is supposed to be called from with the implementation of the token
   * endpoint of the service. The endpoint implementation must extract the request
   * parameters from the token request from the client application and pass them as
   * the value of parameters request parameter to Authlete's `/auth/token` API. The
   * value of parameters is the entire entity body (which is formatted in
   * `application/x-www-form-urlencoded`) of the token request.
   *
   * In addition, if the token endpoint of the authorization server implementation
   * supports basic authentication as a means of
   * [client authentication](https://datatracker.ietf.org/doc/html/rfc6749#section-2.3),
   * the client credentials must be extracted from `Authorization` header and they
   * must be passed as `clientId` request parameter and `clientSecret` request
   * parameter to Authlete's `/auth/token` API.
   *
   * The following code snippet is an example in JAX-RS showing how to extract
   * request parameters from the token request and client credentials from
   * Authorization header.
   *
   * ```java
   * @POST
   * @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
   * public Response post(
   *         @HeaderParam(HttpHeaders.AUTHORIZATION) String auth,
   *         String parameters)
   * {
   *     // Convert the value of Authorization header (credentials of
   *     // the client application), if any, into BasicCredentials.
   *     BasicCredentials credentials = BasicCredentials.parse(auth);
   *
   *     // The credentials of the client application extracted from
   *     // 'Authorization' header. These may be null.
   *     String clientId     = credentials == null ? null
   *                         : credentials.getUserId();
   *     String clientSecret = credentials == null ? null
   *                         : credentials.getPassword();
   *
   *     // Process the given parameters.
   *     return process(parameters, clientId, clientSecret);
   * }
   * ```
   *
   * The response from `/auth/token` API has some parameters. Among them, it is
   * action parameter that the service implementation should check first because it
   * denotes the next action that the authorization server implementation should
   * take. According to the value of action, the authorization server implementation
   * must take the steps described below.
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
   * The value of `responseContent` is a JSON string which describes the error, so it
   * can be used as the entity body of the response.
   *
   * The following illustrates the response which the service implementation should
   * generate and return to the client application.
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
   * The endpoint implementation may return another different response to the client
   * application since "500 Internal Server Error" is not required by OAuth 2.0.
   *
   * **INVALID_CLIENT**
   *
   * When the value of `action` is `INVALID_CLIENT`, it means that authentication of
   * the client failed. In this case, the HTTP status of the response to the client
   * application is either "400 Bad Request" or "401 Unauthorized". This requirement
   * comes from
   * [RFC 6749, 5.2. Error Response](https://datatracker.ietf.org/doc/html/rfc6749#section-5.2).
   * The description about `invalid_client` shown below is an excerpt from RFC 6749.
   *
   * Client authentication failed (e.g., unknown client, no client authentication
   * included, or unsupported authentication method). The authorization server MAY
   * return an HTTP 401 (Unauthorized) status code to indicate which HTTP
   * authentication schemes are supported. If the client attempted to authenticate
   * via the `Authorization` request header field, the authorization server MUST
   * respond with an HTTP 401 (Unauthorized) status code and include the
   * `WWW-Authenticate` response header field matching the authentication scheme used
   * by the client.
   *
   * In either case, the value of `responseContent` is a JSON string which can be
   * used as the entity body of the response to the client application.
   *
   * The following illustrate responses which the service implementation must
   * generate and return to the client application.
   *
   * ```
   * HTTP/1.1 400 Bad Request
   * Content-Type: application/json
   * Cache-Control: no-store
   * Pragma: no-cache
   *
   * {responseContent}
   * ```
   *
   * ```
   * HTTP/1.1 401 Unauthorized
   * WWW-Authenticate: {challenge}
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
   * client application is invalid.
   *
   * A response with HTTP status of "400 Bad Request" must be returned to the client
   * application and the content type must be `application/json`.
   *
   * The value of `responseContent` is a JSON string which describes the error, so it
   * can be used as the entity body of the response.
   *
   * The following illustrates the response which the service implementation should
   * generate and return to the client application.
   *
   * ```
   * HTTP/1.1 400 Bad Request
   * Content-Type: application/json
   * Cache-Control: no-store
   * Pragma: no-cache
   *
   * {responseContent}
   * ```
   *
   * **PASSWORD**
   *
   * When the value of `"action"` is `"PASSWORD"`, it means that the request from the
   * client application is valid and `grant_type` is `"password"`. That is, the flow
   * is <a href="https://www.rfc-editor.org/rfc/rfc6749.html#section-4.3">"Resource
   * Owner Password Credentials"</a>.
   *
   * In this case, {@link #getUsername()} returns the value of `"username"` request
   * parameter and {@link #getPassword()} returns the value of {@code "password"}
   * request parameter which were contained in the token request from the client
   * application. The service implementation must validate the credentials of the
   * resource owner (= end-user) and take either of the actions below according to
   * the validation result.
   *
   * 1. When the credentials are valid, call Authlete's /auth/token/issue} API to
   *    generate an access token for the client application. The API requires
   *    `"ticket"` request parameter and `"subject"` request parameter. Use the value
   *    returned from {@link #getTicket()} method as the value for `"ticket"`
   *    parameter.
   * 2. The response from `/auth/token/issue` API ({@link TokenIssueResponse})
   *    contains data (an access token and others) which should be returned to the
   *    client application. Use the data to generate a response to the client
   *    application.
   * 3. When the credentials are invalid</b>, call Authlete's {@code
   *    /auth/token/fail} API with `reason=`{@link
   *    TokenFailRequest.Reason#INVALID_RESOURCE_OWNER_CREDENTIALS
   *    INVALID_RESOURCE_OWNER_CREDENTIALS} to generate an error response for the
   *    client application. The API requires `"ticket"` request parameter. Use the
   *    value returned from {@link #getTicket()} method as the value for `"ticket"`
   *    parameter.
   * 4. The response from `/auth/token/fail` API ({@link TokenFailResponse}) contains
   *    error information which should be returned to the client application. Use it
   *    to generate a response to the client application.
   *
   * **OK**
   *
   * When the value of `action` is `OK`, it means that the request from the client
   * application is valid and an access token, and optionally an ID token, is ready
   * to be issued.
   *
   * The HTTP status of the response returned to the client application must be "200
   * OK" and the content type must be `application/json`.
   *
   * The value of `responseContent` is a JSON string which contains an access token
   * (and optionally an ID token), so it can be used as the entity body of the
   * response.
   *
   * The following illustrates the response which the service implementation must
   * generate and return to the client application.
   *
   * ```
   * HTTP/1.1 200 OK
   * Content-Type: application/json
   * Cache-Control: no-store
   * Pragma: no-cache
   *
   * {responseContent}
   * ```
   *
   * **TOKEN_EXCHANGE (Authlete 2.3 onwards)**
   *
   * When the value of `"action"` is `"TOKEN_EXCHANGE"`, it means that the request
   * from the client application is a valid token exchange request (cf.
   * <a href="https://www.rfc-editor.org/rfc/rfc8693.html">RFC 8693 OAuth 2.0 Token
   * Exchange</a>) and that the request has already passed the following validation
   * steps.
   *
   * 1. Confirm that the value of the `requested_token_type` request parameter is one
   *    of the registered token type identifiers if the request parameter is given
   *    and its value is not empty.
   * 2. Confirm that the `subject_token` request parameter is given and its value is
   *    not empty.
   * 3. Confirm that the `subject_token_type` request parameter is given and its
   *    value is one of the registered token type identifiers.
   * 4. Confirm that the `actor_token_type` request parameter is given and its value
   *    is one of the registered token type identifiers if the `actor_token` request
   *    parameter is given and its value is not empty.
   * 5. Confirm that the `actor_token_type` request parameter is not given or its
   *    value is empty when the `actor_token` request parameter is not given or its
   *    value is empty.
   *
   * Furthermore, Authlete performs additional validation on the tokens specified by
   * the `subject_token` request parameter and the `actor_token` request parameter
   * according to their respective token types as shown below.
   *
   * **Token Validation Steps**
   *
   * _Token Type: `urn:ietf:params:oauth:token-type:jwt`_
   *
   * 1. Confirm that the format conforms to the JWT specification [RFC
   *    7519][https://www.rfc-editor.org/rfc/rfc7519.html].
   * 2. Check if the JWT is encrypted and if it is encrypted, then (a) reject the
   *    token exchange request when the {@link
   *    Service#isTokenExchangeEncryptedJwtRejected()
   *    tokenExchangeEncryptedJwtRejected} flag of the service is `true` or (b) skip
   *    remaining validation steps when the flag is `false`. Note that Authlete does
   *    not verify an encrypted JWT because there is no standard way to obtain the
   *    key to decrypt the JWT with. This means that you must verify an encrypted JWT
   *    by yourself when one is used as an input token with the token type { @code
   *    "urn:ietf:params:oauth:token-type:jwt" }.
   * 3. Confirm that the current time has not reached the time indicated by the `exp`
   *    claim if the JWT contains the claim.
   * 4. Confirm that the current time is equal to or after the time indicated by the
   *    `iat` claim if the JWT contains the claim. 5.Confirm that the current time is
   *    equal to or after the time indicated by the `nbf` claim if the JWT contains
   *    the claim.
   * 5. Check if the JWT is signed and if it is not signed, then (a) reject the token
   *    exchange request when the {@link Service#isTokenExchangeUnsignedJwtRejected()
   *    tokenExchangeUnsignedJwtRejected} flag of the service is `true` or (b) finish
   *    validation on the input token. Note that Authlete does not verify the
   *    signature of the JWT because there is no standard way to obtain the key to
   *    verify the signature of a JWT with. This means that you must verify the
   *    signature by yourself when a signed JWT is used as an input token with the
   *    token type `"urn:ietf:params:oauth:token-type:jwt"`.
   *
   * _Token Type: `urn:ietf:params:oauth:token-type:access_token`_
   *
   * 1. Confirm that the token is an access token that has been issued by the
   *    Authlete server of your service. This implies that access tokens issued by
   *    other systems cannot be used as a subject token or an actor token with the
   *    token type <code>urn:ietf:params:oauth:token-type:access_token</code>.
   * 2. Confirm that the access token has not expired.
   * 3. Confirm that the access token belongs to the service.
   *
   * _Token Type: `urn:ietf:params:oauth:token-type:refresh_token`_
   *
   * 1. Confirm that the token is a refresh token that has been issued by the
   *    Authlete server of your service. This implies that refresh tokens issued by
   *    other systems cannot be used as a subject token or an actor token with the
   *    token type <code>urn:ietf:params:oauth:token-type:refresh_token</code>.
   * 2. Confirm that the refresh token has not expired.
   * 3. Confirm that the refresh token belongs to the service.
   *
   * _Token Type: `urn:ietf:params:oauth:token-type:id_token`_
   *
   * 1. Confirm that the format conforms to the JWT specification (<a href=
   *        "https://www.rfc-editor.org/rfc/rfc7519.html">RFC 7519</a>).
   * 2. Check if the ID Token is encrypted and if it is encrypted, then (a) reject
   *    the token exchange request when the {@link
   *    Service#isTokenExchangeEncryptedJwtRejected()
   *    tokenExchangeEncryptedJwtRejected} flag of the service is `true` or (b) skip
   *    remaining validation steps when the flag is `false`. Note that Authlete does
   *    not verify an encrypted ID Token because there is no standard way to obtain
   *    the key to decrypt the ID Token with in the context of token exchange where
   *    the client ID for the encrypted ID Token cannot be determined. This means
   *    that you must verify an encrypted ID Token by yourself when one is used as an
   *    input token with the token type
   *    `"urn:ietf:params:oauth:token-type:id_token"`.
   * 3. Confirm that the ID Token contains the `exp` claim and the current time has
   *    not reached the time indicated by the claim.
   * 4. Confirm that the ID Token contains the `iat` claim and the current time is
   *    equal to or after the time indicated by the claim.
   * 5. Confirm that the current time is equal to or after the time indicated by the
   *    `nbf` claim if the ID Token contains the claim.
   * 6. Confirm that the ID Token contains the `iss` claim and the value is a valid
   *    URI. In addition, confirm that the URI has the `https` scheme, no query
   *    component and no fragment component.
   * 7. Confirm that the ID Token contains the `aud` claim and its value is a JSON
   *    string or an array of JSON strings.
   * 8. Confirm that the value of the `nonce` claim is a JSON string if the ID Token
   *    contains the claim.
   * 9. Check if the ID Token is signed and if it is not signed, then (a) reject the
   *    token exchange request when the {@link
   *    Service#isTokenExchangeUnsignedJwtRejected()
   *    tokenExchangeUnsignedJwtRejected} flag of the service is `true` or (b) finish
   *    validation on the input token.
   * 10. Confirm that the signature algorithm is asymmetric. This implies that ID
   *     Tokens whose signature algorithm is symmetric (`HS256`, `HS384` or `HS512`)
   *     cannot be used as a subject token or an actor token with the token type
   *     `urn:ietf:params:oauth:token-type:id_token`.
   * 11. Verify the signature of the ID Token. Signature verification is performed
   *     even in the case where the issuer of the ID Token is not your service. But
   *     in that case, the issuer must support the discovery endpoint defined in
   *     <a href=
   *         "https://openid.net/specs/openid-connect-discovery-1_0.html">OpenID
   *     Connect Discovery 1.0</a>. Otherwise, signature verification fails.
   *
   * _Token Type: `urn:ietf:params:oauth:token-type:saml1`_
   *
   * (Authlete does not perform any validation for this token type.)
   *
   * _Token Type: `urn:ietf:params:oauth:token-type:saml2`_
   *
   * (Authlete does not perform any validation for this token type.)
   *
   * The specification of Token Exchange (<a href=
   * "https://www.rfc-editor.org/rfc/rfc8693.html">RFC 8693</a>) is very flexible. In
   * other words, the specification has abandoned the task of determining details.
   * Therefore, for secure token exchange, you have to complement the specification
   * with your own rules. For that purpose, Authlete provides some configuration
   * options as listed below. Authorization server implementers may utilize them
   * and/or implement their own rules.
   *
   * In the case of {@link Action#TOKEN_EXCHANGE TOKEN_EXCHANGE}, the {@link
   * #getResponseContent()} method returns `null`. You have to construct the token
   * response by yourself.
   *
   * For example, you may generate an access token by calling Authlete's
   * `/api/auth/token/create` API and construct a token response like below.
   *
   * ```
   * HTTP/1.1 401 Unauthorized
   * WWW-Authenticate: {challenge}
   * Content-Type: application/json
   * Cache-Control: no-store
   * Pragma: no-cache
   *
   * {responseContent}
   * ```
   *
   * ```
   * HTTP/1.1 200 OK
   * Content-Type: application/json
   * Cache-Control: no-cache, no-store
   * {
   *     "access_token": "{@link TokenCreateResponse#getAccessToken()}",
   *     "issued_token_type": "urn:ietf:params:oauth:token-type:access_token",
   *     "token_type": "Bearer",
   *     "expires_in": { @link TokenCreateResponse#getExpiresIn() },
   *     "scope": "String.join(" ", {@link TokenCreateResponse#getScopes()})"
   * }
   * ```
   *
   * **JWT_BEARER JWT_BEARER (Authlete 2.3 onwards)**
   *
   * When the value of `"action"` is `"JWT_BEARER"`, it means that the request from
   * the client application is a valid token request with the grant type
   * `"urn:ietf:params:oauth:grant-type:jwt-bearer"` (<a href=
   * "https://www.rfc-editor.org/rfc/rfc7523.html">RFC 7523 JSON Web Token (JWT)
   * Profile for OAuth 2.0 Client Authentication and Authorization Grants</a>) and
   * that the request has already passed the following validation steps.
   *
   * 1. Confirm that the `assertion` request parameter is given and its value is not
   *    empty.
   * 2. Confirm that the format of the assertion conforms to the JWT specification
   *    (<a href="https://www.rfc-editor.org/rfc/rfc7519.html">RFC 7519</a>).
   *
   * 3. Check if the JWT is encrypted and if it is encrypted, then (a) reject the
   *    token request when the {@link Service#isJwtGrantEncryptedJwtRejected()
   *    jwtGrantEncryptedJwtRejected} flag of the service is `true` or (b) skip
   *    remaining validation steps when the flag is `false`. Note that Authlete does
   *    not verify an encrypted JWT because there is no standard way to obtain the
   *    key to decrypt the JWT with. This means that you must verify an encrypted JWT
   *    by yourself.
   * 4. Confirm that the JWT contains the `iss` claim and its value is a JSON string.
   * 5. Confirm that the JWT contains the `sub` claim and its value is a JSON string.
   * 6. Confirm that the JWT contains the `aud` claim and its value is either a JSON
   *    string or an array of JSON strings.
   * 7. Confirm that the issuer identifier of the service (cf. {@link
   *    Service#getIssuer()}) or the URL of the token endpoint (cf. {@link
   *    Service#getTokenEndpoint()}) is listed as audience in the `aud` claim.
   * 8. Confirm that the JWT contains the `exp` claim and the current time has not
   *    reached the time indicated by the claim.
   * 9. Confirm that the current time is equal to or after the time indicated by by
   *    the `iat` claim if the JWT contains the claim.
   * 10. Confirm that the current time is equal to or after the time indicated by by
   *     the `nbf` claim if the JWT contains the claim.
   * 11. Check if the JWT is signed and if it is not signed, then (a) reject the
   *     token request when the {@link Service#isJwtGrantUnsignedJwtRejected()
   *     jwtGrantUnsignedJwtRejected} flag of the service is `true` or (b) finish
   *     validation on the JWT. Note that Authlete does not verify the signature of
   *     the JWT because there is no standard way to obtain the key to verify the
   *     signature of a JWT with. This means that you must verify the signature by
   *     yourself.
   *
   * Authlete provides some configuration options for the grant type as listed below.
   * Authorization server implementers may utilize them and/or implement their own
   * rules.
   *
   * ```
   * HTTP/1.1 200 OK
   * Content-Type: application/json
   * Cache-Control: no-cache, no-store
   * {
   *       "access_token": "{@link TokenCreateResponse#getAccessToken()}",
   *       "token_type":   "Bearer",
   *       "expires_in":   {@link TokenCreateResponse#getExpiresIn()},
   *       "scope":        "String.join(" ", {@link TokenCreateResponse#getScopes()})"
   *                           }
   * ```
   *
   * Finally, note again that Authlete does not verify the signature of the JWT
   * specified by the `assertion` request parameter. You must verify the signature by
   * yourself.
   *
   * </details>
   *
   * @example
   * ```ts
   * const response = await client.auth.token.process(
   *   'serviceId',
   *   {
   *     parameters:
   *       'grant_type=authorization_code&code=Xv_su944auuBgc5mfUnxXayiiQU9Z4-T_Yae_UfExmo&redirect_uri=https%3A%2F%2Fmy-client.example.com%2Fcb1&code_verifier=dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk',
   *     clientId: '26478243745571',
   *     clientSecret:
   *       'gXz97ISgLs4HuXwOZWch8GEmgL4YMvUJwu3er_kDVVGcA0UOhA9avLPbEmoeZdagi9yC_-tEiT2BdRyH9dbrQQ',
   *   },
   * );
   * ```
   */
  process(
    serviceID: string,
    body: TokenProcessParams,
    options?: RequestOptions,
  ): APIPromise<TokenProcessResponse> {
    return this._client.post(path`/api/${serviceID}/auth/token`, { body, ...options });
  }

  /**
   * Revoke an access token.
   *
   * @example
   * ```ts
   * const response = await client.auth.token.revoke(
   *   'serviceId',
   *   {
   *     accessTokenIdentifier:
   *       'Z5a40U6dWvw2gMoCOAFbZcM85q4HC0Z--0YKD9-Nf6Q',
   *   },
   * );
   * ```
   */
  revoke(
    serviceID: string,
    body: TokenRevokeParams,
    options?: RequestOptions,
  ): APIPromise<TokenRevokeResponse> {
    return this._client.post(path`/api/${serviceID}/auth/token/revoke`, { body, ...options });
  }
}

export interface AuthorizationDetailsElement {
  /**
   * The type of this element.
   *
   * From _"OAuth 2.0 Rich Authorization Requests"_: _"The type of authorization data
   * as a string. This field MAY define which other elements are allowed in the
   * request. This element is REQUIRED."_
   *
   * This property is always NOT `null`.
   */
  type: string;

  /**
   * The actions.
   *
   * From _"OAuth 2.0 Rich Authorization Requests"_: _"An array of strings
   * representing the kinds of actions to be taken at the resource. The values of the
   * strings are determined by the API being protected."_
   *
   * This property may be `null`.
   */
  actions?: Array<string>;

  /**
   * From _"OAuth 2.0 Rich Authorization Requests"_: _"An array of strings
   * representing the kinds of data being requested from the resource."_
   *
   * This property may be `null`.
   */
  dataTypes?: Array<string>;

  /**
   * The identifier of a specific resource. From _"OAuth 2.0 Rich Authorization
   * Requests"_: _"A string identifier indicating a specific resource available at
   * the API."_
   *
   * This property may be `null`.
   */
  identifier?: string;

  /**
   * The resources and/or resource servers. This property may be `null`.
   *
   * From _"OAuth 2.0 Rich Authorization Requests"_: _"An array of strings
   * representing the location of the resource or resource server. This is typically
   * composed of URIs."_
   *
   * This property may be `null`.
   */
  locations?: Array<string>;

  /**
   * The RAR request in the JSON format excluding the pre-defined attributes such as
   * `type` and `locations`. The content and semantics are specific to the deployment
   * and the use case implemented.
   */
  otherFields?: string;

  /**
   * The types or levels of privilege. From "OAuth 2.0 Rich Authorization Requests":
   * _"An array of strings representing the types or levels of privilege being
   * requested at the resource."_
   *
   * This property may be `null`.
   */
  privileges?: Array<string>;
}

export interface Pair {
  /**
   * The key part.
   */
  key?: string;

  /**
   * The value part.
   */
  value?: string;
}

export interface TokenCreateResponse {
  /**
   * The newly issued access token.
   */
  accessToken?: string;

  /**
   * The next action that the authorization server implementation should take.
   */
  action?: 'INTERNAL_SERVER_ERROR' | 'BAD_REQUEST' | 'FORBIDDEN' | 'OK';

  /**
   * The authorization details. This represents the value of the
   * `authorization_details` request parameter in the preceding device authorization
   * request which is defined in "OAuth 2.0 Rich Authorization Requests".
   */
  authorizationDetails?: AuthorizationAPI.AuthorizationDetails;

  /**
   * The ID of the client application associated with the access token.
   */
  clientId?: number;

  /**
   * The time at which the access token expires.
   */
  expiresAt?: number;

  /**
   * The duration of the newly issued access token in seconds.
   */
  expiresIn?: number;

  /**
   * the flag which indicates whether the access token is for an external attachment.
   */
  forExternalAttachment?: boolean;

  /**
   * The grant type for the newly issued access token.
   */
  grantType?: string;

  /**
   * If the authorization server is configured to issue JWT-based access tokens (= if
   * `Service.accessTokenSignAlg` is set to a `non-null` value), a JWT-based access
   * token is issued along with the original random-string one.
   */
  jwtAccessToken?: string;

  /**
   * The extra properties associated with the access token.
   */
  properties?: Array<AuthorizationAPI.Property>;

  /**
   * The newly issued refresh token.
   */
  refreshToken?: string;

  /**
   * The scopes associated with the refresh token. May be null.
   */
  refreshTokenScopes?: Array<string>;

  /**
   * The code which represents the result of the API call.
   */
  resultCode?: string;

  /**
   * A short message which explains the result of the API call.
   */
  resultMessage?: string;

  /**
   * Scopes which are associated with the access token.
   */
  scopes?: Array<string>;

  /**
   * The subject (= unique identifier) of the user associated with the newly issued
   * access token.
   */
  subject?: string;

  /**
   * Set the unique token identifier.
   */
  tokenId?: string;

  /**
   * The token type of the access token.
   */
  tokenType?: string;
}

export interface TokenUpdateResponse {
  /**
   * The access token which has been specified by the request.
   */
  accessToken?: string;

  /**
   * The date at which the access token will expire.
   */
  accessTokenExpiresAt?: number;

  /**
   * The next action that the authorization server implementation should take.
   */
  action?: 'INTERNAL_SERVER_ERROR' | 'BAD_REQUEST' | 'FORBIDDEN' | 'NOT_FOUND' | 'OK';

  /**
   * The authorization details. This represents the value of the
   * `authorization_details` request parameter in the preceding device authorization
   * request which is defined in "OAuth 2.0 Rich Authorization Requests".
   */
  authorizationDetails?: AuthorizationAPI.AuthorizationDetails;

  /**
   * the flag which indicates whether the access token is for an external attachment.
   */
  forExternalAttachment?: boolean;

  /**
   * The extra properties associated with the access token.
   */
  properties?: Array<AuthorizationAPI.Property>;

  /**
   * The datetime at which the newly issued refresh token will expire. The value is
   * represented in milliseconds since the Unix epoch (1970-01-01).
   */
  refreshTokenExpiresAt?: number;

  /**
   * The code which represents the result of the API call.
   */
  resultCode?: string;

  /**
   * A short message which explains the result of the API call.
   */
  resultMessage?: string;

  /**
   * The scopes associated with the access token.
   */
  scopes?: Array<string>;

  /**
   * Set the unique token identifier.
   */
  tokenId?: string;

  /**
   * The token type associated with the access token.
   */
  tokenType?: string;
}

export interface TokenFailResponse {
  /**
   * The next action that the authorization server implementation should take.
   */
  action?: 'INTERNAL_SERVER_ERROR' | 'BAD_REQUEST';

  /**
   * The content that the authorization server implementation is to return to the
   * client application. Its format varies depending on the value of `action`
   * parameter. See description for details.
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

export interface TokenIssueResponse {
  /**
   * The newly issued access token. This parameter is a non-null value only when the
   * value of `action` parameter is `OK`.
   */
  accessToken?: string;

  /**
   * The duration of the newly issued access token in seconds.
   */
  accessTokenDuration?: number;

  /**
   * The datetime at which the newly issued access token will expire. The value is
   * represented in milliseconds since the Unix epoch (1970-01-01).
   */
  accessTokenExpiresAt?: number;

  /**
   * The target resources of the access token being issued. See "Resource Indicators
   * for OAuth 2.0" for details.
   */
  accessTokenResources?: Array<string>;

  /**
   * The next action that the authorization server implementation should take.
   */
  action?: 'INTERNAL_SERVER_ERROR' | 'OK';

  /**
   * The authorization details. This represents the value of the
   * `authorization_details` request parameter in the preceding device authorization
   * request which is defined in "OAuth 2.0 Rich Authorization Requests".
   */
  authorizationDetails?: AuthorizationAPI.AuthorizationDetails;

  /**
   * The attributes of the client.
   */
  clientAttributes?: Array<Pair>;

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
   * The client ID alias. If the client did not have an alias, this parameter is
   * `null`.
   */
  clientIdAlias?: string;

  /**
   * The flag which indicates whether the client ID alias was used when the token
   * request was made. `true` if the client ID alias was used when the token request
   * was made.
   */
  clientIdAliasUsed?: boolean;

  /**
   * The newly issued access token in JWT format. If the authorization server is
   * configured to issue JWT-based access tokens (= if the service's
   * `accessTokenSignAlg` value is a non-null value), a JWT-based access token is
   * issued along with the original random-string one.
   */
  jwtAccessToken?: string;

  /**
   * The extra properties associated with the access token. This parameter is `null`
   * when no extra property is associated with the issued access token.
   */
  properties?: Array<AuthorizationAPI.Property>;

  /**
   * The refresh token. This parameter is a non-null value only when `action` is `OK`
   * and the service supports the refresh token flow. If `refreshTokenKept` is set to
   * `false`, a new refresh token is issued and the old refresh token used in the
   * refresh token flow is invalidated. On the contrary, if `refreshTokenKept` is set
   * to `true`, the refresh token itself is not refreshed.
   */
  refreshToken?: string;

  /**
   * The duration of the newly issued refresh token in seconds.
   */
  refreshTokenDuration?: number;

  /**
   * The datetime at which the newly issued refresh token will expire. The value is
   * represented in milliseconds since the Unix epoch (1970-01-01).
   */
  refreshTokenExpiresAt?: number;

  /**
   * The scopes associated with the refresh token. May be null.
   */
  refreshTokenScopes?: Array<string>;

  /**
   * The content that the authorization server implementation is to return to the
   * client application. Its format is JSON.
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
  serviceAttributes?: Array<Pair>;

  /**
   * The subject (= resource owner's ID) of the access token. Even if an access token
   * has been issued by calling `/api/auth/token` API, this parameter is `null` if
   * the flow of the token request was
   * [Client Credentials Flow](https://datatracker.ietf.org/doc/html/rfc6749#section-4.4)
   * (`grant_type=client_credentials`) because it means the access token is not
   * associated with any specific end-user.
   */
  subject?: string;
}

export interface TokenProcessResponse {
  /**
   * The newly issued access token.
   */
  accessToken?: string;

  /**
   * The duration of the newly issued access token in seconds.
   */
  accessTokenDuration?: number;

  /**
   * The datetime at which the newly issued access token will expire. The value is
   * represented in milliseconds since the Unix epoch (1970-01-01).
   */
  accessTokenExpiresAt?: number;

  /**
   * The target resources of the access token being issued. See "Resource Indicators
   * for OAuth 2.0" for details.
   */
  accessTokenResources?: Array<string>;

  /**
   * The next action that the authorization server implementation should take.
   */
  action?:
    | 'INTERNAL_SERVER_ERROR'
    | 'INVALID_CLIENT'
    | 'BAD_REQUEST'
    | 'PASSWORD'
    | 'OK'
    | 'TOKEN_EXCHANGE'
    | 'JWT_BEARER';

  actorToken?: string;

  actorTokenInfo?: TokenProcessResponse.ActorTokenInfo;

  /**
   * The grant type of the access token when the access token was created.
   */
  actorTokenType?:
    | 'urn:ietf:params:oauth:token-type:jwt'
    | 'urn:ietf:params:oauth:token-type:access_token'
    | 'urn:ietf:params:oauth:token-type:refresh_token'
    | 'urn:ietf:params:oauth:token-type:id_token'
    | 'urn:ietf:params:oauth:token-type:saml1'
    | 'urn:ietf:params:oauth:token-type:saml2'
    | 'DEVICE_CODE'
    | 'TOKEN_EXCHANGE'
    | 'JWT_BEARER';

  /**
   * For RFC 7523 JSON Web Token (JWT) Profile for OAuth 2.0 Client Authentication
   * and Authorization Grants
   */
  assertion?: string;

  /**
   * The audiences on the token exchange request
   */
  audiences?: Array<string>;

  /**
   * The authorization details. This represents the value of the
   * `authorization_details` request parameter in the preceding device authorization
   * request which is defined in "OAuth 2.0 Rich Authorization Requests".
   */
  authorizationDetails?: AuthorizationAPI.AuthorizationDetails;

  /**
   * The attributes of the client.
   */
  clientAttributes?: Array<Pair>;

  /**
   * The client authentication method that was performed at the token endpoint.
   */
  clientAuthMethod?: string;

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
   * Get the `c_nonce`.
   */
  cnonce?: string;

  /**
   * Duration of the `c_nonce` in seconds.
   */
  cnonceDuration?: number;

  /**
   * Get the time at which the `c_nonce` expires in milliseconds since the Unix epoch
   * (1970-01-01).
   */
  cnonceExpiresAt?: number;

  /**
   * Get the expected nonce value for DPoP proof JWT, which should be used as the
   * value of the `DPoP-Nonce` HTTP header.
   */
  dpopNonce?: string;

  /**
   * the value of the `grant_id` request parameter of the device authorization
   * request.
   *
   * The `grant_id` request parameter is defined in
   * [Grant Management for OAuth 2.0](https://openid.net/specs/fapi-grant-management.html)
   * , which is supported by Authlete 2.3 and newer versions.
   */
  grantId?: string;

  /**
   * The grant type of the token request.
   */
  grantType?: string;

  /**
   * The newly issued ID token. Note that an ID token is issued from a token endpoint
   * only when the `response_type` request parameter of the authorization request to
   * an authorization endpoint has contained `code` and the `scope` request parameter
   * has contained `openid`.
   */
  idToken?: string;

  /**
   * The newly issued access token in JWT format. If the authorization server is
   * configured to issue JWT-based access tokens (= if the service's
   * `accessTokenSignAlg` value is a non-null value), a JWT-based access token is
   * issued along with the original random-string one.
   */
  jwtAccessToken?: string;

  /**
   * The value of `password` request parameter in the token request. The client
   * application must specify password when it uses
   * [Resource Owner Password Grant](https://datatracker.ietf.org/doc/html/rfc6749#section-4.3).
   * In other words, when the value of `grant_type` request parameter is `password`,
   * `password` request parameter must come along.
   *
   * This parameter has a value only if the value of `grant_type` request parameter
   * is `password` and the token request is valid.
   */
  password?: string;

  /**
   * Indicate whether the previous refresh token that had been kept in the database
   * for a short time was used
   */
  previousRefreshTokenUsed?: boolean;

  /**
   * The extra properties associated with the access token. This parameter is `null`
   * when no extra property is associated with the issued access token.
   */
  properties?: Array<AuthorizationAPI.Property>;

  /**
   * The newly issued refresh token.
   */
  refreshToken?: string;

  /**
   * The duration of the newly issued refresh token in seconds.
   */
  refreshTokenDuration?: number;

  /**
   * The datetime at which the newly issued refresh token will expire. The value is
   * represented in milliseconds since the Unix epoch (1970-01-01).
   */
  refreshTokenExpiresAt?: number;

  /**
   * Scopes associated with the refresh token.
   */
  refreshTokenScopes?: Array<string>;

  /**
   * Get the names of the claims that the authorization request (which resulted in
   * generation of the access token) requested to be embedded in ID tokens.
   */
  requestedIdTokenClaims?: Array<string>;

  requestedTokenType?: unknown;

  /**
   * The resources specified by the `resource` request parameters in the token
   * request. See "Resource Indicators for OAuth 2.0" for details.
   */
  resources?: Array<string>;

  /**
   * The content that the authorization server implementation is to return to the
   * client application. Its format varies depending on the value of `action`
   * parameter.
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
  serviceAttributes?: Array<Pair>;

  /**
   * The subject (= resource owner's ID) of the access token. Even if an access token
   * has been issued by the call of `/api/auth/token` API, this parameter is `null`
   * if the flow of the token request was
   * [Client Credentials Flow](https://datatracker.ietf.org/doc/html/rfc6749#section-4.4)
   * (`grant_type=client_credentials`) because it means the access token is not
   * associated with any specific end-user.
   */
  subject?: string;

  subjectToken?: string;

  subjectTokenInfo?: unknown;

  subjectTokenType?: unknown;

  /**
   * The ticket which is necessary to call Authlete's `/auth/token/fail` API or
   * `/auth/token/issue` API.
   *
   * This parameter has a value only if the value of `grant_type` request parameter
   * is `password` and the token request is valid.
   */
  ticket?: string;

  /**
   * The value of `username` request parameter in the token request. The client
   * application must specify username when it uses
   * [Resource Owner Password Grant](https://datatracker.ietf.org/doc/html/rfc6749#section-4.3).
   * In other words, when the value of `grant_type` request parameter is `password`,
   * `username` request parameter must come along.
   *
   * This parameter has a value only if the value of `grant_type` request parameter
   * is `password` and the token request is valid.
   */
  username?: string;
}

export namespace TokenProcessResponse {
  export interface ActorTokenInfo {
    authorizationDetails?: TokenAPI.AuthorizationDetailsElement;

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
     * The client id.
     */
    clientId?: number;

    /**
     * The alias of the client.
     */
    clientIdAlias?: string;

    /**
     * Flag specifying if the alias was used to identify the client
     */
    clientIdAliasUsed?: boolean;

    /**
     * time which the token expires.
     */
    expiresAt?: number;

    /**
     * Extra properties associated with the token
     */
    properties?: Array<AuthorizationAPI.Property>;

    /**
     * The array of the resources of the token.
     */
    resources?: Array<string>;

    /**
     * The scopes granted on the token
     */
    scopes?: Array<string>;

    /**
     * the resource owner unique id
     */
    subject?: string;
  }
}

export interface TokenRevokeResponse {
  /**
   * The number of tokens revoked
   */
  count?: number;

  /**
   * The code which represents the result of the API call.
   */
  resultCode?: string;

  /**
   * A short message which explains the result of the API call.
   */
  resultMessage?: string;
}

export interface TokenCreateParams {
  /**
   * The ID of the client application which will be associated with a newly created
   * access token.
   */
  clientId: number;

  /**
   * The grant type of the access token when the access token was created.
   */
  grantType: IntrospectionAPI.GrantType;

  /**
   * The value of the new access token.
   *
   * The `/api/auth/token/create` API generates an access token. Therefore, callers
   * of the API do not have to specify values of newly created access tokens.
   * However, in some cases, for example, if you want to migrate existing access
   * tokens from an old system to Authlete, you may want to specify values of access
   * tokens. In such a case, you can specify the value of a newly created access
   * token by passing a non-null value as the value of accessToken request parameter.
   * The implementation of the `/api/auth/token/create` uses the value of the
   * accessToken request parameter instead of generating a new value when the request
   * parameter holds a non-null value.
   *
   * Note that if the hash value of the specified access token already exists in
   * Authlete's database, the access token cannot be inserted and the
   * `/api/auth/token/create` API will report an error.
   */
  accessToken?: string;

  /**
   * The duration of a newly created access token in seconds. If the value is 0, the
   * duration is determined according to the settings of the service.
   */
  accessTokenDuration?: number;

  /**
   * Get whether the access token expires or not. By default, all access tokens
   * expire after a period of time determined by their service.
   *
   * If this request parameter is `true`, then the access token will not
   * automatically expire and must be revoked or deleted manually at the service. If
   * this request parameter is true, the `accessTokenDuration` request parameter is
   * ignored.
   */
  accessTokenPersistent?: boolean;

  /**
   * The Authentication Context Class Reference of the user authentication that the
   * authorization server performed during the course of issuing the access token.
   */
  acr?: string;

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
   * The thumbprint of the MTLS certificate bound to this token. If this property is
   * set, a certificate with the corresponding value MUST be presented with the
   * access token when it is used by a client. The value of this property must be a
   * SHA256 certificate thumbprint, base64url encoded.
   */
  certificateThumbprint?: string;

  /**
   * Flag which indicates whether the entity ID of the client was used when the
   * request for the access token was made.
   */
  clientEntityIdUsed?: boolean;

  /**
   * A boolean request parameter which indicates whether to emulate that the client
   * ID alias is used instead of the original numeric client ID when a new access
   * token is created.
   *
   * This has an effect only on the value of the aud claim in a response from
   * [UserInfo endpoint](https://openid.net/specs/openid-connect-core-1_0.html#UserInfo).
   * When you access the UserInfo endpoint (which is expected to be implemented using
   * Authlete's `/api/auth/userinfo` API and `/api/auth/userinfo/issue` API) with an
   * access token which has been created using Authlete's `/api/auth/token/create`
   * API with this property (`clientIdAliasUsed`) `true`, the client ID alias is used
   * as the value of the aud claim in a response from the UserInfo endpoint.
   *
   * Note that if a client ID alias is not assigned to the client when Authlete's
   * `/api/auth/token/create` API is called, this property (`clientIdAliasUsed`) has
   * no effect (it is always regarded as `false`).
   */
  clientIdAliasUsed?: boolean;

  /**
   * The thumbprint of the public key used for DPoP presentation of this token. If
   * this property is set, a DPoP proof signed with the corresponding private key
   * MUST be presented with the access token when it is used by a client.
   * Additionally, the token's `token_type` will be set to 'DPoP'.
   */
  dpopKeyThumbprint?: string;

  /**
   * the flag which indicates whether the access token is for an external attachment.
   */
  forExternalAttachment?: boolean;

  /**
   * Additional claims that are added to the payload part of the JWT access token.
   */
  jwtAtClaims?: string;

  /**
   * Extra properties to associate with a newly created access token. Note that
   * properties parameter is accepted only when the HTTP method of the request is
   * POST and Content-Type of the request is `application/json`, so don't use `GET`
   * method or `application/x-www-form-urlencoded` if you want to specify properties.
   */
  properties?: Array<AuthorizationAPI.Property>;

  /**
   * The value of the new refresh token.
   *
   * The `/api/auth/token/create` API may generate a refresh token. Therefore,
   * callers of the API do not have to specify values of newly created refresh
   * tokens. However, in some cases, for example, if you want to migrate existing
   * refresh tokens from an old system to Authlete, you may want to specify values of
   * refresh tokens. In such a case, you can specify the value of a newly created
   * refresh token by passing a non-null value as the value of refreshToken request
   * parameter. The implementation of the `/api/auth/token/create` uses the value of
   * the refreshToken request parameter instead of generating a new value when the
   * request parameter holds a non-null value.
   *
   * Note that if the hash value of the specified refresh token already exists in
   * Authlete's database, the refresh token cannot be inserted and the
   * `/api/auth/token/create` API will report an error.
   */
  refreshToken?: string;

  /**
   * The duration of a newly created refresh token in seconds. If the value is 0, the
   * duration is determined according to the settings of the service.
   *
   * A refresh token is not created (1) if the service does not support
   * `REFRESH_TOKEN`, or (2) if the specified grant type is either `IMPLICIT`or
   * `CLIENT_CREDENTIALS`.
   */
  refreshTokenDuration?: number;

  /**
   * The value of the resources to associate with the token. This property represents
   * the value of one or more `resource` request parameters which is defined in
   * "RFC8707 Resource Indicators for OAuth 2.0".
   */
  resources?: Array<string>;

  /**
   * The scopes which will be associated with a newly created access token. Scopes
   * that are not supported by the service cannot be specified and requesting them
   * will cause an error.
   */
  scopes?: Array<string>;

  /**
   * The subject (= unique identifier) of the user who will be associated with a
   * newly created access token. This parameter is required unless the grant type is
   * `CLIENT_CREDENTIALS`. The value must consist of only ASCII characters and its
   * length must not exceed 100.
   */
  subject?: string;
}

export interface TokenUpdateParams {
  /**
   * An access token.
   */
  accessToken: string;

  /**
   * A new date at which the access token will expire in milliseconds since the Unix
   * epoch (1970-01-01). If the `accessTokenExpiresAt` request parameter is not
   * included in a request or its value is 0 (or negative), the expiration date of
   * the access token is not changed.
   */
  accessTokenExpiresAt?: number;

  /**
   * A boolean request parameter which indicates whether the API attempts to update
   * the expiration date of the access token when the scopes linked to the access
   * token are changed by this request.
   */
  accessTokenExpiresAtUpdatedOnScopeUpdate?: boolean;

  /**
   * The hash of the access token value. Used when the hash of the token is known
   * (perhaps from lookup) but the value of the token itself is not. The value of the
   * `accessToken` parameter takes precedence.
   */
  accessTokenHash?: string;

  /**
   * The flag which indicates whether the access token expires or not. By default,
   * all access tokens expire after a period of time determined by their service. If
   * this request parameter is `true` then the access token will not automatically
   * expire and must be revoked or deleted manually at the service.
   *
   * If this request parameter is `true`, the `accessTokenExpiresAt` request
   * parameter is ignored. If this request parameter is `false`, the
   * `accessTokenExpiresAt` request parameter is processed normally.
   */
  accessTokenPersistent?: boolean;

  /**
   * A boolean request parameter which indicates whether to update the value of the
   * access token in the data store. If this parameter is set to `true` then a new
   * access token value is generated by the server and returned in the response.
   */
  accessTokenValueUpdated?: boolean;

  /**
   * The authorization details. This represents the value of the
   * `authorization_details` request parameter in the preceding device authorization
   * request which is defined in "OAuth 2.0 Rich Authorization Requests".
   */
  authorizationDetails?: AuthorizationAPI.AuthorizationDetails;

  /**
   * The thumbprint of the MTLS certificate bound to this token. If this property is
   * set, a certificate with the corresponding value MUST be presented with the
   * access token when it is used by a client. The value of this property must be a
   * SHA256 certificate thumbprint, base64url encoded.
   */
  certificateThumbprint?: string;

  /**
   * The thumbprint of the public key used for DPoP presentation of this token. If
   * this property is set, a DPoP proof signed with the corresponding private key
   * MUST be presented with the access token when it is used by a client.
   * Additionally, the token's `token_type` will be set to 'DPoP'.
   */
  dpopKeyThumbprint?: string;

  /**
   * the flag which indicates whether the access token is for an external attachment.
   */
  forExternalAttachment?: boolean;

  /**
   * A new set of properties assigned to the access token. If the `properties`
   * request parameter is not included in a request or its value is null, the
   * properties of the access token are not changed.
   */
  properties?: Array<AuthorizationAPI.Property>;

  /**
   * A new set of scopes assigned to the access token. Scopes that are not supported
   * by the service and those that the client application associated with the access
   * token is not allowed to request are ignored on the server side. If the `scopes`
   * request parameter is not included in a request or its value is `null`, the
   * scopes of the access token are not changed. Note that `properties` parameter is
   * accepted only when `Content-Type` of the request is `application/json`, so don't
   * use `application/x-www-form-urlencoded` if you want to specify `properties`.
   */
  scopes?: Array<string>;
}

export interface TokenDeleteParams {
  /**
   * A service ID.
   */
  serviceId: string;
}

export interface TokenFailParams {
  /**
   * The reason of the failure of the token request.
   */
  reason: 'UNKNOWN' | 'INVALID_RESOURCE_OWNER_CREDENTIALS' | 'INVALID_TARGET';

  /**
   * The ticket issued from Authlete `/auth/token` API.
   */
  ticket: string;
}

export interface TokenIssueParams {
  /**
   * The subject (= unique identifier) of the authenticated user.
   */
  subject: string;

  /**
   * The ticket issued from Authlete `/auth/token` API.
   */
  ticket: string;

  /**
   * The representation of an access token that may be issued as a result of the
   * Authlete API call.
   */
  accessToken?: string;

  /**
   * Additional claims that are added to the payload part of the JWT access token.
   */
  jwtAtClaims?: string;

  /**
   * Extra properties to associate with a newly created access token. Note that
   * properties parameter is accepted only when `Content-Type` of the request is
   * `application/json`, so don't use `application/x-www-form-urlencoded` if you want
   * to specify properties.
   */
  properties?: Array<AuthorizationAPI.Property>;
}

export interface TokenProcessParams {
  /**
   * OAuth 2.0 token request parameters which are the request parameters that the
   * OAuth 2.0 token endpoint of the authorization server implementation received
   * from the client application.
   *
   * The value of parameters is the entire entity body (which is formatted in
   * `application/x-www-form-urlencoded`) of the request from the client application.
   */
  parameters: string;

  /**
   * The representation of an access token that may be issued as a result of the
   * Authlete API call.
   */
  accessToken?: string;

  /**
   * The client certificate from the MTLS of the token request from the client
   * application.
   */
  clientCertificate?: string;

  /**
   * The certificate path presented by the client during client authentication. These
   * certificates are strings in PEM format.
   */
  clientCertificatePath?: string;

  /**
   * The client ID extracted from `Authorization` header of the token request from
   * the client application.
   *
   * If the token endpoint of the authorization server implementation supports basic
   * authentication as a means of client authentication, and the request from the
   * client application contained its client ID in `Authorization` header, the value
   * should be extracted and set to this parameter.
   */
  clientId?: string;

  /**
   * The client secret extracted from `Authorization` header of the token request
   * from the client application.
   *
   * If the token endpoint of the authorization server implementation supports basic
   * authentication as a means of client authentication, and the request from the
   * client application contained its client secret in `Authorization` header, the
   * value should be extracted and set to this parameter.
   */
  clientSecret?: string;

  /**
   * `DPoP` header presented by the client during the request to the token endpoint.
   *
   * The header contains a signed JWT which includes the public key that is paired
   * with the private key used to sign the JWT. See
   * [OAuth 2.0 Demonstration of Proof-of-Possession at the Application Layer (DPoP)](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-dpop)
   * for details.
   */
  dpop?: string;

  /**
   * HTTP method of the token request. This field is used to validate the `DPoP`
   * header.
   *
   * In normal cases, the value is `POST`. When this parameter is omitted, `POST` is
   * used as the default value. See
   * [OAuth 2.0 Demonstration of Proof-of-Possession at the Application Layer (DPoP)](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-dpop)
   * for details.
   */
  htm?: string;

  /**
   * URL of the token endpoint. This field is used to validate the `DPoP` header.
   *
   * If this parameter is omitted, the `tokenEndpoint` property of the Service is
   * used as the default value. See
   * [OAuth 2.0 Demonstration of Proof-of-Possession at the Application Layer (DPoP)](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-dpop)
   * for details.
   */
  htu?: string;

  /**
   * Additional claims that are added to the payload part of the JWT access token.
   */
  jwtAtClaims?: string;

  /**
   * Extra properties to associate with an access token. See
   * [Extra Properties](https://www.authlete.com/developers/definitive_guide/extra_properties/)
   * for details.
   */
  properties?: string;
}

export interface TokenRevokeParams {
  /**
   * The identifier of an access token to revoke
   *
   * The hash of an access token is recognized as an identifier as well as the access
   * token itself.
   */
  accessTokenIdentifier?: string;

  /**
   * The client ID of the access token to be revoked.
   *
   * Both the numeric client ID and the alias are recognized as an identifier of a
   * client.
   */
  clientIdentifier?: string;

  /**
   * The identifier of a refresh token to revoke.
   *
   * The hash of a refresh token is recognized as an identifier as well as the
   * refresh token itself.
   */
  refreshTokenIdentifier?: string;

  /**
   * The subject of a resource owner.
   */
  subject?: string;
}

Token.Get = Get;

export declare namespace Token {
  export {
    type AuthorizationDetailsElement as AuthorizationDetailsElement,
    type Pair as Pair,
    type TokenCreateResponse as TokenCreateResponse,
    type TokenUpdateResponse as TokenUpdateResponse,
    type TokenFailResponse as TokenFailResponse,
    type TokenIssueResponse as TokenIssueResponse,
    type TokenProcessResponse as TokenProcessResponse,
    type TokenRevokeResponse as TokenRevokeResponse,
    type TokenCreateParams as TokenCreateParams,
    type TokenUpdateParams as TokenUpdateParams,
    type TokenDeleteParams as TokenDeleteParams,
    type TokenFailParams as TokenFailParams,
    type TokenIssueParams as TokenIssueParams,
    type TokenProcessParams as TokenProcessParams,
    type TokenRevokeParams as TokenRevokeParams,
  };

  export { Get as Get, type GetListResponse as GetListResponse, type GetListParams as GetListParams };
}
