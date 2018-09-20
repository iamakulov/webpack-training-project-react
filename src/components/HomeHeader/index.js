/**
 * Copyright 2018 Google Inc, 2018 Ivan Akulov. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import moment from 'moment/moment';
import React from 'react';

class HomeHeader extends React.Component {
  state = {
    timeToRelease: '∞',
  };

  updateReleaseTime() {
    const release = moment([2020, 3, 1]);
    const time = release.diff(moment(), 'seconds', true);

    this.setState({
      timeToRelease: time.toFixed(3),
    });

    requestAnimationFrame(() => this.updateReleaseTime());
  }

  componentDidMount() {
    this.updateReleaseTime();
  }

  render() {
    return (
      <p>
        LitHub is opening in{' '}
        <span className="home-header__time">{this.state.timeToRelease}</span>{' '}
        seconds!
      </p>
    );
  }
}

export default HomeHeader;
