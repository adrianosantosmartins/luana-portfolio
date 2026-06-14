# Curso Livre de Design de Sobrancelhas - Luana Santos

## Objetivo

Criar um site responsivo, em portugues, para alunos assistirem aulas pelo YouTube, fazerem uma prova online e emitirem um certificado pago quando atingirem a nota minima.

## Modelo escolhido

Modelo 2: site profissional com identificacao do aluno, prova vinculada ao cadastro, pagamento e certificado individual.

## Jornada do aluno

1. O aluno acessa a pagina do curso.
2. Informa nome e e-mail.
3. Assiste as aulas incorporadas do YouTube.
4. Entra na guia da prova e responde 10 questoes objetivas, uma por vez.
5. Se acertar 7 ou mais questoes, fica aprovado.
6. O site libera a emissao do certificado por R$ 29,90.
7. Apos pagamento confirmado, o certificado fica disponivel com codigo unico.
8. O aluno pode baixar o certificado em PDF.

## Regras de negocio

- A prova tem 10 questoes.
- A nota minima de aprovacao e 7 acertos.
- O certificado so deve ser liberado para alunos aprovados.
- O certificado custa R$ 29,90.
- O certificado deve conter nome do aluno, CPF, nome do curso, instrutora, carga horaria, data, nota e codigo de validacao.
- A carga horaria definida no modelo atual e 20 horas.

## Ferramentas recomendadas

### Frontend

- React
- Vite
- CSS responsivo puro
- Lucide React para icones

Essas ferramentas ja estao no projeto atual e permitem evoluir rapidamente sem trocar a base do portfolio.

### Backend

Recomendacao: Supabase.

Motivos:

- Autenticacao de alunos.
- Banco de dados PostgreSQL.
- Armazenamento de dados da prova.
- Funcoes serverless para regras sensiveis.
- Boa evolucao futura para painel administrativo.

### Pagamento

Recomendacao: Mercado Pago Checkout Pro.

Motivos:

- Melhor aderencia ao publico brasileiro.
- Aceita Pix, cartao e boleto.
- Redireciona o aluno para um ambiente seguro.
- Permite confirmar pagamento por webhook.

### Certificado

Opcoes recomendadas:

- Gerar PDF no backend com pdf-lib.
- Salvar o certificado no Supabase Storage.
- Criar uma pagina publica de validacao por codigo.

## Estrutura tecnica sugerida

### Tabelas no banco

#### students

- id
- name
- email
- cpf
- created_at

#### quiz_attempts

- id
- student_id
- score
- answers
- approved
- created_at

#### payments

- id
- student_id
- quiz_attempt_id
- provider
- provider_payment_id
- status
- amount
- created_at

#### certificates

- id
- student_id
- quiz_attempt_id
- payment_id
- code
- course_name
- workload
- issued_at
- pdf_url

## Status atual do prototipo

Ja existe uma primeira versao visual e funcional no frontend com:

- Pagina do curso em portugues.
- Layout responsivo para celular.
- Area de aulas com video incorporado.
- Formulario de nome e e-mail.
- Prova com 10 questoes.
- Prova em guia separada, exibindo uma questao por vez.
- Calculo automatico da nota.
- Liberacao visual para aprovados com 7 ou mais acertos.
- Simulacao de pagamento de R$ 29,90.
- Previa do certificado em modelo horizontal dourado, com CPF, carga de 20 horas e codigo unico.
- Data de conclusao preenchida automaticamente.
- Botao de download do certificado em PDF apos pagamento confirmado.

## Proximas etapas

1. Definir a carga horaria oficial do curso.
2. Trocar os links de exemplo pelos videos reais do YouTube.
3. Revisar e aprovar as 10 questoes da prova.
4. Criar projeto no Supabase.
5. Implementar cadastro/login real.
6. Salvar tentativas da prova no banco.
7. Integrar Mercado Pago Checkout Pro.
8. Criar webhook de confirmacao de pagamento.
9. Gerar certificado em PDF.
10. Criar pagina publica de validacao do certificado.
