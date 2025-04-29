import { useQuery } from "@tanstack/react-query";
import { Moment } from "@shared/schema";
import { motion } from "framer-motion";
import { Calendar, Heart, MapPin, Star } from "lucide-react";

const getIconByTag = (tag: string) => {
  switch (tag) {
    case "First Date":
      return Heart;
    case "Anniversary":
      return Star;
    case "Travel":
      return MapPin;
    default:
      return Calendar;
  }
};

const SpecialMoments = () => {
  const { data: moments = [] } = useQuery<Moment[]>({
    queryKey: ["/api/moments"],
  });

  return (
    <section id="moments" className="py-12 md:py-20 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[15%] left-[5%] opacity-10">
          <Heart className="h-16 w-16 text-primary animate-pulse-slow" />
        </div>
        <div className="absolute top-[60%] right-[8%] opacity-10">
          <Star className="h-12 w-12 text-secondary animate-pulse-slow" style={{ animationDelay: "1s" }} />
        </div>
        <div className="absolute bottom-[10%] left-[12%] opacity-10">
          <Calendar className="h-14 w-14 text-accent animate-pulse-slow" style={{ animationDelay: "0.5s" }} />
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <div className="relative inline-block mb-3">
            <h2 className="font-heading text-3xl md:text-4xl text-primary">Our Special Moments</h2>
            <div className="absolute -bottom-2 left-4 right-4 h-2 bg-secondary/30 -z-10 rounded-full"></div>
          </div>
          
          <div className="bg-white p-4 rounded-xl border-2 border-dashed border-foreground/10 max-w-2xl mx-auto shadow-sm">
            <p className="text-foreground/70">
              The most wonderful memories that have made our story so special! ✨
            </p>
          </div>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Timeline connector */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-primary/10 hidden md:block transform -translate-x-1/2"></div>
          
          <div className="grid md:grid-cols-2 gap-y-16 md:gap-y-24 gap-x-8 relative">
            {moments.map((moment, index) => {
              const IconComponent = getIconByTag(moment.tag);
              const isEven = index % 2 === 0;
              
              return (
                <motion.div
                  key={moment.id}
                  className={`relative ${isEven ? 'md:col-start-1' : 'md:col-start-2'}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: index * 0.15,
                    type: "spring",
                    stiffness: 200,
                    damping: 20
                  }}
                >
                  {/* Timeline dot */}
                  <div className={`hidden md:block absolute top-10 ${isEven ? 'right-0 translate-x-1/2' : 'left-0 -translate-x-1/2'} w-5 h-5 rounded-full bg-white border-4 border-primary/40 z-10`}></div>
                  
                  {/* Timeline connectors */}
                  <div className={`hidden md:block absolute top-10 h-1 w-8 bg-primary/10 ${isEven ? 'right-0' : 'left-0'}`}></div>
                  
                  <div className={`bg-white rounded-xl overflow-hidden shadow-sm border-2 border-${moment.tagColor}/30 relative transform ${isEven ? 'md:rotate-1' : 'md:-rotate-1'}`}>
                    <div className="absolute top-4 right-4 z-10 bg-white p-2 rounded-full shadow-sm">
                      <IconComponent className={`h-5 w-5 text-${moment.tagColor}`} />
                    </div>
                    
                    <div className="relative">
                      <div className="pb-[56.25%]">
                        <img
                          src={moment.imageUrl}
                          alt={moment.title}
                          className="absolute inset-0 w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50"></div>
                    </div>
                    
                    <div className="p-6 relative">
                      <span className={`bg-${moment.tagColor}/20 text-${moment.tagColor} px-3 py-1 rounded-full text-sm font-medium inline-flex items-center gap-1 border border-${moment.tagColor}/30`}>
                        <IconComponent className="h-3 w-3" />
                        {moment.tag}
                      </span>
                      
                      <h3 className="font-heading text-2xl mt-3 mb-2">{moment.title}</h3>
                      
                      <div className="bg-foreground/5 p-3 rounded-lg border border-dashed border-foreground/10 mb-4">
                        <p className="text-foreground/80 text-sm">{moment.description}</p>
                      </div>
                      
                      <div className="flex items-center text-foreground/60 font-heading">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{moment.date}</span>
                      </div>
                      
                      {/* Decorative elements */}
                      <div className="absolute bottom-3 right-3 text-lg opacity-20">
                        {moment.tag === "First Date" ? "💕" : 
                         moment.tag === "Anniversary" ? "🎉" : 
                         moment.tag === "Travel" ? "✈️" : "🎁"}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecialMoments;
