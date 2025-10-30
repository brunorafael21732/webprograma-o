# webprograma-o

Projeto: Plataforma para ONGs (entrega - Unidade de HTML5)

Este repositório contém uma implementação inicial de uma plataforma voltada para organizações do terceiro setor. A primeira entrega foca na aplicação de fundamentos de HTML5 semântico, formulários complexos e multímidia básica.

Arquivos criados:

- `index.html` — Página inicial com missão, visão e contato.
- `projetos.html` — Listagem de projetos e chamada para voluntariado/doação.
- `cadastro.html` — Formulário complexo para cadastro de voluntários/apoiadores (validação nativa e máscaras).
- `assets/css/styles.css` — Estilos mobile-first e acessíveis.
- `assets/js/masks.js` — Máscaras de entrada para CPF, telefone e CEP (formatação em tempo real; limpa antes do envio).
- `assets/js/main.js` — Peças de melhoria progressiva (ano no rodapé, handler do formulário).

Como abrir:

1. Abra `index.html` no seu navegador (duplo clique ou via Live Server).
2. Navegue para `cadastro.html` e teste o formulário. Os campos CPF, Telefone e CEP terão máscara enquanto você digita e serão validados pelo HTML5.

Notas de acessibilidade e requisitos atendidos:

- Estrutura semântica com `<header>`, `<main>`, `<section>`, `<footer>` e uso consistente de cabeçalhos.
- Formulários agrupados com `<fieldset>` e `<legend>` para organização lógica.
- Atributos `required`, `pattern`, `inputmode` e `aria-*` onde apropriado para melhorar a experiência e compatibilidade com leitores de tela.

Próximos passos sugeridos:

- Adicionar testes unitários (se aplicável) e validações server-side.
- Implementar integração de pagamentos/donativos (API segura) e painel administrativo.
- Melhorar design e incluir imagens responsivas e otimizações de desempenho.
