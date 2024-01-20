"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  RunButton,
  Sandpack,
  SandpackCodeEditor,
  SandpackLayout,
  SandpackProvider,
  useActiveCode,
  useSandpack,
} from "@codesandbox/sandpack-react";
import CodePreview from "./code-preview";
import CodeEditor from "./code-editor";
import { Button } from "@/components/ui/button";
import CodeSubmitButton from "./code-submit-btn";
import { type LevelType } from "@/lib/types";
import ProblemStatement from "./problem/problem-statement";

type StageProps = {
  level: LevelType;
  onSubmit: (code: string) => void;
  loading: boolean;
};

export default function Stage({ level, onSubmit, loading }: StageProps) {
  const [client, setClient] = useState<unknown>();
  const [code, setCode] = useState(level.initialCode);

  // Used to intercept the onSubmit to get the code value
  const handleSubmit = (code: string) => {
    setCode(code);
    onSubmit(code);
  };
  return (
    <div className="flex w-full flex-col space-y-10 p-20">
      <ProblemStatement level={level} />
      <SandpackProvider
        theme={"dark"}
        template="react"
        customSetup={{
          dependencies: {
            "react-markdown": "latest",
          },
        }}
        options={{
          classes: {
            "sp-wrapper": "stage",
          },
        }}
        files={{
          "/App.js": {
            code: code,
          },
        }}
      >
        <SandpackLayout className="flex-grow">
          <CodeEditor />
          <CodePreview setClient={setClient} />
        </SandpackLayout>
        <CodeSubmitButton client={client} onSubmit={handleSubmit} loading={loading} />
      </SandpackProvider>
    </div>
  );
}
