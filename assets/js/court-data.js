/**
 * SMASH & SPIN - Court Data Repository
 * Centralized dataset for all Badminton courts & Table Tennis studios
 */

const COURTS_DATA = [
  {
    id: 'center-court-alpha',
    title: 'Center Court Alpha',
    sport: 'Badminton',
    sportKey: 'badminton',
    courtType: 'Court #01 • BWF Synthetic 5mm',
    badgeText: 'Badminton • Court #01',
    badgeClass: 'badge-badminton',
    image: 'assets/images/court-grand-arena.jpg',
    price: 25,
    location: 'Main Sports Complex, Court Hall A',
    status: 'Available',
    openSlots: '6 Slots Open Today',
    summary: 'Our premier BWF tournament-certified court with 5.0mm embossed synthetic vinyl flooring and 800-lux shadowless lighting.',
    description1: 'Center Court Alpha is our flagship badminton court, engineered for sanctioned tournament matches and high-intensity club training. Featuring an authentic 5.0mm BWF tournament-certified embossed vinyl surface laid atop sprung hardwood timber, this court delivers unparalleled shock dissipation and slip resistance.',
    description2: 'Equipped with stadium-grade 800-lux LED indirect lighting fixtures calibrated to prevent eye fatigue during high overhead clears, alongside draft-free precision climate control and tournament umpire seating.',
    specs: {
      flooring: { label: 'Flooring System', val: '5.0mm BWF Grade-1 Vinyl on Sprung Wood' },
      lighting: { label: 'Lighting Lux Level', val: '800 Lux Shadowless Indirect LED' },
      clearance: { label: 'Clearance Height', val: '9.5 Meters (BWF Standard)' },
      climate: { label: 'Climate Control', val: '21°C Constant Zero-Draft Air System' }
    },
    amenities: [
      { icon: 'bi-shield-check', text: 'Non-Marking Mat' },
      { icon: 'bi-water', text: 'Hydration Station' },
      { icon: 'bi-door-closed', text: 'Secure Lockers' },
      { icon: 'bi-fan', text: 'Air Conditioned' },
      { icon: 'bi-wifi', text: 'High-Speed WiFi' },
      { icon: 'bi-camera-video', text: '4K Recording Cam' }
    ],
    guidelines: [
      { strong: 'Footwear:', text: 'Strictly non-marking gum sole badminton shoes required.' },
      { strong: 'Check-in:', text: 'Please arrive 10 minutes prior to your reserved slot for QR verification.' },
      { strong: 'Equipment:', text: 'Pro rackets and tournament shuttles available at the front desk.' },
      { strong: 'Cancellation:', text: 'Free cancellation up to 4 hours before the booked start time.' }
    ]
  },
  {
    id: 'olympic-spin-studio',
    title: 'Olympic Spin Studio',
    sport: 'Table Tennis',
    sportKey: 'table-tennis',
    courtType: 'Table #01 • ITTF Double Fish 25mm',
    badgeText: 'Table Tennis • Table #01',
    badgeClass: 'badge-tt',
    image: 'assets/images/table-olympic-spin.jpg',
    price: 18,
    location: 'Olympic Table Hall, Studio 1',
    status: 'Available',
    openSlots: '8 Slots Open Today',
    summary: 'ITTF-certified competition table tennis studio with Double Fish 25mm blue tabletop, robot spin feeder, and wooden subfloor.',
    description1: 'Olympic Spin Studio is an ITTF-sanctioned table tennis studio built for elite rallying, tournament finals, and technical multiball training. Featuring an official Double Fish 25mm high-density competition tabletop with non-glare anti-friction coating.',
    description2: 'Equipped with a programmable automated robot feeder, high-barrier arena partitions to isolate balls, and specialized shock-absorbing wooden subflooring for explosive side-to-side footwork.',
    specs: {
      flooring: { label: 'Flooring System', val: 'ITTF Approved Non-Slip Wood Flooring' },
      lighting: { label: 'Lighting Lux Level', val: '1000 Lux Diffused Anti-Glare LED' },
      clearance: { label: 'Table Standard', val: 'ITTF Approved 25mm Competition Top' },
      climate: { label: 'Training Feature', val: 'Automated Multi-Spin Feeder Included' }
    },
    amenities: [
      { icon: 'bi-broadcast', text: 'Robot Spin Feeder' },
      { icon: 'bi-lightbulb', text: 'Anti-Glare Lighting' },
      { icon: 'bi-shield-check', text: 'Wooden Subfloor' },
      { icon: 'bi-fan', text: 'Air Conditioned' },
      { icon: 'bi-wifi', text: 'High-Speed WiFi' },
      { icon: 'bi-bounding-box', text: 'High Barrier Surrounds' }
    ],
    guidelines: [
      { strong: 'Footwear:', text: 'Clean indoor sports shoes or table tennis shoes required on wooden floors.' },
      { strong: 'Balls & Paddles:', text: 'ITTF 3-Star 40+ tournament balls and pro paddles available at check-in.' },
      { strong: 'Robot Usage:', text: 'Please return feeder balls to collector nets at the conclusion of your session.' },
      { strong: 'Cancellation:', text: 'Free cancellation up to 4 hours before the booked start time.' }
    ]
  },
  {
    id: 'champions-vip-court',
    title: 'Champions VIP Court',
    sport: 'Badminton',
    sportKey: 'badminton',
    courtType: 'Court #VIP • Private Studio Suite',
    badgeText: 'Badminton • Court #VIP',
    badgeClass: 'badge-badminton',
    image: 'assets/images/court-champions-vip.jpg',
    price: 35,
    location: 'VIP Private Wing, Suite 1',
    status: 'Available',
    openSlots: '4 Slots Open Today',
    summary: 'Exclusive private court suite featuring dual 4K smart match recording, executive lounge, and 5.5mm shock-absorbing mats.',
    description1: 'Champions VIP Court offers the ultimate private athletic environment for executive players, private coaching, and competitive sparring. Features a completely enclosed sound-insulated suite with panoramic glass observation windows.',
    description2: 'Includes a 4K multi-angle broadcast recording camera system with instant cloud replay, premium leather player lounge, dedicated private showers, and customized audio system.',
    specs: {
      flooring: { label: 'Flooring System', val: '5.5mm Premium BWF Shock-Pad Mat' },
      lighting: { label: 'Lighting Lux Level', val: '900 Lux Broadcast-Ready LED' },
      clearance: { label: 'Recording System', val: 'Dual 4K Automated Smart Cameras' },
      climate: { label: 'Private Suite', val: 'Private Lounge, Restroom & Bluetooth Audio' }
    },
    amenities: [
      { icon: 'bi-camera-video', text: 'Match Cam 4K' },
      { icon: 'bi-cup-hot', text: 'VIP Lounge' },
      { icon: 'bi-speaker', text: 'Sound System' },
      { icon: 'bi-water', text: 'Private Showers' },
      { icon: 'bi-fan', text: 'Climate Control' },
      { icon: 'bi-wifi', text: 'High-Speed WiFi' }
    ],
    guidelines: [
      { strong: 'Footwear:', text: 'Strictly non-marking gum sole badminton shoes required.' },
      { strong: 'Private Access:', text: 'Keycard access provided for your group and guests in the VIP lounge.' },
      { strong: '4K Recording:', text: 'Match video links are emailed automatically post-session.' },
      { strong: 'Cancellation:', text: 'Free cancellation up to 4 hours before the booked start time.' }
    ]
  },
  {
    id: 'power-smash-arena',
    title: 'Power Smash Arena',
    sport: 'Badminton',
    sportKey: 'badminton',
    courtType: 'Court #02 • Yonex Matting',
    badgeText: 'Badminton • Court #02',
    badgeClass: 'badge-badminton',
    image: 'assets/images/court-power-smash.jpg',
    price: 24,
    location: 'Main Sports Complex, Court Hall B',
    status: 'Available',
    openSlots: '5 Slots Open Today',
    summary: 'High-traction Yonex tournament court engineered for powerful smashes, doubles rallies, and intensive footwork training.',
    description1: 'Power Smash Arena is optimized for fast-paced doubles matches and smash drills. Fitted with tournament-grade Yonex anti-slip athletic matting designed for high-traction footwork and high recoil resilience.',
    description2: 'Equipped with balanced 750-lux lighting, active moisture control, electronic score tracking, and direct court-side hydration stations.',
    specs: {
      flooring: { label: 'Flooring System', val: 'Yonex All-Court Tournament Mat' },
      lighting: { label: 'Lighting Lux Level', val: '750 Lux Balanced LED Grid' },
      clearance: { label: 'Clearance Height', val: '9.0 Meters Overhead Clearance' },
      climate: { label: 'Climate Control', val: 'Fresh Air Exchange & AC System' }
    },
    amenities: [
      { icon: 'bi-lightbulb', text: '750 Lux LED' },
      { icon: 'bi-fan', text: 'Full AC' },
      { icon: 'bi-water', text: 'Water Point' },
      { icon: 'bi-shield-check', text: 'Yonex Mat' },
      { icon: 'bi-door-closed', text: 'Secure Lockers' },
      { icon: 'bi-wifi', text: 'High-Speed WiFi' }
    ],
    guidelines: [
      { strong: 'Footwear:', text: 'Strictly non-marking gum sole badminton shoes required.' },
      { strong: 'Check-in:', text: 'Please arrive 10 minutes prior to your reserved slot for QR verification.' },
      { strong: 'Equipment:', text: 'Pro rackets and tournament shuttles available at the front desk.' },
      { strong: 'Cancellation:', text: 'Free cancellation up to 4 hours before the booked start time.' }
    ]
  },
  {
    id: 'loop-drive-studio',
    title: 'Loop & Drive Studio',
    sport: 'Table Tennis',
    sportKey: 'table-tennis',
    courtType: 'Table #02 • Butterfly Centrefold 25',
    badgeText: 'Table Tennis • Table #02',
    badgeClass: 'badge-tt',
    image: 'assets/images/table-loop-drive.jpg',
    price: 18,
    location: 'Olympic Table Hall, Studio 2',
    status: 'Available',
    openSlots: '7 Slots Open Today',
    summary: 'Professional Butterfly Centrefold 25 table tennis studio with anti-glare illumination, ball catch nets, and high barrier enclosures.',
    description1: 'Loop & Drive Studio is engineered specifically for fast-paced looping exchanges and high-spin counter rallies. Outfitted with Butterfly Centrefold 25 tournament table offering consistent true bounce.',
    description2: 'Includes spacious court boundaries with high barriers, catch nets for repetitive multiball practice, and high-contrast blue court flooring.',
    specs: {
      flooring: { label: 'Flooring System', val: 'Gerflor Taraflex Table Tennis Mat' },
      lighting: { label: 'Lighting Lux Level', val: '850 Lux Shadowless LED' },
      clearance: { label: 'Table Standard', val: 'Butterfly Centrefold 25 Rollaway' },
      climate: { label: 'Surrounds', val: 'Full Surround High-Barrier Enclosure' }
    },
    amenities: [
      { icon: 'bi-broadcast', text: 'Catch Net' },
      { icon: 'bi-lightbulb', text: 'Glare-Free LED' },
      { icon: 'bi-bounding-box', text: 'High Barrier' },
      { icon: 'bi-fan', text: 'Full AC' },
      { icon: 'bi-shield-check', text: 'Anti-Slip Floor' },
      { icon: 'bi-wifi', text: 'High-Speed WiFi' }
    ],
    guidelines: [
      { strong: 'Footwear:', text: 'Clean indoor sports shoes or table tennis shoes required.' },
      { strong: 'Equipment:', text: 'Butterfly paddles and Nittaku 3-Star balls available at check-in.' },
      { strong: 'Catch Nets:', text: 'Catch nets and ball collection trays available for training.' },
      { strong: 'Cancellation:', text: 'Free cancellation up to 4 hours before the booked start time.' }
    ]
  },
  {
    id: 'falcon-speed-court',
    title: 'Falcon Speed Court',
    sport: 'Badminton',
    sportKey: 'badminton',
    courtType: 'Court #03 • Victor Championship Mat',
    badgeText: 'Badminton • Court #03',
    badgeClass: 'badge-badminton',
    image: 'assets/images/court-falcon-speed.jpg',
    price: 24,
    location: 'Main Sports Complex, Court Hall C',
    status: 'Available',
    openSlots: '9 Slots Open Today',
    summary: 'Victor Championship pro-mat badminton court with 800-lux shadow-free LED grid and optimized shock absorption.',
    description1: 'Falcon Speed Court is designed for intense competitive singles matches and agility training. Features Victor Championship pro-embossed matting that provides maximum grip security during sudden directional changes.',
    description2: 'Calibrated with uniform 800-lux shadow-free illumination, draft-free climate control, and full acoustic sound dampening.',
    specs: {
      flooring: { label: 'Flooring System', val: 'Victor Championship 4.8mm Pro Mat' },
      lighting: { label: 'Lighting Lux Level', val: '800 Lux Shadowless LED System' },
      clearance: { label: 'Clearance Height', val: '9.0 Meters Overhead Clearance' },
      climate: { label: 'Climate Control', val: 'Draft-Free Dual Inverter AC' }
    },
    amenities: [
      { icon: 'bi-lightbulb', text: '800 Lux LED' },
      { icon: 'bi-fan', text: 'Full AC' },
      { icon: 'bi-shield-check', text: 'Grip Safe' },
      { icon: 'bi-water', text: 'Hydration Station' },
      { icon: 'bi-door-closed', text: 'Lockers' },
      { icon: 'bi-wifi', text: 'High-Speed WiFi' }
    ],
    guidelines: [
      { strong: 'Footwear:', text: 'Strictly non-marking gum sole badminton shoes required.' },
      { strong: 'Check-in:', text: 'Please arrive 10 minutes prior to your reserved slot for QR verification.' },
      { strong: 'Equipment:', text: 'Pro rackets and tournament shuttles available at the front desk.' },
      { strong: 'Cancellation:', text: 'Free cancellation up to 4 hours before the booked start time.' }
    ]
  }
];

/**
 * Helper to fetch a single court by its unique ID
 */
function getCourtById(id) {
  if (!id) return COURTS_DATA[0];
  const normalized = id.toString().trim().toLowerCase();
  const found = COURTS_DATA.find(c => c.id.toLowerCase() === normalized);
  return found || COURTS_DATA[0];
}

/**
 * Helper to get related courts excluding the current one
 */
function getRelatedCourts(currentId, limit = 3) {
  return COURTS_DATA.filter(c => c.id !== currentId).slice(0, limit);
}
