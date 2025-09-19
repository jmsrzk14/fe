import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Users, MapPin } from 'lucide-react';

export default function GalleryPage() {
  const galleryItems = [
    {
      id: 1,
      title: "Academic Year Opening Ceremony 2024",
      category: "Event",
      date: "March 15, 2024",
      location: "Main Auditorium",
      attendees: "500+",
      image: "https://images.pexels.com/photos/1153213/pexels-photo-1153213.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      description: "Grand opening ceremony welcoming new and returning students"
    },
    {
      id: 2,
      title: "Student Leadership Workshop",
      category: "Workshop",
      date: "March 10, 2024", 
      location: "Conference Hall",
      attendees: "120",
      image: "https://images.pexels.com/photos/1181533/pexels-photo-1181533.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      description: "Intensive leadership training for student representatives"
    },
    {
      id: 3,
      title: "Campus Innovation Fair",
      category: "Exhibition",
      date: "March 8, 2024",
      location: "Student Center",
      attendees: "300+",
      image: "https://images.pexels.com/photos/1153198/pexels-photo-1153198.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      description: "Showcasing innovative projects and entrepreneurial ideas"
    },
    {
      id: 4,
      title: "Cultural Festival 2024",
      category: "Festival",
      date: "February 20, 2024",
      location: "Campus Grounds", 
      attendees: "800+",
      image: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      description: "Celebrating diversity through arts, music, and cultural performances"
    },
    {
      id: 5,
      title: "Community Service Day",
      category: "Community",
      date: "February 15, 2024",
      location: "Local Community",
      attendees: "200",
      image: "https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      description: "Students volunteering for community development projects"
    },
    {
      id: 6,
      title: "Academic Excellence Awards",
      category: "Awards",
      date: "February 10, 2024",
      location: "Main Hall",
      attendees: "400",
      image: "https://images.pexels.com/photos/7516553/pexels-photo-7516553.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      description: "Recognizing outstanding academic achievements and contributions"
    },
    {
      id: 7,
      title: "Student Orientation Week",
      category: "Orientation",
      date: "January 15, 2024",
      location: "Multiple Venues",
      attendees: "600+",
      image: "https://images.pexels.com/photos/267507/pexels-photo-267507.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      description: "Welcoming new students and introducing campus life"
    },
    {
      id: 8,
      title: "Technology Summit 2024",
      category: "Conference",
      date: "January 12, 2024",
      location: "Tech Center",
      attendees: "250",
      image: "https://images.pexels.com/photos/1181316/pexels-photo-1181316.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      description: "Exploring latest trends in technology and innovation"
    },
    {
      id: 9,
      title: "Sports Championship",
      category: "Sports",
      date: "December 8, 2023",
      location: "Sports Complex",
      attendees: "400+",
      image: "https://images.pexels.com/photos/2834914/pexels-photo-2834914.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      description: "Annual inter-department sports competition"
    }
  ];

  const categories = ["All", "Event", "Workshop", "Exhibition", "Festival", "Community", "Awards", "Orientation", "Conference", "Sports"];

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Event Galery</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our vibrant campus life through photos from events, workshops, festivals, 
            and activities that showcase the dynamic student community.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={category === "All" ? "default" : "outline"}
              className={`cursor-pointer px-4 py-2 transition-colors ${
                category === "All"
                  ? "bg-[#3B82F6] hover:bg-[#2563EB]"
                  : "hover:bg-[#3B82F6]/10 hover:border-[#3B82F6] hover:text-[#3B82F6]"
              }`}
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryItems.map((item) => (
            <Card key={item.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-[#3B82F6]/90 backdrop-blur-sm">
                    {item.category}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-[#3B82F6] transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {item.description}
                </p>
                <div className="space-y-2">
                  <div className="flex items-center text-gray-500 text-sm">
                    <Calendar className="w-4 h-4 mr-2 text-[#3B82F6]" />
                    {item.date}
                  </div>
                  <div className="flex items-center text-gray-500 text-sm">
                    <MapPin className="w-4 h-4 mr-2 text-[#3B82F6]" />
                    {item.location}
                  </div>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Users className="w-4 h-4 mr-2 text-[#3B82F6]" />
                    {item.attendees} Attendees
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Statistics */}
        <div className="mt-16">
          <Card className="bg-gradient-to-r from-[#3B82F6] to-[#2563EB] text-white">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold mb-2">50+</div>
                  <div className="text-white/90">Events Organized</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">5,000+</div>
                  <div className="text-white/90">Total Participants</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">25</div>
                  <div className="text-white/90">Partner Organizations</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">100+</div>
                  <div className="text-white/90">Volunteer Hours</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}