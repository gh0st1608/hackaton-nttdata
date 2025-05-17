variable "project_id" {
  description = "ID del proyecto de GCP"
  type        = string
}

variable "region" {
  description = "Región donde se creará el bucket"
  type        = string
  default     = "us-central1"
}

variable "bucket_name" {
  description = "Nombre único del bucket"
  type        = string
}

variable "service_account_email" {
  description = "Email de la cuenta de servicio que tendrá acceso al bucket"
  type        = string
}
