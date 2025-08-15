// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { Authelete3_0 } from '../client';

export abstract class APIResource {
  protected _client: Authelete3_0;

  constructor(client: Authelete3_0) {
    this._client = client;
  }
}
