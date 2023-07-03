import React from 'react';
import './index.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(fas);
export function MainLayout() {
  return (
    <div className="layout">
      <div>
        <FontAwesomeIcon icon="fa-solid fa-house" />
        <h4>ホーム</h4>
      </div>
      <div>
        <FontAwesomeIcon icon="fa-solid fa-database" />
        <h4>履歴</h4>
      </div>
      <div>
        <FontAwesomeIcon icon="fa-solid fa-user" />
        <h4>プロフィール</h4>
      </div>
    </div>
  );
}
