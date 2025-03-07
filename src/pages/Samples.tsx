
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SampleTable from "@/components/samples/SampleTable";
import SampleForm from "@/components/samples/SampleForm";
import { sampleData } from "@/lib/data";
import { Plus } from "lucide-react";
import AnimatedContainer from "@/components/ui/AnimatedContainer";
import { useToast } from "@/components/ui/use-toast";

const Samples = () => {
  const [activeTab, setActiveTab] = useState("all");
  const { toast } = useToast();

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (value === "add-new") {
      toast({
        title: "Add New Sample",
        description: "Fill in the form to add a new sample",
      });
    }
  };

  return (
    <div className="page-container">
      <div className="flex flex-col gap-2 mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Samples</h1>
          <Button onClick={() => handleTabChange("add-new")}>
            <Plus className="mr-2 h-4 w-4" /> Add New Sample
          </Button>
        </div>
        <p className="text-muted-foreground">
          Manage and track all laboratory samples
        </p>
      </div>

      <AnimatedContainer animation="fade">
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid grid-cols-2 sm:grid-cols-4 w-full mb-8">
            <TabsTrigger value="all" className="text-sm">All Samples</TabsTrigger>
            <TabsTrigger value="pending" className="text-sm">Pending</TabsTrigger>
            <TabsTrigger value="in-progress" className="text-sm">In Progress</TabsTrigger>
            <TabsTrigger value="add-new" className="text-sm">Add New</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <SampleTable samples={sampleData} />
          </TabsContent>
          <TabsContent value="pending">
            <SampleTable samples={sampleData.filter(sample => sample.status === "pending")} />
          </TabsContent>
          <TabsContent value="in-progress">
            <SampleTable samples={sampleData.filter(sample => sample.status === "in-progress")} />
          </TabsContent>
          <TabsContent value="add-new">
            <SampleForm />
          </TabsContent>
        </Tabs>
      </AnimatedContainer>
    </div>
  );
};

export default Samples;
