'use client'

import Image from "next/image"
import Link from "next/link"
import { ChevronDown, ArrowRight, ArrowLeft, Calendar, Clock, User, Share2, Facebook, Linkedin, Twitter } from "lucide-react"
import { useEffect, useState } from "react"

// Sample blog posts data
const blogPosts: Record<string, {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  authorRole: string;
  authorImage: string;
}> = {
  'eih-announces-strategic-partnership-with-global-tech-leaders': {
    id: 1,
    slug: 'eih-announces-strategic-partnership-with-global-tech-leaders',
    title: 'EIH Announces Strategic Partnership with Global Tech Leaders',
    excerpt: 'Ethmar International Holding has entered into a strategic partnership aimed at accelerating digital transformation across the region.',
    content: `
      <p>Ethmar International Holding (EIH) today announced a landmark strategic partnership with leading global technology companies, marking a significant milestone in the organization's commitment to driving digital transformation across the region. This groundbreaking collaboration brings together some of the world's most innovative minds and substantial capital to reshape the technological landscape of the Middle East and beyond.</p>
      
      <p>This partnership represents a combined investment of over $500 million in technology infrastructure and innovation hubs, designed to accelerate the digital economy and create thousands of high-skilled jobs over the next five years. The initiative underscores EIH's unwavering dedication to fostering sustainable economic growth while positioning the region as a premier destination for technology investment and innovation.</p>
      
      <p>The collaboration extends across multiple continents, involving technology leaders from Silicon Valley, Europe, and Asia. Each partner brings unique expertise and resources to the table, creating a synergistic relationship that promises to deliver exceptional value for all stakeholders involved in this transformative venture.</p>
      
      <h2>Strategic Vision & Leadership</h2>
      
      <p>"This partnership aligns perfectly with our vision of investing beyond the obvious," said the CEO of Ethmar International Holding. "By collaborating with world-class technology leaders, we are positioning the region as a global hub for innovation and digital transformation. Our commitment goes beyond mere financial investment—we are building the infrastructure for future generations."</p>
      
      <p>The leadership team has meticulously designed this partnership to address the most pressing technological needs of the region while anticipating future trends. Through extensive market research and stakeholder consultations, EIH has identified key areas where technology investment can generate the highest impact and most sustainable returns.</p>
      
      <p>The partnership will focus on several key strategic pillars:</p>
      
      <ul>
        <li><strong>Artificial Intelligence and Machine Learning:</strong> Development of AI centers of excellence and research facilities that will serve as incubators for next-generation technologies and attract top talent from around the world</li>
        <li><strong>Cloud Infrastructure:</strong> Building state-of-the-art data centers and cloud computing capabilities to support the growing digital needs of businesses and governments across the region</li>
        <li><strong>Digital Skills Development:</strong> Comprehensive training programs designed to upskill the local workforce in emerging technologies, ensuring that the region has the human capital needed to support its digital ambitions</li>
        <li><strong>Startup Ecosystem:</strong> Creating world-class incubators and accelerators to support technology entrepreneurs, providing them with access to funding, mentorship, and global networks</li>
        <li><strong>Cybersecurity Excellence:</strong> Establishing regional cybersecurity operations centers to protect critical infrastructure and enable secure digital transformation</li>
        <li><strong>Green Technology Integration:</strong> Incorporating sustainable and environmentally friendly technologies across all investment areas to support the region's Net Zero commitments</li>
      </ul>
      
      <h2>Economic Impact & Job Creation</h2>
      
      <p>The initiative is expected to contribute significantly to economic diversification efforts, with projected impacts that will reshape the regional economy for decades to come. Independent economic analysts have validated our projections, confirming the transformative potential of this partnership.</p>
      
      <p>Key economic projections include:</p>
      
      <ul>
        <li><strong>Direct Employment:</strong> Creation of over 15,000 high-skilled technology jobs within the first three years</li>
        <li><strong>GDP Contribution:</strong> Expected contribution of $2.5 billion to regional GDP by 2030</li>
        <li><strong>Indirect Economic Impact:</strong> Support for over 50,000 indirect jobs through supplier networks and service industries</li>
        <li><strong>Knowledge Transfer:</strong> Training and certification programs for over 100,000 professionals in emerging technologies</li>
        <li><strong>Startup Funding:</strong> $200 million allocated specifically for early-stage technology ventures</li>
      </ul>
      
      <p>The first phase of the partnership will commence in Q2 2026, with the establishment of a joint innovation center in Abu Dhabi. This center will serve as a hub for research and development, bringing together engineers, scientists, and entrepreneurs from around the world. The facility will span over 500,000 square feet and feature cutting-edge laboratories, collaboration spaces, and demonstration areas.</p>
      
      <blockquote>
        "Innovation thrives at the intersection of vision and execution. This partnership exemplifies our commitment to creating lasting value for all stakeholders while contributing to the broader economic development of the region. We believe that technology is the great equalizer, and through this partnership, we are democratizing access to world-class innovation capabilities."
      </blockquote>
      
      <h2>Implementation Roadmap</h2>
      
      <p>The partnership has been structured with a clear implementation roadmap that ensures accountability and measurable progress. Our phased approach allows for flexibility while maintaining focus on strategic objectives. Each phase has been designed to build upon the successes of the previous one, creating a compounding effect that will accelerate our impact over time.</p>
      
      <p>The implementation will proceed through four distinct phases:</p>
      
      <ol>
        <li><strong>Phase 1 (Q2 2026 - Q4 2026):</strong> Foundation building, including infrastructure development, team assembly, and initial technology deployments</li>
        <li><strong>Phase 2 (Q1 2027 - Q4 2027):</strong> Scaling operations, launching training programs, and initiating startup accelerator activities</li>
        <li><strong>Phase 3 (Q1 2028 - Q4 2028):</strong> Expansion across the region, establishing satellite innovation centers in key markets</li>
        <li><strong>Phase 4 (2029 onwards):</strong> Full operational maturity, continuous innovation, and exploration of new technology frontiers</li>
      </ol>
      
      <h2>Looking Ahead & Future Opportunities</h2>
      
      <p>As part of the agreement, EIH and its partners will collaborate on identifying and investing in promising technology startups across the MENA region. This initiative will provide not only capital but also mentorship, technical expertise, and access to global markets. We believe that the next generation of world-changing companies will emerge from this region, and we are committed to being their partners on that journey.</p>
      
      <p>The partnership also opens doors to future opportunities in emerging technology areas such as quantum computing, biotechnology, and space technology. EIH is actively exploring these frontiers to ensure that the region remains at the forefront of technological advancement.</p>
      
      <p>The partnership reinforces EIH's position as a leading investment holding company committed to sustainable growth and innovation. Further announcements regarding specific projects and initiatives will be made in the coming months as we progress through our implementation roadmap. We invite all stakeholders to join us on this exciting journey of transformation and growth.</p>
    `,
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80',
    category: 'news',
    date: 'January 28, 2026',
    readTime: '5 min read',
    author: 'Ahmed Al Mansouri',
    authorRole: 'Head of Communications',
    authorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80'
  },
  'quarterly-investment-report-q4-2025': {
    id: 2,
    slug: 'quarterly-investment-report-q4-2025',
    title: 'Quarterly Investment Report: Q4 2025 Performance Review',
    excerpt: 'A comprehensive analysis of our portfolio performance and strategic outlook for the coming year.',
    content: `
      <p>The fourth quarter of 2025 marked another period of strong performance for Ethmar International Holding's diversified investment portfolio, with notable achievements across all major sectors. Our disciplined investment approach, combined with active portfolio management, has delivered results that significantly outperformed market expectations and established new benchmarks for excellence in the region.</p>
      
      <p>This report provides a comprehensive overview of our investment activities, portfolio performance, and strategic initiatives undertaken during the quarter. We are pleased to share these results with our stakeholders and partners who have placed their trust in our investment philosophy and execution capabilities.</p>
      
      <h2>Portfolio Performance Highlights</h2>
      
      <p>Our investment portfolio delivered robust returns, outperforming market benchmarks across virtually all key metrics. The strength of our performance reflects the quality of our investment selection process, the expertise of our management team, and the resilience of our diversified portfolio strategy.</p>
      
      <p>The exceptional performance can be attributed to several strategic decisions made earlier in the year, including our increased allocation to technology-enabled businesses, our disciplined approach to risk management, and our focus on companies with strong ESG credentials.</p>
      
      <ul>
        <li><strong>Total Portfolio Return:</strong> 12.4% (vs. benchmark 9.2%), representing a 320 basis point outperformance that places us in the top quartile of regional investment managers</li>
        <li><strong>Private Equity:</strong> 18.7% IRR on realized investments, driven by successful exits in healthcare and financial services sectors</li>
        <li><strong>Growth Capital:</strong> 15.3% average portfolio company revenue growth, with three companies achieving unicorn status during the quarter</li>
        <li><strong>Infrastructure:</strong> 8.9% stable yield with 100% occupancy across our real estate and infrastructure holdings</li>
        <li><strong>Venture Capital:</strong> 22.1% return on our early-stage technology investments, with five successful funding rounds completed</li>
        <li><strong>Fixed Income:</strong> 6.8% yield on our bond portfolio, benefiting from our duration management strategy</li>
      </ul>
      
      <h2>Sector Analysis & Market Insights</h2>
      
      <p>Technology and healthcare investments continued to drive performance, benefiting from secular growth trends and our active portfolio management approach. Our energy transition investments also gained momentum, reflecting the global shift toward sustainable practices and the increasing urgency of climate action.</p>
      
      <p>The financial services sector demonstrated remarkable resilience, with our fintech investments achieving significant milestones in terms of user acquisition and transaction volumes. Our consumer sector holdings benefited from the recovery in discretionary spending and the continued shift toward e-commerce and digital services.</p>
      
      <p>Key sector insights from the quarter include:</p>
      
      <ul>
        <li><strong>Technology:</strong> AI and cloud computing investments delivered exceptional returns, with several portfolio companies securing major enterprise contracts</li>
        <li><strong>Healthcare:</strong> Biotech and digital health platforms showed strong growth as regional healthcare systems accelerated their digital transformation initiatives</li>
        <li><strong>Sustainable Energy:</strong> Our renewable energy investments achieved operational milestones ahead of schedule, contributing to both financial and environmental returns</li>
        <li><strong>Financial Services:</strong> Digital banking and payment solutions continued their rapid adoption curve, with our portfolio companies gaining significant market share</li>
        <li><strong>Real Estate:</strong> Premium commercial and logistics properties maintained full occupancy with positive rent revisions across the portfolio</li>
      </ul>
      
      <blockquote>
        "Q4 2025 demonstrated the strength of our diversified approach and the quality of our investment team's selection and management capabilities. We remain committed to delivering sustainable long-term value for our stakeholders while maintaining the highest standards of governance and risk management."
      </blockquote>
      
      <h2>Strategic Initiatives & Value Creation</h2>
      
      <p>Beyond financial returns, we have continued to drive value creation across our portfolio through a range of strategic initiatives. These initiatives are designed to enhance operational efficiency, accelerate growth, and position our portfolio companies for long-term success in an increasingly competitive global market.</p>
      
      <p>During Q4 2025, we implemented the following strategic initiatives:</p>
      
      <ol>
        <li><strong>Operational Excellence Program:</strong> Launched across 15 portfolio companies, resulting in average cost savings of 12% and improved profit margins</li>
        <li><strong>Digital Transformation Accelerator:</strong> Deployed AI and automation solutions across key portfolio companies, driving productivity improvements</li>
        <li><strong>Talent Development Initiative:</strong> Invested in leadership development programs, resulting in stronger management teams across the portfolio</li>
        <li><strong>ESG Integration:</strong> Achieved 100% ESG screening coverage for all new investments and enhanced monitoring of existing holdings</li>
        <li><strong>Strategic Partnerships:</strong> Facilitated five new strategic partnerships between portfolio companies and global industry leaders</li>
      </ol>
      
      <h2>Strategic Outlook for 2026</h2>
      
      <p>Looking ahead, we remain cautiously optimistic about market conditions while maintaining discipline in our investment approach. The global economic environment presents both opportunities and challenges, and we are positioning our portfolio to capitalize on emerging trends while managing downside risks effectively.</p>
      
      <p>Key focus areas for the coming year include:</p>
      
      <ul>
        <li><strong>Market Expansion:</strong> Expanding our presence in high-growth emerging markets across Asia, Africa, and Latin America</li>
        <li><strong>Impact Investing:</strong> Increasing allocation to sustainable and impact investments that generate measurable social and environmental benefits</li>
        <li><strong>Technology Enablement:</strong> Leveraging technology to enhance operational efficiency across portfolio companies and drive competitive advantage</li>
        <li><strong>Strategic Partnerships:</strong> Building strategic partnerships with global leaders to access new opportunities and enhance our capability set</li>
        <li><strong>Innovation Focus:</strong> Increasing our allocation to frontier technologies including AI, quantum computing, and biotechnology</li>
      </ul>
      
      <p>We thank our stakeholders for their continued trust and partnership. Your confidence in our vision and capabilities is the foundation upon which we build our success. We look forward to delivering sustainable value creation in the years ahead and sharing our progress through regular updates and communications.</p>
    `,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80',
    category: 'news',
    date: 'January 15, 2026',
    readTime: '8 min read',
    author: 'Sarah Johnson',
    authorRole: 'Chief Investment Officer',
    authorImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80'
  },
  'eih-recognized-for-sustainable-investment-practices': {
    id: 3,
    slug: 'eih-recognized-for-sustainable-investment-practices',
    title: 'EIH Recognized for Sustainable Investment Practices',
    excerpt: 'Our commitment to ESG principles has been acknowledged by leading industry bodies.',
    content: `
      <p>Ethmar International Holding has been awarded the prestigious "Excellence in Sustainable Investment" award by the Global Investment Council, recognizing our exemplary commitment to environmental, social, and governance (ESG) principles. This distinguished recognition places EIH among an elite group of global investment firms that have demonstrated unwavering dedication to responsible investing and sustainable value creation.</p>
      
      <p>The award ceremony, held at the Global Investment Summit in Geneva, brought together over 500 investment professionals from across the world. EIH was selected from among 150 nominees, with the judging panel citing our comprehensive approach to ESG integration and our measurable impact across environmental and social dimensions.</p>
      
      <p>This recognition is a testament to the hard work and dedication of our entire team, who have embraced sustainability not as a compliance requirement but as a core pillar of our investment philosophy. We believe that businesses that prioritize sustainability are better positioned for long-term success and value creation.</p>
      
      <h2>Award Recognition & Achievements</h2>
      
      <p>The award acknowledges EIH's comprehensive approach to sustainable investing, which integrates ESG considerations throughout the investment lifecycle—from due diligence to active ownership to exit. Our methodology has been refined over years of practice and has proven effective in identifying both risks and opportunities that traditional financial analysis might overlook.</p>
      
      <p>Key achievements highlighted by the selection committee include:</p>
      
      <ul>
        <li><strong>ESG Screening:</strong> 100% of new investments undergo rigorous ESG screening using our proprietary assessment framework, ensuring that sustainability considerations are embedded from the outset</li>
        <li><strong>Carbon Reduction:</strong> Portfolio carbon footprint reduced by 35% since 2023, putting us on track to achieve our Net Zero commitment by 2040</li>
        <li><strong>Board Diversity:</strong> Board diversity initiatives implemented across 90% of portfolio companies, resulting in improved governance outcomes and decision-making</li>
        <li><strong>Community Investment:</strong> Community investment programs impacting over 50,000 beneficiaries through education, healthcare, and economic empowerment initiatives</li>
        <li><strong>Renewable Energy:</strong> 60% of our energy sector investments are now in renewable and clean energy, up from 25% just three years ago</li>
        <li><strong>Supply Chain Standards:</strong> Implemented comprehensive supply chain sustainability standards across all portfolio companies</li>
      </ul>
      
      <h2>Our ESG Framework & Methodology</h2>
      
      <p>EIH's sustainability strategy is built on three fundamental pillars: responsible investment practices, active ownership, and transparent reporting. We believe that companies with strong ESG performance are better positioned for long-term success and that our role as investors includes steering companies toward more sustainable practices.</p>
      
      <p>Our ESG framework incorporates the following elements:</p>
      
      <ol>
        <li><strong>Integration:</strong> ESG factors are analyzed alongside traditional financial metrics in every investment decision, with dedicated ESG specialists supporting each investment team</li>
        <li><strong>Engagement:</strong> Active dialogue with portfolio company management on ESG issues, with clear expectations and improvement targets established at investment</li>
        <li><strong>Monitoring:</strong> Continuous monitoring of ESG performance using proprietary tools and third-party data sources, with quarterly reporting to our investment committee</li>
        <li><strong>Reporting:</strong> Annual sustainability report published with full transparency on our ESG performance, carbon footprint, and social impact metrics</li>
        <li><strong>Innovation:</strong> Continuous improvement of our ESG methodology based on emerging best practices and evolving stakeholder expectations</li>
      </ol>
      
      <blockquote>
        "Sustainable investing is not just about doing good—it's about doing well by doing good. Our ESG framework helps identify risks, unlock opportunities, and create long-term value for all stakeholders. We are honored to receive this recognition, which validates our belief that responsible investing and strong returns are not mutually exclusive."
      </blockquote>
      
      <h2>Environmental Impact & Climate Action</h2>
      
      <p>Climate change represents one of the defining challenges of our time, and we believe that the investment industry has both an opportunity and a responsibility to drive the transition to a low-carbon economy. Our climate strategy is aligned with the Paris Agreement goals and focuses on three key areas:</p>
      
      <ul>
        <li><strong>Portfolio Decarbonization:</strong> Systematic reduction of carbon intensity across our portfolio through engagement, investment selection, and divestment where necessary</li>
        <li><strong>Climate Solutions:</strong> Increased investment in companies providing climate solutions, including renewable energy, energy efficiency, and sustainable transportation</li>
        <li><strong>Climate Risk Management:</strong> Integration of physical and transition climate risks into our investment analysis and portfolio construction process</li>
        <li><strong>Advocacy:</strong> Active participation in industry initiatives and policy discussions to promote effective climate action</li>
      </ul>
      
      <h2>Social Impact & Community Development</h2>
      
      <p>Beyond environmental sustainability, we are deeply committed to creating positive social impact through our investments and corporate activities. Our social impact strategy focuses on education, healthcare, economic inclusion, and community development.</p>
      
      <p>Notable social impact achievements in the past year include:</p>
      
      <ul>
        <li><strong>Education:</strong> Scholarship programs supporting over 2,000 students from underprivileged backgrounds to pursue higher education</li>
        <li><strong>Healthcare:</strong> Investment in healthcare infrastructure serving over 500,000 patients annually in underserved communities</li>
        <li><strong>Employment:</strong> Portfolio companies created over 25,000 new jobs, with a focus on quality employment and skill development</li>
        <li><strong>Women's Empowerment:</strong> Dedicated programs to promote women's leadership and entrepreneurship, impacting over 10,000 women</li>
        <li><strong>Financial Inclusion:</strong> Fintech investments providing access to financial services for over 2 million previously unbanked individuals</li>
      </ul>
      
      <h2>Looking Forward</h2>
      
      <p>This recognition reinforces our commitment to leading by example in the investment community and demonstrates that financial returns and positive impact can go hand in hand. We are energized by this acknowledgment and committed to raising the bar even higher in the years ahead.</p>
      
      <p>As we look to the future, we remain focused on continuous improvement of our ESG practices, deeper integration of sustainability into every aspect of our operations, and driving positive change across our portfolio and beyond. We believe that the next decade will be critical for sustainability, and we are determined to play a leading role in shaping a more sustainable and equitable future.</p>
    `,
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80',
    category: 'press',
    date: 'January 10, 2026',
    readTime: '4 min read',
    author: 'Press Office',
    authorRole: 'Corporate Communications',
    authorImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&q=80'
  }
}

// Related posts
const relatedPosts = [
  {
    id: 4,
    slug: 'expansion-into-emerging-markets',
    title: 'Strategic Expansion into Emerging Markets',
    excerpt: 'EIH unveils plans for significant investments in high-growth emerging economies.',
    image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&q=80',
    category: 'news',
    date: 'January 5, 2026',
    readTime: '6 min read'
  },
  {
    id: 5,
    slug: 'annual-sustainability-report-2025',
    title: 'Annual Sustainability Report 2025 Released',
    excerpt: 'Comprehensive overview of our environmental and social governance achievements.',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    category: 'press',
    date: 'December 28, 2025',
    readTime: '10 min read'
  },
  {
    id: 6,
    slug: 'digital-transformation-in-financial-services',
    title: 'Digital Transformation in Financial Services',
    excerpt: 'How technology is reshaping the landscape of modern finance and investment.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    category: 'news',
    date: 'December 20, 2025',
    readTime: '7 min read'
  }
]

export default function BlogDetail({ params }: { params: { slug: string } }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null)

  // Get post data
  const post = blogPosts[params.slug] || blogPosts['eih-announces-strategic-partnership-with-global-tech-leaders']

  // Scroll animation setup
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up')
          entry.target.classList.remove('opacity-0')
        }
      })
    }, observerOptions)

    const sections = document.querySelectorAll('[data-scroll-animate]')
    sections.forEach(section => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  // Navigation structure
  const navigation = [
    {
      title: 'About Us',
      items: ['EIH Legacy / Who We Are', 'Vision, Mission, Values', 'Leadership', 'Corporate Sustainability']
    },
    {
      title: 'Investment Sectors',
      items: ['Growth Capital', 'Private Equity', 'Capital Markets', 'Private Credit & Infrastructure']
    },
    {
      title: 'Careers',
      items: ['Life At EIH', 'Career Opportunities']
    },
    {
      title: 'News & Insights',
      items: ['Newsroom', 'Reports', 'Blogs']
    }
  ]

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [menuOpen])

  return (
    <main data-testid="page-blog-detail" className="bg-[#fffcf8] overflow-x-hidden">
      {/* FULL SCREEN MENU OVERLAY */}
      <div 
        className={`fixed inset-0 z-[100] bg-[#fffcf8] transition-transform duration-500 ease-in-out ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Menu Header */}
        <div className="py-6 sm:py-10 px-4 sm:px-8 md:px-16">
          <div className="flex justify-between items-center">
            <Link href="/" className="font-serif text-[18px] sm:text-[20px] md:text-[26px] tracking-[0.15em] text-[#191817]">EIH</Link>
            <button 
              onClick={() => {
                setMenuOpen(false)
                setActiveSubmenu(null)
              }}
              className="p-2 text-[#191817] hover:text-[#b69c6b] transition-colors"
              aria-label="Close menu"
            >
              <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Menu Content */}
        <div className="h-[calc(100vh-100px)] overflow-y-auto px-4 sm:px-8 md:px-16">
          <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 lg:gap-16 py-8 sm:py-12">
            {/* Left Side - Navigation */}
            <div className="space-y-1">
              {navigation.map((nav, index) => (
                <div key={index} className="border-b border-[#191817]/10">
                  <button
                    onClick={() => setActiveSubmenu(activeSubmenu === nav.title ? null : nav.title)}
                    className="w-full py-4 sm:py-6 flex justify-between items-center group"
                  >
                    <span className={`font-serif text-[24px] sm:text-[32px] md:text-[42px] group-hover:text-[#b69c6b] transition-colors uppercase tracking-[0.05em] ${nav.title === 'News & Insights' ? 'text-[#b69c6b]' : 'text-[#191817]'}`}>
                      {nav.title}
                    </span>
                    <ChevronDown 
                      className={`w-5 h-5 sm:w-6 sm:h-6 text-[#191817] group-hover:text-[#b69c6b] transition-all duration-300 ${
                        activeSubmenu === nav.title ? 'rotate-180' : ''
                      }`} 
                    />
                  </button>
                  {/* Submenu */}
                  <div 
                    className={`overflow-hidden transition-all duration-300 ${
                      activeSubmenu === nav.title ? 'max-h-[500px] pb-4' : 'max-h-0'
                    }`}
                  >
                    <div className="pl-4 sm:pl-8 space-y-3">
                      {nav.items.map((item, itemIndex) => (
                        <Link 
                          key={itemIndex}
                          href={item === 'EIH Legacy / Who We Are' ? '/who-we-are' : item === 'Blogs' ? '/blog' : '#'}
                          onClick={() => setMenuOpen(false)}
                          className={`block font-serif text-[16px] sm:text-[18px] md:text-[20px] hover:text-[#b69c6b] transition-colors ${item === 'Blogs' ? 'text-[#b69c6b]' : 'text-[#191817]'}`}
                        >
                          {item}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Contact Us - Direct Link */}
              <div className="border-b border-[#191817]/10">
                <Link
                  href="/contact-us"
                  onClick={() => setMenuOpen(false)}
                  className="w-full py-4 sm:py-6 flex justify-between items-center group"
                >
                  <span className="font-serif text-[24px] sm:text-[32px] md:text-[42px] text-[#191817] group-hover:text-[#b69c6b] transition-colors uppercase tracking-[0.05em]">
                    Contact Us
                  </span>
                </Link>
              </div>
            </div>

            {/* Right Side - Contact Info */}
            <div className="lg:border-l lg:border-[#191817]/10 lg:pl-16">
              <div className="space-y-8">
                <div>
                  <h3 className="font-serif text-[20px] sm:text-[24px] md:text-[28px] text-[#191817] mb-3">Contact Us</h3>
                  <div className="w-12 h-[2px] bg-[#b69c6b]"></div>
                </div>
                
                <div className="space-y-4">
                  <a href="tel:+97112340000" className="block font-serif text-[16px] sm:text-[18px] text-[#191817] hover:text-[#b69c6b] transition-colors underline">
                    +971 1234 0000
                  </a>
                  <a href="mailto:contact@ethmar.ae" className="block font-serif text-[16px] sm:text-[18px] text-[#191817] hover:text-[#b69c6b] transition-colors underline">
                    contact@ethmar.ae
                  </a>
                </div>

                {/* Social Icons */}
                <div className="flex gap-4 pt-4">
                  <a href="#" className="text-[#191817]/50 hover:text-[#b69c6b] transition-colors" aria-label="Facebook">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-[#191817]/50 hover:text-[#b69c6b] transition-colors" aria-label="Instagram">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-[#191817]/50 hover:text-[#b69c6b] transition-colors" aria-label="LinkedIn">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-[#191817]/50 hover:text-[#b69c6b] transition-colors" aria-label="X/Twitter">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-[#191817]/50 hover:text-[#b69c6b] transition-colors" aria-label="YouTube">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>
                </div>

                {/* Language Toggle */}
                <div className="pt-8 border-t border-[#191817]/10">
                  <div className="flex gap-4">
                    <button className="font-serif text-[16px] sm:text-[18px] text-[#191817] font-medium">EN</button>
                    <span className="text-[#191817]/30">|</span>
                    <button className="font-serif text-[16px] sm:text-[18px] text-[#191817]/50 hover:text-[#191817] transition-colors">AR</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* HERO SECTION */}
      <header className="relative min-h-[60vh] md:min-h-[70vh] flex flex-col bg-[#0b1320]">
        <div className="absolute inset-0 z-0">
          <Image 
            src={post.image}
            className="w-full h-full object-cover grayscale brightness-[0.3] contrast-[1.1]"
            alt={post.title}
            fill
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b1320] via-[#0b1320]/50 to-transparent"></div>
        </div>

        {/* Navigation */}
        <div className="absolute top-0 left-0 right-0 z-50 py-6 sm:py-10 px-4 sm:px-8 md:px-16">
          {/* Mobile header */}
          <nav className="md:hidden flex items-center justify-between text-white">
            <button 
              className="flex flex-col justify-center items-center gap-1.5 p-2"
              aria-label="menu"
              onClick={() => setMenuOpen(true)}
            >
              <span className="block w-6 h-[2px] bg-white"></span>
              <span className="block w-6 h-[2px] bg-white"></span>
            </button>

            <Link href="/" className="font-serif text-[18px] sm:text-[20px] tracking-[0.15em]">EIH</Link>

            <div>
              <span className="cursor-pointer font-arabic text-[14px] leading-none">ع</span>
            </div>
          </nav>

          {/* Desktop header */}
          <nav className="hidden md:flex justify-between items-center text-white">
            <div className="flex items-center">
               <Link href="/" className="font-serif text-[18px] sm:text-[20px] md:text-[26px] tracking-[0.15em]">EIH</Link>
            </div>
            <div className="hidden md:flex flex-col items-center text-center text-[12px] md:text-[14px] tracking-[0.35em] uppercase opacity-95">
              <span className="mt-1 text-[12px] md:text-[18px]">ETHMAR INTERNATIONAL HOLDING</span>
            </div>
            <div className="flex gap-3 sm:gap-4 items-center text-[12px] md:text-[14px] tracking-[0.3em] font-medium">
              <button 
                className="flex flex-col justify-center items-center gap-1.5 sm:gap-2 p-2" 
                aria-label="menu"
                onClick={() => setMenuOpen(true)}
              >
                 <span className="block w-6 sm:w-8 md:w-9 h-[2px] bg-white"></span>
                 <span className="block w-6 sm:w-8 md:w-9 h-[2px] bg-white"></span>
              </button>
              <span className="cursor-pointer font-arabic text-[14px] md:text-[16px] leading-none">ع</span>
            </div>
          </nav>
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 flex-1 flex flex-col justify-end py-16 sm:py-20 md:py-24 px-4 sm:px-8 md:px-16">
          <div className="max-w-[1000px] mx-auto w-full">
            {/* Back Link */}
            <Link href="/blog" className="inline-flex items-center gap-2 text-white/60 hover:text-white font-serif text-[12px] sm:text-[13px] tracking-[0.15em] uppercase mb-6 sm:mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to All Articles
            </Link>
            {/* Category Badge */}
            <div className="mb-4 sm:mb-6">
              <span className={`inline-block px-4 py-2 text-[10px] sm:text-[11px] tracking-[0.2em] uppercase font-serif ${post.category === 'news' ? 'bg-[#b69c6b] text-white' : 'bg-white text-[#191817]'}`}>
                {post.category === 'news' ? 'News & Blogs' : 'Press Release'}
              </span>
            </div>
            {/* Title */}
            <h1 className="text-white font-serif text-[28px] sm:text-[40px] md:text-[52px] lg:text-[60px] leading-[1.1] tracking-[0.02em] mb-6 sm:mb-8">
              {post.title}
            </h1>
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-white/50">
              <span className="flex items-center gap-2 font-serif text-[12px] sm:text-[14px]">
                <Calendar className="w-4 h-4" />
                {post.date}
              </span>
              <span className="flex items-center gap-2 font-serif text-[12px] sm:text-[14px]">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </span>
              <span className="flex items-center gap-2 font-serif text-[12px] sm:text-[14px]">
                <User className="w-4 h-4" />
                {post.author}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* ARTICLE CONTENT */}
      <article className="py-20 sm:py-28 md:py-32 px-4 sm:px-8 md:px-16 bg-[#fffcf8]">
        <div className="max-w-[1000px] mx-auto w-full">
          {/* Decorative Line */}
          <div className="flex items-center gap-4 mb-12">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#b69c6b]/40 to-transparent"></div>
            <span className="text-[#b69c6b] text-[10px] tracking-[0.4em] font-serif uppercase">Article</span>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#b69c6b]/40 to-transparent"></div>
          </div>

          {/* Lead paragraph - Standfirst */}
          <p className="text-[#1a1815] font-serif text-[20px] sm:text-[22px] md:text-[24px] leading-[1.65] mb-14 sm:mb-16 md:mb-20 font-medium text-center">
            {post.excerpt}
          </p>

          {/* Separator */}
          <div className="flex justify-center mb-14">
            <div className="flex items-center gap-3">
              <div className="w-12 h-[1px] bg-[#b69c6b]"></div>
              <div className="w-2 h-2 bg-[#b69c6b] rotate-45"></div>
              <div className="w-12 h-[1px] bg-[#b69c6b]"></div>
            </div>
          </div>

          {/* Article Content */}
          <div 
            className="article-content
              [&_h2]:text-[20px] [&_h2]:sm:text-[22px] [&_h2]:md:text-[24px] [&_h2]:font-serif [&_h2]:font-bold [&_h2]:text-[#1a1815] [&_h2]:mt-14 [&_h2]:mb-6 [&_h2]:tracking-tight [&_h2]:leading-snug [&_h2]:uppercase [&_h2]:tracking-widest
              [&_p]:font-serif [&_p]:text-[17px] [&_p]:sm:text-[18px] [&_p]:md:text-[19px] [&_p]:text-[#3a3530] [&_p]:leading-[1.9] [&_p]:mb-6
              [&_strong]:font-bold [&_strong]:text-[#1a1815]
              [&_em]:italic [&_em]:text-[#554d42]
              [&_ul]:list-none [&_ul]:space-y-4 [&_ul]:my-8 [&_ul]:pl-0 [&_ul]:border-l-2 [&_ul]:border-[#e8e0d4] [&_ul]:ml-4
              [&_ol]:list-none [&_ol]:space-y-4 [&_ol]:my-8 [&_ol]:pl-0 [&_ol]:border-l-2 [&_ol]:border-[#e8e0d4] [&_ol]:ml-4
              [&_li]:font-serif [&_li]:text-[17px] [&_li]:sm:text-[18px] [&_li]:md:text-[19px] [&_li]:text-[#3a3530] [&_li]:leading-[1.9] [&_li]:pl-6 [&_li]:relative
              [&_blockquote]:border-l-0 [&_blockquote]:border-t [&_blockquote]:border-b [&_blockquote]:border-[#b69c6b]/30 [&_blockquote]:px-6 [&_blockquote]:my-10 [&_blockquote]:py-8 [&_blockquote]:text-center
              [&_blockquote_p]:text-[19px] [&_blockquote_p]:sm:text-[21px] [&_blockquote_p]:md:text-[23px] [&_blockquote_p]:mb-0 [&_blockquote_p]:leading-[1.7] [&_blockquote_p]:font-medium [&_blockquote_p]:text-[#1a1815] [&_blockquote_p]:italic
              [&_a]:text-[#b69c6b] [&_a]:font-medium hover:[&_a]:text-[#8b7654] [&_a]:transition-colors [&_a]:border-b [&_a]:border-[#b69c6b]/30 hover:[&_a]:border-[#8b7654]"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Share Section */}
          <div className="mt-20 sm:mt-24 md:mt-28 pt-10 sm:pt-12 md:pt-14 border-t-2 border-[#b69c6b]/30">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-8">
              <div>
                <p className="font-serif text-[11px] sm:text-[12px] tracking-[0.35em] uppercase text-[#191817]/40 mb-5 font-medium">Share This Article</p>
                <div className="flex items-center gap-4">
                  <a href="#" className="w-12 h-12 flex items-center justify-center bg-[#0b1320] hover:bg-[#b69c6b] text-white transition-all duration-300 transform hover:scale-110" aria-label="Share on Facebook">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-12 h-12 flex items-center justify-center bg-[#0b1320] hover:bg-[#b69c6b] text-white transition-all duration-300 transform hover:scale-110" aria-label="Share on LinkedIn">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-12 h-12 flex items-center justify-center bg-[#0b1320] hover:bg-[#b69c6b] text-white transition-all duration-300 transform hover:scale-110" aria-label="Share on X/Twitter">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                  <button className="w-12 h-12 flex items-center justify-center bg-[#0b1320] hover:bg-[#b69c6b] text-white transition-all duration-300 transform hover:scale-110" aria-label="Copy link">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Author Card */}
              <div className="flex items-center gap-5 bg-gradient-to-r from-[#f2efe6] to-[#f9f7f4] p-6 sm:p-8 border border-[#b69c6b]/20">
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden flex-shrink-0 border-2 border-[#b69c6b]">
                  <Image src={post.authorImage} alt={post.author} fill className="object-cover" />
                </div>
                <div>
                  <p className="font-serif text-[16px] sm:text-[18px] text-[#191817] mb-1 font-medium">{post.author}</p>
                  <p className="font-serif text-[13px] sm:text-[14px] text-[#191817]/60">{post.authorRole}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* RELATED ARTICLES */}
      <section className="py-20 sm:py-28 md:py-32 px-4 sm:px-8 md:px-16 bg-[#f2efe6] relative overflow-hidden" data-scroll-animate>
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#b69c6b]/[0.04] rounded-full blur-3xl pointer-events-none -translate-y-1/3 translate-x-1/4"></div>

        <div className="max-w-[1440px] mx-auto relative z-10">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <div className="flex items-center justify-center gap-4 mb-6 sm:mb-8">
              <div className="w-10 sm:w-14 md:w-20 h-[1px] bg-gradient-to-r from-transparent to-[#b69c6b]/40"></div>
              <div className="w-2 h-2 bg-[#b69c6b] rotate-45"></div>
              <div className="w-10 sm:w-14 md:w-20 h-[1px] bg-gradient-to-l from-transparent to-[#b69c6b]/40"></div>
            </div>
            <h2 className="text-[#191817] font-serif font-bold text-[14px] sm:text-[18px] md:text-[30px] uppercase tracking-[0.3em] leading-none md:leading-relaxed">
              RELATED ARTICLES
            </h2>
          </div>

          {/* Related Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {relatedPosts.map((relatedPost) => (
              <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`} className="group">
                <article className="bg-white border border-[#191817]/[0.06] overflow-hidden h-full flex flex-col">
                  {/* Image */}
                  <div className="relative h-[200px] sm:h-[220px] overflow-hidden">
                    <Image 
                      src={relatedPost.image} 
                      alt={relatedPost.title} 
                      fill 
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1.5 text-[10px] tracking-[0.15em] uppercase font-serif ${relatedPost.category === 'news' ? 'bg-[#b69c6b] text-white' : 'bg-white text-[#191817]'}`}>
                        {relatedPost.category === 'news' ? 'News & Blogs' : 'Press Release'}
                      </span>
                    </div>
                  </div>
                  {/* Content */}
                  <div className="p-6 sm:p-8 flex flex-col flex-1">
                    {/* Meta */}
                    <div className="flex items-center gap-3 mb-4 text-[#191817]/40">
                      <span className="flex items-center gap-1.5 font-serif text-[11px] tracking-wide">
                        <Calendar className="w-3 h-3" />
                        {relatedPost.date}
                      </span>
                      <span className="w-1 h-1 bg-[#191817]/20 rounded-full"></span>
                      <span className="flex items-center gap-1.5 font-serif text-[11px] tracking-wide">
                        <Clock className="w-3 h-3" />
                        {relatedPost.readTime}
                      </span>
                    </div>
                    {/* Title */}
                    <h3 className="text-[#191817] font-serif text-[17px] sm:text-[19px] leading-[1.3] mb-3 group-hover:text-[#b69c6b] transition-colors flex-1">
                      {relatedPost.title}
                    </h3>
                    {/* Read More */}
                    <span className="inline-flex items-center gap-2 text-[#b69c6b] font-serif text-[12px] tracking-[0.15em] uppercase group-hover:gap-3 transition-all">
                      Read More
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {/* View All Button */}
          <div className="flex justify-center mt-12 sm:mt-16">
            <Link href="/blog" className="group inline-flex items-center gap-3 px-8 sm:px-12 py-4 bg-[#0b1320] text-white font-serif text-[12px] sm:text-[13px] tracking-[0.2em] uppercase hover:bg-[#191817] transition-colors">
              View All Articles
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-[#dfd4bf] pt-16 sm:pt-24 md:pt-40 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-8 md:px-16 relative overflow-hidden" style={{ backgroundImage: "url('/assets/footer-bg.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]" />
        <div className="absolute inset-0 bg-black/40 sm:bg-black/20" />
        <div className="max-w-[1440px] mx-auto relative z-10">
          <div className="flex flex-col items-center text-center mb-16 sm:mb-24 md:mb-32">
             <div className="grid grid-cols-2 gap-6 sm:gap-10 md:grid-cols-4 md:gap-24 w-full max-w-[1200px] text-[14px] sm:text-[17px] md:text-[22px] tracking-[0.1em] sm:tracking-[0.15em] font-serif mb-16 sm:mb-24 md:mb-32">
                <Link href="/who-we-are" className="hover:opacity-80 transition-opacity uppercase py-2">ABOUT US</Link>
                <Link href="#" className="hover:opacity-80 transition-opacity uppercase py-2">INVESTMENTS</Link>
                <Link href="#" className="hover:opacity-80 transition-opacity uppercase py-2">CAREERS</Link>
                <Link href="/contact-us" className="hover:opacity-80 transition-opacity uppercase py-2">CONTACT US</Link>
             </div>

             <div className="flex justify-end w-full mb-8 sm:mb-12">
                <div />
             </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 sm:gap-8">
             <div className="flex flex-col items-start sm:items-end gap-4 w-full sm:w-auto mt-4 sm:mt-0 md:order-2">
                <Link href="#" className="text-[#b69c6b] hover:text-[#dfd4bf] transition-colors transform sm:-translate-y-3 md:-translate-y-4" aria-label="LinkedIn">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </Link>
                <div className="flex flex-wrap gap-4 sm:gap-6 text-[12px] sm:text-[13px] md:text-[15px] opacity-70 text-left sm:text-right">
                   <Link href="#" className="hover:opacity-100 transition-opacity">Terms of Use</Link>
                   <Link href="#" className="hover:opacity-100 transition-opacity">Regulatory Information</Link>
                   <Link href="#" className="hover:opacity-100 transition-opacity">Privacy</Link>
                   <Link href="#" className="hover:opacity-100 transition-opacity">Phishing</Link>
                </div>
             </div>
             
             <div className="flex flex-col gap-3 md:order-1">
               <p className="text-[12px] sm:text-[14px] md:text-[17px] tracking-[0.03em] sm:tracking-[0.05em] opacity-90 uppercase leading-relaxed">
                 2026 ETHMAR INTERNATIONAL HOLDINGS <span className="hidden sm:inline mx-3 opacity-40">|</span><br className="sm:hidden" /> ALL RIGHTS RESERVED
               </p>
               <p className="text-[12px] sm:text-[13px] md:text-[15px] opacity-60 max-w-[650px] leading-relaxed">
                 Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
               </p>
             </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
