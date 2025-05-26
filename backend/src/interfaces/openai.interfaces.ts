export interface ValidAIResponse {
  id: string;
  type: string;
  status: string;
  content: Content[];
  role: string;
}

export interface Content {
  type: string;
  annotations: any[];
  text: string;
}
