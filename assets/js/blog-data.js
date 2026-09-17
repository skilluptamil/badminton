/**
 * SMASH & SPIN - Sports Blog Data & Dynamic Loader
 * Provides authentic, matching local content for Badminton and Table Tennis articles
 */

const BLOG_ARTICLES = [
  {
    id: 'badminton-footwork-guide',
    category: 'Badminton',
    badgeClass: 'badge-badminton',
    title: 'Mastering 6-Corner Footwork: Essential Badminton Drills',
    date: 'Sep 12, 2026',
    author: 'Coach Marcus Vance',
    authorRole: 'Head Badminton Coach & Former National Player',
    authorAvatar: 'assets/images/academy-coaching-footwork.jpg',
    authorBio: 'With over 14 years of professional coaching experience, Marcus trains athletes on court kinematics, explosive agility, and tournament tactical recovery.',
    readTime: '6 min read',
    image: 'assets/images/blog-badminton-footwork.jpg',
    summary: 'Discover how elite players recover quickly to the center court using split-steps, lunges, and scissor kicks.',
    content: `
      <p class="lead">Badminton is the fastest racket sport in the world, with shuttlecocks exceeding 400 km/h. Yet, matches are won or lost not merely by racket strength, but by footwork precision and recovery speed.</p>
      
      <h3 class="fw-bold text-dark mt-4 mb-3">1. The Foundation: The Split-Step</h3>
      <p>Before any explosive burst toward the net or rearcourt, your body must be balanced with your center of gravity lowered. The split-step is a subtle hop performed the instant your opponent makes racket contact. It loads the calf and quad muscles like springs, allowing instant omnidirectional movement.</p>

      <h3 class="fw-bold text-dark mt-4 mb-3">2. Front-Court Lunge & Heel-First Landing</h3>
      <p>When charging forward to return a delicate drop shot or net kill, always land with your racket-foot heel first, rolling onto your toes. This protects your patellar tendon and maintains posture so your upper body does not topple forward.</p>

      <div class="p-4 my-4 bg-light border-start border-primary border-4 rounded-3">
        <p class="fst-italic mb-0 text-dark">"Footwork is 70% of badminton. If you are half a second late to the shuttle, even the most perfect smash technique becomes ineffective."</p>
      </div>

      <h3 class="fw-bold text-dark mt-4 mb-3">3. Rear-Court Scissor Kick</h3>
      <p>The scissor kick allows you to transition backward rapidly, strike an overhead smash or clear at the peak of your jump, and use kinetic momentum to land facing forward, ready for the next return.</p>

      <h3 class="fw-bold text-dark mt-4 mb-3">4. Daily 15-Minute Shadow Drill</h3>
      <p>Practice 6-corner shadow movements without the shuttlecock 3 times a week. Focus on returning to the "T" mark after every strike with minimal steps.</p>
    `,
    tags: ['Badminton', 'Footwork', 'Training', 'Fitness', 'Drills']
  },
  {
    id: 'table-tennis-spin-techniques',
    category: 'Table Tennis',
    badgeClass: 'badge-tt',
    title: 'The Art of Spin: How to Read and Counter Heavy Topspin',
    date: 'Sep 10, 2026',
    author: 'Elena Rostova',
    authorRole: 'ITTF Certified Instructor & European Tour Veteran',
    authorAvatar: 'assets/images/academy-table-tennis-spin.jpg',
    authorBio: 'Elena specializes in advanced spin mechanics, heavy loop counter-attacks, and deceptive multi-angle stroke development for competitive tournament players.',
    readTime: '5 min read',
    image: 'assets/images/blog-table-tennis-spin.jpg',
    summary: 'Learn the biomechanics of brush contact, rubber friction, and angle adjustments to neutralize aggressive loops.',
    content: `
      <p class="lead">In high-level table tennis, spin dictates the game. Understanding the subtle difference between sidespin, heavy topspin, and backspin turns defense into counter-offensive points.</p>

      <h3 class="fw-bold text-dark mt-4 mb-3">1. Reading the Opponent's Racket Angle</h3>
      <p>Watch the acceleration and brushing motion of your opponent's blade. An upward brushing contact produces violent topspin causing the ball to dip quickly and bounce aggressively forward off your side.</p>

      <h3 class="fw-bold text-dark mt-4 mb-3">2. Blade Angle Adjustment on Block</h3>
      <p>When returning a heavy loop drive, close your blade angle (face down) and make early contact right off the bounce. Using your opponent's pace allows you to redirect the ball sharply into open angles.</p>

      <div class="p-4 my-4 bg-light border-start border-primary border-4 rounded-3">
        <p class="fst-italic mb-0 text-dark">"Don't fight the spin—work with the trajectory. Early timing eliminates the explosive bounce of heavy loops."</p>
      </div>

      <h3 class="fw-bold text-dark mt-4 mb-3">3. Equipment Selection: Tacky vs. Tensor Rubbers</h3>
      <p>Chinese-style tacky rubbers provide unmatched spin creation on serves and short pushes, while European/Japanese tensor rubbers provide catapult speed for mid-distance rallies.</p>
    `,
    tags: ['Table Tennis', 'Spin', 'Techniques', 'Equipment', 'Drills']
  },
  {
    id: 'racket-string-tension-guide',
    category: 'Badminton',
    badgeClass: 'badge-badminton',
    title: 'Badminton String Tension Explained: 22 lbs vs 28 lbs',
    date: 'Sep 05, 2026',
    author: 'Coach Marcus Vance',
    authorRole: 'Head Badminton Coach & Master Racket Stringer',
    authorAvatar: 'assets/images/academy-badminton-smash.jpg',
    authorBio: 'Certified stringing technician and high-performance coach specializing in racket ergonomics, string elasticity, and sweet spot power optimization.',
    readTime: '7 min read',
    image: 'assets/images/blog-racket-strings.jpg',
    summary: 'Find the sweet spot between power, trampoline effect, shuttle control, and injury prevention for your skill tier.',
    content: `
      <p class="lead">String tension is often misunderstood by intermediate players. Many believe higher tension automatically gives more power—which is a common misconception.</p>

      <h3 class="fw-bold text-dark mt-4 mb-3">1. Low to Medium Tension (20 - 24 lbs)</h3>
      <p>Lower tension creates a trampoline effect. The string bed flexes deeply upon impact, generating effortless power for clears and high lobs. It also enlarges the sweet spot, making it forgiving for beginners and arm-friendly.</p>

      <h3 class="fw-bold text-dark mt-4 mb-3">2. High Tension (26 - 30+ lbs)</h3>
      <p>High tension shrinks the sweet spot and requires crisp, fast wrist snap. However, it offers surgical control, sharp slice drops, and instant shuttle response for advanced tournament players.</p>

      <div class="p-4 my-4 bg-light border-start border-primary border-4 rounded-3">
        <p class="fst-italic mb-0 text-dark">"Lower tension gives effortless depth; higher tension gives pinpoint accuracy. Match your tension to your swing technique, not your ego."</p>
      </div>

      <h3 class="fw-bold text-dark mt-4 mb-3">3. Recommended String Thickness</h3>
      <p>For durable training, choose 0.68mm - 0.70mm strings (e.g. BG65). For tournament explosive sound and repulsion, go with 0.61mm - 0.65mm thin gauge strings.</p>
    `,
    tags: ['Badminton', 'Equipment', 'Strings', 'Rackets', 'Pro Tips']
  },
  {
    id: 'court-stamina-nutrition-hydration',
    category: 'Fitness',
    badgeClass: 'badge-badminton',
    title: 'Hydration & Nutrition Protocol for 3-Hour Tournament Days',
    date: 'Aug 28, 2026',
    author: 'Dr. Sarah Jenkins',
    authorRole: 'High Performance Sports Nutritionist',
    authorAvatar: 'assets/images/facility-cafe-lounge.jpg',
    authorBio: 'Dr. Jenkins consults with elite racket athletes on intra-match glycogen refueling, electrolyte balancing, and accelerated muscular recovery protocols.',
    readTime: '4 min read',
    image: 'assets/images/blog-nutrition-hydration.jpg',
    summary: 'Prevent cramps and maintain peak mental reflexes with the optimal electrolyte, carb, and recovery strategy.',
    content: `
      <p class="lead">Both badminton and table tennis demand intense anaerobic sprints punctuated by brief rest periods. Dehydration of just 2% drops reaction time by over 15%.</p>

      <h3 class="fw-bold text-dark mt-4 mb-3">1. Pre-Match Carb Loading & Hydration</h3>
      <p>Consume slow-digesting complex carbs 2 to 3 hours prior to match time (oatmeal, brown rice, bananas). Sip 500ml of electrolyte water with sodium and potassium.</p>

      <h3 class="fw-bold text-dark mt-4 mb-3">2. Intra-Match Sustenance</h3>
      <p>Between sets and matches, consume simple carbohydrates like energy gels or electrolyte isotonic drinks to maintain glycogen availability.</p>

      <div class="p-4 my-4 bg-light border-start border-primary border-4 rounded-3">
        <p class="fst-italic mb-0 text-dark">"Hydrate before you feel thirsty. By the time you notice dry mouth, your cognitive processing speed and split-step reflexes are already impaired."</p>
      </div>

      <h3 class="fw-bold text-dark mt-4 mb-3">3. Post-Match Golden Window (30 Mins)</h3>
      <p>Combine 20g whey protein with 40g rapid carbs to jumpstart muscle fiber repair and reduce delayed onset muscle soreness (DOMS).</p>
    `,
    tags: ['Fitness', 'Nutrition', 'Hydration', 'Tournament', 'Recovery']
  },
  {
    id: 'table-tennis-serve-secrets',
    category: 'Table Tennis',
    badgeClass: 'badge-tt',
    title: '5 Deceptive Table Tennis Serves That Win Easy Third-Ball Points',
    date: 'Aug 20, 2026',
    author: 'Elena Rostova',
    authorRole: 'ITTF Certified Instructor & European Tour Veteran',
    authorAvatar: 'assets/images/table-loop-drive.jpg',
    authorBio: 'Elena specializes in deceptive wrist snapping, contact masking, and tactical 3rd-ball setups that dominate league and tournament tables.',
    readTime: '6 min read',
    image: 'assets/images/blog-table-tennis-serves.jpg',
    summary: 'Unlock the Pendulum, Reverse Pendulum, Tomahawk, and Ghost backspin serves with identical preparatory motions.',
    content: `
      <p class="lead">A deceptive serve is not just about extreme spin—it is about disguising the contact point so your opponent cannot predict the ball's trajectory.</p>

      <h3 class="fw-bold text-dark mt-4 mb-3">1. The Pendulum Serve with No-Spin Variation</h3>
      <p>By mimicking the exact arm speed and contact brushing, but striking the ball near the center axis of the paddle rather than the tip, you produce a knuckleball (no-spin) that pops up for an easy smash.</p>

      <h3 class="fw-bold text-dark mt-4 mb-3">2. The Ghost Serve (Backspin Return)</h3>
      <p>Brushing strictly underneath the ball with maximum wrist acceleration produces heavy underspin, causing the ball to bounce twice on the opponent's side or spin backwards into the net.</p>

      <div class="p-4 my-4 bg-light border-start border-primary border-4 rounded-3">
        <p class="fst-italic mb-0 text-dark">"The true magic of deception lies in the follow-through. Keep your starting movement and ending flourish identical regardless of spin."</p>
      </div>

      <h3 class="fw-bold text-dark mt-4 mb-3">3. Tactical Third-Ball Attack</h3>
      <p>Always anticipate where the opponent's return must travel based on your serve type, positioning yourself for an aggressive kill.</p>
    `,
    tags: ['Table Tennis', 'Serves', 'Tactics', 'Championship']
  },
  {
    id: 'court-booking-peak-vs-non-peak',
    category: 'News',
    badgeClass: 'badge-badminton',
    title: 'Maximizing Court Time: Peak vs Non-Peak Booking Strategies',
    date: 'Aug 14, 2026',
    author: 'Smash & Spin Operations',
    authorRole: 'Arena Management & Scheduling Lead',
    authorAvatar: 'assets/images/about-championship-arena.jpg',
    authorBio: 'Dedicated to maximizing player access, optimizing booking schedules, and providing world-class arena facilities for badminton and table tennis athletes.',
    readTime: '3 min read',
    image: 'assets/images/blog-court-booking-strategy.jpg',
    summary: 'Save up to 40% on court rental fees and enjoy dedicated coaching slots during weekday morning and afternoon hours.',
    content: `
      <p class="lead">Whether you are a casual player or training for competitive leagues, smart scheduling can save money while securing uninterrupted court time.</p>

      <h3 class="fw-bold text-dark mt-4 mb-3">1. The Non-Peak Advantage</h3>
      <p>Weekday mornings (6:00 AM – 4:00 PM) offer pristine court conditions, quiet arenas, and discounted hourly rates starting from just $15/hr.</p>

      <h3 class="fw-bold text-dark mt-4 mb-3">2. Advance Booking for Prime Weekend Slots</h3>
      <p>Weekend slots fill rapidly. Members enjoy 14-day advance priority booking windows, ensuring your regular doubles squad never misses a weekend match.</p>

      <div class="p-4 my-4 bg-light border-start border-primary border-4 rounded-3">
        <p class="fst-italic mb-0 text-dark">"Consistent court time beats occasional marathon sessions. Booking non-peak mornings 3x weekly yields 200% faster skill progression."</p>
      </div>

      <h3 class="fw-bold text-dark mt-4 mb-3">3. Multi-Court Pass Savings</h3>
      <p>Purchasing 10-session passes unlocks an additional 15% discount on top of non-peak pricing.</p>
    `,
    tags: ['Court Booking', 'Savings', 'Membership', 'News']
  }
];

// Helper functions for rendering blog lists and details
function getArticleById(id) {
  if (!id) return BLOG_ARTICLES[0];
  const normalized = id.toString().trim().toLowerCase();
  return BLOG_ARTICLES.find(article => article.id.toLowerCase() === normalized) || BLOG_ARTICLES[0];
}

function getRelatedArticles(currentId, count = 3) {
  return BLOG_ARTICLES.filter(article => article.id !== currentId).slice(0, count);
}
