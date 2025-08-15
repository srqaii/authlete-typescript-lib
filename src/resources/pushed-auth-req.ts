// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class PushedAuthReq extends APIResource {
  /**
   * This API creates a pushed request authorization. It authenticates the client and
   * creates a authorization_uri to be returned by the authorization server.
   *
   * @example
   * ```ts
   * const pushedAuthReq = await client.pushedAuthReq.create(
   *   'serviceId',
   *   {
   *     parameters:
   *       'response_type=code%20id_token&client_id=5921531358155430&redirect_uri=https%3A%2F%2Fserver.example.com%2Fcb&state=SOME_VALUE_ABLE_TO_PREVENT_CSRF&scope=openid&nonce=SOME_VALUE_ABLE_TO_PREVENT_REPLAY_ATTACK&code_challenge=5ZWDQJiryK3eaLtSeFV8y1XySMCWtyITxICLaTwvK8g&code_challenge_method=S256',
   *     clientId: '5921531358155430',
   *     clientSecret:
   *       'P_FouxWlI7zcOep_9vBwR9qMAVJQiCiUiK1HrAP4GziOyezHQpqY0f5dHXK4JT4tnvI51OkbWVoEM9GnOyJViA',
   *   },
   * );
   * ```
   */
  create(
    serviceID: string,
    body: PushedAuthReqCreateParams,
    options?: RequestOptions,
  ): APIPromise<PushedAuthReqCreateResponse> {
    return this._client.post(path`/api/${serviceID}/pushed_auth_req`, { body, ...options });
  }
}

export interface PushedAuthReqCreateResponse {
  /**
   * The next action that the authorization server implementation should take. Any
   * other value other than "CREATED" should be handled as unsuccessful result.
   */
  action?:
    | 'CREATED'
    | 'BAD_REQUEST'
    | 'UNAUTHORIZED'
    | 'FORBIDDEN'
    | 'PAYLOAD_TOO_LARGE'
    | 'INTERNAL_SERVER_ERROR';

  /**
   * The client authentication method that the client application declares that it
   * uses at the token endpoint. This property corresponds to
   * `token_endpoint_auth_method` in
   * [OpenID Connect Dynamic Client Registration 1.0, 2. Client Metadata](https://openid.net/specs/openid-connect-registration-1_0.html#ClientMetadata).
   */
  clientAuthMethod?:
    | 'NONE'
    | 'CLIENT_SECRET_BASIC'
    | 'CLIENT_SECRET_POST'
    | 'CLIENT_SECRET_JWT'
    | 'PRIVATE_KEY_JWT'
    | 'TLS_CLIENT_AUTH'
    | 'SELF_SIGNED_TLS_CLIENT_AUTH';

  /**
   * Get the expected nonce value for DPoP proof JWT, which should be used as the
   * value of the `DPoP-Nonce` HTTP header.
   */
  dpopNonce?: string;

  /**
   * The request_uri created to the client to be used as request_uri on the authorize
   * call.
   */
  requestUri?: string;

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

export interface PushedAuthReqCreateParams {
  /**
   * The pushed authorization request body received from the client application.
   *
   * The value of parameters is the entire entity body (which is formatted in
   * `application/x-www-form-urlencoded`) of the request from the client application.
   */
  parameters: string;

  /**
   * The client certificate from the MTLS connection to pushed authorization endpoint
   * from the client application.
   */
  clientCertificate?: string;

  /**
   * The certificate path presented by the client during client authentication. These
   * certificates are strings in PEM format.
   */
  clientCertificatePath?: string;

  /**
   * The client ID extracted from `Authorization` header of the pushed request from
   * the client application.
   */
  clientId?: string;

  /**
   * The client secret extracted from `Authorization` header of the pushed
   * authorization request from the client application.
   */
  clientSecret?: string;

  /**
   * DPoP Header
   */
  dpop?: string;

  /**
   * HTTP Method (for DPoP validation).
   */
  htm?: string;

  /**
   * HTTP URL base (for DPoP validation).
   */
  htu?: string;
}

export declare namespace PushedAuthReq {
  export {
    type PushedAuthReqCreateResponse as PushedAuthReqCreateResponse,
    type PushedAuthReqCreateParams as PushedAuthReqCreateParams,
  };
}
