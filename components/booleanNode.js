import { useCallback } from "react";
import { Handle, Position } from "reactflow";

export function BooleanNode({ data, isConnectible }) {
  const onChange = useCallback((evt) => {
    console.log(evt);
  }, []);

  return (
    <>
      <Handle type="target" position={Position.Top} id="a" />
      <div className="px-2 py-2">
        <label htmlFor="text">Boolean Question</label>
      </div>

      <div className="flex justify-between">
        <div>
          <Handle
            type="source"
            position={Position.Bottom}
            isConnectable={isConnectible}
            id="a"
            style={{
              left: 10,
            }}
          />
          <span className="text-xs">YES</span>
        </div>

        <div>
          <Handle
            type="source"
            position={Position.Bottom}
            isConnectable={isConnectible}
            id="b"
            style={{
              left: 145,
            }}
          />
          <span className="text-xs">NO</span>
        </div>
      </div>
    </>
  );
}
