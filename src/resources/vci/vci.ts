// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as BatchAPI from './batch';
import { Batch, BatchIssueParams, BatchIssueResponse, BatchParseParams, BatchParseResponse } from './batch';
import * as DeferredAPI from './deferred';
import {
  Deferred,
  DeferredIssueParams,
  DeferredIssueResponse,
  DeferredParseParams,
  DeferredParseResponse,
} from './deferred';
import * as OfferAPI from './offer';
import {
  Offer,
  OfferCreateParams,
  OfferCreateResponse,
  OfferRetrieveInfoParams,
  OfferRetrieveInfoResponse,
} from './offer';
import * as SingleAPI from './single';
import {
  CredentialIssuanceOrder,
  CredentialRequestInfo,
  Single,
  SingleIssueParams,
  SingleIssueResponse,
  SingleParseParams,
  SingleParseResponse,
} from './single';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Vci extends APIResource {
  offer: OfferAPI.Offer = new OfferAPI.Offer(this._client);
  single: SingleAPI.Single = new SingleAPI.Single(this._client);
  batch: BatchAPI.Batch = new BatchAPI.Batch(this._client);
  deferred: DeferredAPI.Deferred = new DeferredAPI.Deferred(this._client);

  /**
   * null
   */
  createJwks(
    serviceID: string,
    body: VciCreateJwksParams,
    options?: RequestOptions,
  ): APIPromise<VciCreateJwksResponse> {
    return this._client.post(path`/api/${serviceID}/vci/jwks`, { body, ...options });
  }

  /**
   * null
   */
  createJwtissuer(
    serviceID: string,
    body: VciCreateJwtissuerParams,
    options?: RequestOptions,
  ): APIPromise<VciCreateJwtissuerResponse> {
    return this._client.post(path`/api/${serviceID}/vci/jwtissuer`, { body, ...options });
  }

  /**
   * null
   */
  createMetadata(
    serviceID: string,
    body: VciCreateMetadataParams,
    options?: RequestOptions,
  ): APIPromise<VciCreateMetadataResponse> {
    return this._client.post(path`/api/${serviceID}/vci/metadata`, { body, ...options });
  }
}

export interface VciCreateJwksResponse {
  /**
   * The next action that the implementation of the JWK Set document endpoint of the
   * credential issuer should take after getting a response from Authlete's
   * `/vci/jwks` API.
   */
  action?: 'OK' | 'NOT_FOUND' | 'INTERNAL_SERVER_ERROR';

  /**
   * Get the content that the implementation of the credential issuer metadata
   * endpoint should use when it constructs a response.
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

export interface VciCreateJwtissuerResponse {
  /**
   * The next action that the implementation of the JWT issuer metadata endpoint
   * (`/.well-known/jwt-issuer`) should take after getting a response from Authlete's
   * `/vci/jwtissuer` API.
   */
  action?: 'OK' | 'NOT_FOUND' | 'INTERNAL_SERVER_ERROR';

  /**
   * Get the content that the implementation of the credential issuer metadata
   * endpoint should use when it constructs a response.
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

export interface VciCreateMetadataResponse {
  /**
   * The next action that the implementation of the credential issuer metadata
   * endpoint (`/.well-known/openid-credential-issuer`) should take after getting a
   * response from Authlete's `/vci/metadata` API.
   */
  action?: 'OK' | 'NOT_FOUND' | 'INTERNAL_SERVER_ERROR';

  /**
   * Get the content that the implementation of the credential issuer metadata
   * endpoint should use when it constructs a response.
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

export interface VciCreateJwksParams {
  /**
   * The flag indicating whether the metadata is written in the pretty format or not.
   */
  pretty: boolean;
}

export interface VciCreateJwtissuerParams {
  /**
   * The flag indicating whether the metadata is written in the pretty format or not.
   */
  pretty: boolean;
}

export interface VciCreateMetadataParams {
  /**
   * The flag indicating whether the metadata is written in the pretty format or not.
   */
  pretty: boolean;
}

Vci.Offer = Offer;
Vci.Single = Single;
Vci.Batch = Batch;
Vci.Deferred = Deferred;

export declare namespace Vci {
  export {
    type VciCreateJwksResponse as VciCreateJwksResponse,
    type VciCreateJwtissuerResponse as VciCreateJwtissuerResponse,
    type VciCreateMetadataResponse as VciCreateMetadataResponse,
    type VciCreateJwksParams as VciCreateJwksParams,
    type VciCreateJwtissuerParams as VciCreateJwtissuerParams,
    type VciCreateMetadataParams as VciCreateMetadataParams,
  };

  export {
    Offer as Offer,
    type OfferCreateResponse as OfferCreateResponse,
    type OfferRetrieveInfoResponse as OfferRetrieveInfoResponse,
    type OfferCreateParams as OfferCreateParams,
    type OfferRetrieveInfoParams as OfferRetrieveInfoParams,
  };

  export {
    Single as Single,
    type CredentialIssuanceOrder as CredentialIssuanceOrder,
    type CredentialRequestInfo as CredentialRequestInfo,
    type SingleIssueResponse as SingleIssueResponse,
    type SingleParseResponse as SingleParseResponse,
    type SingleIssueParams as SingleIssueParams,
    type SingleParseParams as SingleParseParams,
  };

  export {
    Batch as Batch,
    type BatchIssueResponse as BatchIssueResponse,
    type BatchParseResponse as BatchParseResponse,
    type BatchIssueParams as BatchIssueParams,
    type BatchParseParams as BatchParseParams,
  };

  export {
    Deferred as Deferred,
    type DeferredIssueResponse as DeferredIssueResponse,
    type DeferredParseResponse as DeferredParseResponse,
    type DeferredIssueParams as DeferredIssueParams,
    type DeferredParseParams as DeferredParseParams,
  };
}
