terraform {
  required_version = ">= 1.3.0"

  required_providers {
    google = {
      source  = "hashicorp/google"
      version = ">= 4.0"
    }
  }
}

provider "google" {
  credentials = file("credentials.json")
  project = var.project_id
  region  = var.region
}

resource "google_storage_bucket" "rewards_bucket" {
  name     = var.bucket_name
  location = var.region
  force_destroy = true

  uniform_bucket_level_access = true

  versioning {
    enabled = false
  }

  lifecycle_rule {
    action {
      type = "Delete"
    }
    condition {
      age = 365
    }
  }
}

resource "google_storage_bucket_iam_member" "service_account_access" {
  bucket = google_storage_bucket.rewards_bucket.name
  role   = "roles/storage.objectAdmin"
  member = "serviceAccount:${var.service_account_email}"
}

/* resource "google_storage_bucket_object" "public_file" {
  name   = "api/publica.png"
  bucket = google_storage_bucket.rewards_bucket.name
  source = "./publica.png"
}

resource "google_storage_object_acl" "make_public" {
  bucket = google_storage_bucket.rewards_bucket.name
  object = google_storage_bucket_object.public_file.name
  role   = "READER"
  entity = "allUsers"
}
 */