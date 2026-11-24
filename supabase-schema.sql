-- Banco mínimo do Âncora para Supabase
-- Executar no SQL Editor recria apenas o banco usado pelo sistema.

DROP TABLE IF EXISTS frequencia;
DROP TABLE IF EXISTS alertas;
DROP TABLE IF EXISTS laudos;
DROP TABLE IF EXISTS casos;
DROP TABLE IF EXISTS encaminhamentos;
DROP TABLE IF EXISTS observacoes;
DROP TABLE IF EXISTS notas;
DROP TABLE IF EXISTS disciplinas;
DROP TABLE IF EXISTS professor_turmas;
DROP TABLE IF EXISTS alunos;
DROP TABLE IF EXISTS professores;
DROP TABLE IF EXISTS turmas;

CREATE TABLE turmas (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  nome varchar(10) NOT NULL,
  serie varchar(20),
  turno varchar(20),
  sala varchar(20),
  qtd_alunos integer DEFAULT 0
);

CREATE TABLE professores (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  nome varchar(100) NOT NULL,
  disciplina varchar(50),
  email varchar(100),
  reg varchar(20),
  ultimo varchar(20)
);

CREATE TABLE professor_turmas (
  professor_id bigint NOT NULL REFERENCES professores(id),
  turma_id bigint NOT NULL REFERENCES turmas(id),
  PRIMARY KEY (professor_id, turma_id)
);

CREATE TABLE alunos (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  nome varchar(100) NOT NULL,
  turma_id bigint REFERENCES turmas(id),
  mat varchar(10),
  nasc date,
  resp varchar(100),
  tel varchar(20),
  freq numeric(5,2) DEFAULT 100,
  media numeric(4,2) DEFAULT 0,
  risco varchar(10) DEFAULT 'normal',
  obs varchar(300)
);

CREATE TABLE disciplinas (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  nome varchar(50) NOT NULL,
  turma_id bigint REFERENCES turmas(id),
  professor_id bigint REFERENCES professores(id),
  ch integer,
  ano integer,
  area varchar(50)
);

CREATE TABLE notas (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  aluno_id bigint NOT NULL REFERENCES alunos(id),
  disciplina varchar(50),
  tipo varchar(20),
  nota numeric(4,2),
  bim varchar(20),
  data date,
  variacao numeric(4,2)
);

CREATE TABLE observacoes (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  aluno_id bigint NOT NULL REFERENCES alunos(id),
  professor_id bigint REFERENCES professores(id),
  texto varchar(500),
  prio varchar(10),
  data date
);

CREATE TABLE encaminhamentos (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  aluno_id bigint NOT NULL REFERENCES alunos(id),
  tipo varchar(20),
  urgencia varchar(10),
  resp varchar(100),
  just varchar(300),
  data date,
  status varchar(20) DEFAULT 'Pendente'
);

CREATE TABLE casos (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  aluno_id bigint NOT NULL REFERENCES alunos(id),
  meta varchar(300),
  est varchar(500),
  prazo date,
  status varchar(20) DEFAULT 'ativo',
  progresso integer DEFAULT 0,
  resp varchar(100),
  updated_at date
);

CREATE TABLE laudos (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  aluno_id bigint NOT NULL REFERENCES alunos(id),
  tipo varchar(50),
  cid varchar(10),
  data date,
  medico varchar(100),
  validade varchar(20),
  obs varchar(300)
);

CREATE TABLE alertas (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  tipo varchar(10),
  titulo varchar(150) NOT NULL,
  descr varchar(300),
  data timestamptz,
  lido boolean DEFAULT false
);

CREATE TABLE frequencia (
  aluno_id bigint NOT NULL REFERENCES alunos(id),
  turma_id bigint REFERENCES turmas(id),
  data date NOT NULL,
  status varchar(10),
  PRIMARY KEY (aluno_id, data)
);

CREATE INDEX idx_alunos_turma_id ON alunos(turma_id);
CREATE INDEX idx_disciplinas_turma_id ON disciplinas(turma_id);
CREATE INDEX idx_notas_aluno_id ON notas(aluno_id);
CREATE INDEX idx_observacoes_aluno_id ON observacoes(aluno_id);
CREATE INDEX idx_encaminhamentos_aluno_id ON encaminhamentos(aluno_id);
CREATE INDEX idx_casos_aluno_id ON casos(aluno_id);
CREATE INDEX idx_laudos_aluno_id ON laudos(aluno_id);

GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON
  turmas,
  professores,
  professor_turmas,
  alunos,
  disciplinas,
  notas,
  observacoes,
  encaminhamentos,
  casos,
  laudos,
  alertas,
  frequencia
TO anon, authenticated;

GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
