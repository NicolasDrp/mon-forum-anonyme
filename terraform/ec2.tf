# Récupère l'AMI Ubuntu
data "aws_ami" "ubuntu" {
  most_recent = true
    owners      = ["099720109477"]
  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server-*"]
  }
  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}

# Groupe de sécurité pour autoriser les ports des containers
resource "aws_security_group" "docker" {
  name        = "docker-sg"
  description = "Autorise le trafic sur les ports des containers Docker"
  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  ingress {
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
    ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}
# Generate SSH key
resource "tls_private_key" "key" {
  algorithm = "RSA"
  rsa_bits  = 4096
}

# Create key pair
resource "aws_key_pair" "deployer" {
  key_name   = "deployer-key-nicolas"
  public_key = tls_private_key.key.public_key_openssh
}

# Store private key locally
resource "local_file" "private_key" {
  content         = tls_private_key.key.private_key_pem
  filename        = "${path.module}/deployer-key-nicolas.pem"
  file_permission = "0600"
}

# EC2 pour le service API
resource "aws_instance" "api" {
  ami             = data.aws_ami.ubuntu.id
  instance_type   = var.aws.instance_type_ec2
  security_groups = [aws_security_group.docker.name]
  key_name        = aws_key_pair.deployer.key_name

  user_data = <<-EOF
    #!/bin/bash
    sudo apt-get update
    sudo apt-get install -y docker.io
    sudo systemctl start docker
    sudo systemctl enable docker
    sudo docker run -d --name api -p 3000:3000 ghcr.io/nicolasdrp/forum-api:79a8604e15045692965c7cfec78c7c0054f83d95
  EOF

  tags = {
    Name = "api-server-Nicolas"
  }
}

# EC2 pour le service Sender
resource "aws_instance" "sender" {
  ami             = data.aws_ami.ubuntu.id
  instance_type   = var.aws.instance_type_ec2
  security_groups = [aws_security_group.docker.name]
  key_name        = aws_key_pair.deployer.key_name

  user_data = <<-EOF
    #!/bin/bash
    sudo apt-get update
    sudo apt-get install -y docker.io
    sudo systemctl start docker
    sudo systemctl enable docker
    sudo docker run -d --name sender -p 8080:8080 ghcr.io/nicolasdrp/forum-sender:79a8604e15045692965c7cfec78c7c0054f83d95
  EOF

  tags = {
    Name = "sender-server-Nicolas"
  }
}

# EC2 pour le service Thread
resource "aws_instance" "thread" {
  ami             = data.aws_ami.ubuntu.id
  instance_type   = var.aws.instance_type_ec2
  security_groups = [aws_security_group.docker.name]
  key_name        = aws_key_pair.deployer.key_name

  user_data = <<-EOF
    #!/bin/bash
    sudo apt-get update
    sudo apt-get install -y docker.io
    sudo systemctl start docker
    sudo systemctl enable docker
    sudo docker run -d --name thread -p 80:80 ghcr.io/nicolasdrp/forum-thread:79a8604e15045692965c7cfec78c7c0054f83d95
  EOF

  tags = {
    Name = "thread-server-Nicolas"
  }
}
