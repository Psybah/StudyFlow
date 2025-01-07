import { Link } from "react-router-dom";
import { BookOpen, Users, Clock, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-background-darker">
              Study Smarter,
              <br />
              Achieve More
            </h1>
            <p className="text-lg md:text-xl mb-8 text-background-darker/80">
              Join thousands of Nigerian students who are transforming their
              academic journey with StudyFlow's smart study tools and
              collaboration features.
            </p>
            <div className="flex flex-col md:flex-row gap-4">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Start Your Study Plan
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10"
              >
                Watch Demo
              </Button>
            </div>
          </div>
          <div className="hidden md:block">
            <img
              src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7"
              alt="Student studying"
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why Choose StudyFlow?
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: <BookOpen className="h-8 w-8" />,
                title: "Smart Study Plans",
                description:
                  "Personalized study schedules that adapt to your learning style",
              },
              {
                icon: <Users className="h-8 w-8" />,
                title: "Collaborative Learning",
                description:
                  "Connect with peers and form study groups for better understanding",
              },
              {
                icon: <Clock className="h-8 w-8" />,
                title: "Time Management",
                description:
                  "Track your study hours and maintain a healthy study-life balance",
              },
              {
                icon: <Check className="h-8 w-8" />,
                title: "Progress Tracking",
                description:
                  "Monitor your improvement with detailed analytics and insights",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-lg bg-white/10 backdrop-blur-sm"
              >
                <div className="inline-block p-3 rounded-full bg-secondary mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-primary-foreground/80">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-background-darker">
            Ready to Transform Your Study Habits?
          </h2>
          <p className="text-lg mb-8 text-background-darker/80">
            Join thousands of students already using StudyFlow to achieve their
            academic goals.
          </p>
          <Button
            size="lg"
            className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
          >
            Get Started Now
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;