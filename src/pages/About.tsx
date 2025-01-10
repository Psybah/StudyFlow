import { Heart, BookOpen, Flag, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const About = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">About StudyFlow</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Revolutionizing study workflows for Nigerian students through smart planning, 
          collaboration, and personalized learning experiences.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <div className="space-y-4">
          <h2 className="text-3xl font-semibold mb-6">Our Mission</h2>
          <p className="text-lg leading-relaxed">
            At StudyFlow, we're committed to helping students learn smarter, not harder. 
            We understand the unique challenges faced by Nigerian students and have built 
            a platform that addresses time management, resource access, and collaborative learning needs.
          </p>
        </div>
        <div className="relative h-[300px] rounded-lg overflow-hidden">
          <img 
            src="/UI.jpg"
            alt="Students using StudyFlow"
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <Card className="bg-background-darker text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-6 w-6 text-secondary" />
              Our Vision
            </CardTitle>
          </CardHeader>
          <CardContent>
            To be the go-to platform for organized and motivated learning in Nigeria.
          </CardContent>
        </Card>

        <Card className="bg-background-darker text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-secondary" />
              Smart Learning
            </CardTitle>
          </CardHeader>
          <CardContent>
            Personalized study plans and resources tailored to your learning style.
          </CardContent>
        </Card>

        <Card className="bg-background-darker text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Flag className="h-6 w-6 text-secondary" />
              Nigerian Focus
            </CardTitle>
          </CardHeader>
          <CardContent>
            Built specifically for Nigerian students, addressing local educational challenges.
          </CardContent>
        </Card>

        <Card className="bg-background-darker text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-6 w-6 text-secondary" />
              Community
            </CardTitle>
          </CardHeader>
          <CardContent>
            Join a growing community of motivated learners across Nigeria.
          </CardContent>
        </Card>
      </div>

      <div className="text-center">
        <h2 className="text-3xl font-semibold mb-8">Our Team</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          StudyFlow was created by a passionate team of educators, developers, and 
          students who understand the challenges of education in Nigeria. Together, 
          we're building tools that make learning more effective.
        </p>
      </div>
    </div>
  );
};

export default About;