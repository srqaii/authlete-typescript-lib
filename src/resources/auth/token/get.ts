// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as IntrospectionAPI from '../introspection';
import * as AuthorizationAPI from '../authorization/authorization';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class Get extends APIResource {
  /**
   * Get the list of access tokens that are associated with the service.
   *
   * @example
   * ```ts
   * const gets = await client.auth.token.get.list('serviceId');
   * ```
   */
  list(
    serviceID: string,
    query: GetListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<GetListResponse> {
    return this._client.get(path`/api/${serviceID}/auth/token/get/list`, { query, ...options });
  }
}

export interface GetListResponse {
  /**
   * An array of access tokens.
   */
  accessTokens?: Array<GetListResponse.AccessToken>;

  client?: GetListResponse.Client;

  /**
   * End index of search results (exclusive).
   */
  end?: number;

  /**
   * Start index of search results (inclusive).
   */
  start?: number;

  /**
   * Unique user ID of an end-user.
   */
  subject?: string;

  /**
   * Unique ID of a client developer.
   */
  totalCount?: number;
}

export namespace GetListResponse {
  export interface AccessToken {
    /**
     * The timestamp at which the access token will expire.
     */
    accessTokenExpiresAt?: number;

    /**
     * The hash of the access token.
     */
    accessTokenHash?: string;

    /**
     * The ID of the client associated with the access token.
     */
    clientId?: number;

    /**
     * The timestamp at which the access token was first created.
     */
    createdAt?: number;

    /**
     * The grant type of the access token when the access token was created.
     */
    grantType?: IntrospectionAPI.GrantType;

    /**
     * The timestamp at which the access token was last refreshed using the refresh
     * token.
     */
    lastRefreshedAt?: number;

    /**
     * The properties associated with the access token.
     */
    properties?: Array<AuthorizationAPI.Property>;

    /**
     * The timestamp at which the refresh token will expire.
     */
    refreshTokenExpiresAt?: number;

    /**
     * The hash of the refresh token.
     */
    refreshTokenHash?: string;

    /**
     * The scopes associated with the access token.
     */
    scopes?: Array<string>;

    /**
     * The subject (= unique user ID) associated with the access token.
     */
    subject?: string;
  }

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
     * The sequential number of the client. The value of this property is assigned by
     * Authlete.
     */
    number?: number;
  }
}

export interface GetListParams {
  /**
   * Client Identifier (client ID or client ID alias).
   */
  clientIdentifier?: string;

  /**
   * End index of search results (exclusive). The default value is 5.
   */
  end?: number;

  /**
   * Start index of search results (inclusive). The default value is 0.
   */
  start?: number;

  /**
   * Unique user ID.
   */
  subject?: string;
}

export declare namespace Get {
  export { type GetListResponse as GetListResponse, type GetListParams as GetListParams };
}
