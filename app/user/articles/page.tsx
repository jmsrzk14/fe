import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, User, ArrowRight, BookOpen, TrendingUp } from 'lucide-react';

export default function ArticlesPage() {
  const articles = [
    {
      id: 1,
      title: "Building Leadership Skills in University: A Comprehensive Guide",
      excerpt: "Discover practical strategies for developing essential leadership qualities during your academic journey and beyond.",
      author: "Sarah Johnson",
      publishDate: "March 18, 2024",
      readTime: "8 min read",
      category: "Leadership",
      featured: true,
      image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop"
    },
    {
      id: 2,
      title: "The Impact of Student Organizations on Academic Success",
      excerpt: "Research shows how active participation in student organizations contributes to better academic outcomes and personal growth.",
      author: "Michael Chen",
      publishDate: "March 15, 2024",
      readTime: "6 min read",
      category: "Academic",
      featured: false,
      image: "https://images.pexels.com/photos/1181533/pexels-photo-1181533.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop"
    },
    {
      id: 3,
      title: "Mental Health Resources for University Students",
      excerpt: "A comprehensive overview of available mental health support services and self-care strategies for students.",
      author: "Dr. Emily Rodriguez",
      publishDate: "March 12, 2024",
      readTime: "10 min read",
      category: "Wellness",
      featured: false,
      image: "https://images.pexels.com/photos/3771115/pexels-photo-3771115.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop"
    },
    {
      id: 4,
      title: "Sustainable Campus Initiatives: Students Leading Change",
      excerpt: "How student-led environmental initiatives are making a real difference in creating a more sustainable campus.",
      author: "David Kim",
      publishDate: "March 10, 2024",
      readTime: "7 min read",
      category: "Environment",
      featured: false,
      image: "https://images.pexels.com/photos/2990644/pexels-photo-2990644.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop"
    },
    {
      id: 5,
      title: "Career Preparation: Networking Tips for University Students",
      excerpt: "Essential networking strategies to help students build professional connections and advance their career prospects.",
      author: "Lisa Wang",
      publishDate: "March 8, 2024",
      readTime: "9 min read",
      category: "Career",
      featured: false,
      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop"
    },
    {
      id: 6,
      title: "Digital Innovation in Student Services",
      excerpt: "Exploring how technology is transforming student services and creating more efficient campus experiences.",
      author: "Alex Thompson",
      publishDate: "March 5, 2024",
      readTime: "5 min read",
      category: "Technology",
      featured: false,
      image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop"
    }
  ];

  const categories = ["All", "Leadership", "Academic", "Wellness", "Environment", "Career", "Technology"];
  const featuredArticle = articles.find(article => article.featured);
  const regularArticles = articles.filter(article => !article.featured);

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Student Articles & Insights</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore thought-provoking articles written by students and faculty members covering topics 
            from academic success to personal development and campus life.
          </p>
        </div>

        {/* Featured Article */}
        {featuredArticle && (
          <div className="mb-16">
            <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <div className="relative">
                  <img
                    src={featuredArticle.image}
                    alt={featuredArticle.title}
                    className="w-full h-64 lg:h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-[#3B82F6]/90 backdrop-blur-sm text-white">
                      Featured Article
                    </Badge>
                  </div>
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <Badge className="w-fit mb-4 bg-[#3B82F6]/10 text-[#3B82F6]">
                    {featuredArticle.category}
                  </Badge>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4 hover:text-[#3B82F6] transition-colors cursor-pointer">
                    {featuredArticle.title}
                  </h2>
                  <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                    {featuredArticle.excerpt}
                  </p>
                  <div className="flex items-center text-gray-500 mb-6">
                    <User className="w-4 h-4 mr-2" />
                    <span className="mr-4">{featuredArticle.author}</span>
                    <Calendar className="w-4 h-4 mr-2" />
                    <span className="mr-4">{featuredArticle.publishDate}</span>
                    <BookOpen className="w-4 h-4 mr-2" />
                    <span>{featuredArticle.readTime}</span>
                  </div>
                  <Button className="w-fit bg-[#3B82F6] hover:bg-[#2563EB]">
                    Read Full Article
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}

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

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {regularArticles.map((article) => (
            <Card key={article.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="relative overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-[#3B82F6]/90 backdrop-blur-sm text-white">
                    {article.category}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-6">
                <CardTitle className="text-xl mb-3 group-hover:text-[#3B82F6] transition-colors cursor-pointer line-clamp-2">
                  {article.title}
                </CardTitle>
                <CardDescription className="mb-4 text-gray-600 line-clamp-3">
                  {article.excerpt}
                </CardDescription>
                <div className="flex items-center text-gray-500 text-sm mb-4">
                  <User className="w-4 h-4 mr-1" />
                  <span className="mr-3">{article.author}</span>
                  <Calendar className="w-4 h-4 mr-1" />
                  <span className="mr-3">{article.publishDate}</span>
                  <BookOpen className="w-4 h-4 mr-1" />
                  <span>{article.readTime}</span>
                </div>
                <Button variant="ghost" className="p-0 h-auto text-[#3B82F6] hover:text-[#2563EB] font-medium">
                  Read More
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats & Call to Action */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Stats */}
          <Card className="bg-gradient-to-r from-[#3B82F6] to-[#2563EB] text-white">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center">
                <TrendingUp className="w-6 h-6 mr-2" />
                Article Impact
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-3xl font-bold mb-1">50+</div>
                  <div className="text-white/90">Published Articles</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-1">15K+</div>
                  <div className="text-white/90">Total Reads</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-1">25</div>
                  <div className="text-white/90">Contributing Authors</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-1">8</div>
                  <div className="text-white/90">Categories Covered</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Call to Action */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Contribute to Our Blog</CardTitle>
              <CardDescription>
                Have insights to share? We welcome submissions from students, faculty, and staff.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                Share your experiences, research findings, or thoughts on student life. 
                Help build a knowledge base that benefits the entire university community.
              </p>
              <div className="space-y-2">
                <h4 className="font-semibold">Submission Guidelines:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Original content, 800-2000 words</li>
                  <li>• Relevant to student life or academic topics</li>
                  <li>• Well-researched and properly cited</li>
                  <li>• Include author bio and contact information</li>
                </ul>
              </div>
              <Button className="bg-[#3B82F6] hover:bg-[#2563EB]">
                Submit an Article
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}