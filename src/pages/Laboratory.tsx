
import React from "react";
import { toast } from "sonner";
import LabForm from "@/components/laboratory/LabForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TestTubes, FlaskConical, Activity } from "lucide-react";

const Laboratory = () => {
  const [activeTab, setActiveTab] = React.useState("both");

  return (
    <div className="page-container animate-fade-in">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="section-heading flex items-center">
            <TestTubes className="mr-2 h-8 w-8 text-primary" />
            Laboratory Management
          </h1>
          <p className="section-subheading">
            Enter and manage laboratory test results for clinical and research samples.
          </p>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-xl">Laboratory Sections</CardTitle>
            <CardDescription>
              View and enter data for different laboratory departments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="both" onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="both" className="flex items-center">
                  <Activity className="h-4 w-4 mr-2" />
                  Both Labs
                </TabsTrigger>
                <TabsTrigger value="clinical" className="flex items-center text-purple-500">
                  <TestTubes className="h-4 w-4 mr-2" />
                  Clinical
                </TabsTrigger>
                <TabsTrigger value="research" className="flex items-center text-teal-500">
                  <FlaskConical className="h-4 w-4 mr-2" />
                  Research
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="both" className="mt-6 space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <LabForm labType="clinical" />
                  <LabForm labType="research" />
                </div>
              </TabsContent>
              
              <TabsContent value="clinical" className="mt-6">
                <LabForm labType="clinical" />
              </TabsContent>
              
              <TabsContent value="research" className="mt-6">
                <LabForm labType="research" />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Laboratory;
