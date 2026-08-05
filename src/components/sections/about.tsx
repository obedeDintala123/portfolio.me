import { cn } from "@/lib/utils"

const DEFAULT_PARAGRAPHS = [
  "I'm a Frontend Developer from Angola passionate about creating modern, responsive and user-friendly web applications.",
  "I enjoy turning ideas into polished digital products while continuously improving my knowledge of software architecture and backend development.",
]

export default function AboutSection({
  ...props
}: React.ComponentPropsWithRef<"section">) {
  return (
    <section
      {...props}
      className={cn(
        "bg-background1 flex h-screen flex-col items-center justify-center",
        props.className
      )}

    >
      <h1 className="text-[clamp(3rem,12vw,10rem)] font-bold text-background2">
        About Me
      </h1>

      <div className="flex w-full max-w-3xl flex-col gap-6">
        {DEFAULT_PARAGRAPHS.map((text, i) => (
          <p key={i} className="text-center text-xl text-background2">
            {text}
          </p>
        ))}
      </div>
    </section>
  )
}