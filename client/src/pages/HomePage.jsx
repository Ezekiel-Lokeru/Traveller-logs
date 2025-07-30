import { Link, useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import Footer from "../components/Footer";

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="font-sans text-gray-800">
      {/* Hero Section */}
      <section
        className="h-screen flex items-center justify-center bg-cover bg-center text-white text-center px-4"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e')",
        }}
      >
        <motion.div
          className="bg-black/50 p-10 rounded-xl max-w-2xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Discover & Share Your Journeys
          </h1>
          <p className="text-lg mb-6">
            Travelog helps you document, explore, and get inspired by others' adventures.
          </p>
          <Link
            to="/register"
            className="bg-blue-600 text-black font-semibold px-6 py-3 rounded hover:bg-blue-600 transition"
          >
            Get Started for Free
          </Link>
        </motion.div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white text-center px-4">
        <motion.h2
          className="text-3xl font-bold mb-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          How It Works
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {["Sign Up", "Log Your Journey", "Explore Others"].map((title, index) => (
            <motion.div
              key={title}
              custom={index + 1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <h3 className="text-xl font-semibold mb-2">{`${index + 1}. ${title}`}</h3>
              <p className="text-gray-600">
                {index === 0
                  ? "Create your free account in seconds and start planning your trips."
                  : index === 1
                  ? "Add trip details, upload photos, and choose to keep them private or share."
                  : "Discover inspiring adventures from travelers all around the world."}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50 px-4">
        <motion.h2
          className="text-3xl font-bold text-center mb-12 text-gray-800"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          What Our Users Say
        </motion.h2>
        <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
          {[...Array(3)].map((_, i) => {
            const testimonial = [
              {
                name: "Miriam O.",
                country: "Kenya",
                avatar: "https://randomuser.me/api/portraits/women/65.jpg",
                rating: "★★★★★",
                quote: "Travelog changed the way I plan and remember my trips. It's beautiful and easy to use.",
                joined: "February 2024",
              },
              {
                name: "James L.",
                country: "Canada",
                avatar: "https://randomuser.me/api/portraits/men/45.jpg",
                rating: "★★★★☆",
                quote: "Seeing public trips gave me amazing ideas for my solo adventures. It’s so inspiring.",
                joined: "November 2023",
              },
              {
                name: "Amina S.",
                country: "Qatar",
                avatar: "https://randomuser.me/api/portraits/women/21.jpg",
                rating: "★★★★★",
                quote: "I love keeping a private log of all my travels. The interface is super smooth and secure.",
                joined: "July 2024",
              },
            ][i];

            return (
              <motion.div
                key={testimonial.name}
                className="bg-white p-6 rounded-lg shadow-md text-center"
                custom={i + 1}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                />
                <div className="flex justify-center mb-2 text-yellow-400 text-xl">
                  {testimonial.rating}
                </div>
                <p className="text-gray-600 italic mb-4">“{testimonial.quote}”</p>
                <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                <span className="text-sm text-gray-500 block">{testimonial.country}</span>
                <span className="text-xs text-gray-400">Joined in {testimonial.joined}</span>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Quick Links to Protected Routes */}
      <section className="py-16 px-4 bg-green-50 text-center">
        <motion.h2
          className="text-3xl font-bold mb-8 text-green-800"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          Quick Access
        </motion.h2>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 max-w-4xl mx-auto">
          <motion.button
            onClick={() => navigate("/dashboard")}
            className="bg-white border border-blue-300 hover:border-blue-500 shadow-md rounded-xl p-5 text-blue-700 hover:bg-blue-50 transition"
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            Go to Dashboard
          </motion.button>
          <motion.button
            onClick={() => navigate("/create-trip")}
            className="bg-white border border-green-300 hover:border-green-500 shadow-md rounded-xl p-5 text-green-700 hover:bg-green-50 transition"
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            Plan a New Trip
          </motion.button>
          <motion.button
            onClick={() => navigate("/trips")}
            className="bg-white border border-gray-300 hover:border-gray-500 shadow-md rounded-xl p-5 text-gray-700 hover:bg-gray-50 transition"
            custom={3}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            View My Trips
          </motion.button>
        </div>
      </section>

      {/* Call to Action */}
      <motion.section
        className="py-20 bg-blue-600 text-white text-center px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
        <p className="mb-6 text-lg">
          Join thousands of travelers who trust Travelog to keep their memories alive.
        </p>
        <Link
          to="/register"
          className="bg-white text-blue-600 font-semibold px-6 py-3 rounded hover:bg-gray-200 transition"
        >
          Sign Up Now
        </Link>
      </motion.section>

      <Footer />
    </div>
  );
};

export default HomePage;
