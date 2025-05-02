export interface Question {
  id: number;
  ask: string;
  type_ask: string;
  required: number;
  options?: string; // JSON string
  surveys_id: number;
}

export interface QuestionFormRequest {
  ask: string;
  type_ask: string;
  required: number;
  options?: string;
  surveys_id: number;
}

export interface QuestionOption {
  value: string;
  text: string;
}
