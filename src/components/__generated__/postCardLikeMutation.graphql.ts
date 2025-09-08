/**
 * @generated SignedSource<<b5dcd9c66be6e1fd3c17734564bdd643>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type postCardLikeMutation$variables = {
  id: string;
};
export type postCardLikeMutation$data = {
  readonly likePost: {
    readonly post: {
      readonly likeCount: number;
      readonly likedByMe: boolean;
    };
  };
};
export type postCardLikeMutation$rawResponse = {
  readonly likePost: {
    readonly post: {
      readonly id: string;
      readonly likeCount: number;
      readonly likedByMe: boolean;
    };
  };
};
export type postCardLikeMutation = {
  rawResponse: postCardLikeMutation$rawResponse;
  response: postCardLikeMutation$data;
  variables: postCardLikeMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "fields": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      }
    ],
    "kind": "ObjectValue",
    "name": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "likeCount",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "likedByMe",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "postCardLikeMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "LikePostPayload",
        "kind": "LinkedField",
        "name": "likePost",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Post",
            "kind": "LinkedField",
            "name": "post",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "postCardLikeMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "LikePostPayload",
        "kind": "LinkedField",
        "name": "likePost",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Post",
            "kind": "LinkedField",
            "name": "post",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "id",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "7f41c7840525d900e74e3c3a5e805b01",
    "id": null,
    "metadata": {},
    "name": "postCardLikeMutation",
    "operationKind": "mutation",
    "text": "mutation postCardLikeMutation(\n  $id: ID!\n) {\n  likePost(input: {id: $id}) {\n    post {\n      likeCount\n      likedByMe\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "bab303c008ea61dfac7f0c81bd9ef7bc";

export default node;
