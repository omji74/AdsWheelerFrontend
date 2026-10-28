import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import RealFleetShowcase from '../components/RealFleetShowcase';
import InstantQuotation from '../components/InstantQuotation';
import AIAdDesigner from '../components/AIAdDesigner';
import AdvertisingPackages from '../components/AdvertisingPackages';
import CampaignDashboard from '../components/CampaignDashboard';
import GpsPhotoVerification from '../components/GpsPhotoVerification';
import CityWiseTargeting from '../components/CityWiseTargeting';
import StatsSection from '../components/StatsSection';
import CampaignExplorer from '../components/CampaignExplorer';
import EarningsCalculator from '../components/EarningsCalculator';
import { useAuth } from '../context/AuthContext';
import { useCampaign } from '../context/CampaignContext';

export default function HomePage() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const {
    ads,
    loadingAds,
    appliedAdIds,
    applyToCampaign,
    quotePreFill,
    applyCreativeToQuotation,
    selectPackageForQuotation,
    setIsCreateSlideOverOpen,
    openAuthModal,
    showToast
  } = useCampaign();

  return (
    <div className="space-y-12 sm:space-y-16">
      {/* 1. Modern Hero Section */}
      <HeroSection
        onExploreClick={() => navigate('/marketplace')}
        onAdvertiserClick={() => {
          if (!currentUser) {
            navigate('/auth?role=PUBLISHER&mode=signup');
          } else if (currentUser.role === 'PUBLISHER') {
            navigate('/advertiser/dashboard');
          } else {
            showToast('Switch to an Ad Publisher account to launch campaigns.', 'info');
          }
        }}
        onInstantQuoteClick={() => navigate('/instant-quote')}
        onAiDesignerClick={() => navigate('/ai-designer')}
        onFleetShowcaseClick={() => navigate('/fleet')}
      />

      {/* 2. Real Fleet Showcase */}
      <div id="real-fleet">
        <RealFleetShowcase
          onInstantQuote={() => navigate('/instant-quote')}
          onOpenAiDesigner={() => navigate('/ai-designer')}
        />
      </div>

      {/* 3. Advertising Packages & Feature Matrix */}
      <div id="advertising-packages">
        <AdvertisingPackages
          onSelectPackage={(pkgId) => {
            selectPackageForQuotation(pkgId);
            navigate('/instant-quote');
          }}
        />
      </div>

      {/* 4. Instant Quotation Engine Teaser */}
      <div id="instant-quotation">
        <InstantQuotation initialConfig={quotePreFill} />
      </div>

      {/* 5. AI Ad Designer Studio Preview */}
      <div id="ai-ad-designer">
        <AIAdDesigner
          onApplyToQuotation={(cfg) => {
            applyCreativeToQuotation(cfg);
            navigate('/instant-quote');
          }}
        />
      </div>

      {/* 6. Campaign Live Tracking Dashboard */}
      <div id="campaign-dashboard">
        <CampaignDashboard />
      </div>

      {/* 7. GPS Photo Verification Gallery */}
      <div id="gps-verification">
        <GpsPhotoVerification />
      </div>

      {/* 8. City-Wise Targeting */}
      <div id="city-targeting">
        <CityWiseTargeting onTargetCity={() => navigate('/instant-quote')} />
      </div>

      {/* 9. Key Network Statistics */}
      <StatsSection />

      {/* 10. Active Ad Marketplace */}
      <div id="marketplace">
        <CampaignExplorer
          ads={ads}
          onApply={applyToCampaign}
          appliedAdIds={appliedAdIds}
          userRole={currentUser?.role || 'PUBLIC'}
          onOpenCreateAd={() => {
            if (currentUser?.role === 'PUBLISHER') {
              setIsCreateSlideOverOpen(true);
            } else {
              navigate('/auth?role=PUBLISHER&mode=signup');
            }
          }}
          loading={loadingAds}
        />
      </div>

      {/* 11. Driver Guaranteed Earnings Calculator */}
      <EarningsCalculator onApplyClick={() => navigate('/marketplace')} />
    </div>
  );
}
