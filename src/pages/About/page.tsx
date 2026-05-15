
const TEAM_MEMBERS = [
  { name: 'Sarah Jenkins', role: 'Head Chef & Founder', image: 'https://i.pravatar.cc/300?u=sarah', bio: 'With over 15 years in culinary arts, Sarah brings passion and expertise to every recipe on Appify.' },
  { name: 'Michael Chen', role: 'Lead Developer', image: 'https://i.pravatar.cc/300?u=michael', bio: 'Michael ensures the platform runs smoothly, bringing the seamless Appify experience to your screen.' },
  { name: 'Elena Rodriguez', role: 'Nutrition Expert', image: 'https://i.pravatar.cc/300?u=elena', bio: 'Elena crafts our healthy alternatives and ensures nutritional balance in all our featured meals.' },
  { name: 'David Smith', role: 'UI/UX Designer', image: 'https://i.pravatar.cc/300?u=david', bio: 'David designs the beautiful interfaces you interact with daily, making recipe discovery a joy.' },
];

export default function About() {
  return (
    <div className="bg-slate-50 dark:bg-gray-900 min-h-screen transition-colors duration-300">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-indigo-700 via-purple-700 to-indigo-900 dark:from-gray-800 dark:via-gray-900 dark:to-black text-white py-24 px-6 md:px-12 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="font-serif text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-md">Our Story</h1>
          <p className="text-xl text-indigo-100 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            We believe that cooking should be an accessible, joyful, and shared experience. 
            Appify was born from a simple idea: bringing the world's best recipes to your kitchen.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-24 px-6 md:px-12 max-w-4xl mx-auto text-center relative">
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 bg-indigo-50 dark:bg-gray-800 rounded-full flex items-center justify-center text-4xl shadow-sm border border-slate-100 dark:border-gray-700">🎯</div>
        
        <h2 className="font-serif text-3xl md:text-5xl font-bold text-slate-800 dark:text-white mb-8 mt-4">Our Mission</h2>
        
        <div className="space-y-8">
          <p className="text-slate-600 dark:text-gray-300 text-xl md:text-2xl leading-relaxed font-medium">
            "At Appify, our mission is to empower everyone to become a confident home cook. We curate, test, and share recipes that are not only delicious but also easy to follow."
          </p>
          
          <div className="w-20 h-1.5 bg-gradient-to-r from-indigo-500 to-purple-600 mx-auto rounded-full"></div>
          
          <p className="text-slate-500 dark:text-gray-400 text-lg leading-relaxed max-w-3xl mx-auto">
            Whether you're a seasoned chef or just starting out, our platform provides the tools, ingredients, and community you need to succeed in the kitchen. We value sustainability, quality ingredients, and the cultural heritage behind every dish.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-slate-100 dark:border-gray-700">
            <div className="text-3xl mb-3">🌿</div>
            <h4 className="font-bold text-slate-800 dark:text-white mb-1">Sustainable</h4>
            <p className="text-xs text-slate-500 dark:text-gray-400">Eco-friendly sourcing</p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-slate-100 dark:border-gray-700">
            <div className="text-3xl mb-3">💎</div>
            <h4 className="font-bold text-slate-800 dark:text-white mb-1">Premium</h4>
            <p className="text-xs text-slate-500 dark:text-gray-400">Top quality ingredients</p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-slate-100 dark:border-gray-700">
            <div className="text-3xl mb-3">🤝</div>
            <h4 className="font-bold text-slate-800 dark:text-white mb-1">Community</h4>
            <p className="text-xs text-slate-500 dark:text-gray-400">Shared culinary joy</p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-white dark:bg-gray-800 py-24 px-6 md:px-12 border-t border-slate-100 dark:border-gray-700 transition-colors">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">Meet Our Team 👥</h2>
          <p className="text-lg text-slate-500 dark:text-gray-400 max-w-2xl mx-auto mb-16">
            The passionate people behind Appify working hard to bring you the best culinary experience.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {TEAM_MEMBERS.map((member, index) => (
              <div key={index} className="group bg-slate-50 dark:bg-gray-900 rounded-3xl p-6 shadow-sm hover:shadow-xl border border-slate-100 dark:border-gray-700 transition-all duration-300 hover:-translate-y-2 text-center">
                <div className="relative w-32 h-32 mx-auto mb-6">
                  <div className="absolute inset-0 bg-indigo-500 rounded-full scale-105 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md"></div>
                  <img src={member.image} alt={member.name} className="relative w-full h-full object-cover rounded-full border-4 border-white dark:border-gray-800 z-10" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-1">{member.name}</h3>
                <p className="text-sm font-bold text-indigo-500 dark:text-indigo-400 uppercase tracking-wide mb-4">{member.role}</p>
                <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed">{member.bio}</p>
                
                <div className="flex justify-center gap-3 mt-6">
                  <a href="#" className="w-8 h-8 rounded-full bg-slate-200 dark:bg-gray-800 text-slate-600 dark:text-gray-300 flex items-center justify-center hover:bg-indigo-500 hover:text-white dark:hover:bg-indigo-500 transition-colors">in</a>
                  <a href="#" className="w-8 h-8 rounded-full bg-slate-200 dark:bg-gray-800 text-slate-600 dark:text-gray-300 flex items-center justify-center hover:bg-indigo-500 hover:text-white dark:hover:bg-indigo-500 transition-colors">tw</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
