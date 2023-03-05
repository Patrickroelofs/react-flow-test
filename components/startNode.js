import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import { BsRecordCircle } from 'react-icons/bs';

const handleStyle = { top: "5px" };

export function StartNode({ data }) {
  const onChange = useCallback((evt) => {
    console.log(evt);
  }, []);

  return (
    <>
        <BsRecordCircle />
        <Handle type="source" position={Position.Bottom} id="a" style={handleStyle} onChange={onChange} />
    </>
  );
}