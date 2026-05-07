/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 * @typedef {import('typeorm').QueryRunner} QueryRunner
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class Migrations1778075892737 {
    name = 'Migrations1778075892737'

    /**
     * @param {QueryRunner} queryRunner
     */
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "user" ("id" character varying NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL, "avatar" character varying, "resetPasswordToken" character varying, "resetPasswordExpires" TIMESTAMP, "isVerified" boolean NOT NULL DEFAULT false, "verificationToken" character varying, "verificationTokenExpires" TIMESTAMP, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ticket" ("id" character varying NOT NULL, "userId" character varying NOT NULL, "shopName" character varying NOT NULL, "message" character varying NOT NULL, "accepted" boolean NOT NULL, "createdAt" TIMESTAMP NOT NULL, "latitude" double precision NOT NULL, "longitude" double precision NOT NULL, CONSTRAINT "PK_d9a0835407701eb86f874474b7c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."support_ticket_status_enum" AS ENUM('OPEN', 'IN_PROGRESS', 'CLOSED')`);
        await queryRunner.query(`CREATE TABLE "support_ticket" ("id" character varying NOT NULL, "userId" character varying NOT NULL, "subject" character varying NOT NULL, "description" character varying NOT NULL, "status" "public"."support_ticket_status_enum" NOT NULL DEFAULT 'OPEN', "createdAt" TIMESTAMP NOT NULL, CONSTRAINT "PK_506b4b9f579fb3adbaebe3950c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "shop_event" ("id" character varying NOT NULL, "eventId" character varying NOT NULL, "shopId" character varying NOT NULL, "active" boolean NOT NULL, CONSTRAINT "PK_2e146e65464a05de25f3f396a9c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "shop" ("id" character varying NOT NULL, "name" character varying NOT NULL, "ownerId" character varying NOT NULL, "state" character varying NOT NULL, "openDate" TIMESTAMP, "closeDate" TIMESTAMP, "latitude" double precision NOT NULL, "longitude" double precision NOT NULL, CONSTRAINT "PK_ad47b7c6121fe31cb4b05438e44" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "review" ("id" character varying NOT NULL, "userId" character varying NOT NULL, "orderId" character varying NOT NULL, "shopId" character varying NOT NULL, "text" character varying NOT NULL, "date" character varying NOT NULL, CONSTRAINT "PK_2e4299a343a81574217255c00ca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order_dish" ("id" character varying NOT NULL, "orderId" character varying NOT NULL, "dishId" character varying NOT NULL, "quantity" integer NOT NULL, "unitaryPrice" integer NOT NULL, CONSTRAINT "PK_b164e265aa2c12b4761afea2397" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order" ("id" character varying NOT NULL, "userId" character varying NOT NULL, "shopId" character varying NOT NULL, "eventId" character varying, "pickUpDate" character varying NOT NULL, "state" character varying NOT NULL, "changeReason" character varying NOT NULL, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "notification" ("id" character varying NOT NULL, "title" character varying NOT NULL, "message" character varying NOT NULL, "userId" character varying, "isRead" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL, CONSTRAINT "PK_705b6c7cdf9b2c2ff7ac7872cb7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "location_log" ("id" character varying NOT NULL, "userId" character varying NOT NULL, "latitude" double precision NOT NULL, "longitude" double precision NOT NULL, "createdAt" TIMESTAMP NOT NULL, CONSTRAINT "PK_0c62ed8b5814eb8da8bc7d62cd6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "event" ("id" character varying NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "location" character varying NOT NULL, "latitude" double precision NOT NULL, "longitude" double precision NOT NULL, "startDate" character varying NOT NULL, "finishDate" character varying NOT NULL, CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "dish" ("id" character varying NOT NULL, "shopId" character varying NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "price" integer NOT NULL, "available" boolean NOT NULL, "stock" integer NOT NULL, CONSTRAINT "PK_59ac7b35af39b231276bfc4c00c" PRIMARY KEY ("id"))`);
    }

    /**
     * @param {QueryRunner} queryRunner
     */
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "dish"`);
        await queryRunner.query(`DROP TABLE "event"`);
        await queryRunner.query(`DROP TABLE "location_log"`);
        await queryRunner.query(`DROP TABLE "notification"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`DROP TABLE "order_dish"`);
        await queryRunner.query(`DROP TABLE "review"`);
        await queryRunner.query(`DROP TABLE "shop"`);
        await queryRunner.query(`DROP TABLE "shop_event"`);
        await queryRunner.query(`DROP TABLE "support_ticket"`);
        await queryRunner.query(`DROP TYPE "public"."support_ticket_status_enum"`);
        await queryRunner.query(`DROP TABLE "ticket"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }
}
