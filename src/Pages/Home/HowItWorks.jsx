import React from "react";

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: "Post",
      desc: "Choose your photo to begin processing.",
      icon: "📤",
    },
    {
      id: 2,
      title: "Find Food",
      desc: "Select your favorite dishes, check all the details, and confirm your pickup or delivery option.",
      icon: "🙂",
    },
    {
      id: 3,
      title: "Collect Food",
      desc: "You can see what food you choose food details show location.",
      icon: "⚙️",
    },
    {
      id: 4,
      title: "Download & Share",
      desc: "Save your final output and share it anywhere.",
      icon: "⬇️",
    },
  ];

  return (
    <section className="py-20 bg-white">
      
      <div className="text-center mb-4">
        <span className="px-4 py-1 bg-orange-100 text-orange-500 rounded-full text-sm font-medium">
          How it works
        </span>
      </div>

      
      <h2 className="text-4xl font-bold text-center mb-3">
        How Our <span className="text-orange-500">Plateshare</span> Works
      </h2>
      <p className="text-center text-gray-500 max-w-xl mx-auto mb-14">
        Our plate share process is simple, fast, and produces amazing results 
        in just a few easy steps.
      </p>

    
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-6 md:px-12 max-w-7xl mx-auto">
        {steps.map((step) => (
          <div
            key={step.id}
            className="bg-white border border-gray-200/60 rounded-2xl p-6 shadow-[0_4px_30px_rgba(0,0,0,0.05)]
                       backdrop-blur-sm relative overflow-hidden"
          >
            
            <div className="absolute inset-0 opacity-20">
              <div className="w-24 h-24 bg-orange-200 rounded-full blur-3xl absolute -top-6 -left-6"></div>
              <div className="w-16 h-16 bg-orange-100 rounded-full blur-xl absolute bottom-4 right-4"></div>
            </div>

          
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-orange-200 to-orange-400 flex items-center justify-center text-3xl shadow-lg">
              {step.icon}
            </div>

            
            <h3 className="text-xl font-semibold mb-2">
              Step {step.id}: {step.title}
            </h3>

            
            <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
