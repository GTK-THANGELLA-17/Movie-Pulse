
import React from "react";
import { Button } from "@/components/ui/button";
import { useVotingPeriod } from "@/contexts/VotingPeriodContext";

interface FormActionsProps {
  isSubmitting: boolean;
  hasVoted: boolean;
}

const FormActions = ({ isSubmitting, hasVoted }: FormActionsProps) => {
  const { votingPeriod } = useVotingPeriod();
  
  return (
    <Button type="submit" disabled={isSubmitting || hasVoted || !votingPeriod.isActive}>
      {isSubmitting ? "Submitting..." : hasVoted ? "Already Submitted" : "Submit Opinion"}
    </Button>
  );
};

export default FormActions;
