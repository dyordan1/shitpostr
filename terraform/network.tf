resource "google_compute_network" "shitpostr_vpc" {
  name                    = "shitpostr-vpc"
  auto_create_subnetworks = false

  depends_on = [ google_project_service.compute ]
}

resource "google_compute_subnetwork" "shitpostr_vpc" {
  name          = "subnet-us-central-1"
  ip_cidr_range = "192.168.1.0/28"
  region        = var.gcp_region
  network       = google_compute_network.shitpostr_vpc.id

  depends_on = [ google_project_service.compute ]
}

resource "google_vpc_access_connector" "service_connector" {
  name          = "service-connector"
  subnet {
    name = google_compute_subnetwork.shitpostr_vpc.name
  }

  depends_on = [ google_project_service.vpcaccess ]
}

resource "google_compute_global_address" "default" {
  name = "google-managed-services-vpc"
  provider = google-beta
  ip_version = "IPV4"
  prefix_length = 16
  address_type = "INTERNAL"
  purpose = "VPC_PEERING"
  network = "${google_compute_network.shitpostr_vpc.name}"
}

resource "google_service_networking_connection" "private_vpc_connection" {
    provider      = google-beta
    network       = "${google_compute_network.shitpostr_vpc.name}"
    service       = "servicenetworking.googleapis.com"
    reserved_peering_ranges = ["${google_compute_global_address.default.name}"]
}