// src/lib/schema.ts
import { pgTable, serial, text, timestamp, integer, date } from 'drizzle-orm/pg-core';

export const employers = pgTable('employers', {
  id: serial('id').primaryKey(),
  first_name: text('first_name').notNull(),
  last_name: text('last_name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  phone_number: text('phone_number'),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
});

export const employees = pgTable('employees', {
  id: serial('id').primaryKey(),
  employer_id: integer('employer_id').notNull().references(() => employers.id),
  first_name: text('first_name').notNull(),
  last_name: text('last_name').notNull(),
  phone_number: text('phone_number'),
  gender: text('gender'),
  date_of_birth: date('date_of_birth'),
  job_title: text('job_title'),
  department: text('department'),
  start_date: date('start_date'),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
});

export const companydetails = pgTable('companydetails', {
  id: serial('id').primaryKey(),
  employer_id: integer('employer_id').notNull().references(() => employers.id),
  company_name: text('company_name').notNull(),
  company_type: text('company_type').notNull(),
  website: text('website'),
  country_id: integer('country_id').notNull(),
  county_id: integer('county_id'),
  company_size: text('company_size'),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
});

export const onboardingpreferences = pgTable('onboardingpreferences', {
  id: serial('id').primaryKey(),
  employer_id: integer('employer_id').notNull().references(() => employers.id),
  employee_count: integer('employee_count').notNull(),
  need_assistance: integer('need_assistance').notNull(), // Changed from boolean to integer
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(),
});

// Add other table definitions here...
