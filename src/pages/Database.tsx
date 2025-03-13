
import React from "react";
import { Database, Server, FileSpreadsheet, Code2, HardDrive, Network } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AnimatedContainer from "@/components/ui/AnimatedContainer";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Database = () => {
  return (
    <div className="page-container">
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Database Management</h1>
        <p className="text-muted-foreground">
          Monitor and manage your laboratory database systems
        </p>
      </div>

      <AnimatedContainer animation="fade">
        <Tabs defaultValue="overview" className="w-full mb-8">
          <TabsList className="w-full max-w-md mb-6">
            <TabsTrigger value="overview" className="flex-1">Overview</TabsTrigger>
            <TabsTrigger value="tables" className="flex-1">Tables</TabsTrigger>
            <TabsTrigger value="backups" className="flex-1">Backups</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <AnimatedContainer animation="slide-up" delay={100}>
                <Card className="glass glass-hover">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Database className="h-5 w-5 text-blue-500" />
                      <span>Database Status</span>
                    </CardTitle>
                    <CardDescription>Current health and performance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>CPU Usage</span>
                          <span className="font-medium">24%</span>
                        </div>
                        <Progress value={24} className="h-2" />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Memory Usage</span>
                          <span className="font-medium">42%</span>
                        </div>
                        <Progress value={42} className="h-2" />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Storage Usage</span>
                          <span className="font-medium">68%</span>
                        </div>
                        <Progress value={68} className="h-2" />
                      </div>
                      
                      <div className="pt-2">
                        <div className="flex items-center gap-2 text-sm text-green-600">
                          <div className="w-2 h-2 rounded-full bg-green-600"></div>
                          <span>All systems operational</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedContainer>
              
              <AnimatedContainer animation="slide-up" delay={200}>
                <Card className="glass glass-hover">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <HardDrive className="h-5 w-5 text-amber-600" />
                      <span>Storage Usage</span>
                    </CardTitle>
                    <CardDescription>Database storage allocation</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 rounded-lg border border-border/50 bg-background/30">
                          <div className="text-2xl font-bold">248 GB</div>
                          <div className="text-xs text-muted-foreground">Total Space</div>
                        </div>
                        <div className="text-center p-4 rounded-lg border border-border/50 bg-background/30">
                          <div className="text-2xl font-bold">79 GB</div>
                          <div className="text-xs text-muted-foreground">Free Space</div>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Sample Data</span>
                            <span>102 GB</span>
                          </div>
                          <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500" style={{ width: "41%" }} />
                          </div>
                        </div>
                        
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Lab Results</span>
                            <span>45 GB</span>
                          </div>
                          <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                            <div className="h-full bg-green-500" style={{ width: "18%" }} />
                          </div>
                        </div>
                        
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>System Files</span>
                            <span>22 GB</span>
                          </div>
                          <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                            <div className="h-full bg-amber-500" style={{ width: "9%" }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedContainer>
              
              <AnimatedContainer animation="slide-up" delay={300}>
                <Card className="glass glass-hover">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Network className="h-5 w-5 text-purple-500" />
                      <span>Active Connections</span>
                    </CardTitle>
                    <CardDescription>Current database connections</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid place-items-center py-2">
                        <div className="text-4xl font-bold">24</div>
                        <div className="text-sm text-muted-foreground">Active Connections</div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-2 rounded-lg border border-border/50 bg-background/30">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            <span className="text-sm">Analytics service</span>
                          </div>
                          <span className="text-xs text-muted-foreground">8 conn.</span>
                        </div>
                        
                        <div className="flex items-center justify-between p-2 rounded-lg border border-border/50 bg-background/30">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            <span className="text-sm">Lab application</span>
                          </div>
                          <span className="text-xs text-muted-foreground">12 conn.</span>
                        </div>
                        
                        <div className="flex items-center justify-between p-2 rounded-lg border border-border/50 bg-background/30">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            <span className="text-sm">Admin portal</span>
                          </div>
                          <span className="text-xs text-muted-foreground">4 conn.</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedContainer>
            </div>
            
            <AnimatedContainer animation="slide-up" delay={400}>
              <Card className="glass glass-hover mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileSpreadsheet className="h-5 w-5 text-green-600" />
                    <span>Database Activity</span>
                  </CardTitle>
                  <CardDescription>Recent query performance and operations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-3 px-2 text-sm font-medium">Operation</th>
                            <th className="text-left py-3 px-2 text-sm font-medium">Table</th>
                            <th className="text-left py-3 px-2 text-sm font-medium">Duration</th>
                            <th className="text-left py-3 px-2 text-sm font-medium">Timestamp</th>
                            <th className="text-left py-3 px-2 text-sm font-medium">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            { op: "SELECT", table: "samples", duration: "12ms", time: "10:42:31", status: "success" },
                            { op: "INSERT", table: "results", duration: "18ms", time: "10:40:15", status: "success" },
                            { op: "UPDATE", table: "samples", duration: "22ms", time: "10:38:47", status: "success" },
                            { op: "SELECT", table: "users", duration: "8ms", time: "10:35:22", status: "success" },
                            { op: "DELETE", table: "temp_data", duration: "15ms", time: "10:30:05", status: "success" },
                          ].map((item, index) => (
                            <tr key={index} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                              <td className="py-3 px-2">
                                <span className={`inline-block px-2 py-1 rounded text-xs ${
                                  item.op === "SELECT" ? "bg-blue-100 text-blue-800" :
                                  item.op === "INSERT" ? "bg-green-100 text-green-800" :
                                  item.op === "UPDATE" ? "bg-amber-100 text-amber-800" :
                                  "bg-red-100 text-red-800"
                                }`}>
                                  {item.op}
                                </span>
                              </td>
                              <td className="py-3 px-2 text-sm">{item.table}</td>
                              <td className="py-3 px-2 text-sm">{item.duration}</td>
                              <td className="py-3 px-2 text-sm">{item.time}</td>
                              <td className="py-3 px-2">
                                <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                                <span className="text-sm">{item.status}</span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedContainer>
          </TabsContent>
          
          <TabsContent value="tables">
            <AnimatedContainer animation="fade">
              <Card className="glass glass-hover mb-8">
                <CardHeader>
                  <CardTitle>Database Tables</CardTitle>
                  <CardDescription>
                    Manage your database tables and schema
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {[
                      { name: "samples", records: 235, size: "42 MB", lastUpdated: "Today, 10:42" },
                      { name: "results", records: 1842, size: "128 MB", lastUpdated: "Today, 09:15" },
                      { name: "users", records: 48, size: "4 MB", lastUpdated: "Yesterday, 15:30" },
                      { name: "equipment", records: 124, size: "18 MB", lastUpdated: "3 days ago" },
                      { name: "reports", records: 532, size: "64 MB", lastUpdated: "Last week" },
                    ].map((table, index) => (
                      <div key={index} className="p-4 rounded-lg border border-border/50 transition-all hover:shadow-md">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-lg font-medium">{table.name}</h3>
                            <div className="text-sm text-muted-foreground">
                              {table.records} records · {table.size} · Last updated: {table.lastUpdated}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">View Schema</Button>
                            <Button variant="outline" size="sm">Browse Data</Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </AnimatedContainer>
          </TabsContent>
          
          <TabsContent value="backups">
            <AnimatedContainer animation="fade">
              <Card className="glass glass-hover mb-8">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Database Backups</CardTitle>
                    <CardDescription>
                      Manage and restore database backups
                    </CardDescription>
                  </div>
                  <Button>Create Backup</Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {[
                      { date: "May 15, 2023", time: "03:00 AM", size: "215 MB", type: "Automatic", status: "Completed" },
                      { date: "May 14, 2023", time: "03:00 AM", size: "213 MB", type: "Automatic", status: "Completed" },
                      { date: "May 13, 2023", time: "03:00 AM", size: "210 MB", type: "Automatic", status: "Completed" },
                      { date: "May 12, 2023", time: "03:00 AM", size: "208 MB", type: "Automatic", status: "Completed" },
                      { date: "May 11, 2023", time: "03:00 AM", size: "205 MB", type: "Automatic", status: "Completed" },
                    ].map((backup, index) => (
                      <div key={index} className="p-4 rounded-lg border border-border/50 hover:bg-background/30 transition-all">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">{backup.date} - {backup.time}</h3>
                            <div className="text-sm text-muted-foreground">
                              {backup.size} · {backup.type} backup
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-sm font-medium text-green-600">
                              {backup.status}
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">Download</Button>
                              <Button variant="outline" size="sm">Restore</Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </AnimatedContainer>
          </TabsContent>
        </Tabs>
      </AnimatedContainer>
    </div>
  );
};

export default Database;
