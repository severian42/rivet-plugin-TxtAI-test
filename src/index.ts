// Dynamically import Node-only functionalities
// This will only be filled in a Node.js environment
let txtaiNodeFunctions;
if (typeof process !== 'undefined' && process.versions && process.versions.node) {
  txtaiNodeFunctions = import('./dist/nodeEntry.cjs');
}

import TxtaiNode from "./nodes/TxtaiNode";  // Import the TxtaiNode

const initializer = (rivet) => {
  const txtaiNode = TxtaiNode(rivet);  // Initialize TxtaiNode

  const plugin = {
    id: "rivet-plugin-txtai",  // Unique ID
    name: "Rivet Plugin for txtai",  // Display name
    configSpec: {},
    contextMenuGroups: [
      {
        id: "txtai",
        label: "Txtai"
      }
    ],
    register: (register) => {
      register(txtaiNode);  // Register TxtaiNode
    },
    // Function to dynamically load Node-only functionalities
    async loadNodeFunctions() {
      if (!txtaiNodeFunctions) {
        console.warn("Node-only functionalities are not available in this environment.");
        return;
      }
      return await txtaiNodeFunctions;
    }
  };

  return plugin;
};

export default initializer;
