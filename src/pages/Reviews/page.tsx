import { useState } from 'react';

const DUMMY_REVIEWS = [
  { id: 1, user: 'Sarah Johnson', rating: 5, date: '1 day ago', content: 'The best food app I have ever used! The recipes are so well-explained, and the ingredients are always fresh when ordered. Highly impressed with the service.', avatar: 'https://i.pravatar.cc/150?u=sarah' },
  { id: 2, user: 'John Doe', rating: 4, date: '1 week ago', content: 'Great variety of dishes. The UI is super smooth and ordering ingredients is a breeze. Would love to see more vegan options though!', avatar: 'https://i.pravatar.cc/150?u=john' },
  { id: 3, user: 'Maria Garcia', rating: 5, date: '2 weeks ago', content: 'Appify completely changed my weekly meal prep. The dashboard helps me track what I cook and the dark mode is just stunning. 10/10!', avatar: 'https://i.pravatar.cc/150?u=maria' },
  { id: 4, user: 'David Kim', rating: 5, date: '1 month ago', content: 'The delivery is always on time, and the food quality is top-notch. Highly recommend the Italian section!', avatar: 'https://i.pravatar.cc/150?u=david' },
  { id: 5, user: 'Emma Wilson', rating: 5, date: '1 month ago', content: 'The step-by-step videos are a lifesaver for someone like me who is just starting to cook. I made the pasta last night and it was perfect!', avatar: 'https://i.pravatar.cc/150?u=emma' },
  { id: 6, user: 'Robert Chen', rating: 4, date: '2 months ago', content: 'Love the variety of international cuisines available. The nutritional information for each recipe is a great feature for tracking my health goals.', avatar: 'https://i.pravatar.cc/150?u=robert' },
  { id: 7, user: 'Sophia Lopez', rating: 5, date: '2 months ago', content: 'Ordering through the app is so convenient. I love how I can add all the ingredients for a recipe to my cart with just one click!', avatar: 'https://i.pravatar.cc/150?u=sophia' },
  { id: 8, user: 'James Taylor', rating: 4, date: '3 months ago', content: 'Solid app with great support. Had a small issue with my delivery once, but the customer service team fixed it immediately. Very impressed!', avatar: 'https://i.pravatar.cc/150?u=james' },
];

export default function Reviews() {
  const [reviews, setReviews] = useState(DUMMY_REVIEWS);
  const [newReview, setNewReview] = useState('');
  const [newRating, setNewRating] = useState(5);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.trim()) return;
    
    const review = {
      id: Date.now(),
      user: 'Guest User',
      rating: newRating,
      date: 'Just now',
      content: newReview,
      avatar: 'https://i.pravatar.cc/150?u=guest'
    };
    
    setReviews([review, ...reviews]);
    setNewReview('');
    setNewRating(5);
  };

  return (
    <div className="bg-slate-50 dark:bg-gray-900 min-h-screen transition-colors duration-300 py-16">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-slate-800 dark:text-white mb-4">Customer Reviews 🌟</h1>
          <p className="text-lg text-slate-600 dark:text-gray-400 max-w-2xl mx-auto">See what our community has to say about their experience with Appify recipes and services.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-10 items-start">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reviews.map((r) => (
              <div key={r.id} className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-md border border-slate-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300 flex flex-col h-full">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <img src={r.avatar} alt={r.user} className="w-10 h-10 rounded-full object-cover border-2 border-indigo-50 dark:border-gray-700" />
                    <div>
                      <h3 className="font-bold text-slate-800 dark:text-white text-sm">{r.user}</h3>
                      <p className="text-[0.7rem] text-slate-400 dark:text-gray-500">{r.date}</p>
                    </div>
                  </div>
                  <div className="flex gap-0.5 text-amber-400 text-xs">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i}>{i < r.rating ? '★' : '☆'}</span>
                    ))}
                  </div>
                </div>
                <p className="text-slate-600 dark:text-gray-300 text-[0.85rem] leading-relaxed italic">"{r.content}"</p>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-br from-indigo-600 to-purple-700 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-8 shadow-xl text-white sticky top-24">
            <h3 className="font-serif text-2xl font-bold mb-2">Leave a Review</h3>
            <p className="text-indigo-100 dark:text-gray-400 text-sm mb-6">We'd love to hear your thoughts on our recipes!</p>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-xs font-bold text-indigo-100 dark:text-gray-400 mb-2 uppercase tracking-wide">Rating</label>
                <div className="flex gap-2 text-2xl cursor-pointer">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span 
                      key={i} 
                      onClick={() => setNewRating(i + 1)}
                      className={i < newRating ? 'text-amber-400' : 'text-white/30 dark:text-gray-600'}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-xs font-bold text-indigo-100 dark:text-gray-400 mb-2 uppercase tracking-wide">Your Experience</label>
                <textarea 
                  className="w-full px-4 py-3 bg-white/10 dark:bg-gray-800 border border-white/20 dark:border-gray-700 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all resize-none" 
                  rows={4} 
                  placeholder="Tell us what you loved..."
                  value={newReview}
                  onChange={(e) => setNewReview(e.target.value)}
                  required
                ></textarea>
              </div>
              
              <button type="submit" className="w-full py-3.5 bg-white text-indigo-600 hover:bg-slate-50 dark:bg-indigo-600 dark:text-white dark:hover:bg-indigo-700 rounded-xl font-bold transition-all shadow-md active:scale-95">
                Post Review
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
