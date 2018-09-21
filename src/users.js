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
 * This is the app entry point. It detects the current page
 * and renders the corresponding component.
 */

import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

import User from './components/User';
import initDevelopmentHelpers from './initDevelopmentHelpers';

if ('serviceWorker' in navigator) {
  // Use the window load event to keep the page load performant
  window.addEventListener('load', () => {
    console.log('Register service worker');
    navigator.serviceWorker.register('/build/service-worker.js');
  });
}

// This sets up things that help you during development.
// Feel free to not think about this call.
initDevelopmentHelpers();

ReactDOM.render(<User />, document.querySelector('#root'));