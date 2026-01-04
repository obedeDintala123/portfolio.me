import { createFileRoute } from '@tanstack/react-router'
import {
  ArrowUp,
  ArrowUpRight,
  ChevronRight,
  Circle,
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Menu,
} from 'lucide-react'

import {
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiWhatsapp,
} from 'react-icons/si'

import { Button } from '@/components/ui/button'

import Squares from '@/components/Squares'
import TextType from '@/components/TextType'
import ChromaGrid from '@/components/ChromaGrid'
import LogoLoop from '@/components/LogoLoop'
import { useRepos } from '@/api/requests'

import ProjectCard, { ProjectCardSkeleton } from '@/components/project-card'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const { data: repos, isLoading } = useRepos()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const techLogos = [
    { node: <SiReact />, title: 'React', href: 'https://react.dev' },
    { node: <SiNextdotjs />, title: 'Next.js', href: 'https://nextjs.org' },
    {
      node: <SiTypescript />,
      title: 'TypeScript',
      href: 'https://www.typescriptlang.org',
    },
    {
      node: <SiTailwindcss />,
      title: 'Tailwind CSS',
      href: 'https://tailwindcss.com',
    },
  ]

  const items = [
    {
      image: '/me.jpeg',
      title: 'Obede Dintala',
      subtitle: 'Web Developer',
      handle: '@obede',
      borderColor: '#7ECC32',
      gradient: 'linear-gradient(180deg, #7ECC32, #000)',
      url: 'https://linkedin.com/in/obede-dintala-a14689366',
    },
  ]

  const seletectedRepos = [
    'produTech',
    'yummy-restaurant',
    'yummy-api',
'tasking-front',
    'task-manager-api',
    'AngoMart',
    'Healthmap',
   
  ]

  const filtredRepos = repos?.filter((repo) =>
    seletectedRepos.includes(repo.name),
  )

  return (
    <div>
      <section id='home' className="w-full h-[100dvh] relative overflow-hidden border-b-2">
        <header className="w-[90%] md:w-[60%] lg:w-1/2 rounded-full px-8 py-4 backdrop-blur-lg bg-white/5 border border-white/10 fixed top-10 left-6 md:left-1/4 z-50 flex justify-between items-center">
          <h1 className="text-xl">Dev</h1>

          <nav className="hidden md:flex space-x-8">
            <a href="">Home</a>
            <a href="#projects">Projects</a>
            <a href="#about">About</a>
          </nav>
          <Button
            onClick={() => {
              const contactSection = document.getElementById('contact')
              contactSection?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="hidden md:flex rounded-full px-6"
          >
            Contact
          </Button>

          <Menu className="md:hidden" />
        </header>

        <Squares
          speed={0.5}
          squareSize={60}
          direction="none"
          borderColor="#f0f0f0"
          hoverFillColor="#222"
        />

        <div className="w-[90%] md:w-1/2 lg:w-1/3 absolute top-36 md:top-1/3 left-6 md:left-20">
          <TextType
            text={[
              'Creating amazing digital experiences',
              'Turning ideas into code',
            ]}
            className="text-4xl md:text-6xl md:leading-18 font-medium"
            typingSpeed={80}
            pauseDuration={1500}
            showCursor={true}
            cursorCharacter="|"
            cursorClassName="text-me-primary"
            loop={false}
          />
        </div>

        <div className="w-[90%] md:w-1/4 absolute top-64 md:top-[60%] left-6 md:left-20 space-y-2">
          <h1 className="uppercase  text-6xl md:text-8xl font-normal">
            I am Obede
          </h1>
          <div className="w-full lg:w-1/2 backdrop-blur-lg bg-white/5 border border-white/10 p-2 rounded-full flex items-center justify-center gap-2">
            <Circle fill="#7ECC32" className="size-4 text-[#7ECC32]" />
            <span>Web Developer</span>
          </div>
        </div>

        <div className="hidden md:block w-full h-auto absolute top-1/2 md:top-48 lg:top-10 left-0 md:left-1/2">
          <video
            src="/robot.webm"
            autoPlay
            muted
            loop
            playsInline
            disablePictureInPicture
            className="md:w-1/2 pointer-events-none"
          />
        </div>
      </section>

      <section
        id="about"
        className="md:px-24 min-h-screen flex justify-center items-center"
      >
        <article className="grid lg:grid-cols-[400px_1fr] gap-10 p-4 md:p-0">
          <div className="h-[400px] relative">
            <ChromaGrid
              items={items}
              radius={300}
              damping={0.45}
              fadeOut={0.6}
              ease="power3.out"
              className="justify-start"
            />
          </div>

          <div className="mt-0 md:mt-64 lg:mt-10 flex flex-col gap-10">
            <h1 className="text-5xl">About Me</h1>
            <span className="leading-8">
              I am a programmer passionate about creating solutions through
              code. I enjoy transforming ideas into functional applications,
              focusing on organization, logic, and software quality. I am
              interested in developing complete projects, following the entire
              development process from planning to implementation. I see
              programming as a way to solve problems practically and
              efficiently. I am dedicated, curious, and always evolving as a
              programmer, seeking to improve my skills, learn new approaches,
              and write increasingly better code. My goal is to grow
              professionally in the programming field and contribute to projects
              that generate value through software development.
            </span>

            <Button
              onClick={() => {
                const contacSection = document.getElementById('contact')
                contacSection?.scrollIntoView({ behavior: 'smooth' })
              }}
              className=" bg-white hover:bg-white cursor-pointer rounded-full md:w-1/4 py-6 px-2 flex items-center justify-between"
            >
              <div className="px-2">
                <span>Let's talk</span>
              </div>
              <div className="bg-me-primary p-3 rounded-full">
                <ArrowUpRight />
              </div>
            </Button>
          </div>
        </article>
      </section>

      <section className="px-4 md:px-24 min-h-[70vh] flex flex-col justify-center border-b ">
        <h1 className="text-5xl mb-4">My Skills</h1>

        <article className="flex flex-col gap-10">
          <div className="md:w-1/2">
            <span className="text-base md:text-xl">
              Key technologies that I master and use in the development of web
              and mobile applications.
            </span>
          </div>
          <div>
            <LogoLoop
              logos={techLogos}
              speed={50}
              direction="left"
              logoHeight={48}
              gap={40}
              hoverSpeed={0}
              scaleOnHover
              fadeOut
              fadeOutColor=""
              ariaLabel="Technology partners"
            />
          </div>
        </article>
      </section>

      <section
        id="projects"
        className="px-4 md:px-24 min-h-screen flex flex-col justify-center"
      >
        <h1 className="text-5xl mt-8">My Projects</h1>
        <article className="mt-12">
          <div className="grid md:grid-cols-4 gap-4">
            {isLoading
              ? Array.from({ length: 8 }).map((_, i) => (
                  <ProjectCardSkeleton key={i} />
                ))
              : filtredRepos?.map((item) => (
                  <ProjectCard
                    key={item.id}
                    name={item.name}
                    description={item.description}
                    githubUrl={item.html_url}
                    liveUrl={item.homepage}
                    technology={item.language}
                  />
                ))}
          </div>

          <div className="flex items-center justify-center mt-10">
            <Button className="rounded-full cursor-pointer">
              Show More <ChevronRight />
            </Button>
          </div>
        </article>
      </section>

      <section
        id="contact"
        className="min-h-screen flex items-center justify-center p-8 md:p-16"
      >
        <div className="w-full max-w-7xl space-y-24">
          {/* Header section */}
          <div className="flex items-center justify-between">
            <div className=" text-lg flex items-center gap-1">
              <span className="w-5 h-5 border-2 border-white rounded-full flex items-center justify-center text-xs">
                ©
              </span>
              <span>2025</span>
            </div>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-4 group"
            >
              <span className=" font-medium tracking-wide">BACK TO TOP</span>
              <div className="w-12 h-12 bg-white  rounded-full flex items-center justify-center transition-colors">
                <ArrowUp className="w-5 h-5 text-[#09090b]" />
              </div>
            </button>
          </div>

          {/* Main content */}
          <div className="space-y-8">
            <div>
              <h2 className=" text-xl md:text-2xl font-light mb-4 tracking-wide">
                HAVE A PROJECT IN MIND?
              </h2>
              <h1 className=" text-7xl md:text-9xl font-bold tracking-tight">
                LET'S TALK
              </h1>
            </div>

            {/* Social buttons and credits */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div className="flex items-center gap-4">
                {[
                  {
                    icon: Facebook,
                    url: 'https://www.facebook.com/obed.dintala',
                  },
                  {
                    icon: Instagram,
                    url: 'https://www.instagram.com/moreira_dintala',
                  },
                  {
                    icon: Github,
                    url: 'https://github.com/obedeDintala123',
                  },
                  {
                    icon: Linkedin,
                    url: 'www.linkedin.com/in/obede-dintala-a14689366',
                  },
                  {
                    icon: SiWhatsapp,
                    width: true,
                    url: 'https://wa.me/244957532320?text=Hello%20Obede',
                  },
                ].map((item) => (
                  <a href={item.url} target="_blank" rel="noreferrer">
                    <item.icon className={`${item.width ? 'size-6' : ''}`} />
                  </a>
                ))}
              </div>

              <div className="text-right text-sm space-y-1">
                <p>
                  Development by{' '}
                  <span className="font-semibold">Obede Dintala</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
