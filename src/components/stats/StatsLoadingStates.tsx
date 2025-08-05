
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

interface LoadingStateProps {
  title: string;
  description: string;
}

export const LoadingState = ({ title, description }: LoadingStateProps) => (
  <div className="space-y-6">
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#5b2333]"></div>
          <span className="ml-2">Please wait...</span>
        </div>
      </CardContent>
    </Card>
  </div>
);

interface EmptyStateProps {
  title: string;
  description: string;
  actionText: string;
  onAction?: () => void;
}

export const EmptyState = ({ title, description, actionText, onAction }: EmptyStateProps) => (
  <div className="space-y-6">
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8 text-muted-foreground">
          <p className="text-lg font-medium mb-2">Start by casting your first opinion!</p>
          <p>Your opinions will be stored and displayed here.</p>
          {onAction && (
            <Button onClick={onAction} className="mt-4">
              <RefreshCw className="w-4 h-4 mr-2" />
              {actionText}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  </div>
);
