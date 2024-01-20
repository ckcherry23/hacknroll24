'use client'

import { SandpackPreview, type SandpackPreviewRef, useSandpack } from '@codesandbox/sandpack-react';
import React, { useEffect } from 'react'

type CodePreviewProps = {
  setClient: (client: unknown) => void;
}

export default function CodePreview({setClient}: CodePreviewProps) {
  const { sandpack } = useSandpack();
  const previewRef = React.useRef<SandpackPreviewRef>(null);
  useEffect(() => {
    const client = previewRef.current?.getClient();
    const clientId = previewRef.current?.clientId;
 
    if (client && clientId) {
      setClient(client)
      // console.log(sandpack.clients[clientId]);
    }
  }, [sandpack])
  return (
    <SandpackPreview ref={previewRef}/>
  )
}
