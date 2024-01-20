'use client';

import { autocompletion, completionKeymap } from '@codemirror/autocomplete';
import { SandpackCodeEditor } from '@codesandbox/sandpack-react'
import React from 'react'

export default function CodeEditor() {
  return (
    <>
      <SandpackCodeEditor 
        showInlineErrors
        showLineNumbers
        extensions={[autocompletion()]}
        // @ts-expect-error: Weird typing issue only
        extensionsKeymap={[completionKeymap]}
          />
    </>
  )
}
