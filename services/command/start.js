'use strict';

import util from 'util';

const EVENT_NAME = 'review:command:start';

export default function commandService(options, imports) {

  const { action, logger, events } = imports;

  /**
   * Handle '/start' command.
   *
   * @param {Object} payload - github webhook payload.
   * @param {String} command - line with user command.
   *
   * @return {Promise}
   */
  const startCommand = function startCommand(payload, command) {
    const pullRequest = payload.pullRequest;

    logger.info(
      '"/start" [%s – %s] %s',
      pullRequest.number,
      pullRequest.title,
      pullRequest.html_url
    );

    if (pullRequest.state !== 'open') {
      return Promise.reject(new Error(util.format(
        'Cannot start review for closed pull request [%s – %s]',
        pullRequest.id,
        pullRequest.title
      )));
    }

    if (pullRequest.user.login !== payload.comment.user.login) {
      return Promise.reject(new Error(util.format(
        '%s tried to start a review, but author is %s',
        payload.comment.user.login,
        pullRequest.user.login
      )));
    }

    return action
      .saveReview({ status: 'inprogress' }, payload.pullRequest.id)
      .then(pullRequest => {
        events.emit(EVENT_NAME, { pullRequest });

        return pullRequest;
      });
  };

  return startCommand;
}
