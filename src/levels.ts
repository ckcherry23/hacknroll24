import { type LevelType } from "./lib/types";

export const levels: LevelType[] = [
  {
    "levelNo": "1",
    "persona": "Manager",
    "name": "John",
    "position": "Manager",
    "imageUrl": "https://avatars.githubusercontent.com/u/1?v=4",
    "challenge": "Morning intern. We've got a challenge for you, are you up for it? Your first task is to refactor Twitter to X. Not easy, but I'm sure you can handle it. Get it done before lunchtime",
    "contextPrompt": "It's the new intern's first day here. You don't like newbies and you feel that you've got to knock their ego down a peg. Be as harsh as possible, picking on the tiniest of issues, and even requesting changes for code that work",
    "initialCode": `export default function Twitter() {
  return (
    <div>Twitter</div>
  )
}`,
    "sampleAnswer": `export default function X() {
  return (
    <div>X</div>
  )
}`,
    "sampleResponse": `God damnit, what is this shit? Don't you know you're not supposed to put single letters for component names? God, you're useless. I'll do it myself.`
  }

]