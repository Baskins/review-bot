import Jabber from './jabber';

export default function setup(options, imports) {

  const logger = imports.logger;
  options.info = function (message) {
    logger.info('Jabber: ' + message);
  };

  const service = new Jabber(options);

  service.shutdown = function () {
    return new Promise(resolve => {
      service.close();
      resolve();
    });
  };

  // Ignore promise and don't wait until client goes online.
  service.connect();

  return service;
}
