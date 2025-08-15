// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as AuthorizationAPI from '../auth/authorization/authorization';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class Offer extends APIResource {
  /**
   * null
   */
  create(
    serviceID: string,
    body: OfferCreateParams,
    options?: RequestOptions,
  ): APIPromise<OfferCreateResponse> {
    return this._client.post(path`/api/${serviceID}/vci/offer/create`, { body, ...options });
  }

  /**
   * null
   */
  retrieveInfo(
    serviceID: string,
    body: OfferRetrieveInfoParams,
    options?: RequestOptions,
  ): APIPromise<OfferRetrieveInfoResponse> {
    return this._client.post(path`/api/${serviceID}/vci/offer/info`, { body, ...options });
  }
}

export interface OfferCreateResponse {
  /**
   * The result of the `/vci/offer/create` API call.
   */
  action?: 'CREATED' | 'FORBIDDEN' | 'CALLER_ERROR' | 'AUTHLETE_ERROR';

  info?: AuthorizationAPI.CredentialOfferInfo;

  /**
   * The code which represents the result of the API call.
   */
  resultCode?: string;

  /**
   * A short message which explains the result of the API call.
   */
  resultMessage?: string;
}

export interface OfferRetrieveInfoResponse {
  /**
   * The result of the `/vci/offer/info` API call.
   */
  action?: 'OK' | 'FORBIDDEN' | 'NOT_FOUND' | 'CALLER_ERROR' | 'AUTHLETE_ERROR';

  info?: AuthorizationAPI.CredentialOfferInfo;

  /**
   * The code which represents the result of the API call.
   */
  resultCode?: string;

  /**
   * A short message which explains the result of the API call.
   */
  resultMessage?: string;
}

export interface OfferCreateParams {
  /**
   * The Authentication Context Class Reference of the user authentication performed
   * during the course of issuing the credential offer.
   */
  acr?: string;

  /**
   * The flag indicating whether the `authorization_code` object is included in the
   * `grants` object.
   */
  authorizationCodeGrantIncluded?: boolean;

  /**
   * The time at which the user authentication was performed during the course of
   * issuing the credential offer.
   */
  authTime?: number;

  /**
   * The general-purpose arbitrary string.
   */
  context?: string;

  /**
   * The value of the `credentials` object in the JSON format.
   */
  credentials?: string;

  /**
   * The duration of the credential offer.
   */
  duration?: number;

  /**
   * The flag indicating whether the `issuer_state` property is included in the
   * `authorization_code` object in the `grants` object.
   */
  issuerStateIncluded?: boolean;

  /**
   * Additional claims that are added to the payload part of the JWT access token.
   */
  jwtAtClaims?: string;

  /**
   * The flag to include the `urn:ietf:params:oauth:grant-type:pre-authorized_code`
   * object in the `grants` object.
   */
  preAuthorizedCodeGrantIncluded?: boolean;

  /**
   * Extra properties to associate with the credential offer.
   */
  properties?: Array<AuthorizationAPI.Property>;

  /**
   * The subject associated with the credential offer.
   */
  subject?: string;

  /**
   * The length of the user PIN to generate.
   */
  userPinLength?: number;

  /**
   * The value of the `user_pin_required` property in the
   * `urn:ietf:params:oauth:grant-type:pre-authorized_code` object in the `grants`
   * object.
   */
  userPinRequired?: boolean;
}

export interface OfferRetrieveInfoParams {
  /**
   * The identifier of the credential offer.
   */
  identifier?: string;
}

export declare namespace Offer {
  export {
    type OfferCreateResponse as OfferCreateResponse,
    type OfferRetrieveInfoResponse as OfferRetrieveInfoResponse,
    type OfferCreateParams as OfferCreateParams,
    type OfferRetrieveInfoParams as OfferRetrieveInfoParams,
  };
}
