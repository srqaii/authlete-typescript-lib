// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as AuthorizationAPI from './authorization';
import * as GetAPI from '../../service/get';
import * as TicketAPI from './ticket';
import {
  Ticket,
  TicketInfoParams,
  TicketInfoResponse,
  TicketUpdateParams,
  TicketUpdateResponse,
} from './ticket';
import * as TokenAPI from '../token/token';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class Authorization extends APIResource {
  ticket: TicketAPI.Ticket = new TicketAPI.Ticket(this._client);

  /**
   * This API generates a content of an error authorization response that the
   * authorization server implementation returns to the client application.
   *
   * <details>
   * <summary>Description</summary>
   *
   * This API is supposed to be called from within the implementation of the
   * authorization endpoint of the service in order to generate an error response to
   * the client application.
   *
   * The description of the `/auth/authorization` API describes the timing when this
   * API should be called.
   *
   * The response from `/auth/authorization/fail` API has some parameters. Among
   * them, it is `action` parameter that the authorization server implementation
   * should check first because it denotes the next action that the authorization
   * server implementation should take. According to the value of `action`, the
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
   * Error". Authlete recommends `application/json` as the content type.
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
   * When the value of `action` is `BAD_REQUEST`, it means that the ticket is no
   * longer valid (deleted or expired) and that the reason of the invalidity was
   * probably due to the end-user's too-delayed response to the authorization UI.
   *
   * A response with HTTP status of "400 Bad Request" should be returned to the
   * client application and Authlete recommends `application/json` as the content
   * type.
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
   * The endpoint implementation may return another different response to the client
   * application since "400 Bad Request" is not required by OAuth 2.0.
   *
   * **LOCATION**
   *
   * When the value of `action` is `LOCATION`, it means that the response to the
   * client application must be "302 Found" with Location header.
   *
   * The parameter responseContent contains a redirect URI with (1) an authorization
   * code, an ID token and/or an access token (on success) or (2) an error code (on
   * failure), so it can be used as the value of `Location` header.
   *
   * The following illustrates the response which the service implementation must
   * generate and return to the client application.
   *
   * ```
   * HTTP/1.1 302 Found
   * Location: {responseContent}
   * Cache-Control: no-store
   * Pragma: no-cache
   * ```
   *
   * **FORM**
   *
   * When the value of `action` is `FORM`, it means that the response to the client
   * application must be 200 OK with an HTML which triggers redirection by
   * JavaScript. This happens when the authorization request from the client
   * application contained `response_mode=form_post`.
   *
   * The value of `responseContent` is an HTML which can be used as the entity body
   * of the response.
   *
   * The following illustrates the response which the service implementation must
   * generate and return to the client application.
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
   * const response = await client.auth.authorization.fail(
   *   'serviceId',
   *   {
   *     reason: 'NOT_AUTHENTICATED',
   *     ticket: 'qA7wGybwArICpbUSutrf5Xc9-i1fHE0ySOHxR1eBoBQ',
   *   },
   * );
   * ```
   */
  fail(
    serviceID: string,
    body: AuthorizationFailParams,
    options?: RequestOptions,
  ): APIPromise<AuthorizationFailResponse> {
    return this._client.post(path`/api/${serviceID}/auth/authorization/fail`, { body, ...options });
  }

  /**
   * This API parses request parameters of an authorization request and returns
   * necessary data for the authorization server implementation to process the
   * authorization request further.
   *
   * <details>
   * <summary>Description</summary>
   *
   * This API is supposed to be called from within the implementation of the
   * authorization endpoint of the service in order to generate a successful response
   * to the client application.
   *
   * The description of the `/auth/authorization` API describes the timing when this
   * API should be called and the meaning of request parameters. See [ISSUE] in
   * `NO_INTERACTION`.
   *
   * The response from `/auth/authorization/issue` API has some parameters. Among
   * them, it is `action` parameter that the authorization server implementation
   * should check first because it denotes the next action that the authorization
   * server implementation should take. According to the value of `action`, the
   * authorization server implementation must take the steps described below.
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
   * When the value of "action" is `BAD_REQUEST`, it means that the ticket is no
   * longer valid (deleted or expired) and that the reason of the invalidity was
   * probably due to the end-user's too-delayed response to the authorization UI.
   *
   * The HTTP status of the response returned to the client application should be
   * "400 Bad Request" and the content type should be `application/json` although
   * OAuth 2.0 specification does not mention the format of the error response.
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
   * The endpoint implementation may return another different response to the client
   * application since "400 Bad Request" is not required by OAuth 2.0.
   *
   * **LOCATION**
   *
   * When the value of `action` is `LOCATION`, it means that the response to the
   * client application should be "302 Found" with `Location` header.
   *
   * The value of `responseContent` is a redirect URI which contains (1) an
   * authorization code, an ID token and/or an access token (on success) or (2) an
   * error code (on failure), so it can be used as the value of `Location` header.
   *
   * The following illustrates the response which the service implementation must
   * generate and return to the client application.
   *
   * ```
   * HTTP/1.1 302 Found
   * Location: {responseContent}
   * Cache-Control: no-store
   * Pragma: no-cache
   * ```
   *
   * **FORM**
   *
   * When the value of `action` is `FORM`, it means that the response to the client
   * application should be "200 OK" with an HTML which triggers redirection by
   * JavaScript. This happens when the authorization request from the client contains
   * `response_mode=form_post` request parameter.
   *
   * The value of `responseContent` is an HTML which satisfies the requirements of
   * `response_mode=form_post`, so it can be used as the entity body of the response.
   *
   * The following illustrates the response which the service implementation should
   * generate and return to the client application.
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
   * const response = await client.auth.authorization.issue(
   *   'serviceId',
   *   {
   *     subject: 'john',
   *     ticket: 'FFgB9gwb_WXh6g1u-UQ8ZI-d_k4B-o-cm7RkVzI8Vnc',
   *   },
   * );
   * ```
   */
  issue(
    serviceID: string,
    body: AuthorizationIssueParams,
    options?: RequestOptions,
  ): APIPromise<AuthorizationIssueResponse> {
    return this._client.post(path`/api/${serviceID}/auth/authorization/issue`, { body, ...options });
  }

  /**
   * This API parses request parameters of an authorization request and returns
   * necessary data for the authorization server implementation to process the
   * authorization request further.
   *
   * <details>
   * <summary>Description</summary>
   *
   * This API is supposed to be called from within the implementation of the
   * authorization endpoint of the service. The endpoint implementation must extract
   * the request parameters from the authorization request from the client
   * application and pass them as the value of parameters request parameter for
   * Authlete's `/auth/authorization` API.
   *
   * The value of `parameters` is either (1) the entire query string when the HTTP
   * method of the request from the client application is `GET` or (2) the entire
   * entity body (which is formatted in `application/x-www-form-urlencoded`) when the
   * HTTP method of the request from the client application is `POST`.
   *
   * The following code snippet is an example in JAX-RS showing how to extract
   * request parameters from the authorization request.
   *
   * ```java
   * @GET
   * public Response get(@Context UriInfo uriInfo)
   * {
   *     // The query parameters of the authorization request.
   *     String parameters = uriInfo.getRequestUri().getQuery();
   *     ......
   * }
   *
   * @POST
   * @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
   * public Response post(String parameters)
   * {
   *     // 'parameters' is the entity body of the authorization request.
   *     ......
   * }
   * ```
   *
   * The endpoint implementation does not have to parse the request parameters from
   * the client application because Authlete's `/auth/authorization` API does it.
   *
   * The response from `/auth/authorization` API has various parameters. Among them,
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
   * **BAD_REQUEST**
   *
   * When the value of `action` is `BAD_REQUEST`, it means that the request from the
   * client application is invalid.
   *
   * A response with HTTP status of "400 Bad Request" should be returned to the
   * client application and Authlete recommends `application/json` as the content
   * type although OAuth 2.0 specification does not mention the format of the error
   * response when the redirect URI is not usable.
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
   * The endpoint implementation may return another different response to the client
   * application since "400 Bad Request" is not required by OAuth 2.0.
   *
   * **LOCATION**
   *
   * When the value of `action` is `LOCATION`, it means that the request from the
   * client application is invalid but the redirect URI to which the error should be
   * reported has been determined.
   *
   * A response with HTTP status of "302 Found" must be returned to the client
   * application with `Location` header which has a redirect URI with error
   * parameter.
   *
   * The value of `responseContent` is a redirect URI with `error` parameter, so it
   * can be used as the value of `Location` header.
   *
   * The following illustrates the response which the service implementation must
   * generate and return to the client application.
   *
   * ```
   * HTTP/1.1 302 Found
   * Location: {responseContent}
   * Cache-Control: no-store
   * Pragma: no-cache
   * ```
   *
   * **FORM**
   *
   * When the value of `action` is `FORM`, it means that the request from the client
   * application is invalid but the redirect URI to which the error should be
   * reported has been determined, and that the authorization request contains
   * `response_mode=form_post` as is defined in
   * [OAuth 2.0 Form Post Response Mode](https://openid.net/specs/oauth-v2-form-post-response-mode-1_0.html).
   *
   * The HTTP status of the response returned to the client application should be
   * "200 OK" and the content type should be `text/html;charset=UTF-8`.
   *
   * The value of `responseContent` is an HTML which can be used as the entity body
   * of the response.
   *
   * The following illustrates the response which the service implementation must
   * generate and return to the client application.
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
   * **NO_INTERACTION**
   *
   * When the value of `action` is `NO_INTERACTION`, it means that the request from
   * the client application has no problem and requires the service to process the
   * request without displaying any user interface pages for authentication or
   * consent. This case happens when the authorization request contains
   * `prompt=none`.
   *
   * The service must follow the steps described below.
   *
   * [1] END-USER AUTHENTICATION
   *
   * Check whether an end-user has already logged in. If an end-user has logged in,
   * go to the next step ([MAX_AGE]). Otherwise, call Authlete's
   * `/auth/authorization/fail` API with `reason=NOT_LOGGED_IN` and use the response
   * from the API to generate a response to the client application.
   *
   * [2] MAX AGE
   *
   * Get the value of `maxAge` parameter from the `/auth/authorization` API response.
   * The value represents the maximum authentication age which has come from
   * `max_age` request parameter or `defaultMaxAge` configuration parameter of the
   * client application. If the value is `0`, go to the next step ([SUBJECT]).
   * Otherwise, follow the sub steps described below.
   *
   * (i) Get the time at which the end-user was authenticated. that this value is not
   * managed by Authlete, meaning that it is expected that the service implementation
   * manages the value. If the service implementation does not manage authentication
   * time of end-users, call Authlete's `/auth/authorization/fail` API with
   * `reason=MAX_AGE_NOT_SUPPORTED` and use the API response to generate a response
   * to the client application.
   *
   * (ii) Add the value of the maximum authentication age (which is represented in
   * seconds) to the authentication time. The calculated value is the expiration
   * time.
   *
   * (iii) Check whether the calculated value is equal to or greater than the current
   * time. If this condition is satisfied, go to the next step ([SUBJECT]).
   * Otherwise, call Authlete's `/auth/authorization/fail` API with
   * `reason=EXCEEDS_MAX_AGE` and use the API response to generate a response to the
   * client application.
   *
   * [3] SUBJECT
   *
   * Get the value of `subject` from the `/auth/authorization` API response. The
   * value represents an end-user who the client application expects to grant
   * authorization. If the value is `null`, go to the next step ([ACRs]). Otherwise,
   * follow the sub steps described below.
   *
   * (i) Compare the value of the requested subject to the current end-user.
   *
   * (ii) If they are equal, go to the next step ([ACRs]). If they are not equal,
   * call Authlete's `/auth/authorization/fail` API with `reason=DIFFERENT_SUBJECT`
   * and use the response from the API to generate a response to the client
   * application.
   *
   * [4] ACRs
   *
   * Get the value of `acrs` from the `/auth/authorization` API response. The value
   * represents a list of ACRs (Authentication Context Class References) and comes
   * from (1) acr claim in `claims` request parameter, (2) `acr_values` request
   * parameter, or (3) `default_acr_values` configuration parameter of the client
   * application.
   *
   * It is ensured that all the ACRs in acrs are supported by the authorization
   * server implementation. In other words, it is ensured that all the ACRs are
   * listed in `acr_values_supported` configuration parameter of the authorization
   * server.
   *
   * If the value of ACRs is `null`, go to the next step ([ISSUE]). Otherwise, follow
   * the sub steps described below.
   *
   * (i) Get the ACR performed for the authentication of the current end-user. Note
   * that this value is managed not by Authlete but by the authorization server
   * implementation. (If the authorization server implementation cannot handle ACRs,
   * it should not have listed ACRs as `acr_values_supported`.)
   *
   * (ii) Compare the ACR value obtained in the above step to each element in the ACR
   * array (`acrs`) in the listed order.
   *
   * (iii) If the ACR value was found in the array, (= the ACR performed for the
   * authentication of the current end-user did not match any one of the ACRs
   * requested by the client application), check whether one of the requested ACRs
   * must be satisfied or not using `acrEssential` parameter in the
   * `/auth/authorization` API response. If the value of `acrEssential` parameter is
   * `true`, call Authlete's `/auth/authorization/fail` API with
   * `reason=ACR_NOT_SATISFIED` and use the response from the API to generate a
   * response to the client application. Otherwise, go to the next step ([SCOPES]).
   *
   * [5] SCOPES
   *
   * Get the value of `scopes` from the `/auth/authorization` API response. If the
   * array contains a scope which has not been granted to the client application by
   * the end-user in the past, call Authlete's `/auth/authorization/fail` API with
   * `reason=CONSENT_REQUIRED` and use the response from the API to generate a
   * response to the client application. Otherwise, go to the next step
   * ([RESOURCES]).
   *
   * Note that Authlete provides APIs to manage records of granted scopes
   * (`/api/client/granted_scopes/*` APIs), which is only available in a
   * dedicated/onpremise Authlete server (contact sales@authlete.com for details).
   *
   * [6] DYNAMIC SCOPES
   *
   * Get the value of `dynamicScopes` from the `/auth/authorization` API response. If
   * the array contains a scope which has not been granted to the client application
   * by the end-user in the past, call Authlete's `/auth/authorization/fail` API with
   * `reason=CONSENT_REQUIRED` and use the response from the API to generate a
   * response to the client application. Otherwise, go to the next step
   * ([RESOURCES]).
   *
   * Note that Authlete provides APIs to manage records of granted scopes
   * (`/api/client/granted_scopes/*` APIs) but dynamic scopes are not remembered as
   * granted scopes.
   *
   * [7] RESOURCES
   *
   * Get the value of `resources` from the `/auth/authorization` API response. The
   * array represents the values of the `resource` request parameters. If you want to
   * reject the request, call Authlete's `/auth/authorization/fail` API with
   * `reason=INVALID_TARGET` and use the response from the API to generate a response
   * to the client application. Otherwise, go to the next step ([ISSUE]).
   *
   * See "Resource Indicators for OAuth 2.0" for details.
   *
   * [8] ISSUE
   *
   * If all the above steps succeeded, the last step is to issue an authorization
   * code, an ID token and/or an access token. (There is a special case, though. In
   * the case of `response_type=none`, nothing is issued.) It can be performed by
   * calling Authlete's `/auth/authorization/issue` API. The API requires the
   * following parameters. Prepare these parameters and call
   * `/auth/authorization/issue` API and use the response to generate a response to
   * the client application.
   *
   * - <u>`ticket` (required)</u>
   *
   *   This parameter represents a ticket which is exchanged with tokens at
   *   `/auth/authorization/issue`. Use the value of `ticket` contained in the
   *   `/auth/authorization` API response.
   *
   * - <u>`subject` (required)</u>
   *
   *   This parameter represents the unique identifier of the current end-user. It is
   *   often called "user ID" and it may or may not be visible to the user. In any
   *   case, it is a number or a string assigned to an end-user by the authorization
   *   server implementation. Authlete does not care about the format of the value of
   *   subject, but it must consist of only ASCII letters and its length must not
   *   exceed 100.
   *
   *   When the value of `subject` parameter in the /auth/authorization API response
   *   is not `null`, it is necessarily identical to the value of `subject` parameter
   *   in the `/auth/authorization/issue` API request.
   *
   *   The value of this parameter will be embedded in an ID token as the value of
   *   `sub` claim. When the value of `subject_type` configuration parameter of the
   *   client application is `PAIRWISE`, the value of sub claim is different from the
   *   value specified by this parameter, See
   *   [8. Subject Identifier Types](https://openid.net/specs/openid-connect-core-1_0.html#SubjectIDTypes)
   *   of OpenID Connect Core 1.0 for details about subject types.
   *
   *   You can use the `sub` request parameter to adjust the value of the `sub` claim
   *   in an ID token. See the description of the `sub` request parameter for
   *   details.
   *
   * - <u>`authTime` (optional)</u>
   *
   *   This parameter represents the time when the end-user authentication occurred.
   *   Its value is the number of seconds from `1970-01-01`. The value of this
   *   parameter will be embedded in an ID token as the value of `auth_time` claim.
   *
   * - <u>`acr` (optional)</u>
   *
   *   This parameter represents the ACR (Authentication Context Class Reference)
   *   which the authentication of the end-user satisfies. When `acrs` in the
   *   `/auth/authorization` API response is a non-empty array and the value of
   *   `acrEssential` is `true`, the value of this parameter must be one of the array
   *   elements. Otherwise, even `null` is allowed. The value of this parameter will
   *   be embedded in an ID token as the value of `acr` claim.
   *
   * - <u>`claims` (optional)</u>
   *
   *   This parameter represents claims of the end-user. "Claims" here are pieces of
   *   information about the end-user such as `"name"`, `"email"` and `"birthdate"`.
   *   The authorization server implementation is required to gather claims of the
   *   end-user, format the claim values into JSON and set the JSON string as the
   *   value of this parameter.
   *
   *   The claims which the authorization server implementation is required to gather
   *   are listed in `claims` parameter in the `/auth/authorization` API response.
   *
   *   For example, if claims parameter lists `"name"`, `"email"` and `"birthdate"`,
   *   the value of this parameter should look like the following.
   *
   *   ```json
   *   {
   *     "name": "John Smith",
   *     "email": "john@example.com",
   *     "birthdate": "1974-05-06"
   *   }
   *   ```
   *
   *   `claimsLocales` parameter in the `/auth/authorization` API response lists the
   *   end-user's preferred languages and scripts, ordered by preference. When
   *   `claimsLocales` parameter is a non-empty array, its elements should be taken
   *   into account when the authorization server implementation gathers claim
   *   values. Especially, note the excerpt below from
   *   [5.2. Claims Languages and Scripts](https://openid.net/specs/openid-connect-core-1_0.html#ClaimsLanguagesAndScripts)
   *   of OpenID Connect Core 1.0.
   *
   *   > When the OP determines, either through the `claims_locales` parameter, or by
   *   > other means, that the End-User and Client are requesting Claims in only one
   *   > set of languages and scripts, it is RECOMMENDED that OPs return Claims
   *   > without language tags when they employ this language and script. It is also
   *   > RECOMMENDED that Clients be written in a manner that they can handle and
   *   > utilize Claims using language tags.
   *
   *   If `claims` parameter in the `/auth/authorization` API response is `null` or
   *   an empty array, the value of this parameter should be `null`.
   *
   *   See
   *   [5.1. Standard Claims](https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims)
   *   of OpenID Connect core 1.0 for claim names and their value formats. Note (1)
   *   that the authorization server implementation support its special claims
   *   ([5.1.2. Additional Claims](https://openid.net/specs/openid-connect-core-1_0.html#AdditionalClaims))
   *   and (2) that claim names may be followed by a language tag
   *   ([5.2. Claims Languages and Scripts](https://openid.net/specs/openid-connect-core-1_0.html#ClaimsLanguagesAndScripts)).
   *   Read the specification of
   *   [OpenID Connect Core 1.0](https://openid.net/specs/openid-connect-core-1_0.html)
   *   for details.
   *
   *   The claim values in this parameter will be embedded in an ID token.
   *
   *   Note that `idTokenClaims` parameter is available in the `/auth/authorization`
   *   API response. The parameter has the value of the `"id_token"` property in the
   *   `claims` request parameter or in the `"claims"` property in a request object.
   *   The value of this parameter should be considered when you prepare claim
   *   values.
   *
   * - <u>`properties` (optional)</u>
   *
   *   Extra properties to associate with an access token and/or an authorization
   *   code that may be issued by this request. Note that `properties` parameter is
   *   accepted only when `Content-Type` of the request is `application/json`, so
   *   don't use `application/x-www-form-urlencoded` for details.
   *
   * - <u>`scopes` (optional)</u>
   *
   *   Scopes to associate with an access token and/or an authorization code. If this
   *   parameter is `null`, the scopes specified in the original authorization
   *   request from the client application are used. In other cases, including the
   *   case of an empty array, the specified scopes will replace the original scopes
   *   contained in the original authorization request.
   *
   *   Even scopes that are not included in the original authorization request can be
   *   specified. However, as an exception, `openid` scope is ignored on the server
   *   side if it is not included in the original request. It is because the
   *   existence of `openid` scope considerably changes the validation steps and
   *   because adding `openid` triggers generation of an ID token (although the
   *   client application has not requested it) and the behavior is a major violation
   *   against the specification.
   *
   *   If you add `offline_access` scope although it is not included in the original
   *   request, keep in mind that the specification requires explicit consent from
   *   the user for the scope
   *   ([OpenID Connect Core 1.0, 11. Offline Access](https://openid.net/specs/openid-connect-core-1_0.html#OfflineAccess)).
   *   When `offline_access` is included in the original request, the current
   *   implementation of Authlete's `/auth/authorization` API checks whether the
   *   request has come along with `prompt` request parameter and the value includes
   *   consent. However, note that the implementation of Authlete's
   *   `/auth/authorization/issue` API does not perform such checking if
   *   `offline_access` scope is added via this `scopes` parameter.
   *
   * - <u>`sub` (optional)</u>
   *
   *   The value of the `sub` claim in an ID token. If the value of this request
   *   parameter is not empty, it is used as the value of the `sub` claim. Otherwise,
   *   the value of the `subject` request parameter is used as the value of the `sub`
   *   claim. The main purpose of this parameter is to hide the actual value of the
   *   subject from client applications.
   *
   *   Note that even if this `sub` parameter is not empty, the value of the subject
   *   request parameter is used as the value of the subject which is associated with
   *   the access token.
   *
   * **INTERACTION**
   *
   * When the value of `action` is `INTERACTION`, it means that the request from the
   * client application has no problem and requires the service to process the
   * request with user interaction by an HTML form. The purpose of the UI displayed
   * to the end-user is to ask the end-user to grant authorization to the client
   * application. The items described below are some points which the service
   * implementation should take into account when it builds the UI.
   *
   * [1] DISPLAY MODE
   *
   * The response from `/auth/authorization` API has `display` parameter. It is one
   * of `PAGE` (default), `POPUP`, `TOUCH` and `WAP` The meanings of the values are
   * described in
   * [3.1.2.1. Authentication Request of OpenID Connect Core 1.0](https://openid.net/specs/openid-connect-core-1_0.html#AuthRequest).
   * Basically, the authorization server implementation should display the UI which
   * is suitable for the display mode, but it is okay for the authorization server
   * implementation to "attempt to detect the capabilities of the User Agent and
   * present an appropriate display".
   *
   * It is ensured that the value of `display` is one of the supported display modes
   * which are specified by `supportedDisplays` configuration parameter of the
   * service.
   *
   * [2] UI LOCALE
   *
   * The response from `/auth/authorization` API has `uiLocales` parameter. It it is
   * not `null`, it lists language tag values (such as `fr-CA`, `ja-JP` and `en`)
   * ordered by preference. The service implementation should display the UI in one
   * of the language listed in the parameter when possible. It is ensured that
   * language tags listed in `uiLocales` are contained in the list of supported UI
   * locales which are specified by `supportedUiLocales` configuration parameter of
   * the service.
   *
   * [3] CLIENT INFORMATION
   *
   * The authorization server implementation should show information about the client
   * application to the end-user. The information is embedded in `client` parameter
   * in the response from `/auth/authorization` API.
   *
   * [4] SCOPES
   *
   * A client application requires authorization for specific permissions. In OAuth
   * 2.0 specification, "scope" is a technical term which represents a permission.
   * `scopes` parameter in the response from `/auth/authorization` API is a list of
   * scopes requested by the client application. The service implementation should
   * show the end-user the scopes.
   *
   * The authorization server implementation may choose not to show scopes to which
   * the end-user has given consent in the past. To put it the other way around, the
   * authorization server implementation may show only the scopes to which the
   * end-user has not given consent yet. However, if the value of `prompts` response
   * parameter contains `CONSENT`, the authorization server implementation has to
   * obtain explicit consent from the end-user even if the end-user has given consent
   * to all the requested scopes in the past.
   *
   * Note that Authlete provides APIs to manage records of granted scopes
   * (`/api/client/granted_scopes/*` APIs), but the APIs work only in the case the
   * Authlete server you use is a dedicated Authlete server (contact
   * sales@authlete.com for details). In other words, the APIs of the shared Authlete
   * server are disabled intentionally (in order to prevent garbage data from being
   * accumulated) and they return 403 Forbidden.
   *
   * It is ensured that the values in `scopes` parameter are contained in the list of
   * supported scopes which are specified by `supportedScopes` configuration
   * parameter of the service.
   *
   * [5] DYNAMIC SCOPES
   *
   * The authorization request may include dynamic scopes. The list of recognized
   * dynamic scopes are accessible by getDynamicScopes() method. See the description
   * of the
   * [DynamicScope](https://authlete.github.io/authlete-java-common/com/authlete/common/dto/DynamicScope.html)
   * class for details about dynamic scopes.
   *
   * [6] AUTHORIZATION DETAILS
   *
   * The authorization server implementation should show the end-user "authorization
   * details" if the request includes it. The value of `authorization_details`
   * parameter in the response is the content of the `authorization_details` request
   * parameter.
   *
   * See "OAuth 2.0 Rich Authorization Requests" for details.
   *
   * [7] PURPOSE
   *
   * The authorization server implementation must show the value of the `purpose`
   * request parameter if it supports
   * [OpenID Connect for Identity Assurance 1.0](https://openid.net/specs/openid-connect-4-identity-assurance-1_0.html).
   * See
   * [8. Transaction-specific Purpose](https://openid.net/specs/openid-connect-4-identity-assurance-1_0.html#rfc.section.8)
   * in the specification for details.
   *
   * Note that the value of `purpose` response parameter is the value of the purpose
   * request parameter.
   *
   * [7] END-USER AUTHENTICATION
   *
   * Necessarily, the end-user must be authenticated (= must login the service)
   * before granting authorization to the client application. Simply put, a login
   * form is expected to be displayed for end-user authentication. The service
   * implementation must follow the steps described below to comply with OpenID
   * Connect. (Or just always show a login form if it's too much of a bother.)
   *
   * (i) Get the value of `prompts` response parameter. It corresponds to the value
   * of the `prompt` request parameter. Details of the request parameter are
   * described in
   * [3.1.2.1. Authentication Request](https://openid.net/specs/openid-connect-core-1_0.html#AuthRequest)
   * of OpenID Connect Core 1.0.
   *
   * (ii) If the value of `prompts` parameter is `SELECT_ACCOUNT` display a form to
   * let the end-user select on of his/her accounts for login. If `subject` response
   * parameter is not `null`, it is the end-user ID that the client application
   * expects, so the value should be used to determine the value of the login ID.
   * Note that a subject and a login ID are not necessarily equal. If the value of
   * `subject` response parameter is `null`, the value of `loginHint` response
   * parameter should be referred to as a hint to determine the value of the login
   * ID. The value of `loginHint` response parameter is simply the value of the
   * `login_hint` request parameter.
   *
   * (iii) If the value of `prompts` response parameter contains `LOGIN`, display a
   * form to urge the end-user to login even if the end-user has already logged in.
   * If the value of `subject` response parameter is not `null`, it is the end-user
   * ID that the client application expects, so the value should be used to determine
   * the value of the login ID. Note that a subject and a login ID are not
   * necessarily equal. If the value of `subject` response parameter is `null`, the
   * value of `loginHint` response parameter should be referred to as a hint to
   * determine the value of the login ID. The value of `loginHint` response parameter
   * is simply the value of the `login_hint` request parameter.
   *
   * (iv) If the value of `prompts` response parameter does not contain `LOGIN`, the
   * authorization server implementation does not have to authenticate the end-user
   * if all the conditions described below are satisfied. If any one of the
   * conditions is not satisfied, show a login form to authenticate the end-user.
   *
   * - An end-user has already logged in the service.
   *
   * - The login ID of the current end-user matches the value of `subject` response
   *   parameter. This check is required only when the value of `subject` response
   *   parameter is a non-null value.
   *
   * - The max age, which is the number of seconds contained in `maxAge` response
   *   parameter, has not passed since the current end-user logged in your service.
   *   This check is required only when the value of `maxAge` response parameter is a
   *   non-zero value.
   *
   * - If the authorization server implementation does not manage authentication time
   *   of end-users (= if the authorization server implementation cannot know when
   *   end-users logged in) and if the value of `maxAge` response parameter is a
   *   non-zero value, a login form should be displayed.
   *
   * - The ACR (Authentication Context Class Reference) of the authentication
   *   performed for the current end-user satisfies one of the ACRs listed in `acrs`
   *   response parameter. This check is required only when the value of `acrs`
   *   response parameter is a non-empty array.
   *
   * In every case, the end-user authentication must satisfy one of the ACRs listed
   * in `acrs` response parameter when the value of `acrs` response parameter is a
   * non-empty array and `acrEssential` response parameter is `true`.
   *
   * [9] GRANT/DENY BUTTONS
   *
   * The end-user is supposed to choose either (1) to grant authorization to the
   * client application or (2) to deny the authorization request. The UI must have UI
   * components to accept the judgment by the user. Usually, a button to grant
   * authorization and a button to deny the request are provided.
   *
   * When the value of `subject` response parameter is not `null`, the end-user
   * authentication must be performed for the subject, meaning that the authorization
   * server implementation should repeatedly show a login form until the subject is
   * successfully authenticated.
   *
   * The end-user will choose either (1) to grant authorization to the client
   * application or (2) to deny the authorization request. When the end-user chose to
   * deny the authorization request, call Authlete's `/auth/authorization/fail` API
   * with `reason=DENIED` and use the response from the API to generate a response to
   * the client application.
   *
   * When the end-user chose to grant authorization to the client application, the
   * authorization server implementation has to issue an authorization code, an ID
   * token, and/or an access token to the client application. (There is a special
   * case. When `response_type=none`, nothing is issued.) Issuing the tokens can be
   * performed by calling Authlete's `/auth/authorization/issue` API. Read [ISSUE]
   * written above in the description for the case of `action=NO_INTERACTION`.
   *
   * </details>
   *
   * @example
   * ```ts
   * const response = await client.auth.authorization.process(
   *   'serviceId',
   *   {
   *     parameters:
   *       'response_type=code&client_id=26478243745571&redirect_uri=https%3A%2F%2Fmy-client.example.com%2Fcb1&scope=timeline.read+history.read&code_challenge=E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM&code_challenge_method=S256',
   *   },
   * );
   * ```
   */
  process(
    serviceID: string,
    body: AuthorizationProcessParams,
    options?: RequestOptions,
  ): APIPromise<AuthorizationProcessResponse> {
    return this._client.post(path`/api/${serviceID}/auth/authorization`, { body, ...options });
  }
}

/**
 * The authorization details. This represents the value of the
 * `authorization_details` request parameter in the preceding device authorization
 * request which is defined in "OAuth 2.0 Rich Authorization Requests".
 */
export interface AuthorizationDetails {
  /**
   * Elements of this authorization details.
   */
  elements?: Array<TokenAPI.AuthorizationDetailsElement>;
}

export interface CredentialOfferInfo {
  /**
   * The Authentication Context Class Reference of the user authentication performed
   * during the course of issuing the credential offer.
   */
  acr?: string;

  /**
   * The flag indicating whether the `authorization_code` object is included in the
   * `grants` object.
   */
  authorizationCodeGrantIncluded?: boolean;

  /**
   * The time at which the user authentication was performed during the course of
   * issuing the credential offer.
   */
  authTime?: number;

  /**
   * The general-purpose arbitrary string.
   */
  context?: string;

  /**
   * The identifier of the credential issuer.
   */
  credentialIssuer?: string;

  /**
   * The credential offer in the JSON format.
   */
  credentialOffer?: string;

  /**
   * The value of the `credentials` object in the JSON format.
   */
  credentials?: string;

  /**
   * The time at which the credential offer will expire.
   */
  expiresAt?: number;

  /**
   * The identifier of the credential offer.
   */
  identifier?: string;

  /**
   * The value of the `issuer_state` property in the `authorization_code` object in
   * the `grants` object.
   */
  issuerState?: string;

  /**
   * The flag indicating whether the `issuer_state` property is included in the
   * `authorization_code` object in the `grants` object.
   */
  issuerStateIncluded?: boolean;

  /**
   * Additional claims that are added to the payload part of the JWT access token.
   */
  jwtAtClaims?: string;

  /**
   * The value of the `pre-authorized_code` property in the
   * `urn:ietf:params:oauth:grant-type:pre-authorized_code` object in the `grants`
   * object.
   */
  preAuthorizedCode?: string;

  /**
   * The flag indicating whether the
   * `urn:ietf:params:oauth:grant-type:pre-authorized_code` object is included in the
   * `grants` object.
   */
  preAuthorizedCodeGrantIncluded?: boolean;

  /**
   * Extra properties to associate with the credential offer.
   */
  properties?: Array<Property>;

  /**
   * The subject associated with the credential offer.
   */
  subject?: string;

  /**
   * The value of the user PIN associated with the credential offer.
   */
  userPin?: string;

  /**
   * The value of the `user_pin_required` property in the
   * `urn:ietf:params:oauth:grant-type:pre-authorized_code` object in the `grants`
   * object.
   */
  userPinRequired?: boolean;
}

/**
 * The display mode which the client application requests by `display` request
 * parameter. When the authorization request does not have `display` request
 * parameter, `PAGE` is set as the default value.
 *
 * It is ensured that the value of `display` is one of the supported display modes
 * which are specified by `supportedDisplays` configuration parameter of the
 * service. If the display mode specified by the authorization request is not
 * supported, an error is raised.
 *
 * Values for this property correspond to the values listed in
 * "[OpenID Connect Core 1.0, 3.1.2.1. Authentication Request](https://openid.net/specs/openid-connect-core-1_0.html#AuthRequest),
 * display".
 */
export type Display = 'PAGE' | 'POPUP' | 'TOUCH' | 'WAP';

export interface DynamicScope {
  /**
   * The scope name.
   */
  name?: string;

  /**
   * The scope value.
   */
  value?: string;
}

export type GmAction = 'SUCCESS' | 'INVALID_REQUEST' | 'NOT_FOUND' | 'INTERNAL_SERVER_ERROR';

/**
 * The prompt that the UI displayed to the end-user must satisfy as the minimum
 * level. This value comes from `prompt` request parameter.
 *
 * When the authorization request does not contain `prompt` request parameter,
 * `CONSENT` is used as the default value.
 *
 * See
 * "[OpenID Connect Core 1.0, 3.1.2.1. Authentication Request](https://openid.net/specs/openid-connect-core-1_0.html#AuthRequest),
 * prompt" for `prompt` request parameter.
 */
export type Prompt = 'NONE' | 'LOGIN' | 'CONSENT' | 'SELECT_ACCOUNT';

export interface Property {
  /**
   * The flag to indicate whether this property hidden from or visible to client
   * applications. If `true`, this property is hidden from client applications.
   * Otherwise, this property is visible to client applications.
   */
  hidden?: boolean;

  /**
   * The key part.
   */
  key?: string;

  /**
   * The value part.
   */
  value?: string;
}

export interface Scope {
  /**
   * The attributes of the scope.
   */
  attributes?: Array<TokenAPI.Pair>;

  /**
   * `true` to mark the scope as default. Scopes marked as default are regarded as
   * requested when an authorization request from a client application does not
   * contain scope request parameter.
   */
  defaultEntry?: boolean;

  /**
   * The description about the scope.
   */
  description?: string;

  /**
   * The descriptions about this scope in multiple languages.
   */
  descriptions?: Array<TaggedValue>;

  /**
   * The name of the scope.
   */
  name?: string;
}

export interface TaggedValue {
  /**
   * The language tag part.
   */
  tag?: string;

  /**
   * The value part.
   */
  value?: string;
}

export interface AuthorizationFailResponse {
  /**
   * The next action that the authorization server implementation should take.
   */
  action?: 'INTERNAL_SERVER_ERROR' | 'BAD_REQUEST' | 'LOCATION' | 'FORM';

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

export interface AuthorizationIssueResponse {
  /**
   * The newly issued access token. Note that an access token is issued from an
   * authorization endpoint only when `response_type` contains token.
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
   * The next action that the authorization server implementation should take.
   */
  action?: 'INTERNAL_SERVER_ERROR' | 'BAD_REQUEST' | 'LOCATION' | 'FORM';

  /**
   * The newly issued authorization code. Note that an authorization code is issued
   * only when `response_type` contains code.
   */
  authorizationCode?: string;

  /**
   * The newly issued ID token. Note that an ID token is issued from an authorization
   * endpoint only when `response_type` contains `id_token`.
   */
  idToken?: string;

  /**
   * The newly issued access token in JWT format. If the service is not configured to
   * issue JWT-based access tokens, this property is always set to `null`.
   */
  jwtAccessToken?: string;

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
   * The information about the ticket.
   */
  ticketInfo?: string;
}

export interface AuthorizationProcessResponse {
  /**
   * This boolean value indicates whether the authentication of the end-user must be
   * one of the ACRs (Authentication Context Class References) listed in `acrs`
   * parameter. This parameter becomes `true` only when (1) the authorization request
   * contains `claims` request parameter and (2) `acr` claim is in it, and (3)
   * `essential` property of the `acr` claim is `true`. See
   * [OpenID Connect Core 1.0, 5.5.1.1. Requesting the "acr" Claim](https://openid.net/specs/openid-connect-core-1_0.html#acrSemantics)
   * for details.
   */
  acrEssential?: boolean;

  /**
   * The list of ACRs (Authentication Context Class References) one of which the
   * client application requests to be satisfied for the authentication of the
   * end-user. This value comes from `acr_values` request parameter or `defaultAcrs`
   * configuration parameter of the client application.
   *
   * See
   * "[OpenID Connect Core 1.0, 3.1.2.1. Authentication Request](https://openid.net/specs/openid-connect-core-1_0.html#AuthRequest),
   * acr_values" for `acr_values` request parameter, and see
   * "[OpenID Connect Dynamic Client Registration 1.0, 2. Client Metadata](https://openid.net/specs/openid-connect-registration-1_0.html#ClientMetadata),
   * default_acr_values" for `defaultAcrs` configuration parameter.
   */
  acrs?: Array<string>;

  /**
   * The next action that the authorization server implementation should take.
   */
  action?: 'INTERNAL_SERVER_ERROR' | 'BAD_REQUEST' | 'LOCATION' | 'FORM' | 'NO_INTERACTION' | 'INTERACTION';

  /**
   * The authorization details. This represents the value of the
   * `authorization_details` request parameter in the preceding device authorization
   * request which is defined in "OAuth 2.0 Rich Authorization Requests".
   */
  authorizationDetails?: AuthorizationDetails;

  /**
   * The list of claims that the client application requests to be embedded in the ID
   * token. The value comes from (1) `id_token` in `claims` request parameter [1]
   * and/or (2) special scopes (`profile`, `email`, `address` and `phone`) which are
   * expanded to claims.
   *
   * See
   * [OpenID Connect Core 1.0, 5.5. Requesting Claims using the "claims" Request Parameter](https://openid.net/specs/openid-connect-core-1_0.html#ClaimsParameter)
   * for `claims` request parameter, and see
   * [OpenID Connect Core 1.0, 5.4. Requesting Claims using Scope Values](https://openid.net/specs/openid-connect-core-1_0.html#ScopeClaims)
   * for the special scopes.
   */
  claims?: Array<string>;

  /**
   * Get the list of claims that the client application requests to be embedded in
   * userinfo responses. The value comes from the `"scope"` and `"claims"` request
   * parameters of the original authorization request.
   */
  claimsAtUserInfo?: Array<string>;

  /**
   * End-user's preferred languages and scripts for claims. This value comes from
   * `claims_locales` request parameter. The format of `claims_locales` is a
   * space-separated list of language tag values defined in
   * [RFC5646](https://datatracker.ietf.org/doc/html/rfc5646). See
   * "[OpenID Connect Core 1.0, 5.2. Claims Languages and Scripts](https://openid.net/specs/openid-connect-core-1_0.html#ClaimsLanguagesAndScripts)"
   * for details.
   *
   * It is ensured that locales listed by this parameters are contained in the list
   * of supported claim locales which are specified by `supportedClaimsLocales`
   * configuration parameter of the service. Unsupported claim locales in the
   * authorization request do not cause an error and are just ignored.
   */
  claimsLocales?: Array<string>;

  client?: AuthorizationProcessResponse.Client;

  /**
   * Flag which indicates whether the entity ID of the client was used when the
   * request for the access token was made.
   */
  clientEntityIdUsed?: boolean;

  /**
   * `true` if the value of the `client_id` request parameter included in the
   * authorization request is the client ID alias. `false` if the value is the
   * original numeric client ID.
   */
  clientIdAliasUsed?: boolean;

  credentialOfferInfo?: CredentialOfferInfo;

  /**
   * The display mode which the client application requests by `display` request
   * parameter. When the authorization request does not have `display` request
   * parameter, `PAGE` is set as the default value.
   *
   * It is ensured that the value of `display` is one of the supported display modes
   * which are specified by `supportedDisplays` configuration parameter of the
   * service. If the display mode specified by the authorization request is not
   * supported, an error is raised.
   *
   * Values for this property correspond to the values listed in
   * "[OpenID Connect Core 1.0, 3.1.2.1. Authentication Request](https://openid.net/specs/openid-connect-core-1_0.html#AuthRequest),
   * display".
   */
  display?: Display;

  /**
   * The dynamic scopes which the client application requested by the scope request
   * parameter.
   */
  dynamicScopes?: Array<DynamicScope>;

  gmAction?: GmAction;

  grant?: AuthorizationProcessResponse.Grant;

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
   * The value of the `id_token` property in the claims request parameter or in the
   * claims property in a request object.
   *
   * A client application may request certain claims be embedded in an ID token or in
   * a response from the userInfo endpoint. There are several ways. Including the
   * `claims` request parameter and including the `claims` property in a request
   * object are such examples. In both the cases, the value of the `claims`
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
   * This value of this property is the value of the `id_token` property in JSON
   * format. For example, if the JSON above is included in an authorization request,
   * this property holds JSON equivalent to the following.
   *
   * ```json
   * {
   *   "auth_time": { "essential": true },
   *   "acr": { "values": ["urn:mace:incommon:iap:silver"] }
   * }
   * ```
   *
   * Note that if a request object is given and it contains the `claims` property and
   * if the `claims` request parameter is also given, this property holds the former
   * value.
   */
  idTokenClaims?: string;

  /**
   * Get the information about the <b>issuable credentials</b> that can be obtained
   * by presenting the access token that will be issued as a result of the
   * authorization request.
   */
  issuableCredentials?: string;

  /**
   * A hint about the login identifier of the end-user. The value comes from
   * `login_hint` request parameter.
   */
  loginHint?: string;

  /**
   * The prompt that the UI displayed to the end-user must satisfy as the minimum
   * level. This value comes from `prompt` request parameter.
   *
   * When the authorization request does not contain `prompt` request parameter,
   * `CONSENT` is used as the default value.
   *
   * See
   * "[OpenID Connect Core 1.0, 3.1.2.1. Authentication Request](https://openid.net/specs/openid-connect-core-1_0.html#AuthRequest),
   * prompt" for `prompt` request parameter.
   */
  lowestPrompt?: Prompt;

  /**
   * The maximum authentication age. This value comes from `max_age` request
   * parameter, or `defaultMaxAge` configuration parameter of the client application
   * when the authorization request does not contain `max_age` request parameter.
   *
   * See
   * "[OpenID Connect Core 1.0, 3.1.2.1. Authentication Request](https://openid.net/specs/openid-connect-core-1_0.html#AuthRequest),
   * max_age" for `max_age` request parameter, and see
   * "[OpenID Connect Dynamic Client Registration 1.0, 2. Client Metadata](https://openid.net/specs/openid-connect-registration-1_0.html#ClientMetadata),
   * default_max_age" for `defaultMaxAge` configuration parameter.
   */
  maxAge?: number;

  /**
   * The list of values of prompt request parameter. See
   * "[OpenID Connect Core 1.0, 3.1.2.1. Authentication Request](https://openid.net/specs/openid-connect-core-1_0.html#AuthRequest),
   * prompt" for prompt request parameter.
   */
  prompts?: Array<Prompt>;

  /**
   * The `purpose` request parameter is defined in
   * [9. Transaction-specific Purpose](https://openid.net/specs/openid-connect-4-identity-assurance-1_0.html#name-transaction-specific-purpos)
   * of
   * [OpenID Connect for Identity Assurance 1.0](https://openid.net/specs/openid-connect-4-identity-assurance-1_0.html)
   * as follows:
   *
   * > purpose: OPTIONAL. String describing the purpose for obtaining certain user
   * > data from the OP. The purpose MUST NOT be shorter than 3 characters and MUST
   * > NOT be longer than 300 characters. If these rules are violated, the
   * > authentication request MUST fail and the OP returns an error invalid_request
   * > to the RP.
   */
  purpose?: string;

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
   * The payload part of the request object. The value of this proprty is `null` if
   * the authorization request does not include a request object.
   */
  requestObjectPayload?: string;

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
   * The scopes that the client application requests. This value comes from `scope`
   * request parameter. If the request does not contain `scope` parameter, this
   * parameter is a list of scopes which are registered as default. If the
   * authorization request does not have `scope` request parameter and the service
   * has not registered any default scope, the value of this parameter is `null`.
   *
   * It is ensured that scopes listed by this parameters are contained in the list of
   * supported scopes which are specified by `supportedScopes` configuration
   * parameter of the service. Unsupported scopes in the authorization request do not
   * cause an error and are just ignored.
   *
   * OpenID Connect defines some scope names which need to be treated specially. The
   * table below lists the special scope names.
   *
   * | Name      | Description                                                                                                                                                                                                                                                                                                                                                                                                                                |
   * | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
   * | `openid`  | This scope must be contained in `scope` request parameter to promote an OAuth 2.0 authorization request to an OpenID Connect request. It is described in "[OpenID Connect Core 1.0, 3.1.2.1. Authentication Request](https://openid.net/specs/openid-connect-core-1_0.html#AuthRequest), scope".                                                                                                                                           |
   * | `profile` | This scope is used to request some claims to be embedded in the ID token. The claims are `name`, `family_name`, `given_name`, `middle_name`, `nickname`, `preferred_username`, `profile`, `picture`, `website`, `gender`, `birthdate`, `zoneinfo`, `locale`, and `updated_at`. It is described in [OpenID Connect Core 1.0, 5.4. Requesting Claims using Scope Values](https://openid.net/specs/openid-connect-core-1_0.html#ScopeClaims). |
   * | `email`   | This scope is used to request some claims to be embedded in the ID token. The claims are `email` and `email_verified`. It is described in [OpenID Connect Core 1.0, 5.4. Requesting Claims using Scope Values](https://openid.net/specs/openid-connect-core-1_0.html#ScopeClaims).                                                                                                                                                         |
   * | `address` | This scope is used to request `address` claim to be embedded in the ID token. It is described in [OpenID Connect Core 1.0, 5.4. Requesting Claims using Scope Values](https://openid.net/specs/openid-connect-core-1_0.html#ScopeClaims).                                                                                                                                                                                                  |
   *
   * The format of `address` claim is not a simple string. It is described in
   * [OpenID Connect Core 1.0, 5.1.1. Address Claim](https://openid.net/specs/openid-connect-core-1_0.html#AddressClaim).
   * | | `phone` | This scope is used to request some claims to be embedded in the ID
   * token. The claims are `phone_number` and `phone_number_verified`. It is
   * described in
   * [OpenID Connect Core 1.0, 5.4. Requesting Claims using Scope Values](https://openid.net/specs/openid-connect-core-1_0.html#ScopeClaims).
   * | | `offline_access` | The following is an excerpt about this scope from
   * [OpenID Connect Core 1.0, 11. Offline Access](https://openid.net/specs/openid-connect-core-1_0.html#OfflineAccess).
   * <blockquote>This scope value requests that an OAuth 2.0 Refresh Token be issued
   * that can be used to obtain an Access Token that grants access to the end-user's
   * userinfo endpoint even when the end-user is not present (not logged
   * in).</blockquote> |
   *
   * Note that, if `response_type` request parameter does not contain code,
   * `offline_acccess` scope is removed from this list even when scope request
   * parameter contains `offline_access`. This behavior is a requirement written in
   * [OpenID Connect Core 1.0, 11. Offline Access](https://openid.net/specs/openid-connect-core-1_0.html#OfflineAccess).
   */
  scopes?: Array<Scope>;

  service?: GetAPI.Service;

  /**
   * The subject (= unique user ID managed by the authorization server
   * implementation) that the client application expects to grant authorization. The
   * value comes from `sub` claim in `claims` request parameter.
   */
  subject?: string;

  /**
   * A ticket issued by Authlete to the service implementation. This is needed when
   * the service implementation calls either `/auth/authorization/fail` API or
   * `/auth/authorization/issue` API.
   */
  ticket?: string;

  /**
   * the value of the `transformed_claims` property in the `claims` request parameter
   * of an authorization request or in the `claims` property in a request object.
   */
  transformedClaims?: string;

  /**
   * The locales that the client application presented as candidates to be used for
   * UI. This value comes from `ui_locales` request parameter. The format of
   * `ui_locales` is a space-separated list of language tag values defined in
   * [RFC5646](https://datatracker.ietf.org/doc/html/rfc5646). See
   * "[OpenID Connect Core 1.0, 3.1.2.1. Authentication Request](https://openid.net/specs/openid-connect-core-1_0.html#AuthRequest),
   * ui_locales" for details.
   *
   * It is ensured that locales listed by this parameters are contained in the list
   * of supported UI locales which are specified by `supportedUiLocales`
   * configuration parameter of the service. Unsupported UI locales in the
   * authorization request do not cause an error and are just ignored.
   */
  uiLocales?: Array<string>;

  /**
   * The value of the `userinfo` property in the `claims` request parameter or in the
   * `claims` property in a request object.
   *
   * A client application may request certain claims be embedded in an ID token or in
   * a response from the userInfo endpoint. There are several ways. Including the
   * `claims` request parameter and including the `claims` property in a request
   * object are such examples. In both the cases, the value of the `claims`
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

export namespace AuthorizationProcessResponse {
  export interface Client {
    /**
     * The client identifier used in Authlete API calls. The value of this property is
     * assigned by Authlete.
     */
    clientId?: number;

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
     * The client type, either `CONFIDENTIAL` or `PUBLIC`. See
     * [RFC 6749, 2.1. Client Types](https://datatracker.ietf.org/doc/html/rfc6749#section-2.1)
     * for details.
     */
    clientType?: 'PUBLIC' | 'CONFIDENTIAL';

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
     * The sequential number of the client. The value of this property is assigned by
     * Authlete.
     */
    number?: number;

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
  }

  export interface Grant {
    /**
     * The authorization details. This represents the value of the
     * `authorization_details` request parameter in the preceding device authorization
     * request which is defined in "OAuth 2.0 Rich Authorization Requests".
     */
    authorizationDetails?: AuthorizationAPI.AuthorizationDetails;

    /**
     * The claims associated with the Grant.
     */
    claims?: Array<string>;

    scopes?: Array<Grant.Scope>;
  }

  export namespace Grant {
    export interface Scope {
      /**
       * List of resource indicators.
       */
      resource?: Array<string>;

      /**
       * Space-delimited scopes.
       */
      scope?: string;
    }
  }
}

export interface AuthorizationFailParams {
  /**
   * The reason of the failure of the authorization request. For more details, see
   * [NO_INTERACTION] in the description of `/auth/authorization` API.
   */
  reason:
    | 'UNKNOWN'
    | 'NOT_LOGGED_IN'
    | 'MAX_AGE_NOT_SUPPORTED'
    | 'EXCEEDS_MAX_AGE'
    | 'DIFFERENT_SUBJECT'
    | 'ACR_NOT_SATISFIED'
    | 'DENIED'
    | 'SERVER_ERROR'
    | 'NOT_AUTHENTICATED'
    | 'ACCOUNT_SELECTION_REQUIRED'
    | 'CONSENT_REQUIRED'
    | 'INTERACTION_REQUIRED'
    | 'INVALID_TARGET';

  /**
   * The ticket issued from Authlete `/auth/authorization` API.
   */
  ticket: string;

  /**
   * The custom description about the authorization failure.
   */
  description?: string;
}

export interface AuthorizationIssueParams {
  /**
   * The subject (= a user account managed by the service) who has granted
   * authorization to the client application.
   */
  subject: string;

  /**
   * The ticket issued from Authlete `/auth/authorization` API.
   */
  ticket: string;

  /**
   * The representation of an access token that may be issued as a result of the
   * Authlete API call.
   */
  accessToken?: string;

  /**
   * The Authentication Context Class Reference performed for the end-user
   * authentication.
   */
  acr?: string;

  /**
   * The authorization details. This represents the value of the
   * `authorization_details` request parameter in the preceding device authorization
   * request which is defined in "OAuth 2.0 Rich Authorization Requests".
   */
  authorizationDetails?: AuthorizationDetails;

  /**
   * The time when the authentication of the end-user occurred. Its value is the
   * number of seconds from `1970-01-01`.
   */
  authTime?: number;

  /**
   * The claims of the end-user (= pieces of information about the end-user) in JSON
   * format. See
   * [OpenID Connect Core 1.0, 5.1. Standard Claims](https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims)
   * for details about the format.
   */
  claims?: string;

  /**
   * Claim key-value pairs that are used to compute transformed claims.
   */
  claimsForTx?: string;

  /**
   * the claims that the user has consented for the client application to know.
   */
  consentedClaims?: Array<string>;

  /**
   * JSON that represents additional JWS header parameters for ID tokens that may be
   * issued based on the authorization request.
   */
  idtHeaderParams?: string;

  /**
   * Additional claims that are added to the payload part of the JWT access token.
   */
  jwtAtClaims?: string;

  /**
   * Extra properties to associate with an access token and/or an authorization code.
   */
  properties?: Array<Property>;

  /**
   * Scopes to associate with an access token and/or an authorization code. If a
   * non-empty string array is given, it replaces the scopes specified by the
   * original authorization request.
   */
  scopes?: Array<string>;

  /**
   * The value of the `sub` claim to embed in an ID token. If this request parameter
   * is `null` or empty, the value of the `subject` request parameter is used as the
   * value of the `sub` claim.
   */
  sub?: string;
}

export interface AuthorizationProcessParams {
  /**
   * OAuth 2.0 authorization request parameters which are the request parameters that
   * the OAuth 2.0 authorization endpoint of the authorization server implementation
   * received from the client application.
   *
   * The value of parameters is either (1) the entire query string when the HTTP
   * method of the request from the client application is `GET` or (2) the entire
   * entity body (which is formatted in `application/x-www-form-urlencoded`) when the
   * HTTP method of the request from the client application is `POST`.
   */
  parameters: string;
}

Authorization.Ticket = Ticket;

export declare namespace Authorization {
  export {
    type AuthorizationDetails as AuthorizationDetails,
    type CredentialOfferInfo as CredentialOfferInfo,
    type Display as Display,
    type DynamicScope as DynamicScope,
    type GmAction as GmAction,
    type Prompt as Prompt,
    type Property as Property,
    type Scope as Scope,
    type TaggedValue as TaggedValue,
    type AuthorizationFailResponse as AuthorizationFailResponse,
    type AuthorizationIssueResponse as AuthorizationIssueResponse,
    type AuthorizationProcessResponse as AuthorizationProcessResponse,
    type AuthorizationFailParams as AuthorizationFailParams,
    type AuthorizationIssueParams as AuthorizationIssueParams,
    type AuthorizationProcessParams as AuthorizationProcessParams,
  };

  export {
    Ticket as Ticket,
    type TicketUpdateResponse as TicketUpdateResponse,
    type TicketInfoResponse as TicketInfoResponse,
    type TicketUpdateParams as TicketUpdateParams,
    type TicketInfoParams as TicketInfoParams,
  };
}
