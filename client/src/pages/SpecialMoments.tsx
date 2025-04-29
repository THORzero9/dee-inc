import { useQuery } from "@tanstack/react-query";
import { Moment } from "@shared/schema";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";

const SpecialMoments = () => {
  const { data: moments = [] } = useQuery<Moment[]>({
    queryKey: ["/api/moments"],
  });

  return (
    <section id="moments" className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl mb-3">Special Moments</h2>
          <p className="text-neutral-dark/70 max-w-2xl mx-auto">
            Those unforgettable times that have shaped our story together.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {moments.map((moment, index) => (
            <motion.div
              key={moment.id}
              className="bg-white rounded-xl overflow-hidden shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="relative pb-[56.25%]">
                <img
                  src={moment.imageUrl}
                  alt={moment.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <span className={`bg-${moment.tagColor}/20 text-${moment.tagColor} px-3 py-1 rounded-full text-sm font-medium`}>
                  {moment.tag}
                </span>
                <h3 className="font-heading text-2xl mt-3 mb-2">{moment.title}</h3>
                <p className="text-neutral-dark/80 mb-4">{moment.description}</p>
                <div className="flex items-center text-neutral-dark/60">
                  <Calendar className="h-5 w-5 mr-1" />
                  <span>{moment.date}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialMoments;
