import { merge, cloneDeep } from 'lodash-es';
import getLinkConfig from './linkConfig';
import getImageConfig from './imageConfig';

export const getEditorConfig = () => {
  return cloneDeep(merge({}, getLinkConfig(), getImageConfig()));
};
