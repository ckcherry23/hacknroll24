import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { type LevelType } from "@/lib/types";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";

type ProblemProps = {
  level: LevelType;
};

export default function ProblemStatement({ level }: ProblemProps) {
  const { levelNo, challenge } = level;
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold">Level: {levelNo}</h1>
          <Timer />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex">
          <div>{challenge}</div>
        </div>
      </CardContent>
    </Card>
  );
}

function Timer() {
  const [timeLeft, setTimeLeft] = useState(5 * 60);

  // Use the useEffect hook to set up the timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((timeLeft) => timeLeft - 1);
    }, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (timeLeft < 0) {
      alert("Times up! You're fired");
      redirect("/");
    }
  }, [timeLeft]);

  return (
    <div className="flex">
      <div className="flex w-full items-center justify-center text-center text-6xl">
        <div className="mx-1 w-24 rounded-lg bg-accent p-2 text-primary">
          <div className="font-mono leading-none" x-text="minutes">
            0{Math.floor(timeLeft / 60)}
          </div>
          <div className="font-mono text-sm uppercase leading-none">
            Minutes
          </div>
        </div>
        <div className="mx-1 w-24 rounded-lg bg-accent p-2 text-primary">
          <div className="font-mono leading-none" x-text="seconds">
            {Math.round(timeLeft % 60)}
          </div>
          <div className="font-mono text-sm uppercase leading-none">
            Seconds
          </div>
        </div>
      </div>
    </div>
  );
}
