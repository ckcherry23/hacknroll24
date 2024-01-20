'use client'

import React, { useEffect, useRef, useState } from 'react'
import { RunButton, Sandpack, SandpackCodeEditor, SandpackLayout, SandpackProvider, useSandpack } from '@codesandbox/sandpack-react';
import { initialCode } from '../_levels/level-1';
import CodePreview from './code-preview';
import CodeEditor from './code-editor';
import { Button } from '@/components/ui/button';

export default function Stage() {
  const [code, setCode] = useState("");
  return (
    <SandpackProvider
      theme={"dark"} 
      template='react' 
      files={
        {
          "/App.js": {
            code: initialCode,
          }
        }
      }>
      <SandpackLayout>
        <CodeEditor setCode={setCode} />
        <CodePreview/>
      </SandpackLayout>
      <Button className='bg-black text-white hover:bg-gray-800' 
        onClick={() => console.log("fuck submitting", code)}>
          Submit code
        </Button>
    </SandpackProvider>
  )
}
