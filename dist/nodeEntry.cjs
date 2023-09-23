// Import bundled Txtai.js library
import * as txtai from './txtai'';

function TxtaiNode_default(rivet) {
  const nodeImpl = {
    create() {
      const node = {
        id: rivet.newId(),
        data: {
          operation: "",
          arguments: []
        },
        title: "Txtai Node",
        type: "txtai",
        visualData: {
          x: 0,
          y: 0,
          width: 200
        }
      };
      return node;
    },

    getInputDefinitions(data, _connections, _nodes, _project) {
      const inputs = [
        {
          id: "operation",
          dataType: "string",
          title: "Operation"
        },
        {
          id: "arguments",
          dataType: "string[]",
          title: "Arguments"
        }
      ];
      return inputs;
    },

    getOutputDefinitions(_data, _connections, _nodes, _project) {
      return [
        {
          id: "output",
          dataType: "string",
          title: "Output"
        }
      ];
    },

    getUIData() {
      return {
        contextMenuTitle: "Txtai Node",
        group: "Txtai",
        infoBoxBody: "This node uses the Txtai library for text operations.",
        infoBoxTitle: "Txtai Node"
      };
    },

    getEditors(_data) {
      return [
        {
          type: "string",
          dataKey: "operation",
          label: "Operation"
        },
        {
          type: "string[]",
          dataKey: "arguments",
          label: "Arguments"
        }
      ];
    },

    getBody(data) {
      return `${data.operation} ${data.arguments.join(', ')}`;
    },

    async process(data, inputData, _context) {
      const operation = rivet.getInputOrData(data, inputData, "operation", "string");
      const args = rivet.getInputOrData(data, inputData, "arguments", "string[]");

      let output = "";
      if (txtai[operation]) {
        output = await txtai[operation](...args);
      } else {
        output = "Invalid operation";
      }

      return {
        ["output"]: {
          type: "string",
          value: output
        }
      };
    }
  };

  const nodeDefinition = rivet.pluginNodeDefinition(nodeImpl, "Txtai Node");
  return nodeDefinition;
}

// src/index.ts
const initializer = (rivet) => {
  const node = TxtaiNode_default(rivet);
  const plugin = {
    id: "rivet-plugin-txtai",
    name: "Rivet Plugin for Txtai",
    configSpec: {},
    contextMenuGroups: [
      {
        id: "txtai",
        label: "Txtai"
      }
    ],
    register: (register) => {
      register(node);
    }
  };
  return plugin;
};

export default initializer;
