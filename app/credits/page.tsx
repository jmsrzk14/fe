"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Github,
  Linkedin,
  Instagram,
  Code,
  Palette,
  Database,
  Sparkles,
  Users,
} from "lucide-react";

interface TeamMember {
  id: number;
  img: string;
  badgeImg?: string;
  name: string;
  role: string;
  description: string;
  contact?: {
    instagram?: string;
    github?: string;
    linkedin?: string;
  };
}

interface TeamCategory {
  title: string;
  icon: React.ReactNode;
  color: string;
  members: TeamMember[];
}

export default function TeamCreditsPage() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const Avatar: React.FC<{ member: TeamMember }> = ({ member }) => {
    const [src, setSrc] = useState<string>(member.img);
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
      <motion.div
        className="relative w-32 h-32 mx-auto"
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full animate-pulse blur-md opacity-50"></div>
        <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-gray-600 shadow-2xl ring-4 ring-gray-800/50">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-700 animate-pulse"></div>
          )}
          <img
            src={src}
            alt={`${member.name} avatar`}
            className={`object-cover w-full h-full transition-opacity duration-300 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setSrc("/avatars/default.png")}
          />
        </div>
      </motion.div>
    );
  };

  const teamCategories: TeamCategory[] = [
    {
      title: "Backend Development",
      icon: <Database className="w-8 h-8" />,
      color: "bg-blue-600",
      members: [
        {
          id: 1,
          img: "avatar/james.png",
          badgeImg: "/pakkail.png",
          name: "James Frans Rizky Tambunan",
          role: "Pakkail Member",
          description: "Information of Technology",
          contact: {
            instagram: "https://www.instagram.com/jmsrzk_14/",
            github: "https://github.com/jmsrzk14",
            linkedin: "http://www.linkedin.com/in/james-frans-rizky-tambunan",
          },
        },
        {
          id: 2,
          img: "avatar/andri.jpg",
          badgeImg: "/pakkail.png",
          name: "Andri Agung Exaudi Sigiro",
          role: "Pakkail Member",
          description: "Information of Technology",
          contact: {
            instagram: "https://www.instagram.com/andri_exaudi/",
            github: "https://github.com/AndriSigiro",
            linkedin: "https://www.linkedin.com/in/andri-sigiro-6620722b2",
          },
        },
        {
          id: 3,
          img: "/avatar/dicky.jpg",
          badgeImg: "/delpro.jpg",
          name: "Dicky J.D. Hutajulu",
          role: "Delpro Member",
          description: "Software Engineering",
          contact: {
            instagram: "https://www.instagram.com/dickyhutajulu_/",
            github: "https://github.com/dicky245",
            linkedin: "https://www.linkedin.com/in/dicky-hutajulu-85567b319/",
          },
        },
        {
          id: 4,
          img: "/avatar/andika.jpg",
          badgeImg: "/delpro.jpg",
          name: "Andika Bartolomeus Purba",
          role: "Delpro Member",
          description: "Software Engineering",
          contact: {
            instagram: "http://instagram.com/barthms.prb",
            github: "https://github.com/barthms",
            linkedin: "https://www.linkedin.com/in/andikaPurba",
          },
        },
      ],
    },
    {
      title: "Frontend Development",
      icon: <Code className="w-8 h-8" />,
      color: "bg-emerald-600",
      members: [
        {
          id: 5,
          img: "/avatar/pedro.png",
          badgeImg: "/pakkail.png",
          name: "Pedro Marcel Hutagaol",
          role: "Pakkail Leader",
          description: "Information of Technology",
          contact: {
            instagram: "https://www.instagram.com/supperpedrooo/",
            github: "https://github.com/CallMeMarcel",
            linkedin: "www.linkedin.com/in/pedro-marcel-hutagaol-92b2052b4",
          },
        },
        {
          id: 6,
          img: "/avatar/anno.jpg",
          badgeImg: "/pakkail.png",
          name: "Anno Deritman Siregar",
          role: "Pakkail Member",
          description: "Information of Technology",
          contact: {
            instagram: "https://www.instagram.com/siregaranno/",
            github: "https://github.com/aosy01",
            linkedin: "www.linkedin.com/in/anno-siregar-527247276",
          },
        },
        {
          id: 7,
          img: "/avatar/kevin.jpg",
          badgeImg: "/pakkail.png",
          name: "Kevin Christian B. Rumapea",
          role: "Pakkail Member",
          description: "Information of Technology",
          contact: {
            instagram: "https://www.instagram.com/kevin.rumapea/",
            github: "https://github.com/kevinrumapea",
            linkedin: "www.linkedin.com/in/kevin-christian-b-rumapea-9862622b7",
          },
        },
        {
          id: 8,
          img: "/avatar/andre.jpg",
          badgeImg: "/delpro.jpg",
          name: "Andrey Silalahi",
          role: "Delpro Member",
          description: "Software Engineering",
          contact: {
            instagram: "https://www.instagram.com/andre_silalahi_15/",
            github: "https://github.com/41424002",
            linkedin: "https://www.linkedin.com/in/andrey-silalahi-17853b388/",
          },
        },
      ],
    },
    {
      title: "UI/UX Design",
      icon: <Palette className="w-8 h-8" />,
      color: "bg-purple-600",
      members: [
        {
          id: 9,
          img: "/avatar/yoseva.jpg",
          badgeImg: "/delpro.jpg",
          name: "Grace Yosheva",
          role: "Delpro Member",
          description: "Network Management",
          contact: {
            instagram:
              "https://www.instagram.com/ssupwsheva18?igsh=MXh6NnRhbDl3YnYzYQ%3D%3D&utm_source=qr",
            github: "https://github.com/13323021GraceYosheva",
            linkedin: "https://www.linkedin.com/in/grace-yosheva/",
          },
        },
        {
          id: 10,
          img: "/avatar/sephine.jpg",
          badgeImg: "/delpro.jpg",
          name: "Grace Yosephine",
          role: "Delpro Member",
          description: "Software Engineering",
          contact: {
            instagram:
              "https://www.instagram.com/scsephine?igsh=ODFxa2pvN3g1cDVo&utm_source=qr",
            github: "https://github.com/GraceYosephine",
            linkedin: "www.linkedin.com/in/grace-yosephine-479233294",
          },
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-x-hidden">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="bg-gray-900/95 backdrop-blur-md border-b border-gray-800 sticky top-0 z-50 shadow-xl"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <motion.a
            href="/"
            whileHover={{ x: -5 }}
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Home</span>
          </motion.a>
        </div>
      </motion.nav>

      {/* Hero Section with Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          {/* Background Image Layer */}
          <motion.div
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <img
              src="/ourteam.jpg"
              alt="Our Team Background"
              className="w-full h-full object-cover"
              style={{ objectPosition: "center" }}
            />
          </motion.div>

          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 via-gray-900/70 to-gray-900"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-emerald-900/20"></div>

          {/* Animated Particles */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-blue-400/30 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 rounded-full border border-blue-500/30 mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <Users className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-blue-300 font-medium">
                Meet Our Amazing Team
              </span>
            </motion.div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6">
              <motion.span
                className="inline-block bg-gradient-to-r from-blue-400 via-emerald-400 to-purple-400 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["0%", "100%", "0%"],
                }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                Our Team
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8"
            >
              Meet the developers and designers behind BEM website.
              Built with passion and collaboration by{" "}
              <span className="text-blue-400 font-semibold">Pakkail</span> x{" "}
              <span className="text-emerald-400 font-semibold">Delpro</span>{" "}
              teams.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Team Categories Section */}
      <section className="relative py-20 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {teamCategories.map((category, categoryIdx) => (
              <motion.div
                key={categoryIdx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: categoryIdx * 0.1 }}
              >
                {/* Category Header */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                  <motion.div
                    className={`${category.color} p-4 rounded-xl shadow-2xl`}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    {category.icon}
                  </motion.div>
                  <div className="text-center sm:text-left">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                      {category.title}
                    </h2>
                    <motion.div
                      className={`h-1.5 ${category.color} rounded-full mx-auto sm:mx-0`}
                      initial={{ width: 0 }}
                      whileInView={{ width: 80 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                    />
                  </div>
                </div>

                {/* Members Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                  {category.members.map((member, memberIdx) => (
                    <motion.div
                      key={member.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: memberIdx * 0.1 }}
                      whileHover={{ y: -10 }}
                      onHoverStart={() => setHoveredCard(member.id)}
                      onHoverEnd={() => setHoveredCard(null)}
                      className="relative group"
                    >
                      <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700 shadow-xl overflow-hidden transition-all duration-300 hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-500/20">
                        {/* Animated Background Glow */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          animate={
                            hoveredCard === member.id
                              ? { scale: [1, 1.05, 1] }
                              : {}
                          }
                          transition={{ duration: 2, repeat: Infinity }}
                        />

                        {/* Badge Logo */}
                        {member.badgeImg && (
                          <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            whileInView={{ scale: 1, rotate: 0 }}
                            viewport={{ once: true }}
                            transition={{
                              type: "spring",
                              delay: memberIdx * 0.1,
                            }}
                            className="absolute top-4 right-4 w-14 h-14 rounded-full overflow-hidden shadow-lg z-10p-1.5"
                          >
                            <img
                              src={member.badgeImg}
                              alt="Team Badge"
                              className="w-full h-full object-contain rounded-full"
                            />
                          </motion.div>
                        )}

                        {/* Avatar */}
                        <div className="relative z-10">
                          <Avatar member={member} />
                        </div>

                        {/* Member Info */}
                        <div className="relative z-10 mt-6 space-y-2">
                          <h3 className="text-xl font-bold text-white text-center leading-tight group-hover:text-blue-400 transition-colors">
                            {member.name}
                          </h3>
                          <p className="text-blue-400 text-sm font-medium text-center">
                            {member.role}
                          </p>
                          <p className="text-gray-400 text-sm text-center leading-relaxed">
                            {member.description}
                          </p>
                        </div>

                        {/* Social Links */}
                        {member.contact && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 + memberIdx * 0.1 }}
                            className="relative z-10 flex items-center justify-center gap-4 pt-6 mt-6 border-t border-gray-700"
                          >
                            {member.contact.instagram && (
                              <motion.a
                                href={member.contact.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.2, rotate: 5 }}
                                whileTap={{ scale: 0.9 }}
                                className="p-2 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 text-white shadow-lg hover:shadow-pink-500/50 transition-shadow"
                                title="Instagram"
                              >
                                <Instagram className="w-5 h-5" />
                              </motion.a>
                            )}
                            {member.contact.github && (
                              <motion.a
                                href={member.contact.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.2, rotate: -5 }}
                                whileTap={{ scale: 0.9 }}
                                className="p-2 rounded-full bg-gray-700 text-white shadow-lg hover:bg-gray-600 hover:shadow-gray-600/50 transition-all"
                                title="GitHub"
                              >
                                <Github className="w-5 h-5" />
                              </motion.a>
                            )}
                            {member.contact.linkedin && (
                              <motion.a
                                href={member.contact.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.2, rotate: 5 }}
                                whileTap={{ scale: 0.9 }}
                                className="p-2 rounded-full bg-blue-600 text-white shadow-lg hover:shadow-blue-600/50 transition-shadow"
                                title="LinkedIn"
                              >
                                <Linkedin className="w-5 h-5" />
                              </motion.a>
                            )}
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="bg-gray-950 border-t border-gray-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <motion.p
            className="text-gray-400"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring" }}
          >
            © 2025 BEM. Built with{" "}            
            <span className="text-blue-400 font-semibold">Pakkail</span> x{" "}
            <span className="text-emerald-400 font-semibold">Delpro</span>
          </motion.p>
        </div>
      </motion.footer>
    </div>
  );
}
