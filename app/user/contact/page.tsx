import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Phone, Mail, Clock, Users, MessageSquare, Send } from 'lucide-react';

export default function ContactPage() {
  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6 text-[#3B82F6]" />,
      title: "Office Location",
      details: [
        "Student Council Building, Room 201",
        "University Campus, Main Street",
        "City, State 12345"
      ]
    },
    {
      icon: <Phone className="w-6 h-6 text-[#3B82F6]" />,
      title: "Phone Numbers",
      details: [
        "Main Office: +62 123 456 789",
        "Student Affairs: +62 123 456 790", 
        "Emergency: +62 123 456 791"
      ]
    },
    {
      icon: <Mail className="w-6 h-6 text-[#3B82F6]" />,
      title: "Email Addresses",
      details: [
        "General Inquiries: info@bem.university.edu",
        "Student Affairs: affairs@bem.university.edu",
        "Events: events@bem.university.edu"
      ]
    },
    {
      icon: <Clock className="w-6 h-6 text-[#3B82F6]" />,
      title: "Office Hours",
      details: [
        "Monday - Friday: 8:00 AM - 5:00 PM",
        "Saturday: 9:00 AM - 2:00 PM",
        "Sunday: Closed"
      ]
    }
  ];

  const departments = [
    {
      name: "Academic Affairs",
      head: "Sarah Johnson",
      email: "academic@bem.university.edu",
      phone: "+62 123 456 792",
      description: "Handles academic policies, curriculum feedback, and student academic concerns."
    },
    {
      name: "Student Welfare",
      head: "Michael Chen",
      email: "welfare@bem.university.edu", 
      phone: "+62 123 456 793",
      description: "Addresses student life, health services, and accommodation issues."
    },
    {
      name: "Events & Activities",
      head: "Emily Rodriguez",
      email: "events@bem.university.edu",
      phone: "+62 123 456 794",
      description: "Organizes campus events, cultural activities, and student programs."
    },
    {
      name: "Finance & Administration",
      head: "David Kim",
      email: "admin@bem.university.edu",
      phone: "+62 123 456 795",
      description: "Manages finances, administrative processes, and resource allocation."
    }
  ];

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get in touch with us for any questions, suggestions, or concerns. 
            We're here to help and listen to our student community.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center">
                  <MessageSquare className="w-6 h-6 mr-2 text-[#3B82F6]" />
                  Send us a Message
                </CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="Enter your first name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Enter your last name" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="your.email@university.edu" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="studentId">Student ID (Optional)</Label>
                  <Input id="studentId" placeholder="Enter your student ID" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Inquiry</SelectItem>
                      <SelectItem value="academic">Academic Affairs</SelectItem>
                      <SelectItem value="welfare">Student Welfare</SelectItem>
                      <SelectItem value="events">Events & Activities</SelectItem>
                      <SelectItem value="admin">Finance & Administration</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="Brief description of your inquiry" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Please provide details about your inquiry or concern..." 
                    rows={6}
                  />
                </div>

                <Button className="w-full bg-[#3B82F6] hover:bg-[#2563EB]">
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Details */}
            <div className="grid grid-cols-1 gap-6">
              {contactInfo.map((info, index) => (
                <Card key={index}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center">
                      {info.icon}
                      <span className="ml-3">{info.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-1">
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-gray-600">{detail}</p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Department Contacts */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Department Contacts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {departments.map((dept, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">{dept.name}</CardTitle>
                      <div className="flex items-center text-sm text-gray-600 mt-1">
                        <Users className="w-4 h-4 mr-1 text-[#3B82F6]" />
                        Head: {dept.head}
                      </div>
                    </div>
                  </div>
                  <CardDescription className="mt-3">
                    {dept.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center text-gray-600">
                    <Mail className="w-4 h-4 mr-2 text-[#3B82F6]" />
                    <span className="text-sm">{dept.email}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Phone className="w-4 h-4 mr-2 text-[#3B82F6]" />
                    <span className="text-sm">{dept.phone}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <Card className="bg-gradient-to-r from-[#3B82F6] to-[#2563EB] text-white">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl mb-2">Frequently Asked Questions</CardTitle>
              <CardDescription className="text-white/90">
                Common questions and quick answers to help you find what you're looking for.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">How can I submit a complaint or suggestion?</h4>
                  <p className="text-white/90 text-sm mb-4">
                    You can use the contact form above, visit our office during business hours, 
                    or send an email to our general inquiries address.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">What is the typical response time?</h4>
                  <p className="text-white/90 text-sm mb-4">
                    We typically respond to inquiries within 24-48 hours during business days. 
                    Urgent matters are addressed as soon as possible.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Can I schedule a meeting with an officer?</h4>
                  <p className="text-white/90 text-sm mb-4">
                    Yes, you can request a meeting by contacting the relevant department 
                    or visiting our office during office hours.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">How do I report an issue anonymously?</h4>
                  <p className="text-white/90 text-sm mb-4">
                    You can submit anonymous feedback through our suggestion box located 
                    in the student center or use our online anonymous reporting system.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}