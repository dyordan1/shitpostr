resource "google_cloud_run_service" "shitpostr" {
  name     = "shitpostr-srv"
  location = "us-central1"

  template {
    spec {
      containers {
        image = "us-docker.pkg.dev/cloudrun/container/hello"
      }
    }

    metadata {
      annotations = {
        "autoscaling.knative.dev/maxScale"      = "3"
        "run.googleapis.com/cloudsql-instances" = google_sql_database_instance.shitpostr_db.connection_name
        "run.googleapis.com/client-name"        = "terraform"
        "run.googleapis.com/vpc-access-connector"     = google_vpc_access_connector.service_connector.name
        "run.googleapis.com/vpc-access-egress"  = "private-ranges-only"
      }
    }
  }
  autogenerate_revision_name = true

  depends_on = [ google_project_service.run ]
}

data "google_iam_policy" "noauth" {
  binding {
    role = "roles/run.invoker"
    members = [
      "allUsers",
    ]
  }
}

resource "google_cloud_run_service_iam_policy" "noauth" {
  location    = google_cloud_run_service.shitpostr.location
  project     = google_cloud_run_service.shitpostr.project
  service     = google_cloud_run_service.shitpostr.name

  policy_data = data.google_iam_policy.noauth.policy_data
}

resource "google_artifact_registry_repository" "my-repo" {
  location      = "us-central1"
  repository_id = "shitpostr"
  format        = "DOCKER"
}