import React from 'react'
import { motion } from 'framer-motion'
import { Linkedin, Instagram, Github, Target, Eye, Heart } from 'lucide-react'
import { openExternalLink } from '../utils/helpers'
import ProfileCard from '../components/ProfileCard'

const About: React.FC = () => {
  const teamMembers = [
    {
      id: "0",
      name: "Yuva Bharti",
      team: "LEADERSHIP",
      role: "President",
      bio: `"Leadership is a practice of imperfect humans leading imperfect humans. That's why it's so hard."`,
      email: "yuva.bharti@vitbhopal.ac.in",
      image: "/images/team/president/YuvaBharti.jpg",
      linkedin: "https://www.linkedin.com/in/yuva-bharti-bansal/",
      instagram: "https://www.instagram.com/yuvabbansal?igsh=MTNsM2FuMzVvbmxpeA==",
      github: null
    },
    {
      id: "1",
      name: "Darshan V",
      team: "LEADERSHIP",
      role: "Vice President",
      bio: "Vetrivel Veeravel",
      email: "darshan.v2022@vitbhopal.ac.in",
      image: "/images/team/president/darshanV.jpeg",
      linkedin: "https://www.linkedin.com/in/darshanv1/",
      instagram: null,
      github: "https://github.com/TheHashiramaSenju"
    },
    {
      id: "2",
      name: "Yash Goyal",
      team: "LEADERSHIP",
      role: "General Secretary",
      bio: "Precision in Motion, success in action",
      email: "yash.goyal@vitbhopal.ac.in",
      image: "/images/team/managers/YashGoyal.jpg",
      linkedin: "https://www.linkedin.com/in/yashgoyal06/",
      instagram: "https://www.instagram.com/__yash__06__",
      github: "https://github.com/YashGoyal06"
    },
    {
      id: "3",
      name: "Piyush Kumar Singh",
      team: "LEADERSHIP",
      role: "Operation Manager",
      bio: "Connecting Teams. Building Systems. Delivering Results.",
      email: "piyush.24bai10094@vitbhopal.ac.in",
      image: "/images/team/managers/PiyushKumarSingh.jpeg",
      linkedin: "https://www.linkedin.com/in/piyush-kumar-singh-b53749313/",
      instagram: "https://www.instagram.com/signature.piyush_/"
    },

    // -----------------------------------Digital Media and Production Team-----------------------------------------
    {
      id: "1",
      name: "Tuhin Rakshit",
      team: "DIGITAL MEDIA AND PRODUCTION TEAM",
      role: "Lead",
      bio: "Capturing stories through the lens of creativity",
      email: "",
      image: "/images/team/digitalmedia/TuhinRakshit.jpg",
      linkedin: "https://www.linkedin.com/in/tuhin-rakshit-05511528a",
      instagram: "https://www.instagram.com/tuhinrakshit6",
      github: null
    },
    {
      id: "2",
      name: "Eipshita Basuli",
      team: "DIGITAL MEDIA AND PRODUCTION TEAM",
      role: "Core Member",
      bio: "We don't just post, we produce.",
      email: "eipshita.24bac10038@vitbhopal.ac.in",
      image: "/images/team/digitalmedia/EipshitaBasuli.jpeg",
      linkedin: null,
      instagram: "https://www.instagram.com/eipshitabasuli/",
      github: null
    },
    {
      id: "8",
      name: "Ashmit Mudgal",
      team: "DIGITAL MEDIA AND PRODUCTION TEAM",
      role: "Co-Lead",
      bio: "Creating impact together",
      email: "ashmit.24bcy10376@vitbhopal.ac.in",
      image: "/images/team/digitalmedia/AshmitMudgal.jpg",
      linkedin: null,
      instagram: "https://www.instagram.com/ashmit.mudgal/"
    },
    {
      id: "9",
      name: "KAUSHAL KANT",
      team: "DIGITAL MEDIA AND PRODUCTION TEAM",
      role: "Core Member",
      bio: "Driven by creativity, powered by media.",
      email: "kaushal.24bcy10062@vitbhopal.ac.in",
      image: "/images/team/digitalmedia/KaushalKant.jpg",
      linkedin: "https://www.linkedin.com/in/kaushal-kant-718959323",
      instagram: "https://www.instagram.com/kaushal_3589/"
    },
    {
      id: "13",
      name: "Anupriya",
      team: "DIGITAL MEDIA AND PRODUCTION TEAM",
      role: "Core Member",
      bio: "Capturing moments, Creating impact",
      email: "anupriya.24bce11110@vitbhopal.ac.in",
      image: "/images/team/digitalmedia/Anupriya.jpg",
      linkedin: "https://www.linkedin.com/in/anupriya-859445322",
      instagram: "https://www.instagram.com/anupriya36993"
    },
    {
      id: "107",
      name: "Aditya Kumar",
      team: "DIGITAL MEDIA AND PRODUCTION TEAM",
      role: "Core Member",
      bio: "Moments explain what words never can",
      email: "aditya.24bhi10050@vitbhopal.ac.in",
      image: "/images/team/digitalmedia/AdityaKumar.jpg",
      linkedin: "https://www.linkedin.com/in/aditya-kumar-7a216934a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      instagram: "https://www.instagram.com/adiiiitya.aa"
    },
    {
      id: "108",
      name: "Shrenika Rajpoot",
      team: "DIGITAL MEDIA AND PRODUCTION TEAM",
      role: "Core Member",
      bio: "Social media team || where content that connects ",
      email: "shrenika.25bai11384@vitbhopal.ac.in",
      image: "/images/team/digitalmedia/ShrenikaRajpoot.png",
      linkedin: "https://www.linkedin.com/in/shrenika-rajpoot?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      instagram: "https://www.instagram.com/shrenikarajput?igsh=YnM2OG5sbTM2bW90"
    },
    {
      id: "109",
      name: "Deepti Singh",
      team: "DIGITAL MEDIA AND PRODUCTION TEAM",
      role: "Core Member",
      bio: "Powered by reels,stories and posts.. ",
      email: "deepti.25bai10058@vitbhopal.ac.in",
      image: "/images/team/digitalmedia/DeeptiSingh.jpg",
      linkedin: null,
      instagram: "https://www.instagram.com/deepti.singh_18"
    },

    // -----------------------------------Event Management Team-----------------------------------------
    {
      id: "3",
      name: "AYUSH UPADHYAY",
      team: "EVENT MANAGEMENT",
      role: "Core Member",
      bio: "A great event leaves hearts full, not just calendars marked",
      email: "ayush.24mei10091@vitbhopal.ac.in",
      image: "/images/team/eventmanagement/AyushUpadhyay.jpg",
      linkedin: null,
      instagram: "https://www.instagram.com/royal7_ayush/",
      github: null
    },
    {
      id: "11",
      name: "Shivang saini",
      team: "EVENT MANAGEMENT",
      role: "Co-Lead",
      bio: "No matter how many fish in the sea It would be so empty without me",
      email: "shivang.24bsa10306@vitbhopal.ac.in",
      image: "/images/team/eventmanagement/ShivangSaini.jpg",
      linkedin: "http://www.linkedin.com/inshivang-saini-455681328",
      instagram: "https://www.instagram.com/shivangsaini17/"
    },
    {
      id: "16",
      name: "Abhishek Mishra",
      team: "EVENT MANAGEMENT",
      role: "Core Member",
      bio: "Relentless in preparation. Undefeated in execution.",
      email: "abhishek.24bai10673@vitbhopal.ac.in",
      image: "/images/team/eventmanagement/AbhishekMishra.jpg",
      linkedin: "https://www.linkedin.com/in/abhishek-mishra-74745a324",
      instagram: null,
      github: null
    },
    {
      id: "105",
      name: "Aryan Mishra",
      team: "EVENT MANAGEMENT",
      role: "Core Member",
      bio:  `Making sure the "Backend" doesn't crash in real life`,
      email: "aryan.24mip10041@vitbhopal.ac.in",
      image: "/images/team/eventmanagement/AryanMishra.JPG",
      linkedin: null,
      instagram: "https://www.instagram.com/aryan_mishra62/",
      github: null
    },
    {
      id: "106",
      name: "Kashish Raj",
      team: "EVENT MANAGEMENT",
      role: "Core Member",
      bio: "Where ideas meet execution",
      email: "kashish.25bai11409@vitbhopal.ac.in",
      image: "/images/team/eventmanagement/KashishRaj.jpg",
      linkedin: "https://www.linkedin.com/in/kashish-raj-70940b379?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      instagram: null,
      github: null
    },

    // -----------------------------------Technical Team-----------------------------------------
    {
      id:"120",
      name: "Vishwajeet Pratap Singh",
      team: "TECHNICAL",
      role: "Lead",
      bio: "If itss not broken, give it time… wesll fix it anyway.",
      email: "vishwajeet.23bcg10096@vitbhopal.ac.in",
      image: "/images/team/technical/Vishwajeet.jpeg",
      linkedin: "https://www.linkedin.com/in/v7ksr/",
      github: "https://github.com/vKS-Rajput"
    },

    {
      id: "5",
      name: "Arav Acharya",
      team: "TECHNICAL",
      role: "Core Member",
      bio: "Turning caffeine into code | Full Stack Developer | Generative AI",
      email: "arav.23bce11788@vitbhopal.ac.in",
      image: "/images/team/technical/AravAchari.jpg",
      linkedin: "https://www.linkedin.com/in/arav-achari-115715281/",
      instagram: "https://www.instagram.com/_arav_acharya_?igsh=bnh1eXhieTZ6Zmdz"
    },
    {
      id: "15",
      name: "Sarthak Jalan",
      team: "TECHNICAL",
      role: "Core Member",
      bio: "Cloud & Backend || Deploying dreams, not just servers",
      email: "sarthak.23bsa10058@vitbhopal.ac.in",
      image: "/images/team/technical/SarthakJalan.jpg",
      linkedin: "https://www.linkedin.com/in/sarthak-jalan-7685a7285/",
      instagram: "https://www.instagram.com/frenzy_sarthak/",
      github: "https://github.com/sarthakjalan05"
    },
    {
      id: "18",
      name: "Deepak Shukla",
      team: "TECHNICAL",
      role: "Co-Lead",
      bio: "Web & ML || Crafting full-stack experiences and teaching machines to read.",
      email: "deepak.23bce11422@vitbhopal.ac.in",
      image: "/images/team/technical/DeepakShukla.jpg",
      linkedin: "https://www.linkedin.com/in/deepak-shukla-27a60628a/",
      instagram: "https://www.instagram.com/dipakshukla1508/",
      github: "https://github.com/deepak-158"
    },
    {
      id: "19",
      name: "Bhumika Verma",
      team: "TECHNICAL",
      role: "Core Member",
      bio: "Coding the future, one line at a time",
      email: "",
      image: "/images/team/technical/BhumikaVerma.jpg",
      linkedin: null,
      instagram: null,
      github: null
    },
    {
      id: "21",
      name: "Sreelakshmi A",
      team: "TECHNICAL",
      role: "Core Member",
      bio: "AI/ML Student || Training my future, one epoch at a time",
      email: "sreelakshmi.23bai11083@vitbhopal.ac.in",
      image: "/images/team/technical/Sreelakshmi.jpg",
      linkedin: "https://www.linkedin.com/in/sreelakshmi-a-69100b296",
      instagram: null,
      github: null
    },
    {
      id: "22",
      name: "Ayush Gupta",
      team: "TECHNICAL",
      role: "Core Member",
      bio: "Full-stack developer || Building scalable solutions and debugging life, one commit at a time",
      email: "",
      image: "/images/team/technical/AyushGupta.jpg",
      linkedin: "https://www.linkedin.com/in/ayushkathil/",
      instagram: "https://www.instagram.com/ayush_kathil/",
      github: null
    },
    {
      id: "111",
      name: "Deepak Singh",
      team: "TECHNICAL",
      role: "Core Member",
      bio: "Data Scientist ",
      email: "deepak.24mim10228@vitbhopal.ac.in",
      image: "/images/team/technical/DeepakSingh.png",
      linkedin: null,
      instagram: "https://www.instagram.com/d_raajput_01?igsh=eXU2d2kwdm1kbTVj",
      github: null
    },
    {
      id: "112",
      name: "Vaishnavi Sagar Jadhav",
      team: "TECHNICAL",
      role: "Core Member",
      bio: "Web Development || Turning ideas into responsive reality.",
      email: "vaishnavi.25bai11401@vitbhopal.ac.in",
      image: "/images/team/technical/VaishnaviJadhav.jpg",
      linkedin: "https://www.linkedin.com/in/vaishnavi-jadhav-b6b147376?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      instagram: "https://www.instagram.com/vaishnavijadhav9328?igsh=MWw4amJsYXIydTM2eg==",
      github: null
    }, 
    {
      id: "115",
      name: "Rakshit Raj",
      team: "TECHNICAL",
      role: "Core Member",
      bio: "Talk is Cheap Show me the Code",
      email: "rakshit.25bai11234@vitbhopal.ac.in",
      image: "/images/team/technical/RakshitRaj.jpeg",
      linkedin: "https://www.linkedin.com/in/RakshitRajVIT",
      instagram: "https://www.instagram.com/rakshitraj._",
      github: "https://github.com/rakshitrajvit"
    },

    
    

    // -----------------------------------PR and Outreach Team-----------------------------------------
    {
      id: "6",
      name: "Tanisha Verma",
      team: "PR AND OUTREACH",
      role: "Lead",
      bio: "Coding connections, igniting innovation!",
      email: "",
      image: "/images/team/pr/TanishaVerma.jpg",
      linkedin: "https://www.linkedin.com/in/tanishaverma13",
      instagram: "https://www.instagram.com/tanisha11_27?igsh=ZW05cDBlc3IyMWJh",
      github: null
    },
    {
      id: "7",
      name: "Mohammed Kaif",
      team: "PR AND OUTREACH",
      role: "Co-Lead",
      bio: "Still Figuring Out What PR Means || Outreach Ninja, Meme Enthusiast",
      email: "mohammad.23bai10510@vitbhopal.ac.in",
      image: "/images/team/pr/MohammedKaif.jpeg",
      linkedin: null,
      instagram: "https://www.instagram.com/zkaifsyed46/"
    },
    {
      id: "10",
      name: "Anushka",
      team: "PR AND OUTREACH",
      role: "Core Member",
      bio: "Turning connections into collaborations.",
      email: "anushka.24bai10805@vitbhopal.ac.in",
      image: "/images/team/pr/Anushka.jpg",
      linkedin: "https://www.linkedin.com/in/anushka-09a694357/",
      instagram: null,
      github: null
    },
    {
      id: "104",
      name: "Akshat Mishra",
      team: "PR AND OUTREACH",
      role: "Core Member",
      bio: "Execution Over Excuses",
      email: "akshat.25bai11569@vitbhopal.ac.in",
      image: "/images/team/pr/AkshatMishra.jpg",
      linkedin: null,
      instagram: "https://www.instagram.com/akshatsznzz",
      github: null
    },
    {
      id: "116",
      name: "Rakshit Raj",
      team: "PR AND OUTREACH",
      role: "Core Member",
      bio: "From Campus to Crowd - one message at a Time",
      email: "rakshit.25bai11234@vitbhopal.ac.in",
      image: "/images/team/technical/RakshitRaj.jpeg",
      linkedin: "https://www.linkedin.com/in/RakshitRajVIT",
      instagram: "https://www.instagram.com/rakshitraj._",
      github: "https://github.com/rakshitrajvit"
    },
    
    // -----------------------------------Design Team-----------------------------------------
    {
      id: "12",
      name: "Nikhil Mohammed",
      team: "DESIGN",
      role: "Lead",
      bio: "Design Team || Your idea, our canvas",
      email: "nikhil.23bai10718@vitbhopal.ac.in",
      image: "/images/team/design/NikhilMohammed.jpeg",
      linkedin: "http://linkedin.com/in/nikhil-mohammed",
      instagram: "https://www.instagram.com/nikhil.mohammed"
    },
    {
      id: "14",
      name: "RUPANKITA BARUAH",
      team: "DESIGN",
      role: "Core Member",
      bio: "and so it goes",
      email: "rupankita.24bai10975@vitbhopal.ac.in",
      image: "/images/team/design/RupankitaBaruah.jpeg",
      linkedin: "https://www.linkedin.com/in/rupankita-baruah-b59678324/",
      instagram: null,
      github: null
    },
    {
      id: "110",
      name: "Diya Gugale",
      team: "DESIGN",
      role: "Core Member",
      bio: "Designing || Where creativity meets clarity",
      email: "diya.24bai10870@vitbhopal.ac.in",
      image: "/images/team/design/DiyaGugale.jpg",
      linkedin: "https://www.linkedin.com/in/diya-gugale-2877b1275?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      instagram: null,
      github: null
    },

    // -----------------------------------Finance Team-----------------------------------------
    {
      id: "17",
      name: "Yash Saxena",
      team: "FINANCE",
      role: "Lead",
      bio: "Finance Core Member || Making every rupee count",
      email: "yash.23bce10699@vitbhopal.ac.in",
      image: "/images/team/finance/YashSaxena.jpg",
      linkedin: "https://www.linkedin.com/in/yash-saxena-5a6974279/",
      instagram: null,
      github: null
    },
    {
      id: "102",
      name: "K Kashyap",
      team: "FINANCE",
      role: "Core Member",
      bio: "Finance Core Member | Turning numbers into strategy, insights into impact, and ideas into sustainable growth.",
      email: "kashyap.25bai10101@vitbhopal.ac.in",
      image: "/images/team/finance/KKashyap.jpg",
      linkedin: "https://www.linkedin.com/in/koyilada-kashyap-862509382?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      instagram: "https://www.instagram.com/kashyap_0460_?igsh=MXF4NGk5eDhoczN2Zg==",
      github: null
    },
    {
      id: "103",
      name: "Gaurav Singh",
      team: "FINANCE",
      role: "Core Member",
      bio: "Finance",
      email: "kashyap.25bai10101@vitbhopal.ac.in",
      image: "/images/team/finance/GauravSingh.jpg",
      linkedin: null,
      instagram: "https://www.instagram.com/Gauravsingh_lucky ",
      github: null
    },
    

    // -----------------------------------Content Team-----------------------------------------
    {
      id: "20",
      name: "Lakshmi Hridyesha Peddinti",
      team: "CONTENT",
      role: "Core Member",
      bio: "Content Writer || Crafting Chaos into Chapters - One Word at a Time",
      email: "lakshmi.24bas10074@vitbhopal.ac.in",
      image: "/images/team/content/Hridyesha.jpg",
      linkedin: "https://www.linkedin.com/in/hridyesha-p-l-672965324",
      instagram: null,
      github: null
    },
    {
      id: "23",
      name: "Nishita Gupta",
      team: "CONTENT",
      role: "Lead",
      bio: "Writing what everyone else is thinking",
      email: "nishita.23bsa10081@vitbhopal.ac.in",
      image: "/images/team/content/NishitaGupta.jpg",
      linkedin: "https://www.linkedin.com/in/nishita-gupta-62348a284",
      instagram: null,
      github: null
    },
    {
      id: "100",
      name: "Aditi Sinha",
      team: "CONTENT",
      role: "Core Member",
      bio: "Powered by words, driven by ideas.",
      email: "aditi.24bhi10024@vitbhopal.ac.in",
      image: "/images/team/content/AditiSinha.jpg",
      linkedin: "https://www.linkedin.com/in/aditi-sinha-399632341",
      instagram: null,
      github: null
    },
    {
      id: "101",
      name: "Abdul Samad Khan",
      team: "CONTENT",
      role: "Core Member",
      bio: "Here for those ideas that pop up once in a while.",
      email: "abdul.24bce11414@vitbhopal.ac.in",
      image: "/images/team/content/AbdulSamad.jpg",
      linkedin: "https://www.linkedin.com/in/abdul-samad-khan-6b4b8537a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      instagram: null,
      github: null
    },
  ]

  const sponsors = [
    { name: "Unstop", logo: "/images/sponsors/unstop.jpg" },
  ]

  return (
    <div style={{ paddingTop: '100px' }}>
      {/* Mission & Vision Section */}
      <motion.section 
        className="section"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2>Our Core Code</h2>
        <div className="card-grid">
          <motion.div 
            className="card"
            whileHover={{ scale: 1.05 }}
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              textAlign: 'center',
              justifyContent: 'flex-start',
              minHeight: '400px'
            }}
          >
            <div style={{ marginBottom: '1.5rem' }}>
              <Target size={40} style={{ color: '#FFFFFF', marginBottom: '1rem' }} />
              <h3 style={{ margin: '0' }}>Mission</h3>
            </div>
            <p style={{ textAlign: 'center', flex: '1', margin: '0' }}>
              To create a vibrant community of multimedia enthusiasts who push the 
              boundaries of digital creativity. We aim to provide hands-on learning 
              experiences in photography, videography, graphic design, and emerging 
              technologies like VFX and animation.
            </p>
          </motion.div>
          
          <motion.div 
            className="card"
            whileHover={{ scale: 1.05 }}
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              textAlign: 'center',
              justifyContent: 'flex-start',
              minHeight: '400px'
            }}
          >
            <div style={{ marginBottom: '1.5rem' }}>
              <Eye size={40} style={{ color: '#FFFFFF', marginBottom: '1rem' }} />
              <h3 style={{ margin: '0' }}>Vision</h3>
            </div>
            <p style={{ textAlign: 'center', flex: '1', margin: '0' }}>
              To be the leading multimedia club that bridges the gap between 
              traditional art and digital innovation. We envision our members 
              becoming industry leaders who redefine creative expression in 
              the digital age.
            </p>
          </motion.div>
          
          <motion.div 
            className="card"
            whileHover={{ scale: 1.05 }}
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              textAlign: 'center',
              justifyContent: 'flex-start',
              minHeight: '400px'
            }}
          >
            <div style={{ marginBottom: '1.5rem' }}>
              <Heart size={40} style={{ color: '#FFFFFF', marginBottom: '1rem' }} />
              <h3 style={{ margin: '0' }}>Values</h3>
            </div>
            <p style={{ textAlign: 'center', flex: '1', margin: '0' }}>
              Innovation, collaboration, and continuous learning drive everything 
              we do. We believe in creating an inclusive environment where every 
              creative idea is valued and every member can grow their skills 
              through practical experience.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* About Club Section */}
      <motion.section 
        className="section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2>About The Matrix Club</h2>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'left' }}>
          <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
            Based at VIT Bhopal, The Matrix Club has grown from a small group of 
            creative enthusiasts to one of the most dynamic multimedia communities 
            on campus. Our club serves as a hub for students passionate about 
            visual storytelling, digital art, and cutting-edge technology.
          </p>
          <p style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>
            We organize workshops, competitions, and collaborative projects that 
            help members develop professional-level skills in various multimedia 
            disciplines. From basic photography techniques to advanced VFX 
            workflows, our events cater to all skill levels and academic backgrounds.
          </p>
          <p style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>
            Our team consists of talented students from various departments including 
            Computer Science, Artificial Intelligence, Design, and more. We believe 
            in the power of interdisciplinary collaboration to create innovative 
            multimedia experiences that push creative boundaries.
          </p>
        </div>
      </motion.section>

      {/* Team Section */}
      <motion.section 
        className="section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2>The Architects</h2>
        <p style={{ textAlign: 'center', marginBottom: '3rem', color: '#CCCCCC' }}>
          Meet the creative minds behind The Matrix Club
        </p>
        
        {/* Group team members by team */}
        {['LEADERSHIP', 'TECHNICAL', 'DESIGN', 'DIGITAL MEDIA AND PRODUCTION TEAM', 'EVENT MANAGEMENT', 'PR AND OUTREACH', 'FINANCE' , 'CONTENT'].map((teamName, teamIndex) => {
          const teamMembersFiltered = teamMembers
            .filter(member => member.team === teamName)
            .sort((a, b) => {
              // Define hierarchy order
              const roleOrder = { 'President': 1,'Vice President': 2,'General Secretary': 3, 'Operation Manager': 4, 'Lead': 5, 'Co-Lead': 6, 'Core Member': 7 }
              return (roleOrder[a.role as keyof typeof roleOrder] || 8) - (roleOrder[b.role as keyof typeof roleOrder] || 8)
            })
          if (teamMembersFiltered.length === 0) return null
          
          return (
            <div key={teamName} style={{ marginBottom: '4rem' }}>
              <motion.h3 
                style={{ 
                  color: '#FFFFFF', 
                  textAlign: 'center', 
                  marginBottom: '2rem',
                  fontSize: '1.5rem',
                  fontFamily: 'Share Tech Mono, monospace'
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: teamIndex * 0.1 }}
                viewport={{ once: true }}
              >
                {teamName}
              </motion.h3>
              
              <div className="card-grid" style={{ justifyContent: 'center' }}>
                {teamMembersFiltered.map((member, index) => (
                  <motion.div 
                    key={member.id}
                    className="cardV2"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: (teamIndex * 0.1) + (index * 0.1) }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02 }}
                    style={{ 
                      textAlign: 'center',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    {/* <div style={{ textAlign: 'center', width: '100%' }}>
                      <img 
                        src={member.image} 
                        loading='lazy'
                        decoding='async'
                        alt={member.name}
                        style={{
                          width: '120px',
                          height: '120px',
                          borderRadius: '50%',
                          margin: '0 auto 1rem',
                          border: '3px solid #FFFFFF',
                          objectFit: 'cover'
                        }}
                      />
                      <h3 style={{ marginBottom: '0.5rem', textAlign: 'center' }}>{member.name}</h3>
                      <p style={{ color: '#CCCCCC', marginBottom: '0.5rem', fontSize: '0.9rem', textAlign: 'center' }}>
                        {member.role}
                      </p>
                      <p style={{ color: '#FFFFFF', marginBottom: '1rem', fontSize: '0.85rem', fontStyle: 'italic', minHeight: '50px', lineHeight: '1.4', textAlign: 'center' }}>
                        "{member.bio}"
                      </p>
                    </div>
                     */}
                      <ProfileCard
                        name={member.name}
                        title={member.role}
                        // handle="javicodes"
                        // status="Online"
                        // contactText="Contact Me"
                        avatarUrl={member.image}
                        showUserInfo = {false}
                        enableTilt={true}
                        linkedinUrl={member.linkedin ?? undefined}
                        instagramUrl={member.instagram ?? undefined}
                        githubUrl={member.github ?? undefined}
                        // enableMobileTilt
                        // onContactClick={() => console.log('Contact clicked')}
                        // behindGlowColor="hsla(108, 100%, 70%, 0.6)"
                        // customInnerGradient="linear-gradient(145deg,hsla(108, 40%, 45%, 0.55) 0%,hsla(246, 60%, 70%, 0.27) 100%)"
                      />
                    {/* <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', alignItems: 'center' }}>
                      {member.linkedin && (
                        <button 
                          onClick={() => openExternalLink(member.linkedin!)} 
                          style={{ 
                            background: 'none', 
                            border: 'none', 
                            color: '#FFFFFF', 
                            cursor: 'pointer',
                            padding: '8px',
                            borderRadius: '50%',
                            transition: 'all 0.2s',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(0, 255, 65, 0.1)'
                            e.currentTarget.style.transform = 'scale(1.2)'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'none'
                            e.currentTarget.style.transform = 'scale(1)'
                          }}
                        >
                          <Linkedin size={20} />
                        </button>
                      )}
                      {member.instagram && (
                        <button 
                          onClick={() => openExternalLink(member.instagram!)} 
                          style={{ 
                            background: 'none', 
                            border: 'none', 
                            color: '#FFFFFF', 
                            cursor: 'pointer',
                            padding: '8px',
                            borderRadius: '50%',
                            transition: 'all 0.2s',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(0, 255, 65, 0.1)'
                            e.currentTarget.style.transform = 'scale(1.2)'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'none'
                            e.currentTarget.style.transform = 'scale(1)'
                          }}
                        >
                          <Instagram size={20} />
                        </button>
                      )}
                      {member.github && (
                        <button 
                          onClick={() => openExternalLink(member.github!)} 
                          style={{ 
                            background: 'none', 
                            border: 'none', 
                            color: '#FFFFFF', 
                            cursor: 'pointer',
                            padding: '8px',
                            borderRadius: '50%',
                            transition: 'all 0.2s',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(0, 255, 65, 0.1)'
                            e.currentTarget.style.transform = 'scale(1.2)'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'none'
                            e.currentTarget.style.transform = 'scale(1)'
                          }}
                        >
                          <Github size={20} />
                        </button>
                      )}
                      {!member.linkedin && !member.instagram && !member.github && (
                        <p style={{ color: '#666', fontSize: '0.8rem', margin: 0 }}>
                          📧 {member.email.split('@')[0]}
                        </p>
                      )}
                    </div> */}
                  </motion.div>
                ))}
              </div>
            </div>
          )
        })}
      </motion.section>

      {/* Sponsors Section */}
      <motion.section 
        className="section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2>Our Sponsors</h2>
        <p style={{ textAlign: 'center', marginBottom: '3rem' }}>
          Sponsored the event "Media Morphosis"
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2rem',
          alignItems: 'center',
          justifyItems: 'center'
        }}>
          {sponsors.map((sponsor, index) => (
            <motion.div
              key={index}
              style={{
                width: '180px',
                height: '100px',
                background: '#222',
                border: '1px solid #333',
                borderRadius: '8px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#666',
                fontSize: '0.9rem',
                textAlign: 'center',
                padding: '1rem',
                overflow: 'hidden'
              }}
              whileHover={{ 
                borderColor: '#FFFFFF',
                scale: 1.05
              }}
            >
              <img 
                src={sponsor.logo}
                alt={sponsor.name}
                style={{
                  maxWidth: '120px',
                  maxHeight: '60px',
                  objectFit: 'contain',
                  marginBottom: '0.5rem',
                  borderRadius: '8px'
                }}
              />
              <span style={{ fontSize: '0.8rem', color: '#999' }}>
                {sponsor.name}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section 
        className="section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        style={{ textAlign: 'center' }}
      >
        <h2>Ready to Join The Matrix?</h2>
        <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
          Become part of our creative community and start your journey into 
          the world of multimedia excellence.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button 
            className="btn"
            onClick={() => window.location.href = '/recruitment'}
          >
            Join Our Club
          </button>
          <button 
            className="btn btn-secondary"
            onClick={() => window.location.href = '/contact'}
          >
            Contact Us
          </button>
        </div>
      </motion.section>
    </div>
  )
}

export default About
