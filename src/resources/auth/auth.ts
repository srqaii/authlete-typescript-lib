// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as IntrospectionAPI from './introspection';
import {
  GrantType,
  Introspection,
  IntrospectionProcessParams,
  IntrospectionProcessResponse,
  IntrospectionStandardParams,
  IntrospectionStandardResponse,
} from './introspection';
import * as UserinfoAPI from './userinfo';
import {
  Userinfo,
  UserinfoIssueParams,
  UserinfoIssueResponse,
  UserinfoProcessParams,
  UserinfoProcessResponse,
} from './userinfo';
import * as AuthorizationAPI from './authorization/authorization';
import {
  Authorization,
  AuthorizationDetails,
  AuthorizationFailParams,
  AuthorizationFailResponse,
  AuthorizationIssueParams,
  AuthorizationIssueResponse,
  AuthorizationProcessParams,
  AuthorizationProcessResponse,
  CredentialOfferInfo,
  Display,
  DynamicScope,
  GmAction,
  Prompt,
  Property,
  Scope,
  TaggedValue,
} from './authorization/authorization';
import * as TokenAPI from './token/token';
import {
  AuthorizationDetailsElement,
  Pair,
  Token,
  TokenCreateParams,
  TokenCreateResponse,
  TokenDeleteParams,
  TokenFailParams,
  TokenFailResponse,
  TokenIssueParams,
  TokenIssueResponse,
  TokenProcessParams,
  TokenProcessResponse,
  TokenRevokeParams,
  TokenRevokeResponse,
  TokenUpdateParams,
  TokenUpdateResponse,
} from './token/token';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Auth extends APIResource {
  authorization: AuthorizationAPI.Authorization = new AuthorizationAPI.Authorization(this._client);
  token: TokenAPI.Token = new TokenAPI.Token(this._client);
  introspection: IntrospectionAPI.Introspection = new IntrospectionAPI.Introspection(this._client);
  userinfo: UserinfoAPI.Userinfo = new UserinfoAPI.Userinfo(this._client);

  /**
   * This API revokes access tokens and refresh tokens.
   *
   * <details>
   * <summary>Description</summary>
   *
   * This API is supposed to be called from within the implementation of the
   * revocation endpoint ([RFC 7009](tools.ietf.org/html/rfc7009)) of the
   * authorization server implementation in order to revoke access tokens and refresh
   * tokens.
   *
   * The response from `/auth/revocation` API has some parameters. Among them, it is
   * `action` parameter that the authorization server implementation should check
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
   * **INVALID_CLIENT**
   *
   * When the value of `action` is `INVALID_CLIENT`, it means that authentication of
   * the client failed. In this case, the HTTP status of the response to the client
   * application is either "400 Bad Request" or "401 Unauthorized". The description
   * about `invalid_client` shown below is an excerpt from
   * [RFC 6749](https://datatracker.ietf.org/doc/html/rfc6749).
   *
   * `invalid_client`
   *
   * > Client authentication failed (e.g., unknown client, no client authentication
   * > included, or unsupported authentication method). The authorization server MAY
   * > return an HTTP 401 (Unauthorized) status code to indicate which HTTP
   * > authentication schemes are supported. If the client attempted to authenticate
   * > via the `Authorization` request header field, the authorization server MUST
   * > respond with an HTTP 401 (Unauthorized) status code and include the
   * > `WWW-Authenticate` response header field matching the authentication scheme
   * > used by the client.
   *
   * In either case, the value of `responseContent` is a JSON string which can be
   * used as the entity body of the response to the client application.
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
   * The HTTP status of the response returned to the client application must be "400
   * Bad Request" and the content type must be `application/json`.
   * [RFC 7009](https://datatracker.ietf.org/doc/html/rfc7009),
   * [2.2.1. Error Respons](https://datatracker.ietf.org/doc/html/rfc7009#section-2.2.1)
   * states "The error presentation conforms to the definition in
   * [Section 5.2](https://datatracker.ietf.org/doc/html/rfc6749#section-5.2) of
   * [[RFC 6749](https://datatracker.ietf.org/doc/html/rfc6749)]."
   *
   * The value of `responseContent` is a JSON string which describes the error, so it
   * can be used as the entity body of the response.
   *
   * The following illustrates the response which the authorization server
   * implementation should generate and return to the client application.
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
   * **OK**
   *
   * When the value of `action` is `OK`, it means that the request from the client
   * application is valid and the presented token has been revoked successfully or if
   * the client submitted an invalid token. Note that invalid tokens do not cause an
   * error. See
   * [2.2. Revocation Response](https://datatracker.ietf.org/doc/html/rfc7009#section-2.2)
   * for details.
   *
   * The HTTP status of the response returned to the client application must be 200
   * OK.
   *
   * If the original request from the client application contains callback request
   * parameter and its value is not empty, the content type should be
   * `application/javascript` and the content should be a JavaScript snippet for
   * JSONP.
   *
   * The value of `responseContent` is JavaScript snippet if the original request
   * from the client application contains callback request parameter and its value is
   * not empty. Otherwise, the value of `responseContent` is `null`.
   *
   * ```
   * HTTP/1.1 200 OK
   * Content-Type: application/javascript
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
   * const response = await client.auth.revoke('serviceId', {
   *   parameters:
   *     'VFGsNK-5sXiqterdaR7b5QbRX9VTwVCQB87jbr2_xAI&token_type_hint=access_token',
   *   clientId: '26478243745571',
   *   clientSecret:
   *     'gXz97ISgLs4HuXwOZWch8GEmgL4YMvUJwu3er_kDVVGcA0UOhA9avLPbEmoeZdagi9yC_-tEiT2BdRyH9dbrQQ',
   * });
   * ```
   */
  revoke(
    serviceID: string,
    body: AuthRevokeParams,
    options?: RequestOptions,
  ): APIPromise<AuthRevokeResponse> {
    return this._client.post(path`/api/${serviceID}/auth/revocation`, { body, ...options });
  }
}

export interface AuthRevokeResponse {
  /**
   * The next action that the authorization server implementation should take.
   */
  action?: 'INTERNAL_SERVER_ERROR' | 'INVALID_CLIENT' | 'BAD_REQUEST' | 'OK';

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

export interface AuthRevokeParams {
  /**
   * OAuth 2.0 token revocation request parameters which are the request parameters
   * that the OAuth 2.0 token revocation endpoint
   * ([RFC 7009](https://datatracker.ietf.org/doc/html/rfc7009)) of the authorization
   * server implementation received from the client application.
   *
   * The value of parameters is the entire entity body (which is formatted in
   * `application/x-www-form-urlencoded`) of the request from the client application.
   */
  parameters: string;

  /**
   * The client certificate used in the TLS connection between the client application
   * and the revocation endpoint.
   */
  clientCertificate?: string;

  /**
   * The certificate path presented by the client during client authentication.
   */
  clientCertificatePath?: string;

  /**
   * The client ID extracted from `Authorization` header of the revocation request
   * from the client application.
   *
   * If the revocation endpoint of the authorization server implementation supports
   * Basic Authentication as a means of client authentication, and the request from
   * the client application contains its client ID in `Authorization` header, the
   * value should be extracted and set to this parameter.
   */
  clientId?: string;

  /**
   * The client secret extracted from `Authorization` header of the revocation
   * request from the client application.
   *
   * If the revocation endpoint of the authorization server implementation supports
   * basic authentication as a means of client authentication, and the request from
   * the client application contained its client secret in `Authorization` header,
   * the value should be extracted and set to this parameter.
   */
  clientSecret?: string;
}

Auth.Authorization = Authorization;
Auth.Token = Token;
Auth.Introspection = Introspection;
Auth.Userinfo = Userinfo;

export declare namespace Auth {
  export { type AuthRevokeResponse as AuthRevokeResponse, type AuthRevokeParams as AuthRevokeParams };

  export {
    Authorization as Authorization,
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
    Token as Token,
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

  export {
    Introspection as Introspection,
    type GrantType as GrantType,
    type IntrospectionProcessResponse as IntrospectionProcessResponse,
    type IntrospectionStandardResponse as IntrospectionStandardResponse,
    type IntrospectionProcessParams as IntrospectionProcessParams,
    type IntrospectionStandardParams as IntrospectionStandardParams,
  };

  export {
    Userinfo as Userinfo,
    type UserinfoIssueResponse as UserinfoIssueResponse,
    type UserinfoProcessResponse as UserinfoProcessResponse,
    type UserinfoIssueParams as UserinfoIssueParams,
    type UserinfoProcessParams as UserinfoProcessParams,
  };
}
