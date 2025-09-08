/**
 * @generated SignedSource<<10431ea58036deef4d1af976acc27220>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type authProviderLoginMutation$variables = {
  email: string;
  password: string;
};
export type authProviderLoginMutation$data = {
  readonly signIn: {
    readonly user: {
      readonly id: string;
      readonly username: string;
    };
  } | null | undefined;
};
export type authProviderLoginMutation = {
  response: authProviderLoginMutation$data;
  variables: authProviderLoginMutation$variables;
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
      }
    ],
    "concreteType": "AuthPayload",
    "kind": "LinkedField",
    "name": "signIn",
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
    "name": "authProviderLoginMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "authProviderLoginMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "1c92043b41bd0116e56d43c122e4a7e5",
    "id": null,
    "metadata": {},
    "name": "authProviderLoginMutation",
    "operationKind": "mutation",
    "text": "mutation authProviderLoginMutation(\n  $email: String!\n  $password: String!\n) {\n  signIn(email: $email, password: $password) {\n    user {\n      id\n      username\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "61f90503e5169b58b64ae59ff9f9400d";

export default node;
