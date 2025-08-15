// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';

export class Misc extends APIResource {
  /**
   * Echo test endpoint. Will return all path parameters in the request
   */
  echo(options?: RequestOptions): APIPromise<void> {
    return this._client.get('/api/misc/echo', {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}
