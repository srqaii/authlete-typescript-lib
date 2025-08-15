// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Jwks extends APIResource {
  /**
   * This API gathers JWK Set information for a service so that its client
   * applications can verify signatures by the service and encrypt their requests to
   * the service.
   *
   * <details>
   * <summary>Description</summary>
   *
   * This API is supposed to be called from within the implementation of the jwk set
   * endpoint of the service where the service that supports OpenID Connect must
   * expose its JWK Set information so that client applications can verify signatures
   * by the service and encrypt their requests to the service. The URI of the
   * endpoint can be found as the value of `jwks_uri` in
   * [OpenID Provider Metadata](https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata)
   * if the service supports
   * [OpenID Connect Discovery 1.0](https://openid.net/specs/openid-connect-discovery-1_0.html).
   *
   * </details>
   *
   * @example
   * ```ts
   * const response = await client.service.jwks.getJwks(
   *   'serviceId',
   * );
   * ```
   */
  getJwks(
    serviceID: string,
    query: JwkGetJwksParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<JwkGetJwksResponse> {
    return this._client.get(path`/api/${serviceID}/service/jwks/get`, { query, ...options });
  }
}

export interface JwkGetJwksResponse {
  /**
   * An array of [JWK](https://datatracker.ietf.org/doc/html/rfc7517)s.
   */
  keys?: Array<unknown>;
}

export interface JwkGetJwksParams {
  /**
   * The boolean value that indicates whether the response should include the private
   * keys associated with the service or not. If `true`, the private keys are
   * included in the response. The default value is `false`.
   */
  includePrivateKeys?: boolean;

  /**
   * This boolean value indicates whether the JSON in the response should be
   * formatted or not. If `true`, the JSON in the response is pretty-formatted. The
   * default value is `false`.
   */
  pretty?: boolean;
}

export declare namespace Jwks {
  export { type JwkGetJwksResponse as JwkGetJwksResponse, type JwkGetJwksParams as JwkGetJwksParams };
}
