terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }

# Ajoute terraform cloud
  backend "remote" {
    organization = "NicolasDrp"

    workspaces {
      name = "terraform-nicolas"
    }
  }
}

provider "aws" {
  region     = "eu-central-1"
}