-- Execute no SQL Editor do Supabase.
-- Configuracao exclusiva para ambiente demonstrativo.
-- Em producao, substitua por autenticacao Supabase Auth e politicas por perfil.

DO $$
DECLARE
  table_name text;
BEGIN
  FOREACH table_name IN ARRAY ARRAY[
    'turmas','professores','professor_turmas','alunos','disciplinas','notas',
    'observacoes','encaminhamentos','casos','laudos','alertas','frequencia'
  ]
  LOOP
    EXECUTE format(
      'CREATE POLICY "demo_anon_select_%1$s" ON public.%1$I FOR SELECT TO anon USING (true)',
      table_name
    );
    EXECUTE format(
      'CREATE POLICY "demo_anon_insert_%1$s" ON public.%1$I FOR INSERT TO anon WITH CHECK (true)',
      table_name
    );
    EXECUTE format(
      'CREATE POLICY "demo_anon_update_%1$s" ON public.%1$I FOR UPDATE TO anon USING (true) WITH CHECK (true)',
      table_name
    );
    EXECUTE format(
      'CREATE POLICY "demo_anon_delete_%1$s" ON public.%1$I FOR DELETE TO anon USING (true)',
      table_name
    );
  END LOOP;
END $$;
