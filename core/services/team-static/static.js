'use strict';

import _ from 'lodash';

export default class StaticTeam {

  /**
   * @constructor
   *
   * @param {Array<Developer>} members - array of team members
   */
  constructor(members) {
    if (!Array.isArray(members)) {
      throw new Error('Members should be an array');
    }
    if (members.length === 0) {
      throw new Error('Passed an empty array of members');
    }

    this.members = members;
  }

  getTeam() {
    const members = _.cloneDeep(this.members);
    return Promise.resolve(members);
  }

  getMember(pullRequest, login) {
    return Promise.resolve(_.find(this.members, { login }));
  }

}
