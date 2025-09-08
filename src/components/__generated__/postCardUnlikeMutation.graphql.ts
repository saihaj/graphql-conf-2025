/**
 * @generated SignedSource<<046021c03ea2adc7be9cabc3a2184e3f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type postCardUnlikeMutation$variables = {
  id: string;
};
export type postCardUnlikeMutation$data = {
  readonly unlikePost: {
    readonly post: {
      readonly likeCount: number;
      readonly likedByMe: boolean;
    };
  };
};
export type postCardUnlikeMutation$rawResponse = {
  readonly unlikePost: {
    readonly post: {
      readonly id: string;
      readonly likeCount: number;
      readonly likedByMe: boolean;
    };
  };
};
export type postCardUnlikeMutation = {
  rawResponse: postCardUnlikeMutation$rawResponse;
  response: postCardUnlikeMutation$data;
  variables: postCardUnlikeMutation$variables;
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
    "name": "postCardUnlikeMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UnlikePostPayload",
        "kind": "LinkedField",
        "name": "unlikePost",
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
    "name": "postCardUnlikeMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UnlikePostPayload",
        "kind": "LinkedField",
        "name": "unlikePost",
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
    "cacheID": "e642e525a3ece149d47f5d6be891be9d",
    "id": null,
    "metadata": {},
    "name": "postCardUnlikeMutation",
    "operationKind": "mutation",
    "text": "mutation postCardUnlikeMutation(\n  $id: ID!\n) {\n  unlikePost(input: {id: $id}) {\n    post {\n      likeCount\n      likedByMe\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "e92d0ea70bb452f84541bc7dd3016c1b";

export default node;
