import { get } from 'lodash-es';
import { environment } from '../environments/environment';

export const url = `${environment.urls.masar}v1`;
export const API_URLS = {
  terminals: {
    getPaginated: url + '/pos/getPaginated',
    getAll: url + '/pos/getAll',
    add: url + '/pos/saveNew',
    getById: url + '/pos/getById/{id}',
    edit: url + '/pos/update/{id}',
    delete: url + '/pos/{id}',
    existBy: url + '/pos/exists-by/{field}/{value}',
    export: url + '/pos/export',
  },
};
