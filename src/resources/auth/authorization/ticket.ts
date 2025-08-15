// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class Ticket extends APIResource {
  /**
   * Update Ticket Information
   *
   * @example
   * ```ts
   * const ticket =
   *   await client.auth.authorization.ticket.update(
   *     'serviceId',
   *     { info: 'info', ticket: 'ticket' },
   *   );
   * ```
   */
  update(
    serviceID: string,
    body: TicketUpdateParams,
    options?: RequestOptions,
  ): APIPromise<TicketUpdateResponse> {
    return this._client.post(path`/api/${serviceID}/auth/authorization/ticket/update`, { body, ...options });
  }

  /**
   * Get Ticket Information
   *
   * @example
   * ```ts
   * const response =
   *   await client.auth.authorization.ticket.info('serviceId', {
   *     ticket: 'ticket',
   *   });
   * ```
   */
  info(serviceID: string, query: TicketInfoParams, options?: RequestOptions): APIPromise<TicketInfoResponse> {
    return this._client.get(path`/api/${serviceID}/auth/authorization/ticket/info`, { query, ...options });
  }
}

export interface TicketUpdateResponse {
  /**
   * The result of the /auth/authorization/ticket/info API call.
   */
  action?: 'OK' | 'NOT_FOUND' | 'CALLER_ERROR' | 'AUTHLETE_ERROR';

  /**
   * Information about the ticket.
   */
  info?: string;

  /**
   * The code which represents the result of the API call.
   */
  resultCode?: string;

  /**
   * A short message which explains the result of the API call.
   */
  resultMessage?: string;
}

export interface TicketInfoResponse {
  /**
   * The result of the `/auth/authorization/ticket/info` API call.
   */
  action?: 'OK' | 'NOT_FOUND' | 'CALLER_ERROR' | 'AUTHLETE_ERROR';

  /**
   * Information about the ticket.
   */
  info?: string;

  /**
   * The code which represents the result of the API call.
   */
  resultCode?: string;

  /**
   * A short message which explains the result of the API call.
   */
  resultMessage?: string;
}

export interface TicketUpdateParams {
  /**
   * The information about the ticket.
   */
  info: string;

  /**
   * The ticket.
   */
  ticket: string;
}

export interface TicketInfoParams {
  /**
   * Ticket issued by `/auth/authorization`.
   */
  ticket: string;
}

export declare namespace Ticket {
  export {
    type TicketUpdateResponse as TicketUpdateResponse,
    type TicketInfoResponse as TicketInfoResponse,
    type TicketUpdateParams as TicketUpdateParams,
    type TicketInfoParams as TicketInfoParams,
  };
}
