variable "aws_region" {
  description = "AWS region to deploy resources into"
  type        = string
  default     = "us-east-1"
}

variable "project_name" {
  description = "Project name used as a prefix for all resources"
  type        = string
  default     = "shopsmart"
}

variable "environment" {
  description = "Deployment environment (e.g. dev, staging, prod)"
  type        = string
  default     = "dev"
}

variable "task_cpu" {
  description = "CPU units for the ECS Fargate task (256 = 0.25 vCPU)"
  type        = number
  default     = 256
}

variable "task_memory" {
  description = "Memory (MiB) for the ECS Fargate task"
  type        = number
  default     = 512
}

variable "desired_count" {
  description = "Number of ECS task instances to run"
  type        = number
  default     = 1
}
