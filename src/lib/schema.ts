import {
  pgTable,
  bigint,
  text,
  timestamp,
  boolean,
  integer,
  varchar,
  numeric,
  char,
  serial,
} from "drizzle-orm/pg-core";

export const employers = pgTable("employers", {
  id: bigint("id", { mode: "number" }).primaryKey().notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  phoneNumber: text("phone_number"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export const companyDetails = pgTable("companydetails", {
  id: bigint("id", { mode: "number" }).primaryKey().notNull(),
  employerId: bigint("employer_id", { mode: "number" })
    .notNull()
    .references(() => employers.id),
  companyName: text("company_name").notNull(),
  companyType: text("company_type").notNull(),
  website: text("website"),
  countryId: bigint("country_id", { mode: "number" })
    .notNull()
    .references(() => countryList.id),
  countyId: bigint("county_id", { mode: "number" }).references(() => county.id),
  companySize: text("company_size"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export const countryList = pgTable("countrylist", {
  id: bigint("id", { mode: "number" }).primaryKey().notNull(),
  name: text("name").notNull().unique(),
  code: char("code", { length: 2 }).unique(),
});

export const county = pgTable("county", {
  id: bigint("id", { mode: "number" }).primaryKey().notNull(),
  countryId: bigint("country_id", { mode: "number" })
    .notNull()
    .references(() => countryList.id),
  name: text("name").notNull().unique(),
});

export const departments = pgTable("departments", {
  id: bigint("id", { mode: "number" }).primaryKey().notNull(),
  employerId: bigint("employer_id", { mode: "number" })
    .notNull()
    .references(() => employers.id),
  name: text("name").notNull(),
  description: text("description"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export const employees = pgTable("employees", {
  id: serial("id").primaryKey(),
  firstName: varchar("first_name", { length: 255 }).notNull(),
  lastName: varchar("last_name", { length: 255 }).notNull(),
  phoneNumber: varchar("phone_number", { length: 20 }).notNull(),
  gender: varchar("gender", { length: 10 }).notNull(),
  dateOfBirth: timestamp("date_of_birth").notNull(),
  jobTitle: varchar("job_title", { length: 255 }).notNull(),
  department: varchar("department", { length: 255 }).notNull(),
  startDate: timestamp("start_date").notNull(),
  employerId: integer("employer_id").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const identityDetails = pgTable("identitydetails", {
  id: bigint("id", { mode: "number" }).primaryKey().notNull(),
  employeeId: bigint("employee_id", { mode: "number" })
    .notNull()
    .references(() => employees.id),
  identityType: text("identity_type").notNull(),
  identityNumber: text("identity_number").notNull(),
  kraPin: text("kra_pin").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export const jobTitles = pgTable("job_titles", {
  id: bigint("id", { mode: "number" }).primaryKey().notNull(),
  employerId: bigint("employer_id", { mode: "number" })
    .notNull()
    .references(() => employers.id),
  departmentId: bigint("department_id", { mode: "number" })
    .notNull()
    .references(() => departments.id),
  name: text("name").notNull(),
  description: text("description"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export const onboardingPreferences = pgTable("onboardingpreferences", {
  id: bigint("id", { mode: "number" }).primaryKey().notNull(),
  employerId: bigint("employer_id", { mode: "number" })
    .notNull()
    .references(() => employers.id),
  employeeCount: integer("employee_count"),
  needAssistance: boolean("need_assistance").default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export const paymentDetails = pgTable("paymentdetails", {
  id: bigint("id", { mode: "number" }).primaryKey().notNull(),
  employeeId: bigint("employee_id", { mode: "number" })
    .notNull()
    .references(() => employees.id),
  salary: numeric("salary").notNull(),
  paymentFrequency: text("payment_frequency").array().notNull(),
  paymentMode: text("payment_mode").notNull(),
  bankName: text("bank_name"),
  accountNumber: text("account_number"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export const users = pgTable("users", {
  id: bigint("id", { mode: "number" }).primaryKey().notNull(),
  employerId: bigint("employer_id", { mode: "number" }).references(
    () => employers.id,
  ),
  employeeId: bigint("employee_id", { mode: "number" }).references(
    () => employees.id,
  ),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export const benefits = pgTable("benefits", {
  id: bigint("id", { mode: "number" }).primaryKey().notNull(),
  employeeId: bigint("employee_id", { mode: "number" })
    .notNull()
    .references(() => employees.id),
  nhifNumber: text("nhif_number").notNull(),
  nssfNumber: text("nssf_number").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export const banks = pgTable("banks", {
  id: bigint("id", { mode: "number" }).primaryKey().notNull(),
  employerId: bigint("employer_id", { mode: "number" })
    .notNull()
    .references(() => employers.id),
  name: varchar("name", { length: 255 }).notNull(),
  code: varchar("code", { length: 50 }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});
