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

/**
 *** ABOUT THIS FILE ***
 *
 * This is the user’s page. To see it in action, open /users/index.html.
 *
 * This page has a router that renders specific components based on the URL hash
 * (i.e., /users/index.html#/iamakulov/following).
 * Think of it as of a single-page app with multiple routes (hint-hint!).
 */

import React from 'react';
import { HashRouter as Router, Route, NavLink } from 'react-router-dom';
import UserHeader from '../UserHeader';
import UsernameInput from '../UsernameInput';
import UserFollowers from '../UserFollowers';
import UserFollowing from '../UserFollowing';
import Loadable from 'react-loadable';
import './style.css';

const Username = ({ username }) => (
  <h2 className="user__user-title">User {username}</h2>
);

const Navigation = ({ username }) => (
  <nav>
    <ul className="user__nav-list">
      <li className="user__nav-item">
        <NavLink
          className="user__nav-route"
          activeClassName="user__nav-route_active"
          to={`/${username}`}
          exact
        >
          Profile
        </NavLink>
      </li>
      <li className="user__nav-item">
        <NavLink
          className="user__nav-route"
          activeClassName="user__nav-route_active"
          to={`/${username}/followers`}
        >
          Followers
        </NavLink>
      </li>
      <li className="user__nav-item">
        <NavLink
          className="user__nav-route"
          activeClassName="user__nav-route_active"
          to={`/${username}/following`}
        >
          Following
        </NavLink>
      </li>
    </ul>
  </nav>
);

const LoadableUserProfile = Loadable({
  loader: () => import('../UserProfile'),
  loading: () => 'Loading...',
});

const UsernameRoute = ({ match }) => (
  <>
    <Username username={match.params.username} />
    <Navigation username={match.params.username} />
    <LoadableUserProfile username={match.params.username} />
  </>
);

const UsernameFollowersRoute = ({ match }) => (
  <>
    <Username username={match.params.username} />
    <Navigation username={match.params.username} />
    <UserFollowers username={match.params.username} />
  </>
);

const UsernameFollowingRoute = ({ match }) => (
  <>
    <Username username={match.params.username} />
    <Navigation username={match.params.username} />
    <UserFollowing username={match.params.username} />
  </>
);

const User = () => (
  <Router>
    <div>
      <UserHeader />
      <UsernameInput />
      <Route exact path="/:username" component={UsernameRoute} />
      <Route
        exact
        path="/:username/followers"
        component={UsernameFollowersRoute}
      />
      <Route
        exact
        path="/:username/following"
        component={UsernameFollowingRoute}
      />
    </div>
  </Router>
);

export default User;
