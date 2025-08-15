# Service

Methods:

- <code title="post /api/service/create">client.service.<a href="./src/resources/service/service.ts">createService</a>({ ...params }) -> Service</code>
- <code title="delete /api/{serviceId}/service/delete">client.service.<a href="./src/resources/service/service.ts">deleteService</a>(serviceID) -> void</code>
- <code title="post /api/{serviceId}/service/update">client.service.<a href="./src/resources/service/service.ts">updateService</a>(serviceID, { ...params }) -> Service</code>

## Get

Types:

- <code><a href="./src/resources/service/get.ts">JwsAlg</a></code>
- <code><a href="./src/resources/service/get.ts">ResponseType</a></code>
- <code><a href="./src/resources/service/get.ts">Service</a></code>
- <code><a href="./src/resources/service/get.ts">GetGetServiceConfigurationResponse</a></code>
- <code><a href="./src/resources/service/get.ts">GetListServicesResponse</a></code>

Methods:

- <code title="get /api/{serviceId}/service/configuration">client.service.get.<a href="./src/resources/service/get.ts">getServiceConfiguration</a>(serviceID, { ...params }) -> unknown</code>
- <code title="get /api/service/get/list">client.service.get.<a href="./src/resources/service/get.ts">listServices</a>({ ...params }) -> GetListServicesResponse</code>
- <code title="get /api/{serviceId}/service/get">client.service.get.<a href="./src/resources/service/get.ts">retrieveService</a>(serviceID) -> Service</code>

## Jwks

Types:

- <code><a href="./src/resources/service/jwks.ts">JwkGetJwksResponse</a></code>

Methods:

- <code title="get /api/{serviceId}/service/jwks/get">client.service.jwks.<a href="./src/resources/service/jwks.ts">getJwks</a>(serviceID, { ...params }) -> JwkGetJwksResponse</code>

# Client

Methods:

- <code title="post /api/{serviceId}/client/create">client.client.<a href="./src/resources/client/client.ts">create</a>(serviceID, { ...params }) -> Client</code>
- <code title="post /api/{serviceId}/client/update/{clientId}">client.client.<a href="./src/resources/client/client.ts">update</a>(clientID, { ...params }) -> Client</code>
- <code title="delete /api/{serviceId}/client/delete/{clientId}">client.client.<a href="./src/resources/client/client.ts">delete</a>(clientID, { ...params }) -> void</code>

## Get

Types:

- <code><a href="./src/resources/client/get.ts">Client</a></code>
- <code><a href="./src/resources/client/get.ts">ClientAuthenticationMethod</a></code>
- <code><a href="./src/resources/client/get.ts">JweAlg</a></code>
- <code><a href="./src/resources/client/get.ts">JweEnc</a></code>
- <code><a href="./src/resources/client/get.ts">GetListResponse</a></code>

Methods:

- <code title="get /api/{serviceId}/client/get/{clientId}">client.client.get.<a href="./src/resources/client/get.ts">retrieve</a>(clientID, { ...params }) -> Client</code>
- <code title="get /api/{serviceId}/client/get/list">client.client.get.<a href="./src/resources/client/get.ts">list</a>(serviceID, { ...params }) -> GetListResponse</code>

## LockFlag

Types:

- <code><a href="./src/resources/client/lock-flag.ts">LockFlagUpdateResponse</a></code>

Methods:

- <code title="post /api/{serviceId}/client/lock_flag/update/{clientIdentifier}">client.client.lockFlag.<a href="./src/resources/client/lock-flag.ts">update</a>(clientIdentifier, { ...params }) -> LockFlagUpdateResponse</code>

## Secret

Types:

- <code><a href="./src/resources/client/secret.ts">SecretUpdateResponse</a></code>
- <code><a href="./src/resources/client/secret.ts">SecretRefreshResponse</a></code>

Methods:

- <code title="post /api/{serviceId}/client/secret/update/{clientIdentifier}">client.client.secret.<a href="./src/resources/client/secret.ts">update</a>(clientIdentifier, { ...params }) -> SecretUpdateResponse</code>
- <code title="get /api/{serviceId}/client/secret/refresh/{clientIdentifier}">client.client.secret.<a href="./src/resources/client/secret.ts">refresh</a>(clientIdentifier, { ...params }) -> SecretRefreshResponse</code>

## Authorization

Types:

- <code><a href="./src/resources/client/authorization/authorization.ts">AuthorizationUpdateResponse</a></code>
- <code><a href="./src/resources/client/authorization/authorization.ts">AuthorizationDeleteResponse</a></code>

Methods:

- <code title="post /api/{serviceId}/client/authorization/update/{clientId}">client.client.authorization.<a href="./src/resources/client/authorization/authorization.ts">update</a>(clientID, { ...params }) -> AuthorizationUpdateResponse</code>
- <code title="delete /api/{serviceId}/client/authorization/delete/{clientId}">client.client.authorization.<a href="./src/resources/client/authorization/authorization.ts">delete</a>(clientID, { ...params }) -> unknown</code>

### Get

Types:

- <code><a href="./src/resources/client/authorization/get.ts">GetListResponse</a></code>

Methods:

- <code title="get /api/{serviceId}/client/authorization/get/list">client.client.authorization.get.<a href="./src/resources/client/authorization/get.ts">list</a>(serviceID, { ...params }) -> GetListResponse</code>

## GrantedScopes

Types:

- <code><a href="./src/resources/client/granted-scopes.ts">GrantedScopeDeleteResponse</a></code>
- <code><a href="./src/resources/client/granted-scopes.ts">GrantedScopeGetResponse</a></code>

Methods:

- <code title="delete /api/{serviceId}/client/granted_scopes/delete/{clientId}">client.client.grantedScopes.<a href="./src/resources/client/granted-scopes.ts">delete</a>(clientID, { ...params }) -> GrantedScopeDeleteResponse</code>
- <code title="get /api/{serviceId}/client/granted_scopes/get/{clientId}">client.client.grantedScopes.<a href="./src/resources/client/granted-scopes.ts">get</a>(clientID, { ...params }) -> GrantedScopeGetResponse</code>

## Registration

Types:

- <code><a href="./src/resources/client/registration.ts">RegistrationCreateResponse</a></code>
- <code><a href="./src/resources/client/registration.ts">RegistrationRetrieveResponse</a></code>
- <code><a href="./src/resources/client/registration.ts">RegistrationUpdateResponse</a></code>
- <code><a href="./src/resources/client/registration.ts">RegistrationDeleteResponse</a></code>

Methods:

- <code title="post /api/{serviceId}/client/registration">client.client.registration.<a href="./src/resources/client/registration.ts">create</a>(serviceID, { ...params }) -> RegistrationCreateResponse</code>
- <code title="post /api/{serviceId}/client/registration/get">client.client.registration.<a href="./src/resources/client/registration.ts">retrieve</a>(serviceID, { ...params }) -> unknown</code>
- <code title="post /api/{serviceId}/client/registration/update">client.client.registration.<a href="./src/resources/client/registration.ts">update</a>(serviceID, { ...params }) -> RegistrationUpdateResponse</code>
- <code title="post /api/{serviceId}/client/registration/delete">client.client.registration.<a href="./src/resources/client/registration.ts">delete</a>(serviceID, { ...params }) -> RegistrationDeleteResponse</code>

## Extension

### RequestableScopes

Types:

- <code><a href="./src/resources/client/extension/requestable-scopes.ts">RequestableScopeUpdateResponse</a></code>
- <code><a href="./src/resources/client/extension/requestable-scopes.ts">RequestableScopeGetResponse</a></code>

Methods:

- <code title="put /api/{serviceId}/client/extension/requestable_scopes/update/{clientId}">client.client.extension.requestableScopes.<a href="./src/resources/client/extension/requestable-scopes.ts">update</a>(clientID, { ...params }) -> RequestableScopeUpdateResponse</code>
- <code title="delete /api/{serviceId}/client/extension/requestable_scopes/delete/{clientId}">client.client.extension.requestableScopes.<a href="./src/resources/client/extension/requestable-scopes.ts">delete</a>(clientID, { ...params }) -> void</code>
- <code title="get /api/{serviceId}/client/extension/requestable_scopes/get/{clientId}">client.client.extension.requestableScopes.<a href="./src/resources/client/extension/requestable-scopes.ts">get</a>(clientID, { ...params }) -> RequestableScopeGetResponse</code>

# Auth

Types:

- <code><a href="./src/resources/auth/auth.ts">AuthRevokeResponse</a></code>

Methods:

- <code title="post /api/{serviceId}/auth/revocation">client.auth.<a href="./src/resources/auth/auth.ts">revoke</a>(serviceID, { ...params }) -> AuthRevokeResponse</code>

## Authorization

Types:

- <code><a href="./src/resources/auth/authorization/authorization.ts">AuthorizationDetails</a></code>
- <code><a href="./src/resources/auth/authorization/authorization.ts">CredentialOfferInfo</a></code>
- <code><a href="./src/resources/auth/authorization/authorization.ts">Display</a></code>
- <code><a href="./src/resources/auth/authorization/authorization.ts">DynamicScope</a></code>
- <code><a href="./src/resources/auth/authorization/authorization.ts">GmAction</a></code>
- <code><a href="./src/resources/auth/authorization/authorization.ts">Prompt</a></code>
- <code><a href="./src/resources/auth/authorization/authorization.ts">Property</a></code>
- <code><a href="./src/resources/auth/authorization/authorization.ts">Scope</a></code>
- <code><a href="./src/resources/auth/authorization/authorization.ts">TaggedValue</a></code>
- <code><a href="./src/resources/auth/authorization/authorization.ts">AuthorizationFailResponse</a></code>
- <code><a href="./src/resources/auth/authorization/authorization.ts">AuthorizationIssueResponse</a></code>
- <code><a href="./src/resources/auth/authorization/authorization.ts">AuthorizationProcessResponse</a></code>

Methods:

- <code title="post /api/{serviceId}/auth/authorization/fail">client.auth.authorization.<a href="./src/resources/auth/authorization/authorization.ts">fail</a>(serviceID, { ...params }) -> AuthorizationFailResponse</code>
- <code title="post /api/{serviceId}/auth/authorization/issue">client.auth.authorization.<a href="./src/resources/auth/authorization/authorization.ts">issue</a>(serviceID, { ...params }) -> AuthorizationIssueResponse</code>
- <code title="post /api/{serviceId}/auth/authorization">client.auth.authorization.<a href="./src/resources/auth/authorization/authorization.ts">process</a>(serviceID, { ...params }) -> AuthorizationProcessResponse</code>

### Ticket

Types:

- <code><a href="./src/resources/auth/authorization/ticket.ts">TicketUpdateResponse</a></code>
- <code><a href="./src/resources/auth/authorization/ticket.ts">TicketInfoResponse</a></code>

Methods:

- <code title="post /api/{serviceId}/auth/authorization/ticket/update">client.auth.authorization.ticket.<a href="./src/resources/auth/authorization/ticket.ts">update</a>(serviceID, { ...params }) -> TicketUpdateResponse</code>
- <code title="get /api/{serviceId}/auth/authorization/ticket/info">client.auth.authorization.ticket.<a href="./src/resources/auth/authorization/ticket.ts">info</a>(serviceID, { ...params }) -> TicketInfoResponse</code>

## Token

Types:

- <code><a href="./src/resources/auth/token/token.ts">AuthorizationDetailsElement</a></code>
- <code><a href="./src/resources/auth/token/token.ts">Pair</a></code>
- <code><a href="./src/resources/auth/token/token.ts">TokenCreateResponse</a></code>
- <code><a href="./src/resources/auth/token/token.ts">TokenUpdateResponse</a></code>
- <code><a href="./src/resources/auth/token/token.ts">TokenFailResponse</a></code>
- <code><a href="./src/resources/auth/token/token.ts">TokenIssueResponse</a></code>
- <code><a href="./src/resources/auth/token/token.ts">TokenProcessResponse</a></code>
- <code><a href="./src/resources/auth/token/token.ts">TokenRevokeResponse</a></code>

Methods:

- <code title="post /api/{serviceId}/auth/token/create">client.auth.token.<a href="./src/resources/auth/token/token.ts">create</a>(serviceID, { ...params }) -> TokenCreateResponse</code>
- <code title="post /api/{serviceId}/auth/token/update">client.auth.token.<a href="./src/resources/auth/token/token.ts">update</a>(serviceID, { ...params }) -> TokenUpdateResponse</code>
- <code title="delete /api/{serviceId}/auth/token/delete/{accessTokenIdentifier}">client.auth.token.<a href="./src/resources/auth/token/token.ts">delete</a>(accessTokenIdentifier, { ...params }) -> void</code>
- <code title="post /api/{serviceId}/auth/token/fail">client.auth.token.<a href="./src/resources/auth/token/token.ts">fail</a>(serviceID, { ...params }) -> TokenFailResponse</code>
- <code title="post /api/{serviceId}/auth/token/issue">client.auth.token.<a href="./src/resources/auth/token/token.ts">issue</a>(serviceID, { ...params }) -> TokenIssueResponse</code>
- <code title="post /api/{serviceId}/auth/token">client.auth.token.<a href="./src/resources/auth/token/token.ts">process</a>(serviceID, { ...params }) -> TokenProcessResponse</code>
- <code title="post /api/{serviceId}/auth/token/revoke">client.auth.token.<a href="./src/resources/auth/token/token.ts">revoke</a>(serviceID, { ...params }) -> TokenRevokeResponse</code>

### Get

Types:

- <code><a href="./src/resources/auth/token/get.ts">GetListResponse</a></code>

Methods:

- <code title="get /api/{serviceId}/auth/token/get/list">client.auth.token.get.<a href="./src/resources/auth/token/get.ts">list</a>(serviceID, { ...params }) -> GetListResponse</code>

## Introspection

Types:

- <code><a href="./src/resources/auth/introspection.ts">GrantType</a></code>
- <code><a href="./src/resources/auth/introspection.ts">IntrospectionProcessResponse</a></code>
- <code><a href="./src/resources/auth/introspection.ts">IntrospectionStandardResponse</a></code>

Methods:

- <code title="post /api/{serviceId}/auth/introspection">client.auth.introspection.<a href="./src/resources/auth/introspection.ts">process</a>(serviceID, { ...params }) -> IntrospectionProcessResponse</code>
- <code title="post /api/{serviceId}/auth/introspection/standard">client.auth.introspection.<a href="./src/resources/auth/introspection.ts">standard</a>(serviceID, { ...params }) -> IntrospectionStandardResponse</code>

## Userinfo

Types:

- <code><a href="./src/resources/auth/userinfo.ts">UserinfoIssueResponse</a></code>
- <code><a href="./src/resources/auth/userinfo.ts">UserinfoProcessResponse</a></code>

Methods:

- <code title="post /api/{serviceId}/auth/userinfo/issue">client.auth.userinfo.<a href="./src/resources/auth/userinfo.ts">issue</a>(serviceID, { ...params }) -> UserinfoIssueResponse</code>
- <code title="post /api/{serviceId}/auth/userinfo">client.auth.userinfo.<a href="./src/resources/auth/userinfo.ts">process</a>(serviceID, { ...params }) -> UserinfoProcessResponse</code>

# PushedAuthReq

Types:

- <code><a href="./src/resources/pushed-auth-req.ts">PushedAuthReqCreateResponse</a></code>

Methods:

- <code title="post /api/{serviceId}/pushed_auth_req">client.pushedAuthReq.<a href="./src/resources/pushed-auth-req.ts">create</a>(serviceID, { ...params }) -> PushedAuthReqCreateResponse</code>

# Idtoken

Types:

- <code><a href="./src/resources/idtoken.ts">IdtokenReissueResponse</a></code>

Methods:

- <code title="post /api/{serviceId}/idtoken/reissue">client.idtoken.<a href="./src/resources/idtoken.ts">reissue</a>(serviceID, { ...params }) -> IdtokenReissueResponse</code>

# Gm

Types:

- <code><a href="./src/resources/gm.ts">GmProcessRequestResponse</a></code>

Methods:

- <code title="post /api/{serviceId}/gm">client.gm.<a href="./src/resources/gm.ts">processRequest</a>(serviceID, { ...params }) -> GmProcessRequestResponse</code>

# Backchannel

## Authentication

Types:

- <code><a href="./src/resources/backchannel/authentication.ts">DeliveryMode</a></code>
- <code><a href="./src/resources/backchannel/authentication.ts">AuthenticationCompleteRequestResponse</a></code>
- <code><a href="./src/resources/backchannel/authentication.ts">AuthenticationFailRequestResponse</a></code>
- <code><a href="./src/resources/backchannel/authentication.ts">AuthenticationIssueResponseResponse</a></code>
- <code><a href="./src/resources/backchannel/authentication.ts">AuthenticationProcessResponse</a></code>

Methods:

- <code title="post /api/{serviceId}/backchannel/authentication/complete">client.backchannel.authentication.<a href="./src/resources/backchannel/authentication.ts">completeRequest</a>(serviceID, { ...params }) -> AuthenticationCompleteRequestResponse</code>
- <code title="post /api/{serviceId}/backchannel/authentication/fail">client.backchannel.authentication.<a href="./src/resources/backchannel/authentication.ts">failRequest</a>(serviceID, { ...params }) -> AuthenticationFailRequestResponse</code>
- <code title="post /api/{serviceId}/backchannel/authentication/issue">client.backchannel.authentication.<a href="./src/resources/backchannel/authentication.ts">issueResponse</a>(serviceID, { ...params }) -> AuthenticationIssueResponseResponse</code>
- <code title="post /api/{serviceId}/backchannel/authentication">client.backchannel.authentication.<a href="./src/resources/backchannel/authentication.ts">process</a>(serviceID, { ...params }) -> AuthenticationProcessResponse</code>

# Device

Types:

- <code><a href="./src/resources/device.ts">DeviceAuthorizeResponse</a></code>
- <code><a href="./src/resources/device.ts">DeviceCompleteAuthorizationResponse</a></code>
- <code><a href="./src/resources/device.ts">DeviceVerifyResponse</a></code>

Methods:

- <code title="post /api/{serviceId}/device/authorization">client.device.<a href="./src/resources/device.ts">authorize</a>(serviceID, { ...params }) -> DeviceAuthorizeResponse</code>
- <code title="post /api/{serviceId}/device/complete">client.device.<a href="./src/resources/device.ts">completeAuthorization</a>(serviceID, { ...params }) -> DeviceCompleteAuthorizationResponse</code>
- <code title="post /api/{serviceId}/device/verification">client.device.<a href="./src/resources/device.ts">verify</a>(serviceID, { ...params }) -> DeviceVerifyResponse</code>

# Jose

Types:

- <code><a href="./src/resources/jose.ts">JoseVerifyResponse</a></code>

Methods:

- <code title="post /api/{serviceId}/jose/verify">client.jose.<a href="./src/resources/jose.ts">verify</a>(serviceID, { ...params }) -> JoseVerifyResponse</code>

# Federation

Types:

- <code><a href="./src/resources/federation.ts">FederationCreateConfigurationResponse</a></code>
- <code><a href="./src/resources/federation.ts">FederationRegisterResponse</a></code>

Methods:

- <code title="post /api/{serviceId}/federation/configuration">client.federation.<a href="./src/resources/federation.ts">createConfiguration</a>(serviceID, { ...params }) -> FederationCreateConfigurationResponse</code>
- <code title="post /api/{serviceId}/federation/registration">client.federation.<a href="./src/resources/federation.ts">register</a>(serviceID, { ...params }) -> FederationRegisterResponse</code>

# Info

Types:

- <code><a href="./src/resources/info.ts">InfoRetrieveResponse</a></code>

Methods:

- <code title="get /api/info">client.info.<a href="./src/resources/info.ts">retrieve</a>() -> InfoRetrieveResponse</code>

# Hsk

Types:

- <code><a href="./src/resources/hsk/hsk.ts">Hsk</a></code>
- <code><a href="./src/resources/hsk/hsk.ts">HskCreateResponse</a></code>
- <code><a href="./src/resources/hsk/hsk.ts">HskDeleteResponse</a></code>

Methods:

- <code title="post /api/{serviceId}/hsk/create">client.hsk.<a href="./src/resources/hsk/hsk.ts">create</a>(serviceID, { ...params }) -> HskCreateResponse</code>
- <code title="delete /api/{serviceId}/hsk/delete/{handle}">client.hsk.<a href="./src/resources/hsk/hsk.ts">delete</a>(handle, { ...params }) -> HskDeleteResponse</code>

## Get

Types:

- <code><a href="./src/resources/hsk/get.ts">GetRetrieveResponse</a></code>
- <code><a href="./src/resources/hsk/get.ts">GetListResponse</a></code>

Methods:

- <code title="get /api/{serviceId}/hsk/get/{handle}">client.hsk.get.<a href="./src/resources/hsk/get.ts">retrieve</a>(handle, { ...params }) -> GetRetrieveResponse</code>
- <code title="get /api/{serviceId}/hsk/get/list">client.hsk.get.<a href="./src/resources/hsk/get.ts">list</a>(serviceID) -> GetListResponse</code>

# Misc

Methods:

- <code title="get /api/misc/echo">client.misc.<a href="./src/resources/misc.ts">echo</a>() -> void</code>

# Vci

Types:

- <code><a href="./src/resources/vci/vci.ts">VciCreateJwksResponse</a></code>
- <code><a href="./src/resources/vci/vci.ts">VciCreateJwtissuerResponse</a></code>
- <code><a href="./src/resources/vci/vci.ts">VciCreateMetadataResponse</a></code>

Methods:

- <code title="post /api/{serviceId}/vci/jwks">client.vci.<a href="./src/resources/vci/vci.ts">createJwks</a>(serviceID, { ...params }) -> VciCreateJwksResponse</code>
- <code title="post /api/{serviceId}/vci/jwtissuer">client.vci.<a href="./src/resources/vci/vci.ts">createJwtissuer</a>(serviceID, { ...params }) -> VciCreateJwtissuerResponse</code>
- <code title="post /api/{serviceId}/vci/metadata">client.vci.<a href="./src/resources/vci/vci.ts">createMetadata</a>(serviceID, { ...params }) -> VciCreateMetadataResponse</code>

## Offer

Types:

- <code><a href="./src/resources/vci/offer.ts">OfferCreateResponse</a></code>
- <code><a href="./src/resources/vci/offer.ts">OfferRetrieveInfoResponse</a></code>

Methods:

- <code title="post /api/{serviceId}/vci/offer/create">client.vci.offer.<a href="./src/resources/vci/offer.ts">create</a>(serviceID, { ...params }) -> OfferCreateResponse</code>
- <code title="post /api/{serviceId}/vci/offer/info">client.vci.offer.<a href="./src/resources/vci/offer.ts">retrieveInfo</a>(serviceID, { ...params }) -> OfferRetrieveInfoResponse</code>

## Single

Types:

- <code><a href="./src/resources/vci/single.ts">CredentialIssuanceOrder</a></code>
- <code><a href="./src/resources/vci/single.ts">CredentialRequestInfo</a></code>
- <code><a href="./src/resources/vci/single.ts">SingleIssueResponse</a></code>
- <code><a href="./src/resources/vci/single.ts">SingleParseResponse</a></code>

Methods:

- <code title="post /api/{serviceId}/vci/single/issue">client.vci.single.<a href="./src/resources/vci/single.ts">issue</a>(serviceID, { ...params }) -> SingleIssueResponse</code>
- <code title="post /api/{serviceId}/vci/single/parse">client.vci.single.<a href="./src/resources/vci/single.ts">parse</a>(serviceID, { ...params }) -> SingleParseResponse</code>

## Batch

Types:

- <code><a href="./src/resources/vci/batch.ts">BatchIssueResponse</a></code>
- <code><a href="./src/resources/vci/batch.ts">BatchParseResponse</a></code>

Methods:

- <code title="post /api/{serviceId}/vci/batch/issue">client.vci.batch.<a href="./src/resources/vci/batch.ts">issue</a>(serviceID, { ...params }) -> BatchIssueResponse</code>
- <code title="post /api/{serviceId}/vci/batch/parse">client.vci.batch.<a href="./src/resources/vci/batch.ts">parse</a>(serviceID, { ...params }) -> BatchParseResponse</code>

## Deferred

Types:

- <code><a href="./src/resources/vci/deferred.ts">DeferredIssueResponse</a></code>
- <code><a href="./src/resources/vci/deferred.ts">DeferredParseResponse</a></code>

Methods:

- <code title="post /api/{serviceId}/vci/deferred/issue">client.vci.deferred.<a href="./src/resources/vci/deferred.ts">issue</a>(serviceID, { ...params }) -> DeferredIssueResponse</code>
- <code title="post /api/{serviceId}/vci/deferred/parse">client.vci.deferred.<a href="./src/resources/vci/deferred.ts">parse</a>(serviceID, { ...params }) -> DeferredParseResponse</code>
