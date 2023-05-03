-- Criação do DW (MySQL)
-- MySQL Workbench Forward Engineering
SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';
-- -----------------------------------------------------
-- Schema DW_Covid
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema DW_Covid
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `DW_Covid` DEFAULT CHARACTER SET utf8 ;
USE `DW_Covid` ;
-- -----------------------------------------------------
-- Table `DW_Covid`.`DIM_Tempo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DW_Covid`.`DIM_Tempo` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `data_reg` DATE NOT NULL,
  `fim_semana` VARCHAR(1) NOT NULL,
  `feriado` VARCHAR(1) NOT NULL,
  `semestre` INT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;
-- -----------------------------------------------------
-- Table `DW_Covid`.`SDIM_cod_postal`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DW_Covid`.`SDIM_cod_postal` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `cod_postal` VARCHAR(4) NOT NULL,
  `localidade` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;
-- -----------------------------------------------------
-- Table `DW_Covid`.`DIM_paciente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DW_Covid`.`DIM_paciente` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_paciente` INT NOT NULL,
  `nome` VARCHAR(200) NOT NULL,
  `data_nasc` DATE NOT NULL,
  `genero` VARCHAR(10) NOT NULL,
  `id_cod_postal` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_dicp_idx` (`id_cod_postal` ASC),
  CONSTRAINT `fk_dicp`
    FOREIGN KEY (`id_cod_postal`)
    REFERENCES `DW_Covid`.`SDIM_cod_postal` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;
-- -----------------------------------------------------
-- Table `DW_Covid`.`DIM_Falta_de_ar`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DW_Covid`.`DIM_Falta_de_ar` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `descricao` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;
-- -----------------------------------------------------
-- Table `DW_Covid`.`DIM_dor_cabeca`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DW_Covid`.`DIM_dor_cabeca` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `descricao` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;
-- -----------------------------------------------------
-- Table `DW_Covid`.`DIM_dor_muscular`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DW_Covid`.`DIM_dor_muscular` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `descricao` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;
-- -----------------------------------------------------
-- Table `DW_Covid`.`DIM_tosse`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DW_Covid`.`DIM_tosse` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `descricao` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;
-- -----------------------------------------------------
-- Table `DW_Covid`.`DIM_diarreia`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DW_Covid`.`DIM_diarreia` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `descricao` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;
-- -----------------------------------------------------
-- Table `DW_Covid`.`DIM_olfato`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DW_Covid`.`DIM_olfato` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `descricao` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;
-- -----------------------------------------------------
-- Table `DW_Covid`.`DIM_avalia_global`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DW_Covid`.`DIM_avalia_global` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `descricao` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;
-- -----------------------------------------------------
-- Table `DW_Covid`.`FACT_Covid19`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DW_Covid`.`FACT_Covid19` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_tempo` INT NOT NULL,
  `id_falta_ar` INT NOT NULL,
  `id_dor_cabeca` INT NOT NULL,
  `id_dor_muscular` INT NOT NULL,
  `id_tosse` INT NOT NULL,
  `id_diarreia` INT NOT NULL,
  `id_olfato` INT NOT NULL,
  `id_avalia_global` INT NOT NULL,
  `id_paciente` INT NOT NULL,
  `temperatura` DECIMAL(3,1) NOT NULL,
  `idade` INT NOT NULL,
  `duracao_sintoma` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk01_idx` (`id_tempo` ASC),
  INDEX `fk02_idx` (`id_falta_ar` ASC),
  INDEX `fk03_idx` (`id_dor_cabeca` ASC),
  INDEX `fk04_idx` (`id_dor_muscular` ASC),
  INDEX `fk05_idx` (`id_tosse` ASC),
  INDEX `fk06_idx` (`id_diarreia` ASC),
  INDEX `fk07_idx` (`id_olfato` ASC),
  INDEX `fk10_idx` (`id_avalia_global` ASC),
  INDEX `fk11_idx` (`id_paciente` ASC),
  CONSTRAINT `fk01`
    FOREIGN KEY (`id_tempo`)
    REFERENCES `DW_Covid`.`DIM_Tempo` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk02`
    FOREIGN KEY (`id_falta_ar`)
    REFERENCES `DW_Covid`.`DIM_Falta_de_ar` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk03`
    FOREIGN KEY (`id_dor_cabeca`)
    REFERENCES `DW_Covid`.`DIM_dor_cabeca` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk04`
    FOREIGN KEY (`id_dor_muscular`)
    REFERENCES `DW_Covid`.`DIM_dor_muscular` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk05`
    FOREIGN KEY (`id_tosse`)
    REFERENCES `DW_Covid`.`DIM_tosse` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk06`
    FOREIGN KEY (`id_diarreia`)
    REFERENCES `DW_Covid`.`DIM_diarreia` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk07`
    FOREIGN KEY (`id_olfato`)
    REFERENCES `DW_Covid`.`DIM_olfato` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk10`
    FOREIGN KEY (`id_avalia_global`)
    REFERENCES `DW_Covid`.`DIM_avalia_global` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk11`
    FOREIGN KEY (`id_paciente`)
    REFERENCES `DW_Covid`.`DIM_paciente` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;
SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;