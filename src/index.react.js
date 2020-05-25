import 'mobx-react-lite/batchingForReactDom';
import React from 'react';
import ReactDOM from 'react-dom';
import Skipoodle from './react/skipoodle.react';

const search_terms = new URLSearchParams(window.location.search);
const join = search_terms.get('join');

ReactDOM.render(<Skipoodle join={join} />, document.getElementById('root'));
