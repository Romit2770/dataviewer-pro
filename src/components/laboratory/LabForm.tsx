
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { TestTube, Beaker } from "lucide-react";

const labDataSchema = z.object({
  sampleId: z.string().min(3, "Sample ID must be at least 3 characters"),
  labType: z.enum(["clinical", "research"]),
  testType: z.string().min(1, "Test type is required"),
  value: z.string().min(1, "Test value is required"),
  units: z.string().min(1, "Units are required"),
  notes: z.string().optional(),
  collectedBy: z.string().min(1, "Collector name is required"),
});

type LabFormData = z.infer<typeof labDataSchema>;

interface LabFormProps {
  labType: "clinical" | "research";
}

const LabForm: React.FC<LabFormProps> = ({ labType }) => {
  const form = useForm<LabFormData>({
    resolver: zodResolver(labDataSchema),
    defaultValues: {
      sampleId: "",
      labType,
      testType: "",
      value: "",
      units: "",
      notes: "",
      collectedBy: "",
    },
  });

  const onSubmit = (data: LabFormData) => {
    console.log("Submitted data:", data);
    
    // Simulate API submission with random success/failure
    const isSuccess = Math.random() > 0.2; // 80% success rate
    
    if (isSuccess) {
      toast({
        title: "Data submitted successfully",
        description: `Sample ${data.sampleId} has been recorded in the ${data.labType} laboratory.`,
        variant: "default",
      });
      form.reset({
        sampleId: "",
        labType,
        testType: "",
        value: "",
        units: "",
        notes: "",
        collectedBy: "",
      });
    } else {
      toast({
        title: "Error submitting data",
        description: "There was an issue recording your data. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className={`border-t-4 ${labType === "clinical" ? "border-t-purple-500" : "border-t-teal-500"}`}>
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl">
            {labType === "clinical" ? "Clinical" : "Research"} Laboratory
          </CardTitle>
          <Badge 
            variant={labType === "clinical" ? "purple" : "teal"}
            className="ml-2"
          >
            {labType === "clinical" ? 
              <TestTube className="h-3 w-3 mr-1" /> : 
              <Beaker className="h-3 w-3 mr-1" />
            }
            {labType === "clinical" ? "Clinical" : "Research"}
          </Badge>
        </div>
        <CardDescription>
          Enter new {labType === "clinical" ? "clinical" : "research"} laboratory test results.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="sampleId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sample ID</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., LAB-2023-001" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="testType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Test Type</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select test type" />
                        </SelectTrigger>
                        <SelectContent>
                          {labType === "clinical" ? (
                            <>
                              <SelectItem value="blood-glucose">Blood Glucose</SelectItem>
                              <SelectItem value="cholesterol">Cholesterol</SelectItem>
                              <SelectItem value="complete-blood-count">Complete Blood Count</SelectItem>
                              <SelectItem value="liver-function">Liver Function</SelectItem>
                              <SelectItem value="kidney-function">Kidney Function</SelectItem>
                            </>
                          ) : (
                            <>
                              <SelectItem value="protein-analysis">Protein Analysis</SelectItem>
                              <SelectItem value="pcr">PCR</SelectItem>
                              <SelectItem value="spectroscopy">Spectroscopy</SelectItem>
                              <SelectItem value="cell-culture">Cell Culture</SelectItem>
                              <SelectItem value="microscopy">Microscopy</SelectItem>
                            </>
                          )}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Result Value</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="units"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Units</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="e.g., mg/dL, mmol/L" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="collectedBy"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Collected By</FormLabel>
                  <FormControl>
                    <Input placeholder="Technician name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Any additional observations or notes" 
                      className="min-h-[100px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>Optional additional comments or observations.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              className={`w-full ${labType === "clinical" ? "bg-purple-500 hover:bg-purple-600" : "bg-teal-500 hover:bg-teal-600"}`}
            >
              Submit {labType === "clinical" ? "Clinical" : "Research"} Data
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default LabForm;
