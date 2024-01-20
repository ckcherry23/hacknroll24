"use client";

import { useState } from "react";
import { SandpackLayout, SandpackProvider } from "@codesandbox/sandpack-react";
import CodePreview from "./code-preview";
import CodeEditor from "./code-editor";
import { Button } from "@/components/ui/button";
import CodeSubmitButton from "./code-submit-btn";
import { type LevelType } from "@/lib/types";
import ProblemStatement from "./problem/problem-statement";

type StageProps = {
  level: LevelType;
  onSubmit: (code: string) => void;
  advance: () => void;
  fail: () => void;
  passed: boolean;
  loading: boolean;
};

export default function Stage({
  level,
  onSubmit,
  passed,
  advance,
  loading,
  fail
}: StageProps) {
  const [client, setClient] = useState<unknown>();
  const [code, setCode] = useState(level.initialCode);

  // Used to intercept the onSubmit to get the code value
  const handleSubmit = (code: string) => {
    setCode(code);
    onSubmit(code);
  };
  return (
    <div className="flex w-full flex-col space-y-10 p-20">
      <ProblemStatement fail={fail} level={level} />
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

        {passed ? (
          <Button
            disabled={loading}
            onClick={advance}
            className="mt-4 w-full uppercase"
          >
            Accept Promotion
          </Button>
        ) : (
          <CodeSubmitButton
            loading={loading}
            client={client}
            onSubmit={handleSubmit}
          />
        )}
      </SandpackProvider>
    </div>
  );
}
