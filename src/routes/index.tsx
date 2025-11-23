import { createFileRoute } from '@tanstack/react-router'
import { Circle, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Squares from '@/components/Squares'
import TextType from '@/components/TextType'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div>
      <section className="w-full h-[100dvh] relative overflow-hidden">
        <header className="w-[90%] md:w-[60%] lg:w-1/2 rounded-full px-8 py-4 backdrop-blur-lg bg-white/5 border border-white/10 fixed top-10 left-6 md:left-1/4 z-50 flex justify-between items-center">
          <h1 className="text-xl">Dev</h1>

          <nav className="hidden md:flex space-x-8">
            <a href="">Home</a>
            <a href="">Projects</a>
            <a href="">About</a>
          </nav>

          <Button className="hidden md:flex rounded-full px-6">Contact</Button>
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
            cursorClassName="text-[#7ECC32]"
            loop={false}
          />
        </div>

        <div className="w-[90%] md:w-1/4 absolute top-64 md:top-[60%] left-6 md:left-20 space-y-2">
          <h1 className="uppercase  text-6xl md:text-8xl font-normal">
            I am Obede
          </h1>
          <div className="w-[60%] md:w-full lg:w-1/2 backdrop-blur-lg bg-white/5 border border-white/10 p-2 rounded-full flex items-center justify-center gap-2">
            <Circle fill="#7ECC32" className="size-4 text-[#7ECC32]" />
            <span>Software Developer</span>
          </div>
        </div>

        <div className="w-full h-auto absolute top-1/2 md:top-48 lg:top-10 left-0 md:left-1/2">
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
    </div>
  )
}
