export interface Survey {
  id: number;
  name: string;
  description: string;
  date_register: string;
}

export interface SurveyCreateRequest {
  name: string;
  description: string;
}

export interface SurveyUpdateRequest {
  name: string;
  description: string;
}
