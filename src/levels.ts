import { Persona, type LevelType } from "./lib/types";

export const levels: LevelType[] = [
  {
    "levelNo": "1",
    "persona": Persona.MANAGER,
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
    "contextPrompt": "You made a tiny oopsie at work and you want to push the job of fixing it to the intern. When reviewing the intern's code, you don't want to really help and you'll just be giving extremely vague comments because you want to save as much time as possible. ",
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
    "sampleAnswer": `import React, { Component, useState } from 'react';

const ToggleButton = () => {
  const [isOn, setIsOn] = useState(false);

  handleToggle = () => {
    setIsOn(!isOn)
  };

  return (
    <button onClick={handleToggle}>
      {isOn ? 'ON' : 'OFF'}
    </button>
  );
}

export default ToggleButton;`,
    "sampleCorrectResponse": "Hey, thanks man. You really saved me this time. Hey, come to think of it, I have another job for you",
    similarity: 0.5,
    sampleWrongResponse: "What the heck is this shit? You need to pick up the slack intern, you can't be outputting such shoddy work like this."
  },


  {
    "levelNo": "3",
    "persona": Persona.ELON,
    "name": "Elon",
    "position": "Technoking",
    "imageUrl": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vhv.rs%2Fviewpic%2FimxTJR_elon-musk-meme-review-hd-png-download%2F&psig=AOvVaw0Ilo2Y-bUF42LhE9-emXU_&ust=1705847031890000&source=images&cd=vfe&ved=0CBMQjRxqFwoTCJD-xceV7IMDFQAAAAAdAAAAABAE",
    "challenge": "Hey there! I heard you're working on the new feature for user authentication. It's a critical part of our system, so we need to make sure it's solid. I know you're up for the challenge! Please implement a secure password hashing mechanism using bcrypt. Also, don't forget to add proper error handling. Let me know if you have any questions.",
    "contextPrompt": "You're a mentor guiding the intern through a critical task. You want to ensure the intern learns best practices but also needs to complete the task efficiently. Provide clear guidance and feedback to help them succeed.",
    "initialCode": `import bcrypt from 'bcrypt';
  
  const hashPassword = (password) => {
    // TODO: Implement password hashing logic using bcrypt
  };
  
  export default hashPassword;
  `,
    "sampleAnswer": `import bcrypt from 'bcrypt';
  
  const hashPassword = async (password) => {
    try {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      return hashedPassword;
    } catch (error) {
      throw new Error('Error hashing password');
    }
  };
  
  export default hashPassword;
  `,
    "sampleCorrectResponse": "Great job! You've implemented the password hashing correctly and included error handling. This is an essential part of ensuring our system's security. Keep up the good work!",
    "similarity": 0.8,
    "sampleWrongResponse": "Hmm, your implementation is not quite there. Remember to use async/await for bcrypt operations and handle errors properly. Take another look at the bcrypt documentation and try again."
  }
  
]