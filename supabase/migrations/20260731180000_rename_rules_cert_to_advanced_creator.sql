-- Display rename only: preserve certificate_key `cert_rules_safety` after
-- Rules & Safety program became Advanced Creator (safety moved into Beginner Foundations).

update public.certificate_definitions
set
  name = 'Advanced Creator Certificate',
  description = 'Complete the Advanced Creator program path (lessons + Program Final) when published.'
where key = 'cert_rules_safety';
