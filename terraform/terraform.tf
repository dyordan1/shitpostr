terraform {
  required_providers {
    google = {
      source = "hashicorp/google"
    }
  }
  backend "gcs" {
    bucket = "d722098fdda2f46b-bucket-tfstate"
    prefix = "terraform/state"
  }
  /** backend "gcs" {
    bucket  = "[PUT THE RANDOM ID HERE WHEN IT GETS GENERATED]-bucket-tfstate"
    prefix  = "terraform/state"
  } */
}

provider "google" {
  project = var.gcp_project
  region  = var.gcp_region
  zone    = var.gcp_zone
}

provider "google-beta" {
  project = var.gcp_project
  region  = var.gcp_region
  zone    = var.gcp_zone
}

data "google_client_config" "provider" {}