// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as GetAPI from './get';
import { Get, GetListParams, GetListResponse } from './get';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class Authorization extends APIResource {
  get: GetAPI.Get = new GetAPI.Get(this._client);

  /**
   * Update attributes of all existing access tokens given to a client application.
   *
   * @example
   * ```ts
   * const authorization =
   *   await client.client.authorization.update('clientId', {
   *     serviceId: 'serviceId',
   *     subject: 'john',
   *     scopes: ['history.read'],
   *   });
   * ```
   */
  update(
    clientID: string,
    params: AuthorizationUpdateParams,
    options?: RequestOptions,
  ): APIPromise<AuthorizationUpdateResponse> {
    const { serviceId, ...body } = params;
    return this._client.post(path`/api/${serviceId}/client/authorization/update/${clientID}`, {
      body,
      ...options,
    });
  }

  /**
   * Delete all existing access tokens issued to a client application by an end-user.
   *
   * The subject parameter is required and can be provided either in the path or as a
   * query parameter.
   *
   * @example
   * ```ts
   * const authorization =
   *   await client.client.authorization.delete('clientId', {
   *     serviceId: 'serviceId',
   *     subject: 'subject',
   *   });
   * ```
   */
  delete(clientID: string, params: AuthorizationDeleteParams, options?: RequestOptions): APIPromise<unknown> {
    const { serviceId, subject } = params;
    return this._client.delete(path`/api/${serviceId}/client/authorization/delete/${clientID}`, {
      query: { subject },
      ...options,
    });
  }
}

export interface AuthorizationUpdateResponse {
  /**
   * The code which represents the result of the API call.
   */
  resultCode?: string;

  /**
   * A short message which explains the result of the API call.
   */
  resultMessage?: string;
}

export type AuthorizationDeleteResponse = unknown;

export interface AuthorizationUpdateParams {
  /**
   * Path param: A service ID.
   */
  serviceId: string;

  /**
   * Body param: The subject (= unique identifier) of the end-user who has granted
   * authorization to the client application.
   */
  subject: string;

  /**
   * Body param: An array of new scopes. Optional. If a non-null value is given, the
   * new scopes are set to all existing access tokens. If an API call is made using
   * `"Content-Type: application/x-www-form-urlencoded"`, scope names listed in this
   * request parameter should be delimited by spaces (after form encoding, spaces are
   * converted to `+`).
   */
  scopes?: Array<string>;
}

export interface AuthorizationDeleteParams {
  /**
   * Path param: A service ID.
   */
  serviceId: string;

  /**
   * Query param: Unique user ID of an end-user.
   */
  subject: string;
}

Authorization.Get = Get;

export declare namespace Authorization {
  export {
    type AuthorizationUpdateResponse as AuthorizationUpdateResponse,
    type AuthorizationDeleteResponse as AuthorizationDeleteResponse,
    type AuthorizationUpdateParams as AuthorizationUpdateParams,
    type AuthorizationDeleteParams as AuthorizationDeleteParams,
  };

  export { Get as Get, type GetListResponse as GetListResponse, type GetListParams as GetListParams };
}
