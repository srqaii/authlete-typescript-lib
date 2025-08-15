// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as GetAPI from './get';
import { Get, GetListResponse, GetRetrieveParams, GetRetrieveResponse } from './get';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class HskResource extends APIResource {
  get: GetAPI.Get = new GetAPI.Get(this._client);

  /**
   * Create Security Key
   */
  create(serviceID: string, body: HskCreateParams, options?: RequestOptions): APIPromise<HskCreateResponse> {
    return this._client.post(path`/api/${serviceID}/hsk/create`, { body, ...options });
  }

  /**
   * Delete Security Key
   */
  delete(handle: string, params: HskDeleteParams, options?: RequestOptions): APIPromise<HskDeleteResponse> {
    const { serviceId } = params;
    return this._client.delete(path`/api/${serviceId}/hsk/delete/${handle}`, options);
  }
}

/**
 * Holds information about a key managed in an HSM (Hardware Security Module)
 */
export interface Hsk {
  /**
   * The handle for the key on the HSM. A handle is a base64url-encoded 256-bit
   * random value (43 letters) which is assigned by Authlete on the call of the
   * /api/hsk/create API
   */
  handle?: string;

  /**
   * The name of the HSM. The identifier for the HSM that sits behind the Authlete
   * server. For example, "google".
   */
  hsmName?: string;

  /**
   * Key ID for the key on the HSM.
   */
  kid?: string;

  /**
   * The key type (EC or RSA)
   */
  kty?: string;

  /**
   * The public key that corresponds to the key on the HSM.
   */
  publicKey?: string;

  /**
   * Get the use of the key on the HSM. When the key use is "sig" (signature), the
   * private key on the HSM is used to sign data and the corresponding public key is
   * used to verify the signature. When the key use is "enc" (encryption), the
   * private key on the HSM is used to decrypt encrypted data which have been
   * encrypted with the corresponding public key
   */
  use?: string;
}

export interface HskCreateResponse {
  /**
   * Result of the API call
   */
  action?: 'SUCCESS' | 'INVALID_REQUEST' | 'NOT_FOUND' | 'SERVER_ERROR';

  /**
   * Holds information about a key managed in an HSM (Hardware Security Module)
   */
  hsk?: Hsk;

  /**
   * The code which represents the result of the API call.
   */
  resultCode?: string;

  /**
   * A short message which explains the result of the API call.
   */
  resultMessage?: string;
}

export interface HskDeleteResponse {
  /**
   * Result of the API call
   */
  action?: 'SUCCESS' | 'INVALID_REQUEST' | 'NOT_FOUND' | 'SERVER_ERROR';

  /**
   * Holds information about a key managed in an HSM (Hardware Security Module)
   */
  hsk?: Hsk;

  /**
   * The code which represents the result of the API call.
   */
  resultCode?: string;

  /**
   * A short message which explains the result of the API call.
   */
  resultMessage?: string;
}

export interface HskCreateParams {
  /**
   * The handle for the key on the HSM. A handle is a base64url-encoded 256-bit
   * random value (43 letters) which is assigned by Authlete on the call of the
   * /api/hsk/create API
   */
  handle?: string;

  /**
   * The name of the HSM. The identifier for the HSM that sits behind the Authlete
   * server. For example, "google".
   */
  hsmName?: string;

  /**
   * Key ID for the key on the HSM.
   */
  kid?: string;

  /**
   * The key type (EC or RSA)
   */
  kty?: string;

  /**
   * The public key that corresponds to the key on the HSM.
   */
  publicKey?: string;

  /**
   * The key on the HSM. When the key use is "sig" (signature), the private key on
   * the HSM is used to sign data and the corresponding public key is used to verify
   * the signature. When the key use is "enc" (encryption), the private key on the
   * HSM is used to decrypt encrypted data which have been encrypted with the
   * corresponding public key
   */
  use?: string;
}

export interface HskDeleteParams {
  /**
   * A service ID.
   */
  serviceId: string;
}

HskResource.Get = Get;

export declare namespace HskResource {
  export {
    type Hsk as Hsk,
    type HskCreateResponse as HskCreateResponse,
    type HskDeleteResponse as HskDeleteResponse,
    type HskCreateParams as HskCreateParams,
    type HskDeleteParams as HskDeleteParams,
  };

  export {
    Get as Get,
    type GetRetrieveResponse as GetRetrieveResponse,
    type GetListResponse as GetListResponse,
    type GetRetrieveParams as GetRetrieveParams,
  };
}
