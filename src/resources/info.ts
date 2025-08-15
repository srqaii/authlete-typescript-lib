// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Info extends APIResource {
  /**
   * get the server version and enabled features
   */
  retrieve(options?: RequestOptions): APIPromise<InfoRetrieveResponse> {
    return this._client.get('/api/info', options);
  }
}

export interface InfoRetrieveResponse {
  /**
   * the features that the server supports.
   */
  features: Array<string>;

  /**
   * The server version.
   */
  version: string;
}

export declare namespace Info {
  export { type InfoRetrieveResponse as InfoRetrieveResponse };
}
