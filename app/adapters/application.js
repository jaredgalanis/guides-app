import JSONAPIAdapter from 'ember-data/adapters/json-api';

export default JSONAPIAdapter.extend({
  buildURL(modelName, id, snapshot, requestType, query) {
    let url;

    if (requestType === 'queryRecord') {
      url = [modelName, query.version, `${query.path}.json`];
    } else if(requestType === 'query' && modelName === 'page') {
      url = ['content', query.version, 'pages.json'];
    } else {
      return this._super(...arguments);
    }

    let host = this.host;
    let prefix = this.urlPrefix();

    if (prefix) { url.unshift(prefix); }

    url = url.join('/');
    if (!host && url && url.charAt(0) !== '/') {
      url = '/' + url;
    }

    return url;
  },
});
