// ═══════════════════════════════════════════════════════════
// DATA LAYER
// ═══════════════════════════════════════════════════════════
const DB = {
  alunos: [],
  professores: [],
  turmas: [],
  disciplinas: [],
  notas: [],
  observacoes: [],
  encaminhamentos: [],
  casos: [],
  laudos: [],
  freqData: {},
  frequencia: [],
  alertas: []
};

// ═══════════════════════════════════════════════════════════
// RBAC — Permissões por papel
// ═══════════════════════════════════════════════════════════
const RBAC = {
  gestor: {
    verDashboard:true, verAlunos:true, editarAlunos:true, verAlunoDetalhe:true,
    verProfs:true, editarProfs:true, verDisc:true, editarDisc:true, verTurmas:true, editarTurmas:true,
    verFreq:true, editarFreq:true, verAvaliacoes:true, editarNotas:true, verObservacoes:true, editarObservacoes:true,
    verAlertas:true, editarAlertas:true, verLaudos:true, editarLaudos:true, verCasos:true, editarCasos:true,
    verEnc:true, editarEnc:true, verRel:true, verLGPD:true,
  },
  professor: {
    verAlunos:true, verAlunoDetalhe:true, verFreq:true, editarFreq:true,
    verAvaliacoes:true, editarNotas:true, verObservacoes:true, editarObservacoes:true,
  },
  psicologo: {
    verAlunos:true, verAlunoDetalhe:true, verLaudos:true, editarLaudos:true,
    verCasos:true, editarCasos:true, verEnc:true, editarEnc:true,
  },
  pais: {
    verFreq:true, verAvaliacoes:true, verHistorico:true,
  },
};

const viewPermissions = {
  dashboard:'verDashboard', alunos:'verAlunos', professores:'verProfs', disciplinas:'verDisc',
  turmas:'verTurmas', frequencia:'verFreq', avaliacoes:'verAvaliacoes', alertas:'verAlertas',
  encaminhamentos:'verEnc', casos:'verCasos', laudos:'verLaudos', relatorios:'verRel', lgpd:'verLGPD',
};
let DEMO_PARENT_STUDENT_ID = null;

// ═══════════════════════════════════════════════════════════
// SUPABASE DATA LAYER
// ═══════════════════════════════════════════════════════════
let supabaseLoading = false;

async function fetchSupabaseTable(table) {
  if (!window.supabaseClient) return null;
  const { data, error } = await window.supabaseClient
    .from(table)
    .select('*');
  if (error) throw error;
  return data || [];
}

async function loadSupabaseData() {
  if (!window.supabaseClient || supabaseLoading) return;
  supabaseLoading = true;
  try {
    const [
      turmas, professores, professorTurmas, alunos, disciplinas,
      notas, observacoes, encaminhamentos, casos, laudos, alertas, frequencia
    ] = await Promise.all([
      fetchSupabaseTable('turmas'),
      fetchSupabaseTable('professores'),
      fetchSupabaseTable('professor_turmas'),
      fetchSupabaseTable('alunos'),
      fetchSupabaseTable('disciplinas'),
      fetchSupabaseTable('notas'),
      fetchSupabaseTable('observacoes'),
      fetchSupabaseTable('encaminhamentos'),
      fetchSupabaseTable('casos'),
      fetchSupabaseTable('laudos'),
      fetchSupabaseTable('alertas'),
      fetchSupabaseTable('frequencia')
    ]);

    if (!turmas) return;
    const turmaById = new Map(turmas.map(t => [t.id, t.nome]));
    const professorById = new Map(professores.map(p => [p.id, p.nome]));
    const alunoById = new Map(alunos.map(a => [a.id, a.nome]));

    DB.turmas = turmas.map(t => ({
      id: t.id, nome: t.nome, serie: t.serie, turno: t.turno,
      sala: t.sala, alunos: alunos.filter(a => a.turma_id === t.id).length
    }));

    DB.professores = professores.map(p => ({
      id: p.id, nome: p.nome, disciplina: p.disciplina,
      email: p.email, reg: p.reg, ultimo: p.ultimo,
      turmas: professorTurmas
        .filter(pt => pt.professor_id === p.id)
        .map(pt => turmaById.get(pt.turma_id))
        .filter(Boolean)
    }));

    DB.alunos = alunos.map(a => ({
      id: a.id, nome: a.nome, turma: turmaById.get(a.turma_id) || '',
      mat: a.mat, nasc: a.nasc, resp: a.resp, tel: a.tel,
      freq: Number(a.freq ?? 100), media: Number(a.media ?? 0),
      risco: a.risco || 'normal', obs: a.obs || ''
    }));

    DB.disciplinas = disciplinas.map(d => ({
      id: d.id, nome: d.nome, turma: turmaById.get(d.turma_id) || '',
      profId: d.professor_id, ch: d.ch, ano: String(d.ano ?? ''),
      area: d.area || ''
    }));

    DB.notas = notas.map(n => ({
      id: n.id, alunoId: n.aluno_id, aluno: alunoById.get(n.aluno_id) || '',
      turma: turmaById.get(alunos.find(a => a.id === n.aluno_id)?.turma_id) || '',
      disciplina: n.disciplina, tipo: n.tipo, nota: Number(n.nota),
      bim: n.bim, data: n.data, var: Number(n.variacao ?? 0)
    }));

    DB.observacoes = observacoes.map(o => ({
      id: o.id, alunoId: o.aluno_id, aluno: alunoById.get(o.aluno_id) || '',
      texto: o.texto, prio: o.prio, data: o.data,
      prof: professorById.get(o.professor_id) || ''
    }));

    DB.encaminhamentos = encaminhamentos.map(e => ({
      id: e.id, alunoId: e.aluno_id, aluno: alunoById.get(e.aluno_id) || '',
      tipo: e.tipo, urgencia: e.urgencia, resp: e.resp,
      just: e.just, data: e.data, status: e.status
    }));

    DB.casos = casos.map(c => ({
      id: c.id, alunoId: c.aluno_id, meta: c.meta, est: c.est,
      prazo: c.prazo, status: c.status, progresso: c.progresso,
      resp: c.resp, updatedAt: c.updated_at
    }));

    DB.laudos = laudos.map(l => ({
      id: l.id, alunoId: l.aluno_id, tipo: l.tipo, cid: l.cid,
      data: l.data, medico: l.medico, validade: l.validade, obs: l.obs
    }));

    DB.alertas = alertas.map(a => ({
      id: a.id, tipo: a.tipo, titulo: a.titulo, desc: a.descr,
      data: a.data ? new Date(a.data).toLocaleDateString('pt-BR') : '',
      lido: Boolean(a.lido)
    }));
    DB.frequencia = frequencia.map(f => ({
      alunoId: f.aluno_id, turmaId: f.turma_id,
      data: f.data, status: f.status
    }));
    DB.freqData = {};
    for (const turma of DB.turmas) {
      DB.freqData[turma.nome] = DB.alunos
        .filter(a => a.turma === turma.nome)
        .map(a => {
          const registro = frequencia.find(f =>
            f.aluno_id === a.id &&
            document.getElementById('freqDataFim')?.value === f.data
          );
          return { id: a.id, nome: a.nome, status: registro?.status || 'present' };
        });
    }

    alunosFiltrados = [...getAlunosVisiveis()];
  } catch (error) {
    console.error('Erro ao carregar dados do Supabase:', error);
    showToast('Não foi possível carregar os dados do Supabase.', 'danger');
  } finally {
    supabaseLoading = false;
  }
}

// ═══════════════════════════════════════════════════════════
// ESTADO GLOBAL
// ═══════════════════════════════════════════════════════════
let currentUser = { role:null, nome:'', profId:null, alunoId:null, turmas:[] };
let chartsCreated = {};
let alunosFiltrados = [];
let editingAlunoId = null;
let editingTurmaId = null;

// ═══════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════
const avatarColors = ['td-avatar-blue','td-avatar-green','td-avatar-purple','td-avatar-amber','td-avatar-red'];
function getAvatarColor(id) { return avatarColors[id % avatarColors.length]; }
function getInitials(nome) { return nome.split(' ').slice(0,2).map(n=>n[0]).join(''); }

function perm(key) { return RBAC[currentUser.role]?.[key] === true; }

function getAlunosVisiveis() {
  if(!currentUser.role) return [];
  if(currentUser.role === 'gestor') return DB.alunos;
  if(currentUser.role === 'professor') return DB.alunos.filter(a => currentUser.turmas.includes(a.turma));
  if(currentUser.role === 'pais') return DB.alunos.filter(a => a.id === currentUser.alunoId);
  if(currentUser.role === 'psicologo') return DB.alunos;
  return [];
}

function canAccessStudent(alunoId) {
  return Number.isInteger(Number(alunoId)) &&
    (perm('verAlunos') || perm('verAvaliacoes') || perm('verFreq')) &&
    getAlunosVisiveis().some(aluno => aluno.id === Number(alunoId));
}

function requirePermission(permission) {
  if(perm(permission)) return true;
  showToast('Acesso não autorizado.','danger');
  return false;
}

function getDiscNomes() {
  const turmas = new Set(getAlunosVisiveis().map(aluno => aluno.turma));
  return [...new Set(DB.disciplinas
    .filter(disciplina => turmas.has(disciplina.turma) &&
      (currentUser.role !== 'professor' || disciplina.profId === currentUser.profId))
    .map(disciplina => disciplina.nome))].sort();
}

function canRecordGrade(alunoId, disciplina) {
  const aluno = DB.alunos.find(item => item.id === Number(alunoId));
  if(!aluno || !canAccessStudent(alunoId)) return false;
  return DB.disciplinas.some(item =>
    item.nome === disciplina &&
    item.turma === aluno.turma &&
    (currentUser.role !== 'professor' || item.profId === currentUser.profId)
  );
}

// ═══════════════════════════════════════════════════════════
// AUTH
// ═══════════════════════════════════════════════════════════
function onLoginRoleChange(role) {
  document.getElementById('login-prof-row').style.display = role === 'professor' ? 'block' : 'none';
}

function doLogin(event) {
  event.preventDefault();
  const role = document.getElementById('loginRole').value;
  if(!Object.prototype.hasOwnProperty.call(RBAC, role)) {
    showToast('Selecione uma função válida.','danger');
    return;
  }
  chartsCreated = {};
  let nome = 'Ana Coordenadora', profId = null, alunoId = null, turmas = [];

  if(role === 'professor') {
    const pid = parseInt(document.getElementById('loginProfId').value);
    const professor = DB.professores.find(item => item.id === pid);
    nome = professor ? professor.nome : 'Professor';
    profId = professor ? professor.id : null;
    turmas = professor ? [...professor.turmas] : [];
  } else if(role === 'pais') {
    DEMO_PARENT_STUDENT_ID = DB.alunos[0]?.id ?? null;
    const aluno = DB.alunos.find(item => item.id === DEMO_PARENT_STUDENT_ID);
    if(!aluno) {
      showToast('Nenhum aluno disponível para o perfil de responsável.','danger');
      return;
    }
    nome = aluno.resp;
    alunoId = aluno.id;
  } else if(role === 'psicologo') {
    nome = 'Dra. Fernanda Cruz';
  }

  currentUser = { role, nome, profId, alunoId, turmas };
  alunosFiltrados = [...getAlunosVisiveis()];
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
    showView(role === 'pais' ? 'avaliacoes' : role === 'professor' ? 'alunos' : role === 'psicologo' ? 'casos' : 'dashboard');
  }, 600);
}

function applyMenuRBAC() {
  document.querySelectorAll('.nav-item[data-view]').forEach(el => {
    const permission = viewPermissions[el.dataset.view];
    el.style.display = permission && perm(permission) ? '' : 'none';
  });
  const alertsButton = document.querySelector('.topbar-icon-btn');
  if(alertsButton) alertsButton.style.display = perm('verAlertas') ? '' : 'none';
}

function doLogout() {
  Object.values(chartsCreated).forEach(chart => chart?.destroy());
  document.querySelectorAll('.modal-overlay.open').forEach(modal => modal.classList.remove('open'));
  document.getElementById('app').classList.remove('visible');
  document.getElementById('login-screen').classList.remove('hidden');
  document.getElementById('loginRole').value = 'gestor';
  document.getElementById('login-prof-row').style.display = 'none';
  // Restaurar visibilidade de todos itens de menu
  document.querySelectorAll('.nav-item').forEach(el => el.style.display = '');
  currentUser = { role:null, nome:'', profId:null, alunoId:null, turmas:[] };
  chartsCreated = {};
  alunosFiltrados = [];
}

// ═══════════════════════════════════════════════════════════
// NAVEGAÇÃO
// ═══════════════════════════════════════════════════════════
const viewTitles = {
  dashboard:        ['Dashboard', 'Visão geral da escola'],
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
  const el = document.getElementById('view-' + view);
  if(!el) { showToast('Módulo não disponível.','warning'); return; }
  const permission = viewPermissions[view];
  if(!permission || !requirePermission(permission)) return;

  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  el.classList.add('active');

  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.querySelector(`.nav-item[data-view="${view}"]`)?.classList.add('active');

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

async function initApp() {
  await loadSupabaseData();
  // Preencher datas padrão
  const hoje = new Date().toISOString().slice(0,10);
  const semAnt = new Date(Date.now()-7*864e5).toISOString().slice(0,10);
  if(document.getElementById('freqDataIni')) document.getElementById('freqDataIni').value = semAnt;
  if(document.getElementById('freqDataFim')) document.getElementById('freqDataFim').value = hoje;
  if(document.getElementById('n-data')) document.getElementById('n-data').valueAsDate = new Date();
  if(document.getElementById('laud-data')) document.getElementById('laud-data').value = hoje;

  popularSelects();
}

// ═══════════════════════════════════════════════════════════
// SELECTS GLOBAIS
// ═══════════════════════════════════════════════════════════
function popularSelects() {
  const alunos = getAlunosVisiveis();

  const loginProf = document.getElementById('loginProfId');
  if(loginProf) {
    loginProf.innerHTML = '<option value="">Selecione um professor</option>' +
      DB.professores.map(professor => {
        const turmas = professor.turmas.length ? ` (${professor.turmas.join(' · ')})` : '';
        return `<option value="${professor.id}">${professor.nome} — ${professor.disciplina || 'Sem disciplina'}${turmas}</option>`;
      }).join('');
  }

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
  const notaDisc = document.getElementById('n-disc');
  if(notaDisc) notaDisc.innerHTML = discNames.map(d => `<option value="${d}">${d}</option>`).join('');

  const alunoTurma = document.getElementById('filterTurmaSelect');
  if(alunoTurma) {
    const classes = [...new Set(alunos.map(aluno => aluno.turma))].sort();
    alunoTurma.innerHTML = '<option value="">Todas as turmas</option>' +
      classes.map(turma => `<option value="${turma}">${turma}</option>`).join('');
  }

  const freqTurma = document.getElementById('freqTurma');
  if(freqTurma) {
    const classes = [...new Set(alunos.map(aluno => aluno.turma))].sort();
    const selected = classes.includes(freqTurma.value) ? freqTurma.value : classes[0];
    freqTurma.innerHTML = classes.map(turma =>
      `<option value="${turma}"${turma === selected ? ' selected' : ''}>${turma}</option>`
    ).join('');
  }

  // Turmas filtro avaliações
  const at = document.getElementById('avalTurmaFiltro');
  if(at) {
    const classes = [...new Set(alunos.map(aluno => aluno.turma))].sort();
    at.innerHTML = '<option value="">Todas</option>' + classes.map(turma => `<option>${turma}</option>`).join('');
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
  if(!requirePermission('verDashboard')) return;
  renderDashboardStats();
  setTimeout(() => { createMainChart(); }, 50);
}

function renderDashboardStats() {
  if(!perm('verDashboard')) return;
  const alunos = getAlunosVisiveis();
  const set = (id, v) => { const el = document.getElementById(id); if(el) el.textContent = v; };
  set('stat-total',    alunos.length);
  set('stat-critico',  alunos.filter(a => a.risco === 'critical').length);
  set('stat-moderado', alunos.filter(a => a.risco === 'medium').length);
  set('stat-enc',      DB.encaminhamentos.filter(e => e.status !== 'Encerrado').length);
}

function createMainChart() {
  const ctx = document.getElementById('mainChart'); if(!ctx||chartsCreated.mainChart) return;
  chartsCreated.mainChart = new Chart(ctx, {
    type:'line', data:{labels:['Dez','Jan','Fev','Mar','Abr','Mai'],
    datasets:[
      {label:'Média Geral',data:[7.8,7.5,7.2,6.9,6.7,7.1],borderColor:'#2563EB',backgroundColor:'rgba(37,99,235,0.08)',fill:true,tension:0.4,pointRadius:5,pointBackgroundColor:'#2563EB'},
      {label:'Frequência %',data:[94,91,89,87,85,88],borderColor:'#10B981',backgroundColor:'rgba(16,185,129,0.05)',fill:true,tension:0.4,pointRadius:5,pointBackgroundColor:'#10B981'},
    ]},
    options:{responsive:true,plugins:{legend:{position:'bottom',labels:{font:{family:'Inter'},boxWidth:12,padding:16}}},scales:{y:{min:60,grid:{color:'rgba(0,0,0,0.05)'}},x:{grid:{display:false}}}}
  });
}

// ═══════════════════════════════════════════════════════════
// ALUNOS
// ═══════════════════════════════════════════════════════════
function renderAlunos(list) {
  if(!requirePermission('verAlunos')) return;
  const canEdit = perm('editarAlunos');
  const allowedIds = new Set(getAlunosVisiveis().map(aluno => aluno.id));
  const data = (list || alunosFiltrados).filter(aluno => allowedIds.has(aluno.id));
  document.getElementById('alunosCount').textContent = data.length + ' aluno(s)';
  const tbody = document.getElementById('alunosTable'); if(!tbody) return;

  // Mostrar/esconder botão novo aluno conforme RBAC
  const btnNovo = document.querySelector('#view-alunos .btn-primary');
  if(btnNovo) btnNovo.style.display = canEdit ? '' : 'none';

  tbody.innerHTML = data.map(a => {
    const rc  = a.risco==='critical'?'critical':a.risco==='medium'?'medium':'normal';
    const rl  = a.risco==='critical'?'Crítico':a.risco==='medium'?'Moderado':'Normal';
    const fc  = a.freq<70?'var(--red)':a.freq<85?'var(--amber)':'var(--green)';
    const mc  = a.media<5?'var(--red)':a.media<7?'var(--amber)':'var(--green)';
    return `<tr>
      <td><div class="td-name"><div class="td-avatar ${getAvatarColor(a.id)}">${getInitials(a.nome)}</div>
        <div><div style="font-weight:700;font-size:13.5px">${a.nome}</div>
        <div style="font-size:11px;color:var(--text-muted)">RA: ${a.mat} · ${a.resp}</div></div></div></td>
      <td><span class="tag blue">${a.turma}</span></td>
      <td style="font-size:12px;color:var(--text-muted)">${a.mat}</td>
      <td><span style="font-weight:700;color:${fc}">${a.freq}%</span></td>
      <td><span style="font-weight:700;color:${mc}">${a.media.toFixed(1)}</span></td>
      <td><span class="risk-badge ${rc}">${rl}</span></td>
      <td><div style="display:flex;gap:6px">
        <button class="btn btn-ghost btn-sm" onclick="showAlunoDetalhe(${a.id})">Ver</button>
        ${canEdit?`<button class="btn btn-ghost btn-sm" onclick="editAluno(${a.id})">Editar</button>
        <button class="btn btn-ghost btn-sm" style="color:var(--red)" onclick="deleteAluno(${a.id})">Excluir</button>`:''}
      </div></td>
    </tr>`;
  }).join('') || '<tr><td colspan="7"><div class="empty-state"><div class="empty-state-icon"></div><p>Nenhum aluno encontrado.</p></div></td></tr>';
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

async function saveAluno() {
  if(!perm('editarAlunos')) { showToast('Sem permissão.','danger'); return; }
  const nome = document.getElementById('a-nome').value.trim();
  if(!nome) { showToast('Nome é obrigatório!','danger'); return; }
  const turmaNome = document.getElementById('a-turma').value;
  const turma = DB.turmas.find(t => t.nome === turmaNome);
  if(!turma) { showToast('Turma não encontrada.','danger'); return; }
  const payload = {
    nome, turma_id: turma.id,
    mat: document.getElementById('a-mat').value.trim() || ('2025'+String(DB.alunos.length+1).padStart(3,'0')),
    nasc: document.getElementById('a-nasc').value || null,
    resp: document.getElementById('a-resp').value,
    tel: document.getElementById('a-tel').value,
    freq: 100, media: 0, risco: 'normal',
    obs: document.getElementById('a-obs').value
  };
  let error;
  const isEditing = Boolean(editingAlunoId);
  if(editingAlunoId) {
    ({ error } = await window.supabaseClient.from('alunos').update(payload).eq('id', editingAlunoId));
  } else {
    ({ error } = await window.supabaseClient.from('alunos').insert(payload));
  }
  if(error){ console.error(error); showToast('Erro ao salvar aluno no Supabase.','danger'); return; }
  await loadSupabaseData();
  alunosFiltrados = [...getAlunosVisiveis()];
  editingAlunoId = null;
  closeModal('modal-aluno'); renderAlunos(); popularSelects();
  showToast(isEditing ? 'Aluno atualizado!' : 'Aluno '+ nome +' cadastrado!','success');
  ['a-nome','a-nasc','a-mat','a-resp','a-tel','a-obs'].forEach(id=>document.getElementById(id).value='');
}
async function deleteAluno(id) {
  if(!perm('editarAlunos')) { showToast('Sem permissão.','danger'); return; }
  if(!confirm('Excluir este aluno? Esta ação não pode ser desfeita.')) return;
  const { error } = await window.supabaseClient.from('alunos').delete().eq('id', id);
  if(error){ console.error(error); showToast('Erro ao remover aluno no Supabase.','danger'); return; }
  await loadSupabaseData();
  alunosFiltrados=[...getAlunosVisiveis()];
  renderAlunos();
  showToast('Aluno removido.','warning');
}
function editAluno(id) {
  if(!perm('editarAlunos')) { showToast('Sem permissão.','danger'); return; }
  const a = DB.alunos.find(x=>x.id===id); if(!a) return;
  editingAlunoId = id;
  document.getElementById('a-nome').value = a.nome; document.getElementById('a-turma').value = a.turma;
  document.getElementById('a-nasc').value = a.nasc || '';
  document.getElementById('a-mat').value = a.mat || '';
  document.getElementById('a-resp').value = a.resp; document.getElementById('a-tel').value = a.tel;
  document.getElementById('a-obs').value = a.obs; openModal('modal-aluno');
}

function showAlunoDetalhe(id) {
  if(!perm('verAlunoDetalhe') || !canAccessStudent(id)) {
    showToast('Acesso não autorizado.','danger');
    return;
  }
  const a = DB.alunos.find(x=>x.id===id); if(!a) return;
  const notas = DB.notas.filter(n=>n.alunoId===id);
  const obs   = perm('verObservacoes') ? DB.observacoes.filter(o=>o.alunoId===id) : [];
  const laudo = perm('verLaudos') ? DB.laudos.filter(l=>l.alunoId===id) : [];
  const rc    = a.risco==='critical'?'critical':a.risco==='medium'?'medium':'normal';
  document.getElementById('alunoDetalheContent').innerHTML = `
    <div style="display:flex;align-items:center;gap:16px;margin-bottom:20px">
      <div class="td-avatar ${getAvatarColor(a.id)}" style="width:56px;height:56px;font-size:20px;border-radius:16px">${getInitials(a.nome)}</div>
      <div><div style="font-family:'Inter',sans-serif;font-size:20px;font-weight:800">${a.nome}</div>
        <div style="font-size:13px;color:var(--text-muted)">Turma ${a.turma} · RA: ${a.mat} · ${a.resp} · ${a.tel}</div>
        ${laudo.length?`<div style="margin-top:6px">${laudo.map(l=>`<span class="tag amber"> ${l.tipo}</span>`).join(' ')}</div>`:''}
      </div>
      <div style="margin-left:auto"><span class="risk-badge ${rc}" style="font-size:13px;padding:6px 14px">
        ${a.risco==='critical'?' Risco Crítico':a.risco==='medium'?' Atenção Moderada':' Normal'}</span></div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:20px">
      <div style="text-align:center;padding:14px;background:var(--gray-50);border-radius:10px">
        <div style="font-family:'Inter',sans-serif;font-size:28px;font-weight:800;color:${a.freq<70?'var(--red)':a.freq<85?'var(--amber)':'var(--green)'}">${a.freq}%</div>
        <div style="font-size:11px;color:var(--text-muted);font-weight:700;text-transform:uppercase;letter-spacing:0.5px">Frequência</div>
      </div>
      <div style="text-align:center;padding:14px;background:var(--gray-50);border-radius:10px">
        <div style="font-family:'Inter',sans-serif;font-size:28px;font-weight:800;color:${a.media<5?'var(--red)':a.media<7?'var(--amber)':'var(--green)'}">${a.media.toFixed(1)}</div>
        <div style="font-size:11px;color:var(--text-muted);font-weight:700;text-transform:uppercase;letter-spacing:0.5px">Média Geral</div>
      </div>
    </div>
    ${notas.length?`<div style="margin-bottom:16px"><div style="font-weight:700;font-size:13px;margin-bottom:8px;color:var(--text-muted)">AVALIAÇÕES RECENTES</div>${notas.slice(0,5).map(n=>`<div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--gray-100);font-size:13px"><span>${n.disciplina} · ${n.tipo} · ${n.bim}</span><span style="font-weight:700;color:${n.nota<5?'var(--red)':n.nota<7?'var(--amber)':'var(--green)'}">${n.nota}</span></div>`).join('')}</div>`:''}
    ${obs.length?`<div><div style="font-weight:700;font-size:13px;margin-bottom:8px;color:var(--text-muted)">OBSERVAÇÕES</div>${obs.map(o=>`<div style="padding:10px;background:${o.prio==='high'?'var(--red-pale)':'var(--amber-pale)'};border-radius:8px;margin-bottom:8px;font-size:13px">${o.texto}<div style="font-size:11px;color:var(--text-muted);margin-top:4px">${o.prof} · ${o.data}</div></div>`).join('')}</div>`:''}
  `;
  const detailActions = document.querySelectorAll('#modal-aluno-detalhe .modal-actions button');
  if(detailActions[1]) detailActions[1].style.display = perm('editarEnc') ? '' : 'none';
  if(detailActions[2]) detailActions[2].style.display = perm('verCasos') ? '' : 'none';
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
  if(!requirePermission('verProfs')) return;
  const tbody = document.getElementById('professoresTable'); if(!tbody) return;
  const canEdit = perm('editarProfs');
  tbody.innerHTML = DB.professores.map(p => `<tr>
    <td><div class="td-name"><div class="td-avatar td-avatar-blue">${getInitials(p.nome)}</div>
      <div><div style="font-weight:700">${p.nome}</div><div style="font-size:11px;color:var(--text-muted)">${p.email}</div></div></div></td>
    <td><span class="tag blue">${p.disciplina}</span></td>
    <td>${p.turmas.map(t=>`<span class="tag gray" style="margin:1px">${t}</span>`).join('')}</td>
    <td style="font-size:12px;color:var(--text-muted)">${p.ultimo}</td>
    <td><div style="display:flex;gap:6px">
      ${canEdit?`<button class="btn btn-ghost btn-sm" style="color:var(--red)" onclick="deleteProfessor(${p.id})">Excluir</button>`:'<span style="font-size:12px;color:var(--text-muted)">Somente leitura</span>'}
    </div></td>
  </tr>`).join('');
  // Botão novo professor visível somente ao gestor
  const btnNovoProfEl = document.querySelector('#view-professores .page-header-actions');
  if(btnNovoProfEl) btnNovoProfEl.style.display = canEdit ? '' : 'none';
}

async function saveProfessor() {
  if(!perm('editarProfs')) { showToast('Sem permissão.','danger'); return; }
  const nome = document.getElementById('p-nome').value.trim();
  if(!nome) { showToast('Nome é obrigatório!','danger'); return; }
  const payload = {
    nome, disciplina: document.getElementById('p-disc').value,
    email: document.getElementById('p-email').value,
    reg: document.getElementById('p-reg').value, ultimo: 'Hoje'
  };
  const { error } = await window.supabaseClient.from('professores').insert(payload);
  if(error){ console.error(error); showToast('Erro ao cadastrar professor no Supabase.','danger'); return; }
  await loadSupabaseData();
  closeModal('modal-professor'); renderProfessores(); popularSelects();
  showToast('Professor '+nome+' cadastrado!','success');
}
async function deleteProfessor(id) {
  if(!perm('editarProfs')) { showToast('Sem permissão.','danger'); return; }
  if(!window.supabaseClient) {
    showToast('Supabase não está conectado.','danger');
    return;
  }
  if(!confirm('Excluir este professor? Esta ação não pode ser desfeita.')) return;

  const unlinkDisc = await window.supabaseClient
    .from('disciplinas')
    .update({ professor_id: null })
    .eq('professor_id', id);
  if(unlinkDisc.error){
    console.error(unlinkDisc.error);
    showToast('Erro ao desvincular disciplinas do professor.','danger');
    return;
  }

  const unlinkTurmas = await window.supabaseClient
    .from('professor_turmas')
    .delete()
    .eq('professor_id', id);
  if(unlinkTurmas.error){
    console.error(unlinkTurmas.error);
    showToast('Erro ao desvincular turmas do professor.','danger');
    return;
  }

  const { error } = await window.supabaseClient.from('professores').delete().eq('id', id);
  if(error){ console.error(error); showToast('Erro ao remover professor no Supabase.','danger'); return; }
  await loadSupabaseData();
  renderProfessores(); showToast('Professor removido.','warning');
}

// ═══════════════════════════════════════════════════════════
// DISCIPLINAS
// ═══════════════════════════════════════════════════════════
function renderDisciplinas() {
  if(!requirePermission('verDisc')) return;
  const canEdit = perm('editarDisc');
  const el = document.getElementById('disciplinasBody'); if(!el) return;

  if(!canEdit) {
    el.innerHTML = `<div class="rbac-notice"> Você tem acesso somente de leitura às disciplinas cadastradas.</div>`;
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

async function saveDisciplina() {
  if(!perm('editarDisc')) { showToast('Sem permissão.','danger'); return; }
  const nome = document.getElementById('disc-nome').value.trim();
  if(!nome) { showToast('Nome da disciplina é obrigatório!','danger'); return; }
  const turma = DB.turmas.find(t => t.nome === document.getElementById('disc-turma').value);
  if(!turma){ showToast('Turma não encontrada.','danger'); return; }
  const payload = {
    nome, turma_id: turma.id,
    professor_id: parseInt(document.getElementById('disc-prof').value)||null,
    ch: parseInt(document.getElementById('disc-ch').value)||1,
    ano: parseInt(document.getElementById('disc-ano').value)||2025,
    area: document.getElementById('disc-area').value
  };
  const { error } = await window.supabaseClient.from('disciplinas').insert(payload);
  if(error){ console.error(error); showToast('Erro ao cadastrar disciplina no Supabase.','danger'); return; }
  await loadSupabaseData();
  closeModal('modal-disciplina');
  // Atualizar selects de disciplina
  popularSelects();
  renderDisciplinas();
  showToast('Disciplina '+nome+' cadastrada!','success');
  ['disc-nome','disc-ch','disc-ano'].forEach(id=>document.getElementById(id).value='');
}
async function deleteDisciplina(id) {
  if(!requirePermission('editarDisc')) return;
  if(!confirm('Remover esta disciplina?')) return;
  const { error } = await window.supabaseClient.from('disciplinas').delete().eq('id', id);
  if(error){ console.error(error); showToast('Erro ao remover disciplina no Supabase.','danger'); return; }
  await loadSupabaseData();
  renderDisciplinas();
  popularSelects();
  showToast('Disciplina removida.','warning');
}

// ═══════════════════════════════════════════════════════════
// TURMAS
// ═══════════════════════════════════════════════════════════
function renderTurmas() {
  if(!requirePermission('verTurmas')) return;
  const el = document.getElementById('turmasCards'); if(!el) return;
  el.parentElement.innerHTML = `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:16px">${
    DB.turmas.map(t => {
      const color = 'blue';
      const discs = DB.disciplinas.filter(d=>d.nome && d.turma===t.nome).length;
      return `<div class="card stat-card ${color}">
        <div style="display:flex;justify-content:space-between;align-items:flex-start">
          <div style="font-family:'Inter',sans-serif;font-size:24px;font-weight:800;cursor:pointer" onclick="showView('alunos');filterAlunosTurma('${t.nome}')">${t.nome}</div>
          ${perm('editarTurmas') ? `<div style="display:flex;gap:6px">
            <button class="btn btn-ghost btn-sm" onclick="editTurma(${t.id})">Editar</button>
            <button class="btn btn-ghost btn-sm" style="color:var(--red)" onclick="deleteTurma(${t.id})">Excluir</button>
          </div>` : ''}
        </div>
        <div style="font-size:12px;color:var(--text-muted)">${t.serie} · ${t.turno}</div>
        <div style="height:14px"></div>
        <div style="display:flex;justify-content:space-between;font-size:12px;color:var(--text-muted)">
          <span> ${t.alunos} alunos</span><span> ${discs} disc.</span><span>${t.sala}</span>
        </div>
      </div>`;
    }).join('')
  }</div>`;
}
async function saveTurma() {
  if(!requirePermission('editarTurmas')) return;
  const nome = document.getElementById('t-nome').value.trim();
  if(!nome){ showToast('Nome é obrigatório!','danger'); return; }
  const payload = {
    nome, serie: document.getElementById('t-serie').value,
    turno: document.getElementById('t-turno').value,
    sala: document.getElementById('t-sala').value, qtd_alunos: 0
  };
  let error;
  if(editingTurmaId) {
    ({ error } = await window.supabaseClient.from('turmas').update(payload).eq('id', editingTurmaId));
  } else {
    ({ error } = await window.supabaseClient.from('turmas').insert(payload));
  }
  if(error){ console.error(error); showToast('Erro ao salvar turma no Supabase.','danger'); return; }
  await loadSupabaseData();
  closeModal('modal-turma');
  editingTurmaId = null;
  renderTurmas();
  showToast('Turma '+nome+' salva!','success');
}

function editTurma(id) {
  const turma = DB.turmas.find(t => t.id === id);
  if(!turma) return;
  editingTurmaId = id;
  document.getElementById('t-nome').value = turma.nome;
  document.getElementById('t-serie').value = turma.serie || '6º Ano';
  document.getElementById('t-turno').value = turma.turno || 'Matutino';
  document.getElementById('t-sala').value = turma.sala || '';
  openModal('modal-turma');
}

async function deleteTurma(id) {
  if(!requirePermission('editarTurmas')) return;
  if(!confirm('Excluir esta turma?')) return;
  const { error } = await window.supabaseClient.from('turmas').delete().eq('id', id);
  if(error){
    console.error(error);
    showToast('Não foi possível excluir: remova primeiro os registros vinculados a esta turma.','danger');
    return;
  }
  await loadSupabaseData();
  renderTurmas();
  showToast('Turma removida!','warning');
}

// ═══════════════════════════════════════════════════════════
// FREQUÊNCIA (turma + disciplina + período)
// ═══════════════════════════════════════════════════════════
function loadFreqTurma() { renderFrequencia(); }
function renderFrequencia() {
  if(!requirePermission('verFreq')) return;
  const turmaSelect = document.getElementById('freqTurma');
  const alunoDoResponsavel = currentUser.role === 'pais'
    ? DB.alunos.find(aluno => aluno.id === currentUser.alunoId)
    : null;
  const turma = alunoDoResponsavel?.turma || turmaSelect?.value || '8A';
  if(turmaSelect && alunoDoResponsavel) {
    turmaSelect.value = turma;
    turmaSelect.disabled = true;
  } else if(turmaSelect) {
    turmaSelect.disabled = false;
  }
  const disc  = document.getElementById('freqDisc')?.value||'';
  const ini   = document.getElementById('freqDataIni')?.value||'';
  const fim   = document.getElementById('freqDataFim')?.value||'';

  document.getElementById('freqTurmaLabel').textContent = turma;
  const discLabel = disc ? ` · ${disc}` : ' · Todas as disciplinas';
  const perLabel  = (ini && fim) ? ` · ${ini} até ${fim}` : '';
  const pl = document.getElementById('freqPeriodoLabel');
  if(pl) pl.textContent = turma + discLabel + perLabel;

  const listaCompleta = DB.freqData[turma] || generateFreqList(turma);
  DB.freqData[turma] = listaCompleta;
  const lista = listaCompleta.filter(aluno => canAccessStudent(aluno.id));
  const el = document.getElementById('freqList'); if(!el) return;

  el.innerHTML = lista.map(aluno => `
    <div style="display:flex;align-items:center;gap:14px;padding:12px 20px;border-bottom:1px solid var(--gray-100)">
      <div class="td-avatar ${getAvatarColor(aluno.id)}" style="width:36px;height:36px">${getInitials(aluno.nome)}</div>
      <div style="flex:1">
        <div style="font-size:13.5px;font-weight:600">${aluno.nome}</div>
        <div style="font-size:11px;color:var(--text-muted)">RA: ${DB.alunos.find(a=>a.id===aluno.id)?.mat||'—'}</div>
      </div>
      ${perm('editarFreq')?`<div style="display:flex;gap:6px">
        <button class="btn btn-sm ${aluno.status==='present'?'btn-success':'btn-ghost'}" onclick="setFreq(${aluno.id},'${turma}','present')">Presente</button>
        <button class="btn btn-sm ${aluno.status==='absent'?'btn-danger':'btn-ghost'}" onclick="setFreq(${aluno.id},'${turma}','absent')">Falta</button>
        <button class="btn btn-sm ${aluno.status==='justified'?'btn-amber':'btn-ghost'}" onclick="setFreq(${aluno.id},'${turma}','justified')">Justif.</button>
      </div>`:''}
    </div>`).join('');

  const saveButton = document.getElementById('freqSaveBtn');
  if(saveButton) saveButton.style.display = perm('editarFreq') ? '' : 'none';
  const historyCard = document.getElementById('freqChart')?.closest('.card');
  if(currentUser.role === 'pais') {
    if(historyCard) historyCard.style.display = 'none';
    if(chartsCreated.freqChart) {
      chartsCreated.freqChart.destroy();
      delete chartsCreated.freqChart;
    }
  } else {
    if(historyCard) historyCard.style.display = '';
    createFreqChart();
  }
  renderFreqSummary(lista);
}
function generateFreqList(turma) {
  return DB.alunos.filter(a=>a.turma===turma).map(a=>({id:a.id,nome:a.nome,status:'present'}));
}
function setFreq(id,turma,status) {
  if(!requirePermission('editarFreq') || !canAccessStudent(id)) return;
  if(!['present','absent','justified'].includes(status)) {
    showToast('Status de frequência inválido.','danger');
    return;
  }
  if(DB.alunos.find(aluno => aluno.id === Number(id))?.turma !== turma) {
    showToast('A turma não corresponde ao aluno selecionado.','danger');
    return;
  }
  const item = DB.freqData[turma]?.find(x=>x.id===id);
  if(item){ item.status=status; renderFrequencia(); }
}
function renderFreqSummary(lista) {
  if(!requirePermission('verFreq')) return;
  lista = lista.filter(aluno => canAccessStudent(aluno.id));
  const p=lista.filter(x=>x.status==='present').length,
        a=lista.filter(x=>x.status==='absent').length,
        j=lista.filter(x=>x.status==='justified').length,
        tot=lista.length||1;
  document.getElementById('freqSummary').innerHTML = `
    <div style="display:flex;flex-direction:column;gap:10px">
      <div style="display:flex;justify-content:space-between"><span style="font-size:13px;color:var(--text-muted)">Total</span><strong>${tot}</strong></div>
      <div style="display:flex;justify-content:space-between"><span style="font-size:13px;color:var(--green)">Presentes</span><strong style="color:var(--green)">${p}</strong></div>
      <div style="display:flex;justify-content:space-between"><span style="font-size:13px;color:var(--red)">Ausentes</span><strong style="color:var(--red)">${a}</strong></div>
      <div style="display:flex;justify-content:space-between"><span style="font-size:13px;color:var(--amber)"> Justificados</span><strong style="color:var(--amber)">${j}</strong></div>
      <div class="progress-bar" style="margin-top:4px"><div class="progress-fill ${(p/tot*100)>85?'green':'amber'}" style="width:${(p/tot*100).toFixed(0)}%"></div></div>
      <div style="font-size:12px;font-weight:700">${(p/tot*100).toFixed(0)}% de presença</div>
    </div>`;
}
function createFreqChart() {
  const ctx = document.getElementById('freqChart'); if(!ctx) return;
  if(chartsCreated.freqChart){ chartsCreated.freqChart.destroy(); delete chartsCreated.freqChart; }
  chartsCreated.freqChart = new Chart(ctx,{type:'bar',data:{labels:['Sem 1','Sem 2','Sem 3','Sem 4'],datasets:[{label:'Presença %',data:[92,88,85,87],backgroundColor:'rgba(16,185,129,0.7)',borderRadius:6}]},options:{responsive:true,plugins:{legend:{display:false}},scales:{y:{min:70,max:100,grid:{color:'rgba(0,0,0,0.05)'}},x:{grid:{display:false}}}}});
}
async function saveFrequencia() {
  if(!requirePermission('editarFreq')) return;
  const turmaNome = document.getElementById('freqTurma')?.value;
  const turma = DB.turmas.find(t => t.nome === turmaNome);
  const data = document.getElementById('freqDataFim')?.value;
  if(!turma || !data) {
    showToast('Selecione uma turma e uma data.','danger');
    return;
  }
  const registros = (DB.freqData[turmaNome] || []).map(item => ({
    aluno_id: item.id,
    turma_id: turma.id,
    data,
    status: item.status
  }));
  if(!registros.length) {
    showToast('Nenhum aluno nesta turma.','warning');
    return;
  }
  const { error } = await window.supabaseClient
    .from('frequencia')
    .upsert(registros, { onConflict: 'aluno_id,data' });
  if(error){
    console.error(error);
    showToast('Erro ao salvar frequência no Supabase.','danger');
    return;
  }
  await loadSupabaseData();
  renderFrequencia();
  showToast('Frequência salva com sucesso!','success');
}

// ═══════════════════════════════════════════════════════════
// AVALIAÇÕES — Consulta por aluno
// ═══════════════════════════════════════════════════════════
function filtrarAvalAlunos() {
  const turma = document.getElementById('avalTurmaFiltro')?.value||'';
  const base  = getAlunosVisiveis();
  const lista = currentUser.role === 'pais'
    ? base
    : turma ? base.filter(a=>a.turma===turma) : base;
  const sel   = document.getElementById('avalAlunoFiltro'); if(!sel) return;
  sel.innerHTML = '<option value="">Selecione um aluno</option>' + lista.map(a=>`<option value="${a.id}">${a.nome} · ${a.turma}</option>`).join('');
  if(currentUser.role === 'pais') {
    sel.value = String(currentUser.alunoId);
    sel.disabled = true;
    const turmaControl = document.getElementById('avalTurmaFiltro')?.parentElement?.parentElement;
    if(turmaControl) turmaControl.style.display = 'none';
  } else {
    sel.disabled = false;
    const turmaControl = document.getElementById('avalTurmaFiltro')?.parentElement?.parentElement;
    if(turmaControl) turmaControl.style.display = '';
  }
  renderAvaliacoesAluno();
}

function renderAvaliacoes() {
  if(!requirePermission('verAvaliacoes')) return;
  const actions = document.getElementById('avaliacoesActions');
  if(actions) actions.style.display = perm('editarNotas') || perm('editarObservacoes') ? '' : 'none';
  const obsTabButton = document.getElementById('observacoesTabButton');
  const obsTab = document.getElementById('tab-observacoes');
  if(obsTabButton) obsTabButton.style.display = perm('verObservacoes') ? '' : 'none';
  if(obsTab) obsTab.style.display = 'none';
  const historyTabButton = document.getElementById('historicoTabButton');
  const historyTab = document.getElementById('tab-historico');
  if(historyTabButton) historyTabButton.style.display = perm('verAvaliacoes') ? '' : 'none';
  if(historyTab) historyTab.style.display = 'none';
  document.querySelectorAll('#view-avaliacoes .tab-btn').forEach(button => button.classList.remove('active'));
  document.querySelector('#view-avaliacoes .tab-btn')?.classList.add('active');
  const notesTab = document.getElementById('tab-notas');
  if(notesTab) notesTab.style.display = 'block';
  filtrarAvalAlunos();
  renderAvaliacoesAluno();
  renderObservacoes();
  populateHistoricoSelect();
}

function renderAvaliacoesAluno() {
  if(!perm('verAvaliacoes')) return;
  const alunoSelect = document.getElementById('avalAlunoFiltro');
  if(currentUser.role === 'pais' && alunoSelect) alunoSelect.value = String(currentUser.alunoId);
  const alunoId = parseInt(alunoSelect?.value||'0');
  const bim     = document.getElementById('avalBimFiltro')?.value||'';
  const disc    = document.getElementById('avalDiscFiltro')?.value||'';
  const infoEl  = document.getElementById('avalAlunoInfo');

  if(!alunoId || !canAccessStudent(alunoId)) {
    if(infoEl) infoEl.innerHTML = `<div class="aval-aluno-header"><span style="font-size:14px;color:var(--text-muted)"> Selecione um aluno para visualizar suas avaliações</span></div>`;
    const tbody = document.getElementById('notasTable');
    if(tbody) tbody.innerHTML = '';
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
        ${n.var<-2?' <span class="tag red" style="font-size:10px"> Queda</span>':''}</td>
    </tr>`;
  }).join('') || '<tr><td colspan="7"><div class="empty-state"><div class="empty-state-icon"></div><p>Nenhuma avaliação encontrada para os filtros selecionados.</p></div></td></tr>';
}

function renderObservacoes() {
  const el = document.getElementById('observacoesListView'); if(!el) return;
  if(!perm('verObservacoes')) {
    el.innerHTML = '<div class="empty-state"><p>Observações não disponíveis para este perfil.</p></div>';
    return;
  }
  const obs = DB.observacoes.filter(o => {
    if(currentUser.role==='professor') return currentUser.turmas.includes(DB.alunos.find(a=>a.id===o.alunoId)?.turma);
    return canAccessStudent(o.alunoId);
  });
  el.innerHTML = obs.map(o=>`
    <div style="padding:16px;border-radius:12px;border:1px solid var(--gray-200);margin-bottom:12px;background:${o.prio==='high'?'var(--red-pale)':o.prio==='medium'?'var(--amber-pale)':'var(--gray-50)'}">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;flex-wrap:wrap">
        <div class="td-avatar ${getAvatarColor(o.alunoId)}" style="width:32px;height:32px">${getInitials(o.aluno)}</div>
        <strong>${o.aluno}</strong>
        <span class="tag ${o.prio==='high'?'red':o.prio==='medium'?'amber':'gray'}">${o.prio==='high'?'Alta':o.prio==='medium'?'Média':'Baixa'}</span>
        <span style="margin-left:auto;font-size:11px;color:var(--text-muted)">${o.prof} · ${o.data}</span>
      </div>
      <div style="font-size:13.5px;color:var(--text);line-height:1.5">"${o.texto}"</div>
    </div>`).join('') || '<div class="empty-state"><div class="empty-state-icon"></div><p>Nenhuma observação registrada.</p></div>';
}

async function saveNota() {
  if(!requirePermission('editarNotas')) return;
  const alunoId = parseInt(document.getElementById('n-aluno').value);
  const aluno   = DB.alunos.find(a=>a.id===alunoId);
  const nota    = parseFloat(document.getElementById('n-valor').value);
  const disciplina = document.getElementById('n-disc').value;
  if(!aluno || !canRecordGrade(alunoId, disciplina) || !Number.isFinite(nota) || nota < 0 || nota > 10) {
    showToast('Selecione um aluno autorizado, uma disciplina válida e uma nota entre 0 e 10.','danger');
    return;
  }
  const novaVar = nota - aluno.media;
  const payload = {
    aluno_id: alunoId,
    disciplina: document.getElementById('n-disc').value,
    tipo: document.getElementById('n-tipo').value,
    nota, bim: document.getElementById('n-bim').value,
    data: document.getElementById('n-data').value,
    variacao: +novaVar.toFixed(1)
  };
  const { error } = await window.supabaseClient.from('notas').insert(payload);
  if(error){ console.error(error); showToast('Erro ao lançar nota no Supabase.','danger'); return; }
  const novaMedia = +((aluno.media+nota)/2).toFixed(1);
  await window.supabaseClient.from('alunos').update({ media: novaMedia }).eq('id', alunoId);
  await loadSupabaseData();
  if(novaVar<-2.5){
    await window.supabaseClient.from('alertas').insert({
      tipo:'critical',
      titulo:'Queda Detectada — '+aluno.nome,
      descr:`Nota ${nota} registrada. Queda de ${Math.abs(novaVar).toFixed(1)} pontos.`,
      data:new Date().toISOString(),
      lido:false
    });
    await loadSupabaseData();
    document.getElementById('badge-alertas').textContent=DB.alertas.filter(a=>!a.lido).length;
    showToast(' Queda significativa detectada para '+aluno.nome,'danger');
  }
  closeModal('modal-nota'); renderAvaliacoesAluno(); showToast('Nota lançada!','success');
}

async function saveObservacao() {
  if(!requirePermission('editarObservacoes')) return;
  const alunoId = parseInt(document.getElementById('o-aluno').value);
  const aluno   = DB.alunos.find(a=>a.id===alunoId);
  const texto   = document.getElementById('o-texto').value.trim();
  if(!aluno || !canAccessStudent(alunoId) || !texto){ showToast('Selecione um aluno autorizado e preencha a observação.','danger'); return; }
  const payload = {
    aluno_id: alunoId,
    professor_id: currentUser.profId || null,
    texto, prio: document.getElementById('o-prio').value,
    data: new Date().toISOString().slice(0,10)
  };
  const { error } = await window.supabaseClient.from('observacoes').insert(payload);
  if(error){ console.error(error); showToast('Erro ao salvar observação no Supabase.','danger'); return; }
  await loadSupabaseData();
  closeModal('modal-observacao'); renderObservacoes(); showToast('Observação salva!','success');
  document.getElementById('o-texto').value='';
}

function switchTab(btn,tabId) {
  if(tabId === 'tab-observacoes' && !requirePermission('verObservacoes')) return;
  if(tabId === 'tab-historico' && !requirePermission('verAvaliacoes')) return;
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
  if(!perm('verHistorico') && !perm('verAvaliacoes')) {
    showToast('Acesso não autorizado.','danger');
    return;
  }
  alunoId = parseInt(alunoId || document.getElementById('historicoAlunoSelect')?.value);
  if(!alunoId || !canAccessStudent(alunoId)) {
    showToast('Acesso não autorizado ao histórico deste aluno.','danger');
    return;
  }
  const ctx = document.getElementById('historicoChart'); if(!ctx) return;
  if(chartsCreated.historicoChart){ chartsCreated.historicoChart.destroy(); delete chartsCreated.historicoChart; }
  const bims  = ['1º Bimestre','2º Bimestre','3º Bimestre','4º Bimestre'];
  const notas = DB.notas.filter(n => n.alunoId === alunoId);
  const dados = bims.map(b => {
    const ns = notas.filter(n => n.bim === b);
    return ns.length ? +(ns.reduce((s,n) => s + n.nota, 0) / ns.length).toFixed(1) : null;
  });
  chartsCreated.historicoChart = new Chart(ctx,{type:'line',data:{labels:bims,datasets:[{label:'Média das notas lançadas',data:dados,borderColor:'#2563EB',backgroundColor:'rgba(37,99,235,0.08)',fill:true,tension:0.4,pointRadius:6,spanGaps:true}]},options:{responsive:true,plugins:{legend:{position:'bottom'}},scales:{y:{min:0,max:10},x:{grid:{display:false}}}}});
}

// ═══════════════════════════════════════════════════════════
// ALERTAS
// ═══════════════════════════════════════════════════════════
function renderAlertas() {
  if(!requirePermission('verAlertas')) return;
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
function markRead(id){
  if(!requirePermission('editarAlertas')) return;
  const alerta=DB.alertas.find(x=>x.id===id);
  if(alerta) alerta.lido=true;
  document.getElementById('badge-alertas').textContent=DB.alertas.filter(item=>!item.lido).length;
  renderAlertas();
}
function markAllRead(){
  if(!requirePermission('editarAlertas')) return;
  DB.alertas.forEach(a=>a.lido=true);
  document.getElementById('badge-alertas').textContent='0';
  renderAlertas();
  showToast('Todos os alertas marcados como lidos.','success');
}

// ═══════════════════════════════════════════════════════════
// ENCAMINHAMENTOS (com busca por RA/nome)
// ═══════════════════════════════════════════════════════════
function renderEncaminhamentos() {
  if(!perm('verEnc')){ document.getElementById('encaminhamentosList').innerHTML='<div class="empty-state"><p>Acesso não autorizado.</p></div>'; return; }
  const busca  = (document.getElementById('encBusca')?.value||'').toLowerCase();
  const tipo   = document.getElementById('encTipoFiltro')?.value||'';
  const status = document.getElementById('encStatusFiltro')?.value||'';
  const el     = document.getElementById('encaminhamentosList'); if(!el) return;
  const TL     = {psico:' Psicólogo Escolar',tutelar:' Conselho Tutelar',familiar:' Reunião Familiar',pedagogico:' Reforço Pedagógico'};
  const UL     = {normal:'Normal',media:'Média',alta:' Alta'};

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
        ${perm('editarEnc')?`<button class="btn btn-ghost btn-sm" onclick="encerrarEncaminhamento(${e.id})">Encerrar</button>`:''}
      </div>
      <div style="font-size:13px;color:var(--text-muted);margin-bottom:8px">${e.just}</div>
      <div style="font-size:12px;color:var(--text-muted)">Resp: <strong>${e.resp}</strong> · ${e.data}</div>
    </div>`).join('') || '<div class="empty-state"><div class="empty-state-icon"></div><p>Nenhum encaminhamento encontrado.</p></div>';
}

async function saveEncaminhamento() {
  if(!requirePermission('editarEnc')) return;
  const alunoId = parseInt(document.getElementById('enc-aluno').value);
  const aluno   = DB.alunos.find(a=>a.id===alunoId);
  const just    = document.getElementById('enc-just').value.trim();
  if(!aluno || !canAccessStudent(alunoId) || !just){ showToast('Selecione um aluno autorizado e preencha os campos.','danger'); return; }
  const payload = {
    aluno_id: alunoId, tipo: document.getElementById('enc-tipo').value,
    urgencia: document.getElementById('enc-urg').value,
    resp: document.getElementById('enc-resp').value,
    just, data: new Date().toISOString().slice(0,10), status: 'Pendente'
  };
  const { error } = await window.supabaseClient.from('encaminhamentos').insert(payload);
  if(error){ console.error(error); showToast('Erro ao registrar encaminhamento no Supabase.','danger'); return; }
  await loadSupabaseData();
  closeModal('modal-encaminhamento'); renderEncaminhamentos(); showToast('Encaminhamento registrado!','success');
}

async function encerrarEncaminhamento(id) {
  if(!requirePermission('editarEnc')) return;
  const { error } = await window.supabaseClient.from('encaminhamentos').update({ status: 'Encerrado' }).eq('id', id);
  if(error){ console.error(error); showToast('Erro ao encerrar encaminhamento no Supabase.','danger'); return; }
  await loadSupabaseData();
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

  let lista = DB.casos.filter(c => {
    const a = DB.alunos.find(x=>x.id===c.alunoId); if(!a) return false;
    const termoBusca = !busca || a.nome.toLowerCase().includes(busca) || a.mat.includes(busca);
    const termoStatus = !status || c.status === status;
    return termoBusca && termoStatus;
  });

  const statusLabel = {ativo:' Crítico / Ativo', andamento:' Em andamento', encerrado:' Encerrado'};
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
        ${laudo.length?`<span class="tag amber" style="margin-left:6px"> ${laudo.map(l=>l.tipo).join(', ')}</span>`:''}
      </div>
      <div class="caso-card-body">
        ${c.meta?`<div style="padding:12px;background:var(--blue-pale);border-radius:10px;margin-bottom:12px">
          <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;color:var(--blue);margin-bottom:4px">META DO PLANO DE AÇÃO</div>
          <div style="font-size:13.5px;font-weight:600">${c.meta}</div>
        </div>`:`<div style="padding:12px;background:var(--gray-100);border-radius:10px;margin-bottom:12px;font-size:13px;color:var(--text-muted)"> Nenhum plano de ação registrado. <button class="btn btn-ghost btn-sm" onclick="abrirCasoPlano(${c.alunoId})" style="margin-left:8px">+ Criar Plano</button></div>`}
        ${c.meta?`<div style="margin-bottom:12px">
          <div style="font-size:12px;font-weight:700;color:var(--text-muted);margin-bottom:5px">PROGRESSO</div>
          <div class="progress-bar"><div class="progress-fill ${c.progresso>=70?'green':c.progresso>=30?'amber':'red'}" style="width:${c.progresso}%"></div></div>
          <div style="font-size:12px;color:var(--text-muted);margin-top:3px">${c.progresso}% concluído · Prazo: ${c.prazo||'—'} · Resp: ${c.resp||'—'}</div>
        </div>`:''}
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          <button class="btn btn-primary btn-sm" onclick="abrirCasoPlano(${c.alunoId})"> ${c.meta?'Editar Plano':'Criar Plano'}</button>
          <button class="btn btn-amber btn-sm" onclick="openModal('modal-encaminhamento')"> Encaminhar</button>
          <button class="btn btn-ghost btn-sm" onclick="showAlunoDetalhe(${c.alunoId})"> Ver Perfil</button>
          ${enc.length?`<span class="tag blue">${enc.length} encaminhamento(s)</span>`:''}
        </div>
      </div>
    </div>`;
  }).join('') || '<div class="empty-state"><div class="empty-state-icon"></div><p>Nenhum caso encontrado.</p></div>';
}

function abrirCasoPlano(alunoId) {
  if(!requirePermission('editarCasos')) return;
  if(!canAccessStudent(alunoId)) {
    showToast('Acesso não autorizado ao caso deste aluno.','danger');
    return;
  }
  const aluno  = DB.alunos.find(a=>a.id===alunoId); if(!aluno) return;
  const caso   = DB.casos.find(c=>c.alunoId===alunoId);
  document.getElementById('casoPlanoTitulo').textContent = ` Plano de Ação — ${aluno.nome}`;
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

async function saveCasoPlano() {
  if(!requirePermission('editarCasos')) return;
  const alunoId = parseInt(document.getElementById('caso-alunoId').value);
  if(!canAccessStudent(alunoId)) {
    showToast('Acesso não autorizado ao caso deste aluno.','danger');
    return;
  }
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
  if(caso) {
    const { error } = await window.supabaseClient.from('casos').update({
      meta:dados.meta, est:dados.est, prazo:dados.prazo||null,
      resp:dados.resp, progresso:dados.progresso, status:dados.status,
      updated_at: new Date().toISOString().slice(0,10)
    }).eq('id', caso.id);
    if(error){ console.error(error); showToast('Erro ao salvar plano no Supabase.','danger'); return; }
  } else {
    const { error } = await window.supabaseClient.from('casos').insert({
      aluno_id:alunoId, meta:dados.meta, est:dados.est, prazo:dados.prazo||null,
      resp:dados.resp, progresso:dados.progresso, status:dados.status,
      updated_at:new Date().toISOString().slice(0,10)
    });
    if(error){ console.error(error); showToast('Erro ao criar plano no Supabase.','danger'); return; }
  }
  await loadSupabaseData();
  closeModal('modal-caso-plano'); renderCasos();
  showToast('Plano de ação salvo!','success');
}

// ═══════════════════════════════════════════════════════════
// LAUDOS
// ═══════════════════════════════════════════════════════════
function renderLaudos() {
  if(!requirePermission('verLaudos')) return;
  const busca = (document.getElementById('laudosBusca')?.value||'').toLowerCase();
  const tipo  = document.getElementById('laudosTipoFiltro')?.value||'';
  const el    = document.getElementById('laudosList'); if(!el) return;

  let lista = [...DB.laudos];
  if(busca) lista = lista.filter(l=>{ const a=DB.alunos.find(x=>x.id===l.alunoId); return a && (a.nome.toLowerCase().includes(busca)||a.mat.includes(busca)); });
  if(tipo) lista = lista.filter(l=>l.tipo===tipo);

  el.innerHTML = lista.length?lista.map(l=>{
    const a   = DB.alunos.find(x=>x.id===l.alunoId)||{};
    const val = l.validade==='indefinida'?'Validade indeterminada':l.validade==='anual'?'Renovação anual necessária':'Renovação bienal';
    return `<div class="laudo-item">
      <div style="flex:1">
        <div style="font-weight:700;font-size:14px">${a.nome||'—'} <span class="tag amber" style="margin-left:6px">${l.tipo}</span></div>
        <div style="font-size:12px;color:var(--text-muted)">RA: ${a.mat||'—'} · Turma: ${a.turma||'—'} · CID: ${l.cid} · ${l.medico} · ${l.data}</div>
        <div style="font-size:12px;color:var(--text-muted);margin-top:3px">${val} · <em>${l.obs}</em></div>
      </div>
      ${perm('editarLaudos')?`<button class="btn btn-ghost btn-sm" style="color:var(--red)" onclick="deleteLaudo(${l.id})">Remover</button>`:''}
    </div>`;
  }).join('') : '<div class="empty-state"><div class="empty-state-icon"></div><p>Nenhum laudo encontrado.</p></div>';
}

async function saveLaudo() {
  if(!perm('editarLaudos')){ showToast('Sem permissão.','danger'); return; }
  const alunoId = parseInt(document.getElementById('laud-aluno').value);
  if(!alunoId){ showToast('Selecione um aluno!','danger'); return; }
  const payload = {
    aluno_id: alunoId,
    tipo:     document.getElementById('laud-tipo').value,
    cid:      document.getElementById('laud-cid').value,
    data:     document.getElementById('laud-data').value,
    medico:   document.getElementById('laud-medico').value,
    validade: document.getElementById('laud-validade').value,
    obs:      document.getElementById('laud-obs').value,
  };
  const { error } = await window.supabaseClient.from('laudos').insert(payload);
  if(error){ console.error(error); showToast('Erro ao registrar laudo no Supabase.','danger'); return; }
  await loadSupabaseData();
  closeModal('modal-laudo'); renderLaudos(); showToast('Laudo registrado com sucesso!','success');
  ['laud-cid','laud-medico','laud-obs'].forEach(id=>document.getElementById(id).value='');
}
async function deleteLaudo(id){
  if(!requirePermission('editarLaudos')) return;
  if(!confirm('Remover este laudo? Ação irreversível.')) return;
  const { error } = await window.supabaseClient.from('laudos').delete().eq('id', id);
  if(error){ console.error(error); showToast('Erro ao remover laudo no Supabase.','danger'); return; }
  await loadSupabaseData();
  renderLaudos();
  showToast('Laudo removido.','warning');
}

// ═══════════════════════════════════════════════════════════
// RELATÓRIOS
// ═══════════════════════════════════════════════════════════
function renderRelatorios() {
  if(!requirePermission('verRel')) return;
  const el = document.getElementById('relatoriosGrid'); if(!el) return;
  const reports = [
    {icon:'',title:'Relatório de Desempenho',desc:'Médias por turma, disciplina e bimestre.',color:'blue'},
    {icon:'',title:'Relatório de Frequência',desc:'Taxas de presença, ausência e justificativas por período.',color:'green'},
    {icon:'',title:'Alunos em Risco',desc:'Lista anonimizada de alunos com indicadores críticos.',color:'red'},
    {icon:'',title:'Encaminhamentos',desc:'Registro de todos os encaminhamentos do período.',color:'amber'},
    {icon:'',title:'Acompanhamento de Casos',desc:'Status de todos os planos de ação ativos.',color:'blue'},
    {icon:'',title:'Conselho de Classe',desc:'Relatório consolidado para reunião pedagógica.',color:'green'},
  ];
  el.innerHTML = `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:16px">` +
    reports.map(r=>`<div class="card stat-card ${r.color}">
      <div style="font-size:36px;margin-bottom:10px">${r.icon}</div>
      <div style="font-family:'Inter',sans-serif;font-size:15px;font-weight:700;margin-bottom:6px">${r.title}</div>
      <div style="font-size:12.5px;color:var(--text-muted);margin-bottom:16px;flex:1">${r.desc}</div>
      <button class="btn btn-ghost btn-sm" onclick="gerarRelatorio('${r.title}')"> Gerar PDF</button>
    </div>`).join('') + '</div>';
}
function gerarRelatorio(title){
  if(!requirePermission('verRel')) return;
  showToast(' Gerando "'+title+'"…','info');
  setTimeout(()=>showToast(' Relatório pronto! (Simulação)','success'),2000);
}

// ═══════════════════════════════════════════════════════════
// LGPD
// ═══════════════════════════════════════════════════════════
function renderLGPD() {
  if(!requirePermission('verLGPD')) return;
  const el = document.getElementById('lgpdContent'); if(!el) return;
  el.innerHTML = `
    <div class="grid-2">
      <div>
        <div class="card" style="margin-bottom:16px">
          <div class="card-header"><h3> Criptografia & Segurança</h3></div>
          <div class="card-body">
            ${[['Autenticação','Não implementada nesta demonstração','amber'],['Armazenamento','Dados mantidos apenas no navegador','amber'],['Autorização','Regras locais de demonstração','amber'],['Auditoria','Não persistida nem validada pelo servidor','amber']].map(([k,v,c])=>`
            <div style="display:flex;justify-content:space-between;align-items:center;padding:10px;background:var(--gray-50);border-radius:8px;margin-bottom:8px">
              <div><div style="font-weight:700;font-size:13px">${k}</div><div style="font-size:11px;color:var(--text-muted)">${v}</div></div>
              <span class="tag amber">Demonstração</span>
            </div>`).join('')}
          </div>
        </div>
        <div class="card">
          <div class="card-header"><h3> Controle de Acesso RBAC</h3></div>
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
          <div class="card-header"><h3> Anonimização de Dados</h3></div>
          <div class="card-body">
            <p style="font-size:13.5px;color:var(--text-muted);line-height:1.6;margin-bottom:16px">Esta tela demonstra políticas de acesso. Não há autenticação, anonimização, criptografia ou auditoria de servidor implementadas; não use dados reais.</p>
            <div style="padding:12px;background:var(--green-pale);border-radius:10px;font-size:13px;color:#065F46;margin-bottom:12px">
              <strong>Atenção</strong> — As permissões do navegador não substituem controles de acesso e proteção implementados no servidor.
            </div>
            <button class="btn btn-ghost btn-sm" style="width:100%" onclick="showToast('Geração de relatório não implementada nesta demonstração.','warning')">Gerar Relatório Anonimizado</button>
          </div>
        </div>
        <div class="card">
          <div class="card-header"><h3>Auditoria</h3></div>
          <div class="card-body">
            <div style="font-size:12px;font-family:monospace;background:var(--navy);color:#A5F3FC;padding:14px;border-radius:10px;line-height:1.9">
              <div>Registro de auditoria não implementado nesta demonstração.</div>
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
  if(id === 'modal-turma' && !editingTurmaId) {
    ['t-nome','t-sala'].forEach(field => {
      const el = document.getElementById(field);
      if(el) el.value = '';
    });
  }
  const modalPermissions = {
    'modal-aluno':'editarAlunos', 'modal-professor':'editarProfs', 'modal-nota':'editarNotas',
    'modal-observacao':'editarObservacoes', 'modal-encaminhamento':'editarEnc',
    'modal-aluno-detalhe':'verAlunoDetalhe', 'modal-disciplina':'editarDisc',
    'modal-laudo':'editarLaudos', 'modal-caso-plano':'editarCasos', 'modal-turma':'editarTurmas',
  };
  const permission = modalPermissions[id];
  if(!permission || !requirePermission(permission)) return;
  popularSelects();
  const modal = document.getElementById(id);
  if(!modal) {
    showToast('Janela não disponível.','warning');
    return;
  }
  modal.classList.add('open');
}
function closeModal(id) {
  document.getElementById(id)?.classList.remove('open');
  if(id === 'modal-turma') editingTurmaId = null;
  if(id === 'modal-aluno') editingAlunoId = null;
}
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
  const container = document.getElementById('toastContainer');
  const t = document.createElement('div');
  t.className = `toast ${type==='danger'?'danger':type==='warning'?'warning':type==='info'?'info':''}`;
  t.innerHTML = `<span>${msg}</span>`;
  container.appendChild(t);
  setTimeout(()=>{ t.style.animation='toastOut 0.3s ease forwards'; setTimeout(()=>t.remove(),300); }, 3500);
}

// ═══════════════════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════════════════
window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('n-data').valueAsDate = new Date();
  loadSupabaseData().then(() => popularSelects());
});