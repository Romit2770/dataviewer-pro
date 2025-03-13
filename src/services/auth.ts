
import { User, mockUsers } from "../types/user";
import { z } from "zod";

// Define a schema for form validation
export const loginFormSchema = z.object({
  userId: z.string().min(1, { message: "User ID is required" })
    .regex(/^\d{2}(hd|wk|mb)\d{3}$/, { 
      message: "ID format should be YYxxNNN (e.g., 25hd001, 25wk002, 25mb003)" 
    }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;

export const authenticateUser = (userId: string, password: string): User | undefined => {
  return mockUsers.find(user => user.id === userId);
};

export const requestPasswordReset = (userId: string): { success: boolean; user?: User } => {
  if (!userId.match(/^\d{2}(hd|wk|mb)\d{3}$/)) {
    return { success: false };
  }
  
  const user = mockUsers.find(user => user.id === userId);
  
  if (user) {
    return { success: true, user };
  } else {
    return { success: false };
  }
};
