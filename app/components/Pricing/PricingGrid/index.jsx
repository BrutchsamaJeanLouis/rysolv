import React from 'react';
import T from 'prop-types';

import iconDictionary from 'utils/iconDictionary';

import {
  BulletTextWrapper,
  PricingCard,
  IconWrapper,
  PricingBody,
  PricingGridContainer,
  PricingHeader,
  PricingSubTitle,
  PricingTitle,
  StyledBullets,
  StyledCost,
  StyledCostWrapper,
  StyledInterval,
  StyledPrimaryButton,
} from './styledComponents';

const CheckIcon = iconDictionary('check');

const PricingGrid = ({
  buttonText,
  currentPlan,
  focus,
  handleSelectPlan,
  isSettingRoute,
}) => (
  <PricingGridContainer isSettingRoute={isSettingRoute}>
    {/* STARTUP */}
    <PricingCard isSettingRoute={isSettingRoute}>
      <PricingHeader>
        <PricingTitle>Startup</PricingTitle>
        <PricingSubTitle>Building a team</PricingSubTitle>
      </PricingHeader>
      <PricingBody>
        <div>
          <StyledBullets>
            <IconWrapper isSettingRoute={isSettingRoute}>
              {CheckIcon}
            </IconWrapper>
            <BulletTextWrapper>Create positions for free</BulletTextWrapper>
          </StyledBullets>
          <StyledBullets>
            <IconWrapper isSettingRoute={isSettingRoute}>
              {CheckIcon}
            </IconWrapper>
            <BulletTextWrapper>Get matched with candidates</BulletTextWrapper>
          </StyledBullets>
          <StyledBullets>
            <IconWrapper isSettingRoute={isSettingRoute}>
              {CheckIcon}
            </IconWrapper>
            <BulletTextWrapper>Only pay after hiring</BulletTextWrapper>
          </StyledBullets>
        </div>
        <div>
          <StyledCostWrapper>
            <StyledCost isSettingRoute={isSettingRoute}>10%</StyledCost>
            <StyledInterval>of starting salary</StyledInterval>
          </StyledCostWrapper>
          <StyledPrimaryButton
            disabled={currentPlan === 'startup'}
            isSettingRoute={isSettingRoute}
            label={currentPlan === 'startup' ? 'Current' : buttonText}
            onClick={() => handleSelectPlan({ plan: 'startup' })}
          />
        </div>
      </PricingBody>
    </PricingCard>

    {/* STANDARD */}
    <PricingCard focus={focus} isSettingRoute={isSettingRoute}>
      <PricingHeader focus={focus}>
        <PricingTitle>Standard</PricingTitle>
        <PricingSubTitle>Growing companies</PricingSubTitle>
      </PricingHeader>
      <PricingBody>
        <div>
          <StyledBullets>
            <IconWrapper isSettingRoute={isSettingRoute}>
              {CheckIcon}
            </IconWrapper>
            <BulletTextWrapper>0% placement fee</BulletTextWrapper>
          </StyledBullets>
          <StyledBullets>
            <IconWrapper isSettingRoute={isSettingRoute}>
              {CheckIcon}
            </IconWrapper>
            <BulletTextWrapper>Full candidate profiles</BulletTextWrapper>
          </StyledBullets>
          <StyledBullets>
            <IconWrapper isSettingRoute={isSettingRoute}>
              {CheckIcon}
            </IconWrapper>
            <BulletTextWrapper>
              Match with new candidates first
            </BulletTextWrapper>
          </StyledBullets>
          <StyledBullets>
            <IconWrapper isSettingRoute={isSettingRoute}>
              {CheckIcon}
            </IconWrapper>
            <BulletTextWrapper>Up to 25 hires per year</BulletTextWrapper>
          </StyledBullets>
        </div>
        <div>
          <StyledCostWrapper>
            <StyledCost isSettingRoute={isSettingRoute}>$2,495</StyledCost>
            <StyledInterval>/ month</StyledInterval>
          </StyledCostWrapper>
          <StyledPrimaryButton
            disabled={currentPlan === 'standard'}
            isSettingRoute={isSettingRoute}
            label={currentPlan === 'standard' ? 'Current' : buttonText}
            onClick={() => handleSelectPlan({ plan: 'standard' })}
          />
        </div>
      </PricingBody>
    </PricingCard>

    {/* ENTERPRISE */}
    <PricingCard isLast isSettingRoute={isSettingRoute}>
      <PricingHeader>
        <PricingTitle>Enterprise</PricingTitle>
        <PricingSubTitle>Unlimited hires</PricingSubTitle>
      </PricingHeader>
      <PricingBody>
        <div>
          <StyledBullets>
            <IconWrapper isSettingRoute={isSettingRoute}>
              {CheckIcon}
            </IconWrapper>
            <BulletTextWrapper>0% placement fee</BulletTextWrapper>
          </StyledBullets>
          <StyledBullets>
            <IconWrapper isSettingRoute={isSettingRoute}>
              {CheckIcon}
            </IconWrapper>
            <BulletTextWrapper>Access to vetted candidates</BulletTextWrapper>
          </StyledBullets>
          <StyledBullets>
            <IconWrapper isSettingRoute={isSettingRoute}>
              {CheckIcon}
            </IconWrapper>
            <BulletTextWrapper>Priority support</BulletTextWrapper>
          </StyledBullets>
          <StyledBullets>
            <IconWrapper isSettingRoute={isSettingRoute}>
              {CheckIcon}
            </IconWrapper>
            <BulletTextWrapper>Tailored candidate interviews</BulletTextWrapper>
          </StyledBullets>
        </div>
        <div>
          <StyledCostWrapper>
            <StyledCost isSettingRoute={isSettingRoute}>$4,950</StyledCost>
            <StyledInterval>/ month</StyledInterval>
          </StyledCostWrapper>
          <StyledPrimaryButton
            disabled={currentPlan === 'enterprise'}
            isSettingRoute={isSettingRoute}
            label={currentPlan === 'enterprise' ? 'Current' : buttonText}
            onClick={() => handleSelectPlan({ plan: 'enterprise' })}
          />
        </div>
      </PricingBody>
    </PricingCard>
  </PricingGridContainer>
);

PricingGrid.defaultProps = { currentPlan: '', isSettingRoute: false };

PricingGrid.propTypes = {
  buttonText: T.string.isRequired,
  currentPlan: T.string,
  focus: T.bool,
  handleSelectPlan: T.func.isRequired,
  isSettingRoute: T.bool,
};

export default PricingGrid;
