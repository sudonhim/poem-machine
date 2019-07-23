import { Router } from 'express';
import * as api from '../../shared/apiTypes';

export function apiRouter() {
  const router = Router();

  router.get('/docs/get/:id', (req, res) => {
    const id = req.params.id;
    const result: api.IDoc = {
      text: `Sample text for a document with ID ${id}`
    };
    res.json(result);
  });

  router.get('/docs/graph', (req, res) => {
    const result: api.IDocGraph = {
      dynamicCollectionRoot: {
        kind: api.DocKind.DynamicCollectionRoot,
        title: "Sample Root",
        children: ["001", "002"]
      },
      "001": {
        kind: api.DocKind.DynamicCollection,
        title: "Sample Collection 1",
        children: ["003", "004"]
      },
      "002": {
        kind: api.DocKind.DynamicCollection,
        title: "Sample Collection 2",
        children: ["004", "005"]
      },
      "003": {
        kind: api.DocKind.DynamicCollection,
        title: "Sample Document 1"
      },
      "004": {
        kind: api.DocKind.DynamicCollection,
        title: "Sample Document 2"
      },
      "005": {
        kind: api.DocKind.DynamicCollection,
        title: "Sample Document 3"
      }
    };
    res.json(result);
  });

  router.get('/docs/search/:term', (req, res) => {
    const term = req.params.term;
    const result: api.ISearchResults = {
      hits: [
        {
          id: "003",
          preview: `Sample highlight for term ${term} hit on ID 003`
        },
        {
          id: "005",
          preview: `Sample highlight for term ${term} hit on ID 005`
        }
      ]
    };
    res.json(result);
  });

  return router;
}