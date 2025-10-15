variable "aws" {
  type = object({
    instance_type_ec2 = string
  })
  default = {
    instance_type_ec2 = "t3.micro"
  }
}

variable "image_tag" {
  description = "Tag de l'image Docker (hash du commit)"
  type        = string
  default     = "79a8604e15045692965c7cfec78c7c0054f83d95"
}