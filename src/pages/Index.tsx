// Update this page (the content is just a fallback if you fail to update the page)

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Klyra</h1>
        <p className="text-xl text-muted-foreground">Your subscription management dashboard is ready!</p>
        <div className="mt-6 space-x-4">
          <a href="/app" className="premium-button inline-flex items-center px-6 py-3 rounded-lg">
            Go to Dashboard
          </a>
          <a href="/" className="text-primary hover:underline">
            View Landing Page
          </a>
        </div>
      </div>
    </div>
  );
};

export default Index;
