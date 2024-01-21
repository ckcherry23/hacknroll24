# LBTM: Looks Bad To Me - Hackathon Project Devpost

## Inspiration

In a world where securing summer internships / SWE jobs has become increasingly challenging,
we recognised the need for a platform that could simulate the experience of a virtual workplace.

"Looks Bad To Me" (LBTM) was born out of the desire to prepare aspiring developers for the unpredictable nature of code reviews and feedback in a fun and engaging manner.
Drawing inspiration from real-life experiences, we aimed to create a game that not only hones technical skills but also toughens individuals for the sometimes harsh realities of the professional world.

### The Real Reason

We wanted to build something to insult programmers in a harsh way similar to
that of a toxic workplace environment :D.

## What it does

LBTM is a game designed to simulate a virtual workplace environment where participants submit their code for review.

## How we built it

LBTM was crafted using the [T3 Stack](https://create.t3.gg/), a
popular tech stack for modern web development.

We also made use of TTS, OpenAI and Similarity Algorithms,
integrated code sandboxes and animation libraries our website.

## Challenges we ran into

Building LBTM presented several challenges, including:

### Mode of Delivery

We came up with multiple ideas for how to deliver the game to the user, including a VS Code extension, a web app, and a GitHub Actions bot.
We eventually settled on a web app, but we still plan to build a VS Code extension in the future.

### Prompting

Generating the right feedback / code review comments for each submission required a lot of trial and error,
tweaking prompts along the way.

### Correctness

Detecting when the code submitted by the user
is "correct" is a non-trivial task, and we had to make several
design decisions to ensure that the game is fair.

## Accomplishments that we're proud of

### Storyline

We're proud of the storyline we created for the game,
and we think it adds a lot of character to the game.

### Design

The design of the game is something that we're proud of given the time
constraints of the hackathon, and our lack of experience of developing games.

## What we learned

**HOW NOT TO CODE REVIEW:**

In the process of developing, we broke every rule for collaborating on code.

- No PR reviews.
- Actually, no PRs - we pushed to `main` directly.

## What's next for LBTM: Looks Bad To Me

- **Voice Interaction**: We want to allow the user to respond to the code review
  comments using voice, to simulate a real-life interaction (something few of us have had).
- **More Levels:** We want to add better levels to the game.

We also wanted to explore some of the ideas we abandoned at the beginning
of the hackathon:

- **VS Code Extension:** We want to build a VS Code "Clippy" like extension that can provide feedback in real-time as the user is coding.
- **GitHub Actions:** We want to integrate GitHub Actions to automate the process of generating code review comments.
