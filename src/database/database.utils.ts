import { typeidUnboxed } from 'typeid-js';

export enum Models {
  USER = 'user',
  PIN = 'pin',
  MUST_KNOW = 'mk',
  TAG = 'tag',
  VISIT = 'visit',
  TAG_PIN = 'tp',
  TAG_TRANSLATION = 'tt',
  FEED_POST = 'fp',

  // MEDIA = 'media',
  // COMMENT = 'comment',
  // LIKE = 'like',
  // RATING = 'rating',
  // USER_PREFERENCE = 'usp',
  // USER_SETTING = 'uss',
  // CLIENT = 'client',
  // CLIENT_USER = 'csu',
}

export const validateModel = (modelString: string): boolean => {
  const upperModelString = modelString.toLowerCase();
  const modelValues = Object.values(Models);
  return modelValues.some((model: string) => model === upperModelString);
};

export const generateId = (model: Models): string => {
  return typeidUnboxed(model) as string;
};

export const addIdToObject = ({
  type,
  obj,
}: {
  type: Models;
  obj: any;
}): any => {
  return { id: generateId(type), ...obj };
};

export const getModelFromId = (id: string): Models => {
  // Try all possible prefixes and take the longest valid one
  const parts = id.split('_');
  let prefix = '';
  let validModel: Models | null = null;

  for (let i = 0; i < parts.length - 1; i++) {
    prefix = i === 0 ? parts[i] : `${prefix}_${parts[i]}`;
    if (validateModel(prefix)) {
      validModel = prefix as Models;
    }
  }

  if (!validModel) {
    throw new Error(`Invalid model prefix in ID: ${id}`);
  }

  return validModel;
};
