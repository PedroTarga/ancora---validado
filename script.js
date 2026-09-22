// ═══════════════════════════════════════════════════════════
// DATA LAYER
// ═══════════════════════════════════════════════════════════
const DB = {
  alunos: [
    {id:1,nome:"Lucas Ferreira",turma:"8A",mat:"2024001",nasc:"2012-03-15",resp:"Maria Ferreira",tel:"(15)98765-1234",freq:58,media:4.5,risco:"critical",obs:"Apresenta sinais de isolamento social"},
    {id:2,nome:"Ana Souza",turma:"6B",mat:"2024002",nasc:"2013-07-22",resp:"João Souza",tel:"(15)98765-2345",freq:72,media:6.2,risco:"medium",obs:"Ausências frequentes sem justificativa"},
    {id:3,nome:"Pedro Lima",turma:"7A",mat:"2024003",nasc:"2012-11-08",resp:"Sandra Lima",tel:"(15)98765-3456",freq:91,media:8.7,risco:"normal",obs:"Aluno dedicado e participativo"},
    {id:4,nome:"Mariana Costa",turma:"9A",mat:"2024004",nasc:"2011-04-30",resp:"Roberto Costa",tel:"(15)98765-4567",freq:85,media:7.9,risco:"normal",obs:"Ótima socialização com colegas"},
    {id:5,nome:"Rafael Santos",turma:"8B",mat:"2024005",nasc:"2012-09-12",resp:"Cláudia Santos",tel:"(15)98765-5678",freq:45,media:3.8,risco:"critical",obs:"Comportamento agressivo relatado por professores"},
    {id:6,nome:"Beatriz Oliveira",turma:"7C",mat:"2024006",nasc:"2013-01-25",resp:"Fábio Oliveira",tel:"(15)98765-6789",freq:88,media:8.1,risco:"normal",obs:""},
    {id:7,nome:"Gabriel Alves",turma:"6A",mat:"2024007",nasc:"2013-05-17",resp:"Letícia Alves",tel:"(15)98765-7890",freq:76,media:6.8,risco:"medium",obs:"Dificuldade em matemática"},
    {id:8,nome:"Isabela Rocha",turma:"8A",mat:"2024008",nasc:"2012-08-03",resp:"Nelson Rocha",tel:"(15)98765-8901",freq:93,media:9.2,risco:"normal",obs:""},
    {id:9,nome:"Mateus Carvalho",turma:"7C",mat:"2024009",nasc:"2012-12-20",resp:"Vera Carvalho",tel:"(15)98765-9012",freq:62,media:5.1,risco:"medium",obs:"Tristeza e desmotivação notada"},
    {id:10,nome:"Sofia Barbosa",turma:"9A",mat:"2024010",nasc:"2011-06-14",resp:"Antônio Barbosa",tel:"(15)98765-0123",freq:97,media:9.5,risco:"normal",obs:""},
  ],
  professores: [
    {id:1,nome:"Carla Mendes",disciplina:"Matemática",email:"carla@escola.br",reg:"REG001",turmas:["8A","8B","9A"],alertas:5,ultimo:"Hoje"},
    {id:2,nome:"Paulo Andrade",disciplina:"Português",email:"paulo@escola.br",reg:"REG002",turmas:["7A","7C","8A"],alertas:3,ultimo:"Ontem"},
    {id:3,nome:"Marina Ramos",disciplina:"Ciências",email:"marina@escola.br",reg:"REG003",turmas:["6A","6B","7A"],alertas:2,ultimo:"Há 2 dias"},
    {id:4,nome:"José Teixeira",disciplina:"História",email:"jose@escola.br",reg:"REG004",turmas:["8B","9A"],alertas:1,ultimo:"Há 3 dias"},
  ],
  turmas: [
    {id:1,nome:"6A",serie:"6º Ano",turno:"Matutino",sala:"Sala 01",alunos:32,saude:82},
    {id:2,nome:"6B",serie:"6º Ano",turno:"Vespertino",sala:"Sala 02",alunos:30,saude:75},
    {id:3,nome:"7A",serie:"7º Ano",turno:"Matutino",sala:"Sala 05",alunos:35,saude:88},
    {id:4,nome:"7C",serie:"7º Ano",turno:"Vespertino",sala:"Sala 07",alunos:29,saude:64},
    {id:5,nome:"8A",serie:"8º Ano",turno:"Matutino",sala:"Sala 09",alunos:33,saude:58},
    {id:6,nome:"8B",serie:"8º Ano",turno:"Vespertino",sala:"Sala 10",alunos:31,saude:71},
    {id:7,nome:"9A",serie:"9º Ano",turno:"Matutino",sala:"Sala 12",alunos:38,saude:91},
  ],
  disciplinas: [
    {id:1,nome:"Matemática",turma:"8A",profId:1,ch:5,ano:"2025",area:"Matemática"},
    {id:2,nome:"Português",turma:"8A",profId:2,ch:5,ano:"2025",area:"Linguagens"},
    {id:3,nome:"Ciências",turma:"7A",profId:3,ch:3,ano:"2025",area:"Ciências da Natureza"},
    {id:4,nome:"História",turma:"9A",profId:4,ch:3,ano:"2025",area:"Ciências Humanas"},
    {id:5,nome:"Matemática",turma:"8B",profId:1,ch:5,ano:"2025",area:"Matemática"},
    {id:6,nome:"Português",turma:"7C",profId:2,ch:5,ano:"2025",area:"Linguagens"},
    {id:7,nome:"Ciências",turma:"6A",profId:3,ch:3,ano:"2025",area:"Ciências da Natureza"},
    {id:8,nome:"História",turma:"8B",profId:4,ch:3,ano:"2025",area:"Ciências Humanas"},
    {id:9,nome:"Matemática",turma:"9A",profId:1,ch:5,ano:"2025",area:"Matemática"},
    {id:10,nome:"Português",turma:"6B",profId:2,ch:5,ano:"2025",area:"Linguagens"},
  ],
  notas: [
    {id:1,alunoId:1,aluno:"Lucas Ferreira",turma:"8A",disciplina:"Matemática",tipo:"Prova",nota:4.5,bim:"2º Bimestre",data:"2025-05-10",var:-4.5},
    {id:2,alunoId:2,aluno:"Ana Souza",turma:"6B",disciplina:"Português",tipo:"Trabalho",nota:6.2,bim:"2º Bimestre",data:"2025-05-09",var:-1.8},
    {id:3,alunoId:3,aluno:"Pedro Lima",turma:"7A",disciplina:"Ciências",tipo:"Prova",nota:8.7,bim:"2º Bimestre",data:"2025-05-08",var:+0.5},
    {id:4,alunoId:5,aluno:"Rafael Santos",turma:"8B",disciplina:"Matemática",tipo:"Prova",nota:3.8,bim:"2º Bimestre",data:"2025-05-07",var:-3.2},
    {id:5,alunoId:8,aluno:"Isabela Rocha",turma:"8A",disciplina:"Português",tipo:"Prova",nota:9.2,bim:"2º Bimestre",data:"2025-05-06",var:+0.8},
    {id:6,alunoId:9,aluno:"Mateus Carvalho",turma:"7C",disciplina:"Ciências",tipo:"Exercício",nota:5.1,bim:"2º Bimestre",data:"2025-05-05",var:-2.1},
    {id:7,alunoId:1,aluno:"Lucas Ferreira",turma:"8A",disciplina:"Português",tipo:"Trabalho",nota:5.5,bim:"1º Bimestre",data:"2025-03-10",var:-1.5},
    {id:8,alunoId:7,aluno:"Gabriel Alves",turma:"6A",disciplina:"Matemática",tipo:"Prova",nota:5.8,bim:"2º Bimestre",data:"2025-05-04",var:-1.0},
  ],
  observacoes: [
    {id:1,alunoId:1,aluno:"Lucas Ferreira",texto:"O aluno está cada vez mais isolado em sala. Não interage com os colegas e parece triste e desmotivado.",prio:"high",data:"2025-05-10",termos:["isolado","triste","desmotivado"],prof:"Carla Mendes"},
    {id:2,alunoId:5,aluno:"Rafael Santos",texto:"Rafael apresentou comportamento agressivo durante a aula de hoje, xingando colega e recusando seguir orientações.",prio:"high",data:"2025-05-08",termos:["agressivo"],prof:"Paulo Andrade"},
    {id:3,alunoId:9,aluno:"Mateus Carvalho",texto:"Notei que o Mateus parece bem triste ultimamente e desmotivado. Perguntei se estava bem e desconversou.",prio:"medium",data:"2025-05-06",termos:["triste","desmotivado"],prof:"Marina Ramos"},
    {id:4,alunoId:2,aluno:"Ana Souza",texto:"Ana faltou novamente sem aviso. Quando presente, demonstra cansaço excessivo e falta de atenção.",prio:"medium",data:"2025-05-04",termos:[],prof:"José Teixeira"},
  ],
  encaminhamentos: [
    {id:1,alunoId:1,aluno:"Lucas Ferreira",tipo:"psico",urgencia:"alta",resp:"Psic. Fernanda Cruz",just:"Queda abrupta de rendimento e sinais de isolamento social.",data:"2025-05-10",status:"Em andamento"},
    {id:2,alunoId:5,aluno:"Rafael Santos",tipo:"tutelar",urgencia:"alta",resp:"Conselho Tutelar",just:"Comportamento agressivo reiterado e frequência crítica.",data:"2025-05-08",status:"Pendente"},
  ],
  // Casos = planos de ação por aluno (um por aluno, editável)
  casos: [
    {id:1,alunoId:1,meta:"Recuperar média para 6.0 até o 3º Bimestre",est:"Aulas de reforço 2x/semana. Reunião com família. Acompanhamento psicológico semanal.",prazo:"2025-08-01",status:"ativo",progresso:35,resp:"Ana Coordenadora",updatedAt:"2025-05-10"},
    {id:2,alunoId:5,meta:"Reduzir ocorrências de comportamento agressivo e aumentar frequência para acima de 75%",est:"Atendimento com psicólogo escolar quinzenal. Contato semanal com responsável.",prazo:"2025-07-01",status:"andamento",progresso:20,resp:"Ana Coordenadora",updatedAt:"2025-05-08"},
    {id:3,alunoId:9,meta:"Reverter queda de motivação e elevar frequência",est:"Conversa individual com aluno. Relatório enviado aos pais. Encaminhamento para psicólogo.",prazo:"2025-06-30",status:"andamento",progresso:10,resp:"Ana Coordenadora",updatedAt:"2025-05-06"},
  ],
  laudos: [
    {id:1,alunoId:5,tipo:"TDAH",cid:"F90.0",data:"2024-03-15",medico:"Dr. Carlos Henrique",validade:"anual",obs:"Necessita adaptações no tempo de prova e sala reduzida."},
    {id:2,alunoId:9,tipo:"TEA",cid:"F84.0",data:"2023-11-20",medico:"Dra. Paula Meirelles",validade:"indefinida",obs:"Nível 1 de suporte. Recomendado reforço visual e rotina estruturada."},
  ],
  alertas: [
    {id:1,tipo:"critical",titulo:"Risco Crítico — Lucas Ferreira",desc:"Queda de nota de 9.0 para 4.5 em 3 semanas. Frequência em 58%.",data:"2025-05-10 09:15",lido:false},
    {id:2,tipo:"critical",titulo:"Termos Sensíveis Detectados — Rafael Santos",desc:"Observações contêm: 'agressivo'. Frequência 45% e média 3.8.",data:"2025-05-09 14:22",lido:false},
    {id:3,tipo:"medium",titulo:"5 Faltas Consecutivas — Ana Souza",desc:"Turma 6B sem justificativas. Média caindo para 6.2.",data:"2025-05-08 11:00",lido:false},
    {id:4,tipo:"critical",titulo:"Anomalia Coletiva — Turma 7C",desc:"3 alunos com queda simultânea de desempenho e frequência.",data:"2025-05-07 16:30",lido:false},
    {id:5,tipo:"medium",titulo:"Observação Pedagógica — Mateus Carvalho",desc:"Tristeza e desmotivação relatadas. Recomendado acompanhamento.",data:"2025-05-06 09:45",lido:false},
    {id:6,tipo:"low",titulo:"Queda Moderada — Gabriel Alves",desc:"Média caiu 1.0 ponto este bimestre.",data:"2025-05-05 13:00",lido:true},
    {id:7,tipo:"low",titulo:"Frequência Abaixo de 75% — Ana Souza",desc:"Responsável notificado.",data:"2025-05-03 08:30",lido:true},
  ],
  freqData: {
    "8A": [
      {id:1,nome:"Lucas Ferreira",status:"absent"},
      {id:8,nome:"Isabela Rocha",status:"present"},
    ]
  }
};

// ═══════════════════════════════════════════════════════════
// RBAC — Permissões por papel
// ═══════════════════════════════════════════════════════════
const RBAC = {
  gestor:    { verAlunos:true,  editarAlunos:true,  verProfs:true,  editarProfs:true,  verDisc:true,  editarDisc:true,  verLaudos:true,  editarLaudos:true,  verCasos:true,  editarCasos:true,  verEnc:true,  editarEnc:true,  verRel:true,   verLGPD:true  },
  professor: { verAlunos:true,  editarAlunos:false, verProfs:false, editarProfs:false, verDisc:true,  editarDisc:false, verLaudos:false, editarLaudos:false, verCasos:false, editarCasos:false, verEnc:false, editarEnc:false, verRel:false,  verLGPD:false },
  psicologo: { verAlunos:true,  editarAlunos:false, verProfs:false, editarProfs:false, verDisc:false, editarDisc:false, verLaudos:true,  editarLaudos:true,  verCasos:true,  editarCasos:true,  verEnc:true,  editarEnc:true,  verRel:false,  verLGPD:false },
  pais:      { verAlunos:false, editarAlunos:false, verProfs:false, editarProfs:false, verDisc:false, editarDisc:false, verLaudos:false, editarLaudos:false, verCasos:false, editarCasos:false, verEnc:false, editarEnc:false, verRel:false,  verLGPD:false },
};

// ═══════════════════════════════════════════════════════════
// ESTADO GLOBAL
// ═══════════════════════════════════════════════════════════
let currentUser = { role:'gestor', nome:'Ana Coordenadora', profId:null, alunoId:null, turmas:[] };
let chartsCreated = {};
let alunosFiltrados = [...DB.alunos];

// ═══════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════
const avatarColors = ['td-avatar-blue','td-avatar-green','td-avatar-purple','td-avatar-amber','td-avatar-red'];
function getAvatarColor(id) { return avatarColors[id % avatarColors.length]; }
function getInitials(nome) { return nome.split(' ').slice(0,2).map(n=>n[0]).join(''); }

function calcIAIndex(a) {
  let score = 100;
  if(a.freq < 70) score -= 30; else if(a.freq < 85) score -= 15;
  if(a.media < 5) score -= 35; else if(a.media < 7) score -= 15;
  if(a.obs && /isolado|agressiv|triste|desmotivad/i.test(a.obs)) score -= 20;
  return Math.max(5, score);
}

function detectNLP(texto) {
  const sensivel = ['isolado','isolada','agressiv','triste','desmotivad','chorando','brigou','xingou','desapareceu','recusa','apático','apática','ameaçou','machucou','abusado'];
  return sensivel.filter(t => texto.toLowerCase().includes(t));
}

function perm(key) { return RBAC[currentUser.role]?.[key] === true; }

function getAlunosVisiveis() {
  if(currentUser.role === 'professor') return DB.alunos.filter(a => currentUser.turmas.includes(a.turma));
  if(currentUser.role === 'pais') return DB.alunos.filter(a => a.id === currentUser.alunoId);
  return DB.alunos;
}

function getDiscNomes() {
  return [...new Set(DB.disciplinas.map(d => d.nome))].sort();
}

// ═══════════════════════════════════════════════════════════
// AUTH
// ═══════════════════════════════════════════════════════════
function onLoginRoleChange(role) {
  document.getElementById('login-prof-row').style.display = role === 'professor' ? 'block' : 'none';
  document.getElementById('login-pais-row').style.display = role === 'pais' ? 'block' : 'none';
}

function doLogin() {
  const role = document.getElementById('loginRole').value;
  chartsCreated = {};
  let nome = 'Ana Coordenadora', profId = null, alunoId = null, turmas = [];

  if(role === 'professor') {
    const pid = parseInt(document.getElementById('loginProfId').value);
    const p = DB.professores.find(x => x.id === pid);
    nome = p ? p.nome : 'Professor';
    profId = pid;
    turmas = p ? [...p.turmas] : [];
  } else if(role === 'pais') {
    const aid = parseInt(document.getElementById('loginAlunoId').value);
    const a = DB.alunos.find(x => x.id === aid);
    nome = a ? a.resp : 'Responsável';
    alunoId = aid;
  } else if(role === 'psicologo') {
    nome = 'Dra. Fernanda Cruz';
  } else {
    nome = 'Ana Coordenadora';
  }

  currentUser = { role, nome, profId, alunoId, turmas };
  document.getElementById('sidebar-name').textContent = nome;
  document.getElementById('sidebar-role').textContent =
    role==='gestor' ? 'Gestão / Coordenação' :
    role==='professor' ? 'Docente' :
    role==='psicologo' ? 'Profissional de Apoio' : 'Responsável';
  document.getElementById('sidebar-avatar').textContent = nome[0];
  document.getElementById('login-screen').classList.add('hidden');
  document.getElementById('app').classList.add('visible');

  // Ocultar itens de menu conforme RBAC
  applyMenuRBAC();

  setTimeout(() => {
    initApp();
    showToast('Bem-vindo(a), ' + nome + '!', 'success');
  }, 600);
}

function applyMenuRBAC() {
  const role = currentUser.role;
  // Professores: sem módulos administrativos
  const hideForProf = ['professores','disciplinas-link','turmas','alertas','encaminhamentos','casos','laudos','relatorios','lgpd'];
  // Pais: somente avaliações e frequência do filho
  const showForPais = ['avaliacoes'];

  document.querySelectorAll('.nav-item').forEach(el => {
    const txt = el.textContent.trim().toLowerCase();
    if(role === 'professor') {
      if(txt.includes('professor') || txt.includes('disciplina') || txt.includes('alerta') ||
         txt.includes('encaminhamento') || txt.includes('acompanhamento') || txt.includes('laudo') ||
         txt.includes('relatório') || txt.includes('lgpd') || txt.includes('segurança')) {
        el.style.display = 'none';
      }
    } else if(role === 'pais') {
      if(!txt.includes('avalia') && !txt.includes('dashboard')) {
        el.style.display = 'none';
      }
    } else {
      el.style.display = '';
    }
  });
}

function doLogout() {
  document.getElementById('app').classList.remove('visible');
  document.getElementById('login-screen').classList.remove('hidden');
  document.getElementById('loginRole').value = 'gestor';
  document.getElementById('login-prof-row').style.display = 'none';
  document.getElementById('login-pais-row').style.display = 'none';
  // Restaurar visibilidade de todos itens de menu
  document.querySelectorAll('.nav-item').forEach(el => el.style.display = '');
  chartsCreated = {};
  alunosFiltrados = [...DB.alunos];
}

// ═══════════════════════════════════════════════════════════
// NAVEGAÇÃO
// ═══════════════════════════════════════════════════════════
const viewTitles = {
  dashboard:        ['Dashboard', 'Visão geral · Saúde Escolar'],
  alunos:           ['Gestão de Alunos', 'CRUD completo · Monitoramento individual'],
  professores:      ['Professores', 'Equipe docente'],
  disciplinas:      ['Disciplinas', 'Cadastro e vínculo com turmas e professores'],
  turmas:           ['Turmas', 'Gestão das turmas da escola'],
  frequencia:       ['Frequência', 'Registro por turma, disciplina e período'],
  avaliacoes:       ['Avaliações', 'Consulta por aluno · Notas e observações'],
  alertas:          ['Central de Alertas', 'Situações que requerem intervenção'],
  encaminhamentos:  ['Encaminhamentos', 'Psicólogos · Conselho Tutelar · Família'],
  casos:            ['Acompanhamento de Casos', 'Planos de ação por aluno'],
  laudos:           ['Laudos', 'Documentos médicos e psicológicos'],
  relatorios:       ['Relatórios', 'Geração automática · Conselho de classe'],
  lgpd:             ['Segurança & LGPD', 'Conformidade · Criptografia · Anonimização'],
};

function showView(view) {
  // Bloquear acesso não autorizado
  if(view === 'professores' && !perm('verProfs'))   { showToast('Acesso não autorizado.','danger'); return; }
  if(view === 'laudos'      && !perm('verLaudos'))  { showToast('Acesso restrito por LGPD.','danger'); return; }
  if(view === 'casos'       && !perm('verCasos'))   { showToast('Acesso não autorizado.','danger'); return; }
  if(view === 'relatorios'  && !perm('verRel'))     { showToast('Acesso não autorizado.','danger'); return; }
  if(view === 'lgpd'        && !perm('verLGPD'))    { showToast('Acesso não autorizado.','danger'); return; }

  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  const el = document.getElementById('view-' + view);
  if(!el) { showToast('Módulo não disponível.','warning'); return; }
  el.classList.add('active');

  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => {
    const txt = n.textContent.toLowerCase();
    const vt  = (viewTitles[view]||['',''])[0].toLowerCase();
    if(txt.includes(vt.split(' ')[0])) n.classList.add('active');
    else n.classList.remove('active');
  });

  document.getElementById('topbarTitle').textContent = (viewTitles[view]||[view,''])[0];
  document.getElementById('topbarSub').textContent   = (viewTitles[view]||['',''])[1];
  renderView(view);
}

function renderView(view) {
  switch(view) {
    case 'dashboard':       renderDashboard();       break;
    case 'alunos':          renderAlunos();          break;
    case 'professores':     renderProfessores();     break;
    case 'disciplinas':     renderDisciplinas();     break;
    case 'turmas':          renderTurmas();          break;
    case 'frequencia':      renderFrequencia();      break;
    case 'avaliacoes':      renderAvaliacoes();      break;
    case 'alertas':         renderAlertas();         break;
    case 'encaminhamentos': renderEncaminhamentos(); break;
    case 'casos':           renderCasos();           break;
    case 'laudos':          renderLaudos();          break;
    case 'relatorios':      renderRelatorios();      break;
    case 'lgpd':            renderLGPD();            break;
  }
}

function initApp() {
  // Preencher datas padrão
  const hoje = new Date().toISOString().slice(0,10);
  const semAnt = new Date(Date.now()-7*864e5).toISOString().slice(0,10);
  if(document.getElementById('freqDataIni')) document.getElementById('freqDataIni').value = semAnt;
  if(document.getElementById('freqDataFim')) document.getElementById('freqDataFim').value = hoje;
  if(document.getElementById('n-data')) document.getElementById('n-data').valueAsDate = new Date();
  if(document.getElementById('laud-data')) document.getElementById('laud-data').value = hoje;

  renderDashboard();
  popularSelects();
}

// ═══════════════════════════════════════════════════════════
// SELECTS GLOBAIS
// ═══════════════════════════════════════════════════════════
function popularSelects() {
  const alunos = getAlunosVisiveis();

  // Aluno nos modals
  ['n-aluno','o-aluno','enc-aluno','laud-aluno'].forEach(id => {
    const s = document.getElementById(id); if(!s) return;
    s.innerHTML = alunos.map(a => `<option value="${a.id}">${a.nome} · ${a.turma} · RA: ${a.mat}</option>`).join('');
  });

  // Professor no modal disciplina
  const dp = document.getElementById('disc-prof');
  if(dp) dp.innerHTML = '<option value="">Selecione…</option>' + DB.professores.map(p => `<option value="${p.id}">${p.nome} — ${p.disciplina}</option>`).join('');

  // Disciplinas nos filtros
  const discNames = getDiscNomes();
  ['avalDiscFiltro','freqDisc'].forEach(id => {
    const s = document.getElementById(id); if(!s) return;
    const base = id === 'freqDisc' ? '<option value="">Todas as disciplinas</option>' : '<option value="">Todas</option>';
    s.innerHTML = base + discNames.map(d => `<option value="${d}">${d}</option>`).join('');
  });

  // Turmas filtro avaliações
  const at = document.getElementById('avalTurmaFiltro');
  if(at) {
    at.innerHTML = '<option value="">Todas</option>' + DB.turmas.map(t => `<option>${t.nome}</option>`).join('');
  }

  // Alunos filtro avaliações (geral inicialmente)
  filtrarAvalAlunos();

  // Histórico aluno
  const hs = document.getElementById('historicoAlunoSelect');
  if(hs) hs.innerHTML = '<option value="">Selecione um aluno</option>' + alunos.map(a=>`<option value="${a.id}">${a.nome}</option>`).join('');
}

// ═══════════════════════════════════════════════════════════
// DASHBOARD
// ═══════════════════════════════════════════════════════════
function renderDashboard() {
  renderTurmaRanking();
  setTimeout(() => { createHealthDonut(); createMainChart(); createRiskPie(); }, 50);
}

function renderTurmaRanking() {
  const el = document.getElementById('turmaRanking'); if(!el) return;
  const sorted = [...DB.turmas].sort((a,b) => a.saude - b.saude);
  el.innerHTML = sorted.map(t => `
    <div style="margin-bottom:14px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
        <span style="font-size:13px;font-weight:700">${t.nome} · ${t.serie}</span>
        <span style="font-size:12px;font-weight:700;color:${t.saude<65?'var(--red)':t.saude<80?'var(--amber)':'var(--green)'}">${t.saude}%</span>
      </div>
      <div class="progress-bar"><div class="progress-fill ${t.saude<65?'red':t.saude<80?'amber':'green'}" style="width:${t.saude}%"></div></div>
      <div style="font-size:11px;color:var(--text-muted);margin-top:4px">${t.alunos} alunos · ${t.turno}</div>
    </div>`).join('');
}

function createHealthDonut() {
  const ctx = document.getElementById('healthDonut'); if(!ctx||chartsCreated.healthDonut) return;
  chartsCreated.healthDonut = new Chart(ctx, { type:'doughnut', data:{ datasets:[{data:[74,26],backgroundColor:['#FCD34D','rgba(255,255,255,0.1)'],borderWidth:0}]}, options:{cutout:'80%',plugins:{legend:{display:false}},responsive:false}});
}
function createMainChart() {
  const ctx = document.getElementById('mainChart'); if(!ctx||chartsCreated.mainChart) return;
  chartsCreated.mainChart = new Chart(ctx, {
    type:'line', data:{labels:['Dez','Jan','Fev','Mar','Abr','Mai'],
    datasets:[
      {label:'Média Geral',data:[7.8,7.5,7.2,6.9,6.7,7.1],borderColor:'#2563EB',backgroundColor:'rgba(37,99,235,0.08)',fill:true,tension:0.4,pointRadius:5,pointBackgroundColor:'#2563EB'},
      {label:'Frequência %',data:[94,91,89,87,85,88],borderColor:'#10B981',backgroundColor:'rgba(16,185,129,0.05)',fill:true,tension:0.4,pointRadius:5,pointBackgroundColor:'#10B981'},
    ]},
    options:{responsive:true,plugins:{legend:{position:'bottom',labels:{font:{family:'Nunito'},boxWidth:12,padding:16}}},scales:{y:{min:60,grid:{color:'rgba(0,0,0,0.05)'}},x:{grid:{display:false}}}}
  });
}
function createRiskPie() {
  const ctx = document.getElementById('riskPie'); if(!ctx||chartsCreated.riskPie) return;
  chartsCreated.riskPie = new Chart(ctx, { type:'doughnut', data:{labels:['Normal','Moderado','Crítico'],datasets:[{data:[277,37,14],backgroundColor:['#10B981','#F59E0B','#EF4444'],borderWidth:3,borderColor:'#fff'}]}, options:{responsive:false,plugins:{legend:{display:false}}}});
}

// ═══════════════════════════════════════════════════════════
// ALUNOS
// ═══════════════════════════════════════════════════════════
function renderAlunos(list) {
  const canEdit = perm('editarAlunos');
  const data = list || alunosFiltrados;
  document.getElementById('alunosCount').textContent = data.length + ' aluno(s)';
  const tbody = document.getElementById('alunosTable'); if(!tbody) return;

  // Mostrar/esconder botão novo aluno conforme RBAC
  const btnNovo = document.querySelector('#view-alunos .btn-primary');
  if(btnNovo) btnNovo.style.display = canEdit ? '' : 'none';

  tbody.innerHTML = data.map(a => {
    const rc  = a.risco==='critical'?'critical':a.risco==='medium'?'medium':'normal';
    const rl  = a.risco==='critical'?'🔴 Crítico':a.risco==='medium'?'🟡 Moderado':'🟢 Normal';
    const fc  = a.freq<70?'var(--red)':a.freq<85?'var(--amber)':'var(--green)';
    const mc  = a.media<5?'var(--red)':a.media<7?'var(--amber)':'var(--green)';
    const ia  = calcIAIndex(a);
    const iac = a.risco==='critical'?'critical':a.risco==='medium'?'medium':'low';
    return `<tr>
      <td><div class="td-name"><div class="td-avatar ${getAvatarColor(a.id)}">${getInitials(a.nome)}</div>
        <div><div style="font-weight:700;font-size:13.5px">${a.nome}</div>
        <div style="font-size:11px;color:var(--text-muted)">RA: ${a.mat} · ${a.resp}</div></div></div></td>
      <td><span class="tag blue">${a.turma}</span></td>
      <td style="font-size:12px;color:var(--text-muted)">${a.mat}</td>
      <td><span style="font-weight:700;color:${fc}">${a.freq}%</span></td>
      <td><span style="font-weight:700;color:${mc}">${a.media.toFixed(1)}</span></td>
      <td><div class="ai-score ${iac}" style="width:46px;height:46px"><div class="ai-score-val" style="font-size:15px">${ia}</div><div class="ai-score-label">IDX</div></div></td>
      <td><span class="risk-badge ${rc}">${rl}</span></td>
      <td><div style="display:flex;gap:6px">
        <button class="btn btn-ghost btn-sm btn-icon" onclick="showAlunoDetalhe(${a.id})" title="Ver detalhes">👁️</button>
        ${canEdit?`<button class="btn btn-ghost btn-sm btn-icon" onclick="editAluno(${a.id})" title="Editar">✏️</button>
        <button class="btn btn-ghost btn-sm btn-icon" style="color:var(--red)" onclick="deleteAluno(${a.id})" title="Excluir">🗑️</button>`:''}
      </div></td>
    </tr>`;
  }).join('') || '<tr><td colspan="8"><div class="empty-state"><div class="empty-state-icon">🔍</div><p>Nenhum aluno encontrado.</p></div></td></tr>';
}

function filterAlunos(val) {
  const base = getAlunosVisiveis();
  alunosFiltrados = base.filter(a => a.nome.toLowerCase().includes(val.toLowerCase()) || a.mat.includes(val));
  renderAlunos();
}
function filterAlunosTurma(turma) {
  const base = getAlunosVisiveis();
  alunosFiltrados = turma ? base.filter(a => a.turma===turma) : [...base];
  renderAlunos();
}
function filterAlunosRisco(risco) {
  const base = getAlunosVisiveis();
  alunosFiltrados = risco ? base.filter(a => a.risco===risco) : [...base];
  renderAlunos();
}

function saveAluno() {
  if(!perm('editarAlunos')) { showToast('Sem permissão.','danger'); return; }
  const nome = document.getElementById('a-nome').value.trim();
  if(!nome) { showToast('Nome é obrigatório!','danger'); return; }
  DB.alunos.push({ id:DB.alunos.length+1, nome, turma:document.getElementById('a-turma').value,
    mat:'2025'+String(DB.alunos.length+1).padStart(3,'0'),
    nasc:document.getElementById('a-nasc').value, resp:document.getElementById('a-resp').value,
    tel:document.getElementById('a-tel').value, freq:100, media:0, risco:'normal',
    obs:document.getElementById('a-obs').value });
  alunosFiltrados = [...getAlunosVisiveis()];
  closeModal('modal-aluno'); renderAlunos(); popularSelects();
  showToast('Aluno '+ nome +' cadastrado!','success');
  ['a-nome','a-nasc','a-resp','a-tel','a-obs'].forEach(id=>document.getElementById(id).value='');
}
function deleteAluno(id) {
  if(!perm('editarAlunos')) { showToast('Sem permissão.','danger'); return; }
  if(!confirm('Excluir este aluno? Esta ação não pode ser desfeita.')) return;
  const idx = DB.alunos.findIndex(a=>a.id===id);
  if(idx>-1){ DB.alunos.splice(idx,1); alunosFiltrados=[...getAlunosVisiveis()]; renderAlunos(); showToast('Aluno removido.','warning'); }
}
function editAluno(id) {
  if(!perm('editarAlunos')) { showToast('Sem permissão.','danger'); return; }
  const a = DB.alunos.find(x=>x.id===id); if(!a) return;
  document.getElementById('a-nome').value = a.nome; document.getElementById('a-turma').value = a.turma;
  document.getElementById('a-resp').value = a.resp; document.getElementById('a-tel').value = a.tel;
  document.getElementById('a-obs').value = a.obs; openModal('modal-aluno');
}

function showAlunoDetalhe(id) {
  const a = DB.alunos.find(x=>x.id===id); if(!a) return;
  const notas = DB.notas.filter(n=>n.alunoId===id);
  const obs   = DB.observacoes.filter(o=>o.alunoId===id);
  const laudo = DB.laudos.filter(l=>l.alunoId===id);
  const rc    = a.risco==='critical'?'critical':a.risco==='medium'?'medium':'normal';
  document.getElementById('alunoDetalheContent').innerHTML = `
    <div style="display:flex;align-items:center;gap:16px;margin-bottom:20px">
      <div class="td-avatar ${getAvatarColor(a.id)}" style="width:56px;height:56px;font-size:20px;border-radius:16px">${getInitials(a.nome)}</div>
      <div><div style="font-family:'Sora',sans-serif;font-size:20px;font-weight:800">${a.nome}</div>
        <div style="font-size:13px;color:var(--text-muted)">Turma ${a.turma} · RA: ${a.mat} · ${a.resp} · ${a.tel}</div>
        ${laudo.length?`<div style="margin-top:6px">${laudo.map(l=>`<span class="tag amber">📎 ${l.tipo}</span>`).join(' ')}</div>`:''}
      </div>
      <div style="margin-left:auto"><span class="risk-badge ${rc}" style="font-size:13px;padding:6px 14px">
        ${a.risco==='critical'?'🔴 Risco Crítico':a.risco==='medium'?'🟡 Atenção Moderada':'🟢 Normal'}</span></div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-bottom:20px">
      <div style="text-align:center;padding:14px;background:var(--gray-50);border-radius:10px">
        <div style="font-family:'Sora',sans-serif;font-size:28px;font-weight:800;color:${a.freq<70?'var(--red)':a.freq<85?'var(--amber)':'var(--green)'}">${a.freq}%</div>
        <div style="font-size:11px;color:var(--text-muted);font-weight:700;text-transform:uppercase;letter-spacing:0.5px">Frequência</div>
      </div>
      <div style="text-align:center;padding:14px;background:var(--gray-50);border-radius:10px">
        <div style="font-family:'Sora',sans-serif;font-size:28px;font-weight:800;color:${a.media<5?'var(--red)':a.media<7?'var(--amber)':'var(--green)'}">${a.media.toFixed(1)}</div>
        <div style="font-size:11px;color:var(--text-muted);font-weight:700;text-transform:uppercase;letter-spacing:0.5px">Média Geral</div>
      </div>
      <div style="text-align:center;padding:14px;background:var(--gray-50);border-radius:10px">
        <div style="font-family:'Sora',sans-serif;font-size:28px;font-weight:800;color:var(--blue)">${calcIAIndex(a)}</div>
        <div style="font-size:11px;color:var(--text-muted);font-weight:700;text-transform:uppercase;letter-spacing:0.5px">Índice</div>
      </div>
    </div>
    ${notas.length?`<div style="margin-bottom:16px"><div style="font-weight:700;font-size:13px;margin-bottom:8px;color:var(--text-muted)">AVALIAÇÕES RECENTES</div>${notas.slice(0,5).map(n=>`<div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--gray-100);font-size:13px"><span>${n.disciplina} · ${n.tipo} · ${n.bim}</span><span style="font-weight:700;color:${n.nota<5?'var(--red)':n.nota<7?'var(--amber)':'var(--green)'}">${n.nota}</span></div>`).join('')}</div>`:''}
    ${obs.length?`<div><div style="font-weight:700;font-size:13px;margin-bottom:8px;color:var(--text-muted)">OBSERVAÇÕES</div>${obs.map(o=>`<div style="padding:10px;background:${o.prio==='high'?'var(--red-pale)':'var(--amber-pale)'};border-radius:8px;margin-bottom:8px;font-size:13px">${o.texto}<div style="font-size:11px;color:var(--text-muted);margin-top:4px">${o.prof} · ${o.data}</div></div>`).join('')}</div>`:''}
  `;
  openModal('modal-aluno-detalhe');
}

function abrirCasoDoDetalhe() {
  // Recuperar id do aluno a partir do conteúdo renderizado
  const txt = document.getElementById('alunoDetalheContent').querySelector('[style*="font-size:28px"]');
  // Abrir modal de casos — usuário precisará buscar o aluno nos casos
  closeModal('modal-aluno-detalhe');
  showView('casos');
}

// ═══════════════════════════════════════════════════════════
// PROFESSORES (somente gestor)
// ═══════════════════════════════════════════════════════════
function renderProfessores() {
  const tbody = document.getElementById('professoresTable'); if(!tbody) return;
  const canEdit = perm('editarProfs');
  tbody.innerHTML = DB.professores.map(p => `<tr>
    <td><div class="td-name"><div class="td-avatar td-avatar-blue">${getInitials(p.nome)}</div>
      <div><div style="font-weight:700">${p.nome}</div><div style="font-size:11px;color:var(--text-muted)">${p.email}</div></div></div></td>
    <td><span class="tag blue">${p.disciplina}</span></td>
    <td>${p.turmas.map(t=>`<span class="tag gray" style="margin:1px">${t}</span>`).join('')}</td>
    <td><span class="tag ${p.alertas>3?'red':p.alertas>1?'amber':'green'}">${p.alertas} alertas</span></td>
    <td style="font-size:12px;color:var(--text-muted)">${p.ultimo}</td>
    <td><div style="display:flex;gap:6px">
      ${canEdit?`<button class="btn btn-ghost btn-sm btn-icon">✏️</button>
      <button class="btn btn-ghost btn-sm btn-icon" style="color:var(--red)" onclick="deleteProfessor(${p.id})">🗑️</button>`:'<span style="font-size:12px;color:var(--text-muted)">Somente leitura</span>'}
    </div></td>
  </tr>`).join('');
  // Botão novo professor visível somente ao gestor
  const btnNovoProfEl = document.querySelector('#view-professores .page-header-actions');
  if(btnNovoProfEl) btnNovoProfEl.style.display = canEdit ? '' : 'none';
}

function saveProfessor() {
  if(!perm('editarProfs')) { showToast('Sem permissão.','danger'); return; }
  const nome = document.getElementById('p-nome').value.trim();
  if(!nome) { showToast('Nome é obrigatório!','danger'); return; }
  DB.professores.push({id:DB.professores.length+1,nome,disciplina:document.getElementById('p-disc').value,email:document.getElementById('p-email').value,reg:document.getElementById('p-reg').value,turmas:[],alertas:0,ultimo:'Hoje'});
  closeModal('modal-professor'); renderProfessores(); popularSelects();
  showToast('Professor '+nome+' cadastrado!','success');
}
function deleteProfessor(id) {
  if(!perm('editarProfs')) { showToast('Sem permissão.','danger'); return; }
  DB.professores.splice(DB.professores.findIndex(p=>p.id===id),1);
  renderProfessores(); showToast('Professor removido.','warning');
}

// ═══════════════════════════════════════════════════════════
// DISCIPLINAS
// ═══════════════════════════════════════════════════════════
function renderDisciplinas() {
  const canEdit = perm('editarDisc');
  const el = document.getElementById('disciplinasBody'); if(!el) return;

  if(!canEdit) {
    el.innerHTML = `<div class="rbac-notice">🔒 Você tem acesso somente de leitura às disciplinas cadastradas.</div>`;
  }

  // Agrupar por turma
  const byTurma = {};
  DB.disciplinas.forEach(d => { if(!byTurma[d.turma]) byTurma[d.turma] = []; byTurma[d.turma].push(d); });

  el.innerHTML += Object.keys(byTurma).sort().map(turma => `
    <div class="card" style="margin-bottom:16px">
      <div class="card-header">
        <div><h3>Turma ${turma}</h3><div class="card-subtitle">${byTurma[turma].length} disciplina(s) cadastrada(s)</div></div>
      </div>
      <div class="card-body">
        <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:12px">
          ${byTurma[turma].map(d => {
            const prof = DB.professores.find(p=>p.id===d.profId);
            return `<div class="disc-chip">
              ${d.nome} <span style="opacity:.6;font-size:11px">· ${d.ch}h · ${prof?prof.nome:'—'}</span>
              ${canEdit?`<button onclick="deleteDisciplina(${d.id})" title="Remover">×</button>`:''}
            </div>`;
          }).join('')}
        </div>
        <div style="font-size:12px;color:var(--text-muted)">
          Área(s): ${[...new Set(byTurma[turma].map(d=>d.area))].join(' · ')}
        </div>
      </div>
    </div>`).join('');
}

function saveDisciplina() {
  if(!perm('editarDisc')) { showToast('Sem permissão.','danger'); return; }
  const nome = document.getElementById('disc-nome').value.trim();
  if(!nome) { showToast('Nome da disciplina é obrigatório!','danger'); return; }
  DB.disciplinas.push({
    id: DB.disciplinas.length+1, nome,
    turma: document.getElementById('disc-turma').value,
    profId: parseInt(document.getElementById('disc-prof').value)||null,
    ch: parseInt(document.getElementById('disc-ch').value)||1,
    ano: document.getElementById('disc-ano').value||'2025',
    area: document.getElementById('disc-area').value,
  });
  closeModal('modal-disciplina');
  // Atualizar selects de disciplina
  popularSelects();
  renderDisciplinas();
  showToast('Disciplina '+nome+' cadastrada!','success');
  ['disc-nome','disc-ch','disc-ano'].forEach(id=>document.getElementById(id).value='');
}
function deleteDisciplina(id) {
  if(!perm('editarDisc')) return;
  if(!confirm('Remover esta disciplina?')) return;
  const idx = DB.disciplinas.findIndex(d=>d.id===id);
  if(idx>-1){ DB.disciplinas.splice(idx,1); renderDisciplinas(); popularSelects(); showToast('Disciplina removida.','warning'); }
}

// ═══════════════════════════════════════════════════════════
// TURMAS
// ═══════════════════════════════════════════════════════════
function renderTurmas() {
  const el = document.getElementById('turmasCards'); if(!el) return;
  el.parentElement.innerHTML = `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:16px">${
    DB.turmas.map(t => {
      const color = t.saude<65?'red':t.saude<80?'amber':'green';
      const discs = DB.disciplinas.filter(d=>d.nome && d.turma===t.nome).length;
      return `<div class="card stat-card ${color}" style="cursor:pointer" onclick="showView('alunos');filterAlunosTurma('${t.nome}')">
        <div style="display:flex;justify-content:space-between;align-items:flex-start">
          <div style="font-family:'Sora',sans-serif;font-size:24px;font-weight:800">${t.nome}</div>
          <span class="tag ${color}">${t.saude}%</span>
        </div>
        <div style="font-size:12px;color:var(--text-muted)">${t.serie} · ${t.turno}</div>
        <div style="margin:12px 0"><div class="progress-bar"><div class="progress-fill ${color}" style="width:${t.saude}%"></div></div></div>
        <div style="display:flex;justify-content:space-between;font-size:12px;color:var(--text-muted)">
          <span>👥 ${t.alunos} alunos</span><span>📚 ${discs} disc.</span><span>${t.sala}</span>
        </div>
      </div>`;
    }).join('')
  }</div>`;
}
function saveTurma() {
  const nome = document.getElementById('t-nome').value.trim();
  if(!nome){ showToast('Nome é obrigatório!','danger'); return; }
  DB.turmas.push({id:DB.turmas.length+1,nome,serie:document.getElementById('t-serie').value,turno:document.getElementById('t-turno').value,sala:document.getElementById('t-sala').value,alunos:0,saude:100});
  closeModal('modal-turma'); renderTurmas(); showToast('Turma '+nome+' criada!','success');
}

// ═══════════════════════════════════════════════════════════
// FREQUÊNCIA (turma + disciplina + período)
// ═══════════════════════════════════════════════════════════
function loadFreqTurma() { renderFrequencia(); }
function renderFrequencia() {
  const turma = document.getElementById('freqTurma')?.value||'8A';
  const disc  = document.getElementById('freqDisc')?.value||'';
  const ini   = document.getElementById('freqDataIni')?.value||'';
  const fim   = document.getElementById('freqDataFim')?.value||'';

  document.getElementById('freqTurmaLabel').textContent = turma;
  const discLabel = disc ? ` · ${disc}` : ' · Todas as disciplinas';
  const perLabel  = (ini && fim) ? ` · ${ini} até ${fim}` : '';
  const pl = document.getElementById('freqPeriodoLabel');
  if(pl) pl.textContent = turma + discLabel + perLabel;

  const lista = DB.freqData[turma] || generateFreqList(turma);
  DB.freqData[turma] = lista;
  const el = document.getElementById('freqList'); if(!el) return;

  el.innerHTML = lista.map(aluno => `
    <div style="display:flex;align-items:center;gap:14px;padding:12px 20px;border-bottom:1px solid var(--gray-100)">
      <div class="td-avatar ${getAvatarColor(aluno.id)}" style="width:36px;height:36px">${getInitials(aluno.nome)}</div>
      <div style="flex:1">
        <div style="font-size:13.5px;font-weight:600">${aluno.nome}</div>
        <div style="font-size:11px;color:var(--text-muted)">RA: ${DB.alunos.find(a=>a.id===aluno.id)?.mat||'—'}</div>
      </div>
      <div style="display:flex;gap:6px">
        <button class="btn btn-sm ${aluno.status==='present'?'btn-success':'btn-ghost'}" onclick="setFreq(${aluno.id},'${turma}','present')">✓ Presente</button>
        <button class="btn btn-sm ${aluno.status==='absent'?'btn-danger':'btn-ghost'}" onclick="setFreq(${aluno.id},'${turma}','absent')">✗ Falta</button>
        <button class="btn btn-sm ${aluno.status==='justified'?'btn-amber':'btn-ghost'}" onclick="setFreq(${aluno.id},'${turma}','justified')">📄 Justif.</button>
      </div>
    </div>`).join('');

  renderFreqSummary(lista);
  createFreqChart();
}
function generateFreqList(turma) {
  return DB.alunos.filter(a=>a.turma===turma).map(a=>({id:a.id,nome:a.nome,status:'present'}));
}
function setFreq(id,turma,status) {
  const item = DB.freqData[turma]?.find(x=>x.id===id);
  if(item){ item.status=status; renderFrequencia(); }
}
function renderFreqSummary(lista) {
  const p=lista.filter(x=>x.status==='present').length,
        a=lista.filter(x=>x.status==='absent').length,
        j=lista.filter(x=>x.status==='justified').length,
        tot=lista.length||1;
  document.getElementById('freqSummary').innerHTML = `
    <div style="display:flex;flex-direction:column;gap:10px">
      <div style="display:flex;justify-content:space-between"><span style="font-size:13px;color:var(--text-muted)">Total</span><strong>${tot}</strong></div>
      <div style="display:flex;justify-content:space-between"><span style="font-size:13px;color:var(--green)">✓ Presentes</span><strong style="color:var(--green)">${p}</strong></div>
      <div style="display:flex;justify-content:space-between"><span style="font-size:13px;color:var(--red)">✗ Ausentes</span><strong style="color:var(--red)">${a}</strong></div>
      <div style="display:flex;justify-content:space-between"><span style="font-size:13px;color:var(--amber)">📄 Justificados</span><strong style="color:var(--amber)">${j}</strong></div>
      <div class="progress-bar" style="margin-top:4px"><div class="progress-fill ${(p/tot*100)>85?'green':'amber'}" style="width:${(p/tot*100).toFixed(0)}%"></div></div>
      <div style="font-size:12px;font-weight:700">${(p/tot*100).toFixed(0)}% de presença</div>
    </div>`;
}
function createFreqChart() {
  const ctx = document.getElementById('freqChart'); if(!ctx) return;
  if(chartsCreated.freqChart){ chartsCreated.freqChart.destroy(); delete chartsCreated.freqChart; }
  chartsCreated.freqChart = new Chart(ctx,{type:'bar',data:{labels:['Sem 1','Sem 2','Sem 3','Sem 4'],datasets:[{label:'Presença %',data:[92,88,85,87],backgroundColor:'rgba(16,185,129,0.7)',borderRadius:6}]},options:{responsive:true,plugins:{legend:{display:false}},scales:{y:{min:70,max:100,grid:{color:'rgba(0,0,0,0.05)'}},x:{grid:{display:false}}}}});
}
function saveFrequencia() { showToast('Frequência salva com sucesso!','success'); }

// ═══════════════════════════════════════════════════════════
// AVALIAÇÕES — Consulta por aluno
// ═══════════════════════════════════════════════════════════
function filtrarAvalAlunos() {
  const turma = document.getElementById('avalTurmaFiltro')?.value||'';
  const base  = getAlunosVisiveis();
  const lista = turma ? base.filter(a=>a.turma===turma) : base;
  const sel   = document.getElementById('avalAlunoFiltro'); if(!sel) return;
  sel.innerHTML = '<option value="">Selecione um aluno</option>' + lista.map(a=>`<option value="${a.id}">${a.nome} · ${a.turma}</option>`).join('');
  renderAvaliacoesAluno();
}

function renderAvaliacoes() {
  filtrarAvalAlunos();
  renderAvaliacoesAluno();
  renderObservacoes();
  populateHistoricoSelect();
}

function renderAvaliacoesAluno() {
  const alunoId = parseInt(document.getElementById('avalAlunoFiltro')?.value||'0');
  const bim     = document.getElementById('avalBimFiltro')?.value||'';
  const disc    = document.getElementById('avalDiscFiltro')?.value||'';
  const infoEl  = document.getElementById('avalAlunoInfo');

  if(!alunoId) {
    if(infoEl) infoEl.innerHTML = `<div class="aval-aluno-header"><span style="font-size:14px;color:var(--text-muted)">👆 Selecione um aluno para visualizar suas avaliações</span></div>`;
    document.getElementById('notasTable').innerHTML = '';
    return;
  }

  const aluno  = DB.alunos.find(a=>a.id===alunoId);
  let notas    = DB.notas.filter(n=>n.alunoId===alunoId);
  if(bim)  notas = notas.filter(n=>n.bim===bim);
  if(disc) notas = notas.filter(n=>n.disciplina===disc);

  if(infoEl && aluno) {
    const mc = aluno.media<5?'var(--red)':aluno.media<7?'var(--amber)':'var(--green)';
    const fc = aluno.freq<70?'var(--red)':aluno.freq<85?'var(--amber)':'var(--green)';
    infoEl.innerHTML = `<div class="aval-aluno-header">
      <div class="td-avatar ${getAvatarColor(aluno.id)}" style="width:40px;height:40px">${getInitials(aluno.nome)}</div>
      <div><div style="font-weight:800;font-size:15px">${aluno.nome}</div>
        <div style="font-size:12px;color:var(--text-muted)">Turma ${aluno.turma} · RA: ${aluno.mat}</div></div>
      <span style="font-weight:700;color:${mc};font-size:20px;margin-left:16px">${aluno.media.toFixed(1)}</span>
      <span style="font-size:12px;color:var(--text-muted)">Média</span>
      <span style="font-weight:700;color:${fc};font-size:20px;margin-left:16px">${aluno.freq}%</span>
      <span style="font-size:12px;color:var(--text-muted)">Frequência</span>
      <span style="font-size:12px;color:var(--text-muted);margin-left:auto">${notas.length} avaliação(ões) encontrada(s)</span>
    </div>`;
  }

  const tbody = document.getElementById('notasTable'); if(!tbody) return;
  tbody.innerHTML = notas.map(n => {
    const vc = n.var>0?'var(--green)':n.var<-2?'var(--red)':'var(--amber)';
    const vi = n.var>0?'↑':'↓';
    return `<tr>
      <td><div class="td-name"><div class="td-avatar ${getAvatarColor(n.alunoId)}">${getInitials(n.aluno)}</div><span style="font-weight:700">${n.aluno}</span></div></td>
      <td>${n.disciplina}</td>
      <td><span class="tag gray">${n.tipo}</span></td>
      <td><strong style="font-size:16px;color:${n.nota<5?'var(--red)':n.nota<7?'var(--amber)':'var(--green)'}">${n.nota.toFixed(1)}</strong></td>
      <td style="font-size:12px">${n.bim}</td>
      <td style="font-size:12px;color:var(--text-muted)">${n.data}</td>
      <td><span style="font-weight:700;color:${vc}">${vi} ${Math.abs(n.var).toFixed(1)}</span>
        ${n.var<-2?' <span class="tag red" style="font-size:10px">⚠️ Queda</span>':''}</td>
    </tr>`;
  }).join('') || '<tr><td colspan="7"><div class="empty-state"><div class="empty-state-icon">📊</div><p>Nenhuma avaliação encontrada para os filtros selecionados.</p></div></td></tr>';
}

function renderObservacoes() {
  const el = document.getElementById('observacoesListView'); if(!el) return;
  const obs = DB.observacoes.filter(o => {
    if(currentUser.role==='professor') return currentUser.turmas.includes(DB.alunos.find(a=>a.id===o.alunoId)?.turma);
    return true;
  });
  el.innerHTML = obs.map(o=>`
    <div style="padding:16px;border-radius:12px;border:1px solid var(--gray-200);margin-bottom:12px;background:${o.prio==='high'?'var(--red-pale)':o.prio==='medium'?'var(--amber-pale)':'var(--gray-50)'}">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;flex-wrap:wrap">
        <div class="td-avatar ${getAvatarColor(o.alunoId)}" style="width:32px;height:32px">${getInitials(o.aluno)}</div>
        <strong>${o.aluno}</strong>
        <span class="tag ${o.prio==='high'?'red':o.prio==='medium'?'amber':'gray'}">${o.prio==='high'?'Alta':o.prio==='medium'?'Média':'Baixa'}</span>
        ${o.termos.length?`<div>${o.termos.map(t=>`<span class="nlp-tag negative">⚠️ ${t}</span>`).join('')}</div>`:''}
        <span style="margin-left:auto;font-size:11px;color:var(--text-muted)">${o.prof} · ${o.data}</span>
      </div>
      <div style="font-size:13.5px;color:var(--text);line-height:1.5">"${o.texto}"</div>
    </div>`).join('') || '<div class="empty-state"><div class="empty-state-icon">💬</div><p>Nenhuma observação registrada.</p></div>';
}

function saveNota() {
  const alunoId = parseInt(document.getElementById('n-aluno').value);
  const aluno   = DB.alunos.find(a=>a.id===alunoId);
  const nota    = parseFloat(document.getElementById('n-valor').value);
  if(!aluno||isNaN(nota)){ showToast('Preencha todos os campos!','danger'); return; }
  const novaVar = nota - aluno.media;
  DB.notas.unshift({id:DB.notas.length+1,alunoId,aluno:aluno.nome,turma:aluno.turma,disciplina:document.getElementById('n-disc').value,tipo:document.getElementById('n-tipo').value,nota,bim:document.getElementById('n-bim').value,data:document.getElementById('n-data').value,var:+novaVar.toFixed(1)});
  aluno.media = +((aluno.media+nota)/2).toFixed(1);
  if(novaVar<-2.5){ DB.alertas.unshift({id:Date.now(),tipo:'critical',titulo:'⚠️ Queda Detectada — '+aluno.nome,desc:`Nota ${nota} registrada. Queda de ${Math.abs(novaVar).toFixed(1)} pontos.`,data:new Date().toLocaleDateString('pt-BR'),lido:false}); document.getElementById('badge-alertas').textContent=DB.alertas.filter(a=>!a.lido).length; showToast('⚠️ Queda significativa detectada para '+aluno.nome,'danger'); }
  closeModal('modal-nota'); renderAvaliacoesAluno(); showToast('Nota lançada!','success');
}

function saveObservacao() {
  const alunoId = parseInt(document.getElementById('o-aluno').value);
  const aluno   = DB.alunos.find(a=>a.id===alunoId);
  const texto   = document.getElementById('o-texto').value.trim();
  if(!aluno||!texto){ showToast('Preencha todos os campos!','danger'); return; }
  const termos  = detectNLP(texto);
  DB.observacoes.unshift({id:DB.observacoes.length+1,alunoId,aluno:aluno.nome,texto,prio:document.getElementById('o-prio').value,data:new Date().toLocaleDateString('pt-BR'),termos,prof:currentUser.nome});
  if(termos.length) showToast('⚠️ Termos de atenção detectados: '+termos.join(', '),'warning');
  closeModal('modal-observacao'); renderObservacoes(); showToast('Observação salva!','success');
  document.getElementById('o-texto').value='';
  document.getElementById('nlpPreview').style.display='none';
}

function analyzeObservacao() {
  const texto  = document.getElementById('o-texto').value;
  const termos = detectNLP(texto);
  const el     = document.getElementById('nlpPreview');
  if(termos.length){ el.style.display='block'; document.getElementById('nlpPreviewText').innerHTML=termos.map(t=>`<span class="nlp-tag negative">${t}</span>`).join(''); }
  else { el.style.display='block'; el.style.background='var(--green-pale)'; el.style.color='#065F46'; document.getElementById('nlpPreviewText').textContent='Nenhum termo de atenção detectado ✓'; }
}

function switchTab(btn,tabId) {
  document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  ['tab-notas','tab-observacoes','tab-historico'].forEach(id=>{ const e=document.getElementById(id); if(e) e.style.display='none'; });
  const t = document.getElementById(tabId); if(t) t.style.display='block';
  if(tabId==='tab-historico') renderHistoricoChart();
}

function populateHistoricoSelect() {
  const sel = document.getElementById('historicoAlunoSelect'); if(!sel) return;
  const cur = sel.value;
  sel.innerHTML = '<option value="">Selecione um aluno</option>' + getAlunosVisiveis().map(a=>`<option value="${a.id}">${a.nome}</option>`).join('');
  if(cur) sel.value = cur;
}

function renderHistoricoChart(alunoId) {
  alunoId = alunoId || document.getElementById('historicoAlunoSelect')?.value;
  if(!alunoId) return;
  const ctx = document.getElementById('historicoChart'); if(!ctx) return;
  if(chartsCreated.historicoChart) chartsCreated.historicoChart.destroy();
  const dados = [8.2,7.9,8.0,7.5,7.1,6.8,6.4,6.1].map((v)=>+(v+(Math.random()-0.5)*0.8).toFixed(1));
  chartsCreated.historicoChart = new Chart(ctx,{type:'line',data:{labels:['1ºBim/23','2ºBim/23','3ºBim/23','4ºBim/23','1ºBim/24','2ºBim/24','3ºBim/24','4ºBim/24'],datasets:[{label:'Média',data:dados,borderColor:'var(--blue)',backgroundColor:'rgba(37,99,235,0.08)',fill:true,tension:0.4,pointRadius:6},{label:'Frequência %',data:[96,94,92,90,88,85,82,80].map(v=>+(v+(Math.random()-0.5)*4).toFixed(0)),borderColor:'var(--green)',backgroundColor:'rgba(16,185,129,0.05)',fill:true,tension:0.4,pointRadius:6}]},options:{responsive:true,plugins:{legend:{position:'bottom'}},scales:{y:{min:40},x:{grid:{display:false}}}}});
}

// ═══════════════════════════════════════════════════════════
// ALERTAS
// ═══════════════════════════════════════════════════════════
function renderAlertas() {
  const el = document.getElementById('alertasList'); if(!el) return;
  el.innerHTML = DB.alertas.map(a=>`
    <div class="alert-item ${a.tipo}" style="opacity:${a.lido?0.55:1}" onclick="markRead(${a.id})">
      <div class="alert-dot ${a.tipo}"></div>
      <div class="alert-content">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:3px">
          <div class="alert-title">${a.titulo}</div>
          ${!a.lido?'<span class="tag red" style="font-size:10px">Novo</span>':''}
        </div>
        <div class="alert-desc">${a.desc}</div>
      </div>
      <div style="display:flex;flex-direction:column;align-items:flex-end;gap:6px">
        <span class="alert-time">${a.data}</span>
        ${!a.lido?`<button class="btn btn-ghost btn-sm" style="font-size:11px" onclick="event.stopPropagation();markRead(${a.id})">Marcar lido</button>`:''}
      </div>
    </div>`).join('');
}
function markRead(id){ const a=DB.alertas.find(x=>x.id===id); if(a) a.lido=true; document.getElementById('badge-alertas').textContent=DB.alertas.filter(a=>!a.lido).length; renderAlertas(); }
function markAllRead(){ DB.alertas.forEach(a=>a.lido=true); document.getElementById('badge-alertas').textContent='0'; renderAlertas(); showToast('Todos os alertas marcados como lidos.','success'); }

// ═══════════════════════════════════════════════════════════
// ENCAMINHAMENTOS (com busca por RA/nome)
// ═══════════════════════════════════════════════════════════
function renderEncaminhamentos() {
  if(!perm('verEnc')){ document.getElementById('encaminhamentosList').innerHTML='<div class="empty-state"><p>Acesso não autorizado.</p></div>'; return; }
  const busca  = (document.getElementById('encBusca')?.value||'').toLowerCase();
  const tipo   = document.getElementById('encTipoFiltro')?.value||'';
  const status = document.getElementById('encStatusFiltro')?.value||'';
  const el     = document.getElementById('encaminhamentosList'); if(!el) return;
  const TL     = {psico:'🧠 Psicólogo Escolar',tutelar:'⚖️ Conselho Tutelar',familiar:'👨‍👩‍👧 Reunião Familiar',pedagogico:'📚 Reforço Pedagógico'};
  const UL     = {normal:'Normal',media:'Média',alta:'⚠️ Alta'};

  let lista = [...DB.encaminhamentos];
  if(busca) lista = lista.filter(e => {
    const a = DB.alunos.find(x=>x.id===e.alunoId);
    return e.aluno.toLowerCase().includes(busca) || (a && a.mat.includes(busca));
  });
  if(tipo)   lista = lista.filter(e=>e.tipo===tipo);
  if(status) lista = lista.filter(e=>e.status===status);

  el.innerHTML = lista.map(e=>`
    <div class="intervencao-card ${e.tipo}">
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:10px;flex-wrap:wrap">
        <div class="td-avatar ${getAvatarColor(e.alunoId)}">${getInitials(e.aluno)}</div>
        <div>
          <div style="font-weight:700;font-size:14px">${e.aluno}</div>
          <div style="font-size:11.5px;color:var(--text-muted)">${TL[e.tipo]} · RA: ${DB.alunos.find(a=>a.id===e.alunoId)?.mat||'—'}</div>
        </div>
        <span class="tag ${e.urgencia==='alta'?'red':e.urgencia==='media'?'amber':'gray'}" style="margin-left:auto">${UL[e.urgencia]}</span>
        <span class="tag ${e.status==='Em andamento'?'blue':e.status==='Encerrado'?'green':'amber'}">${e.status}</span>
        ${perm('editarEnc')?`<button class="btn btn-ghost btn-sm" onclick="encerrarEncaminhamento(${e.id})">✓ Encerrar</button>`:''}
      </div>
      <div style="font-size:13px;color:var(--text-muted);margin-bottom:8px">${e.just}</div>
      <div style="font-size:12px;color:var(--text-muted)">Resp: <strong>${e.resp}</strong> · ${e.data}</div>
    </div>`).join('') || '<div class="empty-state"><div class="empty-state-icon">✅</div><p>Nenhum encaminhamento encontrado.</p></div>';
}

function saveEncaminhamento() {
  if(!perm('editarEnc')){ showToast('Sem permissão.','danger'); return; }
  const alunoId = parseInt(document.getElementById('enc-aluno').value);
  const aluno   = DB.alunos.find(a=>a.id===alunoId);
  const just    = document.getElementById('enc-just').value.trim();
  if(!aluno||!just){ showToast('Preencha todos os campos!','danger'); return; }
  DB.encaminhamentos.unshift({id:DB.encaminhamentos.length+1,alunoId,aluno:aluno.nome,tipo:document.getElementById('enc-tipo').value,urgencia:document.getElementById('enc-urg').value,resp:document.getElementById('enc-resp').value,just,data:new Date().toLocaleDateString('pt-BR'),status:'Pendente'});
  closeModal('modal-encaminhamento'); renderEncaminhamentos(); showToast('Encaminhamento registrado!','success');
}

function encerrarEncaminhamento(id) {
  const e = DB.encaminhamentos.find(x=>x.id===id); if(e) e.status='Encerrado';
  renderEncaminhamentos(); showToast('Encaminhamento encerrado.','success');
}

// ═══════════════════════════════════════════════════════════
// ACOMPANHAMENTO DE CASOS
// ═══════════════════════════════════════════════════════════
function renderCasos() {
  if(!perm('verCasos')){ document.getElementById('casosList').innerHTML='<div class="empty-state"><p>Acesso não autorizado.</p></div>'; return; }
  const busca  = (document.getElementById('casosBusca')?.value||'').toLowerCase();
  const status = document.getElementById('casosStatusFiltro')?.value||'';
  const el     = document.getElementById('casosList'); if(!el) return;

  // Montar lista: todos alunos em risco + alunos com caso registrado
  const alunosEmRisco = DB.alunos.filter(a => a.risco !== 'normal');
  // Garantir que todos tenham um caso (criar vazio se não existir)
  alunosEmRisco.forEach(a => {
    if(!DB.casos.find(c=>c.alunoId===a.id)){
      DB.casos.push({id:DB.casos.length+1,alunoId:a.id,meta:'',est:'',prazo:'',status:'ativo',progresso:0,resp:'',updatedAt:''});
    }
  });

  let lista = DB.casos.filter(c => {
    const a = DB.alunos.find(x=>x.id===c.alunoId); if(!a) return false;
    const termoBusca = !busca || a.nome.toLowerCase().includes(busca) || a.mat.includes(busca);
    const termoStatus = !status || c.status === status;
    return termoBusca && termoStatus;
  });

  const statusLabel = {ativo:'🔴 Crítico / Ativo', andamento:'🟡 Em andamento', encerrado:'🟢 Encerrado'};
  const statusClass = {ativo:'ativo', andamento:'andamento', encerrado:'encerrado'};

  el.innerHTML = lista.map(c => {
    const a = DB.alunos.find(x=>x.id===c.alunoId); if(!a) return '';
    const enc = DB.encaminhamentos.filter(e=>e.alunoId===a.id);
    const laudo = DB.laudos.filter(l=>l.alunoId===a.id);
    return `
    <div class="caso-card">
      <div class="caso-card-header" onclick="abrirCasoPlano(${c.alunoId})">
        <div class="td-avatar ${getAvatarColor(a.id)}" style="width:44px;height:44px;font-size:16px;border-radius:12px">${getInitials(a.nome)}</div>
        <div style="flex:1">
          <div style="font-weight:800;font-size:15px;cursor:pointer;color:var(--blue)">${a.nome}</div>
          <div style="font-size:12px;color:var(--text-muted)">Turma ${a.turma} · RA: ${a.mat} · Freq: <span style="font-weight:700;color:${a.freq<70?'var(--red)':'var(--amber)'}">${a.freq}%</span> · Média: <span style="font-weight:700;color:${a.media<5?'var(--red)':'var(--amber)'}">${a.media.toFixed(1)}</span></div>
        </div>
        <span class="caso-status ${statusClass[c.status]}">${statusLabel[c.status]||c.status}</span>
        ${laudo.length?`<span class="tag amber" style="margin-left:6px">📎 ${laudo.map(l=>l.tipo).join(', ')}</span>`:''}
      </div>
      <div class="caso-card-body">
        ${c.meta?`<div style="padding:12px;background:var(--blue-pale);border-radius:10px;margin-bottom:12px">
          <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;color:var(--blue);margin-bottom:4px">META DO PLANO DE AÇÃO</div>
          <div style="font-size:13.5px;font-weight:600">${c.meta}</div>
        </div>`:`<div style="padding:12px;background:var(--gray-100);border-radius:10px;margin-bottom:12px;font-size:13px;color:var(--text-muted)">⚠️ Nenhum plano de ação registrado. <button class="btn btn-ghost btn-sm" onclick="abrirCasoPlano(${c.alunoId})" style="margin-left:8px">+ Criar Plano</button></div>`}
        ${c.meta?`<div style="margin-bottom:12px">
          <div style="font-size:12px;font-weight:700;color:var(--text-muted);margin-bottom:5px">PROGRESSO</div>
          <div class="progress-bar"><div class="progress-fill ${c.progresso>=70?'green':c.progresso>=30?'amber':'red'}" style="width:${c.progresso}%"></div></div>
          <div style="font-size:12px;color:var(--text-muted);margin-top:3px">${c.progresso}% concluído · Prazo: ${c.prazo||'—'} · Resp: ${c.resp||'—'}</div>
        </div>`:''}
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          <button class="btn btn-primary btn-sm" onclick="abrirCasoPlano(${c.alunoId})">📋 ${c.meta?'Editar Plano':'Criar Plano'}</button>
          <button class="btn btn-amber btn-sm" onclick="openModal('modal-encaminhamento')">🔀 Encaminhar</button>
          <button class="btn btn-ghost btn-sm" onclick="showAlunoDetalhe(${c.alunoId})">👁️ Ver Perfil</button>
          ${enc.length?`<span class="tag blue">${enc.length} encaminhamento(s)</span>`:''}
        </div>
      </div>
    </div>`;
  }).join('') || '<div class="empty-state"><div class="empty-state-icon">📋</div><p>Nenhum caso encontrado.</p></div>';
}

function abrirCasoPlano(alunoId) {
  if(!perm('editarCasos')){ showToast('Sem permissão para editar casos.','danger'); return; }
  const aluno  = DB.alunos.find(a=>a.id===alunoId); if(!aluno) return;
  const caso   = DB.casos.find(c=>c.alunoId===alunoId);
  document.getElementById('casoPlanoTitulo').textContent = `📋 Plano de Ação — ${aluno.nome}`;
  document.getElementById('casoPlanoSub').textContent    = `Turma ${aluno.turma} · RA: ${aluno.mat}`;
  document.getElementById('caso-alunoId').value          = alunoId;
  document.getElementById('caso-meta').value             = caso?.meta||'';
  document.getElementById('caso-est').value              = caso?.est||'';
  document.getElementById('caso-prazo').value            = caso?.prazo||'';
  document.getElementById('caso-resp').value             = caso?.resp||'';
  document.getElementById('caso-prog').value             = caso?.progresso||0;
  const ss = document.getElementById('caso-status');
  if(ss && caso?.status) ss.value = caso.status;
  openModal('modal-caso-plano');
}

function saveCasoPlano() {
  const alunoId = parseInt(document.getElementById('caso-alunoId').value);
  const meta    = document.getElementById('caso-meta').value.trim();
  if(!meta){ showToast('A meta é obrigatória!','danger'); return; }
  let caso = DB.casos.find(c=>c.alunoId===alunoId);
  const dados = {
    meta, est: document.getElementById('caso-est').value,
    prazo: document.getElementById('caso-prazo').value,
    resp:  document.getElementById('caso-resp').value,
    progresso: parseInt(document.getElementById('caso-prog').value)||0,
    status: document.getElementById('caso-status').value,
    updatedAt: new Date().toLocaleDateString('pt-BR'),
  };
  if(caso) Object.assign(caso, dados);
  else DB.casos.push({id:DB.casos.length+1, alunoId, ...dados});
  closeModal('modal-caso-plano'); renderCasos();
  showToast('Plano de ação salvo!','success');
}

// ═══════════════════════════════════════════════════════════
// LAUDOS
// ═══════════════════════════════════════════════════════════
function renderLaudos() {
  if(!perm('verLaudos')){ document.getElementById('laudosList').innerHTML='<div class="empty-state"><div class="empty-state-icon">🔒</div><p>Acesso restrito por LGPD. Somente Gestores e Profissionais de Apoio.</p></div>'; return; }
  const busca = (document.getElementById('laudosBusca')?.value||'').toLowerCase();
  const tipo  = document.getElementById('laudosTipoFiltro')?.value||'';
  const el    = document.getElementById('laudosList'); if(!el) return;

  let lista = [...DB.laudos];
  if(busca) lista = lista.filter(l=>{ const a=DB.alunos.find(x=>x.id===l.alunoId); return a && (a.nome.toLowerCase().includes(busca)||a.mat.includes(busca)); });
  if(tipo) lista = lista.filter(l=>l.tipo===tipo);

  const tipoIco = {TEA:'🧩',TDAH:'⚡',Dislexia:'📖','Deficiência Intelectual':'🧠','Deficiência Auditiva':'👂','Deficiência Visual':'👁','Outro':'📎'};
  const tipoClass = {TEA:'tea',TDAH:'tdah',Dislexia:'tdah',Outro:'outro'};

  el.innerHTML = lista.length?lista.map(l=>{
    const a   = DB.alunos.find(x=>x.id===l.alunoId)||{};
    const ico = tipoIco[l.tipo]||'📎';
    const cls = tipoClass[l.tipo]||'outro';
    const val = l.validade==='indefinida'?'Validade indeterminada':l.validade==='anual'?'Renovação anual necessária':'Renovação bienal';
    return `<div class="laudo-item">
      <div class="laudo-icon ${cls}">${ico}</div>
      <div style="flex:1">
        <div style="font-weight:700;font-size:14px">${a.nome||'—'} <span class="tag amber" style="margin-left:6px">${l.tipo}</span></div>
        <div style="font-size:12px;color:var(--text-muted)">RA: ${a.mat||'—'} · Turma: ${a.turma||'—'} · CID: ${l.cid} · ${l.medico} · ${l.data}</div>
        <div style="font-size:12px;color:var(--text-muted);margin-top:3px">${val} · <em>${l.obs}</em></div>
      </div>
      ${perm('editarLaudos')?`<button class="btn btn-ghost btn-sm btn-icon" style="color:var(--red)" onclick="deleteLaudo(${l.id})" title="Remover">🗑️</button>`:''}
    </div>`;
  }).join('') : '<div class="empty-state"><div class="empty-state-icon">📎</div><p>Nenhum laudo encontrado.</p></div>';
}

function saveLaudo() {
  if(!perm('editarLaudos')){ showToast('Sem permissão.','danger'); return; }
  const alunoId = parseInt(document.getElementById('laud-aluno').value);
  if(!alunoId){ showToast('Selecione um aluno!','danger'); return; }
  DB.laudos.push({
    id: DB.laudos.length+1, alunoId,
    tipo:     document.getElementById('laud-tipo').value,
    cid:      document.getElementById('laud-cid').value,
    data:     document.getElementById('laud-data').value,
    medico:   document.getElementById('laud-medico').value,
    validade: document.getElementById('laud-validade').value,
    obs:      document.getElementById('laud-obs').value,
  });
  closeModal('modal-laudo'); renderLaudos(); showToast('Laudo registrado com sucesso!','success');
  ['laud-cid','laud-medico','laud-obs'].forEach(id=>document.getElementById(id).value='');
}
function deleteLaudo(id){
  if(!perm('editarLaudos')) return;
  if(!confirm('Remover este laudo? Ação irreversível.')) return;
  const i = DB.laudos.findIndex(l=>l.id===id); if(i>-1){ DB.laudos.splice(i,1); renderLaudos(); showToast('Laudo removido.','warning'); }
}

// ═══════════════════════════════════════════════════════════
// RELATÓRIOS
// ═══════════════════════════════════════════════════════════
function renderRelatorios() {
  const el = document.getElementById('relatoriosGrid'); if(!el) return;
  const reports = [
    {icon:'📊',title:'Relatório de Desempenho',desc:'Médias por turma, disciplina e bimestre.',color:'blue'},
    {icon:'📅',title:'Relatório de Frequência',desc:'Taxas de presença, ausência e justificativas por período.',color:'green'},
    {icon:'🚨',title:'Alunos em Risco',desc:'Lista anonimizada de alunos com indicadores críticos.',color:'red'},
    {icon:'🔀',title:'Encaminhamentos',desc:'Registro de todos os encaminhamentos do período.',color:'amber'},
    {icon:'📋',title:'Acompanhamento de Casos',desc:'Status de todos os planos de ação ativos.',color:'blue'},
    {icon:'📄',title:'Conselho de Classe',desc:'Relatório consolidado para reunião pedagógica.',color:'green'},
  ];
  el.innerHTML = `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:16px">` +
    reports.map(r=>`<div class="card stat-card ${r.color}">
      <div style="font-size:36px;margin-bottom:10px">${r.icon}</div>
      <div style="font-family:'Sora',sans-serif;font-size:15px;font-weight:700;margin-bottom:6px">${r.title}</div>
      <div style="font-size:12.5px;color:var(--text-muted);margin-bottom:16px;flex:1">${r.desc}</div>
      <button class="btn btn-ghost btn-sm" onclick="gerarRelatorio('${r.title}')">📄 Gerar PDF</button>
    </div>`).join('') + '</div>';
}
function gerarRelatorio(title){ showToast('📄 Gerando "'+title+'"…','info'); setTimeout(()=>showToast('✅ Relatório pronto! (Simulação)','success'),2000); }

// ═══════════════════════════════════════════════════════════
// LGPD
// ═══════════════════════════════════════════════════════════
function renderLGPD() {
  const el = document.getElementById('lgpdContent'); if(!el) return;
  el.innerHTML = `
    <div class="grid-2">
      <div>
        <div class="card" style="margin-bottom:16px">
          <div class="card-header"><h3>🔒 Criptografia & Segurança</h3></div>
          <div class="card-body">
            ${[['AES-256','Dados sensíveis em repouso','green'],['TLS 1.3','Transmissão de dados','green'],['PBKDF2','Hash de senhas','green'],['JWT RS256','Tokens de autenticação','green']].map(([k,v,c])=>`
            <div style="display:flex;justify-content:space-between;align-items:center;padding:10px;background:var(--gray-50);border-radius:8px;margin-bottom:8px">
              <div><div style="font-weight:700;font-size:13px">${k}</div><div style="font-size:11px;color:var(--text-muted)">${v}</div></div>
              <span class="tag green">✓ Ativo</span>
            </div>`).join('')}
          </div>
        </div>
        <div class="card">
          <div class="card-header"><h3>👤 Controle de Acesso RBAC</h3></div>
          <div class="card-body">
            ${[
              ['Gestor','CRUD completo · Todos os módulos · LGPD · Relatórios','red'],
              ['Professor','Somente suas turmas · Lançar notas e frequência · Sem acesso a laudos','amber'],
              ['Profissional de Apoio','Laudos · Casos · Encaminhamentos · Visualizar alunos','purple'],
              ['Responsável / Pais','Somente dados do próprio filho · Avaliações e frequência','blue'],
            ].map(([r,d,c])=>`
            <div style="display:flex;justify-content:space-between;align-items:center;padding:10px;border:1px solid var(--gray-200);border-radius:8px;margin-bottom:8px">
              <div><div style="font-weight:700;font-size:13px">${r}</div><div style="font-size:11px;color:var(--text-muted)">${d}</div></div>
              <span class="tag ${c}">${r.split(' ')[0]}</span>
            </div>`).join('')}
          </div>
        </div>
      </div>
      <div>
        <div class="card" style="margin-bottom:16px">
          <div class="card-header"><h3>🕵️ Anonimização de Dados</h3></div>
          <div class="card-body">
            <p style="font-size:13.5px;color:var(--text-muted);line-height:1.6;margin-bottom:16px">Relatórios para diretoria e órgãos externos são gerados com dados anonimizados. Laudos médicos são acessíveis apenas por Gestores e Profissionais de Apoio autorizados.</p>
            <div style="padding:12px;background:var(--green-pale);border-radius:10px;font-size:13px;color:#065F46;margin-bottom:12px">
              <strong>✓ LGPD Art. 12</strong> — Dados anonimizados não são dados pessoais. Laudos e diagnósticos são dados sensíveis (Art. 11) com acesso controlado.
            </div>
            <button class="btn btn-ghost btn-sm" style="width:100%" onclick="showToast('Relatório anonimizado gerado!','success')">📊 Gerar Relatório Anonimizado</button>
          </div>
        </div>
        <div class="card">
          <div class="card-header"><h3>📋 Log de Auditoria</h3></div>
          <div class="card-body">
            <div style="font-size:12px;font-family:monospace;background:var(--navy);color:#A5F3FC;padding:14px;border-radius:10px;line-height:1.9">
              <div>[${new Date().toLocaleDateString('pt-BR')} 09:15] LOGIN — ${currentUser.nome} (${currentUser.role})</div>
              <div>[${new Date().toLocaleDateString('pt-BR')} 09:18] ACESSO — Perfil de aluno visualizado</div>
              <div>[${new Date().toLocaleDateString('pt-BR')} 09:22] ALERTA — Queda de rendimento detectada</div>
              <div>[${new Date().toLocaleDateString('pt-BR')} 09:25] ENCAMINHAMENTO — Criado (alunoId: 1)</div>
              <div>[${new Date().toLocaleDateString('pt-BR')} 09:31] NOTA — Avaliação lançada (alunoId: 3)</div>
              <div>[${new Date().toLocaleDateString('pt-BR')} 09:45] LAUDO — Acesso restrito registrado</div>
            </div>
          </div>
        </div>
      </div>
    </div>`;
}

// ═══════════════════════════════════════════════════════════
// MODAL UTILS
// ═══════════════════════════════════════════════════════════
function openModal(id) {
  popularSelects();
  document.getElementById(id).classList.add('open');
}
function closeModal(id) { document.getElementById(id).classList.remove('open'); }
document.querySelectorAll('.modal-overlay').forEach(m => {
  m.addEventListener('click', function(e){ if(e.target===this) this.classList.remove('open'); });
});

// ═══════════════════════════════════════════════════════════
// SEARCH GLOBAL
// ═══════════════════════════════════════════════════════════
function handleSearch(val) {
  if(val.length < 2) return;
  const base = getAlunosVisiveis();
  const results = base.filter(a => a.nome.toLowerCase().includes(val.toLowerCase()) || a.mat.includes(val));
  if(results.length){ alunosFiltrados = results; showView('alunos'); }
}

// ═══════════════════════════════════════════════════════════
// TOAST
// ═══════════════════════════════════════════════════════════
function showToast(msg, type='success') {
  const icons = {success:'✅',danger:'🚨',warning:'⚠️',info:'ℹ️'};
  const container = document.getElementById('toastContainer');
  const t = document.createElement('div');
  t.className = `toast ${type==='danger'?'danger':type==='warning'?'warning':type==='info'?'info':''}`;
  t.innerHTML = `<span style="font-size:18px">${icons[type]||'✅'}</span><span>${msg}</span>`;
  container.appendChild(t);
  setTimeout(()=>{ t.style.animation='toastOut 0.3s ease forwards'; setTimeout(()=>t.remove(),300); }, 3500);
}

// ═══════════════════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════════════════
window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('n-data').valueAsDate = new Date();
});