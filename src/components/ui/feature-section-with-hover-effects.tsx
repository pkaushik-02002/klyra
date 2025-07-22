import { cn } from "@/lib/utils";
import {
  BarChart,
  Bell,
  Shield,
  Zap,
  Users,
  TrendingUp,
  Smartphone,
  CheckCircle,
} from "lucide-react";

export function FeaturesSectionWithHoverEffects() {
  const features = [
    {
      title: "Unified Dashboard",
      description:
        "See all your subscriptions, renewals, and spending in one beautiful dashboard.",
      icon: <BarChart />,
    },
    {
      title: "Smart Reminders",
      description:
        "Never miss a renewal. Get timely reminders before any subscription renews or expires.",
      icon: <Bell />,
    },
    {
      title: "Actionable Insights",
      description:
        "Get smart analytics to optimize your spending and discover where you can save.",
      icon: <TrendingUp />,
    },
    {
      title: "Secure & Private",
      description:
        "Your data is encrypted and never sold. Privacy and security are our top priorities.",
      icon: <Shield />,
    },
    {
      title: "Mobile Friendly",
      description:
        "Enjoy a seamless, delightful experience on any device—mobile, tablet, or desktop.",
      icon: <Smartphone />,
    },
    {
      title: "Collaborative",
      description:
        "Share and manage subscriptions with family or team members easily.",
      icon: <Users />,
    },
    {
      title: "Instant Setup",
      description:
        "Get started in seconds. No credit card required to try Klyra.",
      icon: <Zap />,
    },
    {
      title: "Trusted by Thousands",
      description:
        "Join a growing community of users who rely on Klyra every day.",
      icon: <CheckCircle />,
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  relative z-10 py-10 max-w-7xl mx-auto">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r  py-10 relative group/feature dark:border-neutral-800",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "lg:border-b dark:border-neutral-800"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-primary transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
}; 