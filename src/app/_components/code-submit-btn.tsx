"use client";

import { Button } from "@/components/ui/button";
import { useActiveCode } from "@codesandbox/sandpack-react";
import { Loader2 } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";

type CodeSubmitButtonProps = {
  client: unknown;
  onSubmit: (code: string) => void;
  loading: boolean;
};

export default function CodeSubmitButton({
  client,
  onSubmit,
  loading,
}: CodeSubmitButtonProps) {
  const { code } = useActiveCode();
  return (
    <Button
      disabled={loading}
      onClick={() => {
        // @ts-expect-error: Just trust me
        if (client && client.errors.length == 0) {
          onSubmit(code);
        } else {
          toast.error("Don't you dare turn up shoddy work, intern");
        }
      }}
      className="mb-8 mt-4 w-full font-mono"
    >
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Ready for Review
    </Button>
  );
}
