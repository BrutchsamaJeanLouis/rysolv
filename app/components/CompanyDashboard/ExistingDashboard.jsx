/* eslint-disable react/no-array-index-key */
import React from 'react';
import T from 'prop-types';

import { ConditionalRender } from 'components/base_ui';
import iconDictionary from 'utils/iconDictionary';

import CandidateCard from './CandidateCard';
import CandidatesLoading from './CandidatesLoading';
import CompanyDashboardTabs from './CompanyDashboardTabs';
import EmptyCandidateDashboard from './EmptyCandidateDashboard';
import {
  CandidateCardGroup,
  CompanyDashboardContainer,
  CompanyDashboardTitle,
  StyledIconButton,
} from './styledComponents';

const EditIcon = iconDictionary('edit');

const ExistingDashboard = ({
  data,
  dispatchChangeFilter,
  dispatchOpenModal,
  dispatchSaveCandidate,
  filter,
  handleNav,
  matchCandidatesLoading,
  positionTitle,
  selectedPosition,
}) => {
  const CandidateCards = (
    <ConditionalRender
      Component={
        <CandidateCardGroup>
          {data.map((candidate, index) => (
            <CandidateCard
              dispatchOpenModal={dispatchOpenModal}
              dispatchSaveCandidate={dispatchSaveCandidate}
              handleNav={handleNav}
              index={index}
              isLast={data.length - 1 === index}
              key={`candidate-${index}`}
              selectedPosition={selectedPosition}
              {...candidate}
            />
          ))}
        </CandidateCardGroup>
      }
      FallbackComponent={EmptyCandidateDashboard}
      shouldRender={!!data.length}
    />
  );
  return (
    <CompanyDashboardContainer>
      <CompanyDashboardTitle>
        {positionTitle}
        <StyledIconButton
          disableRipple
          onClick={() =>
            handleNav(`/company/dashboard/edit-position?id=${selectedPosition}`)
          }
        >
          {EditIcon}
        </StyledIconButton>
      </CompanyDashboardTitle>
      <CompanyDashboardTabs
        dispatchChangeFilter={dispatchChangeFilter}
        filter={filter}
      />
      <ConditionalRender
        Component={CandidateCards}
        FallbackComponent={CandidatesLoading}
        shouldRender={!!matchCandidatesLoading}
      />
    </CompanyDashboardContainer>
  );
};

ExistingDashboard.propTypes = {
  data: T.array.isRequired,
  dispatchChangeFilter: T.func.isRequired,
  dispatchOpenModal: T.func.isRequired,
  dispatchSaveCandidate: T.func.isRequired,
  filter: T.object.isRequired,
  handleNav: T.func.isRequired,
  matchCandidatesLoading: T.bool.isRequired,
  positionTitle: T.string.isRequired,
  selectedPosition: T.string.isRequired,
};

export default ExistingDashboard;
