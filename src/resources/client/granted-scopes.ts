// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class GrantedScopes extends APIResource {
  /**
   * Delete the set of scopes that an end-user has granted to a client application.
   *
   * <details>
   * <summary>Description</summary>
   *
   * Even if records about granted scopes are deleted by calling this API, existing
   * access tokens are not deleted and scopes of existing access tokens are not
   * changed.
   *
   * </details>
   *
   * The subject parameter is required and can be provided either in the path or as a
   * query parameter.
   *
   * @example
   * ```ts
   * const grantedScope =
   *   await client.client.grantedScopes.delete('clientId', {
   *     serviceId: 'serviceId',
   *     subject: 'subject',
   *   });
   * ```
   */
  delete(
    clientID: string,
    params: GrantedScopeDeleteParams,
    options?: RequestOptions,
  ): APIPromise<GrantedScopeDeleteResponse> {
    const { serviceId, subject } = params;
    return this._client.delete(path`/api/${serviceId}/client/granted_scopes/delete/${clientID}`, {
      query: { subject },
      ...options,
    });
  }

  /**
   * Get the set of scopes that a user has granted to a client application.
   *
   * <details>
   * <summary>Description</summary>
   *
   * Possible values for `requestableScopes` parameter in the response from this API
   * are as follows.
   *
   * **null**
   *
   * The user has not granted authorization to the client application in the past, or
   * records about the combination of the user and the client application have been
   * deleted from Authlete's DB.
   *
   * **An empty set**
   *
   * The user has granted authorization to the client application in the past, but no
   * scopes are associated with the authorization.
   *
   * **A set with at least one element**
   *
   * The user has granted authorization to the client application in the past and
   * some scopes are associated with the authorization. These scopes are returned.
   * Example: `[ "profile", "email" ]`
   *
   * The subject parameter is required and can be provided either in the path or as a
   * query parameter.
   *
   * </details>
   *
   * @example
   * ```ts
   * const grantedScope = await client.client.grantedScopes.get(
   *   'clientId',
   *   { serviceId: 'serviceId', subject: 'subject' },
   * );
   * ```
   */
  get(
    clientID: string,
    params: GrantedScopeGetParams,
    options?: RequestOptions,
  ): APIPromise<GrantedScopeGetResponse> {
    const { serviceId, ...query } = params;
    return this._client.get(path`/api/${serviceId}/client/granted_scopes/get/${clientID}`, {
      query,
      ...options,
    });
  }
}

export interface GrantedScopeDeleteResponse {
  /**
   * The code which represents the result of the API call.
   */
  resultCode?: string;

  /**
   * A short message which explains the result of the API call.
   */
  resultMessage?: string;
}

export interface GrantedScopeGetResponse {
  /**
   * Get the client ID.
   */
  clientId?: number;

  /**
   * Get the scopes granted to the client application by the last authorization
   * process by the user (who is identified by the subject).
   */
  latestGrantedScopes?: Array<string>;

  /**
   * Get the scopes granted to the client application by all the past authorization
   * processes. Note that revoked scopes are not included.
   */
  mergedGrantedScopes?: Array<string>;

  /**
   * Get the timestamp in milliseconds since Unix epoch at which this record was
   * modified.
   */
  modifiedAt?: number;

  /**
   * The code which represents the result of the API call.
   */
  resultCode?: string;

  /**
   * A short message which explains the result of the API call.
   */
  resultMessage?: string;

  /**
   * A short message which explains the result of the API call.
   */
  serviceApiKey?: number;

  /**
   * Get the subject (= unique identifier) of the user who has granted authorization
   * to the client.
   */
  subject?: string;
}

export interface GrantedScopeDeleteParams {
  /**
   * Path param: A service ID.
   */
  serviceId: string;

  /**
   * Query param: Unique user ID of an end-user.
   */
  subject: string;
}

export interface GrantedScopeGetParams {
  /**
   * Path param: A service ID.
   */
  serviceId: string;

  /**
   * Query param: Unique user ID of an end-user.
   */
  subject: string;
}

export declare namespace GrantedScopes {
  export {
    type GrantedScopeDeleteResponse as GrantedScopeDeleteResponse,
    type GrantedScopeGetResponse as GrantedScopeGetResponse,
    type GrantedScopeDeleteParams as GrantedScopeDeleteParams,
    type GrantedScopeGetParams as GrantedScopeGetParams,
  };
}
