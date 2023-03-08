select * from dataset;
select * from country;
select * from manufacturer;
select * from vaccination;

-- Povoamento
insert into country
select distinct location
from dataset;

insert into manufacturer
select distinct vaccine
from dataset;

insert into vaccination
select location, vaccine, date, total_vaccinations
from dataset;

-- a)
select name
from country;

-- b)
create view vac_per_country_manufacturer_day as
select country_name, manufacturer_name, day as vac_date, total, total-lag(total,1,0)
over (partition by country_name, manufacturer_name order by country_name, manufacturer_name, day) as num_day
from vaccination
order by country_name, manufacturer_name, vac_date;
select * from vac_per_country_manufacturer_day;

create view vac_per_month as
select year(vac_date) as vac_year, month(vac_date) as vac_month, sum(num_day) as monthy_vac
from vac_per_country_manufacturer_day
group by vac_year, vac_month
order by vac_year, vac_month;
select * from vac_per_month;

select *
from vac_per_month
order by monthy_vac desc
limit 1;

-- c)
select year(vac_date) as vac_year, month(vac_date) as vac_month, day(vac_date) as vac_day, sum(num_day) as total_day
from vac_per_country_manufacturer_day
group by vac_year, vac_month, vac_day
order by total_day desc
limit 1;

-- d)
select manufacturer_name, sum(num_day) as total_day
from vac_per_country_manufacturer_day
group by manufacturer_name
order by total_day desc
limit 1;

-- e)
select country_name, year(vac_date) as vac_year, month(vac_date) as vac_month, sum(num_day) as total
from vac_per_country_manufacturer_day
where country_name = "Germany"
group by vac_year, vac_month
order by vac_year, vac_month;