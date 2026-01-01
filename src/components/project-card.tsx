import { ExternalLink, Github } from 'lucide-react'

interface ProjectCardProps {
  name: string
  description: string
  technology?: string | string[]
  githubUrl?: string
  liveUrl?: string
  image?: string
}

export default function ProjectCard({
  name,
  description,
  technology,
  githubUrl,
  liveUrl,
  image,
}: ProjectCardProps) {
  const technologies = Array.isArray(technology) ? technology : [technology]

  return (
    <div
      className="relative h-full overflow-hidden rounded-lg border border-border shadow-sm transition-all duration-300 hover:shadow-md"
      style={{
        backgroundColor: '#09090B', // fundo escuro
        backgroundImage: "url('/github.png')", // sua imagem GitHub
        backgroundSize: '20%', // tamanho menor da imagem
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        opacity: 1, // fundo sempre visível
      }}
    >
      {/* Imagem do projeto */}
      {image && (
        <div className="relative h-44 w-full flex items-center justify-center">
          <img src={image || '/placeholder.svg'} alt={name} className="w-60" />
        </div>
      )}

      {/* Conteúdo do card */}
      <div className="p-6 text-card-foreground">
        <div className="mb-3 flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold line-clamp-2">{name}</h3>
          <div className="flex shrink-0 gap-2">
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-card-foreground"
                aria-label="View live demo"
              >
                <ExternalLink size={18} />
              </a>
            )}
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-card-foreground"
                aria-label="View on GitHub"
              >
                <Github size={18} />
              </a>
            )}
          </div>
        </div>

        <p className="mb-4 text-sm line-clamp-3">{description}</p>

        <div className="flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="inline-block rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
