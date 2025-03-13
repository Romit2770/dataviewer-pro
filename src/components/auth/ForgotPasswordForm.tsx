
import React from "react";
import { Key } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ForgotPasswordFormProps {
  forgotId: string;
  onForgotIdChange: (id: string) => void;
  onCancel: () => void;
  onSubmit: () => void;
}

const ForgotPasswordForm = ({ 
  forgotId, 
  onForgotIdChange, 
  onCancel, 
  onSubmit 
}: ForgotPasswordFormProps) => {
  return (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <Key className="h-12 w-12 mx-auto text-purple-600 mb-2" />
        <h3 className="text-lg font-medium">Forgot Your Password?</h3>
        <p className="text-sm text-muted-foreground">
          Enter your DataLab ID and we'll help you reset your password.
        </p>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="forgot-id">DataLab ID</Label>
        <Input 
          id="forgot-id"
          placeholder="25xx000" 
          value={forgotId}
          onChange={(e) => onForgotIdChange(e.target.value)}
        />
        <p className="text-xs text-muted-foreground">
          Format: YY+role+NNN (e.g., 25hd001)
        </p>
      </div>
      
      <div className="flex gap-2 pt-2">
        <Button 
          variant="outline" 
          className="flex-1"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button 
          className="flex-1 bg-purple-600 hover:bg-purple-700"
          onClick={onSubmit}
        >
          Reset Password
        </Button>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
