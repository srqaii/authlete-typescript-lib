// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as GetAPI from './get';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Registration extends APIResource {
  /**
   * Register a client. This API is supposed to be used to implement a client
   * registration endpoint that complies with
   * [RFC 7591](https://datatracker.ietf.org/doc/html/rfc7591) (OAuth 2.0 Dynamic
   * Client Registration Protocol).
   *
   * <details>
   * <summary>Description</summary>
   *
   * This API is supposed to be called from the within the implementation of the
   * client registration endpoint of the authorization server. The authorization
   * server implementation should retrieve the value of `action` from the response
   * and take the following steps according to the value.
   *
   * **INTERNAL_SERVER_ERROR**
   *
   * When the value of `action` is `INTERNAL_SERVER_ERROR`, it means that the API
   * call from the authorization server implementation was wrong or that an error
   * occurred in Authlete.
   *
   * In either case, from a viewpoint of the client or developer, it is an error on
   * the server side. Therefore, the authorization server implementation should
   * generate a response with "500 Internal Server Error"s and `application/json`.
   *
   * The value of `responseContent` is a JSON string which describes the error, so it
   * can be used as the entity body of the response.
   *
   * The following illustrates the response which the authorization server
   * implementation should generate and return to the client or developer.
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
   * or developer since "500 Internal Server Error" is not required by the
   * specification.
   *
   * **BAD_REQUEST**
   *
   * When the value of `action` is `BAD_REQUEST`, it means that the request from the
   * client or developer was wrong.
   *
   * The authorization server implementation should generate a response with "400 Bad
   * Request" and `application/json`.
   *
   * The value of `responseContent` is a JSON string which describes the error, so it
   * can be used as the entity body of the response.
   *
   * The following illustrates the response which the authorization server
   * implementation should generate and return to the client or developer.
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
   * **CREATED**
   *
   * When the value of `action` is `CREATED`, it means that the request from the
   * client or developer is valid.
   *
   * The authorization server implementation should generate a response to the client
   * or developer with "201 CREATED" and `application/json`.
   *
   * The `responseContent` a JSON string which can be used as the entity body of the
   * response.
   *
   * The following illustrates the response which the authorization server
   * implementation should generate and return to the client or developer.
   *
   * ```
   * HTTP/1.1 201 CREATED
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
   * const registration =
   *   await client.client.registration.create('serviceId', {
   *     json: '{ "client_name": "My Dynamic Client" }',
   *   });
   * ```
   */
  create(
    serviceID: string,
    body: RegistrationCreateParams,
    options?: RequestOptions,
  ): APIPromise<RegistrationCreateResponse> {
    return this._client.post(path`/api/${serviceID}/client/registration`, { body, ...options });
  }

  /**
   * Get a dynamically registered client. This API is supposed to be used to
   * implement a client registration management endpoint that complies with
   * [RFC 7592](https://datatracker.ietf.org/doc/html/rfc7592) (OAuth 2.0 Dynamic
   * Registration Management).
   *
   * <details>
   * <summary>Description</summary>
   *
   * This API is supposed to be called from the within the implementation of the
   * client registration management endpoint of the authorization server. The
   * authorization server implementation should retrieve the value of `action` from
   * the response and take the following steps according to the value.
   *
   * **INTERNAL_SERVER_ERROR**
   *
   * When the value of `action` is `INTERNAL_SERVER_ERROR`, it means that the API
   * call from the authorization server implementation was wrong or that an error
   * occurred in Authlete.
   *
   * In either case, from a viewpoint of the client or developer, it is an error on
   * the server side. Therefore, the authorization server implementation should
   * generate a response to the client or developer with "500 Internal Server Error"s
   * and `application/json`.
   *
   * The value of `responseContent` is a JSON string which describes the error, so it
   * can be used as the entity body of the response.
   *
   * The following illustrates the response which the authorization server
   * implementation should generate and return to the client or developer.
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
   * or developer since "500 Internal Server Error" is not required by the
   * specification.
   *
   * **BAD_REQUEST**
   *
   * When the value of `action` is `BAD_REQUEST`, it means that the request from the
   * client or developer was wrong.
   *
   * The authorization server implementation should generate a response to the client
   * or developer with "400 Bad Request" and `application/json`.
   *
   * The value of `responseContent` is a JSON string which describes the error, so it
   * can be used as the entity body of the response.
   *
   * The following illustrates the response which the authorization server
   * implementation should generate and return to the client or developer.
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
   * When the value of `action` is `UNAUTHORIZED`, it means that the registration
   * access token used by the client configuration request (RFC 7592) is invalid, or
   * the client application which the token is tied to does not exist any longer or
   * is invalid.
   *
   * The HTTP status of the response returned to the client application must be "401
   * Unauthorized" and the content type must be `application/json`.
   *
   * The value of `responseContent` is a JSON string which describes the error, so it
   * can be used as the entity body of the response.
   *
   * The following illustrates the response which the endpoint implementation should
   * generate and return to the client application.
   *
   * ```
   * HTTP/1.1 401 Unauthorized
   * Content-Type: application/json
   * Cache-Control: no-store
   * Pragma: no-cache
   *
   * {responseContent}
   * ```
   *
   * NOTE: The `UNAUTHORIZED` value was added in October, 2021. See the description
   * of `Service.unauthorizedOnClientConfigSupported` for details.
   *
   * **OK**
   *
   * When the value of `action` is `OK`, it means that the request from the client or
   * developer is valid.
   *
   * The authorization server implementation should generate a response to the client
   * or developer with "200 OK" and `application/json`.
   *
   * The `responseContent` a JSON string which can be used as the entity body of the
   * response.
   *
   * The following illustrates the response which the authorization server
   * implementation should generate and return to the client or developer.
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
   * const registration =
   *   await client.client.registration.retrieve('serviceId', {
   *     body: {
   *       clientId: '26837717140341',
   *       token: 'qs4Tu5TV7qqDYT93bFs6ISyhTByMF9o-54GY4JU5vTA',
   *     },
   *   });
   * ```
   */
  retrieve(
    serviceID: string,
    params: RegistrationRetrieveParams,
    options?: RequestOptions,
  ): APIPromise<unknown> {
    const { body } = params;
    return this._client.post(path`/api/${serviceID}/client/registration/get`, { body: body, ...options });
  }

  /**
   * Update a dynamically registered client. This API is supposed to be used to
   * implement a client registration management endpoint that complies with
   * [RFC 7592](https://datatracker.ietf.org/doc/html/rfc7592) (OAuth 2.0 Dynamic
   * Registration Management).
   *
   * <details>
   * <summary>Description</summary>
   *
   * This API is supposed to be called from the within the implementation of the
   * client registration management endpoint of the authorization server. The
   * authorization server implementation should retrieve the value of `action` from
   * the response and take the following steps according to the value.
   *
   * **INTERNAL_SERVER_ERROR**
   *
   * When the value of `action` is `INTERNAL_SERVER_ERROR`, it means that the API
   * call from the authorization server implementation was wrong or that an error
   * occurred in Authlete.
   *
   * In either case, from a viewpoint of the client or developer, it is an error on
   * the server side. Therefore, the authorization server implementation should
   * generate a response with "500 Internal Server Error"s and `application/json`.
   *
   * The value of `responseContent` is a JSON string which describes the error, so it
   * can be used as the entity body of the response.
   *
   * The following illustrates the response which the authorization server
   * implementation should generate and return to the client or developer.
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
   * or developer since "500 Internal Server Error" is not required by the
   * specification.
   *
   * **BAD_REQUEST**
   *
   * When the value of `action` is `BAD_REQUEST`, it means that the request from the
   * client or developer was wrong.
   *
   * The authorization server implementation should generate a response with "400 Bad
   * Request" and `application/json`.
   *
   * The value of `responseContent` is a JSON string which describes the error, so it
   * can be used as the entity body of the response.
   *
   * The following illustrates the response which the authorization server
   * implementation should generate and return to the client or developer.
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
   * When the value of `action` is `UNAUTHORIZED`, it means that the registration
   * access token used by the client configuration request (RFC 7592) is invalid, or
   * the client application which the token is tied to does not exist any longer or
   * is invalid.
   *
   * The HTTP status of the response returned to the client application must be "401
   * Unauthorized" and the content type must be `application/json`.
   *
   * The value of `responseContent` is a JSON string which describes the error, so it
   * can be used as the entity body of the response.
   *
   * The following illustrates the response which the endpoint implementation should
   * generate and return to the client application.
   *
   * ```
   * HTTP/1.1 401 Unauthorized
   * Content-Type: application/json
   * Cache-Control: no-store
   * Pragma: no-cache
   *
   * {responseContent}
   * ```
   *
   * NOTE: The `UNAUTHORIZED` value was added in October, 2021. See the description
   * of `Service.unauthorizedOnClientConfigSupported` for details.
   *
   * **UPDATED**
   *
   * When the value of `action` is `UPDATED`, it means that the request from the
   * client or developer is valid.
   *
   * The authorization server implementation should generate a response to the client
   * or developer with "200 OK" and `application/json`.
   *
   * The `responseContent` a JSON string which can be used as the entity body of the
   * response.
   *
   * The following illustrates the response which the authorization server
   * implementation should generate and return to the client or developer.
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
   * const registration =
   *   await client.client.registration.update('serviceId', {
   *     token: 'qs4Tu5TV7qqDYT93bFs6ISyhTByMF9o-54GY4JU5vTA',
   *     clientId: '26837717140341',
   *     json: '{"client_name":"My Updated Dynamic Client","default_max_age":0,"registration_client_uri":"https://my-service.example.com/dcr/register/26837717140341","client_id":"26837717140341","token_endpoint_auth_method":"client_secret_basic","require_pushed_authorization_requests":false,"backchannel_user_code_parameter":false,"client_secret":"bMsjvZm2FE1_mqJgxhmYj_Wr8rA0Pia_A_j-V076qQm6-P1edKB055W579GBe7MSbOdxZ3dJKsKinCtdIFwxpw","tls_client_certificate_bound_access_tokens":false,"id_token_signed_response_alg":"RS256","subject_type":"public","require_signed_request_object":false}',
   *   });
   * ```
   */
  update(
    serviceID: string,
    body: RegistrationUpdateParams,
    options?: RequestOptions,
  ): APIPromise<RegistrationUpdateResponse> {
    return this._client.post(path`/api/${serviceID}/client/registration/update`, { body, ...options });
  }

  /**
   * Delete a dynamically registered client. This API is supposed to be used to
   * implement a client registration management endpoint that complies with
   * [RFC 7592](https://datatracker.ietf.org/doc/html/rfc7592) (OAuth 2.0 Dynamic
   * Registration Management).
   *
   * <details>
   * <summary>Description</summary>
   *
   * This API is supposed to be called from the within the implementation of the
   * client registration management endpoint of the authorization server. The
   * authorization server implementation should retrieve the value of `action` from
   * the response and take the following steps according to the value.
   *
   * **INTERNAL_SERVER_ERROR**
   *
   * When the value of `action` is `INTERNAL_SERVER_ERROR`, it means that the API
   * call from the authorization server implementation was wrong or that an error
   * occurred in Authlete.
   *
   * In either case, from a viewpoint of the client or developer, it is an error on
   * the server side. Therefore, the authorization server implementation should
   * generate a response with "500 Internal Server Error"s and `application/json`.
   *
   * The value of `responseContent` is a JSON string which describes the error, so it
   * can be used as the entity body of the response.
   *
   * The following illustrates the response which the authorization server
   * implementation should generate and return to the client or developer.
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
   * or developer since "500 Internal Server Error" is not required by the
   * specification.
   *
   * **BAD_REQUEST**
   *
   * When the value of `action` is `BAD_REQUEST`, it means that the request from the
   * client or developer was wrong.
   *
   * The authorization server implementation should generate a response with "400 Bad
   * Request" and `application/json`.
   *
   * The value of `responseContent` is a JSON string which describes the error, so it
   * can be used as the entity body of the response.
   *
   * The following illustrates the response which the authorization server
   * implementation should generate and return to the client or developer.
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
   * When the value of `action` is `UNAUTHORIZED`, it means that the registration
   * access token used by the client configuration request (RFC 7592) is invalid, or
   * the client application which the token is tied to does not exist any longer or
   * is invalid.
   *
   * The HTTP status of the response returned to the client application must be "401
   * Unauthorized" and the content type must be `application/json`.
   *
   * The value of `responseContent` is a JSON string which describes the error, so it
   * can be used as the entity body of the response.
   *
   * The following illustrates the response which the endpoint implementation should
   * generate and return to the client application.
   *
   * ```
   * HTTP/1.1 401 Unauthorized
   * Content-Type: application/json
   * Cache-Control: no-store
   * Pragma: no-cache
   *
   * {responseContent}
   * ```
   *
   * NOTE: The `UNAUTHORIZED` value was added in October, 2021. See the description
   * of `Service.unauthorizedOnClientConfigSupported` for details.
   *
   * **DELETED**
   *
   * When the value of `action` is `DELETED`, it means that the request from the
   * client or developer is valid.
   *
   * The authorization server implementation should generate a response to the client
   * or developer with "204 No Content".
   *
   * The following illustrates the response which the authorization server
   * implementation should generate and return to the client or developer.
   *
   * ```
   * HTTP/1.1 204 No Content
   * Cache-Control: no-store
   * Pragma: no-cache
   * ```
   *
   * </details>
   *
   * @example
   * ```ts
   * const registration =
   *   await client.client.registration.delete('serviceId', {
   *     token: 'qs4Tu5TV7qqDYT93bFs6ISyhTByMF9o-54GY4JU5vTA',
   *     clientId: '26837717140341',
   *   });
   * ```
   */
  delete(
    serviceID: string,
    body: RegistrationDeleteParams,
    options?: RequestOptions,
  ): APIPromise<RegistrationDeleteResponse> {
    return this._client.post(path`/api/${serviceID}/client/registration/delete`, { body, ...options });
  }
}

export interface RegistrationCreateResponse {
  /**
   * The next action that the authorization server implementation should take.
   */
  action?: 'INTERNAL_SERVER_ERROR' | 'BAD_REQUEST' | 'CREATED';

  client?: GetAPI.Client;

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

export type RegistrationRetrieveResponse = unknown;

export interface RegistrationUpdateResponse {
  /**
   * The next action that the authorization server implementation should take.
   */
  action?: 'INTERNAL_SERVER_ERROR' | 'BAD_REQUEST' | 'UPDATED' | 'UNAUTHORIZED';

  client?: GetAPI.Client;

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

export interface RegistrationDeleteResponse {
  /**
   * The next action that the authorization server implementation should take.
   */
  action?: 'INTERNAL_SERVER_ERROR' | 'BAD_REQUEST' | 'DELETED' | 'UNAUTHORIZED';

  client?: GetAPI.Client;

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

export interface RegistrationCreateParams {
  /**
   * Client metadata in JSON format that complies with
   * [RFC 7591](https://datatracker.ietf.org/doc/html/rfc7591) (OAuth 2.0 Dynamic
   * Client Registration Protocol).
   */
  json: string;

  /**
   * The client registration access token. Used only for GET, UPDATE, and DELETE
   * requests.
   */
  token?: string;

  /**
   * The client's identifier. Used for GET, UPDATE, and DELETE requests
   */
  clientId?: string;
}

export interface RegistrationRetrieveParams {
  body: unknown;
}

export interface RegistrationUpdateParams {
  /**
   * Client registration access token.
   */
  token: string;

  /**
   * Client ID.
   */
  clientId: string;

  /**
   * Client metadata in JSON format that complies with
   * [RFC 7591](https://datatracker.ietf.org/doc/html/rfc7591) (OAuth 2.0 Dynamic
   * Client Registration Protocol).
   */
  json: string;
}

export interface RegistrationDeleteParams {
  /**
   * Client registration access token.
   */
  token: string;

  /**
   * Client ID.
   */
  clientId: string;
}

export declare namespace Registration {
  export {
    type RegistrationCreateResponse as RegistrationCreateResponse,
    type RegistrationRetrieveResponse as RegistrationRetrieveResponse,
    type RegistrationUpdateResponse as RegistrationUpdateResponse,
    type RegistrationDeleteResponse as RegistrationDeleteResponse,
    type RegistrationCreateParams as RegistrationCreateParams,
    type RegistrationRetrieveParams as RegistrationRetrieveParams,
    type RegistrationUpdateParams as RegistrationUpdateParams,
    type RegistrationDeleteParams as RegistrationDeleteParams,
  };
}
