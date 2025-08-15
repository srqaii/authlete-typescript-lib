// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as GetAPI from './client/get';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Federation extends APIResource {
  /**
   * This API gathers the federation configuration about a service.
   *
   * The authorization server implementation should retrieve the value of the
   * <code>action</code> response parameter from the API response and take the
   * following steps according to the value.
   *
   * <h3><code>OK</code></h3>
   *
   * When the value of the <code> action</code> response parameter is
   * <code>OK</code>, it means that Authlete could prepare an entity configuration
   * successfully.
   *
   * In this case, the implementation of the entity configuration endpoint of the
   * authorization server should return an HTTP response to the client application
   * with the HTTP status code "`200 OK`" and the content type
   * "`application/entity-statement+jwt`". The message body (= an entity
   * configuration in the JWT format) of the response has been prepared by Authlete's
   * `/federation/configuration` API and it is available as the
   * <code>responseContent</code> response parameter.
   *
   * The implementation of the entity configuration endpoint can construct an HTTP
   * response by doing like below.
   *
   * <pre style="border: solid 1px black; padding: 0.5em;">
   * 200 OK
   * Content-Type: application/entity-statement+jwt
   * (Other HTTP headers)
   *
   * <i>(the value of the responseContent response parameter)</i></pre>
   *
   * <h3><code>NOT_FOUND</code></h3>
   *
   * When the value of the <code> action</code> response parameter is
   * <code>NOT_FOUND</code>, it means that the service configuration has not enabled
   * the feature of <a href=
   * "https://openid.net/specs/openid-connect-federation-1_0.html">OpenID Connect
   * Federation 1.0</a> and so the client application should have not access the
   * entity configuration endpoint.
   *
   * In this case, the implementation of the entity configuration endpoint of the
   * authorization server should return an HTTP response to the client application
   * with the HTTP status code "`404 Not Found`" and the content type
   * "`application/json`". The message body (= error information in the JSON format)
   * of the response has been prepared by Authlete's `/federation/configuration` API
   * and it is available as the <code>responseContent</code> response parameter.
   *
   * The implementation of the entity configuration endpoint can construct an HTTP
   * response by doing like below.
   *
   * <pre style="border: solid 1px black; padding: 0.5em;">
   * 404 Not Found
   * Content-Type: application/json
   * (Other HTTP headers)
   *
   * <i>(the value of the responseContent response parameter)</i></pre>
   *
   * <h3><code>INTERNAL_SERVER_ERROR</code></h3>
   *
   * could prepare an entity configuration successfully.
   *
   * In this case, the implementation of the entity configuration endpoint of the
   * authorization server should return an HTTP response to the client application
   * with the HTTP status code "`200 OK`" and the content type
   * "`application/entity-statement+jwt`". The message body (= an entity
   * configuration in the JWT format) of the response has been prepared by Authlete's
   * `/federation/configuration` API and it is available as the
   * <code>responseContent</code> response parameter.
   *
   * The implementation of the entity configuration endpoint can construct an HTTP
   * response by doing like below.
   *
   * <pre style="border: solid 1px black; padding: 0.5em;">
   * 200 OK
   * Content-Type: application/entity-statement+jwt
   * (Other HTTP headers)
   *
   * <i>(the value of the responseContent response parameter)</i></pre>
   *
   * </details>
   */
  createConfiguration(
    serviceID: string,
    params: FederationCreateConfigurationParams | null | undefined = undefined,
    options?: RequestOptions,
  ): APIPromise<FederationCreateConfigurationResponse> {
    const { body } = params ?? {};
    return this._client.post(path`/api/${serviceID}/federation/configuration`, { body: body, ...options });
  }

  /**
   * The Authlete API is for implementations of the <b>federation registration
   * endpoint</b> that accepts "explicit client registration". Its details are
   * defined in <a href="https://openid.net/specs/openid-connect-federation-1_0.html"
   *
   * > OpenID Connect Federation 1.0</a>.
   *
   * </p>
   *
   * <p>
   * The endpoint accepts `POST` requests whose `Content-Type`
   * is either of the following.
   * </p>
   *
   * <ol>
   *   <li>`application/entity-statement+jwt`
   *   <li>`application/trust-chain+json`
   * </ol>
   *
   * <p>
   * When the `Content-Type` of a request is
   * `application/entity-statement+jwt`, the content of the request is
   * the entity configuration of a relying party that is to be registered.
   * In this case, the implementation of the federation registration endpoint
   * should call Authlete's `/federation/registration` API with the
   * entity configuration set to the `entityConfiguration` request
   * parameter.
   * </p>
   *
   * <p>
   * On the other hand, when the `Content-Type` of a request is
   * `application/trust-chain+json`, the content of the request is a
   * JSON array that contains entity statements in JWT format. The sequence
   * of the entity statements composes the trust chain of a relying party
   * that is to be registered. In this case, the implementation of the
   * federation registration endpoint should call Authlete's
   * `/federation/registration` API with the trust chain set to the
   * `trustChain` request parameter.
   * </p>
   */
  register(
    serviceID: string,
    body: FederationRegisterParams,
    options?: RequestOptions,
  ): APIPromise<FederationRegisterResponse> {
    return this._client.post(path`/api/${serviceID}/federation/registration`, { body, ...options });
  }
}

export interface FederationCreateConfigurationResponse {
  /**
   * The next action that the authorization server implementation should take.
   */
  action?: 'OK' | 'NOT_FOUND' | 'INTERNAL_SERVER_ERROR';

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

export interface FederationRegisterResponse {
  /**
   * The next action that the authorization server implementation should take.
   */
  action?: 'OK' | 'BAD_REQUEST' | 'NOT_FOUND' | 'INTERNAL_SERVER_ERROR';

  client?: GetAPI.Client;

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
}

export interface FederationCreateConfigurationParams {
  body?: unknown;
}

export interface FederationRegisterParams {
  /**
   * The entity configuration of a relying party.
   */
  entityConfiguration?: string;

  /**
   * The trust chain of a relying party.
   */
  trustChain?: string;
}

export declare namespace Federation {
  export {
    type FederationCreateConfigurationResponse as FederationCreateConfigurationResponse,
    type FederationRegisterResponse as FederationRegisterResponse,
    type FederationCreateConfigurationParams as FederationCreateConfigurationParams,
    type FederationRegisterParams as FederationRegisterParams,
  };
}
