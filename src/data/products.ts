export const PRODUCT_DATA: Record<string, any[]> = {
  'Men': [
    { 
      id: 101, title: "Classic Tailored Suit Jacket", price: 299.99, category: "Men", subCategory: "Formal", image: "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?q=80&w=800&auto=format&fit=crop", rating: 4.8, isBestSeller: true,
      description: "A meticulously crafted tailored suit jacket offering a modern slim fit while retaining classic elegance. Perfect for weddings, business meetings, or any formal occasion.",
      reviews: [{ user: "James W.", rating: 5, comment: "Perfect fit and high quality material." }, { user: "Robert L.", rating: 4, comment: "Very elegant, though sleeves were slightly long." }] 
    },
    { 
      id: 102, title: "Urban Streetwear Hoodie", price: 89.50, category: "Men", subCategory: "Casual", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800&auto=format&fit=crop", rating: 4.5, 
      description: "Stay comfortable and on-trend with this urban heavyweight hoodie. Features a relaxed drop-shoulder fit, a cozy fleece lining, and bold, uncompromising style.",
      reviews: [{ user: "Alex M.", rating: 5, comment: "Super comfy and thick!" }, { user: "Chris P.", rating: 4, comment: "Great color, very warm." }] 
    },
    { 
      id: 103, title: "Premium Denim Jacket", price: 145.00, category: "Men", subCategory: "Outerwear", image: "https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?q=80&w=800&auto=format&fit=crop", rating: 4.7, 
      description: "A timeless, premium denim jacket tailored for the perfect modern silhouette. Crafted with slightly stretchy denim for all-day comfort without sacrificing durability.",
      reviews: [{ user: "Mark T.", rating: 5, comment: "An absolute classic. Goes with everything." }] 
    },
    { 
      id: 104, title: "Minimalist Cotton T-Shirt", price: 35.00, category: "Men", subCategory: "Basics", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop", rating: 4.9, isNew: true,
      description: "The perfect everyday tee. Made from 100% organic cotton, this minimalist t-shirt features a buttery soft feel and a tailored fit that never goes out of style.",
      reviews: [{ user: "Sam R.", rating: 5, comment: "Best basic tee I own. Bought 5 more." }, { user: "Liam K.", rating: 5, comment: "Super soft and fits perfectly." }] 
    },
    { 
      id: 105, title: "Leather Biker Jacket", price: 250.00, category: "Men", subCategory: "Outerwear", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoyYm7KSb94dfCPTSS33cyS8yGjqdmWHa7Pg&s", rating: 4.6, 
      description: "Channel your inner rebel with this authentic leather biker jacket. Featuring heavy-duty hardware, asymmetrical zips, and an incredibly soft interior lining.",
      reviews: [{ user: "Tommy H.", rating: 4, comment: "Great leather quality, needs a bit of breaking in." }] 
    },
    { 
      id: 106, title: "Casual Chino Pants", price: 65.00, category: "Men", subCategory: "Bottoms", image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=800&auto=format&fit=crop", rating: 4.4, 
      description: "Versatile chino pants that strike the perfect balance between casual and smart. Lightweight, breathable, and designed with a hint of stretch for movement.",
      reviews: [{ user: "Kevin B.", rating: 4, comment: "Good pants for the office." }, { user: "Dan V.", rating: 5, comment: "Very comfortable, love the stretch." }] 
    },
    { 
      id: 107, title: "Classic Oxford Shirt", price: 55.00, category: "Men", subCategory: "Formal", image: "https://www.everlane.com/cdn/shop/files/a430bf99_57e0.jpg?v=1753411504", rating: 4.7, 
      description: "A staple in any modern wardrobe, our classic Oxford shirt provides a clean, crisp, and sophisticated look. Wear it tucked or untucked.",
      reviews: [{ user: "Oliver J.", rating: 5, comment: "Excellent fit and the fabric feels premium." }] 
    },
    { 
      id: 108, title: "High-Top Sneakers", price: 120.00, category: "Men", subCategory: "Footwear", image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=800&auto=format&fit=crop", rating: 4.8, 
      description: "Experience premium comfort with these stylish high-top sneakers. Featuring a memory foam insole and genuine leather accents for an elevated streetwear vibe.",
      reviews: [{ user: "Nate W.", rating: 5, comment: "Stylish and incredibly comfortable." }, { user: "Paul E.", rating: 4, comment: "Runs slightly large, order half size down." }] 
    },
    { 
      id: 109, title: "Slim Fit Cargo Pants", price: 75.00, category: "Men", subCategory: "Bottoms", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbdsvmlzyiFM0mZ_hJn4GmOT9Okbj_b_G9uQ&s", rating: 4.5, 
      description: "Utility meets fashion. These slim fit cargo pants offer plenty of pocket space without the bulk, creating a streamlined, functional aesthetic.",
      reviews: [{ user: "Ryan C.", rating: 5, comment: "Love the pocket placements. Very practical." }] 
    },
    { 
      id: 110, title: "Wool Blend Overcoat", price: 320.00, category: "Men", subCategory: "Outerwear", image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=800&auto=format&fit=crop", rating: 4.9, 
      description: "Brave the winter cold in unparalleled style. This luxurious wool-blend overcoat provides exceptional warmth and a sharp, sophisticated silhouette.",
      reviews: [{ user: "Greg H.", rating: 5, comment: "So warm and looks incredibly expensive." }, { user: "Ben M.", rating: 5, comment: "My favorite winter coat." }] 
    },
    { 
      id: 111, title: "Linen Summer Shirt", price: 65.00, category: "Men", subCategory: "Casual", image: "https://lucafaloni.com/_next/image?url=https%3A%2F%2Fa.storyblok.com%2Ff%2F238293%2F1360x607%2F27f88eadff%2Fcapri-blue-portofino-linen-shirt-lf-journal.jpg%2Fm%2F1200x1600&w=3840&q=90", rating: 4.6, 
      description: "Stay cool and breezy with this lightweight linen shirt. Perfect for beach vacations and warm summer evenings.",
      reviews: [{ user: "Leo D.", rating: 4, comment: "Very breathable, perfect for summer." }] 
    },
    { 
      id: 112, title: "Performance Running Shorts", price: 45.00, category: "Men", subCategory: "Basics", image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=800&auto=format&fit=crop", rating: 4.7, 
      description: "Push your limits. These performance running shorts feature moisture-wicking technology and a lightweight design for maximum mobility.",
      reviews: [{ user: "Steve L.", rating: 5, comment: "Great for workouts, very light." }, { user: "Mike R.", rating: 4, comment: "Good quality, nice fit." }] 
    },
    { 
      id: 113, title: "Executive Steel Chronograph", price: 185.00, category: "Men", subCategory: "Accessories", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop", rating: 4.8, 
      description: "A precision-engineered chronograph featuring a surgical-grade stainless steel case and a scratch-resistant sapphire crystal. Perfect for the modern professional.",
      reviews: [{ user: "Alex V.", rating: 5, comment: "Looks much more expensive than it is." }, { user: "Michael S.", rating: 5, comment: "Love the weight and build quality." }] 
    },
    { 
      id: 114, title: "Rugged Field Quartz Watch", price: 95.00, category: "Men", subCategory: "Accessories", image: "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?q=80&w=800&auto=format&fit=crop", rating: 4.6, 
      description: "Designed for the bold. This rugged field watch features high-visibility numerals, a durable nylon strap, and 100m water resistance.",
      reviews: [{ user: "Chris L.", rating: 4, comment: "Solid watch for camping and outdoors." }] 
    },
    { 
      id: 115, title: "Hybrid Tech Bomber Jacket", price: 165.00, category: "Men", subCategory: "Outerwear", image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop", rating: 4.7, isNew: true,
      description: "A fusion of style and function. Water-repellent fabric meets a breathable mesh lining in this modern take on the classic bomber silhouette.",
      reviews: [{ user: "James F.", rating: 5, comment: "Perfect for fall weather. The tech fabric feels great." }] 
    },
    { 
      id: 116, title: "Essential Merino Wool Polo", price: 85.00, category: "Men", subCategory: "Basics", image: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=800&auto=format&fit=crop", rating: 4.8, 
      description: "Experience the temperature-regulating properties of extra-fine Merino wool. This versatile polo offers a clean look and natural odor resistance.",
      reviews: [{ user: "David G.", rating: 5, comment: "So soft and fits like a glove." }] 
    },
    { 
      id: 117, title: "Urban Cargo Joggers", price: 79.00, category: "Men", subCategory: "Bottoms", image: "https://assets.myntassets.com/w_360,q_50,,dpr_2,fl_progressive,f_webp/assets/images/2024/NOVEMBER/4/GkmT2guP_ca88b3d75d104c48af3ccedb2788c1fb.jpg", rating: 4.5, 
      description: "Utility meets comfort. These joggers feature multiple functional pockets and a tapered fit for a sleek, streetwear-inspired look.",
      reviews: [{ user: "Ryan B.", rating: 4, comment: "Great pockets, very comfortable for daily wear." }] 
    },
    { 
      id: 118, title: "Casual Linen-Blend Blazer", price: 145.00, category: "Men", subCategory: "Formal", image: "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?q=80&w=800&auto=format&fit=crop", rating: 4.7, 
      description: "The perfect smart-casual layer. This unlined linen-blend blazer offers a relaxed silhouette and natural breathability for warmer climates.",
      reviews: [{ user: "Oliver S.", rating: 5, comment: "Perfect for summer weddings." }] 
    },
  ],
  'Women': [
    { 
      id: 201, title: "Elegant Silk Evening Dress", price: 350.00, category: "Women", subCategory: "Formal", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop", rating: 4.9, isBestSeller: true,
      description: "A breathtaking pure silk evening dress designed to flow gracefully with every step. Features a flattering bias cut and a delicate cowl neckline.",
      reviews: [{ user: "Sarah K.", rating: 5, comment: "Stunning dress, felt like a queen." }, { user: "Jessica M.", rating: 5, comment: "The silk is so soft and beautiful." }] 
    },
    { 
      id: 202, title: "Chic Summer Blouse", price: 75.00, category: "Women", subCategory: "Casual", image: "https://media.voguearabia.com/photos/68089b9ea55f78d42012d593/2:3/w_1600,c_limit/camicie%20estive%20Launchmetrics.com%20Spotlight%20Milano%20str%20S25%200424.jpg", rating: 4.6, 
      description: "Brighten up your day with this playfully chic summer blouse. Lightweight, breathable, and designed with subtle flutter sleeves.",
      reviews: [{ user: "Emily C.", rating: 4, comment: "Very pretty, slightly sheer." }, { user: "Chloe R.", rating: 5, comment: "Perfect for hot days!" }] 
    },
    { 
      id: 203, title: "High-Waisted Wide Leg Pants", price: 110.00, category: "Women", subCategory: "Bottoms", image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop", rating: 4.7, 
      description: "Effortlessly elegant high-waisted pants boasting a dramatic wide leg. Pair them with heels or flats for a sophisticated, elongated silhouette.",
      reviews: [{ user: "Olivia D.", rating: 5, comment: "These make me look so tall. Love them!" }] 
    },
    { 
      id: 204, title: "Designer Leather Handbag", price: 450.00, category: "Women", subCategory: "Accessories", image: "https://www.bostanten.com/cdn/shop/products/8_16afc2e6-d4a3-42eb-802a-11e21044288c.jpg?v=1697105422&width=1080", rating: 4.8, isNew: true,
      description: "A statement piece that combines luxury with utility. Crafted from full-grain Italian leather, featuring premium gold-tone hardware and ample interior space.",
      reviews: [{ user: "Amanda W.", rating: 5, comment: "Worth every penny. The quality is insane." }, { user: "Rachel T.", rating: 5, comment: "My everyday bag now." }] 
    },
    { 
      id: 205, title: "Floral Midi Skirt", price: 85.00, category: "Women", subCategory: "Bottoms", image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?q=80&w=800&auto=format&fit=crop", rating: 4.5, 
      description: "A gorgeous flowy midi skirt displaying a vibrant, hand-painted floral print. Includes a comfortable elasticated back waistband.",
      reviews: [{ user: "Tina G.", rating: 4, comment: "Beautiful pattern, wrinkles a bit easily though." }] 
    },
    { 
      id: 206, title: "Cashmere Turtleneck Sweater", price: 195.00, category: "Women", subCategory: "Knitwear", image: "https://media.maisoncashmere.com/a48304ef-7d4e-4a4c-9823-719ec3f82e09/maisoncashmere.com/cdn/shop/files/mosel-maxi-cashmere-turtleneck-sweater-MCW078-10-0006-1.webp?v=1754563527&width=480", rating: 4.8, 
      description: "Wrap yourself in luxury. This 100% pure cashmere sweater provides unparalleled softness and an elegant drape, perfect for crisp autumn days.",
      reviews: [{ user: "Diane F.", rating: 5, comment: "Softest sweater I've ever owned." }, { user: "Megan S.", rating: 5, comment: "Incredibly warm without the bulk." }] 
    },
    { 
      id: 207, title: "Classic Trench Coat", price: 210.00, category: "Women", subCategory: "Outerwear", image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop", rating: 4.7, 
      description: "A timeless, water-resistant trench coat. Designed with a double-breasted closure, a removable waist belt, and classic tortoiseshell buttons.",
      reviews: [{ user: "Sophia L.", rating: 5, comment: "Timeless classic, great fit." }] 
    },
    { 
      id: 208, title: "Strappy High Heels", price: 140.00, category: "Women", subCategory: "Footwear", image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=800&auto=format&fit=crop", rating: 4.6, 
      description: "Make a bold statement with these striking strappy heels. Featuring a sleek stiletto heel and an adjustable ankle strap for a secure fit.",
      reviews: [{ user: "Mia P.", rating: 4, comment: "Gorgeous but not for long walks." }, { user: "Jen H.", rating: 5, comment: "Sexy and stylish." }] 
    },
    { 
      id: 209, title: "Bohemian Maxi Dress", price: 125.00, category: "Women", subCategory: "Casual", image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=800&auto=format&fit=crop", rating: 4.7, 
      description: "Embrace a free-spirited vibe with this bohemian maxi dress. Intricate embroidery detailed around the neckline and a tiered, sweeping skirt.",
      reviews: [{ user: "Isabella K.", rating: 5, comment: "So swishy and comfortable." }] 
    },
    { 
      id: 210, title: "Satin Slip Skirt", price: 95.00, category: "Women", subCategory: "Bottoms", image: "https://images.unsplash.com/photo-1577900232427-18219b9166a0?q=80&w=800&auto=format&fit=crop", rating: 4.8, 
      description: "A versatile wardrobe essential. This satin slip skirt can be dressed up with a camisole or dressed down with a chunky knit sweater.",
      reviews: [{ user: "Ella B.", rating: 5, comment: "Feels like butter on the skin." }, { user: "Victoria M.", rating: 5, comment: "Fits perfectly, love the sheen." }] 
    },
    { 
      id: 211, title: "Velvet Party Blazer", price: 180.00, category: "Women", subCategory: "Formal", image: "https://images.unsplash.com/photo-1548624313-0396c75e4b1a?q=80&w=800&auto=format&fit=crop", rating: 4.9, 
      description: "Command the room in this rich velvet blazer. Tailored for a structured fit that beautifully contrasts the soft, plush fabric.",
      reviews: [{ user: "Grace W.", rating: 5, comment: "Absolutely stunning color and texture." }] 
    },
    { 
      id: 212, title: "Gold Hoop Earrings", price: 45.00, category: "Women", subCategory: "Accessories", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ52fV9wiThh3mcWe9DYJ2JuXfUmh763gnr4PB5HRD-c7vdxy--XF9Egl8&s", rating: 4.7, 
      description: "An everyday staple. These 18k gold plated hoop earrings are lightweight, hypoallergenic, and designed for lasting brilliance.",
      reviews: [{ user: "Ava S.", rating: 4, comment: "A bit smaller than expected but very pretty." }, { user: "Lily J.", rating: 5, comment: "I wear them every single day." }] 
    },
    { 
      id: 213, title: "Stellar Rose Gold Watch", price: 165.00, category: "Women", subCategory: "Accessories", image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=800&auto=format&fit=crop", rating: 4.9, isNew: true,
      description: "A timeless masterpiece for your wrist. This rose gold watch features a minimalist sunray dial and a delicate link bracelet.",
      reviews: [{ user: "Sophia G.", rating: 5, comment: "Absolutely elegant. My favorite accessory." }, { user: "Emma L.", rating: 5, comment: "Beautiful finish, looks very luxury." }] 
    },
    { 
      id: 214, title: "Geneva Minimalist Mesh Band Watch - BARTER HUTT", price: 125.00, category: "Women", subCategory: "Accessories", image: "https://www.barterhutt.com/wp-content/uploads/2022/11/BH-7618956.jpg", rating: 4.7, 
      description: "Sleek and versatile. The ultra-thin case and adjustable mesh strap make this watch an effortless companion for any outfit.",
      reviews: [{ user: "Isabella J.", rating: 5, comment: "So light and comfortable. Love the style." }] 
    },
    { 
      id: 215, title: "Sculpted Wrap Midi Dress", price: 115.00, category: "Women", subCategory: "Formal", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop", rating: 4.8, 
      description: "Flatter your silhouette with this elegantly sculpted wrap dress. Featuring a tie-waist and a sophisticated midi length perfect for dinner dates.",
      reviews: [{ user: "Grace K.", rating: 5, comment: "Truly flattering and beautiful fabric." }] 
    },
    { 
      id: 216, title: "Classic Cashmere Cardigan", price: 175.00, category: "Women", subCategory: "Knitwear", image: "https://images.unsplash.com/photo-1543087903-1ac2ec7aa8c5?q=80&w=800&auto=format&fit=crop", rating: 4.9, isBestSeller: true,
      description: "The ultimate in soft luxury. This pure cashmere cardigan offers natural warmth and a timeless button-through design.",
      reviews: [{ user: "Martha E.", rating: 5, comment: "Like wearing a soft cloud. Best investment ever." }] 
    },
    { 
      id: 217, title: "Tailored High-Rise Shorts", price: 65.00, category: "Women", subCategory: "Bottoms", image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=800&auto=format&fit=crop", rating: 4.6, 
      description: "Sharp and sophisticated. These tailored high-rise shorts feature crisp front pleats and a flattering set-in waistband.",
      reviews: [{ user: "Olivia D.", rating: 4, comment: "Very chic for summer and great quality." }] 
    },
    { 
      id: 218, title: "Modern Oversized Poplin Shirt", price: 89.00, category: "Women", subCategory: "Casual", image: "https://www.nu.com.tr/cdn/shop/files/Y26-11038-SIYAH-2.jpg?v=1771340089&width=3392", rating: 4.7, 
      description: "The hero piece of every modern wardrobe. A crisp cotton poplin shirt with a modern oversized cut for a clean, effortless look.",
      reviews: [{ user: "Audrey H.", rating: 5, comment: "Classic and looks great with everything." }] 
    },
  ],
  'Kids': [
    { 
      id: 301, title: "Playful Striped Sweater", price: 45.00, category: "Kids", subCategory: "Knitwear", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz9xIDtbCriwfiV8T4jYJKHcnbuUAvFi-tMduRpg7HZ0lcDL5HYW-72Js&s", rating: 4.7, 
      description: "A fun and brightly colored striped sweater made from itch-free cotton yarn. Designed to withstand playground roughhousing while keeping them warm.",
      reviews: [{ user: "MomOf2", rating: 5, comment: "My son loves the colors, and it washes well." }] 
    },
    { 
      id: 302, title: "Comfortable Denim Overalls", price: 55.00, category: "Kids", subCategory: "Casual", image: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=800&auto=format&fit=crop", rating: 4.8, 
      description: "Classic, durable denim overalls perfect for adventurous kids. Features adjustable shoulder straps and deep pockets for treasures.",
      reviews: [{ user: "DadReview", rating: 5, comment: "Very durable, great for playing outside." }, { user: "Susan P.", rating: 4, comment: "Cute, but the clasps are a bit hard for a toddler." }] 
    },
    { 
      id: 303, title: "Bright Summer Dress", price: 38.00, category: "Kids", subCategory: "Dresses", image: "https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?q=80&w=800&auto=format&fit=crop", rating: 4.6, 
      description: "A delightful, lightweight summer dress with an all-over fruit print. Made with airy cotton poplin for ultimate hot-weather comfort.",
      reviews: [{ user: "Laura H.", rating: 5, comment: "So adorable for summer parties." }] 
    },
    { 
      id: 304, title: "Cozy Winter Puffer Jacket", price: 85.00, category: "Kids", subCategory: "Outerwear", image: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?q=80&w=800&auto=format&fit=crop", rating: 4.9, 
      description: "Keep the cold at bay with this insulated puffer jacket. Features a fleece-lined hood and water-resistant exterior for snowy play days.",
      reviews: [{ user: "Mark D.", rating: 5, comment: "Keeps my kid toasty warm. Runs true to size." }, { user: "Elena F.", rating: 5, comment: "Looks great and very warm." }] 
    },
    { 
      id: 305, title: "Kids' Light-Up Sneakers", price: 60.00, category: "Kids", subCategory: "Footwear", image: "https://images.unsplash.com/photo-1514989940723-e8e51635b782?q=80&w=800&auto=format&fit=crop", rating: 4.7, 
      description: "Add a little magic to their steps! These comfortable, supportive sneakers feature LED lights in the soles that flash with every jump.",
      reviews: [{ user: "Katie P.", rating: 5, comment: "My daughter refuses to take them off!" }] 
    },
    { 
      id: 306, title: "Graphic Print T-Shirt", price: 25.00, category: "Kids", subCategory: "Basics", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_ECQEk7KuudZElIvwpVwOOwDliTQBev6LUA&s", rating: 4.5, 
      description: "A super soft, pre-shrunk cotton tee featuring a cool and durable screen-printed graphic that won't crack or fade in the wash.",
      reviews: [{ user: "John B.", rating: 4, comment: "Good quality shirt, graphic is nice." }] 
    },
    { 
      id: 307, title: "Colorful Rain Boots", price: 40.00, category: "Kids", subCategory: "Footwear", image: "https://cdn.accentuate.io/276663238715/-1747043043438/Rain-Boots-(1)-v1753395407727.jpg?960x650", rating: 4.6, 
      description: "Puddle-jumping approved! These 100% waterproof rubber rain boots keep little feet completely dry and feature non-slip traction soles.",
      reviews: [{ user: "Annie W.", rating: 5, comment: "Perfect for rainy days. Super cute yellow." }, { user: "Tom S.", rating: 4, comment: "Solid boots, easy to clean." }] 
    },
    { 
      id: 308, title: "Warm Beanie and Scarf Set", price: 30.00, category: "Kids", subCategory: "Accessories", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQZXtUdcGwyBhm0JaTPeKnFRdK-Sc-bzZDtw&s", rating: 4.8, 
      description: "A matching, ultra-soft knit beanie and scarf set. Say goodbye to the winter chill with this adorable and practical accessory bundle.",
      reviews: [{ user: "Rebecca J.", rating: 5, comment: "Very soft, my kid actually keeps it on!" }] 
    },
    { 
      id: 309, title: "Kids' Canvas Backpack", price: 45.00, category: "Kids", subCategory: "Accessories", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRREpi9ZMwgdcHRzS-YV_--kezWHV4RAXaEDg&s", rating: 4.7, 
      description: "The ideal backpack for school or sleepovers. Features durable canvas construction, padded straps, and fun, playful patterns.",
      reviews: [{ user: "Carrie M.", rating: 5, comment: "Perfect size for a preschooler." }] 
    },
    { 
      id: 310, title: "Toddler Soft Sole Shoes", price: 35.00, category: "Kids", subCategory: "Footwear", image: "https://sunandlace.com/cdn/shop/files/birth-flower-header.jpg?v=1776204202&width=1920", rating: 4.9, 
      description: "Promote healthy foot development with these flexible, soft-sole leather shoes. Easy to slip on and designed to stay put on wiggly feet.",
      reviews: [{ user: "Nina C.", rating: 5, comment: "Great for first walkers." }, { user: "Kelly V.", rating: 5, comment: "So soft and they stay on well." }] 
    },
    { 
      id: 311, title: "Kids' Pajama Set", price: 32.00, category: "Kids", subCategory: "Basics", image: "https://assets.theplace.com/image/upload/t_plp_img_m,f_auto,q_auto/v1/ecom/assets/products/gym/3054516/3054516_1301.jpg", rating: 4.8, 
      description: "Ensure a good night's sleep in these snug-fitting, 100% breathable cotton pajamas. Designed with fun prints and ribbed cuffs.",
      reviews: [{ user: "Hannah R.", rating: 4, comment: "Cute prints, a bit snug fitting." }] 
    },
    { 
      id: 312, title: "Dinosaur Print Hoodie", price: 42.00, category: "Kids", subCategory: "Casual", image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?q=80&w=800&auto=format&fit=crop", rating: 4.7, 
      description: "Roar! This adorable full-zip hoodie features fierce dinosaur spikes along the hood and back, making imaginative play even more fun.",
      reviews: [{ user: "Dave L.", rating: 5, comment: "My kid thinks he's a T-Rex now." }, { user: "Amanda S.", rating: 5, comment: "Great quality zipper." }] 
    },
    { 
      id: 313, title: "Dextera Lux Watch Swiss Made, Metal Bracelet, Gold Tone, Gold-tone Finish", price: 35.00, category: "Kids", subCategory: "Accessories", image: "https://swnigeria.com/wp-content/uploads/2026/02/dextera-lux-watch-swiss-made-metal-bracelet-gold-tone-gold-tone-finish-swarovski-5715447-2.jpg", rating: 4.8, 
      description: "Empower their discovery! This easy-to-read digital watch features a colorful backlight, stopwatch, and water resistance for all-day play.",
      reviews: [{ user: "SuperMom", rating: 5, comment: "My son uses the stopwatch for everything! Very durable." }] 
    },
    { 
      id: 314, title: "Durable Sport Silicone Watch: Octea Lux Sport 39mm", price: 28.00, category: "Kids", subCategory: "Accessories", image: "https://swnigeria.com/wp-content/uploads/2025/02/octea-lux-sport-watch-metal-bracelet-blue-pvd-swarovski-5610475.jpg", rating: 4.7, 
      description: "Soft but strong. This silicone sport watch is comfortable for little wrists and stands up to the toughest playground action.",
      reviews: [{ user: "DadOfThree", rating: 5, comment: "Tough enough for my 8-year old. Great value." }] 
    },
    { 
      id: 315, title: "Organic Cotton Animal Print Tee", price: 22.00, category: "Kids", subCategory: "Basics", image: "https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?q=80&w=800&auto=format&fit=crop", rating: 4.9, 
      description: "Gentle on skin and big on personality. This 100% organic cotton tee features an adorable hand-drawn animal graphic.",
      reviews: [{ user: "Kelly F.", rating: 5, comment: "So soft and the print is adorable." }] 
    },
    { 
      id: 316, title: "Reversible Hooded Windbreaker", price: 55.00, category: "Kids", subCategory: "Outerwear", image: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=800&auto=format&fit=crop", rating: 4.8, isNew: true,
      description: "Two looks in one! This lightweight windbreaker is reversible, providing two vibrant styles while offering wind and rain protection.",
      reviews: [{ user: "Sarah P.", rating: 5, comment: "Great for unpredictable spring weather. Love the two designs." }] 
    },
    { 
      id: 317, title: "Stretch Denim Comfort Jeans", price: 38.00, category: "Kids", subCategory: "Basics", image: "https://images.unsplash.com/photo-1540479859555-17af45c78602?q=80&w=800&auto=format&fit=crop", rating: 4.6, 
      description: "Freedom to move. These stretch denim jeans offer the classic look of denim with a flexible feel that lets them run, jump, and play.",
      reviews: [{ user: "Mark J.", rating: 4, comment: "Good fit, holds up well in the wash." }] 
    },
    { 
      id: 318, title: "Cozy Fleece Lounge Set", price: 42.00, category: "Kids", subCategory: "Basics", image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?q=80&w=800&auto=format&fit=crop", rating: 4.9, isBestSeller: true,
      description: "The ultimate cozy coordinate. This super-soft fleece set is perfect for weekend relaxations and chilly mornings.",
      reviews: [{ user: "Elena S.", rating: 5, comment: "My daughter never wants to take this off. So soft." }] 
    },
  ],
  'Collections': [
    { 
      id: 401, title: "Limited Edition Chronograph", price: 899.00, category: "Collections", subCategory: "Luxury Watches", image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=800&auto=format&fit=crop", rating: 5.0, isBestSeller: true,
      description: "A striking fusion of engineering and art. This limited-edition automatic chronograph features a sapphire crystal face and aerospace-grade titanium.",
      reviews: [{ user: "Richard G.", rating: 5, comment: "An absolute masterpiece. Stunning watch." }, { user: "Charles E.", rating: 5, comment: "Flawless craftsmanship." }] 
    },
    { 
      id: 402, title: "Signature Leather Boots", price: 280.00, category: "Collections", subCategory: "Footwear", image: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?q=80&w=800&auto=format&fit=crop", rating: 4.8, 
      description: "Heirloom-quality boots built to last a lifetime. Goodyear welt construction, full-grain leather, and unparalleled durability that ages beautifully.",
      reviews: [{ user: "William T.", rating: 5, comment: "Takes time to break in, but totally worth it." }] 
    },
    { 
      id: 403, title: "Oversized Designer Sunglasses", price: 210.00, category: "Collections", subCategory: "Accessories", image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=800&auto=format&fit=crop", rating: 4.7, 
      description: "A modern interpretation of a vintage classic. These oversized frames offer 100% UV protection and an effortlessly glamorous allure.",
      reviews: [{ user: "Maria V.", rating: 5, comment: "So glamorous!" }, { user: "Patricia K.", rating: 4, comment: "A bit heavy on the nose." }] 
    },
    { 
      id: 404, title: "Premium Travel Duffle", price: 320.00, category: "Collections", subCategory: "Luggage", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop", rating: 4.9, isNew: true,
      description: "The ultimate weekender bag. Crafted from water-resistant waxed canvas and reinforced with top-grain leather straps and heavy-duty brass hardware.",
      reviews: [{ user: "Ethan S.", rating: 5, comment: "Perfect size for a 3-day trip. Looks incredibly premium." }] 
    },
    { 
      id: 405, title: "Minimalist Leather Wallet", price: 85.00, category: "Collections", subCategory: "Accessories", image: "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=800&auto=format&fit=crop", rating: 4.6, 
      description: "Ditch the bulk. This ultra-slim leather cardholder is meticulously hand-stitched and designed to carry just what you need.",
      reviews: [{ user: "Chris D.", rating: 4, comment: "Very slim, nice leather smell." }] 
    },
    { 
      id: 406, title: "Rose Gold Pendant Necklace", price: 150.00, category: "Collections", subCategory: "Jewelry", image: "https://i.pinimg.com/236x/66/4b/0f/664b0f285acd2fdcc554a66af01a6de7.jpg", rating: 4.8, 
      description: "An elegant statement of understated luxury. This 14k rose gold necklace features a delicate, geometric pendant that catches the light beautifully.",
      reviews: [{ user: "Lucy B.", rating: 5, comment: "Delicate and beautiful. A great gift." }] 
    },
    { 
      id: 407, title: "Smart Fitness Watch", price: 299.00, category: "Collections", subCategory: "Electronics", image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=800&auto=format&fit=crop", rating: 4.7, 
      description: "Track your health with cutting-edge precision. Features continuous heart-rate monitoring, sleep tracking, and a stunning AMOLED display.",
      reviews: [{ user: "Alex F.", rating: 5, comment: "Battery lasts for days. Very accurate." }, { user: "Jared P.", rating: 4, comment: "Great watch, app could be better." }] 
    },
    { 
      id: 408, title: "Canvas Weekend Tote", price: 120.00, category: "Collections", subCategory: "Bags", image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=800&auto=format&fit=crop", rating: 4.5, 
      description: "Roomy, rugged, and ready for adventure. A heavy-duty canvas tote equipped with multiple interior compartments to keep your essentials organized.",
      reviews: [{ user: "Sandra T.", rating: 4, comment: "Holds so much stuff! Use it as a diaper bag sometimes." }, { user: "Betty C.", rating: 5, comment: "Very sturdy canvas." }] 
    },
    { 
      id: 409, title: "Heritage Automatic Field Watch", price: 650.00, category: "Collections", subCategory: "Luxury Watches", image: "https://cdn-images.farfetch-contents.com/20/25/73/69/20257369_55832081_1000.jpg", rating: 4.9, 
      description: "A tribute to classic horology. This self-winding automatic watch features a vintage-inspired dial and a handmade Italian leather strap.",
      reviews: [{ user: "William B.", rating: 5, comment: "The mechanical sweep is mesmerizing. Pure class." }] 
    },
    { 
      id: 410, title: "Midnight Obsidian Diver Watch", price: 1200.00, category: "Collections", subCategory: "Luxury Watches", image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=800&auto=format&fit=crop", rating: 5.0, isBestSeller: true,
      description: "Engineered for excellence. This professional diver's watch is water-resistant to 300m and features a ceramic unidirectional bezel.",
      reviews: [{ user: "James P.", rating: 5, comment: "The ultimate tool watch. Built like a tank." }] 
    },
    { 
      id: 411, title: "Solar-Powered Aviator Watch", price: 420.00, category: "Collections", subCategory: "Luxury Watches", image: "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?q=80&w=800&auto=format&fit=crop", rating: 4.8, 
      description: "Fusing tech and tradition. This solar-powered watch never needs a battery and features a dual-time display and world time tracking.",
      reviews: [{ user: "Michael T.", rating: 4, comment: "Great for travel, never worrying about battery is a plus." }] 
    },
    { 
      id: 412, title: "Limited Edition Skeleton Watch", price: 2500.00, category: "Collections", subCategory: "Luxury Watches", image: "https://images.unsplash.com/photo-1509112756314-34a0badb29d4?q=80&w=800&auto=format&fit=crop", rating: 5.0, isNew: true,
      description: "A window into history. Witness the intricate mechanical movement through the transparent dial of this masterfully crafted skeleton watch.",
      reviews: [{ user: "George C.", rating: 5, comment: "A work of art for the wrist. Incredible detail." }] 
    },
    { 
      id: 413, title: "Bespoke Italian Leather Belt", price: 145.00, category: "Collections", subCategory: "Accessories", image: "https://www.florenceleathermarket.com/image/cache/data/prodotti/cintura-6159/6159-tm/2048T1-218x218.JPG", rating: 4.8, 
      description: "The finishing touch. Hand-crafted from premium vegetable-tanned leather with a solid brass buckle that will patina beautifully over time.",
      reviews: [{ user: "Robert D.", rating: 5, comment: "The leather quality is far superior to anything in stores." }] 
    },
    { 
      id: 414, title: "Artisan Silk Jacquard Tie", price: 95.00, category: "Collections", subCategory: "Accessories", image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800&auto=format&fit=crop", rating: 4.9, 
      description: "Woven elegance. This pure silk tie features an intricate jacquard pattern and a luxurious weight for a perfect, confident knot.",
      reviews: [{ user: "Henry L.", rating: 5, comment: "The color depth is amazing. Great for special occasions." }] 
    },
  ],
};
