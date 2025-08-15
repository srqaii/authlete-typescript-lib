// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Idtoken extends APIResource {
  /**
   * The API is expected to be called only when the value of the `action` parameter
   * in a response from the `/auth/token` API is
   * [ID_TOKEN_REISSUABLE](https://authlete.github.io/authlete-java-common/com/authlete/common/dto/TokenResponse.Action.html#ID_TOKEN_REISSUABLE).
   * The purpose of the `/idtoken/reissue` API is to generate a token response that
   * includes a new ID token together with a new access token and a refresh token.
   */
  reissue(
    serviceID: string,
    body: IdtokenReissueParams,
    options?: RequestOptions,
  ): APIPromise<IdtokenReissueResponse> {
    return this._client.post(path`/api/${serviceID}/idtoken/reissue`, { body, ...options });
  }
}

export interface IdtokenReissueResponse {
  /**
   * The next action that the implementation of the token endpoint should take.
   */
  action?: 'OK' | 'INTERNAL_SERVER_ERROR' | 'CALLER_ERROR';

  /**
   * The reissued ID token
   */
  idToken?: string;

  /**
   * The response content that can be used as the message body of the token response
   * that should be returned from the token endpoint.
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

export interface IdtokenReissueParams {
  /**
   * <p>
   * The value of this parameter should be (a) the value of the
   * "`jwtAccessToken`" parameter in a response from the
   * `/auth/token` API when the value is available, or (b)
   * the value of the "`accessToken`" parameter in the
   * response from the `/auth/token` API when the value of
   * the "`jwtAccessToken`" parameter is not available.
   * </p>
   */
  accessToken: string;

  /**
   * <p>
   * The value of this parameter should be the value of the
   * "`refreshToken`" parameter in a response from the
   * `/auth/token` API.
   * </p>
   */
  refreshToken: string;

  /**
   * Additional claims that should be embedded in the payload part of the ID token.
   * The format is a JSON object.
   *
   * <p>
   * This parameter is optional.
   * </p>
   */
  claims?: string;

  /**
   * Additional parameters that should be embedded in the JWS header of the ID token.
   * The format is a JSON object.
   *
   * <p>
   * This parameter is optional.
   * </p>
   */
  idtHeaderParams?: string;

  /**
   * The type of the "`aud`" claim of the ID token being issued.
   *
   * <p>
   * Valid values of this parameter are as follows.
   * </p>
   *
   * <blockquote>
   * <table border="1" cellpadding="5" style="border-collapse: collapse;">
   *   <tr bgcolor="orange">
   *     <th>Value</th>
   *     <th>Description</th>
   *   </tr>
   *   <tr>
   *     <td>"`array`"</td>
   *     <td>The type of the `aud` claim becomes an array of strings.</td>
   *   </tr>
   *   <tr>
   *     <td>"`string`"</td>
   *     <td>The type of the `aud` claim becomes a single string.</td>
   *   </tr>
   * </table>
   * </blockquote>
   *
   * <p>
   * This parameter is optional, and the default value on omission is
   * "`array`".
   * </p>
   *
   * <p>
   * This parameter takes precedence over the `idTokenAudType` property
   * of {@link Service} (cf. {@link Service#getIdTokenAudType()}).
   * </p>
   */
  idTokenAudType?: string;

  /**
   * The value that should be used as the value of the "`sub`" claim of the ID token.
   *
   * <p>
   * This parameter is optional. When omitted, the value of the subject
   * associated with the access token is used.
   * </p>
   */
  sub?: string;
}

export declare namespace Idtoken {
  export {
    type IdtokenReissueResponse as IdtokenReissueResponse,
    type IdtokenReissueParams as IdtokenReissueParams,
  };
}
