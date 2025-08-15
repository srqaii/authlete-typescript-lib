// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as AuthorizationAPI from '../auth/authorization/authorization';
import * as TokenAPI from '../auth/token/token';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Authentication extends APIResource {
  /**
   * This API returns information about what action the authorization server should
   * take after it receives the result of end-user's decision about whether the
   * end-user has approved or rejected a client application's request on the
   * authentication device.
   *
   * <details>
   * <summary>Description</summary>
   *
   * After the implementation of the backchannel authentication endpoint returns JSON
   * containing an `auth_req_id` to the client, the authorization server starts a
   * background process that communicates with the authentication device of the
   * end-user. On the authentication device, end-user authentication is performed and
   * the end-user is asked whether they give authorization to the client or not. The
   * authorization server will receive the result of end-user authentication and
   * authorization from the authentication device.
   *
   * After the authorization server receives the result from the authentication
   * device, or even in the case where the server gave up receiving a response from
   * the authentication device for some reasons, the server should call the
   * `/backchannel/authentication/complete` API to tell Authlete the result.
   *
   * When the end-user was authenticated and authorization was granted to the client
   * by the end-user, the authorization server should call the API with
   * `result=AUTHORIZED`. In this successful case, the `subject` request parameter is
   * mandatory. If the token delivery mode is `push`, the API will generate an access
   * token, an ID token and optionally a refresh token. On the other hand, if the
   * token delivery mode is `poll` or `ping`, the API will just update the database
   * record so that `/auth/token` API can generate tokens later.
   *
   * When the authorization server received the decision of the end-user from the
   * authentication device and it indicates that the end-user has rejected to give
   * authorization to the client, the authorization server should call the API with
   * `result=ACCESS_DENIED`. In this case, if the token delivery mode is `push`, the
   * API will generate an error response that contains the error response parameter
   * and optionally the `error_description` and error_uri response parameters (if the
   * `errorDescription` and `errorUri` request parameters have been given). On the
   * other hand, if the token delivery mode is `poll` or `ping`, the API will just
   * update the database record so that `/auth/token` API can generate an error
   * response later. In any token delivery mode, the value of the error parameter
   * will become `access_denied`.
   *
   * When the authorization server could not get the result of end-user
   * authentication and authorization from the authentication device for some
   * reasons, the authorization server should call the API with
   * `result=TRANSACTION_FAILED`. In this error case, the API will behave in the same
   * way as in the case of `ACCESS_DENIED`. The only difference is that
   * `expired_token` is used as the value of the `error` parameter.
   *
   * The response from `/backchannel/authentication/complete` API has various
   * parameters. Among them, it is `action` parameter that the authorization server
   * implementation should check first because it denotes the next action that the
   * authorization server implementation should take. According to the value of
   * `action`, the service implementation must take the steps described below.
   *
   * **SERVER_ERROR**
   *
   * When the value of `action` is `SERVER_ERROR`, it means either (1) that the
   * request from the authorization server to Authlete was wrong, or (2) that an
   * error occurred on Authlete side.
   *
   * When the backchannel token delivery mode is `ping` or `push`, `SERVER_ERROR` is
   * used only when an error is detected before the record of the ticket (which is
   * included in the API call to `/backchannel/authentication/complete`) is retrieved
   * from the database successfully. If an error is detected after the record of the
   * ticket is retrieved from the database, `NOTIFICATION` is used instead of
   * `SERVER_ERROR`.
   *
   * When the backchannel token delivery mode is `poll`, `SERVER_ERROR` is used
   * regardless of whether it is before or after the record of the ticket is
   * retrieved from the database.
   *
   * **NO_ACTION**
   *
   * When the value of `action` is `NO_ACTION`, it means that the authorization
   * server does not have to take any immediate action.
   *
   * `NO_ACTION` is returned when the backchannel token delivery mode is `poll`. In
   * this case, the client will receive the final result at the token endpoint.
   *
   * **NOTIFICATION**
   *
   * When the value of `action` is `NOTIFICATION`, it means that the authorization
   * server must send a notification to the client notification endpoint.
   *
   * According to the CIBA Core specification, the notification is an HTTP POST
   * request whose request body is JSON and whose `Authorization` header contains the
   * client notification token, which was included in the backchannel authentication
   * request as the value of the `client_notification_token` request parameter, as a
   * bearer token.
   *
   * When the backchannel token delivery mode is `ping`, the request body of the
   * notification is JSON which contains the `auth_req_id` property only. When the
   * backchannel token delivery mode is `push`, the request body will additionally
   * contain an access token, an ID token and other properties. Note that when the
   * backchannel token delivery mode is `poll`, a notification does not have to be
   * sent to the client notification endpoint.
   *
   * In error cases, in the ping mode, however, the content of a notification is not
   * different from the content in successful cases. That is, the notification
   * contains the `auth_req_id` property only. The client will know the error when it
   * accesses the token endpoint. On the other hand, in the `push` mode, in error
   * cases, the content of a notification will include the `error` property instead
   * of an access token and an ID token. The client will know the error by detecting
   * that error is included in the notification.
   *
   * In any case, the value of `responseContent` is JSON which can be used as the
   * request body of the notification.
   *
   * The client notification endpoint that the notification should be sent to the
   * value of the `clientNotificationEndpoint` parameter. Likewise, the client
   * notification token that the notification should include as a bearer token is the
   * `clientNotificationToken` parameter. With these methods, the notification can be
   * built like the following.
   *
   * ```
   * POST {clientNotificationEndpoint} HTTP/1.1
   * HOST: {The host of clientNotificationEndpoint}
   * Authorization: Bearer {notificationToken}
   * Content-Type: application/json
   *
   * {responseContent}
   * ```
   *
   * </details>
   *
   * @example
   * ```ts
   * const response =
   *   await client.backchannel.authentication.completeRequest(
   *     'serviceId',
   *     {
   *       result: 'AUTHORIZED',
   *       subject: 'john',
   *       ticket: 'NFIHGx_btVrWmtAD093D-87JxvT4DAtuijEkLVHbS4Q',
   *     },
   *   );
   * ```
   */
  completeRequest(
    serviceID: string,
    body: AuthenticationCompleteRequestParams,
    options?: RequestOptions,
  ): APIPromise<AuthenticationCompleteRequestResponse> {
    return this._client.post(path`/api/${serviceID}/backchannel/authentication/complete`, {
      body,
      ...options,
    });
  }

  /**
   * The API prepares JSON that contains an error. The JSON should be used as the
   * response body of the response which is returned to the client from the
   * [backchannel authentication endpoint](https://openid.net/specs/openid-client-initiated-backchannel-authentication-core-1_0.html#auth_backchannel_endpoint).
   *
   * <details>
   * <summary>Description</summary>
   *
   * This API is supposed to be called from within the implementation of the
   * [backchannel authentication endpoint](https://openid.net/specs/openid-client-initiated-backchannel-authentication-core-1_0.html#auth_backchannel_endpoint)
   * of the service in order to generate an error response to the client application.
   *
   * The response from `/backchannel/authentication/fails` API has some parameters.
   * Among them, it is `action` parameter that the authorization server
   * implementation should check first because it denotes the next action that the
   * authorization server implementation should take. According to the value of
   * `action`, the authorization server implementation must take the steps described
   * below.
   *
   * **INTERNAL_SERVER_ERROR**
   *
   * When the value of `action` is `INTERNAL_SERVER_ERROR`, it means that (1) the
   * `reason` request parameter of the API call was `SERVER_ERROR`, (2) an error
   * occurred on Authlete side, or (3) the request parameters of the API call were
   * wrong. In this case, the authorization server implementation should return a
   * "500 Internal Server Error" response to the client application. However, in most
   * cases, commercial implementations prefer to use other HTTP status code than 5xx.
   *
   * **BAD_REQUEST**
   *
   * When the value of `action` is `BAD_REQUEST`, the authorization server
   * implementation should return a "400 Bad Request" response to the client
   * application.
   *
   * **FORBIDDEN**
   *
   * When the value of `action` is `FORBIDDEN`, it means that the `reason` request
   * parameter of the API call was `ACCESS_DENIED`. In this case, the backchannel
   * authentication endpoint of the authorization server implementation should return
   * a "403 Forbidden" response to the client application.
   *
   * </details>
   *
   * @example
   * ```ts
   * const response =
   *   await client.backchannel.authentication.failRequest(
   *     'serviceId',
   *     { reason: 'ACCESS_DENIED', ticket: 'ticket' },
   *   );
   * ```
   */
  failRequest(
    serviceID: string,
    body: AuthenticationFailRequestParams,
    options?: RequestOptions,
  ): APIPromise<AuthenticationFailRequestResponse> {
    return this._client.post(path`/api/${serviceID}/backchannel/authentication/fail`, { body, ...options });
  }

  /**
   * This API prepares JSON that contains an `auth_req_id`. The JSON should be used
   * as the response body of the response which is returned to the client from the
   * [backchannel authentication endpoint](https://openid.net/specs/openid-client-initiated-backchannel-authentication-core-1_0.html#auth_backchannel_endpoint)
   *
   * <details>
   * <summary>Description</summary>
   *
   * This API is supposed to be called from within the implementation of the
   * backchannel authentication endpoint of the service in order to generate a
   * successful response to the client application.
   *
   * The description of the `/backchannel/authentication` API describes the timing
   * when this API should be called and the meaning of request parameters. See
   * [AUTH_REQ_ID ISSUE] in `USER_IDENTIFICATION`.
   *
   * The response from `/backchannel/authentication/issue` API has some parameters.
   * Among them, it is `action` parameter that the authorization server
   * implementation should check first because it denotes the next `action` that the
   * authorization server implementation should take. According to the value of
   * `action`, the authorization server implementation must take the steps described
   * below.
   *
   * ```java
   * @POST
   * @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
   * public Response post(String parameters)
   * {
   *     // 'parameters' is the entity body of the backchannel authentication request.
   *     ......
   * }
   * ```
   *
   * The endpoint implementation does not have to parse the request parameters from
   * the client application because Authlete's `/backchannel/authentication` API does
   * it.
   *
   * The response from `/backchannel/authentication` API has various parameters.
   * Among them, it is `action` parameter that the authorization server
   * implementation should check first because it denotes the next action that the
   * authorization server implementation should take. According to the value of
   * `action`, the service implementation must take the steps described below.
   *
   * **INTERNAL_SERVER_ERROR**
   *
   * When the value of `action` is `INTERNAL_SERVER_ERROR`, it means that the request
   * from the authorization server implementation was wrong or that an error occurred
   * in Authlete. In either case, from the viewpoint of the client application, it is
   * an error on the server side. Therefore, the service implementation should
   * generate a response to the client application with HTTP status of "500 Internal
   * Server Error" and `application/json`.
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
   * **INVALID_TICKET**
   *
   * When the value of `action` is `INVALID_TICKET`, it means that the ticket
   * included in the API call was invalid. For example, it does not exist or has
   * expired.
   *
   * From a viewpoint of the client application, this is an error on the server side.
   * Therefore, the authorization server implementation should generate a response to
   * the client application with "500 Internal Server Error" and `application/json`.
   *
   * You can build an error response in the same way as shown in the description for
   * the case of `INTERNAL_SERVER_ERROR`.
   *
   * **OK**
   *
   * When the value of `action` is `OK`, it means that Authlete has succeeded in
   * preparing JSON that contains an `auth_req_id`. The JSON should be used as the
   * response body of the response that is returned to the client from the
   * backchannel authentication endpoint. `responseContent` contains the JSON.
   *
   * The following illustrates the response which the authorization server
   * implementation should generate and return to the client application.
   *
   * ```
   * HTTP/1.1 200 OK
   * Content-Type: text/html;charset=UTF-8
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
   * const response =
   *   await client.backchannel.authentication.issueResponse(
   *     'serviceId',
   *     {
   *       ticket: 'NFIHGx_btVrWmtAD093D-87JxvT4DAtuijEkLVHbS4Q',
   *     },
   *   );
   * ```
   */
  issueResponse(
    serviceID: string,
    body: AuthenticationIssueResponseParams,
    options?: RequestOptions,
  ): APIPromise<AuthenticationIssueResponseResponse> {
    return this._client.post(path`/api/${serviceID}/backchannel/authentication/issue`, { body, ...options });
  }

  /**
   * This API parses request parameters of a
   * [backchannel authentication request](https://openid.net/specs/openid-client-initiated-backchannel-authentication-core-1_0.html#auth_request)
   * and returns necessary data for the authorization server implementation to
   * process the backchannel authentication request further.
   *
   * <details>
   * <summary>Description</summary>
   *
   * This API is supposed to be called from within the implementation of the
   * [backchannel authentication endpoint](https://openid.net/specs/openid-client-initiated-backchannel-authentication-core-1_0.html#auth_backchannel_endpoint)
   * of the service. The endpoint implementation must extract the request parameters
   * from the backchannel authentication request from the client application and pass
   * them as the value of parameters request parameter for Authlete's
   * `/backchannel/authentication` API.
   *
   * The value of parameters is the entire entity body (which is formatted in
   * `application/x-www-form-urlencoded`) of the request from the client application.
   *
   * The following code snippet is an example in JAX-RS showing how to extract
   * request parameters from the backchannel authentication request.
   *
   * ```java
   * @POST
   * @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
   * public Response post(String parameters)
   * {
   *     // 'parameters' is the entity body of the backchannel authentication request.
   *     ......
   * }
   * ```
   *
   * The endpoint implementation does not have to parse the request parameters from
   * the client application because Authlete's `/backchannel/authentication` API does
   * it.
   *
   * The response from `/backchannel/authentication` API has various parameters.
   * Among them, it is `action` parameter that the authorization server
   * implementation should check first because it denotes the next action that the
   * authorization server implementation should take. According to the value of
   * `action`, the service implementation must take the steps described below.
   *
   * **INTERNAL_SERVER_ERROR**
   *
   * When the value of `action` is `INTERNAL_SERVER_ERROR`, it means that the request
   * from the authorization server implementation was wrong or that an error occurred
   * in Authlete. In either case, from the viewpoint of the client application, it is
   * an error on the server side. Therefore, the service implementation should
   * generate a response to the client application with HTTP status of "500 Internal
   * Server Error" and `application/json`.
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
   * **BAD_REQUEST**
   *
   * When the value of `action` is `BAD_REQUEST`, it means that the request from the
   * client application is invalid.
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
   * authentication of the backchannel authentication request failed. Note that
   * client authentication is always required at the backchannel authentication
   * endpoint. This implies that public clients are not allowed to use the
   * backchannel authentication endpoint.
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
   * **USER_IDENTIFICATION**
   *
   * When the value of `action` is `USER_IDENTIFICATION`, it means that the
   * backchannel authentication request from the client application is valid. The
   * authorization server implementation has to follow the steps below.
   *
   * [1] END-USER IDENTIFICATION
   *
   * The first step is to determine the subject (= unique identifier) of the end-user
   * from whom the client application wants to get authorization.
   *
   * According to the CIBA specification, a backchannel authentication request
   * contains one (and only one) of the `login_hint_token`, `id_token_hint` and
   * `login_hint` request parameters as a hint by which the authorization server
   * identifies the subject of an end-user.
   *
   * The authorization server implementation can know which hint is included in the
   * backchannel authentication request by the `hintType` parameter. For example,
   * when the value of the parameter `LOGIN_HINT`, it means that the backchannel
   * authentication request contains the `login_hint` request parameter as a hint.
   *
   * The value of the `hint` parameter is the value of the hint. For example, when
   * the value of the `hintType` parameter is `LOGIN_HINT`, The value of the `hint`
   * parameter is the value of the `login_hint` request parameter.
   *
   * It is up to the authorization server implementation how to determine the subject
   * of the end-user from the hint. Only when the `id_token_hint` request parameter
   * is used, authorization server implementation can use the sub response parameter,
   * which holds the value of the sub claim in the `id_token_hint` request parameter.
   *
   * [2] END-USER IDENTIFICATION ERROR
   *
   * There are some cases where the authorization server implementation encounters an
   * error during the user identification process. In any error case, the service
   * implementation has to return an HTTP response with the error response parameter
   * to the client application. The following is an example of such error responses.
   *
   * ```
   * HTTP/1.1 400 Bad Request
   * Content-Type: application/json
   * Cache-Control: no-store
   * Pragma: no-cache
   *
   * { "error":"unknown_user_id" }
   * ```
   *
   * Authlete provides `/backchannel/authentication/fail` API that builds the
   * response body (JSON) of an error response. However, because it is easy to build
   * an error response manually, you may choose not to call the API. One good thing
   * in using the API is that the API call can trigger deletion of the ticket which
   * has been issued from Authlete's `/backchannel/authentication` API. If you don't
   * call `/backchannel/authentication/fail` API, the ticket will continue to exist
   * in the database until it is cleaned up by the batch program after the ticket
   * expires.
   *
   * Possible error cases that the authorization server implementation itself has to
   * handle are as follows. Other error cases have already been covered by
   * `/backchannel/authentication` API.
   *
   * - <u>`expired_login_hint_token`</u>
   *
   *   The authorization server implementation detected that the hint presented by
   *   the `login_hint_token` request parameter has expired.
   *
   *   Note that the format of `login_hint_token` is not described in the CIBA Core
   *   spec at all and so there is no consensus on how to detect expiration of
   *   `login_hint_token`. Interpretation of `login_hint_token` is left to each
   *   authorization server implementation.
   *
   * - <u>`unknown_user_id`</u>
   *
   *   The authorization server implementation could not determine the subject of the
   *   end-user by the presented hint.
   *
   * - <u>`unauthorized_client`</u>
   *
   *   The authorization server implementation has custom rules to reject backchannel
   *   authentication requests from some particular clients and found that the client
   *   which has made the backchannel authentication request is one of the particular
   *   clients.
   *
   *   Note that `/backchannel/authentication` API does not return
   *   `action=USER_IDENTIFICATION` in cases where the client does not exist or
   *   client authentication has failed. Therefore, the authorization server
   *   implementation will never have to use the error code `unauthorized_client`
   *   unless the server has intentionally implemented custom rules to reject
   *   backchannel authentication requests based on clients.
   *
   * - <u>`missing_user_code`</u>
   *
   *   The authorization server implementation has custom rules to require that a
   *   backchannel authentication request include a user code for some particular
   *   users and found that the user identified by the hint is one of the particular
   *   users.
   *
   *   Note that `/backchannel/authentication` API does not return
   *   `action=USER_IDENTIFICATION` when both the
   *   `backchannel_user_code_parameter_supported` metadata of the server and the
   *   `backchannel_user_code_parameter` metadata of the client are true and the
   *   backchannel authentication request does not include the user_code request
   *   parameter. In this case, `/backchannel/authentication` API returns
   *   action=BAD_REQUEST with JSON containing `"error":"missing_user_code"`.
   *   Therefore, the authorization server implementation will never have to use the
   *   error code `missing_user_code` unless the server has intentionally implemented
   *   custom rules to require a user code based on users even in the case where the
   *   `backchannel_user_code_parameter` metadata of the client which has made the
   *   backchannel authentication request is `false`.
   *
   * - <u>`invalid_user_code`</u>
   *
   *   The authorization server implementation detected that the presented user code
   *   is invalid.
   *
   *   Note that the format of user_code is not described in the CIBA Core spec at
   *   all and so there is no consensus on how to judge whether a user code is valid
   *   or not. It is up to each authorization server implementation how to handle
   *   user codes.
   *
   * - <u>`invalid_binding_message`</u>
   *
   *   The authorization server implementation detected that the presented binding
   *   message is invalid.
   *
   *   Note that the format of binding_message is not described in the CIBA Core spec
   *   at all and so there is no consensus on how to judge whether a binding message
   *   is valid or not. It is up to each authorization server implementation how to
   *   handle binding messages.
   *
   * - <u>`invalid_target`</u>
   *
   *   The authorization server implementation rejects the requested target
   *   resources.
   *
   *   The error code invalid_target is from "Resource Indicators for OAuth 2.0". The
   *   specification defines the resource request parameter. By using the parameter,
   *   client applications can request target resources that should be bound to the
   *   access token being issued. If the authorization server wants to reject the
   *   request, call `/backchannel/authentication/fail` API with `INVALID_TARGET`.
   *
   * - <u>`access_denined`</u>
   *
   *   The authorization server implementation has custom rules to reject backchannel
   *   authentication requests without asking the end-user and respond to the client
   *   as if the end-user had rejected the request in some particular cases and found
   *   that the backchannel authentication request is one of the particular cases.
   *
   *   The authorization server implementation will never have to use the error code
   *   `access_denied` at this timing unless the server has intentionally implemented
   *   custom rules to reject backchannel authentication requests without asking the
   *   end-user and respond to the client as if the end-user had rejected the
   *   request.
   *
   * [3] AUTH_REQ_ID ISSUE
   *
   * If the authorization server implementation has successfully determined the
   * subject of the end-user, the next action is to return an HTTP response to the
   * client application which contains `auth_req_id`.
   *
   * Authlete provides `/backchannel/authentication/issue` API which generates a JSON
   * containing `auth_req_id`, so, your next action is (1) call the API, (2) receive
   * the response from the API, (3) build a response to the client application using
   * the content of the API response, and (4) return the response to the client
   * application. See the description of `/backchannel/authentication/issue` API for
   * details.
   *
   * [4] END-USER AUTHENTICATION AND AUTHORIZATION
   *
   * After sending a JSON containing `auth_req_id` back to the client application,
   * the service implementation starts to communicate with an authentication device
   * of the end-user. It is assumed that end-user authentication is performed on the
   * authentication device and the end-user confirms the content of the backchannel
   * authentication request and grants authorization to the client application if
   * everything is okay. The authorization server implementation must be able to
   * receive the result of the end-user authentication and authorization from the
   * authentication device.
   *
   * How to communicate with an authentication device and achieve end-user
   * authentication and authorization is up to each authorization server
   * implementation, but the following request parameters of the backchannel
   * authentication request should be taken into consideration in any implementation.
   *
   * - <u>`acr_values`</u>
   *
   *   A backchannel authentication request may contain an array of ACRs
   *   (Authentication Context Class References) in preference order. If multiple
   *   authentication devices are registered for the end-user, the authorization
   *   server implementation should take the ACRs into consideration when selecting
   *   the best authentication device.
   *
   * - <u>`scope`</u>
   *
   *   A backchannel authentication request always contains a list of scopes. At
   *   least, `openid` is included in the list (otherwise
   *   `/backchannel/authentication` API returns `action=BAD_REQUEST`). It would be
   *   better to show the requested scopes to the end-user on the authentication
   *   device or somewhere appropriate.
   *
   *   If the scope request parameter contains `address`, `email`, `phone` and/or
   *   `profile`, they are interpreted as defined in "5.4. Requesting Claims using
   *   Scope Values of OpenID Connect Core 1.0". That is, they are expanded into a
   *   list of claim names. The claimNames parameter returns the expanded result.
   *
   * - <u>`binding_message`</u>
   *
   *   A backchannel authentication request may contain a binding message. It is a
   *   human readable identifier or message intended to be displayed on both the
   *   consumption device (client application) and the authentication device.
   *
   * - <u>`user_code`</u>
   *
   *   A backchannel authentication request may contain a user code. It is a secret
   *   code, such as password or pin, known only to the end-user but verifiable by
   *   the authorization server. The user code should be used to authorize sending a
   *   request to the authentication device.
   *
   * [5] END-USER AUTHENTICATION AND AUTHORIZATION COMPLETION
   *
   * After receiving the result of end-user authentication and authorization, the
   * authorization server implementation must call Authlete's
   * `/backchannel/authentication/complete` API to tell Authlete the result and pass
   * necessary data so that Authlete can generate an ID token, an access token and
   * optionally a refresh token. See the description of the API for details.
   *
   * [6] CLIENT NOTIFICATION
   *
   * When the backchannel token delivery mode is either `ping` or `push`, the
   * authorization server implementation must send a notification to the
   * pre-registered notification endpoint of the client after the end-user
   * authentication and authorization. In this case, the `action` parameter in a
   * response from `/backchannel/authentication/complete` API is `NOTIFICATION`. See
   * the description of `/backchannel/authentication/complete` API for details.
   *
   * [7] TOKEN REQUEST
   *
   * When the backchannel token delivery mode is either `ping` or `poll`, the client
   * application will make a token request to the token endpoint to get an ID token,
   * an access token and optionally a refresh token.
   *
   * A token request that corresponds to a backchannel authentication request uses
   * `urn:openid:params:grant-type:ciba` as the value of the `grant_type` request
   * parameter. Authlete's `/auth/token` API recognizes the grant type automatically
   * and behaves properly, so the existing token endpoint implementation does not
   * have to be changed to support CIBA.
   *
   * </details>
   *
   * @example
   * ```ts
   * const response =
   *   await client.backchannel.authentication.process(
   *     'serviceId',
   *     {
   *       parameters:
   *         'login_hint=john&scope=openid&client_notification_token=my-client-notification-token&user_code=my-user-code',
   *       clientId: '26862190133482',
   *       clientSecret:
   *         '8J9pAEX6IQw7lYtYGsc_s9N4jlEz_DfkoCHIswJjFjfgKZX-nC4EvKtaHXcP9mHBfS7IU4jytjSZZpaK9UJ77A',
   *     },
   *   );
   * ```
   */
  process(
    serviceID: string,
    body: AuthenticationProcessParams,
    options?: RequestOptions,
  ): APIPromise<AuthenticationProcessResponse> {
    return this._client.post(path`/api/${serviceID}/backchannel/authentication`, { body, ...options });
  }
}

export type DeliveryMode = 'PING' | 'POLL' | 'PUSH';

export interface AuthenticationCompleteRequestResponse {
  /**
   * The issued access token.
   */
  accessToken?: string;

  /**
   * The duration of the access token in seconds.
   */
  accessTokenDuration?: number;

  /**
   * The next action that the authorization server implementation should take.
   */
  action?: 'SERVER_ERROR' | 'NO_ACTION' | 'NOTIFICATION';

  /**
   * The authorization details. This represents the value of the
   * `authorization_details` request parameter in the preceding device authorization
   * request which is defined in "OAuth 2.0 Rich Authorization Requests".
   */
  authorizationDetails?: AuthorizationAPI.AuthorizationDetails;

  /**
   * The newly issued authentication request ID.
   */
  authReqId?: string;

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
   * The client ID of the client application that has made the backchannel
   * authentication request.
   */
  clientId?: number;

  /**
   * The client ID alias of the client application that has made the backchannel
   * authentication request.
   */
  clientIdAlias?: string;

  /**
   * `true` if the value of the client_id request parameter included in the
   * backchannel authentication request is the client ID alias. `false` if the value
   * is the original numeric client ID.
   */
  clientIdAliasUsed?: boolean;

  /**
   * The name of the client application which has made the backchannel authentication
   * request.
   */
  clientName?: string;

  /**
   * The client notification endpoint to which a notification needs to be sent. This
   * corresponds to the `client_notification_endpoint` metadata of the client
   * application.
   */
  clientNotificationEndpoint?: string;

  /**
   * The client notification token which needs to be embedded as a Bearer token in
   * the Authorization header in the notification. This is the value of the
   * `client_notification_token` request parameter included in the backchannel
   * authentication request.
   */
  clientNotificationToken?: string;

  deliveryMode?: DeliveryMode;

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
   * The issued ID token.
   */
  idToken?: string;

  /**
   * The duration of the ID token in seconds.
   */
  idTokenDuration?: number;

  /**
   * The issued access token in JWT format.
   */
  jwtAccessToken?: string;

  /**
   * The issued refresh token.
   */
  refreshToken?: string;

  /**
   * The duration of the refresh token in seconds.
   */
  refreshTokenDuration?: number;

  /**
   * The resources specified by the `resource` request parameters or by the
   * `resource` property in the request object. If both are given, the values in the
   * request object should be set. See "Resource Indicators for OAuth 2.0" for
   * details.
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
   * The attributes of this service that the client application belongs to.
   */
  serviceAttributes?: Array<TokenAPI.Pair>;
}

export interface AuthenticationFailRequestResponse {
  /**
   * The next action that the authorization server implementation should take.
   */
  action?: 'INTERNAL_SERVER_ERROR' | 'BAD_REQUEST' | 'FORBIDDEN';

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
}

export interface AuthenticationIssueResponseResponse {
  /**
   * The next action that the authorization server implementation should take.
   */
  action?: 'INTERNAL_SERVER_ERROR' | 'INVALID_TICKET' | 'OK';

  /**
   * The newly issued authentication request ID.
   */
  authReqId?: string;

  /**
   * The duration of the issued authentication request ID in seconds.
   */
  expiresIn?: number;

  /**
   * The minimum amount of time in seconds that the client must wait for between
   * polling requests to the token endpoint.
   */
  interval?: number;

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
}

export interface AuthenticationProcessResponse {
  /**
   * The list of ACR values requested by the backchannel authentication request.
   *
   * Basically, this property holds the value of the `acr_values` request parameter
   * in the backchannel authentication request. However, because unsupported ACR
   * values are dropped on Authlete side, if the `acr_values` request parameter
   * contains unrecognized ACR values, the list returned by this property becomes
   * different from the value of the `acr_values` request parameter.
   */
  acrs?: Array<string>;

  /**
   * The next action that the authorization server implementation should take.
   */
  action?: 'INTERNAL_SERVER_ERROR' | 'BAD_REQUEST' | 'UNAUTHORIZED' | 'USER_IDENTIFICATION';

  /**
   * The authorization details. This represents the value of the
   * `authorization_details` request parameter in the preceding device authorization
   * request which is defined in "OAuth 2.0 Rich Authorization Requests".
   */
  authorizationDetails?: AuthorizationAPI.AuthorizationDetails;

  /**
   * The binding message included in the backchannel authentication request.
   */
  bindingMessage?: string;

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
   * The client authentication method that was performed.
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
   * The client ID of the client application that has made the backchannel
   * authentication request.
   */
  clientId?: number;

  /**
   * The client ID alias of the client application that has made the backchannel
   * authentication request.
   */
  clientIdAlias?: string;

  /**
   * `true` if the value of the client_id request parameter included in the
   * backchannel authentication request is the client ID alias. `false` if the value
   * is the original numeric client ID.
   */
  clientIdAliasUsed?: boolean;

  /**
   * The name of the client application which has made the backchannel authentication
   * request.
   */
  clientName?: string;

  /**
   * The client notification token included in the backchannel authentication
   * request.
   */
  clientNotificationToken?: string;

  deliveryMode?: DeliveryMode;

  /**
   * The dynamic scopes which the client application requested by the scope request
   * parameter.
   */
  dynamicScopes?: Array<AuthorizationAPI.DynamicScope>;

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
   * The value of the hint for end-user identification.
   */
  hint?: string;

  /**
   * The type of the hint for end-user identification which was included in the
   * backchannel authentication request.
   */
  hintType?: string;

  /**
   * The request context of the backchannel authentication request.
   *
   * It is the value of the request_context claim in the signed authentication
   * request and its format is JSON. request_context is a new claim added by the
   * FAPI-CIBA profile.
   */
  requestContext?: string;

  /**
   * The requested expiry for the authentication request ID (`auth_req_id`).
   */
  requestedExpiry?: number;

  /**
   * The resources specified by the `resource` request parameters or by the
   * `resource` property in the request object. If both are given, the values in the
   * request object should be set. See "Resource Indicators for OAuth 2.0" for
   * details.
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
   * The scopes requested by the backchannel authentication request.
   *
   * Basically, this property holds the value of the `scope` request parameter in the
   * backchannel authentication request. However, because unregistered scopes are
   * dropped on Authlete side, if the `scope` request parameter contains unknown
   * scopes, the list returned by this property becomes different from the value of
   * the `scope` request parameter.
   *
   * Note that `description` property and `descriptions` property of each `scope`
   * object in the array contained in this property is always null even if
   * descriptions of the scopes are registered.
   */
  scopes?: Array<AuthorizationAPI.Scope>;

  /**
   * The attributes of this service that the client application belongs to.
   */
  serviceAttributes?: Array<TokenAPI.Pair>;

  /**
   * The value of the `sub` claim contained in the ID token hint included in the
   * backchannel authentication request.
   */
  sub?: string;

  /**
   * The ticket which is necessary to call Authlete's `/auth/token/fail` API or
   * `/auth/token/issue` API.
   *
   * This parameter has a value only if the value of `grant_type` request parameter
   * is `password` and the token request is valid.
   */
  ticket?: string;

  /**
   * The binding message included in the backchannel authentication request.
   */
  userCode?: string;

  /**
   * The flag which indicates whether a user code is required.
   *
   * `true` when both the `backchannel_user_code_parameter` metadata of the client (=
   * Client's `bcUserCodeRequired` property) and the
   * `backchannel_user_code_parameter_supported` metadata of the service (= Service's
   * `backchannelUserCodeParameterSupported` property) are `true`.
   */
  userCodeRequired?: boolean;

  /**
   * The warnings raised during processing the backchannel authentication request.
   */
  warnings?: Array<string>;
}

export interface AuthenticationCompleteRequestParams {
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
   * The ticket issued by Authlete's `/backchannel/authentication` API.
   */
  ticket: string;

  /**
   * The representation of an access token that may be issued as a result of the
   * Authlete API call.
   */
  accessToken?: string;

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
   * Scopes to replace the scopes specified in the original backchannel
   * authentication request with. When nothing is specified for this parameter,
   * replacement is not performed.
   */
  scopes?: Array<string>;

  /**
   * The value of the sub claim that should be used in the ID token.
   */
  sub?: string;
}

export interface AuthenticationFailRequestParams {
  /**
   * The reason of the failure of the backchannel authentication request. This
   * request parameter is not mandatory but optional. However, giving this parameter
   * is recommended. If omitted, `SERVER_ERROR` is used as a reason.
   */
  reason:
    | 'ACCESS_DENIED'
    | 'EXPIRED_LOGIN_HINT_TOKEN'
    | 'INVALID_BINDING_MESSAGE'
    | 'INVALID_TARGET'
    | 'INVALID_USER_CODE'
    | 'MISSING_USER_CODE'
    | 'SERVER_ERROR'
    | 'UNAUTHORIZED_CLIENT'
    | 'UNKNOWN_USER_ID';

  /**
   * The ticket which should be deleted on a call of Authlete's
   * `/backchannel/authentication/fail` API. This request parameter is not mandatory
   * but optional. If this request parameter is given and the ticket belongs to the
   * service, the specified ticket is deleted from the database. Giving this
   * parameter is recommended to clean up the storage area for the service.
   */
  ticket: string;

  /**
   * The description of the error. This corresponds to the `error_description`
   * property in the response to the client.
   */
  errorDescription?: string;

  /**
   * The URI of a document which describes the error in detail. If this optional
   * request parameter is given, its value is used as the value of the `error_uri`
   * property.
   */
  errorUri?: string;
}

export interface AuthenticationIssueResponseParams {
  /**
   * The ticket issued from Authlete's `/backchannel/authentication` API.
   */
  ticket: string;
}

export interface AuthenticationProcessParams {
  /**
   * Parameters of a backchannel authentication request which are the request
   * parameters that the backchannel authentication endpoint of the OpenID provider
   * implementation received from the client application.
   *
   * The value of `parameters` is the entire entity body (which is formatted in
   * `application/x-www-form-urlencoded`) of the request from the client application.
   */
  parameters: string;

  /**
   * The client certification used in the TLS connection between the client
   * application and the backchannel authentication endpoint of the OpenID provider.
   */
  clientCertificate?: string;

  /**
   * The client certificate path presented by the client during client
   * authentication. Each element is a string in PEM format.
   */
  clientCertificatePath?: string;

  /**
   * The client ID extracted from Authorization header of the backchannel
   * authentication request from the client application.
   *
   * If the backchannel authentication endpoint of the OpenID provider implementation
   * supports Basic Authentication as a means of client authentication, and the
   * request from the client application contained its client ID in Authorization
   * header, the value should be extracted and set to this parameter.
   */
  clientId?: string;

  /**
   * The client secret extracted from Authorization header of the backchannel
   * authentication request from the client application.
   *
   * If the backchannel authentication endpoint of the OpenID provider implementation
   * supports Basic Authentication as a means of client authentication, and the
   * request from the client application contained its client secret in Authorization
   * header, the value should be extracted and set to this parameter.
   */
  clientSecret?: string;
}

export declare namespace Authentication {
  export {
    type DeliveryMode as DeliveryMode,
    type AuthenticationCompleteRequestResponse as AuthenticationCompleteRequestResponse,
    type AuthenticationFailRequestResponse as AuthenticationFailRequestResponse,
    type AuthenticationIssueResponseResponse as AuthenticationIssueResponseResponse,
    type AuthenticationProcessResponse as AuthenticationProcessResponse,
    type AuthenticationCompleteRequestParams as AuthenticationCompleteRequestParams,
    type AuthenticationFailRequestParams as AuthenticationFailRequestParams,
    type AuthenticationIssueResponseParams as AuthenticationIssueResponseParams,
    type AuthenticationProcessParams as AuthenticationProcessParams,
  };
}
