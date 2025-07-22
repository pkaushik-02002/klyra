import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export function CookieBanner() {
  const [visible, setVisible] = useState(true);
  const [showManage, setShowManage] = useState(false);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex justify-center px-2 pb-4 pointer-events-none">
      <Card className="w-full max-w-2xl shadow-xl border bg-background pointer-events-auto flex flex-col md:flex-row items-center gap-4 p-6 md:gap-8 md:items-center md:justify-between">
        <div className="flex-1 text-center md:text-left">
          <span className="font-semibold text-primary">We use cookies</span>
          <span className="ml-2 text-muted-foreground">to enhance your experience, analyze usage, and deliver relevant content. See our <a href='/privacy' className='underline text-primary'>Privacy Policy</a>.</span>
        </div>
        <div className="flex gap-2 mt-2 md:mt-0">
          <Button size="sm" className="rounded-full" onClick={() => setVisible(false)}>
            Accept
          </Button>
          <Button size="sm" variant="outline" className="rounded-full" onClick={() => setShowManage(!showManage)}>
            Manage
          </Button>
        </div>
        <button className="absolute top-2 right-2 text-muted-foreground hover:text-primary" onClick={() => setVisible(false)} aria-label="Close banner">
          <X className="h-4 w-4" />
        </button>
      </Card>
      {/* Manage Preferences Modal (optional, simple version) */}
      {showManage && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/40">
          <Card className="w-full max-w-md mx-auto p-6 shadow-2xl border bg-background relative">
            <button className="absolute top-2 right-2 text-muted-foreground hover:text-primary" onClick={() => setShowManage(false)} aria-label="Close preferences">
              <X className="h-4 w-4" />
            </button>
            <h3 className="font-bold text-lg mb-2">Cookie Preferences</h3>
            <p className="text-muted-foreground mb-4 text-sm">You can choose which types of cookies to allow. Essential cookies are always enabled.</p>
            <ul className="mb-4 space-y-2">
              <li><span className="font-medium">Essential cookies</span> (always enabled)</li>
              <li><span className="font-medium">Analytics cookies</span> (for usage statistics)</li>
              <li><span className="font-medium">Marketing cookies</span> (for personalized offers)</li>
            </ul>
            <Button size="sm" className="rounded-full w-full" onClick={() => setShowManage(false)}>
              Save Preferences
            </Button>
          </Card>
        </div>
      )}
    </div>
  );
} 