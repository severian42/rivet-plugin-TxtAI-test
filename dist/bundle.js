var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// txtai/index.js
var txtai_exports = {};
__export(txtai_exports, {
  Embeddings: () => embeddings_default,
  Extractor: () => extractor_default,
  Labels: () => labels_default,
  Segmentation: () => segmentation_default,
  Similarity: () => similarity_default,
  Summary: () => summary_default,
  Textractor: () => textractor_default,
  Transcription: () => transcription_default,
  Translation: () => translation_default,
  Workflow: () => workflow_default
});

// txtai/api.js
var API = class {
  /**
   * Creates an API instance.
   * 
   * @param url base url
   */
  constructor(url) {
    this.url = url;
  }
  /**
   * Executes a get request.
   * 
   * @param method api method
   * @param params query parameters
   * @return response
   */
  async get(method, params) {
    let url = `${this.url}/${method}`;
    if (params) {
      url += `?${new URLSearchParams(params)}`;
    }
    let res = await fetch(url);
    return res.ok ? await res.json() : Promise.reject(`${res.status} ${res.statusText}`);
  }
  /**
   * Executes a post request.
   * 
   * @param method api method
   * @param params post parameters
   * @return response
   */
  async post(method, params) {
    let url = `${this.url}/${method}`;
    let res = await fetch(url, {
      method: "post",
      body: JSON.stringify(params),
      headers: { "content-type": "application/json" }
    });
    return res.ok ? await res.json() : Promise.reject(`${res.status} ${res.statusText}`);
  }
};
var api_default = API;

// txtai/embeddings.js
var Embeddings = class extends api_default {
  /**
   * Finds documents in the embeddings model most similar to the input query. Returns
   * a list of {id: value, score: value} sorted by highest score, where id is the
   * document id in the embeddings model.
   * 
   * @param query query text
   * @param limit maximum results (defaults to 10)
   * @return list of {id: value, score: value}
   */
  async search(query, limit = 10) {
    return await this.get("search", { query, limit }).catch((e) => {
      throw e;
    });
  }
  /**
   * Finds documents in the embeddings model most similar to the input queries. Returns
   * a list of {id: value, score: value} sorted by highest score per query, where id is
   * the document id in the embeddings model.
   *
   * @param queries queries text
   * @param limit maximum results (defaults to 10)
   * @return list of {id: value, score: value} per query
   */
  async batchsearch(queries, limit = 10) {
    return await this.post("batchsearch", { queries, limit }).catch((e) => {
      throw e;
    });
  }
  /**
   * Adds a batch of documents for indexing.
   * 
   * @param documents list of {id: value, text: value}
   */
  async add(documents) {
    await this.post("add", documents).catch((e) => {
      throw e;
    });
  }
  /**
   * Builds an embeddings index for previously batched documents.
   */
  async index() {
    await this.get("index", null).catch((e) => {
      throw e;
    });
  }
  /**
   * Runs an embeddings upsert operation for previously batched documents.
   */
  async upsert() {
    await this.get("upsert", null).catch((e) => {
      throw e;
    });
  }
  /**
   * Deletes from an embeddings index. Returns list of ids deleted.
   *
   * @param ids list of ids to delete
   * @return ids deleted
   */
  async delete(ids) {
    return await this.post("delete", ids).catch((e) => {
      throw e;
    });
  }
  /**
   * Total number of elements in this embeddings index.
   *
   * @return number of elements in embeddings index
   */
  async count() {
    return await this.get("count", null).catch((e) => {
      throw e;
    });
  }
  /**
   * Computes the similarity between query and list of text. Returns a list of
   * {id: value, score: value} sorted by highest score, where id is the index
   * in texts.
   *
   * @param query query text
   * @param texts list of text
   * @return list of {id: value, score: value}
   */
  async similarity(query, texts) {
    return await this.post("similarity", { query, texts }).catch((e) => {
      throw e;
    });
  }
  /**
   * Computes the similarity between list of queries and list of text. Returns a list
   * of {id: value, score: value} sorted by highest score per query, where id is the
   * index in texts.
   * 
   * @param queries queries text
   * @param texts list of text
   * @return list of {id: value, score: value} per query
   */
  async batchsimilarity(queries, texts) {
    return await this.post("batchsimilarity", { queries, texts }).catch((e) => {
      throw e;
    });
  }
  /**
   * Transforms text into an embeddings array.
   *
   * @param text input text
   * @return embeddings array
   */
  async transform(text) {
    return await this.get("transform", { text }).catch((e) => {
      throw e;
    });
  }
  /**
   * Transforms list of text into embeddings arrays.
   *
   * @param texts list of text
   * @return embeddings array
   */
  async batchtransform(texts) {
    return await this.post("batchtransform", texts).catch((e) => {
      throw e;
    });
  }
};
var embeddings_default = Embeddings;

// txtai/extractor.js
var Extractor = class extends api_default {
  /**
   * Extracts answers to input questions.
   * 
   * @param queue list of {name: value, query: value, question: value, snippet: value}
   * @param texts list of text
   * @return list of {name: value, answer: value}
   */
  async extract(queue, texts) {
    return await this.post("extract", { queue, texts }).catch((e) => {
      throw e;
    });
  }
};
var extractor_default = Extractor;

// txtai/labels.js
var Labels = class extends api_default {
  /**
   * Applies a zero shot classifier to text using a list of labels. Returns a list of
   * {id: value, score: value} sorted by highest score, where id is the index in labels.
   * 
   * @param text input text
   * @param labels list of labels
   * @return list of {id: value, score: value} per text element
   */
  async label(text, labels) {
    return await this.post("label", { text, labels }).catch((e) => {
      throw e;
    });
  }
  /**
   * Applies a zero shot classifier to list of text using a list of labels. Returns a list of
   * {id: value, score: value} sorted by highest score, where id is the index in labels per
   * text element.
   *
   * @param texts list of texts
   * @param labels list of labels
   * @return list of {id: value score: value} per text element
   */
  async batchlabel(texts, labels) {
    return await this.post("batchlabel", { texts, labels }).catch((e) => {
      throw e;
    });
  }
};
var labels_default = Labels;

// txtai/segmentation.js
var Segmentation = class extends api_default {
  /**
   * Segments text into semantic units.
   * 
   * @param text input text
   * @return segmented text
   */
  async segment(text) {
    return await this.get("segment", { text }).catch((e) => {
      throw e;
    });
  }
  /**
   * Segments text into semantic units.
   * 
   * @param texts list of texts to segment
   * @return list of segmented text
   */
  async batchsegment(texts) {
    return await this.post("batchsegment", texts).catch((e) => {
      throw e;
    });
  }
};
var segmentation_default = Segmentation;

// txtai/similarity.js
var Similarity = class extends api_default {
  /**
   * Computes the similarity between query and list of text. Returns a list of
   * {id: value, score: value} sorted by highest score, where id is the index
   * in texts.
   *
   * @param query query text
   * @param texts list of text
   * @return list of {id: value, score: value}
   */
  async similarity(query, texts) {
    return await this.post("similarity", { query, texts }).catch((e) => {
      throw e;
    });
  }
  /**
   * Computes the similarity between list of queries and list of text. Returns a list
   * of {id: value, score: value} sorted by highest score per query, where id is the
   * index in texts.
   *
   * @param queries queries text
   * @param texts list of text
   * @return list of {id: value, score: value} per query
   */
  async batchsimilarity(queries, texts) {
    return await this.post("batchsimilarity", { queries, texts }).catch((e) => {
      throw e;
    });
  }
};
var similarity_default = Similarity;

// txtai/summary.js
var Summary = class extends api_default {
  /**
   * Runs a summarization model against a block of text.
   *
   * @param text text to summarize
   * @param minlength minimum length for summary
   * @param maxlength maximum length for summary
   * @return summary text
   */
  async summary(text, minlength, maxlength) {
    let params = { text };
    if (minlength) {
      params.minlength = minlength;
    }
    if (maxlength) {
      params.maxlength = maxlength;
    }
    return await this.get("summary", params).catch((e) => {
      throw e;
    });
  }
  /**
   * Runs a summarization model against a block of text.
   *
   * @param texts list of text to summarize
   * @param minlength minimum length for summary
   * @param maxlength maximum length for summary
   * @return list of summary text
   */
  async batchsummary(texts, minlength, maxlength) {
    let params = { texts };
    if (minlength) {
      params.minlength = minlength;
    }
    if (maxlength) {
      params.maxlength = maxlength;
    }
    return await this.post("batchsummary", params).catch((e) => {
      throw e;
    });
  }
};
var summary_default = Summary;

// txtai/textractor.js
var Textractor = class extends api_default {
  /**
   * Extracts text from a file at path.
   * 
   * @param file file to extract text
   * @return extracted text
   */
  async textract(file) {
    return await this.get("textract", { file }).catch((e) => {
      throw e;
    });
  }
  /**
   * Extracts text from a file at path.
   * 
   * @param files list of files to extract text
   * @return list of extracted text
   */
  async batchtextract(files2) {
    return await this.post("batchtextract", files2).catch((e) => {
      throw e;
    });
  }
};
var textractor_default = Textractor;

// txtai/transcription.js
var Transcription = class extends api_default {
  /**
   * Transcribes audio files to text.
   * 
   * @param file file to transcribe
   * @return transcribed text
   */
  async transcribe(file) {
    return await this.get("transcribe", { file }).catch((e) => {
      throw e;
    });
  }
  /**
   * Transcribes audio files to text.
   * 
   * @param files list of files to transcribe
   * @return list of transcribed text
   */
  async batchtranscribe(files2) {
    return await this.post("batchtranscribe", files2).catch((e) => {
      throw e;
    });
  }
};
var transcription_default = Transcription;

// txtai/translation.js
var Translation = class extends api_default {
  /**
   * Translates text from source language into target language.
   * 
   * @param text text to translate
   * @param target target language code, defaults to "en"
   * @param source source language code, detects language if not provided
   * @return translated text
   */
  async translate(text, target, source) {
    let params = { text };
    if (target) {
      params.target = target;
    }
    if (source) {
      params.source = source;
    }
    return await this.get("translate", params).catch((e) => {
      throw e;
    });
  }
  /**
   * Translates text from source language into target language.
   * 
   * @param texts list of text to translate
   * @param target target language code, defaults to "en"
   * @param source source language code, detects language if not provided
   * @return list of translated text
   */
  async batchtranslate(texts, target, source) {
    let params = { texts };
    if (target) {
      params.target = target;
    }
    if (source) {
      params.source = source;
    }
    return await this.post("batchtranslate", files).catch((e) => {
      throw e;
    });
  }
};
var translation_default = Translation;

// txtai/workflow.js
var Workflow = class extends api_default {
  /**
   * Executes a named workflow using elements as input.
   *
   * @param name workflow name
   * @param elements list of elements to run through workflow
   * @return list of processed elements
   */
  async workflow(name, elements) {
    return await this.post("workflow", { name, elements }).catch((e) => {
      throw e;
    });
  }
};
var workflow_default = Workflow;

// src/nodes/TxtAINode.ts
function TxtAINode_default(rivet) {
  const nodeImpl = {
    create() {
      return {
        id: rivet.newId(),
        data: {
          operation: ""
          // Initialize operation as empty
        },
        title: "Txtai Node",
        type: "txtai",
        visualData: {
          x: 0,
          y: 0,
          width: 200
        }
      };
    },
    getInputDefinitions(_data) {
      return [
        {
          id: "operation",
          dataType: "string",
          title: "Operation"
        },
        {
          id: "inputData",
          dataType: "string",
          title: "Input Data"
        }
      ];
    },
    getOutputDefinitions() {
      return [
        {
          id: "outputData",
          dataType: "string",
          title: "Output Data"
        }
      ];
    },
    getEditors() {
      return [];
    },
    getBody() {
      return "";
    },
    getUIData() {
      return {
        group: "AI",
        contextMenuTitle: "Txtai",
        infoBoxBody: "Txtai Node",
        infoBoxTitle: "Txtai Node"
      };
    },
    async process(data, inputData, _context) {
      const operation = rivet.getInputOrData(
        data,
        inputData,
        "operation",
        "string"
      );
      const input = rivet.coerceType(
        inputData["inputData"],
        "string"
      );
      let output = "";
      if (txtai_exports[operation]) {
        output = await txtai_exports[operation](input);
      } else {
        output = "Invalid operation";
      }
      return {
        ["outputData"]: {
          type: "string",
          value: output
        }
      };
    }
  };
  return rivet.pluginNodeDefinition(nodeImpl, "Txtai Node");
}

// src/index.ts
var initializer = (rivet) => {
  const txtaiNode = TxtAINode_default(rivet);
  const plugin = {
    id: "rivet-plugin-txtai",
    // Unique ID
    name: "Rivet Plugin for txtai",
    // Display name
    configSpec: {},
    contextMenuGroups: [
      {
        id: "txtai",
        label: "Txtai"
      }
    ],
    register: (register) => {
      register(txtaiNode);
    }
  };
  return plugin;
};
var src_default = initializer;
export {
  src_default as default
};
