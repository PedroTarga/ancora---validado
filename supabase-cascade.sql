-- OPCIONAL: não precisa executar este arquivo para corrigir a exclusão de professores.
-- O script.js já desvincula o professor de disciplinas e professor_turmas antes de excluí-lo.
-- Use este arquivo somente se quiser impedir manualmente registros orfãos ao excluir
-- turmas, professores ou alunos diretamente no Supabase.

ALTER TABLE public.professor_turmas
  DROP CONSTRAINT IF EXISTS professor_turmas_professor_id_fkey,
  DROP CONSTRAINT IF EXISTS professor_turmas_turma_id_fkey,
  ADD CONSTRAINT professor_turmas_professor_id_fkey
    FOREIGN KEY (professor_id) REFERENCES public.professores(id) ON DELETE CASCADE,
  ADD CONSTRAINT professor_turmas_turma_id_fkey
    FOREIGN KEY (turma_id) REFERENCES public.turmas(id) ON DELETE CASCADE;

ALTER TABLE public.disciplinas
  DROP CONSTRAINT IF EXISTS disciplinas_professor_id_fkey,
  DROP CONSTRAINT IF EXISTS disciplinas_turma_id_fkey,
  ADD CONSTRAINT disciplinas_professor_id_fkey
    FOREIGN KEY (professor_id) REFERENCES public.professores(id) ON DELETE SET NULL,
  ADD CONSTRAINT disciplinas_turma_id_fkey
    FOREIGN KEY (turma_id) REFERENCES public.turmas(id) ON DELETE CASCADE;

ALTER TABLE public.alunos
  DROP CONSTRAINT IF EXISTS alunos_turma_id_fkey,
  ADD CONSTRAINT alunos_turma_id_fkey
    FOREIGN KEY (turma_id) REFERENCES public.turmas(id) ON DELETE SET NULL;

ALTER TABLE public.notas
  DROP CONSTRAINT IF EXISTS notas_aluno_id_fkey,
  ADD CONSTRAINT notas_aluno_id_fkey
    FOREIGN KEY (aluno_id) REFERENCES public.alunos(id) ON DELETE CASCADE;

ALTER TABLE public.observacoes
  DROP CONSTRAINT IF EXISTS observacoes_aluno_id_fkey,
  DROP CONSTRAINT IF EXISTS observacoes_professor_id_fkey,
  ADD CONSTRAINT observacoes_aluno_id_fkey
    FOREIGN KEY (aluno_id) REFERENCES public.alunos(id) ON DELETE CASCADE,
  ADD CONSTRAINT observacoes_professor_id_fkey
    FOREIGN KEY (professor_id) REFERENCES public.professores(id) ON DELETE SET NULL;

ALTER TABLE public.encaminhamentos
  DROP CONSTRAINT IF EXISTS encaminhamentos_aluno_id_fkey,
  ADD CONSTRAINT encaminhamentos_aluno_id_fkey
    FOREIGN KEY (aluno_id) REFERENCES public.alunos(id) ON DELETE CASCADE;

ALTER TABLE public.casos
  DROP CONSTRAINT IF EXISTS casos_aluno_id_fkey,
  ADD CONSTRAINT casos_aluno_id_fkey
    FOREIGN KEY (aluno_id) REFERENCES public.alunos(id) ON DELETE CASCADE;

ALTER TABLE public.laudos
  DROP CONSTRAINT IF EXISTS laudos_aluno_id_fkey,
  ADD CONSTRAINT laudos_aluno_id_fkey
    FOREIGN KEY (aluno_id) REFERENCES public.alunos(id) ON DELETE CASCADE;

ALTER TABLE public.frequencia
  DROP CONSTRAINT IF EXISTS frequencia_aluno_id_fkey,
  DROP CONSTRAINT IF EXISTS frequencia_turma_id_fkey,
  ADD CONSTRAINT frequencia_aluno_id_fkey
    FOREIGN KEY (aluno_id) REFERENCES public.alunos(id) ON DELETE CASCADE,
  ADD CONSTRAINT frequencia_turma_id_fkey
    FOREIGN KEY (turma_id) REFERENCES public.turmas(id) ON DELETE CASCADE;
