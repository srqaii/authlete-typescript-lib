// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as RequestableScopesAPI from './requestable-scopes';
import {
  RequestableScopeDeleteParams,
  RequestableScopeGetParams,
  RequestableScopeGetResponse,
  RequestableScopeUpdateParams,
  RequestableScopeUpdateResponse,
  RequestableScopes,
} from './requestable-scopes';

export class Extension extends APIResource {
  requestableScopes: RequestableScopesAPI.RequestableScopes = new RequestableScopesAPI.RequestableScopes(
    this._client,
  );
}

Extension.RequestableScopes = RequestableScopes;

export declare namespace Extension {
  export {
    RequestableScopes as RequestableScopes,
    type RequestableScopeUpdateResponse as RequestableScopeUpdateResponse,
    type RequestableScopeGetResponse as RequestableScopeGetResponse,
    type RequestableScopeUpdateParams as RequestableScopeUpdateParams,
    type RequestableScopeDeleteParams as RequestableScopeDeleteParams,
    type RequestableScopeGetParams as RequestableScopeGetParams,
  };
}
