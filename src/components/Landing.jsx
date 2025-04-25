import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  MessageSquare,
  HeartPulse,
  Gamepad2,
  AppWindowMac,
  Home,
  GraduationCap,
  ShoppingBag,
  ActivitySquare,
  ClipboardList,
  Stethoscope,
  Bot,
  HeartHandshake,
  ChevronRight,
  Calendar,
  Heart,
  Moon,
  Handshake,
  Sun,
  Droplet,
  Utensils,
  Menu,
  X,
  Check,
  Star,
  Users,
  ArrowRight,
  UserCircle,
  UsersRound,
  CalendarHeart,
  Church,
  Package,
} from "lucide-react";

export function Landing() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("darkMode") === "true"
  );
  const [sidebarVisible, setSidebarVisible] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("darkMode", newMode.toString());
      return newMode;
    });
  };

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div className={`flex h-screen ${darkMode ? "dark" : ""}`}>
      {/* Sidebar */}
      <aside
        className={`bg-pink-100 dark:bg-gray-800 w-64 min-h-screen p-4 fixed transition-all duration-300 ease-in-out ${
          sidebarVisible ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ zIndex: 40 }}
      >
        <div className="px-4 py-4 flex flex-col space-y-2">
          <h1 className="text-2xl font-bold text-pink-600 dark:text-pink-400 ">
            SheSync
          </h1>
          <SidebarLink
            icon={<LayoutDashboard size={20} />}
            label="Dashboard"
            onClick={() => navigate("/dashboard")}
          />
          <SidebarLink
            icon={<Home size={20} />}
            label="Home"
            onClick={() => navigate("/")}
            active
          />
         
          <SidebarLink
            icon={<ActivitySquare size={20} />}
            label="Track Your Health"
            onClick={() => navigate("/tracker")}
          />
          
        </div>
      </aside>

      <button
        onClick={toggleSidebar}
        className="fixed left-0 top-0 z-10 p-2 bg-pink-600 text-white rounded-r-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
        style={{
          transform: sidebarVisible ? "translateX(256px)" : "translateX(0)",
        }}
        aria-label={sidebarVisible ? "Hide sidebar" : "Show sidebar"}
      >
        <ChevronRight
          size={14}
          className={`transition-transform duration-300 ${
            sidebarVisible ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {/* Main Content */}
      <main
        className={`flex-1 p-6 overflow-auto bg-white dark:bg-gray-900 transition-all duration-300 ease-in-out ${
          sidebarVisible ? "ml-64" : "ml-0"
        }`}
      >
        <div className="fixed bottom-4 right-4 z-50">
          <img
            src="/images/chatgpt.png"
            onClick={() => navigate("/Chatbot")}
            className="w-16 h-16 cursor-pointer"
            alt="Chatbot"
          />
        </div>
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-pink-600 dark:text-pink-400 
            ">
            Welcome to SheSync 
            </h1>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 "
            >
              {darkMode ? (
                <Sun className="h-5 w-5 text-gray-800 dark:text-gray-200" />
              ) : (
                <Moon className="h-5 w-5 text-gray-800 dark:text-gray-200" />
              )}
            </button>
          </div>
          {/* Hero Section */}
          <Card className=" hover:bg-pink-200 active:bg-pink-100 focus:outline-none focus:ring focus:ring-pink-300 dark:hover:bg-pink-500">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-full md:w-1/2 pr-8">
                <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                  SheSync: Your Journey to Confident Cycles
                </h2>
                <p className="text-lg mb-6 text-gray-700 dark:text-gray-300">
                  Empowering Women One Cycle at a Time
                  </p>
                  
                <button
                  onClick={() => navigate("/Signup")}
                  className="bg-pink-600 dark:bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-700 dark:hover:bg-pink-600 transition-colors"
                >
                  Join Us!
                </button>
              </div>
            </div>
          </Card>
          {/* Features Overview */}
          <Card>
            <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100  ">
              Comprehensive Health Management
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="flex flex-col items-start p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <LayoutDashboard className="h-8 w-8 text-pink-600 dark:text-pink-400 mb-4"  onClick={() => navigate("/dashboard")}/>
                <h4
                  className="text-lg font-semibold text-pink-600 cursor-pointer  hover:bg-pink-200 active:bg-pink-100 focus:outline-none focus:ring focus:ring-pink-300 ..."
                >
                  Personalized Child Dashboard
                </h4>
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                  A space for children to manage their cycles, log symptoms, and
                  access resources designed for their journey.
                </p>
              </div>

              <div className="flex flex-col items-start p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <GraduationCap className="h-8 w-8 text-pink-600 dark:text-pink-400 mb-4" onClick={() => navigate("/blogs")}/>
                <h4
                  className="text-lg font-semibold text-pink-600 cursor-pointer  hover:bg-pink-200 active:bg-pink-100 focus:outline-none focus:ring focus:ring-pink-300 ..."
                
                >
                  Education Hub
                </h4>
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                  Learn menstrual health through interactive blogs, modules, and
                  rewards— stigma-free and fun!
                </p>
              </div>

              <div className="flex flex-col items-start p-6 bg-white dark:bg-gray-800  rounded-lg shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <ShoppingBag className="h-8 w-8 text-pink-600 dark:text-pink-400 mb-4" onClick={() => navigate("/Ecom")}/>
                <h4
                  className="text-lg font-semibold text-pink-600 cursor-pointer  hover:bg-pink-200 active:bg-pink-100 focus:outline-none focus:ring focus:ring-pink-300 ..."
                
                >
                Curated Shop
                </h4>
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                Discover eco-friendly products and redeem learning points for
                sustainable choices.
                </p>
            </div>

            <div className="flex flex-col items-start p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <ActivitySquare className="h-8 w-8 text-pink-600 dark:text-pink-400 mb-4" onClick={() => navigate("/tracker")}/>
                <h4
                className="text-lg font-semibold text-pink-600 cursor-pointer  hover:bg-pink-200 active:bg-pink-100 focus:outline-none focus:ring focus:ring-pink-300 ..."

                >
                Health Tracker
                </h4>
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                Log cycles, symptoms, and moods to understand patterns and
                gain actionable health insights.
                </p>
            </div>

            <div className="flex flex-col items-start p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <Stethoscope className="h-8 w-8 text-pink-600 dark:text-pink-400 mb-4" onClick={() => navigate("/consultations")}/>
                <h4
                className="text-lg font-semibold text-pink-600 cursor-pointer  hover:bg-pink-200 active:bg-pink-100 focus:outline-none focus:ring focus:ring-pink-300 ..."
                
                >
                Expert Consultations
                </h4>
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                Access trusted health professionals for personalized advice
                and timely support.
                </p>
            </div>

            <div className="flex flex-col items-start p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <Bot className="h-8 w-8 text-pink-600 dark:text-pink-400 mb-4" onClick={() => navigate("/ChatBot")}/>
                <h4
                className="text-lg font-semibold text-pink-600 cursor-pointer  hover:bg-pink-200 active:bg-pink-100 focus:outline-none focus:ring focus:ring-pink-300 ..."
                
                >
                Eve
                </h4>
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                Get AI personalized insights, symptom analysis, and timely
                reminders tailored to your unique menstrual health needs.
                </p>
            </div>

            <div className="flex flex-col items-start p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-lg  ">
                <UsersRound className="h-8 w-8 text-pink-600 dark:text-pink-400 mb-4" onClick={() => navigate("/dashboard")}/>
                <h4
                className="text-lg font-semibold text-pink-600 cursor-pointer  hover:bg-pink-200 active:bg-pink-100 focus:outline-none focus:ring focus:ring-pink-300 ..."
                
                >
                Parent's Dashboard
                </h4>
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-2 ">
                Stay informed with cycle updates, mood tracking, and AI
                alerts— supporting your child without compromising their
                privacy.
                </p>
            </div>

            <div className="flex flex-col items-start p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <HeartPulse className="h-8 w-8 text-pink-600 dark:text-pink-400 mb-4" onClick={() => navigate("/symptomsanalyzer")}/>
                <h4
                className="text-lg font-semibold text-pink-600 cursor-pointer  hover:bg-pink-200 active:bg-pink-700 focus:outline-none focus:ring focus:ring-pink-300 ..."
                
                >
                Health Lens
                </h4>
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                An AI-powered tool to analyze symptoms, offer community
                insights, and provide actionable health advice.
                </p>
              </div>

              <div className="flex flex-col items-start p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <MessageSquare className="h-8 w-8 text-pink-600 dark:text-pink-400 mb-4" onClick={() => navigate("/forums")}/>
                <h4
                  className="text-lg font-semibold text-pink-600 cursor-pointer  hover:bg-pink-200 active:bg-pink-700 focus:outline-none focus:ring focus:ring-pink-300 ..."
                  
                >
                  Forums
                </h4>
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                  A safe, anonymous space for peer support, discussions, and
                  expert Q&A on menstrual health and related topics.
                </p>
              </div>
              <div className="flex flex-col items-start p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <ClipboardList className="h-8 w-8 text-pink-600 dark:text-pink-400 mb-4" onClick={() => navigate("/partner")}/>
                <h4
                  className="text-lg font-semibold text-pink-600 cursor-pointer  hover:bg-pink-200 active:bg-pink-700 focus:outline-none focus:ring focus:ring-pink-300 ..."
                  
                >
                  PCOS Diagnosis
                </h4>
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                  A tool to help you diagnose PCOS and get personalized advice.
                </p>
              </div>
              <div className="flex flex-col items-start p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <Handshake className="h-8 w-8 text-pink-600 dark:text-pink-400 mb-4" onClick={() =>
              window.open(
                "https://www.hercircle.in/engage/wellness/reproductive-health/5-organisations-working-towards-eradicating-period-poverty-2239.html",
                "_blank"
              )
            }/>
                <h4
                  className="text-lg font-semibold text-pink-600 cursor-pointer  hover:bg-pink-200 active:bg-pink-700 focus:outline-none focus:ring focus:ring-pink-300 ..."
                  
                >
                  NGO's
                </h4>
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                  Discover and connect with NGOs dedicated to women's health,
                  empowerment, and well-being. Together, we can build a
                  supportive community for women everywhere.
                </p>
              </div>
              <div className="flex flex-col items-start p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <HeartHandshake className="h-8 w-8 text-pink-600 dark:text-pink-400 mb-4" onClick={() => 
              window.open(
                "https://thepadproject.org/donate/"
                )  
              }/>
                <h4
                  className="text-lg font-semibold text-pink-600 cursor-pointer  hover:bg-pink-200 active:bg-pink-700 focus:outline-none focus:ring focus:ring-pink-300 ..."
                  
                >
                  ShareJoy
                </h4>
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                  Make a difference by donating sanitary pads through our
                  curated platform, ensuring access to menstrual hygiene for
                  those in need. Sharing joy starts here!
                </p>
              </div>
            </div>
          </Card>
         
          
          {/* Key Benefits Section */}
          <Card className=" hover:bg-pink-200  focus:outline-none focus:ring focus:ring-pink-300 dark:hover:bg-pink-500 ">
            <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100  ">
              Key Benefits of Using SheSync
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <BenefitItem
                title="Personalized Insights"
                description="SheSync offers a shared platform with dual dashboards, ensuring parents stay informed without invading their child's privacy, fostering trust and security."
              />
              <BenefitItem
                title="Holistic Approach"
                description="Unlike traditional platforms, SheSync addresses the unique needs of young menstruators with personalized tools for tracking cycles and early detection of menstrual issues."
              />
              <BenefitItem
                title="Expert-Backed Content"
                description="The Education Hub provides gamified, engaging content that empowers children to learn about menstruation in a fun, stigma-free environment, promoting period positivity."
              />
              <BenefitItem
                title="Community Support"
                description="SheSync encourages open dialogue between parents and children about menstruation, helping build a supportive, trusting relationship and enhancing emotional well-being."
              />
            </div>
          </Card>
          {/* Our Mission Section */}
          <Card className=" hover:bg-pink-200 active:bg-pink-700 focus:outline-none focus:ring focus:ring-pink-300  dark:hover:bg-pink-500">
            <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Our Mission
            </h3>
            <p className="text-lg mb-4 text-gray-800 dark:text-gray-300">
              SheSync's mission is to promote period positivity, reduce stigma,
              and empower families with education and support. We focus on early
              detection of health issues and provide access to affordable
              hygiene products.
            </p>
            <p className="text-lg text-gray-800 dark:text-gray-300">
              Our main focus is on global expansion, with plans to integrate
              advanced AI for personalized health insights and strengthen
              partnerships with schools, NGOs, and healthcare organizations to
              maximize impact.
            </p>
          </Card>
          
          {/* Testimonials */}
          <Card className=" hover:bg-pink-200 active:bg-pink-700 focus:outline-none focus:ring focus:ring-pink-300  dark:hover:bg-pink-500">
            <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
              What Our Users Say
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TestimonialCard
                quote="SheSync has completely changed how I manage my health. It's like having a personal health assistant!"
                author="Divya Jain"
              />
              <TestimonialCard
                quote="The community here is so supportive. I've learned so much and feel empowered to take control of my well-being."
                author="Aisha Gupta"
              />
            </div>
          </Card>
          
          {/* Success Stories */}
          <Card className="bg-pink-800 text-white  hover:bg-pink-200 active:bg-pink-100 focus:outline-none focus:ring focus:ring-pink-300  dark:hover:bg-pink-500">
            <h3 className="text-2xl font-semibold mb-6 text-pink-700 dark:text-gray-100">
              Success Stories
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <SuccessStoryCard
                className="bg-pink-800 text-white"
                name="Anubha Garg"
                story="After struggling with irregular cycles for years, SheSync helped me understand my body better. Within 3 months, I could predict my cycle accurately!"
                improvement="Cycle Regularity"
              />
              <SuccessStoryCard
                name="Riya Sharma"
                story="The nutritional guidance on SheSync transformed my diet. My energy levels have improved, and I've noticed a significant reduction in PMS symptoms."
                improvement="Overall Well-being"
              />
              <SuccessStoryCard
                name="Aditi Jain"
                story="The forums have made it easier for me to reach out to people who are suffering from the same symptoms as I do."
                improvement="Mental Health"
              />
              <SuccessStoryCard
                name="Manyata"
                story="This website has helped me educate myself and be prepared for my first periods."
                improvement="Awareness"
              />
              <SuccessStoryCard
                name="Divyanshi Sharma"
                story="This app has helped me maintain a well balanced and nutritious diet. I have been able to feel strong even during my periods thanks to SheSync."
                improvement="Physical Well-being"
              />
              <SuccessStoryCard
                name="Swathi"
                story="As a working woman I often find it very difficult to take care of myself but she-sync has made it very easy for me to be healthy."
                improvement="Overall Well-being"
              />
            </div>
          </Card>
          {/* Expert Insights */}
          <Card className=" hover:bg-pink-200 active:bg-pink-100 focus:outline-none focus:ring focus:ring-pink-300  dark:hover:bg-pink-500">
            <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
              Expert Insights
            </h3>
            <div className="space-y-6">
              <ExpertInsightCard
                expert="Dr. Deepti Mishra, OB/GYN"
                insight="Regular tracking of menstrual cycles can lead to early detection of various health issues. SheSync's comprehensive tracking features make this process easy and insightful for users."
              />
              <ExpertInsightCard
                expert="Vaishali Shah, Nutritionist"
                insight="The personalized nutritional recommendations provided by SheSyncare based on solid scientific research. They can significantly improve hormonal balance and overall health."
              />
            </div>
          </Card>
          {/* Community Highlights */}
          <Card className=" hover:bg-pink-200 active:bg-pink-100 focus:outline-none focus:ring focus:ring-pink-300  dark:hover:bg-pink-500">
            <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
              Community Highlights
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <CommunityHighlightCard
                title="Monthly Wellness Challenges"
                description="Join our community-wide challenges focused on different aspects of women's health each month."
              />
              <CommunityHighlightCard
                title="Support Groups"
                description="Connect with women facing similar health challenges in our moderated support groups."
              />
              <CommunityHighlightCard
                title="Expert Q&A Sessions"
                description="Participate in live Q&A sessions with health experts and get your questions answered."
              />
            </div>
          </Card>
          {/* FAQ Section */}
          <Card className=" hover:bg-pink-200  focus:outline-none focus:ring focus:ring-pink-300  dark:hover:bg-pink-500">
            <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
              Frequently Asked Questions
            </h3>
            <div className="space-y-4">
              <FAQItem
                question="Is my data safe and private?"
                answer="Yes, we take your privacy seriously. All your data is encrypted and we never share your personal information with third parties."
              />
              <FAQItem
                question="Can I use SheSync if I have irregular cycles?"
                answer="SheSync is designed to accommodate all types of cycles, including irregular ones. Our AI adapts to your unique patterns over time."
              />
              <FAQItem
                question="How often should I log my symptoms?"
                answer="For the best results, we recommend logging your symptoms daily. However, even logging a few times a week can provide valuable insights."
              />
              <FAQItem
                question="How does SheSync protect my privacy?"
                answer="We use state-of-the-art encryption and follow strict data protection protocols. Your personal information is never sold or shared with third parties without your explicit consent."
              />
              <FAQItem
                question="Can I use SheSync if I'm not menstruating?"
                answer="SheSync offers features for all aspects of women's health, including general wellness tracking, nutritional guidance, and mental health support."
              />
              <FAQItem
                question="Are the health articles on SheSync written by professionals?"
                answer="Yes, all our educational content is created or reviewed by qualified healthcare professionals to ensure accuracy and relevance."
              />
            </div>
          </Card>
          
         
          {/* CTA */}
          <Card className=" dark:hover:bg-pink-500  hover:bg-pink-200 active:bg-pink-100 focus:outline-none focus:ring focus:ring-pink-300 ">
            <div className="text-center">
              <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                Ready to Take Control of Your Health?
              </h3>
              <p className="mb-6 text-gray-800 dark:text-gray-300">
                Join SheSync today and start your journey to better health and
                wellness.
              </p>
              <button
                onClick={() => navigate("/Signup")}
                className="bg-pink-600 dark:bg-pink-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-pink-700 dark:hover:bg-pink-600 transition-colors"
              >
                Sign Up Now
              </button>
            </div>
          </Card>
          {/* Footer */}
          <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700  hover:bg-pink-200 active:bg-pink-100 focus:outline-none focus:ring focus:ring-pink-300 dark:hover:bg-pink-400">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Company
                </h4>
                <ul className="space-y-2">
                  <li>
                    <button
                      onClick={() => navigate("/symptomsanalyzer")}
                      className="text-gray-700 dark:text-gray-700 hover:text-pink-600 dark:hover:text-pink-400"
                    >
                      About Us
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => navigate("/parents")}
                      className="text-gray-700 dark:text-gray-700 hover:text-pink-600 dark:hover:text-pink-400"
                    >
                      Careers
                    </button>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-700 dark:text-gray-700 hover:text-pink-600 dark:hover:text-pink-400"
                    >
                      Press
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Resources
                </h4>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="#"
                      className="text-gray-700 dark:text-gray-700 hover:text-pink-600 dark:hover:text-pink-400"
                    >
                      Blog
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-700 dark:text-gray-700 hover:text-pink-600 dark:hover:text-pink-400"
                    >
                      Help Center
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-700 dark:text-gray-700 hover:text-pink-600 dark:hover:text-pink-400"
                    >
                      Community
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Legal
                </h4>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="#"
                      className="text-gray-700 dark:text-gray-700 hover:text-pink-600 dark:hover:text-pink-400"
                    >
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-700 dark:text-gray-700 hover:text-pink-600 dark:hover:text-pink-400"
                    >
                      Terms of Service
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-700 dark:text-gray-700 hover:text-pink-600 dark:hover:text-pink-400"
                    >
                      Cookie Policy
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Connect
                </h4>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="#"
                      className="text-gray-700 dark:text-gray-700 hover:text-pink-600 dark:hover:text-pink-400"
                    >
                      Twitter
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-700 dark:text-gray-700 hover:text-pink-600 dark:hover:text-pink-400"
                    >
                      Facebook
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-700 dark:text-gray-700 hover:text-pink-600 dark:hover:text-pink-400"
                    >
                      Instagram
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 text-center">
              <p className="text-gray-700 dark:text-gray-100">TEAM: WEB PIONEERS</p>
              <p className="text-gray-700 dark:text-gray-100">
                &copy; 2025 SheSync. All rights reserved.
              </p>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}

const SidebarLink = ({ icon, label, onClick, active = false }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center space-x-2 w-full px-2 py-2 rounded-lg transition-colors ${
        active
          ? "bg-pink-200 dark:bg-pink-900 text-pink-800 dark:text-pink-200"
          : "text-gray-900 dark:text-gray-300 hover:bg-pink-100 dark:hover:bg-gray-700"
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};

const Card = ({ children, className }) => {
  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-[1.02] ${className}`}
    >
      {children}
    </div>
  );
};

const FeatureOverview = ({ icon, title, description }) => {
  return (
    <div className="flex items-start space-x-4">
      <div className="flex-shrink-0">{icon}</div>
      <div>
        <h4 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
          {title}
        </h4>
        <p className="text-gray-700 dark:text-gray-300">{description}</p>
      </div>
    </div>
  );
};

const BenefitItem = ({ title, description }) => {
  return (
    <div className="border-l-4 border-pink-500 pl-4 dark:border-pink-700">
      <h4 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
        {title}
      </h4>
      <p className="text-gray-700 dark:text-gray-300">{description}</p>
    </div>
  );
};

const StepCard = ({ number, title, description }) => {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900 rounded-full flex items-center justify-center mb-4">
        <span className="text-2xl font-bold text-pink-600 dark:text-pink-400">
          {number}
        </span>
      </div>
      <h4 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
        {title}
      </h4>
      <p className="text-gray-700 dark:text-gray-300">{description}</p>
    </div>
  );
};

const TestimonialCard = ({ quote, author }) => {
  return (
    <div className="bg-pink-100 dark:bg-pink-400 p-4 rounded-lg">
      <p className="italic mb-2 text-gray-800 dark:text-gray-300">"{quote}"</p>
      <p className="font-semibold text-right text-gray-900 dark:text-gray-100">
        - {author}
      </p>
    </div>
  );
};

const BlogPostCard = ({ title, excerpt, date }) => {
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
      <h4 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
        {title}
      </h4>
      <p className="text-gray-700 dark:text-gray-300 mb-2">{excerpt}</p>
      <p className="text-sm text-gray-600 dark:text-gray-400">{date}</p>
    </div>
  );
};

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
      <button
        className="flex justify-between items-center w-full text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-semibold text-gray-900 dark:text-gray-100">
          {question}
        </span>
        <span>{isOpen ? "-" : "+"}</span>
      </button>
      {isOpen && (
        <p className="mt-2 text-gray-700 dark:text-gray-300">{answer}</p>
      )}
    </div>
  );
};

const SuccessStoryCard = ({ name, story, improvement }) => {
  return (
    <div className="bg-pink-50 dark:bg-pink-50 p-6 rounded-lg border border-pink-700 dark:border-pink-700 borderw-4">
      <h4 className="text-lg font-semibold mb-2 text-pink-600 dark:text-pink-800">
        {name}
      </h4>
      <p className="text-pink-400 dark:text-pink-400 mb-4">"{story}"</p>
      <div className="flex items-center">
        <Check className="text-green-500 mr-2" />
        <span className="text-green-500 dark:text-green-500 font-medium">
          {improvement}
        </span>
      </div>
    </div>
  );
};

const ExpertInsightCard = ({ expert, insight }) => {
  return (
    <div className="bg-pink-100 dark:bg-pink-400 p-6 rounded-lg">
      <p className="text-gray-800 dark:text-gray-300 mb-4">"{insight}"</p>
      <p className="font-semibold text-right text-gray-900 dark:text-gray-100">
        - {expert}
      </p>
    </div>
  );
};

const CommunityHighlightCard = ({ title, description }) => {
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
      <h4 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
        {title}
      </h4>
      <p className="text-gray-700 dark:text-gray-300">{description}</p>
    </div>
  );
};

const AppFeatureCard = ({ title, description, icon }) => {
  return (
    <div className="flex items-start space-x-4">
      <div className="flex-shrink-0 bg-pink-100 dark:bg-pink-900 p-3 rounded-full">
        {icon}
      </div>
      <div>
        <h4 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
          {title}
        </h4>
        <p className="text-gray-700 dark:text-gray-300">{description}</p>
      </div>
    </div>
  );
};

const PartnerLogo = ({ name }) => {
  return (
    <div className="bg-gray-200 dark:bg-gray-700 h-20 rounded-lg flex items-center justify-center">
      <span className="text-gray-100 dark:text-gray-400 font-medium">
        {name}
      </span>
    </div>
  );
};

const style = document.createElement("style");
style.textContent = `
  @keyframes pulse {
    0%, 100% {
      opacity: 0;
    }
    50% {
      opacity: 0.5;
    }
  }
  @keyframes gradient {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  .animate-gradient {
    animation: gradient 8s linear infinite;
  }
`;
document.head.appendChild(style);
