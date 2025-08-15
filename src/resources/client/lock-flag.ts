// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class LockFlag extends APIResource {
  /**
   * Lock and unlock a client
   *
   * @example
   * ```ts
   * const lockFlag = await client.client.lockFlag.update(
   *   'clientIdentifier',
   *   { serviceId: 'serviceId', clientLocked: true },
   * );
   * ```
   */
  update(
    clientIdentifier: string,
    params: LockFlagUpdateParams,
    options?: RequestOptions,
  ): APIPromise<LockFlagUpdateResponse> {
    const { serviceId, ...body } = params;
    return this._client.post(path`/api/${serviceId}/client/lock_flag/update/${clientIdentifier}`, {
      body,
      ...options,
    });
  }
}

export interface LockFlagUpdateResponse {
  /**
   * The code which represents the result of the API call.
   */
  resultCode: string;

  /**
   * A short message which explains the result of the API call.
   */
  resultMessage: string;
}

export interface LockFlagUpdateParams {
  /**
   * Path param: A service ID.
   */
  serviceId: string;

  /**
   * Body param: The flag value to be set
   */
  clientLocked: boolean;
}

export declare namespace LockFlag {
  export {
    type LockFlagUpdateResponse as LockFlagUpdateResponse,
    type LockFlagUpdateParams as LockFlagUpdateParams,
  };
}
