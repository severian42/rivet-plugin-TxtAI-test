import TxtaiNode from "./nodes/TxtAINode"; // Import the TxtaiNode
import type { Rivet, RivetPlugin } from "@ironclad/rivet-core";

const initializer = (rivet: typeof Rivet) => {
  const txtaiNode = TxtaiNode(rivet); // Initialize TxtaiNode

  const plugin: RivetPlugin = {
    id: "rivet-plugin-txtai", // Unique ID
    name: "Rivet Plugin for txtai", // Display name
    configSpec: {},
    contextMenuGroups: [
      {
        id: "txtai",
        label: "Txtai",
      },
    ],
    register: (register) => {
      register(txtaiNode); // Register TxtaiNode
    },
  };

  return plugin;
};

export default initializer;
