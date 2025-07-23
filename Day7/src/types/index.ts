export type Language = 'python' | 'javascript' | 'cpp' | 'java' | 'html' | 'css';

export interface CodeExecutionRequest {
  language: Language;
  code: string;
}

export interface CodeExecutionResponse {
  output: string;
  error?: string;
}
