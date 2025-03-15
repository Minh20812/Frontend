import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { CheckCircle, Layout, Menu, Users2, Workflow, X } from "lucide-react";
import AuthRouter from "./AuthRouter";
import { useSelector } from "react-redux";
import { KanbanBoard } from "@/components/kanban/KanbanBoard";

const Router = () => {
  const [showAuth, setShowAuth] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleCloseAuth = () => {
    setShowAuth(false);
  };

  // const { userInfo } = useSelector((state) => {
  //   console.log("Complete auth state:", state.auth);
  //   return state.auth;
  // });

  // console.log("userInfo in Router:", userInfo);

  // Kiểm tra chi tiết hơn
  // const isValidUser = (() => {
  //   if (!userInfo) {
  //     console.log("No userInfo found");
  //     return false;
  //   }

  //   console.log("userInfo structure:", JSON.stringify(userInfo));

  //   // Kiểm tra các cấu trúc dữ liệu có thể nhận được
  //   if (userInfo._id) {
  //     console.log("Flat userInfo structure with _id detected");
  //     return true;
  //   }

  //   // Kiểm tra nếu userInfo có thể là nested object
  //   if (userInfo.userInfo && userInfo.userInfo._id) {
  //     console.log("Nested userInfo structure detected");
  //     return true;
  //   }

  //   // Thêm kiểm tra cho cấu trúc data từ API endpoint "/api/users/me"
  //   if (userInfo.email || userInfo.name) {
  //     console.log("User info with email/name detected");
  //     return true;
  //   }

  //   console.log("Invalid userInfo structure");
  //   return false;
  // })();

  // console.log("isValidUser result:", isValidUser);

  // const { userInfo } = useSelector((state) => state.auth);

  // const isValidUser = userInfo && !userInfo.error;

  // Add this near the top of your Router component to debug auth state
  const { userInfo } = useSelector((state) => {
    console.log("Complete auth state:", state.auth);
    return state.auth;
  });

  // More detailed validation of the user info
  const isValidUser = (() => {
    console.log("Checking user auth status - userInfo:", userInfo);

    if (!userInfo) {
      console.log("No userInfo found in Redux store");
      return false;
    }

    if (userInfo.error) {
      console.log("Error found in userInfo:", userInfo.error);
      return false;
    }

    // Add more detailed checks based on your user object structure
    const hasValidId = Boolean(
      userInfo._id || (userInfo.userInfo && userInfo.userInfo._id)
    );
    const hasValidEmail = Boolean(
      userInfo.email || (userInfo.userInfo && userInfo.userInfo.email)
    );

    console.log("User validation results:", { hasValidId, hasValidEmail });

    return hasValidId || hasValidEmail;
  })();

  console.log("Final auth validation result:", isValidUser);

  return (
    <>
      {!isValidUser ? (
        <div className="min-h-screen bg-gradient-to-b from-background to-muted px-4 md:px-6">
          {/* Navigation */}
          <nav className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center justify-between lg:h-16">
              <div className="flex items-center gap-6">
                <a href="/" className="flex items-center space-x-2">
                  <Workflow className="h-5 w-5 lg:h-6 lg:w-6" />
                  <span className="text-lg font-bold lg:text-xl">
                    KanbanTask
                  </span>
                </a>
                <div className="hidden gap-6 md:flex">
                  <a
                    href="#features"
                    className="text-sm font-medium text-muted-foreground hover:text-primary"
                  >
                    Features
                  </a>
                  <a
                    href="#pricing"
                    className="text-sm font-medium text-muted-foreground hover:text-primary"
                  >
                    Pricing
                  </a>
                  <a
                    href="#about"
                    className="text-sm font-medium text-muted-foreground hover:text-primary"
                  >
                    About
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="hidden sm:flex sm:items-center sm:gap-4">
                  <Button
                    variant="ghost"
                    onClick={() => setShowAuth(true)}
                    className="cursor-pointer"
                  >
                    Login
                  </Button>
                  <Button
                    onClick={() => setShowAuth(true)}
                    className="cursor-pointer"
                  >
                    Get Started
                  </Button>
                </div>
                <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                  <SheetTrigger asChild className="md:hidden">
                    <Button variant="ghost" size="icon">
                      <Menu className="h-5 w-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-[280px] sm:w-[340px]">
                    <div className="flex h-full flex-col">
                      <div className="flex items-center justify-between border-b px-4 py-4">
                        <span className="text-lg font-bold">Menu</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <X className="h-5 w-5" />
                        </Button>
                      </div>
                      <div className="flex-1 overflow-auto py-4">
                        <div className="space-y-4">
                          <a
                            href="#features"
                            className="block px-4 py-2 text-sm font-medium hover:bg-muted"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            Features
                          </a>
                          <a
                            href="#pricing"
                            className="block px-4 py-2 text-sm font-medium hover:bg-muted"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            Pricing
                          </a>
                          <a
                            href="#about"
                            className="block px-4 py-2 text-sm font-medium hover:bg-muted"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            About
                          </a>
                        </div>
                      </div>
                      <div className="border-t p-4">
                        <div className="grid gap-4">
                          <Button
                            variant="outline"
                            onClick={() => {
                              setShowAuth(true);
                              setIsMenuOpen(false);
                            }}
                          >
                            Login
                          </Button>
                          <Button
                            onClick={() => {
                              setShowAuth(true);
                              setIsMenuOpen(false);
                            }}
                          >
                            Get Started
                          </Button>
                        </div>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </nav>

          {/* Hero Section */}
          <section className="container grid items-center gap-6 pb-8 pt-6 md:grid-cols-2 md:py-10">
            <div className="flex flex-col items-center gap-4 text-center md:items-start md:text-left">
              <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:text-5xl xl:text-6xl">
                Manage tasks with ease using Kanban
              </h1>
              <p className="max-w-[500px] text-base text-muted-foreground sm:text-lg md:text-xl">
                Streamline your workflow, boost productivity, and collaborate
                effectively with our intuitive Kanban board system.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button
                  size="lg"
                  onClick={() => setShowAuth(true)}
                  className="cursor-pointer"
                >
                  Start for Free
                </Button>
                <Button size="lg" variant="outline" className="cursor-pointer">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-background to-transparent" />
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="Dashboard Preview"
                  className="rounded-lg border shadow-2xl"
                />
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="container py-8 md:py-12 lg:py-24" id="features">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
              <h2 className="text-2xl font-bold leading-[1.1] sm:text-3xl md:text-4xl lg:text-5xl">
                Features that empower your team
              </h2>
              <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg">
                Everything you need to manage projects effectively and
                collaborate seamlessly with your team.
              </p>
            </div>
            <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3 mt-8 md:mt-12">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="relative overflow-hidden rounded-lg border bg-background p-2"
                >
                  <div className="flex h-[180px] flex-col justify-between rounded-md p-6 max-sm:p-4 max-sm:items-center max-sm:text-center">
                    <feature.icon className="h-8 w-8 md:h-12 md:w-12" />
                    <div className="space-y-2">
                      <h3 className="font-bold">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="border-t bg-muted/50">
            <div className="container py-8 md:py-12 lg:py-24">
              <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
                <h2 className="text-2xl font-bold leading-[1.1] sm:text-3xl md:text-4xl lg:text-5xl">
                  Ready to get started?
                </h2>
                <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg">
                  Join thousands of teams already using KanbanTask to improve
                  their workflow.
                </p>
                <Button
                  size="lg"
                  onClick={() => setShowAuth(true)}
                  className="cursor-pointer"
                >
                  Start Your Free Trial
                </Button>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="border-t py-6 md:py-0">
            <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
              <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
                <Workflow className="h-5 w-5 md:h-6 md:w-6" />
                <p className="text-center text-sm leading-loose md:text-left">
                  Built with ❤️ from Minh for better task management.
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Terms
                </a>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Privacy
                </a>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Contact
                </a>
              </div>
            </div>
          </footer>

          {showAuth && <AuthRouter onClose={handleCloseAuth} />}
        </div>
      ) : (
        <KanbanBoard />
      )}
    </>
  );
};

export default Router;

const features = [
  {
    title: "Visual Task Management",
    description:
      "Organize tasks with an intuitive drag-and-drop Kanban board interface.",
    icon: Layout,
  },
  {
    title: "Team Collaboration",
    description:
      "Work together seamlessly with real-time updates and team assignments.",
    icon: Users2,
  },
  {
    title: "Progress Tracking",
    description:
      "Monitor project progress with visual indicators and detailed analytics.",
    icon: CheckCircle,
  },
];
