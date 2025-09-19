import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Calendar, Clock, MapPin, Users, AlertCircle, Info, CheckCircle, Bell } from 'lucide-react';

export default function AnnouncementsPage() {
  const announcements = [
    {
      id: 1,
      title: "Spring Semester Final Exams Schedule Released",
      content: "The final examination schedule for Spring 2024 semester has been published. All students are advised to check their exam dates and locations on the student portal.",
      type: "academic",
      priority: "high",
      publishDate: "March 20, 2024",
      deadline: "May 15, 2024",
      author: "Academic Affairs Office",
      location: "Various Exam Halls",
      category: "Academic"
    },
    
    {
      id: 2,
      title: "Summer Internship Application Deadline Extended",
      content: "Due to popular demand, the application deadline for summer internship programs has been extended to April 5, 2024. Don't miss this opportunity to gain valuable work experience.",
      type: "opportunity",
      priority: "medium",
      publishDate: "March 18, 2024", 
      deadline: "April 5, 2024",
      author: "Career Services",
      category: "Career"
    },
    {
      id: 3,
      title: "Campus WiFi Maintenance Scheduled",
      content: "Network maintenance will be performed on March 25, 2024, from 2:00 AM to 6:00 AM. Internet connectivity may be intermittent during this period.",
      type: "maintenance",
      priority: "medium",
      publishDate: "March 17, 2024",
      deadline: "March 25, 2024",
      author: "IT Services",
      category: "Technical"
    },
    {
      id: 4,
      title: "Annual Cultural Festival - Call for Participants",
      content: "Registration is now open for the Annual Cultural Festival 2024. Students can participate in various categories including music, dance, drama, and art competitions.",
      type: "event",
      priority: "high",
      publishDate: "March 15, 2024",
      deadline: "April 10, 2024",
      author: "Student Activities",
      location: "Main Campus Grounds",
      category: "Event"
    },
    {
      id: 5,
      title: "Library Extended Hours During Exam Period",
      content: "The library will extend its operating hours during the final exam period (May 1-15). It will be open 24/7 to support students' study needs.",
      type: "service",
      priority: "low",
      publishDate: "March 12, 2024",
      deadline: "May 15, 2024",
      author: "Library Services",
      location: "Main Library",
      category: "Academic"
    },
    {
      id: 6,
      title: "Health Insurance Enrollment Deadline",
      content: "All students must enroll in the university health insurance plan by March 30, 2024. Late enrollments will incur additional fees.",
      type: "requirement",
      priority: "high",
      publishDate: "March 10, 2024",
      deadline: "March 30, 2024", 
      author: "Student Health Services",
      category: "Health"
    },
    {
      id: 7,
      title: "Guest Lecture Series: Innovation in Technology",
      content: "Join us for an exciting guest lecture series featuring industry leaders discussing the latest innovations in technology and their impact on society.",
      type: "event",
      priority: "medium",
      publishDate: "March 8, 2024",
      deadline: "March 22, 2024",
      author: "Engineering Department",
      location: "Auditorium A",
      category: "Academic"
    },
    {
      id: 8,
      title: "Parking Permit Renewal Notice",
      content: "All campus parking permits expire on March 31, 2024. Students must renew their permits before the deadline to avoid parking violations.",
      type: "requirement",
      priority: "medium",
      publishDate: "March 5, 2024",
      deadline: "March 31, 2024",
      author: "Campus Security",
      category: "Administrative"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityIcon = (type: string) => {
    switch (type) {
      case 'academic': return <CheckCircle className="w-4 h-4" />;
      case 'maintenance': return <AlertCircle className="w-4 h-4" />;
      case 'event': return <Bell className="w-4 h-4" />;
      default: return <Info className="w-4 h-4" />;
    }
  };

  const urgentAnnouncements = announcements.filter(a => a.priority === 'high');
  const regularAnnouncements = announcements.filter(a => a.priority !== 'high');

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Announcements & Updates</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay informed with the latest university announcements, important deadlines, 
            event notifications, and campus updates.
          </p>
        </div>

        {/* Urgent Announcements */}
        {urgentAnnouncements.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <AlertCircle className="w-6 h-6 mr-2 text-red-500" />
              Urgent Announcements
            </h2>
            <div className="space-y-4">
              {urgentAnnouncements.map((announcement) => (
                <Alert key={announcement.id} className="border-red-200 bg-red-50">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <AlertTitle className="text-red-800 font-semibold">
                    {announcement.title}
                  </AlertTitle>
                  <AlertDescription className="text-red-700 mt-2">
                    {announcement.content}
                  </AlertDescription>
                  <div className="flex flex-wrap gap-4 mt-3 text-sm text-red-600">
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      Deadline: {announcement.deadline}
                    </span>
                    <span className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {announcement.author}
                    </span>
                  </div>
                </Alert>
              ))}
            </div>
          </div>
        )}

        {/* Regular Announcements */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">All Announcements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {announcements.map((announcement) => (
              <Card key={announcement.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`w-2 h-2 rounded-full ${getPriorityColor(announcement.priority)}`}></div>
                        <Badge 
                          variant="secondary" 
                          className="bg-[#3B82F6]/10 text-[#3B82F6] flex items-center gap-1"
                        >
                          {getPriorityIcon(announcement.type)}
                          {announcement.category}
                        </Badge>
                        <Badge 
                          variant="outline"
                          className={`capitalize ${
                            announcement.priority === 'high' ? 'border-red-300 text-red-600' :
                            announcement.priority === 'medium' ? 'border-yellow-300 text-yellow-600' :
                            'border-green-300 text-green-600'
                          }`}
                        >
                          {announcement.priority} priority
                        </Badge>
                      </div>
                      <CardTitle className="text-lg leading-tight hover:text-[#3B82F6] transition-colors cursor-pointer">
                        {announcement.title}
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-700 mb-4 leading-relaxed">
                    {announcement.content}
                  </CardDescription>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-[#3B82F6]" />
                      <span className="mr-4">Published: {announcement.publishDate}</span>
                    </div>
                    {announcement.deadline && (
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2 text-[#3B82F6]" />
                        <span className="mr-4">Deadline: {announcement.deadline}</span>
                      </div>
                    )}
                    {announcement.location && (
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2 text-[#3B82F6]" />
                        <span className="mr-4">Location: {announcement.location}</span>
                      </div>
                    )}
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2 text-[#3B82F6]" />
                      <span>By: {announcement.author}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Subscription Notice */}
        <div className="mt-16">
          <Card className="bg-gradient-to-r from-[#3B82F6] to-[#2563EB] text-white text-center">
            <CardHeader>
              <CardTitle className="text-2xl mb-2 flex items-center justify-center">
                <Bell className="w-6 h-6 mr-2" />
                Stay Updated
              </CardTitle>
              <CardDescription className="text-white/90 text-lg">
                Never miss important announcements! Subscribe to our notification service.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-white/90 mb-4">
                Get instant notifications for urgent announcements, deadline reminders, 
                and important campus updates directly to your email or mobile device.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div>
                  <CheckCircle className="w-8 h-8 mx-auto mb-2" />
                  <h4 className="font-semibold">Email Notifications</h4>
                  <p className="text-sm text-white/80">Daily digest of announcements</p>
                </div>
                <div>
                  <Bell className="w-8 h-8 mx-auto mb-2" />
                  <h4 className="font-semibold">Push Notifications</h4>
                  <p className="text-sm text-white/80">Instant urgent updates</p>
                </div>
                <div>
                  <Calendar className="w-8 h-8 mx-auto mb-2" />
                  <h4 className="font-semibold">Calendar Integration</h4>
                  <p className="text-sm text-white/80">Automatic deadline reminders</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}