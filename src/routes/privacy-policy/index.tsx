import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/privacy-policy/')({
  component: PrivacyPolicy,
})

function PrivacyPolicy() {
  return (
    <main style={{ maxWidth: 900, margin: "40px auto", padding: "0 20px" }}>
      <h1>Política de Privacidade</h1>

      <p>
        Esta Política de Privacidade descreve como as informações dos utilizadores
        são coletadas, usadas e protegidas ao utilizar esta aplicação.
      </p>

      <h2>1. Informações coletadas</h2>
      <p>
        Podemos coletar informações como nome, número de telefone e mensagens
        enviadas através do WhatsApp, utilizando a API oficial do WhatsApp Business
        fornecida pela Meta Platforms, Inc.
      </p>

      <h2>2. Uso das informações</h2>
      <ul>
        <li>Comunicação entre empresa e cliente</li>
        <li>Atendimento automatizado</li>
        <li>Prestação de serviços solicitados pelo utilizador</li>
      </ul>

      <h2>3. Compartilhamento de dados</h2>
      <p>
        Não vendemos, alugamos ou compartilhamos dados pessoais a terceiros,
        exceto quando exigido por lei.
      </p>

      <h2>4. Armazenamento e segurança</h2>
      <p>
        Os dados são armazenados apenas pelo tempo necessário para o funcionamento
        do serviço.
      </p>

      <h2>5. Contacto</h2>
      <p>📧 <strong>obededintala@gmail.com</strong></p>
    </main>
  );
}