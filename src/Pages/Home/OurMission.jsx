import React from "react";

const OurMission = () => {
  const data = [
    {
      id: 1,
      title: "Total Donors",
      desc: "We will always provide you the highest can afford this",
      icon: "7.3k+",
    },
    {
      id: 2,
      title: "Meals Shared",
      desc: "Every shared meal can brighten someone’s day. Donate your extra food and spread kindness one plate at a time.",
      icon: "16.4k+",
    },
    {
      id: 3,
      title: "Communities Reached",
      desc: "Turn leftover meals into community support. Share food, reduce waste, and make a difference together.",
      icon: "350+",
    },
  ];

  return (
    <section className="py-16 bg-white">




<div className="text-center mb-4">
        <span className="px-4 py-1 bg-orange-100 text-orange-500 rounded-full text-sm font-medium">
          Our Mission
        </span>
      </div>

 <h2 className="text-4xl font-bold text-center mb-3">
        Who are <span className="text-orange-400">We</span> Our Mission
      </h2>

        <p className="max-w-2xl mx-auto text-gray-600 mb-14">
          Our mission is to create a community where no food goes to waste and
          no one goes hungry. Together, we build a sustainable and caring
          environment.
        </p>






      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-6xl mx-auto px-6">

        {data.map((item) => (
          <div
            key={item.id}
            className="bg-white p-8 rounded-2xl border border-gray-200
                       shadow-[0_4px_20px_rgba(0,0,0,0.06)]
                       text-center"
          >
            
            <div className="text-3xl bg-amber-400 mx-auto w-30 h-30 font-semibold flex justify-center items-center rounded-full mb-4">{item.icon}</div>

            
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>

            
            <p className="text-gray-600 text-sm leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}

      </div>
    </section>
  );
};

export default OurMission;
