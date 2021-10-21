import { useEffect, useRef } from 'react';

const usePrevious = (data) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = data;
  }, [data]);
  return ref.current;
};

export default usePrevious;
