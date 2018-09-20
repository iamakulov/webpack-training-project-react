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
import { fetchFollowers } from '../../api';
import UserList from '../UserList';

class UserFollowers extends React.Component {
  state = {
    userFound: null,
    users: null,
  };

  fetchData() {
    this.setState({
      users: null,
    });

    fetchFollowers(this.props.username).then(response => {
      this.setState({
        userFound: response.status === 200,
        users: response.data.map(user => user.login),
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
    if (!this.state.users) {
      return <div className="user-data__content">Loading...</div>;
    }

    if (!this.state.userFound) {
      return 'No such user!';
    }

    return (
      <>
        <p>Showing at most the first 30 followers</p>
        <UserList users={this.state.users} />
      </>
    );
  }
}

export default UserFollowers;
