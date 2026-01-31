import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/terms-of-service/')({
  component: TermsOfService,
})

function TermsOfService() {
  return (
    <main style={{ maxWidth: 900, margin: "40px auto", padding: "0 20px" }}>
      <h1>Termos de Serviço</h1>

      <p>
        Ao utilizar esta aplicação, o utilizador concorda com os presentes
        Termos de Serviço.
      </p>

      <h2>1. Uso do serviço</h2>
      <p>
        O serviço destina-se à comunicação via WhatsApp para fins de atendimento
        e prestação de serviços.
      </p>

      <h2>2. Responsabilidades do utilizador</h2>
      <ul>
        <li>Utilizar o serviço de forma legal e responsável</li>
        <li>Não usar o serviço para atividades ilícitas</li>
      </ul>

      <h2>3. Limitação de responsabilidade</h2>
      <p>
        Não nos responsabilizamos por indisponibilidades temporárias do serviço.
      </p>

      <h2>4. Alterações</h2>
      <p>
        Os termos podem ser alterados a qualquer momento sem aviso prévio.
      </p>

      <h2>5. Contacto</h2>
      <p>📧 <strong>obededintala@gmail.com</strong></p>
    </main>
  );
}
