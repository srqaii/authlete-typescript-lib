// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import { APIPromise } from '../../../core/api-promise';
import { buildHeaders } from '../../../internal/headers';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class RequestableScopes extends APIResource {
  /**
   * Update requestable scopes of a client
   *
   * @example
   * ```ts
   * const requestableScope =
   *   await client.client.extension.requestableScopes.update(
   *     'clientId',
   *     { serviceId: 'serviceId' },
   *   );
   * ```
   */
  update(
    clientID: string,
    params: RequestableScopeUpdateParams,
    options?: RequestOptions,
  ): APIPromise<RequestableScopeUpdateResponse> {
    const { serviceId, ...body } = params;
    return this._client.put(path`/api/${serviceId}/client/extension/requestable_scopes/update/${clientID}`, {
      body,
      ...options,
    });
  }

  /**
   * Delete requestable scopes of a client
   *
   * @example
   * ```ts
   * await client.client.extension.requestableScopes.delete(
   *   'clientId',
   *   { serviceId: 'serviceId' },
   * );
   * ```
   */
  delete(clientID: string, params: RequestableScopeDeleteParams, options?: RequestOptions): APIPromise<void> {
    const { serviceId } = params;
    return this._client.delete(
      path`/api/${serviceId}/client/extension/requestable_scopes/delete/${clientID}`,
      { ...options, headers: buildHeaders([{ Accept: '*/*' }, options?.headers]) },
    );
  }

  /**
   * Get the requestable scopes per client
   *
   * @example
   * ```ts
   * const requestableScope =
   *   await client.client.extension.requestableScopes.get(
   *     'clientId',
   *     { serviceId: 'serviceId' },
   *   );
   * ```
   */
  get(
    clientID: string,
    params: RequestableScopeGetParams,
    options?: RequestOptions,
  ): APIPromise<RequestableScopeGetResponse> {
    const { serviceId } = params;
    return this._client.get(
      path`/api/${serviceId}/client/extension/requestable_scopes/get/${clientID}`,
      options,
    );
  }
}

export interface RequestableScopeUpdateResponse {
  requestableScopes?: Array<string>;
}

export interface RequestableScopeGetResponse {
  requestableScopes?: Array<string>;
}

export interface RequestableScopeUpdateParams {
  /**
   * Path param: A service ID.
   */
  serviceId: string;

  /**
   * Body param: The set of scopes that the client application is allowed to request.
   * This parameter will be one of the following. Details are described in the
   * description.
   *
   * - an empty set
   * - a set with at least one element
   *
   * If this parameter contains scopes that the service does not support, those
   * scopes are just ignored. Also, if this parameter is `null` or is not included in
   * the request, it is equivalent to calling
   * `/client/extension/requestable_scopes/delete` API.
   */
  requestableScopes?: Array<string>;
}

export interface RequestableScopeDeleteParams {
  /**
   * A service ID.
   */
  serviceId: string;
}

export interface RequestableScopeGetParams {
  /**
   * A service ID.
   */
  serviceId: string;
}

export declare namespace RequestableScopes {
  export {
    type RequestableScopeUpdateResponse as RequestableScopeUpdateResponse,
    type RequestableScopeGetResponse as RequestableScopeGetResponse,
    type RequestableScopeUpdateParams as RequestableScopeUpdateParams,
    type RequestableScopeDeleteParams as RequestableScopeDeleteParams,
    type RequestableScopeGetParams as RequestableScopeGetParams,
  };
}
