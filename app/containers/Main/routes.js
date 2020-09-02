import React from 'react';
import { Switch, Route } from 'react-router-dom';
import withAuth from 'containers/Auth';

import Contact from 'components/Contact';
import Faq from 'components/Faq';
import NotFoundPage from 'components/NotFoundPage';
import IssuesAdd from 'containers/Issues/Add';
import IssuesDetail from 'containers/Issues/Detail';
import Main from 'containers/HomePage/Loadable';
import OrganizationsAdd from 'containers/Organizations/Add';
import OrganizationsDetail from 'containers/Organizations/Detail';
import Overview from 'containers/Overview';
import Settings from 'containers/Settings';
import SignIn from 'containers/Signin';
import UsersAdd from 'containers/Users/Add';
import UsersDetail from 'containers/Users/Detail';

const privateConfig = { isAdmin: false, isPrivate: true };
const publicConfig = { isAdmin: false, isPrivate: false };

const PrivateIssuesAdd = withAuth(privateConfig, IssuesAdd);
const PrivateOrganizationsAdd = withAuth(privateConfig, OrganizationsAdd);
const PrivateSettings = withAuth(privateConfig, Settings);
const PrivateUsersAdd = withAuth(privateConfig, UsersAdd);
const PublicContact = withAuth(publicConfig, Contact);
const PublicFaq = withAuth(publicConfig, Faq);
const PublicIssuesDetail = withAuth(publicConfig, IssuesDetail);
const PublicMain = withAuth(publicConfig, Main);
const PublicNotFoundPage = withAuth(publicConfig, NotFoundPage);
const PublicOrganizationsDetail = withAuth(publicConfig, OrganizationsDetail);
const PublicOverview = withAuth(publicConfig, Overview);
const PublicSignIn = withAuth(publicConfig, SignIn);
const PublicUsersDetail = withAuth(publicConfig, UsersDetail);

// prettier-ignore
const Routes = () => (
  <Switch>
    <Route exact path="/" component={PublicMain} />
    <Route exact path="/contact-us" component={PublicContact} />
    <Route exact path="/faq" component={PublicFaq} />
    <Route exact path="/issues" component={PublicOverview} />
    <Route exact path="/issues/add" component={PrivateIssuesAdd} />
    <Route exact path="/issues/detail/:id" component={PublicIssuesDetail} />
    <Route exact path="/issues/search/:searchValue" component={PublicOverview} />
    <Route exact path="/organizations" component={PublicOverview} />
    <Route exact path="/organizations/add" component={PrivateOrganizationsAdd} />
    <Route exact path="/organizations/detail/:id" component={PublicOrganizationsDetail} />
    <Route exact path="/organizations/search/:searchValue" component={PublicOverview} />
    <Route exact path="/settings/:view?" component={PrivateSettings} />
    <Route exact path="/signin" component={PublicSignIn} />
    <Route exact path="/signup" component={PublicSignIn} />
    <Route exact path="/users" component={PublicOverview} />
    <Route exact path="/users/add" component={PrivateUsersAdd} />
    <Route exact path="/users/detail/:id" component={PublicUsersDetail} />
    <Route exact path="/users/search/:searchValue" component={PublicOverview} />
    <Route component={PublicNotFoundPage} />
  </Switch>
);

export default Routes;
