
import React from "react";

const DemoAccounts = () => {
  return (
    <div className="text-center text-sm text-muted-foreground w-full">
      <p>Demo accounts:</p>
      <div className="mt-1 space-y-1">
        <p><span className="font-medium">25hd001</span> - Handler (Full access)</p>
        <p><span className="font-medium">25wk001</span> - Worker (Read/Write access)</p>
        <p><span className="font-medium">25mb001</span> - Member (Read-only access)</p>
      </div>
      <p className="mt-2 text-xs">(Use any password with 6+ characters)</p>
    </div>
  );
};

export default DemoAccounts;
