export interface Answered {
  id?: number;
  date_start: string;
  date_end: string;
  data_surveys?: any;
  user_id: number;
  survey_id: number;

}

export interface AnsweredSurvey {
data_surveys: any;
  id: number;
  date_start: string;
  date_end: string;
  survey: {
    id: number;
    name: string;
    description: string;
  };
}
