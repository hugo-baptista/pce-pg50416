-- Povoar
select * from pais;
select * from vacina;
select * from administra;
select * from dados;

insert into pais(nome)
select distinct pais
from dados;

insert into vacina(nome)
select distinct vacina
from dados;

insert into administra
select p.id, v.id, d.dia, d.total as num_total
from dados d, pais p, vacina v
where p.nome=d.pais and v.nome=d.vacina;

-- a)
select nome as lista_de_países
from pais;

-- b)
create view vac_dia as
select id_p, id_vac, dia, 
num_total-lag(num_total,1,0) over (partition by id_p,id_vac order by id_p,id_vac,dia) as num_diario
from administra
order by id_p,id_vac,dia;
select * from  vac_dia;

create view soma_vac_mes as
select month(dia) as mes, year(dia) as ano, sum(num_diario) as soma
from vac_dia
group by mes, ano
order by ano,mes;
select * from soma_vac_mes;

select *
from soma_vac_mes
order by soma desc
limit 1;

-- c)
create view soma_vac_total_dia as
select day(dia) as dia_, month(dia) as mes, year(dia) as ano, sum(num_diario) as soma
from vac_dia
group by mes,ano,dia_
order by ano,mes,dia_;
select * from soma_vac_total_dia;

select *
from soma_vac_total_dia
where mes=1 and ano=2021
group by dia_
order by soma desc
limit 1;

-- d)
select nome, sum(m) as soma
from(select a.id_p,v.nome, max(a.num_total) as m
	from vacina v,administra a
	where v.id=a.id_vac
	group by a.id_p,v.nome) soma
group by nome
order by soma desc
limit 1;

-- e)
select dia, sum(num_total) vacinados
from administra a,pais p
where a.id_p=p.id and p.nome='Germany'
group by dia;