// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as AuthenticationAPI from './authentication';
import {
  Authentication,
  AuthenticationCompleteRequestParams,
  AuthenticationCompleteRequestResponse,
  AuthenticationFailRequestParams,
  AuthenticationFailRequestResponse,
  AuthenticationIssueResponseParams,
  AuthenticationIssueResponseResponse,
  AuthenticationProcessParams,
  AuthenticationProcessResponse,
  DeliveryMode,
} from './authentication';

export class Backchannel extends APIResource {
  authentication: AuthenticationAPI.Authentication = new AuthenticationAPI.Authentication(this._client);
}

Backchannel.Authentication = Authentication;

export declare namespace Backchannel {
  export {
    Authentication as Authentication,
    type DeliveryMode as DeliveryMode,
    type AuthenticationCompleteRequestResponse as AuthenticationCompleteRequestResponse,
    type AuthenticationFailRequestResponse as AuthenticationFailRequestResponse,
    type AuthenticationIssueResponseResponse as AuthenticationIssueResponseResponse,
    type AuthenticationProcessResponse as AuthenticationProcessResponse,
    type AuthenticationCompleteRequestParams as AuthenticationCompleteRequestParams,
    type AuthenticationFailRequestParams as AuthenticationFailRequestParams,
    type AuthenticationIssueResponseParams as AuthenticationIssueResponseParams,
    type AuthenticationProcessParams as AuthenticationProcessParams,
  };
}
