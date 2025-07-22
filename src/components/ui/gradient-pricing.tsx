import { CheckIcon } from "lucide-react";

export const GradientPricing = () => {
  return (
    <section className="overflow-hidden py-24 text-neutral-800 dark:text-neutral-50 lg:pb-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-20 max-w-2xl text-center">
          <h2 className="mb-4 text-6xl tracking-tighter">
            Pricing & Plans
          </h2>
          <p className="text-xl tracking-tight">
            Simple, transparent pricing for everyone. Start free, upgrade anytime.
          </p>
        </div>
        <div className="-m-6 flex flex-wrap *:mx-auto">
          {/* Free Plan */}
          <div className="w-full p-6 md:w-1/2 lg:w-1/3">
            <div className="h-full transform-gpu rounded-2xl border border-neutral-300 bg-white transition duration-500 hover:-translate-y-2 dark:border-neutral-600 dark:bg-neutral-900 ">
              <div className="border-b border-neutral-300 p-12 dark:border-neutral-600">
                <div className="pr-9">
                  <h4 className="mb-6 text-6xl tracking-tighter">Free</h4>
                  <p className="mb-2 text-xl font-semibold tracking-tight">
                    $0/mo
                  </p>
                  <p className="tracking-tight">
                    Perfect for individuals who want to track and manage their subscriptions easily.
                  </p>
                </div>
              </div>
              <div className="p-12 pb-11">
                <ul className="-m-1.5 mb-11">
                  <FeatureItem>Up to 10 subscriptions</FeatureItem>
                  <FeatureItem>Basic reminders</FeatureItem>
                  <FeatureItem>Monthly reports</FeatureItem>
                  <FeatureItem>Dashboard overview</FeatureItem>
                </ul>
                <PricingButton noCardRequired={true} href="/signup">
                  Start for Free
                </PricingButton>
              </div>
            </div>
          </div>
          {/* Pro Plan */}
          <div className="w-full p-6 md:w-1/2 lg:w-1/3">
            <div
              className="transform-gpu overflow-hidden rounded-2xl p-px transition duration-500 hover:-translate-y-2"
              style={{
                backgroundImage:
                  "url('https://res.cloudinary.com/eldoraui/image/upload/v1734021310/advanced-gradient_un8eg6.jpg')",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            >
              <div className="h-full rounded-2xl bg-white dark:bg-neutral-900">
                <div
                  className="p-12"
                  style={{
                    backgroundImage:
                      "url('https://res.cloudinary.com/eldoraui/image/upload/v1734021310/advanced-gradient_un8eg6.jpg')",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                  }}
                >
                  <div className="pr-9">
                    <h4 className="mb-6 text-6xl tracking-tighter text-white">
                      Pro
                    </h4>
                    <p className="mb-2 text-xl font-semibold tracking-tighter text-white">
                      $4.99/mo
                    </p>
                    <p className="tracking-tight text-white">
                      For power users who want unlimited tracking, advanced analytics, and smart notifications.
                    </p>
                  </div>
                </div>
                <div className="p-12 pb-11">
                  <ul className="-m-1.5 mb-11">
                    <FeatureItem>Unlimited subscriptions</FeatureItem>
                    <FeatureItem>Advanced analytics</FeatureItem>
                    <FeatureItem>Smart reminders</FeatureItem>
                    <FeatureItem>Export data</FeatureItem>
                    <FeatureItem>Email support</FeatureItem>
                  </ul>
                  <PricingButton href="/signup">
                    Start Pro Trial
                  </PricingButton>
                </div>
              </div>
            </div>
          </div>
          {/* Elite Plan */}
          <div className="w-full p-6 md:w-1/2 lg:w-1/3">
            <div className="flex h-full transform-gpu flex-col justify-between rounded-2xl border border-neutral-300 bg-white transition duration-500 hover:-translate-y-2 dark:border-neutral-600 dark:bg-neutral-900">
              <div className="border-neutral-300 p-12 dark:border-neutral-600">
                <div className="pr-9">
                  <h4 className="mb-6 text-6xl tracking-tighter">Elite</h4>
                  <p className="mb-2 text-xl font-semibold tracking-tighter">
                    $9.99/mo
                  </p>
                  <p className="tracking-tight">
                    For teams and professionals who need priority support and custom features.
                  </p>
                </div>
              </div>
              <div className="p-12 pb-11">
                <ul className="-m-1.5 mb-11">
                  <FeatureItem>Everything in Pro</FeatureItem>
                  <FeatureItem>Priority support</FeatureItem>
                  <FeatureItem>Custom categories</FeatureItem>
                  <FeatureItem>AI Smart Insights</FeatureItem>
                  <FeatureItem>Team Access & Collaboration</FeatureItem>
                </ul>
                <PricingButton href="/contact">
                  Contact Sales
                </PricingButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FeatureItem = ({ children }: { children: string }) => {
  return (
    <li className="flex items-center py-1.5">
      <CheckIcon className="mr-3 size-3" />
      <span className="font-medium tracking-tight">{children}</span>
    </li>
  );
};

const PricingButton = ({
  children,
  href,
  noCardRequired,
}: {
  children: string;
  href?: string;
  noCardRequired?: boolean;
}) => {
  return (
    <>
      <a
        className="inline-block w-full rounded-lg border border-neutral-700  bg-transparent px-5 py-4 text-center font-semibold tracking-tight transition duration-200 hover:scale-105 hover:bg-neutral-900 hover:text-white dark:hover:bg-white dark:hover:text-neutral-800"
        href={href ?? ""}
      >
        {children}
      </a>
      {noCardRequired && (
        <span className="text-sm tracking-tight text-neutral-600">
          No credit card required
        </span>
      )}
    </>
  );
}; 