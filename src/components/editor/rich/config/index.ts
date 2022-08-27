import { merge, cloneDeep } from 'lodash-es';
import getLinkConfig from './linkConfig';
import getImageConfig from './imageConfig';
import getMenuConfig from './menuConfig';

export const getEditorConfig = () => {
  return cloneDeep(merge({}, getLinkConfig(), getImageConfig()));
};

export const geToolbarConfig = () => {
  return cloneDeep(merge({}, getMenuConfig()));
};
