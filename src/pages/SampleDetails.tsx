
import React from "react";
import { useParams, Link } from "react-router-dom";
import { sampleData } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Beaker, Calendar, FileText, User } from "lucide-react";
import AnimatedContainer from "@/components/ui/AnimatedContainer";

const SampleDetails = () => {
  const { id } = useParams<{ id: string }>();
  const sample = sampleData.find(s => s.id === id);

  if (!sample) {
    return (
      <div className="page-container">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Sample Not Found</CardTitle>
            <CardDescription>
              The sample you are looking for doesn't exist or has been removed.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button asChild>
              <Link to="/samples">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Samples
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
      case "in-progress":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case "completed":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "failed":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  return (
    <div className="page-container">
      <div className="mb-6">
        <Button variant="outline" asChild>
          <Link to="/samples">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Samples
          </Link>
        </Button>
      </div>

      <AnimatedContainer animation="fade">
        <Card className="glass glass-hover">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{sample.name}</span>
              <Badge 
                variant="outline" 
                className={getStatusColor(sample.status)}
              >
                {sample.status.replace('-', ' ')}
              </Badge>
            </CardTitle>
            <CardDescription>Sample ID: {sample.id}</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Sample Details</h3>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Beaker className="h-4 w-4 mr-2 text-primary" />
                    <span className="text-sm font-medium">Type:</span>
                    <span className="ml-2 capitalize">{sample.type}</span>
                  </li>
                  <li className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-primary" />
                    <span className="text-sm font-medium">Date:</span>
                    <span className="ml-2">{sample.date}</span>
                  </li>
                  <li className="flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-primary" />
                    <span className="text-sm font-medium">Batch:</span>
                    <span className="ml-2">{sample.batchNumber}</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Collection Information</h3>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <User className="h-4 w-4 mr-2 text-primary" />
                    <span className="text-sm font-medium">Collected By:</span>
                    <span className="ml-2">{sample.collectedBy}</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </AnimatedContainer>
    </div>
  );
};

export default SampleDetails;
