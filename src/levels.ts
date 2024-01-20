import { Persona, type LevelType } from "./lib/types";

export const levels: LevelType[] = [
  {
    levelNo: "1",
    persona: Persona.MANAGER,
    name: "John",
    position: "Manager",
    imageUrl: "https://avatars.githubusercontent.com/u/1?v=4",
    challenge:
      "Morning intern. We've got a challenge for you, are you up for it? Your first task is to refactor Twitter to X. Not easy, but I'm sure you can handle it. Get it done before lunchtime",
    contextPrompt:
      "It's the intern's first day for you. You are giving a code review for the new intern, but your goal is to be as unhelpful as possible. Give intentionally vague comments",
    initialCode: `export default function Twitter() {
  return (
    <div>Twitter</div>
  )
}`,
    sampleAnswer: `export default function X() {
  return (
    <div>X</div>
  )
}`,
    sampleCorrectResponse: `Well what do you know, you actually did something right. But you've still got a lot more to go. I expect overtime tonight. Now go get me some coffee.`,
    correctness: 1,
    promotion: "Full-time Software Engineer Intern",
    conclusionText: "After getting your manager some coffee, you got straight back into work, only going back home at 9pm. Although your first day wasn't the best, you're confident that this company will be a stepping stone towards a greater future",
    conclusionImage: "/coffee.jpg",
  },
  {
    "levelNo": "2",
    promotion: "Semi-Senior Software Engineer Intern",
    "persona": Persona.COLLEAGUE,
    "name": "David",
    "position": "Senior SWE",
    "imageUrl": "https://avatars.githubusercontent.com/u/1?v=5",
    "challenge": "Hey, you're the new intern right? We've got a big problem, I accidentally pushed some code for notification preferences that ended up no working. Since you're free, could you help me by refactoring the class component into a functional component? I haven't eaten at ALL. Thanks so much!",
    "contextPrompt": "The code you want should be a functional React component that has a button. On clicking the button, it toggles its state from ON to OFF and vice versa. If it's not a functional component, it is wrong",
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
    sampleAnswer: `import React, { Component, useState } from 'react';

export default function ToggleButton() {
  const [isOn, setIsOn] = useState(false);

  const handleToggle = () => {
    setIsOn(!isOn)
  };

  return (
    <button onClick={handleToggle}>
      {isOn ? 'ON' : 'OFF'}
    </button>
  );
};`,
    sampleCorrectResponse:
      "Hey, thanks man. You really saved me this time. Hey, come to think of it, I have another job for you. I know tomorrow's a Saturday, but I think you're up for the task",
    correctness: 0.8,
    conclusionText: "You stayed back until 8pm to help David with his code. He was so grateful that he gave you a promotion. Haha, just kidding. You were the only one left in the office in yet another silent night. Still, you're certain that there is a light at the end of this tunnel. Once you're there, you'll be able to earn enough money to not work at this stupid job anymore!",
    conclusionImage: "/overtime.jpg",
  },

  {
    levelNo: "3",
    persona: Persona.ELON,
    promotion: "Almost Senior Software Engineer Intern",
    name: "Elon",
    position: "Chief Troll Officer",
    imageUrl: "../../images/elonmusk.jpg",
    challenge:
      "Hey Intern, you're in the office on a Saturday. Good! I have a very important job for you. I noticed a critical error in our system. The square in our application isn't centred! Now this is a huge problem because of a few very important reasons, but I don't have the time to explain to you. So just fix it and I'll be back by lunchtime to check, alright/ Okay.",
    contextPrompt:
      "The code should be a div that's centered in another div using flex. If it doesn't use flex, complain.",
    initialCode: `const CentredDiv = () => {
return (
    <div style={{background: "gray", height: 300, width: "100%"}}>
      <div style={{width: 100, height: 100, background: 'blue'}}>
      </div>
    </div>
  )
}
export default CentredDiv`,
    sampleAnswer: `const CentredDiv = () => {
return (
    <div style={{background: "gray", height: 300, width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
      <div style={{width: 100, height: 100, background: 'blue'}}>
      </div>
    </div>
  )
}
export default CentredDiv
  `,
    sampleCorrectResponse:
      "Hey not bad. See you next weekend.",
    correctness: 0.9,
    conclusionText: "You really met Elon! But did he really just ask you to work next weekend again?",
    conclusionImage: "/confused.jpeg",
  },
];
