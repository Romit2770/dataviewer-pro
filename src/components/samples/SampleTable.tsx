
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Eye, Filter, RefreshCw, Search } from "lucide-react";
import AnimatedContainer from "../ui/AnimatedContainer";

interface Sample {
  id: string;
  name: string;
  date: string;
  status: "pending" | "in-progress" | "completed" | "failed";
  type: string;
  batchNumber: string;
  collectedBy: string;
}

interface SampleTableProps {
  samples: Sample[];
}

const SampleTable = ({ samples: initialSamples }: SampleTableProps) => {
  const [samples, setSamples] = useState(initialSamples);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [typeFilter, setTypeFilter] = useState<string>("");

  const filteredSamples = samples.filter((sample) => {
    const matchesSearch = sample.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         sample.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sample.batchNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter ? sample.status === statusFilter : true;
    const matchesType = typeFilter ? sample.type === typeFilter : true;

    return matchesSearch && matchesStatus && matchesType;
  });

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

  const resetFilters = () => {
    setSearchTerm("");
    setStatusFilter("");
    setTypeFilter("");
  };

  return (
    <AnimatedContainer animation="fade">
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1 flex gap-2 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search samples..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="grid grid-cols-2 sm:flex items-center gap-2">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Filter:</span>
              </div>

              <Select
                value={statusFilter}
                onValueChange={setStatusFilter}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={typeFilter}
                onValueChange={setTypeFilter}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="water">Water</SelectItem>
                  <SelectItem value="soil">Soil</SelectItem>
                  <SelectItem value="air">Air</SelectItem>
                  <SelectItem value="tissue">Tissue</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>

              <Button 
                variant="outline" 
                size="icon"
                onClick={resetFilters}
                title="Reset filters"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-border/50 glass glass-hover overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Sample ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Batch</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Collected By</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSamples.length > 0 ? (
                  filteredSamples.map((sample) => (
                    <TableRow key={sample.id} className="hover:bg-muted/30 transition-colors">
                      <TableCell className="font-medium">{sample.id}</TableCell>
                      <TableCell>{sample.name}</TableCell>
                      <TableCell>{sample.date}</TableCell>
                      <TableCell>{sample.batchNumber}</TableCell>
                      <TableCell className="capitalize">{sample.type}</TableCell>
                      <TableCell>{sample.collectedBy}</TableCell>
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
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                      No samples found matching your filters.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </AnimatedContainer>
  );
};

export default SampleTable;
