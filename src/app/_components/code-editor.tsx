'use client';

import { autocompletion, completionKeymap } from '@codemirror/autocomplete';
import { SandpackCodeEditor } from '@codesandbox/sandpack-react'
import React from 'react'

type P = {
  setCode: React.Dispatch<React.SetStateAction<string>>;
}

export default function CodeEditor() {
  return (
    <>
      <SandpackCodeEditor 
        showInlineErrors
        extensions={[autocompletion()]}
        extensionsKeymap={[completionKeymap]}
          />
    </>
  )
}
