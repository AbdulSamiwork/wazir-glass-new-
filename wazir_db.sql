-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Sep 01, 2026 at 06:15 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `wazir_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `wazir_admins`
--

CREATE TABLE `wazir_admins` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `token` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `wazir_admins`
--

INSERT INTO `wazir_admins` (`id`, `username`, `password`, `token`, `created_at`) VALUES
(1, 'admin', '$2y$10$ZPDv66cm5/6aUGDAK.u/uu7Nq6aQifNFahDChAXbMSu6MW2OXVH76', '982995256e4eeabea438d03b55c08e15e121892d409ddfc70a01d5ea89e946fd', '2026-09-01 16:11:56');

-- --------------------------------------------------------

--
-- Table structure for table `wazir_before_after`
--

CREATE TABLE `wazir_before_after` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `beforeImage` text DEFAULT NULL,
  `afterImage` text DEFAULT NULL,
  `beforeLabel` varchar(255) DEFAULT NULL,
  `afterLabel` varchar(255) DEFAULT NULL,
  `specs` text DEFAULT NULL,
  `impact` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `wazir_before_after`
--

INSERT INTO `wazir_before_after` (`id`, `title`, `category`, `beforeImage`, `afterImage`, `beforeLabel`, `afterLabel`, `specs`, `impact`) VALUES
(1, 'Frameless Commercial Shop Front', 'Commercial Plaza • Lahore', 'https://images.unsplash.com/photo-1541888946425-d0ebb18086f6?auto=format&fit=crop&w=1200&q=80', 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80', 'Old Iron Shutter & Ordinary Frame', 'Wazir 12mm Frameless Toughened Glass', '[\"12mm Clear Tempered Glass\",\"Hydraulic Floor Spring Hinges\",\"304 Grade Stainless Steel Patch Fittings\"]', '+300% Customer Footfall & Modern Aesthetic'),
(2, 'Luxury Villa Soundproof Windows', 'DHA Residential • Lahore', 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80', 'Drafty Single-Pane Wooden Window', 'Wazir Thermal Break Double Glazing', '[\"24mm Double Glazed Sealed Unit\",\"Thermal Break Aluminium Profile\",\"Multi-Point German Locking System\"]', '95% Noise Reduction & 40% AC Energy Savings'),
(3, 'Executive Office Glass Partition', 'Gulberg Corporate Tower', 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80', 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80', 'Dark Drywall & Cubicle Dividers', 'Acoustic Glass Partition with Slim Frame', '[\"10mm Laminated Acoustic Glass\",\"Matte Black Anodized Slim Frame\",\"Soft-Close Sliding Glass Door\"]', 'Maximized Natural Daylight & Executive Soundproofing'),
(4, 'Frameless Shower Cubicle & LED Mirror', 'Bahria Town Villa • Islamabad', 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80', 'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1200&q=80', 'Basic Open Shower & Ordinary Mirror', 'Wazir 10mm Frameless Glass Cubicle & LED Mirror', '[\"10mm Acid-Etched Safety Glass\",\"Matt Black Stainless Steel Hinges\",\"Touch Sensor LED Backlit Mirror\"]', 'Spa-Grade Luxury Upgrade & 100% Water Splash Protection');

-- --------------------------------------------------------

--
-- Table structure for table `wazir_bills`
--

CREATE TABLE `wazir_bills` (
  `id` int(11) NOT NULL,
  `bill_number` varchar(100) NOT NULL,
  `date` date NOT NULL,
  `customer_name` varchar(255) NOT NULL,
  `customer_phone` varchar(50) NOT NULL,
  `customer_address` text DEFAULT NULL,
  `items` text NOT NULL,
  `subtotal` decimal(15,2) NOT NULL,
  `discount` decimal(5,2) DEFAULT 0.00,
  `discount_amount` decimal(15,2) DEFAULT 0.00,
  `tax_rate` decimal(5,2) DEFAULT 0.00,
  `tax_amount` decimal(15,2) DEFAULT 0.00,
  `total` decimal(15,2) NOT NULL,
  `amount_received` decimal(15,2) DEFAULT 0.00,
  `remaining_amount` decimal(15,2) DEFAULT 0.00,
  `notes` text DEFAULT NULL,
  `status` varchar(50) DEFAULT 'pending',
  `converted_from_quotation` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `wazir_categories`
--

CREATE TABLE `wazir_categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `meta` varchar(100) DEFAULT NULL,
  `image` text DEFAULT NULL,
  `details` text DEFAULT NULL,
  `specs` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `wazir_categories`
--

INSERT INTO `wazir_categories` (`id`, `name`, `description`, `meta`, `image`, `details`, `specs`) VALUES
(1, 'Aluminium Windows', 'Weather-resistant, sleek framing for residential and commercial architectural structures.', 'Windows', 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=600&q=80', 'Our premium aluminium windows are designed to combine high weather resistance with minimalist sightlines, maximizing daylight and aesthetic appeal.', '{\"Profile Depth\":\"50mm - 100mm\",\"Glass Infill\":\"5mm Single to 24mm Double Glazed\",\"Weathering\":\"Dual EPDM Compression Seals\",\"Thermal Option\":\"Available with Polyamide Thermal Break\"}'),
(2, 'Aluminium Doors', 'Heavy-duty entryways with thermal breaks, high security locking, and customizable hinges.', 'Doors', 'https://images.unsplash.com/photo-1517502884422-41eaaced0168?auto=format&fit=crop&w=600&q=80', 'Premium heavy-duty aluminium entrance and swing doors designed for durability, high-security locking, and modern architectural aesthetics.', '{\"Frame Depth\":\"75mm to 120mm\",\"Hinge Spec\":\"3D Adjustable Heavy Duty Friction Hinges\",\"Security\":\"3-Point Secure Multi-Locking System\",\"Finish\":\"Polyester Powder Coated (80+ microns)\"}'),
(3, 'Glass Doors', 'Sleek, frameless glass panel doors with heavy hydraulic floor hinges and luxury handles.', 'Doors', 'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?auto=format&fit=crop&w=600&q=80', 'Sleek frameless glass doors featuring heavy hydraulic floor spring hinges that allow double-action swing. Provides a clean, modern entryway for boutique shops and offices.', '{\"Glass Spec\":\"10mm or 12mm Toughened Safety Glass\",\"Floor Hinge\":\"Double-Action Hydraulic Floor Spring\",\"Handles\":\"Stainless Steel 304 Pull Handles (600mm - 1200mm)\",\"Lock Options\":\"Floor Corner Locks with Euro Profile Cylinder\"}'),
(4, 'Glass Partitions', 'Minimalist floor-to-ceiling glass wall separations to optimize workspace layouts.', 'Partitions', 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=600&q=80', 'Minimalist floor-to-ceiling glass wall partitions to optimize office layouts while preserving open-plan daylight and visual connectivity.', '{\"Framing\":\"Slim 25mm Anodized Aluminium U-Channels\",\"Acoustics\":\"Sound Reduction up to 36dB (Laminated Glass)\",\"Max Height\":\"Up to 3.2 meters\",\"Glass Core\":\"10mm / 12mm Tempered Safety Glass\"}'),
(5, 'Shop Front Glass', 'High-impact thick structural glass displays displays displays tailored for showrooms, salons, and retail shops.', 'Shop Fronts', 'https://images.unsplash.com/photo-1596436889106-be35e843f974?auto=format&fit=crop&w=600&q=80', 'High-impact thick structural glass displays designed specifically for showroom entrances, retail shops, and commercial lobbies to maximize storefront exposure.', '{\"Glass Thickness\":\"12mm Toughened / 15mm Extra Clear Laminated\",\"Spider Fittings\":\"Optional SS304 Point-Fixed Systems\",\"Deflection Limit\":\"L/175 structural load compliance\",\"Sealant\":\"Structural Grade Weatherproof Silicone\"}'),
(6, 'Office Glass Cabins', 'Sound-insulated premium office rooms featuring integrated sliding doors and silver fittings.', 'Partitions', 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=600&q=80', 'Premium acoustic-insulated private glass office cabins. Features slim-profile framing, fully integrated sliding doors, and luxury silver fittings.', '{\"System Type\":\"Modular Demountable Glazing\",\"Door Type\":\"Top-Hung Sliding Glass Door or Framed Swing Door\",\"Acoustic Seal\":\"Magnetic Door Seals and EPDM Gaskets\",\"Frame Colors\":\"Anodized Silver or Matte Black\"}'),
(7, 'Mirrors', 'Custom cut silver, bronze, or LED-backlit mirrors for vanity, bathrooms, and gyms.', 'Mirrors', 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=600&q=80', 'Custom-cut silver, bronze, or antique mirror sheets with optional LED-backlighting. Tailored to fit bathroom vanities, wardrobe doors, and home fitness studios.', '{\"Mirror Thickness\":\"5mm or 6mm High-Clarity Silver Mirror\",\"Edge Work\":\"Flat Polished or Beveled (10mm - 25mm)\",\"Backing\":\"Safety Category II Shatter-Resistant Film\",\"LED Options\":\"IP44 Waterproof Backlit (Warm/Cool/Natural)\"}'),
(8, 'Shower Glass', 'Tempered glass shower enclosures with water-repellent coating and premium steel hinges.', 'Shower', 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=600&q=80', 'Tempered safety glass shower enclosures with water-repellent protective coatings. Engineered with high-strength solid brass hinges and clear sealing strips.', '{\"Enclosure Type\":\"Corner sliding, walk-in screen, or inline swing\",\"Glass Finish\":\"Clear, Frosted, or Low-Iron Extra Clear\",\"Hinges & Brackets\":\"Solid Brass Chrome/Matte Black Finishes\",\"Water Coating\":\"Hydrophobic Nano-Glass Shield\"}'),
(9, 'Sliding Windows', 'Smooth track rolling window systems systems designed to maximize daylight and save room space.', 'Windows', 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=600&q=80', 'Smooth-glide horizontal sliding window systems designed with heavy-duty rollers and tracks. Perfect for space-saving areas facing balconies or courtyards.', '{\"Roller Type\":\"Tandem Brass/Nylon Adjustable Rollers\",\"Locking Type\":\"Crescent Lock or Flush Keyed Lock\",\"Drainage\":\"Integrated Weep Holes and Water Baffle Caps\",\"Mesh Option\":\"Heavy Duty Aluminium Fly Screen Mesh\"}'),
(10, 'Aluminium Frames', 'Heavy gauge custom profile framing anodized or powder-coated in bronze, black, or silver.', 'Frames', 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80', 'Heavy gauge custom profile framing systems anodized or powder-coated in bronze, matte black, or classic silver to support large structural glass panels.', '{\"Alloy Grade\":\"AA 6063-T6 Structural Grade\",\"Wall Thickness\":\"1.6mm to 2.2mm heavy gauge profiles\",\"Joint Construction\":\"Hydraulic Crimped Corners with Corner Cleats\",\"Finishes\":\"Qualicoat Class 1 & 2 Approved Powders\"}'),
(11, 'Glass Railing', 'Stainless steel and glass balcony or staircase barriers barriers barriers for an unobstructed modern view.', 'Railings', 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=600&q=80', 'Minimalist stainless steel and toughened glass balustrade railing systems for balconies, staircases, and terrace borders, ensuring an unobstructed modern view.', '{\"Post Options\":\"SS304 / SS316 Round, Square, or Spigot base\",\"Glass Spec\":\"12mm Toughened or 13.52mm SGP Laminated\",\"Handrail\":\"Sleek Top-slot Tube or Frameless Side-Mount\",\"Load Compliance\":\"Complies with 0.74kN/m line load standards\"}'),
(12, 'Custom Glass Work', 'Bespoke glass shelves, table tops, sandblasted frosted designs, and frosted pattern engraving.', 'Bespoke', 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80', 'Bespoke glass products customized to client dimensions, including heavy dining table tops, glass shelves, frosted decorative patterns, and sandblasted motifs.', '{\"Glass Type\":\"Toughened, Tinted (Bronze/Grey), or Frosted\",\"Edge Polishing\":\"Pencil Polish, OG Cut, or Flat Polished\",\"Frosted Design\":\"Bespoke Acid Etched or Sandblasted Patterns\",\"Max Size\":\"Bespoke to architectural requirements\"}');

-- --------------------------------------------------------

--
-- Table structure for table `wazir_featured_products`
--

CREATE TABLE `wazir_featured_products` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `tagline` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `use_case` text DEFAULT NULL,
  `specifications` text DEFAULT NULL,
  `image` text DEFAULT NULL,
  `features` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `wazir_featured_products`
--

INSERT INTO `wazir_featured_products` (`id`, `title`, `tagline`, `description`, `use_case`, `specifications`, `image`, `features`) VALUES
(1, 'Aluminium Sliding Windows', 'Smooth Glide, Extreme Durability', 'Engineered with heavy-gauge anodized aluminium and double-glazing options. Designed to provide flawless rolling track operations, high wind load resistance, and premium heat-and-noise insulation.', 'Premium residences, corporate offices, high-rise buildings.', 'Profiles: 1.6mm - 2.0mm thickness // Anodized Silver, Bronze, or Charcoal grey.', 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80', '[\"Stainless steel rolling tracks\",\"Double-glazed glass compatibility\",\"Multi-point secure locking system\",\"Weatherproof rubber gaskets\"]'),
(2, 'Glass Office Partitions', 'Sleek Corporate Transparency', 'Provide sound-deadening properties and elegant partition walls for offices and conference rooms. Installed with minimalist slimline aluminium tracks and patch fittings.', 'Corporate workspaces, boutique offices, commercial cabins.', 'Glass type: Tempered/Laminated safety glass // Fitting Finish: Polished Stainless Steel.', 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=80', '[\"10mm - 12mm toughened safety glass\",\"Slimline 25mm perimeter channels\",\"Integrated lockable glass doors\",\"Frosted pattern or logo customization\"]'),
(3, 'Shop Front Glass Design', 'High-Visibility Retail Displays', 'Designed for premium retail storefronts and showrooms. Maximizes street visibility with large-span heavy-duty glass sheets and custom top-and-bottom structural framing.', 'Showrooms, retail shops, boutique storefronts, car dealerships.', 'Tempered float glass // Heavy duty 100kg floor spring hinges.', 'https://images.unsplash.com/photo-1596436889106-be35e843f974?auto=format&fit=crop&w=800&q=80', '[\"Jumbo-size glass installation\",\"Robust architectural profile borders\",\"Self-closing double doors\",\"Heavy-duty patch locks\"]'),
(4, 'Custom Decorative Mirrors', 'Reflection of Luxury', 'Handcrafted mirrors precision cut to custom dimensions. Available with polished bevels, metal frame encasings, and smart integrated LED backlighting for luxury interiors.', 'Salons, gyms, master bathrooms, luxury hotel lobbies.', 'Mirror thickness: 5mm - 6mm // Backframe: Heavy oxidation-resistant aluminium.', 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=800&q=80', '[\"High-definition copper-free mirror glass\",\"Premium bevel edges (1/2\\\" to 1\\\")\",\"Integrated dimmable LED glow options\",\"Aluminium support backframe\"]');

-- --------------------------------------------------------

--
-- Table structure for table `wazir_gallery`
--

CREATE TABLE `wazir_gallery` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `size` varchar(100) DEFAULT NULL,
  `desc` text DEFAULT NULL,
  `image` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `wazir_gallery`
--

INSERT INTO `wazir_gallery` (`id`, `title`, `category`, `size`, `desc`, `image`) VALUES
(1, 'Modern Double Glazed Window', 'Windows', '1200 x 1800 mm', 'Thermal break aluminium sliding system.', 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=600&q=80'),
(2, 'Frameless Shop Front Entrance', 'Shop Fronts', '2400 x 4200 mm', '12mm tempered safety glass with heavy rail profile.', 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80'),
(3, 'Office Glass Partition Wall', 'Glass Partitions', '3000 x 6000 mm', 'Minimalist black anodized perimeter channels.', 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=600&q=80'),
(4, 'Durable Pivot Entrance Door', 'Doors', '1500 x 2800 mm', 'Pivot hinge system with wood-effect metal casing.', 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=600&q=80'),
(5, 'Smart Backlit vanity Mirror', 'Mirrors', '800 x 1200 mm', 'Beveled edge layout with warm white LED light strips.', 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=600&q=80'),
(6, 'Heavy Commercial Curtain Wall', 'Aluminium Work', 'Multi-Floor', 'Integrated architectural structure for storefront showroom.', 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80'),
(7, 'Frameless Glass Balcony Railing', 'Aluminium Work', '15 Meters Length', 'Heavy floor base profiles with transparent glass panels.', 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80'),
(8, 'Acoustic Double-Glazed Office Cabin', 'Glass Partitions', '3600 x 3000 mm', 'Integrated sliding glass door and soundproof gaskets.', 'https://images.unsplash.com/photo-1606857521015-7f9fcf423740?auto=format&fit=crop&w=600&q=80');

-- --------------------------------------------------------

--
-- Table structure for table `wazir_quotations`
--

CREATE TABLE `wazir_quotations` (
  `id` int(11) NOT NULL,
  `quotation_number` varchar(100) NOT NULL,
  `date` date NOT NULL,
  `customer_name` varchar(255) NOT NULL,
  `customer_phone` varchar(50) NOT NULL,
  `customer_address` text DEFAULT NULL,
  `items` text NOT NULL,
  `subtotal` decimal(15,2) NOT NULL,
  `discount` decimal(5,2) DEFAULT 0.00,
  `discount_amount` decimal(15,2) DEFAULT 0.00,
  `total` decimal(15,2) NOT NULL,
  `notes` text DEFAULT NULL,
  `status` varchar(50) DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `wazir_quote_requests`
--

CREATE TABLE `wazir_quote_requests` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `service_type` varchar(100) NOT NULL,
  `location` varchar(255) NOT NULL,
  `project_details` text NOT NULL,
  `status` varchar(50) DEFAULT 'New',
  `ip_address` varchar(50) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `wazir_services`
--

CREATE TABLE `wazir_services` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `image` text DEFAULT NULL,
  `details` text DEFAULT NULL,
  `highlights` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `wazir_services`
--

INSERT INTO `wazir_services` (`id`, `title`, `description`, `image`, `details`, `highlights`) VALUES
(1, 'Glass Installation', 'Seamless fitting of double glazing, tempered safety glass, and heavy partition panes with elite weather sealing.', 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&w=600&q=80', 'Professional on-site installation of heavy architectural glass plates, double glazing units, and tempered safety panels. We utilize industrial vacuum lifters and high-performance weather sealants to ensure a structural, leak-proof finish.', '[\"EPDM Weather Gasketing for maximum wind & water seal\",\"Double & Triple Glazing Options for thermal/acoustic insulation\",\"Vacuum Suction Cup Lift Handling for zero glass stress\",\"5-Year Guarantee against condensation and gas leaks\"]'),
(2, 'Aluminium Fabrication', 'Precision cutting and assembly of profile bars to construct high-strength doors, frames, and windows.', 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80', 'Precision workshop cutting, hydraulic crimping, and assembly of heavy-gauge aluminium profiles. We build customized frames, mullions, and sashes exactly to architectural site blueprints.', '[\"AA 6063-T6 Structural Grade Aluminium Profile Alloys\",\"Hydraulic Corner Crimping for rock-solid joint stability\",\"Anodized & Powder-coated finishes (Qualicoat Class 1)\",\"Custom extrusion shapes and framing depth profiles\"]'),
(3, 'Door & Window Fitting', 'Flawless placement of casement doors, glass panels, sliding rollers, window tracks, and safety locks.', 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=600&q=80', 'Flawless site placement, locking alignment, and leveling of sliding windows, casement doors, and pivot panels. We ensure smooth track roller operation and tight locking seals.', '[\"Tandem Brass Smooth Roller Tracks for effortless glide\",\"Adjustable Friction Stay Hinges for secure positioning\",\"Multi-Point Security Locks and deadbolts\",\"Immaculate perimeter sealing with structural silicone\"]'),
(4, 'Repair & Maintenance', 'Quick alignment corrections, replacing damaged rollers/tracks, updating locks, and replacing broken glass.', 'https://images.unsplash.com/photo-1581092918056-0c4c3acd376a?auto=format&fit=crop&w=600&q=80', 'Fast response maintenance services for commercial and residential installations. We replace worn tracks, broken roller bearings, faulty locks, and cracked glass panes to restore your structures to original specs.', '[\"Lock, handle, and latches replacements\",\"Roller & Track alignment corrections for sliding elements\",\"Prompt glass panel replacement (tempered & laminated)\",\"Preventative weatherstripping and weatherstripping upgrades\"]'),
(5, 'Custom Design Work', 'Bespoke creation of custom shapes, frosted pattern sandblasting, and custom mirror sizes to fit specific architectural plans.', 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80', 'Custom architectural requests including decorative frosted sandblasting, chemical etching of brand logos, customized mirror designs, and glass table tops with bespoke edge polishing.', '[\"Logo Sandblasting & Acid-Etched Glass Engraving\",\"Bespoke Vanity Mirror LED Backlighting\",\"Pencil Polish, OG Cut, & Beveled Edging Options\",\"Tempered table tops and structural glass shelving\"]'),
(6, 'Commercial Projects', 'Large-scale glass partitions, curtain walls, shop fronts, and commercial cabin works completed within deadline parameters.', 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80', 'End-to-end execution of large-scale glazing projects, structural curtain walls, showroom shop fronts, and glass partition cabins for office spaces, completing projects under tight builder schedules.', '[\"Curtain wall engineering & deflection compliance\",\"12mm Toughened Shop Front Glass assemblies\",\"Office Cabin demountable glass partition systems\",\"Dedicated project management for fast-track construction sites\"]');

-- --------------------------------------------------------

--
-- Table structure for table `wazir_settings`
--

CREATE TABLE `wazir_settings` (
  `setting_key` varchar(100) NOT NULL,
  `setting_value` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `wazir_settings`
--

INSERT INTO `wazir_settings` (`setting_key`, `setting_value`) VALUES
('about_afterBadge', 'FINISHED'),
('about_afterDesc', 'Custom glass partitions and premium aluminium profile framework installed.'),
('about_afterImage', 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80'),
('about_afterTitle', 'After Wazir Work'),
('about_badge', 'About Wazir Centre'),
('about_beforeBadge', 'RAW SPACE'),
('about_beforeDesc', 'Open masonry space with unfinished layout and block partitions.'),
('about_beforeImage', 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80'),
('about_beforeTitle', 'BEFORE INSTALLATION'),
('about_description1', 'Wazir Glass & Aluminium Centre is a premier provider of high-quality architectural glass and aluminium fabrication. For over a decade, we have partnered with homeowners, interior architects, commercial business owners, and developers to bring structural glass ideas to life.'),
('about_description2', 'We specialize in custom creations. Whether you require minimalist floor-to-ceiling glass partitions for an office cabin, heavy-duty aluminium windows for a modern home, or striking frameless mirrors and shop fronts, we handle measurement, custom cutting, assembly, and final installation with absolute precision.'),
('about_features', '[{\"title\":\"Certified Materials\",\"description\":\"We source high-grade structural-alloy aluminium and safety-tempered glass.\"},{\"title\":\"Precision Engineering\",\"description\":\"Laser-measured and custom fabricated to achieve micro-millimeter tolerance.\"},{\"title\":\"Aesthetic Detailing\",\"description\":\"Hidden joints, elegant finishes, and sleek glass alignments.\"}]'),
('about_showcaseBadge', 'Interactive Showcase'),
('about_showcaseDesc', 'Drag the slider in the center to view finished glass partition installation.'),
('about_showcaseTitle', 'Slide to compare: Before vs After'),
('about_title', 'Crafting High-End Glass & Aluminium Projects'),
('contact_address', 'Plot 45-C, Glass Market Area, Sector G-10, Islamabad, Pakistan'),
('contact_badge', 'Estimate Pricing'),
('contact_businessHours', 'Monday ÔÇô Saturday: 9:00 AM ÔÇô 7:00 PM'),
('contact_companyName', 'Wazir Glass & Aluminium Centre'),
('contact_description', 'Fill out the inquiry form below, and our fabrication manager will review your dimensions and get in touch within 24 hours.'),
('contact_email', 'info@wazirglass.com'),
('contact_mapEmbedUrl', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d106203.0116843477!2d72.99281699999999!3d33.684422!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfbfd07891722f%3A0x6059515668b58a43!2sIslamabad%2C%20Islamabad%20Capital%20Territory%2C%20Pakistan!5e0!3m2!1sen!2s!4v1689000000000!5m2!1sen!2s'),
('contact_phone', '+92 (300) 0000000'),
('contact_phoneCall', '+923000000000'),
('contact_title', 'Get a Free Project Quote'),
('contact_whatsappNumber', '+923000000000'),
('footer_copyright', '┬® 2026 Wazir Glass & Aluminium Centre. All Rights Reserved.'),
('footer_tagline', 'Wazir Glass & Aluminium Centre is your high-end supplier for luxury partitions, custom windows, security storefronts, and premium steel-fitted doors. Committed to quality, precision, and customer trust.'),
('gallery_badge', 'Portfolio Showcase'),
('gallery_description', 'Take a look at some of our architectural installations. We guarantee precision sizing and pristine cleaning upon project completion.'),
('gallery_title', 'Recent Completed Projects'),
('hero_badge', 'Over 10 Years of Excellence'),
('hero_completedProjectsLabel', 'Completed Projects'),
('hero_completedProjectsVal', '500+'),
('hero_ctaLink1', '#products'),
('hero_ctaLink2', '#contact'),
('hero_ctaText1', 'View Products'),
('hero_ctaText2', 'Contact us'),
('hero_description', 'Modern doors, windows, partitions, mirrors, shop fronts, and custom aluminium works designed with premium strength, refined quality, and striking style.'),
('hero_experienceLabel', 'Experience'),
('hero_experienceVal', '10+ Years'),
('hero_qualityLabel', 'Quality Assurance'),
('hero_qualityVal', '100%'),
('hero_titleLine1', 'Premium Glass &'),
('hero_typedText', 'Aluminium Solutions'),
('services_badge', 'Expert Craftsmanship'),
('services_description', 'From initial drafting and detailed site measurement to precision fabrication and clean installations, we provide premium architectural glazing and aluminium work.'),
('services_title', 'Our Professional Services'),
('testimonials_badge', 'Customer Reviews'),
('testimonials_description', 'Read what our home and commercial clients say about our precision glass work and robust aluminium fittings.'),
('testimonials_title', 'What Our Clients Say'),
('timeline_badge', 'How We Work'),
('timeline_description', 'From initial sketch discussions to the final glass wipe, we maintain strict quality control checklists at each project phase.'),
('timeline_title', 'Our Fabrication Process'),
('whyChooseUs_badge', 'Why Partner With Us'),
('whyChooseUs_description', 'We bridge structural integrity and premium style. Our commitment to premium materials and flawless installation ensures our projects stand the test of time.'),
('whyChooseUs_title', 'Architectural Reliability & Trust');

-- --------------------------------------------------------

--
-- Table structure for table `wazir_stats`
--

CREATE TABLE `wazir_stats` (
  `id` int(11) NOT NULL,
  `value` varchar(50) DEFAULT NULL,
  `suffix` varchar(10) DEFAULT NULL,
  `label` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `wazir_stats`
--

INSERT INTO `wazir_stats` (`id`, `value`, `suffix`, `label`) VALUES
(1, '10', '+', 'Years Experience'),
(2, '500', '+', 'Completed Projects'),
(3, '300', '+', 'Happy Customers'),
(4, '50', '+', 'Commercial Glazing');

-- --------------------------------------------------------

--
-- Table structure for table `wazir_testimonials`
--

CREATE TABLE `wazir_testimonials` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `role` varchar(100) DEFAULT NULL,
  `text` text DEFAULT NULL,
  `stars` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `wazir_testimonials`
--

INSERT INTO `wazir_testimonials` (`id`, `name`, `role`, `text`, `stars`) VALUES
(1, 'Ahmed Raza', 'Homeowner', 'Excellent finishing and professional aluminium work. They installed heavy double-glazed windows in my lounge and they glide perfectly. Highly recommended!', 5),
(2, 'Sajjad Ali', 'Store Manager', 'Best glass installation service with clean work. The shop front showroom glass was installed within 3 days. Clean cuts and pristine seals.', 5),
(3, 'Kamran Khan', 'Interior Designer', 'Reliable team and quality material. I always partner with Wazir Glass for my office cabin partition projects because they respect dimensions down to the millimeter.', 5);

-- --------------------------------------------------------

--
-- Table structure for table `wazir_timeline`
--

CREATE TABLE `wazir_timeline` (
  `id` int(11) NOT NULL,
  `step` varchar(10) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `desc` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `wazir_timeline`
--

INSERT INTO `wazir_timeline` (`id`, `step`, `title`, `desc`) VALUES
(1, '01', 'Customer Requirement', 'We consult with you on your structural ideas, select profile shapes, and understand design objectives.'),
(2, '02', 'Site Measurement', 'Our field engineers visit your property to capture laser-precise measurements and gauge structural supports.'),
(3, '03', 'Design & Material', 'We customize CAD layouts, specify sheet thicknesses, and select frame finishes for official approval.'),
(4, '04', 'Fabrication', 'We construct the aluminium profile joints and cut safety tempered glass layers in our clean workshop.'),
(5, '05', 'Installation', 'Our expert crew fits the frames, hangs doors, seals joints, and conducts safety inspections on site.'),
(6, '06', 'Final Finishing', 'We clean all glass surfaces, polish steel lock plates, and hand over the keys for your finalized project.');

-- --------------------------------------------------------

--
-- Table structure for table `wazir_trust_points`
--

CREATE TABLE `wazir_trust_points` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `desc` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `wazir_trust_points`
--

INSERT INTO `wazir_trust_points` (`id`, `title`, `desc`) VALUES
(1, 'Premium Quality Material', 'Grade-A structural alloy and high-strength tempered glass.'),
(2, 'Professional Finishing', 'Flush joint finishes, clean sealant lines, and scratch-free profiles.'),
(3, 'Custom Size & Design', 'Tailored layout designs built exact to site measurements.'),
(4, 'Affordable Pricing', 'Transparent upfront quotes with no hidden costs.'),
(5, 'On-Time Delivery', 'Fast fabrication schedules with timely on-site fitting.'),
(6, 'Skilled Fabricators', 'Experienced crew ensuring robust joins and micro-precision alignments.'),
(7, 'Strong Aluminium Frames', 'Heavy gauge frames resisting high weather and structural loads.'),
(8, 'Clean Glass Installation', 'Safe handling, vacuum suction lifting, and immaculate sealing.');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `wazir_admins`
--
ALTER TABLE `wazir_admins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `wazir_before_after`
--
ALTER TABLE `wazir_before_after`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `wazir_bills`
--
ALTER TABLE `wazir_bills`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `bill_number` (`bill_number`);

--
-- Indexes for table `wazir_categories`
--
ALTER TABLE `wazir_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `wazir_featured_products`
--
ALTER TABLE `wazir_featured_products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `wazir_gallery`
--
ALTER TABLE `wazir_gallery`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `wazir_quotations`
--
ALTER TABLE `wazir_quotations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `quotation_number` (`quotation_number`);

--
-- Indexes for table `wazir_quote_requests`
--
ALTER TABLE `wazir_quote_requests`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `wazir_services`
--
ALTER TABLE `wazir_services`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `wazir_settings`
--
ALTER TABLE `wazir_settings`
  ADD PRIMARY KEY (`setting_key`);

--
-- Indexes for table `wazir_stats`
--
ALTER TABLE `wazir_stats`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `wazir_testimonials`
--
ALTER TABLE `wazir_testimonials`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `wazir_timeline`
--
ALTER TABLE `wazir_timeline`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `wazir_trust_points`
--
ALTER TABLE `wazir_trust_points`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `wazir_admins`
--
ALTER TABLE `wazir_admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `wazir_bills`
--
ALTER TABLE `wazir_bills`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `wazir_categories`
--
ALTER TABLE `wazir_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `wazir_featured_products`
--
ALTER TABLE `wazir_featured_products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `wazir_quotations`
--
ALTER TABLE `wazir_quotations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `wazir_quote_requests`
--
ALTER TABLE `wazir_quote_requests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `wazir_services`
--
ALTER TABLE `wazir_services`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `wazir_stats`
--
ALTER TABLE `wazir_stats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `wazir_testimonials`
--
ALTER TABLE `wazir_testimonials`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `wazir_timeline`
--
ALTER TABLE `wazir_timeline`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `wazir_trust_points`
--
ALTER TABLE `wazir_trust_points`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
