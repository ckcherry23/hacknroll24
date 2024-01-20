'use client';

import { Button } from '@/components/ui/button';
import { autocompletion, completionKeymap } from '@codemirror/autocomplete';
import { RunButton, SandpackCodeEditor, useActiveCode } from '@codesandbox/sandpack-react'
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
        // @ts-expect-error: "Strange type error, but it still works regardless"
        extensionsKeymap={[completionKeymap]}
          />
    </>
  )
}
