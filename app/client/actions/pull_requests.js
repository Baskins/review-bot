import alt from 'app/client/alt';

class PullRequestsActions {
    constructor() {
        this.generateActions('userPullsLoaded', 'pullLoaded', 'userPullsLoadingFailed');
    }

    /**
     * Loads user pull requests by username
     *
     * @param {String} username
     */
    loadUserPulls(username) {
        this.dispatch();

        setTimeout(() => {
            fetch('/api/github/pulls/' + username)
                .then(res => res.json())
                .then(
                    (res) => this.actions.userPullsLoaded(res.data),
                    (err) => {
                        console.error(err);

                        this.actions.userPullsLoadingFailed(err);
                    }
                );
        }, 1000);
    }

    /**
     * Load single pull request by id
     *
     * @param {Number} id
     */
    loadPull(id) {
        this.dispatch();

        fetch('/api/github/pull/' + id)
            .then(res => res.json())
            .then(
                (res) => this.actions.pullLoaded(res.data),
                (err) => {
                    console.error(err);

                    this.actions.failed(err);
                }
            );
    }
}

export default alt.createActions(PullRequestsActions);
