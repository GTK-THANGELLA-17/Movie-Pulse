
import { CheckCheck } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ProjectType } from "@/lib/types";

interface VoteSubmissionStatusProps {
  projectType: ProjectType;
  isLoading?: boolean;
}

const VoteSubmissionStatus = ({ projectType, isLoading = false }: VoteSubmissionStatusProps) => {
  const getProjectTypeName = (type: ProjectType) => {
    switch (type) {
      case "Films": return "Films";
      case "YouTubeFilm": return "YouTube Film";
      case "YouTubeContent": return "YouTube Content";
      case "InstagramContent": return "Instagram Content";
      case "OTTPlatform": return "OTT Platform";
      case "Television": return "Television";
      default: return type;
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Loading...</CardTitle>
          <CardDescription>
            Preparing voting form for {getProjectTypeName(projectType)}.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-muted-foreground">Please wait...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCheck className="h-5 w-5 text-green-600" />
          Opinion Already Submitted
        </CardTitle>
        <CardDescription>
          You have already submitted your opinion for {getProjectTypeName(projectType)}.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8">
          <div className="flex items-center justify-center mb-4">
            <CheckCheck className="h-12 w-12 text-green-600" />
          </div>
          <p className="text-lg font-medium text-green-700">Thank you for your valuable input!</p>
          <p className="text-sm text-muted-foreground mt-2">
            Your opinion has been recorded and will be reflected in the statistics.
            You can submit another opinion in the next period.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default VoteSubmissionStatus;
