// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as HskAPI from './hsk';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Get extends APIResource {
  /**
   * Get Security Key
   */
  retrieve(
    handle: string,
    params: GetRetrieveParams,
    options?: RequestOptions,
  ): APIPromise<GetRetrieveResponse> {
    const { serviceId } = params;
    return this._client.get(path`/api/${serviceId}/hsk/get/${handle}`, options);
  }

  /**
   * List Security Keys
   */
  list(serviceID: string, options?: RequestOptions): APIPromise<GetListResponse> {
    return this._client.get(path`/api/${serviceID}/hsk/get/list`, options);
  }
}

export interface GetRetrieveResponse {
  /**
   * Result of the API call
   */
  action?: 'SUCCESS' | 'INVALID_REQUEST' | 'NOT_FOUND' | 'SERVER_ERROR';

  /**
   * Holds information about a key managed in an HSM (Hardware Security Module)
   */
  hsk?: HskAPI.Hsk;

  /**
   * The code which represents the result of the API call.
   */
  resultCode?: string;

  /**
   * A short message which explains the result of the API call.
   */
  resultMessage?: string;
}

export interface GetListResponse {
  /**
   * Result of the API call
   */
  action?: 'SUCCESS' | 'INVALID_REQUEST' | 'SERVER_ERROR';

  /**
   * List of HSK
   */
  hsks?: Array<HskAPI.Hsk>;

  /**
   * The code which represents the result of the API call.
   */
  resultCode?: string;

  /**
   * A short message which explains the result of the API call.
   */
  resultMessage?: string;
}

export interface GetRetrieveParams {
  /**
   * A service ID.
   */
  serviceId: string;
}

export declare namespace Get {
  export {
    type GetRetrieveResponse as GetRetrieveResponse,
    type GetListResponse as GetListResponse,
    type GetRetrieveParams as GetRetrieveParams,
  };
}
