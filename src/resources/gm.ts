// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Gm extends APIResource {
  /**
   * The API is for the implementation of the grant management endpoint which is
   * defined in "<a href="https://openid.net/specs/fapi-grant-management.html">Grant
   * Management for OAuth 2.0</a>".
   *
   * @example
   * ```ts
   * const response = await client.gm.processRequest(
   *   'serviceId',
   *   {
   *     accessToken:
   *       'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE1NTk4MTE3NTAsImlzcyI6IjU3Mjk3NDA4ODY3In0K.csmdholMVcmjqHe59YWgLGNvm7I5Whp4phQCoGxyrlRGMnTgsfxtwyxBgMXQqEPD5q5k9FaEWNk37K8uAtSwrA',
   *     gmAction: 'REVOKE',
   *     grantId: '57297408867',
   *     subject: '123457884',
   *   },
   * );
   * ```
   */
  processRequest(
    serviceID: string,
    body: GmProcessRequestParams,
    options?: RequestOptions,
  ): APIPromise<GmProcessRequestResponse> {
    return this._client.post(path`/api/${serviceID}/gm`, { body, ...options });
  }
}

export interface GmProcessRequestResponse {
  /**
   * The next action that the authorization server implementation should take.
   */
  action?:
    | 'OK'
    | 'NO_CONTENT'
    | 'UNAUTHORIZED'
    | 'FORBIDDEN'
    | 'NOT_FOUND'
    | 'CALLER_ERROR'
    | 'AUTHLETE_ERROR';

  /**
   * Get the expected nonce value for DPoP proof JWT, which should be used as the
   * value of the `DPoP-Nonce` HTTP header.
   */
  dpopNonce?: string;

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

export interface GmProcessRequestParams {
  /**
   * An access token to introspect.
   */
  accessToken?: string;

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
   * The grant management action of the device authorization request.
   *
   * The `grant_management_action` request parameter is defined in
   * [Grant Management for OAuth 2.0](https://openid.net/specs/fapi-grant-management.html).
   */
  gmAction?: 'CREATE' | 'QUERY' | 'REPLACE' | 'REVOKE' | 'MERGE';

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
}

export declare namespace Gm {
  export {
    type GmProcessRequestResponse as GmProcessRequestResponse,
    type GmProcessRequestParams as GmProcessRequestParams,
  };
}
