import _ from 'lodash';

import logger from 'app/core/logger';
import review from 'app/core/review/review';
import saveReview from 'app/core/review/actions/save';

import github from 'app/core/github/api';

export default function reviewAutoAssignCreator() {
    /**
     * Plugin for auto assign reviewers for pull request.
     *
     * @param {PullRequest} pullRequest
     */
    return function reviewAutoStart({ pullRequest }) {
        logger.info(`Autostart review for pull "${pullRequest.id} — ${pullRequest.title}"`);

        if (!_.isEmpty(pullRequest.review.reviewrs)) return;

        review(pullRequest.id)
            .then(resultReview => saveReview({ reviewers: resultReview.team}, pullRequest.id))
            .then((pullRequest) => {
                console.log(pullRequest.review.reviewers);

                github.setBodyContent(
                    pullRequest.id,
                    'review:reviewers_badge',
                    'reviewers_badge_test: ' + pullRequest.review.reviewers.map(item => item.login).join(', ')
                );
            }, ::logger.error);
    };
}
