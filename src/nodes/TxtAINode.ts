import type {
  ChartNode,
  Inputs,
  InternalProcessContext,
  NodeId,
  NodeInputDefinition,
  NodeOutputDefinition,
  PluginNodeImpl,
  Outputs,
  PortId,
  Rivet,
} from "@ironclad/rivet-core";
import * as txtai from './txtai';
export type TxtaiNode = ChartNode<'txtai', TxtaiNodeData>;

export type TxtaiNodeData = {
  operation: string;
};

export default function (rivet: typeof Rivet) {
  const nodeImpl: PluginNodeImpl<TxtaiNode> = {
    create(): TxtaiNode {
      return {
        id: rivet.newId<NodeId>(),
        data: {
          operation: "",  // Initialize operation as empty
        },
        title: "Txtai Node",
        type: 'txtai',
        visualData: {
          x: 0,
          y: 0,
          width: 200,
        },
      };
    },

    getInputDefinitions(_data: TxtaiNodeData): NodeInputDefinition[] {
      return [
        {
          id: 'operation' as PortId,
          dataType: 'string',
          title: 'Operation',
        },
        {
          id: 'inputData' as PortId,
          dataType: 'string',
          title: 'Input Data',
        },
      ];
    },

    getOutputDefinitions(): NodeOutputDefinition[] {
      return [
        {
          id: 'outputData' as PortId,
          dataType: 'string',
          title: 'Output Data',
        },
      ];
    },

    async process(
      data: TxtaiNodeData,
      inputData: Inputs,
      _context: InternalProcessContext
    ): Promise<Outputs> {
      const operation = rivet.getInputOrData(data, inputData, "operation", "string");
      const input = rivet.getInputOrData(data, inputData, "inputData", "string");
      
      let output: string = "";

      if (txtai[operation]) {
        output = await txtai[operation](input);  // Use bundled Txtai.js functionality
      } else {
        output = "Invalid operation";
      }

      return {
        ['outputData' as PortId]: {
          type: 'string',
          value: output,
        },
      };
    },
  };

  return rivet.pluginNodeDefinition(nodeImpl, "Txtai Node");
}
