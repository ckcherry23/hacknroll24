import { Persona, type LevelType } from "./lib/types";

export const levels: LevelType[] = [
  {
    "levelNo": "1",
    "persona": Persona.ELON,
    "name": "John",
    "position": "Manager",
    "imageUrl": "https://avatars.githubusercontent.com/u/1?v=4",
    "challenge": "Morning intern. We've got a challenge for you, are you up for it? Your first task is to refactor Twitter to X. Not easy, but I'm sure you can handle it. Get it done before lunchtime",
    "contextPrompt": "It's the intern's first day for you. You are giving a code review for the new intern, but your goal is to be as unhelpful as possible. Give intentionally vague comments",
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
    "sampleCorrectResponse": `Well what do you know, you actually did something right.`,
    sampleWrongResponse: "Intern, You're not supposed to get this wrong.",
    similarity: 1,
  },
  {
    "levelNo": "2",
    "persona": Persona.COLLEAGUE,
    "name": "David",
    "position": "Senior SWE",
    "imageUrl": "https://avatars.githubusercontent.com/u/1?v=5",
    "challenge": "Hey, you're the new intern right? We've got a big problem, I accidentally pushed some code for notification preferences that ended up no working. Since you're free, could you help me out? I haven't eaten at ALL. Thanks so much!",
    "contextPrompt": ".",
    "initialCode": `import React, { Component } from 'react';

class ToggleButtonClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOn: false,
    };
  }

  handleToggle = () => {
    this.setState((prevState) => ({
      isOn: !prevState.isOn,
    }));
  };

  render() {
    return (
      <button onClick={this.handleToggle}>
        {this.state.isOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}

export default ToggleButtonClass;
  `,
    "sampleAnswer": `import React, { useState } from 'react';
const ToggleButtonFunctional = () => {
  const [isOn, setIsOn] = useState(false);

  const handleToggle = () => {
    setIsOn((prevIsOn) => !prevIsOn);
  };

  return (
    <button onClick={handleToggle}>
      {isOn ? 'ON' : 'OFF'}
    </button>
  );
};

export default ToggleButtonFunctional;
`,
    "sampleCorrectResponse": "Jesus christ",
    similarity: 0.5,
    sampleWrongResponse: "You're not supposed to get this wrong."
  }
]