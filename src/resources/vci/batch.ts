// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as SingleAPI from './single';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Batch extends APIResource {
  /**
   * null
   */
  issue(serviceID: string, body: BatchIssueParams, options?: RequestOptions): APIPromise<BatchIssueResponse> {
    return this._client.post(path`/api/${serviceID}/vci/batch/issue`, { body, ...options });
  }

  /**
   * null
   */
  parse(serviceID: string, body: BatchParseParams, options?: RequestOptions): APIPromise<BatchParseResponse> {
    return this._client.post(path`/api/${serviceID}/vci/batch/parse`, { body, ...options });
  }
}

export interface BatchIssueResponse {
  /**
   * The next action that the implementation of the batch credential endpoint should
   * take.
   */
  action?: 'OK' | 'UNAUTHORIZED' | 'FORBIDDEN' | 'INTERNAL_SERVER_ERROR' | 'CALLER_ERROR';

  /**
   * The content of the response that the implementation of the batch credential
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

export interface BatchParseResponse {
  /**
   * The next action that the batch credential endpoint should take.
   */
  action?: 'OK' | 'BAD_REQUEST' | 'UNAUTHORIZED' | 'FORBIDDEN' | 'INTERNAL_SERVER_ERROR';

  /**
   * Information about the credential requests in the batch credential request.
   */
  info?: Array<SingleAPI.CredentialRequestInfo>;

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

export interface BatchIssueParams {
  /**
   * The access token that came along with the credential request.
   */
  accessToken?: string;

  /**
   * The instructions for issuance of credentials and/or transaction IDs.
   */
  orders?: Array<SingleAPI.CredentialIssuanceOrder>;
}

export interface BatchParseParams {
  /**
   * The access token that came along with the credential request.
   */
  accessToken?: string;

  /**
   * The message body of the batch credential request.
   */
  requestContent?: string;
}

export declare namespace Batch {
  export {
    type BatchIssueResponse as BatchIssueResponse,
    type BatchParseResponse as BatchParseResponse,
    type BatchIssueParams as BatchIssueParams,
    type BatchParseParams as BatchParseParams,
  };
}
