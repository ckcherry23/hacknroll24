'use client'

import React, { useEffect, useRef, useState } from 'react'
import { RunButton, Sandpack, SandpackCodeEditor, SandpackLayout, SandpackProvider, useActiveCode, useSandpack } from '@codesandbox/sandpack-react';
import CodePreview from './code-preview';
import CodeEditor from './code-editor';
import { Button } from '@/components/ui/button';
import CodeSubmitButton from './code-submit-btn';
import { type LevelType } from '@/lib/types';
import ProblemStatement from './problem/problem-statement';


type StageProps = {
  level: LevelType;
  onSubmit: (code: string) => void;
}

export default function Stage({level, onSubmit}: StageProps) {
  const [client, setClient] = useState<unknown>()
  return (
    <div className='w-full flex flex-col p-20 space-y-10'>
      <ProblemStatement level={level} />
      <SandpackProvider
        theme={"dark"} 
        template='react' 
        options={{
          classes: {
            "sp-wrapper": "stage",
          }
        }}
        files={
          {
            "/App.js": {
              code: level.initialCode,
            }
          }
        }>
        <SandpackLayout className='flex-grow'>
          <CodeEditor />
          <CodePreview setClient={setClient} />
        </SandpackLayout>
        <CodeSubmitButton client={client} onSubmit={onSubmit}/>
      </SandpackProvider>
    </div>
  )
}
