import { Persona, type LevelType } from "./lib/types";

export const levels: LevelType[] = [
  {
    "levelNo": "1",
    "persona": Persona.MANAGER,
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
    "sampleResponse": `God damnit, what is this shit? Don't you know you're not supposed to put single letters for component names? God, you're useless. Looks like you're overtiming.`,
    similarity: 0.9
  },
  {
    "levelNo": "2",
    "persona": Persona.MANAGER,
    "name": "David",
    "position": "Senior SWE",
    "imageUrl": "https://avatars.githubusercontent.com/u/1?v=5",
    "challenge": "Morning intern. We've got a challenge for you, are you up for it? Your first task is to refactor Twitter to X. Not easy, but I'm sure you can handle it. Get it done before lunchtime",
    "contextPrompt": "It's the new intern's first day here. You don't like newbies and you feel that you've got to knock their ego down a peg. Be as harsh as possible, picking on the tiniest of issues, and even requesting changes for code that work",
    "initialCode": `import React, { useState, useEffect } from 'react';

interface Tweet {
  id: number;
  content: string;
  author: string;
}

const TweetList = () => {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.example.com/tweets')
      .then(response => response.json())
      .then(data => {
        setTweets(data);
        setLoading(false);
      });
  }, []);

  const renderTweets = () => {
    if (loading) {
      return <p>Loading tweets...</p>;
    }

    if (tweets.length === 0) {
      return <p>No tweets available.</p>;
    }

    return tweets.map(tweet => (
      <div key={tweet.id} className="tweet">
        <p className="tweet-content">{tweet.content}</p>
        <p className="tweet-author">By: {tweet.author}</p>
      </div>
    ));
  };

  return (
    <div className="tweet-list">
      <h2>Latest Tweets</h2>
      {renderTweets()}
    </div>
  );
};

export default TweetList;`,
    "sampleAnswer": `import React, { useState, useEffect } from 'react';`,
    "sampleResponse": "Jesus christ",
    similarity: 0.5,
  }
]