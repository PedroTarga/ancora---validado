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

## Perfis de demonstração

O sistema inclui acesso demo para:

- Gestor / Coordenador
- Professor
- Profissional de apoio / Psicólogo
- Responsável / Pais

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
- políticas de acesso e autenticação demo
- relatórios com dados anonimizados
- área de LGPD e auditoria

## Observações

Este projeto foi desenvolvido como uma aplicação estática de demonstração, voltada para apresentação de fluxo de gestão escolar e prototipagem de interface.

## Licença

Este projeto está disponível para uso acadêmico e demonstrativo.
