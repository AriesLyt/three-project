import React, { useEffect, useRef } from 'react';

import BoxAndSphereInit from './main';

import './index.scss';

const BoxAndSphere = () => {

  const dom = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!dom.current) return
    const dispose = BoxAndSphereInit(dom.current);
    return () => {
      dispose()
    }
  })

  return (
    <div ref={dom} className='box-and-sphere'>
            
    </div>
  );
};

export default BoxAndSphere;
