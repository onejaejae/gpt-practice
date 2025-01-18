import { Union } from 'src/common/type/common.interface';

export const GptModel = {
  // O1 models
  O1: 'o1',
  O1_2024_12_17: 'o1-2024-12-17',
  O1_Preview: 'o1-preview',
  O1_Preview_2024_09_12: 'o1-preview-2024-09-12',
  O1_Mini: 'o1-mini',
  O1_Mini_2024_09_12: 'o1-mini-2024-09-12',

  // GPT-4O models
  Gpt4O: 'gpt-4o',
  Gpt4O_2024_11_20: 'gpt-4o-2024-11-20',
  Gpt4O_2024_08_06: 'gpt-4o-2024-08-06',
  Gpt4O_2024_05_13: 'gpt-4o-2024-05-13',
  Gpt4O_Audio_Preview: 'gpt-4o-audio-preview',
  Gpt4O_Audio_Preview_2024_10_01: 'gpt-4o-audio-preview-2024-10-01',
  Gpt4O_Audio_Preview_2024_12_17: 'gpt-4o-audio-preview-2024-12-17',
  Gpt4O_Mini_Audio_Preview: 'gpt-4o-mini-audio-preview',
  Gpt4O_Mini_Audio_Preview_2024_12_17: 'gpt-4o-mini-audio-preview-2024-12-17',
  ChatGpt4O_Latest: 'chatgpt-4o-latest',
  Gpt4O_Mini: 'gpt-4o-mini',
  Gpt4O_Mini_2024_07_18: 'gpt-4o-mini-2024-07-18',

  // GPT-4 models
  Gpt4_Turbo: 'gpt-4-turbo',
  Gpt4_Turbo_2024_04_09: 'gpt-4-turbo-2024-04-09',
  Gpt4_0125_Preview: 'gpt-4-0125-preview',
  Gpt4_Turbo_Preview: 'gpt-4-turbo-preview',
  Gpt4_1106_Preview: 'gpt-4-1106-preview',
  Gpt4_Vision_Preview: 'gpt-4-vision-preview',
  Gpt4: 'gpt-4',
  Gpt4_0314: 'gpt-4-0314',
  Gpt4_0613: 'gpt-4-0613',
  Gpt4_32k: 'gpt-4-32k',
  Gpt4_32k_0314: 'gpt-4-32k-0314',
  Gpt4_32k_0613: 'gpt-4-32k-0613',

  // GPT-3.5 models
  Gpt35_Turbo: 'gpt-3.5-turbo',
  Gpt35_Turbo_16k: 'gpt-3.5-turbo-16k',
  Gpt35_Turbo_0301: 'gpt-3.5-turbo-0301',
  Gpt35_Turbo_0613: 'gpt-3.5-turbo-0613',
  Gpt35_Turbo_1106: 'gpt-3.5-turbo-1106',
  Gpt35_Turbo_0125: 'gpt-3.5-turbo-0125',
  Gpt35_Turbo_16k_0613: 'gpt-3.5-turbo-16k-0613',
} as const;
export type GptModel = Union<typeof GptModel>;
