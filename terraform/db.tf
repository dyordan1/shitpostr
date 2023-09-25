resource "google_sql_database_instance" "shitpostr_db" {
  name             = "shitpostr-db"
  region           = var.gcp_region
  database_version = "MYSQL_5_7"

  deletion_protection = false
  settings {
    availability_type = "REGIONAL"
    tier = "db-custom-1-3840"

    database_flags {
      name = "slow_query_log"
      value = "on"
    }

    backup_configuration {
      enabled = true
      binary_log_enabled = true
    }

    maintenance_window {
      day = 3
      hour = 0
    }

    ip_configuration {
      ipv4_enabled = false
      private_network = google_compute_network.shitpostr_vpc.id
    }
  }

  depends_on = [ google_service_networking_connection.private_vpc_connection ]
}