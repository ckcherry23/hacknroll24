'use client'

import React, { useEffect, useRef, useState } from 'react'
import { RunButton, Sandpack, SandpackCodeEditor, SandpackLayout, SandpackProvider, useSandpack } from '@codesandbox/sandpack-react';
import CodePreview from './code-preview';
import CodeEditor from './code-editor';
import { Button } from '@/components/ui/button';
import CodeSubmitButton from './code-submit-btn';
import { type LevelType } from '@/lib/types';
import ProblemStatement from './problem/problem-statement';

type StageProps = {
  level: LevelType
}

export default function Stage({level}: StageProps) {
  return (
    <div className='w-full flex flex-col p-20'>
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
          <CodePreview/>
        </SandpackLayout>
        <CodeSubmitButton level={level}/>
      </SandpackProvider>
    </div>
  )
}
