import { stats } from '../data/stats';
import { salesData } from '../data/sales';
import { revenueData } from '../data/revenue';
import { users } from '../data/users';
import { activity } from '../data/activity';

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
