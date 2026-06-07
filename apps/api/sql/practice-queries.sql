-- 1. 최근 주문 20건
select
  o.order_number,
  c.name as customer_name,
  o.status,
  o.total_amount,
  o.ordered_at
from orders o
join customers c on c.id = o.customer_id
order by o.ordered_at desc
limit 20;

-- 2. 카테고리별 상품 수
select
  c.name as category_name,
  count(*) as product_count
from products p
join categories c on c.id = p.category_id
group by c.id, c.name
order by product_count desc, c.name asc;

-- 3. 매출 상위 고객 10명
select
  c.id,
  c.name,
  c.email,
  c.grade,
  sum(o.total_amount) as total_spend,
  count(*) as order_count
from customers c
join orders o on o.customer_id = c.id
where o.status in ('confirmed', 'delivered')
group by c.id, c.name, c.email, c.grade
order by total_spend desc
limit 10;

-- 4. 많이 팔린 상품 10개
select
  p.id,
  p.name,
  p.brand,
  sum(oi.quantity) as sold_quantity,
  sum(oi.subtotal) as gross_sales
from order_items oi
join products p on p.id = oi.product_id
group by p.id, p.name, p.brand
order by sold_quantity desc, gross_sales desc
limit 10;

-- 5. 월별 매출 추이
select
  to_char(date_trunc('month', o.ordered_at), 'YYYY-MM') as month,
  count(*) as order_count,
  sum(o.total_amount) as revenue
from orders o
where o.status in ('confirmed', 'delivered')
group by date_trunc('month', o.ordered_at)
order by month;

-- 6. 재고가 적은 활성 상품
select
  p.id,
  p.name,
  p.brand,
  p.stock_qty,
  p.price
from products p
where p.is_active = true
  and p.stock_qty <= 10
order by p.stock_qty asc, p.id asc;
