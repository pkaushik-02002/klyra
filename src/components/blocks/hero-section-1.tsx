import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedGroup } from "@/components/ui/animated-group";
import { cn } from "@/lib/utils";

const transitionVariants = {
    item: {
        hidden: {
            opacity: 0,
            filter: 'blur(12px)',
            y: 12,
        },
        visible: {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            transition: {
                type: 'spring' as const,
                bounce: 0.3,
                duration: 1.5,
            },
        },
    },
};

export function HeroSection() {
    return (
        <>
            <HeroHeader />
            <main className="overflow-hidden">
                <div
                    aria-hidden
                    className="z-[2] absolute inset-0 pointer-events-none isolate opacity-50 contain-strict hidden lg:block">
                    <div className="w-[35rem] h-[80rem] -translate-y-[350px] absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsl(var(--primary)/.08)_0,hsl(var(--primary)/.02)_50%,hsl(var(--primary)/0)_80%)]" />
                    <div className="h-[80rem] absolute left-0 top-0 w-56 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsl(var(--primary)/.06)_0,hsl(var(--primary)/.02)_80%,transparent_100%)] [translate:5%_-50%]" />
                    <div className="h-[80rem] -translate-y-[350px] absolute left-0 top-0 w-56 -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsl(var(--primary)/.04)_0,hsl(var(--primary)/.02)_80%,transparent_100%)]" />
                </div>
                <section>
                    <div className="relative pt-24 md:pt-36">
                        <AnimatedGroup
                            variants={{
                                container: {
                                    visible: {
                                        transition: {
                                            delayChildren: 1,
                                        },
                                    },
                                },
                                item: {
                                    hidden: {
                                        opacity: 0,
                                        y: 20,
                                    },
                                    visible: {
                                        opacity: 1,
                                        y: 0,
                                        transition: {
                                            type: 'spring' as const,
                                            bounce: 0.3,
                                            duration: 2,
                                        },
                                    },
                                },
                            }}
                            className="absolute inset-0 -z-20">
                            <img
                                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80"
                                alt="background"
                                className="absolute inset-x-0 top-56 -z-20 hidden lg:top-32 dark:block"
                                width="3276"
                                height="4095"
                            />
                        </AnimatedGroup>
                        <div aria-hidden className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--background)_75%)]" />
                        <div className="mx-auto max-w-7xl px-6">
                            <div className="text-center sm:mx-auto lg:mr-auto lg:mt-0">
                                <AnimatedGroup variants={transitionVariants}>
                                    {/* Glass tube CTA with new text */}
                                    <Link to="/docs" className="group mx-auto flex w-fit items-center gap-4 rounded-full border p-1 pl-4 h-12 shadow-md shadow-black/5 transition-all duration-300 hover:bg-muted/40 dark:border-t-white/5 dark:shadow-zinc-950 hover:scale-105" style={{ textDecoration: 'none' }}>
                                        <span className="text-foreground text-sm font-semibold">Take Control of Your Subscriptions</span>
                                        <span className="dark:border-background block h-4 w-0.5 border-l bg-white dark:bg-zinc-700"></span>
                                        <div className="bg-background group-hover:bg-muted size-6 overflow-hidden rounded-full duration-500">
                                            <div className="flex w-12 -translate-x-1/2 duration-500 ease-in-out group-hover:translate-x-0">
                                                <span className="flex size-6">
                                                    <ArrowRight className="m-auto size-3" />
                                                </span>
                                                <span className="flex size-6">
                                                    <ArrowRight className="m-auto size-3" />
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                    {/* Main headline */}
                                    <h1 className="mt-8 max-w-4xl mx-auto text-balance text-5xl md:text-7xl lg:mt-8 xl:text-[4rem] font-bold">
                                        Track, Save, and Stay in Control
                                    </h1>
                                    <p className="mx-auto mt-8 max-w-2xl text-balance text-lg">
                                        Easily track, manage, and save on all your recurring expenses. Never miss a renewal again.
                                    </p>
                                </AnimatedGroup>
                                {/* Premium CTA buttons */}
                                <div className="mt-12 flex flex-col items-center justify-center gap-4 md:flex-row">
                                    <div className="bg-gradient-to-r from-primary to-purple-500 rounded-xl shadow-lg p-1">
                                        <Button
                                            asChild
                                            size="lg"
                                            className="rounded-xl px-8 py-4 text-lg font-bold bg-gradient-to-r from-primary to-purple-500 text-white shadow-lg hover:scale-105 transition-transform duration-200 border-0"
                                        >
                                            <Link to="/signup">
                                                <span className="flex items-center gap-2">
                                                    Start Free
                                                    <ArrowRight className="ml-1 h-5 w-5" />
                                                </span>
                                            </Link>
                                        </Button>
                                    </div>
                                    <Button
                                        asChild
                                        size="lg"
                                        variant="outline"
                                        className="rounded-xl px-8 py-4 text-lg font-bold border-2 border-primary/60 bg-background/70 backdrop-blur-md hover:bg-primary/10 transition-all duration-200"
                                    >
                                        <Link to="/pricing">
                                            See Pricing
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <AnimatedGroup
                            variants={{
                                container: {
                                    visible: {
                                        transition: {
                                            staggerChildren: 0.05,
                                            delayChildren: 0.75,
                                        },
                                    },
                                },
                                ...transitionVariants,
                            }}>
                            <div className="relative -mr-56 mt-8 overflow-hidden px-2 sm:mr-0 sm:mt-12 md:mt-20">
                                <div aria-hidden className="bg-gradient-to-b to-background absolute inset-0 z-10 from-transparent from-35%" />
                                <div className="inset-shadow-2xs ring-background dark:inset-shadow-white/20 bg-background relative mx-auto max-w-6xl overflow-hidden rounded-2xl border p-4 shadow-lg shadow-zinc-950/15 ring-1">
                                    <img
                                        className="bg-background aspect-15/8 relative hidden rounded-2xl dark:block"
                                        src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1500&q=80"
                                        alt="app screen"
                                        width="2700"
                                        height="1440"
                                    />
                                    <img
                                        className="z-2 border-border/25 aspect-15/8 relative rounded-2xl border dark:hidden"
                                        src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1500&q=80"
                                        alt="app screen"
                                        width="2700"
                                        height="1440"
                                    />
                                </div>
                            </div>
                        </AnimatedGroup>
                    </div>
                </section>
                <section className="bg-background pb-16 pt-16 md:pb-32">
                    <div className="group relative m-auto max-w-5xl px-6">
                        <div className="absolute inset-0 z-10 flex scale-95 items-center justify-center opacity-0 duration-500 group-hover:scale-100 group-hover:opacity-100">
                            <Link to="/testimonials" className="block text-sm duration-150 hover:opacity-75">
                                <span> Meet Our Customers</span>
                                <ChevronRight className="ml-1 inline-block size-3" />
                            </Link>
                        </div>
                        <div className="group-hover:blur-xs mx-auto mt-12 grid max-w-2xl grid-cols-4 gap-x-12 gap-y-8 transition-all duration-500 group-hover:opacity-50 sm:gap-x-16 sm:gap-y-14">
                            {/* You can update these logos to your partners or remove them */}
                            <div className="flex">
                                <img className="mx-auto h-5 w-fit dark:invert" src="/images/logos/netflix.png" alt="Netflix Logo" height="20" width="auto" />
                            </div>
                            <div className="flex">
                                <img className="mx-auto h-4 w-fit dark:invert" src="/images/logos/Spotify_App_Logo.svg.png" alt="Spotify Logo" height="16" width="auto" />
                            </div>
                            <div className="flex">
                                <img className="mx-auto h-4 w-fit dark:invert" src="/images/logos/Notion_app_logo.png" alt="Notion Logo" height="16" width="auto" />
                            </div>
                            <div className="flex">
                                <img className="mx-auto h-5 w-fit dark:invert" src="/images/logos/AppleTVLogo.svg.png" alt="Apple TV Logo" height="20" width="auto" />
                            </div>
                            <div className="flex">
                                <img className="mx-auto h-5 w-fit dark:invert" src="/images/logos/Google_Drive_icon_(2020).svg.png" alt="Google Drive Logo" height="20" width="auto" />
                            </div>
                            <div className="flex">
                                <img className="mx-auto h-4 w-fit dark:invert" src="/images/logos/Slack_icon_2019.svg.png" alt="Slack Logo" height="16" width="auto" />
                            </div>
                            <div className="flex">
                                <img className="mx-auto h-7 w-fit dark:invert" src="/images/logos/Adobe_Creative_Cloud_rainbow_icon.svg.png" alt="Adobe Logo" height="28" width="auto" />
                            </div>
                            <div className="flex">
                                <img className="mx-auto h-6 w-fit dark:invert" src="/images/logos/OneDrive-Symbol.png" alt="OneDrive Logo" height="24" width="auto" />
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}

const menuItems = [
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'About', href: '/about' },
];

const HeroHeader = () => {
    const [menuState, setMenuState] = React.useState(false);
    const [isScrolled, setIsScrolled] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    return (
        <header>
            <nav
                data-state={menuState && 'active'}
                className="fixed z-20 w-full px-2 group">
                <div className={cn('mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12', isScrolled && 'bg-background/50 max-w-4xl rounded-2xl border backdrop-blur-lg lg:px-5')}>
                    <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
                        <div className="flex w-full justify-between lg:w-auto">
                            <Link
                                to="/"
                                aria-label="home"
                                className="flex items-center">
                                <KlyraLogo isScrolled={isScrolled} />
                            </Link>
                            <button
                                onClick={() => setMenuState(!menuState)}
                                aria-label={menuState == true ? 'Close Menu' : 'Open Menu'}
                                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden">
                                <Menu className="in-data-[state=active]:rotate-180 group-data-[state=active]:scale-0 group-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                                <X className="group-data-[state=active]:rotate-0 group-data-[state=active]:scale-100 group-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
                            </button>
                        </div>
                        <div className="absolute inset-0 m-auto hidden size-fit lg:block">
                            <ul className="flex gap-8 text-sm">
                                {menuItems.map((item, index) => (
                                    <li key={index}>
                                        <Link
                                            to={item.href}
                                            className="text-muted-foreground hover:text-accent-foreground block duration-150">
                                            <span>{item.name}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-background group-data-[state=active]:block lg:group-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
                            <div className="lg:hidden">
                                <ul className="space-y-6 text-base">
                                    {menuItems.map((item, index) => (
                                        <li key={index}>
                                            <Link
                                                to={item.href}
                                                className="text-muted-foreground hover:text-accent-foreground block duration-150">
                                                <span>{item.name}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                                <Button
                                    asChild
                                    variant="outline"
                                    size="sm"
                                    className={cn(isScrolled && 'lg:hidden')}>
                                    <Link to="/login">
                                        <span>Log In</span>
                                    </Link>
                                </Button>
                                <Button
                                    asChild
                                    size="sm"
                                    className={cn(isScrolled && 'lg:hidden')}>
                                    <Link to="/signup">
                                        <span>Sign Up</span>
                                    </Link>
                                </Button>
                                <Button
                                    asChild
                                    size="sm"
                                    className={cn(isScrolled ? 'lg:inline-flex' : 'hidden')}>
                                    <Link to="/signup">
                                        <span>Start Free</span>
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};

// SubTracker SVG Logo
const KlyraLogo = ({ isScrolled, className }: { isScrolled?: boolean; className?: string }) => (
  <img
    src={isScrolled ? "/images/logos/iconlogo.png" : "/images/logos/Klyra-official-logo.png"}
    alt="Klyra Logo"
    title="Klyra Logo"
    className={cn('h-16 w-16', className)}
  />
); 