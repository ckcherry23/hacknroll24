export type ProfileType = {
  name: string;
  image: string;
  position: string;
}

export type LevelType = {
  levelNo: string;
  persona: string;
  name: string;
  position: string;
  imageUrl: string;
  challenge: string;
  contextPrompt: string;
  initialCode: string;
  sampleAnswer: string;
  sampleResponse: string;
  similarity?: number;
}