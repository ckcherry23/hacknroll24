export type ProfileType = {
  name: string;
  image: string;
  position: string;
}

export type LevelType = {
  levelNo: string;
  persona: Persona;
  name: string;
  position: string;
  imageUrl: string;
  challenge: string;
  contextPrompt: string;
  initialCode: string;
  sampleAnswer: string;
  sampleCorrectResponse: string;
  sampleWrongResponse: string;
  correctness?: number;
  promotion?: string;
}

export enum Persona {
  MANAGER = "Manager",
  COLLEAGUE = "Colleague",
  ELON = "Elon Musk",
}