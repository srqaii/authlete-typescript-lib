// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as SingleAPI from './single';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Deferred extends APIResource {
  /**
   * null
   */
  issue(
    serviceID: string,
    body: DeferredIssueParams,
    options?: RequestOptions,
  ): APIPromise<DeferredIssueResponse> {
    return this._client.post(path`/api/${serviceID}/vci/deferred/issue`, { body, ...options });
  }

  /**
   * null
   */
  parse(
    serviceID: string,
    body: DeferredParseParams,
    options?: RequestOptions,
  ): APIPromise<DeferredParseResponse> {
    return this._client.post(path`/api/${serviceID}/vci/deferred/parse`, { body, ...options });
  }
}

export interface DeferredIssueResponse {
  /**
   * The next action that the implementation of the deferred credential endpoint
   * should take.
   */
  action?: 'OK' | 'FORBIDDEN' | 'INTERNAL_SERVER_ERROR' | 'CALLER_ERROR';

  /**
   * The content of the response that the implementation of the deferred credential
   * endpoint should return.
   */
  responseContent?: string;

  /**
   * The code which represents the result of the API call.
   */
  resultCode?: string;

  /**
   * A short message which explains the result of the API call.
   */
  resultMessage?: string;
}

export interface DeferredParseResponse {
  /**
   * The next action that the deferred credential endpoint should take.
   */
  action?: 'OK' | 'BAD_REQUEST' | 'UNAUTHORIZED' | 'FORBIDDEN' | 'INTERNAL_SERVER_ERROR';

  /**
   * Information about the credential request bound to the transaction ID.
   */
  info?: SingleAPI.CredentialRequestInfo;

  /**
   * The content of the response to the request sender.
   */
  responseContent?: string;

  /**
   * The code which represents the result of the API call.
   */
  resultCode?: string;

  /**
   * A short message which explains the result of the API call.
   */
  resultMessage?: string;
}

export interface DeferredIssueParams {
  order?: SingleAPI.CredentialIssuanceOrder;
}

export interface DeferredParseParams {
  /**
   * The access token that came along with the deferred credential request.
   */
  accessToken?: string;

  /**
   * The message body of the deferred credential request.
   */
  requestContent?: string;
}

export declare namespace Deferred {
  export {
    type DeferredIssueResponse as DeferredIssueResponse,
    type DeferredParseResponse as DeferredParseResponse,
    type DeferredIssueParams as DeferredIssueParams,
    type DeferredParseParams as DeferredParseParams,
  };
}
