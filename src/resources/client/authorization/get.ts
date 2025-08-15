// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class Get extends APIResource {
  /**
   * Get a list of client applications that an end-user has authorized.
   *
   * The subject parameter is required and can be provided either in the path or as a
   * query parameter.
   *
   * @example
   * ```ts
   * const gets = await client.client.authorization.get.list(
   *   'serviceId',
   *   { subject: 'subject' },
   * );
   * ```
   */
  list(serviceID: string, query: GetListParams, options?: RequestOptions): APIPromise<GetListResponse> {
    return this._client.get(path`/api/${serviceID}/client/authorization/get/list`, { query, ...options });
  }
}

export interface GetListResponse {
  /**
   * An array of clients.
   */
  clients?: Array<unknown>;

  /**
   * Unique ID of a client developer.
   */
  developer?: string;

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

export interface GetListParams {
  subject: string;

  /**
   * Unique ID of a client developer.
   */
  developer?: string;

  /**
   * End index of search results (exclusive). The default value is 5.
   */
  end?: number;

  /**
   * Start index of search results (inclusive). The default value is 0.
   */
  start?: number;
}

export declare namespace Get {
  export { type GetListResponse as GetListResponse, type GetListParams as GetListParams };
}
