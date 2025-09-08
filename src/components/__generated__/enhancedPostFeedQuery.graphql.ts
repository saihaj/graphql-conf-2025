/**
 * @generated SignedSource<<bbb70650745f0f65a1df0429bd04fb32>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type enhancedPostFeedQuery$variables = {
  first: number;
};
export type enhancedPostFeedQuery$data = {
  readonly timeline: {
    readonly __id: string;
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly " $fragmentSpreads": FragmentRefs<"postCard">;
      };
    }>;
  };
};
export type enhancedPostFeedQuery = {
  response: enhancedPostFeedQuery$data;
  variables: enhancedPostFeedQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "first"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "concreteType": "PageInfo",
  "kind": "LinkedField",
  "name": "pageInfo",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "endCursor",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "hasNextPage",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v5 = {
  "kind": "ClientExtension",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "__id",
      "storageKey": null
    }
  ]
},
v6 = [
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "first"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "enhancedPostFeedQuery",
    "selections": [
      {
        "alias": "timeline",
        "args": null,
        "concreteType": "PostConnection",
        "kind": "LinkedField",
        "name": "__postCardFragment_timeline_connection",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "PostEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Post",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v1/*: any*/),
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "postCard"
                  },
                  (v2/*: any*/)
                ],
                "storageKey": null
              },
              (v3/*: any*/)
            ],
            "storageKey": null
          },
          (v4/*: any*/),
          (v5/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "enhancedPostFeedQuery",
    "selections": [
      {
        "alias": null,
        "args": (v6/*: any*/),
        "concreteType": "PostConnection",
        "kind": "LinkedField",
        "name": "timeline",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "PostEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Post",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v1/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "likeCount",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "text",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "likedByMe",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "createdAt",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "User",
                    "kind": "LinkedField",
                    "name": "author",
                    "plural": false,
                    "selections": [
                      (v1/*: any*/),
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
                  (v2/*: any*/)
                ],
                "storageKey": null
              },
              (v3/*: any*/)
            ],
            "storageKey": null
          },
          (v4/*: any*/),
          (v5/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v6/*: any*/),
        "filters": null,
        "handle": "connection",
        "key": "postCardFragment_timeline",
        "kind": "LinkedHandle",
        "name": "timeline"
      }
    ]
  },
  "params": {
    "cacheID": "7ff174c8fa318c17c96a08d95dcae328",
    "id": null,
    "metadata": {
      "connection": [
        {
          "count": "first",
          "cursor": null,
          "direction": "forward",
          "path": [
            "timeline"
          ]
        }
      ]
    },
    "name": "enhancedPostFeedQuery",
    "operationKind": "query",
    "text": "query enhancedPostFeedQuery(\n  $first: Int!\n) {\n  timeline(first: $first) {\n    edges {\n      node {\n        id\n        ...postCard\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n\nfragment postCard on Post {\n  id\n  likeCount\n  text\n  likedByMe\n  createdAt\n  author {\n    id\n    username\n  }\n}\n"
  }
};
})();

(node as any).hash = "5719951201cb89762c2dcb059ea940cf";

export default node;
