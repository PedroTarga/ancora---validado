# Âncora

Sistema de monitoramento escolar para gestão acadêmica, acompanhamento de alunos, alertas de risco, encaminhamentos e relatórios institucionais.

## Visão geral

O Âncora é uma interface web em HTML, CSS e JavaScript para apoiar coordenadores, professores e responsáveis no acompanhamento do desempenho escolar. O sistema contempla:

- dashboard com visão geral da escola
- cadastro e gestão de alunos
- gestão de professores e turmas
- registro de frequência
- lançamento de avaliações e observações
- central de alertas e riscos
- encaminhamentos e planos de ação
- geração de relatórios e área de conformidade LGPD

## Tecnologias

- HTML5
- CSS3
- JavaScript
- Chart.js
- Fonte Google Fonts

## Estrutura do projeto

```text
ancora---validado/
├── index.html
├── script.js
├── assets/
│   └── css/
│       └── styles.css
├── README.md
└── .gitignore
```

## Como executar

### Opção 1: abrir direto no navegador

1. Abra o arquivo `index.html` no navegador.
2. Faça login com um dos perfis demo disponíveis.

### Opção 2: servidor local simples

Se preferir rodar em um servidor local, você pode usar qualquer um dos comandos abaixo:

```bash
python -m http.server 8000
```

ou

```bash
npx serve .
```

Depois acesse:

```text
http://localhost:8000
```

## Publicação no GitHub Pages

O projeto é publicado automaticamente no GitHub Pages quando há um push para a branch `main`, usando o workflow em `.github/workflows/pages.yml`.

Após a conclusão do workflow, acesse:

```text
https://pedrotarga.github.io/ancora---validado/
```

O site é estático e não requer etapa de compilação. Se a publicação não iniciar automaticamente, em **Settings → Pages**, defina **Build and deployment → Source** como **GitHub Actions**.

## Perfis de demonstração

O sistema inclui acesso demo para:

- Gestor / Coordenador
- Professor
- Profissional de apoio / Psicólogo
- Responsável / Pais

Os perfis são personas de demonstração: escolher um perfil ou aluno não autentica uma pessoa nem comprova vínculo familiar. As verificações de acesso são executadas no navegador e podem ser alteradas por quem controla a página. Os dados estão incluídos no JavaScript do cliente; portanto, não insira dados reais, pessoais ou sensíveis.

No fluxo demonstrativo, a persona de responsável fica vinculada a um único aluno fictício e pode consultar somente as avaliações e a frequência dele; não pode escolher outro aluno, lançar notas, criar observações, abrir o perfil detalhado ou consultar outros módulos. Professores ficam limitados às turmas atribuídas no exemplo.

Este projeto não implementa autenticação, autorização confiável, criptografia, auditoria ou persistência em servidor. Antes de qualquer uso real, esses controles precisam ser implementados no backend: autenticar a conta, obter vínculos aluno-responsável de fonte confiável, aplicar autorização e escopo em cada consulta e gravação, proteger dados sensíveis e registrar auditoria. Ocultar botões ou rotas no cliente não constitui uma barreira de segurança.

## Funcionalidades principais

### Dashboard
- indicadores gerais de saúde escolar
- gráficos de desempenho e risco
- ranking por turma

### Gestão acadêmica
- cadastro e busca de alunos
- visualização de dados por turma e risco
- acompanhamento de frequência e médias

### Intervenções
- alertas críticos e moderados
- encaminhamentos para apoio especializado
- planos de ação individual

### Segurança e conformidade
- demonstração visual de políticas de acesso por perfil
- área informativa sobre os requisitos de segurança e LGPD

## Observações

Este projeto foi desenvolvido como uma aplicação estática de demonstração, voltada para apresentação de fluxo de gestão escolar e prototipagem de interface.

## Licença

Este projeto está disponível para uso acadêmico e demonstrativo.
