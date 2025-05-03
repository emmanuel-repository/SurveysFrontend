export interface Survey {
  id: number;
  name: string;
  description: string;
  date_register: string;
}

export interface SurveyCreateRequest {
  name: string;
  description: string;
  date_register: string
}

interface SurveyResponse {
  ask: string; // texto de la pregunta
  value: string | string[]; // respuesta, puede ser texto o un array (para checkbox)
}
