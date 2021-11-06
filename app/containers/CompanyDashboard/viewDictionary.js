import React from 'react';
import { Redirect } from 'react-router-dom';

import CompanyDashboardView from 'components/CompanyDashboard';
import CreatePositionView from 'components/CreatePosition';

const viewDictionary = key => {
  switch (key) {
    case 'add':
      return CreatePositionView;
    case 'main':
      return CompanyDashboardView;
    default:
      return () => <Redirect to="/notfound" />;
  }
};

export default viewDictionary;
