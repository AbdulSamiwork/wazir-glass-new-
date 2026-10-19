
DROP TABLE IF EXISTS `wazir_admins`;
CREATE TABLE `wazir_admins` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `token` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `token_expires_at` datetime DEFAULT NULL,
  `last_active_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  KEY `idx_admins_token` (`token`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


LOCK TABLES `wazir_admins` WRITE;

INSERT INTO `wazir_admins` VALUES (1,'admin','$2y$10$mfF6G6HTIFCZW3L9vUXlv.Bb5xwI9r9yO/6mGHN04h2PCN7KHdJoi',NULL,'2026-10-01 12:49:02',NULL,'2026-10-09 18:29:29'),(3,'wazirglass','$2y$10$n1nRT.mZEZzniHX0GYJpPuJ6.Cfis.BdSAZt49QUBhQoi7ELctN.C','52f633f445823b29a4b652703e9a5253732868356c3321c01cd73feeeb40f8c0','2026-10-01 13:15:18','2026-10-11 13:51:51','2026-10-10 13:51:51');
/*!40000 ALTER TABLE `wazir_admins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wazir_before_after`
--

DROP TABLE IF EXISTS `wazir_before_after`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wazir_before_after` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `beforeImage` text DEFAULT NULL,
  `afterImage` text DEFAULT NULL,
  `beforeLabel` varchar(255) DEFAULT NULL,
  `afterLabel` varchar(255) DEFAULT NULL,
  `specs` text DEFAULT NULL,
  `impact` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wazir_before_after`
--

LOCK TABLES `wazir_before_after` WRITE;
/*!40000 ALTER TABLE `wazir_before_after` DISABLE KEYS */;
INSERT INTO `wazir_before_after` VALUES (1,'Frameless Commercial Shop Front','Commercial Plaza • Lahore','https://images.unsplash.com/photo-1541888946425-d0ebb18086f6?auto=format&fit=crop&w=1200&q=80','https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80','Old Iron Shutter & Ordinary Frame','Wazir 12mm Frameless Toughened Glass','[\"12mm Clear Tempered Glass\",\"Hydraulic Floor Spring Hinges\",\"304 Grade Stainless Steel Patch Fittings\"]','+300% Customer Footfall & Modern Aesthetic'),(2,'Luxury Villa Soundproof Windows','DHA Residential • Lahore','https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80','https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80','Drafty Single-Pane Wooden Window','Wazir Thermal Break Double Glazing','[\"24mm Double Glazed Sealed Unit\",\"Thermal Break Aluminium Profile\",\"Multi-Point German Locking System\"]','95% Noise Reduction & 40% AC Energy Savings'),(3,'Executive Office Glass Partition','Gulberg Corporate Tower','https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80','https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80','Dark Drywall & Cubicle Dividers','Acoustic Glass Partition with Slim Frame','[\"10mm Laminated Acoustic Glass\",\"Matte Black Anodized Slim Frame\",\"Soft-Close Sliding Glass Door\"]','Maximized Natural Daylight & Executive Soundproofing'),(4,'Frameless Shower Cubicle & LED Mirror','Bahria Town Villa • Islamabad','https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80','https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1200&q=80','Basic Open Shower & Ordinary Mirror','Wazir 10mm Frameless Glass Cubicle & LED Mirror','[\"10mm Acid-Etched Safety Glass\",\"Matt Black Stainless Steel Hinges\",\"Touch Sensor LED Backlit Mirror\"]','Spa-Grade Luxury Upgrade & 100% Water Splash Protection');
/*!40000 ALTER TABLE `wazir_before_after` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wazir_bills`
--

DROP TABLE IF EXISTS `wazir_bills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wazir_bills` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
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
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `bill_number` (`bill_number`),
  KEY `idx_bills_phone` (`customer_phone`),
  KEY `idx_bills_status_created` (`status`,`created_at`),
  KEY `idx_bills_date` (`date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wazir_bills`
--

LOCK TABLES `wazir_bills` WRITE;
/*!40000 ALTER TABLE `wazir_bills` DISABLE KEYS */;
/*!40000 ALTER TABLE `wazir_bills` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wazir_categories`
--

DROP TABLE IF EXISTS `wazir_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wazir_categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `meta` varchar(100) DEFAULT NULL,
  `image` text DEFAULT NULL,
  `details` text DEFAULT NULL,
  `specs` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=145 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wazir_categories`
--

LOCK TABLES `wazir_categories` WRITE;
/*!40000 ALTER TABLE `wazir_categories` DISABLE KEYS */;
INSERT INTO `wazir_categories` VALUES (133,'Aluminium Windows','Weather-resistant, sleek framing for residential and commercial architectural structures.','Windows','https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=600&q=80','Our premium aluminium windows are designed to combine high weather resistance with minimalist sightlines, maximizing daylight and aesthetic appeal.','{\"Profile Depth\":\"50mm - 100mm\",\"Glass Infill\":\"5mm Single to 24mm Double Glazed\",\"Weathering\":\"Dual EPDM Compression Seals\",\"Thermal Option\":\"Available with Polyamide Thermal Break\"}'),(134,'Aluminium Doors','Heavy-duty entryways with thermal breaks, high security locking, and customizable hinges.','Doors','https://images.unsplash.com/photo-1517502884422-41eaaced0168?auto=format&fit=crop&w=600&q=80','Premium heavy-duty aluminium entrance and swing doors designed for durability, high-security locking, and modern architectural aesthetics.','{\"Frame Depth\":\"75mm to 120mm\",\"Hinge Spec\":\"3D Adjustable Heavy Duty Friction Hinges\",\"Security\":\"3-Point Secure Multi-Locking System\",\"Finish\":\"Polyester Powder Coated (80+ microns)\"}'),(135,'Glass Doors','Sleek, frameless glass panel doors with heavy hydraulic floor hinges and luxury handles.','Doors','https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?auto=format&fit=crop&w=600&q=80','Sleek frameless glass doors featuring heavy hydraulic floor spring hinges that allow double-action swing. Provides a clean, modern entryway for boutique shops and offices.','{\"Glass Spec\":\"10mm or 12mm Toughened Safety Glass\",\"Floor Hinge\":\"Double-Action Hydraulic Floor Spring\",\"Handles\":\"Stainless Steel 304 Pull Handles (600mm - 1200mm)\",\"Lock Options\":\"Floor Corner Locks with Euro Profile Cylinder\"}'),(136,'Glass Partitions','Minimalist floor-to-ceiling glass wall separations to optimize workspace layouts.','Partitions','https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=600&q=80','Minimalist floor-to-ceiling glass wall partitions to optimize office layouts while preserving open-plan daylight and visual connectivity.','{\"Framing\":\"Slim 25mm Anodized Aluminium U-Channels\",\"Acoustics\":\"Sound Reduction up to 36dB (Laminated Glass)\",\"Max Height\":\"Up to 3.2 meters\",\"Glass Core\":\"10mm \\/ 12mm Tempered Safety Glass\"}'),(137,'Shop Front Glass','High-impact thick structural glass displays displays displays tailored for showrooms, salons, and retail shops.','Shop Fronts','https://images.unsplash.com/photo-1596436889106-be35e843f974?auto=format&fit=crop&w=600&q=80','High-impact thick structural glass displays designed specifically for showroom entrances, retail shops, and commercial lobbies to maximize storefront exposure.','{\"Glass Thickness\":\"12mm Toughened \\/ 15mm Extra Clear Laminated\",\"Spider Fittings\":\"Optional SS304 Point-Fixed Systems\",\"Deflection Limit\":\"L\\/175 structural load compliance\",\"Sealant\":\"Structural Grade Weatherproof Silicone\"}'),(138,'Office Glass Cabins','Sound-insulated premium office rooms featuring integrated sliding doors and silver fittings.','Partitions','https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=600&q=80','Premium acoustic-insulated private glass office cabins. Features slim-profile framing, fully integrated sliding doors, and luxury silver fittings.','{\"System Type\":\"Modular Demountable Glazing\",\"Door Type\":\"Top-Hung Sliding Glass Door or Framed Swing Door\",\"Acoustic Seal\":\"Magnetic Door Seals and EPDM Gaskets\",\"Frame Colors\":\"Anodized Silver or Matte Black\"}'),(139,'Mirrors','Custom cut silver, bronze, or LED-backlit mirrors for vanity, bathrooms, and gyms.','Mirrors','https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=600&q=80','Custom-cut silver, bronze, or antique mirror sheets with optional LED-backlighting. Tailored to fit bathroom vanities, wardrobe doors, and home fitness studios.','{\"Mirror Thickness\":\"5mm or 6mm High-Clarity Silver Mirror\",\"Edge Work\":\"Flat Polished or Beveled (10mm - 25mm)\",\"Backing\":\"Safety Category II Shatter-Resistant Film\",\"LED Options\":\"IP44 Waterproof Backlit (Warm\\/Cool\\/Natural)\"}'),(140,'Shower Glass','Tempered glass shower enclosures with water-repellent coating and premium steel hinges.','Shower','https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=600&q=80','Tempered safety glass shower enclosures with water-repellent protective coatings. Engineered with high-strength solid brass hinges and clear sealing strips.','{\"Enclosure Type\":\"Corner sliding, walk-in screen, or inline swing\",\"Glass Finish\":\"Clear, Frosted, or Low-Iron Extra Clear\",\"Hinges & Brackets\":\"Solid Brass Chrome\\/Matte Black Finishes\",\"Water Coating\":\"Hydrophobic Nano-Glass Shield\"}'),(141,'Sliding Windows','Smooth track rolling window systems systems designed to maximize daylight and save room space.','Windows','https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=600&q=80','Smooth-glide horizontal sliding window systems designed with heavy-duty rollers and tracks. Perfect for space-saving areas facing balconies or courtyards.','{\"Roller Type\":\"Tandem Brass\\/Nylon Adjustable Rollers\",\"Locking Type\":\"Crescent Lock or Flush Keyed Lock\",\"Drainage\":\"Integrated Weep Holes and Water Baffle Caps\",\"Mesh Option\":\"Heavy Duty Aluminium Fly Screen Mesh\"}'),(142,'Aluminium Frames','Heavy gauge custom profile framing anodized or powder-coated in bronze, black, or silver.','Frames','https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80','Heavy gauge custom profile framing systems anodized or powder-coated in bronze, matte black, or classic silver to support large structural glass panels.','{\"Alloy Grade\":\"AA 6063-T6 Structural Grade\",\"Wall Thickness\":\"1.6mm to 2.2mm heavy gauge profiles\",\"Joint Construction\":\"Hydraulic Crimped Corners with Corner Cleats\",\"Finishes\":\"Qualicoat Class 1 & 2 Approved Powders\"}'),(143,'Glass Railing','Stainless steel and glass balcony or staircase barriers barriers barriers for an unobstructed modern view.','Railings','https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=600&q=80','Minimalist stainless steel and toughened glass balustrade railing systems for balconies, staircases, and terrace borders, ensuring an unobstructed modern view.','{\"Post Options\":\"SS304 \\/ SS316 Round, Square, or Spigot base\",\"Glass Spec\":\"12mm Toughened or 13.52mm SGP Laminated\",\"Handrail\":\"Sleek Top-slot Tube or Frameless Side-Mount\",\"Load Compliance\":\"Complies with 0.74kN\\/m line load standards\"}'),(144,'Custom Glass Work','Bespoke glass shelves, table tops, sandblasted frosted designs, and frosted pattern engraving.','Bespoke','https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80','Bespoke glass products customized to client dimensions, including heavy dining table tops, glass shelves, frosted decorative patterns, and sandblasted motifs.','{\"Glass Type\":\"Toughened, Tinted (Bronze\\/Grey), or Frosted\",\"Edge Polishing\":\"Pencil Polish, OG Cut, or Flat Polished\",\"Frosted Design\":\"Bespoke Acid Etched or Sandblasted Patterns\",\"Max Size\":\"Bespoke to architectural requirements\"}');
/*!40000 ALTER TABLE `wazir_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wazir_featured_products`
--

DROP TABLE IF EXISTS `wazir_featured_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wazir_featured_products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `tagline` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `use_case` text DEFAULT NULL,
  `specifications` text DEFAULT NULL,
  `image` text DEFAULT NULL,
  `features` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wazir_featured_products`
--

LOCK TABLES `wazir_featured_products` WRITE;
/*!40000 ALTER TABLE `wazir_featured_products` DISABLE KEYS */;
INSERT INTO `wazir_featured_products` VALUES (45,'Aluminium Sliding Windows','Smooth Glide, Extreme Durability','Engineered with heavy-gauge anodized aluminium and double-glazing options. Designed to provide flawless rolling track operations, high wind load resistance, and premium heat-and-noise insulation.','Premium residences, corporate offices, high-rise buildings.','Profiles: 1.6mm - 2.0mm thickness // Anodized Silver, Bronze, or Charcoal grey.','https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80','[\"Stainless steel rolling tracks\",\"Double-glazed glass compatibility\",\"Multi-point secure locking system\",\"Weatherproof rubber gaskets\"]'),(46,'Glass Office Partitions','Sleek Corporate Transparency','Provide sound-deadening properties and elegant partition walls for offices and conference rooms. Installed with minimalist slimline aluminium tracks and patch fittings.','Corporate workspaces, boutique offices, commercial cabins.','Glass type: Tempered/Laminated safety glass // Fitting Finish: Polished Stainless Steel.','https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=80','[\"10mm - 12mm toughened safety glass\",\"Slimline 25mm perimeter channels\",\"Integrated lockable glass doors\",\"Frosted pattern or logo customization\"]'),(47,'Shop Front Glass Design','High-Visibility Retail Displays','Designed for premium retail storefronts and showrooms. Maximizes street visibility with large-span heavy-duty glass sheets and custom top-and-bottom structural framing.','Showrooms, retail shops, boutique storefronts, car dealerships.','Tempered float glass // Heavy duty 100kg floor spring hinges.','https://images.unsplash.com/photo-1596436889106-be35e843f974?auto=format&fit=crop&w=800&q=80','[\"Jumbo-size glass installation\",\"Robust architectural profile borders\",\"Self-closing double doors\",\"Heavy-duty patch locks\"]'),(48,'Custom Decorative Mirrors','Reflection of Luxury','Handcrafted mirrors precision cut to custom dimensions. Available with polished bevels, metal frame encasings, and smart integrated LED backlighting for luxury interiors.','Salons, gyms, master bathrooms, luxury hotel lobbies.','Mirror thickness: 5mm - 6mm // Backframe: Heavy oxidation-resistant aluminium.','https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=800&q=80','[\"High-definition copper-free mirror glass\",\"Premium bevel edges (1\\/2\\\" to 1\\\")\",\"Integrated dimmable LED glow options\",\"Aluminium support backframe\"]');
/*!40000 ALTER TABLE `wazir_featured_products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wazir_gallery`
--

DROP TABLE IF EXISTS `wazir_gallery`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wazir_gallery` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `size` varchar(100) DEFAULT NULL,
  `desc` text DEFAULT NULL,
  `image` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wazir_gallery`
--

LOCK TABLES `wazir_gallery` WRITE;
/*!40000 ALTER TABLE `wazir_gallery` DISABLE KEYS */;
INSERT INTO `wazir_gallery` VALUES (1,'Modern Double Glazed Window','Windows','1200 x 1800 mm','Thermal break aluminium sliding system.','https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=600&q=80'),(2,'Frameless Shop Front Entrance','Shop Fronts','2400 x 4200 mm','12mm tempered safety glass with heavy rail profile.','https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80'),(3,'Office Glass Partition Wall','Glass Partitions','3000 x 6000 mm','Minimalist black anodized perimeter channels.','https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=600&q=80'),(4,'Durable Pivot Entrance Door','Doors','1500 x 2800 mm','Pivot hinge system with wood-effect metal casing.','https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=600&q=80'),(5,'Smart Backlit vanity Mirror','Mirrors','800 x 1200 mm','Beveled edge layout with warm white LED light strips.','https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=600&q=80'),(6,'Heavy Commercial Curtain Wall','Aluminium Work','Multi-Floor','Integrated architectural structure for storefront showroom.','https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80'),(7,'Frameless Glass Balcony Railing','Aluminium Work','15 Meters Length','Heavy floor base profiles with transparent glass panels.','https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80'),(8,'Acoustic Double-Glazed Office Cabin','Glass Partitions','3600 x 3000 mm','Integrated sliding glass door and soundproof gaskets.','https://images.unsplash.com/photo-1606857521015-7f9fcf423740?auto=format&fit=crop&w=600&q=80');
/*!40000 ALTER TABLE `wazir_gallery` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wazir_login_attempts`
--

DROP TABLE IF EXISTS `wazir_login_attempts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wazir_login_attempts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ip_address` varchar(45) NOT NULL,
  `username` varchar(100) DEFAULT NULL,
  `attempt_time` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_ip_time` (`ip_address`,`attempt_time`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wazir_login_attempts`
--

LOCK TABLES `wazir_login_attempts` WRITE;
/*!40000 ALTER TABLE `wazir_login_attempts` DISABLE KEYS */;
/*!40000 ALTER TABLE `wazir_login_attempts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wazir_quotations`
--

DROP TABLE IF EXISTS `wazir_quotations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wazir_quotations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
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
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `quotation_number` (`quotation_number`),
  KEY `idx_quotations_phone` (`customer_phone`),
  KEY `idx_quotations_status_created` (`status`,`created_at`),
  KEY `idx_quotations_date` (`date`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wazir_quotations`
--

LOCK TABLES `wazir_quotations` WRITE;
/*!40000 ALTER TABLE `wazir_quotations` DISABLE KEYS */;
INSERT INTO `wazir_quotations` VALUES (1,'QTN-1790860587547','2026-10-01','Faiz','031111111111111111111111111','qouaa','[{\"description\":\"popop\",\"quantity\":\"19\",\"unit\":\"sft\",\"rate\":\"900\",\"amount\":17100}]',17100.00,0.00,0.00,17100.00,'','pending','2026-10-01 13:18:39','2026-10-01 13:18:39');
/*!40000 ALTER TABLE `wazir_quotations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wazir_quote_requests`
--

DROP TABLE IF EXISTS `wazir_quote_requests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wazir_quote_requests` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `service_type` varchar(100) NOT NULL,
  `location` varchar(255) NOT NULL,
  `project_details` text NOT NULL,
  `status` varchar(50) DEFAULT 'New',
  `ip_address` varchar(50) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `idx_quotes_status_created` (`status`,`created_at`),
  KEY `idx_quotes_phone` (`phone`),
  KEY `idx_quotes_ip_created` (`ip_address`,`created_at`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wazir_quote_requests`
--

LOCK TABLES `wazir_quote_requests` WRITE;
/*!40000 ALTER TABLE `wazir_quote_requests` DISABLE KEYS */;
/*!40000 ALTER TABLE `wazir_quote_requests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wazir_services`
--

DROP TABLE IF EXISTS `wazir_services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wazir_services` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `image` text DEFAULT NULL,
  `details` text DEFAULT NULL,
  `highlights` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wazir_services`
--

LOCK TABLES `wazir_services` WRITE;
/*!40000 ALTER TABLE `wazir_services` DISABLE KEYS */;
INSERT INTO `wazir_services` VALUES (67,'Glass Installation','Seamless fitting of double glazing, tempered safety glass, and heavy partition panes with elite weather sealing.','https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&w=600&q=80','Professional on-site installation of heavy architectural glass plates, double glazing units, and tempered safety panels. We utilize industrial vacuum lifters and high-performance weather sealants to ensure a structural, leak-proof finish.','[\"EPDM Weather Gasketing for maximum wind & water seal\",\"Double & Triple Glazing Options for thermal\\/acoustic insulation\",\"Vacuum Suction Cup Lift Handling for zero glass stress\",\"5-Year Guarantee against condensation and gas leaks\"]'),(68,'Aluminium Fabrication','Precision cutting and assembly of profile bars to construct high-strength doors, frames, and windows.','https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80','Precision workshop cutting, hydraulic crimping, and assembly of heavy-gauge aluminium profiles. We build customized frames, mullions, and sashes exactly to architectural site blueprints.','[\"AA 6063-T6 Structural Grade Aluminium Profile Alloys\",\"Hydraulic Corner Crimping for rock-solid joint stability\",\"Anodized & Powder-coated finishes (Qualicoat Class 1)\",\"Custom extrusion shapes and framing depth profiles\"]'),(69,'Door & Window Fitting','Flawless placement of casement doors, glass panels, sliding rollers, window tracks, and safety locks.','https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=600&q=80','Flawless site placement, locking alignment, and leveling of sliding windows, casement doors, and pivot panels. We ensure smooth track roller operation and tight locking seals.','[\"Tandem Brass Smooth Roller Tracks for effortless glide\",\"Adjustable Friction Stay Hinges for secure positioning\",\"Multi-Point Security Locks and deadbolts\",\"Immaculate perimeter sealing with structural silicone\"]'),(70,'Repair & Maintenance','Quick alignment corrections, replacing damaged rollers/tracks, updating locks, and replacing broken glass.','https://images.unsplash.com/photo-1581092918056-0c4c3acd376a?auto=format&fit=crop&w=600&q=80','Fast response maintenance services for commercial and residential installations. We replace worn tracks, broken roller bearings, faulty locks, and cracked glass panes to restore your structures to original specs.','[\"Lock, handle, and latches replacements\",\"Roller & Track alignment corrections for sliding elements\",\"Prompt glass panel replacement (tempered & laminated)\",\"Preventative weatherstripping and weatherstripping upgrades\"]'),(71,'Custom Design Work','Bespoke creation of custom shapes, frosted pattern sandblasting, and custom mirror sizes to fit specific architectural plans.','https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80','Custom architectural requests including decorative frosted sandblasting, chemical etching of brand logos, customized mirror designs, and glass table tops with bespoke edge polishing.','[\"Logo Sandblasting & Acid-Etched Glass Engraving\",\"Bespoke Vanity Mirror LED Backlighting\",\"Pencil Polish, OG Cut, & Beveled Edging Options\",\"Tempered table tops and structural glass shelving\"]'),(72,'Commercial Projects','Large-scale glass partitions, curtain walls, shop fronts, and commercial cabin works completed within deadline parameters.','https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80','End-to-end execution of large-scale glazing projects, structural curtain walls, showroom shop fronts, and glass partition cabins for office spaces, completing projects under tight builder schedules.','[\"Curtain wall engineering & deflection compliance\",\"12mm Toughened Shop Front Glass assemblies\",\"Office Cabin demountable glass partition systems\",\"Dedicated project management for fast-track construction sites\"]');
/*!40000 ALTER TABLE `wazir_services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wazir_settings`
--

DROP TABLE IF EXISTS `wazir_settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wazir_settings` (
  `setting_key` varchar(100) NOT NULL,
  `setting_value` longtext DEFAULT NULL,
  PRIMARY KEY (`setting_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wazir_settings`
--

LOCK TABLES `wazir_settings` WRITE;
/*!40000 ALTER TABLE `wazir_settings` DISABLE KEYS */;
INSERT INTO `wazir_settings` VALUES ('about_afterBadge','FINISHED'),('about_afterDesc','Custom glass partitions and premium aluminium profile framework installed.'),('about_afterImage','https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80'),('about_afterTitle','After Wazir Work'),('about_badge','About Wazir Centre'),('about_beforeBadge','RAW SPACE'),('about_beforeDesc','Open masonry space with unfinished layout and block partitions.'),('about_beforeImage','https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80'),('about_beforeTitle','BEFORE INSTALLATION'),('about_description1','Wazir Glass & Aluminium Centre is a premier provider of high-quality architectural glass and aluminium fabrication. For over a decade, we have partnered with homeowners, interior architects, commercial business owners, and developers to bring structural glass ideas to life.'),('about_description2','We specialize in custom creations. Whether you require minimalist floor-to-ceiling glass partitions for an office cabin, heavy-duty aluminium windows for a modern home, or striking frameless mirrors and shop fronts, we handle measurement, custom cutting, assembly, and final installation with absolute precision.'),('about_features','[{\"title\":\"Certified Materials\",\"description\":\"We source high-grade structural-alloy aluminium and safety-tempered glass.\"},{\"title\":\"Precision Engineering\",\"description\":\"Laser-measured and custom fabricated to achieve micro-millimeter tolerance.\"},{\"title\":\"Aesthetic Detailing\",\"description\":\"Hidden joints, elegant finishes, and sleek glass alignments.\"}]'),('about_showcaseBadge','Interactive Showcase'),('about_showcaseDesc','Drag the slider in the center to view finished glass partition installation.'),('about_showcaseTitle','Slide to compare: Before vs After'),('about_title','Crafting High-End Glass & Aluminium Projects'),('beforeAfter_badge','Interactive Glazing Comparison'),('beforeAfter_description','Slide left and right to witness how Wazir Glass & Aluminium upgrades ordinary buildings into high-end structural masterpieces.'),('beforeAfter_title','Architectural Transformations'),('contact_additionalNumbers','[]'),('contact_address','Akbar Market Ferozpur Road, Kalma Chowk 2L-A, Gulberg-III, Lahore-Pakistan '),('contact_badge','Estimate Pricing'),('contact_businessHours','Monday – Saturday: 9:00 AM – 7:00 PM'),('contact_companyName','Wazir Glass & Aluminium Centre'),('contact_description','Fill out the inquiry form below, and our fabrication manager will review your dimensions and get in touch within 24 hours.'),('contact_email','wazirglass100@gmail.com'),('contact_mapEmbedUrl','https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3401.829131510527!2d74.32969957463455!3d31.501380148081708!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3919059309fb1e4d%3A0x76ef8e0f43b10ec2!2sWazir%20Glass%20and%20Aluminium%20Centre!5e0!3m2!1sen!2s!4v1791566140064!5m2!1sen!2s'),('contact_phone','+92 3218457556'),('contact_phoneCall','+923218457556'),('contact_title','Get a Free Project Quote'),('contact_whatsappNumber','+923218457556'),('footer_copyright','© 2026 Wazir Glass & Aluminium Centre. All Rights Reserved.'),('footer_socials','[{\"id\":\"facebook\",\"name\":\"Facebook\",\"url\":\"https:\\/\\/facebook.com\",\"enabled\":true},{\"id\":\"instagram\",\"name\":\"Instagram\",\"url\":\"https:\\/\\/instagram.com\",\"enabled\":true},{\"id\":\"whatsapp\",\"name\":\"WhatsApp\",\"url\":\"https:\\/\\/wa.me\\/92318457556\",\"enabled\":true},{\"id\":\"youtube\",\"name\":\"YouTube\",\"url\":\"https:\\/\\/youtube.com\",\"enabled\":true},{\"id\":\"linkedin\",\"name\":\"LinkedIn\",\"url\":\"https:\\/\\/linkedin.com\",\"enabled\":true},{\"id\":\"tiktok\",\"name\":\"TikTok\",\"url\":\"https:\\/\\/tiktok.com\",\"enabled\":true},{\"id\":\"twitter\",\"name\":\"X (Twitter)\",\"url\":\"https:\\/\\/x.com\",\"enabled\":true},{\"id\":\"pinterest\",\"name\":\"Pinterest\",\"url\":\"https:\\/\\/pinterest.com\",\"enabled\":true}]'),('footer_tagline','Wazir Glass & Aluminium Centre is your high-end supplier for luxury partitions, custom windows, security storefronts, and premium steel-fitted doors. Committed to quality, precision, and customer trust.'),('gallery_badge','Portfolio Showcase'),('gallery_description','Take a look at some of our architectural installations. We guarantee precision sizing and pristine cleaning upon project completion.'),('gallery_title','Recent Completed Projects'),('hero_badge','Over 10 Years of Excellence'),('hero_completedProjectsLabel','Completed Projects'),('hero_completedProjectsVal','500+'),('hero_ctaLink1','#products'),('hero_ctaLink2','#contact'),('hero_ctaText1','View Products'),('hero_ctaText2','Contact us'),('hero_description','Modern doors, windows, partitions, mirrors, shop fronts, and custom aluminium works designed with premium strength, refined quality, and striking style.'),('hero_experienceLabel','Experience'),('hero_experienceVal','10+ Years'),('hero_qualityLabel','Quality Assurance'),('hero_qualityVal','100%'),('hero_titleLine1','Premium Glass &'),('hero_typedText','Aluminium Solutions'),('privacyPolicy_badge','Data Protection'),('privacyPolicy_ctaBtnText','Contact Us'),('privacyPolicy_ctaDescription','If you have any questions about this Privacy Policy or want to exercise your data rights, please reach out to us.'),('privacyPolicy_ctaTitle','Privacy Concerns?'),('privacyPolicy_description','Your privacy matters to us. This policy explains how Wazir Glass & Aluminium Centre collects, uses, protects, and handles your personal information.'),('privacyPolicy_lastUpdated','October 2026'),('privacyPolicy_sections','[{\"id\":1,\"icon\":\"Eye\",\"title\":\"1. Information We Collect\",\"content\":\"\",\"items\":[{\"label\":\"Personal Information\",\"desc\":\"Name, phone number, email address, and physical address when you submit a contact form, request a quotation, or place an order.\"},{\"label\":\"Project Details\",\"desc\":\"Measurements, site photographs, project specifications, and preferences you share for custom fabrication work.\"},{\"label\":\"Communication Records\",\"desc\":\"Messages, emails, WhatsApp conversations, and call records related to your inquiries and orders.\"},{\"label\":\"Device & Usage Data\",\"desc\":\"Browser type, IP address, device type, pages visited, time spent on site, and referral sources — collected automatically via standard web analytics.\"},{\"label\":\"Payment Information\",\"desc\":\"Transaction records, payment method details (we do NOT store full bank account or card numbers on our servers).\"}]},{\"id\":2,\"icon\":\"Database\",\"title\":\"2. How We Use Your Information\",\"content\":\"\",\"items\":[{\"label\":\"Order Fulfillment\",\"desc\":\"To process your orders, fabricate custom products, coordinate delivery and installation schedules.\"},{\"label\":\"Communication\",\"desc\":\"To respond to your inquiries, send order status updates, project tracking notifications, and delivery confirmations.\"},{\"label\":\"Quotation & Estimation\",\"desc\":\"To generate accurate cost estimates and formal quotations based on your project requirements.\"},{\"label\":\"Service Improvement\",\"desc\":\"To analyze usage patterns and improve our website experience, product offerings, and customer service.\"},{\"label\":\"Legal Compliance\",\"desc\":\"To comply with applicable laws, regulations, and to protect our legal rights and interests.\"}]},{\"id\":3,\"icon\":\"Lock\",\"title\":\"3. Data Security & Protection\",\"content\":\"We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. Our website uses SSL\\/TLS encryption for data transmission. Access to personal data is restricted to authorized personnel only. While we take every reasonable precaution, no method of internet transmission or electronic storage is 100% secure, and we cannot guarantee absolute security.\",\"items\":[]},{\"id\":4,\"icon\":\"UserCheck\",\"title\":\"4. Data Sharing & Third Parties\",\"content\":\"We do NOT sell, trade, or rent your personal information to third parties for marketing purposes. We may share your information only with: trusted service partners directly involved in fulfilling your order (e.g., delivery services, installation contractors); legal authorities when required by law or to protect our rights; analytics providers who help us understand website usage (data is anonymized). All third-party service providers are bound by confidentiality agreements.\",\"items\":[]},{\"id\":5,\"icon\":\"Cookie\",\"title\":\"5. Cookies & Tracking Technologies\",\"content\":\"Our website uses cookies and similar technologies to enhance your browsing experience. Essential cookies are required for basic site functionality (session management, preferences). Analytics cookies help us understand how visitors interact with our site. You can control cookie settings through your browser preferences. Disabling essential cookies may affect site functionality. We do not use cookies for targeted advertising. Our PWA (Progressive Web App) may store data locally on your device for offline access.\",\"items\":[]},{\"id\":6,\"icon\":\"Fingerprint\",\"title\":\"6. Your Rights & Choices\",\"content\":\"\",\"items\":[{\"label\":\"Access & Correction\",\"desc\":\"You have the right to request access to your personal data and to correct any inaccuracies.\"},{\"label\":\"Data Deletion\",\"desc\":\"You can request deletion of your personal data, subject to our legal obligations and legitimate business needs.\"},{\"label\":\"Opt-Out\",\"desc\":\"You can opt out of promotional communications at any time by contacting us directly.\"},{\"label\":\"Data Portability\",\"desc\":\"You can request a copy of your personal data in a commonly used, machine-readable format.\"},{\"label\":\"Withdraw Consent\",\"desc\":\"Where processing is based on your consent, you may withdraw it at any time without affecting prior processing.\"}]},{\"id\":7,\"icon\":\"Server\",\"title\":\"7. Data Retention\",\"content\":\"We retain your personal information only for as long as necessary to fulfill the purposes outlined in this policy, comply with legal obligations, resolve disputes, and enforce our agreements. Order and transaction records are retained for a minimum of 5 years for tax and legal compliance. Communication records are retained for 2 years after the last interaction. Analytics data is retained in anonymized form indefinitely. Upon expiration of retention periods, data is securely deleted or anonymized.\",\"items\":[]},{\"id\":8,\"icon\":\"Baby\",\"title\":\"8. Children\'s Privacy\",\"content\":\"Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If you believe that a child has provided us with personal information, please contact us immediately, and we will take steps to delete such information from our systems.\",\"items\":[]},{\"id\":9,\"icon\":\"Globe\",\"title\":\"9. International Data Transfers\",\"content\":\"Your information may be stored and processed on servers located in Pakistan. If you access our website from outside Pakistan, please be aware that your information may be transferred to, stored, and processed in Pakistan where our servers are located and our central database is operated. By using our services, you consent to this transfer.\",\"items\":[]},{\"id\":10,\"icon\":\"FileWarning\",\"title\":\"10. Third-Party Links\",\"content\":\"Our website may contain links to external websites (e.g., Google Maps, WhatsApp, social media platforms). We are not responsible for the privacy practices or content of these external sites. We encourage you to review the privacy policies of any third-party websites you visit through links on our site.\",\"items\":[]},{\"id\":11,\"icon\":\"Bell\",\"title\":\"11. Policy Updates\",\"content\":\"We may update this Privacy Policy from time to time to reflect changes in our practices, technologies, or legal requirements. Any changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically. Continued use of our services after any changes constitutes acceptance of the updated policy.\",\"items\":[]},{\"id\":12,\"icon\":\"Mail\",\"title\":\"12. Contact Us\",\"content\":\"If you have any questions, concerns, or requests regarding this Privacy Policy or the handling of your personal data, please contact us through our website\'s contact form, visit our showroom, or reach out via WhatsApp. We are committed to addressing your privacy concerns promptly and transparently.\",\"items\":[]}]'),('privacyPolicy_subNotice','Your Data, Your Rights'),('privacyPolicy_titleLine1','Privacy'),('privacyPolicy_titleLine2','Policy'),('privacyPolicy_trustBadges','[{\"label\":\"SSL Encrypted\",\"sub\":\"Secure Data Transfer\"},{\"label\":\"No Data Selling\",\"sub\":\"Your Info Stays Private\"},{\"label\":\"Your Rights\",\"sub\":\"Access, Delete, Opt-Out\"}]'),('services_badge','Expert Craftsmanship'),('services_description','From initial drafting and detailed site measurement to precision fabrication and clean installations, we provide premium architectural glazing and aluminium work.'),('services_title','Our Professional Services'),('termsAndConditions_badge','Legal Agreement'),('termsAndConditions_ctaBtnText','Contact Us'),('termsAndConditions_ctaDescription','If you have any questions about these Terms & Conditions, please contact us through our website or visit our showroom.'),('termsAndConditions_ctaTitle','Have Questions?'),('termsAndConditions_description','Please read these terms carefully before using our services. By engaging with Wazir Glass & Aluminium Centre, you agree to be bound by the following conditions.'),('termsAndConditions_lastUpdated','October 2026'),('termsAndConditions_quickSummary','We provide custom glass & aluminium fabrication services. 50% advance is required to start production. Custom products are non-returnable. We offer a 1-year workmanship warranty. All disputes are governed by Pakistani law with jurisdiction in Lahore.'),('termsAndConditions_sections','[{\"id\":1,\"icon\":\"Info\",\"title\":\"1. Introduction & Acceptance\",\"content\":\"Welcome to Wazir Glass & Aluminium Centre. By accessing or using our website, services, and placing any order for glass, aluminium, or related products, you agree to be bound by these Terms and Conditions. If you do not agree, please discontinue use of our website and services immediately. These terms constitute a legally binding agreement between you (\\\"Customer\\\") and Wazir Glass & Aluminium Centre (\\\"Company\\\", \\\"we\\\", \\\"us\\\", or \\\"our\\\").\"},{\"id\":2,\"icon\":\"Layers\",\"title\":\"2. Products & Services\",\"content\":\"We specialize in the fabrication, supply, and installation of premium aluminium windows, doors, glass partitions, shop fronts, shower enclosures, decorative mirrors, and custom architectural glass solutions. All product images, dimensions, and specifications listed on our website are for illustrative purposes and may vary slightly from the final delivered product due to the custom nature of our work. Colours displayed on-screen may differ from actual shades due to monitor calibration.\"},{\"id\":3,\"icon\":\"CreditCard\",\"title\":\"3. Pricing & Payments\",\"content\":\"All prices quoted are in Pakistani Rupees (PKR) unless otherwise stated. Prices are subject to change without prior notice based on raw material costs, market fluctuations, and project specifications. A minimum advance payment of 50% is required before fabrication begins. Remaining balance is due upon completion before delivery\\/installation. We accept cash, bank transfer, and other agreed-upon payment methods. Quotations are valid for 15 days from the date of issue unless extended in writing.\"},{\"id\":4,\"icon\":\"Clock\",\"title\":\"4. Order Processing & Timelines\",\"content\":\"Orders are processed after confirmation of advance payment and final measurements. Standard fabrication timelines range from 7 to 21 working days depending on project scope and complexity. Timelines may be affected by material availability, weather conditions, or unforeseen circumstances. We will communicate any delays promptly. Rush orders may be accommodated at an additional charge, subject to production capacity.\"},{\"id\":5,\"icon\":\"Truck\",\"title\":\"5. Delivery & Installation\",\"content\":\"Delivery charges are calculated based on distance and order size, and will be communicated at the time of quotation. Installation services are available at an additional cost and will be performed by our trained professionals. The customer is responsible for ensuring clear site access, power supply, and a safe working environment. Any site preparation (such as wall cutting, plumbing adjustments, or civil work) is the customer\'s responsibility unless explicitly included in the quotation. Risk of damage transfers to the customer upon delivery and acceptance.\"},{\"id\":6,\"icon\":\"Shield\",\"title\":\"6. Warranty & Guarantee\",\"content\":\"We provide a limited warranty on fabrication quality for a period of one (1) year from the date of installation. This warranty covers defects in workmanship and material failure under normal use. The warranty does NOT cover damage caused by misuse, accidents, natural disasters, unauthorized modifications, improper cleaning agents, or normal wear and tear. Glass breakage due to external impact, thermal stress, or improper handling by the customer after delivery is not covered. Hardware components (locks, handles, hinges) carry their respective manufacturer warranties.\"},{\"id\":7,\"icon\":\"RefreshCw\",\"title\":\"7. Returns, Cancellations & Refunds\",\"content\":\"Due to the custom-made nature of our products, returns and cancellations are subject to the following conditions: Orders may be cancelled within 48 hours of placement, provided fabrication has not commenced. If fabrication has started, a cancellation fee of up to 40% of the total order value will be charged. Custom-cut glass and bespoke aluminium profiles are non-returnable and non-refundable. Refunds, where applicable, will be processed within 15 business days via the original payment method.\"},{\"id\":8,\"icon\":\"AlertTriangle\",\"title\":\"8. Limitation of Liability\",\"content\":\"Wazir Glass & Aluminium Centre shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products or services. Our total liability is limited to the amount paid by the customer for the specific order in question. We are not responsible for delays or failures in performance due to force majeure events including but not limited to natural disasters, civil unrest, government regulations, supply chain disruptions, or pandemics.\"},{\"id\":9,\"icon\":\"Scale\",\"title\":\"9. Intellectual Property\",\"content\":\"All content on this website, including but not limited to logos, brand names, designs, text, images, graphics, and software, is the exclusive property of Wazir Glass & Aluminium Centre and is protected by applicable intellectual property laws. Unauthorized reproduction, distribution, or modification of any content without prior written consent is strictly prohibited and may result in legal action.\"},{\"id\":10,\"icon\":\"Ban\",\"title\":\"10. Prohibited Activities\",\"content\":\"Users must not attempt to access administrative areas, reverse-engineer the website, upload malicious code, or use the site for any unlawful purpose. Any abusive, threatening, or fraudulent communication with our staff will result in immediate termination of services and may be reported to law enforcement authorities.\"},{\"id\":11,\"icon\":\"Gavel\",\"title\":\"11. Governing Law & Disputes\",\"content\":\"These Terms and Conditions are governed by the laws of Pakistan. Any disputes arising from or related to these terms shall first be resolved through good-faith negotiation. If a resolution cannot be reached, disputes shall be submitted to the exclusive jurisdiction of the courts in Lahore, Pakistan. Both parties agree to bear their own legal costs unless otherwise ordered by the court.\"},{\"id\":12,\"icon\":\"RefreshCw\",\"title\":\"12. Modifications to Terms\",\"content\":\"Wazir Glass & Aluminium Centre reserves the right to update or modify these Terms and Conditions at any time without prior notice. Changes will be effective immediately upon posting on our website. It is the customer\'s responsibility to review these terms periodically. Continued use of our services after any modifications constitutes acceptance of the updated terms.\"}]'),('termsAndConditions_subNotice','Effective Immediately'),('termsAndConditions_titleLine1','Terms &'),('termsAndConditions_titleLine2','Conditions'),('testimonials_badge','Customer Reviews'),('testimonials_description','Read what our home and commercial clients say about our precision glass work and robust aluminium fittings.'),('testimonials_title','What Our Clients Say'),('timeline_badge','How We Work'),('timeline_description','From initial sketch discussions to the final glass wipe, we maintain strict quality control checklists at each project phase.'),('timeline_title','Our Fabrication Process'),('whyChooseUs_badge','Why Partner With Us'),('whyChooseUs_description','We bridge structural integrity and premium style. Our commitment to premium materials and flawless installation ensures our projects stand the test of time.'),('whyChooseUs_image','https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80'),('whyChooseUs_title','Architectural Reliability & Trust');
/*!40000 ALTER TABLE `wazir_settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wazir_stats`
--

DROP TABLE IF EXISTS `wazir_stats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wazir_stats` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `value` varchar(50) DEFAULT NULL,
  `suffix` varchar(10) DEFAULT NULL,
  `label` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wazir_stats`
--

LOCK TABLES `wazir_stats` WRITE;
/*!40000 ALTER TABLE `wazir_stats` DISABLE KEYS */;
INSERT INTO `wazir_stats` VALUES (45,'10','+','Years Experience'),(46,'500','+','Completed Projects'),(47,'300','+','Happy Customers'),(48,'50','+','Commercial Glazing');
/*!40000 ALTER TABLE `wazir_stats` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wazir_testimonials`
--

DROP TABLE IF EXISTS `wazir_testimonials`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wazir_testimonials` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `role` varchar(100) DEFAULT NULL,
  `text` text DEFAULT NULL,
  `stars` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wazir_testimonials`
--

LOCK TABLES `wazir_testimonials` WRITE;
/*!40000 ALTER TABLE `wazir_testimonials` DISABLE KEYS */;
INSERT INTO `wazir_testimonials` VALUES (34,'Ahmed Raza','Homeowner','Excellent finishing and professional aluminium work. They installed heavy double-glazed windows in my lounge and they glide perfectly. Highly recommended!',5),(35,'Sajjad Ali','Store Manager','Best glass installation service with clean work. The shop front showroom glass was installed within 3 days. Clean cuts and pristine seals.',5),(36,'Kamran Khan','Interior Designer','Reliable team and quality material. I always partner with Wazir Glass for my office cabin partition projects because they respect dimensions down to the millimeter.',5);
/*!40000 ALTER TABLE `wazir_testimonials` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wazir_timeline`
--

DROP TABLE IF EXISTS `wazir_timeline`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wazir_timeline` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `step` varchar(10) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `desc` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wazir_timeline`
--

LOCK TABLES `wazir_timeline` WRITE;
/*!40000 ALTER TABLE `wazir_timeline` DISABLE KEYS */;
INSERT INTO `wazir_timeline` VALUES (67,'01','Customer Requirement','We consult with you on your structural ideas, select profile shapes, and understand design objectives.'),(68,'02','Site Measurement','Our field engineers visit your property to capture laser-precise measurements and gauge structural supports.'),(69,'03','Design & Material','We customize CAD layouts, specify sheet thicknesses, and select frame finishes for official approval.'),(70,'04','Fabrication','We construct the aluminium profile joints and cut safety tempered glass layers in our clean workshop.'),(71,'05','Installation','Our expert crew fits the frames, hangs doors, seals joints, and conducts safety inspections on site.'),(72,'06','Final Finishing','We clean all glass surfaces, polish steel lock plates, and hand over the keys for your finalized project.');
/*!40000 ALTER TABLE `wazir_timeline` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wazir_trust_points`
--

DROP TABLE IF EXISTS `wazir_trust_points`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wazir_trust_points` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `desc` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=97 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wazir_trust_points`
--

LOCK TABLES `wazir_trust_points` WRITE;
/*!40000 ALTER TABLE `wazir_trust_points` DISABLE KEYS */;
INSERT INTO `wazir_trust_points` VALUES (89,'Premium Quality Material','Grade-A structural alloy and high-strength tempered glass.'),(90,'Professional Finishing','Flush joint finishes, clean sealant lines, and scratch-free profiles.'),(91,'Custom Size & Design','Tailored layout designs built exact to site measurements.'),(92,'Affordable Pricing','Transparent upfront quotes with no hidden costs.'),(93,'On-Time Delivery','Fast fabrication schedules with timely on-site fitting.'),(94,'Skilled Fabricators','Experienced crew ensuring robust joins and micro-precision alignments.'),(95,'Strong Aluminium Frames','Heavy gauge frames resisting high weather and structural loads.'),(96,'Clean Glass Installation','Safe handling, vacuum suction lifting, and immaculate sealing.');
/*!40000 ALTER TABLE `wazir_trust_points` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-10-10 13:56:23
