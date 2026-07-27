import { stats } from '../data/stats';
import { salesData } from '../data/sales';
import { revenueData } from '../data/revenue';
import { users } from '../data/users';
import { activity } from '../data/activity';
import { orders } from '../data/orders';
import { categories } from '../data/categories';
import { reports } from '../data/reports';
import { products } from '../data/products';
import { notifications } from '../data/notifications';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchStats() {
  await delay(400);
  return stats;
}

export async function fetchSales() {
  await delay(500);
  return salesData;
}

export async function fetchRevenue() {
  await delay(500);
  return revenueData;
}

export async function fetchUsers() {
  await delay(600);
  return users;
}

export async function fetchActivity() {
  await delay(500);
  return activity;
}

export async function fetchOrders() {
  await delay(550);
  return orders;
}

export async function fetchCategories() {
  await delay(450);
  return categories;
}

export async function fetchReports() {
  await delay(500);
  return reports;
}

export async function fetchProducts() {
  await delay(500);
  return products;
}

export async function fetchNotifications() {
  await delay(350);
  return notifications;
}
