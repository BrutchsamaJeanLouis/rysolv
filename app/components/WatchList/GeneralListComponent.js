import React from 'react';
import T from 'prop-types';

import { ProfileImage } from 'components/base_ui';

import {
  ListContainer,
  ListDetail,
  ListItemWrapper,
  Username,
} from './styledComponents';

const GeneralListComponent = ({ handleRedirect, route, tableData }) => (
  <ListContainer>
    {tableData.map(({ id, username, profilePic }) => (
      <ListItemWrapper key={`list-item-${id}`}>
        <ListDetail>
          <ProfileImage
            alt={username}
            detailRoute={`${route}/${id}`}
            handleNav={handleRedirect}
            profilePic={profilePic}
            size="3.5rem"
          />
          <Username
            href={`${route}/${id}`}
            onClick={() => handleRedirect(`${route}/${id}`)}
          >
            {username}
          </Username>
        </ListDetail>
      </ListItemWrapper>
    ))}
  </ListContainer>
);

GeneralListComponent.propTypes = {
  handleRedirect: T.func.isRequired,
  route: T.string.isRequired,
  tableData: T.array.isRequired,
};

export default GeneralListComponent;
