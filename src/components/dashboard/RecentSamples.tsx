
import React from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { Link } from "react-router-dom";
import AnimatedContainer from "../ui/AnimatedContainer";

interface Sample {
  id: string;
  name: string;
  date: string;
  status: "pending" | "in-progress" | "completed" | "failed";
  type: string;
}

interface RecentSamplesProps {
  samples: Sample[];
  delay?: number;
}

const getStatusColor = (status: Sample["status"]) => {
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

const RecentSamples = ({ samples, delay = 0 }: RecentSamplesProps) => {
  return (
    <AnimatedContainer animation="slide-up" delay={delay}>
      <div className="rounded-lg border border-border/50 glass glass-hover">
        <div className="flex items-center justify-between p-4">
          <h3 className="text-lg font-medium">Recent Samples</h3>
          <Link to="/samples">
            <Button variant="outline" size="sm">View All</Button>
          </Link>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sample ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {samples.map((sample) => (
                <TableRow key={sample.id} className="hover:bg-muted/30 transition-colors">
                  <TableCell className="font-medium">{sample.id}</TableCell>
                  <TableCell>{sample.name}</TableCell>
                  <TableCell>{sample.date}</TableCell>
                  <TableCell>{sample.type}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={getStatusColor(sample.status)}
                    >
                      {sample.status.replace('-', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      asChild
                    >
                      <Link to={`/samples/${sample.id}`}>
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View sample</span>
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </AnimatedContainer>
  );
};

export default RecentSamples;
