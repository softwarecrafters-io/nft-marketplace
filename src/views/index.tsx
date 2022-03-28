import * as React from 'react';
import * as ReactDOM from 'react-dom';

import './index.scss';
import { Router } from './Router';

export function render() {
	ReactDOM.render(<Router />, document.getElementById('root'));
}
