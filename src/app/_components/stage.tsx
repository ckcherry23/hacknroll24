'use client'

import React, { useEffect, useRef, useState } from 'react'
import { RunButton, Sandpack, SandpackCodeEditor, SandpackLayout, SandpackProvider, useSandpack } from '@codesandbox/sandpack-react';
import { initialCode } from '../_levels/level-1';
import CodePreview from './code-preview';
import CodeEditor from './code-editor';
import { Button } from '@/components/ui/button';
import CodeSubmitButton from './code-submit-btn';

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
        <CodeEditor />
        <CodePreview/>
      </SandpackLayout>
      <CodeSubmitButton/>
    </SandpackProvider>
  )
}
