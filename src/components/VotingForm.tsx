
import React, { useState, useEffect } from "react";
import { CheckCheck } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { ProjectType } from "@/lib/types";
import { useVotingPeriod } from "@/contexts/VotingPeriodContext";
import { useOpinionStorage } from "@/hooks/useOpinionStorage";
import { useVoteTracking } from "@/hooks/useVoteTracking";
import { useFormState } from "@/hooks/useFormState";
import { useFormSubmission } from "@/hooks/useFormSubmission";
import VoteSuccessAnimation from "@/components/VoteSuccessAnimation";
import DemographicsSection from "@/components/form/DemographicsSection";
import CountrySelection from "@/components/form/CountrySelection";
import VoteSubmissionStatus from "@/components/form/VoteSubmissionStatus";
import ProjectTypeFormFields from "@/components/form/ProjectTypeFormFields";
import FormActions from "@/components/form/FormActions";

interface VotingFormProps {
  projectType: ProjectType;
  trackVote: (projectType: ProjectType) => void;
  onSubmit?: (data: any) => Promise<void>;
  isSubmitted?: boolean;
}

const VotingForm = ({ projectType, trackVote, onSubmit, isSubmitted = false }: VotingFormProps) => {
  const { votingPeriod } = useVotingPeriod();
  const { isLoaded } = useOpinionStorage();
  const { hasVotedInCategory, refreshVoteStatus, isLoading: voteTrackingLoading } = useVoteTracking();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  
  // Form state management
  const { formState, setters, resetForm } = useFormState();

  // Wait for both opinion storage and vote tracking to load before checking vote status
  const isComponentLoading = !isLoaded || voteTrackingLoading;
  const hasVoted = isComponentLoading ? false : hasVotedInCategory(projectType);

  console.log(`VotingForm: Project ${projectType} - Loading: ${isComponentLoading}, HasVoted: ${hasVoted}`);
  console.log(`VotingForm: showAnimation state: ${showAnimation}`);

  // Form submission logic
  const formData = {
    ...formState,
    country: formState.country
  };

  const { handleSubmit, isSubmitting } = useFormSubmission(
    projectType,
    formData,
    () => setShowAnimation(true),
    () => {
      setShowAnimation(false);
      setShowSuccess(false);
      resetForm();
    }
  );

  // Refresh vote status when component mounts or project type changes
  useEffect(() => {
    if (!isComponentLoading) {
      console.log('VotingForm: Refreshing vote status for project type:', projectType);
      refreshVoteStatus();
    }
  }, [projectType, isComponentLoading, refreshVoteStatus]);

  // Show loading state while components are initializing
  if (isComponentLoading) {
    return <VoteSubmissionStatus projectType={projectType} isLoading={true} />;
  }

  // Show "Already Submitted" message if user has voted
  if (hasVoted || isSubmitted) {
    return <VoteSubmissionStatus projectType={projectType} />;
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        {showSuccess && (
          <div className="flex items-center rounded-md border border-green-500 bg-green-100 p-4 text-sm text-green-700">
            <CheckCheck className="mr-2 h-4 w-4" />
            Your opinion has been submitted successfully!
          </div>
        )}

        {/* Project-specific form fields */}
        <ProjectTypeFormFields
          projectType={projectType}
          formState={formState}
          setters={setters}
          disabled={hasVoted || !votingPeriod.isActive}
        />

        {/* Country Selection - only for non-Television project types */}
        {projectType !== "Television" && (
          <CountrySelection
            country={formState.country}
            onCountryChange={(country: string) => setters.setCountry(country as import("@/lib/types").Country)}
            disabled={hasVoted || !votingPeriod.isActive}
          />
        )}

        {/* Demographics Information */}
        <DemographicsSection
          demographics={formState.demographics}
          onDemographicsChange={setters.setDemographics}
          disabled={hasVoted || !votingPeriod.isActive}
        />

        <FormActions
          isSubmitting={isSubmitting}
          hasVoted={hasVoted}
        />
      </form>

      {/* Success Animation - Always render when showAnimation is true */}
      {console.log('VotingForm: Rendering AnimatePresence with showAnimation:', showAnimation)}
      <AnimatePresence>
        {showAnimation && (
          <>
            {console.log('VotingForm: Rendering VoteSuccessAnimation')}
            <VoteSuccessAnimation
              projectType={projectType}
              onComplete={() => {
                console.log('VotingForm: Animation completed, hiding animation');
                setShowAnimation(false);
                setShowSuccess(true);
              }}
            />
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default VotingForm;
