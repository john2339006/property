-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('PLATFORM_ADMIN', 'COMPANY_ADMIN', 'FINANCE', 'OPERATOR', 'READ_ONLY');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('PENDING', 'ACTIVE', 'SUSPENDED');

-- CreateEnum
CREATE TYPE "BillingPeriod" AS ENUM ('MONTHLY', 'ANNUAL');

-- CreateEnum
CREATE TYPE "EntityType" AS ENUM ('INDIVIDUAL', 'ORGANIZATION');

-- CreateEnum
CREATE TYPE "HouseStatus" AS ENUM ('ACTIVE', 'SOLD_NOT_ACTIVE', 'NOT_SOLD');

-- CreateEnum
CREATE TYPE "FeeModel" AS ENUM ('AREA', 'TIERED');

-- CreateEnum
CREATE TYPE "UsageType" AS ENUM ('PERSONAL', 'BUSINESS', 'PUBLIC');

-- CreateEnum
CREATE TYPE "InvoiceStatus" AS ENUM ('DRAFT', 'ISSUED', 'PAID', 'VOIDED');

-- CreateTable
CREATE TABLE "ManagementCompany" (
    "id" TEXT NOT NULL,
    "legal_name" TEXT NOT NULL,
    "registration_license_id" TEXT NOT NULL,
    "contact_information" TEXT NOT NULL,
    "billing_information" TEXT NOT NULL,
    "default_billing_period" "BillingPeriod" NOT NULL,
    "currency" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ManagementCompany_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "role" "UserRole" NOT NULL,
    "status" "UserStatus" NOT NULL DEFAULT 'ACTIVE',
    "company_id" TEXT NOT NULL,
    "invitation_token" TEXT,
    "invitation_expires_at" TIMESTAMP(3),
    "password_reset_token" TEXT,
    "password_reset_expires_at" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Owner" (
    "id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "entity_type" "EntityType" NOT NULL,
    "current_version_id" TEXT,

    CONSTRAINT "Owner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OwnerVersion" (
    "id" TEXT NOT NULL,
    "owner_id" TEXT NOT NULL,
    "full_legal_name" TEXT NOT NULL,
    "id_number" TEXT NOT NULL,
    "tax_id" TEXT,
    "invoicing_name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "mailing_address" TEXT NOT NULL,
    "preferred_contact_method" TEXT NOT NULL,
    "effective_from" TIMESTAMP(3) NOT NULL,
    "effective_to" TIMESTAMP(3),
    "is_latest" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "OwnerVersion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "House" (
    "id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "status" "HouseStatus" NOT NULL,
    "management_start_date" TIMESTAMP(3) NOT NULL,
    "management_end_date" TIMESTAMP(3),
    "current_version_id" TEXT,

    CONSTRAINT "House_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HouseVersion" (
    "id" TEXT NOT NULL,
    "house_id" TEXT NOT NULL,
    "building_no" TEXT NOT NULL,
    "unit_no" TEXT NOT NULL,
    "level_no" TEXT NOT NULL,
    "door_no" TEXT NOT NULL,
    "area_sqm" DOUBLE PRECISION NOT NULL,
    "effective_from" TIMESTAMP(3) NOT NULL,
    "effective_to" TIMESTAMP(3),
    "is_latest" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "HouseVersion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ownership" (
    "id" TEXT NOT NULL,
    "house_id" TEXT NOT NULL,
    "owner_id" TEXT NOT NULL,

    CONSTRAINT "Ownership_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BillingType" (
    "id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "current_version_id" TEXT,

    CONSTRAINT "BillingType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BillingTypeVersion" (
    "id" TEXT NOT NULL,
    "billing_type_id" TEXT NOT NULL,
    "fee_model" "FeeModel" NOT NULL,
    "price_per_sqm" DOUBLE PRECISION,
    "usage_type" "UsageType" NOT NULL,
    "effective_from" TIMESTAMP(3) NOT NULL,
    "effective_to" TIMESTAMP(3),
    "is_latest" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "BillingTypeVersion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Discount" (
    "id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "house_id" TEXT NOT NULL,
    "percentage" DOUBLE PRECISION NOT NULL,
    "one_time" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Discount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bill" (
    "id" TEXT NOT NULL,
    "house_id" TEXT NOT NULL,
    "billing_period" TEXT NOT NULL,
    "current_version_id" TEXT,

    CONSTRAINT "Bill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BillVersion" (
    "id" TEXT NOT NULL,
    "bill_id" TEXT NOT NULL,
    "calculated_amount" DOUBLE PRECISION NOT NULL,
    "discount_applied" DOUBLE PRECISION NOT NULL,
    "overridden_amount" DOUBLE PRECISION,
    "created_by" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reason" TEXT,
    "is_latest" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "BillVersion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invoice" (
    "id" TEXT NOT NULL,
    "bill_version_id" TEXT NOT NULL,
    "house_id" TEXT NOT NULL,
    "billing_period" TEXT NOT NULL,
    "status" "InvoiceStatus" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvoiceLineItem" (
    "id" TEXT NOT NULL,
    "invoice_id" TEXT NOT NULL,
    "house_identifier" TEXT NOT NULL,
    "owner_name" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "InvoiceLineItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "entity_type" TEXT NOT NULL,
    "entity_id" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "management_company_audit" (
    "audit_id" TEXT NOT NULL,
    "operation" TEXT NOT NULL,
    "changed_by" TEXT NOT NULL,
    "changed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id" TEXT NOT NULL,
    "legal_name" TEXT NOT NULL,
    "registration_license_id" TEXT NOT NULL,
    "contact_information" TEXT NOT NULL,
    "billing_information" TEXT NOT NULL,
    "default_billing_period" "BillingPeriod" NOT NULL,
    "currency" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "management_company_audit_pkey" PRIMARY KEY ("audit_id")
);

-- CreateTable
CREATE TABLE "user_audit" (
    "audit_id" TEXT NOT NULL,
    "operation" TEXT NOT NULL,
    "changed_by" TEXT NOT NULL,
    "changed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "role" "UserRole" NOT NULL,
    "status" "UserStatus" NOT NULL,
    "company_id" TEXT NOT NULL,
    "invitation_token" TEXT,
    "invitation_expires_at" TIMESTAMP(3),
    "password_reset_token" TEXT,
    "password_reset_expires_at" TIMESTAMP(3),

    CONSTRAINT "user_audit_pkey" PRIMARY KEY ("audit_id")
);

-- CreateTable
CREATE TABLE "owner_audit" (
    "audit_id" TEXT NOT NULL,
    "operation" TEXT NOT NULL,
    "changed_by" TEXT NOT NULL,
    "changed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "entity_type" "EntityType" NOT NULL,
    "current_version_id" TEXT,

    CONSTRAINT "owner_audit_pkey" PRIMARY KEY ("audit_id")
);

-- CreateTable
CREATE TABLE "owner_version_audit" (
    "audit_id" TEXT NOT NULL,
    "operation" TEXT NOT NULL,
    "changed_by" TEXT NOT NULL,
    "changed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id" TEXT NOT NULL,
    "owner_id" TEXT NOT NULL,
    "full_legal_name" TEXT NOT NULL,
    "id_number" TEXT NOT NULL,
    "tax_id" TEXT,
    "invoicing_name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "mailing_address" TEXT NOT NULL,
    "preferred_contact_method" TEXT NOT NULL,
    "effective_from" TIMESTAMP(3) NOT NULL,
    "effective_to" TIMESTAMP(3),
    "is_latest" BOOLEAN NOT NULL,

    CONSTRAINT "owner_version_audit_pkey" PRIMARY KEY ("audit_id")
);

-- CreateTable
CREATE TABLE "house_audit" (
    "audit_id" TEXT NOT NULL,
    "operation" TEXT NOT NULL,
    "changed_by" TEXT NOT NULL,
    "changed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "status" "HouseStatus" NOT NULL,
    "management_start_date" TIMESTAMP(3) NOT NULL,
    "management_end_date" TIMESTAMP(3),
    "current_version_id" TEXT,

    CONSTRAINT "house_audit_pkey" PRIMARY KEY ("audit_id")
);

-- CreateTable
CREATE TABLE "house_version_audit" (
    "audit_id" TEXT NOT NULL,
    "operation" TEXT NOT NULL,
    "changed_by" TEXT NOT NULL,
    "changed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id" TEXT NOT NULL,
    "house_id" TEXT NOT NULL,
    "building_no" TEXT NOT NULL,
    "unit_no" TEXT NOT NULL,
    "level_no" TEXT NOT NULL,
    "door_no" TEXT NOT NULL,
    "area_sqm" DOUBLE PRECISION NOT NULL,
    "effective_from" TIMESTAMP(3) NOT NULL,
    "effective_to" TIMESTAMP(3),
    "is_latest" BOOLEAN NOT NULL,

    CONSTRAINT "house_version_audit_pkey" PRIMARY KEY ("audit_id")
);

-- CreateTable
CREATE TABLE "ownership_audit" (
    "audit_id" TEXT NOT NULL,
    "operation" TEXT NOT NULL,
    "changed_by" TEXT NOT NULL,
    "changed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id" TEXT NOT NULL,
    "house_id" TEXT NOT NULL,
    "owner_id" TEXT NOT NULL,

    CONSTRAINT "ownership_audit_pkey" PRIMARY KEY ("audit_id")
);

-- CreateTable
CREATE TABLE "billing_type_audit" (
    "audit_id" TEXT NOT NULL,
    "operation" TEXT NOT NULL,
    "changed_by" TEXT NOT NULL,
    "changed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "current_version_id" TEXT,

    CONSTRAINT "billing_type_audit_pkey" PRIMARY KEY ("audit_id")
);

-- CreateTable
CREATE TABLE "billing_type_version_audit" (
    "audit_id" TEXT NOT NULL,
    "operation" TEXT NOT NULL,
    "changed_by" TEXT NOT NULL,
    "changed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id" TEXT NOT NULL,
    "billing_type_id" TEXT NOT NULL,
    "fee_model" "FeeModel" NOT NULL,
    "price_per_sqm" DOUBLE PRECISION,
    "usage_type" "UsageType" NOT NULL,
    "effective_from" TIMESTAMP(3) NOT NULL,
    "effective_to" TIMESTAMP(3),
    "is_latest" BOOLEAN NOT NULL,

    CONSTRAINT "billing_type_version_audit_pkey" PRIMARY KEY ("audit_id")
);

-- CreateTable
CREATE TABLE "discount_audit" (
    "audit_id" TEXT NOT NULL,
    "operation" TEXT NOT NULL,
    "changed_by" TEXT NOT NULL,
    "changed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "house_id" TEXT NOT NULL,
    "percentage" DOUBLE PRECISION NOT NULL,
    "one_time" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "discount_audit_pkey" PRIMARY KEY ("audit_id")
);

-- CreateTable
CREATE TABLE "bill_audit" (
    "audit_id" TEXT NOT NULL,
    "operation" TEXT NOT NULL,
    "changed_by" TEXT NOT NULL,
    "changed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id" TEXT NOT NULL,
    "house_id" TEXT NOT NULL,
    "billing_period" TEXT NOT NULL,
    "current_version_id" TEXT,

    CONSTRAINT "bill_audit_pkey" PRIMARY KEY ("audit_id")
);

-- CreateTable
CREATE TABLE "bill_version_audit" (
    "audit_id" TEXT NOT NULL,
    "operation" TEXT NOT NULL,
    "changed_by" TEXT NOT NULL,
    "changed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id" TEXT NOT NULL,
    "bill_id" TEXT NOT NULL,
    "calculated_amount" DOUBLE PRECISION NOT NULL,
    "discount_applied" DOUBLE PRECISION NOT NULL,
    "overridden_amount" DOUBLE PRECISION,
    "created_by" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "reason" TEXT,
    "is_latest" BOOLEAN NOT NULL,

    CONSTRAINT "bill_version_audit_pkey" PRIMARY KEY ("audit_id")
);

-- CreateTable
CREATE TABLE "invoice_audit" (
    "audit_id" TEXT NOT NULL,
    "operation" TEXT NOT NULL,
    "changed_by" TEXT NOT NULL,
    "changed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id" TEXT NOT NULL,
    "bill_version_id" TEXT NOT NULL,
    "house_id" TEXT NOT NULL,
    "billing_period" TEXT NOT NULL,
    "status" "InvoiceStatus" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "invoice_audit_pkey" PRIMARY KEY ("audit_id")
);

-- CreateTable
CREATE TABLE "invoice_line_item_audit" (
    "audit_id" TEXT NOT NULL,
    "operation" TEXT NOT NULL,
    "changed_by" TEXT NOT NULL,
    "changed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id" TEXT NOT NULL,
    "invoice_id" TEXT NOT NULL,
    "house_identifier" TEXT NOT NULL,
    "owner_name" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "invoice_line_item_audit_pkey" PRIMARY KEY ("audit_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_invitation_token_key" ON "User"("invitation_token");

-- CreateIndex
CREATE UNIQUE INDEX "User_password_reset_token_key" ON "User"("password_reset_token");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_username_idx" ON "User"("username");

-- CreateIndex
CREATE INDEX "OwnerVersion_full_legal_name_phone_id_number_idx" ON "OwnerVersion"("full_legal_name", "phone", "id_number");

-- CreateIndex
CREATE INDEX "House_status_idx" ON "House"("status");

-- CreateIndex
CREATE INDEX "HouseVersion_building_no_unit_no_door_no_idx" ON "HouseVersion"("building_no", "unit_no", "door_no");

-- CreateIndex
CREATE INDEX "Bill_billing_period_house_id_idx" ON "Bill"("billing_period", "house_id");

-- CreateIndex
CREATE INDEX "Invoice_status_billing_period_idx" ON "Invoice"("status", "billing_period");

-- CreateIndex
CREATE INDEX "AuditLog_user_id_created_at_idx" ON "AuditLog"("user_id", "created_at");

-- CreateIndex
CREATE INDEX "management_company_audit_id_changed_at_idx" ON "management_company_audit"("id", "changed_at");

-- CreateIndex
CREATE INDEX "user_audit_id_changed_at_idx" ON "user_audit"("id", "changed_at");

-- CreateIndex
CREATE INDEX "owner_audit_id_changed_at_idx" ON "owner_audit"("id", "changed_at");

-- CreateIndex
CREATE INDEX "owner_version_audit_id_changed_at_idx" ON "owner_version_audit"("id", "changed_at");

-- CreateIndex
CREATE INDEX "house_audit_id_changed_at_idx" ON "house_audit"("id", "changed_at");

-- CreateIndex
CREATE INDEX "house_version_audit_id_changed_at_idx" ON "house_version_audit"("id", "changed_at");

-- CreateIndex
CREATE INDEX "ownership_audit_id_changed_at_idx" ON "ownership_audit"("id", "changed_at");

-- CreateIndex
CREATE INDEX "billing_type_audit_id_changed_at_idx" ON "billing_type_audit"("id", "changed_at");

-- CreateIndex
CREATE INDEX "billing_type_version_audit_id_changed_at_idx" ON "billing_type_version_audit"("id", "changed_at");

-- CreateIndex
CREATE INDEX "discount_audit_id_changed_at_idx" ON "discount_audit"("id", "changed_at");

-- CreateIndex
CREATE INDEX "bill_audit_id_changed_at_idx" ON "bill_audit"("id", "changed_at");

-- CreateIndex
CREATE INDEX "bill_version_audit_id_changed_at_idx" ON "bill_version_audit"("id", "changed_at");

-- CreateIndex
CREATE INDEX "invoice_audit_id_changed_at_idx" ON "invoice_audit"("id", "changed_at");

-- CreateIndex
CREATE INDEX "invoice_line_item_audit_id_changed_at_idx" ON "invoice_line_item_audit"("id", "changed_at");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "ManagementCompany"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Owner" ADD CONSTRAINT "Owner_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "ManagementCompany"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OwnerVersion" ADD CONSTRAINT "OwnerVersion_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "Owner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "House" ADD CONSTRAINT "House_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "ManagementCompany"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HouseVersion" ADD CONSTRAINT "HouseVersion_house_id_fkey" FOREIGN KEY ("house_id") REFERENCES "House"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ownership" ADD CONSTRAINT "Ownership_house_id_fkey" FOREIGN KEY ("house_id") REFERENCES "House"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ownership" ADD CONSTRAINT "Ownership_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "Owner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BillingType" ADD CONSTRAINT "BillingType_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "ManagementCompany"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BillingTypeVersion" ADD CONSTRAINT "BillingTypeVersion_billing_type_id_fkey" FOREIGN KEY ("billing_type_id") REFERENCES "BillingType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Discount" ADD CONSTRAINT "Discount_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "ManagementCompany"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Discount" ADD CONSTRAINT "Discount_house_id_fkey" FOREIGN KEY ("house_id") REFERENCES "House"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bill" ADD CONSTRAINT "Bill_house_id_fkey" FOREIGN KEY ("house_id") REFERENCES "House"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BillVersion" ADD CONSTRAINT "BillVersion_bill_id_fkey" FOREIGN KEY ("bill_id") REFERENCES "Bill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_bill_version_id_fkey" FOREIGN KEY ("bill_version_id") REFERENCES "BillVersion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_house_id_fkey" FOREIGN KEY ("house_id") REFERENCES "House"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvoiceLineItem" ADD CONSTRAINT "InvoiceLineItem_invoice_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "Invoice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
