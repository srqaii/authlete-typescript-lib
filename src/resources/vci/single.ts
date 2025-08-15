// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Single extends APIResource {
  /**
   * null
   */
  issue(
    serviceID: string,
    body: SingleIssueParams,
    options?: RequestOptions,
  ): APIPromise<SingleIssueResponse> {
    return this._client.post(path`/api/${serviceID}/vci/single/issue`, { body, ...options });
  }

  /**
   * null
   */
  parse(
    serviceID: string,
    body: SingleParseParams,
    options?: RequestOptions,
  ): APIPromise<SingleParseResponse> {
    return this._client.post(path`/api/${serviceID}/vci/single/parse`, { body, ...options });
  }
}

export interface CredentialIssuanceOrder {
  /**
   * The duration of a credential to be issued.
   */
  credentialDuration?: number;

  /**
   * The additional payload that will be added into a credential to be issued.
   */
  credentialPayload?: string;

  /**
   * The flag indicating whether to defer credential issuance.
   */
  issuanceDeferred?: boolean;

  /**
   * The identifier of a credential request.
   */
  requestIdentifier?: string;

  /**
   * The key ID of a private key that should be used for signing a credential to be
   * issued.
   */
  signingKeyId?: string;
}

export interface CredentialRequestInfo {
  /**
   * The binding key specified by the proof in the credential request.
   */
  bindingKey?: string;

  /**
   * The details about the credential request.
   */
  details?: string;

  /**
   * The value of the format parameter in the credential request.
   */
  format?: string;

  /**
   * The identifier of the credential offer.
   */
  identifier?: string;
}

export interface SingleIssueResponse {
  /**
   * The next action that the implementation of the credential endpoint should take.
   */
  action?: 'OK' | 'ACCEPTED' | 'UNAUTHORIZED' | 'FORBIDDEN' | 'INTERNAL_SERVER_ERROR' | 'CALLER_ERROR';

  /**
   * The content of the response that the implementation of the credential endpoint
   * should return.
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

  /**
   * The issued transaction ID.
   */
  transactionId?: string;
}

export interface SingleParseResponse {
  /**
   * The next action that the credential endpoint should take.
   */
  action?: 'OK' | 'BAD_REQUEST' | 'UNAUTHORIZED' | 'FORBIDDEN' | 'INTERNAL_SERVER_ERROR';

  info?: CredentialRequestInfo;

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

export interface SingleIssueParams {
  /**
   * The access token that came along with the credential request.
   */
  accessToken?: string;

  order?: CredentialIssuanceOrder;
}

export interface SingleParseParams {
  /**
   * The access token that came along with the credential request.
   */
  accessToken?: string;

  /**
   * The message body of the credential request.
   */
  requestContent?: string;
}

export declare namespace Single {
  export {
    type CredentialIssuanceOrder as CredentialIssuanceOrder,
    type CredentialRequestInfo as CredentialRequestInfo,
    type SingleIssueResponse as SingleIssueResponse,
    type SingleParseResponse as SingleParseResponse,
    type SingleIssueParams as SingleIssueParams,
    type SingleParseParams as SingleParseParams,
  };
}
