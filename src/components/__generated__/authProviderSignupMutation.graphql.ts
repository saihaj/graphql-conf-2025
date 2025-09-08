/**
 * @generated SignedSource<<b33773560713a13a5aea1e89f068dc1a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type authProviderSignupMutation$variables = {
  email: string;
  password: string;
  username: string;
};
export type authProviderSignupMutation$data = {
  readonly signUp: {
    readonly token: string;
    readonly user: {
      readonly id: string;
      readonly username: string;
    };
  } | null | undefined;
};
export type authProviderSignupMutation = {
  response: authProviderSignupMutation$data;
  variables: authProviderSignupMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "email"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "password"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "username"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "email",
        "variableName": "email"
      },
      {
        "kind": "Variable",
        "name": "password",
        "variableName": "password"
      },
      {
        "kind": "Variable",
        "name": "username",
        "variableName": "username"
      }
    ],
    "concreteType": "AuthPayload",
    "kind": "LinkedField",
    "name": "signUp",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "user",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "username",
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "token",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "authProviderSignupMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "authProviderSignupMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "c7a275ab6ce9937d19050f2767df0963",
    "id": null,
    "metadata": {},
    "name": "authProviderSignupMutation",
    "operationKind": "mutation",
    "text": "mutation authProviderSignupMutation(\n  $email: String!\n  $password: String!\n  $username: String!\n) {\n  signUp(email: $email, password: $password, username: $username) {\n    user {\n      id\n      username\n    }\n    token\n  }\n}\n"
  }
};
})();

(node as any).hash = "8616cdcb1fa6a4d57e3a69fc313b5d92";

export default node;
