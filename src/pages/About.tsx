
import { useState, useEffect } from 'react';
import API from "@/lib/api"; // <-- our axios wrapper
import { ChevronDown, Users, Globe, Zap, MessageCircle, X, Github, Linkedin, Twitter, MapPin, Network, ShoppingBag, Smartphone } from 'lucide-react';

const About = () => {
  const [selectedTeamMember, setSelectedTeamMember] = useState(null);
  const [messageForm, setMessageForm] = useState({ name: '', email: '', message: '' });

  const teamMembers_old = [
    {
      id: 1,
      name: "Anup Pai",
      role: "Founder",
      description: "Anup is a visionary entrepreneur and the driving force behind eSamudaay. With deep expertise in digital infrastructure, Anup leads the mission to enable decentralized local commerce ecosystems across India.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Ritika Sharma",
      role: "Chief Operations Officer",
      description: "Ritika is passionate about operational efficiency and local empowerment. She works with community partners and sellers to ensure a smooth onboarding experience and impactful engagement.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Mohammed Irfan",
      role: "Tech Lead",
      description: "Irfan is the architect behind our tech engine. With years of experience in scalable platforms, he ensures our technology is robust, secure, and aligned with the needs of small enterprises.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face"
    },
    {
      id: 4,
      name: "Sonal Mehta",
      role: "Community Manager",
      description: "Sonal builds and nurtures relationships with grassroots communities, helping them adopt digital tools with ease. She's the heart of our user engagement and feedback loop.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face"
    }
  ];

  interface TeamMember {
    id: number;
    name: string;
    email: string;
    image: string;
    role: string;
    bio: string;
  }

  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await API.get('/api/team-members');
        setTeamMembers(response.data);
      } catch (error) {
        console.error('Error fetching team members:', error);
      }
    };

    fetchTeamMembers();
  }, []);

  const techStack = [
    { name: "React", icon: "⚛️" },
    { name: "Node.js", icon: "🟢" },
    { name: "Web3", icon: "🔗" },
    { name: "Local APIs", icon: "📍" },
    { name: "Payment Gateway", icon: "💳" },
    { name: "Cloud Infrastructure", icon: "☁️" },
    { name: "Mobile SDKs", icon: "📱" },
    { name: "Analytics", icon: "📊" }
  ];

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    console.log('Message sent to:', selectedTeamMember.name, messageForm);
    setMessageForm({ name: '', email: '', message: '' });
    setSelectedTeamMember(null);
  };

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-purple-50 text-gray-800 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-100/30 to-purple-100/30"></div>
        
        {/* Floating 3D Elements with new color palette */}
        <div className="absolute top-20 left-10 w-16 h-16 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full animate-bounce delay-1000 opacity-20"></div>
        <div className="absolute top-40 right-20 w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg rotate-45 animate-pulse opacity-20"></div>
        <div className="absolute bottom-40 left-20 w-20 h-20 bg-gradient-to-r from-orange-400 to-purple-600 rounded-full animate-float opacity-20"></div>
        
        <div className="max-w-6xl mx-auto text-center z-10">
          {/* Logo Section */}
          <div className="mb-12">
            <img 
              src="/lovable-uploads/c4069bf7-facd-489e-9685-a7accf3eca49.png" 
              alt="eSamudaay Logo" 
              className="h-20 md:h-24 mx-auto mb-8 animate-scale-in"
            />
          </div>
          
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent leading-tight">
              About eSamudaay
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We're building the infrastructure that connects local businesses with digital opportunities, 
              creating a decentralized economy that empowers communities across India.
            </p>
          </div>
          
          {/* 3D Illustration Placeholder */}
          <div className="relative mb-12">
            <div className="w-80 h-80 mx-auto relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 via-pink-500/20 to-purple-600/20 rounded-full animate-pulse"></div>
              <div className="absolute inset-4 bg-white/50 backdrop-blur-sm rounded-full flex items-center justify-center">
                <div className="grid grid-cols-3 gap-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-pink-500 rounded-lg transform rotate-12 animate-float"></div>
                  <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full animate-bounce delay-500"></div>
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-purple-600 rounded-lg transform -rotate-12 animate-float delay-1000"></div>
                  <Network className="w-8 h-8 text-pink-500 animate-pulse" />
                  <ShoppingBag className="w-12 h-12 text-purple-600 animate-bounce" />
                  <MapPin className="w-8 h-8 text-orange-500 animate-pulse delay-700" />
                  <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg transform rotate-45 animate-float delay-300"></div>
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full animate-bounce delay-1200"></div>
                  <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg transform -rotate-45 animate-float delay-800"></div>
                </div>
              </div>
            </div>
          </div>
          
          <button 
            onClick={() => scrollToSection('mission')}
            className="group flex items-center justify-center mx-auto bg-white/80 backdrop-blur-sm hover:bg-gradient-to-r hover:from-orange-500 hover:to-purple-600 hover:text-white transition-all duration-300 px-8 py-4 rounded-full shadow-lg hover:shadow-xl"
          >
            <span className="mr-2 font-medium">Learn More About Us</span>
            <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                We believe in the power of local communities and the potential of digital technology. 
                Our mission is to bridge the gap between traditional commerce and modern digital infrastructure, 
                creating opportunities for local businesses to thrive in the digital economy.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800">Decentralized Economy</h3>
                    <p className="text-gray-600">Building networks that empower local businesses</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                    <ShoppingBag className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800">Local First Commerce</h3>
                    <p className="text-gray-600">Prioritizing community needs and local solutions</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-purple-600 rounded-full flex items-center justify-center">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800">Digital Empowerment</h3>
                    <p className="text-gray-600">Providing tools and technology for growth</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 3D Illustration */}
            <div className="relative">
              <div className="w-full h-96 bg-white/60 backdrop-blur-sm rounded-3xl shadow-2xl p-8 relative overflow-hidden border border-white/50">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-400/5 via-pink-500/5 to-purple-600/5 rounded-3xl"></div>
                <div className="relative z-10 h-full flex items-center justify-center">
                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl flex items-center justify-center transform hover:scale-110 transition-transform">
                        <Smartphone className="w-8 h-8 text-white" />
                      </div>
                      <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full animate-pulse"></div>
                    </div>
                    <div className="space-y-4 pt-8">
                      <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-purple-600 rounded-full animate-bounce"></div>
                      <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center transform hover:scale-110 transition-transform">
                        <Users className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 px-4 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent">Our Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet the people shaping the future of local digital commerce
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div key={member.id} className="group">
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-white/50">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden ring-4 ring-pink-200 group-hover:ring-purple-300 transition-all">
                      <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                    </div>
                    <h3 className="text-xl font-bold bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent mb-1">
                      {member.name}
                    </h3>
                    <p className="text-pink-500 font-medium mb-3">{member.role}</p>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">{member.bio}</p>
                    <button
                      onClick={() => setSelectedTeamMember(member)}
                      className="w-full bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 hover:from-orange-600 hover:via-pink-600 hover:to-purple-700 text-white py-2 px-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 group-hover:scale-105"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Message</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent">Tech Stack & Platform</h2>
            <p className="text-xl text-gray-600">Powered by cutting-edge technology</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {techStack.map((tech, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-white/50 group">
                <div className="text-3xl mb-3">{tech.icon}</div>
                <h3 className="font-semibold bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent group-hover:from-pink-500 group-hover:to-purple-700 transition-all">{tech.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Want to be part of a local digital revolution?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join us in building the future of local commerce and community empowerment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105">
              Partner with Us
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-purple-600 px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105">
              Join the Movement
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-white border-t border-gray-200">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <img 
                src="/lovable-uploads/c4069bf7-facd-489e-9685-a7accf3eca49.png" 
                alt="eSamudaay Logo" 
                className="h-12 mb-4"
              />
              <p className="text-gray-600">Empowering local commerce through digital innovation.</p>
            </div>
            <div>
              <h4 className="font-semibold bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent mb-4">Quick Links</h4>
              <div className="space-y-2">
                <a href="#" className="block text-gray-600 hover:text-purple-600 transition-colors">Home</a>
                <a href="#team" className="block text-gray-600 hover:text-purple-600 transition-colors">Team</a>
                <a href="#" className="block text-gray-600 hover:text-purple-600 transition-colors">Careers</a>
                <a href="#" className="block text-gray-600 hover:text-purple-600 transition-colors">Contact</a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent mb-4">Connect</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors">
                  <Twitter className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors">
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors">
                  <Github className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-600">
            <p>&copy; 2024 eSamudaay. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Message Modal */}
      {selectedTeamMember && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl transform animate-scale-in">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent">
                Message {selectedTeamMember.name}
              </h3>
              <button 
                onClick={() => setSelectedTeamMember(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleMessageSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                <input 
                  type="text"
                  value={messageForm.name}
                  onChange={(e) => setMessageForm({...messageForm, name: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input 
                  type="email"
                  value={messageForm.email}
                  onChange={(e) => setMessageForm({...messageForm, email: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea 
                  value={messageForm.message}
                  onChange={(e) => setMessageForm({...messageForm, message: e.target.value})}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all resize-none"
                  required
                />
              </div>
              <div className="flex space-x-4">
                <button 
                  type="button"
                  onClick={() => setSelectedTeamMember(null)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white rounded-xl hover:from-orange-600 hover:via-pink-600 hover:to-purple-700 transition-all"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default About;
