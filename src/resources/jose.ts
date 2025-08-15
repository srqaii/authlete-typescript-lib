// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Jose extends APIResource {
  /**
   * This API verifies a JOSE object.
   *
   * @example
   * ```ts
   * const response = await client.jose.verify('serviceId', {
   *   jose: 'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE1NTk4MTE3NTAsImlzcyI6IjU3Mjk3NDA4ODY3In0K.csmdholMVcmjqHe59YWgLGNvm7I5Whp4phQCoGxyrlRGMnTgsfxtwyxBgMXQqEPD5q5k9FaEWNk37K8uAtSwrA',
   *   clientIdentifier: '57297408867',
   *   clockSkew: 100,
   *   signedByClient: true,
   * });
   * ```
   */
  verify(
    serviceID: string,
    body: JoseVerifyParams,
    options?: RequestOptions,
  ): APIPromise<JoseVerifyResponse> {
    return this._client.post(path`/api/${serviceID}/jose/verify`, { body, ...options });
  }
}

export interface JoseVerifyResponse {
  /**
   * The list of error messages.
   */
  errorDescriptions?: Array<string>;

  /**
   * The list of invalid claims.
   */
  invalidClaims?: Array<string>;

  /**
   * The list of missing claims.
   */
  missingClaims?: Array<string>;

  /**
   * The code which represents the result of the API call.
   */
  resultCode?: string;

  /**
   * A short message which explains the result of the API call.
   */
  resultMessage?: string;

  /**
   * The result of the signature verification.
   */
  signatureValid?: boolean;

  /**
   * The result of the verification on the JOSE object.
   */
  valid?: boolean;
}

export interface JoseVerifyParams {
  /**
   * A JOSE object.
   */
  jose: string;

  /**
   * The identifier of the client application whose keys are required for
   * verification of the JOSE object.
   */
  clientIdentifier?: string;

  /**
   * Allowable clock skew in seconds.
   */
  clockSkew?: number;

  /**
   * Mandatory claims that are required to be included in the JOSE object.
   */
  mandatoryClaims?: string;

  /**
   * The flag which indicates whether the signature of the JOSE object has been
   * signed by a client application with the client's private key or a shared
   * symmetric key.
   */
  signedByClient?: boolean;
}

export declare namespace Jose {
  export { type JoseVerifyResponse as JoseVerifyResponse, type JoseVerifyParams as JoseVerifyParams };
}
