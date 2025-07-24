import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  FileText,
  Receipt,
  CreditCard,
  Zap,
  Shield,
  Clock,
  CheckCircle,
  Sparkles,
  Upload,
  Download,
  Menu,
  Star,
} from "lucide-react";

export default function DigitizeAILanding() {
  const features = [
    {
      icon: FileText,
      title: "Invoice Processing",
      description:
        "Automatically extract amounts, dates, and vendor information from invoices with 99% accuracy.",
      badge: "Most Popular",
    },
    {
      icon: Receipt,
      title: "Receipt Parsing",
      description:
        "Parse retail receipts instantly for expense tracking and accounting automation.",
      badge: "Fast Setup",
    },
    {
      icon: CreditCard,
      title: "ID Card Reading",
      description:
        "Extract personal information from government-issued IDs and documents securely.",
      badge: "Secure",
    },
  ];

  const benefits = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description:
        "Process thousands of documents in seconds with our AI-powered extraction engine.",
      metric: "10x Faster",
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description:
        "Enterprise-grade security with end-to-end encryption for all your sensitive data.",
      metric: "99.9% Uptime",
    },
    {
      icon: Clock,
      title: "Save Time",
      description:
        "Reduce manual data entry by 95% and focus on what matters most to your business.",
      metric: "95% Time Saved",
    },
  ];

  const steps = [
    {
      icon: Upload,
      title: "Upload Documents",
      description:
        "Simply drag and drop your images or documents into our platform.",
    },
    {
      icon: Sparkles,
      title: "AI Processing",
      description:
        "Our advanced AI analyzes and extracts key information automatically.",
    },
    {
      icon: Download,
      title: "Get Results",
      description:
        "Download structured data in your preferred format (JSON, CSV, Excel).",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Finance Manager",
      company: "TechCorp",
      content:
        "Digitize AI reduced our invoice processing time from hours to minutes. Game changer!",
      rating: 5,
    },
    {
      name: "Mike Chen",
      role: "Operations Director",
      company: "RetailPlus",
      content:
        "The accuracy is incredible. We've eliminated data entry errors completely.",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white font-sans">
      {/* Navigation - Dark theme with purple accents */}
      <nav className="border-b border-purple-900/40 bg-black/60 backdrop-blur-md sticky top-0 z-50 shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-purple-600 rounded-xl flex items-center justify-center animate-pulse">
              <div className="w-4 h-4 bg-white rounded-sm" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-white tracking-tight">
                Digitize AI
              </h1>
              <p className="text-xs text-purple-300">Extract & Process</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm">
            <a
              href="#features"
              className="text-gray-300 hover:text-white transition"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-gray-300 hover:text-white transition"
            >
              How it Works
            </a>
            <a
              href="#testimonials"
              className="text-gray-300 hover:text-white transition"
            >
              Reviews
            </a>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white hover:bg-gray-800"
            >
              <Menu className="h-4 w-4" />
            </Button>
            <Link to="/extraction">
              <Button className="bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-md hover:brightness-110">
                Get Started <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section - Dark theme */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="w-20 h-20 bg-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-8">
            <FileText className="w-10 h-10 text-white" />
          </div>

          <Badge className="mb-6 bg-purple-600/20 text-purple-300 border-purple-600/30 hover:bg-purple-600/30">
            <Sparkles className="w-3 h-3 mr-1" />
            Powered by Advanced AI
          </Badge>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 bg-clip-text text-transparent">
            Transform Documents
            <br />
            Into Structured Data
          </h1>

          <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-3xl mx-auto">
            Harness the power of AI to extract key information from invoices,
            receipts, IDs, and any document. Automate your data entry and boost
            productivity by 10x.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/extraction">
              <Button
                size="lg"
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-lg"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-gray-600 text-white hover:bg-gray-800 px-8 py-6 text-lg bg-transparent"
            >
              Watch Demo
            </Button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              No credit card required
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Free 14-day trial
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Cancel anytime
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Dark cards */}
      <section
        id="features"
        className="py-24 px-4 bg-gradient-to-b from-gray-900 via-black to-gray-900"
      >
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-purple-600/20 text-purple-300 border-purple-600/30">
              Features
            </Badge>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-white tracking-tight">
              Powerful Document Processing
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Extract data from any document type with industry-leading accuracy
              and speed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card
                  key={index}
                  className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700 hover:scale-[1.025] hover:border-purple-500/60 hover:shadow-xl transition-all duration-300 rounded-2xl"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center shadow-inner">
                        <IconComponent className="w-6 h-6 text-purple-400" />
                      </div>
                      <Badge className="bg-purple-600/20 text-purple-300 border-purple-600/30">
                        {feature.badge}
                      </Badge>
                    </div>
                    <CardTitle className="text-white text-xl font-semibold tracking-tight">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-400 text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section - Dark theme */}
      <section className="py-24 px-4 bg-gradient-to-b from-gray-900 via-black to-gray-900">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <Badge className="mb-5 bg-purple-700/10 text-purple-300 border-purple-600/30">
              Benefits
            </Badge>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-white">
              Why Choose Digitize AI?
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Built for modern businesses that demand speed, security, and
              precision.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div
                  key={index}
                  className="text-center group bg-gray-800/40 hover:bg-gray-800/60 transition-all duration-300 rounded-2xl p-8 shadow-lg hover:shadow-purple-700/20"
                >
                  <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 transform group-hover:scale-110 transition-transform">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <Badge className="mb-4 bg-purple-600/20 text-purple-300 border-purple-600/30">
                    {benefit.metric}
                  </Badge>
                  <h3 className="text-2xl font-bold mb-3 text-white tracking-tight">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-400 text-lg leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section - Dark theme */}
      <section id="how-it-works" className="py-20 px-4 bg-gray-900/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-purple-600/20 text-purple-300 border-purple-600/30">
              Process
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              How It Works
            </h2>
            <p className="text-xl text-gray-400">
              Get started in just 3 simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <Card
                  key={index}
                  className="bg-gray-800/50 border-gray-700 hover:border-purple-500/50 text-center transition-all duration-300"
                >
                  <CardHeader>
                    <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                      <IconComponent className="w-8 h-8 text-white" />
                      <Badge className="absolute -top-2 -right-2 w-8 h-8 rounded-full p-0 flex items-center justify-center bg-purple-500 text-white border-0">
                        {index + 1}
                      </Badge>
                    </div>
                    <CardTitle className="text-2xl text-white">
                      {step.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-400 text-lg">
                      {step.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section - Dark theme */}
      <section id="testimonials" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-purple-600/20 text-purple-300 border-purple-600/30">
              Testimonials
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              What Our Customers Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="bg-gray-800/50 border-gray-700 hover:border-purple-500/50 transition-all duration-300"
              >
                <CardHeader>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <CardDescription className="text-gray-300 text-base italic">
                    "{testimonial.content}"
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-600/20 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-purple-300">
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-white">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-gray-400">
                        {testimonial.role} at {testimonial.company}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Dark theme */}
      <section className="py-20 px-4 bg-gray-900/50">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
            Ready to Transform Your
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
              Document Processing?
            </span>
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Join thousands of businesses already using Digitize AI to automate
            their data extraction workflows.
          </p>
          <Link to="/extraction">
            <Button
              size="lg"
              className="bg-purple-600 hover:bg-purple-700 text-white px-12 py-6 text-xl mb-4"
            >
              Get Started Now
              <ArrowRight className="w-6 h-6 ml-3" />
            </Button>
          </Link>
          <p className="text-sm text-gray-500">
            Start your free trial today • No setup fees • Cancel anytime
          </p>
        </div>
      </section>

      {/* Footer - Dark theme */}
      <footer className="border-t border-gray-800 py-12 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between mb-8">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-sm"></div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Digitize AI</h1>
                <p className="text-xs text-gray-400">Extract & Process</p>
              </div>
            </div>

            <div className="flex items-center gap-8 text-sm text-gray-400">
              <Button
                variant="link"
                className="p-0 h-auto text-gray-400 hover:text-white"
              >
                Privacy Policy
              </Button>
              <Button
                variant="link"
                className="p-0 h-auto text-gray-400 hover:text-white"
              >
                Terms of Service
              </Button>
              <Button
                variant="link"
                className="p-0 h-auto text-gray-400 hover:text-white"
              >
                Contact
              </Button>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-500">
            <p>&copy; 2024 Digitize AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
