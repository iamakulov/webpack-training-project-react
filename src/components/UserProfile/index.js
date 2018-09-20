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

import React from 'react';
import { fetchUser } from '../../api';

class UserProfile extends React.Component {
  state = {
    userFound: null,
    user: null,
  };

  fetchData() {
    this.setState({
      user: null,
    });

    fetchUser(this.props.username).then(response => {
      this.setState({
        userFound: response.status === 200,
        user: response.data || {},
      });
    });
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.username !== prevProps.username) {
      this.fetchData();
    }
  }

  render() {
    const { username } = this.props;

    if (!this.state.user) {
      return <div className="user-data__content">Loading...</div>;
    }

    if (!this.state.userFound) {
      return 'No such user!';
    }

    const user = this.state.user;

    return (
      <>
        <ul>
          {user.name && <li>Name: {user.name}</li>}
          <li>ID: {user.id}</li>
          {user.bio && <li>Bio: {user.bio}</li>}
          {user.location && <li>Location: {user.location}</li>}
          {user.email && (
            <li>
              Email: <a href={`mailto:${user.email}`}>{user.email}</a>
            </li>
          )}
          {user.blog && (
            <li>
              Blog: <a href={user.blog}>{user.blog}</a>
            </li>
          )}
          <li>
            Full profile:{' '}
            <a href={`https://github.com/${username}`}>
              https://github.com/
              {username}
            </a>
          </li>
        </ul>
      </>
    );
  }
}

export default UserProfile;
