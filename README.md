# LBTM: Looks Bad To Me - Hackathon Project Devpost

## Inspiration

In a world where securing summer internships has become increasingly challenging,
we recognized the need for a platform that could simulate the experience of a virtual workplace.

"Looks Bad To Me" (LBTM) was born out of the desire to prepare aspiring developers for the unpredictable nature of code reviews and feedback in a fun and engaging manner.
Drawing inspiration from real-life experiences, we aimed to create a game that not only hones technical skills but also toughens individuals for the sometimes harsh realities of the professional world.

## What it does

LBTM is a game designed to simulate a virtual workplace environment where participants submit their code for review.

## How we built it

LBTM was crafted using the [T3 Stack](https://create.t3.gg/), a
popular tech stack for modern web development.

## Challenges we ran into

Building LBTM presented several challenges, including:

1. **Setting up API endpoints:** using tRPC + react-query is a pain.
   We should have just stuck with regular Next.js API routes 😭.

2. **Prompting:** Generating the right feedback / code review comments for each submission required a lot of trial and error,
   tweaking prompts along the way.

3. **Correctness:** Detecting when the code submitted by the user
   is "correct" is a non-trivial task, and we had to make several
   design decisions to ensure that the game was fair.

## Accomplishments that we're proud of

## What we learned

## What's next for LBTM: Looks Bad To Me

- **GitHub Actions:** We want to integrate GitHub Actions to automate the process of generating code review comments.
- **VS Code Extension:** We want to build a VS Code "Clippy" like extension that can provide feedback in real-time as the user is coding.
