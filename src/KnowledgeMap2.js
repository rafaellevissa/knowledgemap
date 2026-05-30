import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import "./KnowledgeMap.css";

const graphData = {
  nodes: [
    // --- 1. FUNDAMENTOS MATEMÁTICOS E FÍSICOS ---
    {
      id: "Fisica",
      label: "Física da Computação",
      group: 1,
      status: "mastered",
      description: "O estudo das propriedades físicas que permitem a existência de dispositivos eletrônicos e computacionais.",
      examples: ["Comportamento de elétrons em materiais", "Leis da termodinâmica em chips", "Efeito Joule (Aquecimento)"],
      books: ["Physics for Computer Science Students - N. Garcia", "The Feynman Lectures on Physics - Richard Feynman"],
      practice: [
        {
          question: "Descreva como o fluxo de elétrons cria corrente elétrica.",
          answer: "Corrente elétrica é o fluxo ordenado de partículas carregadas (elétrons) através de um condutor, impulsionado por uma diferença de potencial (tensão). Em um circuito, os elétrons fluem do polo negativo para o positivo, criando o que chamamos de corrente."
        },
        {
          question: "Pesquise sobre a diferença entre condutores, isolantes e semicondutores.",
          answer: "Condutores (cobre, ouro) possuem elétrons livres que facilitam a corrente. Isolantes (borracha, vidro) impedem o fluxo. Semicondutores (silício) têm condutividade intermediária que pode ser controlada (dopagem), sendo a base dos transistores."
        }
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Eletricidade",
      label: "Eletricidade Básica",
      group: 1,
      status: "locked",
      description: "Conceitos fundamentais sobre carga elétrica, tensão, corrente e resistência.",
      examples: ["Lei de Ohm", "Circuitos em série e paralelo", "Divisores de Tensão"],
      books: ["Fundamentos de Circuitos Elétricos - Charles K. Alexander & Matthew N. O. Sadiku"],
      practice: [
        {
          question: "Calcule a tensão usando a Lei de Ohm (V=IR) para I=2A e R=5Ω.",
          answer: "Usando a fórmula V = I * R:\nV = 2 Amperes * 5 Ohms\nV = 10 Volts."
        },
        {
          question: "Desenhe um circuito simples com uma bateria e um resistor.",
          answer: "Imagine (ou desenhe): Uma bateria com polo + e -. Um fio sai do +, passa por um resistor (ziguezague), e volta para o -. A corrente flui do + para o -, passando pelo resistor que limita essa corrente."
        }
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Corrente_Cont",
      label: "Corrente Contínua",
      group: 1,
      status: "locked",
      description: "Fluxo ordenado de elétrons em uma única direção, base para eletrônica digital.",
      examples: ["Baterias", "Fontes de alimentação de PC", "Carregadores de Celular"],
      books: ["Eletrônica Vol. 1 - Albert Malvino"],
      practice: [
        {
          question: "Explique por que baterias fornecem Corrente Contínua (DC).",
          answer: "Baterias geram energia através de reações químicas que empurram os elétrons sempre na mesma direção (do ânodo para o cátodo), resultando em um fluxo unidirecional constante, ou seja, Corrente Contínua."
        },
        {
          question: "Compare as características de DC vs AC (Alternada).",
          answer: "DC (Contínua): fluxo unidirecional, usada em eletrônicos (chips). AC (Alternada): fluxo inverte direção periodicamente (ex: 60Hz), usada na rede elétrica por ser eficiente para transmissão a longas distâncias."
        }
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Semicondutores",
      label: "Semicondutores",
      group: 1,
      status: "locked",
      description: "Materiais com condutividade intermediária (Silício, Germânio) essenciais para criação de transistores.",
      examples: ["Dopagem tipo N e P", "Diodos", "LEDs (Light Emitting Diodes)"],
      books: ["Solid State Electronic Devices - Ben G. Streetman"],
      practice: [
        {
          question: "Explique o que é dopagem (Doping) tipo N e tipo P.",
          answer: "Dopagem é adicionar impurezas ao silício. Tipo N (Negativo): adiciona Fósforo, sobrando elétrons livres. Tipo P (Positivo): adiciona Boro, criando 'buracos' (falta de elétrons). A junção desses materiais cria diodos e transistores."
        },
        {
          question: "Desenhe o diagrama de uma junção PN.",
          answer: "Imagine dois blocos encostados. Lado esquerdo (P) cheio de buracos (+), lado direito (N) cheio de elétrons (-). Na fronteira, forma-se uma 'região de depleção' que funciona como uma barreira controlável."
        }
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Transistores",
      label: "Transistores",
      group: 1,
      status: "locked",
      description: "Dispositivo semicondutor usado para amplificar ou trocar sinais eletrônicos e potência elétrica. O bloco fundamental dos processadores.",
      examples: ["Transistor Bipolar (BJT)", "MOSFET", "Chaveamento Lógico (0/1)"],
      books: ["Microelectronic Circuits - Adel S. Sedra & Kenneth C. Smith"],
      practice: [
        {
          question: "Explique como um transistor funciona como uma chave (0 ou 1).",
          answer: "O transistor tem 3 terminais: Base, Coletor e Emissor. Uma pequena corrente na Base libera uma grande corrente entre Coletor e Emissor (Ligado = 1). Sem corrente na Base, ele bloqueia (Desligado = 0)."
        },
        {
          question: "Pesquise sobre a Lei de Moore e a densidade de transistores.",
          answer: "Gordon Moore previu em 1965 que o número de transistores em um chip dobraria a cada ~2 anos. Isso impulsionou a evolução exponencial da computação, permitindo processadores com bilhões de transistores hoje."
        }
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Eletronica",
      label: "Eletrônica Digital",
      group: 1,
      status: "mastered",
      description: "Ramo da eletrônica que lida com sistemas digitais e lógica binária.",
      examples: ["Sinais discretos (0 e 1)", "Álgebra booleana aplicada", "Conversão A/D e D/A"],
      books: ["Sistemas Digitais - Ronald J. Tocci", "Digital Design - M. Morris Mano"],
      practice: [
        {
          question: "Diferencie um sinal analógico de um digital.",
          answer: "Analógico: contínuo no tempo e amplitude (ex: onda sonora, voltagem variando suavemente). Digital: discreto, assume valores finitos (ex: 0 e 1, 0V e 5V), permitindo processamento computacional sem ruído."
        },
        {
          question: "Represente os níveis lógicos 0 e 1 em termos de Volts (ex: 0V e 5V).",
          answer: "Em lógica TTL (5V): 0V a 0.8V representa Lógico 0 (Falso). 2V a 5V representa Lógico 1 (Verdadeiro). A região entre 0.8V e 2V é indefinida ou ruído."
        }
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Portas_Logicas",
      label: "Portas Lógicas",
      group: 1,
      status: "available",
      description: "Circuitos digitais que implementam funções booleanas básicas.",
      examples: ["Chips 7400 series", "Lógica combinacional"],
      books: ["Digital Logic and Computer Design - Mano"],
      practice: [
        {
          question: "Liste as 7 portas lógicas básicas.",
          answer: "1. NOT (Inversora)\n2. AND (E)\n3. OR (OU)\n4. NAND (Não E)\n5. NOR (Não OU)\n6. XOR (Ou Exclusivo)\n7. XNOR (Não Ou Exclusivo)."
        },
        {
          question: "Desenhe a tabela verdade para um circuito com 2 entradas.",
          answer: "Tabela Verdade genérica (Entradas A e B):\n0 0 -> Saída\n0 1 -> Saída\n1 0 -> Saída\n1 1 -> Saída"
        }
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Porta_AND",
      label: "Gate AND",
      group: 1,
      status: "locked",
      description: "Saída é verdadeira (1) somente se todas as entradas forem verdadeiras (1).",
      examples: ["Interruptores em série", "Sistema de Segurança (Senha E Biometria)"],
      books: ["Elementos de Eletrônica Digital - Francisco Gabriel Capuano"],
      practice: [
        {
          question: "Desenhe a tabela verdade da porta AND.",
          answer: "A | B | Saída (A AND B)\n0 | 0 | 0\n0 | 1 | 0\n1 | 0 | 0\n1 | 1 | 1"
        },
        {
          question: "Simule uma porta AND usando dois interruptores em série.",
          answer: "Imagine uma bateria conectada a uma lâmpada. No fio, coloque dois interruptores seguidos. A lâmpada só acende se o Interruptor A E o Interruptor B estiverem ligados (fechados)."
        }
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Porta_OR",
      label: "Gate OR",
      group: 1,
      status: "locked",
      description: "Saída é verdadeira (1) se pelo menos uma entrada for verdadeira (1).",
      examples: ["Interruptores em paralelo", "Sistema de Alarme (Sensor Porta OU Janela)"],
      books: ["Elementos de Eletrônica Digital - Francisco Gabriel Capuano"],
      practice: [
        {
          question: "Desenhe a tabela verdade da porta OR.",
          answer: "A | B | Saída (A OR B)\n0 | 0 | 0\n0 | 1 | 1\n1 | 0 | 1\n1 | 1 | 1"
        },
        {
          question: "Simule uma porta OR usando dois interruptores em paralelo.",
          answer: "Imagine dois caminhos diferentes para a corrente chegar à lâmpada. Se você fechar o Interruptor A OU o B (ou ambos), a corrente passa e a lâmpada acende."
        }
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Porta_NOT",
      label: "Gate NOT",
      group: 1,
      status: "locked",
      description: "Inverte o sinal de entrada (Inversora). Se entra 0, sai 1.",
      examples: ["Inversor lógico"],
      books: ["Elementos de Eletrônica Digital - Capuano"],
      practice: [
        {
          question: "Se a entrada é 1, qual é a saída de uma porta NOT?",
          answer: "A saída será 0. A porta NOT inverte o sinal: 1 vira 0, 0 vira 1."
        },
        {
          question: "Desenhe o símbolo de uma porta inversora.",
          answer: "É um triângulo apontando para a direita com uma pequena bolinha na ponta (a bolinha indica inversão)."
        }
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Porta_XOR",
      label: "Gate XOR",
      group: 1,
      status: "locked",
      description: "Saída é verdadeira se as entradas forem diferentes (Ou Exclusivo).",
      examples: ["Comparadores de magnitude", "Soma binária (half adder)"],
      books: ["Elementos de Eletrônica Digital - Capuano"],
      practice: [
        {
          question: "Desenhe a tabela verdade da porta XOR.",
          answer: "A | B | Saída (A XOR B)\n0 | 0 | 0\n0 | 1 | 1\n1 | 0 | 1\n1 | 1 | 0 (Só é 1 se forem diferentes)"
        },
        {
          question: "Explique como o XOR é usado para soma binária.",
          answer: "Na soma de bits: 0+0=0, 0+1=1, 1+0=1. Isso é idêntico ao XOR! Mas 1+1=10 (0 e vai 1). O bit 'soma' é a saída do XOR."
        }
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Flip_Flops",
      label: "Flip-flops",
      group: 1,
      status: "locked",
      description: "Circuitos capazes de armazenar um bit de informação (estado) - base da memória.",
      examples: ["Flip-flop tipo D", "Latch SR", "Registradores"],
      books: ["Sistemas Digitais - Tocci"],
      practice: [
        {
          question: "Explique a diferença entre Latch e Flip-Flop.",
          answer: "Latch é sensível ao NÍVEL do sinal (muda enquanto o enable for 1). Flip-Flop é sensível à BORDA do relógio (muda instantaneamente na transição 0->1 ou 1->0), sendo mais seguro para sincronização."
        },
        {
          question: "Desenhe um diagrama de tempo para um Flip-Flop tipo D.",
          answer: "Imagine uma linha de Clock quadrada. Na subida do Clock, a saída Q 'copia' o valor que está na entrada D naquele exato momento e mantém até a próxima subida."
        }
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Circuitos_Som",
      label: "Circuitos Somadores",
      group: 1,
      status: "locked",
      description: "Circuitos lógicos projetados para realizar a adição de números binários.",
      examples: ["Half Adder", "Full Adder"],
      books: ["Digital Design - Morris Mano"],
      practice: [
        {
          question: "Construa uma tabela verdade para um Half Adder.",
          answer: "Entradas A, B. Saídas Soma (S), Carry (C).\n0+0 -> S=0, C=0\n0+1 -> S=1, C=0\n1+0 -> S=1, C=0\n1+1 -> S=0, C=1"
        },
        {
          question: "Explique a diferença entre Half Adder e Full Adder.",
          answer: "Half Adder soma apenas 2 bits (A e B). Full Adder soma 3 bits (A, B e Carry-In), permitindo encadear somadores para números maiores."
        }
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Circuitos_Int",
      label: "Circuitos Integrados",
      group: 1,
      status: "locked",
      description: "Conjunto de circuitos eletrônicos em uma única peça de material semicondutor (Chip).",
      examples: ["Microprocessadores", "Microcontroladores", "FPGAs e ASICs"],
      books: ["Introduction to VLSI Circuits and Systems - John P. Uyemura"],
      practice: [
        {
          question: "Pesquise o que é uma Wafer de silício.",
          answer: "É uma fatia fina de cristal semicondutor (geralmente silício) usada na fabricação de circuitos integrados. Vários chips são impressos nela e depois cortados."
        },
        {
          question: "Explique a lei de Moore referente a circuitos integrados.",
          answer: "A Lei de Moore (1965) observou que o número de transistores em um circuito integrado denso dobra aproximadamente a cada dois anos."
        }
      ],
      links: [
        { label: "Rafael Levi - Controle de servomotor com PIC", url: "https://www.youtube.com/watch?v=EstPBo3lhls" },
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Logica_Bool",
      label: "Lógica Booleana",
      group: 1,
      status: "mastered",
      description: "Álgebra em que os valores das variáveis são verdadeiro e falso, denotados geralmente como 1 e 0.",
      examples: ["Expressões lógicas", "Simplificação de circuitos"],
      books: ["The Laws of Thought - George Boole"],
      practice: [
        {
          question: "Simplifique a expressão: A + A*B.",
          answer: "Lei da Absorção: A + A*B = A. (Se A é verdadeiro, o resultado é verdadeiro. Se A é falso, ambos os termos são falsos)."
        },
        {
          question: "Explique a importância da lógica booleana na computação.",
          answer: "É a base de toda a eletrônica digital. Permite modelar circuitos complexos e decisões lógicas usando apenas dois estados (0 e 1)."
        }
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Tabela_Verdade",
      label: "Tabela Verdade",
      group: 1,
      status: "locked",
      description: "Tabela matemática usada em lógica para computar valores funcionais de expressões lógicas.",
      examples: ["Análise de portas lógicas", "Verificação de circuitos"],
      books: ["Discrete Mathematics and Its Applications - Rosen"],
      practice: [
        {
          question: "Crie a tabela verdade para (A AND B) OR NOT C.",
          answer: "Com 3 variáveis (A, B, C), temos 8 linhas. Calcule A AND B. Calcule NOT C. Faça o OR dos resultados. Ex: Se A=1, B=1, C=0 -> 1 OR 1 = 1."
        },
        {
          question: "Quantas linhas tem uma tabela verdade com 4 variáveis?",
          answer: "2 elevado a N. Para N=4, temos 2^4 = 16 linhas."
        }
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Algebra_Boole",
      label: "Álgebra de Boole",
      group: 1,
      status: "locked",
      description: "Estrutura algébrica que esquematiza as operações lógicas E, OU e NÃO.",
      examples: ["Teoremas de De Morgan", "Mapas de Karnaugh", "Simplificação de Lógica Digital"],
      books: ["Boolean Algebra and Its Applications - J. Eldon Whitesitt"],
      practice: [
        {
          question: "Aplique o Teorema de De Morgan na expressão: NOT(A AND B).",
          answer: "De Morgan diz que a negação de um E é o OU das negações: NOT(A AND B) = (NOT A) OR (NOT B)."
        },
        {
          question: "Use um Mapa de Karnaugh para simplificar uma função de 3 variáveis.",
          answer: "Mapa K organiza a tabela verdade em uma grade onde células adjacentes diferem por apenas 1 bit, facilitando o agrupamento visual de 1s para simplificação."
        }
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Math_Comp",
      label: "Matemática Discreta",
      group: 1,
      status: "locked",
      description: "Estudo de estruturas matemáticas que são fundamentalmente discretas em vez de contínuas.",
      examples: ["Lógica", "Conjuntos", "Grafos", "Criptografia RSA"],
      books: ["Concrete Mathematics - Donald Knuth"],
      practice: [
        {
          question: "Explique a diferença entre matemática contínua e discreta.",
          answer: "Contínua lida com números reais e variações suaves (Cálculo). Discreta lida com valores distintos e contáveis (Inteiros, Lógica, Grafos), essencial para computadores digitais."
        },
        {
          question: "Cite 3 exemplos de estruturas discretas.",
          answer: "1. Grafos (Redes)\n2. Árvores (Estruturas de Dados)\n3. Conjuntos (Coleções de itens únicos)."
        }
      ],
      links: [
        { label: "Rafael Levi - Debate sobre cálculo", url: "https://www.youtube.com/watch?v=cXw5BBpYNkw" },
        { label: "Rafael Levi - Scilab Função", url: "https://www.youtube.com/watch?v=1uPSZLMis6s" },
        { label: "Rafael Levi - Canal YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Teoria_Conj",
      label: "Teoria dos Conjuntos",
      group: 1,
      status: "locked",
      description: "Ramo da matemática que estuda conjuntos, que são coleções de objetos.",
      examples: ["União", "Interseção", "Subconjuntos"],
      books: ["Naive Set Theory - Paul Halmos"],
      practice: [
        {
          question: "Dados A={1,2} e B={2,3}, qual é a união e a interseção?",
          answer: "União (A U B) = {1, 2, 3}. Interseção (A ∩ B) = {2}."
        },
        {
          question: "Explique o que é um conjunto vazio.",
          answer: "É um conjunto que não contém nenhum elemento. Representado por {} ou Ø."
        }
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Analise_Comb",
      label: "Análise Combinatória",
      group: 1,
      status: "locked",
      description: "Estudo de contagem, arranjo e combinação de elementos de conjuntos finitos.",
      examples: ["Permutações", "Combinações", "Problema do Caixeiro Viajante", "Quebra de Senhas"],
      books: ["Principles of Combinatorics - C. Berge"],
      practice: [
        {
          question: "Calcule de quantas formas podemos organizar as letras ABC.",
          answer: "Permutação de 3 elementos = 3! = 3 * 2 * 1 = 6 formas (ABC, ACB, BAC, BCA, CAB, CBA)."
        },
        {
          question: "Explique a diferença entre arranjo e combinação.",
          answer: "Arranjo: a ordem importa (senha '123' != '321'). Combinação: a ordem NÃO importa (salada de fruta {banana, maçã} == {maçã, banana})."
        }
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Teoria_Grafos",
      label: "Teoria dos Grafos",
      group: 1,
      status: "locked",
      description: "Estudo de grafos, que são estruturas matemáticas usadas para modelar relações entre objetos.",
      examples: ["Redes Sociais", "Roteamento de internet", "Google Maps", "Dependências de Pacotes"],
      books: ["Introduction to Graph Theory - Richard J. Trudeau"],
      practice: [
        {
          question: "Desenhe um grafo completo com 4 vértices (K4).",
          answer: "Desenhe 4 pontos (A, B, C, D). Conecte cada ponto a todos os outros 3. Você terá um quadrado com um X no meio (6 arestas no total)."
        },
        {
          question: "Explique a diferença entre grafo direcionado e não direcionado.",
          answer: "Direcionado (Dígrafo): as arestas têm setas (A -> B). Não direcionado: as arestas são bidirecionais (A - B)."
        }
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Sist_Num",
      label: "Sistemas de Numeração",
      group: 1,
      status: "available",
      description: "Sistemas para representar números de forma consistente.",
      examples: ["Decimal", "Binário", "Hexadecimal", "Representação de Cores (RGB)"],
      books: ["Computer Systems: A Programmer's Perspective - Bryant & O'Hallaron"],
      practice: [
        {
          question: "Converta o número 10 de Decimal para Binário.",
          answer: "10 / 2 = 5 (resto 0)\n5 / 2 = 2 (resto 1)\n2 / 2 = 1 (resto 0)\n1 / 2 = 0 (resto 1)\nLendo de baixo para cima: 1010."
        },
        {
          question: "Explique por que usamos diferentes bases numéricas.",
          answer: "Binário (base 2) é fácil para circuitos (ligado/desligado). Hexadecimal (base 16) é compacto para humanos lerem binário. Decimal (base 10) é natural para humanos."
        }
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Binario",
      label: "Base Binária",
      group: 1,
      status: "mastered",
      description: "Sistema de numeração de base 2, usando apenas 0 e 1. A linguagem nativa dos computadores.",
      examples: ["1010 (10 em decimal)", "Bit e Byte", "Máscaras de Sub-rede"],
      books: ["Code: The Hidden Language - Charles Petzold"],
      practice: [
        {
          question: "Converta 1101 (binário) para decimal.",
          answer: "1*2^3 + 1*2^2 + 0*2^1 + 1*2^0\n= 8 + 4 + 0 + 1\n= 13."
        },
        {
          question: "Quantos valores diferentes podemos representar com 8 bits?",
          answer: "2^8 = 256 valores (de 0 a 255)."
        }
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Hexadecimal",
      label: "Base Hexadecimal",
      group: 1,
      status: "locked",
      description: "Sistema de base 16, usado para representar valores binários de forma mais compacta.",
      examples: ["Cores HTML (#FFFFFF)", "Endereços de memória", "Endereços MAC"],
      books: ["Computer Organization and Design - Patterson & Hennessy"],
      practice: [
        {
          question: "Converta o binário 1111 para hexadecimal.",
          answer: "1111 binário = 15 decimal = F em hexadecimal."
        },
        {
          question: "Converta o valor hexadecimal 0xA par decimal.",
          answer: "A em hex vale 10 em decimal."
        }
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Octal",
      label: "Base Octal",
      group: 1,
      status: "locked",
      description: "Sistema de base 8, menos comum hoje mas historicamente importante em computação (permissões Unix).",
      examples: ["Permissões chmod (755)", "PDP-8", "Representação compacta em C"],
      books: ["Unix System Administration Handbook - Evi Nemeth"],
      practice: [
        {
          question: "Converta o decimal 8 para octal.",
          answer: "8 / 8 = 1 (resto 0). Resultado: 10 em octal."
        },
        {
          question: "Explique o significado de 'chmod 777' usando octal.",
          answer: "Cada dígito (7) representa 3 bits (111) -> rwx (read, write, execute). 777 dá permissão total para Dono, Grupo e Outros."
        }
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Bitwise",
      label: "Operações Bitwise",
      group: 1,
      status: "locked",
      description: "Operações que manipulam diretamente os bits individuais de números binários.",
      examples: ["AND, OR, XOR, Shift", "Máscaras de rede", "Flags de Permissão"],
      books: ["Hacker's Delight - Henry S. Warren Jr."],
      practice: [
        {
          question: "Qual o resultado de 1010 AND 1100?",
          answer: "1010\n1100\n----\n1000"
        },
        {
          question: "Realize um 'Left Shift' (<<) no número binário 0011.",
          answer: "0011 << 1 = 0110 (Multiplica por 2)."
        }
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Turing",
      label: "Alan Turing & História",
      group: 1,
      status: "mastered",
      description: "Pai da ciência da computação teórica e inteligência artificial.",
      examples: ["Máquina de Turing", "Teste de Turing", "Problema da Parada"],
      books: ["Alan Turing: The Enigma - Andrew Hodges"],
      practice: [
        {
          question: "Pesquise sobre o papel de Turing na 2ª Guerra Mundial.",
          answer: "Turing liderou a equipe em Bletchley Park que quebrou a criptografia da máquina Enigma nazista, encurtando a guerra em anos e salvando milhões de vidas."
        },
        {
          question: "Explique o conceito do 'Jogo da Imitação'.",
          answer: "Hoje conhecido como Teste de Turing: Proposto para definir inteligência. Se um humano não consegue distinguir se está conversando com uma máquina ou outro humano, a máquina é inteligente."
        }
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Enigma",
      label: "Quebra do Enigma",
      group: 1,
      status: "locked",
      description: "Esforço para decifrar a máquina de criptografia nazista durante a 2ª Guerra Mundial.",
      examples: ["Bombe machine", "Criptanálise", "Bombe de Turing design"],
      books: ["The Code Book - Simon Singh"],
      practice: [
        {
          question: "Descreva como funcionava a máquina Enigma.",
          answer: "Usava rotores eletromecânicos que mudavam a cada tecla pressionada, alterando o circuito. Isso gerava uma cifra polialfabética extremamente complexa (trilhões de combinações)."
        },
        {
          question: "O que era a 'Bombe' de Turing?",
          answer: "Uma máquina eletromecânica projetada para automatizar a descoberta das configurações diárias dos rotores da Enigma, testando milhares de possibilidades rapidamente."
        }
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Maquina_Turing",
      label: "Máquina de Turing",
      group: 1,
      status: "available",
      description: "Modelo matemático abstrato de computação que define o que é computável.",
      examples: ["Fita infinita", "Estados e Transições", "Universal Turing Machine"],
      books: ["The Annotated Turing - Charles Petzold"],
      practice: [
        {
          question: "Descreva os componentes básicos de uma Máquina de Turing.",
          answer: "1. Fita infinita (memória)\n2. Cabeçote de leitura/escrita\n3. Registrador de estado\n4. Tabela de regras (programa)."
        },
        {
          question: "Crie um 'programa' simples para uma Máquina de Turing que inverte bits.",
          answer: "Se ler 0, escreva 1, mova Dir. Se ler 1, escreva 0, mova Dir."
        }
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Teoria_Comp",
      label: "Teoria da Computabilidade",
      group: 1,
      status: "locked",
      description: "Estuda quais problemas podem ser resolvidos por algoritmos computacionais.",
      examples: ["Funções computáveis", "Tese de Church-Turing", "Halting Problem proof"],
      books: ["Introduction to the Theory of Computation - Michael Sipser"],
      practice: [
        {
          question: "O que significa dizer que uma função é computável?",
          answer: "Significa que existe um algoritmo (ou uma Máquina de Turing) que pode calcular o resultado da função em tempo finito para qualquer entrada válida."
        },
        {
          question: "Pesquise sobre a Tese de Church-Turing.",
          answer: "Afirma que qualquer função que seja 'computável' por um método efetivo pode ser computada por uma Máquina de Turing. Define os limites do que computadores podem fazer."
        }
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Prob_Parada",
      label: "Problema da Parada",
      group: 1,
      status: "locked",
      description: "Problema indecidível que demonstra que não existe algoritmo geral para saber se um programa vai parar ou rodar para sempre.",
      examples: ["Limites da computação", "Paradoxos lógicos", "Gödel's Incompleteness Theorems"],
      books: ["Godel, Escher, Bach - Douglas Hofstadter"],
      practice: [
        {
          question: "Explique o Problema da Parada em suas palavras.",
          answer: "É impossível criar um programa que olhe para QUALQUER outro programa e diga com 100% de certeza se ele vai parar um dia ou rodar em loop infinito."
        },
        {
          question: "Por que não podemos criar um antivírus perfeito?",
          answer: "Devido à indecidibilidade (similar ao Problema da Parada), não podemos criar um algoritmo que detecte TODOS os malwares possíveis sem erro."
        }
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Automatos",
      label: "Autômatos",
      group: 1,
      status: "locked",
      description: "Máquinas abstratas que processam sequências de entradas e mudam de estado.",
      examples: ["Máquinas de estado finito", "Regex", "Compiladores", "Traffic Light Controller"],
      books: ["Introduction to Automata Theory, Languages, and Computation - Hopcroft, Motwani, Ullman"],
      practice: [
        {
          question: "Desenhe um automato finito que aceita strings terminadas em '00'.",
          answer: "Estados: Start, Leu0, Leu00(Aceita). Se ler 1 volta Start. Se ler 0 avança. Se estiver em Leu0 e ler 0, vai p/ Aceita."
        },
        {
          question: "Diferencie automatos finitos determinísticos e não-determinísticos.",
          answer: "Determinístico (DFA): Para cada estado e entrada, há EXATAMENTE uma transição. Não-determinístico (NFA): Pode haver 0, 1 ou múltiplas transições para a mesma entrada."
        }
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },

    // --- 2. HARDWARE E ARQUITETURA DE MÁQUINA ---
    {
      id: "Von_Neumann",
      label: "Arquitetura Von Neumann",
      group: 2,
      status: "mastered",
      description: "Modelo arquitetural de computadores comerciais, onde dados e instruções compartilham a mesma memória.",
      examples: ["PCs modernos", "Ciclo Fetch-Decode-Execute", "Stored-program concept"],
      books: ["Computer Systems - Bryant & O'Hallaron"],
      practice: [
        {
          question: "Desenhe um diagrama do Modelo Von Neumann.",
          answer: "Blocos: CPU (UC + ULA), Memória, Entrada/Saída. Barramentos conectam tudo. Dados e instruções ficam na mesma Memória."
        },
        {
          question: "Explique o gargalo de Von Neumann.",
          answer: "Como instruções e dados compartilham o mesmo barramento, a CPU tem que esperar os dados chegarem da memória, que é muito mais lenta que o processador."
        }
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "CPU",
      label: "CPU",
      group: 2,
      status: "available",
      description: "Unidade Central de Processamento - o cérebro do computador responsável por executar instruções.",
      examples: ["Intel Core i9", "AMD Ryzen", "Apple Silicon", "Clock Speed (GHz)"],
      books: ["Structured Computer Organization - Andrew S. Tanenbaum"],
      practice: [
        {
          question: "Liste os principais componentes de uma CPU.",
          answer: "1. Unidade de Controle (UC)\n2. Unidade Lógica e Aritmética (ULA)\n3. Registradores\n4. Cache (interna)."
        },
        {
          question: "Diferencie processadores RISC e CISC.",
          answer: "RISC (Reduced Instruction Set): Instruções simples e rápidas (ARM). CISC (Complex Instruction Set): Instruções complexas que fazem muito em um ciclo (x86)."
        }
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "ULA",
      label: "Unidade Lógica Aritmética",
      group: 2,
      status: "locked",
      description: "Circuito digital que realiza operações aritméticas (soma, subtração) e lógicas (AND, OR).",
      examples: ["Cálculos matemáticos na CPU", "Comparações lógicas", "Bitwise Operations"],
      books: ["Digital Design and Computer Architecture - Harris & Harris"],
      practice: [
        {
          question: "Simule uma soma de 4 bits na ULA.",
          answer: "Ex: 0101 (5) + 0011 (3). Bit a bit com Carry. 1+1=0(vai1), 1+0+1=0(vai1), 1+1=0(vai1), 0+0+1=1. Res: 1000 (8)."
        },
        {
          question: "Quais operações lógicas uma ULA padrão suporta?",
          answer: "AND, OR, NOT, XOR. Além das aritméticas (ADD, SUB)."
        }
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "UC",
      label: "Unidade de Controle",
      group: 2,
      status: "locked",
      description: "Componente da CPU que direciona a operação do processador, controlando o fluxo de dados.",
      examples: ["Decodificação de instruções", "Sinais de clock", "Microcode"],
      books: ["Computer Organization and Design - Patterson & Hennessy"],
      practice: [
        {
          question: "Descreva o papel da UC no ciclo de instrução.",
          answer: "A UC busca a instrução na memória, decodifica o que deve ser feito e envia sinais de controle para a ULA e Memória para executar a ação."
        },
        {
          question: "O que são sinais de controle?",
          answer: "Pulsos elétricos enviados pela UC para 'ligar' ou 'desligar' partes do circuito (ex: habilitar escrita na memória, selecionar operação de soma na ULA)."
        }
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Registradores",
      label: "Registradores",
      group: 2,
      status: "locked",
      description: "Pequena quantidade de memória ultra-rápida dentro da CPU usada para armazenar dados temporários.",
      examples: ["PC (Program Counter)", "IR (Instruction Register)", "Acumulador", "Stack Pointer (SP)"],
      books: ["Computer Architecture: A Quantitative Approach - Hennessy & Patterson"],
      practice: [
        {
          question: "Explique a função do Program Counter (PC).",
          answer: "Guarda o endereço de memória da PRÓXIMA instrução a ser executada. É incrementado a cada ciclo."
        },
        {
          question: "Por que os registradores são mais rápidos que a RAM?",
          answer: "Estão fisicamente dentro do núcleo da CPU e operam na mesma velocidade do clock do processador, sem latência de barramento."
        }
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Ciclo_Instr",
      label: "Ciclo de Instrução",
      group: 2,
      status: "locked",
      description: "Processo pelo qual o computador busca, decodifica e executa uma instrução de programa.",
      examples: ["Fetch", "Decode", "Execute", "Store", "Interrupt Handling"],
      books: ["Computer Organization & Architecture - William Stallings"],
      practice: [
        {
          question: "Descreva as etapas Fetch, Decode e Execute.",
          answer: "Fetch: Buscar instrução na memória.\nDecode: Entender o que a instrução faz.\nExecute: Realizar a operação (na ULA, Mémória, etc)."
        },
        {
          question: "O que acontece na etapa Store?",
          answer: "O resultado da execução é escrito de volta em um registrador ou na memória."
        }
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Multi_Core",
      label: "Processadores Multi-core",
      group: 2,
      status: "locked",
      description: "Processadores com múltiplos núcleos de processamento independentes em um único chip.",
      examples: ["Processamento paralelo", "Threads simultâneas", "Amdahl's Law"],
      books: ["Multicore Application Programming - Darryl Gove"],
      practice: [
        {
          question: "Diferencie processamento paralelo de concorrente.",
          answer: "Paralelo: Várias tarefas acontecem EXATAMENTE ao mesmo tempo (multicore). Concorrente: Várias tarefas progridem, mas alternando o uso da CPU (time-slicing)."
        },
        {
          question: "Quais os desafios de programar para multi-core?",
          answer: "Sincronização de dados, condições de corrida (Race Conditions) e Deadlocks."
        }
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Escalonamento_Hw",
      label: "Escalonamento Instruções",
      group: 2,
      status: "locked",
      description: "Técnicas de hardware para melhorar o desempenho, como Pipelining e Execução Fora de Ordem.",
      examples: ["Pipelining", "Branch Prediction", "Superscalar Architecture"],
      books: ["Modern Processor Design - Shen & Lipasti"],
      practice: [
        {
          question: "Desenhe um pipeline de 5 estágios.",
          answer: "Estágios clássicos (RISC): 1. Fetch 2. Decode 3. Execute 4. Memory 5. Writeback. Como uma linha de montagem de fábrica."
        },
        {
          question: "Explique o conceito de Branch Prediction.",
          answer: "A CPU tenta adivinhar o caminho de um 'IF' antes de saber o resultado real. Se acertar, ganha tempo. Se errar, descarta o trabalho."
        }
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Memoria_Hier",
      label: "Hierarquia de Memória",
      group: 2,
      status: "available",
      description: "Organização da memória em níveis baseados em velocidade e custo (Registradores > Cache > RAM > Disco).",
      examples: ["Pirâmide de memória", "Latência vs Capacidade", "Locality of Reference"],
      books: ["Memory Systems: Cache, DRAM, Disk - Jacob, Ng, Wang"],
      practice: [
        {
          question: "Desenhe a pirâmide da hierarquia de memória.",
          answer: "Topo (Menor/Rápido): Registradores.\nCache L1/L2/L3.\nRAM.\nBase (Maior/Lento): SSD/HD."
        },
        {
          question: "Explique o princípio da localidade.",
          answer: "Programas tendem a acessar dados próximos aos que acabaram de acessar (Localidade Espacial) ou acessar os mesmos dados repetidamente (Localidade Temporal)."
        }
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "RAM",
      label: "Memória RAM",
      group: 2,
      status: "locked",
      description: "Memória de Acesso Aleatório - memória volátil principal usada pelo computador.",
      examples: ["DDR4", "DDR5", "LPDDR", "Volatile Memory"],
      books: ["Understanding Solid State Physics - Holgate"],
      practice: [
        {
          question: "Por que a RAM é volátil?",
          answer: "Ela precisa de energia constante para manter os dados. Se desligar o PC, os capacitores descarregam e os dados somem."
        },
        {
          question: "Compare a velocidade da RAM vs SSD.",
          answer: "RAM é ordens de magnitude mais rápida (nanossegundos) que SSD (microssegundos). RAM ~20-50GB/s vs SSD ~5GB/s."
        }
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Cache_L1",
      label: "Cache L1",
      group: 2,
      status: "locked",
      description: "Nível de cache mais rápido e menor, integrado diretamente no núcleo do processador.",
      examples: ["Cache de Instrução", "Cache de Dados"],
      books: ["Computer Architecture - Hennessy & Patterson"]
    },
    {
      id: "Cache_L2",
      label: "Cache L2",
      group: 2,
      status: "locked",
      description: "Nível intermediário de cache, maior que L1 mas ligeiramente mais lento.",
      examples: ["Cache unificado"],
      books: ["Computer Architecture - Hennessy & Patterson"]
    },
    {
      id: "Cache_L3",
      label: "Cache L3",
      group: 2,
      status: "locked",
      description: "Maior nível de cache on-die, geralmente compartilhado entre todos os núcleos.",
      examples: ["Smart Cache Intel"],
      books: ["Computer Architecture - Hennessy & Patterson"]
    },
    {
      id: "SSD",
      label: "SSD & NVMe",
      group: 2,
      status: "locked",
      description: "Armazenamento persistente de estado sólido (Flash), muito mais rápido que HDDs mecânicos.",
      examples: ["Memória NAND Flash", "Protocolo NVMe vs SATA", "Wear Leveling"],
      books: ["Inside Solid State Drives (SSDs) - Micheloni et al."],
      practice: [
        {
          question: "Explique como funciona a memória Flash NAND.",
          answer: "Usa transistores de porta flutuante para prender elétrons. A presença ou ausência de elétrons define o bit (0 ou 1), mantendo o dado sem energia."
        },
        {
          question: "Por que NVMe é mais rápido que SATA?",
          answer: "SATA foi feito para HDs mecânicos. NVMe usa o barramento PCIe diretamente, com milhares de filas de comando paralelas."
        }
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Hardware_Prog",
      label: "Hardware Programável",
      group: 2,
      status: "locked",
      description: "Hardware que pode ser reconfigurado após a fabricação para desempenhar funções lógicas diferentes.",
      examples: ["FPGA", "CPLD", "Reconfigurable Computing"],
      books: ["Digital System Design with FPGA - Cem Unsalan"],
      practice: [
        {
          question: "O que significa FPGA?",
          answer: "Field-Programmable Gate Array. É um chip 'em branco' que você programa para virar o hardware que você quiser (ex: processador, controlador de vídeo)."
        },
        {
          question: "Cite um caso de uso onde FPGA é superior a CPU.",
          answer: "Processamento de sinais em tempo real (ex: radar), simulação de chips ou criptografia de alta velocidade."
        }
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "FPGA",
      label: "Dispositivos FPGA",
      group: 2,
      status: "locked",
      description: "Field-Programmable Gate Array - circuitos integrados projetados para serem configurados pelo cliente.",
      examples: ["Prototipagem de chips", "Aceleração de hardware", "Soft Processors (Nios, MicroBlaze)"],
      books: ["FPGA Prototyping by Verilog Examples - Pong P. Chu"],
      practice: [
        {
          question: "Pesquise sobre LUTs (Look-Up Tables).",
          answer: "LUTs são o bloco básico de FPGAs. Elas funcionam como pequenas memórias que armazenam a saída de uma função lógica para qualquer combinação de entrada."
        },
        {
          question: "Como FPGAs são usados em Data Centers?",
          answer: "Microsoft (Bing) e Amazon (AWS) usam FPGAs para acelerar tarefas específicas como busca, IA e redes, reprogramando-os conforme a necessidade."
        }
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Verilog",
      label: "Linguagem Verilog",
      group: 2,
      status: "locked",
      description: "Linguagem de Descrição de Hardware (HDL) usada para modelar sistemas eletrônicos.",
      examples: ["Design de lógica digital", "Verificação", "Simulation Waveforms"],
      books: ["Verilog HDL: A Guide to Digital Design and Synthesis - Samir Palnitkar"],
      practice: [
        {
          question: "Escreva um módulo Verilog para uma porta AND.",
          answer: "module MyAnd(input a, input b, output y);\n  assign y = a & b;\nendmodule"
        },
        {
          question: "O que é um 'testbench'?",
          answer: "É um código que não vira hardware, mas serve para simular e testar seu design enviando sinais virtuais e verificando as saídas."
        }
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "VHDL",
      label: "Linguagem VHDL",
      group: 2,
      status: "locked",
      description: "Outra linguagem de descrição de hardware padrão da indústria.",
      examples: ["Projetos militares/aeroespaciais", "Sistemas embarcados", "Concurrent Signal Assignment"],
      books: ["Circuit Design with VHDL - Volnei A. Pedroni"],
      practice: [
        {
          question: "Compare VHDL com Verilog.",
          answer: "Verilog é parecido com C, mais conciso e popular nos EUA. VHDL é baseado em Ada, mais verboso, fortemente tipado e popular na Europa e defesa."
        },
        {
          question: "O que significa VHDL ser fortemente tipado?",
          answer: "Você não pode misturar tipos (ex: bit com inteiro) sem conversão explícita, o que evita muitos erros de design."
        }
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Assembly",
      label: "Assembly",
      group: 2,
      status: "available",
      description: "Linguagem de baixo nível específica para uma arquitetura de processador, legível por humanos.",
      examples: ["MOV AX, BX", "JMP loop", "Registers manipulation (EAX, EBX)"],
      books: ["Assembly Language for x86 Processors - Kip Irvine"],
      practice: [
        {
          question: "O que faz a instrução MOV?",
          answer: "Move (copia) dados de um lugar para outro. Ex: MOV AX, 5 (coloca o valor 5 no registrador AX)."
        },
        {
          question: "Escreva um pseudocódigo Assembly para somar dois números.",
          answer: "MOV AX, 10\nMOV BX, 20\nADD AX, BX  ; Resultado 30 fica em AX"
        }
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Ponteiros",
      label: "Ponteiros de Memória",
      group: 2,
      status: "locked",
      description: "Variáveis que armazenam endereços de memória em vez de valores diretos.",
      examples: ["Gestão direta de memória em C", "Referenciação e Desreferenciação", "Null Pointer Exception"],
      books: ["Pointers on C - Kenneth Reek"],
      practice: [
        {
          question: "O que armazena uma variável ponteiro?",
          answer: "Armazena o ENDEREÇO de memória de outra variável, não o valor em si."
        },
        {
          question: "Desenhe a memória representando um ponteiro e seu valor.",
          answer: "Var 'A' (valor 50) no endereço 0x100. Var 'P' (ponteiro) no endereço 0x200 tem o valor 0x100 inside."
        }
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Alocacao_Din",
      label: "Alocação Dinâmica",
      group: 2,
      status: "locked",
      description: "Reserva de memória durante a execução do programa (Heap) em vez de na compilação (Stack).",
      examples: ["malloc() e free()", "Memory Leaks", "Garbage Collection strategies"],
      books: ["The C Programming Language - Kernighan & Ritchie"],
      practice: [
        {
          question: "Qual a diferença entre Stack e Heap?",
          answer: "Stack (Pilha): Memória estática, rápida, variáveis locais, limpa automático. Heap: Memória dinâmica, manual (malloc), maior mas mais lenta e risco de leaks."
        },
        {
          question: "O que acontece se não usarmos free()?",
          answer: "Memory Leak (Vazamento). O programa continua ocupando RAM que não usa mais. Se rodar muito tempo, pode travar o PC."
        }
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Compiladores",
      label: "Compiladores",
      group: 2,
      status: "locked",
      description: "Programas que traduzem código fonte de alto nível para linguagem de máquina.",
      examples: ["GCC", "Clang", "Otimização de código", "Linker & Loader"],
      books: ["Compilers: Principles, Techniques, and Tools - Aho, Lam, Sethi, Ullman"],
      practice: [
        {
          question: "Liste as fases de um compilador.",
          answer: "1. Léxico\n2. Sintático\n3. Semântico\n4. Otimização\n5. Geração de Código."
        },
        {
          question: "Diferencie Análise Léxica de Sintática.",
          answer: "Léxica: Quebra o texto em tokens (palavras). Sintática: Verifica a gramática e a estrutura (se a frase faz sentido)."
        }
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Interpretadores",
      label: "Interpretadores",
      group: 2,
      status: "locked",
      description: "Programas que executam instruções de código fonte diretamente, sem compilação prévia para binário.",
      examples: ["Python", "JavaScript V8", "Ruby", "Bytecode Execution"],
      books: ["Writing An Interpreter In Go - Thorsten Ball"],
      practice: [
        {
          question: "O que é um REPL?",
          answer: "Read-Eval-Print Loop. Um ambiente interativo onde você digita código e vê o resultado na hora (ex: console do Python ou Chrome)."
        },
        {
          question: "Como um interpretador difere de um compilador JIT?",
          answer: "Interpretador traduz linha por linha na hora. JIT (Just-In-Time) compila trechos quentes para código de máquina durante a execução para acelerar."
        }
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Parsing",
      label: "Análise Sintática (Parsing)",
      group: 2,
      status: "locked",
      description: "Processo de analisar uma sequência de símbolos para determinar sua estrutura gramatical.",
      examples: ["Árvore de Sintaxe Abstrata (AST)", "JSON.parse()", "Context-Free Grammars"],
      books: ["Parsing Techniques: A Practical Guide - Dick Grune"],
      practice: [
        {
          question: "O que é uma AST?",
          answer: "Abstract Syntax Tree (Árvore de Sintaxe Abstrata). Representação em árvore da estrutura do seu código usada pelo compilador."
        },
        {
          question: "Dê um exemplo de erro de sintaxe.",
          answer: "Esquecer um ponto e vírgula, não fechar parênteses. O compilador não entende o que você escreveu."
        }
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Codigo_Maquina",
      label: "Geração Código Máquina",
      group: 2,
      status: "locked",
      description: "Fase final da compilação que produz instruções binárias executáveis pela CPU.",
      examples: ["Opcodes", "Arquivos .exe ou ELF", "Assembly Mnemonic Mappings"],
      books: ["Engineering a Compiler - Cooper & Torczon"],
      practice: [
        {
          question: "O que são opcodes?",
          answer: "São os códigos numéricos (binários) que dizem à CPU qual operação realizar (ex: 101000 igual a ADD)."
        },
        {
          question: "Visualize um arquivo binário em um editor Hex.",
          answer: "Abra um .exe ou imagem num editor Hex. Você verá bytes (ex: A0 5F) que são a representação crua dos dados e código."
        }
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },

    // --- 3. ALGORITMOS E CIÊNCIA DA COMPUTAÇÃO ---
    {
      id: "Algoritmos",
      label: "Lógica de Programação",
      group: 3,
      status: "mastered",
      description: "Sequência finita de instruções bem definidas para resolver um problema.",
      examples: ["Receita de bolo", "Passo a passo lógico", "Fluxogramas"],
      books: ["Algoritmos: Lógica para Desenvolvimento de Programação - Manzano"],
      practice: [
        {
          question: "Escreva um algoritmo para trocar uma lâmpada.",
          answer: "1. Pegar escada. 2. Subir. 3. Girar lâmpada queimada (anti-horário). 4. Colocar nova (horário). 5. Testar interruptor."
        },
        {
          question: "Desenhe um fluxograma para calcular a média de 2 notas.",
          answer: "Início -> Ler N1, N2 -> M = (N1+N2)/2 -> Se M >= 6: Aprovado, Senão: Reprovado -> Fim."
        }
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Buscas",
      label: "Algoritmos de Busca",
      group: 3,
      status: "available",
      description: "Métodos para encontrar um item específico em uma coleção de dados.",
      examples: ["Busca Binária", "Busca Linear", "Hashing"],
      books: ["Introduction to Algorithms - Cormen et al. (CLRS)"],
      practice: [
        {
          question: "Implemente uma busca linear em um array.",
          answer: "Percorra o array do início ao fim (for loop). Se o elemento atual for igual ao buscado, retorne o índice. Se terminar e não achar, retorne -1."
        },
        {
          question: "Implemente uma busca binária (iterativa ou recursiva).",
          answer: "Requer array ordenado. 1. Pegue o elemento do meio. 2. Se for igual, achou. 3. Se for maior que buscado, repita na metade esquerda. 4. Se menor, metade direita. O(log n)."
        }
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Ordenacao",
      label: "Algoritmos de Ordenação",
      group: 3,
      status: "locked",
      description: "Algoritmos que colocam elementos de uma lista em uma certa ordem (numérica, alfabética).",
      examples: ["Quick Sort", "Merge Sort", "Bubble Sort", "Radix Sort"],
      books: ["Introduction to Algorithms - Cormen et al. (CLRS)"],
      practice: [
        {
          question: "Implemente o Bubble Sort.",
          answer: "Percorra a lista comparando elementos adjacentes. Se estarem fora de ordem, troque-os. Repita até que nenhuma troca seja necessária. O(n²)."
        },
        {
          question: "Compare a performance do Merge Sort vs Bubble Sort.",
          answer: "Merge Sort é O(n log n) e muito mais eficiente para grandes listas. Bubble Sort é O(n²) e só serve para listas muito pequenas ou quase ordenadas."
        }
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "BigO_Time",
      label: "Big O (Tempo)",
      group: 3,
      status: "locked",
      description: "Notação para descrever o limite superior da complexidade de tempo de um algoritmo no pior caso.",
      examples: ["O(1) - Constante", "O(n) - Linear", "O(n²) - Quadrático", "O(log n) - Logarítmico"],
      books: ["Cracking the Coding Interview - Gayle Laakmann McDowell"],
      practice: [
        {
          question: "Qual a complexidade de tempo de acessar um array pelo índice?",
          answer: "O(1) - Tempo Constante. Como a memória é contígua, o computador calcula o endereço exato instantaneamente: Base + (Índice * Tamanho)."
        },
        {
          question: "Qual a complexidade de buscar em uma lista não ordenada?",
          answer: "O(n) - Tempo Linear. No pior caso (elemento no fim ou inexistente), você precisa verificar todos os N elementos."
        }
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "BigO_Space",
      label: "Big O (Espaço)",
      group: 3,
      status: "locked",
      description: "Medida de quanta memória extra um algoritmo precisa para executar.",
      examples: ["Complexidade Espacial", "Uso de memória auxiliar", "In-place Algorithms"],
      books: ["Cracking the Coding Interview - Gayle Laakmann McDowell"],
      practice: [
        {
          question: "Qual a complexidade de espaço do Merge Sort?",
          answer: "O(n). Ele precisa de arrays auxiliares para armazenar os dados durante a fase de 'Merge' (intercalação)."
        },
        {
          question: "Explique por que recursão usa espaço na Stack.",
          answer: "Cada chamada recursiva cria um novo 'Stack Frame' com variáveis locais e endereço de retorno. Se a recursão for muito profunda, pode causar Stack Overflow."
        }
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Recursividade",
      label: "Recursividade",
      group: 3,
      status: "locked",
      description: "Técnica onde uma função chama a si mesma para resolver instâncias menores do problema.",
      examples: ["Fatorial", "Torre de Hanói", "Fibonacci", "Fractais"],
      books: ["The Little Schemer - Friedman & Felleisen"],
      practice: [
        {
          question: "Escreva uma função recursiva para calcular fatorial.",
          answer: "function fat(n) { if(n <= 1) return 1; return n * fat(n-1); }"
        },
        {
          question: "O que é 'Base Case' em recursão?",
          answer: "É a condição de parada que impede a função de chamar a si mesma infinitamente. Ex: if(n <= 1) em fatorial."
        }
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "BFS",
      label: "Busca em Largura (BFS)",
      group: 3,
      status: "locked",
      description: "Algoritmo de travessia de grafos que explora todos os vizinhos antes de ir para o próximo nível.",
      examples: ["Caminho mais curto em grafos sem peso", "Redes sociais", "Web Crawlers"],
      books: ["Algorithms - Robert Sedgewick"],
      practice: [
        {
          question: "Simule um BFS em uma árvore no papel.",
          answer: "Comece na Raiz. Visite todos os filhos da Raiz (Nível 1). Depois visite todos os filhos desses nós (Nível 2). E assim por diante."
        },
        {
          question: "BFS usa Fila ou Pilha?",
          answer: "Usa uma FILA (Queue). Quem entra primeiro (vizinhos próximos) é visitado primeiro."
        }
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "DFS",
      label: "Busca em Profundidade (DFS)",
      group: 3,
      status: "locked",
      description: "Algoritmo de travessia que explora o máximo possível ao longo de cada ramo antes de retroceder.",
      examples: ["Labirintos", "Detecção de ciclos", "Topological Sort"],
      books: ["Algorithms - Robert Sedgewick"],
      practice: [
        {
          question: "Simule um DFS em um grafo.",
          answer: "Comece na Raiz. Escolha um vizinho e vá o mais fundo possível nesse caminho até não ter saída. Volte (Backtrack) e tente outro caminho."
        },
        {
          question: "DFS é melhor implementado com Fila ou Pilha?",
          answer: "Usa uma PILHA (Stack) ou a própria pilha de chamada da recursão. O último nó descoberto é o primeiro a ser explorado."
        }
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Gulosos",
      label: "Algoritmos Gulosos",
      group: 3,
      status: "locked",
      description: "Algoritmos que fazem a escolha localmente ótima em cada etapa na esperança de encontrar o ótimo global.",
      examples: ["Algoritmo de Dijkstra", "Codificação de Huffman"],
      books: ["Algorithm Design - Kleinberg & Tardos"],
      practice: [
        {
          question: "Resolva o problema do troco usando algoritmo guloso.",
          answer: "Para dar R$18: Pegue a maior nota possível <= 18 (10). Resta 8. Pegue maior <= 8 (5). Resta 3. Pegue (2). Resta 1. Pegue (1). Total: 10, 5, 2, 1."
        },
        {
          question: "O algoritmo de Dijkstra é guloso?",
          answer: "Sim. A cada passo, ele escolhe o vértice com a menor distância acumulada conhecida e 'congela' esse valor, assumindo que é o melhor caminho até ali."
        }
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Prog_Dinamica",
      label: "Programação Dinâmica",
      group: 3,
      status: "locked",
      description: "Método para resolver problemas complexos quebrando-os em subproblemas mais simples e armazenando seus resultados.",
      examples: ["Problema da Mochila", "Fibonacci otimizado (Memoization)", "Longest Common Subsequence"],
      books: ["Dynamic Programming for Coding Interviews - Meenakshi & Kamal Rawat"],
      practice: [
        {
          question: "Calcule o 10º número de Fibonacci com Memoization.",
          answer: "Fib(10) chama Fib(9) e Fib(8). Quando Fib(8) for calculado pela primeira vez, SALVE o resultado. Quando Fib(9) precisar de Fib(8) novamente, USE o valor salvo instantaneamente."
        },
        {
          question: "Explique a diferença entre abordagem Top-Down e Bottom-Up.",
          answer: "Top-Down (Memoization): Começa do problema grande e resolve recursivamente. Bottom-Up (Tabulation): Começa dos casos base (0, 1) e preenche uma tabela iterativamente até chegar no N."
        }
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Est_Dados_Basic",
      label: "Estruturas Básicas",
      group: 3,
      status: "mastered",
      description: "Formas fundamentais de organizar dados para uso eficiente.",
      examples: ["Arrays", "Listas", "Pilhas e Filas"],
      books: ["Data Structures and Algorithms in Java - Robert Lafore"],
      practice: [
        {
          question: "Cite 3 estruturas de dados lineares.",
          answer: "1. Array (Vetor)\n2. Lista Ligada\n3. Fila (Queue)\nA Pilha (Stack) também é linear."
        },
        {
          question: "Qual a diferença entre Array e Lista Ligada?",
          answer: "Array: Tamanho fixo, memória contígua, acesso rápido O(1), inserção lenta O(n). Lista: Tamanho dinâmico, memória espalhada, acesso lento O(n), inserção rápida O(1) se tiver o ponteiro."
        }
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Vetores",
      label: "Vetores (Arrays)",
      group: 3,
      status: "mastered",
      description: "Coleção de elementos, identificados por índice, armazenados contiguamente na memória.",
      examples: ["Acesso O(1)", "Tamanho fixo ou dinâmico", "Matrizes Multidimensionais"],
      books: ["Introduction to Algorithms - Cormen et al. (CLRS)"],
      practice: [
        {
          question: "Crie um array de 5 inteiros e some seus valores.",
          answer: "int arr[] = {1, 2, 3, 4, 5}; int soma = 0; for(int i=0; i<5; i++) soma += arr[i];"
        },
        {
          question: "Como inserir um elemento no meio de um array?",
          answer: "É custoso. Você precisa deslocar (shift) todos os elementos à direita da posição desejada uma casa para frente para abrir espaço, depois inserir. O(n)."
        }
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Listas_Lig",
      label: "Listas Ligadas",
      group: 3,
      status: "available",
      description: "Coleção linear de elementos onde cada elemento aponta para o próximo.",
      examples: ["Lista Simplesmente Encadeada", "Lista Dupla", "Lista Circular"],
      books: ["Data Structures and Algorithms - Aho, Hopcroft, Ullman"],
      practice: [
        {
          question: "Implemente um nó básico de lista ligada.",
          answer: "struct Node { int data; Node* next; }; // Em C++ ou similar"
        },
        {
          question: "Qual a complexidade de remover o primeiro elemento de uma lista ligada?",
          answer: "O(1). Basta atualizar o ponteiro 'Head' para apontar para o segundo nó (Head = Head.next) e liberar a memória do antigo primeiro."
        }
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Pilhas",
      label: "Pilhas (Stacks)",
      group: 3,
      status: "available",
      description: "Estrutura LIFO (Last In, First Out) - o último a entrar é o primeiro a sair.",
      examples: ["Botão Voltar do navegador", "Pilha de chamadas de função", "Undo/Redo editors"],
      books: ["Data Structures and Algorithms - Aho, Hopcroft, Ullman"],
      practice: [
        {
          question: "Implemente uma Pilha usando Array.",
          answer: "Use um array e uma variável 'topo'. Push: array[++topo] = x. Pop: return array[topo--]."
        },
        {
          question: "Aplique uma Pilha para verificar balanceamento de parênteses.",
          answer: "Percorra a string. Se achar '(', empilhe. Se achar ')', desempilhe. Se terminar com pilha vazia e sem erros, está balanceado."
        }
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Filas",
      label: "Filas (Queues)",
      group: 3,
      status: "available",
      description: "Estrutura FIFO (First In, First Out) - o primeiro a entrar é o primeiro a sair.",
      examples: ["Fila de impressão", "Atendimento ao cliente", "Buffers de IO"],
      books: ["Data Structures and Algorithms - Aho, Hopcroft, Ullman"],
      practice: [
        {
          question: "Implemente uma Fila usando Array.",
          answer: "Requer dois ponteiros: 'início' e 'fim'. Enqueue: array[fim++] = x. Dequeue: return array[inicio++]. (Cuidado com o fim do array, usar array circular)."
        },
        {
          question: "Simule o atendimento de processos com uma Fila.",
          answer: "Processos chegam e entram na Fila de Pronto. O escalonador pega o primeiro da fila, dá a CPU para ele. Se acabar o tempo, ele volta pro fim da fila."
        }
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Mapas_Hash",
      label: "Tabelas Hash",
      group: 3,
      status: "locked",
      description: "Estrutura que mapeia chaves para valores, permitindo busca muito rápida.",
      examples: ["Dicionários em Python", "Objetos JS (conceitualmente)", "Database Indexing"],
      books: ["Introduction to Algorithms - Cormen et al. (CLRS)"],
      practice: [
        {
          question: "O que é uma colisão em Hash Table?",
          answer: "Quando a função de hash calcula o MESMO índice para duas chaves diferentes. Ex: hash('uva') = 5 e hash('banana') = 5."
        },
        {
          question: "Como funciona o encadeamento (Chaining)?",
          answer: "Cada posição da tabela hash contém uma Lista Ligada. Se houver colisão, o novo item é adicionado à lista daquela posição."
        }
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Est_Dados_Adv",
      label: "Est. Avançadas",
      group: 3,
      status: "locked",
      description: "Estruturas mais complexas para casos de uso específicos e performance.",
      examples: ["Árvores Balanceadas", "Grafos", "Trie (Prefix Tree)"],
      books: ["Advanced Data Structures - Peter Brass"],
      practice: [
        {
          question: "O que garante que uma árvore AVL esteja balanceada?",
          answer: "A cada inserção ou remoção, ela verifica a 'altura' das subárvores. Se a diferença for maior que 1, ela realiza Rotações (simples ou duplas) para reequilibrar."
        },
        {
          question: "Cite uma aplicação de Grafos no mundo real.",
          answer: "GPS/Waze: O mapa é um grafo onde esquinas são nós e ruas são arestas com pesos (distância/tempo). Dijkstra/A* acha o caminho."
        }
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Arvores_Bin",
      label: "Árvores Binárias",
      group: 3,
      status: "locked",
      description: "Estrutura hierárquica onde cada nó tem no máximo dois filhos.",
      examples: ["Árvore de Busca Binária (BST)", "AVL Trees", "Red-Black Trees"],
      books: ["Introduction to Algorithms - Cormen et al. (CLRS)"],
      practice: [
        {
          question: "Desenhe uma Árvore de Busca Binária com 5 números.",
          answer: "Raiz: 10. Esquerda: 5. Direita: 15. Esquerda do 5: 2. Direita do 5: 7. Propriedade: Menores à esquerda, maiores à direita."
        },
        {
          question: "Como encontrar o menor valor em uma BST?",
          answer: "Comece na raiz e vá para esquerda repetidamente até não poder mais. O último nó é o menor."
        }
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Heaps",
      label: "Heaps Binários",
      group: 3,
      status: "locked",
      description: "Árvore binária especializada que satisfaz a propriedade de heap (pai maior/menor que filhos).",
      examples: ["Fila de Prioridade", "Heap Sort", "Agendamento de Tarefas"],
      books: ["Introduction to Algorithms - Cormen et al. (CLRS)"],
      practice: [
        {
          question: "Onde está o maior elemento em um Max-Heap?",
          answer: "Sempre na Raiz (topo). É o acesso O(1) do máximo."
        },
        {
          question: "Remova a raiz de um Heap e reajuste a estrutura.",
          answer: "1. Tire a Raiz. 2. Pule o último elemento do heap para a posição da Raiz. 3. Faça 'Heapify Down' (troque com o maior filho repetidamente) até reestabelecer a ordem."
        }
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Sets",
      label: "Conjuntos (Sets)",
      group: 3,
      status: "locked",
      description: "Coleção de elementos únicos, sem ordem definida.",
      examples: ["Verificação de duplicatas", "Operações matemáticas de conjunto", "Venn Diagrams"],
      books: ["Discrete Mathematics and Its Applications - Kenneth H. Rosen"],
      practice: [
        {
          question: "Adicione duplicatas em um Set e veja o que acontece.",
          answer: "O Set ignora. Se você adicionar {1, 2, 2, 3}, o Set conterá apenas {1, 2, 3}."
        },
        {
          question: "Implemente a união de dois Sets.",
          answer: "Crie um novo Set. Adicione todos de A. Adicione todos de B (duplicatas serão ignoradas). Retorne o novo Set."
        }
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Paradigma_Imperativo",
      label: "Paradigma Imperativo",
      group: 3,
      status: "available",
      description: "Paradigma de programação focado em descrever como um programa opera através de mudanças de estado.",
      examples: ["C", "Assembly", "Loops for/while", "Modificação de Estado"],
      books: ["Concepts of Programming Languages - Robert W. Sebesta"],
      practice: [
        {
          question: "Escreva um loop imperativo para somar números de 1 a 10.",
          answer: "let soma = 0; for(let i=1; i<=10; i++) { soma += i; }"
        },
        {
          question: "O que é efeito colateral em programação?",
          answer: "É quando uma função modifica algo fora do seu escopo local (ex: altera uma variável global ou imprime na tela), tornando o comportamento mais difícil de prever."
        }
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Paradigma_Proc",
      label: "Paradigma Procedural",
      group: 3,
      status: "locked",
      description: "Subtipo do imperativo baseado no conceito de chamadas de procedimento (funções).",
      examples: ["Pascal", "C", "Modularização", "Sub-rotinas"],
      books: ["Clean Code - Robert C. Martin"],
      practice: [
        {
          question: "Refatore um código longo em funções menores.",
          answer: "Pegue blocos lógicos (ex: ler input, processar dados, imprimir) e extraia para funções: readData(), process(), print()."
        },
        {
          question: "O que é escopo de variável?",
          answer: "A área do código onde uma variável é visível. Variáveis locais (dentro de função) morrem ao fim da função. Globais vivem para sempre."
        }
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "POO",
      label: "Orientação a Objetos",
      group: 3,
      status: "available",
      description: "Paradigma baseado no conceito de 'objetos', que podem conter dados e código.",
      examples: ["Java", "C++", "Sistemas complexos", "Modelagem de Domínio"],
      books: ["Object-Oriented Analysis and Design - Grady Booch"],
      practice: [
        {
          question: "Modele um sistema de Biblioteca com Classes.",
          answer: "Classe Livro (titulo, autor). Classe Usuario (nome, id). Classe Emprestimo (data, livro, usuario). Classe Biblioteca (listaDeLivros, emprestarLivro())."
        },
        {
          question: "Qual a vantagem da OO sobre procedural?",
          answer: "Encapsulamento. Dados e comportamentos relacionados ficam juntos em objetos, facilitando a organização de sistemas grandes e complexos."
        }
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Classes",
      label: "Classes",
      group: 3,
      status: "locked",
      description: "Modelos ou 'formas' para criar objetos, definindo seus atributos e métodos.",
      examples: ["Class Carro {}", "Instanciação", "Blueprints"],
      books: ["Head First Java - Kathy Sierra & Bert Bates"],
      practice: [
        "Crie uma classe 'ContaBancaria' com saldo.",
        "O que é um construtor?"
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Objetos_POO",
      label: "Objetos",
      group: 3,
      status: "locked",
      description: "Instâncias de classes que representam entidades do mundo real ou lógico.",
      examples: ["new Carro()", "this.velocidade", "Identidade do Objeto"],
      books: ["Thinking in Java - Bruce Eckel"],
      practice: [
        "Instancie 3 objetos diferentes da classe Carro.",
        "Acesse um atributo público de um objeto."
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Heranca",
      label: "Herança",
      group: 3,
      status: "locked",
      description: "Mecanismo onde uma classe deriva atributos e métodos de outra classe pai.",
      examples: ["extends", "Reutilização de código", "Hierarquia is-a"],
      books: ["Effective Java - Joshua Bloch"]
    },
    {
      id: "Polimorfismo",
      label: "Polimorfismo",
      group: 3,
      status: "locked",
      description: "Capacidade de objetos de diferentes classes serem tratados como instâncias da mesma classe pai.",
      examples: ["Interfaces", "Sobrescrita de métodos", "Design Pattern Strategy"],
      books: ["Design Patterns - Gamma, Helm, Johnson, Vlissides (GoF)"],
      practice: [
        "Sobrescreva o método 'emitirSom' em classes derivadas.",
        "Crie uma função que aceita qualquer tipo de 'Animal'."
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Encapsulamento",
      label: "Encapsulamento",
      group: 3,
      status: "locked",
      description: "Ocultação dos detalhes internos de funcionamento de um objeto, expondo apenas o necessário.",
      examples: ["private vs public", "Getters e Setters", "Information Hiding"],
      books: ["Clean Architecture - Robert C. Martin"],
      practice: [
        "Torne os atributos de uma classe privados.",
        "Crie métodos getters e setters públicos."
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Abstracao",
      label: "Abstração",
      group: 3,
      status: "locked",
      description: "Processo de esconder a complexidade e mostrar apenas as características essenciais.",
      examples: ["Classes Abstratas", "Interfaces", "Contratos de API"],
      books: ["Object-Oriented Software Construction - Bertrand Meyer"],
      practice: [
        "Crie uma interface 'Pagavel' com método 'processarPagamento'.",
        "Implemente a interface em classes 'Cartao' e 'Boleto'."
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Paradigma_Func",
      label: "Paradigma Funcional",
      group: 3,
      status: "locked",
      description: "Paradigma que trata a computação como avaliação de funções matemáticas e evita estado mutável.",
      examples: ["Haskell", "Elixir", "F#", "Lambda Calculus"],
      books: ["Functional Programming in Scala - Chiusano & Bjarnason"],
      practice: [
        "Escreva uma função pura (sem efeitos colaterais).",
        "Tente resolver um problema sem usar loops (use recursão)."
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Imutabilidade",
      label: "Imutabilidade",
      group: 3,
      status: "locked",
      description: "Conceito onde dados não podem ser alterados após sua criação.",
      examples: ["const", "Estruturas de dados persistentes", "Thread Safety"],
      books: ["Functional Thinking - Neal Ford"],
      practice: [
        "Use 'const' para todas as variáveis em um script.",
        "Por que imutabilidade ajuda em concorrência?"
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Higher_Order",
      label: "Funções de Alta Ordem",
      group: 3,
      status: "locked",
      description: "Funções que aceitam outras funções como argumentos ou retornam funções.",
      examples: ["Map, Filter, Reduce", "Callbacks", "Function Composition"],
      books: ["Structure and Interpretation of Computer Programs (SICP) - Abelson & Sussman"],
      practice: [
        "Use map() para dobrar valores de um array.",
        "Use filter() para pegar apenas números pares."
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },

    // --- 4. SISTEMAS OPERACIONAIS (SO) ---
    {
      id: "Kernel",
      label: "Kernel",
      group: 4,
      status: "mastered",
      description: "O núcleo do sistema operacional, interface entre hardware e software e gerente de recursos.",
      examples: ["Linux Kernel", "Windows NT Kernel"],
      books: ["Operating System Concepts - Silberschatz"],
      practice: [
        {
          question: "Diferencie Modo Kernel de Modo Usuário.",
          answer: "Modo Kernel: Acesso total ao hardware e instruções privilegiadas (Anel 0). Modo Usuário: Restrito, seguro, qualquer erro só trava o programa, não o PC (Anel 3)."
        },
        {
          question: "O que é uma System Call?",
          answer: "É um pedido que um programa faz ao Kernel para realizar uma operação privilegiada (ex: abrir arquivo, enviar pacote de rede)."
        }
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Processos",
      label: "Escalonamento Processos",
      group: 4,
      status: "locked",
      description: "Como o SO decide qual processo usa a CPU e por quanto tempo.",
      examples: ["Round Robin", "FIFO", "Prioridade"],
      books: ["Modern Operating Systems - Tanenbaum"],
      practice: [
        {
          question: "Simule um escalonamento Round Robin no papel.",
          answer: "Processos A, B, C. Quantum=2. A(2) -> B(2) -> C(2) -> A(2)... Se um acabar, ele sai da roda."
        },
        {
          question: "O que é preempção?",
          answer: "É a capacidade do SO de INTERROMPER um processo forçosamente para dar a vez a outro (essencial para multitarefa)."
        }
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Threads",
      label: "Gerenciamento Threads",
      group: 4,
      status: "locked",
      description: "Unidades menores de execução dentro de um processo que compartilham memória.",
      examples: ["Multithreading", "Paralelismo", "Web Servers Concurrent"],
      books: ["Pthreads Programming - Nichols, Buttlar, Farrell"],
      practice: [
        {
          question: "Qual a diferença entre Processo e Thread?",
          answer: "Processo: Programa em execução, com memória própria isolada (pesado). Thread: 'Sub-processo' que compartilha a MESMA memória do pai (leve)."
        },
        {
          question: "Crie um programa que lança 2 threads (se possível na sua linguagem).",
          answer: "Em Python: threading.Thread(target=funcao).start(). As duas funções rodarão 'ao mesmo tempo'."
        }
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Race_Cond",
      label: "Race Conditions",
      group: 4,
      status: "locked",
      description: "Falha que ocorre quando o comportamento depende da sequência ou tempo de eventos incontroláveis.",
      examples: ["Dois processos escrevendo na mesma variável", "Bugs de concorrência", "Bank transaction errors"],
      books: ["The Art of Multiprocessor Programming - Herlihy & Shavit"],
      practice: [
        {
          question: "Explique o que é uma Região Crítica.",
          answer: "Parte do código onde recursos compartilhados são acessados. Apenas uma thread deve estar na região crítica por vez para evitar erros."
        },
        {
          question: "Como Mutexes evitam Race Conditions?",
          answer: "Mutex (Mutual Exclusion) é uma 'chave'. A thread pega a chave, entra na sala (região crítica), faz o que precisa e devolve a chave. Outras esperam na porta."
        }
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Deadlocks",
      label: "Deadlocks",
      group: 4,
      status: "locked",
      description: "Situação onde dois ou mais processos ficam bloqueados esperando uns pelos outros indefinidamente.",
      examples: ["Jantar dos Filósofos", "Travamento de sistema", "Resource Starvation"],
      books: ["Operating Systems: Three Easy Pieces - Arpaci-Dusseau"],
      practice: [
        {
          question: "Quais as 4 condições necessárias para um Deadlock?",
          answer: "1. Exclusão Mútua. 2. Posse e Espera. 3. Não Preempção. 4. Espera Circular. (Coffman Conditions). Se quebrar uma, o Deadlock não ocorre."
        },
        {
          question: "O que é Starvation?",
          answer: "Quando um processo (geralmente de baixa prioridade) nunca recebe recursos para executar pq outros (alta prioridade) estão sempre na frente."
        }
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Gestao_Memoria",
      label: "Gestão Memória",
      group: 4,
      status: "available",
      description: "Processo de gerenciar alocação e liberação de memória para programas.",
      examples: ["Swapping", "Fragmentação", "Buddy System"],
      books: ["Operating System Concepts - Silberschatz et al."],
      practice: [
        {
          question: "O que é fragmentação externa?",
          answer: "Quando há memória livre TOTAL suficiente, mas ela está picada em pedacinhos pequenos não contíguos, impedindo alocação de blocos grandes."
        },
        {
          question: "Como funciona a Compactação de memória?",
          answer: "O SO move os processos na memória para juntar todos os buracos livres em um único bloco grande. (Lento e exige parada do sistema)."
        }
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Mem_Virtual",
      label: "Memória Virtual",
      group: 4,
      status: "locked",
      description: "Técnica que permite ao SO usar disco como extensão da RAM, dando ilusão de memória infinita.",
      examples: ["Page file", "Espaço de endereçamento virtual", "Demand Paging"],
      books: ["Understanding the Linux Kernel - Bovet & Cesati"],
      practice: [
        {
          question: "O que é Swapping?",
          answer: "Ato de mover um processo inteiro (ou páginas) da RAM para o Disco (Swap) para liberar espaço na RAM."
        },
        {
          question: "Qual a vantagem de ter mais memória virtual que física?",
          answer: "Permite rodar programas maiores que a RAM disponível e rodar múltiplos programas simultaneamente sem que um invada a memória do outro."
        }
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Paginacao",
      label: "Paginação",
      group: 4,
      status: "locked",
      description: "Esquema de gestão de memória que elimina a necessidade de alocação de memória física contígua.",
      examples: ["Pages", "Frames", "Page Fault", "TLB (Translation Lookaside Buffer)"],
      books: ["Operating Systems Design and Implementation - Tanenbaum & Woodhull"],
      practice: [
        {
          question: "Diferencie Paginação e Segmentação.",
          answer: "Paginação: Divide a memória em blocos de tamanho fixo (Páginas). Segmentação: Divide em blocos de tamanho variávei lógico (Código, Dados, Stack)."
        },
        {
          question: "O que faz a MMU (Memory Management Unit)?",
          answer: "Hardware que traduz endereços virtuais (que a CPU vê) para endereços físicos (RAM real) em tempo real."
        }
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Segmentacao",
      label: "Segmentação",
      group: 4,
      status: "locked",
      description: "Divisão da memória primária em segmentos de tamanhos variáveis.",
      examples: ["Segmento de código", "Segmento de dados", "Stack Segment"],
      books: ["Operating Systems Internals and Design Principles - William Stallings"],
      practice: [
        {
          question: "Por que a segmentação reflete melhor a visão do programador?",
          answer: "Porque divide a memória em partes lógicas como 'Função Principal', 'Variáveis' e 'Stack', em vez de páginas arbitrárias de tamanho fixo."
        },
        {
          question: "O que acontece numa violação de segmento?",
          answer: "Segmentation Fault. O processo tenta acessar um endereço de memória que não pertence ao seu segmento permitido, e o SO mata o processo."
        }
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "FS",
      label: "Sistemas de Arquivos",
      group: 4,
      status: "available",
      description: "Método e estrutura de dados que o SO usa para controlar como os dados são armazenados e recuperados.",
      examples: ["Árvore de diretórios", "Metadados de arquivos", "Pathnames"],
      books: ["File System Forensic Analysis - Brian Carrier"],
      practice: [
        {
          question: "O que são metadados de arquivo?",
          answer: "Dados sobre os dados. Ex: Data de criação, dono, permissões, tamanho. Não é o conteúdo do arquivo em si."
        },
        {
          question: "Explique a estrutura hierárquica de diretórios.",
          answer: "Organização em árvore (Root / -> bin, home, etc). Permite organizar milhares de arquivos de forma lógica e navegável."
        }
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "NTFS",
      label: "NTFS",
      group: 4,
      status: "locked",
      description: "Sistema de arquivos padrão do Windows com suporte a ACLs e journaling.",
      examples: ["Permissões Windows", "Alternate Data Streams", "Encryption (EFS)"],
      books: ["Windows Internals - Russinovich et al."],
      practice: [
        {
          question: "O que é Journaling em NTFS?",
          answer: "Recurso que registra mudanças em um log (diário) antes de aplicá-las. Se o PC desligar no meio, o SO lê o log e recupera a consistência sem corromper tudo."
        },
        {
          question: "Verifique as permissões de um arquivo no Windows.",
          answer: "Botão direito -> Propriedades -> Segurança. Mostra as ACLs (Access Control Lists) para cada usuário."
        }
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "EXT4",
      label: "ext4",
      group: 4,
      status: "locked",
      description: "Sistema de arquivos journaling mais usado em distribuições Linux modernas.",
      examples: ["Linux Filesystem", "Inodes", "Journaling"],
      books: ["Linux Kernel Development - Robert Love"],
      practice: [
        {
          question: "O que é um Inode?",
          answer: "Estrutura de dados no Linux que armazena metadados de um arquivo (permissões, dono, onde estão os blocos no disco), mas NÃO o nome do arquivo."
        },
        {
          question: "Liste os sistemas de arquivos montados no seu Linux (comando mount).",
          answer: "Use o comando 'mount' ou 'df -h' para ver partições e onde estão montadas (ex: /dev/sda1 em /)."
        }
      ],
      links: [
        { label: "Rafael Levi - Abrindo código no Linux Ubuntu", url: "https://www.youtube.com/watch?v=9F7_d15LEX0" },
        { label: "Rafael Levi - Rodando Tuatara no Linux", url: "https://www.youtube.com/watch?v=kf1k13qMlzU" },
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Linux",
      label: "Linux (Ubuntu)",
      group: 4,
      status: "mastered",
      description: "SO de código aberto baseado no kernel Linux.",
      examples: ["Ubuntu", "Debian", "Comandos básicos", "Open Source Philosophy"],
      books: ["The Linux Command Line - William Shotts"],
      practice: [
        {
          question: "Instale o Ubuntu em uma VM (ou use WSL).",
          answer: "Baixe a ISO no site oficial, crie nova VM no VirtualBox, monte a ISO e siga o instalador gráfico."
        },
        {
          question: "Navegue entre diretórios usando terminal.",
          answer: "Use 'pwd' para ver onde está. 'ls' para listar. 'cd NomePasta' para entrar. 'cd ..' para voltar."
        }
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Terminal",
      label: "Terminal & Shell",
      group: 4,
      status: "mastered",
      description: "Interface de linha de comando para interagir com o SO.",
      examples: ["ls, cd, mkdir", "Bash, Zsh", "Piping and Redirection"],
      books: ["Learning the bash Shell - Cameron Newham"],
      practice: [
        {
          question: "Use o comando 'grep' para buscar texto em um arquivo.",
          answer: "Comando: grep 'texto' arquivo.txt. Ele imprime todas as linhas que contêm o termo."
        },
        {
          question: "Crie um diretório e entre nele numa linha só.",
          answer: "mkdir NovoDir && cd NovoDir. O '&&' só executa o segundo se o primeiro der certo."
        }
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Bash",
      label: "Bash Scripting",
      group: 4,
      status: "locked",
      description: "Linguagem de script para automatizar tarefas no shell Bash.",
      examples: ["Automação de backups", "Scripts de deploy", "Cron Jobs"],
      books: ["Classic Shell Scripting - Robbins & Beebe"],
      practice: [
        {
          question: "Crie um script 'ola.sh' que imprime 'Olá Mundo'.",
          answer: "Arquivo com: #!/bin/bash\necho 'Olá Mundo'\nDepois dê chmod +x ola.sh e rode ./ola.sh"
        },
        {
          question: "Faça um script que liste arquivos e salve em 'lista.txt'.",
          answer: "ls -la > lista.txt. O operador '>' redireciona a saída padrão (ex: tela) para um arquivo."
        }
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Permissoes",
      label: "Permissões (chmod)",
      group: 4,
      status: "available",
      description: "Controle de acesso a arquivos e diretórios no Linux.",
      examples: ["chmod 777", "chown", "Read/Write/Execute", "Sudoers"],
      books: ["Linux Administration Handbook - Nemeth et al."],
      practice: [
        {
          question: "Use 'chmod +x script.sh' para torná-lo executável.",
          answer: "Isso adiciona a permissão de E(x)ecução para todos. Agora pode rodar com ./script.sh"
        },
        {
          question: "O que significa permissão 755?",
          answer: "Dono: 7 (rwx) - Total. Grupo: 5 (r-x) - Ler/Executar. Outros: 5 (r-x) - Ler/Executar."
        }
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Pkg_Mgr",
      label: "Pacotes (apt)",
      group: 4,
      status: "available",
      description: "Ferramentas para instalar, atualizar e remover software no Linux.",
      examples: ["apt-get update", "dpkg", "yum", "Dependency Hell Resolution"],
      books: ["Debian Administrator's Handbook - Hertzog & Mas"],
      practice: [
        {
          question: "Atualize a lista de pacotes com 'sudo apt update'.",
          answer: "Isso baixa as listas mais recentes dos repositórios, para o sistema saber o que há de novo. Não atualiza os programas em si (isso é upgrade)."
        },
        {
          question: "Instale o pacote 'git' pelo terminal.",
          answer: "sudo apt install git. Confirme com S (Sim). Verifique com 'git --version'."
        }
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "SSH_Proto",
      label: "Protocolo SSH",
      group: 4,
      status: "locked",
      description: "Protocolo seguro para acessar e gerenciar servidores remotamente.",
      examples: ["Acesso remoto", "Túneis seguros", "Public/Private Keys"],
      books: ["SSH, The Secure Shell - Barrett & Silverman"],
      practice: [
        {
          question: "Gerar um par de chaves SSH.",
          answer: "Comando: ssh-keygen -t rsa. Vai criar id_rsa (privada) e id_rsa.pub (pública) na pasta .ssh."
        },
        {
          question: "Como copiar sua chave pública para um servidor?",
          answer: "ssh-copy-id usuario@ip-servidor. Isso adiciona sua chave ao authorized_keys lá, permitindo login sem senha."
        }
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Virtualizacao",
      label: "Virtualização",
      group: 4,
      status: "available",
      description: "Criação de versões virtuais de recursos de computação, como hardware e SOs.",
      examples: ["VMware", "VirtualBox", "Snapshots"],
      books: ["Virtualization Essentials - Matthew Portnoy"],
      practice: [
        {
          question: "Crie uma Máquina Virtual Linux.",
          answer: "Baixe VirtualBox e ISO do Ubuntu. Crie nova VM, aloque RAM/Disco e inicie com a ISO. Siga a instalação."
        },
        {
          question: "Explique o papel do Hypervisor.",
          answer: "É o software que cria e gerencia as VMs, isolando o hardware real dos sistemas operacionais convidados."
        }
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Hypervisors",
      label: "Hypervisors",
      group: 4,
      status: "locked",
      description: "Software que cria e roda máquinas virtuais.",
      examples: ["Type 1 (Bare metal)", "Type 2 (Hosted)", "KVM"],
      books: ["Virtual Machines - Smith & Nair"],
      practice: [
        {
          question: "Qual a diferença entre Hypervisor tipo 1 e tipo 2?",
          answer: "Tipo 1 (Bare Metal): Roda direto no hardware (ex: ESXi). Tipo 2 (Hosted): Roda sobre um SO normal (ex: VirtualBox no Windows)."
        },
        {
          question: "Cite um exemplo de Hypervisor Tipo 1.",
          answer: "Xen, Microsoft Hyper-V (Server), VMware ESXi."
        }
      ]
    },

    // --- 5. INFRAESTRUTURA DE REDES E COMUNICAÇÃO ---
    {
      id: "OSI",
      label: "Modelo OSI",
      group: 5,
      status: "locked",
      description: "Modelo conceitual que caracteriza e padroniza as funções de comunicação de um sistema de computação sem considerar a estrutura interna subjacente.",
      examples: ["7 camadas (Física, Link, Rede, ...)", "Desencapsulamento"],
      books: ["Computer Networking: A Top-Down Approach - Kurose"],
      practice: [
        "Liste as 7 camadas do Modelo OSI.",
        "Em qual camada opera o protocolo IP?"
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "TCP_IP",
      label: "TCP/IP",
      group: 5,
      status: "available",
      description: "Conjunto de protocolos de comunicação usados para conectar dispositivos de rede na Internet.",
      examples: ["Camada de Aplicação", "Camada de Transporte", "Encapsulation"],
      books: ["TCP/IP Illustrated - W. Richard Stevens"],
      practice: [
        "Compare o modelo TCP/IP com o OSI.",
        "Quais protocolos operam na camada de Transporte?"
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "TCP",
      label: "Protocolo TCP",
      group: 5,
      status: "locked",
      description: "Protocolo de transporte confiável e orientado a conexão.",
      examples: ["Handshake 3 vias", "Controle de fluxo", "Reliability"],
      books: ["TCP/IP Illustrated - W. Richard Stevens"],
      practice: [
        "Desenhe o diagrama do 3-way Handshake.",
        "O que é SYN, SYN-ACK e ACK?"
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "UDP",
      label: "Protocolo UDP",
      group: 5,
      status: "locked",
      description: "Protocolo de transporte não confiável, sem conexão, focado em velocidade.",
      examples: ["Streaming de vídeo", "Jogos online", "VoIP"],
      books: ["Computer Networking: A Top-Down Approach - Kurose & Ross"],
      practice: [
        "Por que UDP é melhor para streaming?",
        "O UDP garante a entrega dos pacotes?"
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "IP",
      label: "Endereçamento IP",
      group: 5,
      status: "locked",
      description: "Principal protocolo de comunicação da Internet para retransmitir datagramas através dos limites da rede.",
      examples: ["Roteamento", "Subnetting", "CIDR blocks"],
      books: ["Internetworking with TCP/IP - Douglas Comer"],
      practice: [
        "O que é uma máscara de sub-rede?",
        "Calcule o endereço de broadcast de uma rede."
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "IPv4_v6",
      label: "IPv4 vs IPv6",
      group: 5,
      status: "locked",
      description: "Evolução do endereçamento IP de 32 bits para 128 bits para resolver a escassez de endereços.",
      examples: ["192.168.1.1 vs 2001:db8::1", "Dual Stack", "SLAAC (Stateless Address Auto-Configuration)"],
      books: ["IPv6 Essentials - Silvia Hagen"],
      practice: [
        "Qual o tamanho de um endereço IPv6?",
        "Converta um IP para binário."
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "DNS",
      label: "DNS",
      group: 5,
      status: "available",
      description: "Sistema de Nomes de Domínio - a lista telefônica da Internet que traduz nomes para IPs.",
      examples: ["A Record", "CNAME", "nslookup", "MX Record (Mail Exchange)"],
      books: ["DNS and BIND - Liu & Albitz"],
      practice: [
        "Use 'nslookup google.com' no terminal.",
        "Qual a diferença entre um registro A e CNAME?"
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "HTTP_Proto",
      label: "HTTP & HTTPS",
      group: 5,
      status: "mastered",
      description: "Protocolo de Transferência de Hipertexto - a base da comunicação de dados na World Wide Web.",
      examples: ["Request/Response", "Códigos de status (200, 404)", "Idempotency"],
      books: ["HTTP: The Definitive Guide - Gourley & Totty"],
      practice: [
        "O que significa o código de status 404?",
        "Qual a diferença entre HTTP e HTTPS?"
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "HTTP_Headers",
      label: "Headers & Verbs",
      group: 5,
      status: "available",
      description: "Metadados e métodos que definem a semântica das requisições e respostas HTTP.",
      examples: ["GET, POST", "Content-Type", "Authorization", "Cache-Control"],
      books: ["RESTful Web Services - Richardson & Ruby"],
      practice: [
        "Para que serve o header 'Content-Type'?",
        "Qual a diferença entre POST e PUT?"
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Cookies_Sess",
      label: "Cookies & Sessions",
      group: 5,
      status: "locked",
      description: "Mecanismos para manter o estado e identidade do usuário entre requisições HTTP.",
      examples: ["Session ID", "HttpOnly Cookies", "SameSite Attribute"],
      books: ["Web Security for Developers - Malcolm McDonald"],
      practice: [
        "O que é um Cookie HttpOnly?",
        "Como funciona uma sessão no servidor?"
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "SSL_TLS",
      label: "SSL/TLS & Criptografia",
      group: 5,
      status: "locked",
      description: "Protocolos criptográficos projetados para fornecer segurança de comunicação.",
      examples: ["Handshake TLS", "Certificados Digitais", "Perfect Forward Secrecy"],
      books: ["Bulletproof SSL and TLS - Ivan Ristic"],
      practice: [
        "Como funciona a criptografia de chave pública?",
        "Verifique o certificado SSL de um site no navegador."
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Firewalls",
      label: "Firewalls",
      group: 5,
      status: "locked",
      description: "Dispositivo de segurança de rede que monitora e filtra tráfego de rede.",
      examples: ["iptables", "Security Groups AWS", "Stateful Inspection"],
      books: ["Firewalls and Internet Security - Cheswick & Bellovin"],
      practice: [
        "O que é uma regra de firewall 'deny all'?",
        "Diferencie firewall de rede e de host."
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Proxy",
      label: "Proxy Reverso",
      group: 5,
      status: "locked",
      description: "Servidor que fica à frente de servidores web e encaminha requisições de clientes para esses servidores.",
      examples: ["Nginx", "Load Balancing", "SSL Termination"],
      books: ["Mastering NGINX - Dimitri Aivaliotis"],
      practice: [
        "Configure um Nginx básico.",
        "Qual a vantagem de usar um Proxy Reverso?"
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "CDN",
      label: "CDN",
      group: 5,
      status: "locked",
      description: "Content Delivery Network - rede distribuída de servidores que entrega conteúdo com base na localização do usuário.",
      examples: ["Cloudflare", "Edge Locations", "DDoS Protection"],
      books: ["Content Delivery Networks - Buyya et al."],
      practice: [
        "Por que CDNs melhoram a performance?",
        "O que é cache hit e cache miss?"
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },

    // --- 6. LINGUAGENS DE PROGRAMAÇÃO ---
    {
      id: "Lang_C",
      label: "Linguagem C",
      group: 6,
      status: "available",
      description: "A mãe das linguagens modernas. De propósito geral, estruturada e de baixo nível.",
      examples: ["Sistemas Operacionais", "Drivers", "Software Embarcado"],
      books: ["The C Programming Language - Kernighan & Ritchie"],
      practice: [
        "Escreva 'Hello World' em C.",
        "Use ponteiros para trocar valores de duas variáveis."
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Lang_Python",
      label: "Linguagem Python",
      group: 6,
      status: "available",
      description: "Linguagem interpretada de alto nível, famosa pela legibilidade e vasto ecossistema de bibliotecas.",
      examples: ["Data Science", "Scripts de automação", "Backend com Django", "List Comprehensions"],
      books: ["Fluent Python - Luciano Ramalho"],
      practice: [
        "Crie uma lista em Python e itere sobre ela.",
        "O que significa Python ser 'fortemente tipada mas dinâmica'?"
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Lang_JS",
      label: "Linguagem JavaScript",
      group: 6,
      status: "mastered",
      description: "A linguagem da Web. Essencial para desenvolvimento frontend e cada vez mais popular no backend.",
      examples: ["Interatividade no browser", "Fullstack apps", "Event Driven"],
      books: ["Eloquent JavaScript - Marijn Haverbeke"],
      practice: [
        "Altere o texto de um elemento HTML usando JS.",
        "Crie uma função que aceita um callback."
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Lang_CS",
      label: "Linguagem C#",
      group: 6,
      status: "locked",
      description: "Linguagem moderna, orientada a objetos e fortemente tipada da Microsoft.",
      examples: ["Desenvolvimento Windows", "Games com Unity", "Backend .NET", "LINQ"],
      books: ["C# in Depth - Jon Skeet"],
      practice: [
        "Crie uma classe em C#.",
        "O que é LINQ?"
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Lang_Go",
      label: "Linguagem Golang",
      group: 6,
      status: "locked",
      description: "Linguagem compilada e estaticamente tipada do Google, focada em simplicidade e concorrência.",
      examples: ["Microserviços", "Ferramentas de infraestrutura (Docker, K8s)", "Goroutines"],
      books: ["The Go Programming Language - Donovan & Kernighan"],
      practice: [
        "Crie uma Goroutine simples.",
        "Explique como o 'Garbage Collector' de Go funciona."
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Lang_PHP",
      label: "Linguagem PHP",
      group: 6,
      status: "locked",
      description: "Linguagem de script server-side projetada para desenvolvimento web.",
      examples: ["WordPress", "Laravel", "Sites dinâmicos", "Composer"],
      books: ["Modern PHP - Josh Lockhart"],
      practice: [
        "Crie um script PHP que exibe a data atual.",
        "Como conectar PHP ao MySQL?"
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Lang_Java",
      label: "Linguagem Java",
      group: 6,
      status: "locked",
      description: "Linguagem orientada a objetos, 'Write Once, Run Anywhere', base de muitos sistemas corporativos.",
      examples: ["Sistemas bancários", "Android", "Backend Spring", "Garbage Collection"],
      books: ["Effective Java - Joshua Bloch"],
      practice: [
        "Compile e rode um arquivo .java.",
        "O que é JVM?"
      ],
      links: [
        { label: "Rafael Levi - Criando Webservice Rest com JAVA", url: "https://www.youtube.com/watch?v=MscRHFWybx0" },
        { label: "Rafael Levi - Criando janelas e associando", url: "https://www.youtube.com/watch?v=irZqnlosayI" },
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Lang_Rust",
      label: "Linguagem Rust",
      group: 6,
      status: "locked",
      description: "Linguagem de sistemas focada em segurança de memória e concorrência sem garbage collector.",
      examples: ["Substituição de C/C++", "WebAssembly", "Ownership Model"],
      books: ["The Rust Programming Language - Klabnik & Nichols"],
      practice: [
        "O que é 'Ownership' em Rust?",
        "Tente criar uma Data Race em Rust e veja o compilador impedir."
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Lang_Kotlin",
      label: "Linguagem Kotlin",
      group: 6,
      status: "locked",
      description: "Linguagem moderna que roda na JVM, totalmente interoperável com Java, oficial para Android.",
      examples: ["Apps Android", "Backend Server-side", "Coroutines"],
      books: ["Kotlin in Action - Jemerov & Isakova"],
      practice: [
        "Crie uma 'Data Class' em Kotlin.",
        "O que são Null Safety features em Kotlin?"
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Lang_TS",
      label: "Linguagem TypeScript",
      group: 6,
      status: "available",
      description: "Superset tipado de JavaScript que compila para JS simples.",
      examples: ["Aplicações Web em escala", "Melhor developer experience", "Static Analysis"],
      books: ["Programming TypeScript - Boris Cherny"],
      practice: [
        "Defina uma Interface em TS.",
        "Compile um arquivo .ts para .js."
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },

    // --- 7. JAVASCRIPT: DOMÍNIO TÉCNICO ---
    {
      id: "JS_Basics",
      label: "JS Básico",
      group: 7,
      status: "mastered",
      description: "Fundamentos da linguagem: sintaxe, estrutura e conceitos primordiais.",
      examples: ["Console.log", "Comentários", "Strict Mode"],
      books: ["Eloquent JavaScript - Marijn Haverbeke"],
      practice: [
        "Escreva um 'Hello World' no console do navegador.",
        "Declare variáveis usando var, let e const."
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Vars",
      label: "Variáveis (let/const)",
      group: 7,
      status: "mastered",
      description: "Formas modernas de declarar variáveis com escopo de bloco, substituindo o var.",
      examples: ["const PI = 3.14", "let contador = 0", "Block Scope vs Function Scope"],
      books: ["You Don't Know JS: Scope & Closures - Kyle Simpson"],
      practice: [
        "Tente reatribuir uma variável const e veja o erro.",
        "Explique a diferença de escopo entre var e let."
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Types_JS",
      label: "Tipos de Dados",
      group: 7,
      status: "mastered",
      description: "Tipos primitivos da linguagem (String, Number, Boolean, Null, Undefined, Symbol).",
      examples: ["typeof x", "Conversão de tipos", "Coercion"],
      books: ["You Don't Know JS: Types & Grammar - Kyle Simpson"],
      practice: [
        "Qual o tipo de 'NaN'?",
        "Diferencie null de undefined."
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Ops_JS",
      label: "Operadores",
      group: 7,
      status: "mastered",
      description: "Símbolos e palavras-chave que realizam operações em operandos.",
      examples: ["+ - * /", "&& || !", "Spread/Rest (...)", "Ternary Operator"],
      books: ["JavaScript: The Definitive Guide - David Flanagan"],
      practice: [
        "O que faz o operador '==='?",
        "Use o operador ternário para uma condição simples."
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Control_Flow",
      label: "Fluxo de Controle",
      group: 7,
      status: "mastered",
      description: "Estruturas que ditam a direção que o programa toma.",
      examples: ["if / else", "switch", "for / while", "break / continue"],
      books: ["Eloquent JavaScript - Marijn Haverbeke"],
      practice: [
        "Escreva um loop 'for' que imprime de 0 a 10.",
        "Use 'switch' para verificar uma string."
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Arrays_Methods",
      label: "Métodos de Array",
      group: 7,
      status: "available",
      description: "Poderosas funções embutidas para manipular listas de dados.",
      examples: ["map()", "filter()", "reduce()", "find()", "Chaining methods"],
      books: ["JavaScript: The Good Parts - Douglas Crockford"],
      practice: [
        "Use map() para criar um array de quadrados.",
        "Use filter() para remover números negativos."
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "JS_Deep",
      label: "JS Avançado",
      group: 7,
      status: "available",
      description: "Conceitos mais profundos sobre como a linguagem funciona sob o capô.",
      examples: ["This keyword", "Execution Context", "Prototypal Inheritance"],
      books: ["You Don't Know JS: Scope & Closures - Kyle Simpson"],
      practice: [
        "O que o 'this' refere-se dentro de um método de objeto?",
        "Explique o conceito de Hoisting."
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Closures",
      label: "Closures",
      group: 7,
      status: "locked",
      description: "Habilidade de uma função lembrar e acessar seu escopo léxico mesmo quando executada fora dele.",
      examples: ["Fábrica de funções", "Module Pattern", "Data Privacy"],
      books: ["You Don't Know JS: Scope & Closures - Kyle Simpson"],
      practice: [
        "Crie uma função contador usando Closure.",
        "Por que Closures são importantes em JS?"
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Callbacks",
      label: "Callbacks",
      group: 7,
      status: "available",
      description: "Função passada como argumento para outra função.",
      examples: ["Event Handlers", "Noções de assincronismo", "Callback Hell"],
      books: ["Async JavaScript - Trevor Burnham"],
      practice: [
        "Passe uma função anônima como callback para setTimeout.",
        "O que é 'Callback Hell'?"
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Arrow_Fn",
      label: "Arrow Functions",
      group: 7,
      status: "mastered",
      description: "Sintaxe mais curta para funções e lexical 'this'.",
      examples: ["(a,b) => a+b", "Lexical scoping"],
      books: ["Understanding ECMAScript 6 - Nicholas C. Zakas"],
      practice: [
        "Reescreva uma função tradicional como Arrow Function.",
        "Como o 'this' se comporta em Arrow Functions?"
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Objects_Proto",
      label: "Objetos & Protótipos",
      group: 7,
      status: "locked",
      description: "Mecanismo de herança do JS baseado em cadeias de protótipos.",
      examples: ["__proto__", "Object.create", "Prototype Chain", "Prototypal Delegation"],
      books: ["You Don't Know JS: this & Object Prototypes - Kyle Simpson"],
      practice: [
        "Adicione um método ao Array.prototype (cuidado!).",
        "Como verificar se uma propriedade existe no próprio objeto?"
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Classes_ES6",
      label: "Classes (ES6)",
      group: 7,
      status: "available",
      description: "Syntax sugar para criar objetos e lidar com herança de forma mais familiar a POO clássica.",
      examples: ["class Person", "extends Component", "Super calls"],
      books: ["Understanding ECMAScript 6 - Nicholas C. Zakas"],
      practice: [
        "Crie uma classe 'User' com construtor.",
        "Estenda a classe 'User' para criar 'Admin'."
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Modules",
      label: "Módulos (ESM)",
      group: 7,
      status: "mastered",
      description: "Sistema oficial de módulos do JavaScript para organizar código em arquivos separados.",
      examples: ["import / export", "default export", "Dynamic Imports"],
      books: ["Exploring ES6 - Axel Rauschmayer"],
      practice: [
        "Exporte uma função de um arquivo e importe em outro.",
        "Qual a vantagem do 'Tree Shaking'?"
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Async_JS",
      label: "Assincronismo",
      group: 7,
      status: "available",
      description: "Técnicas para lidar com operações que levam tempo (rede, disco) não bloqueantes.",
      examples: ["Promises", "async / await", "Error Handling"],
      books: ["Async JavaScript - Trevor Burnham"],
      practice: [
        "Crie uma Promise que resolve após 2 segundos.",
        "Use async/await para consumir essa Promise."
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Event_Loop",
      label: "Event Loop",
      group: 7,
      status: "locked",
      description: "Modelo de concorrência do JS que gerencia a execução de código, eventos e tarefas.",
      examples: ["Call Stack", "Task Queue", "Microtasks", "Non-blocking I/O"],
      books: ["You Don't Know JS: Async & Performance - Kyle Simpson"],
      practice: [
        "Explique a diferença entre Microtasks e Macrotasks.",
        "O que bloqueia o Event Loop?"
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Hoisting",
      label: "Hoisting",
      group: 7,
      status: "locked",
      description: "Comportamento de mover declarações para o topo do escopo durante a compilação.",
      examples: ["var hoisting", "Function declarations", "Temporal Dead Zone (let/const)"],
      books: ["You Don't Know JS: Scope & Closures - Kyle Simpson"],
      practice: [
        "O que acontece se chamar uma função antes de declará-la?",
        "Var sofre hoisting?"
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "DOM",
      label: "DOM & Eventos",
      group: 7,
      status: "mastered",
      description: "Document Object Model e como interagir com a página web.",
      examples: ["querySelector", "addEventListener", "Event Propagation"],
      books: ["DOM Enlightenment - Cody Lindley"],
      practice: [
        "Selecione um botão pelo ID e adicione um click listener.",
        "Mude a cor de fundo do body via JS."
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Fetch",
      label: "API Fetch",
      group: 7,
      status: "available",
      description: "Interface moderna para fazer requisições HTTP.",
      examples: ["fetch('url')", "JSON parsing", "Headers Access"],
      books: ["JavaScript: The Definitive Guide - David Flanagan"],
      practice: [
        "Faça um GET para uma API pública (ex: pokeapi).",
        "Como enviar dados JSON via POST com fetch?"
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Error_Handling",
      label: "Gestão de Erros",
      group: 7,
      status: "available",
      description: "Técnicas para capturar e tratar exceções para que a aplicação não quebre.",
      examples: ["try / catch / finally", "throw Error", "Custom Errors"],
      books: ["Effective JavaScript - David Herman"],
      practice: [
        "Envolva um bloco de código perigoso em try-catch.",
        "Crie um erro customizado 'MeuErro'."
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },

    // --- 8. FRONTEND MODERNO (REACTJS) ---
    {
      id: "Frontend_React",
      label: "ReactJS Core",
      group: 8,
      status: "available",
      description: "Biblioteca JavaScript para criar interfaces de usuário baseadas em componentes.",
      examples: ["SPA (Single Page Application)", "Ecossistema React", "Vite/Next.js"],
      books: ["The Road to React - Robin Wieruch"],
      practice: [
        "Crie um novo app React com Vite.",
        "Explique o fluxo unidirecional de dados."
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Components",
      label: "Componentização",
      group: 8,
      status: "mastered",
      description: "Divisão da UI em pedaços independentes e reutilizáveis.",
      examples: ["Functional Components", "JSX", "Component Composition"],
      books: ["Learning React - Porcello & Banks"],
      practice: [
        "Crie um componente 'Botao' reutilizável.",
        "Passe props para customizar o texto do botão."
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Virtual_DOM",
      label: "Virtual DOM",
      group: 8,
      status: "locked",
      description: "Cópia leve do DOM real que permite atualizações de UI ultra-rápidas.",
      examples: ["Reconciliation", "Diffing", "Fiber Architecture"],
      books: ["Learning React - Porcello & Banks"],
      practice: [
        "Por que o Virtual DOM é mais rápido?",
        "O que aciona uma reconciliação no React?"
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Props_State",
      label: "Props & State",
      group: 8,
      status: "mastered",
      description: "Gerenciamento de dados no React: dados passados (Props) vs dados locais (State).",
      examples: ["useState hook", "Passando props para filhos", "State Lifting"],
      books: ["Pure React - Dave Ceddia"],
      practice: [
        "Use useState para criar um contador.",
        "Passe o valor do contador para um componente filho."
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Effects",
      label: "Efeitos (useEffect)",
      group: 8,
      status: "available",
      description: "Sincronização do componente com sistemas externos (APIs, DOM).",
      examples: ["Data Fetching", "Subscriptions", "Timers", "Cleanup Function"],
      books: ["A Complete Guide to useEffect - Dan Abramov"],
      practice: [
        "Busque dados de uma API quando o componente montar.",
        "Limpe um timer no retorno do useEffect."
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Hooks_Adv",
      label: "Hooks Avançados",
      group: 8,
      status: "locked",
      description: "Hooks para otimização e casos de uso específicos.",
      examples: ["useMemo", "useCallback", "useRef", "useReducer", "Custom Hooks"],
      books: ["React Hooks in Action - John Larsen"],
      practice: [
        "Use useMemo para evitar cálculos caros.",
        "Use useRef para acessar um elemento DOM."
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Rendering",
      label: "SSR vs CSR",
      group: 8,
      status: "locked",
      description: "Estratégias de renderização: no servidor (Next.js) ou no cliente (Vite/CRA).",
      examples: ["Next.js (App Router)", "Hydration", "Static Site Generation (SSG)"],
      books: ["Real-World Next.js - Michele Riva"],
      practice: [
        "Qual a vantagem do SSR para SEO?",
        "O que é Hydration?"
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Redux",
      label: "Redux & Toolkit",
      group: 8,
      status: "locked",
      description: "Gerenciamento de estado global complexo e previsível.",
      examples: ["Store", "Slices", "Actions", "Thunks"],
      books: ["Learning Redux - Daniel Bugl"],
      practice: [
        "Configure uma Store Redux básica.",
        "Crie uma Action para incrementar um contador."
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Context",
      label: "Context API",
      group: 8,
      status: "available",
      description: "Compartilhamento de estado global simples sem prop drilling.",
      examples: ["ThemeContext", "AuthContext", "Provider Pattern"],
      books: ["Learning React - Porcello & Banks"],
      practice: [
        "Crie um ThemeContext para modo escuro/claro.",
        "Consuma o contexto em um componente filho."
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Router",
      label: "React Router",
      group: 8,
      status: "available",
      description: "Navegação e roteamento em SPAs React.",
      examples: ["Routes", "Link", "useNavigate", "Nested Routes"],
      books: ["React Router Docs - Remix Team"],
      practice: [
        "Configure 2 rotas: Home e Sobre.",
        "Use Link para navegar sem recarregar a página."
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Acessibilidade",
      label: "Acessibilidade",
      group: 8,
      status: "locked",
      description: "Tornar apps React utilizáveis para todos.",
      examples: ["ARIA attributes", "Keyboard navigation", "Screen Readers"],
      books: ["Accessibility for Everyone - Laura Kalbag"],
      practice: [
        "Adicione 'aria-label' em um botão sem texto.",
        "Teste a navegação por tabulação no seu form."
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "i18n",
      label: "Internacionalização",
      group: 8,
      status: "locked",
      description: "Adaptação do app para múltiplos idiomas.",
      examples: ["react-i18next", "Trans componentes"],
      books: ["React i18next Docs"],
      practice: [
        "Configure i18next para inglês e português.",
        "Troque o idioma dinamicamente com um botão."
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Styling",
      label: "Estilização",
      group: 8,
      status: "available",
      description: "Diferentes abordagens para estilizar componentes React.",
      examples: ["Tailwind CSS", "Material UI", "CSS Modules", "Styled-components"],
      books: ["CSS in Depth - Keith J. Grant"],
      practice: [
        "Estilize um componente com CSS Modules.",
        "Instale e use Tailwind em um projeto React."
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Forms",
      label: "Forms & Yup",
      group: 8,
      status: "locked",
      description: "Gerenciamento de formulários complexos e validação.",
      examples: ["React Hook Form", "Yup schema validation"],
      books: ["React Hook Form Docs"],
      practice: [
        "Crie um formulário de login com validação.",
        "Exiba erros de validação para o usuário."
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Axios",
      label: "Axios",
      group: 8,
      status: "available",
      description: "Cliente HTTP robusto para comunicação com APIs.",
      examples: ["Interceptors", "Async Requests"],
      books: ["Axios Docs"],
      practice: [
        "Crie uma instância do Axios com URL base.",
        "Adicione um Interceptor para incluir token de auth."
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },

    // --- 9. BACKEND E APIS ---
    {
      id: "Backend_Node",
      label: "Node.js Env",
      group: 9,
      status: "available",
      description: "Ambiente de execução JavaScript construído sobre a engine V8 do Chrome.",
      examples: ["Servidores Web", "Ferramentas de CLI", "NPM Ecosystem"],
      books: ["Node.js Design Patterns - Mario Casciaro"],
      practice: [
        "Crie um servidor HTTP simples com módulo 'http'.",
        "Como funciona o sistema de módulos CommonJS no Node?"
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Express",
      label: "Express JS",
      group: 9,
      status: "available",
      description: "Framework web rápido, flexível e minimalista para Node.js.",
      examples: ["Rotas GET/POST", "Servidor HTTP simples", "Middleware Chain"],
      books: ["Web Development with Node and Express - Ethan Brown"],
      practice: [
        "Crie uma rota GET que retorna JSON.",
        "Implemente um middleware de log simples."
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "API_Arch",
      label: "Arquitetura de API",
      group: 9,
      status: "locked",
      description: "Padrões e estilos para construir interfaces de programação de aplicações.",
      examples: ["REST vs SOAP", "Microserviços", "BFF (Backend for Frontend)"],
      books: ["API Design Patterns - JJ Geewax"],
      practice: [
        "Quais as restrições arquiteturais do REST?",
        "Compare SOAP e REST."
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "REST",
      label: "REST",
      group: 9,
      status: "available",
      description: "Representational State Transfer - estilo arquitetural para sistemas distribuídos.",
      examples: ["Statelessness", "Resources (URIs)", "HATEOAS"],
      books: ["RESTful Web APIs - Richardson & Amundsen"],
      practice: [
        "Projete a URI para atualizar o email de um usuário.",
        "O que significa HATEOAS?"
      ],
      links: [
        { label: "Rafael Levi - Criando Webservice Rest com JAVA", url: "https://www.youtube.com/watch?v=MscRHFWybx0" },
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "GraphQL",
      label: "GraphQL",
      group: 9,
      status: "locked",
      description: "Linguagem de consulta para APIs desenvolvida pelo Facebook.",
      examples: ["Query vs Mutation", "Resolvers", "Schema Definition"],
      books: ["Learning GraphQL - Eve Porcello"],
      practice: [
        "Escreva uma Query para buscar usuário e seus posts.",
        "O que é o problema N+1 em GraphQL?"
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "gRPC",
      label: "gRPC",
      group: 9,
      status: "locked",
      description: "Framework RPC de alto desempenho e código aberto inicializado pelo Google.",
      examples: ["Protocol Buffers", "Comunicação entre microserviços", "Streaming"],
      books: ["gRPC: Up and Running - Kasun Indrasiri"],
      practice: [
        "Defina um serviço simples em .proto.",
        "Qual a vantagem do gRPC sobre REST?"
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Middlewares",
      label: "Middlewares",
      group: 9,
      status: "locked",
      description: "Funções que têm acesso ao objeto de solicitação (req) e resposta (res) na aplicação.",
      examples: ["Logging", "Tratamento de erros", "Autenticação", "Body Parser"],
      books: ["Express.js Guide - Azat Mardan"],
      practice: [
        "Crie um middleware que rejeita requisições sem token.",
        "Como passar dados de um middleware para outro?"
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Auth_Web",
      label: "Autenticação",
      group: 9,
      status: "locked",
      description: "Processos para verificar a identidade de um usuário ou serviço.",
      examples: ["JWT (JSON Web Tokens)", "OAuth 2.0", "OpenID Connect"],
      books: ["OAuth 2 in Action - Richer & Sanso"],
      practice: [
        "Decodifique um JWT (use jwt.io para ver a estrutura).",
        "Explique o fluxo do Authorization Code no OAuth."
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Realtime",
      label: "WebSockets",
      group: 9,
      status: "locked",
      description: "Tecnologia que torna possível abrir uma sessão de comunicação interativa entre o navegador e um servidor.",
      examples: ["Socket.io", "Chats em tempo real", "Push Notifications"],
      books: ["WebSocket - Andrew Lombardi"],
      practice: [
        "Implemente um chat simples com Socket.io.",
        "Qual a diferença entre Polling e WebSockets?"
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Security_API",
      label: "Segurança de API",
      group: 9,
      status: "locked",
      description: "Práticas para proteger APIs contra ataques e vazamento de dados.",
      examples: ["CORS", "Rate Limiting", "CSP", "SQL Injection prevention"],
      books: ["API Security in Action - Neil Madden"],
      practice: [
        "Configure CORS para permitir apenas seu frontend.",
        "Implemente Rate Limiting em uma rota express."
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },

    // --- 10. BANCOS DE DADOS E ENGENHARIA DE DADOS ---
    {
      id: "DB_Concepts",
      label: "Conceitos BD",
      group: 10,
      status: "locked",
      description: "Fundamentos teóricos sobre armazenamento e recuperação de dados estruturados.",
      examples: ["SGBD", "Transações", "Concorrência", "Relational Algebra"],
      books: ["Database System Concepts - Silberschatz et al."],
      practice: [
        "O que é uma chave primária?",
        "Explique a integridade referencial."
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "ACID",
      label: "Propriedades ACID",
      group: 10,
      status: "locked",
      description: "Atomicidade, Consistência, Isolamento e Durabilidade - garantias para transações seguras.",
      examples: ["Rollback", "Commit", "Isolation Levels"],
      books: ["Designing Data-Intensive Applications - Martin Kleppmann"],
      practice: [
        "Simule uma transação bancária que falha no meio.",
        "O que garante a Durabilidade?"
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Normalizacao",
      label: "Normalização",
      group: 10,
      status: "locked",
      description: "Processo de organização de dados para reduzir redundância e melhorar integridade.",
      examples: ["1NF, 2NF, 3NF", "Boyce-Codd", "Denormalization"],
      books: ["Fundamentals of Database Systems - Elmasri & Navathe"],
      practice: [
        "Normalize uma tabela de 'Pedidos' até a 3NF.",
        "Quais as desvantagens da normalização excessiva?"
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "DB_SQL",
      label: "SQL (Relacional)",
      group: 10,
      status: "available",
      description: "Structured Query Language - padrão para gerenciar bancos de dados relacionais.",
      examples: ["SELECT * FROM", "INSERT INTO", "Window Functions"],
      books: ["SQL Performance Explained - Markus Winand"],
      practice: [
        "Escreva um INSERT para adicionar um usuário.",
        "Exercite o uso de GROUP BY e HAVING."
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Postgres",
      label: "PostgreSQL",
      group: 10,
      status: "locked",
      description: "SGBD relacional open-source avançado e robusto.",
      examples: ["JSONB support", "Extensions (PostGIS)", "MVCC"],
      books: ["PostgreSQL: Up and Running - Regina Obe"],
      practice: [
        "Instale o PostgreSQL localmente ou via Docker.",
        "Crie um índice em uma coluna e teste a performance."
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "MySQL",
      label: "MySQL / MariaDB",
      group: 10,
      status: "locked",
      description: "O banco de dados relacional open-source mais popular do mundo.",
      examples: ["LAMP Stack", "Storage Engines (InnoDB)", "Replication"],
      books: ["High Performance MySQL - Schwartz et al."],
      practice: [
        "Compare os engines InnoDB e MyISAM.",
        "Faça um dump (backup) de um banco MySQL."
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Joins",
      label: "Joins SQL",
      group: 10,
      status: "locked",
      description: "Operações para combinar linhas de duas ou mais tabelas.",
      examples: ["INNER JOIN", "LEFT JOIN", "FULL OUTER JOIN", "Cross Join"],
      books: ["SQL Antipatterns - Bill Karwin"],
      practice: [
        "Escreva uma query com INNER JOIN.",
        "Qual a diferença entre LEFT JOIN e INNER JOIN?"
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "DB_NoSQL",
      label: "NoSQL",
      group: 10,
      status: "locked",
      description: "Bancos de dados não relacionais projetados para modelos de dados específicos.",
      examples: ["Document Store", "Key-Value", "Wide-Column", "Graph"],
      books: ["NoSQL Distilled - Pramod Sadalage"],
      practice: [
        "Quando escolher NoSQL sobre SQL?",
        "O que o teorema CAP diz sobre NoSQL?"
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Mongo",
      label: "MongoDB",
      group: 10,
      status: "locked",
      description: "Banco de dados orientado a documentos, armazena dados em formato JSON-like.",
      examples: ["BSON", "Collections", "Sharding", "Aggregation Pipeline"],
      books: ["MongoDB: The Definitive Guide - Shannon Bradshaw"],
      practice: [
        "Insira um documento JSON no Mongo.",
        "Faça uma busca com filtros no Mongo."
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Redis",
      label: "Redis (Cache)",
      group: 10,
      status: "locked",
      description: "Armazenamento de estrutura de dados em memória, usado como banco, cache e message broker.",
      examples: ["Caching de sessão", "Filas", "Pub/Sub"],
      books: ["Redis in Action - Josiah L. Carlson"],
      practice: [
        "Configure o Redis como cache de sessão.",
        "Use comandos SET e GET no Redis CLI."
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Neo4j",
      label: "Neo4j (Grafos)",
      group: 10,
      status: "locked",
      description: "Banco de dados nativo de grafos, ideal para dados altamente conectados.",
      examples: ["Redes sociais", "Recomendação", "Knowledge Graphs"],
      books: ["Graph Databases - Robinson et al."],
      practice: [
        "Modele uma rede social simples em Grafos.",
        "Escreva uma query Cypher para buscar amigos de amigos."
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Vector_DB",
      label: "Vector DBs",
      group: 10,
      status: "locked",
      description: "Bancos otimizados para armazenar e buscar embeddings vetoriais (IA).",
      examples: ["Pinecone", "ChromaDB", "Busca semântica", "RAG Support"],
      books: ["Introduction to Vector Databases - KDnuggets"],
      practice: [
        "O que é um Embedding Vetorial?",
        "Como funciona a busca por similaridade (Cosine Similarity)?"
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "ORM",
      label: "ORMs",
      group: 10,
      status: "locked",
      description: "Object-Relational Mapping - técnica para converter dados entre sistemas incompatíveis.",
      examples: ["Prisma", "Sequelize", "TypeORM", "Entity Framework"],
      books: ["Patterns of Enterprise Application Architecture - Martin Fowler"],
      practice: [
        "Defina um modelo (Schema) em um ORM.",
        "Qual a desvantagem (overhead) de usar um ORM?"
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Migrations",
      label: "Migrations",
      group: 10,
      status: "locked",
      description: "Controle de versão para o esquema do banco de dados.",
      examples: ["Schema evolution", "Flyway", "Liquibase"],
      books: ["Refactoring Databases - Ambler & Sadalage"],
      practice: [
        "Crie uma migration para adicionar uma coluna.",
        "Por que não devemos alterar tabelas manualmente em produção?"
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Data_Eng",
      label: "Engenharia de Dados",
      group: 10,
      status: "locked",
      description: "Disciplina focada em construir sistemas para coleta, armazenamento e análise de dados em escala.",
      examples: ["Pipelines de dados", "Big Data", "Hadoop Ecosystem"],
      books: ["The Data Engineering Cookbook - Andreas Kretz"],
      practice: [
        "Quais os 3 Vs do Big Data?",
        "Explique a diferença entre Data Lake e Data Warehouse."
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "ETL",
      label: "ETL & Data Lakes",
      group: 10,
      status: "locked",
      description: "Extract, Transform, Load - processo de mover dados de várias fontes para um destino (Warehouse/Lake).",
      examples: ["Apache Airflow", "Snowflake", "Databricks"],
      books: ["Data Pipelines Pocket Reference - James Densmore"],
      practice: [
        "Desenhe um fluxo ETL simples.",
        "Para que serve uma ferramenta como o Airflow?"
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },

    // --- 11. DEVOPS E CLOUD COMPUTING (AWS) ---
    {
      id: "DevOps_Culture",
      label: "Cultura DevOps",
      group: 11,
      status: "locked",
      description: "Filosofia que une desenvolvimento (Dev) e operações (Ops) para entrega de software mais rápida.",
      examples: ["Automação", "Monitoramento contínuo", "Blameless Post-Mortems"],
      books: ["The Phoenix Project - Gene Kim et al."],
      practice: [
        "O que são os 'Três Caminhos' do DevOps?",
        "Como reduzir o 'Time to Market'?"
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Git",
      label: "Git & Versionamento",
      group: 11,
      status: "available",
      description: "Sistema de controle de versão distribuído para rastrear mudanças no código.",
      examples: ["git commit", "git merge", "git rebase", "git cherry-pick"],
      books: ["Pro Git - Chacon & Straub"],
      practice: [
        "Resolva um conflito de merge (merge conflict).",
        "Reverta um commit usando git revert."
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "GitHub",
      label: "GitHub & Gitflow",
      group: 11,
      status: "locked",
      description: "Plataforma de hospedagem de código e fluxos de trabalho colaborativos.",
      examples: ["Pull Requests", "Code Review", "Git Actions"],
      books: ["GitHub for Dummies - Guthals & Haack"],
      practice: [
        "Abra um Pull Request em um repositório.",
        "Explique o fluxo gitflow (master, develop, feature)."
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Docker",
      label: "Docker",
      group: 11,
      status: "locked",
      description: "Plataforma para desenvolver, enviar e executar aplicações em contêineres.",
      examples: ["Dockerfile", "docker-compose", "Containerization"],
      books: ["Docker Deep Dive - Nigel Poulton"],
      practice: [
        "Escreva um Dockerfile para uma app Node.js.",
        "Suba um banco de dados usando docker-compose."
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "K8s",
      label: "Kubernetes",
      group: 11,
      status: "locked",
      description: "Sistema open-source para orquestração de contêineres.",
      examples: ["Pods", "Services", "Deployments", "Helm Charts"],
      books: ["Kubernetes Up and Running - Hightower, Burns, Beda"],
      practice: [
        "O que é um Pod?",
        "Qual a diferência entre Deployment e Service?"
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "IaC",
      label: "Infra as Code (IaC)",
      group: 11,
      status: "locked",
      description: "Gerenciamento de infraestrutura através de arquivos de definição legíveis por máquina.",
      examples: ["Terraform", "Ansible", "Pulumi"],
      books: ["Terraform: Up & Running - Yevgeniy Brikman"],
      practice: [
        "O que é 'State' no Terraform?",
        "Escreva um arquivo Terraform para criar um Bucket S3."
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "CI_CD",
      label: "CI/CD",
      group: 11,
      status: "locked",
      description: "Integração Contínua e Entrega Contínua - pipeline de automação de testes e deploy.",
      examples: ["GitHub Actions", "Jenkins", "CircleCI", "Automated Testing"],
      books: ["Continuous Delivery - Jez Humble & David Farley"],
      practice: [
        "Crie uma Action no GitHub para rodar testes.",
        "O que é a esteira (pipeline) de deploy?"
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "AWS_Cloud",
      label: "AWS Cloud",
      group: 11,
      status: "locked",
      description: "Amazon Web Services - plataforma de nuvem mais utilizada do mundo.",
      examples: ["Regiões", "Zonas de Disponibilidade", "AWS Console"],
      books: ["AWS Certified Solutions Architect Study Guide - Ben Piper"],
      practice: [
        "O que é o Modelo de Responsabilidade Compartilhada?",
        "Diferencie Região de Zona de Disponibilidade."
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "AWS_Compute",
      label: "Compute (EC2/Lambda)",
      group: 11,
      status: "locked",
      description: "Serviços de computação na nuvem, desde máquinas virtuais até serverless.",
      examples: ["EC2 Instances", "AWS Lambda", "Fargate"],
      books: ["Serverless Architectures on AWS - Peter Sbarski"],
      practice: [
        "Lance uma instância EC2 pelo console AWS.",
        "O que é 'Cold Start' em Lambda?"
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "AWS_Storage",
      label: "Storage (S3/RDS)",
      group: 11,
      status: "locked",
      description: "Soluções de armazenamento de objetos e bancos de dados gerenciados.",
      examples: ["Buckets S3", "Amazon Aurora", "Elastic Block Store (EBS)"],
      books: ["Amazon S3 Cookbook - Namrith S."],
      practice: [
        "Faça upload de um arquivo para o S3.",
        "O que são as classes de armazenamento do S3 (Standard, Glacier)?"
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "AWS_Net",
      label: "Networking (VPC)",
      group: 11,
      status: "locked",
      description: "Rede virtual isolada na nuvem AWS.",
      examples: ["Subnets", "Route Tables", "Gateways", "Peering"],
      books: ["AWS Networking Cookbook - Satyajit Das"],
      practice: [
        "O que é uma VPC?",
        "Configure um Security Group para liberar a porta 80."
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "AWS_Services",
      label: "AWS Services",
      group: 11,
      status: "locked",
      description: "Ecossistema vasto de serviços como mensageria, envio de emails e CDN.",
      examples: ["SQS", "SNS", "SES", "CloudFront", "Route53"],
      books: ["AWS Administration - The Definitive Guide"],
      practice: [
        "Para que serve o CloudFront?",
        "Diferencie SQS (fila) de SNS (tópico)."
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Security_Cloud",
      label: "Cloud Security",
      group: 11,
      status: "locked",
      description: "Práticas e ferramentas para segurança na nuvem.",
      examples: ["IAM Policies", "KMS (Keys)", "WAF", "Security Groups"],
      books: ["AWS Security - Dylan Shields"],
      practice: [
        "Crie um usuário IAM com permissão ReadOnly.",
        "O que é o princípio do menor privilégio?"
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Monitoring",
      label: "Monitoramento",
      group: 11,
      status: "locked",
      description: "Observabilidade de sistemas para garantir saúde e performance.",
      examples: ["CloudWatch", "Prometheus", "Grafana", "Distributed Tracing"],
      books: ["Site Reliability Engineering - Betsy Beyer et al."],
      practice: [
        "Configure um alarme no CloudWatch (ex: CPU alta).",
        "O que são logs de aplicação?"
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },

    // --- 12. ENGENHARIA DE SOFTWARE E QUALIDADE ---
    {
      id: "Eng_Soft",
      label: "Engenharia de Software",
      group: 12,
      status: "locked",
      description: "Aplicação sistemática de princípios de engenharia para o desenvolvimento de software.",
      examples: ["Ciclo de vida (SDLC)", "Requisitos"],
      books: ["Software Engineering - Ian Sommerville"],
      practice: [
        "Quais as fases do modelo Cascata?",
        "O que é um Requisito Funcional?"
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "SOLID",
      label: "SOLID Principles",
      group: 12,
      status: "locked",
      description: "Cinco princípios de design para tornar o software mais compreensível, flexível e manutenível.",
      examples: ["Single Responsibility", "Dependency Inversion"],
      books: ["Clean Architecture - Uncle Bob"],
      practice: [
        "Explique o princípio da Responsabilidade Única (SRP).",
        "Refatore um código violando o Open/Closed Principle."
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Clean_Code",
      label: "Clean Code",
      group: 12,
      status: "locked",
      description: "Práticas para escrever código legível e elegante.",
      examples: ["Nomes significativos", "Funções pequenas", "DRY / KISS"],
      books: ["Clean Code - Uncle Bob"],
      practice: [
        "Cite 3 características de um 'Código Limpo'.",
        "Por que comentários excessivos podem ser um sinal ruim?"
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Arch_Patterns",
      label: "Padrões Arquiteturais",
      group: 12,
      status: "locked",
      description: "Soluções reutilizáveis para problemas comuns de arquitetura de software.",
      examples: ["Monolito", "Microserviços", "Hexagonal", "Event-Driven"],
      books: ["Software Architecture Patterns - Mark Richards"],
      practice: [
        "Compare Monolito vs Microserviços.",
        "O que é Arquitetura Hexagonal (Ports & Adapters)?"
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Event_Arch",
      label: "Event-Driven",
      group: 12,
      status: "locked",
      description: "Arquitetura onde o fluxo do programa é determinado por eventos.",
      examples: ["Kafka", "RabbitMQ", "Pub/Sub", "Event Sourcing"],
      books: ["Building Event-Driven Microservices - Adam Bellemare"],
      practice: [
        "O que é um Event Bus?",
        "Qual a vantagem do desacoplamento por eventos?"
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "System_Design",
      label: "System Design",
      group: 12,
      status: "locked",
      description: "Processo de definir a arquitetura, interfaces e dados para um sistema satisfazer requisitos.",
      examples: ["Twitter Design", "Uber Design", "Escalabilidade"],
      books: ["System Design Interview - Alex Xu"],
      practice: [
        "Projete um encurtador de URL (ex: bit.ly).",
        "Como escalar um banco de dados (Sharding/Replication)?"
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Load_Balancing",
      label: "Load Balancing",
      group: 12,
      status: "locked",
      description: "Distribuição eficiente de tráfego de rede ou aplicação entre vários servidores.",
      examples: ["Round Robin", "Least Connections", "IP Hash"],
      books: ["Nginx Cookbook - Derek DeJonghe"],
      practice: [
        "Explique o algoritmo Round Robin.",
        "O que é Health Check em um Load Balancer?"
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Testing",
      label: "Testes Automatizados",
      group: 12,
      status: "locked",
      description: "Prática de usar software para controlar a execução de testes.",
      examples: ["Pirâmide de testes", "TDD"],
      books: ["Test Driven Development: By Example"],
      practice: [
        "O que é a Pirâmide de Testes?",
        "Escreva um teste que falha e depois faça-o passar (TDD)."
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Unit_Test",
      label: "Testes Unitários",
      group: 12,
      status: "locked",
      description: "Testes que verificam a menor parte testável de uma aplicação (unidade).",
      examples: ["Jest", "JUnit", "Mocks", "Stubs"],
      books: ["The Art of Unit Testing - Roy Osherove"],
      practice: [
        "Escreva um teste unitário para uma função de soma.",
        "O que é um Mock?"
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "E2E_Test",
      label: "Testes E2E",
      group: 12,
      status: "locked",
      description: "End-to-End Testing - testa o fluxo da aplicação do início ao fim como um usuário real.",
      examples: ["Cypress", "Playwright", "Selenium", "Puppeteer"],
      books: ["End-to-End Testing with Cypress - Waweru Mwaura"],
      practice: [
        "Qual a desvantagem dos testes E2E?",
        "Descreva um teste E2E para um fluxo de login."
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "QA_Tools",
      label: "Ferramentas QA",
      group: 12,
      status: "locked",
      description: "Ferramentas auxiliares para garantia de qualidade e documentação de APIs.",
      examples: ["Postman", "Swagger / OpenAPI", "K6 (Load Testing)"],
      books: ["API Testing and Development with Postman - Dave Westerveld"],
      practice: [
        "Use o Postman para testar uma rota da sua API.",
        "O que é o Swagger UI?"
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Security_App",
      label: "App Security",
      group: 12,
      status: "locked",
      description: "Segurança de aplicações web e proteção contra vulnerabilidades comuns.",
      examples: ["OWASP Top 10", "SQL Injection", "XSS", "CSRF"],
      books: ["The Web Application Hacker's Handbook - Stuttard & Pinto"],
      practice: [
        "O que é SQL Injection e como prevenir?",
        "Como proteger contra ataques XSS?"
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },

    // --- 13. INTELIGÊNCIA ARTIFICIAL E DADOS ---
    {
      id: "AI_Intro",
      label: "Intro IA",
      group: 13,
      status: "locked",
      description: "Área da ciência da computação dedicada à criação de sistemas capazes de realizar tarefas que requerem inteligência humana.",
      examples: ["História da IA", "IA Fraca vs Forte", "Expert Systems"],
      books: ["Artificial Intelligence: A Modern Approach - Russell & Norvig"],
      practice: [
        "O que é o Teste de Turing?",
        "Diferencie IA Simbólica de IA Conexionista."
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "ML",
      label: "Machine Learning",
      group: 13,
      status: "locked",
      description: "Subcampo da IA que dá aos computadores a habilidade de aprender sem serem explicitamente programados.",
      examples: ["Regressão Linear", "Árvores de Decisão", "SVM"],
      books: ["Hands-On Machine Learning... - Aurélien Géron"],
      practice: [
        "Explique o que é 'Overfitting'.",
        "Qual a diferença entre parâmetros e hiperparâmetros?"
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "ML_Types",
      label: "Tipos de ML",
      group: 13,
      status: "locked",
      description: "Categorias de aprendizado: Supervisionado, Não-supervisionado e Reforço.",
      examples: ["Classificação vs Clustering", "Reinforcement Learning", "Dimensionality Reduction"],
      books: ["Pattern Recognition and Machine Learning - Christopher Bishop"],
      practice: [
        "Dê um exemplo de Aprendizado Supervisionado.",
        "O que é Clustering?"
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Neural_Nets",
      label: "Redes Neurais",
      group: 13,
      status: "locked",
      description: "Modelos computacionais inspirados no sistema nervoso central animal.",
      examples: ["Perceptron", "Backpropagation"],
      books: ["Deep Learning - Goodfellow"],
      practice: [
        "O que é um Neurônio Artificial?",
        "Qual a função da 'Função de Ativação'?"
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Gen_AI",
      label: "IA Generativa (LLMs)",
      group: 13,
      status: "locked",
      description: "IA capaz de gerar novos conteúdos (texto, imagens) em resposta a prompts.",
      examples: ["GPT-4", "Stable Diffusion", "Transformers", "LLaMA"],
      books: ["Natural Language Processing with Transformers - Tunstall et al."],
      practice: [
        "O que são Transformers em NLP?",
        "Explique o conceito de 'Attention Mechanism'."
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Prompt_Eng",
      label: "Prompt Engineering",
      group: 13,
      status: "locked",
      description: "Arte de formular entradas (prompts) para obter os melhores resultados de modelos de IA.",
      examples: ["Chain of Thought", "Zero-shot learning", "Role Prompting"],
      books: ["Prompt Engineering Guide (Online)"],
      practice: [
        "Escreva um prompt usando 'Chain of Thought'.",
        "O que é Few-Shot Prompting?"
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "LangChain",
      label: "LangChain",
      group: 13,
      status: "locked",
      description: "Framework para desenvolver aplicações impulsionadas por modelos de linguagem.",
      examples: ["Agents", "Chains", "RAG (Retrieval Augmented Generation)", "Memory"],
      books: ["LangChain Documentation"],
      practice: [
        "O que é RAG (Retrieval Augmented Generation)?",
        "Para que servem os 'Agents' no LangChain?"
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
    {
      id: "Future_Tech",
      label: "Tech Futura",
      group: 13,
      status: "locked",
      description: "Tecnologias emergentes que prometem revolucionar a computação.",
      examples: ["Computação Quântica", "Edge Computing", "IoT", "5G"],
      books: ["Quantum Computing Since Democritus - Scott Aaronson"],
      practice: [
        "O que é um Qubit?",
        "Qual a diferença entre Cloud Computing e Edge Computing?"
      ],
      links: [
        { label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }
      ]
    },
  ],
  links: [
    // 1. Fundamentos
    { source: "Fisica", target: "Eletronica" },
    { source: "Fisica", target: "Eletricidade" },
    { source: "Eletricidade", target: "Corrente_Cont" },
    { source: "Corrente_Cont", target: "Semicondutores" },
    { source: "Semicondutores", target: "Transistores" },
    { source: "Transistores", target: "Eletronica" },
    { source: "Eletronica", target: "Logica_Bool" },
    { source: "Eletronica", target: "Portas_Logicas" },
    { source: "Portas_Logicas", target: "Porta_AND" },
    { source: "Portas_Logicas", target: "Porta_OR" },
    { source: "Portas_Logicas", target: "Porta_NOT" },
    { source: "Portas_Logicas", target: "Porta_XOR" },
    { source: "Portas_Logicas", target: "Flip_Flops" },
    { source: "Flip_Flops", target: "Circuitos_Som" },
    { source: "Circuitos_Som", target: "Circuitos_Int" },
    { source: "Logica_Bool", target: "Algebra_Boole" },
    { source: "Algebra_Boole", target: "Tabela_Verdade" },
    { source: "Logica_Bool", target: "Binario" },
    { source: "Binario", target: "Sist_Num" },
    { source: "Sist_Num", target: "Hexadecimal" },
    { source: "Sist_Num", target: "Octal" },
    { source: "Binario", target: "Bitwise" },
    { source: "Math_Comp", target: "Algoritmos" },
    { source: "Math_Comp", target: "Teoria_Conj" },
    { source: "Math_Comp", target: "Analise_Comb" },
    { source: "Math_Comp", target: "Teoria_Grafos" },
    { source: "Turing", target: "Enigma" },
    { source: "Enigma", target: "Maquina_Turing" },
    { source: "Maquina_Turing", target: "Teoria_Comp" },
    { source: "Teoria_Comp", target: "Prob_Parada" },
    { source: "Teoria_Comp", target: "Automatos" },

    // 2. Hardware
    { source: "Eletronica", target: "Von_Neumann" },
    { source: "Von_Neumann", target: "CPU" },
    { source: "CPU", target: "ULA" },
    { source: "CPU", target: "UC" },
    { source: "CPU", target: "Registradores" },
    { source: "UC", target: "Ciclo_Instr" },
    { source: "CPU", target: "Multi_Core" },
    { source: "UC", target: "Escalonamento_Hw" },
    { source: "Von_Neumann", target: "Memoria_Hier" },
    { source: "Memoria_Hier", target: "RAM" },
    { source: "Memoria_Hier", target: "Cache_L1" },
    { source: "Cache_L1", target: "Cache_L2" },
    { source: "Cache_L2", target: "Cache_L3" },
    { source: "Memoria_Hier", target: "SSD" },
    { source: "Hardware_Prog", target: "FPGA" },
    { source: "FPGA", target: "Verilog" },
    { source: "FPGA", target: "VHDL" },
    { source: "CPU", target: "Assembly" },
    { source: "Assembly", target: "Ponteiros" },
    { source: "Ponteiros", target: "Alocacao_Din" },
    { source: "Assembly", target: "Compiladores" },
    { source: "Compiladores", target: "Interpretadores" },
    { source: "Compiladores", target: "Parsing" },
    { source: "Parsing", target: "Codigo_Maquina" },

    // 3. Algoritmos
    { source: "Binario", target: "Algoritmos" },
    { source: "Algoritmos", target: "Est_Dados_Basic" },
    { source: "Algoritmos", target: "BigO_Time" },
    { source: "BigO_Time", target: "BigO_Space" },
    { source: "Algoritmos", target: "Recursividade" },
    { source: "Algoritmos", target: "Buscas" },
    { source: "Buscas", target: "BFS" },
    { source: "Buscas", target: "DFS" },
    { source: "Algoritmos", target: "Ordenacao" },
    { source: "Algoritmos", target: "Gulosos" },
    { source: "Algoritmos", target: "Prog_Dinamica" },
    { source: "Est_Dados_Basic", target: "Vetores" },
    { source: "Est_Dados_Basic", target: "Listas_Lig" },
    { source: "Est_Dados_Basic", target: "Pilhas" },
    { source: "Est_Dados_Basic", target: "Filas" },
    { source: "Est_Dados_Basic", target: "Est_Dados_Adv" },
    { source: "Est_Dados_Adv", target: "Mapas_Hash" },
    { source: "Est_Dados_Adv", target: "Arvores_Bin" },
    { source: "Est_Dados_Adv", target: "Heaps" },
    { source: "Est_Dados_Adv", target: "Sets" },
    { source: "Algoritmos", target: "Paradigma_Imperativo" },
    { source: "Paradigma_Imperativo", target: "Paradigma_Proc" },
    { source: "Paradigma_Imperativo", target: "POO" },
    { source: "POO", target: "Classes" },
    { source: "Classes", target: "Objetos_POO" },
    { source: "Classes", target: "Heranca" },
    { source: "Classes", target: "Polimorfismo" },
    { source: "Classes", target: "Encapsulamento" },
    { source: "POO", target: "Abstracao" },
    { source: "Math_Comp", target: "Paradigma_Func" },
    { source: "Paradigma_Func", target: "Imutabilidade" },
    { source: "Paradigma_Func", target: "Higher_Order" },

    // 4. SO
    { source: "CPU", target: "Kernel" },
    { source: "Kernel", target: "Processos" },
    { source: "Processos", target: "Threads" },
    { source: "Threads", target: "Race_Cond" },
    { source: "Race_Cond", target: "Deadlocks" },
    { source: "Memoria_Hier", target: "Gestao_Memoria" },
    { source: "Gestao_Memoria", target: "Mem_Virtual" },
    { source: "Mem_Virtual", target: "Paginacao" },
    { source: "Mem_Virtual", target: "Segmentacao" },
    { source: "Kernel", target: "FS" },
    { source: "FS", target: "NTFS" },
    { source: "FS", target: "EXT4" },
    { source: "Kernel", target: "Linux" },
    { source: "Linux", target: "Terminal" },
    { source: "Terminal", target: "Bash" },
    { source: "Terminal", target: "Permissoes" },
    { source: "Linux", target: "Pkg_Mgr" },
    { source: "Linux", target: "SSH_Proto" },
    { source: "Linux", target: "Virtualizacao" },
    { source: "Virtualizacao", target: "Hypervisors" },

    // 5. Redes
    { source: "Linux", target: "OSI" },
    { source: "OSI", target: "TCP_IP" },
    { source: "TCP_IP", target: "TCP" },
    { source: "TCP_IP", target: "UDP" },
    { source: "TCP_IP", target: "IP" },
    { source: "IP", target: "IPv4_v6" },
    { source: "IP", target: "DNS" },
    { source: "TCP_IP", target: "HTTP_Proto" },
    { source: "HTTP_Proto", target: "HTTP_Headers" },
    { source: "HTTP_Proto", target: "Cookies_Sess" },
    { source: "HTTP_Proto", target: "SSL_TLS" },
    { source: "SSL_TLS", target: "Firewalls" },
    { source: "HTTP_Proto", target: "Proxy" },
    { source: "Proxy", target: "CDN" },

    // 6. Linguagens
    { source: "Assembly", target: "Lang_C" },
    { source: "Lang_C", target: "Lang_Python" },
    { source: "Lang_C", target: "Lang_Java" },
    { source: "Lang_Java", target: "Lang_Kotlin" },
    { source: "Lang_C", target: "Lang_CS" },
    { source: "Lang_C", target: "Lang_Go" },
    { source: "Lang_C", target: "Lang_PHP" },
    { source: "Lang_C", target: "Lang_Rust" },
    { source: "Lang_C", target: "Lang_JS" },
    { source: "Lang_JS", target: "Lang_TS" },

    // 7. JS Técnico
    { source: "Lang_JS", target: "JS_Basics" },
    { source: "JS_Basics", target: "Vars" },
    { source: "JS_Basics", target: "Types_JS" },
    { source: "JS_Basics", target: "Ops_JS" },
    { source: "JS_Basics", target: "Control_Flow" },
    { source: "JS_Basics", target: "Arrays_Methods" },
    { source: "JS_Basics", target: "JS_Deep" },
    { source: "JS_Deep", target: "Closures" },
    { source: "JS_Deep", target: "Callbacks" },
    { source: "Callbacks", target: "Arrow_Fn" },
    { source: "JS_Deep", target: "Objects_Proto" },
    { source: "Objects_Proto", target: "Classes_ES6" },
    { source: "JS_Deep", target: "Modules" },
    { source: "JS_Deep", target: "Async_JS" },
    { source: "Async_JS", target: "Event_Loop" },
    { source: "Event_Loop", target: "Hoisting" },
    { source: "Lang_JS", target: "DOM" },
    { source: "DOM", target: "Fetch" },
    { source: "Fetch", target: "Error_Handling" },

    // 8. Frontend React
    { source: "Lang_JS", target: "Frontend_React" },
    { source: "Frontend_React", target: "Components" },
    { source: "Components", target: "Virtual_DOM" },
    { source: "Components", target: "Props_State" },
    { source: "Props_State", target: "Effects" },
    { source: "Effects", target: "Hooks_Adv" },
    { source: "Frontend_React", target: "Rendering" },
    { source: "Props_State", target: "Redux" },
    { source: "Props_State", target: "Context" },
    { source: "Frontend_React", target: "Router" },
    { source: "Frontend_React", target: "Acessibilidade" },
    { source: "Frontend_React", target: "i18n" },
    { source: "Frontend_React", target: "Styling" },
    { source: "Frontend_React", target: "Forms" },
    { source: "Frontend_React", target: "Axios" },

    // 9. Backend
    { source: "Async_JS", target: "Backend_Node" },
    { source: "Backend_Node", target: "Express" },
    { source: "Express", target: "API_Arch" },
    { source: "API_Arch", target: "REST" },
    { source: "API_Arch", target: "GraphQL" },
    { source: "API_Arch", target: "gRPC" },
    { source: "Express", target: "Middlewares" },
    { source: "Express", target: "Auth_Web" },
    { source: "Express", target: "Realtime" },
    { source: "Express", target: "Security_API" },

    // 10. Database
    { source: "Est_Dados_Adv", target: "DB_Concepts" },
    { source: "DB_Concepts", target: "ACID" },
    { source: "DB_Concepts", target: "Normalizacao" },
    { source: "DB_Concepts", target: "DB_SQL" },
    { source: "DB_SQL", target: "Postgres" },
    { source: "DB_SQL", target: "MySQL" },
    { source: "DB_SQL", target: "Joins" },
    { source: "DB_Concepts", target: "DB_NoSQL" },
    { source: "DB_NoSQL", target: "Mongo" },
    { source: "DB_NoSQL", target: "Redis" },
    { source: "DB_NoSQL", target: "Neo4j" },
    { source: "DB_NoSQL", target: "Vector_DB" },
    { source: "DB_SQL", target: "ORM" },
    { source: "ORM", target: "Migrations" },
    { source: "DB_SQL", target: "Data_Eng" },
    { source: "Data_Eng", target: "ETL" },

    // 11. DevOps & Cloud
    { source: "Linux", target: "DevOps_Culture" },
    { source: "DevOps_Culture", target: "Git" },
    { source: "Git", target: "GitHub" },
    { source: "DevOps_Culture", target: "Docker" },
    { source: "Docker", target: "K8s" },
    { source: "DevOps_Culture", target: "IaC" },
    { source: "GitHub", target: "CI_CD" },
    { source: "DevOps_Culture", target: "AWS_Cloud" },
    { source: "AWS_Cloud", target: "AWS_Compute" },
    { source: "AWS_Cloud", target: "AWS_Storage" },
    { source: "AWS_Cloud", target: "AWS_Net" },
    { source: "AWS_Cloud", target: "AWS_Services" },
    { source: "AWS_Cloud", target: "Security_Cloud" },
    { source: "AWS_Cloud", target: "Monitoring" },

    // 12. Eng Software
    { source: "POO", target: "Eng_Soft" },
    { source: "Eng_Soft", target: "SOLID" },
    { source: "Eng_Soft", target: "Clean_Code" },
    { source: "Eng_Soft", target: "Arch_Patterns" },
    { source: "Arch_Patterns", target: "Event_Arch" },
    { source: "Eng_Soft", target: "System_Design" },
    { source: "System_Design", target: "Load_Balancing" },
    { source: "Eng_Soft", target: "Testing" },
    { source: "Testing", target: "Unit_Test" },
    { source: "Testing", target: "E2E_Test" },
    { source: "Testing", target: "QA_Tools" },
    { source: "Eng_Soft", target: "Security_App" },

    // 13. AI
    { source: "Math_Comp", target: "AI_Intro" },
    { source: "AI_Intro", target: "ML" },
    { source: "ML", target: "ML_Types" },
    { source: "ML", target: "Neural_Nets" },
    { source: "Neural_Nets", target: "Gen_AI" },
    { source: "Gen_AI", target: "Prompt_Eng" },
    { source: "Gen_AI", target: "LangChain" },
    { source: "AI_Intro", target: "Future_Tech" },
  ],
};

const statusColor = {
  pending: "#e74c3c",
  in_progress: "#3498db",
  done: "#f1c40f",
  skip: "#95a5a6",

  // Legacy
  locked: "#e74c3c",
  available: "#3498db",
  mastered: "#f1c40f"
};

const KnowledgeMap = () => {
  const svgRef = useRef(null);
  const nodeRef = useRef(null);

  const [nodes, setNodes] = useState(() => {
    // 1. Try to load from local storage
    const saved = localStorage.getItem("knowledge_map_data");
    const savedStatusMap = saved ? JSON.parse(saved) : {};

    return graphData.nodes.map(n => {
      // 2. If saved status exists, use it
      if (savedStatusMap[n.id]) {
        return { ...n, status: savedStatusMap[n.id] };
      }

      // 3. Otherwise, default everything to "pending"
      // Legacy mapping can be kept if we want to migrate hardcoded "locked/available" to "pending",
      // but the user requirement is "default all... to pending".
      return { ...n, status: "pending" };
    });
  });

  const [links] = useState(graphData.links.map(l => ({ ...l })));

  const [selectedNode, setSelectedNode] = useState(null);
  const [tooltip, setTooltip] = useState({
    visible: false,
    content: "",
    x: 0,
    y: 0,
  });

  const handleStatusChange = (newStatus) => {
    if (!selectedNode) return;

    // Update Node State
    const updatedNodes = nodes.map(n =>
      n.id === selectedNode.id ? { ...n, status: newStatus } : n
    );
    setNodes(updatedNodes);
    setSelectedNode(prev => ({ ...prev, status: newStatus }));

    // Persist to LocalStorage
    const statusMap = updatedNodes.reduce((acc, node) => {
      acc[node.id] = node.status;
      return acc;
    }, {});
    localStorage.setItem("knowledge_map_data", JSON.stringify(statusMap));
  };

  useEffect(() => {
    if (nodeRef.current) {
      nodeRef.current
        .select("circle")
        .attr("stroke", d => {
          const match = nodes.find(n => n.id === d.id);
          return statusColor[match ? match.status : d.status];
        });
    }
  }, [nodes]);

  // Definição Central de Cores e Labels
  const GROUP_CONFIG = {
    1: { color: "#6c5ce7", label: "1. Fundamentos & Math" },
    2: { color: "#e17055", label: "2. Hardware & Arquitetura" },
    3: { color: "#e84393", label: "3. CS & Algoritmos" },
    4: { color: "#00cec9", label: "4. Sistemas Operacionais" },
    5: { color: "#0984e3", label: "5. Redes & Comunicação" },
    6: { color: "#ffeaa7", label: "6. Linguagens" },
    7: { color: "#00b894", label: "7. JavaScript Técnico" },
    8: { color: "#636e72", label: "8. Frontend React" },
    9: { color: "#d63031", label: "9. Backend & APIs" },
    10: { color: "#fd79a8", label: "10. BD & Eng. Dados" },
    11: { color: "#a29bfe", label: "11. DevOps & Cloud" },
    12: { color: "#55efc4", label: "12. Eng. Software QA" },
    13: { color: "#74b9ff", label: "13. IA & Dados" },
  };

  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3
      .select(svgRef.current)
      .attr("viewBox", [0, 0, width, height])
      .classed("knowledge-map-container", true);

    const g = svg.append("g");

    const zoom = d3
      .zoom()
      .scaleExtent([0.1, 4])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
      });
    svg.call(zoom);

    // Initial simulation setup using the state-initialized nodes
    // We do NOT want to re-run this effect when 'nodes' state changes to avoid position reset.
    // The 'nodes' variable here comes from the closure of the first render (if deps is [])
    // OR we should trust the state passed.
    // However, D3 mutates objects.
    // If we use the 'nodes' from the very first render, it's fine.

    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3
          .forceLink(links)
          .id((d) => d.id)
          .distance(100)
      )
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collide", d3.forceCollide().radius(30));

    const link = g
      .append("g")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.3)
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke-width", 1.5);

    const node = g
      .append("g")
      .selectAll("g")
      .data(nodes)
      .join("g")
      .call(drag(simulation));

    // Save Ref
    nodeRef.current = node;

    node
      .append("circle")
      .attr("r", 10) // Standardization
      .attr("fill", (d) => GROUP_CONFIG[d.group].color)
      .attr("class", "node-circle")
      .attr("stroke", (d) => statusColor[d.status])
      .attr("stroke-width", 3);

    node
      .append("text")
      .text((d) => d.label)
      .attr("x", 18)
      .attr("y", 5)
      .style("font-size", "12px")
      .style("fill", "#ccc")
      .style("pointer-events", "none")
      .style("text-shadow", "1px 1px 2px #000");

    node
      .on("mouseover", (event, d) => {
        d3.select(event.currentTarget).select("circle").transition().duration(200).attr("r", 18);
        setTooltip({
          visible: true,
          content: `<strong>${d.label}</strong>`,
          x: event.pageX + 10,
          y: event.pageY - 28,
        });
      })
      .on("mousemove", (event) => {
        setTooltip((prev) => ({
          ...prev,
          x: event.pageX + 10,
          y: event.pageY - 28
        }));
      })
      .on("mouseout", (event, d) => {
        d3.select(event.currentTarget).select("circle").transition().duration(200).attr("r", 10);
        setTooltip((prev) => ({ ...prev, visible: false }));
      })
      .on("click", (event, d) => {
        event.stopPropagation();
        // Look up latest node data from state if possible, but 'd' is decent for ID
        // To be safe and get the latest status, we should find it in the nodes array
        // But inside this effect closure, 'nodes' is the initial array.
        // We will just use 'd' to get ID, and 'setSelectedNode' will need to find the node or
        // we assume 'd' has the correct ID.
        // Actually, we can just set the ID and let the UI find the node from 'nodes' state? 
        // But currently setSelectedNode stores the whole object.
        // We will fix this by searching in the 'nodes' STATE when opening.
        // But to access current 'nodes' state here, we would need it in deps, which triggers re-render.
        // Workaround: Pass a function to setSelectedNode or just pass 'd' (which has stale status) 
        // and let the render logic find the up-to-date node.
        // For now, I'll pass 'd'.
        // In the render: selectedNode state object will be used. 
        // I will update the render logic to find the node in 'nodes' state based on 'selectedNode.id'.
        setSelectedNode(d);
      });

    svg.on("click", () => {
      setSelectedNode(null);
    });

    simulation.on("tick", () => {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);
      node.attr("transform", (d) => `translate(${d.x},${d.y})`);
    });

    function drag(simulation) {
      function dragstarted(event) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
        d3.select(this).style("cursor", "grabbing");
      }
      function dragged(event) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
      }
      function dragended(event) {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
        d3.select(this).style("cursor", "grab");
      }
      return d3
        .drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
    }

    return () => simulation.stop();
  }, []);

  return (
    <>
      <div
        className={`tooltip ${tooltip.visible ? "visible" : ""}`}
        style={{ left: `${tooltip.x}px`, top: `${tooltip.y}px` }}
        dangerouslySetInnerHTML={{ __html: tooltip.content }}
      />

      {/* PAINEL LATERAL DE DETALHES */}
      <div className={`details-panel ${selectedNode ? "open" : ""}`}>
        <button className="close-btn" onClick={() => setSelectedNode(null)}>
          &times;
        </button>
        {selectedNode && (() => {
          // Find the latest state for this node
          const currentNode = nodes.find(n => n.id === selectedNode.id) || selectedNode;

          return (
            <>
              <h2 style={{ borderBottomColor: GROUP_CONFIG[currentNode.group].color }}>
                {currentNode.label}
              </h2>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ marginRight: '10px', color: '#ccc' }}>Status:</label>
                <select
                  value={currentNode.status}
                  onChange={(e) => handleStatusChange(e.target.value)}
                  style={{
                    padding: '5px 10px',
                    borderRadius: '5px',
                    border: `2px solid ${statusColor[currentNode.status]}`,
                    backgroundColor: 'rgba(0,0,0,0.3)',
                    color: 'white',
                    cursor: 'pointer',
                    outline: 'none',
                    fontWeight: 'bold'
                  }}
                >
                  <option value="in_progress">In Progress</option>
                  <option value="pending">Pending</option>
                  <option value="done">Done</option>
                  <option value="skip">Skip</option>
                </select>
              </div>

              <h3>Sobre o Conceito</h3>
              <p>{currentNode.description || "Descrição detalhada em breve..."}</p>

              <h3>Exemplos Práticos</h3>
              {currentNode.examples && currentNode.examples.length > 0 ? (
                <ul>
                  {currentNode.examples.map((ex, i) => (
                    <li key={i}>{ex}</li>
                  ))}
                </ul>
              ) : (
                <p>Exemplos práticos serão adicionados.</p>
              )}

              <h3>Onde Aprender (Livros)</h3>
              {currentNode.books && currentNode.books.length > 0 ? (
                <ul>
                  {currentNode.books.map((bk, i) => (
                    <li key={i}>📖 {bk}</li>
                  ))}
                </ul>
              ) : (
                <p>Referências bibliográficas em breve.</p>
              )}

              <h3>Exercícios Práticos</h3>
              {currentNode.practice && currentNode.practice.length > 0 ? (
                <ul style={{ paddingLeft: '20px' }}>
                  {currentNode.practice.map((prac, i) => (
                    <li key={i} style={{ marginBottom: '10px' }}>
                      {typeof prac === 'string' ? (
                        <span>🛠️ {prac}</span>
                      ) : (
                        <details>
                          <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>❓ {prac.question}</summary>
                          <div style={{
                            marginTop: '5px',
                            padding: '10px',
                            background: 'rgba(255,255,255,0.05)',
                            borderRadius: '5px',
                            fontSize: '0.9em',
                            whiteSpace: 'pre-wrap'
                          }}>
                            💡 <strong>Resolução:</strong> {prac.answer}
                          </div>
                        </details>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Exercícios em breve.</p>
              )}

              <h3>Links</h3>
              {currentNode.links && currentNode.links.length > 0 ? (
                <ul>
                  {currentNode.links.map((link, i) => (
                    <li key={i}>
                      🔗 <a href={link.url} target="_blank" rel="noopener noreferrer" style={{ color: '#3498db', textDecoration: 'none' }}>
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Links serão adicionados.</p>
              )}
            </>
          );
        })()}
      </div>

      <svg ref={svgRef}></svg>

      {/* Legenda Dinâmica */}
      <div style={{
        position: 'absolute',
        bottom: 20,
        left: 20,
        zIndex: 10,
        color: 'white',
        fontFamily: 'sans-serif',
        fontSize: '12px',
        background: 'rgba(0,0,0,0.7)',
        padding: '10px',
        borderRadius: '8px',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'flex-start',
        flexDirection: 'column',
        gap: '8px',
        border: '1px solid rgba(255,255,255,0.1)'
      }}>
        <h3 style={{ margin: '0 0 5px 0' }}>Legenda de Áreas</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
          {Object.values(GROUP_CONFIG).map((group, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{
                display: 'inline-block',
                width: 10,
                height: 10,
                background: group.color,
                borderRadius: '50%'
              }}></span>
              {group.label}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default KnowledgeMap;
