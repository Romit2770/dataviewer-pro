
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import AnimatedContainer from "@/components/ui/AnimatedContainer";

const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  role: z.string({
    required_error: "Please select a role.",
  }),
  department: z.string().optional(),
});

const notificationsFormSchema = z.object({
  sampleCreated: z.boolean().default(true),
  sampleUpdated: z.boolean().default(true),
  sampleCompleted: z.boolean().default(true),
  reportGenerated: z.boolean().default(true),
  systemUpdates: z.boolean().default(false),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;
type NotificationsFormValues = z.infer<typeof notificationsFormSchema>;

const Settings = () => {
  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: "Alex Johnson",
      email: "alex.johnson@example.com",
      role: "lab_technician",
      department: "Chemical Analysis",
    },
  });

  const notificationsForm = useForm<NotificationsFormValues>({
    resolver: zodResolver(notificationsFormSchema),
    defaultValues: {
      sampleCreated: true,
      sampleUpdated: true,
      sampleCompleted: true,
      reportGenerated: true,
      systemUpdates: false,
    },
  });

  function onProfileSubmit(data: ProfileFormValues) {
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully.",
    });
    console.log(data);
  }

  function onNotificationsSubmit(data: NotificationsFormValues) {
    toast({
      title: "Notification preferences updated",
      description: "Your notification preferences have been saved.",
    });
    console.log(data);
  }

  return (
    <div className="page-container">
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      <AnimatedContainer animation="fade">
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="w-full max-w-md mb-8">
            <TabsTrigger value="profile" className="flex-1">Profile</TabsTrigger>
            <TabsTrigger value="notifications" className="flex-1">Notifications</TabsTrigger>
            <TabsTrigger value="security" className="flex-1">Security</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <Card className="glass glass-hover max-w-3xl">
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your personal information and preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...profileForm}>
                  <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-8">
                    <div className="space-y-6">
                      <div className="flex items-center gap-6">
                        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl font-semibold">
                          AJ
                        </div>
                        <div>
                          <Button variant="outline" size="sm">Change Avatar</Button>
                        </div>
                      </div>

                      <FormField
                        control={profileForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={profileForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="Your email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={profileForm.control}
                          name="role"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Role</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a role" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="lab_technician">Lab Technician</SelectItem>
                                  <SelectItem value="lab_manager">Lab Manager</SelectItem>
                                  <SelectItem value="analyst">Analyst</SelectItem>
                                  <SelectItem value="admin">Administrator</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={profileForm.control}
                          name="department"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Department</FormLabel>
                              <FormControl>
                                <Input placeholder="Your department" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <Button type="submit">Save Changes</Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card className="glass glass-hover max-w-3xl">
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Choose which notifications you want to receive
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...notificationsForm}>
                  <form onSubmit={notificationsForm.handleSubmit(onNotificationsSubmit)} className="space-y-8">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium">Sample Notifications</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Configure notifications for sample-related activities
                        </p>
                        <div className="space-y-4">
                          <FormField
                            control={notificationsForm.control}
                            name="sampleCreated"
                            render={({ field }) => (
                              <FormItem className="flex items-center justify-between rounded-lg border border-border/50 p-4">
                                <div className="space-y-0.5">
                                  <FormLabel className="text-base">Sample Created</FormLabel>
                                  <FormDescription>
                                    Receive a notification when a new sample is created
                                  </FormDescription>
                                </div>
                                <FormControl>
                                  <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={notificationsForm.control}
                            name="sampleUpdated"
                            render={({ field }) => (
                              <FormItem className="flex items-center justify-between rounded-lg border border-border/50 p-4">
                                <div className="space-y-0.5">
                                  <FormLabel className="text-base">Sample Updated</FormLabel>
                                  <FormDescription>
                                    Get notified when a sample is updated
                                  </FormDescription>
                                </div>
                                <FormControl>
                                  <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={notificationsForm.control}
                            name="sampleCompleted"
                            render={({ field }) => (
                              <FormItem className="flex items-center justify-between rounded-lg border border-border/50 p-4">
                                <div className="space-y-0.5">
                                  <FormLabel className="text-base">Sample Completed</FormLabel>
                                  <FormDescription>
                                    Be notified when a sample analysis is completed
                                  </FormDescription>
                                </div>
                                <FormControl>
                                  <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h3 className="text-lg font-medium">System Notifications</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Configure notifications for system-related activities
                        </p>
                        <div className="space-y-4">
                          <FormField
                            control={notificationsForm.control}
                            name="reportGenerated"
                            render={({ field }) => (
                              <FormItem className="flex items-center justify-between rounded-lg border border-border/50 p-4">
                                <div className="space-y-0.5">
                                  <FormLabel className="text-base">Report Generated</FormLabel>
                                  <FormDescription>
                                    Get notified when a new report is generated
                                  </FormDescription>
                                </div>
                                <FormControl>
                                  <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={notificationsForm.control}
                            name="systemUpdates"
                            render={({ field }) => (
                              <FormItem className="flex items-center justify-between rounded-lg border border-border/50 p-4">
                                <div className="space-y-0.5">
                                  <FormLabel className="text-base">System Updates</FormLabel>
                                  <FormDescription>
                                    Receive notifications about system updates and maintenance
                                  </FormDescription>
                                </div>
                                <FormControl>
                                  <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </div>

                    <Button type="submit">Save Preferences</Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="security">
            <Card className="glass glass-hover max-w-3xl">
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>
                  Manage your account security and privacy
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div>
                  <h3 className="text-lg font-medium mb-4">Change Password</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input id="current-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input id="new-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <Input id="confirm-password" type="password" />
                      </div>
                    </div>
                    <Button>Update Password</Button>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Two-Factor Authentication</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Add an extra layer of security to your account
                  </p>
                  <div className="flex items-center justify-between rounded-lg border border-border/50 p-4 mb-4">
                    <div className="space-y-0.5">
                      <h4 className="text-base font-medium">Two-Factor Authentication</h4>
                      <p className="text-sm text-muted-foreground">
                        Protect your account with an additional verification step
                      </p>
                    </div>
                    <Switch />
                  </div>
                  <Button variant="outline">Setup Two-Factor Authentication</Button>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Sessions</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Manage your active sessions and devices
                  </p>
                  <div className="space-y-4">
                    <div className="rounded-lg border border-border/50 p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-base font-medium">Current Session</h4>
                        <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-200">Active</Badge>
                      </div>
                      <div className="space-y-1 text-sm">
                        <p className="text-muted-foreground">Device: Chrome on Windows</p>
                        <p className="text-muted-foreground">IP Address: 192.168.1.1</p>
                        <p className="text-muted-foreground">Last Active: Just now</p>
                      </div>
                    </div>
                    <Button variant="outline" className="text-destructive">Sign Out All Devices</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </AnimatedContainer>
    </div>
  );
};

export default Settings;
