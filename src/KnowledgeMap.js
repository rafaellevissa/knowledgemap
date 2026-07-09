import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const graphData = {
  nodes: [
    // 1. Matemática Discreta
    {
      id: "matematica_discreta",
      label: "Matemática Discreta",
      group: 1,
      status: "pending",
      description:
        "A linguagem matemática dos sistemas computacionais. Une a modelagem de estruturas discretas e lógica formal (Rosen) com as técnicas analíticas e contínuas de resolução de problemas e aproximações assintóticas para algoritmos (Knuth).",
      examples: [
        "O Conceito de Estruturas Discretas",
        "Modelagem de Problemas Computacionais",
        "Transição entre o Contínuo e o Discreto",
      ],
      books: [
        "Matemática Discreta e Suas Aplicações (7ª Edição) - Kenneth H. Rosen",
        "Concrete Mathematics: A Foundation for Computer Science (2ª Edição) - Donald E. Knuth",
      ],
      practice: [
        {
          question: "O que diferencia a abordagem da Matemática 'Concreta' da Matemática Discreta pura tradicional?",
          answer:
            "A matemática discreta pura foca em estruturas separadas (lógica, conjuntos, grafos). A matemática 'Concreta' (termo que funde CONtínuo e disCRETO) usa ferramentas do cálculo e da análise matemática (como limites, derivadas e equações de diferenças) para resolver problemas puramente discretos de contagem e análise de algoritmos, eliminando a barreira entre o discreto e o contínuo.",
        },
      ],
      links: [],
    },
    {
      id: "logica_proposicional_e_quantificadores",
      label: "Lógica Proposicional e Quantificadores",
      group: 1,
      status: "pending",
      description:
        "O estudo das regras do raciocínio matemático, sentenças declarativas e quantificadores. É a base da lógica booleana e de predicados que dita a verificação de sistemas, inferência em IA clássica e o design de circuitos digitais.",
      examples: [
        "Tabelas-Verdade e Equivalências Lógicas",
        "Lógica de Predicados e Quantificadores (Universal e Existencial)",
        "Regras de Inferência e Validação de Argumentos",
      ],
      books: ["Matemática Discreta e Suas Aplicações (7ª Edição) - Kenneth H. Rosen"],
      practice: [
        {
          question:
            "Na lógica proposicional, o que acontece com a validade de uma proposição composta por 'P AND Q' se apenas a proposição P for verdadeira?",
          answer:
            "A proposição composta inteira será Falsa. Na conjunção lógica (AND), a operação só resulta in Verdadeiro se, e somente se, todas as premissas de entrada (P e Q) forem verdadeiras ao mesmo tempo.",
        },
      ],
      links: [],
    },
    {
      id: "metodos_de_provacao",
      label: "Métodos de Provação",
      group: 1,
      status: "pending",
      description:
        "As ferramentas formais para construir argumentos matemáticos válidos. Ensina a demonstrar teoremas por vias diretas ou indiretas, fundamentando a especificação formal e garantindo que programas atendam aos seus requisitos de design.",
      examples: [
        "Provas Diretas e por Contraposição",
        "Prova por Contradição (Reductio ad Absurdum)",
        "Provas por Construção e Contraexemplos",
      ],
      books: ["Matemática Discreta e Suas Aplicações (7ª Edição) - Kenneth H. Rosen"],
      practice: [
        {
          question: "Como funciona uma prova por contradição (Reductio ad absurdum)?",
          answer:
            "Para provar que uma afirmação P é verdadeira por contradição, assumimos inicialmente que ela é falsa (¬P é verdadeira). A partir dessa premissa, usamos deduções lógicas corretas até chegar a um resultado matematicamente impossível ou contraditório (como 0 = 1). Isso prova que a suposição de que P era falsa está errada, logo P deve ser verdadeira.",
        },
      ],
      links: [],
    },
    {
      id: "teoria_dos_conjuntos",
      label: "Teoria dos Conjuntos",
      group: 1,
      status: "pending",
      description:
        "A fundação abstrata para agrupar e organizar dados. Define as operações de coleções elementares, álgebra de conjuntos e identidades lógicas que sustentam os tipos de dados abstratos e o modelo relacional de bancos de dados.",
      examples: [
        "Operações de União, Interseção e Diferença",
        "Conjunto das Partes (Power Set) e Cardinalidade",
        "Leis de De Morgan aplicadas a Conjuntos",
      ],
      books: ["Matemática Discreta e Suas Aplicações (7ª Edição) - Kenneth H. Rosen"],
      practice: [
        {
          question:
            "Como a operação de Interseção de Conjuntos (A ∩ B) é utilizada na prática in buscas de Banco de Dados?",
          answer:
            "Quando você faz uma busca pedindo 'Mostre os clientes de SP (Conjunto A) AND com mais de 30 anos (Conjunto B)', o sistema realiza uma Interseção matemática, devolvendo apenas os elementos que existem simultaneamente dentro dos dois conjuntos.",
        },
      ],
      links: [],
    },
    {
      id: "funcoes_sequencias_e_somatorios",
      label: "Funções, Sequências e Somatórios",
      group: 1,
      status: "pending",
      description:
        "Estuda o mapeamento de dados e o comportamento de progressões. Incorpora o tratamento intensivo do livro do Knuth sobre manipulação algorítmica de somatórios, notações de delimitadores de strings e o uso rigoroso das funções Piso (Floor) e Teto (Ceiling).",
      examples: [
        "Funções Injetoras, Sobrejetoras e Inversas",
        "Manipulação de Somatórios e Notação Sigma (Perturbation Method)",
        "Funções Piso (Floor) e Teto (Ceiling) e suas propriedades",
      ],
      books: [
        "Matemática Discreta e Suas Aplicações (7ª Edição) - Kenneth H. Rosen",
        "Concrete Mathematics: A Foundation for Computer Science (2ª Edição) - Donald E. Knuth",
      ],
      practice: [
        {
          question:
            "Como a manipulação de somatórios pelo 'Método da Perturbação' de Knuth ajuda a analisar laços de repetição na programação?",
          answer:
            "O método consiste in isolar o primeiro ou o último termo de um somatório (S_n + a_{n+1}) para reescrevê-lo in função de si mesmo. Isso gera uma equação algébrica fechada que elimina o laço de somatório, permitindo calcular o número exato de operações que um loop executará sem precisar simular o loop passo a passo.",
        },
      ],
      links: [],
    },
    {
      id: "inducao_matematica_e_recursao",
      label: "Indução Matemática e Recursão",
      group: 1,
      status: "pending",
      description:
        "O motor matemático de validação em computação. Mostra como provar propriedades sobre estruturas infinitas discretas, ligando-se intimamente com as definições recursivas de algoritmos, invariantes de laço e indução estrutural.",
      examples: [
        "Princípio da Indução Matemática (Fraca e Forte)",
        "Definições e Estruturas Recursivas",
        "Provas de Invariantes de Algoritmos",
      ],
      books: [
        "Matemática Discreta e Suas Aplicações (7ª Edição) - Kenneth H. Rosen",
        "Concrete Mathematics: A Foundation for Computer Science (2ª Edição) - Donald E. Knuth",
      ],
      practice: [
        {
          question:
            "Por que o Princípio da Indução Matemática é considerado tão vital para engenheiros de software ao validar algoritmos?",
          answer:
            "A indução prova que se uma propriedade vale para um caso base inicial e se mantém de um passo para o próximo, ela vale para o infinito discreto. Isso é exatamente como funcionam os laços de repetição (loops) e funções recursivas no código: se você prova a invariante do laço por indução, garante que o programa funciona para qualquer volume de dados.",
        },
      ],
      links: [],
    },
    {
      id: "analise_combinatoria_e_coeficientes_binomiais",
      label: "Análise Combinatória e Coeficientes Binomiais",
      group: 1,
      status: "pending",
      description:
        "A ciência de contar estruturas sem listá-las. Expande os conceitos fundamentais do Rosen (permutações e pombos) com o arsenal avançado de Knuth sobre identidades hipergeométricas, inversão de coeficientes binomiais e os Números de Stirling.",
      examples: [
        "Princípios do Produto, Soma e Inclusão-Exclusão",
        "Coeficientes Binomiais e Triângulo de Pascal Avançado",
        "Números de Stirling (Partições de Conjuntos e Permutações)",
      ],
      books: [
        "Matemática Discreta e Suas Aplicações (7ª Edição) - Kenneth H. Rosen",
        "Concrete Mathematics: A Foundation for Computer Science (2ª Edição) - Donald E. Knuth",
      ],
      practice: [
        {
          question:
            "O que dita o Princípio da Casa dos Pombos e por que ele prova a existência de 'Colisões de Hash' na computação?",
          answer:
            "O princípio diz que se você tiver 10 pombos e apenas 9 casas, obrigatoriamente uma casa terá mais de 1 pombo. Na computação, se você tem infinitas senhas (pombos) e um algoritmo de criptografia que gera chaves de tamanho limitado (casas), matematicamente duas senhas diferentes gerarão a mesma chave (colisão).",
        },
      ],
      links: [],
    },
    {
      id: "probabilidade_discreta_e_valores_esperados",
      label: "Probabilidade Discreta e Valores Esperados",
      group: 1,
      status: "pending",
      description:
        "Mapeia a incerteza em universos discretos. Combina a visão estatística do Rosen (Bayes e distribuições) com o foco de Knuth em Funções Geradoras de Probabilidade para destrinchar o tempo médio exato de execução de algoritmos aleatórios.",
      examples: [
        "Probabilidade Condicional e o Teorema de Bayes",
        "Variáveis Aleatórias, Valor Esperado e Variância",
        "Funções Geradoras de Probabilidade (Deviations)",
      ],
      books: [
        "Matemática Discreta e Suas Aplicações (7ª Edição) - Kenneth H. Rosen",
        "Concrete Mathematics: A Foundation for Computer Science (2ª Edição) - Donald E. Knuth",
      ],
      practice: [
        {
          question: "Como o conceito de Valor Esperado E(X) é usado para medir o desempenho de algoritmos de busca?",
          answer:
            "O valor esperado calcula a média ponderada dos custos de todas as execuções possíveis de um programa. Em algoritmos como o QuickSort, embora o pior caso seja O(n²), o cálculo do Valor Esperado prova matematicamente que o algoritmo performará em tempo médio O(n log n) na esmagadora maioria das vezes, justificando o seu uso industrial.",
        },
      ],
      links: [],
    },
    {
      id: "relacoes_e_estruturas_de_ordem",
      label: "Relações e Estruturas de Ordem",
      group: 1,
      status: "pending",
      description:
        "O estudo de como elementos se associam de forma emparelhada. Garante a fundamentação matemática formal de restrições em bancos de dados relacionais, fechos computacionais (como grafos de dependências de código) e conjuntos parcialmente ordenados.",
      examples: [
        "Propriedades de Relações (Reflexividade, Simetria, Transitividade)",
        "Fechos Transitivos (Algoritmo de Warshall) e Equivalências",
        "Conjuntos Parcialmente Ordenados (Posets) e Diagramas de Hasse",
      ],
      books: ["Matemática Discreta e Suas Aplicações (7ª Edição) - Kenneth H. Rosen"],
      practice: [
        {
          question:
            "Por que o conceito matemático de 'Relação de Ordem Parcial' é fundamental para gerenciar tarefas e compilação de código?",
          answer:
            "Uma relação de ordem parcial estabelece que alguns elementos devem vir antes de outros, mas não necessariamente todos precisam ser comparáveis. Na computação, isso descreve árvores de dependência de pacotes ou tarefas paralelas: o sistema usa essa propriedade para executar algoritmos de Ordenação Topológica, decidindo o que processar primeiro sem quebrar dependências.",
        },
      ],
      links: [],
    },
    {
      id: "aritmetica_modular_e_teoria_dos_numeros",
      label: "Aritmética Modular e Teoria dos Números",
      group: 1,
      status: "pending",
      description:
        "Conhecida como 'a matemática do relógio', onde os números recomeçam do zero após atingir um limite. É o alicerce absoluto da criptografia moderna (RSA), funções de hash e geração de números pseudoaleatórios na computação.",
      examples: [
        "Operador Módulo e Congruências Lineares",
        "O Algoritmo Euclidiano (Cálculo do MDC rápido)",
        "Números Primos e Criptografia de Chave Pública",
        "Teorema Chinês do Resto",
      ],
      books: [
        "Matemática Discreta e Suas Aplicações (7ª Edição) - Kenneth H. Rosen",
        "Concrete Mathematics: A Foundation for Computer Science (2ª Edição) - Donald E. Knuth",
      ],
      practice: [
        {
          question:
            "Por que a Aritmética Modular é o núcleo dos algoritmos de Criptografia de Chave Pública, como o RSA usado no HTTPS?",
          answer:
            "Porque ela fornece 'Funções de Via Única' (One-Way Functions). Na aritmética normal, se você sabe o resultado de uma multiplicação, a divisão desfaz o processo facilmente. Na aritmética modular de números primos gigantescos, multiplicar é fácil para o processador, mas fazer a 'divisão' (encontrar o inverso modular sem a chave privada) exige um poder computacional absurdo, inviabilizando que um hacker quebre a senha.",
        },
      ],
      links: [],
    },
    // 6. Fundamentos da Eletricidade
    {
      id: "fundamentos_eletricidade",
      label: "Fundamentos da Eletricidade",
      group: 6,
      status: "pending",
      description:
        "Introdução ao estudo da eletricidade por meio de modelos simples (circuitos de parâmetros concentrados). Explica o que é a carga elétrica, como ela se comporta e as regras básicas de conservação de energia.",
      examples: [
        "Sistema Internacional de Unidades (SI)",
        "O Conceito de Circuito Elétrico Ideal",
        "Unidades de Medida Básicas da Engenharia",
        "Princípio de Conservação da Carga Elétrica",
      ],
      books: [
        "Fundamentos de Circuitos Elétricos - Charles K. Alexander & Matthew N. O. Sadiku",
        "Circuitos Elétricos - James W. Nilsson & Susan A. Riedel",
      ],
      practice: [
        {
          question:
            "O que significa, na prática, adotar a aproximação de parâmetros concentrados ao estudar um circuito elétrico?",
          answer:
            "Significa que consideramos que os componentes são tão pequenos e os sinais viajam tão rápido que qualquer mudança de tensão ou corrente acontece instantaneamente por todo o circuito, sem atrasos causados pelo comprimento dos fios.",
        },
        {
          question:
            "Se um circuito fechado e isolado passa por um rearranjo interno de suas cargas, o que acontece com o valor total da carga elétrica desse sistema?",
          answer:
            "O valor total permanece exatamente o mesmo. De acordo com a lei de conservação da carga, as cargas elétricas podem se mover ou mudar de lugar entre os componentes, mas a quantidade total dentro de um sistema isolado não pode ser criada nem destruída.",
        },
      ],
      links: [],
    },
    {
      id: "estrutura_atomica_eletron",
      label: "Estrutura Atômica e o Elétron",
      group: 6,
      status: "pending",
      description:
        "Estudo do elétron como a menor partícula de carga livre na natureza. Mostra como o movimento em massa dessas minúsculas cargas negativas através de um material condutor é o que dá origem à corrente elétrica que usamos no dia a dia.",
      examples: [
        "A Carga Elementar do Elétron",
        "Diferença entre Cargas Positivas e Negativas",
        "Comportamento dos Elétrons nos Metais",
        "Quantização da Carga Elétrica",
      ],
      books: [
        "Fundamentos de Circuitos Elétricos - Charles K. Alexander & Matthew N. O. Sadiku",
        "Circuitos Elétricos - James W. Nilsson & Susan A. Riedel",
      ],
      practice: [
        {
          question:
            "Sabendo que a carga de um único elétron é de aproximadamente -1,602 x 10⁻¹⁹ C, quantos elétrons precisam passar por um fio para que se tenha uma carga total de -1 Coulomb?",
          answer:
            "Usamos a fórmula q = n · e. Isolando o número de elétrons (n):\nn = 1 C / (1,602 x 10⁻¹⁹ C/elétron) ≈ 6,24 x 10¹⁸ elétrons (mais de 6 bilhões de bilhões de elétrons).",
        },
      ],
      links: [],
    },
    {
      id: "tensao_eletrica",
      label: "Tensão Elétrica",
      group: 6,
      status: "pending",
      description:
        "Explica a tensão elétrica (ou diferença de potencial) como a energia ou 'pressão' necessária para empurrar uma carga elétrica através de um componente. É o trabalho feito por unidade de carga para fazê-la se mover entre dois pontos.",
      examples: [
        "Conceito de Diferença de Potencial (DDP)",
        "A Unidade de Medida Volt (V)",
        "Polaridades de Referência (Positivo e Negativo)",
        "Relação entre Tensão, Energia e Carga",
      ],
      books: [
        "Fundamentos de Circuitos Elétricos - Charles K. Alexander & Matthew N. O. Sadiku",
        "Circuitos Elétricos - James W. Nilsson & Susan A. Riedel",
      ],
      practice: [
        {
          question:
            "Para fazer uma carga de 2 Coulombs passar por um elemento de circuito, uma bateria gasta 24 Joules de energia. Qual é a tensão elétrica entre os terminais desse elemento?",
          answer:
            "A tensão (V) é a quantidade de energia gasta (W) dividida pela carga que se moveu (q). Portanto:\nV = W / q = 24 J / 2 C = 12 Volts (V).",
        },
      ],
      links: [],
    },
    {
      id: "corrente_eletrica",
      label: "Corrente Elétrica",
      group: 6,
      status: "pending",
      description:
        "Estuda a corrente elétrica como a velocidade do fluxo de carga que passa por um ponto do circuito. Mede quanta carga atravessa um condutor a cada segundo, diferenciando a corrente contínua (CC) da corrente alternada (CA).",
      examples: [
        "A Unidade de Medida Ampere (A = C/s)",
        "Diferença entre Corrente Contínua (CC) e Alternada (CA)",
        "Sentido Real vs. Sentido Convencional da Corrente",
        "Cálculo de Carga Acumulada no Tempo",
      ],
      books: [
        "Fundamentos de Circuitos Elétricos - Charles K. Alexander & Matthew N. O. Sadiku",
        "Circuitos Elétricos - James W. Nilsson & Susan A. Riedel",
      ],
      practice: [
        {
          question:
            "Se uma corrente constante de 3 Amperes passa por uma trilha de circuito impresso durante 20 seconds, qual foi a quantidade total de carga que atravessou essa trilha?",
          answer:
            "Como a corrente (I) é a carga dividida pelo tempo (I = q / t), podemos achar a carga multiplicando a corrente pelo tempo:\nq = I · t = 3 A · 20 s = 60 Coulombs (C).",
        },
        {
          question:
            "A corrente que entra em uma bateria varia com o tempo segundo a equação i(t) = 6t mA. Qual a fórmula matemática para descobrir a carga q(t) acumulada a partir do tempo zero?",
          answer:
            "Para achar a carga a partir da corrente variante no tempo, fazemos a integração matemática da função corrente:\nq(t) = ∫ i(t) dt = ∫ (6t) dt = 3t² mC.",
        },
      ],
      links: [],
    },
    {
      id: "resistencia_eletrica",
      label: "Resistência Elétrica",
      group: 6,
      status: "pending",
      description: "Estuda a capacidade de um material de dificultar ou resistir à passagem da corrente elétrica.",
      examples: [
        "A Lei de Ohm (V = R · I)",
        "A Unidade de Medida Ohm (Ω)",
        "O Conceito de Condutância (G = 1/R)",
        "Gráfico de um Componente Linear",
      ],
      books: [
        "Fundamentos de Circuitos Elétricos - Charles K. Alexander & Matthew N. O. Sadiku",
        "Circuitos Elétricos - James W. Nilsson & Susan A. Riedel",
      ],
      practice: [
        {
          question:
            "Um resistor de uma placa recebe uma tensão de 12 V e deixa passar uma corrente de 4 mA. Qual é o valor da sua resistência elétrica?",
          answer:
            "Pela Lei de Ohm, V = R · I. Isolando a resistência (R) e lembrando que 4 mA é 0,004 A:\nR = V / I = 12 V / 0,004 A = 3.000 Ω (ou 3 kΩ).",
        },
      ],
      links: [],
    },
    {
      id: "resistividade",
      label: "Resistividade",
      group: 6,
      status: "pending",
      description:
        "Explica como o tamanho, o formato geométrico e o material de fabricação de um fio condutor alteram o seu valor final de resistência.",
      examples: [
        "A Segunda Lei de Ohm (R = ρ · l/A)",
        "O Conceito de Resistividade do Material (ρ)",
        "Influência do Comprimento e da Espessura do Fio",
        "Efeito do Calor na Resistência de um Condutor",
      ],
      books: [
        "Fundamentos de Circuitos Elétricos - Charles K. Alexander & Matthew N. O. Sadiku",
        "Circuitos Elétricos - James W. Nilsson & Susan A. Riedel",
      ],
      practice: [
        {
          question:
            "Se pegarmos um fio condutor de cobre e o esticarmos até que ele fique com o dobro do comprimento original, mas mantendo o mesmo material, o que acontecerá com a sua resistência?",
          answer:
            "De acordo com a Segunda Lei de Ohm, a resistência é diretamente proporcional ao comprimento do fio. Portanto, se dobrarmos o comprimento, a sua resistência elétrica também irá dobrar.",
        },
      ],
      links: [],
    },
    {
      id: "condutores_isolantes",
      label: "Condutores e Isolantes",
      group: 6,
      status: "pending",
      description:
        "Divide os materiais entre aqueles que deixam a corrente passar com muita facilidade (condutores, como o cobre) e aqueles que bloqueiam quase totalmente a corrente (isolantes ou dielétricos, como a borracha e o plástico).",
      examples: [
        "Características dos Metais Bons Condutores",
        "Função dos Dielétricos em Circuitos",
        "Modelagem de Conexões Ideais (Fios sem Perdas)",
        "Aplicação de Isolamentos em Componentes",
      ],
      books: [
        "Fundamentos de Circuitos Elétricos - Charles K. Alexander & Matthew N. O. Sadiku",
        "Circuitos Elétricos - James W. Nilsson & Susan A. Riedel",
      ],
      practice: [
        {
          question:
            "Por que nos diagramas de circuitos elétricos nós desenhamos as linhas de conexão (fios) considerando que elas não têm resistência nenhuma?",
          answer:
            "Fazemos isso porque a resistência real de pedaços curtos de fios condutores é tão pequena perto da resistência dos outros componentes que podemos tratá-los como caminhos perfeitos (curto-circuitos ideais) para facilitar os cálculos.",
        },
        {
          question: "Qual é a utilidade prática de colocar uma camada isolante de plástico em volta dos fios de cobre?",
          answer:
            "A camada isolante impede que a corrente elétrica escape do fio de cobre para o ambiente externo ou para outros fios vizinhos, evitando curtos-circuitos acidentais e choques elétricos.",
        },
      ],
      links: [],
    },
    {
      id: "potencia_eletrica",
      label: "Potência Elétrica",
      group: 6,
      status: "pending",
      description:
        "Mede a velocidade com que a energia elétrica é gerada por uma fonte ou consumida por um componente a cada segundo (P = V · I).",
      examples: [
        "Cálculo de Potência Instantânea (P = V · I)",
        "A Convenção Passiva de Sinais",
        "Identificação de Fontes (Geradores) e Cargas (Consumidores)",
        "Teorema de Conservação de Energia (Balanço de Potência)",
      ],
      books: [
        "Fundamentos de Circuitos Elétricos - Charles K. Alexander & Matthew N. O. Sadiku",
        "Circuitos Elétricos - James W. Nilsson & Susan A. Riedel",
      ],
      practice: [
        {
          question:
            "Um componente de circuito tem uma tensão de 5 V entre seus terminais. Uma corrente de -3 A entra pelo seu terminal positivo de referência. Qual a potência desse componente e ele está consumindo ou gerando energia?",
          answer:
            "Multiplicamos a tensão pela corrente: P = V · I = 5 V · (-3 A) = -15 Watts (W). Pela Convenção Passiva de Sinais, o valor negativo (-15 W) significa que o componente está fornecendo (gerando) energia para o circuito.",
        },
      ],
      links: [],
    },
    {
      id: "efeito_joule",
      label: "Efeito Joule",
      group: 6,
      status: "pending",
      description: "Explica o fenômeno onde a corrente elétrica se transforma em calor ao passar por uma resistência.",
      examples: [
        "Cálculo de Potência Dissipada por Corrente (I² · R)",
        "Cálculo de Potência Dissipada por Tensão (V²/R)",
        "Perdas de Energia em Forma de Calor",
        "Aquecimento de Linhas de Transmissão e Trilhas",
      ],
      books: [
        "Fundamentos de Circuitos Elétricos - Charles K. Alexander & Matthew N. O. Sadiku",
        "Circuitos Elétricos - James W. Nilsson & Susan A. Riedel",
      ],
      practice: [
        {
          question:
            "Um resistor de 100 Ω é percorrido por uma corrente de 20 mA. Qual a potência dissipada por ele em forma de calor?",
          answer:
            "Primeiro, convertemos a corrente para Amperes: 20 mA = 0,02 A. Usamos a fórmula P = I² · R:\nP = (0,02)² · 100 = 0,0004 · 100 = 0,04 Watts (ou 40 mW).",
        },
      ],
      links: [],
    },
    // 7. Circuitos Elétricos
    {
      id: "circuitos_eletricos",
      label: "Circuitos Elétricos",
      group: 7,
      status: "pending",
      description:
        "Estuda como conectar componentes elétricos para formar caminhos fechados que permitam a circulação controlada da corrente elétrica, usando modelos simplificados.",
      examples: [
        "Definição de Elementos Ativos e Passivos",
        "Identificação de Nós, Ramos e Malhas",
        "Diagramas e Topologias de Circuitos",
        "Condição de Loop Fechado para Corrente",
      ],
      books: [
        "Fundamentos de Circuitos Elétricos - Charles K. Alexander & Matthew N. O. Sadiku",
        "Circuitos Elétricos - James W. Nilsson & Susan A. Riedel",
      ],
      practice: [
        {
          question:
            "O que define a condição básica para que exista circulação permanente de corrente em um circuito elétrico?",
          answer:
            "É necessária a existência de pelo menos um percurso condutor completamente fechado (malha) conectado a uma fonte de energia que estabeleça uma diferença de potencial (tensão).",
        },
        {
          question:
            "Um circuito simples possui 1 nó de referência e 2 nós essenciais desconhecidos, conectados por 4 ramos. Quantas equações de corrente independentes baseadas em nós são necessárias para resolver a topologia desse sistema?",
          answer:
            "Para uma rede com N nós essenciais, precisamos de exatamente N - 1 equações de nós independentes. Como temos 3 nós no total (2 desconhecidos + 1 de referência), serão necessárias 3 - 1 = 2 equações nodais.",
        },
      ],
      links: [],
    },
    {
      id: "lei_de_ohm",
      label: "Lei de Ohm",
      group: 7,
      status: "pending",
      description:
        "Regra fundamental para componentes lineares. Mostra como calcular a relação direta entre a tensão, a corrente e a resistência em um resistor.",
      examples: [
        "Cálculo de Quedas de Tensão (V = R · I)",
        "Determinação de Corrente de Ramo (I = V / R)",
        "Cálculo de Resistência Isolada (R = V / I)",
        "Análise da Relação Linear Tensão-Corrente",
      ],
      books: [
        "Fundamentos de Circuitos Elétricos - Charles K. Alexander & Matthew N. O. Sadiku",
        "Circuitos Elétricos - James W. Nilsson & Susan A. Riedel",
      ],
      practice: [
        {
          question:
            "Quais as três formas matemáticas equivalentes obtidas a partir do enunciado clássico da Lei de Ohm?",
          answer:
            "As formas são: V = R · I, I = V / R e R = V / I, onde V é a tensão, R é a resistência e I é a corrente.",
        },
        {
          question:
            "Uma pequena lâmpada incandescente antiga opera conectada a uma fonte estável de 5 V. Um amperímetro em série registra que o filamento drena uma corrente contínua de 250 mA. Qual a resistência interna deste filamento?",
          answer:
            "Primeiro convertemos a corrente para Amperes: 250 mA = 0,25 A. Utilizando a variação da Lei de Ohm R = V / I, temos:\nR = 5 V / 0,25 A = 20 Ω.",
        },
      ],
      links: [],
    },
    {
      id: "leis_de_kirchhoff",
      label: "Leis de Kirchhoff",
      group: 7,
      status: "pending",
      description:
        "Conjunto de duas leis fundamentais usadas para resolver qualquer circuito. Elas controlam como as correntes se dividem nos nós e como as tensões se distribuem nas malhas.",
      examples: [
        "Conservação da Carga Elétrica em Nós",
        "Conservação da Energia Elétrica em Malhas",
        "Casamento das Leis de Kirchhoff com a Lei de Ohm",
        "Análise de Circuitos Multifontes",
      ],
      books: [
        "Fundamentos de Circuitos Elétricos - Charles K. Alexander & Matthew N. O. Sadiku",
        "Circuitos Elétricos - James W. Nilsson & Susan A. Riedel",
      ],
      practice: [
        {
          question:
            "O que justificam as leis de Kirchhoff na engenharia face às leis de conservação física fundamentais?",
          answer:
            "A Lei de Kirchhoff das Correntes (LKC) baseia-se no princípio da conservação da carga em um nó, enquanto a Lei de Kirchhoff das Tensões (LKT) baseia-se no princípio da conservação da energia ao longo de uma trajetória fechada.",
        },
        {
          question:
            "Em uma malha fechada contendo uma fonte ideal de 24 V e dois resistores, a queda de tensão medida sobre o primeiro resistor é de 10 V. Utilizando os conceitos de Kirchhoff, determine a queda de tensão sobre o segundo resistor.",
          answer:
            "Pela Lei de Kirchhoff das Tensões (LKT), a soma das quedas de tensão deve ser igual à soma das elevações na malha. Portanto: 24 V - 10 V - V₂ = 0 => V₂ = 24 V - 10 V = 14 V.",
        },
      ],
      links: [],
    },
    {
      id: "lei_das_malhas",
      label: "Lei das Malhas (LKT)",
      group: 7,
      status: "pending",
      description:
        "Baseada na conservação de energia. Garante que a soma de todas as tensões (ganhos e quedas) ao longo de qualquer caminho fechado de um circuito seja sempre igual a zero.",
      examples: [
        "Equacionamento de Loops Fechados",
        "Varredura de Potenciais de Malha",
        "Convenção de Sinais para Fontes e Resistores",
        "Soma Algébrica de Tensões",
      ],
      books: [
        "Fundamentos de Circuitos Elétricos - Charles K. Alexander & Matthew N. O. Sadiku",
        "Circuitos Elétricos - James W. Nilsson & Susan A. Riedel",
      ],
      practice: [
        {
          question: "Como se aplica a convenção de sinais ao percorrer uma malha para equacionar a LKT?",
          answer:
            "Ao percorrer a malha, atribui-se sinal positivo (+) para elevações de potencial (passar do terminal - para o + de uma fonte) e sinal negativo (-) para quedas de potencial (passar pelo resistor no sentido da corrente), somando tudo e igualando a zero.",
        },
        {
          question:
            "Uma malha contendo três elementos conectados em série possui uma fonte de 12 V (elevação), uma queda de tensão de 4 V no resistor R₁ e uma tensão desconhecida V_x no elemento final. Seguindo o sentido horário, determine V_x.",
          answer:
            "Aplicando a LKT e equacionando os sinais de acordo com o percurso: +12 V - 4 V - V_x = 0. Isolando a incógnita, encontramos: V_x = 8 V.",
        },
      ],
      links: [],
    },
    {
      id: "lei_dos_nos",
      label: "Lei dos Nós (LKC)",
      group: 7,
      status: "pending",
      description:
        "Baseada na conservação de carga. Garante que a soma de todas as correntes que entram em um ponto de conexão (nó) seja exatamente igual à soma das correntes que saem dele.",
      examples: [
        "Equacionamento de Correntes Convergentes",
        "Análise de Junções de Condutores",
        "Soma Algébrica de Correntes em um Ponto",
        "Distribuição de Fluxos de Corrente",
      ],
      books: [
        "Fundamentos de Circuitos Elétricos - Charles K. Alexander & Matthew N. O. Sadiku",
        "Circuitos Elétricos - James W. Nilsson & Susan A. Riedel",
      ],
      practice: [
        {
          question:
            "Qual o equacionamento formal para um nó onde convergem as correntes I₁ e I₂ e de onde divergem I₃ e I₄?",
          answer: "O equacionamento correspondente é: I₁ + I₂ = I₃ + I₄ (ou I₁ + I₂ - I₃ - I₄ = 0).",
        },
        {
          question:
            "Em um nó central de distribuição, entram duas correntes vindas de fontes distintas: I₁ = 5 A e I₂ = 3 A. Desse mesmo nó, derivam dois ramos de saída em paralelo. Se o ramo A consome I_A = 6 A, qual deve ser a intensidade da corrente I_B drenada pelo ramo B?",
          answer:
            "Utilizando a LKC (Σ I_entra = Σ I_sai): 5 A + 3 A = 6 A + I_B. Somando as entradas temos 8 A = 6 A + I_B. Isolando a variável: I_B = 8 A - 6 A = 2 A.",
        },
      ],
      links: [],
    },
    {
      id: "associacao_de_resistores",
      label: "Associação de Resistores",
      group: 7,
      status: "pending",
      description:
        "Ensina a agrupar e simplificar vários resistores espalhados pelo circuito, transformando-os em um único resistor equivalente para facilitar os cálculos.",
      examples: [
        "Conceito de Equivalência Ôhmica",
        "Simplificação de Redes de Resistores",
        "Cálculo de Carga Equivalente de Terminais",
        "Redução Sistemática de Circuitos",
      ],
      books: [
        "Fundamentos de Circuitos Elétricos - Charles K. Alexander & Matthew N. O. Sadiku",
        "Circuitos Elétricos - James W. Nilsson & Susan A. Riedel",
      ],
      practice: [
        {
          question: "O que representa o conceito de resistência equivalente de um circuito?",
          answer:
            "Representa o valor de um único resistor hipotético que pode substituir toda uma rede resistiva ligada a um par de terminais, drenando a mesma corrente total e consumindo a mesma potência que o circuito original.",
        },
        {
          question:
            "Um circuito possui uma rede formada por dois resistores associados em paralelo (R₁ = 60 Ω e R₂ = 40 Ω) que, por sua vez, está conectada diretamente em série com um terceiro resistor R₃ = 16 Ω. Qual a resistência equivalente total vista pelos terminais de entrada?",
          answer:
            "Primeiro resolvemos o paralelo interno usando produto pela soma: R_p = (60 · 40) / (60 + 40) = 2400 / 100 = 24 Ω. Agora somamos o resultado ao resistor que está em série: R_eq = R_p + R₃ = 24 Ω + 16 Ω = 40 Ω.",
        },
      ],
      links: [],
    },
    {
      id: "circuitos_em_serie",
      label: "Circuitos em Série",
      group: 7,
      status: "pending",
      description:
        "Configuração onde os componentes são ligados um após o outro em um único fio. Como só há um caminho, todos os elementos compartilham exatamente a mesma corrente elétrica.",
      examples: [
        "Soma Direta de Resistências (Req = ∑ R)",
        "Comportamento da Corrente Unilinear",
        "Distribuição de Quedas de Tensão em Série",
        "Análise de Malha Única",
      ],
      books: [
        "Fundamentos de Circuitos Elétricos - Charles K. Alexander & Matthew N. O. Sadiku",
        "Circuitos Elétricos - James W. Nilsson & Susan A. Riedel",
      ],
      practice: [
        {
          question: "Como se calcula a resistência equivalente de três resistores associados em série?",
          answer:
            "Calcula-se por meio da soma direta dos valores ôhmicos individuais de cada elemento: Req = R₁ + R₂ + R₃.",
        },
        {
          question:
            "Três resistores de valores R₁ = 100 Ω, R₂ = 250 Ω e R₃ = 150 Ω estão conectados em uma configuração série unilinear sob uma tensão de 10 V. Qual o valor da corrente que flui por R₂?",
          answer:
            "Como o circuito está em série, a resistência equivalente é a soma direta: R_eq = 100 + 250 + 150 = 500 Ω. A corrente total do circuito será dada por I = V / R_eq = 10 V / 500 Ω = 0,02 A (ou 20 mA). Como a corrente é idêntica em todos os pontos de uma malha série, a corrente em R₂ é de exatamente 20 mA.",
        },
      ],
      links: [],
    },
    {
      id: "circuitos_em_paralelo",
      label: "Circuitos em Paralelo",
      group: 7,
      status: "pending",
      description:
        "Configuração onde os componentes são conectados lado a lado nos mesmos nós comuns. Todos compartilham a mesma tensão, mas a corrente se divide entre os caminhos disponíveis.",
      examples: [
        "Cálculo pelo Inverso das Resistências (1/Req = ∑ 1/R)",
        "Regra do Produto pela Soma para Dois Resistores",
        "Comportamento da Tensão Compartilhada",
        "Divisão de Correntes em Nós em Paralelo",
      ],
      books: [
        "Fundamentos de Circuitos Elétricos - Charles K. Alexander & Matthew N. O. Sadiku",
        "Circuitos Elétricos - James W. Nilsson & Susan A. Riedel",
      ],
      practice: [
        {
          question:
            "Qual é a expressão geral para obter o inverso da resistência equivalente em resistores associados em paralelo?",
          answer:
            "A expressão é dada pela soma dos inversos de cada resistência individual: 1 / Req = 1 / R₁ + 1 / R₂ + ... + 1 / Rn.",
        },
        {
          question:
            "Dois resistores de R₁ = 20 Ω e R₂ = 30 Ω estão em paralelo conectados a uma fonte de tensão de 12 V. Qual a corrente total fornecida pela fonte?",
          answer:
            "Calculamos a resistência equivalente em paralelo usando o produto pela soma: R_eq = (20 · 30) / (20 + 30) = 600 / 50 = 12 Ω. Usando a Lei de Ohm para a malha total: I_total = V / R_eq = 12 V / 12 Ω = 1 Ampere (A).",
        },
      ],
      links: [],
    },
    {
      id: "circuitos_serie_paralelo",
      label: "Circuitos Série-Paralelo",
      group: 7,
      status: "pending",
      description:
        "Circuitos mistos que combinam trechos conectados em série e trechos em paralelo no mesmo arranjo. Exigem a redução do circuito por etapas de dentro para fora.",
      examples: [
        "Análise de Circuitos Mistos",
        "Redução por Blocos Série e Paralelo",
        "Resolução de Malhas de Atenuação",
        "Mapeamento de Tensões Locais por Etapas",
      ],
      books: [
        "Fundamentos de Circuitos Elétricos - Charles K. Alexander & Matthew N. O. Sadiku",
        "Circuitos Elétricos - James W. Nilsson & Susan A. Riedel",
      ],
      practice: [
        {
          question:
            "Qual deve ser o procedimento inicial recomendado para simplificar analiticamente um circuito misto complexo?",
          answer:
            "Deve-se localizar os agrupamentos mais internos que estejam puramente em série ou puramente em paralelo, calcular as suas resistências equivalentes locais e substituir esses blocos progressivamente até que reste apenas uma malha única simples.",
        },
        {
          question:
            "Em uma malha mista, dois resistores idênticos de 10 Ω estão em série. Esse conjunto em série está conectado em paralelo com um resistor de 20 Ω. Qual a resistência equivalente deste bloco misto?",
          answer:
            "Primeiro reduzimos o ramo em série interno: R_serie = 10 Ω + 10 Ω = 20 Ω. Agora, calculamos o paralelo desse equivalente de 20 Ω com o resistor paralelo de 20 Ω: R_eq = (20 · 20) / (20 + 20) = 400 / 40 = 10 Ω.",
        },
      ],
      links: [],
    },
    {
      id: "divisor_de_tensao",
      label: "Divisor de Tensão",
      group: 7,
      status: "pending",
      description:
        "Atalho matemático derivado da Lei de Ohm usado para calcular diretamente a queda de tensão em um resistor em série, sem precisar descobrir a corrente do circuito antes.",
      examples: [
        "Fórmula de Divisão Proporcional de Tensão",
        "Atenuação Passiva de Sinais",
        "Análise de Circuitos de Divisores Sob Carga",
        "Dimensionamento de Malhas de Referência de Tensão",
      ],
      books: [
        "Fundamentos de Circuitos Elétricos - Charles K. Alexander & Matthew N. O. Sadiku",
        "Circuitos Elétricos - James W. Nilsson & Susan A. Riedel",
      ],
      practice: [
        {
          question:
            "Qual é a fórmula matemática para obter a tensão de saída Vout sobre o resistor R₂ num divisor alimentado por Vin com resistores R₁ e R₂ em série?",
          answer: "A fórmula é Vout = Vin · [ R₂ / (R₁ + R₂) ].",
        },
        {
          question:
            "Um circuito divisor de tensão é alimentado por Vin = 15 V e possui dois resistores em série: R₁ = 1 kΩ e R₂ = 2 kΩ. Qual é o valor da tensão medida nos terminais de R₂?",
          answer:
            "Aplicando diretamente a regra do divisor de tensão para R₂: V_R2 = Vin · [ R₂ / (R₁ + R₂) ] = 15 V · [ 2000 / (1000 + 2000) ] = 15 V · [ 2000 / 3000 ] = 15 · (2/3) = 10 Volts (V).",
        },
      ],
      links: [],
    },
    {
      id: "divisor_de_corrente",
      label: "Divisor de Corrente",
      group: 7,
      status: "pending",
      description:
        "Atalho matemático usado para descobrir como uma corrente total se divide entre ramos em paralelo, calculando os valores de forma inversamente proporcional às resistências.",
      examples: [
        "Fórmula de Divisão de Corrente para Dois Ramos",
        "Derivação de Fluxos de Corrente por Condutância",
        "Dimensionamento de Resistores Shunt de Medição",
        "Distribuição de Corrente de Entrada",
      ],
      books: [
        "Fundamentos de Circuitos Elétricos - Charles K. Alexander & Matthew N. O. Sadiku",
        "Circuitos Elétricos - James W. Nilsson & Susan A. Riedel",
      ],
      practice: [
        {
          question:
            "Num arranjo paralelo de dois resistores R₁ e R₂ alimentados por uma corrente total It, qual é a equação para calcular a corrente I₁?",
          answer:
            "A equação é I₁ = It · [ R₂ / (R₁ + R₂) ], o que prova que a corrente em um ramo é proporcional à resistência do ramo oposto.",
        },
        {
          question:
            "Uma corrente de entrada total I_total = 12 A chega a um nó com dois ramos em paralelo contendo R₁ = 4 Ω e R₂ = 8 Ω. Determine a quantidade exata de corrente que passará pelo menor resistor (R₁).",
          answer:
            "Utilizando a fórmula do divisor de corrente para calcular I₁ (usando o resistor oposto R₂ no numerador): I₁ = I_total · [ R₂ / (R₁ + R₂) ] = 12 A · [ 8 / (4 + 8) ] = 12 A · [ 8 / 12 ] = 8 Amperes (A).",
        },
      ],
      links: [],
    },
    {
      id: "analise_de_circuitos",
      label: "Análise de Circuitos",
      group: 7,
      status: "pending",
      description:
        "Uso de métodos matemáticos e matriciais estruturados para calcular as tensões e correntes de todos os ramos de circuitos elétricos complexos de forma simultânea.",
      examples: [
        "Formulações Sistemáticas de Redes",
        "Montagem de Sistemas de Equações Lineares",
        "Uso de Determinantes e Regra de Cramer em Circuitos",
        "Resolução de Redes Multimalhas",
      ],
      books: [
        "Fundamentos de Circuitos Elétricos - Charles K. Alexander & Matthew N. O. Sadiku",
        "Circuitos Elétricos - James W. Nilsson & Susan A. Riedel",
      ],
      practice: [
        {
          question:
            "Qual é a principal diferença conceitual e prática entre os métodos de análise nodal e análise de malhas?",
          answer:
            "A análise nodal aplica a LKC para encontrar as tensões desconhecidas nos nós do circuito. A análise de malhas aplica a LKT para determinar as correntes fictícias que circulam pelas janelas fechadas (malhas) da rede.",
        },
        {
          question:
            "Na análise de malhas para um circuito de duas janelas independentes, obteve-se o seguinte sistema linear para as correntes de malha I₁ e I₂: [ 5I₁ - 2I₂ = 10 ] e [ -2I₁ + 4I₂ = 0 ]. Determine o valor da corrente I₁.",
          answer:
            "Isolando I₂ na segunda equação: 4I₂ = 2I₁ => I₂ = 0,5I₁. Substituindo esse termo na primeira equação: 5I₁ - 2(0,5I₁) = 10 => 5I₁ - 1I₁ = 10 => 4I₁ = 10 => I₁ = 2,5 Amperes (A).",
        },
      ],
      links: [],
    },
    {
      id: "circuitos_equivalentes",
      label: "Circuitos Equivalentes",
      group: 7,
      status: "pending",
      description:
        "Criação de modelos simplificados de duas pontas (terminais) que reproduzem perfeitamente o mesmo comportamento elétrico de um circuito muito mais complexo. Ensina a transformar fontes e a converter redes em formatos de estrela (Y) e triângulo (Δ).",
      examples: [
        "Modelagem de Terminais Externos",
        "Transformação de Fontes de Tensão e Corrente",
        "Conversão Estrela-Triângulo (Y para Delta)",
        "Conversão Triângulo-Estrela (Delta para Y)",
        "Simplificação de Redes de Resistores Complexas",
      ],
      books: [
        "Fundamentos de Circuitos Elétricos - Charles K. Alexander & Matthew N. O. Sadiku",
        "Circuitos Elétricos - James W. Nilsson & Susan A. Riedel",
      ],
      practice: [
        {
          question:
            "A equivalência elétrica calculada para dois circuitos é válida para as grandezas internas das redes simplificadas?",
          answer:
            "Não. A equivalência é estritamente válida apenas do ponto de vista externo dos terminais selecionados. As correntes, tensões e potências internas do circuito original complexo não são preservadas dentro do modelo equivalente.",
        },
        {
          question:
            "Como funciona o método de transformação de fontes para converter uma fonte de tensão real em uma fonte de corrente real?",
          answer:
            "Uma fonte de tensão ideal (V) em série com um resistor (R) pode ser substituída por uma fonte de corrente ideal (I) em paralelo com esse mesmo resistor (R). O valor da nova corrente é calculado pela Lei de Ohm: I = V / R.",
        },
        {
          question:
            "Quando todos os três resistores de uma rede em Estrela (Y) possuem o mesmo valor R_Y, qual será o valor dos resistores na rede equivalente em Triângulo (Δ)?",
          answer:
            "Quando a rede é perfeitamente simétrica (resistores iguais), o valor de cada resistor na rede em Triângulo (Δ) será exatamente o triplo do valor da Estrela. Ou seja: R_Δ = 3 · R_Y.",
        },
        {
          question:
            "Se tivermos três resistores iguais a 9 Ω configurados em Triângulo (Δ), quais serão os valores dos resistores se convertermos essa rede para o formato Estrela (Y)?",
          answer:
            "Para fazer o caminho inverso em uma rede simétrica, dividimos o valor por 3. Portanto, cada resistor na configuração Estrela (Y) terá o valor de: R_Y = R_Δ / 3 = 9 Ω / 3 = 3 Ω.",
        },
      ],
      links: [],
    },
    {
      id: "principio_superposicao",
      label: "Princípio da Superposição",
      group: 7,
      status: "pending",
      description:
        "Teorema para circuitos lineares com várias fontes. Ele diz que a corrente ou tensão total em um componente é a soma dos efeitos causados por cada fonte atuando sozinha no circuito.",
      examples: [
        "Análise Isolada de Fontes de Tensão e Corrente",
        "Conceito de Desativação de Fontes Independentes",
        "Substituição por Curto-Circuito e Circuito Aberto",
        "Soma Algébrica de Respostas Lineares",
      ],
      books: [
        "Fundamentos de Circuitos Elétricos - Charles K. Alexander & Matthew N. O. Sadiku",
        "Circuitos Elétricos - James W. Nilsson & Susan A. Riedel",
      ],
      practice: [
        {
          question:
            "Como devem ser tratadas as fontes independentes de tensão e de corrente ao serem desativadas para a aplicação do Princípio da Superposição?",
          answer:
            "As fontes independentes de tensão são substituídas por um curto-circuito (fio ideal, tensão zero). As fontes independentes de corrente são substituídas por um circuito aberto (fio cortado, corrente zero).",
        },
        {
          question:
            "Por que o Princípio da Superposição não pode ser aplicado diretamente para o cálculo de potência dissipada em um resistor?",
          answer:
            "Porque a potência é uma grandeza não linear, proporcional ao quadrado da corrente (P = R · I²). Deve-se primeiro calcular as correntes ou tensões parciais por superposição, somá-las linearmente e, só ao final, calcular a potência resultante.",
        },
        {
          question:
            "Em um circuito linear com duas fontes, a fonte de tensão sozinha gera uma corrente de 3 A sobre um resistor. A fonte de corrente sozinha gera uma corrente de -1 A sobre o mesmo componente. Qual a corrente total real quando ambas atuam juntas?",
          answer:
            "Pelo princípio da superposição linear, basta realizar a soma algébrica das respostas parciais calculadas independentemente: I_total = I_fonte1 + I_fonte2 = 3 A + (-1 A) = 2 Amperes (A).",
        },
      ],
      links: [],
    },
    {
      id: "teoremas_thevenin_norton",
      label: "Teoremas de Thévenin e Norton",
      group: 7,
      status: "pending",
      description:
        "Dois teoremas poderosos de simplificação. Thévenin transforma um circuito complexo em uma única fonte de tensão em série com um resistor; Norton o transforma em uma fonte de corrente em paralelo com um resistor.",
      examples: [
        "Cálculo de Tensão de Circuito Aberto (Vth)",
        "Cálculo de Corrente de Curto-Circuito (In)",
        "Determinação de Resistência Equivalente (Rth = Rn)",
        "Modelagem de Impedância de Saída de Fontes",
      ],
      books: [
        "Fundamentos de Circuitos Elétricos - Charles K. Alexander & Matthew N. O. Sadiku",
        "Circuitos Elétricos - James W. Nilsson & Susan A. Riedel",
      ],
      practice: [
        {
          question:
            "Como se define a tensão de Thévenin (Vth) e a corrente de Norton (In) em relação aos terminais de um circuito elétrico?",
          answer:
            "A tensão de Thévenin é a diferença de potencial medida nos terminais em circuito aberto (sem carga). A corrente de Norton é a corrente que flui nos terminais quando eles são conectados diretamente por um curto-circuito.",
        },
        {
          question:
            "Qual é a relação matemática existente entre a resistência de Thévenin (Rth), a tensão de Thévenin (Vth) e a corrente de Norton (In)?",
          answer: "A relação baseia-se diretamente na Lei de Ohm, expressa como: Rth = Vth / In.",
        },
        {
          question:
            "Um circuito linear complexo foi analisado a partir de dois terminais livres. A tensão em circuito aberto medida foi de Vth = 12 V, e a corrente de curto-circuito obtida foi de In = 3 A. Qual o valor da resistência equivalente de Thévenin (Rth) dessa rede?",
          answer:
            "Utilizando a relação direta derivada da Lei de Ohm para modelos equivalentes, calculamos: Rth = Vth / In = 12 V / 3 A = 4 Ω.",
        },
      ],
      links: [],
    },
    {
      id: "maxima_transferencia_de_potencia",
      label: "Máxima Transferência de Potência",
      group: 7,
      status: "pending",
      description:
        "Teorema que define o valor ideal que uma carga deve ter para conseguir extrair a maior quantidade possível de potência útil de um circuito de alimentação.",
      examples: [
        "Casamento de Impedâncias Resistivas (Rl = Rth)",
        "Cálculo de Potência Máxima Dissipada na Carga",
        "Análise de Eficiência e Rendimento do Sistema",
        "Dimensionamento Ótimo de Circuitos de Transmissão",
      ],
      books: [
        "Fundamentos de Circuitos Elétricos - Charles K. Alexander & Matthew N. O. Sadiku",
        "Circuitos Elétricos - James W. Nilsson & Susan A. Riedel",
      ],
      practice: [
        {
          question:
            "Qual é a condição matemática exata para que ocorra a máxima transferência de potência útil para uma resistência de carga Rl conectada a um circuito com resistência interna de Thévenin Rth?",
          answer:
            "A condição ocorre quando o valor da resistência de carga é perfeitamente igual ao valor da resistência de Thévenin do circuito alimentador (Rl = Rth).",
        },
        {
          question:
            "Qual é a eficiência ou rendimento energético de um sistema operando na condição exata de máxima transferência de potência?",
          answer:
            "O rendimento é de apenas 50%. Metade de toda a potência total gerada pelas fontes é inevitavelmente dissipada sob a forma de calor na própria resistência interna (Rth) do circuito gerador.",
        },
        {
          question:
            "Um sistema possui um circuito equivalente de Thévenin com Vth = 20 V e Rth = 5 Ω. Para garantir que a carga resistiva externa R_L absorva a máxima potência possível, qual deve ser o seu valor ôhmico e qual será o valor dessa potência máxima transferida?",
          answer:
            "Para máxima transferência, devemos casar as resistências: R_L = Rth = 5 Ω. A fórmula da potência máxima na carga é dada por P_max = Vth² / (4 · Rth). Substituindo os valores: P_max = 20² / (4 · 5) = 400 / 20 = 20 Watts (W).",
        },
      ],
      links: [],
    },
    {
      id: "capacitores_indutores",
      label: "Capacitores e Indutores",
      group: 7,
      status: "pending",
      description:
        "Introdução aos componentes reativos que conseguem armazenar energia temporariamente. Capacitores acumulam energia em um campo elétrico, e indutores em um campo magnético.",
      examples: [
        "Relações Diferenciais de Tensão e Corrente",
        "Comportamento de Componentes em Corrente Contínua (CC)",
        "Armazenamento de Energia em Campos Elétricos e Magnéticos",
        "Associação de Capacitores e Indutores em Série e Paralelo",
      ],
      books: [
        "Fundamentos de Circuitos Elétricos - Charles K. Alexander & Matthew N. O. Sadiku",
        "Circuitos Elétricos - James W. Nilsson & Susan A. Riedel",
      ],
      practice: [
        {
          question:
            "Como se comportam os capacitores e indutores ideais quando conectados estáveis sob fontes de corrente contínua por um longo período de tempo?",
          answer:
            "Em regime estável de corrente contínua, o capacitor comporta-se como um circuito aberto (bloqueia a passagem de corrente). O indutor comporta-se como um curto-circuito ideal (age como um fio perfeito com queda de tensão nula).",
        },
        {
          question:
            "Quais as relações fundamentais de corrente e tensão diferenciais que regem o comportamento elétrico do capacitor e do indutor?",
          answer:
            "Para o capacitor, a corrente depende da variação da tensão: i = C · (dv / dt). Para o indutor, a tensão depende da variação da corrente: v = L · (di / dt).",
        },
        {
          question:
            "A tensão nos terminais de um capacitor de 2 mF varia de forma linear de 0 V a 10 V em um intervalo de tempo de 4 segundos. Qual a corrente constante que flui pelo componente durante essa transição?",
          answer:
            "A relação diferencial é dada por i = C · (dv / dt). Como a variação da tensão com o tempo é linear, a derivada dv/dt é a taxa constante Δv / Δt = (10 V - 0 V) / 4 s = 2,5 V/s. Portanto: i = 2 · 10⁻³ F · 2,5 V/s = 5 · 10⁻³ A = 5 mA.",
        },
      ],
      links: [],
    },
    {
      id: "circuitos_primeira_ordem_rc_rl",
      label: "Circuitos de Primeira Ordem (RC/RL)",
      group: 7,
      status: "pending",
      description:
        "Estuda o comportamento temporal e transitório de circuitos contendo resistores e apenas um componente reativo (um capacitor ou um indutor) quando são ligados ou desligados.",
      examples: [
        "Resolução de Respostas Naturais e Respostas ao Degrau",
        "Cálculo da Constante de Tempo τ (tau = RC ou L/R)",
        "Equações Diferenciais de Primeira Ordem",
        "Mapeamento do Período de Transição de Carga e Descarga",
      ],
      books: [
        "Fundamentos de Circuitos Elétricos - Charles K. Alexander & Matthew N. O. Sadiku",
        "Circuitos Elétricos - James W. Nilsson & Susan A. Riedel",
      ],
      practice: [
        {
          question:
            "O que define a constante de tempo τ (tau) nos circuitos de primeira ordem RC e RL, e quais são as suas expressões matemáticas?",
          answer:
            "A constante de tempo τ representa o tempo necessário para que as grandezas elétricas transitem cerca de 63,2% do seu valor inicial até o patamar de estabilidade estável. Para circuitos RC, temos: τ = R · C. Para circuitos RL, temos: τ = L / R.",
        },
        {
          question:
            "Quantas constantes de tempo (τ) são convencionalmente necessárias na prática para considerar que um circuito de primeira ordem completou o seu regime transitório?",
          answer:
            "São necessárias 5 constantes de tempo (5τ). Após este período, as grandezas do circuito atingem mais de 99,3% do seu valor final estável, permitindo considerar que o sistema entrou em regime permanente.",
        },
        {
          question:
            "Um circuito temporizador de primeira ordem possui um resistor R = 50 kΩ conectado em série com um capacitor C = 100 µF. Calcule a constante de tempo τ deste sistema.",
          answer:
            "Utilizando a fórmula da constante de tempo para circuitos RC (τ = R · C) e ajustando as ordens de magnitude: τ = (50 · 10³ Ω) · (100 · 10⁻⁶ F) = 5.000.000 · 10⁻³ = 5 segundos.",
        },
      ],
      links: [],
    },
    {
      id: "circuitos_segunda_ordem_rlc",
      label: "Circuitos de Segunda Ordem (RLC)",
      group: 7,
      status: "pending",
      description:
        "Análise matemática avançada de circuitos que combinam resistores, indutores e capacitores ao mesmo tempo, modelados por equações diferentciais de segundo grau.",
      examples: [
        "Equações Diferenciais Ordinárias de Segunda Ordem",
        "Determinação de Fator de Amortecimento (α) e Frequência de Ressonância (ω₀)",
        "Análise de Circuitos RLC Série e RLC Paralelo",
        "Mapeamento de Respostas Transitórias Oscilatórias",
      ],
      books: [
        "Fundamentos de Circuitos Elétricos - Charles K. Alexander & Matthew N. O. Sadiku",
        "Circuitos Elétricos - James W. Nilsson & Susan A. Riedel",
      ],
      practice: [
        {
          question:
            "Quais são as três classificações possíveis para as respostas dinâmicas transitórias de um circuito RLC de segunda ordem, baseando-se no seu fator de amortecimento?",
          answer:
            "As respostas são classificadas como: Superamortecida (retorno lento ao estado estável sem oscilar), Criticamente Amortecida (o retorno mais rápido possível ao estado estável sem oscilar) e Subamortecida (a resposta oscila como uma onda senoidal que vai sumindo aos poucos com o tempo).",
        },
        {
          question:
            "Um circuito RLC em série possui componentes cujos parâmetros matemáticos resultaram em uma frequência neperiana (fator de amortecimento) α = 10 rad/s e uma frequência de ressonância natural ω₀ = 6 rad/s. Qual o tipo de resposta transitória exibida por esta rede?",
          answer:
            "Comparamos os valores de α e ω₀. Como α (10) > ω₀ (6), as raízes da equação característica serão reais e distintas, o que classifica o comportamento dinâmico do sistema como uma resposta Superamortecida (Overdamped).",
        },
      ],
      links: [],
    },
    {
      id: "senoides_e_fasores",
      label: "Senoides e Fasores",
      group: 7,
      status: "pending",
      description:
        "Estudo de circuitos em Regime Permanente Senoidal (Corrente Alternada). Introduz o conceito de fasor como um número complexo que representa a amplitude e a fase de uma senoide, permitindo transformar equações diferenciais complexas do domínio do tempo em equações algébricas simples no domínio da frequência.",
      examples: [
        "Definição de Senoide: v(t) = Vm cos(ωt + φ)",
        "Conceito de Frequência Angular (ω = 2πf) e Período (T = 1/f)",
        "Identidade de Euler e Representação Complexa",
        "Transformação do Domínio do Tempo para o Domínio Fasorial",
        "Relações de Fase: Avanço (Lead) e Atraso (Lag)",
      ],
      books: [
        "Fundamentos de Circuitos Elétricos - Charles K. Alexander & Matthew N. O. Sadiku",
        "Circuitos Elétricos - James W. Nilsson & Susan A. Riedel",
      ],
      practice: [
        {
          question:
            "Uma tensão senoidal é dada por v(t) = 12 cos(50t + 30°) V. Transforme essa função do domínio do tempo para o domínio fasorial (representação polar).",
          answer:
            "Um fasor retém apenas a amplitude e o ângulo de fase da senoide. Portanto, extraindo esses valores diretamente da equação: V = 12 ∠30° V.",
        },
        {
          question:
            "Qual é a justificativa matemática para o uso de fasores e números complexos na análise de circuitos em Corrente Alternada (CA)?",
          answer:
            "No domínio do tempo, a relação de tensão e corrente em capacitores e indutores envolve derivadas e integrais. Ao transformar os sinais para o domínio fasorial usando a base e^(jωt), a operação de derivação (d/dt) se transforma em uma multiplicação simples por jω. Isso permite aplicar as Leis de Ohm e Kirchhoff usando álgebra linear complexa comum, tratando reatâncias como se fossem resistores.",
        },
      ],
      links: [],
    },
    // 8. Eletrônica Geral
    {
      id: "eletronica_geral",
      label: "Eletrônica Geral",
      group: 8,
      status: "pending",
      description:
        "O estudo dos dispositivos eletrônicos analógicos que não seguem uma linha reta na relação de tensão e corrente. Funciona como a base para entender como controlar a energia, transformar sinais e criar amplificadores.",
      examples: [
        "Diferença entre Componentes Lineares e Não Lineares",
        "Introdução aos Dispositivos de Estado Sólido",
        "Análise de Circuitos Analógicos de Bancada",
        "Comportamento Dinâmico de Componentes Ativos",
      ],
      books: ["Dispositivos Eletrônicos e Teoria de Circuitos - Robert L. Boylestad & Louis Nashelsky"],
      practice: [
        {
          question:
            "Qual a diferença fundamental de comportamento entre componentes passivos lineares (como resistores) e os componentes de estado sólido estudados na Eletrônica Geral?",
          answer:
            "Componentes lineares obedecem estritamente à Lei de Ohm, apresentando uma relação diretamente proporcional entre tensão e corrente (gráfico em linha reta). Já os dispositivos de estado sólido são não lineares; suas resistências internas mudam de acordo com a tensão aplicada, agindo como chaves controladas ou amplificadores.",
        },
      ],
      links: [],
    },
    {
      id: "semicondutores",
      label: "Semicondutores",
      group: 8,
      status: "pending",
      description:
        "Estuda os materiais químicos (como o Silício) que não são nem bons condutores nem isolantes perfeitos. Mostra como alterar as propriedades deles jogando impurezas (dopagem) para criar uma Junção PN.",
      examples: [
        "Cristais Intrínsecos e Extrínsecos",
        "Processo de Dopagem (Materiais Tipo P e Tipo N)",
        "Formação da Região de Depleção na Junção",
        "Movimento de Elétrons Livres e Lacunas",
      ],
      books: ["Dispositivos Eletrônicos e Teoria de Circuitos - Robert L. Boylestad & Louis Nashelsky"],
      practice: [
        {
          question:
            "O que diferencia um semicondutor intrínseco de um extrínseco e qual o objetivo do processo de dopagem?",
          answer:
            "O semicondutor intrínseco é o cristal em seu estado puro, com baixa condução. O extrínseco é o cristal dopado, que recebeu a introdução controlada de impurezas (como Fósforo ou Boro) para aumentar intencionalmente a quantidade de portadores livres (elétrons ou lacunas).",
        },
        {
          question:
            "O que ocorre com a região de depleção de uma junção PN quando ela é submetida a uma polarização reversa?",
          answer:
            "Na polarização reversa, os portadores são atraídos para longe da junção pelos polos da fonte externa. Isso alarga a região de depleção, criando uma barreira que impede a passagem da corrente elétrica (gerando apenas uma corrente de fuga desprezível).",
        },
      ],
      links: [],
    },
    {
      id: "diodos",
      label: "Diodos",
      group: 8,
      status: "pending",
      description:
        "Estuda o componente semicondutor mais simples de todos, feito com uma única Junção PN. Ele funciona como uma válvula, deixando a corrente passar em um único sentido e bloqueando o sentido oposto.",
      examples: [
        "Curva Característica do Diodo (V-I)",
        "Análise de Diodos com o Modelo Ideal e Prático",
        "Comportamento de Diodos Emissores de Luz (LEDs)",
        "Mapeamento do Joelho de Condução e Região de Ruptura",
      ],
      books: ["Dispositivos Eletrônicos e Teoria de Circuitos - Robert L. Boylestad & Louis Nashelsky"],
      practice: [
        {
          question:
            "De acordo com o modelo prático, qual o significado físico da queda de tensão de aproximadamente 0,7V em diodos de Silício polarizados diretamente?",
          answer:
            "Essa tensão representa a barreira de potencial gerada pelos íons fixos na região de depleção. A fonte externa precisa superar esses 0,7V para reduzir a barreira e permitir que a corrente elétrica comece a fluir continuamente.",
        },
      ],
      links: [],
    },
    {
      id: "aplicacoes_diodos",
      label: "Aplicações de Diodos e Retificação",
      group: 8,
      status: "pending",
      description:
        "Mostra como usar os diodos na prática para construir circuitos reais. Ensina a transformar corrente alternada (da tomada) em corrente contínua (para eletrônicos), moldar sinais e regular tensão com o Diodo Zener.",
      examples: [
        "Circuitos Retificadores de Meia-Onda e Onda Completa",
        "Filtros Capacitivos e Redução de Oscilações (Ripple)",
        "Circuitos Limitadores (Ceifadores) e Grampeadores de Sinal",
        "Regulação de Tensão Estável com Diodo Zener",
      ],
      books: ["Dispositivos Eletrônicos e Teoria de Circuitos - Robert L. Boylestad & Louis Nashelsky"],
      practice: [
        {
          question:
            "Qual é a vantagem de um retificador de onda completa em ponte em relação a um retificador de meia-onda no desenvolvimento de fontes de alimentação?",
          answer:
            "O retificador de onda completa aproveita os dois semiciclos (positivo e negativo) da onda AC de entrada. Isso dobra a frequência das oscilações na saída, tornando a filtragem com o capacitor muito mais fácil e gerando uma tensão contínua mais estável.",
        },
        {
          question:
            "Como deve ser conectado e polarizado um Diodo Zener para atuar estritamente como um regulador de tensão estável?",
          answer:
            "O diodo Zener deve ser ligado em paralelo com a carga e polarizado de forma reversa. O circuito precisa de um resistor em série para limitar a corrente e garantir que o Zener trabalhe na sua região de ruptura, onde ele mantém a tensão fixa.",
        },
      ],
      links: [],
    },
    {
      id: "transistores",
      label: "Transistores",
      group: 8,
      status: "pending",
      description:
        "Introdução aos componentes de três pinos que revolucionaram a tecnologia. Eles conseguem usar uma quantidade muito pequena de energia na entrada para controlar uma quantidade muito maior na saída, agindo como amplificadores ou chaves eletrônicas.",
      examples: [
        "O Conceito de Dispositivo Controlado de Três Terminais",
        "Diferença entre Controle por Corrente e Controle por Tensão",
        "Mapeamento das Funções de Amplificação e Comutação",
        "Introdução aos Blocos de Circuitos Ativos",
      ],
      books: ["Dispositivos Eletrônicos e Teoria de Circuitos - Robert L. Boylestad & Louis Nashelsky"],
      practice: [
        {
          question:
            "Qual é a função primária que um transistor desempenha na eletrônica analógica e na eletrônica digital, respectivamente?",
          answer:
            "Na eletrônica analógica, ele atua como um amplificador linear de sinais (região ativa). Na eletrônica digital, funciona como uma chave eletrônica de comutação rápida, alternando apenas entre ligado e desligado (corte e saturação).",
        },
      ],
      links: [],
    },
    {
      id: "transistores_bjt",
      label: "Transistores Bipolares de Junção (BJT)",
      group: 8,
      status: "pending",
      description:
        "Estuda os transistores do tipo NPN e PNP controlados por corrente. Ensina a calcular o ganho de corrente (Beta) e a mapear os estados de corte, saturação e região ativa de amplificação.",
      examples: [
        "Estrutura de Transistores NPN e PNP",
        "Cálculo de Correntes (Emissor, Base e Coletor)",
        "O Fator de Ganho de Corrente (Beta / hFE)",
        "Uso de BJTs como Chaves Digitais e Drivers de Corrente",
      ],
      books: ["Dispositivos Eletrônicos e Teoria de Circuitos - Robert L. Boylestad & Louis Nashelsky"],
      practice: [
        {
          question:
            "Quais as condições de polarização elétrica das junções internas de um BJT para garantir sua operação na região ativa?",
          answer:
            "A junção Base-Emissor deve estar diretamente polarizada (com cerca de 0,7V) e a junção Base-Coletor deve estar reversamente polarizada. Isso permite controlar linearmente a corrente de saída por meio de uma pequena corrente na base.",
        },
      ],
      links: [],
    },
    {
      id: "transistores_fet",
      label: "Transistores FET",
      group: 8,
      status: "pending",
      description:
        "Estuda os transistores controlados por tensão por meio de um campo elétrico. Foca no funcionamento do MOSFET, que possui consumo de energia quase nulo na entrada e serve como a espinha dorsal dos chips e processadores modernos (CMOS).",
      examples: [
        "Funcionamento do JFET e do MOSFET (Ação de Campo)",
        "Diferença entre MOSFET de Intensificação e Depleção",
        "Curvas de Características de Dreno e de Transferência",
        "Introdução às Portas Lógicas Complementares CMOS",
      ],
      books: ["Dispositivos Eletrônicos e Teoria de Circuitos - Robert L. Boylestad & Louis Nashelsky"],
      practice: [
        {
          question:
            "Qual a grande vantagem da impedância do terminal de porta (Gate) de um MOSFET frente à base de um BJT?",
          answer:
            "O terminal de Gate de um MOSFET é isolado do canal condutor por uma fina camada de dióxido de silício (um isolante). Isso dá ao MOSFET uma resistência de entrada quase infinita em corrente contínua, fazendo com que ele seja controlado por tensão e não consuma corrente de controle (Ig = 0A).",
        },
      ],
      links: [],
    },
    {
      id: "amplificadores_bjt_mosfet",
      label: "Polarização e Amplificadores a Transistor",
      group: 8,
      status: "pending",
      description:
        "Ensina a configurar o circuito com resistores para deixar o transistor ligado estavelmente no ponto ideal (Ponto Q). Também estuda como o circuito lida com pequenos sinais que variam no tempo (sinais AC), calculando o ganho de som ou dados.",
      examples: [
        "Malhas de Polarização DC por Divisor de Tensão",
        "Estabilização Térmica do Ponto Quiescente (Ponto Q)",
        "Modelos Equivalentes AC de Transistores (Híbrido-Pi e re)",
        "Cálculo de Ganho de Tensão, Ganho de Corrente e Impedâncias",
      ],
      books: ["Dispositivos Eletrônicos e Teoria de Circuitos - Robert L. Boylestad & Louis Nashelsky"],
      practice: [
        {
          question:
            "Por que a malha de polarização por divisor de tensão com resistor no emissor/fonte é largamente utilizada para fixar o Ponto Q?",
          answer:
            "Essa configuração cria uma realimentação negativa DC que mantém a corrente de operação do coletor estável, impedindo que o circuito saia do ponto ideal devido a variações de temperatura ou mudanças no ganho Beta do transistor.",
        },
      ],
      links: [],
    },
    {
      id: "amplificadores_operacionais",
      label: "Amplificadores Operacionais",
      group: 8,
      status: "pending",
      description:
        "Estudo de circuitos integrados completos vendidos em pastilhas (chips). Eles facilitam muito o projeto de circuitos analógicos porque permitem criar somadores, inversores e filtros de forma muito simples usando realimentação.",
      examples: [
        "Aproximações do Amplificador Operacional Ideal",
        "Configurações Clássicas: Inversor e Não Inversor",
        "Circuitos Operadores: Somadores, Integradores e Diferenciadores",
        "Circuitos de Instrumentação e Condicionamento de Sensores",
      ],
      books: ["Dispositivos Eletrônicos e Teoria de Circuitos - Robert L. Boylestad & Louis Nashelsky"],
      practice: [
        {
          question:
            "Explique o conceito de 'Curto-Circuito Virtual' aplicável aos terminais diferenciais de entrada de um Amp-Op ideal com realimentação negativa.",
          answer:
            "Como o ganho interno em malha aberta do circuito ideal é considerado infinito, qualquer diferença de tensão na entrada geraria uma saída estourada. Para a saída ficar estável e finita, o circuito ajusta a realimentação forçando que a diferença de potencial entre os pinos de entrada seja zero (V+ = V-).",
        },
      ],
      links: [],
    },
    {
      id: "resposta_em_frequencia",
      label: "Resposta em Frequência (Bode)",
      group: 8,
      status: "pending",
      description:
        "Estuda os limites de velocidade dos amplificadores. Mostra como os capacitores do circuito e as capacitâncias internas do próprio transistor fazem o ganho de áudio ou dados cair em frequências muito baixas ou muito altas.",
      examples: [
        "Gráficos de Bode (Módulo e Fase)",
        "Frequências de Corte (Baixa e Alta)",
        "O Efeito Miller em Alta Frequência",
        "Largura de Banda (Bandwidth)",
      ],
      books: ["Dispositivos Eletrônicos e Teoria de Circuitos - Robert L. Boylestad & Louis Nashelsky"],
      practice: [
        {
          question:
            "Por que o ganho de um amplificador a transistor cai drasticamente quando a frequência do sinal de entrada se torna muito alta?",
          answer:
            "Em frequências muito altas, as minúsculas capacitâncias parasitas que existem dentro do próprio transistor (entre a Base e o Coletor, por exemplo) começam a agir como curtos-circuitos. Isso cria um caminho de 'fuga' para o sinal (Efeito Miller), matando a capacidade do transistor de amplificar a tensão.",
        },
      ],
      links: [],
    },
    {
      id: "amplificadores_potencia",
      label: "Amplificadores de Potência",
      group: 8,
      status: "pending",
      description:
        "A transição de pequenos sinais para grandes potências. Foca em como entregar força bruta para alto-falantes ou motores, estudando as Classes de amplificação (A, B, AB, C) e o dilema entre fidelidade do sinal e dissipação de calor.",
      examples: [
        "Amplificadores Classe A (Alta Fidelidade, Baixa Eficiência)",
        "Amplificadores Classe B (Push-Pull)",
        "Amplificadores Classe AB (Redução de Distorção de Crossover)",
        "Eficiência Térmica e Dissipadores de Calor",
      ],
      books: ["Dispositivos Eletrônicos e Teoria de Circuitos - Robert L. Boylestad & Louis Nashelsky"],
      practice: [
        {
          question:
            "Qual é a principal diferença de projeto e de eficiência entre um amplificador Classe A e um amplificador Classe B (Push-Pull)?",
          answer:
            "Na Classe A, o transistor fica conduzindo corrente o tempo todo (mesmo no silêncio), o que gera um som puro, mas desperdiça uma energia absurda em forma de calor (eficiência máxima de 25%). Na Classe B, usam-se dois transistores: um amplifica a parte positiva da onda e o outro a negativa. Eles 'descansam' na vez do outro, o que aumenta a eficiência para até 78%, mas pode gerar distorção na troca (Crossover).",
        },
      ],
      links: [],
    },
    {
      id: "aplicacoes_amp_op",
      label: "Aplicações de Amp-Ops",
      group: 8,
      status: "pending",
      description:
        "A eletrônica atuando como computador analógico. Explora o uso avançado dos Amplificadores Operacionais para montar filtros que separam graves e agudos, e circuitos que fazem equações matemáticas com a voltagem.",
      examples: [
        "Filtros Ativos (Passa-Baixa, Passa-Alta, Butterworth)",
        "Somadores, Subtratores e Multiplicadores Analógicos",
        "Integradores e Diferenciadores",
        "Amplificadores de Instrumentação (Biomédica)",
      ],
      books: ["Dispositivos Eletrônicos e Teoria de Circuitos - Robert L. Boylestad & Louis Nashelsky"],
      practice: [
        {
          question:
            "Qual é a vantagem de utilizar um 'Filtro Ativo' (feito com Amp-Op) em vez de um 'Filtro Passivo' comum (feito só com Resistores e Capacitores)?",
          answer:
            "Os filtros passivos sempre enfraquecem (atenuam) o sinal original porque os resistores consomem energia. O Filtro Ativo com Amp-Op não apenas corta as frequências indesejadas, mas também consegue amplificar as frequências que passam, além de evitar que o circuito puxe corrente do sensor anterior graças à sua alta impedância de entrada.",
        },
      ],
      links: [],
    },
    {
      id: "osciladores_realimentacao",
      label: "Realimentação e Osciladores",
      group: 8,
      status: "pending",
      description:
        "Estuda o que acontece quando pegamos a saída de um amplificador e a injetamos de volta na entrada. Ensina como usar a realimentação negativa para dar estabilidade ao circuito, ou a realimentação positiva para criar relógios e sinais de rádio (Osciladores).",
      examples: [
        "Topologias de Realimentação Negativa",
        "Critério de Barkhausen para Oscilação",
        "Osciladores RC (Deslocamento de Fase, Ponte de Wien)",
        "Osciladores LC e a Cristal de Quartzo",
      ],
      books: ["Dispositivos Eletrônicos e Teoria de Circuitos - Robert L. Boylestad & Louis Nashelsky"],
      practice: [
        {
          question:
            "O que dita o Critério de Barkhausen para que um circuito de amplificação se transforme em um Oscilador autossustentável?",
          answer:
            "Ele exige duas regras para a realimentação positiva: 1) O ganho total do laço do circuito deve ser igual a 1 (ou ligeiramente maior no momento da partida). 2) A fase do sinal que volta da saída para a entrada deve ter um deslocamento de exatamente 0º ou 360º. Se isso acontecer, o circuito gera sua própria onda contínua sem precisar de sinal externo.",
        },
      ],
      links: [],
    },
    {
      id: "fontes_alimentacao_reguladores",
      label: "Fontes de Alimentação e Reguladores",
      group: 8,
      status: "pending",
      description:
        "A união dos diodos, transistores e circuitos integrados para construir o coração de qualquer eletrônico: a fonte de energia. Foca no condicionamento da energia suja da tomada em uma tensão contínua, blindada e estabilizada.",
      examples: [
        "Reguladores de Tensão a Transistor (Série e Paralelo)",
        "Reguladores Integrados (Família 78XX e 79XX)",
        "Circuitos de Proteção contra Curto-Circuito",
        "Introdução a Fontes Chaveadas (SMPS)",
      ],
      books: ["Dispositivos Eletrônicos e Teoria de Circuitos - Robert L. Boylestad & Louis Nashelsky"],
      practice: [
        {
          question:
            "Como funciona a lógica de um Regulador de Tensão Linear Série para manter a tensão de saída fixa mesmo que o consumo de energia do aparelho mude?",
          answer:
            "O regulador usa um transistor de potência em série com a carga, agindo como uma 'torneira variável'. Um circuito interno compara a tensão de saída com uma tensão de referência (como um Zener). Se a saída tentar cair porque o consumo aumentou, o circuito abre mais o transistor para deixar passar mais energia, compensando a queda instantaneamente.",
        },
      ],
      links: [],
    },
    {
      id: "tiristores_outros_dispositivos",
      label: "Tiristores e Componentes Especiais",
      group: 8,
      status: "pending",
      description:
        "Uma introdução à Eletrônica de Potência. Estuda componentes de estado sólido compostos por quatro camadas semicondutoras (PNPN) projetados para controlar correntes gigantescas, como motores industriais e dimmers de lâmpadas.",
      examples: [
        "Retificador Controlado de Silício (SCR)",
        "DIAC e TRIAC (Controle de Corrente Alternada)",
        "Transistor de Unijunção (UJT)",
        "Fototransistores e Optoacopladores",
      ],
      books: ["Dispositivos Eletrônicos e Teoria de Circuitos - Robert L. Boylestad & Louis Nashelsky"],
      practice: [
        {
          question:
            "Qual é a diferença fundamental no controle de um Transistor comum e de um Retificador Controlado de Silício (SCR)?",
          answer:
            "O transistor normal conduz corrente apenas enquanto você estiver enviando energia para a Base/Gate. O SCR tem um efeito de 'trava' (latch). Basta um único pulso elétrico minúsculo no pino de controle (Gatilho) para ele disparar. Depois que liga, você pode remover o sinal do gatilho e ele continuará conduzindo infinitamente, até que a corrente principal caia para zero.",
        },
      ],
      links: [],
    },
    // 9. Sistemas Digitais
    {
      id: "sistemas_digitais",
      label: "Sistemas Digitais",
      group: 9,
      status: "pending",
      description:
        "Introdução ao mundo digital. Mostra a diferença entre sinais analógicos (que variam continuamente) e digitais (que usam apenas zeros e uns), destacando por que os computadores e eletrônicos modernos usam o formato digital para evitar erros.",
      examples: [
        "Computadores e Microprocessadores",
        "Sistemas de Áudio Digital (CD/MP3)",
        "Relógios e Displays Eletrônicos",
        "Sistemas de Transmissão de Dados",
      ],
      books: ["Sistemas Digitais: Princípios e Aplicações - Ronald J. Tocci"],
      practice: [
        {
          question:
            "Explique a principal diferença entre uma grandeza analógica e uma grandeza digital, fornecendo um exemplo de cada.",
          answer:
            "Uma grandeza analógica varia de forma contínua, assumindo infinitos valores dentro de uma faixa (ex: a temperatura de uma sala variando ao longo do dia). Uma grandeza digital varia em passos discretos, assumindo apenas valores finitos e exatos (ex: os números exibidos em um placar eletrônico esportivo).",
        },
      ],
      links: [],
    },
    {
      id: "sistemas_de_numeracao",
      label: "Sistemas de Numeração",
      group: 9,
      status: "pending",
      description:
        "Ensina como as máquinas contam e processam dados. Explica o sistema Binário (base 2), o Hexadecimal (base 16) e como fazer a conversão desses valores matemáticos para o nosso sistema decimal cotidiano.",
      examples: [
        "Sistema Binário (Base 2)",
        "Sistema Decimal (Base 10)",
        "Sistema Hexadecimal (Base 16)",
        "Conversões entre Bases Numéricas",
      ],
      books: ["Sistemas Digitais: Princípios e Aplicações - Ronald J. Tocci"],
      practice: [
        {
          question:
            "Quantos bits são necessários, no mínimo, para representar valores decimais inteiros que vão de 0 até 500?",
          answer:
            "A quantidade de valores únicos representáveis com 'n' bits é 2ⁿ. Precisamos de um valor onde 2ⁿ seja maior ou igual a 501. Como 2⁸ = 256 (insuficiente) e 2⁹ = 512 (suficiente), são necessários no mínimo 9 bits.",
        },
      ],
      links: [],
    },
    {
      id: "codigos_digitais",
      label: "Códigos Digitais",
      group: 9,
      status: "pending",
      description:
        "Mostra como usamos sequências de zeros e uns não apenas para fazer contas, mas para representar informações reais, como textos (código ASCII), números em displays (BCD) ou posições de sensores (Código Gray).",
      examples: [
        "Código BCD (8421)",
        "Código Gray",
        "Código ASCII Alfanumérico",
        "Método do Bit de Paridade para Erros",
      ],
      books: ["Sistemas Digitais: Princípios e Aplicações - Ronald J. Tocci"],
      practice: [
        {
          question:
            "Qual é a principal característica operacional do Código Gray que o torna ideal para aplicações em encoders de posição mecânicos ou ópticos?",
          answer:
            "A grande vantagem do Código Gray é que apenas um único bit muda de estado quando passamos de um número para o próximo. Isso elimina falhas de leitura transitórias que ocorrem em sensores quando múltiplos bits tentam mudar ao mesmo tempo no sistema binário comum.",
        },
      ],
      links: [],
    },
    {
      id: "algebra_booleana",
      label: "Álgebra Booleana",
      group: 9,
      status: "pending",
      description:
        "A matemática da lógica digital. Ensina as regras e teoremas usados para calcular e manipular expressões que só possuem dois valores possíveis: verdadeiro (1) ou falso (0).",
      examples: [
        "Tabelas-Verdade",
        "Teoremas Booleanos e Postulados",
        "Leis de DeMorgan",
        "Formas Padrão: Soma de Produtos (SOP)",
      ],
      books: ["Sistemas Digitais: Princípios e Aplicações - Ronald J. Tocci"],
      practice: [
        {
          question:
            "Utilizando as Leis de DeMorgan, simplifique analiticamente a expressão booleana: Z = NOT(A * NOT(B) * C).",
          answer:
            "A Lei de DeMorgan diz que o inverso de um produto é a soma dos inversos. Logo: Z = NOT(A) + NOT(NOT(B)) + NOT(C). Como duas inversões se anulam (NOT(NOT(B)) = B), a expressão final simplificada fica: Z = NOT(A) + B + NOT(C).",
        },
      ],
      links: [],
    },
    {
      id: "familias_logicas",
      label: "Famílias Lógicas",
      group: 9,
      status: "pending",
      description:
        "Estuda como as portas lógicas são construídas fisicamente por dentro usando transistores. Analisa as diferenças de velocidade, consumo de energia e características elétricas entre os chips padrão (TTL e CMOS).",
      examples: [
        "Família TTL (Transistores Bipolares)",
        "Família CMOS (Transistores MOSFET)",
        "Atraso de Propagação e Consumo de Potência",
        "Saídas Tristate (Alta Impedância)",
      ],
      books: ["Sistemas Digitais: Princípios e Aplicações - Ronald J. Tocci"],
      practice: [
        {
          question:
            "No contexto de barramentos de dados de microprocessadores, o que é o estado de Alta Impedância (Hi-Z) fornecido por portas do tipo Tristate?",
          answer:
            "O estado Hi-Z (Alta Impedância) desliga o pino de saída do chip, fazendo com que ele se comporte como um fio cortado. Isso permite que vários chips diferentes sejam conectados ao mesmo fio do barramento sem causar curtos-circuitos, garantindo que apenas um chip 'fale' de cada vez.",
        },
      ],
      links: [],
    },
    {
      id: "portas_logicas",
      label: "Portas Lógicas",
      group: 9,
      status: "pending",
      description:
        "Os blocos de montar (Lego) da computação. Ensina o funcionamento dos circuitos eletrônicos básicos (AND, OR, NOT, NAND, NOR) que recebem zeros e uns e tomam decisões lógicas simples.",
      examples: [
        "Portas Básicas (AND, OR, NOT)",
        "Portas Compostas (NAND, NOR)",
        "Portas de Comparação (XOR, XNOR)",
        "Universalidade das Portas NAND e NOR",
      ],
      books: ["Sistemas Digitais: Princípios e Aplicações - Ronald J. Tocci"],
      practice: [
        {
          question: "Por que as portas lógicas NAND e NOR são classificadas na indústria como 'portas universais'?",
          answer:
            "Elas são chamadas de universais porque, usando apenas portas NAND (ou apenas portas NOR) interligadas entre si, é possível replicar o comportamento de qualquer outra porta lógica (AND, OR, NOT). Com isso, podemos montar qualquer computador inteiro usando apenas um tipo de porta.",
        },
      ],
      links: [],
    },
    {
      id: "simplificacao_logica",
      label: "Simplificação Lógica",
      group: 9,
      status: "pending",
      description:
        "Técnicas visuais, como o Mapa de Karnaugh, usadas para 'enxugar' um circuito. Ensina a simplificar equações para que o hardware faça a exata mesma função, mas usando muito menos portas lógicas e fios.",
      examples: [
        "Mapas de Karnaugh (2 a 5 variáveis)",
        "Agrupamento Visual de Mintermos",
        "Condições Irrelevantes (Don't-Care)",
        "Otimização de Hardware Analítico",
      ],
      books: ["Sistemas Digitais: Princípios e Aplicações - Ronald J. Tocci"],
      practice: [
        {
          question:
            "Como as condições irrelevantes (Don't-Care), marcadas com um 'X' no Mapa de Karnaugh, ajudam a deixar um circuito mais barato e simples?",
          answer:
            "Os 'X' representam entradas que nunca vão acontecer na vida real do circuito. Como a saída deles não importa, o projetista pode assumir que valem '1' ou '0'. Escolhemos transformá-los em '1' sempre que isso ajudar a formar grupos maiores no mapa, o que elimina mais variáveis e corta custos do circuito.",
        },
      ],
      links: [],
    },
    {
      id: "aritmetica_digital",
      label: "Aritmética Digital",
      group: 9,
      status: "pending",
      description:
        "Explica como o processador faz contas matemáticas. Mostra como o hardware usa regras simples de zeros e uns para somar, subtrair e lidar com números negativos (usando o método de Complemento de 2).",
      examples: [
        "Adição e Subtração Binária",
        "Representação de Negativos (Complemento de 2)",
        "Detecção de Estouro Aritmético (Overflow)",
        "Operações Matemáticas em Base Hexadecimal",
      ],
      books: ["Sistemas Digitais: Princípios e Aplicações - Ronald J. Tocci"],
      practice: [
        {
          question:
            "Represente os números decimais +9 e -5 em formato binário de 8 bits usando o sistema de complemento de 2 e efetue a operação (+9) + (-5).",
          answer:
            "1) O +9 em 8 bits é 00001001₂. 2) Para o -5, pegamos o +5 (00000101), invertemos todos os bits (11111010) e somamos 1, resultando em 11111011₂. 3) Somando tudo: 00001001 (+9) + 11111011 (-5) = (1)00000100. O bit 'vai-um' que estourou para a 9ª posição é descartado. Sobra 00000100₂, que é exatamente o +4 decimal.",
        },
      ],
      links: [],
    },
    {
      id: "circuitos_combinacionais_msi",
      label: "Circuitos Combinacionais MSI",
      group: 9,
      status: "pending",
      description:
        "Circuitos prontos de média complexidade vendidos em chips. Eles não têm memória: operam em tempo real. Se você mudar a chave na entrada, o resultado na saída muda imediatamente, como em decodificadores e chaves seletoras.",
      examples: [
        "Somadores Completos (Full-Adders)",
        "Multiplexadores (Chaves Seletoras de Dados)",
        "Decodificadores de BCD para Display de 7 Segmentos",
        "Comparadores Digitais de Magnitude",
      ],
      books: ["Sistemas Digitais: Princípios e Aplicações - Ronald J. Tocci"],
      practice: [
        {
          question:
            "Qual é a diferença entre um Meio-Somador (Half-Adder) e um Somador Completo (Full-Adder) no processador?",
          answer:
            "O Meio-Somador consegue somar apenas dois bits de dados (A e B). O Somador Completo é mais inteligente: além de somar A e B, ele possui um pino extra (Carry-In) para receber a sobra ('vai-um') vinda da soma dos bits anteriores, permitindo enfileirar vários chips para somar números gigantes.",
        },
      ],
      links: [],
    },
    {
      id: "latches_flipflops",
      label: "Latches e Flip-Flops",
      group: 9,
      status: "pending",
      description:
        "O início da memória digital. Estuda os circuitos que conseguem 'lembrar' se um bit é 0 ou 1 usando laços de realimentação. Introduz o uso do sinal de 'Clock', que funciona como o maestro que dita o ritmo de todo o computador.",
      examples: [
        "Latches Básicos (Sensíveis a Nível de Tensão)",
        "Flip-Flops tipo D e J-K (Disparados pelo Clock)",
        "O conceito de Borda de Subida e Descida",
        "Tempos de Restrição: Setup e Hold",
      ],
      books: ["Sistemas Digitais: Princípios e Aplicações - Ronald J. Tocci"],
      practice: [
        {
          question: "Qual a diferença de ritmo entre um Latch controlado por nível e um Flip-Flop disparado por borda?",
          answer:
            "O Latch é como uma porta aberta: enquanto o sinal de controle (Enable) estiver ligado, qualquer mudança na entrada passa direto para a saída. O Flip-Flop disparado por borda é como uma câmera fotográfica: ele só copia o dado da entrada para a saída em uma fração de segundo exata, bem no momento em que o sinal de clock faz a transição (sobe ou desce).",
        },
      ],
      links: [],
    },
    {
      id: "registradores_contadores",
      label: "Registradores e Contadores",
      group: 9,
      status: "pending",
      description:
        "São blocos maiores formados juntando vários flip-flops. Os contadores são usados em cronômetros e para gerar o tempo dos eletrônicos, enquanto os registradores são usados para salvar temporariamente e deslocar senhas e bytes.",
      examples: [
        "Registradores de Deslocamento (Shift Registers)",
        "Contadores Assíncronos (Efeito Cascata)",
        "Contadores Síncronos (Acompanham o mesmo Clock)",
        "Projeto de Contadores com Módulo Específico (Mod-N)",
      ],
      books: ["Sistemas Digitais: Princípios e Aplicações - Ronald J. Tocci"],
      practice: [
        {
          question:
            "Qual é a grande falha de velocidade do contador 'assíncrono' (efeito cascata) se comparado com o contador síncrono moderno?",
          answer:
            "No contador assíncrono, o clock bate só no primeiro flip-flop. O segundo precisa esperar o primeiro mudar, o terceiro espera o segundo, criando um 'efeito dominó'. Em frequências muito altas, esse atraso se acumula e o circuito erra a conta. No síncrono, o clock liga em todos ao mesmo tempo, eliminando o atraso.",
        },
      ],
      links: [],
    },
    {
      id: "maquinas_de_estado",
      label: "Máquinas de Estado Finitas",
      group: 9,
      status: "pending",
      description:
        "O verdadeiro cérebro da lógica sequencial. Ensina a criar sistemas fechados que pulam de um passo para outro dependendo das entradas, como a lógica de um semáforo de trânsito, botões de um elevador ou uma máquina de café.",
      examples: [
        "Diagramas de Estados Sequenciais",
        "Diferença entre Modelos de Moore e Mealy",
        "Tabelas de Excitação e Próximo Estado",
        "Otimização e Projeto de Fluxos ASM",
      ],
      books: ["Sistemas Digitais: Princípios e Aplicações - Ronald J. Tocci"],
      practice: [
        {
          question:
            "No planejamento de Máquinas de Estado (FSMs), qual a diferença entre usar o modelo de Moore ou o modelo de Mealy?",
          answer:
            "No modelo de Moore, o valor das saídas da máquina depende única e exclusivamente do 'Estado Atual' em que ela está. No modelo de Mealy, a saída é gerada pela combinação do 'Estado Atual' com o que estiver acontecendo nas entradas externas naquele exato instante.",
        },
      ],
      links: [],
    },
    {
      id: "dispositivos_de_memoria",
      label: "Dispositivos de Memória",
      group: 9,
      status: "pending",
      description:
        "Como armazenar dados em massa. Explica a arquitetura dos chips que guardam as informações do computador, diferenciando memórias rápidas que perdem dados sem luz (SRAM e DRAM) de memórias definitivas (ROM e Flash).",
      examples: [
        "Memórias Voláteis: RAM Estática e Dinâmica",
        "Memórias Não Voláteis: ROM, EEPROM e Flash",
        "Decodificação de Barramento de Endereços",
        "Expansão de Palavras e Pinos de Memória",
      ],
      books: ["Sistemas Digitais: Princípios e Aplicações - Ronald J. Tocci"],
      practice: [
        {
          question:
            "Por que a memória do seu PC (DRAM) precisa fazer 'refresh' o tempo todo, enquanto a memória do cache (SRAM) não precisa?",
          answer:
            "A DRAM guarda a memória como minúsculas gotas de carga em capacitores microscópicos, que vazam energia e apagam com o tempo. Por isso, a placa-mãe precisa recarregar (refresh) essas cargas milhares de vezes por segundo. Já a SRAM usa flip-flops montados com transistores que seguram o bit firme enquanto a energia estiver ligada, mas custam muito mais caro.",
        },
      ],
      links: [],
    },
    {
      id: "dispositivos_programaveis_cpld_fpga",
      label: "Dispositivos Programáveis (CPLD e FPGA)",
      group: 9,
      status: "pending",
      description:
        "Chips 'em branco' superpoderosos que podem se transformar em qualquer placa eletrônica que você quiser. Em vez de comprar fios e portas lógicas, você programa o chip para reconectar seus componentes internos em frações de segundo.",
      examples: [
        "Matrizes Programáveis (PLDs e CPLDs)",
        "A Revolução das FPGAs",
        "Tabelas de Busca (LUTs) baseadas em Memória",
        "Sistemas Embutidos dentro de um Chip (SoC)",
      ],
      books: ["Sistemas Digitais: Princípios e Aplicações - Ronald J. Tocci"],
      practice: [
        {
          question:
            "Como uma FPGA moderna consegue imitar o comportamento de portas lógicas complexas sem ter portas lógicas fixas de verdade desenhadas no seu silício?",
          answer:
            "As FPGAs usam Tabelas de Busca (LUTs), que são como micro memórias RAM super rápidas. Em vez de calcular a lógica, elas recebem a tabela-verdade do seu projeto. Quando você injeta sinais nos pinos, esses sinais funcionam como 'endereços' que buscam a resposta já pronta na RAM, dando a ilusão de um hardware operando.",
        },
      ],
      links: [],
    },
    {
      id: "linguagens_hdl",
      label: "Linguagens de Descrição de Hardware (HDL)",
      group: 9,
      status: "pending",
      description:
        "Como programar processadores do zero. Em vez de desenhar milhões de fios e portas lógicas em um diagrama, ensina a usar linguagens de código (como VHDL e Verilog) para descrever e simular o que o chip deve fazer.",
      examples: [
        "O Padrão da Indústria (VHDL e Verilog)",
        "Programação Sequencial vs Comportamento Concorrente",
        "Simulação de Testes Funcionais",
        "O Processo de Síntese em Portas Reais",
      ],
      books: ["Sistemas Digitais: Princípios e Aplicações - Ronald J. Tocci"],
      practice: [
        {
          question:
            "Qual a grande diferença de mentalidade entre escrever código em C (para software) e escrever código em VHDL (para hardware) com relação à execução do tempo?",
          answer:
            "No software tradicional como C, o código roda de forma sequencial (uma linha inteira tem que acabar para a de baixo rodar). No VHDL, as linhas não descrevem ações, descrevem cabos elétricos reais. Por isso a execução é 'concorrente': todas as linhas rodam ao mesmo tempo e em paralelo, simulando os fios energizados simultaneamente no hardware real.",
        },
      ],
      links: [],
    },
    {
      id: "interface_mundo_analogico",
      label: "Interface Analógico-Digital",
      group: 9,
      status: "pending",
      description:
        "A ponte entre o mundo real e a máquina. Mostra como circuitos tradutores (Conversores ADCs e DACs) leem a nossa voz ou a luz (sinais reais) e as transformam em pacotes binários que o processador consegue entender.",
      examples: [
        "Conversores Analógico para Digital (ADC)",
        "Conversores Digital para Analógico (DAC)",
        "O Teorema de Amostragem (Taxa de Nyquist)",
        "Erros e Limites de Resolução Binária",
      ],
      books: ["Sistemas Digitais: Princípios e Aplicações - Ronald J. Tocci"],
      practice: [
        {
          question:
            "O que estabelece a regra sagrada do Teorema de Nyquist para podermos digitalizar uma música sem estragá-la, e o que ocorre se desrespeitarmos essa regra?",
          answer:
            "Nyquist diz que o ADC precisa 'bater fotos' do sinal de entrada em uma frequência que seja no mínimo o dobro da frequência mais alta que existe na música. Se desrespeitarmos a regra tirando poucas fotos, ocorre o fenômeno do 'Aliasing', onde notas altas e agudas viram ruídos fantasmas e notas graves que estragam completamente o áudio reconstruído.",
        },
      ],
      links: [],
    },
    // 11. Arquitetura de Computadores
    {
      id: "arquitetura_de_computadores",
      label: "Arquitetura de Computadores",
      group: 11,
      status: "pending",
      description:
        "A ponte entre o hardware elétrico e o software que usamos. Estuda como montar, organizar e medir o desempenho de um computador equilibrando velocidade, custo e consumo de energia.",
      examples: [
        "As Oito Grandes Ideias da Computação",
        "A Equação de Desempenho (Tempo = Instruções x CPI x Clock)",
        "A Lei de Moore e as Limitações Físicas",
      ],
      books: [
        "Organização e Projeto de Computadores - Patterson & Hennessy",
        "Structured Computer Organization - Andrew S. Tanenbaum",
      ],
      practice: [
        {
          question:
            "Como o desempenho real de uma CPU é calculado e quais fatores os arquitetos de hardware tentam equilibrar?",
          answer:
            "O tempo de CPU é o produto de três fatores: Contagem de Instruções do programa, o Número Médio de Ciclos por Instrução (CPI) e a Duração do Ciclo de Clock. Melhorar a arquitetura significa reduzir o CPI ou aumentar o clock, sempre tomando cuidado para não quebrar o limite térmico do chip.",
        },
      ],
      links: [],
    },
    {
      id: "tipos_computadores",
      label: "Classes e Tipos de Computadores",
      group: 11,
      status: "pending",
      description:
        "A classificação dos computadores de acordo com a finalidade de mercado. Mostra como o projeto do hardware muda drasticamente se o chip for usado em um relógio de pulso ou em um servidor do Google.",
      examples: [
        "Sistemas Embarcados e IoT",
        "Computadores Pessoais (Desktops, Smartphones)",
        "Servidores e Computação em Nuvem (Scale-out)",
        "Supercomputadores Científicos",
      ],
      books: ["Organização e Projeto de Computadores - Patterson & Hennessy"],
      practice: [
        {
          question:
            "Qual a grande diferença de foco no design entre o processador de um Servidor de Nuvem e o de um Sistema Embarcado (como um relógio inteligente)?",
          answer:
            "Os servidores focam no 'Throughput' (vazão), priorizando lidar com milhares de tarefas simultâneas, mesmo que isso custe caro e consuma muita energia. Já os sistemas embarcados focam primariamente na economia extrema de custo e bateria, sacrificando a velocidade bruta em favor da eficiência.",
        },
      ],
      links: [],
    },
    {
      id: "arquitetura_von_neumann",
      label: "Arquitetura Von Neumann",
      group: 11,
      status: "pending",
      description:
        "O modelo clássico em que praticamente todos os computadores baseiam-se hoje. O seu grande diferencial foi colocar tanto os dados do usuário quanto as instruções do programa dentro da mesma memória unificada.",
      examples: [
        "O Conceito de Programa Armazenado",
        "O Gargalo de Von Neumann",
        "O Ciclo Infinito de Busca e Execução",
      ],
      books: [
        "Structured Computer Organization - Andrew S. Tanenbaum",
        "Organização e Projeto de Computadores - Patterson & Hennessy",
      ],
      practice: [
        {
          question:
            "O que é o conhecido 'Gargalo de Von Neumann' e por que ele afeta a velocidade máxima de um processador?",
          answer:
            "O gargalo ocorre porque a CPU usa os mesmos fios (o mesmo barramento) para buscar tanto instruções quanto dados da memória. Como ela não consegue ler o próximo passo do programa e salvar um dado ao mesmo tempo, cria-se um 'engarrafamento' que deixa a CPU ociosa esperando a memória responder.",
        },
      ],
      links: [],
    },
    {
      id: "isa",
      label: "ISA (Arquitetura do Conjunto de Instruções)",
      group: 11,
      status: "pending",
      description:
        "A linguagem oficial que o processador entende. É o 'manual de regras' que faz a ponte entre o hardware e o software, definindo quais comandos matemáticos e de memória existem no chip.",
      examples: [
        "Modos de Endereçamento de Memória",
        "Tamanho da Palavra (Sistemas de 32-bit vs 64-bit)",
        "Formato do Opcode e dos Registradores",
      ],
      books: [
        "Organização e Projeto de Computadores - Patterson & Hennessy",
        "Structured Computer Organization - Andrew S. Tanenbaum",
      ],
      practice: [
        {
          question: "Por que a ISA é considerada a camada de abstração mais importante e crucial de toda a computação?",
          answer:
            "Porque ela garante a compatibilidade. Ela permite que empresas concorrentes (como Intel e AMD) construam os fios e os transistores internos das suas CPUs de forma totalmente diferente, mas, como ambos respeitam o mesmo manual de regras (a mesma ISA x86), o mesmo sistema operacional Windows roda nos dois.",
        },
      ],
      links: [],
    },
    {
      id: "assembly",
      label: "Linguagem Assembly",
      group: 11,
      status: "pending",
      description:
        "A forma textual do código de máquina. Em vez de obrigar o programador a escrever tudo com zeros e uns, o Assembly usa palavras curtas (como ADD, SUB, MOV) para representar as instruções do processador.",
      examples: [
        "Mnemônicos de Operação",
        "Diretivas do Montador (Assembler)",
        "Mapeamento e Tradução de Código C para Assembly",
      ],
      books: ["Organização e Projeto de Computadores - Patterson & Hennessy"],
      practice: [
        {
          question:
            "Qual é a relação direta entre o código escrito em linguagem Assembly e o Código Binário final executado pelo processador?",
          answer:
            "A relação é de exatamente 1-para-1. Diferente de linguagens de alto nível (como Python ou C), onde uma linha vira dezenas de instruções de máquina, cada linha escrita em Assembly corresponde a uma e apenas uma instrução binária física cravada no hardware da CPU.",
        },
      ],
      links: [],
    },
    {
      id: "isa_cisc_x86",
      label: "ISA CISC (Família x86)",
      group: 11,
      status: "pending",
      description:
        "Computadores com Conjunto Complexo de Instruções. A filosofia aqui é ter instruções muito poderosas, que façam o trabalho matemático e o acesso à memória na mesma linha, gerando programas pequenos em tamanho.",
      examples: [
        "A História da Arquitetura Intel x86 e AMD64",
        "Instruções com Tamanhos Variáveis (de 1 a 15 bytes)",
        "Foco na Alta Densidade de Código",
      ],
      books: ["Structured Computer Organization - Andrew S. Tanenbaum"],
      practice: [
        {
          question:
            "Historicamente, qual foi o grande motivo técnico que forçou a criação da arquitetura de processadores CISC?",
          answer:
            "Nas décadas de 70 e 80, as memórias RAM eram extremamente caras e minúsculas. A filosofia CISC foi criada para compactar o máximo de ações em uma única instrução poderosa, permitindo que os programas economizassem espaço na memória RAM, mesmo que isso deixasse os circuitos internos da CPU uma bagunça complexa.",
        },
      ],
      links: [],
    },
    {
      id: "isa_risc_arm",
      label: "ISA RISC (ARM, RISC-V)",
      group: 11,
      status: "pending",
      description:
        "Computadores com Conjunto Reduzido de Instruções. O foco vira o jogo: usa apenas instruções muito simples e todas do mesmo tamanho, o que facilita construir um hardware extremamente rápido e limpo.",
      examples: [
        "A Ascensão do Processador ARM (Smartphones/Apple Silicon)",
        "A Arquitetura Aberta RISC-V",
        "A Obrigatoriedade do Modelo Load-Store",
      ],
      books: ["Organização e Projeto de Computadores - Patterson & Hennessy"],
      practice: [
        {
          question:
            "Explique o que é a regra do modelo 'Load-Store', que é o pilar de construção obrigatório de qualquer processador RISC.",
          answer:
            "Significa separação de tarefas. No RISC, a CPU não tem permissão para fazer matemática olhando direto para a RAM. Ela é obrigada a usar a instrução 'Load' para trazer o dado da RAM para um registrador interno, fazer as contas, e só depois usar o 'Store' para salvar o resultado de volta na RAM.",
        },
      ],
      links: [],
    },
    {
      id: "cpu",
      label: "A Unidade Central de Processamento (CPU)",
      group: 11,
      status: "pending",
      description:
        "O verdadeiro cérebro da máquina. É a estrutura gigante que passa a vida repetindo três passos: busca uma instrução na memória, decifra o que ela quer fazer, e aciona os circuitos para executá-la.",
      examples: [
        "O Ciclo Fetch-Decode-Execute",
        "A Construção do Datapath (Caminho de Dados)",
        "A Função Vital do Registrador Program Counter (PC)",
      ],
      books: [
        "Organização e Projeto de Computadores - Patterson & Hennessy",
        "Structured Computer Organization - Andrew S. Tanenbaum",
      ],
      practice: [
        {
          question: "Qual é a função do registrador Program Counter (PC) na sobrevivência do sistema?",
          answer:
            "O Program Counter atua como um dedo apontando para a fila. Ele guarda o endereço de memória exato da próxima instrução que a CPU precisa buscar e executar. Logo que a instrução é pega, ele já é incrementado automaticamente para apontar para a linha seguinte.",
        },
      ],
      links: [],
    },
    {
      id: "cpu_ula",
      label: "Unidade Lógica e Aritmética (ULA/ALU)",
      group: 11,
      status: "pending",
      description:
        "O núcleo matemático da CPU. Um gigantesco emaranhado de portas lógicas que não tem inteligência, apenas obedece comandos para somar, subtrair, ou comparar duas palavras de bits.",
      examples: [
        "Hardware de Somadores e Subtratores",
        "Operações Lógicas Bit a Bit (AND, OR, XOR)",
        "Deslocadores de Bits (Shifters)",
        "A Geração das Flags de Status (Zero, Carry, Overflow)",
      ],
      books: ["Organização e Projeto de Computadores - Patterson & Hennessy"],
      practice: [
        {
          question:
            "Como a ULA interage com a CPU para permitir a execução de decisões condicionais do tipo 'IF' nos códigos?",
          answer:
            "A ULA tem um registrador chamado 'Flags'. Se o programa pede para comparar se A == B, a ULA faz A - B. Se o resultado for 0, ela não precisa salvar o resultado, mas levanta a bandeirinha (Flag) de 'Zero'. A unidade de controle lê essa flag e percebe que deve pular a execução do código (executando o IF).",
        },
      ],
      links: [],
    },
    {
      id: "cpu_uc",
      label: "Unidade de Controle (UC)",
      group: 11,
      status: "pending",
      description:
        "O maestro do processador. Ela não faz contas, mas lê o código da instrução e dispara dezenas de sinais elétricos que ativam a ULA, os registradores e a memória na hora exata.",
      examples: [
        "Controle Hardwired (Circuito Fixo)",
        "Controle Microprogramado (Software Interno)",
        "Controle de Sinais Seletores de Multiplexadores",
      ],
      books: [
        "Structured Computer Organization - Andrew S. Tanenbaum",
        "Organização e Projeto de Computadores - Patterson & Hennessy",
      ],
      practice: [
        {
          question:
            "Quais são as diferenças e os prós e contras entre projetar uma Unidade de Controle Hardwired ou Microprogramada?",
          answer:
            "A Hardwired é cravada fisicamente com portas lógicas de silício; é incrivelmente rápida, mas impossível de alterar depois de fabricada. A Microprogramada possui uma pequena memória ROM interna com 'microinstruções' rodando como um processador-dentro-do-processador; é pouca coisa mais lenta, mas extremamente flexível para atualizações de hardware e fácil de projetar.",
        },
      ],
      links: [],
    },
    {
      id: "cpu_clock",
      label: "Clock, Tempo e Sincronização",
      group: 11,
      status: "pending",
      description:
        "O oscilador eletrônico que funciona como o metrônomo do processador. Os pulsos de energia dão o ritmo para garantir que as correntes elétricas terminem de fluir antes do próximo passo.",
      examples: [
        "Frequência do Processador (GHz)",
        "Economia de Energia com Clock Gating",
        "Dissipação Dinâmica de Potência e Problemas Térmicos",
      ],
      books: ["Organização e Projeto de Computadores - Patterson & Hennessy"],
      practice: [
        {
          question:
            "Por que a indústria de hardware parou de aumentar loucamente a frequência do clock (GHz) ao redor dos anos 2000 para ganhar velocidade?",
          answer:
            "Devido ao 'Limite de Energia' (Power Wall). Para que os transistores suportassem velocidades cada vez mais altas, eles precisavam de mais voltagem, o que começou a gerar um calor exponencial. Passou a ser fisicamente impossível resfriar os processadores apenas com ar, forçando a mudança para os chips de múltiplos núcleos.",
        },
      ],
      links: [],
    },
    {
      id: "cpu_arquiteturas",
      label: "Microarquiteturas Avançadas e Pipelining",
      group: 11,
      status: "pending",
      description:
        "As grandes mágicas de engenharia feitas para executar várias instruções ao mesmo tempo dentro de um mesmo núcleo, sem aumentar a velocidade do clock.",
      examples: [
        "Pipeline (A Linha de Montagem da CPU)",
        "Riscos de Pipeline (Hazards de Dados e Controle)",
        "Execução Fora de Ordem (Out-of-Order Execution)",
        "Processadores Superescalares",
      ],
      books: ["Organização e Projeto de Computadores - Patterson & Hennessy"],
      practice: [
        {
          question:
            "Como a técnica de Pipelining aumenta o desempenho da CPU sem alterar a velocidade física dos componentes eletrônicos?",
          answer:
            "O Pipelining funciona como uma fábrica de carros. Em vez de a CPU fazer uma instrução inteira do começo ao fim para só depois puxar a próxima, o hardware é dividido em etapas. Assim, a CPU pode lavar, montar e pintar até 5 instruções diferentes ao mesmo tempo, entregando um resultado novo a cada batida do clock.",
        },
      ],
      links: [],
    },
    {
      id: "paralelismo_multiprocessadores",
      label: "Paralelismo e Multiprocessadores",
      group: 11,
      status: "pending",
      description:
        "Como conectar vários processadores para trabalharem juntos. Explora do processamento em vetor das placas de vídeo até a Lei de Amdahl, que dita o limite matemático de quanto um software consegue ficar mais rápido.",
      examples: [
        "Taxonomia de Flynn (SIMD, MIMD)",
        "Multicore e Memória Compartilhada",
        "Lei de Amdahl",
        "Coerência de Cache (Snooping)",
      ],
      books: ["Organização e Projeto de Computadores - Patterson & Hennessy"],
      practice: [
        {
          question:
            "O que diz a Lei de Amdahl sobre o limite de ganho de desempenho ao adicionarmos mais núcleos de processamento?",
          answer:
            "Ela prova que o ganho de velocidade de um programa não é infinito. Se um programa tem uma parte do código que é obrigada a rodar em sequência (onde um núcleo espera o outro terminar), essa parte será o gargalo. Mesmo que você tenha 1000 núcleos, o programa nunca será mais rápido do que a sua parte sequencial.",
        },
      ],
      links: [],
    },
    {
      id: "cpu_tipos",
      label: "Evolução e Tipos de Processadores",
      group: 11,
      status: "pending",
      description:
        "Mostra como o design da CPU evoluiu. Analisa as especializações físicas, indo desde processadores com muitos núcleos para uso diário, até placas de vídeo massivas desenhadas para hiper-paralelismo.",
      examples: [
        "A Transição para Multicore (Múltiplos Núcleos)",
        "Unidades de Processamento Gráfico (GPUs)",
        "Aceleradores Tensoriais e IA (TPUs/NPUs)",
      ],
      books: ["Computer Architecture: A Quantitative Approach - Hennessy & Patterson"],
      practice: [
        {
          question:
            "Qual foi o profundo impacto que os processadores Multicore causaram no universo da engenharia de software?",
          answer:
            "Até então, os programas ficavam mais rápidos sozinhos a cada ano. Com o Multicore, a CPU não ficou mais veloz, ela apenas ganhou mais 'cabeças'. Isso forçou toda a indústria de programação a reaprender a criar softwares paralelos e baseados em 'threads' (Multithreading) para dividir ativamente as tarefas entre os núcleos.",
        },
      ],
      links: [],
    },
    {
      id: "memoria",
      label: "O Subsistema de Memória",
      group: 11,
      status: "pending",
      description:
        "O amplo conjunto de tecnologias encarregadas de guardar a informação do computador, variando dos flip-flops que alimentam a ULA até os enormes discos que guardam o sistema operacional.",
      examples: [
        "Espaços e Limites de Endereçamento",
        "Mapeamento de Bits e Palavras",
        "Organização de Bytes (Big-Endian vs Little-Endian)",
      ],
      books: [
        "Organização e Projeto de Computadores - Patterson & Hennessy",
        "Structured Computer Organization - Andrew S. Tanenbaum",
      ],
      practice: [
        {
          question:
            "O que significa dizer, na arquitetura de um computador, que a memória principal é 'endereçável a byte'?",
          answer:
            "Significa que o processador designa um endereço de localização único e individual para cada pacote mínimo de 8 bits (1 Byte). Se o computador quiser buscar ou alterar apenas um byte solto da memória, o hardware consegue isolar perfeitamente essa menor fatia.",
        },
      ],
      links: [],
    },
    {
      id: "hierarquia_memoria",
      label: "A Hierarquia de Memória",
      group: 11,
      status: "pending",
      description:
        "A genial organização em formato de pirâmide. O computador finge ter uma memória gigante e incrivelmente rápida colocando chips caros e pequenos no topo, e memórias massivas e baratas na base.",
      examples: [
        "A Ilusão de Velocidade e Tamanho Infinitos",
        "A Importância do Princípio da Localidade Temporal",
        "A Importância do Princípio da Localidade Espacial",
        "O Funcionamento da Memória Virtual",
      ],
      books: ["Organização e Projeto de Computadores - Patterson & Hennessy"],
      practice: [
        {
          question:
            "Como os princípios da 'Localidade' salvam o desempenho da máquina e fazem a pirâmide de memória funcionar na prática?",
          answer:
            "A localidade prova matematicamente que o processador não acessa dados de forma aleatória. A Localidade Temporal dita que um dado lido agora provavelmente será lido de novo em breve. A Localidade Espacial dita que se o programa leu o dado X, vai logo ler o vizinho X+1. O hardware se aproveita disso copiando os dados 'prediletos' para o topo veloz da pirâmide (caches), escondendo completamente a lentidão brutal das bases.",
        },
      ],
      links: [],
    },
    {
      id: "memoria_principal",
      label: "Memória Principal (RAM)",
      group: 11,
      status: "pending",
      description:
        "O imenso espaço de trabalho volátil do computador. É aqui que os arquivos parados do disco ganham vida e passam a ser dados ativos prontos para o processador manipular.",
      examples: [
        "Tecnologia DRAM (A Célula de Capacitor e Transistor)",
        "A Necessidade do Ciclo de Refresh",
        "Módulos Físicos DIMM, DDR e Taxas de Transferência",
      ],
      books: ["Organização e Projeto de Computadores - Patterson & Hennessy"],
      practice: [
        {
          question:
            "Apesar de a SRAM ser incrivelmente mais rápida, por que usamos a tecnologia DRAM para construir os pentes de memória principal do computador?",
          answer:
            "Uma célula SRAM precisa de cerca de 6 transistores para gravar 1 bit, ocupando muito espaço. A DRAM usa um projeto engenhoso de apenas 1 transistor e 1 capacitor minúsculo por bit. Isso permite que as empresas de hardware espremam bilhões de bits (Gigabytes) em um único chip baratíssimo, compensando a velocidade com custo e densidade insanos.",
        },
      ],
      links: [],
    },
    {
      id: "caches_niveis",
      label: "Memórias Cache (L1, L2, L3)",
      group: 11,
      status: "pending",
      description:
        "As guardiãs da CPU. Memórias minúsculas, caras e puramente de SRAM de altíssima velocidade grudadas no processador. A função exclusiva delas é interceptar a RAM principal para evitar que a CPU fique esperando.",
      examples: [
        "Políticas de Mapeamento (Direto, Associativo)",
        "Taxa de Acertos (Hit Rate) e Penalidade de Falhas (Miss Penalty)",
        "Hierarquia Multi-Level (Caches L1, L2 e L3 Compartilhada)",
      ],
      books: ["Organização e Projeto de Computadores - Patterson & Hennessy"],
      practice: [
        {
          question:
            "Por que a engenharia divide o chip em 3 níveis de cache (L1, L2, L3) em vez de construir uma única cache L1 gigante para caber de tudo?",
          answer:
            "O limite é puramente físico e elétrico. Caches grandes possuem fios mais compridos e circuitos decodificadores complexos; a eletricidade demora mais para cruzar o chip e a memória fica lerda. A L1 é minúscula propositalmente para conseguir devolver a resposta na mesma batida do clock da CPU. Se a L1 errar, o hardware escala a busca para a L2, que é média, e depois para a gigantesca L3.",
        },
      ],
      links: [],
    },
    {
      id: "armazenamento_secundario",
      label: "Armazenamento Secundário (HDs e SSDs)",
      group: 11,
      status: "pending",
      description:
        "A base gorda, lenta e persistente da pirâmide. Guarda todos os programas, o sistema operacional e as fotos do usuário indefinidamente, mesmo quando o sistema é totalmente desenergizado da tomada.",
      examples: [
        "Discos Rígidos Magnéticos (HDDs Mecânicos)",
        "A Revolução do Estado Sólido (SSDs com Memória Flash NAND)",
        "Tempos de Acesso Físico (Atraso Rotacional e Tempo de Busca)",
      ],
      books: ["Structured Computer Organization - Andrew S. Tanenbaum"],
      practice: [
        {
          question:
            "Qual é a penalidade de desempenho fatal que afasta os Discos Rígidos clássicos (HDDs) da pirâmide eletrônica do PC?",
          answer:
            "Eles não são eletrônicos, mas sim dispositivos físicos mecânicos. O HDD possui motores reais: ele gasta tempo movendo a agulha de metal fisicamente pelo disco (Tempo de Busca) e esperando a fita magnética girar até a posição do laser (Atraso Rotacional). Os SSDs mataram essas latências de partes móveis processando os dados através de transistores retentores em túnel.",
        },
      ],
      links: [],
    },
    {
      id: "entrada_saida",
      label: "O Sistema de Entrada e Saída (I/O)",
      group: 11,
      status: "pending",
      description:
        "O porto de contato entre o cérebro da máquina e o mundo humano e de periféricos. É uma arquitetura focada em compatibilizar a CPU absurdamente rápida com impressoras e placas lentas e assíncronas.",
      examples: [
        "Gargalos Clássicos de I/O",
        "Controladores Especializados de Dispositivos",
        "O Mecanismo de Mapeamento de I/O em Memória (Memory-Mapped I/O)",
      ],
      books: [
        "Structured Computer Organization - Andrew S. Tanenbaum",
        "Organização e Projeto de Computadores - Patterson & Hennessy",
      ],
      practice: [
        {
          question:
            "Como funciona o truque arquitetural do Memory-Mapped I/O que permite que a CPU comande periféricos usando comandos comuns?",
          answer:
            "O hardware reserva blocos falsos de endereços na mesma tabela da memória RAM e os liga aos aparelhos. A CPU acha que está salvando um arquivo em uma posição de memória RAM (Store Word). Na verdade, o Controlador de I/O 'sequestra' a mensagem elétrica endereçada àquele número específico e encaminha a ação direto para uma placa de vídeo ou rede, sem que a CPU perceba a diferença.",
        },
      ],
      links: [],
    },
    {
      id: "barramentos_interrupcoes",
      label: "Barramentos, Interrupções e DMA",
      group: 11,
      status: "pending",
      description:
        "A logística nervosa do trânsito de dados do PC. Estuda como as vias de fios são organizadas, como os componentes ganham prioridade de fala e como aparelhos pedem socorro para a CPU processá-los.",
      examples: [
        "A Ineficiência do Sistema Polling (Votação)",
        "Linhas de Requisição de Interrupção de Hardware (IRQ)",
        "Controladores DMA (Acesso Direto à Memória)",
      ],
      books: ["Structured Computer Organization - Andrew S. Tanenbaum"],
      practice: [
        {
          question:
            "Qual é a tremenda vantagem técnica de colocar um controlador de DMA no barramento ao transferir um vídeo pesado do disco rígido para a RAM?",
          answer:
            "Se não houvesse o DMA, a CPU seria forçada a agir como operária, gastando milhares de ciclos de clock apenas buscando bytes no disco e levando um por um para a RAM. O controlador DMA é um chip autônomo que avisa a CPU 'deixa que eu copio'. A CPU terceiriza o serviço pesado e fica totalmente livre para processar jogos ou navegar na web, até o DMA avisar via interrupção que terminou a cópia.",
        },
      ],
      links: [],
    },
    {
      id: "dispositivos_io",
      label: "Dispositivos Periféricos",
      group: 11,
      status: "pending",
      description:
        "A classificação lógica dos aparelhos finais instalados nas pontas do computador de acordo com o modo exato em que recebem e empacotam o fluxo de zeros e uns.",
      examples: [
        "Dispositivos Orientados a Bloco (HDDs, Flash)",
        "Dispositivos Orientados a Caractere (Mouses, Teclados, Linha Serial)",
        "Aparelhos de Interface de Rede (NICs e Wi-Fi)",
      ],
      books: ["Structured Computer Organization - Andrew S. Tanenbaum"],
      practice: [
        {
          question:
            "Sob a perspectiva da arquitetura de entrada e saída, qual a distinção vital entre um dispositivo orientado a Bloco e um dispositivo orientado a Caractere?",
          answer:
            "Dispositivos orientados a Bloco (como um SSD) agrupam os dados em pedaços de tamanho fixo com endereços próprios; você pode navegar por eles, pedir para ler a parte final e depois pular para a inicial. Dispositivos orientados a Caractere (como um teclado ou mouse) geram apenas um fluxo contínuo de fluxo de bytes (streaming) que vai numa direção só, não existe a possibilidade de você pedir para o teclado 'retransmitir a letra A que eu digitei ontem'.",
        },
      ],
      links: [],
    },
    // 12. Sistemas Operacionais
    {
      id: "sistemas_operacionais",
      label: "Sistemas Operacionais",
      group: 12,
      status: "pending",
      description:
        "O software mestre que atua como tradutor e gerente geral. Ele esconde toda a fiação e complexidade da placa-mãe criando uma 'máquina virtual' limpa e fácil de usar, enquanto divide de forma justa a CPU, a RAM e o disco entre todos os programas abertos.",
      examples: [
        "Sistemas Famosos: Windows, GNU/Linux, macOS, Android e iOS",
        "O Conceito de Máquina Estendida (Abstração)",
        "Gerenciamento e Multiplexação de Recursos",
        "Evolução dos Sistemas (Monolíticos a Micronúcleos)",
      ],
      books: ["Sistemas Operacionais Modernos - Andrew S. Tanenbaum & Herbert Bos"],
      practice: [
        {
          question: "Quais são as duas funções principais e conceitualmente distintas de um Sistema Operacional?",
          answer:
            "1) Prover uma abstração de máquina estendida (ou máquina virtual) para os programadores, ocultando a complexidade do hardware real por trás de interfaces simples. 2) Atuar como um gerenciador de recursos, controlando o tempo e o espaço de CPUs, memórias, discos e redes para que vários programas rodem de forma segura e eficiente sem um atropelar o outro.",
        },
      ],
      links: [],
    },
    {
      id: "kernel_so",
      label: "Núcleo do Sistema (Kernel)",
      group: 12,
      status: "pending",
      description:
        "O coração do sistema operacional. É a porção de código que fica carregada na memória RAM o tempo todo e possui poder absoluto e irrestrito sobre a máquina. É ele quem decide qual programa usa o processador e quando.",
      examples: ["Núcleos Monolíticos (Linux/Windows)", "Micronúcleos (Minix, QNX)", "Isolamento e Segurança Básica"],
      books: ["Sistemas Operacionais Modernos - Andrew S. Tanenbaum & Herbert Bos"],
      practice: [
        {
          question:
            "Qual a diferença arquitetural básica entre um design de kernel Monolítico e uma arquitetura baseada em Microkernel?",
          answer:
            "No Monolítico, praticamente todas as funções (escalonador, gerência de memória, drivers de disco e vídeo) rodam juntas em um único grande arquivo dentro do espaço protegido, o que é rápido, mas vulnerável a falhas catastróficas. No Microkernel, o núcleo é minúsculo; componentes como drivers rodam fora do núcleo, como programas comuns. É muito mais estável (se o driver de vídeo travar, a máquina não dá tela azul), mas tem perda de desempenho na comunicação.",
        },
      ],
      links: [],
    },
    {
      id: "modo_usuario_kernel",
      label: "Modos de Execução",
      group: 12,
      status: "pending",
      description:
        "A barreira de segurança construída fisicamente no chip do processador. O computador é dividido em Modo Usuário (onde os programas rodam em uma 'caixa de areia' sem poder danificar o hardware) e Modo Kernel (permissão total).",
      examples: [
        "Anéis de Proteção da CPU (Ring 0 e Ring 3 em x86)",
        "Instruções Privilegiadas de Máquina",
        "Exceções de Proteção e Violações",
      ],
      books: ["Sistemas Operacionais Modernos - Andrew S. Tanenbaum & Herbert Bos"],
      practice: [
        {
          question:
            "Como o hardware da CPU impede que um programa malicioso escrito pelo usuário formate o disco diretamente ou desligue as proteções do sistema?",
          answer:
            "O processador usa um bit especial de 'Modo de Execução'. Programas comuns rodam em Modo Usuário. Se um código tentar acionar um comando perigoso do hardware (instrução privilegiada), o chip bloqueia a ação na hora, congela o programa e avisa o Kernel através de uma falha (trap). O Kernel então mata o programa invasor.",
        },
      ],
      links: [],
    },
    {
      id: "chamadas_de_sistema",
      label: "Chamadas de Sistema (System Calls)",
      group: 12,
      status: "pending",
      description:
        "O 'guichê de atendimento' do sistema. Como os programas normais estão presos no Modo Usuário e não podem tocar na placa-mãe, eles usam essas chamadas para pedir educadamente ao Kernel que salve um arquivo ou acesse a internet por eles.",
      examples: [
        "Padrão POSIX (fork, read, write, open)",
        "Interrupções por Software (INT 0x80, SYSCALL)",
        "Vetores de Chamadas e Mudança de Contexto",
      ],
      books: ["Sistemas Operacionais Modernos - Andrew S. Tanenbaum & Herbert Bos"],
      practice: [
        {
          question:
            "Descreva a mecânica de hardware e baixo nível que ocorre quando um programa comum executa uma Chamada de Sistema para ler um arquivo.",
          answer:
            "O programa prepara o pedido nos registradores da CPU e executa uma instrução especial de 'interrupção de software' (como SYSCALL). O chip muda fisicamente para o Modo Kernel e desvia o controle para uma área trancada do sistema. O Kernel lê o pedido, faz a leitura do disco de forma segura, entrega os dados e usa uma instrução de retorno para devolver a CPU ao Modo Usuário, devolvendo o controle ao programa.",
        },
      ],
      links: [],
    },
    {
      id: "tratamento_de_interrupcoes",
      label: "Tratamento de Interrupções",
      group: 12,
      status: "pending",
      description:
        "O sistema de alarme da máquina. Se você clicar o mouse, o hardware envia um choque que pausa a CPU imediatamente. O SO atende essa interrupção, anota o clique e devolve a CPU para o que estava fazendo antes.",
      examples: [
        "Rotinas de Serviço de Interrupção (ISR)",
        "Vetores de Interrupção de Hardware",
        "Salvar e Restaurar Contexto (Registradores)",
      ],
      books: ["Sistemas Operacionais Modernos - Andrew S. Tanenbaum & Herbert Bos"],
      practice: [
        {
          question:
            "Por que as rotinas do SO que tratam interrupções de hardware (ISRs) devem ser projetadas para serem extremamente curtas e rápidas?",
          answer:
            "Porque enquanto uma interrupção física está sendo atendida, a CPU costuma 'ficar surda' temporariamente para outras interrupções. Se a rotina demorar muito, o sistema pode perder sinais rápidos e vitais vindo de outros lugares (como dados chegando na placa de rede a Gigabit), causando lentidão ou perda de dados.",
        },
      ],
      links: [],
    },
    {
      id: "device_drivers",
      label: "Device Drivers",
      group: 12,
      status: "pending",
      description:
        "Os manuais de instrução dos periféricos. Como o SO não sabe a língua de todas as impressoras ou placas de vídeo do mundo, os drivers são pequenos códigos injetados no Kernel que ensinam o sistema a comandar os chips elétricos corretos.",
      examples: [
        "Ocultamento de Complexidade de Placas",
        "Drivers de Controladoras de Disco (SATA/NVMe)",
        "Independência de Dispositivo",
      ],
      books: ["Sistemas Operacionais Modernos - Andrew S. Tanenbaum & Herbert Bos"],
      practice: [
        {
          question:
            "Como o conceito de Device Driver ajuda a manter a 'independência de dispositivo' dentro do Sistema Operacional?",
          answer:
            "O SO define comandos universais (ex: 'leia 10 bytes do dispositivo'). O driver serve como tradutor: ele recebe esse comando padrão e o transforma na bagunça de tensões e registradores exatos que a placa daquele fabricante específico exige. Isso impede que os criadores do Windows ou Linux tenham que reescrever o Kernel a cada mouse novo que for lançado.",
        },
      ],
      links: [],
    },
    {
      id: "sistemas_de_arquivos",
      label: "Sistemas de Arquivos",
      group: 12,
      status: "pending",
      description:
        "A biblioteca lógica do sistema operacional. Transforma os bilhões de setores e trilhas confusas do disco rígido em uma estrutura elegante e familiar de pastas, diretórios e nomes de arquivos que os usuários conseguem entender e organizar.",
      examples: ["Estruturas FAT e NTFS", "Inodes e Links (Hard vs Simbólico)", "Jornalização (Journaling)"],
      books: ["Sistemas Operacionais Modernos - Andrew S. Tanenbaum & Herbert Bos"],
      practice: [
        {
          question:
            "Como um i-node (index-node) gerencia os arquivos em sistemas operacionais baseados em UNIX (como o Linux)?",
          answer:
            "O i-node é o 'RG' do arquivo. Ele não guarda o nome ou o conteúdo do arquivo, mas sim os metadados vitais: quem é o dono, as permissões, tamanho e, mais importante, o mapa exato com os blocos físicos do HD onde o arquivo está guardado.",
        },
      ],
      links: [],
    },
    {
      id: "escalonamento_de_processos",
      label: "Escalonamento de Processos",
      group: 12,
      status: "pending",
      description:
        "O relógio de ponto da CPU. O Escalonador é o algoritmo que escolhe qual programa vai rodar no processador e por quantos milissegundos. Ele troca os programas tão rápido que cria a ilusão de que tudo roda ao mesmo tempo.",
      examples: [
        "Algoritmo Round-Robin (Chaveamento Circular)",
        "Prioridades Dinâmicas e Multicomputação",
        "Preempção via Relógio de Hardware (Timer)",
      ],
      books: ["Sistemas Operacionais Modernos - Andrew S. Tanenbaum & Herbert Bos"],
      practice: [
        {
          question: "O que diferencia um algoritmo de escalonamento Preemptivo de um Não-Preemptivo (Cooperativo)?",
          answer:
            "No Não-Preemptivo, um programa ganha a CPU e só devolve se ele quiser (ou se terminar). Se ele travar, a máquina inteira trava. No Preemptivo, o SO usa um alarme de hardware. Quando o tempo do programa acaba (quantum), o SO interrompe o programa à força, chuta ele para o final da fila e bota o próximo para rodar, garantindo justiça para todos.",
        },
        {
          question:
            "Por que uma fatia de tempo (quantum) muito pequena ou muito grande prejudica o desempenho em um algoritmo como o Round-Robin?",
          answer:
            "Se a fatia for de 1 milissegundo, a CPU vai passar mais tempo guardando e abrindo arquivos de configuração para trocar de programa do que executando o programa de fato (Desperdício por Overhead). Se a fatia for de 1 segundo, o computador deixa de parecer rápido, o mouse engasga e os programas dão a sensação de tela travada.",
        },
      ],
      links: [],
    },
    {
      id: "gerenciamento_de_threads",
      label: "Gerenciamento de Threads",
      group: 12,
      status: "pending",
      description:
        "A divisão de trabalho dentro de um mesmo programa. Uma 'Thread' é como um braço do processo. Ela permite que um editor de texto use um braço para salvar o arquivo no disco enquanto o outro braço continua aceitando a sua digitação.",
      examples: [
        "Threads a Nível de Usuário vs Nível de Kernel",
        "Compartilhamento de Memória entre Threads",
        "Trocas de Contexto Leves (Baixo Overhead)",
      ],
      books: ["Sistemas Operacionais Modernos - Andrew S. Tanenbaum & Herbert Bos"],
      practice: [
        {
          question:
            "Qual a vantagem de desempenho em se utilizar múltiplas Threads dentro de um processo em vez de abrir múltiplos Processos totalmente separados?",
          answer:
            "Todos os processos são fortemente isolados uns dos outros. Quando a CPU troca de um processo para outro, ela tem que esvaziar tabelas de memória virtuais e recarregar os escudos de proteção. Como todas as threads do mesmo processo habitam exatamente o mesmo espaço de memória, a CPU consegue trocar entre elas quase que instantaneamente, com muito menos custo.",
        },
        {
          question:
            "Explique o problema fatal de usar uma biblioteca de Threads a nível de Usuário (onde o Kernel não sabe que as threads existem) ao ler o disco rígido.",
          answer:
            "Como o Kernel não enxerga as threads, ele vê aquele programa inteiro como um bloco só. Se apenas uma daquelas threads for ler o disco rígido (o que congela para esperar a resposta mecânica), o Kernel assume que o programa inteiro travou e bloqueia o processo. Assim, todas as outras threads do programa vão parar de rodar junto, paralisando o app à toa.",
        },
      ],
      links: [],
    },
    {
      id: "condicoes_de_corrida",
      label: "Condições de Corrida",
      group: 12,
      status: "pending",
      description:
        "O caos do trabalho em equipe desorganizado. Acontece quando duas threads mexem na mesma variável ou arquivo exatamente no mesmo microssegundo. Uma apaga a conta matemática da outra e o resultado fica corrompido e imprevisível.",
      examples: [
        "Inconsistência de Dados em Bancos Globais",
        "Regiões Críticas e Exclusão Mútua",
        "Problemas com a Intercalação de Instruções em Assembly",
      ],
      books: ["Sistemas Operacionais Modernos - Andrew S. Tanenbaum & Herbert Bos"],
      practice: [
        {
          question:
            "Por que uma linha de código simples como `cont++` pode gerar uma Condição de Corrida se executada por duas threads simultaneamente sem proteção?",
          answer:
            "Porque para a CPU, o `cont++` exige três passos: 1) Puxar o valor da RAM. 2) Somar +1. 3) Gravar na RAM. Se a Thread A puxar o número (ex: 5) mas for pausada pelo SO logo em seguida, a Thread B vai puxar o mesmo 5, somar e salvar 6. Depois a Thread A acorda, soma seu 5 e também salva 6. Um incremento inteiro sumiu no ar.",
        },
      ],
      links: [],
    },
    {
      id: "deadlocks",
      label: "Impasses (Deadlocks)",
      group: 12,
      status: "pending",
      description:
        "O 'abraço da morte' dos computadores. É um travamento total e sem volta onde o Programa A segura o HD e espera a Placa de Rede, e o Programa B segura a Placa de Rede e espera o HD. Como nenhum solta, os dois congelam para sempre.",
      examples: [
        "As Quatro Condições de Coffman",
        "Grafos de Alocação de Recursos",
        "Prevenção, Detecção e O Algoritmo do Avestruz",
      ],
      books: ["Sistemas Operacionais Modernos - Andrew S. Tanenbaum & Herbert Bos"],
      practice: [
        {
          question:
            "Quais são as Quatro Condições de Coffman que precisam acontecer ao mesmo tempo para que um Deadlock seja possível?",
          answer:
            "1) Exclusão Mútua: o recurso não pode ser dividido. 2) Posse e Espera: o programa já tem um recurso e pede outro. 3) Não-Preempção: o SO não pode roubar um recurso à força de um programa. 4) Espera Circular: A espera B, que espera C, que espera A, fechando o ciclo do travamento.",
        },
        {
          question:
            "O que ensina a estratégia do 'Algoritmo do Avestruz' abordada por Tanenbaum para lidar com deadlocks?",
          answer:
            "Assim como a lenda do avestruz que enfia a cabeça na areia, o algoritmo dita a estratégia de ignorar totalmente o problema. O raciocínio é que programar antivírus de deadlock deixa a máquina lenta o tempo todo. Se o travamento só acontece 1 vez por ano num computador caseiro, é mais fácil ignorar e apenas mandar o usuário reiniciar a máquina quando der azar.",
        },
      ],
      links: [],
    },
    {
      id: "gerenciamento_de_memoria",
      label: "Gerenciamento de Memória",
      group: 12,
      status: "pending",
      description:
        "O zelador e segurança do espaço eletrônico. O SO cataloga quais partes da RAM estão vazias para abrir novos programas e constrói escudos virtuais para impedir que o navegador invada ou apague os dados do antivírus.",
      examples: [
        "Registradores Físicos de Base e Limite",
        "Alocação Contígua e Fragmentação",
        "Swapping (Trocando com o Disco)",
      ],
      books: ["Sistemas Operacionais Modernos - Andrew S. Tanenbaum & Herbert Bos"],
      practice: [
        {
          question:
            "Como os registradores de hardware 'Base' e 'Limite' atuam na proteção da memória nos sistemas mais primitivos?",
          answer:
            "O registrador 'Base' grava em que endereço da RAM o programa começa, e o 'Limite' diz o tamanho dele. Cada vez que o programa tenta acessar a memória, a placa-mãe confirma se ele não está tentando ler nada fora do seu 'Limite'. Se ele tentar ler a memória do vizinho, o hardware emite um sinal de erro e derruba o programa invasor na mesma hora.",
        },
      ],
      links: [],
    },
    {
      id: "memoria_virtual",
      label: "Memória Virtual",
      group: 12,
      status: "pending",
      description:
        "A maior mágica dos sistemas operacionais. O sistema mente para os programas, fingindo que cada um deles é o dono absoluto de uma RAM gigantesca de 64 GB, quando na verdade, o SO fatia os programas em blocos na RAM física e no HD.",
      examples: [
        "O Chip MMU (Unidade de Gerenciamento de Memória)",
        "Tradução de Endereço Lógico para Endereço Físico",
        "Tratamento de Falha de Página (Page Fault)",
      ],
      books: ["Sistemas Operacionais Modernos - Andrew S. Tanenbaum & Herbert Bos"],
      practice: [
        {
          question: "Qual o papel da MMU no hardware e o que ocorre quando ela detecta um bit de presença em zero?",
          answer:
            "A MMU é o tradutor físico que transforma o endereço ilusório (Virtual) que o programa gerou no endereço real e físico onde a placa de RAM guardou a informação. Se o bit estiver zerado, significa que aquele pedaço do programa foi jogado no Disco Rígido para economizar espaço. A MMU pausa a instrução, chama o SO (gerando um Page Fault) para ele buscar o pedaço no HD e jogar na RAM antes de continuar.",
        },
      ],
      links: [],
    },
    {
      id: "paginacao",
      label: "Paginação",
      group: 12,
      status: "pending",
      description:
        "O principal método para fazer a Memória Virtual funcionar. Divide a memória falsa do programa e a memória RAM real em blocos rigorosamente do mesmo tamanho (Páginas), permitindo que o SO brinque de Lego encaixando as peças onde quiser.",
      examples: [
        "A Tabela de Páginas do SO",
        "O Chip de Cache TLB (Translation Lookaside Buffer)",
        "O Colapso da Hiperpaginação (Thrashing)",
      ],
      books: ["Sistemas Operacionais Modernos - Andrew S. Tanenbaum & Herbert Bos"],
      practice: [
        {
          question:
            "Como a CPU usa o buffer TLB (Translation Lookaside Buffer) para não deixar a Paginação do SO destruir a velocidade da máquina?",
          answer:
            "Como o 'mapa' que ensina qual página virtual vai pra qual gaveta física fica guardado dentro da própria RAM, a CPU teria que ir na RAM duas vezes para cada coisa que fizesse, deixando o PC 2x mais lento. A TLB é um chip de cache grudado na CPU que decora o mapa. Se a tradução estiver na TLB, o processador vai direto ao ponto em 1 ciclo de clock.",
        },
        {
          question:
            "O que define a ocorrência do pesadelo do 'Thrashing' (Hiperpaginação) em sistemas operacionais modernos?",
          answer:
            "Ocorre quando você abre programas demais e a soma da memória que todos eles precisam usar a cada segundo excede o tamanho físico do seu pente de RAM. O SO entra em desespero e gasta 100% da força da máquina jogando coisas no HD e puxando para a RAM. A máquina para de processar os seus aplicativos e passa a vida tentando gerenciar a memória sem sucesso, travando tudo.",
        },
      ],
      links: [],
    },
    {
      id: "segmentacao",
      label: "Segmentação",
      group: 12,
      status: "pending",
      description:
        "Um modelo alternativo para gerenciar a memória virtual. Em vez de usar blocos travados do mesmo tamanho como a Paginação faz, ela divide o programa de acordo com as funções da programação (um pedaço para o código, outro só para as variáveis).",
      examples: [
        "Segmentos de Texto, Dados e BSS",
        "Tabelas Locais e Globais (LDT/GDT em processadores x86)",
        "O Retorno do Problema de Fragmentação Externa",
      ],
      books: ["Sistemas Operacionais Modernos - Andrew S. Tanenbaum & Herbert Bos"],
      practice: [
        {
          question: "Qual a diferença de visão básica entre o modelo de Paginação e o modelo de Segmentação?",
          answer:
            "A Paginação corta a memória como uma folha quadriculada fria: os blocos são todos de 4KB, o que otimiza o hardware mas destrói a lógica do código (uma mesma função C++ pode ficar cortada no meio). A Segmentação corta os blocos sob medida (segmentos dinâmicos), espelhando com perfeição a organização que o programador fez, mas cria o problema de 'esburacar' a RAM física com blocos de tamanhos diferentes.",
        },
      ],
      links: [],
    },
    // 13. Redes de Computadores
    {
      id: "redes_de_computadores",
      label: "Redes de Computadores",
      group: 13,
      status: "pending",
      description:
        "A espinha dorsal da internet. Estuda como interligar computadores isolados para trocar informações através de um conjunto de regras e camadas, permitindo que um celular no Brasil acesse perfeitamente um servidor no Japão.",
      examples: ["O Modelo OSI", "A Pilha TCP/IP", "Redes Locais (LAN) e Globais (WAN)"],
      books: ["Redes de Computadores - Andrew S. Tanenbaum", "Computer Networking - Kurose & Ross"],
      practice: [
        {
          question: "Por que o estudo de redes de computadores é dividido em 'Camadas' (como o Modelo OSI ou TCP/IP)?",
          answer:
            "A divisão em camadas serve para 'dividir e conquistar' um problema muito complexo. Cada camada resolve apenas um pedaço do problema (ex: a camada física cuida da eletricidade, a de rede cuida do caminho) e esconde a complexidade das outras. Isso permite que você atualize o Wi-Fi para Fibra Óptica sem precisar reescrever o código do Google Chrome.",
        },
      ],
      links: [],
    },
    {
      id: "modelo_osi",
      label: "O Modelo OSI",
      group: 13,
      status: "pending",
      description:
        "A estrutura teórica de 7 camadas criada pela ISO. Embora quase ninguém use o OSI puro na prática hoje, ele é o modelo didático universal usado para explicar como as redes dividem problemas complexos em pedaços menores.",
      examples: [
        "As 7 Camadas (Física à Aplicação)",
        "O Conceito de Encapsulamento (Bonecas Russas)",
        "Diferença entre Serviço, Interface e Protocolo",
      ],
      books: ["Redes de Computadores - Andrew S. Tanenbaum"],
      practice: [
        {
          question: "Qual é a diferença entre um Protocolo e uma Interface no contexto do Modelo OSI?",
          answer:
            "Um Protocolo é o conjunto de regras matemáticas que a Camada 'N' de uma máquina usa para conversar com a mesma Camada 'N' do computador do outro lado do mundo (comunicação horizontal). Uma Interface é a forma como a Camada 'N' entrega o pacote para a camada imediatamente abaixo dela dentro do mesmo computador (comunicação vertical).",
        },
      ],
      links: [],
    },
    {
      id: "modelo_tcp_ip",
      label: "O Modelo TCP/IP",
      group: 13,
      status: "pending",
      description:
        "A arquitetura prática e enxuta que venceu a guerra das normas e construiu a internet real. Foca menos no rigor acadêmico do OSI e mais na sobrevivência militar e na eficiência de repasse de pacotes.",
      examples: [
        "As 4 Camadas Originais do DoD",
        "Fusão das Camadas de Sessão, Apresentação e Aplicação",
        "A Falha Prática das Normas OSI",
      ],
      books: ["Computer Networking - Kurose & Ross"],
      practice: [
        {
          question:
            "Por que o modelo TCP/IP fundiu as camadas de Sessão e Apresentação do OSI diretamente na camada de Aplicação?",
          answer:
            "Os criadores do TCP/IP perceberam que nem todo aplicativo precisa abrir sessões complexas ou traduzir dados nativamente na rede. Eles deixaram a infraestrutura da internet mais 'burra' e rápida, passando a responsabilidade de criptografar ou gerenciar sessões inteiramente para o código do programador que está criando o aplicativo.",
        },
      ],
      links: [],
    },
    {
      id: "camada_fisica_redes",
      label: "Camada Física",
      group: 13,
      status: "pending",
      description:
        "A camada 1 do modelo OSI. Trata da transmissão de bits brutos por um canal de comunicação, envolvendo voltagens, temporização, feixes de luz e pinagem de cabos.",
      examples: ["Cabos Ethernet", "Frequências de Rádio", "Hubs Repetidores"],
      books: ["Redes de Computadores - Andrew S. Tanenbaum"],
      practice: [
        {
          question: "A Camada Física entende o conceito de pacotes e IPs?",
          answer:
            "Não. A camada física enxerga e transmite apenas sinais puros (pulsos elétricos ou luz) que representam zeros e uns brutos, sem ter qualquer ideia do significado, começo ou fim dessa informação.",
        },
      ],
      links: [],
    },
    {
      id: "meios_de_transmissao",
      label: "Meios de Transmissão",
      group: 13,
      status: "pending",
      description:
        "Os canais físicos pelos quais a informação trafega: fios de cobre (par trançado/coaxial), fibras ópticas e espectro eletromagnético (sem fio).",
      examples: ["Cabo UTP (CAT6)", "Fibra Óptica Monomodo", "Wi-Fi (Ondas de Rádio)"],
      books: ["Redes de Computadores - Andrew S. Tanenbaum"],
      practice: [
        {
          question: "Qual a principal vantagem da transmissão por fibras ópticas em relação aos cabos de cobre?",
          answer:
            "A fibra óptica transmite usando luz, o que a torna totalmente imune a interferências eletromagnéticas (como motores e antenas próximas), além de possuir uma largura de banda monumentalmente maior para longas distâncias.",
        },
      ],
      links: [],
    },
    {
      id: "modulacao_e_sinais",
      label: "Modulação e Sinais",
      group: 13,
      status: "pending",
      description:
        "O processo de converter dados digitais do computador em sinais físicos, variando propriedades como amplitude, frequência ou fase de uma onda para representar informações na vida real.",
      examples: ["Modulação QAM", "Baud Rate", "Sinal Analógico vs Digital"],
      books: ["Redes de Computadores - Andrew S. Tanenbaum"],
      practice: [
        {
          question: "O que é largura de banda (bandwidth) em termos de sinais físicos?",
          answer:
            "É a faixa de frequências que pode ser transmitida pelo canal sem que o sinal sofra degradação excessiva. Canais físicos com maior largura de banda conseguem abrigar e transmitir mais dados simultaneamente.",
        },
      ],
      links: [],
    },
    {
      id: "camada_de_enlace",
      label: "Camada de Enlace",
      group: 13,
      status: "pending",
      description:
        "A camada 2 do modelo OSI. Pega os bits soltos que chegam da camada física e os organiza em caixas estruturadas chamadas Quadros (Frames), garantindo a entrega do pacote entre duas máquinas conectadas diretamente.",
      examples: ["Quadros Ethernet", "Switches (Camada 2)", "Topologia Estrela"],
      books: ["Redes de Computadores - Andrew S. Tanenbaum", "Computer Networking - Kurose & Ross"],
      practice: [
        {
          question: "Qual equipamento clássico de rede opera primariamente na camada de enlace?",
          answer:
            "O Switch. Ele lê os endereços MAC contidos nos quadros para enviá-los de forma inteligente apenas para a porta específica onde o computador de destino está conectado.",
        },
      ],
      links: [],
    },
    {
      id: "subcamada_mac",
      label: "Subcamada MAC",
      group: 13,
      status: "pending",
      description:
        "Media Access Control. O 'guarda de trânsito' da camada de enlace que lida com regras de acesso a meios compartilhados, decidindo quem pode falar e quando, caso vários PCs usem o mesmo cabo ou rede Wi-Fi.",
      examples: ["Endereço MAC", "CSMA/CD (Ethernet)", "CSMA/CA (Wi-Fi)"],
      books: ["Redes de Computadores - Andrew S. Tanenbaum"],
      practice: [
        {
          question:
            "O que acontece se dois computadores transmitirem sinais simultaneamente no mesmo canal compartilhado?",
          answer:
            "Ocorre uma colisão de dados, o que corrompe o sinal elétrico ou de rádio no ar. A subcamada MAC possui regras matemáticas rígidas para detectar o acidente, calar os computadores e forçá-los a retransmitir em frações de segundos diferentes.",
        },
      ],
      links: [],
    },
    {
      id: "vlans",
      label: "VLANs (Redes Locais Virtuais)",
      group: 13,
      status: "pending",
      description:
        "A técnica da Camada de Enlace que permite fatiar um único Switch físico em vários switches lógicos isolados. Utilizado para separar e trancar o tráfego de diferentes departamentos (ex: RH e Financeiro) por segurança.",
      examples: [
        "Segmentação de Tráfego de Broadcast",
        "Protocolo IEEE 802.1Q (VLAN Tagging)",
        "Portas de Acesso (Access) vs Portas Tronco (Trunk)",
      ],
      books: ["Redes de Computadores - Andrew S. Tanenbaum"],
      practice: [
        {
          question:
            "O que acontece ao cabeçalho do Quadro Ethernet quando utilizamos o protocolo 802.1Q para configurar VLANs num cabo tronco?",
          answer:
            "O switch rasga o cabeçalho original do quadro Ethernet e insere lá no meio uma 'Etiqueta' (Tag) de 4 bytes. Esta etiqueta contém um ID numérico, permitindo que os pacotes de diferentes redes virtuais viajem misturados no mesmo cabo e sejam separados corretamente quando chegam ao próximo switch.",
        },
      ],
      links: [],
    },
    {
      id: "placa_de_rede_nic",
      label: "Placa de Rede (NIC)",
      group: 13,
      status: "pending",
      description:
        "O componente de hardware físico instalado na placa-mãe que conecta o computador à rede. Atua convertendo os dados lógicos presentes na memória RAM em sinais elétricos, ópticos ou de rádio.",
      examples: ["NIC Ethernet", "Adaptador Wi-Fi (WLAN)", "Transceiver"],
      books: ["Redes de Computadores - Andrew S. Tanenbaum"],
      practice: [
        {
          question: "Qual identificador único global vem gravado a laser no chip da placa de rede de fábrica?",
          answer:
            "O Endereço MAC (Media Access Control). É o endereço físico real da placa, formado por 48 bits, que garante que nenhum outro hardware no mundo tenha a mesma 'placa' de identificação.",
        },
      ],
      links: [],
    },
    {
      id: "dma_acesso_direto",
      label: "DMA (Direct Memory Access)",
      group: 13,
      status: "pending",
      description:
        "Mecanismo autônomo que permite que hardwares pesados, como a placa de rede Gigabit, transfiram enormes arquivos da internet direto para a memória RAM, sem precisar pedir para a CPU fazer o trabalho manual.",
      examples: ["Controlador DMA", "Técnica Zero-copy", "Redução de Interrupções na CPU"],
      books: ["Redes de Computadores - Andrew S. Tanenbaum", "Computer Networking - Kurose & Ross"],
      practice: [
        {
          question:
            "Por que o uso do DMA na Placa de Rede é vital para salvar o computador de travamentos na internet moderna?",
          answer:
            "Se a CPU precisasse ser interrompida para copiar cada byte que chega em uma rede de 1 Gbps, ela ficaria 100% ocupada apenas movendo dados da placa para a RAM e a máquina inteira travaria. O DMA funciona como um caminhão terceirizado que entrega os pacotes silenciosamente e só avisa a CPU quando a carga inteira já está pronta na memória.",
        },
      ],
      links: [],
    },
    {
      id: "deteccao_correcao_erros",
      label: "Detecção e Correção de Erros",
      group: 13,
      status: "pending",
      description:
        "A matemática embutida no final do pacote de dados que permite ao PC receptor descobrir se a mensagem sofreu interferência eletromagnética durante a viagem, evitando abrir arquivos corrompidos.",
      examples: ["CRC (Cyclic Redundancy Check)", "Bit de Paridade", "Checksum IP"],
      books: ["Redes de Computadores - Andrew S. Tanenbaum"],
      practice: [
        {
          question: "Qual a diferença de abordagem entre a detecção de erro e a correção de erro?",
          answer:
            "A detecção (como o CRC) apenas avisa matematicamente que o pacote chegou corrompido, forçando o hardware a jogá-lo no lixo e pedir para retransmitir. A correção contém muita matemática redundante extra enviada junto com o arquivo, permitindo que a placa tente adivinhar e consertar os zeros e uns estragados sem ter que pedir tudo de novo.",
        },
      ],
      links: [],
    },
    {
      id: "camada_de_rede",
      label: "Camada de Rede",
      group: 13,
      status: "pending",
      description:
        "A camada 3 do modelo OSI (o carteiro global). É ela a responsável por fornecer o mapa da internet inteira, escolhendo e roteando os pacotes através de um labirinto de países e redes até o destino final.",
      examples: ["Datagramas", "Roteadores", "Endereçamento Lógico (Subredes)"],
      books: ["Redes de Computadores - Andrew S. Tanenbaum", "Computer Networking - Kurose & Ross"],
      practice: [
        {
          question: "Qual é o principal dispositivo de hardware do mundo que atua e vive na Camada de Rede?",
          answer:
            "O Roteador. Diferente do switch que só conhece sua rede local, o roteador é o dispositivo que lê o endereço IP global, analisa a malha mundial e escolhe a melhor rua para atirar o pacote na direção do destinatário.",
        },
      ],
      links: [],
    },
    {
      id: "protocolo_ip_v4_v6",
      label: "Protocolo IP (IPv4 e IPv6)",
      group: 13,
      status: "pending",
      description:
        "A essência absoluta da internet. Cria o CEP eletrônico global (Endereço IP) para que pacotes viagem pelo globo através de um esforço não-confiável ('melhor esforço'), sem prometer que o pacote vai chegar perfeito.",
      examples: ["Endereço IPv4 (32 bits)", "Endereço IPv6 (128 bits)", "Campo TTL (Time to Live)"],
      books: ["Internetworking with TCP-IP - Douglas Comer", "TCP-IP Illustrated - W. Richard Stevens"],
      practice: [
        {
          question:
            "O protocolo IP garante sozinho que o datagrama chegará ao destino sem ser perdido no meio do caminho?",
          answer:
            "Não, nunca. O IP trabalha com serviço não confiável (best-effort). Se um roteador na Alemanha estiver congestionado, ele vai simplesmente jogar o seu pacote no lixo. Quem vai perceber isso e cuidar da retransmissão para garantir que nada falte é a Camada de Transporte acima dele (usando o TCP).",
        },
      ],
      links: [],
    },
    {
      id: "protocolo_arp",
      label: "Protocolo ARP",
      group: 13,
      status: "pending",
      description:
        "O tradutor entre a camada 3 (IP) e a camada 2 (MAC). Quando o PC sabe o IP do vizinho mas precisa descobrir o endereço de hardware da placa dele para enviar a carta na rede local, ele usa o ARP para 'gritar' na rede perguntando quem é dono daquele IP.",
      examples: ["Tabela Cache de ARP", "ARP Request (Broadcast) e ARP Reply (Unicast)"],
      books: ["TCP-IP Illustrated - W. Richard Stevens", "Internetworking with TCP-IP - Douglas Comer"],
      practice: [
        {
          question:
            "Por que um computador precisa fazer uma busca ARP se ele já sabe exatamente o endereço IP de destino que o usuário digitou?",
          answer:
            "Porque as placas de rede e os fios físicos não entendem os IPs da internet. O sistema operacional precisa descobrir qual é o Endereço MAC (físico) que o dono do IP possui para poder envelopar a carta elétricamente. Sem o MAC, a placa de rede não pode atirar nada no cabo local.",
        },
      ],
      links: [],
    },
    {
      id: "algoritmos_de_roteamento",
      label: "Algoritmos de Roteamento",
      group: 13,
      status: "pending",
      description:
        "O GPS da internet. Fórmulas e protocolos inteligentes (como OSPF e BGP) que permitem que os roteadores conversem entre si nos bastidores, avisando quais rotas estão caídas e recalculando o caminho mais rápido na hora.",
      examples: ["OSPF (Link-State)", "BGP (Border Gateway Protocol)", "Tabelas de Roteamento Dinâmicas"],
      books: ["Redes de Computadores - Andrew S. Tanenbaum", "Computer Networking - Kurose & Ross"],
      practice: [
        {
          question: "O que é e para que serve uma Tabela de Roteamento dentro de um Roteador Core?",
          answer:
            "É o banco de dados e o mapa interno do aparelho. Ela mapeia blocos de IPs de destino do mundo inteiro e diz exatamente para qual 'porta de saída' (next hop) do equipamento o pacote deve ser cuspido para se aproximar do seu destino final.",
        },
      ],
      links: [],
    },
    {
      id: "subredes_cidr",
      label: "Sub-redes e CIDR",
      group: 13,
      status: "pending",
      description:
        "A matemática do endereçamento IP. Ensina como fatiar grandes redes em redes menores (Subnetting) para organizar a topologia de uma empresa e evitar o desperdício brutal de endereços.",
      examples: ["Máscaras de Sub-rede", "Notação CIDR (/24, /16)", "Cálculo de IP de Broadcast e IP de Rede"],
      books: ["Computer Networking - Kurose & Ross", "Redes de Computadores - Andrew S. Tanenbaum"],
      practice: [
        {
          question: "Para que serve exatamente a Máscara de Sub-rede?",
          answer:
            "Serve para indicar matematicamente ao sistema qual a porção do endereço IP que identifica a 'Rua' (Rede) e qual a porção que identifica a 'Casa' (Dispositivo/Host). Isso permite à máquina saber se o destinatário está na mesma rede local ou se o pacote tem de ser atirado para o router.",
        },
      ],
      links: [],
    },
    {
      id: "nat_dhcp",
      label: "NAT e DHCP",
      group: 13,
      status: "pending",
      description:
        "Os salvadores do protocolo IPv4. O DHCP atua como um rececionista, distribuindo endereços IP automaticamente a quem entra na rede. O NAT atua como um tradutor, permitindo que uma rede inteira aceda à internet partilhando um único IP público.",
      examples: [
        "Tradução de Endereços de Rede (NAT)",
        "Servidor DHCP (Discover, Offer, Request, Acknowledge)",
        "IPs Privados vs IPs Públicos",
      ],
      books: ["Computer Networking - Kurose & Ross", "Internetworking with TCP-IP - Douglas Comer"],
      practice: [
        {
          question:
            "Como é que o NAT (Network Address Translation) impede o esgotamento dos endereços IPv4 da internet?",
          answer:
            "O NAT permite que milhares de dispositivos numa rede local (como na sua casa) usem IPs privados que não existem e não são válidos na internet. Quando os pacotes saem para a web, o router apaga o IP privado e coloca o seu único IP público válido como remetente, fazendo o processo inverso quando o site responde.",
        },
      ],
      links: [],
    },
    {
      id: "protocolo_icmp",
      label: "Protocolo ICMP",
      group: 13,
      status: "pending",
      description:
        "O sistema de diagnóstico e alerta da Camada de Rede. É utilizado pelos routers e sistemas operativos para reportar erros (como 'Destino Inacessível') e testar a saúde da conectividade.",
      examples: [
        "O Comando Ping (Echo Request/Reply)",
        "O Comando Traceroute",
        "Mensagens de Tempo Excedido (TTL Expired)",
      ],
      books: ["TCP-IP Illustrated - W. Richard Stevens", "Computer Networking - Kurose & Ross"],
      practice: [
        {
          question: "O comando 'Ping' utiliza portas TCP ou UDP para testar a ligação a um servidor?",
          answer:
            "Nenhum dos dois. O Ping não opera na Camada de Transporte. Ele envia pacotes de diagnóstico utilizando diretamente o protocolo ICMP (Internet Control Message Protocol), que viaja encapsulado puro no protocolo IP.",
        },
      ],
      links: [],
    },
    {
      id: "camada_de_transporte",
      label: "Camada de Transporte",
      group: 13,
      status: "pending",
      description:
        "A camada 4 do modelo OSI. Eleva a comunicação de um nível 'Máquina para Máquina' (que era o IP) para o nível 'Aplicativo para Aplicativo', criando o conceito de Portas Lógicas para que os dados achem a aba certa do seu programa.",
      examples: [
        "Segmentos (Pacotes da Camada 4)",
        "Portas Lógicas (Ex: Porta 80 HTTP, 22 SSH)",
        "Multiplexação de Aplicações",
      ],
      books: ["Redes de Computadores - Andrew S. Tanenbaum", "Computer Networking - Kurose & Ross"],
      practice: [
        {
          question:
            "Se chegam três pacotes da internet na sua máquina ao mesmo tempo, como o sistema operacional sabe qual deve ir para o Google Chrome e qual deve ir para o Discord?",
          answer:
            "Através do número da 'Porta' contido no cabeçalho da camada de Transporte. O SO atua como o síndico de um prédio: ele olha que o pacote veio destinado à Porta 80 ou 443 e entrega na mão do navegador, enquanto entrega os pacotes da porta de jogos direto para o Discord.",
        },
      ],
      links: [],
    },
    {
      id: "protocolos_tcp_udp",
      label: "Protocolos TCP e UDP",
      group: 13,
      status: "pending",
      description:
        "Os dois grandes chefes do transporte. O TCP é obcecado por garantia e ordem (mas é lerdo). O UDP não liga se pacotes se perderem pelo caminho, sendo absurdamente rápido e direto ao ponto.",
      examples: [
        "Three-way Handshake do TCP",
        "Streaming e Jogos em Tempo Real (UDP)",
        "Transferência e Download de Arquivos (TCP)",
      ],
      books: ["TCP-IP Illustrated - W. Richard Stevens", "Internetworking with TCP-IP - Douglas Comer"],
      practice: [
        {
          question: "O que acontece na cerimônia do 'Three-way Handshake' do TCP?",
          answer:
            "Antes de enviar qualquer arquivo real, o protocolo TCP exige a criação de uma conexão virtual entre os PCs. Eles trocam 3 mensagens rápidas (SYN -> SYN-ACK -> ACK) apenas para confirmar que os dois lados existem, estão ligados e prontos para conversar sem erros.",
        },
        {
          question:
            "Por que vídeos ao vivo, chamadas no Discord ou jogos de tiro em rede sempre preferem usar a tecnologia UDP em vez do confiável TCP?",
          answer:
            "Porque o TCP insiste em pausar tudo e reenviar o pacote se uma vírgula chegar danificada, gerando atrasos mortais ('lag') em tempo real. No UDP, é mil vezes melhor você perder um frame inútil do vídeo ou ter um pixel engasgado por 1 microssegundo do que pausar a tela de todo mundo esperando um reenvio do servidor.",
        },
      ],
      links: [],
    },
    {
      id: "controle_de_congestionamento",
      label: "Controle de Congestionamento",
      group: 13,
      status: "pending",
      description:
        "A inteligência embutida no TCP para frear as máquinas. Ele percebe quando roteadores mundiais estão engasgando de dados e manda o seu PC fazer o upload mais devagar para salvar a internet de um colapso catastrófico.",
      examples: ["Janela de Congestionamento (cwnd)", "Algoritmo Slow Start", "Recuperação após Pacotes Descartados"],
      books: ["TCP-IP Illustrated - W. Richard Stevens"],
      practice: [
        {
          question:
            "Como o protocolo TCP 'percebe' magicamente que ocorreu um engarrafamento e um congestionamento de trânsito em algum lugar no meio do planeta?",
          answer:
            "Principalmente pelos atrasos dos correios. Se os roteadores do caminho lotarem, eles descartam os pacotes extras. O TCP da sua máquina nota o silêncio e as ausências (timeouts) das mensagens de confirmação de entrega do destino (os ACKs), conclui que a rede entupiu e freia a própria velocidade de envio para ajudar a esvaziar os canos.",
        },
      ],
      links: [],
    },
    {
      id: "firewalls",
      label: "Firewalls",
      group: 13,
      status: "pending",
      description:
        "O porteiro de segurança da rede. Um sistema rigoroso que senta na porta de entrada da sua rede e intercepta os pacotes, bloqueando invasores de acordo com listas de IPs (Camada 3) e Portas (Camada 4) proibidas.",
      examples: ["Regras Iptables e UFW", "Política Default Deny", "Inspeção de Estado de Conexão"],
      books: ["Firewalls and Internet Security - William Cheswick & Steven Bellovin"],
      practice: [
        {
          question:
            "Na segurança de redes, o que dita a política de configuração de Firewall conhecida como 'Default Deny'?",
          answer:
            "É a lei número um de segurança: o Firewall é configurado para negar e bloquear absolutamente todo o tráfego do universo por padrão. O administrador então precisa ir até o sistema e criar exceções liberando estritamente as portinhas que o sistema usa para trabalhar (ex: porta 80 para a Web), deixando o resto lacrado.",
        },
      ],
      links: [],
    },
    {
      id: "pilha_tcp_ip",
      label: "A Pilha TCP/IP no Kernel",
      group: 13,
      status: "pending",
      description:
        "A implementação física das regras dos protocolos na forma de código da linguagem C puro embutido direto no coração do núcleo (Kernel) do Windows ou do Linux. É o pedaço vivo do SO que lê a memória RAM e monta o pacote de dados real.",
      examples: [
        "Processamento de Interrupções de Rede no SO",
        "O Espaço Protegido de Kernel",
        "Desencapsulamento de Datagramas",
      ],
      books: ["Internetworking with TCP-IP - Douglas Comer", "TCP-IP Illustrated - W. Richard Stevens"],
      practice: [
        {
          question:
            "Onde o processamento pesado de transformar dados em pacotes TCP e IP realmente ocorre dentro do computador?",
          answer:
            "Na esmagadora maioria dos sistemas modernos, todo o trabalho mental da pilha TCP/IP (colar cabeçalhos, calcular checksums, criar portas) roda via software dentro do Kernel do Sistema Operacional, consumindo esforço bruto do próprio processador principal, e não da placa de rede física.",
        },
      ],
      links: [],
    },
    {
      id: "sockets_api",
      label: "A Interface de Sockets",
      group: 13,
      status: "pending",
      description:
        "Os ganchos de programação. A API universal que permite aos programadores pedirem para o Sistema Operacional conectar a sua aplicação à internet sem que o programador precise saber como montar um cabeçalho IP manualmente.",
      examples: [
        "Berkeley Sockets",
        "As Funções Clássicas Bind(), Listen() e Accept()",
        "Sockets de Fluxo Contínuo vs Datagrama",
      ],
      books: ["Internetworking with TCP-IP - Douglas Comer", "Computer Networking - Kurose & Ross"],
      practice: [
        {
          question: "O que significa abrir um Socket na programação moderna de servidores e redes?",
          answer:
            "Um socket é o ponto lógico de terminação de um túnel de comunicação. Na prática, é uma 'porta virtual' que o programador aluga no sistema operacional; ele joga os dados dentro dessa porta e o Kernel se vira para empacotar e despachar os dados pelo cabo de rede até a máquina de destino.",
        },
      ],
      links: [],
    },
    {
      id: "camada_de_aplicacao",
      label: "Camada de Aplicação",
      group: 13,
      status: "pending",
      description:
        "A camada 7 do topo do modelo. Aqui os aplicativos deixam de se importar com cabos e IPs e se focam apenas na semântica humana: como formatar um e-mail legível, como renderizar a página Web ou como transferir um arquivo.",
      examples: ["Navegadores e Servidores Web", "Protocolo SMTP e IMAP (Emails)", "SSH (Terminais Remotos)"],
      books: ["Redes de Computadores - Andrew S. Tanenbaum", "Computer Networking - Kurose & Ross"],
      practice: [
        {
          question: "A camada de aplicação precisa ser avisada se o usuário trocou o cabo de rede por Wi-Fi?",
          answer:
            "Nunca. A camada de aplicação é uma camada de regras puramente em software. O seu cliente de e-mail (Outlook) entrega o e-mail formatado na mão do Socket do Sistema Operacional. Todo o trajeto infernal pelas camadas de IP, Mac e frequências do Wi-Fi até os servidores são completamente invisíveis para a aplicação.",
        },
      ],
      links: [],
    },
    {
      id: "dns",
      label: "DNS (Sistema de Nomes de Domínio)",
      group: 13,
      status: "pending",
      description:
        "O catálogo telefônico da internet. É o sistema distribuído que traduz nomes legíveis por humanos (como 'google.com') nos códigos matemáticos cruéis (Endereços IP) que os roteadores exigem para funcionar.",
      examples: [
        "Registros Base (A, AAAA, CNAME)",
        "Servidores Autoritativos e Raiz",
        "Caches de Resolução (ISP e SO)",
      ],
      books: ["DNS and Bind - Cricket Liu"],
      practice: [
        {
          question:
            "O que acontece fisicamente na rede da sua casa quando o seu provedor relata que o 'Servidor DNS caiu'?",
          answer:
            "A sua internet contínua fisicamente perfeita e rápida para coisas já conectadas. No entanto, o seu navegador não sabe e não tem a tabela de qual é o IP real por trás do nome 'instagram.com', então toda tentativa de acessar um site novo por nome falha e exibe erro de página.",
        },
      ],
      links: [],
    },
    {
      id: "protocolo_http",
      label: "Protocolo HTTP",
      group: 13,
      status: "pending",
      description:
        "A linguagem universal da Web (Hypertext Transfer Protocol). Foi criado para enviar páginas, mas acabou virando a base que movimenta desde Netflix até integrações em microsserviços via requisições verbosas.",
      examples: [
        "Semântica de Verbos (GET, POST, PUT, DELETE)",
        "Arquitetura REST",
        "Respostas Universais (Status Codes 200, 404, 500)",
      ],
      books: ["RESTful Web Services - Leonard Richardson & Sam Ruby"],
      practice: [
        {
          question:
            "O que significa o conceito técnico fundamental de afirmar que o protocolo HTTP é 'stateless' (sem estado)?",
          answer:
            "Significa que o HTTP sofre de amnésia de curto prazo. O servidor web trata cada pedido (um clique ou abertura de link) como um evento 100% isolado, esquecendo de tudo logo em seguida. Ele não possui memória técnica ou vínculo contínuo que relacione aquele pedido com o pedido que o usuário fez no segundo anterior.",
        },
      ],
      links: [],
    },
    {
      id: "http_headers",
      label: "HTTP Cabeçalhos (Headers)",
      group: 13,
      status: "pending",
      description:
        "Os metadados ocultos que vão anexados em toda conversa web. São linhas de texto que descrevem o que está sendo enviado (vídeo ou texto?), quem está enviando e qual a linguagem esperada.",
      examples: ["O cabeçalho mágico 'Content-Type'", "User-Agent e Accept", "Cabeçalhos de Autorização Bearer"],
      books: ["RESTful Web Services - Leonard Richardson & Sam Ruby"],
      practice: [
        {
          question:
            "Como o seu celular e o servidor da nuvem conseguem concordar se os bits de uma mensagem HTTP devem ser abertos como um PDF em tela cheia ou salvos como JSON invisível?",
          answer:
            "Sempre que um servidor atira dados no corpo da requisição, ele é obrigado a incluir o cabeçalho 'Content-Type' indicando o padrão MIME Type daquele objeto (ex: application/json ou application/pdf). Sem isso, o cliente receberia dados binários mortos e não saberia como renderizá-los.",
        },
      ],
      links: [],
    },
    {
      id: "cookies_sessoes",
      label: "Cookies e Sessões",
      group: 13,
      status: "pending",
      description:
        "A gambiarra brilhante que a indústria criou para contornar a amnésia natural do HTTP. Permite manter usuários autenticados em lojas e bancos exigindo que o navegador carregue crachás virtuais de identificação.",
      examples: ["A Ordem 'Set-Cookie'", "O Session ID criptografado", "Proteções HttpOnly contra roubo de tokens"],
      books: ["RESTful Web Services - Leonard Richardson & Sam Ruby"],
      practice: [
        {
          question:
            "Como a mecânica de pareamento entre o Cookie do navegador e a Sessão do banco de dados atua para te manter 'logado' no servidor?",
          answer:
            "O servidor salva dados pesados do seu perfil de maneira protegida nele mesmo (A Sessão). Ele então gera uma chave gigante (O Session ID) e anexa em um Cookie forçando o navegador a salvar isso. Em todos os cliques que você der a partir daí, o navegador anexará sozinho essa chave e o servidor, vendo o crachá, lembrará de resgatar o seu perfil específico.",
        },
      ],
      links: [],
    },
    {
      id: "ssl_tls_https",
      label: "SSL/TLS e HTTPS",
      group: 13,
      status: "pending",
      description:
        "A blindagem militar inserida no meio da pilha de redes (entre o TCP e o HTTP). Embaralha todos os dados trocados para que roteadores espiões no meio da rua enxerguem apenas ruído, provando a verdadeira identidade de sites bancários.",
      examples: [
        "A Fase Mágica do Handshake TLS",
        "Criptografia de Chaves Assimétricas",
        "Os Certificados Digitais Públicos (X.509)",
      ],
      books: ["Bulletproof SSL and TLS - Ivan Ristic"],
      practice: [
        {
          question:
            "Como um Certificado Digital associado à configuração TLS protege os usuários da internet de ataques de interceptação (Homem-no-Meio)?",
          answer:
            "O TLS não serve só para criptografar. O Certificado (assinado digitalmente por Autoridades Globais validadas) serve como um selo cartorário que atesta que o computador que está respondendo os dados é, de fato, a máquina dona do domínio real da instituição bancária, e não um falso intermediário criando páginas clone para roubar as senhas encriptadas.",
        },
      ],
      links: [],
    },
    {
      id: "proxy_reverso",
      label: "Servidores de Proxy Reverso",
      group: 13,
      status: "pending",
      description:
        "A muralha da aplicação web moderna. Um super servidor blindado de alta performance (como o NGINX) que recebe todos os tiros e tráfegos dos clientes e reencaminha educadamente apenas o que interessa para as aplicações escondidas da empresa.",
      examples: [
        "O Padrão da Indústria (NGINX / HAProxy)",
        "Terminação Bruta de Conexões SSL",
        "Ocultamento Total de Topologia Interna",
      ],
      books: ["Mastering NGINX - Dimitri Aivaliotis"],
      practice: [
        {
          question: "O que difere conceitualmente a utilidade prática do Proxy Clássico para o Proxy Reverso?",
          answer:
            "O Proxy Clássico (Forward) senta do lado dos funcionários de uma empresa; ele ajuda os clientes a acessarem sites externos mascarando seus IPs internos ou bloqueando redes sociais. O Proxy Reverso atua nas defesas dos datacenters; ele senta do lado dos servidores da empresa, recebendo os bilhões de acessos públicos que vêm de fora e repassando a carga limpa internamente.",
        },
      ],
      links: [],
    },
    {
      id: "load_balancing",
      label: "Load Balancing",
      group: 13,
      status: "pending",
      description:
        "A técnica de escalabilidade horizontal. Se o seu site ficou famoso e um único computador não aguenta os cliques, o Load Balancer distribui os usuários com perfeição matemática em cima de um exército de servidores gêmeos invisíveis.",
      examples: [
        "O Algoritmo de Repasse Circular (Round-Robin)",
        "Persistência e Afinidade de Sessão",
        "Health Checks Automatizados de Servidores (Ping)",
      ],
      books: ["Mastering NGINX - Dimitri Aivaliotis"],
      practice: [
        {
          question:
            "Como a rotina ativa de 'Health Checks' em um serviço de Load Balancer salva um e-commerce em dias críticos como Black Friday?",
          answer:
            "O Load Balancer passa o dia mandando chamadas pequenas (Ping ou HTTP) para saber se a frota inteira está saudável. Se um dos cinquenta servidores no fundo pegar fogo ou travar por sobrecarga de memória, o Load Balancer nota o erro na hora e remove aquela máquina temporariamente da lista de repasses, desviando clientes apenas para os que ainda estão de pé.",
        },
      ],
      links: [],
    },
    {
      id: "cdn",
      label: "CDN (Rede de Entrega de Conteúdo)",
      group: 13,
      status: "pending",
      description:
        "A cura para a latência das longas distâncias marítimas. Uma frota de datacenters espalhados em centenas de países que mantêm cópias congeladas das fotos e vídeos da sua aplicação nas cidades e bordas mais próximas dos usuários finais.",
      examples: [
        "Gigantes do Setor (Cloudflare, Akamai, AWS Cloudfront)",
        "Redução Agressiva da Latência de Borda (Edge Computing)",
        "Mitigação Nativa contra Ataques de Negação de Serviço (DDoS)",
      ],
      books: ["Content Delivery Networks - Rajkumar Buyya et al."],
      practice: [
        {
          question:
            "Por que o uso de uma CDN causa uma melhora de velocidade gigantesca para um brasileiro tentando acessar uma imagem em um site hospedado nos Estados Unidos?",
          answer:
            "Em vez de o clique do brasileiro ter que viajar pelos tubos de fibra óptica do oceano por milhares de quilômetros até Nova York buscando uma imagem pesada (o que gera centenas de milissegundos de atraso físico), a CDN já percebeu o hit e deixou a imagem copiada e guardada em um datacenter parceiro dentro de São Paulo. A entrega local vira instantânea.",
        },
      ],
      links: [],
    },
    {
      id: "protocolos_iot_mqtt",
      label: "Protocolos IoT (MQTT)",
      group: 13,
      status: "pending",
      description:
        "Protocolos ultraleves desenhados com parcimônia para internet das coisas. Ideal para chips baratos, baterias limitadas e conexões instáveis de roça que não aguentariam a complexidade dos protocolos tradicionais.",
      examples: ["Padrão Publish / Subscribe", "O Papel do Broker MQTT", "Telemetria de Sensores Leves"],
      books: ["Redes de Computadores - Andrew S. Tanenbaum"],
      practice: [
        {
          question:
            "Por que o modelo MQTT (baseado em um Broker central) é melhor para um sensor de agricultura movido a pilha do que montar uma conexão padrão HTTP?",
          answer:
            "O protocolo padrão da internet (HTTP) exige carregar cabeçalhos textuais gigantescos e fazer as 3 confirmações do TCP a cada segundo, esgotando a bateria de chips fracos e comendo todo o pacote de dados. O MQTT permite que o chip mantenha um 'tubo fino' aberto com o servidor, disparando mensagens cruas (eventos) apenas quando o valor lido muda de verdade.",
        },
      ],
      links: [],
    },
    {
      id: "ssh_protocolo",
      label: "Protocolo SSH",
      group: 13,
      status: "pending",
      description:
        "Secure Shell. É o túnel blindado da internet. Permite que você acesse e controle o terminal de um servidor Linux que está do outro lado do mundo de forma totalmente criptografada, impedindo que hackers roubem as suas senhas pelo caminho.",
      examples: [
        "Autenticação por Chaves Assimétricas (RSA/Ed25519)",
        "Porta Padrão 22",
        "Acesso a Instâncias na Nuvem (AWS EC2)",
      ],
      books: [
        "SSH, The Secure Shell: The Definitive Guide - Daniel J. Barrett",
        "Redes de Computadores - Andrew S. Tanenbaum",
      ],
      practice: [
        {
          question:
            "Por que a indústria de tecnologia abandonou o protocolo antigo 'Telnet' e passou a exigir o uso exclusivo do SSH para acessar servidores?",
          answer:
            "O Telnet era ingênuo: ele trafegava todos os comandos e senhas do administrador em texto puro pela rede. Qualquer pessoa conectada no mesmo Wi-Fi podia usar um 'Farejador' (Sniffer) para ler a sua senha. O SSH revolucionou a administração porque usa criptografia pesada de ponta a ponta; quem interceptar o sinal no meio do caminho verá apenas um ruído matemático incompreensível.",
        },
        {
          question: "Como funciona o login sem senha utilizando um Par de Chaves no SSH?",
          answer:
            "Você usa matemática para gerar duas chaves conectadas: uma Pública e uma Privada. Você copia a Pública e deixa guardada no servidor, e mantém a Privada trancada no seu computador. Quando você tenta logar, o servidor envia um desafio matemático que só pode ser resolvido por quem possui a Chave Privada. Se o seu PC responder certo, o acesso é liberado automaticamente sem precisar digitar senhas.",
        },
      ],
      links: [],
    },
    // 14. Linux e Servidores
    {
      id: "linux",
      label: "Linux e Servidores",
      group: 14,
      status: "pending",
      description:
        "O sistema operacional de código aberto baseado no Unix. É a espinha dorsal da internet: domina os servidores globais, data centers e atua como a fundação nativa onde a nuvem e os contêineres existem.",
      examples: [
        "Kernel Linux vs Distribuições (Ubuntu, CentOS)",
        "O Padrão de Arquivos (Tudo é um arquivo)",
        "Hierarquia FHS (/etc, /var, /home)",
      ],
      books: ["How Linux Works - Brian Ward", "Unix and Linux System Administration Handbook - Evi Nemeth"],
      practice: [
        {
          question: "Qual a diferença estrutural entre o 'Kernel Linux' e uma Distribuição Linux (Distro)?",
          answer:
            "O Kernel é apenas o núcleo central que conversa com o hardware. Uma Distribuição (como Ubuntu ou Debian) é o Kernel envelopado com utilitários GNU, drivers e gerenciadores de pacotes, formando um sistema completo e usável.",
        },
      ],
      links: [],
    },
    {
      id: "terminal_shell",
      label: "Terminal e Shell",
      group: 14,
      status: "pending",
      description:
        "A interface puramente textual (CLI) onde o usuário opera o sistema enviando comandos diretos. Permite uma administração de altíssima eficiência e velocidade, dispensando o uso de interfaces gráficas pesadas.",
      examples: [
        "Interpretadores (Bash, Zsh)",
        "Encanamento de Comandos (Pipes '|')",
        "Redirecionamento de Saída ('>', '>>')",
      ],
      books: ["The Linux Command Line - William Shotts", "Learning the bash Shell - Cameron Newham"],
      practice: [
        {
          question: "Para que serve o conceito de 'Pipe' (|) no terminal Linux?",
          answer:
            "O Pipe atua como uma linha de montagem de dados. Ele pega a saída de texto gerada pelo comando da esquerda e a injeta diretamente como a entrada do comando da direita (ex: 'ls -la | grep imagem'), combinando pequenos programas para fazer tarefas complexas.",
        },
      ],
      links: [],
    },
    {
      id: "bash_scripting",
      label: "Bash Scripting",
      group: 14,
      status: "pending",
      description:
        "A programação do dia a dia do administrador. Consiste em agrupar comandos do terminal em arquivos de texto utilizando lógica de programação (if, loops, variáveis) para automatizar rotinas do sistema.",
      examples: ["A linha Shebang (#!/bin/bash)", "Variáveis de Ambiente ($PATH)", "Automação com Cronjobs"],
      books: ["Classic Shell Scripting - Robbins & Beebe"],
      practice: [
        {
          question: "O que faz a linha 'Shebang' (#!/bin/bash) colocada no topo de um script?",
          answer:
            "O Shebang é um aviso para o Sistema Operacional. Ele indica exatamente qual programa (interpretador) o SO deve acordar e utilizar para ler e executar as linhas de texto daquele arquivo.",
        },
      ],
      links: [],
    },
    {
      id: "permissoes_linux",
      label: "Permissões Linux",
      group: 14,
      status: "pending",
      description:
        "O modelo de segurança e gestão do sistema de arquivos. Define rigorosamente quem possui o direito de Ler (Read), Escrever (Write) ou Executar (Execute) cada pasta e arquivo no disco.",
      examples: [
        "O Superusuário (Root) e o Sudo",
        "A Matriz UGO (User, Group, Others)",
        "Comandos de Gestão (chmod, chown)",
      ],
      books: ["Debian Administrator's Handbook - Raphaël Hertzog", "How Linux Works - Brian Ward"],
      practice: [
        {
          question: "Por que o comando 'chmod 777' é considerado uma grave falha de segurança em servidores?",
          answer:
            "O código '777' concede permissões totais de Leitura, Escrita e Execução simultaneamente para o Dono, para o Grupo e para Absolutamente Qualquer Outro usuário. Isso permite que qualquer invasor ou programa altere o arquivo livremente.",
        },
      ],
      links: [],
    },
    {
      id: "virtualizacao_hypervisors",
      label: "Virtualização (VMs)",
      group: 14,
      status: "pending",
      description:
        "A tecnologia que emula hardware físico através de software. O Hypervisor fatia a CPU e a RAM de um servidor gigante para rodar múltiplos Sistemas Operacionais simultâneos e isolados na mesma placa-mãe.",
      examples: [
        "O Papel do Hypervisor (VMM)",
        "Virtualização Tipo 1 (Bare-Metal) vs Tipo 2",
        "Snapshots e Isolamento",
      ],
      books: ["Virtual Machines - James Smith & Ravi Nair", "Virtualization Essentials - Matthew Portnoy"],
      practice: [
        {
          question: "Qual a diferença de desempenho entre um Hypervisor Tipo 1 e um Tipo 2?",
          answer:
            "O Tipo 1 (ex: VMware ESXi) é instalado diretamente no hardware físico, substituindo o SO e garantindo altíssimo desempenho. O Tipo 2 (ex: VirtualBox) é instalado como um programa dentro de um SO já existente (Windows/Linux), sendo mais prático para desktops, porém mais lento.",
        },
      ],
      links: [],
    },
    // 15. DevOps e Cloud Computing
    {
      id: "cultura_devops",
      label: "Cultura DevOps",
      group: 15,
      status: "pending",
      description:
        "A ponte entre o Desenvolvimento e a Operação de Infraestrutura. Metodologia focada em destruir as barreiras entre equipes através de colaboração e automação maciça para lançar softwares com velocidade e estabilidade.",
      examples: ["Os Três Caminhos do DevOps", "Infraestrutura Imutável", "Post-Mortems sem Culpa (Blameless)"],
      books: ["The Phoenix Project - Gene Kim et al.", "The DevOps Handbook - Gene Kim"],
      practice: [
        {
          question: "O que prega o conceito de 'Infraestrutura Imutável' em times DevOps?",
          answer:
            "Prega que um servidor em produção nunca deve ser consertado ou atualizado manualmente. Se houver um bug ou uma atualização, o servidor antigo é destruído e um novo, configurado do zero, é instanciado para substituí-lo.",
        },
      ],
      links: [],
    },
    {
      id: "git_versionamento",
      label: "Git & Versionamento",
      group: 15,
      status: "pending",
      description:
        "A máquina do tempo dos programadores. Um sistema de controle de versão distribuído que grava todas as edições feitas no código, permitindo viajar para o passado e colaborar sem apagar o trabalho do colega.",
      examples: [
        "Fluxo de Commit, Push e Pull",
        "Criação de Branches (Ramificações)",
        "Resolução de Conflitos (Merge Conflict)",
      ],
      books: ["Pro Git - Scott Chacon & Ben Straub"],
      practice: [
        {
          question: "Qual é a diferença funcional entre os comandos 'git commit' e 'git push'?",
          answer:
            "O 'commit' salva o estado do código localmente no disco rígido da sua máquina. O 'push' é a ação de rede que pega os seus commits locais e os envia para o repositório remoto (como o GitHub), atualizando o código para o resto da equipe.",
        },
      ],
      links: [],
    },
    {
      id: "github_fluxos",
      label: "GitHub & Fluxos de Trabalho",
      group: 15,
      status: "pending",
      description:
        "A plataforma social e colaborativa para hospedagem de código Git. Facilita o controle do projeto através de revisões de código, fóruns de discussão e automação de processos de aceitação.",
      examples: [
        "Revisão de Código (Code Review)",
        "O conceito de Pull Requests (PRs)",
        "Estratégias Gitflow e Trunk-based",
      ],
      books: ["GitHub for Dummies - Guthals & Haack"],
      practice: [
        {
          question: "No trabalho em equipe, para que serve a abertura de um 'Pull Request' (PR)?",
          answer:
            "O PR atua como um controle de qualidade. Ele paralisa o seu código novo, permitindo que outros programadores leiam, avaliem e aprovem as alterações antes que elas sejam fundidas (Merge) com a ramificação oficial do projeto que vai para produção.",
        },
      ],
      links: [],
    },
    {
      id: "containers_docker",
      label: "Contêineres (Docker)",
      group: 9,
      status: "pending",
      description:
        "A evolução ágil das VMs. Em vez de emular um hardware inteiro com um SO pesado, o Docker empacota apenas o seu programa e suas bibliotecas. Ele roda dividindo o Kernel hospedeiro, tornando-se ultraleve e rápido.",
      examples: ["A Receita do Dockerfile", "Imagem vs Contêiner", "Docker Compose para Ambientes Locais"],
      books: ["Docker Deep Dive - Nigel Poulton"],
      practice: [
        {
          question: "Por que um Contêiner Docker é muito mais rápido para inicializar que uma Máquina Virtual?",
          answer:
            "A VM precisa fazer o boot de um Sistema Operacional completo a cada inicialização, gastando muito tempo e RAM. O Contêiner não possui um SO próprio; ele age apenas como um processo isolado utilizando o Kernel do SO onde está rodando, inicializando em milissegundos.",
        },
      ],
      links: [],
    },
    {
      id: "orquestracao_k8s",
      label: "Kubernetes (K8s)",
      group: 15,
      status: "pending",
      description:
        "O maestro dos contêineres. Um sistema avançado que decide em quais servidores os contêineres Docker vão rodar, garantindo que eles se multipliquem automaticamente em caso de muitos acessos e recriando os que falharem.",
      examples: ["Pods (Unidade Mínima)", "Deployments e Services", "Auto-scaling (Escalabilidade)"],
      books: ["Kubernetes Up and Running - Hightower, Burns, Beda"],
      practice: [
        {
          question: "Se o Docker já executa os contêineres, qual a função vital do Kubernetes na produção?",
          answer:
            "O Docker gerencia o ciclo de vida de UM contêiner. O Kubernetes gerencia milhares deles operando em frota. Ele monitora a saúde, distribui o tráfego de rede entre eles e cuida da alta disponibilidade do sistema inteiro.",
        },
      ],
      links: [],
    },
    {
      id: "ci_cd_pipelines",
      label: "CI/CD (Pipelines)",
      group: 15,
      status: "pending",
      description:
        "A linha de montagem industrial do código. Automatiza o processo de Integração Contínua (compilar e testar o código assim que ele chega no Git) e Entrega Contínua (publicar no servidor automaticamente).",
      examples: ["GitHub Actions e Jenkins", "Execução de Testes Automatizados", "Estratégias de Deploy Seguro"],
      books: ["Continuous Delivery - Jez Humble & David Farley"],
      practice: [
        {
          question: "O que ocorre na fase de Integração Contínua (CI) de um Pipeline?",
          answer:
            "Assim que o desenvolvedor envia código para o repositório, o servidor inicia automaticamente a compilação do projeto e roda dezenas de testes de software para garantir que a atualização não possui bugs críticos.",
        },
      ],
      links: [],
    },
    {
      id: "aws_cloud",
      label: "Cloud Computing (AWS)",
      group: 15,
      status: "pending",
      description:
        "A terceirização maciça de datacenters. Em vez de comprar servidores físicos, as empresas alugam máquinas e serviços nas fazendas da Amazon, pagando por segundo de uso com a capacidade de escalar recursos de forma quase infinita.",
      examples: [
        "Modelos de Nuvem (IaaS, PaaS, SaaS)",
        "Regiões e Zonas de Disponibilidade (AZs)",
        "Modelo de Responsabilidade Compartilhada",
      ],
      books: ["AWS Certified Solutions Architect Study Guide - Ben Piper"],
      practice: [
        {
          question: "Na arquitetura da AWS, o que diferencia uma 'Região' de uma 'Zona de Disponibilidade' (AZ)?",
          answer:
            "Uma Região é uma área geográfica macro no globo (como Virgínia ou São Paulo). Uma AZ é um conjunto isolado de prédios de Datacenter dentro dessa região. Se um prédio (AZ) sofrer um apagão de energia, as outras AZs da mesma Região continuam sustentando os serviços.",
        },
      ],
      links: [],
    },
    {
      id: "aws_compute",
      label: "Computação na Nuvem (EC2/Lambda)",
      group: 15,
      status: "pending",
      description:
        "Os motores de processamento da Nuvem. Ofertam o aluguel de Máquinas Virtuais cruas e dedicadas (EC2) ou plataformas Serverless (Lambda), onde o desenvolvedor apenas roda o código e a nuvem cobra somente pelos milissegundos utilizados.",
      examples: ["Amazon EC2 (IaaS)", "AWS Lambda (Funções Serverless)", "Fargate (Containers sem servidor)"],
      books: ["Serverless Architectures on AWS - Peter Sbarski"],
      practice: [
        {
          question: "Qual é o desafio arquitetural conhecido como 'Cold Start' ao utilizar o AWS Lambda?",
          answer:
            "Como a AWS desliga a sua função Serverless quando ela não está em uso, a primeira invocação exige que a nuvem busque o código e inicie um ambiente do zero, causando um atraso momentâneo de milissegundos na resposta para o cliente,",
        },
      ],
      links: [],
    },
    {
      id: "aws_storage",
      label: "Armazenamento na Nuvem (S3/EBS)",
      group: 15,
      status: "pending",
      description:
        "As soluções para guardar dados indefinidamente. Variam desde discos rígidos virtuais anexados às máquinas (EBS) até baldes de armazenamento de objetos globais (S3) ideais para backups pesados e fotos de usuários.",
      examples: ["Amazon S3 (Buckets de Objetos)", "Amazon EBS (Discos em Bloco)", "Classes de Armazenamento Glacier"],
      books: ["Amazon S3 Cookbook - Namrith S."],
      practice: [
        {
          question: "Qual o caso de uso ideal para a classe de armazenamento 'S3 Glacier'?",
          answer:
            "O Glacier é projetado para arquivamento morto de longuíssimo prazo, onde o custo é muito baixo. A desvantagem é que a recuperação de um arquivo armazenado no Glacier pode demorar horas, não sendo útil para sites em tempo real.",
        },
      ],
      links: [],
    },
    {
      id: "aws_redes_vpc",
      label: "Redes Virtuais (VPC)",
      group: 15,
      status: "pending",
      description:
        "A infraestrutura de redes virtuais que permite isolar seus servidores em um datacenter privado dentro da nuvem. Define tabelas de roteamento, controle de tráfego e decide quais máquinas terão acesso à internet pública.",
      examples: ["Sub-redes Públicas e Privadas", "Internet Gateways e NAT Gateways", "Tabelas de Roteamento"],
      books: ["AWS Networking Cookbook - Satyajit Das"],
      practice: [
        {
          question: "O que diferencia uma Sub-rede Pública de uma Sub-rede Privada na nuvem AWS?",
          answer:
            "A diferença é a Tabela de Roteamento. A Sub-rede torna-se Pública quando possui uma rota direta apontando para um 'Internet Gateway' (IGW), permitindo acesso bidirecional com a web. A Sub-rede Privada não tem esse acesso direto, garantindo maior isolamento.",
        },
      ],
      links: [],
    },
    {
      id: "aws_servicos",
      label: "Ecossistema de Serviços AWS",
      group: 15,
      status: "pending",
      description:
        "O catálogo de componentes gerenciados prontos para uso. Fornece ferramentas como bancos de dados, envio de e-mails em massa e filas de mensagens sem que você precise instalar nada nos servidores manualmente.",
      examples: [
        "Filas de Mensagens (SQS) e Tópicos (SNS)",
        "Bancos de Dados Relacionais (RDS/Aurora)",
        "Serviço de DNS Global (Route 53)",
      ],
      books: ["AWS Administration - The Definitive Guide"],
      practice: [
        {
          question: "Na mensageria da AWS, qual a diferença entre o serviço SQS e o SNS?",
          answer:
            "O SQS é um serviço de Fila (pull): a mensagem fica guardada esperando que um único consumidor vá buscá-la. O SNS é um Tópico (push): ele envia ativamente a mesma mensagem de notificação para diversos assinantes simultaneamente.",
        },
      ],
      links: [],
    },
    {
      id: "seguranca_nuvem",
      label: "Segurança na Nuvem (IAM/WAF)",
      group: 15,
      status: "pending",
      description:
        "As chaves e os firewalls da nuvem. Onde regras estritas de identidade definem exatamente quais usuários ou sistemas podem criar recursos ou acessar dados sensíveis, garantindo a proteção da infraestrutura.",
      examples: [
        "Gerenciamento de Identidades (IAM)",
        "Security Groups (Firewalls de Instância)",
        "Princípio do Menor Privilégio",
      ],
      books: ["AWS Security - Dylan Shields"],
      practice: [
        {
          question: "O que dita o Princípio do Menor Privilégio no gerenciamento IAM?",
          answer:
            "Dita que cada usuário ou sistema deve receber estritamente apenas as permissões essenciais para realizar o seu trabalho. Se um sistema só precisa ler dados, ele jamais deve receber uma política que permita apagar arquivos no S3.",
        },
      ],
      links: [],
    },
    {
      id: "iac_terraform",
      label: "Infraestrutura como Código (IaC)",
      group: 15,
      status: "pending",
      description:
        "A revolução no provisionamento. Em vez de clicar em painéis, escrevem-se arquivos de texto declarativos descrevendo o Datacenter desejado. Ferramentas como o Terraform leem o arquivo e constroem tudo automaticamente na nuvem.",
      examples: [
        "O Padrão da Indústria HashiCorp Terraform",
        "Arquivos de Estado (State Files)",
        "Execuções Declarativas (Planejar e Aplicar)",
      ],
      books: ["Terraform: Up & Running - Yevgeniy Brikman"],
      practice: [
        {
          question: "O que significa dizer que o Terraform utiliza um formato 'Declarativo'?",
          answer:
            "Significa que você não escreve os passos exatos de como criar a infraestrutura. Você apenas declara o estado final desejado (ex: 'Quero 3 servidores'). O Terraform avalia a nuvem e deduz sozinho quais comandos aplicar para atingir esse objetivo.",
        },
      ],
      links: [],
    },
    {
      id: "monitoramento_observabilidade",
      label: "Monitoramento e Observabilidade",
      group: 15,
      status: "pending",
      description:
        "Os exames diagnósticos da infraestrutura. O Monitoramento avisa quando algo falhou (ex: 'CPU está em 100%'). A Observabilidade utiliza rastreamentos profundos e logs para permitir ao engenheiro descobrir por que a falha aconteceu.",
      examples: ["Métricas, Logs e Traces", "Amazon CloudWatch", "Prometheus e Grafana"],
      books: ["Site Reliability Engineering - Betsy Beyer et al."],
      practice: [
        {
          question: "Quais são os Três Pilares indispensáveis de dados para a Observabilidade de um sistema complexo?",
          answer:
            "Os três pilares são: 1) Métricas (números gerais, como uso de CPU em porcentagem). 2) Logs (eventos textuais emitidos pela aplicação). 3) Traces / Rastreamentos (o mapeamento do caminho de uma requisição trafegando através de vários microsserviços).",
        },
      ],
      links: [],
    },
  ],
  links: [
    // 0. Ligações entre os grupos
    // Matemática Discreta -> Sistemas Digitais
    { source: "logica_proposicional_e_quantificadores", target: "algebra_booleana" },
    // Matemática Discreta -> Redes de Computadores
    { source: "aritmetica_modular_e_teoria_dos_numeros", target: "ssl_tls_https" },
    { source: "aritmetica_modular_e_teoria_dos_numeros", target: "ssh_protocolo" },
    { source: "aritmetica_modular_e_teoria_dos_numeros", target: "deteccao_correcao_erros" },
    // Fundamentos da Eletricidade -> Circuitos Elétricos
    { source: "tensao_eletrica", target: "lei_de_ohm" },
    { source: "corrente_eletrica", target: "lei_de_ohm" },
    { source: "resistencia_eletrica", target: "lei_de_ohm" },
    { source: "efeito_joule", target: "circuitos_eletricos" },
    { source: "potencia_eletrica", target: "circuitos_eletricos" },
    { source: "lei_de_ohm", target: "circuitos_eletricos" },
    // Fundamentos da Eletricidade -> Eletrônica Geral
    { source: "condutores_isolantes", target: "semicondutores" },
    // Circuitos Elétricos -> Eletrônica Geral
    { source: "teoremas_thevenin_norton", target: "transistores_bjt" },
    { source: "teoremas_thevenin_norton", target: "transistores_fet" },
    { source: "divisor_de_tensao", target: "aplicacoes_diodos" },
    { source: "lei_das_malhas", target: "aplicacoes_diodos" },
    { source: "analise_de_circuitos", target: "amplificadores_bjt_mosfet" },
    { source: "senoides_e_fasores", target: "resposta_em_frequencia" },
    { source: "circuitos_segunda_ordem_rlc", target: "aplicacoes_amp_op" },
    // Eletrônica Geral -> Sistemas Digitais
    { source: "eletronica_geral", target: "sistemas_digitais" },
    // Circuitos Elétricos -> Sistemas Digitais
    { source: "circuitos_eletricos", target: "sistemas_digitais" },
    // Sistemas Digitais -> Arquitetura de Computadores
    { source: "sistemas_digitais", target: "arquitetura_de_computadores" },
    { source: "circuitos_combinacionais_msi", target: "cpu_ula" },
    { source: "maquinas_de_estado", target: "cpu_uc" },
    { source: "dispositivos_de_memoria", target: "hierarquia_memoria" },
    { source: "dispositivos_de_memoria", target: "memoria" },
    { source: "latches_flipflops", target: "caches_niveis" },
    // Arquitetura de Computadores -> Redes de Computadores
    { source: "dispositivos_io", target: "placa_de_rede_nic" },
    { source: "barramentos_interrupcoes", target: "dma_acesso_direto" },
    // Arquitetura de Computadores -> Sistemas Operacionais
    { source: "isa", target: "modo_usuario_kernel" },
    { source: "isa", target: "chamadas_de_sistema" },
    { source: "barramentos_interrupcoes", target: "tratamento_de_interrupcoes" },
    { source: "dispositivos_io", target: "device_drivers" },
    { source: "memoria_principal", target: "gerenciamento_de_memoria" },
    { source: "hierarquia_memoria", target: "memoria_virtual" },
    { source: "caches_niveis", target: "paginacao" },
    { source: "armazenamento_secundario", target: "sistemas_de_arquivos" },
    // Sistemas Digitais -> Redes de Computadores
    { source: "interface_mundo_analogico", target: "modulacao_e_sinais" },
    { source: "codigos_digitais", target: "deteccao_correcao_erros" },
    // Sistemas Operacionais -> Redes de Computadores
    { source: "device_drivers", target: "placa_de_rede_nic" },
    { source: "tratamento_de_interrupcoes", target: "dma_acesso_direto" },
    { source: "kernel_so", target: "pilha_tcp_ip" },
    { source: "chamadas_de_sistema", target: "sockets_api" },
    // Sistemas Operacionais -> Linux e Servidores
    { source: "sistemas_operacionais", target: "linux" },
    { source: "sistemas_de_arquivos", target: "permissoes_linux" },
    { source: "kernel_so", target: "virtualizacao_hypervisors" },
    // Linux e Servidores -> Redes de Computadores
    { source: "terminal_shell", target: "ssh_protocolo" },
    // Redes de Computadores -> DevOps e Cloud Computing
    { source: "subredes_cidr", target: "aws_redes_vpc" },
    { source: "nat_dhcp", target: "aws_redes_vpc" },
    { source: "proxy_reverso", target: "orquestracao_k8s" },
    { source: "load_balancing", target: "aws_servicos" },
    // Linux e Servidores -> DevOps e Cloud Computing
    { source: "linux", target: "cultura_devops" },
    { source: "terminal_shell", target: "containers_docker" },
    { source: "bash_scripting", target: "ci_cd_pipelines" },

    // 1. Matemática Discreta
    { source: "matematica_discreta", target: "logica_proposicional_e_quantificadores" },
    { source: "logica_proposicional_e_quantificadores", target: "metodos_de_provacao" },
    { source: "logica_proposicional_e_quantificadores", target: "teoria_dos_conjuntos" },
    { source: "teoria_dos_conjuntos", target: "funcoes_sequencias_e_somatorios" },
    { source: "funcoes_sequencias_e_somatorios", target: "analise_combinatoria_e_coeficientes_binomiais" },
    { source: "funcoes_sequencias_e_somatorios", target: "relacoes_e_estruturas_de_ordem" },
    { source: "funcoes_sequencias_e_somatorios", target: "aritmetica_modular_e_teoria_dos_numeros" },
    { source: "metodos_de_provacao", target: "inducao_matematica_e_recursao" },
    { source: "inducao_matematica_e_recursao", target: "analise_combinatoria_e_coeficientes_binomiais" },
    { source: "analise_combinatoria_e_coeficientes_binomiais", target: "probabilidade_discreta_e_valores_esperados" },

    // 6. Fundamentos da Eletricidade
    { source: "fundamentos_eletricidade", target: "estrutura_atomica_eletron" },
    { source: "estrutura_atomica_eletron", target: "condutores_isolantes" },
    { source: "condutores_isolantes", target: "resistividade" },
    { source: "resistividade", target: "resistencia_eletrica" },
    { source: "estrutura_atomica_eletron", target: "tensao_eletrica" },
    { source: "tensao_eletrica", target: "corrente_eletrica" },
    { source: "resistencia_eletrica", target: "corrente_eletrica" },
    { source: "corrente_eletrica", target: "potencia_eletrica" },
    { source: "tensao_eletrica", target: "potencia_eletrica" },
    { source: "corrente_eletrica", target: "efeito_joule" },

    // 7. Circuitos Elétricos
    { source: "lei_de_ohm", target: "circuitos_eletricos" },
    { source: "circuitos_eletricos", target: "leis_de_kirchhoff" },
    { source: "circuitos_eletricos", target: "associacao_de_resistores" },
    { source: "circuitos_eletricos", target: "capacitores_indutores" },
    { source: "leis_de_kirchhoff", target: "lei_das_malhas" },
    { source: "leis_de_kirchhoff", target: "lei_dos_nos" },
    { source: "associacao_de_resistores", target: "circuitos_em_serie" },
    { source: "associacao_de_resistores", target: "circuitos_em_paralelo" },
    { source: "circuitos_em_serie", target: "circuitos_serie_paralelo" },
    { source: "circuitos_em_paralelo", target: "circuitos_serie_paralelo" },
    { source: "circuitos_em_serie", target: "divisor_de_tensao" },
    { source: "circuitos_em_paralelo", target: "divisor_de_corrente" },
    { source: "lei_das_malhas", target: "analise_de_circuitos" },
    { source: "lei_dos_nos", target: "analise_de_circuitos" },
    { source: "circuitos_serie_paralelo", target: "analise_de_circuitos" },
    { source: "analise_de_circuitos", target: "circuitos_equivalentes" },
    { source: "analise_de_circuitos", target: "principio_superposicao" },
    { source: "analise_de_circuitos", target: "teoremas_thevenin_norton" },
    { source: "teoremas_thevenin_norton", target: "maxima_transferencia_de_potencia" },
    { source: "capacitores_indutores", target: "circuitos_primeira_ordem_rc_rl" },
    { source: "capacitores_indutores", target: "senoides_e_fasores" },
    { source: "circuitos_primeira_ordem_rc_rl", target: "circuitos_segunda_ordem_rlc" },

    // 8. Eletrônica Geral
    { source: "semicondutores", target: "diodos" },
    { source: "semicondutores", target: "transistores" },
    { source: "semicondutores", target: "tiristores_outros_dispositivos" },
    { source: "diodos", target: "eletronica_geral" },
    { source: "transistores", target: "eletronica_geral" },
    { source: "tiristores_outros_dispositivos", target: "eletronica_geral" },
    { source: "eletronica_geral", target: "aplicacoes_diodos" },
    { source: "aplicacoes_diodos", target: "fontes_alimentacao_reguladores" },
    { source: "eletronica_geral", target: "transistores_bjt" },
    { source: "eletronica_geral", target: "transistores_fet" },
    { source: "transistores_bjt", target: "amplificadores_bjt_mosfet" },
    { source: "transistores_fet", target: "amplificadores_bjt_mosfet" },
    { source: "amplificadores_bjt_mosfet", target: "resposta_em_frequencia" },
    { source: "amplificadores_bjt_mosfet", target: "amplificadores_potencia" },
    { source: "amplificadores_bjt_mosfet", target: "amplificadores_operacionais" },
    { source: "amplificadores_operacionais", target: "aplicacoes_amp_op" },
    { source: "amplificadores_operacionais", target: "osciladores_realimentacao" },

    // 9. Sistemas Digitais
    { source: "sistemas_de_numeracao", target: "codigos_digitais" },
    { source: "algebra_booleana", target: "portas_logicas" },
    { source: "portas_logicas", target: "simplificacao_logica" },
    { source: "codigos_digitais", target: "aritmetica_digital" },
    { source: "simplificacao_logica", target: "aritmetica_digital" },
    { source: "aritmetica_digital", target: "sistemas_digitais" },
    { source: "portas_logicas", target: "familias_logicas" },
    { source: "familias_logicas", target: "sistemas_digitais" },
    { source: "sistemas_digitais", target: "circuitos_combinacionais_msi" },
    { source: "circuitos_combinacionais_msi", target: "latches_flipflops" },
    { source: "latches_flipflops", target: "registradores_contadores" },
    { source: "latches_flipflops", target: "maquinas_de_estado" },
    { source: "registradores_contadores", target: "dispositivos_de_memoria" },
    { source: "registradores_contadores", target: "interface_mundo_analogico" },
    { source: "maquinas_de_estado", target: "dispositivos_programaveis_cpld_fpga" },
    { source: "dispositivos_de_memoria", target: "dispositivos_programaveis_cpld_fpga" },
    { source: "dispositivos_programaveis_cpld_fpga", target: "linguagens_hdl" },

    // 11. Arquitetura de Computadores
    { source: "tipos_computadores", target: "arquitetura_de_computadores" },
    { source: "arquitetura_de_computadores", target: "isa" },
    { source: "arquitetura_de_computadores", target: "arquitetura_von_neumann" },
    { source: "isa", target: "assembly" },
    { source: "isa", target: "isa_cisc_x86" },
    { source: "isa", target: "isa_risc_arm" },
    { source: "arquitetura_von_neumann", target: "cpu" },
    { source: "arquitetura_von_neumann", target: "memoria" },
    { source: "arquitetura_von_neumann", target: "entrada_saida" },
    { source: "arquitetura_von_neumann", target: "barramentos_interrupcoes" },
    { source: "cpu", target: "cpu_ula" },
    { source: "cpu", target: "cpu_uc" },
    { source: "cpu", target: "cpu_clock" },
    { source: "cpu_clock", target: "cpu_arquiteturas" },
    { source: "cpu_arquiteturas", target: "cpu_tipos" },
    { source: "cpu_tipos", target: "paralelismo_multiprocessadores" },
    { source: "memoria", target: "hierarquia_memoria" },
    { source: "hierarquia_memoria", target: "caches_niveis" },
    { source: "hierarquia_memoria", target: "memoria_principal" },
    { source: "hierarquia_memoria", target: "armazenamento_secundario" },
    { source: "entrada_saida", target: "dispositivos_io" },

    // 12. Sistemas Operacionais
    { source: "sistemas_operacionais", target: "kernel_so" },
    { source: "kernel_so", target: "modo_usuario_kernel" },
    { source: "kernel_so", target: "chamadas_de_sistema" },
    { source: "kernel_so", target: "tratamento_de_interrupcoes" },
    { source: "kernel_so", target: "escalonamento_de_processos" },
    { source: "kernel_so", target: "gerenciamento_de_memoria" },
    { source: "kernel_so", target: "sistemas_de_arquivos" },
    { source: "kernel_so", target: "device_drivers" },
    { source: "tratamento_de_interrupcoes", target: "escalonamento_de_processos" },
    { source: "escalonamento_de_processos", target: "gerenciamento_de_threads" },
    { source: "gerenciamento_de_threads", target: "condicoes_de_corrida" },
    { source: "condicoes_de_corrida", target: "deadlocks" },
    { source: "gerenciamento_de_memoria", target: "memoria_virtual" },
    { source: "memoria_virtual", target: "paginacao" },
    { source: "memoria_virtual", target: "segmentacao" },

    // 13. Redes de Computadores
    { source: "redes_de_computadores", target: "modelo_osi" },
    { source: "modelo_osi", target: "modelo_tcp_ip" },
    { source: "modelo_tcp_ip", target: "camada_fisica_redes" },
    { source: "camada_fisica_redes", target: "meios_de_transmissao" },
    { source: "camada_fisica_redes", target: "modulacao_e_sinais" },
    { source: "camada_fisica_redes", target: "camada_de_enlace" },
    { source: "camada_de_enlace", target: "subcamada_mac" },
    { source: "camada_de_enlace", target: "vlans" },
    { source: "camada_de_enlace", target: "deteccao_correcao_erros" },
    { source: "subcamada_mac", target: "placa_de_rede_nic" },
    { source: "placa_de_rede_nic", target: "dma_acesso_direto" },
    { source: "camada_de_enlace", target: "camada_de_rede" },
    { source: "camada_de_rede", target: "protocolo_ip_v4_v6" },
    { source: "camada_de_rede", target: "protocolo_icmp" },
    { source: "protocolo_ip_v4_v6", target: "subredes_cidr" },
    { source: "protocolo_ip_v4_v6", target: "nat_dhcp" },
    { source: "protocolo_ip_v4_v6", target: "algoritmos_de_roteamento" },
    { source: "subcamada_mac", target: "protocolo_arp" },
    { source: "protocolo_ip_v4_v6", target: "protocolo_arp" },
    { source: "protocolo_ip_v4_v6", target: "camada_de_transporte" },
    { source: "camada_de_transporte", target: "protocolos_tcp_udp" },
    { source: "protocolos_tcp_udp", target: "controle_de_congestionamento" },
    { source: "protocolos_tcp_udp", target: "firewalls" },
    { source: "protocolos_tcp_udp", target: "pilha_tcp_ip" },
    { source: "pilha_tcp_ip", target: "sockets_api" },
    { source: "sockets_api", target: "camada_de_aplicacao" },
    { source: "camada_de_aplicacao", target: "dns" },
    { source: "camada_de_aplicacao", target: "protocolo_http" },
    { source: "camada_de_aplicacao", target: "ssh_protocolo" },
    { source: "camada_de_aplicacao", target: "protocolos_iot_mqtt" },
    { source: "protocolo_http", target: "http_headers" },
    { source: "http_headers", target: "cookies_sessoes" },
    { source: "protocolo_http", target: "ssl_tls_https" },
    { source: "ssl_tls_https", target: "proxy_reverso" },
    { source: "proxy_reverso", target: "load_balancing" },
    { source: "load_balancing", target: "cdn" },

    // 14. Linux e Servidores
    { source: "linux", target: "terminal_shell" },
    { source: "linux", target: "virtualizacao_hypervisors" },
    { source: "terminal_shell", target: "permissoes_linux" },
    { source: "terminal_shell", target: "bash_scripting" },

    // 15. DevOps e Cloud Computing
    { source: "cultura_devops", target: "git_versionamento" },
    { source: "cultura_devops", target: "containers_docker" },
    { source: "cultura_devops", target: "aws_cloud" },
    { source: "git_versionamento", target: "github_fluxos" },
    { source: "github_fluxos", target: "ci_cd_pipelines" },
    { source: "containers_docker", target: "orquestracao_k8s" },
    { source: "containers_docker", target: "ci_cd_pipelines" },
    { source: "aws_cloud", target: "aws_compute" },
    { source: "aws_cloud", target: "aws_storage" },
    { source: "aws_cloud", target: "aws_redes_vpc" },
    { source: "aws_cloud", target: "aws_servicos" },
    { source: "aws_cloud", target: "seguranca_nuvem" },
    { source: "aws_compute", target: "iac_terraform" },
    { source: "ci_cd_pipelines", target: "iac_terraform" },
    { source: "aws_compute", target: "monitoramento_observabilidade" },
    { source: "orquestracao_k8s", target: "monitoramento_observabilidade" },

    // // to-do: 11. Estruturas de Dados
    // { source: "teoria_dos_conjuntos", target: "estruturas_de_dados" },
    // { source: "teoria_dos_grafos", target: "estruturas_de_dados" },
    // { source: "arvores_matematicas", target: "estruturas_de_dados" },

    // // to-do: 12. Algoritmos e Lógica de Programação
    // { source: "analise_assintotica", target: "algoritmos" },
    // { source: "relacoes_de_recorrencia", target: "algoritmos" },

    // // to-do: 13. Inteligência Artificial e Machine Learning
    // { source: "probabilidade_discreta", target: "inteligencia_artificial" },
    // { source: "logica_proposicional", target: "inteligencia_artificial" },
  ],
};

const statusColor = {
  pending: "#ef4444",
  in_progress: "#3b82f6",
  done: "#10b981",
  skip: "#94a3b8",
  locked: "#64748b",
};

const GROUP_CONFIG = {
  1: { color: "#3b82f6", label: "1. Matemática Discreta" },
  2: { color: "#f97316", label: "2. Cálculo e Álgebra" },
  3: { color: "#22c55e", label: "3. Teoria da Computação" },
  4: { color: "#ec4899", label: "4. Algoritmos e Lógica de Programação" },
  5: { color: "#eab308", label: "5. Estruturas de Dados" },
  6: { color: "#06b6d4", label: "6. Fundamentos da Eletricidade" },
  7: { color: "#ef4444", label: "7. Circuitos Elétricos" },
  8: { color: "#6366f1", label: "8. Eletrônica Geral" },
  9: { color: "#84cc16", label: "9. Sistemas Digitais" },
  10: { color: "#a855f7", label: "10. Processamento Digital de Sinais" },
  11: { color: "#14b8a6", label: "11. Arquitetura de Computadores" },
  12: { color: "#f59e0b", label: "12. Sistemas Operacionais" },
  13: { color: "#f43f5e", label: "13. Redes de Computadores" },
  14: { color: "#0ea5e9", label: "14. Linux e Administração de Sistemas" },
  15: { color: "#64748b", label: "15. DevOps e Cloud Computing" },
  16: { color: "#d946ef", label: "16. Linguagens de Programação" },
  17: { color: "#10b981", label: "17. Bancos de Dados" },
  18: { color: "#78716c", label: "18. Engenharia de Software" },
  19: { color: "#8b5cf6", label: "19. Inteligência Artificial" },
};

const KnowledgeMap = () => {
  const svgRef = useRef(null);
  const nodeRef = useRef(null);
  const linkRef = useRef(null);

  const [nodes, setNodes] = useState(() => {
    try {
      const saved = localStorage.getItem("knowledge_map_data");
      const savedStatusMap = saved ? JSON.parse(saved) : {};
      return graphData.nodes.map((n) => ({
        ...n,
        status: savedStatusMap[n.id] || "pending",
      }));
    } catch (e) {
      return graphData.nodes.map((n) => ({ ...n, status: "pending" }));
    }
  });

  const [links] = useState(graphData.links.map((l) => ({ ...l })));
  const [selectedNode, setSelectedNode] = useState(null);
  const [tooltip, setTooltip] = useState({ visible: false, content: "", x: 0, y: 0 });

  const [activeLegendGroups, setActiveLegendGroups] = useState([]);
  const [showLegend, setShowLegend] = useState(true);

  const [hoverReset, setHoverReset] = useState(false);
  const [hoverToggle, setHoverToggle] = useState(false);

  const checkIsLocked = (nodeId, currentNodes) => {
    const prerequisites = links.filter((l) => {
      const targetId = typeof l.target === "object" ? l.target.id : l.target;
      return targetId === nodeId;
    });
    if (prerequisites.length === 0) return false;
    return prerequisites.some((l) => {
      const sourceId = typeof l.source === "object" ? l.source.id : l.source;
      const parentNode = currentNodes.find((n) => n.id === sourceId);
      return !parentNode || parentNode.status !== "done";
    });
  };

  const getMissingPrerequisites = (nodeId) => {
    const prerequisites = links.filter((l) => {
      const targetId = typeof l.target === "object" ? l.target.id : l.target;
      return targetId === nodeId;
    });
    return prerequisites
      .map((l) => {
        const sourceId = typeof l.source === "object" ? l.source.id : l.source;
        return nodes.find((n) => n.id === sourceId);
      })
      .filter((parentNode) => !parentNode || parentNode.status !== "done");
  };

  const handleStatusChange = (newStatus) => {
    if (!selectedNode || checkIsLocked(selectedNode.id, nodes)) return;
    const updatedNodes = nodes.map((n) => (n.id === selectedNode.id ? { ...n, status: newStatus } : n));
    setNodes(updatedNodes);
    const statusMap = updatedNodes.reduce((acc, node) => {
      acc[node.id] = node.status;
      return acc;
    }, {});
    localStorage.setItem("knowledge_map_data", JSON.stringify(statusMap));
  };

  const resetProgress = () => {
    localStorage.removeItem("knowledge_map_data");
    setNodes(graphData.nodes.map((n) => ({ ...n, status: "pending" })));
    setSelectedNode(null);
    setActiveLegendGroups([]);
  };

  useEffect(() => {
    if (nodeRef.current) {
      nodeRef.current
        .select("circle")
        .transition()
        .duration(300)
        .attr("stroke", (d) => {
          const isLocked = checkIsLocked(d.id, nodes);
          if (isLocked) return statusColor.locked;
          const match = nodes.find((n) => n.id === d.id);
          return statusColor[match ? match.status : d.status];
        })
        .style("opacity", (d) => {
          const isLocked = checkIsLocked(d.id, nodes);
          let opacity = isLocked ? 0.35 : 1;
          if (activeLegendGroups.length > 0 && !activeLegendGroups.includes(d.group)) {
            opacity *= 0.15;
          }
          return opacity;
        })
        .attr("stroke-dasharray", (d) => (checkIsLocked(d.id, nodes) ? "4 4" : "none"));

      nodeRef.current
        .select("text")
        .transition()
        .duration(300)
        .style("opacity", (d) => {
          const isLocked = checkIsLocked(d.id, nodes);
          let opacity = isLocked ? 0.4 : 1;
          if (activeLegendGroups.length > 0 && !activeLegendGroups.includes(d.group)) {
            opacity *= 0.15;
          }
          return opacity;
        })
        .style("font-style", (d) => (checkIsLocked(d.id, nodes) ? "italic" : "normal"));
    }

    if (linkRef.current) {
      linkRef.current
        .transition()
        .duration(300)
        .attr("stroke", (d) => {
          const sourceId = typeof d.source === "object" ? d.source.id : d.source;
          const sourceNode = nodes.find((n) => n.id === sourceId);
          return sourceNode?.status === "done" ? "#10b981" : "#475569";
        })
        .style("opacity", (d) => {
          if (activeLegendGroups.length > 0) {
            const sourceGroup =
              typeof d.source === "object" ? d.source.group : nodes.find((n) => n.id === d.source)?.group;
            const targetGroup =
              typeof d.target === "object" ? d.target.group : nodes.find((n) => n.id === d.target)?.group;
            if (!activeLegendGroups.includes(sourceGroup) && !activeLegendGroups.includes(targetGroup)) {
              return 0.05;
            }
          }
          const sourceId = typeof d.source === "object" ? d.source.id : d.source;
          const sourceNode = nodes.find((n) => n.id === sourceId);
          return sourceNode?.status === "done" ? 0.8 : 0.4;
        })
        .attr("stroke-width", (d) => {
          const sourceId = typeof d.source === "object" ? d.source.id : d.source;
          const sourceNode = nodes.find((n) => n.id === sourceId);
          return sourceNode?.status === "done" ? 2.5 : 1.5;
        });
    }
  }, [nodes, activeLegendGroups]);

  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current).attr("viewBox", [0, 0, width, height]).style("background", "#0f172a");

    svg
      .append("defs")
      .append("marker")
      .attr("id", "arrowhead")
      .attr("viewBox", "-0 -5 10 10")
      .attr("refX", 26)
      .attr("refY", 0)
      .attr("orient", "auto")
      .attr("markerWidth", 8)
      .attr("markerHeight", 8)
      .attr("xoverflow", "visible")
      .append("svg:path")
      .attr("d", "M 0,-5 L 10 ,0 L 0,5")
      .attr("fill", "#64748b")
      .style("stroke", "none");

    const g = svg.append("g");

    const zoom = d3
      .zoom()
      .scaleExtent([0.2, 3])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
      });
    svg.call(zoom);

    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3
          .forceLink(links)
          .id((d) => d.id)
          .distance(160),
      )
      .force("charge", d3.forceManyBody().strength(-400))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collide", d3.forceCollide().radius(45));

    const link = g
      .append("g")
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke", "#475569")
      .attr("stroke-width", 1.5)
      .attr("stroke-opacity", 0.4)
      .attr("marker-end", "url(#arrowhead)");

    linkRef.current = link;

    const node = g
      .append("g")
      .selectAll("g")
      .data(nodes)
      .join("g")
      .style("cursor", (d) => (checkIsLocked(d.id, nodes) ? "not-allowed" : "grab"))
      .call(drag(simulation));

    nodeRef.current = node;

    node
      .append("circle")
      .attr("r", 12)
      .attr("fill", (d) => GROUP_CONFIG[d.group]?.color || "#fff")
      .attr("stroke-width", 3.5);

    node
      .append("text")
      .text((d) => d.label)
      .attr("x", 20)
      .attr("y", 4)
      .style("font-size", "13px")
      .style("font-family", "sans-serif")
      .style("fill", "#f8fafc")
      .style("pointer-events", "none")
      .style("text-shadow", "2px 2px 4px #000");

    node
      .on("mouseover", (event, d) => {
        const isLocked = checkIsLocked(d.id, nodes);
        d3.select(event.currentTarget).select("circle").transition().duration(150).attr("r", 16);
        setTooltip({
          visible: true,
          content: `<strong>${d.label}</strong> ${isLocked ? "<br/><span style='color:#ef4444;'>🔒 Bloqueado</span>" : ""}`,
          x: event.pageX + 12,
          y: event.pageY - 28,
        });
      })
      .on("mousemove", (event) => setTooltip((prev) => ({ ...prev, x: event.pageX + 12, y: event.pageY - 28 })))
      .on("mouseout", (event) => {
        d3.select(event.currentTarget).select("circle").transition().duration(150).attr("r", 12);
        setTooltip((prev) => ({ ...prev, visible: false }));
      })
      .on("click", (event, d) => {
        event.stopPropagation();
        setSelectedNode(d);
      });

    svg.on("click", () => setSelectedNode(null));

    simulation.on("tick", () => {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);
      node.attr("transform", (d) => `translate(${d.x},${d.y})`);
    });

    function drag(simulation) {
      return d3
        .drag()
        .on("start", function (event) {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          event.subject.fx = event.subject.x;
          event.subject.fy = event.subject.y;
          d3.select(this).style("cursor", "grabbing");
        })
        .on("drag", function (event) {
          event.subject.fx = event.x;
          event.subject.fy = event.y;
        })
        .on("end", function (event) {
          if (!event.active) simulation.alphaTarget(0);
          event.subject.fx = null;
          event.subject.fy = null;
          d3.select(this).style("cursor", "grab");
        });
    }

    return () => simulation.stop();
  }, []);

  return (
    <div
      style={{ position: "relative", width: "100vw", height: "100vh", overflow: "hidden", backgroundColor: "#0f172a" }}>
      <button
        onClick={resetProgress}
        onMouseEnter={() => setHoverReset(true)}
        onMouseLeave={() => setHoverReset(false)}
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          zIndex: 10,
          padding: "8px 14px",
          background: hoverReset ? "rgba(30, 41, 59, 0.9)" : "rgba(30, 41, 59, 0.6)",
          backdropFilter: "blur(8px)",
          color: hoverReset ? "#f8fafc" : "#94a3b8",
          border: `1px solid ${hoverReset ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.1)"}`,
          borderRadius: "6px",
          cursor: "pointer",
          fontFamily: "sans-serif",
          fontSize: "12px",
          fontWeight: "bold",
          transition: "all 0.2s ease",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        }}>
        Limpar Progresso
      </button>

      <div
        style={{
          position: "absolute",
          left: `${tooltip.x}px`,
          top: `${tooltip.y}px`,
          visibility: tooltip.visible ? "visible" : "hidden",
          opacity: tooltip.visible ? 1 : 0,
          background: "rgba(15, 23, 42, 0.95)",
          color: "#f8fafc",
          padding: "8px 12px",
          borderRadius: "6px",
          fontSize: "12px",
          fontFamily: "sans-serif",
          pointerEvents: "none",
          border: "1px solid rgba(255,255,255,0.15)",
          boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
          zIndex: 100,
          transition: "opacity 0.15s ease",
        }}
        dangerouslySetInnerHTML={{ __html: tooltip.content }}
      />

      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "420px",
          height: "100%",
          backgroundColor: "rgba(15, 23, 42, 0.85)",
          backdropFilter: "blur(12px)",
          borderLeft: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "-4px 0 24px rgba(0,0,0,0.5)",
          transform: selectedNode ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          zIndex: 50,
          padding: "30px",
          color: "#e2e8f0",
          fontFamily: "sans-serif",
          overflowY: "auto",
          boxSizing: "border-box",
        }}>
        <button
          onClick={() => setSelectedNode(null)}
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            background: "none",
            border: "none",
            color: "#94a3b8",
            fontSize: "24px",
            cursor: "pointer",
          }}>
          &times;
        </button>

        {selectedNode &&
          (() => {
            const currentNode = nodes.find((n) => n.id === selectedNode.id) || selectedNode;
            const isLocked = checkIsLocked(currentNode.id, nodes);
            const missingPrereqs = getMissingPrerequisites(currentNode.id);

            return (
              <>
                <h2
                  style={{
                    margin: "10px 0 20px 0",
                    paddingBottom: "10px",
                    borderBottom: `3px solid ${GROUP_CONFIG[currentNode.group]?.color || "#ccc"}`,
                  }}>
                  {currentNode.label}
                </h2>

                {isLocked ? (
                  <div
                    style={{
                      backgroundColor: "rgba(239, 68, 68, 0.15)",
                      border: "1px solid #ef4444",
                      padding: "15px",
                      borderRadius: "8px",
                      marginBottom: "20px",
                    }}>
                    <h4
                      style={{
                        margin: "0 0 8px 0",
                        color: "#f87171",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                      }}>
                      <span>🔒</span> Pré-requisitos Pendentes
                    </h4>
                    <p style={{ margin: 0, fontSize: "13px", color: "#fca5a5" }}>
                      Conclua os seguintes itens para liberar este nó:
                    </p>
                    <ul style={{ margin: "8px 0 0 0", paddingLeft: "20px", fontSize: "13px", color: "#fca5a5" }}>
                      {missingPrereqs.map((p) => (
                        <li key={p.id}>{p.label}</li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div
                    style={{
                      backgroundColor: "rgba(16, 185, 129, 0.15)",
                      border: "1px solid #10b981",
                      padding: "12px",
                      borderRadius: "8px",
                      marginBottom: "20px",
                      color: "#a7f3d0",
                      fontSize: "13px",
                    }}>
                    <span>🔓</span> Nó de estudo desbloqueado.
                  </div>
                )}

                <div style={{ marginBottom: "25px", display: "flex", alignItems: "center", gap: "12px" }}>
                  <label style={{ color: "#94a3b8", fontSize: "14px" }}>Status:</label>
                  <select
                    value={isLocked ? "pending" : currentNode.status}
                    disabled={isLocked}
                    onChange={(e) => handleStatusChange(e.target.value)}
                    style={{
                      padding: "8px 12px",
                      borderRadius: "6px",
                      border: `1px solid ${isLocked ? "#475569" : statusColor[currentNode.status]}`,
                      backgroundColor: "#1e293b",
                      color: isLocked ? "#64748b" : "white",
                      cursor: isLocked ? "not-allowed" : "pointer",
                      outline: "none",
                      fontWeight: "bold",
                    }}>
                    <option value="pending">Pendente</option>
                    <option value="in_progress">Em Progresso</option>
                    <option value="done">Concluído</option>
                    <option value="skip">Ignorar</option>
                  </select>
                </div>

                <h3 style={{ fontSize: "16px", color: "#f8fafc", margin: "20px 0 8px 0" }}>Descrição</h3>
                <p style={{ fontSize: "14px", color: "#94a3b8", lineHeight: "1.6", margin: "0 0 20px 0" }}>
                  {currentNode.description || "Indisponível."}
                </p>

                <h3 style={{ fontSize: "16px", color: "#f8fafc", margin: "20px 0 8px 0" }}>Exemplos de Aplicação</h3>
                {currentNode.examples && currentNode.examples.length > 0 ? (
                  <ul style={{ paddingLeft: "20px", fontSize: "14px", color: "#94a3b8", lineHeight: "1.6" }}>
                    {currentNode.examples.map((ex, i) => (
                      <li key={i}>{ex}</li>
                    ))}
                  </ul>
                ) : (
                  <p style={{ fontSize: "14px", color: "#64748b" }}>Nenhum exemplo registrado.</p>
                )}

                {/* ADICIONADO DE VOLTA: Bibliografia Recomendada */}
                <h3 style={{ fontSize: "16px", color: "#f8fafc", margin: "20px 0 8px 0" }}>Bibliografia Recomendada</h3>
                {currentNode.books && currentNode.books.length > 0 ? (
                  <ul
                    style={{
                      paddingLeft: "0",
                      listStyleType: "none",
                      fontSize: "14px",
                      color: "#94a3b8",
                      lineHeight: "1.6",
                    }}>
                    {currentNode.books.map((book, i) => (
                      <li key={i} style={{ marginBottom: "8px" }}>
                        📖 {book}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p style={{ fontSize: "14px", color: "#64748b" }}>Nenhum livro registrado.</p>
                )}

                {/* ADICIONADO DE VOLTA: Exercícios Práticos */}
                <h3 style={{ fontSize: "16px", color: "#f8fafc", margin: "20px 0 8px 0" }}>Exercícios Práticos</h3>
                {currentNode.practice && currentNode.practice.length > 0 ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {currentNode.practice.map((prac, i) => (
                      <details
                        key={i}
                        style={{
                          background: "rgba(255,255,255,0.05)",
                          borderRadius: "6px",
                          padding: "12px",
                          border: "1px solid rgba(255,255,255,0.1)",
                        }}>
                        <summary
                          style={{
                            cursor: "pointer",
                            color: "#cbd5e1",
                            fontSize: "14px",
                            fontWeight: "bold",
                            outline: "none",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                          }}>
                          <span>📝</span> {prac.question}
                        </summary>
                        <div
                          style={{
                            marginTop: "10px",
                            paddingTop: "10px",
                            borderTop: "1px solid rgba(255,255,255,0.1)",
                            color: "#94a3b8",
                            fontSize: "13px",
                            lineHeight: "1.6",
                          }}>
                          <strong style={{ color: "#10b981" }}>Resolução:</strong> {prac.answer}
                        </div>
                      </details>
                    ))}
                  </div>
                ) : (
                  <p style={{ fontSize: "14px", color: "#64748b" }}>Nenhum exercício registrado.</p>
                )}

                {/* ADICIONADO DE VOLTA: Recursos Adicionais (Links) */}
                {currentNode.links && currentNode.links.length > 0 && (
                  <>
                    <h3 style={{ fontSize: "16px", color: "#f8fafc", margin: "20px 0 8px 0" }}>Recursos Adicionais</h3>
                    <ul style={{ paddingLeft: "0", listStyleType: "none", fontSize: "14px", lineHeight: "1.6" }}>
                      {currentNode.links.map((link, i) => (
                        <li key={i} style={{ marginBottom: "8px" }}>
                          🔗{" "}
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: "#3b82f6", textDecoration: "none" }}>
                            {link.label || link.url}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </>
            );
          })()}
      </div>

      <svg ref={svgRef} style={{ width: "100%", height: "100%" }}></svg>

      {!showLegend ? (
        <button
          onClick={() => setShowLegend(true)}
          onMouseEnter={() => setHoverToggle(true)}
          onMouseLeave={() => setHoverToggle(false)}
          style={{
            position: "absolute",
            bottom: "20px",
            right: "20px",
            zIndex: 10,
            padding: "8px 14px",
            background: hoverToggle ? "rgba(30, 41, 59, 0.9)" : "rgba(30, 41, 59, 0.6)",
            backdropFilter: "blur(8px)",
            color: "#f8fafc",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "6px",
            cursor: "pointer",
            fontFamily: "sans-serif",
            fontSize: "11px",
            fontWeight: "bold",
            transition: "all 0.2s ease",
          }}>
          👁️ Exibir Legenda
        </button>
      ) : (
        <div
          style={{
            position: "absolute",
            bottom: 20,
            right: 20,
            zIndex: 10,
            color: "white",
            fontFamily: "sans-serif",
            fontSize: "11px",
            background: "rgba(15, 23, 42, 0.92)",
            padding: "15px",
            borderRadius: "8px",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
          }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid rgba(255,255,255,0.15)",
              paddingBottom: "6px",
              marginBottom: "8px",
            }}>
            <h4 style={{ margin: 0, fontSize: "12px", flexGrow: 1 }}>Legenda Estrutural</h4>
            <button
              onClick={() => setShowLegend(false)}
              style={{
                background: "none",
                border: "none",
                color: "#64748b",
                cursor: "pointer",
                fontSize: "11px",
                padding: "2px 6px",
                borderRadius: "4px",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#f8fafc")}
              onMouseLeave={(e) => (e.target.style.color = "#64748b")}>
              Ocultar
            </button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, max-content)", gap: "6px 24px" }}>
            {Object.entries(GROUP_CONFIG).map(([key, group]) => {
              const groupNum = Number(key);
              const isSelected = activeLegendGroups.includes(groupNum);
              return (
                <div
                  key={key}
                  onClick={() => {
                    setActiveLegendGroups((prev) =>
                      prev.includes(groupNum) ? prev.filter((g) => g !== groupNum) : [...prev, groupNum],
                    );
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    cursor: "pointer",
                    padding: "2px 4px",
                    borderRadius: "4px",
                    background: isSelected ? "rgba(255,255,255,0.08)" : "transparent",
                    opacity: activeLegendGroups.length === 0 || isSelected ? 1 : 0.4,
                    transition: "all 0.15s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) e.currentTarget.style.background = "transparent";
                  }}>
                  <span
                    style={{
                      display: "inline-block",
                      width: 8,
                      height: 8,
                      background: group.color,
                      borderRadius: "50%",
                      flexShrink: 0,
                    }}></span>
                  <span
                    style={{ color: isSelected ? "#f8fafc" : "#cbd5e1", fontWeight: isSelected ? "bold" : "normal" }}>
                    {group.label}
                  </span>
                </div>
              );
            })}

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginTop: "4px",
                paddingTop: "8px",
                borderTop: "1px solid rgba(255,255,255,0.08)",
                gridColumn: "1 / -1",
              }}>
              <span
                style={{
                  display: "inline-block",
                  width: 8,
                  height: 8,
                  border: "2px dashed #64748b",
                  borderRadius: "50%",
                  flexShrink: 0,
                }}></span>
              <span style={{ color: "#64748b" }}>Nó Bloqueado (Pré-requisitos Pendentes)</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KnowledgeMap;
