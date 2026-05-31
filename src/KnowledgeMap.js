import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import "./KnowledgeMap.css";

const graphData = {
  nodes: [
    // ==================================
    // 1. FUNDAMENTOS DA ELETRICIDADE
    // ==================================
    {
      id: "fundamentos_eletricidade",
      label: "Fundamentos da Eletricidade",
      group: 2,
      status: "pending",
      description:
        "Estudo dos fenômenos físicos originados pela presença, interação e movimento de cargas elétricas. Aborda os conceitos de carga elementar, conservação da carga e as forças eletrostáticas que governam o comportamento dos portadores.",
      examples: ["Análise de Campo Elétrico em Semicondutores", "Acúmulo de Carga por Atrito Triboelétrico (ESD)"],
      books: [
        "Física II: Eletricidade e Magnetismo - Jaime E. Villate",
        "Fundamentos da Eletricidade - Kelly Vinente dos Santos (MEC)",
        "Fundamentos de Circuitos Elétricos - Alexander & Sadiku",
      ],
      practice: [
        {
          question:
            "Qual a menor quantidade de carga elétrica livre que pode existir isolada na natureza e a quem ela pertence?",
          answer:
            "É a carga elementar, cujo valor absoluto é de aproximadamente 1,602 x 10⁻¹⁹ Coulombs, pertencente ao elétron (carga negativa) e ao próton (carga positiva).",
        },
      ],
      links: [{ label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }],
    },
    {
      id: "estrutura_atomica_eletron",
      label: "Estrutura Atômica e o Elétron",
      group: 2,
      status: "pending",
      description:
        "Análise dos orbitais atômicos, elétrons de valência e bandas de energia (valência, condução e banda proibida). Estuda o comportamento do elétron livre como o principal portador de carga em sistemas condutores e dopagens de materiais semicondutores.",
      examples: [
        "Comportamento do Silício Tipo-P e Tipo-N",
        "Barreira de Potencial em Diodos de Transistores",
        "Processos de Eletrização",
      ],
      books: [
        "Análise de Circuitos em Engenharia - Hayt, Kemmerly & Durbin",
        "Física II: Eletricidade e Magnetismo - Jaime E. Villate",
        "Fundamentos da Eletricidade - Kelly Vinente dos Santos (MEC)",
      ],
      practice: [
        {
          question:
            "O que caracteriza a banda de condução em um material condutor e como ela se diferencia em um material isolante?",
          answer:
            "No condutor, a banda de condução está parcialmente cheia ou sobreposta à banda de valência, exigindo energia quase nula para o elétron se mover. No isolante, o 'energy gap' (bandgap) é muito grande, impedindo a passagem de elétrons.",
        },
      ],
      links: [{ label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }],
    },
    {
      id: "tensao_eletrica",
      label: "Tensão Elétrica (DDP)",
      group: 2,
      status: "pending",
      description:
        "A diferença de potencial elétrico entre dois pontos, definida como o trabalho ou energia necessária para mover uma carga unitária entre esses limites (V = W / Q). É a força motriz que impulsiona os portadores de carga.",
      examples: ["Barramentos de Sinal Digital (1.8V, 3.3V)", "Tensões de Ripple de Fontes Chaveadas"],
      books: [
        "Fundamentos de Circuitos Elétricos - Alexander & Sadiku",
        "Fundamentos da Eletricidade - Kelly Vinente dos Santos (MEC)",
        "Análise de Circuitos em Engenharia - Hayt, Kemmerly & Durbin",
      ],
      practice: [
        {
          question:
            "O que significa dizer que uma porta lógica está operando com lógica de 3.3V em termos de potencial elétrico?",
          answer:
            "Significa que a diferença de potencial elétrico entre o pino de sinal e o nó de referência comum (GND/0V) é de 3,3 Volts para representar o estado lógico alto (1).",
        },
      ],
      links: [{ label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }],
    },
    {
      id: "corrente_eletrica",
      label: "Corrente Elétrica",
      group: 2,
      status: "pending",
      description:
        "A taxa líquida de fluxo de carga elétrica que atravessa uma seção transversal condutora por unidade de tempo (i = dq / dt). Medida macroscópica expressa em Amperes.",
      examples: ["Corrente de Carga de Gates de Transistores MOSFET", "Corrente de Standby de Dispositivos Móveis"],
      books: [
        "Fundamentos de Circuitos Elétricos - Alexander & Sadiku",
        "Fundamentos da Eletricidade - Kelly Vinente dos Santos (MEC)",
        "Circuitos Elétricos - Nilsson & Riedel",
      ],
      practice: [
        {
          question:
            "Se a corrente que entra em um pino de um chip integrado varia no tempo como i(t) = 4t mA, quanta carga acumulada entrou no chip no intervalo de t = 0 a t = 3 segundos?",
          answer:
            "Usando a relação de integração da corrente (q = ∫ i(t) dt):\n\nq = ∫₀³ (4t · 10⁻³) dt = [2t²]₀³ · 10⁻³ = 18 mC",
        },
      ],
      links: [{ label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }],
    },
    {
      id: "resistencia",
      label: "Resistência Elétrica",
      group: 2,
      status: "pending",
      description:
        "A capacidade física de um elemento de se opor e limitar a passagem de corrente elétrica sob uma determinada diferença de potencial elétrico.",
      examples: ["Resistores pull-up e pull-down", "Resistências internas de canais semicondutores"],
      books: [
        "Circuitos Elétricos - Antonio Pereira & Enio Filoni",
        "Fundamentos da Eletricidade - Kelly Vinente dos Santos (MEC)",
        "Fundamentos de Circuitos Elétricos - Alexander & Sadiku",
      ],
      practice: [],
      links: [{ label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }],
    },
    {
      id: "resistividade",
      label: "Resistividade Elétrica",
      group: 2,
      status: "pending",
      description:
        "Propriedade intrínseca e microscópica de cada material de se opor à condução elétrica, correlacionando-se com parâmetros geométricos macroscópicos (comprimento e área) para definir a resistência óhmica pela Segunda Lei de Ohm (R = p · L / A).",
      examples: ["Mapeamento de Cobre vs Alumínio em PCBs", "Avaliação de Metalização de Vias de Chips"],
      books: [
        "Análise de Circuitos em Engenharia - Hayt, Kemmerly & Durbin",
        "Física II: Eletricidade e Magnetismo - Jaime E. Villate",
        "Circuitos Elétricos - Nilsson & Riedel",
      ],
      practice: [
        {
          question:
            "Como a redução da espessura (área de seção transversal A) de uma trilha condutora em uma placa de circuito impresso de alta densidade afeta a resistência de linha?",
          answer:
            "A resistência é inversamente proporcional à área (R = p · L / A). Logo, reduzir a espessura da trilha aumenta a sua resistência linear de forma direta.",
        },
      ],
      links: [{ label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }],
    },
    {
      id: "lei_de_ohm",
      label: "Lei de Ohm",
      group: 2,
      status: "pending",
      description:
        "Postulado que establishes que a queda de tensão em determinados materiais condutores lineares é diretamente proporcional à intensidade de corrente elétrica que flui por eles (V = R · i).",
      examples: ["Cálculo de Queda de Tensão em Fios longos", "Dimensionamento de Resistores Shunt"],
      books: [
        "Fundamentos de Circuitos Elétricos - Alexander & Sadiku",
        "Circuitos Elétricos - Antonio Pereira & Enio Filoni",
        "Análise de Circuitos em Engenharia - Hayt, Kemmerly & Durbin",
      ],
      practice: [
        {
          question:
            "Escreva as três formas matemáticas que relacionam potência, tensão, corrente e resistência obtidas pela fusão da Lei de Ohm com a equação geral da potência.",
          answer: "As três equações são: P = V · I, P = I² · R e P = V² / R.",
        },
      ],
      links: [{ label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }],
    },
    {
      id: "potencia_eletrica",
      label: "Potência Elétrica",
      group: 2,
      status: "pending",
      description:
        "A taxa temporal com que a energia é fornecida ou absorvida por um elemento de circuito específico (P = dW / dt = V · I). Obrigatoriamente obedece à conservação de energia (Teorema de Tellegen).",
      examples: ["Dissipação Dinâmica de Gates CMOS", "Dimensionamento de Fontes de Alimentação (PSU)"],
      books: [
        "Circuitos Elétricos - Nilsson & Riedel",
        "Análise de Circuitos em Engenharia - Hayt, Kemmerly & Durbin",
        "Fundamentos de Circuitos Elétricos - Alexander & Sadiku",
      ],
      practice: [
        {
          question:
            "Explique a Convenção Passiva de Sinais e como ela identifica se um elemento está fornecendo ou absorvendo potência.",
          answer:
            "Se a corrente de referência entra pelo terminal positivo da queda de tensão de referência, a potência calculada terá sinal positivo (+P) e o elemento absorve potência (ex: resistores). Se a corrente sai pelo terminal positivo, a potência terá sinal de referência negativo (-P) e o elemento fornece energia ao circuito.",
        },
      ],
      links: [{ label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }],
    },
    {
      id: "efeito_joule",
      label: "Efeito Joule",
      group: 2,
      status: "pending",
      description:
        "Fenômeno irreversível onde a energia cinética de elétrons livres em movimento ordenado é transferida para o retículo atômico de um condutor por meio de colisões consecutivas, manifestando-se estritamente como dissipação térmica (calor).",
      examples: ["Aquecimento de Linhas de Alimentação de Placas", "TDP (Thermal Design Power) de Processadores"],
      books: [
        "Circuitos Elétricos - Antonio Pereira & Enio Filoni",
        "Análise de Circuitos em Engenharia - Hayt, Kemmerly & Durbin",
        "Circuitos Elétricos - Nilsson & Riedel",
      ],
      practice: [
        {
          question:
            "Qual a consequência do Efeito Joule no limite físico da redução do tamanho dos transistores (Lei de Moore)?",
          answer:
            "À medida que os transistores encolhem e operam em frequências maiores, a densidade de corrente gera um calor por efeito joule tão concentrado por unidade de área que cria pontos quentes (hotspots) capazes de comprometer a estabilidade do silício, limitando o aumento do clock (Power Wall).",
        },
      ],
      links: [{ label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }],
    },

    // ==================================================
    // 2. ASSOCIAÇÃO DE RESISTORES E CIRCUITOS MISTOS
    // ==================================================
    {
      id: "associacao_de_resistores",
      label: "Associação de Resistores",
      group: 2,
      status: "pending",
      description:
        "Conjunto de técnicas e regras algébricas usadas para agrupar e simplificar redes compostas por múltiplos resistores lineares em um único componente equivalente.",
      examples: ["Simplificação de Malhas de Polarização", "Casamento de Cargas de Entrada/Saída"],
      books: [
        "Circuitos Elétricos - Antonio Pereira & Enio Filoni",
        "Fundamentos de Circuitos Elétricos - Alexander & Sadiku",
        "Circuitos Elétricos - Nilsson & Riedel",
      ],
      practice: [],
      links: [{ label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }],
    },
    {
      id: "circuitos_em_serie",
      label: "Circuitos em Série",
      group: 2,
      status: "pending",
      description:
        "Configuração topológica onde os elementos são conectados sequencialmente em cascata, compartilhando estritamente a mesma corrente elétrica, onde as resistências se somam diretamente (Req = ∑ Ri).",
      examples: ["Malhas de Feedback Simples", "Filas de Diodos de Proteção"],
      books: [
        "Fundamentos da Eletricidade - Kelly Vinente dos Santos (MEC)",
        "Circuitos Elétricos - Antonio Pereira & Enio Filoni",
        "Fundamentos de Circuitos Elétricos - Alexander & Sadiku",
      ],
      practice: [
        {
          question:
            "Se três resistores de valores 1kΩ, 2kΩ e 3kΩ forem conectados em série com uma fonte de 12V, qual a corrente total do circuito?",
          answer:
            "A resistência equivalente é a soma das partes: Req = 1k + 2k + 3k = 6kΩ. Aplicando a Lei de Ohm, a corrente total é I = V / Req = 12 / 6000 = 2 mA.",
        },
      ],
      links: [{ label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }],
    },
    {
      id: "circuitos_em_paralelo",
      label: "Circuitos em Paralelo",
      group: 2,
      status: "pending",
      description:
        "Configuração topológica onde os elementos estão conectados diretamente aos mesmos nós comuns, compartilhando identicamente a mesma diferença de potencial, calculada pela soma dos inversos das resistências (1 / Req = ∑ 1 / Ri).",
      examples: ["Distribuição de Alimentação de barramentos IC", "Redes de Pull-Up em Paralelo"],
      books: [
        "Fundamentos da Eletricidade - Kelly Vinente dos Santos (MEC)",
        "Circuitos Elétricos - Antonio Pereira & Enio Filoni",
        "Circuitos Elétricos - Nilsson & Riedel",
      ],
      practice: [
        {
          question:
            "Se você colocar um resistor de 10 kΩ em paralelo com um resistor de 10 Ω, qual será a aproximação do valor da resistência equivalente sem fazer contas?",
          answer:
            "Na associação em paralelo, a resistência equivalente é sempre menor do que o menor resistor isolado do conjunto. Portanto, o valor final será ligeiramente inferior a 10 Ω (aproximadamente 9,99 Ω).",
        },
      ],
      links: [{ label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }],
    },
    {
      id: "circuitos_mistos",
      label: "Circuitos Mistos",
      group: 2,
      status: "pending",
      description:
        "Redes elétricas complexas que combinam blocos associados em série e em paralelo de forma simultânea. Exigem simplificações sistemáticas em etapas sucessivas.",
      examples: ["Análise de Malhas Internas de Circuitos de Filtros", "Cálculo de Redes Conectoras de Placas"],
      books: [
        "Circuitos Elétricos - Antonio Pereira & Enio Filoni",
        "Fundamentos de Circuitos Elétricos - Alexander & Sadiku",
      ],
      practice: [],
      links: [{ label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }],
    },
    {
      id: "circuitos_eletricos",
      label: "Circuitos Elétricos",
      group: 2,
      status: "pending",
      description:
        "Uma interconexão de elementos elétricos que formam ao menos um caminho fechado (loop) para a circulação contínua de corrente elétrica utilizando a aproximação de parâmetros concentrados.",
      examples: ["Malhas de Alimentação de Placas-Mãe", "Loops de Realimentação de Sensores"],
      books: [
        "Circuitos Elétricos - Nilsson & Riedel",
        "Circuitos Elétricos - Antonio Pereira & Enio Filoni",
        "Análise de Circuitos em Engenharia - Hayt, Kemmerly & Durbin",
      ],
      practice: [],
      links: [{ label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }],
    },

    // =================================================
    // 3. MÉTODOS DE ANÁLISE E TEOREMAS DE CIRCUITOS
    // =================================================
    {
      id: "analise_de_circuitos",
      label: "Análise de Circuitos",
      group: 2,
      status: "pending",
      description:
        "Mecanismos analíticos e matemáticos estruturados para determinar os valores exatos de tensão, corrente e potência em todos os ramos de uma rede elétrica qualquer.",
      examples: ["Simulação Computacional Base SPICE", "Verificação de Margem de Tensão Operacional"],
      books: [
        "Análise de Circuitos em Engenharia - Hayt, Kemmerly & Durbin",
        "Circuitos Elétricos - Nilsson & Riedel",
        "Fundamentos de Circuitos Elétricos - Alexander & Sadiku",
      ],
      practice: [],
      links: [{ label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }],
    },
    {
      id: "analise_circuitos_linear",
      label: "Análise de Circuitos Lineares",
      group: 2,
      status: "pending",
      description:
        "Técnicas básicas para resolver circuitos de malha única ou dois nós sem recorrer a sistemas matriciais complexos. Utiliza extensivamente as deduções de Divisores de Tensão e Divisores de Corrente.",
      examples: ["Dimensionamento de Redes Pull-Up de Barramentos I2C", "Atenuadores de Sinal Passivos"],
      books: [
        "Análise de Circuitos em Engenharia - Hayt, Kemmerly & Durbin",
        "Fundamentos de Circuitos Elétricos - Alexander & Sadiku",
      ],
      practice: [
        {
          question:
            "Um divisor de tensão possui uma tensão de entrada de 5V, um resistor superior de 2 kΩ e um resistor inferior de 3 kΩ. Qual a tensão coletada sobre o resistor inferior?",
          answer: "Vout = 5 · (3k / (2k + 3k)) = 5 · (3 / 5) = 3 V.",
        },
      ],
      links: [{ label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }],
    },
    {
      id: "leis_de_kirchhoff",
      label: "Leis de Kirchhoff",
      group: 2,
      status: "pending",
      description:
        "Postulados fundamentais e axiomas baseados nas restrições físicas de conservação de carga elétrica e energia em redes elétricas linearizadas.",
      examples: ["Equacionamento Teórico de Malhas Complexas", "Validação Matricial de Conexões Elétricas"],
      books: [
        "Fundamentos de Circuitos Elétricos - Alexander & Sadiku",
        "Análise de Circuitos em Engenharia - Hayt, Kemmerly & Durbin",
        "Física II: Eletricidade e Magnetismo - Jaime E. Villate",
      ],
      practice: [],
      links: [{ label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }],
    },
    {
      id: "lei_dos_nos",
      label: "Lei dos Nós (LCK)",
      group: 2,
      status: "pending",
      description:
        "Aplicação direta da Lei de Kirchhoff das Correntes em nós essenciais de circuitos. Estabelece que a soma algébrica das correntes que convergem em uma junção condutora é nula (∑ i_entra = ∑ i_sai), fundamentada na conservação de cargas.",
      examples: ["Cálculo de Fan-out de Portas Lógicas", "Análise de Fugas de Corrente de Placas"],
      books: [
        "Fundamentos de Circuitos Elétricos - Alexander & Sadiku",
        "Física II: Eletricidade e Magnetismo - Jaime E. Villate",
        "Análise de Circuitos em Engenharia - Hayt, Kemmerly & Durbin",
      ],
      practice: [
        {
          question:
            "Como a LCK justifica a restrição do Fan-out (número máximo de portas lógicas que uma saída pode acionar)?",
          answer:
            "A corrente total fornecida pela porta driver de saída (nó) deve se dividir entre todas as portas receptoras de carga. Pela LCK, se a soma das correntes exigidas pelas entradas receptoras ultrapassar o limite que o nó da porta de saída consegue injetar, a tensão lógica colapsa, corrompendo o bit.",
        },
      ],
      links: [{ label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }],
    },
    {
      id: "lei_das_malhas",
      label: "Lei das Malhas (LVK)",
      group: 2,
      status: "pending",
      description:
        "Aplicação direta da Lei de Kirchhoff das Tensões em malhas fechadas. Determina que a soma algébrica de todas as elevações e quedas de potencial elétrico ao longo de qualquer percurso fechado condutor é identicamente nula (∑ v_i = 0), fundamentada na conservação de energia.",
      examples: ["Validação de Subsistemas de Alimentação", "Cálculo de Loops de Feedback Analógicos"],
      books: [
        "Análise de Circuitos em Engenharia - Hayt, Kemmerly & Durbin",
        "Física II: Eletricidade e Magnetismo - Jaime E. Villate",
        "Circuitos Elétricos - Nilsson & Riedel",
      ],
      practice: [
        {
          question:
            "Em uma malha fechada contendo uma fonte ideal de 12V e três resistores com quedas de tensão de V₁, V₂ e V₃, qual a relação matemática exata dada pela LVK?",
          answer:
            "12 - V₁ - V₂ - V₃ = 0, que implica em V₁ + V₂ + V₃ = 12 V (a soma das quedas é igual à soma das elevações).",
        },
      ],
      links: [{ label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }],
    },
    {
      id: "analise_malhas_maxwell",
      label: "Análise de Malhas (Maxwell)",
      group: 2,
      status: "pending",
      description:
        "Procedimento sistemático matricial que utiliza as 'Correntes de Malha de Maxwell' como variáveis independentes do sistema. Aplica-se a LVK em cada malha fechada do circuito para resolver redes planares.",
      examples: ["Modelagem Numérica em Simuladores Elétricos", "Cálculo de Circuitos de Filtros Passivos Complexos"],
      books: [
        "Circuitos Elétricos - Nilsson & Riedel",
        "Análise de Circuitos em Engenharia - Hayt, Kemmerly & Durbin",
        "Fundamentos de Circuitos Elétricos - Alexander & Sadiku",
      ],
      practice: [
        {
          question:
            "Qual a vantagem operacional de se utilizar as Correntes de Malha de Maxwell em vez de aplicar a LVK puramente nas correntes reais de cada ramo?",
          answer:
            "A abordagem de Maxwell reduz drasticamente o número de equações e variáveis simultâneas necessárias para descrever o circuito, gerando uma matriz organizada que pode ser facilmente computada por algoritmos de álgebra linear.",
        },
      ],
      links: [{ label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }],
    },
    {
      id: "principio_superposicao",
      label: "Princípio da Superposição",
      group: 2,
      status: "pending",
      description:
        "Teorema aplicável a circuitos puramente lineares que dita que a resposta total de tensão ou corrente em qualquer ramo de uma rede com múltiplas fontes independentes é a soma algébrica das respostas causadas por cada fonte atuando de forma isolada.",
      examples: [
        "Análise de Sinais Mistos (Ripple CC + Sinal AC)",
        "Sistemas com Múltiplos Barramentos de Alimentação",
      ],
      books: [
        "Fundamentos de Circuitos Elétricos - Alexander & Sadiku",
        "Análise de Circuitos em Engenharia - Hayt, Kemmerly & Durbin",
      ],
      practice: [
        {
          question:
            "Como devemos tratar as fontes independentes de tensão e de corrente de um circuito ao desativá-las para aplicar o Teorema da Superposição?",
          answer:
            "Fontes independentes de tensão devem ser substituídas por um curto-circuito (tensão zero). Fontes independentes de corrente devem ser substituídas por um circuito aberto (corrente zero).",
        },
      ],
      links: [{ label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }],
    },
    {
      id: "teoremas_thevenin_norton",
      label: "Teoremas de Thévenin e Norton",
      group: 2,
      status: "pending",
      description:
        "Técnicas fundamentais de simplificação terminal de redes lineares de duas pontas. Thévenin reduz o circuito a uma fonte de tensão em série com uma resistência (Vth, Rth). Norton reduz a uma fonte de corrente em paralelo com uma resistência (In, Rn), onde Rth = Rn.",
      examples: [
        "Modelagem de Impedância de Saída de Pinos IC",
        "Cálculo de Casamento de Impedância de Antenas e Linhas",
      ],
      books: [
        "Fundamentos de Circuitos Elétricos - Alexander & Sadiku",
        "Circuitos Elétricos - Nilsson & Riedel",
        "Análise de Circuitos em Engenharia - Hayt, Kemmerly & Durbin",
      ],
      practice: [
        {
          question:
            "Se um circuito linear terminal possui uma tensão de circuito aberto de 5V e uma corrente de curto-circuito de 2A, quais são os valores dos parâmetros equivalentes de Thévenin e Norton?",
          answer:
            "A tensão de Thévenin é a própria tensão de circuito aberto: Vth = 5 V. A corrente de Norton é a própria corrente de curto-circuito: In = 2 A. A resistência equivalente de ambos é dada por Rth = Rn = Vth / In = 5 / 2 = 2,5 Ω.",
        },
      ],
      links: [{ label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }],
    },

    // =====================================
    // 4. ELEMENTOS REATIVOS E DINÂMICOS
    // =====================================
    {
      id: "capacitores_indutores",
      label: "Capacitores e Indutores",
      group: 2,
      status: "pending",
      description:
        "Elementos armazenadores de energia linear-dependentes do tempo. Capacitores armazenam no campo elétrico (i = C · dv / dt) e indutores no campo magnético (v = L · di / dt). Governam filtros e ruídos rápidos em sistemas de computadores.",
      examples: ["Capacitores de Desacoplamento de Silício", "Indutâncias Parasitas de Pinos e Fios de Chips"],
      books: [
        "Fundamentos de Circuitos Elétricos - Alexander & Sadiku",
        "Análise de Circuitos em Engenharia - Hayt, Kemmerly & Durbin",
        "Circuitos Elétricos - Nilsson & Riedel",
      ],
      practice: [],
      links: [{ label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }],
    },
    {
      id: "circuitos_rc_rl_primeira_ordem",
      label: "Circuitos de Primeira Ordem (RC/RL)",
      group: 2,
      status: "pending",
      description:
        "Circuitos contendo apenas um tipo de elemento reativo associado a malhas resistivas, modelados por equações diferenciais ordinárias de primeira ordem. Define as respostas naturais, degrau e constantes de tempo (τ = RC ou τ = L / R).",
      examples: ["Circuitos de Power-On Reset (POR)", "Atrasos em Linhas de Clock de Placas"],
      books: [
        "Análise de Circuitos em Engenharia - Hayt, Kemmerly & Durbin",
        "Fundamentos de Circuitos Elétricos - Alexander & Sadiku",
        "Circuitos Elétricos - Nilsson & Riedel",
      ],
      practice: [
        {
          question:
            "O que é a Constante de Tempo τ = RC e qual seu impacto direto na integridade de sinais digitais de alta frequência?",
          answer:
            "É o tempo necessário para o capacitor carregar até aproximadamente 63,2% do seu valor final. Se a constante de tempo de uma trilha condutora (capacitância e resistência parasitas) for longa em relação ao período do clock, o sinal não atinge o limiar estável de nível alto ou baixo, arredondando as bordas e gerando erros de timing.",
        },
      ],
      links: [{ label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }],
    },

    // ==========================================================
    // 5. FUNDAMENTOS DE SISTEMAS DIGITAIS E ELETRÔNICA DIGITAL
    // ==========================================================
    {
      id: "sistemas_digitais",
      label: "Sistemas Digitais",
      group: 1,
      status: "locked",
      description:
        "Estudo de sistemas e dispositivos que manipulam e processam informações representadas exclusivamente por grandezas digitais (discretas), contrastando com a natureza contínua das grandezas analógicas.",
      examples: [
        "Computadores e Microprocessadores",
        "Sistemas de Áudio Digital (CD/MP3)",
        "Relógios Digitais",
        "Sistemas de Transmissão de Dados",
      ],
      books: ["Sistemas Digitais - Ronald J. Tocci", "Digital Design - M. Morris Mano"],
      practice: [
        {
          question:
            "Explique a principal diferença entre uma grandeza analógica e uma grandeza digital, fornecendo um exemplo de cada.",
          answer:
            "Uma grandeza analógica é aquela que varia de forma contínua dentro de uma faixa contínua de valores (ex: a temperatura de uma sala). Já uma grandeza digital varia em passos discretos e assume apenas valores finitos e bem definidos (ex: o número exibido em um placar eletrônico).",
        },
        {
          question:
            "Qual é a principal vantagem dos sistemas digitais em relação aos analógicos no que diz respeito à imunidade ao ruído?",
          answer:
            "Sistemas digitais possuem maior imunidade ao ruído porque os circuitos eletrônicos precisam apenas distinguir se uma tensão está dentro da faixa aceitável para o nível ALTO ou para o nível BAIXO, ignorando pequenas flutuações e interferências que corromperiam um sinal analógico.",
        },
      ],
      links: [{ label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }],
    },
    {
      id: "sistemas_de_numeracao",
      label: "Sistemas de Numeração",
      group: 1,
      status: "locked",
      description:
        "Estudo das bases numéricas posicionais utilizadas no processamento e armazenamento de dados em sistemas digitais, englobando métodos de representação e conversão entre as bases.",
      examples: ["Binário (Base 2)", "Decimal (Base 10)", "Octal (Base 8)", "Hexadecimal (Base 16)"],
      books: [
        "Computer Systems: A Programmer's Perspective - Bryant & O'Hallaron",
        "Sistemas Digitais - Ronald J. Tocci",
        "Digital Design - M. Morris Mano",
      ],
      practice: [
        {
          question:
            "Converta o número decimal 53 para sua representação binária e, em seguida, converta o resultado obtido para hexadecimal.",
          answer:
            "1) Decimal para Binário (divisões sucessivas por 2): 53/2=26 (resto 1); 26/2=13 (resto 0); 13/2=6 (resto 1); 6/2=3 (resto 0); 3/2=1 (resto 1); 1/2=0 (resto 1). Lendo de baixo para cima: 110101₂. 2) Binário para Hexadecimal (agrupando em blocos de 4 bits da direita para a esquerda): 0011 0101₂. O bloco 0011 vale 3 e 0101 vale 5. Portanto, 53₁₀ = 110101₂ = 35₁₆.",
        },
        {
          question: "Converta o número hexadecimal 2F9_16 diretamente para binário e para a base octal.",
          answer:
            "1) Hex para Binário (ando cada dígito em 4 bits): 2 = 0010, F = 1111, 9 = 1001. Logo, 2F9₁₆ = 001011111001₂. 2) Binário para Octal (reagrupando em blocos de 3 bits da direita para a esquerda): 001 011 111 001₂. Convertendo cada bloco: 001=1, 011=3, 111=7, 001=1. Portanto, 2F9₁₆ = 1371₈.",
        },
        {
          question:
            "Quantos bits são necessários, no mínimo, para representar valores decimais inteiros que vão de 0 até 500?",
          answer:
            "A quantidade de valores únicos representáveis com 'n' bits é 2ⁿ. Precisamos que 2ⁿ >= 501. Como 2⁸ = 256 (insuficiente) e 2⁹ = 512 (suficiente), são necessários no mínimo 9 bits.",
        },
      ],
      links: [{ label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }],
    },
    {
      id: "codigos_digitais",
      label: "Códigos Digitais",
      group: 1,
      status: "locked",
      description:
        "Sistemas estruturados de codificação binária projetados para organizar dados específicos, mapear caracteres alfanuméricos e implementar mecanismos básicos de controle de integridade.",
      examples: ["Código BCD (8421)", "Código Gray", "Código ASCII Alfanumérico", "Método do Bit de Paridade"],
      books: ["Sistemas Digitais - Ronald J. Tocci", "Digital Design - M. Morris Mano"],
      practice: [
        {
          question:
            "Qual é a principal característica operacional do Código Gray que o torna ideal para aplicações em encoders de posição mecânicos ou ópticos?",
          answer:
            "A característica fundamental do Código Gray é que apenas um único bit muda de estado na transição de um número para o próximo consecutivamente. Isso elimina erros transitórios de leitura que acontecem em sensores mecânicos ou ópticos quando múltiplos bits tentam mudar simultaneamente.",
        },
        {
          question: "Represente o número decimal 295 em código BCD (8421).",
          answer:
            "No código BCD, cada dígito decimal é convertido individualmente em seu equivalente binário de 4 bits: 2 = 0010, 9 = 1001, 5 = 0101. Assim, 295 em BCD fica: 0010 1001 0101.",
        },
      ],
      links: [{ label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }],
    },
    {
      id: "algebra_booleana",
      label: "Álgebra Booleana",
      group: 1,
      status: "locked",
      description:
        "Sistema matemático dedutivo estruturado sobre variáveis lógicas de dois estados, regido por teoremas e axiomas que formam a base analítica para expressar e manipular o comportamento de circuitos digitais.",
      examples: ["Tabelas-Verdade", "Teoremas Booleanos", "Leis de DeMorgan", "Soma de Produtos (SOP)"],
      books: ["Digital Design - M. Morris Mano", "Sistemas Digitais - Ronald J. Tocci"],
      practice: [
        {
          question:
            "Utilizando as Leis de DeMorgan, simplifique analiticamente a expressão booleana: Z = NOT(A * NOT(B) * C).",
          answer:
            "Aplicando DeMorgan para o complemento de um produto: Z = NOT(A) + NOT(NOT(B)) + NOT(C). Por dupla inversão, NOT(NOT(B)) = B. A expressão final simplificada é: Z = NOT(A) + B + NOT(C).",
        },
        {
          question:
            "Simplifique a expressão booleana Y = A*B + A*(B + C) + B*(B + C) utilizando os teoremas e postulados booleanos.",
          answer:
            "1) Distribuindo os termos: Y = A*B + A*B + A*C + B*B + B*C. 2) Por idempotência (A*B + A*B = A*B) e (B*B = B): Y = A*B + A*C + B + B*C. 3) Fatorando B: Y = B*(A + 1 + C) + A*C. 4) Como (A + 1 + C) = 1: Y = B*(1) + A*C. Resultado final: Y = B + A*C.",
        },
      ],
      links: [{ label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }],
    },
    {
      id: "familias_logicas",
      label: "Famílias Lógicas e Eletrônica Digital",
      group: 2,
      status: "locked",
      description:
        "Análise dos parâmetros eletrotécnicos, circuitos internos de transistores, margens de ruído e características físicas que governam a fabricação e a interface prática dos circuitos integrados digitais.",
      examples: [
        "Família TTL (Transistor-Transistor Logic - Bipolar)",
        "Família CMOS (Complementary Metal-Oxide Semiconductor - MOSFET)",
        "Atraso de Propagação (tPLH/tPHL) e Dissipação de Potência",
        "Saídas em Coletor Aberto (Open-Collector) e Tristate (Alta Impedância)",
      ],
      books: ["Sistemas Digitais - Ronald J. Tocci", "Digital Design - M. Morris Mano (Cap. 10)"],
      practice: [
        {
          question:
            "No contexto prático de barramentos de dados, o que caracteriza o estado de Alta Impedância (Hi-Z) fornecido por portas do tipo Tristate?",
          answer:
            "O estado Hi-Z faz com que a saída do circuito integrado se comporte eletricamente como um circuito aberto (desconectado). Isso permite que múltiplos dispositivos tenham suas saídas ligadas ao mesmo fio condutor de um barramento. Habilitando o pino 'Enable' de apenas um CI por vez, ele assume o controle das linhas sem gerar conflito elétrico ou curto-circuito com os outros pinos.",
        },
        {
          question: "Compare as famílias lógicas TTL e CMOS em relação ao consumo de potência em repouso (estático).",
          answer:
            "Em regime estático (sem comutar estados), a família CMOS consome uma potência extremamente baixa (quase nula), pois os transistores MOSFET complementares bloqueiam a condução direta da fonte. A família TTL consome uma potência estática consideravelmente maior e constante, independentemente se as saídas estão mudando ou paradas.",
        },
      ],
      links: [{ label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }],
    },
    {
      id: "portas_logicas",
      label: "Portas Lógicas",
      group: 1,
      status: "locked",
      description:
        "Circuitos eletrônicos fundamentais de hardware que operam sobre níveis de tensão digital para executar as operações lógicas elementares e construir expressões booleanas complexas.",
      examples: [
        "Portas Básicas (AND, OR, NOT)",
        "Portas Inversoras Compostas (NAND, NOR)",
        "Portas de Comparação (XOR, XNOR)",
        "Universalidade das Portas NAND e NOR",
      ],
      books: ["Sistemas Digitais - Ronald J. Tocci", "Digital Design - M. Morris Mano"],
      practice: [
        {
          question: "Demonstre teoricamente por que as portas NAND e NOR são classificadas como 'portas universais'.",
          answer:
            "Elas são chamadas de universais porque qualquer uma delas operando de forma isolada e combinada consigo mesma consegue replicar perfeitamente o comportamento de todas as três operações lógicas básicas (AND, OR e NOT), permitindo a construção de qualquer circuito digital existente.",
        },
        {
          question:
            "Qual é a expressão booleana característica e a regra de funcionamento de uma porta XOR (OU Exclusivo) de duas entradas?",
          answer:
            "A expressão é Y = A XOR B = A · NOT(B) + NOT(A) · B. A regra de funcionamento estabelece que a saída Y será nível lógico '1' se e somente se as entradas forem diferentes entre si.",
        },
      ],
      links: [{ label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }],
    },
    {
      id: "simplificacao_logica",
      label: "Simplificação de Circuitos Lógicos",
      group: 1,
      status: "locked",
      description:
        "Técnicas sistemáticas, visuais e tabulares aplicadas para reduzir o número de termos e literais de uma função booleana, resultando em diagramas de circuitos mais eficientes com menor quantidade de portas lógicas.",
      examples: [
        "Mapas de Karnaugh (de 2 a 5 variáveis)",
        "Agrupamento de Termos e Mintermos",
        "Condições Irrelevantes (Don't-Care)",
        "Método de Quine-McCluskey (Tabulação)",
      ],
      books: ["Digital Design - M. Morris Mano", "Sistemas Digitais - Ronald J. Tocci"],
      practice: [
        {
          question:
            "Como as condições irrelevantes (Don't-Care), representadas por um 'X' no Mapa de Karnaugh, podem ser exploradas para obter uma expressão lógica mais simplificada?",
          answer:
            "As condições Don't-Care representam combinações de entrada que nunca ocorrerão ou cujas saídas não importam. No Mapa de Karnaugh, esses 'X' podem ser assumidos livremente como '1' ou '0'. Eles devem ser tratados como '1' sempre que ajudarem a formar agrupamentos maiores de células adjacentes (o que elimina literais), e ignorados (como '0') caso contrário.",
        },
        {
          question:
            "Por que as linhas e colunas de um Mapa de Karnaugh são indexadas seguindo a sequência do Código Gray (00, 01, 11, 10) in vez da ordem binária convencional?",
          answer:
            "O mapa fundamenta-se no princípio da adjacência lógica, que exige que células geometricamente vizinhas difiram no estado de apenas uma única variável. Como o Código Gray garante que apenas um bit mude entre estados adjacentes, o agrupamento visual permite aplicar diretamente o teorema de simplificação [A · B + A · NOT(B) = A].",
        },
        {
          question:
            "Em um Mapa de Karnaugh de 4 variáveis, quantas variáveis restarão em um termo obtido a partir de um agrupamento de 8 células?",
          answer:
            "Cada agrupamento elimina variáveis exponencialmente (2^k). Para um mapa de 4 variáveis, um grupo de 2 células elimina 1 variável; um grupo de 4 elimina 2 variáveis; e um grupo de 8 células (2³) elimina 3 variáveis, restando apenas 1 única variável na expressão final daquele termo.",
        },
      ],
      links: [{ label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }],
    },
    {
      id: "aritmetica_digital",
      label: "Aritmética Digital",
      group: 1,
      status: "locked",
      description:
        "Estudo das estruturas, convenções e algoritmos binários utilizados pelo hardware para executar operações matemáticas internas em sistemas computacionais.",
      examples: [
        "Adição e Subtração Binária",
        "Sistema de Complemento de 2 para Números com Sinal",
        "Detecção de Estouro de Bits (Overflow)",
        "Operações Aritméticas em Hexadecimal",
      ],
      books: [
        "Computer Systems: A Programmer's Perspective - Bryant & O'Hallaron",
        "Sistemas Digitais - Ronald J. Tocci",
        "Digital Design - M. Morris Mano",
      ],
      practice: [
        {
          question:
            "Represente os números decimais +9 e -5 em formato binário de 8 bits usando o sistema de complemento de 2 e efetue a operação (+9) + (-5) para validar o resultado.",
          answer:
            "1) +9₁₀ em 8 bits é 00001001₂. 2) Para -5₁₀: representamos +5 (00000101₂), invertemos os bits (11111010₂) e somamos 1, resultando em 11111011₂. 3) Somando: 00001001 (+9) + 11111011 (-5) = (1)00000100. O carry além do 8º bit é descartado. O resultado é 00000100₂, que equivale exatamente a +4₁₀.",
        },
        {
          question:
            "Explique como o hardware de uma Unidade Lógica e Aritmética (ULA) detecta a ocorrência de um estouro aritmético (overflow) ao somar dois números com sinal.",
          answer:
            "O overflow ocorre quando a soma de dois números com sinais iguais resulta em um número com sinal oposto. No hardware, isso é detectado de forma imediata testando os 'carries': se o carry que entra no bit de sinal (MSB) for diferente do carry que sai do bit de sinal, a flag de overflow (OV) é ativada.",
        },
        {
          question:
            "Qual é a faixa de valores inteiros em decimal que pode ser representada em um sistema que utiliza palavras de 8 bits em complemento de 2?",
          answer:
            "A fórmula para limites com 'n' bits é de -2^(n-1) até +(2^(n-1) - 1). Para n=8 bits, temos -2⁷ até +(2⁷ - 1), o que resulta exatamente na faixa de -128 até +127 em decimal.",
        },
      ],
      links: [{ label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }],
    },

    // ==========================================================
    // 6. CIRCUITOS COMBINACIONAIS, SEQUENCIAIS E MEMÓRIAS
    // ==========================================================
    {
      id: "circuitos_combinacionais_msi",
      label: "Circuitos Combinacionais MSI",
      group: 2,
      status: "locked",
      description:
        "Blocos lógicos funcionais implementados em Circuitos Integrados de Média Escala (MSI) cujos estados das saídas dependem única e exclusivamente da combinação atual de suas entradas, sem armazenamento de histórico.",
      examples: [
        "Somadores Completos (Full-Adders) e Somadores Paralelos",
        "Multiplexadores (Mux) e Demultiplexadores (Demux)",
        "Decodificadores (como BCD para 7 Segmentos) e Codificadores de Prioridade",
        "Comparadores de Magnitude Digital",
      ],
      books: ["Sistemas Digitais - Ronald J. Tocci", "Digital Design - M. Morris Mano"],
      practice: [
        {
          question:
            "Explique o princípio de funcionamento de um Multiplexador (Mux) e descreva o papel desempenhado por suas linhas de seleção.",
          answer:
            "Um Multiplexador atua como uma chave seletora digital. Ele recebe dados vindos de múltiplas linhas de entrada (2ⁿ) e direciona o nível lógico de apenas uma delas para uma única linha de saída. As 'n' linhas de seleção recebem um código binário que define estritamente qual das entradas terá seu sinal roteado para a saída.",
        },
        {
          question:
            "Qual é a diferença funcional básica entre um circuito Meio-Somador (Half-Adder) e um Somador Completo (Full-Adder)?",
          answer:
            "O Meio-Somador aceita apenas duas entradas binárias (os bits A e B) e gera a Soma e o Carry de saída. O Somador Completo possui três entradas: além dos dois bits de dados (A e B), ele aceita uma entrada de Carry de entrada (Cin), permitindo receber o 'vai-um' do estágio anterior, o que o torna ideal para cascateamento paralelo.",
        },
        {
          question:
            "Como um Circuito Integrado Decodificador de BCD para 7 segmentos (como o 74LS47) atua em um circuito de exibição visual?",
          answer:
            "Esse circuito recebe em suas 4 linhas de entrada um número binário codificado em BCD (de 0 a 9) e ativa seletivamente suas 7 linhas de saída (segmentos de 'a' até 'g'). A ativação dessas saídas acende os LEDs correspondentes no display físico para desenhar o caractere decimal equivalente.",
        },
      ],
      links: [{ label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }],
    },
    {
      id: "latches_flipflops",
      label: "Latches e Flip-Flops",
      group: 3,
      status: "locked",
      description:
        "Elementos fundamentais de armazenamento de memória de 1 bit estruturados por meio de realimentação de sinais, diferenciando-se entre dispositivos assíncronos sensíveis a nível e dispositivos síncronos comandados por bordas de clock.",
      examples: [
        "Latch NOR/NAND com entradas S e R",
        "Flip-Flops S-R e D Controlados por Nível",
        "Flip-Flops J-K e D Disparados por Borda (Edge-Triggered)",
        "Parâmetros de Temporização: Tempo de Setup (Ajuste) e Tempo de Hold (Manutenção)",
      ],
      books: ["Sistemas Digitais - Ronald J. Tocci", "Digital Design - M. Morris Mano"],
      practice: [
        {
          question:
            "Diferencie o comportamento de um Latch D controlado por nível de um Flip-Flop D disparado por borda de subida.",
          answer:
            "O Latch D controlado por nível é 'transparente': enquanto o pino Enable estiver alto, qualquer variação na entrada D é refletida na saída Q. O Flip-Flop D disparado por borda ignora as oscilações em D durante os níveis estáveis del clock; ele só amostra e transfere o estado de D para a saída Q no instante exato da transição de subida (borda ativa).",
        },
        {
          question:
            "Descreva o comportamento de um Flip-Flop J-K disparado por borda quando suas entradas são configuradas na condição J = 1 e K = 1.",
          answer:
            "Essa configuração coloca o Flip-Flop J-K no modo de 'comutação' (Toggle). A cada ocorrência da borda ativa do sinal de clock, a saída Q inverterá o seu estado lógico atual de forma sistemática (de '0' para '1' ou de '1' para '0'), funcionando como um divisor de frequência por 2.",
        },
        {
          question: "Defina os conceitos de Tempo de Setup (t_s) e Tempo de Hold (t_h) em Flip-Flops síncronos.",
          answer:
            "O Tempo de Setup é o intervalo mínimo antes da borda ativa del clock durante o qual a entrada de dados deve permanecer estável. O Tempo de Hold é o intervalo mínimo após a borda ativa do clock durante o qual o dado de entrada deve continuar mantido. Violar esses tempos pode levar o circuito ao estado instável da metaestabilidade.",
        },
      ],
      links: [{ label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }],
    },
    {
      id: "registradores_contadores",
      label: "Registradores e Contadores",
      group: 3,
      status: "locked",
      description:
        "Circuitos lógicos sequenciais avançados construídos pela associação de múltiplos flip-flops interconectados para fins de contagem cíclica, divisão de frequência ou transferência de dados binários.",
      examples: [
        "Registradores de Deslocamento (Shift Registers: SISO, SIPO, PISO, PIPO)",
        "Contadores Assíncronos por Divisão de Frequência (Ripple Counters)",
        "Contadores Síncronos com Decodificação Paralela de Clock",
        "Contadores de Módulo Modificado (Mod-N)",
      ],
      books: ["Sistemas Digitais - Ronald J. Tocci", "Digital Design - M. Morris Mano"],
      practice: [
        {
          question:
            "Explique a desvantagem crítica de limitação de velocidade de um contador assíncrono (ripple counter) quando comparado a um síncrono.",
          answer:
            "No contador assíncrono, o clock externo aciona apenas o primeiro estágio. Os estágios seguintes dependem da transição do flip-flop anterior. Isso gera um atraso cumulativo ('efeito cascata') onde os tempos de propagação se somam. Em altas frequências, o atraso impede que as saídas se estabilizem a tempo. No síncrono isso não ocorre, pois todos recebem o clock ao mesmo tempo.",
        },
        {
          question:
            "Um contador assíncrono é construído utilizando 4 Flip-Flops J-K em cascata. Qual é o seu módulo natural e qual a frequência na saída do último estágio se a entrada receber um clock de 16 kHz?",
          answer:
            "O módulo natural é dado por 2ⁿ. Para n=4, o módulo é 2⁴ = 16 (conta de 0 a 15). Como cada estágio divide a frequência por 2, o último dividirá por 16. Logo, f_out = 16 kHz / 16 = 1 kHz.",
        },
        {
          question:
            "Como se projeta um contador assíncrono para operar com um Módulo Modificado igual a 6 (Contador MOD-6)?",
          answer:
            "Utiliza-se 3 flip-flops (módulo natural 8). O número 6 em binário é 110₂ (Q2=1, Q1=1, Q0=0). Conecta-se as saídas Q2 e Q1 nas entradas de uma porta NAND externa, e a saída dessa NAND é ligada diretamente aos pinos assíncronos CLEAR de todos os flip-flops. Assim que o contador atinge o estado 6, a NAND gera um pulso zero, resetando-o imediatamente para 000.",
        },
      ],
      links: [{ label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }],
    },
    {
      id: "maquinas_de_estado",
      label: "Máquinas de Estado Finitas (FSM/ASM)",
      group: 3,
      status: "locked",
      description:
        "Modelagem matemática e estrutural de sistemas sequenciais complexos cujo comportamento é determinado por uma sequência finita de estados sob controle de lógicas combinacionais de transição e saída.",
      examples: [
        "Modelo Arquitetural de Mealy",
        "Modelo Arquitetural de Moore",
        "Gráficos de Máquina de Estado Algorítmica (ASM)",
        "Tabelas de Excitação de Flip-Flops",
      ],
      books: ["Digital Design - M. Morris Mano"],
      practice: [
        {
          question:
            "No projeto de FSMs, qual é a diferença de dependência de saídas entre o modelo de Moore e o modelo de Mealy?",
          answer:
            "No modelo de Moore, as saídas dependem única e exclusivamente do estado atual em que a máquina se encontra. No modelo de Mealy, as saídas são determinadas de forma combinada tanto pelo estado atual quanto pelo nível lógico imediato das variáveis de entrada naquele instante.",
        },
        {
          question:
            "Explique a técnica de codificação de estados conhecida como 'One-Hot Encoding' e seu impacto no circuito.",
          answer:
            "A codificação One-Hot atribui exatamente um flip-flop dedicado para cada estado da máquina, de forma que apenas um deles vale '1' por vez. Isso aumenta o número de flip-flops utilizados, mas simplifica drasticamente a lógica combinacional de próximo estado e de saída, eliminando circuitos decodificadores e permitindo clocks mais rápidos.",
        },
      ],
      links: [{ label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }],
    },
    {
      id: "dispositivos_de_memoria",
      label: "Dispositivos de Memória",
      group: 4,
      status: "locked",
      description:
        "Estruturas organizadas em matrizes semicondutoras de alta densidade projetadas para armazenamento massivo e recuperação rápida de palavras de dados binários de forma permanente ou temporária.",
      examples: [
        "RAM Estática (SRAM)",
        "RAM Dinâmica (DRAM)",
        "Memórias ROM, PROM, EPROM e Flash",
        "Arquiteturas e Expansão de Barramentos",
      ],
      books: ["Sistemas Digitais - Ronald J. Tocci"],
      practice: [
        {
          question:
            "Por que a memória RAM Dinâmica (DRAM) necessita sofrer operações periódicas de 'refresh' e como isso impacta seu design em relação à SRAM?",
          answer:
            "A DRAM armazena os bits como cargas em minúsculos capacitores que sofrem fugas elétricas naturais. Para evitar a perda dos dados, um circuito interno deve ler e reescrever as células ciclicamente (refresh). Apesar dessa complexidade adicional, a DRAM usa apenas 1 transistor e 1 capacitor por bit, tornando-a muito mais barata e densa que a SRAM (que exige de 4 a 6 transistores por célula).",
        },
        {
          question:
            "Um determinado chip de memória possui a specification descrita como 4K x 8. Determine o número de pinos de endereço e de dados necessários.",
          answer:
            "O chip armazena palavras de 8 bits, logo necessita de 8 pinos de dados. A capacidade é de 4K posições (4 * 1024 = 4096). Como 4096 = 2¹², o chip necessita de exatamente 12 pinos de endereço para mapear todas as linhas.",
        },
      ],
      links: [{ label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }],
    },

    // ==========================================================
    // 7. DESCRIÇÃO DE HARDWARE (HDL), FPGAS E CONVERSÃO DE SINAIS
    // ==========================================================
    {
      id: "linguagens_hdl",
      label: "Linguagens de Descrição de Hardware (HDL)",
      group: 4,
      status: "locked",
      description:
        "Linguagens textuais baseadas em lógica de execução simultânea (concorrente) utilizadas para descrever, simular e sintetizar arquiteturas de hardware digital em nível estrutural, de fluxo de dados ou comportamental.",
      examples: [
        "Linguagem VHDL",
        "Linguagem Verilog",
        "Modelagem Comportamental concorrente",
        "Sintaxe de Atribuição de Sinais e Portas Estruturais",
      ],
      books: ["Sistemas Digitais - Ronald J. Tocci", "Digital Design - M. Morris Mano"],
      practice: [
        {
          question:
            "Explique o conceito de 'concorrência' nas linguagens HDL e diferencie-o do modelo das linguagens de programação de software tradicionais.",
          answer:
            "No software tradicional (como C), o código é executado de forma sequencial, linha após linha. Em HDLs (VHDL/Verilog), as linhas descrevem conexões de circuitos físicos reais. Portanto, os blocos operam em modo concorrente: todos os trechos independentes respondem e executam ao mesmo tempo, de maneira paralela, simulando os sinais trafegando pelo hardware.",
        },
        {
          question:
            "Nas linguagens HDL, qual é a diferença entre as etapas de Simulação Funcional e de Síntese de Hardware?",
          answer:
            "A Simulação Funcional é um teste puramente lógico em software para validar se o comportamento e as equações geram os resultados esperados, ignorando tempos de atraso elétricos. A Síntese de Hardware é o processo real onde o código é traduzido em uma netlist de portas lógicas reais e conexões físicas que serão de fato mapeadas e gravadas no chip.",
        },
      ],
      links: [{ label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }],
    },
    {
      id: "dispositivos_programaveis_pld_fpga",
      label: "Dispositivos Lógicos Programáveis (PLDs e FPGAs)",
      group: 4,
      status: "locked",
      description:
        "Circuitos integrados customizáveis constituídos por matrizes internas flexíveis de portas lógicas, blocos macroconfiguráveis e tabelas de busca de memória capazes de reconfigurar seu silício em campo para emular qualquer hardware digital.",
      examples: [
        "Arquiteturas SPLDs (PLA / PAL)",
        "CPLDs (Complex Programmable Logic Devices)",
        "FPGAs (Field-Programmable Gate Arrays)",
        "Tabelas de Busca baseadas em RAM (LUTs - Look-Up Tables)",
      ],
      books: ["Sistemas Digitais - Ronald J. Tocci"],
      practice: [
        {
          question:
            "Como uma FPGA consegue implementar funções booleanas complexas em suas células sem possuir portas AND ou OR físicas estáticas dedicadas?",
          answer:
            "As FPGAs utilizam Tabelas de Busca chamadas LUTs (Look-Up Tables), que funcionam como pequenas memórias RAM rápidas carregadas no boot do chip. As variáveis de entrada da função atuam como linhas de endereço dessa RAM, apontando para a posição que guarda o valor pré-calculado da tabela-verdade. A saída correta é recuperada via leitura direta de memória, sem passar por portas discretas.",
        },
        {
          question:
            "Por que o processo de inicialização de uma FPGA baseada em SRAM é classificado como volátil e como isso é resolvido comercialmente?",
          answer:
            "Como as LUTs e as chaves de roteamento interno baseiam-se em SRAM volátil, o chip perde toda a sua configuração sempre que a energia é cortada. Para resolver isso, coloca-se uma memória ROM/Flash não-volátil externa na placa. Toda vez que o sistema liga, um circuito controlador interno lê a Flash e reprograma a FPGA automaticamente em milissegundos.",
        },
      ],
      links: [{ label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }],
    },
    {
      id: "interface_mundo_analogico",
      label: "Interface com o Mundo Analógico",
      group: 5,
      status: "locked",
      description:
        "Circuitos de conversão de dados encarregados de estabelecer a comunicação e transição bidirecional precisa de sinais entre processadores no domínio digital discreto e o meio físico analógico contínuo.",
      examples: [
        "Conversores Digital-Analógicos (DAC por Rede R-2R e Escada de Resistores)",
        "Conversores Analógico-Digitais (ADC por Aproximações Sucessivas e Flash)",
        "Circuitos de Amostragem e Retenção (Sample & Hold)",
        "Erros de Quantização, Resolução de Bits e Teorema de Amostragem Nyquist",
      ],
      books: ["Sistemas Digitais - Ronald J. Tocci"],
      practice: [
        {
          question:
            "Um Conversor Analógico-Digital (ADC) de 8 bits opera em uma faixa de fundo de escala de 0 a 5V. Determine o valor da sua resolução de tensão e explique o seu significado.",
          answer:
            "A resolução é dada por V_escala / (2ⁿ - 1). Para n=8: Resolução = 5V / (256 - 1) = 5V / 255 = 0,0196V (ou aproximadamente 19,6 mV). Significa que 19,6 milivolts é a menor variação de tensão na entrada analógica necessária para alterar o bit menos significativo (LSB) do código binário de saída.",
        },
        {
          question:
            "Explique brevemente o princípio de operação de um Conversor Analógico-Digital por Aproximações Sucessivas (SAR ADC).",
          answer:
            "O SAR ADC realiza uma busca binária sistemática bit a bit, do MSB ao LSB. A cada ciclo de clock, o registrador interno chuta o valor do bit atual em '1' e envia a um DAC interno. Um comparador avalia se a tensão gerada pelo DAC é maior ou menor que a tensão analógica de entrada. Se for maior, o bit é resetado para '0'; se for menor, é mantido em '1', repetindo o processo até fechar a palavra final.",
        },
        {
          question:
            "O que estabelece o Teorema de Amostragem de Nyquist e qual a consequência se ele for violado (fenômeno de Aliasing)?",
          answer:
            "O teorema estabelece que a frequência de amostragem (fs) de um sistema deve ser estritamente maior que o dobro da maior componente de frequência (f_max) contida no sinal original (fs > 2 · f_max). Se violado, ocorre o Aliasing, fazendo com que frequências altas indesejadas apareçam disfarçadas como baixas frequências fantasmas, corrompendo o sinal reconstruído.",
        },
      ],
      links: [{ label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }],
    },

    // ==========================================================
    // 8. ARQUITETURA DE COMPUTADORES E ESTRUTURA DA CPU
    // ==========================================================
    {
      id: "arquitetura_de_computadores",
      label: "Arquitetura de Computadores",
      group: 2,
      status: "locked",
      description:
        "O estudo da estrutura, organização e implementação de sistemas computacionais. Funciona como a grande ponte entre a física dos sistemas digitais e a lógica dos sistemas operacionais e softwares de alto nível.",
      examples: ["Níveis de Abstração", "Equação de Desempenho (Tempo de CPU, CPI)", "Lei de Moore"],
      books: [
        "Computer Organization and Architecture - William Stallings",
        "Organização e Projeto de Computadores - Patterson & Hennessy",
        "Structured Computer Organization - Andrew S. Tanenbaum",
      ],
      practice: [
        {
          question:
            "Como o desempenho de uma CPU é calculado e quais fatores os arquitetos de hardware tentam equilibrar?",
          answer:
            "O tempo de CPU é determinado pelo produto da Contagem de Instruções, o Número Médio de Ciclos por Instrução (CPI) e o Tempo de Ciclo de Clock. Melhorar a microarquitetura significa reduzir o CPI ou aumentar a frequência do clock sem quebrar o limite térmico.",
        },
      ],
      links: [{ label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }],
    },
    {
      id: "tipos_computadores",
      label: "Classes e Tipos de Computadores",
      group: 2,
      status: "locked",
      description:
        "A classificação dos sistemas computacionais com base em seu propósito, custo, consumo de energia e escala de desempenho, variando de microcontroladores invisíveis a clusters em escala de armazém.",
      examples: [
        "Sistemas Embarcados (IoT)",
        "Computadores Pessoais (Desktops/Smartphones)",
        "Servidores e Nuvem (Warehouse-Scale)",
      ],
      books: [
        "Computer Architecture: A Quantitative Approach - Hennessy & Patterson",
        "Computer Organization and Architecture - William Stallings",
      ],
      practice: [
        {
          question: "Qual a diferença de foco no design entre um Processador de Servidor e um para Embarcados?",
          answer:
            "Servidores maximizam o Throughput para lidar com múltiplas requisições simultâneas, aceitando alto consumo e custo. Embarcados focam primariamente em minimizar custo e consumo (bateria), sacrificando o desempenho bruto.",
        },
      ],
      links: [{ label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }],
    },
    {
      id: "arquitetura_von_neumann",
      label: "Arquitetura Von Neumann",
      group: 2,
      status: "locked",
      description:
        "O modelo teórico clássico de computadores que utiliza uma memória unificada para armazenar simultaneamente os dados e as instruções do programa.",
      examples: ["Conceito de Programa Armazenado", "Gargalo de Von Neumann", "Ciclo de Busca-Decodificação-Execução"],
      books: [
        "Structured Computer Organization - Andrew S. Tanenbaum",
        "Organização e Projeto de Computadores - Patterson & Hennessy",
      ],
      practice: [
        {
          question: "O que é o 'Gargalo de Von Neumann' e por que ele afeta o desempenho?",
          answer:
            "Ocorre porque instruções e dados compartilham o mesmo barramento de comunicação com a memória. A CPU não consegue buscar uma instrução e gravar um dado ao mesmo tempo, criando uma fila de espera que limita a velocidade.",
        },
      ],
      links: [{ label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }],
    },
    {
      id: "isa",
      label: "ISA (Instruction Set Architecture)",
      group: 2,
      status: "locked",
      description:
        "A interface de contrato entre hardware e software. Define formatos de instrução, tipos de dados, registradores e modos de endereçamento.",
      examples: ["Modos de Endereçamento", "Tamanho da Palavra (32-bit vs 64-bit)", "Formato do Opcode"],
      books: [
        "Computer Organization and Architecture - William Stallings",
        "Digital Design and Computer Architecture - Harris & Harris",
      ],
      practice: [
        {
          question: "Por que a ISA é considerada uma camada de abstração crucial na computação?",
          answer:
            "Permite que diferentes fabricantes construam hardwares físicos totalmente diferentes, mas que conseguem rodar os mesmos programas, desde que respeitem o mesmo conjunto de regras da ISA.",
        },
      ],
      links: [{ label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }],
    },
    {
      id: "assembly",
      label: "Assembly",
      group: 2,
      status: "locked",
      description:
        "A representação textual e legível das instruções de máquina binárias definidas pela ISA. Utiliza mnemônicos (ADD, MOV) para programação em baixo nível.",
      examples: ["Mnemônicos de Operação", "Diretivas do Montador", "Tradução de C para Assembly"],
      books: ["Digital Design and Computer Architecture - Harris & Harris"],
      practice: [
        {
          question: "Qual a relação entre o código Assembly e o Código Binário?",
          answer:
            "A relação é 1-para-1. Cada linha de instrução escrita em Assembly corresponde a exatamente uma instrução binária de máquina que a CPU executa.",
        },
      ],
      links: [{ label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }],
    },
    {
      id: "isa_cisc_x86",
      label: "ISA CISC (Família x86)",
      group: 2,
      status: "locked",
      description:
        "Conjunto Complexo de Instruções. Foca em reduzir o tamanho do código, permitindo que uma única instrução realize múltiplas operações (acesso a RAM e matemática juntas).",
      examples: ["Arquitetura Intel x86 e AMD64", "Instruções de Tamanho Variável", "Alta densidade de código"],
      books: ["Structured Computer Organization - Andrew S. Tanenbaum"],
      practice: [
        {
          question: "Qual foi a motivação histórica para as arquiteturas CISC?",
          answer:
            "A memória RAM era extremamente cara. CISC foi projetada para fazer muito trabalho em poucas linhas de código, economizando RAM, mesmo que isso tornasse os circuitos da CPU muito complexos.",
        },
      ],
      links: [{ label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }],
    },
    {
      id: "isa_risc_arm",
      label: "ISA RISC (ARM, RISC-V)",
      group: 2,
      status: "locked",
      description:
        "Conjunto Reduzido de Instruções. Foca em instruções simples de tamanho fixo otimizadas para pipelines super rápidos.",
      examples: ["Arquitetura ARM (Smartphones)", "RISC-V", "Modelo Load-Store (Isolamento de memória)"],
      books: ["Organização e Projeto de Computadores - Patterson & Hennessy"],
      practice: [
        {
          question: "Explique o modelo 'Load-Store' obrigatório no RISC.",
          answer:
            "A CPU não pode fazer contas diretamente na memória. É preciso primeiro carregar (Load) o dado da RAM para um registrador interno, fazer a conta, e depois salvar (Store) de volta na RAM.",
        },
      ],
      links: [{ label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }],
    },
    {
      id: "cpu",
      label: "CPU",
      group: 2,
      status: "locked",
      description:
        "A Unidade Central de Processamento. Busca instruções na memória, decodifica e executa o processamento matemático do sistema.",
      examples: ["Ciclo Fetch-Decode-Execute", "Datapath (Caminho de Dados)", "Registrador PC"],
      books: ["Organização e Projeto de Computadores - Patterson & Hennessy"],
      practice: [
        {
          question: "Qual o papel do Registrador Program Counter (PC)?",
          answer:
            "O PC atua como um ponteiro que armazena o endereço de memória da próxima instrução que a CPU precisa buscar e executar. Ele é incrementado automaticamente.",
        },
      ],
      links: [{ label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }],
    },
    {
      id: "cpu_ula",
      label: "Unidade Lógica e Aritmética (ULA)",
      group: 2,
      status: "locked",
      description:
        "O núcleo matemático da CPU. Um mega-circuito combinacional que executa operações de soma, AND, OR e shifts.",
      examples: ["Somadores", "Deslocadores de Bits", "Flags de Status (Zero, Carry)"],
      books: ["Digital Design and Computer Architecture - Harris & Harris"],
      practice: [
        {
          question: "Como a ULA informa à Unidade de Controle o resultado de um IF lógico?",
          answer:
            "Através do registrador de Flags. Se uma subtração resultar em zero (A == B), a ULA ativa a flag 'Zero'. A UC lê isso para tomar decisões de desvio.",
        },
      ],
      links: [{ label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }],
    },
    {
      id: "cpu_uc",
      label: "Unidade de Controle (UC)",
      group: 2,
      status: "locked",
      description:
        "O cérebro do processador. Lê o código da instrução e emite sinais elétricos que ativam partes do datapath e comandam a ULA.",
      examples: [
        "Controle Hardwired (Máquina de Estados Finitos)",
        "Controle Microprogramado",
        "Sinais Seletores de Mux",
      ],
      books: ["Structured Computer Organization - Andrew S. Tanenbaum"],
      practice: [
        {
          question: "Diferença entre Controle Hardwired e Microprogramado?",
          answer:
            "Hardwired é fixo em portas lógicas físicas de silício (muito rápido, difícil de alterar). Microprogramado usa uma pequena ROM interna com 'microinstruções', agindo como um processador dentro do processador (mais flexível).",
        },
      ],
      links: [{ label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }],
    },
    {
      id: "cpu_clock",
      label: "Clock e Sincronização",
      group: 2,
      status: "locked",
      description:
        "O oscilador eletrônico que dita o ritmo da CPU. Os pulsos coordenam o fluxo de dados pelos estágios.",
      examples: ["Frequência (GHz)", "Clock Gating", "Problemas Térmicos"],
      books: ["Computer Organization and Architecture - William Stallings"],
      practice: [
        {
          question: "Por que não podemos aumentar a frequência do clock (GHz) ao infinito para ganhar velocidade?",
          answer:
            "Devido à Parede de Energia (Power Wall). Aumentar a frequência exige mais voltagem e gera um calor exponencial que derreteria o chip sem soluções exóticas de refrigeração.",
        },
      ],
      links: [{ label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }],
    },
    {
      id: "cpu_arquiteturas",
      label: "Microarquiteturas e Pipelining",
      group: 2,
      status: "locked",
      description:
        "Técnicas de design interno do núcleo para executar múltiplas instruções simultaneamente (Paralelismo de Instrução).",
      examples: ["Pipeline (Linha de Montagem)", "Processadores Superescalares", "Out-of-Order Execution"],
      books: ["Modern Processor Design - Shen & Lipasti", "Computer Architecture: A Quantitative Approach"],
      practice: [
        {
          question: "O que torna um processador Superescalar?",
          answer:
            "Possuir múltiplas vias e várias ULAs independentes, permitindo buscar, decodificar e executar 2, 3 ou mais instruções ao mesmo tempo no mesmo ciclo de clock.",
        },
      ],
      links: [{ label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }],
    },
    {
      id: "cpu_tipos",
      label: "Tipos de Processadores",
      group: 2,
      status: "locked",
      description:
        "Especializações físicas e configurações das unidades de processamento (GPUs, CPUs multi-core, MCUs).",
      examples: ["Processadores Multinúcleo (Multicore)", "Microcontroladores", "GPUs Vetoriais"],
      books: ["Multicore Application Programming - Darryl Gove"],
      practice: [
        {
          question: "Qual o impacto dos processadores Multicore na programação?",
          answer:
            "Forçou a indústria a adotar programação paralela e multithreading, dividindo o trabalho do software para ocupar múltiplos núcleos simultaneamente.",
        },
      ],
      links: [{ label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }],
    },

    // ===============================================================
    // 9. SUBSISTEMA DE MEMÓRIA, ENTRADA/SAÍDA (I/O) E PERIFÉRICOS
    // ===============================================================
    {
      id: "memoria",
      label: "Memória",
      group: 2,
      status: "locked",
      description:
        "O amplo conjunto de tecnologias responsáveis por reter os dados do computador, sejam instruções ativas para a CPU ou arquivos parados a longo prazo.",
      examples: ["Pirâmide de Memória", "Endereçamento", "Big-Endian / Little-Endian"],
      books: ["Organização e Projeto de Computadores - Patterson & Hennessy"],
      practice: [
        {
          question: "O que é endereçamento a byte?",
          answer:
            "Significa que cada endereço apontado pelo processador corresponde a exatamente 1 Byte (8 bits), sendo a menor unidade rastreável no hardware.",
        },
      ],
      links: [{ label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }],
    },
    {
      id: "hierarquia_memoria",
      label: "Hierarquia de Memória",
      group: 2,
      status: "locked",
      description:
        "O princípio arquitetural em formato de pirâmide: memórias velozes e caras no topo (perto da CPU), e memórias lentas, baratas e massivas na base.",
      examples: ["Localidade Espacial", "Localidade Temporal", "Memória Virtual"],
      books: ["Memory Systems: Cache, DRAM, Disk - Bruce Jacob et al."],
      practice: [
        {
          question: "Como o princípio da Localidade viabiliza a pirâmide de memória?",
          answer:
            "A localidade afirma que dados recentes (Temporal) ou vizinhos a eles (Espacial) serão usados em breve. O hardware promove esses dados prediletos para os níveis mais rápidos da pirâmide (caches), ocultando a lentidão das camadas baixas.",
        },
      ],
      links: [{ label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }],
    },
    {
      id: "memoria_principal",
      label: "Memória Principal (RAM)",
      group: 2,
      status: "locked",
      description:
        "O espaço de trabalho ativo volátil do processador, onde ficam os dados dos programas em execução real no momento.",
      examples: ["DRAM (Dynamic RAM - Capacitores)", "Taxas de Refresh", "Módulos DIMM/DDR"],
      books: ["Memory Systems: Cache, DRAM, Disk - Bruce Jacob et al."],
      practice: [
        {
          question: "Por que usamos DRAM na memória principal e não SRAM?",
          answer:
            "A SRAM é rápida mas o circuito é muito grande (flip-flops). A DRAM usa só um capacitor minúsculo por bit, o que permite espremer Gigabytes num chip minúsculo e barato, compensando a lentidão.",
        },
      ],
      links: [{ label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }],
    },
    {
      id: "caches_niveis",
      label: "Memórias Cache (L1, L2, L3)",
      group: 2,
      status: "locked",
      description:
        "Pequenas memórias puramente feitas de SRAM ultra-rápida. Elas agem como mediadoras exclusivas para esconder a latência lenta da RAM principal.",
      examples: ["Cache L1 Integrada no Núcleo", "Cache L3 Compartilhada", "Mapeamento Direto"],
      books: ["Computer Architecture: A Quantitative Approach - Hennessy & Patterson"],
      practice: [
        {
          question: "Por que usar 3 níveis (L1/L2/L3) em vez de uma única cache gigante?",
          answer:
            "Física elétrica. Caches grandes têm fios mais longos e rotas complexas, ficando lentas. A L1 é minúscula para bater na mesma velocidade da CPU; se ela errar o dado, consulta a L2 média, e depois a L3 massiva.",
        },
      ],
      links: [{ label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }],
    },
    {
      id: "armazenamento_secundario",
      label: "Armazenamento Secundário (HDs/SSDs)",
      group: 2,
      status: "locked",
      description:
        "Dispositivos de retenção não-volátil em massa que formam a base pesada da pirâmide de memória. Retêm o sistema operacional, fotos e jogos mesmo sem energia.",
      examples: [
        "Hard Disks Magnéticos (HDDs)",
        "Discos Sólidos NAND (SSDs)",
        "Atraso Rotacional",
        "Tempo de Busca (Seek)",
      ],
      books: ["Memory Systems: Cache, DRAM, Disk - Bruce Jacob et al.", "Structured Computer Organization - Tanenbaum"],
      practice: [
        {
          question: "Qual é a principal penalidade de velocidade física de um Disco Rígido HDD clássico?",
          answer:
            "Ele sofre de latência mecânica. O braço de leitura precisa fisicamente se mover até a trilha (Tempo de Busca) e o disco precisa girar até o setor certo bater no laser (Atraso Rotacional). Os SSDs removem a mecânica.",
        },
      ],
      links: [{ label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }],
    },
    {
      id: "entrada_saida",
      label: "Entrada e Saída (I/O)",
      group: 2,
      status: "locked",
      description:
        "Os canais que interligam a CPU ao mundo externo analógico, lidando com a enorme discrepância de velocidades entre os chips elétricos e equipamentos lentos/mecânicos.",
      examples: ["Memory-Mapped I/O", "Drivers e Controladores", "Gargalos de I/O"],
      books: ["Structured Computer Organization - Andrew S. Tanenbaum"],
      practice: [
        {
          question: "Como o Memory-Mapped I/O engana a CPU para falar com periféricos?",
          answer:
            "As portas do hardware externo ganham endereços falsos na mesma tabela da RAM. Quando a CPU tenta salvar dados naquele endereço específico da RAM, o controlador de I/O sequestra a mensagem e manda para a placa de vídeo ou rede.",
        },
      ],
      links: [{ label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }],
    },
    {
      id: "barramentos_interrupcoes",
      label: "Barramentos, Interrupções e DMA",
      group: 2,
      status: "locked",
      description:
        "A logística de tráfego de hardware. Controla como as placas de expansão transportam dados e ganham a atenção da CPU de forma eficiente.",
      examples: ["Interrupções de Hardware", "Controlador DMA (Direct Memory Access)", "Polling"],
      books: ["Computer Organization and Architecture - William Stallings"],
      practice: [
        {
          question: "Qual o benefício supremo do DMA no trânsito de arquivos pesados?",
          answer:
            "Se o disco precisa mandar um arquivo gigante pra RAM, sem DMA a CPU perderia tempo copiando byte por byte. O DMA é um chip autônomo que pega a cópia para si, libertando a CPU pra rodar jogos enquanto o disco e a RAM conversam.",
        },
      ],
      links: [{ label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }],
    },
    {
      id: "dispositivos_io",
      label: "Dispositivos Periféricos",
      group: 2,
      status: "locked",
      description:
        "Os aparelhos nas pontas do sistema que interagem fisicamente com o usuário ou outras máquinas. São vistos pela CPU como fluxo de caracteres ou blocos endereçáveis.",
      examples: [
        "Dispositivos de Bloco: Discos Rígidos",
        "Dispositivos de Caractere: Teclados, Mouses",
        "Rede: Placas Wi-Fi",
      ],
      books: ["Structured Computer Organization - Andrew S. Tanenbaum"],
      practice: [
        {
          question: "Diferença entre dispositivos orientados a Bloco e orientados a Caractere?",
          answer:
            "Dispositivos de bloco (HDs) salvam em pedaços de tamanho fixo com endereços, você pode ler qualquer pedaço livremente. Dispositivos de caractere (Teclados) só geram um fluxo sequencial contínuo, não tem como você 'pedir' a letra 'A' que você digitou ontem.",
        },
      ],
      links: [{ label: "Rafael Levi - Assista no YouTube", url: "https://www.youtube.com/rafaellevissa" }],
    },
    // ========================
    // 10. ELETRÔNICA GERAL
    // ========================
    {
      id: "eletronica_geral",
      label: "Eletrônica Geral",
      group: 2,
      status: "pending",
      description:
        "O estudo fundamental dos dispositivos eletrônicos analógicos não-lineares. Este nó atua como o alicerce para a compreensão de como materiais semicondutores são utilizados para controlar o fluxo de corrente, retificar, comutar e amplificar sinais elétricos complexos.",
      examples: [
        "Projeto de Fontes de Alimentação Lineares",
        "Amplificação de Sinais de Áudio e RF",
        "Condicionamento de Sensores Analógicos",
      ],
      books: [
        "Eletrônica (Vol 1 e 2) - Albert Malvino",
        "Dispositivos Eletrônicos e Teoria de Circuitos - Robert Boylestad",
        "Microelectronic Circuits - Adel S. Sedra & Kenneth C. Smith",
      ],
      practice: [
        {
          question:
            "Qual a diferença fundamental de comportamento entre componentes passivos lineares (como resistores) e os componentes de estado sólido estudados na Eletrônica Geral?",
          answer:
            "Componentes lineares obedecem estritamente à Lei de Ohm, apresentando uma relação proporcional e direta entre tensão e corrente. Já os dispositivos de estado sólido (diodos, transistores) são não-lineares; suas resistências internas variam dinamicamente dependendo da tensão aplicada, permitindo que funcionem como chaves controladas ou amplificadores.",
        },
      ],
      links: [],
    },
    {
      id: "semicondutores_diodos",
      label: "Semicondutores e Diodos de Junção",
      group: 2,
      status: "pending",
      description:
        "Estudo da física dos semicondutores, dopagem (Tipo P e Tipo N) e a formação da junção PN. Aborda o princípio de funcionamento do Diodo ideal e prático, explorando a região de depleção e as curvas características de polarização direta e reversa.",
      examples: [
        "Barreira de potencial do Silício (0,7V)",
        "Diodos Emissores de Luz (LED)",
        "Corrente de fuga reversa",
      ],
      books: [
        "Eletrônica (Vol 1) - Albert Malvino",
        "Dispositivos Eletrônicos e Teoria de Circuitos - Robert Boylestad",
      ],
      practice: [
        {
          question:
            "O que ocorre com a região de depleção de um diodo de junção PN quando ele é polarizado reversamente?",
          answer:
            "Na polarização reversa, o terminal positivo da fonte atrai os elétrons do material N, e o terminal negativo atrai as lacunas do material P. Isso alarga a região de depleção (zona desprovida de portadores livres), impedindo a condução de corrente majoritária e fazendo o diodo atuar como uma chave aberta.",
        },
        {
          question:
            "De acordo com o modelo prático do diodo, por que ocorre uma queda de tensão de aproximadamente 0,7V em um diodo de silício polarizado diretamente?",
          answer:
            "Essa tensão representa a barreira de potencial inerente à junção PN. A fonte de alimentação externa precisa fornecer energia suficiente (mínimo de 0,7V) para que os portadores de carga consigam atravessar a região de depleção e sustentar o fluxo de corrente contínuo.",
        },
      ],
      links: [],
    },
    {
      id: "aplicacoes_diodos",
      label: "Aplicações de Diodos e Retificação",
      group: 2,
      status: "pending",
      description:
        "Análise de circuitos práticos utilizando diodos para conversão e manipulação de sinais. Envolve retificadores (meia-onda e onda completa), filtros capacitivos para redução de ripple, grampeadores, ceifadores e regulação de tensão com Diodo Zener.",
      examples: ["Fontes de Alimentação Lineares", "Proteção de polaridade reversa", "Referência de tensão Zener"],
      books: [
        "Eletrônica (Vol 1) - Albert Malvino",
        "Dispositivos Eletrônicos e Teoria de Circuitos - Robert Boylestad",
      ],
      practice: [
        {
          question:
            "Qual a vantagem de um Retificador de Onda Completa em Ponte sobre um Retificador de Meia-Onda na construção de uma fonte de alimentação DC?",
          answer:
            "O retificador de onda completa aproveita ambos os semiciclos do sinal de entrada AC (positivo e negativo), dobrando a frequência da tensão pulsante de saída e tornando-a muito mais fácil de ser filtrada pelo capacitor, o que gera uma tensão DC mais contínua (menor tensão de ripple) e mais eficiente.",
        },
        {
          question:
            "Como um Diodo Zener deve ser posicionado no circuito para operar como um regulador de tensão estável?",
          answer:
            "O diodo Zener deve ser ligado em paralelo com a carga e obrigatoriamente polarizado de forma reversa. Deve haver um resistor em série no circuito para limitar a corrente máxima, garantindo que o Zener opere dentro da sua região de ruptura (avalanche), onde ele crava a tensão (Vz) de forma estável.",
        },
      ],
      links: [],
    },
    {
      id: "transistores_bjt",
      label: "Transistores Bipolares de Junção (BJT)",
      group: 2,
      status: "pending",
      description:
        "Fundamentos físicos e operacionais dos transistores NPN e PNP. Estudo das correntes de emissor, base e coletor, o ganho de corrente (Beta/hFE) e as três regiões de operação fundamentais: corte, saturação e região ativa linear.",
      examples: ["Transistor como chave digital (Corte/Saturação)", "Amplificação de sinais (Região Ativa)"],
      books: ["Dispositivos Eletrônicos e Teoria de Circuitos - Robert Boylestad"],
      practice: [
        {
          question:
            "Qual a condição elétrica necessária nas junções do BJT para que ele opere na Região Ativa (modo amplificador)?",
          answer:
            "Para operar na região ativa, a junção Base-Emissor deve estar polarizada diretamente (normalmente ~0,7V), enquanto a junção Base-Coletor deve estar polarizada reversamente. Isso permite que a pequena corrente da base controle uma corrente proporcionalmente maior no coletor (Ic = Beta * Ib).",
        },
        {
          question: "Na comutação digital, por que um transistor entra no estado de 'Saturação'?",
          answer:
            "A saturação ocorre quando a corrente de base (Ib) aumenta a um ponto onde o transistor tenta conduzir uma corrente de coletor maior do que o circuito externo (fonte e resistores) consegue fornecer. Ambas as junções ficam polarizadas diretamente e a tensão Coletor-Emissor (Vce) cai para um mínimo (Vce_sat, quase 0V), comportando-se como uma chave fechada.",
        },
      ],
      links: [],
    },
    {
      id: "amplificadores_bjt_mosfet",
      label: "Polarização e Amplificadores a Transistor",
      group: 2,
      status: "pending",
      description:
        "Técnicas de polarização DC (Divisor de Tensão) para estabelecer o Ponto Quiescente (Ponto Q) imunizando contra variações térmicas. Introdução à análise de pequenos sinais AC usando modelos equivalentes (modelo re ou híbrido-pi) para calcular ganhos de tensão, corrente e impedâncias.",
      examples: [
        "Amplificador Emissor Comum",
        "Buffer Seguidor de Emissor (Coletor Comum)",
        "Casamento de Impedâncias",
      ],
      books: [
        "Dispositivos Eletrônicos e Teoria de Circuitos - Robert Boylestad",
        "Microelectronic Circuits - Adel S. Sedra & Kenneth C. Smith",
      ],
      practice: [
        {
          question:
            "Por que a topologia de polarização por 'Divisor de Tensão' com resistor no emissor é amplamente considerada a mais robusta para estabilidade do Ponto Q em BJTs?",
          answer:
            "Essa topologia torna a corrente de polarização do coletor praticamente independente do valor do ganho Beta (que varia com a temperatura e entre lotes de fabricação). O divisor fixa a tensão na base, e o resistor de emissor provê um feedback negativo DC, mantendo o circuito altamente estável.",
        },
        {
          question:
            "No modelo de pequenos sinais AC, o que os capacitores de acoplamento e bypass se tornam durante a análise matemática?",
          answer:
            "Na análise de pequenos sinais AC (médias frequências), as reatâncias capacitivas tornam-se tão pequenas que os capacitores de acoplamento e bypass são modelados matematicamente como curtos-circuitos perfeitos (fios ideais), isolando a análise AC da malha DC.",
        },
      ],
      links: [],
    },
    {
      id: "transistores_mosfet",
      label: "Transistores MOSFET e Tecnologia CMOS",
      group: 2,
      status: "pending",
      description:
        "Estudo profundo dos Transistores de Efeito de Campo Metal-Óxido-Semicondutor (MOSFET). Operação por campo elétrico, canal N e canal P (Enhancement e Depletion). Aborda o conceito central do MOSFET como a espinha dorsal de toda a eletrônica digital (CMOS) e microprocessadores modernos.",
      examples: ["Comutação em portas lógicas CMOS", "Alta impedância de porta (Gate)"],
      books: ["Microelectronic Circuits - Adel S. Sedra & Kenneth C. Smith"],
      practice: [
        {
          question: "Qual a vantagem suprema do terminal de Porta (Gate) de um MOSFET em relação à Base de um BJT?",
          answer:
            "O Gate de um MOSFET é isolado do canal de condução por uma finíssima camada de dióxido de silício (um isolante). Isso resulta em uma impedância de entrada infinita em DC (IG = 0A). O MOSFET é controlado por tensão (Vgs), não drenando corrente contínua da fonte de controle, diferentemente do BJT que consome corrente na base.",
        },
        {
          question: "Como se forma o canal de condução em um MOSFET de Intensificação (Enhancement) Canal-N?",
          answer:
            "No estado de repouso, não há canal físico. Ao aplicar uma tensão positiva no Gate (Vgs > Voltagem de Limiar Vt), o campo elétrico atrai elétrons livres do substrato Tipo-P para a superfície logo abaixo do óxido, invertendo localmente a dopagem e criando um 'canal N' que liga o Dreno à Fonte.",
        },
      ],
      links: [],
    },
    {
      id: "amp_ops",
      label: "Amplificadores Operacionais (Amp-Ops)",
      group: 2,
      status: "pending",
      description:
        "O componente analógico mais versátil. Estudo do modelo ideal do Amp-Op, o conceito de Curto-Circuito Virtual e realimentação negativa. Engloba as topologias essenciais: Inversor, Não-Inversor, Somador, Diferencial, Integrador e Diferenciador.",
      examples: ["Condicionamento de Sinal de Sensores", "Filtros Ativos", "Conversores I/V"],
      books: ["Microelectronic Circuits - Adel S. Sedra & Kenneth C. Smith", "Eletrônica (Vol 2) - Albert Malvino"],
      practice: [
        {
          question:
            "Explique o conceito de 'Curto-Circuito Virtual' em um Amplificador Operacional ideal operando com realimentação negativa.",
          answer:
            "Devido ao ganho de malha aberta do Amp-Op ideal ser infinito, qualquer diferença de tensão entre as entradas geraria uma saída infinita. Como a saída é finita (limitada pela alimentação), a diferença de potencial entre os terminais inversor (-) e não-inversor (+) deve ser zero (V+ = V-). Eles não estão conectados fisicamente, mas a realimentação força que ambos tenham a mesma tensão.",
        },
        {
          question:
            "Em um amplificador inversor, o resistor de entrada (R1) é de 10kΩ e o de realimentação (Rf) é de 50kΩ. Qual o ganho de tensão de malha fechada (Av)?",
          answer:
            "A fórmula para o ganho da configuração inversora é Av = -(Rf / R1). Portanto, Av = -(50k / 10k) = -5. O sinal de saída será amplificado 5 vezes e estará defasado em 180 graus (sinal invertido).",
        },
        {
          question: "Por que a impedância de entrada infinita do Amp-Op ideal facilita tanto o projeto de circuitos?",
          answer:
            "Isso significa que as portas de entrada (V+ e V-) não drenam nenhuma corrente elétrica (Iin = 0). Dessa forma, conectar o Amp-Op em paralelo a qualquer sensor ou circuito anterior não altera o comportamento nem gera quedas de tensão na fonte do sinal (efeito de carregamento isolado).",
        },
      ],
      links: [],
    },
    // ============================
    // 11. SISTEMAS OPERACIONAIS
    // ============================
    {
      id: "sistemas_operacionais",
      label: "Sistemas Operacionais",
      group: 6,
      status: "locked",
      description:
        "O software fundamental que atua como intermediário entre o usuário/aplicações e o hardware do computador. Transforma o hardware bruto e complexo em uma máquina estendida (abstração limpa) e atua como gerenciador de recursos, controlando a alocação ordenada de CPUs, memórias e dispositivos de E/S.",
      examples: [
        "Abstração de Máquina Estendida",
        "Gerenciamento de Recursos de Hardware",
        "Evolução Histórica (Monolíticos a Micronúcleos)",
      ],
      books: [
        "Sistemas Operacionais Modernos - Andrew S. Tanenbaum & Herbert Bos",
        "Sistemas Operacionais - William Stallings",
        "Sistemas Operacionais Modernos - Peter Baer Galvin & Abraham Silberschatz",
      ],
      practice: [
        {
          question: "Quais são as duas funções principais e conceitualmente distintas de um Sistema Operacional?",
          answer:
            "As duas funções principais são: 1) Prover uma abstração de máquina estendida (ou virtual) para os programadores, ocultando a complexidade do hardware real por meio de interfaces mais simples. 2) Atuar como um gerenciador de recursos, controlando e multiplexando de forma ordenada, segura e eficiente o tempo e o espaço de CPUs, memórias, discos e demais periféricos entre os diversos processos.",
        },
      ],
      links: [],
    },
    {
      id: "kernel_so",
      label: "Núcleo do Sistema Operacional (Kernel)",
      group: 6,
      status: "locked",
      description:
        "A parte central do sistema operacional que permanece carregada continuamente na memória principal (RAM) e possui controle total sobre todo o hardware. É responsável por gerenciar diretamente o isolamento de processos, a gerência de memória baixa, e os subsistemas vitais que conversam com o processador.",
      examples: ["Núcleos Monolíticos", "Microkernel (Minix/QNX)", "Sistemas Híbridos"],
      books: [
        "Sistemas Operacionais Modernos - Andrew S. Tanenbaum & Herbert Bos",
        "Operating Systems: Internals and Design Principles - William Stallings",
      ],
      practice: [
        {
          question:
            "Qual a diferença arquitetural básica entre um design de kernel Monolítico e uma arquitetura baseada em Microkernel?",
          answer:
            "No kernel Monolítico, praticamente todas as funções do SO (escalonador, gerência de memória, sistemas de arquivos e drivers) rodam juntas em um único grande binário dentro do espaço de núcleo (altamente eficiente, mas vulnerável a falhas). No Microkernel, o núcleo é reduzido ao mínimo necessário (comunicação IPC e gerência básica de hardware), e os serviços tradicionais rodam isolados no espaço de usuário como servidores independentes (altamente estável e modular, mas com overhead de comunicação).",
        },
      ],
      links: [],
    },
    {
      id: "modo_usuario_kernel",
      label: "Modos de Execução (Usuário vs. Kernel)",
      group: 6,
      status: "locked",
      description:
        "Mecanismo de proteção suportado diretamente pelo silício da CPU (através de bits de estado no registrador de status). Divide o ambiente de execução em Modo Kernel (onde qualquer instrução de máquina pode ser executada e qualquer endereço de memória pode ser acessado) e Modo Usuário (onde instruções sensíveis ou de controle de hardware são proibidas e geram exceções se disparadas por software comum).",
      examples: [
        "Bits de Proteção do Processador (Ring 0 e Ring 3 em x86)",
        "Instruções Privilegiadas (CLI, STI, HLT)",
        "Exceções de Proteção Geral (General Protection Fault)",
      ],
      books: [
        "Sistemas Operacionais Modernos - Andrew S. Tanenbaum & Herbert Bos",
        "Computer Organization and Architecture - William Stallings",
      ],
      practice: [
        {
          question:
            "Como o hardware da CPU impede que um programa malicioso escrito pelo usuário altere as configurações físicas de interrupção ou formate o disco diretamente?",
          answer:
            "O hardware utiliza o bit de modo de execução. Programas de usuário rodam em Modo Usuário (Ring 3). Caso o código tente executar uma instrução privilegiada (como desativar interrupções ou acessar os registradores físicos do controlador de disco), a CPU intercepta a ação antes de executá-la, bloqueia a instrução e dispara uma interrupção de hardware (trap) passando o controle para o manipulador de falhas do Kernel, que encerra o programa invasor.",
        },
      ],
      links: [],
    },
    {
      id: "chamadas_de_sistema",
      label: "Chamadas de Sistema (System Calls)",
      group: 6,
      status: "locked",
      description:
        "A interface de programação (API) que define a ponte e o contrato de transição controlada do espaço de usuário para o espaço de kernel. Permite que programas de aplicação solicitem de forma segura serviços executados estritamente pelo núcleo do sistema operacional.",
      examples: [
        "System Calls POSIX (fork, read, write, open)",
        "Instrução de Trap/Instrução de Interrupção de Software (INT 0x80, SYSCALL)",
        "Mapeamento de Vetores de Chamadas",
      ],
      books: [
        "Sistemas Operacionais Modernos - Andrew S. Tanenbaum & Herbert Bos",
        "Digital Design and Computer Architecture - Harris & Harris",
      ],
      practice: [
        {
          question:
            "Descreva a mecânica de hardware e baixo nível que ocorre quando um programa em Assembly executa uma Chamada de Sistema para ler um arquivo.",
          answer:
            "O programa coloca os argumentos da chamada e o número identificador da System Call em registradores específicos da CPU. Em seguida, executa uma instrução especial de interrupção por software (como `SYSCALL` ou `INT`). Esta instrução faz a CPU mudar fisicamente do modo usuário para o modo kernel, salva o contador de programa (PC) atual e desvia o fluxo para um endereço fixo de memória (vetor de interrupções) controlado pelo SO. O manipulador do kernel decodifica o número da chamada, executa o serviço de forma protegida, coloca o resultado em um registrador e executa uma instrução de retorno (como `SYSRET`), que devolve a CPU ao modo usuário e ao fluxo do programa.",
        },
      ],
      links: [],
    },
    {
      id: "tratamento_de_interrupcoes",
      label: "Tratamento de Interrupções no SO",
      group: 6,
      status: "locked",
      description:
        "A gerência de software básico responsável por capturar os sinais elétricos assíncronos gerados por barramentos e periféricos e traduzi-los em ações lógicas do sistema. Salva o contexto exato do processamento atual e despacha a execução para a rotina de serviço de interrupção (ISR) cadastrada no vetor de hardware.",
      examples: [
        "Rotinas de Serviço de Interrupção (ISR)",
        "Vetor de Interrupções da CPU",
        "Ocultamento de Sinais de Relógio e Teclado",
      ],
      books: [
        "Sistemas Operacionais Modernos - Andrew S. Tanenbaum & Herbert Bos",
        "Organização e Projeto de Computadores - Patterson & Hennessy",
      ],
      practice: [
        {
          question:
            "Por que as rotinas de tratamento de interrupções (ISRs) devem ser projetadas para serem o mais curtas e rápidas possíveis em nível de sistema?",
          answer:
            "Enquanto uma interrupção física está sendo tratada pelo hardware e pelo software da ISR, outras interrupções de mesma prioridade ou menores podem ser desativadas ou mascaradas pelo processador. Se a ISR demorar muito executando tarefas complexas, o sistema pode perder sinais críticos assíncronos vindos de outros barramentos ou periféricos (como bytes trafegando na placa de rede ou pulsos do clock do sistema), gerando perda de dados ou instabilidade.",
        },
      ],
      links: [],
    },
    {
      id: "device_drivers",
      label: "Controladores de Dispositivos (Device Drivers)",
      group: 6,
      status: "locked",
      description:
        "Módulos de software altamente especializados que contêm o código específico para interagir com o controlador físico de um dispositivo de E/S. Aceitam requisições abstratas e padronizadas do SO (como 'leia o bloco X') e as convertem em uma sequência de leituras e escritas nos registradores elétricos mapeados no barramento do hardware periférico.",
      examples: [
        "Drivers de Controladoras Gráficas",
        "Drivers de Barramento USB/PCIe",
        "Comunicação via Registradores de I/O",
      ],
      books: [
        "Sistemas Operacionais Modernos - Andrew S. Tanenbaum & Herbert Bos",
        "Sistemas Operacionais - William Stallings",
      ],
      practice: [
        {
          question:
            "Como o conceito de Device Driver ajuda a manter a independência de dispositivo dentro do Sistema Operacional?",
          answer:
            "Ele encapsula e isola todas as peculiaridades e comandos elétricos proprietários de um fabricante de hardware específico atrás de uma interface uniforme exigida pelo sistema operacional. O sistema operacional dita uma API padrão para o subsistema (ex: comandos genéricos de blocos), e o fabricante escreve o driver traduzindo esses comandos para os comandos reais que os chips da placa entendem. Isso impede que o núcleo do SO precise ser modificado a cada novo periférico lançado no mercado.",
        },
      ],
      links: [],
    },
    {
      id: "escalonamento_de_processos",
      label: "Escalonamento de Processos",
      group: 6,
      status: "locked",
      description:
        "Conjunto de algoritmos e políticas do sistema encarregados de decidir qual dos processos elegíveis e em estado de 'Pronto' receberá o controle físico da Unidade Central de Processamento (CPU) e por quanto tempo, baseando-se no temporizador elétrico (clock/quantum) e nos objetivos de eficiência do sistema.",
      examples: [
        "Escalonamento por Chaveamento Circular (Round-Robin)",
        "Prioridades Dinâmicas e Múltiplas Filas",
        "Escalonamento Preemptivo vs. Não-Preemptivo",
      ],
      books: [
        "Sistemas Operacionais Modernos - Andrew S. Tanenbaum & Herbert Bos",
        "Sistemas Operacionais Modernos - Peter Baer Galvin & Abraham Silberschatz",
      ],
      practice: [
        {
          question: "O que diferencia um algoritmo de escalonamento Preemptivo de um Não-Preemptivo (Cooperativo)?",
          answer:
            "No escalonamento Não-Preemptivo, um processo ganha o controle da CPU e o mantém até voluntariamente liberá-lo (via chamada de sistema ou término de tarefa). No escalonamento Preemptivo, o SO utiliza uma interrupção periódica gerada pelo hardware de clock (timer) para interromper à força o processo em execução após o término de sua fatia de tempo (quantum), devolvendo o controle ao escalonador para que outro processo possa rodar, garantindo o compartilhamento equitativo do processador.",
        },
        {
          question:
            "Por que uma fatia de tempo (quantum) muito pequena ou muito grande prejudica o desempenho do sistema em um algoritmo Round-Robin?",
          answer:
            "Se o quantum for curto demais (ex: 1 ms), a CPU gastará uma porcentagem excessiva de tempo e ciclos executando a troca de contexto de hardware (salvar e carregar registradores, invalidar cache), reduzindo a eficiência útil do processador. Se for longo demais (ex: 500 ms), o sistema perde a característica de tempo compartilhado, e processos interativos ou de interface vão parecer travados, degradando o tempo de resposta percebido pelo usuário.",
        },
      ],
      links: [],
    },
    {
      id: "gerenciamento_de_threads",
      label: "Gerenciamento de Threads",
      group: 6,
      status: "locked",
      description:
        "A gerência das linhas de execução (threads) que compartilham o mesmo espaço de endereçamento virtual de um processo pai. Aborda a criação, escalonamento e troca de contexto de linhas de código concorrentes, gerenciadas a nível de espaço de usuário (User-level) ou diretamente pelo núcleo (Kernel-level).",
      examples: ["Threads Pthreads (POSIX)", "Threads de Usuário vs. Threads de Kernel", "Troca de Contexto Leve"],
      books: [
        "Sistemas Operacionais Modernos - Andrew S. Tanenbaum & Herbert Bos",
        "Sistemas Operacionais - William Stallings",
      ],
      practice: [
        {
          question:
            "Qual a vantagem de desempenho em se utilizar múltiplas Threads em vez de múltiplos Processos isolados em um sistema multicore?",
          answer:
            "As threads de um mesmo processo compartilham os mesmos recursos físicos e a mesma tabela de páginas de memória. Portanto, criar uma nova thread ou efetuar uma troca de contexto entre threads do mesmo processo é imensamente mais rápido e consome menos overhead do que entre processos, pois não exige que a CPU limpe e recarregue os mapas da MMU ou os registradores de controle de memória virtual (como o CR3 do x86).",
        },
        {
          question:
            "Explique o problema de se utilizar Threads em Espaço de Usuário pura (sem suporte do Kernel) quando uma delas executa uma operação de E/S bloqueante.",
          answer:
            "Se as threads forem gerenciadas inteiramente por uma biblioteca em espaço de usuário, o kernel do SO enxerga apenas o processo pai como um único fluxo de execução. Se uma thread individual disparar uma chamada de sistema bloqueante (como aguardar a leitura do disco), o kernel colocará o processo inteiro no estado de 'Bloqueado', impedindo que todas as outras threads internas e prontas daquele processo continuem rodando, mesmo que elas não dependessem do disco.",
        },
      ],
      links: [],
    },
    {
      id: "condicoes_de_corrida",
      label: "Condições de Corrida (Race Conditions)",
      group: 6,
      status: "locked",
      description:
        "Uma situação patológica que ocorre em ambientes multiprocessados ou multithreaded onde dois ou mais fluxos de execução tentam ler e escrever em um dado/recurso compartilhado simultaneamente. O resultado final da execução torna-se dependente da ordem exata e do sincronismo de nanossegundos em que as instruções de máquina se intercalaram no barramento elétrico.",
      examples: [
        "Inconsistência de Variáveis Globais de Controle",
        "Acessos Simultâneos a Estruturas de Dados em RAM",
        "Intercalação Crítica de Instruções ASM (Read-Modify-Write)",
      ],
      books: [
        "Sistemas Operacionais Modernos - Andrew S. Tanenbaum & Herbert Bos",
        "Sistemas Operacionais Modernos - Peter Baer Galvin & Abraham Silberschatz",
      ],
      practice: [
        {
          question:
            "Por que uma operação simples de alto nível como `cont++` pode gerar uma Condição de Corrida quando executada por duas threads simultaneamente se não for protegida?",
          answer:
            "Em nível de montagem (Assembly), a instrução `cont++` é desmembrada pela CPU em três etapas físicas: 1) Ler o valor da memória e carregá-lo em um registrador (`MOV EAX, [cont]`). 2) Incrementar o registrador (`INC EAX`). 3) Gravar o valor do registrador de volta na memória (`MOV [cont], EAX`). Se a Thread 1 for interrompida pelo escalonador logo após a etapa 1, a Thread 2 lerá o mesmo valor antigo da memória. Ambas incrementarão o mesmo valor antigo e gravarão o mesmo resultado, fazendo com que um dos incrementos seja completamente perdido devido ao entrelaçamento assíncrono.",
        },
      ],
      links: [],
    },
    {
      id: "deadlocks",
      label: "Impasses (Deadlocks)",
      group: 6,
      status: "locked",
      description:
        "Condição de travamento mútuo definitivo e catastrófico que ocorre em sistemas de concorrência ativa. Um conjunto de processos fica permanentemente bloqueado porque cada processo retém exclusivamente um recurso de hardware ou software e aguarda pela liberação de outro recurso retido por outro processo do mesmo conjunto, criando uma dependência circular cíclica.",
      examples: [
        "Disputa Exclusiva por Gravadores/Impressoras",
        "Bloqueios Cruzados de Semáforos e Mutexes",
        "As Quatro Condições de Coffman",
      ],
      books: [
        "Sistemas Operacionais Modernos - Andrew S. Tanenbaum & Herbert Bos",
        "Operating Systems: Internals and Design Principles - William Stallings",
      ],
      practice: [
        {
          question:
            "Quais são as Quatro Condições de Coffman que devem ocorrer de forma simultânea para que um Deadlock possa se estabelecer em um sistema?",
          answer:
            "As quatro condições são: 1) Exclusão Mútua (cada recurso só pode estar alocado a um processo por vez). 2) Posse e Espera (processos que já retêm recursos podem solicitar novos recursos). 3) Não Preempção (um recurso não pode ser retirado à força de um processo). 4) Espera Circular (existe uma cadeia fechada de processos onde cada um aguarda um recurso retido pelo próximo membro da fila).",
        },
        {
          question:
            "O que dita a estratégia de tratamento de deadlocks conhecida como 'Algoritmo do Avestruz' mencionada por Tanenbaum?",
          answer:
            "O Algoritmo do Avestruz estabelece a estratégia de simplesmente ignorar o problema. Baseia-se no argumento econômico e prático de que, se os deadlocks ocorrem de forma extremamente rara e o custo de detecção ou prevenção contínua em tempo de execução for muito alto em termos de perda de clock e desempenho, é melhor fingir que nada aconteceu e simplesmente resetar o sistema caso o travamento raro venha a ocorrer.",
        },
      ],
      links: [],
    },
    {
      id: "gerenciamento_de_memoria",
      label: "Gerenciamento de Memória",
      group: 6,
      status: "locked",
      description:
        "O subsistema do SO responsável por controlar e mapear o espaço de armazenamento volátil do computador. Monitora quais partes da memória estão em uso, aloca dinamicamente blocos para novos processos e protege as fronteiras físicas do silício para evitar que processos invadam o espaço alheio ou corrompam o kernel.",
      examples: [
        "Alocação Contígua Simples",
        "Registradores Base e Limite de Hardware",
        "Swapping (Troca de Processos para Disco)",
      ],
      books: [
        "Sistemas Operacionais Modernos - Andrew S. Tanenbaum & Herbert Bos",
        "Sistemas Operacionais Modernos - Peter Baer Galvin & Abraham Silberschatz",
      ],
      practice: [
        {
          question:
            "Como os registradores físicos de hardware 'Base' e 'Limite' atuam na proteção e gerenciamento de memória em sistemas primitivos?",
          answer:
            "O registrador Base armazena o endereço físico inicial da RAM onde o processo foi carregado, e o registrador Limite armazena o tamanho total do segmento alocado. Toda vez que o processo tenta ler ou escrever em um endereço de memória, o circuito do processador intercepta a instrução, soma o endereço lógico ao registrador Base e verifica se o resultado ultrapassa o registrador Limite. Caso ultrapasse, o hardware bloqueia o acesso instantaneamente e gera uma trap de violação de segmentação.",
        },
      ],
      links: [],
    },
    {
      id: "memoria_virtual",
      label: "Memória Virtual",
      group: 6,
      status: "locked",
      description:
        "Técnica de arquitetura que cria uma abstração elegante da memória principal, separando o espaço de endereçamento lógico visto pelo programa dos endereços físicos reais da memória RAM. Permite que um processo execute mesmo utilizando um espaço combinado maior do que a RAM física instalada, usando suporte de hardware (MMU) e armazenamento secundário.",
      examples: [
        "Unidade de Gerenciamento de Memória (MMU)",
        "Endereços Lógicos vs. Endereços Físicos",
        "Falha de Página (Page Fault)",
      ],
      books: [
        "Sistemas Operacionais Modernos - Andrew S. Tanenbaum & Herbert Bos",
        "Organização e Projeto de Computadores - Patterson & Hennessy",
        "Computer Systems: A Programmer's Perspective - Bryant & O'Hallaron",
      ],
      practice: [
        {
          question:
            "Qual o papel desempenhado pela MMU (Memory Management Unit) no hardware e o que ocorre quando ela detecta um bit de presença igual a zero?",
          answer:
            "A MMU é o circuito de hardware integrado à CPU encarregado de traduzir em tempo real cada endereço virtual gerado pelo programa em um endereço físico real da RAM consultando as tabelas de páginas. Caso ela tente traduzir um endereço e descubra que o bit de presença daquela página está em zero (indicando que a página não está na RAM, mas guardada no disco), a MMU suspende a instrução imediatamente e dispara uma interrupção especial de hardware chamada Falha de Página (Page Fault), forçando o SO a carregar o bloco do disco para a RAM.",
        },
      ],
      links: [],
    },
    {
      id: "paginacao",
      label: "Paginação de Memória",
      group: 6,
      status: "locked",
      description:
        "Mapeamento de memória virtual onde o espaço de endereçamento lógico é dividido em blocos de tamanho fixo chamados 'Páginas', e a memória RAM física é dividida em blocos de idêntico tamanho chamados 'Molduras' (Frames). Elimina completamente a fragmentação externa dividindo dados através de tabelas de índices indexadas por hardware.",
      examples: [
        "Tabelas de Páginas (Page Tables)",
        "Estruturas de Tabelas Multinível",
        "Buffer de Tradução Antecipada (TLB - Translation Lookaside Buffer)",
      ],
      books: [
        "Sistemas Operacionais Modernos - Andrew S. Tanenbaum & Herbert Bos",
        "Memory Systems: Cache, DRAM, Disk - Bruce Jacob et al.",
      ],
      practice: [
        {
          question:
            "Como o hardware utiliza a TLB (Translation Lookaside Buffer) para mitigar a penalidade de velocidade de acesso à memória imposta pelas Tabelas de Páginas?",
          answer:
            "Como as Tabelas de Páginas ficam armazenadas na RAM principal, cada acesso lógico de leitura do programa exigiria duas leituras físicas à RAM (uma para buscar o endereço traduzido na tabela e outra para buscar o dado real), cortando o desempenho pela metade. A TLB resolve isso atuando como uma pequena memória cache associativa ultra-rápida integrada na CPU que armazena as traduções de páginas mais recentes. Se o endereço virtual atingir a TLB (TLB hit), a tradução física ocorre em um único ciclo de clock.",
        },
        {
          question:
            "O que define a ocorrência do fenômeno patológico de Thrashing (Hiperpaginação) em sistemas operacionais com paginação sob demanda?",
          answer:
            "O Thrashing ocorre quando o conjunto de páginas ativas e vitais sendo utilizadas por todos os processos em execução conjunta é maior do que o total de molduras de RAM física disponíveis no sistema. Como resultado, o SO passa a gastar quase 100% do seu tempo de processador e barramento tratando consecutivas interrupções de Page Fault e chaveando blocos entre o disco e a RAM, fazendo com que o processamento útil do computador colapse e caia a quase zero.",
        },
      ],
      links: [],
    },
    {
      id: "segmentacao",
      label: "Segmentação de Memória",
      group: 6,
      status: "locked",
      description:
        "Mapeamento de memória virtual que divide o espaço lógicos de endereçamento em blocos lógicos e independentes de tamanho variável chamados 'Segmentos', refletindo diretamente a organização lógica do programa feita pelo compilador (segmento de código, segmento de dados, pilha e heap).",
      examples: [
        "Segmentos de Texto, Data e BSS",
        "Tabelas de Segmentos (LDT/GDT em x86)",
        "Fragmentação Externa de Memória RAM",
      ],
      books: [
        "Sistemas Operacionais Modernos - Andrew S. Tanenbaum & Herbert Bos",
        "Sistemas Operacionais Modernos - Peter Baer Galvin & Abraham Silberschatz",
      ],
      practice: [
        {
          question:
            "Qual a diferença conceitual e geométrica básica entre as estruturas de Paginação e de Segmentação?",
          answer:
            "A Paginação divide a memória em blocos puramente físicos e de tamanho estritamente fixo (invisível ao programador), focando em eliminar a fragmentação externa e facilitar a troca com o disco. A Segmentação divide a memória em blocos lógicos, funcionais e de tamanho dinâmico/variável (visível ao compilador e programador), focando em espelhar as divisões de código, dados e proteção de rotinas, sofrendo, porém, com o problema de fragmentação externa da RAM.",
        },
      ],
      links: [],
    },
    // ===========================
    // 12. MATEMÁTICA DISCRETA
    // ===========================
    {
      id: "matematica_discreta",
      label: "Matemática Discreta",
      group: 7,
      status: "locked",
      description:
        "O núcleo teórico que embasa a ciência da computação. Diferente do cálculo, lida com estruturas matemáticas que são fundamentalmente discretas (finitas ou enumeráveis), fornecendo o vocabulário rigoroso necessário para o projeto de hardware, análise de algoritmos e criptografia.",
      examples: ["Bases Numéricas", "Estruturas de Dados Abstratas", "Fundamentos de Algoritmos"],
      books: [
        "Matemática Discreta e Suas Aplicações - Kenneth H. Rosen",
        "Concrete Mathematics - Donald Knuth, Ronald Graham & Oren Patashnik",
      ],
      practice: [
        {
          question:
            "Qual a diferença fundamental entre a Matemática Contínua (Cálculo) e a Matemática Discreta no contexto computacional?",
          answer:
            "A matemática contínua lida com números reais e variações suaves (como a física analógica). A matemática discreta lida com valores separados e contáveis (como inteiros, grafos e lógicas booleanas). Como computadores digitais operam internamente com estados finitos e discretos (bits 0 e 1), a matemática discreta é a linguagem natural para descrever o comportamento exato das máquinas.",
        },
      ],
      links: [],
    },
    {
      id: "logica_matematica",
      label: "Lógica Matemática",
      group: 7,
      status: "locked",
      description:
        "Estudo formal das regras de inferência e raciocínio. Define proposições, conectivos (E, OU, NÃO) e tabelas-verdade, servindo como o alicerce teórico direto para o desenvolvimento da Álgebra Booleana e a construção física de circuitos lógicos no silício.",
      examples: ["Lógica Proposicional", "Lógica de Predicados", "Tabelas-Verdade"],
      books: ["Matemática Discreta e Suas Aplicações - Kenneth H. Rosen"],
      practice: [
        {
          question: "O que é uma proposição lógica?",
          answer:
            "Uma proposição é uma sentença declarativa que pode ser classificada estritamente como Verdadeira (V) ou Falsa (F), mas nunca ambas simultaneamente. É a unidade básica de tomada de decisão, análoga a um bit isolado em um registrador.",
        },
        {
          question:
            "Como a operação lógica 'Se... Então...' (Implicação Lógica) difere da execução de um 'if' na programação?",
          answer:
            "Na programação, um 'if' dita o fluxo de execução (faz algo se a condição for verdadeira). Na lógica matemática, a implicação (P -> Q) é uma declaração de valor de verdade: ela só é considerada falsa se a premissa (P) for verdadeira e a conclusão (Q) for falsa. Se a premissa for falsa, a implicação inteira é vacuamente verdadeira.",
        },
      ],
      links: [],
    },
    {
      id: "aritmetica_modular",
      label: "Aritmética Modular",
      group: 7,
      status: "locked",
      description:
        "Ramo da teoria dos números que foca no comportamento de inteiros através de sistemas de 'aritmética de relógio' (resto da divisão). É a explicação matemática de como CPUs lidam com tamanhos fixos de registradores e o pilar principal da criptografia moderna (como RSA).",
      examples: ["Congruência Modulo N", "Algoritmo de Euclides", "Complemento de 2"],
      books: [
        "Concrete Mathematics - Donald Knuth, Ronald Graham & Oren Patashnik",
        "Matemática Discreta e Suas Aplicações - Kenneth H. Rosen",
      ],
      practice: [
        {
          question:
            "Por que a Aritmética Modular é o modelo matemático perfeito para explicar o 'overflow' em registradores de CPU?",
          answer:
            "Um registrador de N bits só consegue armazenar valores até um limite (ex: um byte vai de 0 a 255). Se você somar 1 a 255, o hardware zera e volta para 0. Isso é exatamente a definição de aritmética modular (módulo 256): os números 'dão a volta' e recomeçam, em vez de se estenderem infinitamente.",
        },
      ],
      links: [],
    },
    {
      id: "teoria_dos_conjuntos",
      label: "Teoria dos Conjuntos (Naive Set Theory)",
      group: 7,
      status: "locked",
      description:
        "O estudo formal de coleções de objetos de forma abstrata. Fornece a base teórica para o modelo relacional de bancos de dados (SQL), definição de tipos de dados em linguagens de programação e operações lógicas sobre grupos de elementos.",
      examples: ["União e Interseção", "Conjunto das Partes (Power Set)", "Produto Cartesiano"],
      books: ["Naive Set Theory - Paul Halmos", "Matemática Discreta e Suas Aplicações - Kenneth H. Rosen"],
      practice: [
        {
          question:
            "De acordo com a teoria básica de conjuntos, o que caracteriza a diferença entre um 'Conjunto' e uma 'Tupla/Lista'?",
          answer:
            "Em um conjunto matemático clássico, a ordem dos elementos não importa e elementos duplicados não são permitidos (ex: {1, 2, 3} é idêntico a {3, 1, 2, 2}). Já em uma tupla ou lista de programação, a ordem posicional é fundamental e valores repetidos são permitidos.",
        },
        {
          question: "O que é o Produto Cartesiano de dois conjuntos e onde o vemos na computação?",
          answer:
            "O Produto Cartesiano de A e B gera um novo conjunto formado por todos os pares ordenados possíveis combinando um elemento de A com um de B. Na computação, isso é a base matemática da operação 'JOIN' em Bancos de Dados Relacionais, onde as linhas de duas tabelas são combinadas.",
        },
      ],
      links: [],
    },
    {
      id: "teoria_dos_grafos",
      label: "Teoria dos Grafos",
      group: 7,
      status: "locked",
      description:
        "O estudo matemático de redes, focando em vértices (nós) conectados por arestas (linhas). É a principal estrutura universal usada na engenharia para modelar roteamento de redes, dependências de compilação e transições de máquinas de estado.",
      examples: ["Caminho Mais Curto (Dijkstra)", "Grafos Direcionados vs Não-Direcionados", "Isomorfismo"],
      books: [
        "Introduction to Graph Theory - Robin J. Wilson",
        "Matemática Discreta e Suas Aplicações - Kenneth H. Rosen",
      ],
      practice: [
        {
          question: "Como você define formalmente um Grafo e quais são seus componentes fundamentais?",
          answer:
            "Formalmente, um grafo G é definido como um par ordenado G = (V, E), onde V é um conjunto não vazio de vértices (ou nós) e E é um conjunto de arestas (links) que conectam pares de vértices.",
        },
        {
          question:
            "Qual a diferença prática entre um grafo direcionado e um grafo não-direcionado em modelagem de sistemas?",
          answer:
            "Em um grafo não-direcionado, a relação é simétrica: se o Computador A está conectado ao B, o B está conectado ao A (ex: cabo de rede Ethernet). Em um grafo direcionado, as arestas têm sentido, indicando um fluxo unilateral (ex: o Processo A depende do resultado do Processo B, mas não o contrário).",
        },
      ],
      links: [],
    },
    {
      id: "arvores_matematica",
      label: "Árvores",
      group: 7,
      status: "locked",
      description:
        "Subcategoria estrita dos grafos caracterizada por formar estruturas totalmente conexas e livres de ciclos fechados. Essencial para modelar estruturas hierárquicas, busca binária, diretórios de SO e árvores de decisão em Inteligência Artificial.",
      examples: ["Árvores Binárias", "Grafos Conexos Acíclicos", "Raiz, Folhas e Profundidade"],
      books: [
        "Introduction to Graph Theory - Robin J. Wilson",
        "Matemática Discreta e Suas Aplicações - Kenneth H. Rosen",
        "Concrete Mathematics - Donald Knuth, Ronald Graham & Oren Patashnik",
      ],
      practice: [
        {
          question:
            "Na teoria dos grafos, quais são as duas condições obrigatórias para que um grafo qualquer seja classificado como uma Árvore?",
          answer:
            "Para ser uma árvore, o grafo deve ser inteiramente Conexo (existe um caminho entre qualquer par de nós, sem ilhas isoladas) e Acíclico (não existem loops ou caminhos fechados que permitam sair de um nó e voltar para ele sem repetir arestas).",
        },
      ],
      links: [],
    },
    {
      id: "combinatoria",
      label: "Combinatória",
      group: 7,
      status: "locked",
      description:
        "A matemática da contagem e estruturação. Permite calcular o número de possibilidades de estados de um sistema, o custo no pior caso de um algoritmo ou a resistência de uma chave criptográfica baseando-se no total de arranjos possíveis.",
      examples: ["Permutações e Combinações", "Princípio da Casa dos Pombos", "Regra da Multiplicação"],
      books: [
        "Concrete Mathematics - Donald Knuth, Ronald Graham & Oren Patashnik",
        "Matemática Discreta e Suas Aplicações - Kenneth H. Rosen",
      ],
      practice: [
        {
          question: "Qual a diferença essencial entre Permutação e Combinação?",
          answer:
            "Na Permutação, a ordem dos elementos importa (arranjar A,B,C é diferente de C,B,A, como em uma senha bancária). Na Combinação, a ordem é irrelevante, importando apenas o conjunto final (escolher os processos P1 e P2 para a memória é o mesmo que escolher P2 e P1).",
        },
        {
          question: "Explique de forma prática o Princípio da Casa dos Pombos (Pigeonhole Principle).",
          answer:
            "Se você tem N caixas (pombais) e precisa distribuir N+1 itens (pombos) entre elas, matematicamente pelo menos uma caixa terá que conter dois ou mais itens. Na computação, isso prova que em tabelas Hash com mais entradas do que slots disponíveis, as colisões são uma inevitabilidade matemática absoluta.",
        },
      ],
      links: [],
    },
    {
      id: "relacoes_de_recorrencia",
      label: "Relações de Recorrência",
      group: 7,
      status: "locked",
      description:
        "Equações matemáticas que definem termos subsequentes de uma sequência utilizando os termos anteriores. É o equivalente matemático de uma função recursiva em programação, essencial para decifrar algoritmos que 'dividem e conquistam'.",
      examples: ["Sequência de Fibonacci", "Torres de Hanói", "Teorema Mestre"],
      books: ["Concrete Mathematics - Donald Knuth, Ronald Graham & Oren Patashnik"],
      practice: [
        {
          question:
            "Quais são as duas partes obrigatórias ao se definir uma Relação de Recorrência para que ela tenha um resultado finito?",
          answer:
            "Ela precisa ter a Equação Recursiva (que define o N-ésimo termo em função dos anteriores) e os Casos Base (também chamados de condições iniciais, que estipulam um valor fixo onde a recursão deve parar, como f(0) = 0). Sem o caso base, a recorrência gera um loop infinito.",
        },
      ],
      links: [],
    },
    {
      id: "analise_assintotica",
      label: "Análise Assintótica (Notação Big-O)",
      group: 7,
      status: "locked",
      description:
        "O vocabulário formal utilizado para descrever o limite de consumo de tempo e memória de um algoritmo conforme o tamanho da sua entrada de dados tende ao infinito, abstraindo fatores de hardware.",
      examples: ["O(1), O(N), O(N²), O(log N)", "Pior Caso vs. Caso Médio"],
      books: [
        "Concrete Mathematics - Donald Knuth, Ronald Graham & Oren Patashnik",
        "Matemática Discreta e Suas Aplicações - Kenneth H. Rosen",
      ],
      practice: [
        {
          question:
            "Por que a Notação Big-O ignora constantes multiplicativas (ex: O(5N) vira O(N)) ao avaliar o desempenho de algoritmos?",
          answer:
            "Porque o objetivo da análise assintótica é medir a 'taxa de crescimento' da complexidade conforme a entrada tende ao infinito, independentemente se você roda o código em um processador de 2GHz ou 4GHz. O foco está em como o algoritmo escala arquiteturalmente, e não no tempo absoluto cronometrado.",
        },
      ],
      links: [],
    },
    {
      id: "probabilidade_discreta",
      label: "Probabilidade Discreta",
      group: 7,
      status: "locked",
      description:
        "O estudo matemático do acaso em espaços finitos. Fornece o raciocínio rigoroso para Inteligência Artificial (Redes Bayesianas), confiabilidade de armazenamento, transmissão de redes sujeita a ruídos e Machine Learning.",
      examples: ["Probabilidade Condicional", "Teorema de Bayes", "Eventos Independentes"],
      books: [
        "Matemática Discreta e Suas Aplicações - Kenneth H. Rosen",
        "Concrete Mathematics - Donald Knuth, Ronald Graham & Oren Patashnik",
      ],
      practice: [
        {
          question: "O que significa afirmar, em probabilidade, que dois eventos A e B são mutuamente exclusivos?",
          answer:
            "Significa que a ocorrência de um evento impede absolutamente a ocorrência do outro no mesmo instante (a interseção entre eles é nula). Por exemplo, um bit de hardware ser transmitido fisicamente como 0 e como 1 ao mesmo exato tempo no mesmo fio.",
        },
      ],
      links: [],
    },
    // =============================================
    // 13. REDES DE COMPUTADORES E INFRAESTRUTURA
    // =============================================
    {
      id: "dma_acesso_direto",
      label: "DMA (Direct Memory Access)",
      group: 13,
      status: "locked",
      description:
        "Mecanismo que permite que periféricos, como a placa de rede, transfiram dados diretamente para a memória RAM sem a intervenção contínua da CPU, vital para redes de alta velocidade.",
      examples: ["Controlador DMA", "Zero-copy", "Redução de Interrupções de CPU"],
      books: ["Redes de Computadores - Andrew S. Tanenbaum", "Computer Networking - Kurose & Ross"],
      practice: [
        {
          question: "O que significa a sigla DMA e qual o seu propósito?",
          answer:
            "Significa Direct Memory Access (Acesso Direto à Memória). Permite que hardwares como a placa de rede movam dados diretamente para a RAM, liberando a CPU para outras tarefas.",
        },
        {
          question: "Por que o DMA é essencial para conexões de rede Gigabit?",
          answer:
            "Se a CPU precisasse copiar cada byte recebido da rede gerando uma interrupção (I/O programado), uma rede muito rápida faria a CPU travar apenas movendo dados. O DMA evita esse gargalo.",
        },
      ],
      links: [],
    },
    {
      id: "placa_de_rede_nic",
      label: "Placa de Rede (NIC)",
      group: 13,
      status: "locked",
      description:
        "O componente de hardware físico que conecta o computador ao meio de transmissão, convertendo dados lógicos da memória em sinais elétricos, ópticos ou de rádio.",
      examples: ["NIC Ethernet", "Adaptador Wi-Fi (WLAN)", "Transceiver"],
      books: ["Redes de Computadores - Andrew S. Tanenbaum", "Computer Networking - Kurose & Ross"],
      practice: [
        {
          question: "Qual é a função principal de uma Placa de Rede (NIC)?",
          answer:
            "Atuar como a interface física entre o computador e o cabeamento de rede, transformando os bits armazenados na RAM em sinais físicos transmissíveis e vice-versa.",
        },
        {
          question: "Qual identificador único de rede vem gravado na placa de rede de fábrica?",
          answer: "O Endereço MAC (Media Access Control), que é o endereço físico único do hardware da placa.",
        },
      ],
      links: [],
    },
    {
      id: "pilha_tcp_ip",
      label: "Pilha TCP/IP (Implementação no Kernel)",
      group: 13,
      status: "locked",
      description:
        "O conjunto de protocolos de comunicação implementado dentro do núcleo (Kernel) do Sistema Operacional, responsável por empacotar e garantir a entrega dos dados.",
      examples: ["Modelo de 4 Camadas", "Espaço de Kernel", "Processamento de Datagramas"],
      books: [
        "Internetworking with TCP-IP - Douglas Comer",
        "Redes de Computadores - Andrew S. Tanenbaum",
        "Computer Networking - Kurose & Ross",
      ],
      practice: [
        {
          question: "A pilha TCP/IP geralmente é executada fisicamente na placa de rede ou no Sistema Operacional?",
          answer:
            "Na esmagadora maioria dos sistemas, a lógica da pilha TCP/IP roda via software dentro do Kernel do Sistema Operacional, usando os recursos de processamento da CPU principal.",
        },
        {
          question: "Quais são as quatro camadas clássicas do modelo TCP/IP?",
          answer:
            "Camada de Enlace (Interface de Rede), Camada de Internet (Rede), Camada de Transporte e Camada de Aplicação.",
        },
      ],
      links: [],
    },
    {
      id: "sockets_api",
      label: "Sockets API",
      group: 13,
      status: "locked",
      description:
        "A interface de programação de software (API) padrão que os aplicativos de usuário utilizam para se comunicar com a pilha de rede do Sistema Operacional.",
      examples: ["Berkeley Sockets", "Bind() e Listen()", "Sockets de Fluxo (TCP) vs Datagrama (UDP)"],
      books: ["Internetworking with TCP-IP - Douglas Comer", "Computer Networking - Kurose & Ross"],
      practice: [
        {
          question: "O que é um Socket em programação de redes?",
          answer:
            "É um ponto de extremidade de comunicação (endpoint). Funciona como uma 'porta virtual' pela qual um aplicativo envia e recebe dados através da rede gerenciada pelo SO.",
        },
        {
          question: "Quais são os dois parâmetros lógicos básicos para conectar um Socket a um servidor?",
          answer:
            "O Endereço IP (que identifica a máquina de destino) e o número da Porta (que identifica o aplicativo específico rodando naquela máquina).",
        },
      ],
      links: [],
    },
    {
      id: "camada_fisica_redes",
      label: "Camada Física",
      group: 13,
      status: "locked",
      description:
        "A camada 1 do modelo OSI. Trata da transmissão de bits brutos por um canal de comunicação, envolvendo voltagens, temporização e pinagem de cabos.",
      examples: ["Cabos Ethernet", "Frequências de Rádio", "Hubs Repetidores"],
      books: ["Redes de Computadores - Andrew S. Tanenbaum"],
      practice: [
        {
          question: "A Camada Física entende o conceito de pacotes e IPs?",
          answer:
            "Não. A camada física enxerga e transmite apenas sinais puros (pulsos elétricos ou luz) que representam 0s e 1s brutos, sem qualquer noção do que esses bits significam.",
        },
      ],
      links: [],
    },
    {
      id: "meios_de_transmissao",
      label: "Meios de Transmissão",
      group: 13,
      status: "locked",
      description:
        "Os canais físicos pelos quais a informação trafega: fios de cobre (par trançado/coaxial), fibras ópticas e espectro eletromagnético (sem fio).",
      examples: ["Cabo UTP (CAT6)", "Fibra Óptica Monomodo", "Wi-Fi (Ondas de Rádio)"],
      books: ["Redes de Computadores - Andrew S. Tanenbaum"],
      practice: [
        {
          question: "Qual a principal vantagem da transmissão por fibras ópticas em relação aos cabos de cobre?",
          answer:
            "A fibra óptica transmite usando luz, o que a torna totalmente imune a interferências eletromagnéticas, além de possuir uma largura de banda muito maior para longas distâncias.",
        },
      ],
      links: [],
    },
    {
      id: "modulacao_e_sinais",
      label: "Modulação e Sinais",
      group: 13,
      status: "locked",
      description:
        "O processo de converter dados digitais em sinais físicos, variando propriedades como amplitude, frequência ou fase de uma onda para representar informações.",
      examples: ["Modulação QAM", "Baud Rate", "Sinal Analógico vs Digital"],
      books: ["Redes de Computadores - Andrew S. Tanenbaum"],
      practice: [
        {
          question: "O que é largura de banda (bandwidth) em termos de sinais físicos?",
          answer:
            "É a faixa de frequências que pode ser transmitida pelo canal sem degradação excessiva. Canais com maior largura de banda conseguem transmitir mais dados simultaneamente.",
        },
      ],
      links: [],
    },
    {
      id: "camada_de_enlace",
      label: "Camada de Enlace",
      group: 13,
      status: "locked",
      description:
        "A camada 2 do modelo OSI. Pega os bits brutos da camada física e os organiza em unidades estruturadas chamadas Quadros (Frames), garantindo uma transmissão inicial sem erros.",
      examples: ["Quadros Ethernet", "Switches (Camada 2)", "Topologia Estrela"],
      books: ["Redes de Computadores - Andrew S. Tanenbaum", "Computer Networking - Kurose & Ross"],
      practice: [
        {
          question: "Qual é a unidade de dados (PDU) manipulada na Camada de Enlace?",
          answer:
            "O Quadro (Frame), que encapsula os pacotes de rede e adiciona cabeçalhos físicos, como endereços MAC e códigos de verificação de erro.",
        },
        {
          question: "Qual equipamento clássico de rede opera primariamente na camada de enlace?",
          answer:
            "O Switch. Ele lê os endereços MAC contidos nos quadros para enviá-los apenas para as portas onde os destinatários corretos estão conectados.",
        },
      ],
      links: [],
    },
    {
      id: "subcamada_mac",
      label: "Subcamada MAC",
      group: 13,
      status: "locked",
      description:
        "Media Access Control. Subcamada de enlace que lida com regras de acesso a meios compartilhados, decidindo quem pode transmitir quando vários dispositivos usam o mesmo canal.",
      examples: ["Endereço MAC", "CSMA/CD (Ethernet)", "CSMA/CA (Wi-Fi)"],
      books: ["Redes de Computadores - Andrew S. Tanenbaum", "Computer Networking - Kurose & Ross"],
      practice: [
        {
          question:
            "O que acontece se dois computadores transmitirem sinais simultaneamente no mesmo canal compartilhado?",
          answer:
            "Ocorre uma colisão de dados, o que corrompe o sinal físico. A subcamada MAC define regras para detectar colisões e retransmitir em momentos diferentes.",
        },
      ],
      links: [],
    },
    {
      id: "deteccao_correcao_erros",
      label: "Detecção e Correção de Erros",
      group: 13,
      status: "locked",
      description:
        "Mecanismos matemáticos que permitem que o receptor saiba se os bits foram alterados por ruído ou interferência durante a viagem no cabo.",
      examples: ["CRC (Cyclic Redundancy Check)", "Paridade", "Checksum"],
      books: ["Redes de Computadores - Andrew S. Tanenbaum"],
      practice: [
        {
          question: "Qual a diferença entre detecção de erro e correção de erro?",
          answer:
            "A detecção apenas avisa que o pacote chegou corrompido (para ser descartado). A correção de erro contém redundância suficiente para o receptor consertar os bits errados sem precisar pedir retransmissão.",
        },
      ],
      links: [],
    },
    {
      id: "protocolo_arp",
      label: "Protocolo ARP",
      group: 13,
      status: "locked",
      description:
        "Address Resolution Protocol. É o tradutor vital que descobre o endereço físico de hardware (MAC) correspondente a um endereço lógico (IP) na mesma rede local.",
      examples: ["Tabela ARP", "ARP Request em Broadcast"],
      books: ["Internetworking with TCP-IP - Douglas Comer", "Redes de Computadores - Andrew S. Tanenbaum"],
      practice: [
        {
          question: "Por que um computador precisa do ARP se ele já sabe o IP de destino?",
          answer:
            "Porque as placas de rede e os switches só entendem endereços MAC. O computador precisa do MAC para formatar o Quadro de Enlace antes de colocá-lo no fio.",
        },
      ],
      links: [],
    },
    {
      id: "camada_de_rede",
      label: "Camada de Rede",
      group: 13,
      status: "locked",
      description:
        "A camada 3 do modelo OSI. Responsável pelo endereçamento lógico global e por rotear pacotes através de múltiplas redes intermediárias até o destino final.",
      examples: ["Datagramas", "Roteadores", "Endereçamento Lógico"],
      books: ["Redes de Computadores - Andrew S. Tanenbaum", "Computer Networking - Kurose & Ross"],
      practice: [
        {
          question: "Qual é o principal dispositivo de hardware que atua na Camada de Rede?",
          answer: "O Roteador, que interliga redes diferentes e escolhe o melhor caminho para repassar os pacotes IP.",
        },
      ],
      links: [],
    },
    {
      id: "protocolo_ip_v4_v6",
      label: "Protocolo IP (IPv4 e IPv6)",
      group: 13,
      status: "locked",
      description:
        "O protocolo núcleo da internet. Fornece endereçamento global e roteamento de 'melhor esforço', empacotando dados em datagramas sem garantia de entrega.",
      examples: ["Endereço IPv4 (32 bits)", "Endereço IPv6 (128 bits)", "TTL (Time to Live)"],
      books: ["Internetworking with TCP-IP - Douglas Comer", "Redes de Computadores - Andrew S. Tanenbaum"],
      practice: [
        {
          question: "O protocolo IP garante que o datagrama chegará ao destino sem ser perdido?",
          answer:
            "Não. O IP oferece um serviço não confiável (best-effort). Se houver congestionamento, o roteador pode simplesmente descartar o pacote. Quem cuida da entrega confiável é o TCP.",
        },
        {
          question: "Para que serve o campo TTL (Time to Live) no cabeçalho IP?",
          answer:
            "Para evitar que pacotes fiquem rodando em loops infinitos na internet. A cada roteador que o pacote passa, o TTL diminui. Se chegar a zero, o pacote é destruído.",
        },
      ],
      links: [],
    },
    {
      id: "algoritmos_de_roteamento",
      label: "Algoritmos de Roteamento",
      group: 13,
      status: "locked",
      description:
        "Protocolos e fórmulas (como Dijkstra) que os roteadores usam para conversar entre si, atualizar tabelas e calcular a rota mais rápida ou com menor custo na malha da internet.",
      examples: ["OSPF (Link-State)", "BGP (Border Gateway Protocol)", "Tabelas de Roteamento"],
      books: ["Redes de Computadores - Andrew S. Tanenbaum", "Computer Networking - Kurose & Ross"],
      practice: [
        {
          question: "O que é uma Tabela de Roteamento?",
          answer:
            "Um banco de dados interno do roteador que mapeia redes de destino e indica qual é a 'próxima porta' (next hop) para onde o pacote deve ser jogado para se aproximar do destino.",
        },
      ],
      links: [],
    },
    {
      id: "camada_de_transporte",
      label: "Camada de Transporte",
      group: 13,
      status: "locked",
      description:
        "A camada 4. Eleva a comunicação (que antes era de máquina-para-máquina pelo IP) para aplicativo-para-aplicativo através do conceito de Portas, lidando com confiabilidade fim-a-fim.",
      examples: ["Segmentos (TCP)", "Portas de Aplicação (Porta 80, 443)", "Multiplexação"],
      books: ["Redes de Computadores - Andrew S. Tanenbaum", "Computer Networking - Kurose & Ross"],
      practice: [
        {
          question:
            "Como o sistema operacional sabe para qual aplicativo entregar os dados que acabaram de chegar da rede?",
          answer:
            "Através do número de Porta contido no cabeçalho da camada de Transporte (ex: porta 80 vai para o servidor web, porta 22 para o SSH).",
        },
      ],
      links: [],
    },
    {
      id: "protocolos_tcp_udp",
      label: "Protocolos TCP e UDP",
      group: 13,
      status: "locked",
      description:
        "Os pilares do transporte. O TCP é confiável e ordenado, usa conexões (Handshake). O UDP é rápido, não gera conexões e joga dados na rede sem se importar com perdas.",
      examples: ["Three-way Handshake", "Streaming (UDP)", "Transferência de Arquivos (TCP)"],
      books: ["Internetworking with TCP-IP - Douglas Comer", "Redes de Computadores - Andrew S. Tanenbaum"],
      practice: [
        {
          question: "O que é o 'Three-way Handshake' do TCP?",
          answer:
            "É o processo de estabelecimento de conexão em três passos (SYN, SYN-ACK, ACK) que servidor e cliente fazem antes de mandar o primeiro byte real de dados.",
        },
        {
          question: "Por que streaming de vídeo ao vivo ou jogos de tiro costumam usar UDP em vez de TCP?",
          answer:
            "Porque o TCP insiste em reenviar dados perdidos, gerando atraso (lag) inaceitável. No UDP, é melhor perder um frame de vídeo momentâneo do que travar a tela esperando o reenvio.",
        },
      ],
      links: [],
    },
    {
      id: "controle_de_congestionamento",
      label: "Controle de Congestionamento",
      group: 13,
      status: "locked",
      description:
        "Inteligência embutida no TCP para frear a velocidade de envio quando detecta que a rede intermediária está entupida, salvando a internet de um colapso catastrófico.",
      examples: ["Janela de Congestionamento (cwnd)", "Slow Start", "Algoritmo CUBIC"],
      books: ["Computer Networking - Kurose & Ross"],
      practice: [
        {
          question: "Como o protocolo TCP 'percebe' que há um congestionamento na rede?",
          answer:
            "Principalmente pela ausência de respostas de confirmação (ACKs) por parte do destinatário e por timeouts frequentes. Quando o roteador fica lotado, ele descarta pacotes, o TCP nota a perda e reduz a velocidade.",
        },
      ],
      links: [],
    },
    {
      id: "camada_de_aplicacao",
      label: "Camada de Aplicação",
      group: 13,
      status: "locked",
      description:
        "A camada mais alta, contendo os protocolos que prestam serviços diretos ao usuário e onde efetivamente trabalham os desenvolvedores de software.",
      examples: ["Navegadores Web", "SMTP (Email)", "SSH"],
      books: ["Redes de Computadores - Andrew S. Tanenbaum", "Computer Networking - Kurose & Ross"],
      practice: [
        {
          question: "A camada de aplicação se preocupa em saber por qual cabo ou roteador os dados vão passar?",
          answer:
            "Não. A camada de aplicação é uma camada de software pura. Ela entrega os dados estruturados (texto, imagens) para o Socket e a pilha do SO cuida do resto do trajeto físico e lógico.",
        },
      ],
      links: [],
    },
    {
      id: "dns",
      label: "DNS (Domain Name System)",
      group: 13,
      status: "locked",
      description:
        "O serviço de diretórios distribuído da internet, que traduz nomes de domínio humanamente legíveis (como google.com) para endereços IP roteáveis pelas máquinas.",
      examples: ["Registros A e CNAME", "Servidores Raiz", "Cache DNS"],
      books: ["DNS and Bind - Cricket Liu", "Redes de Computadores - Andrew S. Tanenbaum"],
      practice: [
        {
          question: "O que acontece na prática quando você digita um site, mas seu servidor DNS está fora do ar?",
          answer:
            "Sua internet continua funcionando e você consegue acessar servidores diretamente pelo IP (se souber), mas o navegador exibirá erro ao tentar resolver qualquer nome de domínio com letras.",
        },
        {
          question: "O que define um registro tipo 'A' no DNS?",
          answer: "É o registro fundamental que mapeia diretamente um nome de domínio para um endereço IPv4 numérico.",
        },
      ],
      links: [],
    },
    {
      id: "protocolos_iot_mqtt",
      label: "Protocolos IoT (MQTT)",
      group: 13,
      status: "locked",
      description:
        "Protocolos leves e de baixo consumo de recursos projetados para a Internet das Coisas (IoT), operando bem sobre redes não confiáveis e hardware de baixa potência.",
      examples: ["Padrão Publish/Subscribe", "Broker MQTT", "Telemetria"],
      books: ["Redes de Computadores - Andrew S. Tanenbaum"],
      practice: [
        {
          question:
            "Por que o modelo MQTT (usando um Broker intermediário) é melhor para sensores IoT do que requisições HTTP diretas?",
          answer:
            "O HTTP exige requisições contínuas, é verboso (cabeçalhos pesados) e consome muita bateria do microcontrolador. O MQTT mantém conexões minúsculas ativas e reage via eventos apenas quando há dados novos para publicar.",
        },
      ],
      links: [],
    },
    {
      id: "protocolo_http",
      label: "Protocolo HTTP",
      group: 13,
      status: "locked",
      description:
        "O Hypertext Transfer Protocol. É a linguagem universal da Web baseada em requisição e resposta de textos estruturados. Não guarda o estado do cliente entre requisições.",
      examples: ["HTTP/1.1 vs HTTP/2", "Status Codes (200, 404, 500)", "Verbos GET/POST"],
      books: ["HTTP The Definitive Guide - Gourley & Totty", "RESTful Web Services - Richardson & Ruby"],
      practice: [
        {
          question: "O que significa dizer que o protocolo HTTP é 'stateless' (sem estado)?",
          answer:
            "Significa que o servidor trata cada requisição HTTP de forma isolada, como um evento novo. Ele não guarda memória ou contexto natural de que aquela requisição veio do mesmo cliente que pediu algo 5 segundos atrás.",
        },
      ],
      links: [],
    },
    {
      id: "http_headers",
      label: "HTTP Headers (Cabeçalhos)",
      group: 13,
      status: "locked",
      description:
        "Linhas de texto fundamentais que acompanham toda requisição ou resposta HTTP, passando metadados de controle cruciais entre cliente e servidor.",
      examples: ["Content-Type", "User-Agent", "Authorization"],
      books: ["HTTP The Definitive Guide - Gourley & Totty"],
      practice: [
        {
          question:
            "Como o navegador do cliente sabe se a resposta enviada pelo servidor é um arquivo PDF ou um JSON de API?",
          answer:
            "Através do cabeçalho 'Content-Type', que informa o MIME Type do corpo (payload) entregue (ex: application/json ou application/pdf).",
        },
      ],
      links: [],
    },
    {
      id: "cookies_sessoes",
      label: "Cookies e Sessões",
      group: 13,
      status: "locked",
      description:
        "Gambiarra padronizada e vital da Web para resolver a falta de estado do HTTP. Permite manter usuários logados e armazenar preferências enviando pequenos identificadores nas requisições.",
      examples: ["Set-Cookie Header", "Session ID no Servidor", "Cadeia de Autenticação"],
      books: ["HTTP The Definitive Guide - Gourley & Totty"],
      practice: [
        {
          question: "Qual a relação entre Cookie e Sessão?",
          answer:
            "A Sessão armazena dados pesados (carrinho, perfil) seguramente do lado do servidor. O servidor gera um 'Session ID' e pede para o navegador salvá-lo como um Cookie. O navegador passa a enviar esse Cookie em toda nova requisição para se identificar.",
        },
      ],
      links: [],
    },
    {
      id: "ssl_tls_https",
      label: "SSL/TLS e HTTPS",
      group: 13,
      status: "locked",
      description:
        "Protocolos de segurança criptográfica que operam acima do TCP para garantir que os dados trafeguem confidencialmente (criptografia), de forma íntegra e para um servidor autenticado.",
      examples: ["Handshake TLS", "Criptografia Assimétrica", "Certificados Digitais (X.509)"],
      books: ["Bulletproof SSL and TLS - Ivan Ristic", "HTTP The Definitive Guide - Gourley & Totty"],
      practice: [
        {
          question: "Para que serve um Certificado Digital associado ao TLS do servidor?",
          answer:
            "Para garantir a autenticação de quem é dono do site. Ele impede ataques de Man-in-the-Middle confirmando (através de uma Autoridade Certificadora como a Let's Encrypt) que você está falando com o servidor real, e não um falso intermediário.",
        },
      ],
      links: [],
    },
    {
      id: "firewalls",
      label: "Firewalls",
      group: 13,
      status: "locked",
      description:
        "Sistemas (hardware ou software) que interceptam e filtram todo o tráfego de rede de acordo com regras de segurança rígidas, como bloqueio de portas ou de IPs específicos.",
      examples: ["Regras Iptables", "Default Deny", "Inspeção de Estado"],
      books: ["Firewalls and Internet Security - Cheswick & Bellovin"],
      practice: [
        {
          question: "O que significa a política de configuração de Firewall conhecida como 'Default Deny'?",
          answer:
            "É a prática recomendada onde o Firewall é configurado para bloquear absolutamente todo e qualquer tráfego, forçando o administrador a liberar explicitamente apenas as portas estritamente necessárias (como a 80 e 443).",
        },
      ],
      links: [],
    },
    {
      id: "proxy_reverso",
      label: "Proxy Reverso",
      group: 13,
      status: "locked",
      description:
        "Um servidor robusto (como NGINX) que senta de frente para a internet, recebendo o tráfego dos usuários e o roteando para as aplicações internas escondidas no backend.",
      examples: ["NGINX", "Terminação SSL", "Cache de Conteúdo"],
      books: ["Mastering NGINX - Dimitri Aivaliotis"],
      practice: [
        {
          question: "Qual a diferença central entre um Proxy comum e um Proxy Reverso?",
          answer:
            "O Proxy comum senta junto aos clientes e mascara as saídas (ex: proxy corporativo para bloquear redes sociais dos funcionários). O Proxy Reverso senta junto aos servidores de uma empresa, recebendo as requisições que chegam de fora e repassando-as internamente, ocultando a infraestrutura da aplicação.",
        },
      ],
      links: [],
    },
    {
      id: "load_balancing",
      label: "Load Balancing",
      group: 13,
      status: "locked",
      description:
        "A técnica crítica para escalar sistemas modernos, distribuindo requisições de rede equilibradamente por dezenas ou centenas de servidores clonados no backend.",
      examples: ["Algoritmo Round-Robin", "Health Checks", "AWS Application Load Balancer"],
      books: ["Mastering NGINX - Dimitri Aivaliotis"],
      practice: [
        {
          question: "O que o Proxy Reverso faz quando executa um 'Health Check' na frota de servidores balanceada?",
          answer:
            "Ele testa constantemente se os servidores backend estão vivos respondendo a requisições HTTP. Se um servidor da frota cair, o Load Balancer remove ele temporariamente da distribuição de tráfego, evitando direcionar clientes para um servidor morto.",
        },
      ],
      links: [],
    },
    {
      id: "cdn",
      label: "CDN (Content Delivery Network)",
      group: 13,
      status: "locked",
      description:
        "Um cluster global e distribuído de servidores proxy cujo único objetivo é guardar cópias em cache de conteúdo estático (imagens, vídeos) nos datacenters geograficamente mais próximos do usuário final.",
      examples: ["Cloudflare", "Akamai", "Redução de Latência por Borda (Edge)"],
      books: ["Content Delivery Networks - Buyya et al."],
      practice: [
        {
          question:
            "Como uma CDN melhora radicalmente a performance de um site hospedado nos Estados Unidos para um usuário no Brasil?",
          answer:
            "A CDN copia o código visual (HTML, CSS e imagens pesadas) do site para um servidor em São Paulo (Edge Server). Quando o usuário brasileiro acessa, os dados viajam apenas da sua cidade até SP (ms de latência), em vez de cruzarem cabos submarinos até os EUA.",
        },
      ],
      links: [],
    },
  ],
  links: [
    // ===================================
    // 1. FUNDAMENTOS DA ELETRICIDADE
    // ===================================
    { source: "fundamentos_eletricidade", target: "estrutura_atomica_eletron" },
    { source: "estrutura_atomica_eletron", target: "tensao_eletrica" },
    { source: "estrutura_atomica_eletron", target: "corrente_eletrica" },
    { source: "estrutura_atomica_eletron", target: "resistencia" },
    { source: "corrente_eletrica", target: "efeito_joule" },
    { source: "tensao_eletrica", target: "potencia_eletrica" },
    { source: "corrente_eletrica", target: "potencia_eletrica" },
    { source: "lei_de_ohm", target: "potencia_eletrica" },
    { source: "resistencia", target: "resistividade" },
    { source: "corrente_eletrica", target: "lei_de_ohm" },
    { source: "tensao_eletrica", target: "lei_de_ohm" },

    // ==================================================
    // 2. ASSOCIAÇÃO DE RESISTORES E CIRCUITOS MISTOS
    // ==================================================
    { source: "resistencia", target: "associacao_de_resistores" },
    { source: "lei_de_ohm", target: "associacao_de_resistores" },
    { source: "associacao_de_resistores", target: "circuitos_em_serie" },
    { source: "associacao_de_resistores", target: "circuitos_em_paralelo" },
    { source: "associacao_de_resistores", target: "circuitos_mistos" },
    { source: "circuitos_em_serie", target: "circuitos_eletricos" },
    { source: "circuitos_em_paralelo", target: "circuitos_eletricos" },
    { source: "circuitos_mistos", target: "circuitos_eletricos" },

    // ==============================================
    // 3. MÉTODOS DE ANÁLISE E TEOREMAS DE CIRCUITOS
    // ==============================================
    { source: "circuitos_eletricos", target: "analise_de_circuitos" },
    { source: "analise_de_circuitos", target: "analise_circuitos_linear" },
    { source: "analise_circuitos_linear", target: "leis_de_kirchhoff" },
    { source: "leis_de_kirchhoff", target: "lei_dos_nos" },
    { source: "leis_de_kirchhoff", target: "lei_das_malhas" },
    { source: "lei_das_malhas", target: "analise_malhas_maxwell" },
    { source: "lei_dos_nos", target: "principio_superposicao" },
    { source: "analise_malhas_maxwell", target: "principio_superposicao" },
    { source: "principio_superposicao", target: "teoremas_thevenin_norton" },

    // =====================================
    // 4. ELEMENTOS REATIVOS E DINÂMICOS
    // =====================================
    { source: "teoremas_thevenin_norton", target: "capacitores_indutores" },
    { source: "capacitores_indutores", target: "circuitos_rc_rl_primeira_ordem" },

    // ==========================================================
    // 5. FUNDAMENTOS DE SISTEMAS DIGITAIS E ELETRÔNICA DIGITAL
    // ==========================================================
    { source: "circuitos_eletricos", target: "sistemas_digitais" },
    { source: "sistemas_digitais", target: "sistemas_de_numeracao" },
    { source: "sistemas_digitais", target: "algebra_booleana" },
    { source: "sistemas_digitais", target: "familias_logicas" },
    { source: "teoremas_thevenin_norton", target: "familias_logicas" },
    { source: "circuitos_rc_rl_primeira_ordem", target: "familias_logicas" },
    { source: "sistemas_de_numeracao", target: "codigos_digitais" },
    { source: "sistemas_de_numeracao", target: "aritmetica_digital" },
    { source: "algebra_booleana", target: "portas_logicas" },
    { source: "familias_logicas", target: "portas_logicas" },
    { source: "portas_logicas", target: "simplificacao_logica" },

    // ==========================================================
    // 6. CIRCUITOS COMBINACIONAIS, SEQUENCIAIS E MEMÓRIAS
    // ==========================================================
    { source: "simplificacao_logica", target: "circuitos_combinacionais_msi" },
    { source: "aritmetica_digital", target: "circuitos_combinacionais_msi" },
    { source: "codigos_digitais", target: "circuitos_combinacionais_msi" },
    { source: "associacao_de_resistores", target: "circuitos_combinacionais_msi" },
    { source: "circuitos_combinacionais_msi", target: "latches_flipflops" },
    { source: "circuitos_rc_rl_primeira_ordem", target: "latches_flipflops" },
    { source: "latches_flipflops", target: "registradores_contadores" },
    { source: "latches_flipflops", target: "maquinas_de_estado" },
    { source: "familias_logicas", target: "dispositivos_de_memoria" },

    // ==========================================================
    // 7. DESCRIÇÃO DE HARDWARE (HDL), FPGAS E CONVERSÃO DE SINAIS
    // ==========================================================
    { source: "maquinas_de_estado", target: "linguagens_hdl" },
    { source: "registradores_contadores", target: "linguagens_hdl" },
    { source: "dispositivos_de_memoria", target: "linguagens_hdl" },
    { source: "linguagens_hdl", target: "dispositivos_programaveis_pld_fpga" },
    { source: "dispositivos_programaveis_pld_fpga", target: "interface_mundo_analogico" },
    { source: "teoremas_thevenin_norton", target: "interface_mundo_analogico" },

    // ==========================================================
    // 8. ARQUITETURA DE COMPUTADORES E ESTRUTURA DA CPU
    // ==========================================================
    { source: "sistemas_digitais", target: "arquitetura_de_computadores" },
    { source: "arquitetura_de_computadores", target: "tipos_computadores" },
    { source: "arquitetura_de_computadores", target: "arquitetura_von_neumann" },
    { source: "arquitetura_de_computadores", target: "isa" },
    { source: "isa", target: "assembly" },
    { source: "isa", target: "isa_cisc_x86" },
    { source: "isa", target: "isa_risc_arm" },
    { source: "arquitetura_von_neumann", target: "cpu" },
    { source: "assembly", target: "cpu" },
    { source: "cpu", target: "cpu_ula" },
    { source: "circuitos_combinacionais_msi", target: "cpu_ula" },
    { source: "cpu", target: "cpu_uc" },
    { source: "maquinas_de_estado", target: "cpu_uc" },
    { source: "cpu", target: "cpu_clock" },
    { source: "cpu", target: "cpu_arquiteturas" },
    { source: "cpu", target: "cpu_tipos" },

    // ==========================================================
    // 9. SUBSISTEMA DE MEMÓRIA, ENTRADA/SAÍDA (I/O) E PERIFÉRICOS
    // ==========================================================
    { source: "arquitetura_von_neumann", target: "memoria" },
    { source: "memoria", target: "hierarquia_memoria" },
    { source: "hierarquia_memoria", target: "memoria_principal" },
    { source: "dispositivos_de_memoria", target: "memoria_principal" },
    { source: "hierarquia_memoria", target: "armazenamento_secundario" },
    { source: "memoria_principal", target: "caches_niveis" },
    { source: "cpu", target: "caches_niveis" },
    { source: "arquitetura_von_neumann", target: "entrada_saida" },
    { source: "entrada_saida", target: "dispositivos_io" },
    { source: "entrada_saida", target: "barramentos_interrupcoes" },
    { source: "dispositivos_io", target: "armazenamento_secundario" },

    // ========================
    // 10. ELETRÔNICA GERAL
    // ========================
    { source: "circuitos_eletricos", target: "eletronica_geral" },
    { source: "teoremas_thevenin_norton", target: "eletronica_geral" },
    { source: "eletronica_geral", target: "semicondutores_diodos" },
    { source: "eletronica_geral", target: "amp_ops" },
    { source: "semicondutores_diodos", target: "aplicacoes_diodos" },
    { source: "semicondutores_diodos", target: "transistores_bjt" },
    { source: "semicondutores_diodos", target: "transistores_mosfet" },
    { source: "transistores_bjt", target: "amplificadores_bjt_mosfet" },
    { source: "transistores_mosfet", target: "amplificadores_bjt_mosfet" },
    { source: "amplificadores_bjt_mosfet", target: "amp_ops" },
    { source: "transistores_mosfet", target: "familias_logicas" },
    { source: "transistores_bjt", target: "familias_logicas" },
    { source: "amp_ops", target: "interface_mundo_analogico" },

    // ==============================
    // 11. SISTEMAS OPERACIONAIS
    // =============================
    { source: "cpu", target: "sistemas_operacionais" },
    { source: "arquitetura_von_neumann", target: "sistemas_operacionais" },
    { source: "sistemas_operacionais", target: "kernel_so" },
    { source: "cpu_arquiteturas", target: "modo_usuario_kernel" },
    { source: "kernel_so", target: "modo_usuario_kernel" },
    { source: "assembly", target: "chamadas_de_sistema" },
    { source: "chamadas_de_sistema", target: "kernel_so" },
    { source: "barramentos_interrupcoes", target: "tratamento_de_interrupcoes" },
    { source: "kernel_so", target: "tratamento_de_interrupcoes" },
    { source: "entrada_saida", target: "device_drivers" },
    { source: "dispositivos_io", target: "device_drivers" },
    { source: "kernel_so", target: "device_drivers" },
    { source: "cpu_uc", target: "escalonamento_de_processos" },
    { source: "sistemas_operacionais", target: "escalonamento_de_processos" },
    { source: "sistemas_operacionais", target: "gerenciamento_de_threads" },
    { source: "escalonamento_de_processos", target: "condicoes_de_corrida" },
    { source: "gerenciamento_de_threads", target: "condicoes_de_corrida" },
    { source: "condicoes_de_corrida", target: "deadlocks" },
    { source: "memoria_principal", target: "gerenciamento_de_memoria" },
    { source: "gerenciamento_de_memoria", target: "memoria_virtual" },
    { source: "cpu_arquiteturas", target: "memoria_virtual" },
    { source: "memoria_virtual", target: "paginacao" },
    { source: "memoria_virtual", target: "segmentacao" },

    // ===========================
    // 12. MATEMÁTICA DISCRETA
    // ===========================
    { source: "sistemas_digitais", target: "matematica_discreta" },
    { source: "matematica_discreta", target: "logica_matematica" },
    { source: "logica_matematica", target: "algebra_booleana" },
    { source: "matematica_discreta", target: "aritmetica_modular" },
    { source: "aritmetica_modular", target: "sistemas_de_numeracao" },
    { source: "aritmetica_modular", target: "aritmetica_digital" },
    { source: "matematica_discreta", target: "teoria_dos_conjuntos" },
    { source: "teoria_dos_conjuntos", target: "teoria_dos_grafos" },
    { source: "teoria_dos_grafos", target: "arvores_matematica" },
    { source: "teoria_dos_grafos", target: "maquinas_de_estado" },
    { source: "arvores_matematica", target: "escalonamento_de_processos" },
    { source: "matematica_discreta", target: "combinatoria" },
    { source: "combinatoria", target: "relacoes_de_recorrencia" },
    { source: "relacoes_de_recorrencia", target: "analise_assintotica" },
    { source: "combinatoria", target: "probabilidade_discreta" },

    // ===============================================
    // 13. REDES DE COMPUTADORES E INFRAESTRUTURA
    // ===============================================
    { source: "dispositivos_io", target: "placa_de_rede_nic" },
    { source: "device_drivers", target: "placa_de_rede_nic" },
    { source: "barramentos_interrupcoes", target: "dma_acesso_direto" },
    { source: "dma_acesso_direto", target: "placa_de_rede_nic" },
    { source: "kernel_so", target: "pilha_tcp_ip" },
    { source: "chamadas_de_sistema", target: "sockets_api" },
    { source: "sockets_api", target: "pilha_tcp_ip" },
    { source: "placa_de_rede_nic", target: "camada_fisica_redes" },
    { source: "interface_mundo_analogico", target: "camada_fisica_redes" },
    { source: "camada_fisica_redes", target: "meios_de_transmissao" },
    { source: "camada_fisica_redes", target: "modulacao_e_sinais" },
    { source: "camada_fisica_redes", target: "camada_de_enlace" },
    { source: "camada_de_enlace", target: "subcamada_mac" },
    { source: "camada_de_enlace", target: "deteccao_correcao_erros" },
    { source: "subcamada_mac", target: "protocolo_arp" },
    { source: "pilha_tcp_ip", target: "camada_de_rede" },
    { source: "camada_de_enlace", target: "camada_de_rede" },
    { source: "protocolo_arp", target: "camada_de_rede" },
    { source: "camada_de_rede", target: "protocolo_ip_v4_v6" },
    { source: "camada_de_rede", target: "algoritmos_de_roteamento" },
    { source: "camada_de_rede", target: "camada_de_transporte" },
    { source: "camada_de_transporte", target: "protocolos_tcp_udp" },
    { source: "protocolos_tcp_udp", target: "controle_de_congestionamento" },
    { source: "camada_de_transporte", target: "camada_de_aplicacao" },
    { source: "camada_de_aplicacao", target: "dns" },
    { source: "camada_de_aplicacao", target: "protocolos_iot_mqtt" },
    { source: "camada_de_aplicacao", target: "protocolo_http" },
    { source: "protocolo_http", target: "http_headers" },
    { source: "protocolo_http", target: "cookies_sessoes" },
    { source: "protocolo_http", target: "ssl_tls_https" },
    { source: "camada_de_rede", target: "firewalls" },
    { source: "protocolo_http", target: "proxy_reverso" },
    { source: "proxy_reverso", target: "load_balancing" },
    { source: "proxy_reverso", target: "cdn" },
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
  mastered: "#f1c40f",
};

const KnowledgeMap = () => {
  const svgRef = useRef(null);
  const nodeRef = useRef(null);

  const [nodes, setNodes] = useState(() => {
    // 1. Try to load from local storage
    const saved = localStorage.getItem("knowledge_map_data");
    const savedStatusMap = saved ? JSON.parse(saved) : {};

    return graphData.nodes.map((n) => {
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

  const [links] = useState(graphData.links.map((l) => ({ ...l })));

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
    const updatedNodes = nodes.map((n) => (n.id === selectedNode.id ? { ...n, status: newStatus } : n));
    setNodes(updatedNodes);
    setSelectedNode((prev) => ({ ...prev, status: newStatus }));

    // Persist to LocalStorage
    const statusMap = updatedNodes.reduce((acc, node) => {
      acc[node.id] = node.status;
      return acc;
    }, {});
    localStorage.setItem("knowledge_map_data", JSON.stringify(statusMap));
  };

  useEffect(() => {
    if (nodeRef.current) {
      nodeRef.current.select("circle").attr("stroke", (d) => {
        const match = nodes.find((n) => n.id === d.id);
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
          .distance(100),
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

    const node = g.append("g").selectAll("g").data(nodes).join("g").call(drag(simulation));

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
          y: event.pageY - 28,
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
      return d3.drag().on("start", dragstarted).on("drag", dragged).on("end", dragended);
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
        {selectedNode &&
          (() => {
            // Find the latest state for this node
            const currentNode = nodes.find((n) => n.id === selectedNode.id) || selectedNode;

            return (
              <>
                <h2 style={{ borderBottomColor: GROUP_CONFIG[currentNode.group].color }}>{currentNode.label}</h2>

                <div style={{ marginBottom: "15px" }}>
                  <label style={{ marginRight: "10px", color: "#ccc" }}>Status:</label>
                  <select
                    value={currentNode.status}
                    onChange={(e) => handleStatusChange(e.target.value)}
                    style={{
                      padding: "5px 10px",
                      borderRadius: "5px",
                      border: `2px solid ${statusColor[currentNode.status]}`,
                      backgroundColor: "rgba(0,0,0,0.3)",
                      color: "white",
                      cursor: "pointer",
                      outline: "none",
                      fontWeight: "bold",
                    }}>
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
                  <ul style={{ paddingLeft: "20px" }}>
                    {currentNode.practice.map((prac, i) => (
                      <li key={i} style={{ marginBottom: "10px" }}>
                        {typeof prac === "string" ? (
                          <span>🛠️ {prac}</span>
                        ) : (
                          <details>
                            <summary style={{ cursor: "pointer", fontWeight: "bold" }}>❓ {prac.question}</summary>
                            <div
                              style={{
                                marginTop: "5px",
                                padding: "10px",
                                background: "rgba(255,255,255,0.05)",
                                borderRadius: "5px",
                                fontSize: "0.9em",
                                whiteSpace: "pre-wrap",
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
                        🔗{" "}
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: "#3498db", textDecoration: "none" }}>
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
      <div
        style={{
          position: "absolute",
          bottom: 20,
          right: 20,
          zIndex: 10,
          color: "white",
          fontFamily: "sans-serif",
          fontSize: "12px",
          background: "rgba(0,0,0,0.7)",
          padding: "10px",
          borderRadius: "8px",
          pointerEvents: "none",
          display: "flex",
          alignItems: "flex-start",
          flexDirection: "column",
          gap: "8px",
          border: "1px solid rgba(255,255,255,0.1)",
        }}>
        <h3 style={{ margin: "0 0 5px 0" }}>Legenda de Áreas</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "8px" }}>
          {Object.values(GROUP_CONFIG).map((group, index) => (
            <div key={index} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <span
                style={{
                  display: "inline-block",
                  width: 10,
                  height: 10,
                  background: group.color,
                  borderRadius: "50%",
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
