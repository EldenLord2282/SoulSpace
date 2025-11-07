"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Page3() {
  const quotes = [
    "Your mental health is a priority. Healing takes time, but you are not alone.",
    "Small steps every day lead to big changes over time.",
    "It’s okay to not be okay. Asking for help is a sign of strength.",
    "You are stronger than you think, and braver than you believe.",
    "Every day is a new beginning. Take a deep breath and start again."
  ];

  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);
  
  
  useEffect(() => {
    
    const interval = setInterval(() => {
      setFade(false); // start fade-out
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % quotes.length); // change quote
        setFade(true); // fade-in new one
      }, 1000); // match fadeOut duration
    }, 5000); // every 5 seconds
    return () => clearInterval(interval);
  }, [quotes.length]);

  return (
    <div className="h-screen w-full flex bg-gradient-to-br from-[#9999ff] to-[#66a6ff] text-white">
      {/* Sidebar */}
      <div className="w-56 bg-white/15 backdrop-blur-md p-6 flex flex-col gap-4 shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-4">Menu</h2>
        <a
          href="/counsellor-booking"
          className="block text-center py-2 rounded-lg font-semibold bg-white/10 hover:bg-white hover:text-blue-500 transition"
        >
          Counsellor Booking
        </a>
        <a
          href="#"
          className="block text-center py-2 rounded-lg font-semibold bg-white/10 hover:bg-white hover:text-blue-500 transition"
        >
          Resource Hub
        </a>
        <Link
          href="/journal"
          className="block text-center py-2 rounded-lg font-semibold bg-white/10 hover:bg-white hover:text-blue-500 transition"
  >
          My Journal
        </Link>
        <a
          href="/Test-hub"
          className="block text-center py-2 rounded-lg font-semibold bg-white/10 hover:bg-white hover:text-blue-500 transition"
        >
          Test Hub
        </a>
        <a
          href="#"
          className="block text-center py-2 rounded-lg font-semibold bg-white/10 hover:bg-white hover:text-blue-500 transition"
        >
          Games 
        </a>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 text-center">
         {/* Cursive Heading */}
        <div className="mb-12 w-full max-w-3xl">
          <svg viewBox="0 0 1000 200" className="w-full">
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              className="font-cursive text-stroke text-[100px]"
            >
             Soul Space
            </text>
          </svg>

          <style jsx>{`
            @import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');

            .font-cursive {
              font-family: 'Pacifico', cursive;
            }
            .text-stroke {
              fill: transparent;
              stroke: #fff;
              stroke-width: 1px;
              stroke-dasharray: 2000;
              stroke-dashoffset: 2000;
              animation: draw 15s linear forwards, fillIn 1s 2s forwards;  
               
            }
              
            @keyframes draw {
              to {
                stroke-dashoffset: 0;
              }
            }

            @keyframes fillIn {
              to {
                fill: #e392ecff;
              }
            }
          `}</style>
        </div>
        {/* Quote */}
        <p
  key={index}
  className={`text-base md:text-lg mb-10 max-w-2xl leading-relaxed text-white drop-shadow-md
    transition-all duration-1000 ease-in-out
    ${fade ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}
  `}
>
  {quotes[index]}
</p>     
       {/* Chatbot Search Bar */}
        <div className="flex w-full max-w-xl bg-white/15 backdrop-blur-md rounded-full shadow-lg p-3">
          <input
            type="text"
            placeholder="Ask me anything..."
            className="flex-1 bg-transparent text-white placeholder-white/70 focus:outline-none px-4"
          />
          <button className="px-6 py-2 bg-white text-blue-500 font-bold rounded-full hover:bg-blue-500 hover:text-white transition text-3xl">
            ⪢
          </button>
        </div>
      </div>
    </div>
  );
}
