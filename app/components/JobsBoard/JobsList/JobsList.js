import React, { Fragment } from 'react';
import T from 'prop-types';

import { ConditionalRender } from 'components/base_ui';
import { generatePostedDate } from 'utils/globalHelpers';

import {
  BottomContentWrapper,
  ContentWrapper,
  HorizontalDivider,
  JobCard,
  JobCompany,
  JobCompanyWrapper,
  JobContent,
  JobLocation,
  JobLogo,
  JobLogoWrapper,
  JobSalary,
  JobsListContainer,
  JobTitle,
  KeywordWrapper,
  MiddleContentWrapper,
  PostedDate,
  TextWrapper,
  TopContentWrapper,
} from './styledComponents';
import { KeywordTag } from '../styledComponents';

const JobsList = ({ handleNav, handleSelectKeyword, jobs }) => {
  const handleKeywordClick = (e, keyword) => {
    e.stopPropagation();
    handleSelectKeyword(keyword);
  };

  return (
    <JobsListContainer>
      {jobs.map(
        (
          {
            companyLogo,
            companyName,
            createdDate,
            id,
            location,
            positionData: { salary, title },
            role,
            skills,
          },
          index,
        ) => {
          const firstLetterOfTitle = title.charAt(0);
          const formattedSkills = skills.map(({ name }) => name);
          const keywordArray = [...role, ...formattedSkills];

          return (
            <Fragment key={`job-${id}`}>
              <JobCard onClick={() => handleNav(`/jobs/${id}`)}>
                <ConditionalRender
                  Component={<JobLogo src={companyLogo} />}
                  FallbackComponent={
                    <JobLogoWrapper>{firstLetterOfTitle}</JobLogoWrapper>
                  }
                  shouldRender={!!companyLogo}
                />
                <JobContent>
                  <ContentWrapper>
                    <TopContentWrapper>
                      <JobTitle>{title}</JobTitle>
                      &nbsp;
                      <JobCompanyWrapper>
                        <TextWrapper>at</TextWrapper>&nbsp;
                        <JobCompany>{companyName}</JobCompany>
                      </JobCompanyWrapper>
                    </TopContentWrapper>
                    <MiddleContentWrapper>
                      <JobSalary>
                        <span aria-label="money-icon" role="img">
                          &#128176;
                        </span>
                        {salary}
                      </JobSalary>
                      <JobLocation>
                        <span aria-label="world-icon" role="img">
                          &#127758;
                        </span>
                        Remote - {location}
                      </JobLocation>
                    </MiddleContentWrapper>
                    <BottomContentWrapper>
                      <KeywordWrapper>
                        {keywordArray.map(keyword => (
                          <KeywordTag
                            key={keyword}
                            onClick={e => handleKeywordClick(e, keyword)}
                          >
                            {keyword}
                          </KeywordTag>
                        ))}
                      </KeywordWrapper>
                    </BottomContentWrapper>
                  </ContentWrapper>
                  <PostedDate>{generatePostedDate(createdDate)}</PostedDate>
                </JobContent>
              </JobCard>
              <HorizontalDivider isLast={jobs.length - 1 === index} />
            </Fragment>
          );
        },
      )}
    </JobsListContainer>
  );
};

JobsList.propTypes = {
  handleNav: T.func.isRequired,
  handleSelectKeyword: T.func.isRequired,
  jobs: T.array.isRequired,
};

export default JobsList;
