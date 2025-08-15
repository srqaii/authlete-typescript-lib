// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as AuthorizationAPI from './auth/authorization/authorization';
import * as TokenAPI from './auth/token/token';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Device extends APIResource {
  /**
   * This API parses request parameters of a
   * [device authorization request](https://datatracker.ietf.org/doc/html/rfc8628#section-3.1)
   * and returns necessary data for the authorization server implementation to
   * process the device authorization request further.
   *
   * <details>
   * <summary>Description</summary>
   *
   * This API is supposed to be called from the within the implementation of the
   * device authorization endpoint of the service. The service implementation should
   * retrieve the value of `action` from the response and take the following steps
   * according to the value.
   *
   * **INTERNAL_SERVER_ERROR**
   *
   * When the value of `action` is `INTERNAL_SERVER_ERROR`, it means that the API
   * call from the authorization server implementation was wrong or that an error
   * occurred in Authlete.
   *
   * In either case, from a viewpoint of the client application, it is an error on
   * the server side. Therefore, the authorization server implementation should
   * generate a response to the client application with "500 Internal Server Error"s
   * and `application/json`.
   *
   * The value of `responseContent` is a JSON string which describes t he error, so
   * it can be used as the entity body of the response.
   *
   * The following illustrates the response which the authorization server
   * implementation should generate and return to the client application.
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
   * client application is wrong.
   *
   * The authorization server implementation should generate a response to the client
   * application with "400 Bad Request" and `application/json`.
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
   * **UNAUTHORIZED**
   *
   * When the value of `action` is `UNAUTHORIZED`, it means that client
   * authentication of the device authorization request failed.
   *
   * The authorization server implementation should generate a response to the client
   * application with "401 Unauthorized" and `application/json`.
   *
   * The value of `responseContent` is a JSON string which describes the error, so it
   * can be used as the entity body of the response.
   *
   * The following illustrates the response which the service implementation must
   * generate and return to the client application.
   *
   * ```
   * HTTP/1.1 401 Unauthorized
   * WWW-Authenticate: (challenge)
   * Content-Type: application/json
   * Cache-Control: no-store
   * Pragma: no-cache
   *
   * {responseContent}
   * ```
   *
   * **OK**
   *
   * When the value of `action` is `OK`, it means that the device authorization
   * request from the client application is valid.
   *
   * The authorization server implementation should generate a response to the client
   * application with "200 OK" and `application/json`.
   *
   * The `responseContent` is a JSON string which can be used as the entity body of
   * the response.
   *
   * The following illustrates the response which the authorization server
   * implementation should generate and return to the client application.
   *
   * </details>
   *
   * @example
   * ```ts
   * const response = await client.device.authorize(
   *   'serviceId',
   *   {
   *     parameters:
   *       'client_id=26888344961664&scope=history.read',
   *     clientId: '26888344961664',
   *     clientSecret:
   *       'SfnYOLkJdofrb_66mTd6q03_SDoDEUnpXtvqFaE4k6L6UcpZzbdVJi2GpBj48AvGeDDllwsTruC62WYqQ_LGog',
   *   },
   * );
   * ```
   */
  authorize(
    serviceID: string,
    body: DeviceAuthorizeParams,
    options?: RequestOptions,
  ): APIPromise<DeviceAuthorizeResponse> {
    return this._client.post(path`/api/${serviceID}/device/authorization`, { body, ...options });
  }

  /**
   * This API returns information about what action the authorization server should
   * take after it receives the result of end-user's decision about whether the
   * end-user has approved or rejected a client application's request.
   *
   * <details>
   * <summary>Description</summary>
   *
   * In the device flow, an end-user accesses the verification endpoint of the
   * authorization server where she interacts with the verification endpoint and
   * inputs a user code. The verification endpoint checks if the user code is valid
   * and then asks the end-user whether she approves or rejects the authorization
   * request which the user code represents.
   *
   * After the authorization server receives the decision of the end-user, it should
   * call Authlete's `/device/complete` API to tell Authlete the decision.
   *
   * When the end-user was authenticated and authorization was granted to the client
   * by the end-user, the authorization server should call the API with
   * `result=AUTHORIZED`. In this successful case, the subject request parameter is
   * mandatory. The API will update the database record so that `/auth/token` API can
   * generate an access token later.
   *
   * If the `scope` parameter of the device authorization request included the openid
   * scope, an ID token is generated. In this case, `sub`, `authTime`, `acr` and
   * `claims` request parameters in the API call to `/device/complete` affect the ID
   * token.
   *
   * When the authorization server receives the decision of the end-user and it
   * indicates that she has rejected to give authorization to the client, the
   * authorization server should call the API with `result=ACCESS_DENIED`. In this
   * case, the API will update the database record so that the `/auth/token` API can
   * generate an error response later. If `errorDescription` and `errorUri` request
   * parameters are given to the `/device/complete` API, they will be used as the
   * values of `error_description` and `error_uri` response parameters in the error
   * response from the token endpoint.
   *
   * When the authorization server could not get decision from the end-user for some
   * reasons, the authorization server should call the API with
   * `result=TRANSACTION_FAILED`. In this error case, the API will behave in the same
   * way as in the case of `ACCESS_DENIED`. The only difference is that
   * `expired_token` is used as the value of the `error` response parameter instead
   * of `access_denied`.
   *
   * After receiving a response from the `/device/complete` API, the implementation
   * of the authorization server should retrieve the value of `action` from the
   * response and take the following steps according to the value.
   *
   * **SERVER_ERROR**
   *
   * When the value of `action` is `SERVER_ERROR`, it means that an error occurred on
   * Authlete side. The authorization server implementation should tell the end-user
   * that something wrong happened and urge her to re-initiate a device flow.
   *
   * **USER_CODE_NOT_EXIST**
   *
   * When the value of `action` is `USER_CODE_NOT_EXIST`, it means that the user code
   * included in the API call does not exist. The authorization server implementation
   * should tell the end-user that the user code has been invalidated and urge her to
   * re-initiate a device flow.
   *
   * **USER_CODE_EXPIRED**
   *
   * When the value of `action` is `USER_CODE_EXPIRED`, it means that the user code
   * included in the API call has expired. The authorization server implementation
   * should tell the end-user that the user code has expired and urge her to
   * re-initiate a device flow.
   *
   * **INVALID_REQUEST**
   *
   * When the value of `action` is `INVALID_REQUEST`, it means that the API call is
   * invalid. Probably, the authorization server implementation has some bugs.
   *
   * **SUCCESS**
   *
   * When the value of `action` is `SUCCESS`, it means that the API call has been
   * processed successfully. The authorization server should return a successful
   * response to the web browser the end-user is using.
   *
   * </details>
   *
   * @example
   * ```ts
   * const response = await client.device.completeAuthorization(
   *   'serviceId',
   *   {
   *     result: 'AUTHORIZED',
   *     subject: 'john',
   *     userCode: 'XWWKPBWVXQ',
   *   },
   * );
   * ```
   */
  completeAuthorization(
    serviceID: string,
    body: DeviceCompleteAuthorizationParams,
    options?: RequestOptions,
  ): APIPromise<DeviceCompleteAuthorizationResponse> {
    return this._client.post(path`/api/${serviceID}/device/complete`, { body, ...options });
  }

  /**
   * The API returns information associated with a user code.
   *
   * <details>
   * <summary>Description</summary>
   *
   * After receiving a response from the device authorization endpoint of the
   * authorization server, the client application shows the end-user the user code
   * and the verification URI which are included in the device authorization
   * response. Then, the end-user will access the verification URI using a web
   * browser on another device (typically, a smart phone). In normal implementations,
   * the verification endpoint will return an HTML page with an input form where the
   * end-user inputs a user code. The authorization server will receive a user code
   * from the form.
   *
   * After receiving a user code, the authorization server should call Authlete's
   * `/device/verification` API with the user code. And then, the authorization
   * server implementation should retrieve the value of `action` parameter from the
   * API response and take the following steps according to the value.
   *
   * **SERVER_ERROR**
   *
   * When the value of `action` is `SERVER_ERROR`, it means that an error occurred on
   * Authlete side. The authorization server implementation should tell the end-user
   * that something wrong happened and urge her to re-initiate a device flow.
   *
   * **NOT_EXIST**
   *
   * When the value of `action` is `NOT_EXIST`, it means that the user code does not
   * exist. The authorization server implementation should tell the end-user that the
   * user code is invalid and urge her to retry to input a valid user code.
   *
   * **EXPIRED**
   *
   * When the value of `action` is `EXPIRED`, it means that the user code has
   * expired. The authorization server implementation should tell the end-user that
   * the user code has expired and urge her to re-initiate a device flow.
   *
   * **VALID**
   *
   * When the value of `action` is `VALID`, it means that the user code exists, has
   * not expired, and belongs to the service. The authorization server implementation
   * should interact with the end-user to ask whether she approves or rejects the
   * authorization request from the device.
   *
   * </details>
   *
   * @example
   * ```ts
   * const response = await client.device.verify('serviceId', {
   *   userCode: 'XWWKPBWVXQ',
   * });
   * ```
   */
  verify(
    serviceID: string,
    body: DeviceVerifyParams,
    options?: RequestOptions,
  ): APIPromise<DeviceVerifyResponse> {
    return this._client.post(path`/api/${serviceID}/device/verification`, { body, ...options });
  }
}

export interface DeviceAuthorizeResponse {
  /**
   * The list of ACR values requested by the device authorization request.
   *
   * Basically, this property holds the value of the `acr_values` request parameter
   * in the device authorization request. However, because unsupported ACR values are
   * dropped on Authlete side, if the `acr_values` request parameter contains
   * unrecognized ACR values, the list returned by this property becomes different
   * from the value of the `acr_values` request parameter.
   */
  acrs?: Array<string>;

  /**
   * The next action that the authorization server implementation should take.
   */
  action?: 'INTERNAL_SERVER_ERROR' | 'BAD_REQUEST' | 'UNAUTHORIZED' | 'OK';

  /**
   * The authorization details. This represents the value of the
   * `authorization_details` request parameter in the preceding device authorization
   * request which is defined in "OAuth 2.0 Rich Authorization Requests".
   */
  authorizationDetails?: AuthorizationAPI.AuthorizationDetails;

  /**
   * The names of the claims which were requested indirectly via some special scopes.
   * See
   * [5.4. Requesting Claims using Scope Values](https://openid.net/specs/openid-connect-core-1_0.html#ScopeClaims)
   * in OpenID Connect Core 1.0 for details.
   */
  claimNames?: Array<string>;

  /**
   * The attributes of the client.
   */
  clientAttributes?: Array<TokenAPI.Pair>;

  /**
   * The client authentication method that should be performed at the device
   * authorization endpoint.
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
   * The client ID of the client application that has made the device authorization
   * request.
   */
  clientId?: number;

  /**
   * The client ID alias of the client application that has made the device
   * authorization request.
   */
  clientIdAlias?: string;

  /**
   * `true` if the value of the client_id request parameter included in the device
   * authorization request is the client ID alias. `false` if the value is the
   * original numeric client ID.
   */
  clientIdAliasUsed?: boolean;

  /**
   * The name of the client application which has made the device authorization
   * request.
   */
  clientName?: string;

  /**
   * The device verification code. This corresponds to the `device_code` property in
   * the response to the client.
   */
  deviceCode?: string;

  /**
   * The dynamic scopes which the client application requested by the scope request
   * parameter.
   */
  dynamicScopes?: Array<AuthorizationAPI.DynamicScope>;

  /**
   * The duration of the device verification code in seconds. This corresponds to the
   * `expires_in` property in the response to the client.
   */
  expiresIn?: number;

  gmAction?: AuthorizationAPI.GmAction;

  grant?: unknown;

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
   * The subject identifying the user who has given the grant identified by the
   * `grant_id` request parameter of the device authorization request.
   *
   * Authlete 2.3 and newer versions support <a href=
   * "https://openid.net/specs/fapi-grant-management.html">Grant Management for OAuth
   * 2.0</a>. An authorization request may contain a `grant_id` request parameter
   * which is defined in the specification. If the value of the request parameter is
   * valid, {@link #getGrantSubject()} will return the subject of the user who has
   * given the grant to the client application. Authorization server implementations
   * may use the value returned from {@link #getGrantSubject()} in order to determine
   * the user to authenticate.
   *
   * The user your system will authenticate during the authorization process (or has
   * already authenticated) may be different from the user of the grant. The first
   * implementer's draft of "Grant Management for OAuth 2.0" does not mention
   * anything about the case, so the behavior in the case is left to implementations.
   * Authlete will not perform the grant management action when the `subject` passed
   * to Authlete does not match the user of the grant.
   */
  grantSubject?: string;

  /**
   * The minimum amount of time in seconds that the client must wait for between
   * polling requests to the token endpoint. This corresponds to the `interval`
   * property in the response to the client.
   */
  interval?: number;

  /**
   * The resources specified by the `resource` request parameters. See "Resource
   * Indicators for OAuth 2.0" for details.
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
   * The scopes requested by the device authorization request.
   *
   * Basically, this property holds the value of the scope request parameter in the
   * device authorization request. However, because unregistered scopes are dropped
   * on Authlete side, if the `scope` request parameter contains unknown scopes, the
   * list returned by this property becomes different from the value of the `scope`
   * request parameter.
   *
   * Note that `description` property and `descriptions` property of each scope
   * object in the array contained in this property is always `null` even if
   * descriptions of the scopes are registered.
   */
  scopes?: Array<AuthorizationAPI.Scope>;

  /**
   * The attributes of this service that the client application belongs to.
   */
  serviceAttributes?: Array<TokenAPI.Pair>;

  /**
   * The end-user verification code. This corresponds to the `user_code` property in
   * the response to the client.
   */
  userCode?: string;

  /**
   * The end-user verification URI. This corresponds to the `verification_uri`
   * property in the response to the client.
   */
  verificationUri?: string;

  /**
   * The end-user verification URI that includes the end-user verification code. This
   * corresponds to the `verification_uri_complete` property in the response to the
   * client.
   */
  verificationUriComplete?: string;

  /**
   * The warnings raised during processing the backchannel authentication request.
   */
  warnings?: Array<string>;
}

export interface DeviceCompleteAuthorizationResponse {
  /**
   * The next action that the authorization server implementation should take.
   */
  action?: 'SERVER_ERROR' | 'USER_CODE_NOT_EXIST' | 'USER_CODE_EXPIRED' | 'INVALID_REQUEST' | 'SUCCESS';

  /**
   * The code which represents the result of the API call.
   */
  resultCode?: string;

  /**
   * A short message which explains the result of the API call.
   */
  resultMessage?: string;
}

export interface DeviceVerifyResponse {
  /**
   * The list of ACR values requested by the device authorization request.
   */
  acrs?: Array<string>;

  /**
   * The next action that the authorization server implementation should take.
   */
  action?: 'INTERNAL_SERVER_ERROR' | 'NOT_EXIST' | 'EXPIRED' | 'VALID';

  /**
   * The authorization details. This represents the value of the
   * `authorization_details` request parameter in the preceding device authorization
   * request which is defined in "OAuth 2.0 Rich Authorization Requests".
   */
  authorizationDetails?: AuthorizationAPI.AuthorizationDetails;

  /**
   * The names of the claims which were requested indirectly via some special scopes.
   * See
   * [5.4. Requesting Claims using Scope Values](https://openid.net/specs/openid-connect-core-1_0.html#ScopeClaims)
   * in OpenID Connect Core 1.0 for details.
   *
   * This property is always `null` if the `scope` request parameter of the device
   * authorization request does not include the `openid` scope even if special scopes
   * (such as `profile`) are included in the request (unless the openid scope is
   * included in the default set of scopes which is used when the `scope` request
   * parameter is omitted).
   */
  claimNames?: Array<string>;

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
   * The client ID of the client application to which the user code has been issued.
   */
  clientId?: number;

  /**
   * The client ID alias of the client application to which the user code has been
   * issued.
   */
  clientIdAlias?: string;

  /**
   * `true` if the value of the `client_id` request parameter included in the device
   * authorization request is the client ID alias. `false` if the value is the
   * original numeric client ID.
   */
  clientIdAliasUsed?: boolean;

  /**
   * The name of the client application to which the user code has been issued.
   */
  clientName?: string;

  /**
   * The dynamic scopes which the client application requested by the scope request
   * parameter.
   */
  dynamicScopes?: Array<AuthorizationAPI.DynamicScope>;

  /**
   * Get the date in milliseconds since the Unix epoch (1970-01-01) at which the user
   * code will expire.
   */
  expiresAt?: number;

  gmAction?: AuthorizationAPI.GmAction;

  grant?: unknown;

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
   * The subject identifying the user who has given the grant identified by the
   * `grant_id` request parameter of the device authorization request.
   *
   * Authlete 2.3 and newer versions support <a href=
   * "https://openid.net/specs/fapi-grant-management.html">Grant Management for OAuth
   * 2.0</a>. An authorization request may contain a `grant_id` request parameter
   * which is defined in the specification. If the value of the request parameter is
   * valid, {@link #getGrantSubject()} will return the subject of the user who has
   * given the grant to the client application. Authorization server implementations
   * may use the value returned from {@link #getGrantSubject()} in order to determine
   * the user to authenticate.
   *
   * The user your system will authenticate during the authorization process (or has
   * already authenticated) may be different from the user of the grant. The first
   * implementer's draft of "Grant Management for OAuth 2.0" does not mention
   * anything about the case, so the behavior in the case is left to implementations.
   * Authlete will not perform the grant management action when the `subject` passed
   * to Authlete does not match the user of the grant.
   */
  grantSubject?: string;

  /**
   * The resources specified by the `resource` request parameters or by the
   * `resource` property in the request object. If both are given, the values in the
   * request object should be set. See "Resource Indicators for OAuth 2.0" for
   * details.
   */
  resources?: Array<string>;

  /**
   * The code which represents the result of the API call.
   */
  resultCode?: string;

  /**
   * A short message which explains the result of the API call.
   */
  resultMessage?: string;

  /**
   * The scopes requested by the device authorization request.
   *
   * Note that `description` property and `descriptions` property of each scope
   * object in the array contained in this property is always null even if
   * descriptions of the scopes are registered.
   */
  scopes?: Array<AuthorizationAPI.Scope>;

  /**
   * The attributes of this service that the client application belongs to.
   */
  serviceAttributes?: Array<TokenAPI.Pair>;
}

export interface DeviceAuthorizeParams {
  /**
   * Parameters of a device authorization request which are the request parameters
   * that the device authorization endpoint of the authorization server
   * implementation received from the client application.
   *
   * The value of `parameters` is the entire entity body (which is formatted in
   * `application/x-www-form-urlencoded`) of the request from the client application.
   */
  parameters: string;

  /**
   * The client certificate used in the TLS connection between the client application
   * and the device authorization endpoint of the authorization server.
   */
  clientCertificate?: string;

  /**
   * The client certificate path presented by the client during client
   * authentication. Each element is a string in PEM format.
   */
  clientCertificatePath?: string;

  /**
   * The client ID extracted from Authorization header of the device authorization
   * request from the client application.
   *
   * If the device authorization endpoint of the authorization server implementation
   * supports Basic `Authentication` as a means of client authentication, and the
   * request from the client application contained its client ID in `Authorization`
   * header, the value should be extracted and set to this parameter.
   */
  clientId?: string;

  /**
   * The client secret extracted from `Authorization` header of the device
   * authorization request from the client application.
   *
   * If the device authorization endpoint of the authorization server implementation
   * supports Basic Authentication as a means of client authentication, and the
   * request from the client application contained its client secret in
   * `Authorization` header, the value should be extracted and set to this parameter.
   */
  clientSecret?: string;
}

export interface DeviceCompleteAuthorizationParams {
  /**
   * The result of the end-user authentication and authorization. One of the
   * following. Details are described in the description.
   */
  result: 'TRANSACTION_FAILED' | 'ACCESS_DENIED' | 'AUTHORIZED';

  /**
   * The subject (= unique identifier) of the end-user.
   */
  subject: string;

  /**
   * A user code.
   */
  userCode: string;

  /**
   * The reference of the authentication context class which the end-user
   * authentication satisfied.
   */
  acr?: string;

  /**
   * The time at which the end-user was authenticated. Its value is the number of
   * seconds from `1970-01-01`.
   */
  authTime?: number;

  /**
   * Additional claims which will be embedded in the ID token.
   */
  claims?: string;

  /**
   * the claims that the user has consented for the client application to know.
   */
  consentedClaims?: Array<string>;

  /**
   * The description of the error. If this optional request parameter is given, its
   * value is used as the value of the `error_description` property, but it is used
   * only when the result is not `AUTHORIZED`. To comply with the specification
   * strictly, the description must not include characters outside the set
   * `%x20-21 / %x23-5B / %x5D-7E`.
   */
  errorDescription?: string;

  /**
   * The URI of a document which describes the error in detail. This corresponds to
   * the `error_uri` property in the response to the client.
   */
  errorUri?: string;

  /**
   * JSON that represents additional JWS header parameters for ID tokens.
   */
  idtHeaderParams?: string;

  /**
   * Additional claims that are added to the payload part of the JWT access token.
   */
  jwtAtClaims?: string;

  /**
   * The extra properties associated with the access token.
   */
  properties?: Array<AuthorizationAPI.Property>;

  /**
   * Scopes to replace the scopes specified in the original device authorization
   * request with. When nothing is specified for this parameter, replacement is not
   * performed.
   */
  scopes?: Array<string>;

  /**
   * The value of the sub claim that should be used in the ID token.
   */
  sub?: string;
}

export interface DeviceVerifyParams {
  /**
   * A user code.
   */
  userCode: string;
}

export declare namespace Device {
  export {
    type DeviceAuthorizeResponse as DeviceAuthorizeResponse,
    type DeviceCompleteAuthorizationResponse as DeviceCompleteAuthorizationResponse,
    type DeviceVerifyResponse as DeviceVerifyResponse,
    type DeviceAuthorizeParams as DeviceAuthorizeParams,
    type DeviceCompleteAuthorizationParams as DeviceCompleteAuthorizationParams,
    type DeviceVerifyParams as DeviceVerifyParams,
  };
}
